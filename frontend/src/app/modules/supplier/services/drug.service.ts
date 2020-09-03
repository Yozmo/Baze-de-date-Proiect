import {Injectable} from "@angular/core";
import {DrugControllerService} from "../../../api/services";
import {Observable} from "rxjs";
import {Supplier} from "../../../api/models/supplier";

@Injectable()
export class DrugService {
  constructor(
    private drugService: DrugControllerService
  ) {}

  public getDrugsById(ids: Array<string>): Observable<Array<Supplier>> {
      return this.drugService.getDrugsByIdsUsingGET(ids);
  }
}
