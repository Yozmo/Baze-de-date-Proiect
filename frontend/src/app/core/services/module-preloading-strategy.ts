import { PreloadingStrategy, Route } from '@angular/router';
import { EMPTY, Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

export class ModulePreloadingStrategy implements PreloadingStrategy {

  public preload(route: Route, load: () => Observable<any>): Observable<any> {

    if (isNullOrUndefined(route.data) || !route.data.preload) {
      return EMPTY;
    }

    return timer(!isNullOrUndefined(route.data.delay) ? route.data.delay : 500).pipe(switchMap(() => load()));
  }
}
