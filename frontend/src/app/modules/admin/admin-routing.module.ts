import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PharmacyGeneralComponent} from "./components/pharmacy-general/pharmacy-general.component";
import {PharmaciesComponent} from "./components/pharmacies/pharmacies.component";
import {DrugsComponent} from "./components/drugs/drugs.component";
import {AccountsComponent} from "./components/accounts/accounts.component";

const routes: Routes = [
  {
    path: 'pharmacies',
    component: PharmacyGeneralComponent,
    data: {
      title: 'Informatii'
    },
    children: [
      {
        path: ':id',
        component: PharmaciesComponent,
        data: {
          title: 'Farmacii'
        }
      }
    ]
  },
  {
    path: 'accounts',
    component: AccountsComponent,
    data: {
      title: 'Membrii'
    }
  },
  {
    path: 'drugs',
    component: DrugsComponent,
    data: {
      title: 'Medicamente'
    }
  },
  { path: '**', redirectTo: 'pharmacies', pathMatch: 'full' },
  { path: '', redirectTo: 'pharmacies', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
