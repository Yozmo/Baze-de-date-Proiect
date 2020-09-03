import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";

@Component({
  selector: 'pharmacies',
  templateUrl: './pharmacies.component.html',
})
export class PharmaciesComponent  {
  public pharmacyId$: Observable<string>;
  constructor(
    private route: ActivatedRoute
  ) {
    this.pharmacyId$ = this.route.params.pipe(map(data => {
      return atob(data.id);
    }));
  }
}
