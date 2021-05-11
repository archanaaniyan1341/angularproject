import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CollegeManagementSystem';
  url = environment.baseUrl;
  initColumns: any[] = [
    {
      name: 'id',
      display: 'User Name'
    },
    {
      name: 'name',
      display: 'First Name'
    },
    {
      name: 'gender',
      display: 'Description'
    }
  ];
  displayedColumns: any[] = this.initColumns.map(col => col.name);
  constructor() {}

  login() {
    let name = sessionStorage.getItem('username');
    if (name === 'admin') {
      return false;
    }
    return true;
  }
}
