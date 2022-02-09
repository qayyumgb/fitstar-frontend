import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class SiginService {
  private Url="localhost:3000/app/v1/auth/signup"

  constructor(private http:HttpClient) { }

  RegisterUser(UserData:any){
    return this.http.post <any>(this.Url,UserData).pipe(map((res:any)=>{
      return res
    }),retry(1),
    catchError(this.handleError))

  }


  // Error Handling Funcation
  handleError(err:any) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = ` Client Error: ${err.error.message}`;
    } else {
        // server-side error
        errorMessage = `${err.error.message} `;
    }
    console.log(` Error From Handeler: ${errorMessage}`);

    return throwError(errorMessage);
}

}
