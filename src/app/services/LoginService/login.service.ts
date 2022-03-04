import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { API_ENDPOINTS } from 'src/app/_util/global';
import { IUserData } from './../../shared/interface/auth.interface';

@Injectable({
  providedIn: 'root'
})


export class LoginService {


  constructor(private http: HttpClient) { }


  loginUser(UserData: any): Observable<IUserData> {
    return this.http.post<any>(API_ENDPOINTS.loginUser, UserData).pipe(map((res: IUserData) => {
      return res
    }))

  }
}
