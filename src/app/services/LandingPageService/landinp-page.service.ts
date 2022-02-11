import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LandinpPageService {

  private createUrl="https://fitstar-backend.herokuapp.com/app/v1/landingpage/create";

  constructor(private http:HttpClient) { }

  CreateNewUser(CollaboratorsData:any){
    return this.http.post <any[]>(this.createUrl,CollaboratorsData).pipe(map((res:any)=>{
      return res
    }),retry(1),
    catchError(this.handleError))

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
