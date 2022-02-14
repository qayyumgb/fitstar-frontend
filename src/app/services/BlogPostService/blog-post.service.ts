import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { BlogPost } from '../../Models/models'

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  private createBlog = "https://fitstar-backend.herokuapp.com/app/v1/blogs/create";
  private getAllBlogs = "https://fitstar-backend.herokuapp.com/app/v1/blogs/get";
  private deleteblogs = "https://fitstar-backend.herokuapp.com/app/v1/blogs/delete";
  private updateBlog = "https://fitstar-backend.herokuapp.com/app/v1/blogs/update";

  constructor(private http: HttpClient) { }

  CreateNewUser(BlogPost: any) {
    return this.http.post<any[]>(this.createBlog, BlogPost).pipe(map((res: any) => {
      return res
    }), retry(1),
      catchError(this.handleError))

  }

  //getting User  data
  getAllUser(): Observable<any[]> {
    return this.http.get<any[]>(this.getAllBlogs);
  }

  //getting User data of Specfic Id
  // getUserById(_id: any): Observable<BlogPost[]> {
  //   return this.http.get<BlogPost[]>(`${this._url}/${_id}`);
  // }

  //getting User data of Specfic Id
  deleteUser(_id: any): Observable<any[]> {
    return this.http.delete<any[]>(`${this.deleteblogs}/${_id}`);
  }

  //Update User data
  // UpdateUser(_id: any): Observable<addUsers[]> {
  //   return this.http.put<addUsers[]>(`${this._url}/${_id}`);
  // }


  UpdateUser(_id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.updateBlog}/${_id}`, data);
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
