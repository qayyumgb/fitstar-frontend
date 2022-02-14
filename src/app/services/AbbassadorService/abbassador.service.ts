
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Abbassador } from '../../Models/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AbbassadorService {
  private createAbbassador =
    'https://fitstar-backend.herokuapp.com/app/v1/ambassadors/create';
    private deleteAbbassador =
    'https://fitstar-backend.herokuapp.com/app/v1/ambassadors/delete';
    private GetAllAbbassador =
    'https://fitstar-backend.herokuapp.com/app/v1/ambassadors/get';
    private UpdateAbbassador =
    'https://fitstar-backend.herokuapp.com/app/v1/ambassadors/update';

  constructor(private http: HttpClient) {}

  CreateNewUser(AbbassadorData: any) {
    return this.http.post<any[]>(this.createAbbassador, AbbassadorData).pipe(
      map((res: any) => {
        return res;
      }),
      retry(1),
      catchError(this.handleError)
    );
  }

  //getting User  data
  getAllUser(): Observable<any> {
    return this.http.get<any>(this.GetAllAbbassador);
  }



  //getting User data of Specfic Id
  deleteUser(_id: any): Observable<Abbassador[]> {
    return this.http.delete<Abbassador[]>(`${this.deleteAbbassador}/${_id}`);
  }

  //Update User data
  // UpdateUser(_id: any): Observable<addUsers[]> {
  //   return this.http.put<addUsers[]>(`${this._url}/${_id}`);
  // }

  UpdateUser(_id: any, data: any): Observable<any> {
    return this.http.put<any[]>(`${this.UpdateAbbassador}/${_id}`, data);
  }

  update(id:any, post:any): Observable<any> {

    return this.http.put(this.UpdateAbbassador + id, JSON.stringify(post))
    .pipe(
      catchError(this.handleError)
    )
  }

  // Error Handling Funcation
  handleError(error: any) {
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
