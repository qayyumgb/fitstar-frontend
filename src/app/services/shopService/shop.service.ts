import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shopInfo } from 'src/app/globalInterface/global.interface';
import { userlist } from '../../components/shop/userList';
@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }



  createShop(data: shopInfo): Observable<any> {
    let url = 'https://kwk-inventory.herokuapp.com/app/v1/inventory/shop/create';
    return this.http.post(url, data);

  }

  getCustomersLarge() {
    return this.http.get<any>('assets/userList.json')
      .toPromise()
      .then(res => <userlist[]>res.data)
      .then(data => { return data; });
  }
  getAmbassadorList() {
    return this.http.get<any>('assets/ambassadorList.json')
      .toPromise()
      .then(res => <userlist[]>res.data)
      .then(data => { return data; });
  }



}
