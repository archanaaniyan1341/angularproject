import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  user: string = sessionStorage.getItem('username');
  constructor(private authService: AuthService, public router: Router) {}

  ngOnInit(): void {}
  logout() {
    sessionStorage.clear();
    this.authService.logoutUser();
    this.router.navigate(['login1']);
  }
  authentication() {
    let name = sessionStorage.getItem('username');
    if (name === 'admin') {
      return true;
    } else {
      false;
    }
  }
}
