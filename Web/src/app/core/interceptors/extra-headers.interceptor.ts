import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgProgress } from 'ngx-progressbar';
import { SessionFinisherService } from '../../services/session/session-finisher.service';

@Injectable()
export class ExtraHeadersInterceptor implements HttpInterceptor {

  constructor(
    private progress$: NgProgress,
    private sessionFinisher$: SessionFinisherService,
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.sessionFinisher$.initializeChecker();
    this.progress$.ref().start();
    let newHeaders = request.headers;
    if (!(request.body instanceof FormData)) {
      newHeaders = request.headers.set('Content-Type', 'application/json');
    }
    newHeaders = newHeaders.append('Accept', 'application/json');

    return next.handle(
      request.clone({
        headers: newHeaders,
        withCredentials: !(request.url.includes('http://') || request.url.includes('https://'))
      })
    );
  }
}
