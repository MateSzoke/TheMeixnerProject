import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ResultsService, StudentResponse} from "../../../swagger-api";

@Component({
  selector: 'app-user-results',
  templateUrl: './user-results.component.html',
  styleUrls: ['./user-results.component.scss']
})
export class UserResultsComponent implements OnInit {

  studentLoaded: boolean = false
  student: StudentResponse
  userId: number

  constructor(
    private route: ActivatedRoute,
    private resultsService: ResultsService
  ) {
  }

  ngOnInit(): void {
    const params = this.route.snapshot.paramMap
    this.userId = Number.parseInt(params.get("userId"))
    this.resultsService.getStudentByIdUsingGET(this.userId).subscribe(student => {
      this.student = student
      this.studentLoaded = true
      console.log(this.student)
    })
  }

}
