import { Component, OnInit, WritableSignal, computed, signal, Signal } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validator, Validators } from "@angular/forms";

import { ModalDismissReasons, NgbModal, NgbDateStruct, NgbCalendar, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { ColDef, GridApi } from "ag-grid-community";
import { DashboardService } from '../dashboard.service';
//import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'students-details-student-record',
  templateUrl: './student-record.component.html',
  styleUrl: './student-record.component.scss'
})
export class StudentRecordComponent implements OnInit {

  gridApi : any;

  studentDetailsForm : FormGroup;

  model! : NgbDateStruct

  today = this.calender.getToday();

  closeResult : any

  selectedRecords : any;

  apiResponse! : any ;

  studentRecordCount : WritableSignal<number> = signal(0)

  studentWarning : Signal<string> = computed(()=>
  {
		if(this.studentRecordCount() < 26){

			return `Student Count Is To Low!`;

		}else{

			return `Student Count Is Sufficient `;

		}
	}
  )

	constructor(
		private fb : FormBuilder,
		private modalService : NgbModal,
		private calender : NgbCalendar,
		private dashboardService : DashboardService,
		){
		this.studentDetailsForm = this.fb.group({
			name : this.fb.control("", [Validators.required] ),
			country : this.fb.control("", [Validators.required] ),
			state : this.fb.control("", [Validators.required] ),
			passportDeclaration : this.fb.control("", [Validators.required] ),
			fitnessDeclaration : this.fb.control("", [Validators.required] ),
			courseName : this.fb.control("", [Validators.required] ),
			subjects : this.fb.control("", [Validators.required] ),
			date : this.fb.control("", [Validators.required] ),
			city : this.fb.control("", [Validators.required] ),
			address2 : this.fb.control("", [Validators.required]),
			email : this.fb.control("", [Validators.required] ),
			zip : this.fb.control("", [Validators.required] ),
		})

	  }

	  ngOnInit(): void {
		this.dashboardService.getGetStudentDetailsRecords().subscribe(
			(res : any) =>{
				console.log("Api response in student record componet", res )
				this.apiResponse =res;
				this.studentRecordCount.set(this.apiResponse.length);
			}
		)
	  }


	

	columnDef : ColDef[] = [

		  {field :"name"},
		  {field :"country"},
		  {field :"state"},
		  {field :"passportDeclaration"},
		  {field :"fitnessDeclaration"},
		  {field :"courseName"},
		  {field :"subjects"},
		  {field :"date"},
		  {field :"city"},
		  {field :"studentImage"},
		  {field :"street"},
		  {field :"address2"},
		  {field :"zip"},
		  {field :"phone"},
		  {field :"email"},
		  {field :"website"}
	];

	onGridReady(params : any){

		this.gridApi = params?.api;
	  }

	  get nameControl () : FormControl {
		return this.studentDetailsForm.get("name") as FormControl;
	  }

	  get countryControl () : FormControl {
		return this.studentDetailsForm.get("country") as FormControl;
	  }

	  get stateControl () : FormControl {
		return this.studentDetailsForm.get("state") as FormControl;
	  }

	  get passportDeclarationControl () : FormControl {
		return this.studentDetailsForm.get("passportDeclaration") as FormControl;
	  }

	  get fitnessDeclarationControl () : FormControl {
		return this.studentDetailsForm.get("fitnessDeclaration") as FormControl;
	  }

	  get courseNameControl () : FormControl {
		return this.studentDetailsForm.get("courseName") as FormControl;
	  }

	  get subjectsControl () : FormControl {
		return this.studentDetailsForm.get("subjects") as FormControl;
	  }

	  get dateControl () : FormControl {
		return this.studentDetailsForm.get("date") as FormControl;
	  }

	  get cityControl () : FormControl {
		return this.studentDetailsForm.get("city") as FormControl;
	  }

	  get streetControl () : FormControl {
		return this.studentDetailsForm.get("address2") as FormControl;
	  }

	  get address2Control () : FormControl {
		return this.studentDetailsForm.get("address2") as FormControl;
	  }

	  get emailControl () : FormControl {
		return this.studentDetailsForm.get("email") as FormControl;
	  }

	  get zipControl () : FormControl {
		return this.studentDetailsForm.get("zip") as FormControl;
	  }
	  
	  

	 
	  open(content : any){
		this.studentDetailsForm.reset();
		this.modalService.open(content).result.then(
			(result) =>{
				const newRecord = this.studentDetailsForm.value;
				this.apiResponse.push({...newRecord});
				this.apiResponse = JSON.parse(JSON.stringify(this.apiResponse));
				this.studentRecordCount.set(this.apiResponse.length);

			},

			(reson) =>{

				//Dismiss
			}
		)
	  }

	  onOpenViewForm(studentForm : any){
		const selectedRow = this.gridApi?.getSelectedRows()[0];
		this.studentDetailsForm.patchValue(selectedRow);
		this.studentDetailsForm.disable();
		this.modalService.open(studentForm).result.then(
			(result) =>{
				this.studentDetailsForm.enable();
			},
			(reason) =>{
				this.closeResult =`Dismissed ${this.geDismissReason({reason})}`
				this.studentDetailsForm.enable();
			}
		)

	  }

	  private geDismissReason(reason : any) : string {
		if(reason === ModalDismissReasons.ESC){
			return 'Reason was escape press';
		}else if (reason === ModalDismissReasons.BACKDROP_CLICK){
			return 'Backdrop was clicked'
		}else{
			return `with ${reason}`
		}
	  }

	  onDeletedRecord(deleteTemplate : any){
		const selectedRecord = this.gridApi.getSelectedRows()[0];
		this.selectedRecords = selectedRecord;
		let newRespose : any = [];

		this.modalService.open(deleteTemplate).result.then(
			(result) =>{
				this.closeResult = `close ${this.geDismissReason({result})}`
				this.apiResponse.forEach(
					(rec : any ) => {
						if(rec.name !== selectedRecord.name){
							newRespose.push(rec);
						}
					}
				);
				this.apiResponse = [...newRespose]; 
				this.studentRecordCount.set(this.apiResponse.length);
			},
			(reason) =>{
				this.closeResult = `Dismissed ${this.geDismissReason({reason})}` 

			}
		)

	  }

	  clearSelection(): void {
		this.gridApi.deselectAll();
	}

	  checkIfSelected(): boolean {
		return this.gridApi?.getSelectedRows()?.length>=0;
	}
}
