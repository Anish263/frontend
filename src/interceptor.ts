import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class interceptor implements HttpInterceptor {
    constructor () {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log("uuuu")
    request = request.clone({
        headers: request.headers.set('Access-Control-Allow-Origin', '*').set('Cache-Control', 'no-cache')
      });
    return next.handle(request);
    }

}