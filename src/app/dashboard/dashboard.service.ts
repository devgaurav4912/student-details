import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({

    providedIn: 'root',
})

export class DashboardService{

    constructor(
        private http : HttpClient,
    ){ }

    getGetStudentRecords() : Observable<any> {
        return this.http.get("/api/students");
    }

    getGetStudentDetailsRecords() : Observable<any> {
        return this.http.get("/api/student-details");
    }

    getGetStudentAddressRecords() : Observable<any> {
        return this.http.get("/api/students");
    }

    getStudentMarksRecords() : Observable<any> {
        return this.http.get("/api/studentsMarks");
    }

}