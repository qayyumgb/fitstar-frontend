import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { GarphChartComponent } from './monthly Register User-chart/garph-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LatestUserTableComponent } from './latest-user-table/latest-user-table.component';
import {TableModule} from 'primeng/table';
import { PieChartComponent } from './reports/pie-chart/pie-chart.component';


@NgModule({
  declarations: [
    DashboardMainComponent,
    GarphChartComponent,
    LatestUserTableComponent,
    PieChartComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgApexchartsModule,
    TableModule



  ]
})
export class DashboardModule { }
