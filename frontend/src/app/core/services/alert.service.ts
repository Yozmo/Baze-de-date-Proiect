import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({ providedIn: 'root' })
export class AlertService {

  constructor(
    private snackBar: MatSnackBar,
    private zone: NgZone
  ) { }

  success(message: string) {
    this.zone.run(() => {
      this.snackBar.open(message, 'Close', {
        duration: 4000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
    });
  }

  error(message: string) {
    this.zone.run(() => {
      this.snackBar.open(message, 'Close', {
        duration: 10000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
    });
  }
}
