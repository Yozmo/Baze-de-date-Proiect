import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
})
export class NavItemComponent {
  @Input() icon = '';
  @Input() hint = '';
  @Input() link: string | any[] = '/';
  @Output() navigate = new EventEmitter();

  emitNavigate(event, rla) {
    if (rla.isActive) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.navigate.emit();
  }
}
