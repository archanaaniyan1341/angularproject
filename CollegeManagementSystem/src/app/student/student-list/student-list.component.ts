import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../../service/student.service';
import { Student } from '../../student';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalComponent } from '../../modal/modal.component';
import { ModalConfig } from '../../modal/modal.config';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  fetchedData: Student[] = [];
  displayedData: Student[] = [];
  itemsPerPage: number = 5;
  allPages: number;
  name: any;
  page: number = 1;

  showID: boolean = true;
  showName: boolean = true;
  showGender: boolean = true;
  showStream: boolean = true;
  showMarks: boolean = true;
  showDel: boolean = true;

  @ViewChild('modal') private modalComponent: ModalComponent;
  modalConfig: ModalConfig = {
    modalTitle: 'Deleted',
    dismissButtonLabel: 'Ok',
    closeButtonLabel: 'Close'
  };

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }
  async openModal() {
    return await this.modalComponent.open();
  }

  deletestudentdetails(id): any {
    this.studentService.deletestudentdetails(id);
    this.openModal();
    this.fetchData();
  }
  fetchData(): void {
    const dataConfig$ = this.studentService.getstudentDetails();
    dataConfig$.subscribe((data: any) => {
      this.fetchedData = data;
      this.onPageChange();
      this.allPages = Math.ceil(this.fetchedData.length / this.itemsPerPage);
    });
  }
  // fetchData(): void {
  //   const offset = (this.page - 1) * this.itemsPerPage;
  //   const dataConfig$ = this.studentService.getStudentPaginated(
  //     this.itemsPerPage,
  //     offset
  //   );
  //   dataConfig$.subscribe((data: any) => {
  //     this.fetchedData = data;
  //     this.onPageChange();
  //     this.allPages = Math.ceil(this.fetchedData.length / this.itemsPerPage);
  //   });
  // }

  onPageChange(page: number = 1): void {
    const startItem = (page - 1) * this.itemsPerPage;
    const endItem = page * this.itemsPerPage;
    this.displayedData = this.fetchedData.slice(startItem, endItem);
  }

  public getPageInNewSize(pageSize: number): void {
    this.itemsPerPage = pageSize;
    this.onPageChange();
    this.fetchData();
  }
  search() {
    if (this.name == '') {
      this.ngOnInit();
    } else {
      this.displayedData = this.displayedData.filter(res => {
        return res.name.toLowerCase().match(this.name.toLowerCase());
      });
    }
  }
}
