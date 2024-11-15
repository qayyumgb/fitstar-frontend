import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { BlogPost } from '../../Models/models'

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  private _url = "https://fitstar-backend.herokuapp.com/app/v1/blogs/create";

  constructor(private http: HttpClient) { }

  CreateNewUser(BlogPost: any) {
    return this.http.post<any[]>(this._url, BlogPost).pipe(map((res: any) => {
      return res
    }), retry(1),
      catchError(this.handleError))

  }

  //getting User  data
  getAllUser(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(this._url);
  }

  //getting User data of Specfic Id
  getUserById(_id: any): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this._url}/${_id}`);
  }

  //getting User data of Specfic Id
  deleteUser(_id: any): Observable<BlogPost[]> {
    return this.http.delete<BlogPost[]>(`${this._url}/${_id}`);
  }

  //Update User data
  // UpdateUser(_id: any): Observable<addUsers[]> {
  //   return this.http.put<addUsers[]>(`${this._url}/${_id}`);
  // }


  UpdateUser(_id: any, data: any): Observable<any> {
    return this.http.put<BlogPost[]>(`${this._url}/${_id}`, data);
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
