/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Center } from '../models/center';

/**
 * Center Controller
 */
@Injectable({
  providedIn: 'root',
})
class CenterControllerService extends __BaseService {
  static readonly getAllCentersUsingGETPath = '/center';
  static readonly createCenterUsingPOSTPath = '/center/create';
  static readonly getCentersByNameUsingGETPath = '/center/getByName';
  static readonly getCentersByPharmacyIdUsingGETPath = '/center/pharmacy/{id}';
  static readonly updateCenterUsingPUTPath = '/center/update';
  static readonly getCenterByIdUsingGETPath = '/center/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * getAllCenters
   * @return OK
   */
  getAllCentersUsingGETResponse(): __Observable<__StrictHttpResponse<Array<Center>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/center`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Center>>;
      })
    );
  }
  /**
   * getAllCenters
   * @return OK
   */
  getAllCentersUsingGET(): __Observable<Array<Center>> {
    return this.getAllCentersUsingGETResponse().pipe(
      __map(_r => _r.body as Array<Center>)
    );
  }

  /**
   * createCenter
   * @param centerDto centerDto
   * @return Created
   */
  createCenterUsingPOSTResponse(centerDto: Center): __Observable<__StrictHttpResponse<Center>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = centerDto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/center/create`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Center>;
      })
    );
  }
  /**
   * createCenter
   * @param centerDto centerDto
   * @return Created
   */
  createCenterUsingPOST(centerDto: Center): __Observable<Center> {
    return this.createCenterUsingPOSTResponse(centerDto).pipe(
      __map(_r => _r.body as Center)
    );
  }

  /**
   * getCentersByName
   * @param name name
   * @return OK
   */
  getCentersByNameUsingGETResponse(name: string): __Observable<__StrictHttpResponse<Array<Center>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (name != null) __params = __params.set('name', name.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/center/getByName`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Center>>;
      })
    );
  }
  /**
   * getCentersByName
   * @param name name
   * @return OK
   */
  getCentersByNameUsingGET(name: string): __Observable<Array<Center>> {
    return this.getCentersByNameUsingGETResponse(name).pipe(
      __map(_r => _r.body as Array<Center>)
    );
  }

  /**
   * getCentersByPharmacyId
   * @param id id
   * @return OK
   */
  getCentersByPharmacyIdUsingGETResponse(id: string): __Observable<__StrictHttpResponse<Array<Center>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/center/pharmacy/${encodeURIComponent(id)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Center>>;
      })
    );
  }
  /**
   * getCentersByPharmacyId
   * @param id id
   * @return OK
   */
  getCentersByPharmacyIdUsingGET(id: string): __Observable<Array<Center>> {
    return this.getCentersByPharmacyIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as Array<Center>)
    );
  }

  /**
   * updateCenter
   * @param centerDto centerDto
   */
  updateCenterUsingPUTResponse(centerDto: Center): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = centerDto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/center/update`,
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
   * updateCenter
   * @param centerDto centerDto
   */
  updateCenterUsingPUT(centerDto: Center): __Observable<null> {
    return this.updateCenterUsingPUTResponse(centerDto).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * getCenterById
   * @param id id
   * @return OK
   */
  getCenterByIdUsingGETResponse(id: string): __Observable<__StrictHttpResponse<Center>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/center/${encodeURIComponent(id)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Center>;
      })
    );
  }
  /**
   * getCenterById
   * @param id id
   * @return OK
   */
  getCenterByIdUsingGET(id: string): __Observable<Center> {
    return this.getCenterByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as Center)
    );
  }
}

module CenterControllerService {
}

export { CenterControllerService }
