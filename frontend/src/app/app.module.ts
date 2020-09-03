import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './core/constainers/app/app.component';
import {CoreModule} from "./core/core.module";
import {HttpClientModule} from "@angular/common/http";
import {AuthModule} from "./modules/auth/auth.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ModulePreloadingStrategy} from "./core/services/module-preloading-strategy";
import {StateModule} from "./state/app-state.module";

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StateModule,
    CoreModule,
  ],
  providers: [
    ModulePreloadingStrategy
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
