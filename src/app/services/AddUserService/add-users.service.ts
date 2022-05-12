import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { addUsers } from '../../Models/models';
import { API_ENDPOINTS } from 'src/app/_util/global';
import { IShopStatusInterface, IShopUserEntity } from 'src/app/shared/interface/shop-user.interface';

@Injectable({
  providedIn: 'root',
})
export class AddUsersService {
  private _url = 'https://fitstar-backend.herokuapp.com/app/v1/users/all';

  constructor(private http: HttpClient) { }

  CreateNewUser(userData: any) {
    return this.http.post<any>(API_ENDPOINTS.userCreate, userData);
  }

  //getting User  data
  // getAllUser(): Observable<addUsers[]> {
  //   return this.http.get<addUsers[]>(this._url);
  // }

  getAllUser(limit: number, offset: number): Observable<any> {
    return this.http.get<any>(API_ENDPOINTS.userList + `${limit}/${offset}`);
  }

  //getting User data of Specfic Id
  getUserById(_id: any): Observable<addUsers[]> {
    return this.http.get<addUsers[]>(`${this._url}/${_id}`);
  }

  //getting User data of Specfic Id
  deleteUser(_id: any): Observable<addUsers[]> {
    return this.http.delete<addUsers[]>(`${API_ENDPOINTS.userDelete}/${_id}`);
  }

  updateUser(userObject: IShopUserEntity): Observable<IShopStatusInterface> {
    let body = { status: userObject.status }
    return this.http.put<IShopStatusInterface>(API_ENDPOINTS.userStatusUpdate + userObject._id, body).pipe(map((res: any) => {
      return res
    }))
  }
  getSearchResultByFilterRole (filterRole:string ,limit: number, offset: number) {
    console.log(filterRole);
    return this.http.get<any[]>(API_ENDPOINTS.filterSearch + filterRole+ `/${limit}/${offset}`).pipe(map((res: any) => {
      return res
    }))
  }
  getSearchResult(searchText: string,limit: number, offset: number) {
    console.log(searchText);
    return this.http.get<any[]>(API_ENDPOINTS.userSearch + searchText+ `/${limit}/${offset}`).pipe(map((res: any) => {
      return res
    }))
  }


  //Update User data
  // UpdateUser(_id: any): Observable<addUsers[]> {
  //   return this.http.put<addUsers[]>(`${this._url}/${_id}`);
  // }

  // UpdateUser(_id: any, data: any): Observable<any> {
  //   return this.http.put(`${this._url}/${_id}`, data);
  // }

  // Error Handling Funcation

}
