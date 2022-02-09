import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import {Sponser} from '../../Models/models'

var token =localStorage.token;
var headers_object = new HttpHeaders({
  'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Authorization': 'Bearer '+token,

  });

    const httpOptions = {
      headers: headers_object
    };

@Injectable({
  providedIn: 'root'
})

export class SponserService {

  private _url="http://localhost:3000/app/v1/sponsors/create";



  constructor(private http:HttpClient) { }

  CreateNewUser(SponserData:any){
    return this.http.post <any[]>(this._url,SponserData,httpOptions).pipe(map((res:any)=>{
      return res
    }),retry(1),
    catchError(this.handleError))

  }

  //getting User  data
getAllUser(): Observable<Sponser[]> {
  return this.http.get<Sponser[]>(this._url);
}

//getting User data of Specfic Id
getUserById(_id: any): Observable<Sponser[]> {
  return this.http.get<Sponser[]>(`${this._url}/${_id}`);
}

//getting User data of Specfic Id
deleteUser(_id: any): Observable<Sponser[]> {
  return this.http.delete<Sponser[]>(`${this._url}/${_id}`);
}

//Update User data
// UpdateUser(_id: any): Observable<addUsers[]> {
//   return this.http.put<addUsers[]>(`${this._url}/${_id}`);
// }


UpdateUser(_id: any, data: any): Observable<any> {
  return this.http.put<Sponser[]>(`${this._url}/${_id}`, data);
}



   // Error Handling Funcation
   handleError(error:any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(` Error From Handeler: ${errorMessage}`);

    return throwError(errorMessage);
}





}
