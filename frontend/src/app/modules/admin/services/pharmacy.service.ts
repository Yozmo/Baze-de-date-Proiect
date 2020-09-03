import {Injectable} from "@angular/core";
import {PharmacyControllerService} from "../../../api/services";
import {Observable} from "rxjs";
import {Pharmacy} from "../../../api/models/pharmacy";

@Injectable()
export class PharmacyService {
  constructor(
    private pharmacyService: PharmacyControllerService,
  ) { }

  public getAllPharmacies(): Observable<Array<Pharmacy>> {
    return this.pharmacyService.getAllPharmaciesUsingGET();
  }

  public createPharmacy(pharmacy: Pharmacy): Observable<Pharmacy>{
    return this.pharmacyService.createPharmacyUsingPOST(pharmacy);
  }

  public getPharmacyByName(name: string): Observable<Pharmacy> {
    return this.pharmacyService.findByNameUsingGET(name);
  }
}
