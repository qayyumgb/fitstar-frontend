import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import {Sponser} from '../../Models/models'
import { API_ENDPOINTS } from 'src/app/_util/global';



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

  private _CreateUrl="https://fitstar-backend.herokuapp.com/app/v1/sponsors/create";
  private _gettAllSponsors="https://fitstar-backend.herokuapp.com/app/v1/sponsors/get";
  private deleteSponsor="https://fitstar-backend.herokuapp.com/app/v1/sponsors/delete";



  constructor(private http:HttpClient) { }

  CreateNewUser(SponserData:any){
    return this.http.post <any[]>(API_ENDPOINTS.sponsorCreate,SponserData).pipe(map((res:any)=>{
      return res
    }),retry(1),
    catchError(this.handleError))

  }

  //getting User  data
getAllSponser(limit:number,offset:number): Observable<any> {
  console.log(API_ENDPOINTS.sponsorList)
  return this.http.get<any>(API_ENDPOINTS.sponsorList+`${limit}/${offset}`);
}

//getting User data of Specfic Id
getUserById(_id: any): Observable<Sponser[]> {
  return this.http.get<Sponser[]>(`${this.deleteSponsor}/${_id}`);
}

//getting User data of Specfic Id
deleteUser(_id: any): Observable<any> {
  return this.http.delete<any>(`${this.deleteSponsor}/${_id}`);
}

//Update User data
// UpdateUser(_id: any): Observable<addUsers[]> {
//   return this.http.put<addUsers[]>(`${this._CreateUrl}/${_id}`);
// }


UpdateUser(_id: any, data: any): Observable<any> {
  return this.http.put<Sponser[]>(`${this._CreateUrl}/${_id}`, data);
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
