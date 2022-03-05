import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { BlogPost } from '../../Models/models'
import { API_ENDPOINTS } from 'src/app/_util/global';
import { CreateUpdateBlogPost, IBlog } from 'src/app/shared/interface/BlogPost.interface';


@Injectable({
  providedIn: 'root'
})
export class BlogPostService {



  constructor(private http: HttpClient) { }

  CreateNewUser(BlogPost: any) {
    return this.http.post<any[]>(API_ENDPOINTS.blogCreate, BlogPost).pipe(map((res: any) => {
      return res
    }))

  }

  //getting all data
  getAllBlog(limit: number, offset: number): Observable<IBlog> {
    console.log(API_ENDPOINTS.ambassadorList)
    return this.http.get<IBlog>(API_ENDPOINTS.blogList + `${limit}/${offset}`);
  }


  deleteUser(_id: any): Observable<any[]> {
    return this.http.delete<any[]>(`${API_ENDPOINTS.blogDelete}/${_id}`);
  }

  UpdateUser(_id: any, data: any): Observable<any> {
    return this.http.put<any>(`${API_ENDPOINTS.blogUpdate}/${_id}`, data);
  }


  getSearchResult(searchText: any) {
    return this.http.get<any[]>(API_ENDPOINTS.blogSearch + searchText).pipe(map((res: any) => {
      return res
    }))
  }


  updateBlogPost(data: CreateUpdateBlogPost) {
    return this.http.put<any[]>(API_ENDPOINTS.blogUpdate + data._id, data).pipe(map((res: any) => {
      return res
    }))
  }









}
