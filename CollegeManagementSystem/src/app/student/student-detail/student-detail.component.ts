import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { StudentService } from '../../service/student.service';
import { Students } from '../../students';
import { ModalComponent } from '../../modal/modal.component';
import { ModalConfig } from '../../modal/modal.config';
@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit {
  @Input() student: Students;
  currentStudent = null;
  update: boolean = false;
  @ViewChild('modal') private modalComponent: ModalComponent;
  modalConfig: ModalConfig = {
    modalTitle: 'Profile Updated',
    dismissButtonLabel: 'Ok',
    closeButtonLabel: 'Close'
  };
  @ViewChild('modal1') private modalComponent1: ModalComponent;
  modalConfig1: ModalConfig = {
    modalTitle: 'Profile Deleted',
    dismissButtonLabel: 'Ok',
    closeButtonLabel: 'Close'
  };

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getStudent(this.route.snapshot.paramMap.get('id'));
  }
  async openModal() {
    return await this.modalComponent.open();
  }
  async openModal1() {
    return await this.modalComponent1.open();
  }
  getStudent(id): void {
    this.studentService.getsinglestudentdetails(id).subscribe(
      student => {
        this.currentStudent = student;
        console.log(student);
      },
      error => {
        console.log(error);
      }
    );
  }
  goBack(): void {
    this.location.back();
  }
  deleteStudent(): void {
    this.studentService.deletestudentdetails(this.currentStudent.id);
    this.openModal1();
    this.router.navigate(['list']);
  }
  updateStudent(): void {
    this.studentService.updatestudentdetails(
      this.currentStudent.id,
      this.currentStudent
    );
    this.openModal();
  }
  updateS() {
    this.update = true;
  }
  return() {
    this.update = false;
  }
}
