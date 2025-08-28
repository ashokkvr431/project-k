import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  url = "http://10.70.9.55:3000/students";   
  url2 = "http://10.70.9.55:3000/students2";

  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  getStudents2(): Observable<any[]> {
    return this.http.get<any[]>(this.url2);
  }

  getMergedStudents(): Observable<any[]> {
    return forkJoin({
      api1: this.http.get<any[]>(this.url),
      api2: this.http.get<any[]>(this.url2)
    }).pipe(
      map(({ api1, api2 }) => {
        return api1.map(std1 => {
          const std2 = api2.find(s => s.id === std1.id);
          return { ...std1, ...std2 };
        });
      })
    );
  }


  addStudent(data: any): Observable<any> {
    return this.http.post(this.url, data);
  }

  updateStudent(id: number, data: any): Observable<any> {
    return this.http.put(this.url + "/" + id, data);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(this.url + "/" + id);
  }

}
