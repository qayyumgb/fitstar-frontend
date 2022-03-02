import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { BlogPost } from '../../Models/models'
import { API_ENDPOINTS } from 'src/app/_util/global';
import { CreateUpdateBlogPost } from 'src/app/shared/interface/BlogPost.interface';


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
    return this.http.post<any[]>(API_ENDPOINTS.blogCreate, BlogPost).pipe(map((res: any) => {
      return res
    }), retry(1),
      catchError(this.handleError))

  }

//getting all data
getAllBlog(limit:number,offset:number): Observable<any[]> {
  console.log(API_ENDPOINTS.ambassadorList)
  return this.http.get<any[]>(API_ENDPOINTS.blogList+`${limit}/${offset}`);
}

  //getting User data of Specfic Id
  // getUserById(_id: any): Observable<BlogPost[]> {
  //   return this.http.get<BlogPost[]>(`${this._url}/${_id}`);
  // }

  //getting User data of Specfic Id
  deleteUser(_id: any): Observable<any[]> {
    return this.http.delete<any[]>(`${API_ENDPOINTS.blogDelete}/${_id}`);
  }

  //Update User data
  // UpdateUser(_id: any): Observable<addUsers[]> {
  //   return this.http.put<addUsers[]>(`${this._url}/${_id}`);
  // }


  UpdateUser(_id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.updateBlog}/${_id}`, data);
  }


  getSearchResult(searchText: string) {
    return this.http.get<any[]>(API_ENDPOINTS.blogSearch + searchText).pipe(map((res: any) => {
      return res
    }), retry(1),
      catchError(this.handleError))
  }


  updateBlogPost(data: CreateUpdateBlogPost) {
    return this.http.put<any[]>(API_ENDPOINTS.blogUpdate + data._id, data).pipe(map((res: any) => {
      return res
    }), retry(1),
      catchError(this.handleError))
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
