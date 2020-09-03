import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {Credentials, OAuth2AccessToken} from '../models';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as AuthState from '../state/auth.state';
import {AccountControllerService} from 'src/app/api/services';
import {Account} from 'src/app/api/models';
import {ApiConfiguration} from "../../../services/api-configurations";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_PATH = 'api_path';

  private rootUrl: string;

  constructor(
    private http: HttpClient,
    config: ApiConfiguration,
    private store: Store<AuthState.State>,
    private accountControllerService: AccountControllerService) {
    this.API_PATH = config.rootUrl;
  }

  login({username, password}: Credentials): Observable<OAuth2AccessToken> {
    const input = new FormData();
    input.append('username', username);
    input.append('password', password);
    input.append('grant_type', 'password');

    const header = new HttpHeaders({Authorization: 'Basic ' + btoa('pWjUdx7vYUyGquv1.apps.pharmacy.ro:osteMzLtqhByQLuMKMo=')});
    return this.http.post<OAuth2AccessToken>(`${this.API_PATH}/oauth/token`, input, {headers: header});
  }

  refreshToken(refreshToken: string): Observable<OAuth2AccessToken> {

    const input = new FormData();
    input.append('grant_type', 'refresh_token');
    input.append('refresh_token', refreshToken);
    const header = new HttpHeaders({Authorization: 'Basic ' + btoa('pWjUdx7vYUyGquv1.apps.pharmacy.ro:osteMzLtqhByQLuMKMo=')});

    return this.http.post<any>(`${this.API_PATH}/oauth/token`, input, {headers: header});
  }

  getAccountByEmail(email: string): Observable<Account> {
    return this.accountControllerService.getByEmailUsingGET(email);
  }
  isEmailUnique(email: string): Observable<boolean> {
    return this.accountControllerService.isUniqueUsingGET(email);
  }
}
