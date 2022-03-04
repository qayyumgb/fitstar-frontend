import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, } from 'rxjs';
import { API_ENDPOINTS, API_URL } from 'src/app/_util/global';
import { basicInfo, login, OTP, verfyPhoneDTO } from 'src/app/AuthInterface/auth.interface';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private toastr: ToastrService, private http: HttpClient, private router: Router) { }

  private getPhoneNumber = new BehaviorSubject<string>('');
  getPhoneNumber$: Observable<any> = this.getPhoneNumber.asObservable();


  verifyPhone(data: verfyPhoneDTO): Observable<any> {
    let url = API_URL + API_ENDPOINTS.verifyPhone;
    return this.http.post(url, data);

  }
  verifyOTP(data: OTP): Observable<any> {
    let url = API_URL + API_ENDPOINTS.verifyOtp;
    return this.http.post(url, data);

  }

  Login(data: login): Observable<any> {
    let url = API_URL + API_ENDPOINTS.loginUser;
    return this.http.post(url, data)


  }

  setPhoneNumber(option: string) {
    this.getPhoneNumber.next(option);
    this.router.navigate(['Auth/verifyOTP']);
  }

  getSignUpData(regValues: basicInfo): Observable<any> {
    let url = API_URL + API_ENDPOINTS.signUp;
    return this.http.post(url, regValues);
  }

  public isAuthenticated(): boolean | null | '' {
    let accessToken = this.getAccessToken();
    return accessToken && accessToken.length > 0;
  }

  // Clears the token
  async logout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }

  public getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }
  public setAccessToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }


}
