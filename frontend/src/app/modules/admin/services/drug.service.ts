import {Injectable} from "@angular/core";
import {DrugControllerService} from "../../../api/services";
import {Observable} from "rxjs";
import {Drug} from "../../../api/models/drug";

@Injectable()
export class DrugService {
  constructor(
    private drugService: DrugControllerService
  ) {}

  public getAllDrugs(): Observable<Array<Drug>> {
    return this.drugService.getAllDrugsUsingGET();
  }

  public createDrug(drug: Drug): Observable<Drug> {
    return this.drugService.createDrugUsingPOST(drug);
  }

  public updateDrug(updatedDrug: Drug): Observable<Drug> {
    return this.drugService.updateDrugUsingPUT(updatedDrug);
  }
}
