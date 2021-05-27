import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../student';
import { environment } from 'src/environments/environment';
import { Page } from '../pagination/page';
import { Pageable } from '../pagination/pageable';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private api_student = environment.baseUrl;
  private api_display = environment.colUrl;
  httpHeader = {
    headers: new HttpHeaders({
      'content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) {}

  getstudentDetails() {
    return this.http.get(this.api_student);
  }
  getStudentPaginated(limit, offset) {
    return this.http.get(
      this.api_student + '?limit=' + limit + '&offset=' + offset
    );
  }
  getStudentColPaginated(limit, offset, array) {
    return this.http.get(
      this.api_display +
        '?limit=' +
        limit +
        '&offset=' +
        offset +
        '&col=' +
        array
    );
  }
  public poststudentdetails(obj_s: Student): Observable<Student> {
    return this.http.post<Student>(this.api_student, obj_s, this.httpHeader);
  }
  public deletestudentdetails(id) {
    this.http.delete(this.api_student + '/' + id).subscribe((data: any) => {
      data = data.filter(x => x.id !== id);
    });
  }

  public getsinglestudentdetails(id: number) {
    return this.http.get(this.api_student + '/' + id);
  }
  public updatestudentdetails(id: object, updaterecords: object) {
    this.http
      .put(this.api_student + '/' + id, updaterecords)
      .subscribe(data => {
        console.log(data);
      });
  }
  deleteAll(): Observable<any> {
    return this.http.delete(this.api_student);
  }
  searchByName(name): Observable<any> {
    return this.http.get(`${this.api_student}?name=${name}`);
  }
  public getPage(pageable: Pageable): Observable<Page<Student>> {
    let url =
      this.api_student +
      '?limit=' +
      pageable.pageNumber +
      '&offset=' +
      pageable.pageSize;
    // + '&sort=id';
    return this.http.get<Page<Student>>(url, this.httpHeader);
  }
}
