import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NgbHighlight ,NgbDatepickerModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgGridModule } from 'ag-grid-angular';
import { StudentRecordComponent } from './student-record/student-record.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardService } from './dashboard.service';
import { HttpClientModule } from '@angular/common/http';
import { StudentMarksComponent } from './student-marks/student-marks.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard/landing',
        pathMatch: 'full',
      },
      {
        path: 'landing',
        component: LandingComponent,
      },
      {
        path: 'students',
        component: StudentRecordComponent,
      },
      {
        path: 'students-marks',
        component: StudentMarksComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    LandingComponent,
    SideBarComponent,
    StudentRecordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbHighlight,
    NgbDatepickerModule,
    NgbTypeaheadModule,
    AgGridModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],

  providers :[
    DashboardService,
  ]
})
export class DashboardModule {}
