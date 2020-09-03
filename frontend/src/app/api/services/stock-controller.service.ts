/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Stock } from '../models/stock';

/**
 * Stock Controller
 */
@Injectable({
  providedIn: 'root',
})
class StockControllerService extends __BaseService {
  static readonly getAllStocksUsingGETPath = '/stock';
  static readonly getStocksByCenterIdUsingGETPath = '/stock/center/{id}';
  static readonly createStockUsingPOSTPath = '/stock/create';
  static readonly getByNameUsingGETPath = '/stock/getByName';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * getAllStocks
   * @return OK
   */
  getAllStocksUsingGETResponse(): __Observable<__StrictHttpResponse<Array<Stock>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/stock`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Stock>>;
      })
    );
  }
  /**
   * getAllStocks
   * @return OK
   */
  getAllStocksUsingGET(): __Observable<Array<Stock>> {
    return this.getAllStocksUsingGETResponse().pipe(
      __map(_r => _r.body as Array<Stock>)
    );
  }

  /**
   * getStocksByCenterId
   * @param id id
   * @return OK
   */
  getStocksByCenterIdUsingGETResponse(id: string): __Observable<__StrictHttpResponse<Array<Stock>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/stock/center/${encodeURIComponent(id)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Stock>>;
      })
    );
  }
  /**
   * getStocksByCenterId
   * @param id id
   * @return OK
   */
  getStocksByCenterIdUsingGET(id: string): __Observable<Array<Stock>> {
    return this.getStocksByCenterIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as Array<Stock>)
    );
  }

  /**
   * createStock
   * @param stockDto stockDto
   * @return Created
   */
  createStockUsingPOSTResponse(stockDto: Stock): __Observable<__StrictHttpResponse<Stock>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = stockDto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/stock/create`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Stock>;
      })
    );
  }
  /**
   * createStock
   * @param stockDto stockDto
   * @return Created
   */
  createStockUsingPOST(stockDto: Stock): __Observable<Stock> {
    return this.createStockUsingPOSTResponse(stockDto).pipe(
      __map(_r => _r.body as Stock)
    );
  }

  /**
   * getByName
   * @param name name
   * @return OK
   */
  getByNameUsingGETResponse(name: string): __Observable<__StrictHttpResponse<Stock>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (name != null) __params = __params.set('name', name.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/stock/getByName`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Stock>;
      })
    );
  }
  /**
   * getByName
   * @param name name
   * @return OK
   */
  getByNameUsingGET(name: string): __Observable<Stock> {
    return this.getByNameUsingGETResponse(name).pipe(
      __map(_r => _r.body as Stock)
    );
  }
}

module StockControllerService {
}

export { StockControllerService }
