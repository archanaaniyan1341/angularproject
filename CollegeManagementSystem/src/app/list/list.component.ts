import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from '../student';
import { Students } from '../students';
import { StudentService } from '../service/student.service';
import { ModalComponent } from '../modal/modal.component';
import { ModalConfig } from '../modal/modal.config';
import { delay } from 'q';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  config: any;
  collection = { count: 60, data: [] };
  userdata;
  fetchedData: Student[] = [];
  single_student_data: Student = new Students();
  obj_s: Student = new Students();
  currentIndex = -1;
  page = 1;
  count = 60;
  currentpageSize = 5;
  offset: any;
  searchKey = ' ';
  totalvalue;
  name: any;
  colData = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'gender', header: 'Gender' },
    { field: 'stream', header: 'Stream' },
    { field: 'marks', header: 'Marks' }
  ];

  @ViewChild('modal') private modalComponent: ModalComponent;
  modalConfig: ModalConfig = {
    modalTitle: 'Deleted',
    dismissButtonLabel: 'Ok',
    closeButtonLabel: 'Close'
  };
  constructor(private obj_user: StudentService, public router: Router) {}

  ngOnInit(): void {
    this.getAllStudentDetails();
    this.gettotalRecords();
  }
  async openModal() {
    return await this.modalComponent.open();
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
  deleteStudentDetails(record: Student) {
    this.obj_user.deletestudentdetails(record.id);
    this.openModal();
    delay(10000);
    window.location.reload();
    this.getAllStudentDetails();
  }
  rowSelection(record: Student) {
    this.router.navigate(['/detail', record.id]);
  }
}
