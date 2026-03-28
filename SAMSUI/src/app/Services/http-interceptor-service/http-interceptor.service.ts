import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { map, filter, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CommonService } from '../common-service/common.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  static loaderStatus: number = 0;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    HttpInterceptorService.loaderStatus = HttpInterceptorService.loaderStatus+ 1;
    return next.handle(req).pipe(
      tap((ev: HttpEvent<any>) => {
         if(ev instanceof HttpErrorResponse) {
           this.commonService.openToastErrorMessage(this.samsConstants.serverError);
         }
      })  
    );
  }

  constructor(private commonService: CommonService,
              private samsConstants: AssetOptimaConstants) { }
  
}
