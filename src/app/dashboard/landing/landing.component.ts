import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl} from '@angular/forms';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'students-details-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss' , 
 //styleUrls : ['./landing.component.scss' , '../app.component.scss']
})
export class LandingComponent implements OnInit {

  filter: FormControl;

  students!: Array<any> ;

  constructor(
    private fb : FormBuilder , 
    private dashboardService : DashboardService
    ){
    this.filter = this.fb.control("",{nonNullable :true})
  }

  ngOnInit(): void {

    this.dashboardService.getGetStudentRecords().subscribe(
      (res :any) =>{
        this.students = res;
      }
    )
    
  }
}
