import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Student } from '../student';
import { Students } from '../students';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  config: any;
  collection = { count: 60, data: [] };

  angForm: FormGroup;
  userdata;
  fetchedData: Student[] = [];
  single_student_data: Student = new Students();
  obj_s: Student = new Students();
  currentIndex = -1;
  page = 1;
  count = 60;
  currentpageSize = 5;
  //pageSizes = [3, 6, 9];
  offset: any;
  searchKey = ' ';
  totalvalue;
  name: any;

  showID: boolean = true;
  showName: boolean = true;
  showGender: boolean = true;
  showStream: boolean = true;
  showMarks: boolean = true;
  constructor(private obj_user: StudentService) {}

  ngOnInit(): void {
    this.getAllStudentDetails();
    this.gettotalRecords();
  }
  pageChanged(event) {
    this.page = event;
    this.getAllStudentDetails();
  }
  getAllStudentDetails() {
    this.offset = (this.page - 1) * this.currentpageSize;
    this.obj_user
      .getStudentPaginated(this.currentpageSize, this.offset)
      .subscribe(data => {
        console.log(data);
        this.userdata = data;
        if (this.userdata != null && this.userdata.length > 0) {
          this.collection.data = this.userdata;
        }
      });
  }
  gettotalRecords() {
    const dataConfig$ = this.obj_user.getstudentDetails();
    dataConfig$.subscribe((data: any) => {
      this.fetchedData = data;
      this.totalvalue = this.fetchedData.length;
    });
  }
  public getPageInNewSize(pageSize: number): void {
    this.currentpageSize = pageSize;
    this.getAllStudentDetails();
  }
  search() {
    if (this.name == '') {
      this.ngOnInit();
    } else {
      this.collection.data = this.collection.data.filter(res => {
        return res.name.toLowerCase().match(this.name.toLowerCase());
      });
    }
  }
}
