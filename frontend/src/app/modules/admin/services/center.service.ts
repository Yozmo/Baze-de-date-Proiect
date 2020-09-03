import {Injectable} from "@angular/core";
import {CenterControllerService} from "../../../api/services";
import {Observable} from "rxjs";
import {Center} from "../../../api/models/center";

@Injectable()
export class CenterService {
  constructor(
    private centerService: CenterControllerService
  ) { }

  public getAllCenters(): Observable<Array<Center>> {
    return this.centerService.getAllCentersUsingGET();
  }

  public getCentersByPharmacyId(id: string): Observable<Array<Center>> {
    return this.centerService.getCentersByPharmacyIdUsingGET(id);
  }

  public createCenter(center: Center): Observable<Center> {
    return this.centerService.createCenterUsingPOST(center);
  }

  public updateCenter(center: Center): Observable<Center> {
    return this.centerService.updateCenterUsingPUT(center);
  }
}
