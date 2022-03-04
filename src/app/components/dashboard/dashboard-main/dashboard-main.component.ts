import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType, ChartDataset, Color } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AddUsersService } from 'src/app/services/AddUserService/add-users.service';
import { BlogPostService } from 'src/app/services/BlogPostService/blog-post.service';
import { IAmbassadors } from 'src/app/shared/interface/ambassador.interface';
import { IBlog } from 'src/app/shared/interface/BlogPost.interface';
import { IShopUser } from 'src/app/shared/interface/shop-user.interface';
import { ISponsorEntity } from 'src/app/shared/interface/sponsor.interface';
import { AbbassadorService } from './../../../services/AbbassadorService/abbassador.service';
import { SponserService } from './../../../services/SponserService/sponser.service';
@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {
  blogCount: number = 0;
  userCount: number = 0;
  ambassadorCount: number = 0;
  sponsorCount: number = 0
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [180, 480, 770, 90, 1000, 270, 400],
        label: 'Series C',
        yAxisID: 'y-axis-1',
        backgroundColor: 'rgba(255,0,0,0)',
        borderColor: '#ff1a1a',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
      {
        position: 'left',
      },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0)',
        },
        ticks: {
          color: 'rgba(255,0,0,0)'
        }
      }
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @ViewChild(BaseChartDirective) Barchart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },

  };
  public barChartType: ChartType = 'bar';


  public barChartData: ChartData<'bar'> = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ]
  };
  constructor(private userService: AddUsersService,
    private blogService: BlogPostService, private ambassadorService: AbbassadorService, private sponsorService: SponserService) { }

  ngOnInit(): void {
    this.blogService.getAllBlog(1, 1).subscribe((res: IBlog) => {
      this.blogCount = res.totalRecord;
    })
    this.userService.getAllUser(1, 1).subscribe((res: IShopUser) => {
      this.userCount = res.totalRecord;
    })
    this.ambassadorService.getAllAmbassador(1, 1).subscribe((data: IAmbassadors) => {
      this.ambassadorCount = data.totalRecord
    }
    );

    this.sponsorService.getAllSponser(1, 1).subscribe(
      (data: ISponsorEntity) => {
        this.sponsorCount = data.totalRecord;


      },
    );


  }

}
