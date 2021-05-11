import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ModalComponent } from '../modal/modal.component';
import { ModalConfig } from '../modal/modal.config';


@Component({
  selector: 'app-login-new',
  templateUrl: './login-new.component.html',
  styleUrls: ['./login-new.component.scss']
})
export class LoginNewComponent implements OnInit {
  angForm: FormGroup;
  invalidCredentialMsg: string;
  username: string;
  password: string;
  retUrl: string = "login1";
  @ViewChild('modal') private modalComponent: ModalComponent
  modalConfig: ModalConfig = ({ modalTitle: "Login failed!", dismissButtonLabel: "Ok", closeButtonLabel: "Close" });

  constructor(private authService: AuthService, private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    
  }

  ngOnInit() {
    this.createform();
  }
  async openModal() {
    return await this.modalComponent.open();
  }
  submit(username: string, password: string) {
    this.authService.login(username, password).subscribe(data => {
      console.log('return to ' + this.retUrl);
      if(this.authService.isUserLoggedIn()===false){
        this.openModal();
      }
    });

  }
  createform() {
    this.angForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]{1}/)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]{1}/)]]
    });
  }
}
