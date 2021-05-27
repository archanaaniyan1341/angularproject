import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { environment } from 'src/environments/environment';
import { Student } from './student';
import { StudentService } from './service/student.service';
import { Column } from './column';
import { Row } from './row';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  fetchedData;
  title = 'CollegeManagementSystem';
  public displayedColumns: Column<Student>[] = [
    { name: 'id' },
    { name: 'name' },
    { name: 'gender' },
    { name: 'stream' },
    { name: 'marks' }
  ];
  public displayedRows: Row<Student>[];
  constructor(private studentService: StudentService) {}
  ngOnInit() {
    this.fetchData();
  }

  login() {
    let name = sessionStorage.getItem('username');
    if (name === 'admin') {
      return false;
    }
    return true;
  }
  fetchData(): void {
    const dataConfig$ = this.studentService.getstudentDetails();
    dataConfig$.subscribe((data: any) => {
      this.displayedRows = data;
      //console.log(this.displayedRows);
    });
  }
}
