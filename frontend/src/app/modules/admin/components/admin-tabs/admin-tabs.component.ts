import {Component, Input, OnInit} from '@angular/core';
import {Tab} from "../../models/project.model";

@Component({
  selector: 'admin-tabs',
  templateUrl: './admin-tabs.component.html',
  styleUrls: ['./admin-tabs.component.scss']
})
export class AdminTabsComponent implements OnInit {

  @Input() tabs: Array<Tab>;
  @Input() display: string;

  public tabsDefault: Array<Tab> = [
    { routerLink: ['/admin', 'pharmacies'], name: 'Farmacii' },
    { routerLink: ['/admin', 'accounts'], name: 'Membri' },
    { routerLink: ['/admin', 'drugs'], name: 'Medicamente' }
  ]

  ngOnInit() {
    if (!this.tabs) {
      this.tabs = this.tabsDefault;
    }
  }

}
