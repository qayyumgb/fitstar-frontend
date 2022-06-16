import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashbordService/dashboard.service';
import { IDashboardLatestUser, LatestUser } from 'src/app/shared/interface/dashboard.interface';

@Component({
  selector: 'app-latest-user-table',
  templateUrl: './latest-user-table.component.html',
  styleUrls: ['./latest-user-table.component.scss']
})
export class LatestUserTableComponent implements OnInit {
  latestUsers: LatestUser[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getDashboardLatestUser().subscribe((res: IDashboardLatestUser) => {
      this.latestUsers = res.latestUsers;
      console.log(this.latestUsers)
    })
  }

}
