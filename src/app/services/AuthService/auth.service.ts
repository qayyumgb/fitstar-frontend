import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, } from 'rxjs';
import { API_ENDPOINTS, API_URL } from 'src/app/_util/global';
import { basicInfo, login, OTP, verfyPhoneDTO } from 'src/app/AuthInterface/auth.interface';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }
  private getPhoneNumber = new BehaviorSubject<string>('');
  getPhoneNumber$: Observable<any> = this.getPhoneNumber.asObservable();


  verifyPhone(data: verfyPhoneDTO): Observable<any> {
    // let url = `http://192.168.8.100:3000/app/v1/auth/signup`;
    let url = API_URL + API_ENDPOINTS.verifyPhone;
    return this.http.post(url, data);

  }
  verifyOTP(data: OTP): Observable<any> {
    let url = API_URL + API_ENDPOINTS.verifyOtp;
    return this.http.post(url, data);

  }

  Login(data: login): Observable<any> {
    // let url = `http://192.168.8.100:3000/app/v1/auth/signin`;
    let url = API_URL + API_ENDPOINTS.loginUser;


    return this.http.post(url, data)


  }
  // get headerSelectedOption() {
  //   return this.getPhoneNumber.asObservable();
  // }
  setPhoneNumber(option: string) {
    this.getPhoneNumber.next(option);
    this.router.navigate(['Auth/verifyOTP']);
  }

  getSignUpData(regValues: basicInfo): Observable<any> {
    // let url = `http://192.168.8.100:3000/app/v1/auth/basic/info`;
    let url = API_URL + API_ENDPOINTS.signUp;
    return this.http.post(url, regValues);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }


  getToken() {
    return localStorage.getItem('token')
  }

  isLoggedIn(): any {


    if (this.getToken() !== null || this.getToken() !== undefined) {
      return this.getToken() !== null;
    }
    else {
      console.log('logic pass gi')
      return true
    }


  }


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}
