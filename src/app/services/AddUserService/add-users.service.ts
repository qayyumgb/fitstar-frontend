import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import {addUsers} from '../../Models/models'

@Injectable({
  providedIn: 'root'
})
export class AddUsersService {

  private _url="https://fitstar-backend.herokuapp.com/adduser/app/v1/get";
  private _CreateUrl="https://fitstar-backend.herokuapp.com/adduser/app/v1/create";


  constructor(private http:HttpClient) { }


  CreateNewUser(userData:any){
    return this.http.post <any[]>(this._CreateUrl,userData).pipe(map((res:any)=>{
      return res
    }),retry(1),
    catchError(this.handleError))

  }

  //getting User  data
getAllUser(): Observable<addUsers[]> {
  return this.http.get<addUsers[]>(this._url);
}

//getting User data of Specfic Id
getUserById(_id: any): Observable<addUsers[]> {
  return this.http.get<addUsers[]>(`${this._url}/${_id}`);
}

//getting User data of Specfic Id
deleteUser(_id: any): Observable<addUsers[]> {
  return this.http.delete<addUsers[]>(`${this._url}/${_id}`);
}

//Update User data
// UpdateUser(_id: any): Observable<addUsers[]> {
//   return this.http.put<addUsers[]>(`${this._url}/${_id}`);
// }


UpdateUser(_id: any, data: any): Observable<any> {
  return this.http.put(`${this._url}/${_id}`, data);
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
