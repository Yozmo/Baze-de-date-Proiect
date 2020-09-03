import {Injectable} from "@angular/core";
import {SupplierControllerService} from "../../../api/services";
import {Observable} from "rxjs";
import {Supplier} from "../../../api/models/supplier";

@Injectable()
export class SupplierService {
  constructor(
    private supplierService: SupplierControllerService
  ) {}

  public getAllSuppliers(): Observable<Array<Supplier>> {
    return this.supplierService.getAllSuppliersUsingGET();
  }

  public createSupplier(supplier: Supplier): Observable<Supplier>  {
    return this.supplierService.createSupplierUsingPOST(supplier);
  }
}
