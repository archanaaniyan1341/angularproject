import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { StudentAddComponent } from './student/student-add/student-add.component';
import { StudentDetailComponent } from './student/student-detail/student-detail.component';
import { HomeComponent } from './home/home.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { AuthGuardService } from './service/auth-guard.service';
import { LoginNewComponent } from './login-new/login-new.component';
import { AboutComponent } from './about/about.component';
import { ListComponent } from './list/list.component';
const routes: Routes = [
  //{ path: '',redirectTo:'/home',pathMatch:'full'},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  {
    path: 'student',
    component: StudentComponent,
    canActivate: [AuthGuardService]
  },
  { path: 'detail/:id', component: StudentDetailComponent },
  {
    path: 'create',
    component: StudentAddComponent,
    canActivate: [AuthGuardService]
  },
  { path: 'list', component: ListComponent, canActivate: [AuthGuardService] },
  { path: 'login1', component: LoginNewComponent },
  { path: '', component: LoginNewComponent },
  { path: 'about', component: AboutComponent }
  // { path: ' ', component:HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
