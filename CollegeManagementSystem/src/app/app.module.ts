import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { StudentAddComponent } from './student/student-add/student-add.component';
import { StudentDetailComponent } from './student/student-detail/student-detail.component';
import { StudentService } from './service/student.service';
import { HomeComponent } from './home/home.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { AuthService } from './service/auth.service';
import { LoginNewComponent } from './login-new/login-new.component';
import { AuthGuardService } from './service/auth-guard.service';
import { ModalComponent } from './modal/modal.component';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
//import { PaginationComponent } from './pagination/pagination.component';
import { PaginationModule } from './pagination/pagination.module';
import { AboutComponent } from './about/about.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgMarqueeModule } from 'ng-marquee';
import { PaginationService } from './service/pagination.service';
import { PaginationNewComponent } from './pagination-new/pagination-new.component';
import { ListComponent } from './list/list.component';

import { AppMaterialModules } from './material.module';
import { TableComponent } from './table/table.component';
import { ReusableTableComponent } from './reusable-table/reusable-table.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    StudentAddComponent,
    StudentDetailComponent,
    HomeComponent,
    StudentListComponent,
    LoginNewComponent,
    ModalComponent,
    AboutComponent,
    PaginationNewComponent,
    ListComponent,
    TableComponent,
    ReusableTableComponent

    //PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxPaginationModule,
    NgbDropdownModule,
    PaginationModule,
    NgMarqueeModule,
    Ng2SearchPipeModule,
    AppMaterialModules
  ],
  providers: [StudentService, AuthService, AuthGuardService, PaginationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
