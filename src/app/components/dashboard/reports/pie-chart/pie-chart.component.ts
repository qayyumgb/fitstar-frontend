import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};



@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})


export class PieChartComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions !: Partial<ChartOptions> |any;

  constructor() {
    this.chartOptions = {
      series: [44, 55, 43,12],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Anriod", "Web-App", "IOS", "others"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  ngOnInit(): void {
  }

}
