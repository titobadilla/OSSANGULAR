import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse, HttpEvent} from '@angular/common/http';

import { Router } from '@angular/router';
import { tap} from 'rxjs/operators';
import { TokenStorage } from '../helper/token-storage';
import { Observable } from 'rxjs';


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private token: TokenStorage, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

    let authReq = request;
    let tokenV=this.token.getToken();
    if (tokenV != null) {
       authReq = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' +tokenV)});
    }
return next.handle(authReq)
.pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
 
        // http response status code
       // console.log(event.status);
      }
    }, error => {
           // http response status code
           if (error.status === 401) {
            this.router.navigate(['login']);
            //this.token.signOutSystem();
          }
        
    }))

  }

}