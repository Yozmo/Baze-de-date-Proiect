import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-user-controls',
  templateUrl: './user-controls.component.html',
  styleUrls: ['./user-controls.component.scss'],
})
export class UserControlsComponent {
  @Output() logout = new EventEmitter();
  @Output() editProfile = new EventEmitter();
}
