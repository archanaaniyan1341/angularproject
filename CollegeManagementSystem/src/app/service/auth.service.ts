import { Injectable, ViewChild, Input } from '@angular/core';
import { of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from './student.service';
import { Students } from '../students';
@Injectable()
export class AuthService {
  @Input() student: Students;
  private isloggedIn: boolean;
  private userName: string;
  currentStudent = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {
    // this.isloggedIn=false;
  }
  login(username: string, password: string) {
    if (username === 'admin' && password === 'admin') {
      sessionStorage.setItem('username', username);
      this.isloggedIn = true;
      //sessionStorage.setItem('login',JSON.stringify(this.isloggedIn))
      this.userName = username;
      this.router.navigate(['/home']);
    }
    return of(this.isloggedIn);
  }

  isUserLoggedIn(): boolean {
    return this.isloggedIn;
  }

  isAdminUser(): boolean {
    if (this.userName == 'admin') {
      return true;
    }
    return false;
  }

  logoutUser(): void {
    this.isloggedIn = false;
    sessionStorage.setItem('login', JSON.stringify(this.isloggedIn));
  }
}
