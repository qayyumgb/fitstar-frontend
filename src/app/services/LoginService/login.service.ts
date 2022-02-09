import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class LoginService {


  constructor(private http: HttpClient) { }


  LoginUser(UserData: any) {
    let _loginUrl = "https://fitstar-backend.herokuapp.com/app/v1/auth/signin"
    return this.http.post<any>(_loginUrl, UserData).pipe(map((res: any) => {
      return res
    }), retry(3),
      catchError(this.handleError))

  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `${error.message}`;
    } else {
      // server-side error
      errorMessage = ` ${error.error.message} `;
    }
    console.log(` Error From Handeler: ${errorMessage}`);

    return throwError(errorMessage);
  }
}