import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Data } from 'src/app/shared/interface/landingPage.interface';
import { API_ENDPOINTS, API_URL } from 'src/app/_util/global';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {

  private createUrl = "https://fitstar-backend.herokuapp.com/app/v1/landingpage/create";

  constructor(private http: HttpClient) { }

  CreateNewUser(CollaboratorsData: any) {
    return this.http.post<any[]>(this.createUrl, CollaboratorsData).pipe(map((res: any) => {
      return res
    }), retry(1),
      catchError(this.handleError))
  }

  getLandingPage() {
    return this.http.get<any[]>(API_ENDPOINTS.getLandingPage).pipe(map((res: any) => {
      return res
    }), retry(1),
      catchError(this.handleError))
  }

  updateLandingPage(data: Data) {
    let body = {
      socialAccountDetails: data.socialAccountDetails,
      aboutPageDetails: data.aboutPageDetails,
      privacyDetails: data.privacyDetails,
      footerDetails: data.footerDetails,
      termConditions: data.termConditions,
      landingPage: data.landingPage
    }
    return this.http.put<any[]>(API_ENDPOINTS.updateLandingPAge + data._id, body).pipe(map((res: any) => {
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
