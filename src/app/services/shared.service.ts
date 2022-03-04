import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  loaderSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }
}
