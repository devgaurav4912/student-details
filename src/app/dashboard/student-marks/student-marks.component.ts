import { Component } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { SubjectsDetailsComponent } from '../subjects-details/subjects-details.component';

@Component({
  selector: 'students-details-student-marks',
  standalone: true,
  imports: [SubjectsDetailsComponent],
  templateUrl: './student-marks.component.html',
  styleUrl: './student-marks.component.scss'
})
export class StudentMarksComponent { //parent componet

  studentsMarksList : any;

  selectedRecords : any = [];

  physicsList : any = [];
  chemistryList : any = [];
  mathsList : any = [];
  computorList : any = [];

  fontSize = 25;

  constructor(
    private dashboardService : DashboardService
  ){

    this.dashboardService.getStudentMarksRecords().subscribe(
      (res :any)=>{
        this.studentsMarksList =res;
        this.getDistincSubjects();

    })
  }

  getDistincSubjects() : void{
    this.studentsMarksList.forEach(
      (rec :any )=>{
        if(rec.physics){
          this.physicsList.push(rec);
        }

        if(rec.maths){
          this.mathsList.push(rec);
        }

        if(rec.chemistry){
          this.chemistryList.push(rec);
        }

        if(rec.computor){
          this.computorList.push(rec);
        }

      }
    )
  }
  onClick( List : Array<any>) : void{
    this.selectedRecords =List;
  }

  onIncrease() : void{
    this.fontSize++;
  }

  onReduce() : void{
    this.fontSize--;
  }
}
