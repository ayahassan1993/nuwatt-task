import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, finalize, map, Observable, throwError } from 'rxjs';
import { LoadingService } from '../../shared/services/loading.service';
import { inject } from '@angular/core';

export const HttpConfigInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  let requestCount = 0;
  const loadingService = inject(LoadingService);
  const url = 'https://fakestoreapi.com';
  loadingService.shaowSpinner();
  requestCount++;
  let headers: HttpHeaders = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
  });

  request = request.clone({
    headers: headers,
    url: `${url}/${request.url}`,
  });

  return next(request).pipe(
    map((event: any) => {
      return event;
    }),
    catchError((error: HttpErrorResponse) => {
      loadingService.hideSpinner();
      return throwError(() => error);
    }),
    finalize(() => {
      requestCount--;
      requestCount == 0 ? loadingService.hideSpinner() : null;
    })
  );
};
