import { Component } from '@angular/core';
import { delay } from 'rxjs/operators';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FitStar';
  isLoading: boolean = false;

  constructor(
    private sharedService: SharedService,
  ) {
  }


  ngOnInit() {
    this.sharedService.loaderSubject.pipe(delay(0)).subscribe((res) => {
      this.isLoading = res;
    });
  }

}
