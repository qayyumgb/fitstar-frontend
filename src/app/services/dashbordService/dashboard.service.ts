import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IDashboardCounter, IDashboardLatestUser } from 'src/app/shared/interface/dashboard.interface';
import { API_ENDPOINTS } from 'src/app/_util/global';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }


  getDashboardCount(): Observable<IDashboardCounter> {
    return this.http.get<IDashboardCounter>(API_ENDPOINTS.dashboardCard)
  }


  getDashboardLatestUser(): Observable<IDashboardLatestUser> {
    return this.http.get<IDashboardLatestUser>(API_ENDPOINTS.dashboardLatestUser)
  }

}
