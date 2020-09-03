/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Supplier } from '../models/supplier';

/**
 * Supplier Controller
 */
@Injectable({
  providedIn: 'root',
})
class SupplierControllerService extends __BaseService {
  static readonly getAllSuppliersUsingGETPath = '/supplier';
  static readonly createSupplierUsingPOSTPath = '/supplier/create';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * getAllSuppliers
   * @return OK
   */
  getAllSuppliersUsingGETResponse(): __Observable<__StrictHttpResponse<Array<Supplier>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/supplier`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Supplier>>;
      })
    );
  }
  /**
   * getAllSuppliers
   * @return OK
   */
  getAllSuppliersUsingGET(): __Observable<Array<Supplier>> {
    return this.getAllSuppliersUsingGETResponse().pipe(
      __map(_r => _r.body as Array<Supplier>)
    );
  }

  /**
   * createSupplier
   * @param supplierDto supplierDto
   * @return Created
   */
  createSupplierUsingPOSTResponse(supplierDto: Supplier): __Observable<__StrictHttpResponse<Supplier>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = supplierDto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/supplier/create`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Supplier>;
      })
    );
  }
  /**
   * createSupplier
   * @param supplierDto supplierDto
   * @return Created
   */
  createSupplierUsingPOST(supplierDto: Supplier): __Observable<Supplier> {
    return this.createSupplierUsingPOSTResponse(supplierDto).pipe(
      __map(_r => _r.body as Supplier)
    );
  }
}

module SupplierControllerService {
}

export { SupplierControllerService }
