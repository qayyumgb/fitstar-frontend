import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import {Collaborators} from '../../Models/models'

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  private createUrl="https://fitstar-backend.herokuapp.com/app/v1/collaborators/create";

  constructor(private http:HttpClient) { }

  CreateNewUser(CollaboratorsData:any){
    return this.http.post <any[]>(this.createUrl,CollaboratorsData).pipe(map((res:any)=>{
      return res
    }),retry(1),
    catchError(this.handleError))

  }

  //getting User  data
getAllUser(): Observable<Collaborators[]> {
  return this.http.get<Collaborators[]>(this.createUrl);
}

//getting User data of Specfic Id
getUserById(_id: any): Observable<Collaborators[]> {
  return this.http.get<Collaborators[]>(`${this.createUrl}/${_id}`);
}

//getting User data of Specfic Id
deleteUser(_id: any): Observable<Collaborators[]> {
  return this.http.delete<Collaborators[]>(`${this.createUrl}/${_id}`);
}

//Update User data
// UpdateUser(_id: any): Observable<addUsers[]> {
//   return this.http.put<addUsers[]>(`${this.createUrl}/${_id}`);
// }


UpdateUser(_id: any, data: any): Observable<any> {
  return this.http.put<Collaborators[]>(`${this.createUrl}/${_id}`, data);
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
