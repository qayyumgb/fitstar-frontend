import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
// import {api_url} from 'src/app/shared/Utils/global';
// import {SharedService} from '../shared.service';
// import {AuthService} from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // if (!req.url.includes(API_ENDPOINTS.downloadFiles)) {
    //   this.sharedService.loaderSubject.next(true);
    // }

    // this.sharedService.loaderSubject.next(true);
    let accessToken = localStorage.getItem("token");

    return this.processRequestWithToken(accessToken as any, req, next).pipe(
      // finalize(() => {
      //   this.sharedService.loaderSubject.next(false);
      // }),
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';

        if (error.error instanceof ErrorEvent) {
          console.log('CLIENT Side Error');
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = `Error Code: ${error.status},  Message: ${error.message
            }, Possible Reason: ${(error.error && error.error['Error']) || 'Unknown'
            }`;
          if (error.status === 401) {
            // Logout Existing User
            // this.authorize.logout();
            alert('Your session has been expired. Please sign in again.');
          }
        }

        return throwError(errorMsg);
      })
    );
  }

  private processRequestWithToken(
    token: string,
    req: HttpRequest<any>,
    next: HttpHandler
  ) {
    debugger
    if (!!token) {
      // const tenant = this.authorize.getDecodedToken()?.CompanyName;
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        },
      });
    }

    return next.handle(req);
  }
}
