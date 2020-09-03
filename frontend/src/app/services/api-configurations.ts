/* tslint:disable */
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const LOCALHOST = 'localhost';
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  get rootUrl(): string {
    return `${location.protocol}//${location.hostname}${location.port && location.hostname !== LOCALHOST ? (':' + location.port) : ''}${location.hostname === LOCALHOST ? `:${environment.port}` : ''}`;
  }
}
