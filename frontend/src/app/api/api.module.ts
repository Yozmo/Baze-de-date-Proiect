/* tslint:disable */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationInterface } from './api-configuration';

import { AccountControllerService } from './services/account-controller.service';
import { CenterControllerService } from './services/center-controller.service';
import { DrugControllerService } from './services/drug-controller.service';
import { PharmacyControllerService } from './services/pharmacy-controller.service';
import { StockControllerService } from './services/stock-controller.service';
import { SupplierControllerService } from './services/supplier-controller.service';

/**
 * Provider for all Api services, plus ApiConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
    AccountControllerService,
    CenterControllerService,
    DrugControllerService,
    PharmacyControllerService,
    StockControllerService,
    SupplierControllerService
  ],
})
export class ApiModule {
  static forRoot(customParams: ApiConfigurationInterface): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: {rootUrl: customParams.rootUrl}
        }
      ]
    }
  }
}
