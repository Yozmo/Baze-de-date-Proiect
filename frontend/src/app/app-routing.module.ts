import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./modules/auth/services/auth-guard.service";
import {ModulePreloadingStrategy} from "./core/services/module-preloading-strategy";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "./core/services/token.interceptor";
import {NotFoundPageComponent} from "./core/constainers/not-found-page/not-found-page.component";


const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    data: {title: 'Administrare'}
  },
  {
    path: 'suppliers',
    loadChildren: () => import('./modules/supplier/supplier.module').then(m => m.SupplierModule),
    canActivate: [AuthGuard],
    data: {title: 'Furnizori'}
  },
  { path: '**', component: NotFoundPageComponent, data: { title: 'Not found' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: ModulePreloadingStrategy, useHash: true })],
  exports: [RouterModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }]
})
export class AppRoutingModule {
}
