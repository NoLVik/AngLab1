import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Course } from './course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = [
    { id: 1, title: 'Основи JavaScript', category: 'Програмування', duration: '10 годин' },
    { id: 2, title: 'Angular та RxJS', category: 'Фреймворки', duration: '15 годин' },
    { id: 3, title: 'Проєктування UI/UX', category: 'Дизайн', duration: '12 годин' },
    { id: 4, title: 'Бази даних та SQL', category: 'Бази даних', duration: '20 годин' },
    { id: 5, title: 'Python', category: 'Програмування', duration: '18 годин' }
  ];

  searchCourses(term: string): Observable<Course[]> {
    if (!term.trim()) {
      return of(this.courses).pipe(delay(400));
    }
    const filteredCourses = this.courses.filter(course =>
      course.title.toLowerCase().includes(term.toLowerCase())
    );
    return of(filteredCourses).pipe(delay(400));
  }
}