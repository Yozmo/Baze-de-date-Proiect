import {Injectable} from "@angular/core";
import {StockControllerService} from "../../../api/services";
import {Observable} from "rxjs";
import {Stock} from "../../../api/models/stock";

@Injectable()
export class StockService {
  constructor(
    private stockService: StockControllerService
  ) {}

  public getStockForCenter(centerId: string): Observable<Array<Stock>> {
    return this.stockService.getStocksByCenterIdUsingGET(centerId);
  }

  public createStock(stock: Stock): Observable<Stock> {
    return this.stockService.createStockUsingPOST(stock);
  }
}
