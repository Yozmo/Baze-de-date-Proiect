import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SuppliersComponent} from "./components/suppliers/suppliers.component";


const routes: Routes = [
  {
    path: 'table',
    component: SuppliersComponent,
    data: {
      title: 'Furnizori'
    }
  },
  { path: '**', redirectTo: 'table', pathMatch: 'full' },
  { path: '', redirectTo: 'table', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
