import { Component, OnInit, ViewChild } from '@angular/core';
import {userData} from '../../../userData/userData'
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexFill
} from "ng-apexcharts";

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
  styleUrls: ['./garph-chart.component.scss']
})
export class GarphChartComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions !: Partial<ChartOptions> |any;




constructor() {
  this.chartOptions = {
    series: [
      {
        name: "users",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148,219,33,112]
      }
    ],
    chart: {
      // height: 614.1,
      // width:500,
      type: "bar"
    },
    title: {
      text: "Monthly Register User"
    },
    fill:{
      colors:['#191431']
    },
    xaxis: {
      categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep","Oct","Nov","Dec"]
    }
  };
}


  ngOnInit(): void {
  }

}
