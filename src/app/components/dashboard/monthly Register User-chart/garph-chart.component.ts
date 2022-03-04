import { Component, OnInit, ViewChild } from '@angular/core';
import { userData } from '../../../userData/userData';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexFill,
} from 'ng-apexcharts';
import { DashboardService } from 'src/app/services/dashbordService/dashboard.service';
import { IDashboardGraphData } from 'src/app/shared/interface/dashboard.interface';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  fill: ApexFill;
};

@Component({
  selector: 'app-garph-chart',
  templateUrl: './garph-chart.component.html',
  styleUrls: ['./garph-chart.component.scss'],
})
export class GarphChartComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;

  constructor(private dashboardService: DashboardService) {
    this.dashboardService.getDashboardGraphData().subscribe((res: any) => {
      this.chartOptions = {
        series: [
          {
            name: 'users',
            data: res.data,
          },
        ],
        chart: {
          height: 350.48,
          // width:500,
          type: 'bar',
        },
        title: {
          text: 'Monthly Register User',
        },
        fill: {
          colors: ['#191431'],
        },
        xaxis: {
          categories: res.labels,
        },
      };
    });
  }

  ngOnInit(): void {}
}
