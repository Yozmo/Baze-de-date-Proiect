import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, EMPTY, Observable, throwError} from 'rxjs';
import {catchError, filter, first, flatMap, skip, switchMap, take} from 'rxjs/operators';
import {OAuth2AccessToken} from '../../modules/auth/models';
import * as AuthActions from '../../modules/auth/state/auth.actions';
import * as AuthSelectors from '../../modules/auth/state/auth.selectors';
import {selectOAuth2AccessToken} from '../../modules/auth/state/auth.selectors';
import * as AuthState from '../../modules/auth/state/auth.state';
import {AuthService} from "../../modules/auth/services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthService, private store$: Store<AuthState.State>) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes('oauth/token') ||
      request.url.includes('assets/i18n/login') ||
      request.url.includes('/account/')) {
      return next.handle(request);
    }

    return this.store$.select(AuthSelectors.selectOAuth2AccessToken).pipe(
      first(),
      flatMap((authentication: OAuth2AccessToken) => {
          const token = authentication ? authentication.access_token : null;
          return next.handle(this.addToken(request, token)).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
              return this.handle401Error(request, next, authentication);
            } else {
              return throwError(error);
            }
          }));
        }
      ));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler, authentication: OAuth2AccessToken): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      this.store$.dispatch(AuthActions.refreshToken());
      const accessToken$ = this.store$.pipe(select(selectOAuth2AccessToken)).pipe(skip(1));

      return accessToken$.pipe(
        switchMap((accessToken: OAuth2AccessToken) => {
          if (!accessToken) {
            return EMPTY;
          }
          this.isRefreshing = false;
          this.refreshTokenSubject.next(accessToken.access_token);
          return next.handle(this.addToken(request, accessToken.access_token));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(accessToken => accessToken != null),
        take(1),
        switchMap(accessToken => {
          return next.handle(this.addToken(request, accessToken));
        }));
    }
  }
}
