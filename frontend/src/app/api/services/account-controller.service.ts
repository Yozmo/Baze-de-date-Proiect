/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Account } from '../models/account';

/**
 * Account Controller
 */
@Injectable({
  providedIn: 'root',
})
class AccountControllerService extends __BaseService {
  static readonly getAllAccountsUsingGETPath = '/account';
  static readonly createAccountUsingPOSTPath = '/account/create';
  static readonly updateAccountUsingPUTPath = '/account/update';
  static readonly getByEmailUsingGETPath = '/account/{email}';
  static readonly isUniqueUsingGETPath = '/account/{email}/isUnique';
  static readonly getAccountRolesUsingGETPath = '/account/{email}/roles';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * getAllAccounts
   * @return OK
   */
  getAllAccountsUsingGETResponse(): __Observable<__StrictHttpResponse<Array<Account>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/account`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Account>>;
      })
    );
  }
  /**
   * getAllAccounts
   * @return OK
   */
  getAllAccountsUsingGET(): __Observable<Array<Account>> {
    return this.getAllAccountsUsingGETResponse().pipe(
      __map(_r => _r.body as Array<Account>)
    );
  }

  /**
   * createAccount
   * @param accountDto accountDto
   * @return Created
   */
  createAccountUsingPOSTResponse(accountDto: Account): __Observable<__StrictHttpResponse<Account>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = accountDto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/account/create`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Account>;
      })
    );
  }
  /**
   * createAccount
   * @param accountDto accountDto
   * @return Created
   */
  createAccountUsingPOST(accountDto: Account): __Observable<Account> {
    return this.createAccountUsingPOSTResponse(accountDto).pipe(
      __map(_r => _r.body as Account)
    );
  }

  /**
   * updateAccount
   * @param accountDto accountDto
   */
  updateAccountUsingPUTResponse(accountDto: Account): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = accountDto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/account/update`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * updateAccount
   * @param accountDto accountDto
   */
  updateAccountUsingPUT(accountDto: Account): __Observable<null> {
    return this.updateAccountUsingPUTResponse(accountDto).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * getByEmail
   * @param email email
   * @return OK
   */
  getByEmailUsingGETResponse(email: string): __Observable<__StrictHttpResponse<Account>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/account/${encodeURIComponent(email)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Account>;
      })
    );
  }
  /**
   * getByEmail
   * @param email email
   * @return OK
   */
  getByEmailUsingGET(email: string): __Observable<Account> {
    return this.getByEmailUsingGETResponse(email).pipe(
      __map(_r => _r.body as Account)
    );
  }

  /**
   * isUnique
   * @param email email
   * @return OK
   */
  isUniqueUsingGETResponse(email: string): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/account/${encodeURIComponent(email)}/isUnique`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: (_r as HttpResponse<any>).body === 'true' }) as __StrictHttpResponse<boolean>
      })
    );
  }
  /**
   * isUnique
   * @param email email
   * @return OK
   */
  isUniqueUsingGET(email: string): __Observable<boolean> {
    return this.isUniqueUsingGETResponse(email).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * getAccountRoles
   * @param email email
   * @return OK
   */
  getAccountRolesUsingGETResponse(email: string): __Observable<__StrictHttpResponse<Array<string>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/account/${encodeURIComponent(email)}/roles`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<string>>;
      })
    );
  }
  /**
   * getAccountRoles
   * @param email email
   * @return OK
   */
  getAccountRolesUsingGET(email: string): __Observable<Array<string>> {
    return this.getAccountRolesUsingGETResponse(email).pipe(
      __map(_r => _r.body as Array<string>)
    );
  }
}

module AccountControllerService {
}

export { AccountControllerService }
