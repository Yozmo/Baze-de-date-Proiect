/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Drug } from '../models/drug';

/**
 * Drug Controller
 */
@Injectable({
  providedIn: 'root',
})
class DrugControllerService extends __BaseService {
  static readonly getAllDrugsUsingGETPath = '/drug';
  static readonly createDrugUsingPOSTPath = '/drug/create';
  static readonly getDrugsByIdsUsingGETPath = '/drug/getDrugs';
  static readonly updateDrugUsingPUTPath = '/drug/update';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * getAllDrugs
   * @return OK
   */
  getAllDrugsUsingGETResponse(): __Observable<__StrictHttpResponse<Array<Drug>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/drug`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Drug>>;
      })
    );
  }
  /**
   * getAllDrugs
   * @return OK
   */
  getAllDrugsUsingGET(): __Observable<Array<Drug>> {
    return this.getAllDrugsUsingGETResponse().pipe(
      __map(_r => _r.body as Array<Drug>)
    );
  }

  /**
   * createDrug
   * @param drugDto drugDto
   * @return Created
   */
  createDrugUsingPOSTResponse(drugDto: Drug): __Observable<__StrictHttpResponse<Drug>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = drugDto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/drug/create`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Drug>;
      })
    );
  }
  /**
   * createDrug
   * @param drugDto drugDto
   * @return Created
   */
  createDrugUsingPOST(drugDto: Drug): __Observable<Drug> {
    return this.createDrugUsingPOSTResponse(drugDto).pipe(
      __map(_r => _r.body as Drug)
    );
  }

  /**
   * getDrugsByIds
   * @param ids ids
   * @return OK
   */
  getDrugsByIdsUsingGETResponse(ids?: Array<string>): __Observable<__StrictHttpResponse<Array<Drug>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (ids || []).forEach(val => {if (val != null) __params = __params.append('ids', val.toString())});
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/drug/getDrugs`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Drug>>;
      })
    );
  }
  /**
   * getDrugsByIds
   * @param ids ids
   * @return OK
   */
  getDrugsByIdsUsingGET(ids?: Array<string>): __Observable<Array<Drug>> {
    return this.getDrugsByIdsUsingGETResponse(ids).pipe(
      __map(_r => _r.body as Array<Drug>)
    );
  }

  /**
   * updateDrug
   * @param drugDto drugDto
   */
  updateDrugUsingPUTResponse(drugDto: Drug): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = drugDto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/drug/update`,
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
   * updateDrug
   * @param drugDto drugDto
   */
  updateDrugUsingPUT(drugDto: Drug): __Observable<null> {
    return this.updateDrugUsingPUTResponse(drugDto).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module DrugControllerService {
}

export { DrugControllerService }
