import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyinterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    let token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    let lang = localStorage.getItem("lang") ? localStorage.getItem("lang") : "zh";
    let identityId = localStorage.getItem("identityid") ? localStorage.getItem("identityid") : "";
    let userId = localStorage.getItem("user_id") ? localStorage.getItem("user_id") : "";
    return next.handle(req.clone({ headers: req.headers.set('Authorization', token).append("lang", lang).append("identityId", identityId).append("userId", userId) }));
  }
  constructor() { }
}
