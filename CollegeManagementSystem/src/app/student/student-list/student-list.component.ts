import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { StudentService } from '../../service/student.service';
import { Student } from '../../student';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalComponent } from '../../modal/modal.component';
import { ModalConfig } from '../../modal/modal.config';
import { Observable } from 'rxjs';
import { delay } from 'q';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit, OnChanges {
  @ViewChild('modal') private modalComponent: ModalComponent;
  modalConfig: ModalConfig = {
    modalTitle: 'Deleted',
    dismissButtonLabel: 'Ok',
    closeButtonLabel: 'Close'
  };

  config: any;
  collection = { count: 60, data: [] };
  userdata;
  currentIndex = -1;
  page = 1;
  count = 60;
  currentpageSize = 5;
  offset: any;
  searchKey = ' ';
  totalvalue;
  name: any;
  fetchedData: any[];
  colData = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'gender', header: 'Gender' }
  ];
  stream = { field: 'stream', header: 'Stream' };
  marks = { field: 'marks', header: 'Marks' };
  displayColumns;
  displayColumnsArray;
  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getAllStudentDetails();
    this.gettotalRecords();
    this.displayedColumns();
  }
  ngOnChanges() {
    this.displayColumns;
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
    this.studentService
      .getStudentColPaginated(
        this.currentpageSize,
        this.offset,
        this.displayColumns
      )
      .subscribe(data => {
        console.log(data);
        this.userdata = data;
        if (this.userdata != null && this.userdata.length > 0) {
          this.collection.data = this.userdata;
        }
      });
  }
  gettotalRecords() {
    const dataConfig$ = this.studentService.getstudentDetails();
    dataConfig$.subscribe((data: any) => {
      this.fetchedData = data;
      this.totalvalue = this.fetchedData.length;
    });
  }
  public getPageInNewSize(pageSize: number): void {
    this.currentpageSize = pageSize;
    this.getAllStudentDetails();
  }
  deleteStudentDetails(record: Student) {
    this.studentService.deletestudentdetails(record.id);
    this.openModal();
    delay(4000);
    window.location.reload();
    this.getAllStudentDetails();
  }
  rowSelection(record: Student) {
    this.router.navigate(['/detail', record.id]);
  }
  search() {
    if (this.name == '') {
      this.ngOnInit();
    } else {
      this.userdata = this.userdata.filter(res => {
        return res.name.toLowerCase().match(this.name.toLowerCase());
      });
    }
  }
  public displayedColumns() {
    this.displayColumnsArray = this.colData.map(item => item.field);
    this.displayColumns = this.displayColumnsArray.join();
    console.log(this.displayColumns);
    this.getAllStudentDetails();
  }

  public displayStream(event: any) {
    event.target.disabled = true;
    this.colData.push(this.stream);
    this.displayedColumns();
  }
  public displayMarks(event: any) {
    event.target.disabled = true;
    this.colData.push(this.marks);
    this.displayedColumns();
  }
}
