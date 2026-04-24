import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay } from 'rxjs';
import { Course } from './course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseApiService {
  private apiUrl = 'http://127.0.0.1:3000/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }
}