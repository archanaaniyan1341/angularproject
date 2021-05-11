import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../../service/student.service'
import { Students } from '../../students';
import {Router} from '@angular/router';
import { ModalComponent } from '../../modal/modal.component';
import { ModalConfig } from '../../modal/modal.config';
@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss']
})
export class StudentAddComponent implements OnInit {
  @ViewChild('modal') private modalComponent: ModalComponent
  modalConfig:ModalConfig=({modalTitle:"Saved", dismissButtonLabel:"Save", closeButtonLabel:"Close"});
  studentdata;
  view:boolean=true;
  obj_s:Students=new Students();
  constructor(private objuser:StudentService,public router : Router) {  
  }
  ngOnInit(): void {
  }
  async openModal(){
    return await this.modalComponent.open();
  }
  SaveCustomerdata(){
    this.objuser.poststudentdetails(this.obj_s).subscribe(
      (data : Students) =>
      console.log(data)
    );
   this.openModal();
  }
}

