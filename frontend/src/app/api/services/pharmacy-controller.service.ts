/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Pharmacy } from '../models/pharmacy';

/**
 * Pharmacy Controller
 */
@Injectable({
  providedIn: 'root',
})
class PharmacyControllerService extends __BaseService {
  static readonly getAllPharmaciesUsingGETPath = '/pharmacy';
  static readonly createPharmacyUsingPOSTPath = '/pharmacy/create';
  static readonly findByNameFilterUsingGETPath = '/pharmacy/filterByName';
  static readonly findByNameUsingGETPath = '/pharmacy/findByName';
  static readonly findPharmacyByIdUsingGETPath = '/pharmacy/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * getAllPharmacies
   * @return OK
   */
  getAllPharmaciesUsingGETResponse(): __Observable<__StrictHttpResponse<Array<Pharmacy>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/pharmacy`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Pharmacy>>;
      })
    );
  }
  /**
   * getAllPharmacies
   * @return OK
   */
  getAllPharmaciesUsingGET(): __Observable<Array<Pharmacy>> {
    return this.getAllPharmaciesUsingGETResponse().pipe(
      __map(_r => _r.body as Array<Pharmacy>)
    );
  }

  /**
   * createPharmacy
   * @param pharmacyDto pharmacyDto
   * @return Created
   */
  createPharmacyUsingPOSTResponse(pharmacyDto: Pharmacy): __Observable<__StrictHttpResponse<Pharmacy>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = pharmacyDto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/pharmacy/create`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Pharmacy>;
      })
    );
  }
  /**
   * createPharmacy
   * @param pharmacyDto pharmacyDto
   * @return Created
   */
  createPharmacyUsingPOST(pharmacyDto: Pharmacy): __Observable<Pharmacy> {
    return this.createPharmacyUsingPOSTResponse(pharmacyDto).pipe(
      __map(_r => _r.body as Pharmacy)
    );
  }

  /**
   * findByNameFilter
   * @param name name
   * @return OK
   */
  findByNameFilterUsingGETResponse(name: string): __Observable<__StrictHttpResponse<Pharmacy>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (name != null) __params = __params.set('name', name.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/pharmacy/filterByName`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Pharmacy>;
      })
    );
  }
  /**
   * findByNameFilter
   * @param name name
   * @return OK
   */
  findByNameFilterUsingGET(name: string): __Observable<Pharmacy> {
    return this.findByNameFilterUsingGETResponse(name).pipe(
      __map(_r => _r.body as Pharmacy)
    );
  }

  /**
   * findByName
   * @param name name
   * @return OK
   */
  findByNameUsingGETResponse(name: string): __Observable<__StrictHttpResponse<Pharmacy>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (name != null) __params = __params.set('name', name.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/pharmacy/findByName`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Pharmacy>;
      })
    );
  }
  /**
   * findByName
   * @param name name
   * @return OK
   */
  findByNameUsingGET(name: string): __Observable<Pharmacy> {
    return this.findByNameUsingGETResponse(name).pipe(
      __map(_r => _r.body as Pharmacy)
    );
  }

  /**
   * findPharmacyById
   * @param id id
   * @return OK
   */
  findPharmacyByIdUsingGETResponse(id: string): __Observable<__StrictHttpResponse<Pharmacy>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/pharmacy/${encodeURIComponent(id)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Pharmacy>;
      })
    );
  }
  /**
   * findPharmacyById
   * @param id id
   * @return OK
   */
  findPharmacyByIdUsingGET(id: string): __Observable<Pharmacy> {
    return this.findPharmacyByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as Pharmacy)
    );
  }
}

module PharmacyControllerService {
}

export { PharmacyControllerService }
