import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppComponent} from "./constainers/app/app.component";
import { NotFoundPageComponent } from './constainers/not-found-page/not-found-page.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavItemComponent } from './components/nav-item/nav-item.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { UserControlsComponent } from './components/user-controls/user-controls.component';
import {MaterialModule} from "../material";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AlertService} from "./services/alert.service";
import {PhoneDirective} from "./directives/phone.directive";

export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent,
  LayoutComponent,
  NavItemComponent,
  ToolbarComponent,
  UserControlsComponent,
  PhoneDirective,
]

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: COMPONENTS,
  providers: [
    AlertService,
  ],
  exports: COMPONENTS
})
export class CoreModule { }
