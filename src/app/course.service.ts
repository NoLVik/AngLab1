import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Course } from './course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private initialCourses: Course[] = [
    { id: 1, title: 'Основи JavaScript', category: 'Програмування', duration: '10 годин' },
    { id: 2, title: 'Angular та RxJS', category: 'Фреймворки', duration: '15 годин' },
    { id: 3, title: 'Проєктування UI/UX', category: 'Дизайн', duration: '12 годин' }
  ];

  private coursesSubject = new BehaviorSubject<Course[]>(this.initialCourses);
  public courses$ = this.coursesSubject.asObservable();

  private get currentCourses(): Course[] {
    return this.coursesSubject.getValue();
  }

  addCourse(courseData: Omit<Course, 'id'>): void {
    const current = this.currentCourses;
    const newId = current.length > 0 ? Math.max(...current.map(c => c.id)) + 1 : 1;
    const newCourse: Course = { ...courseData, id: newId };
    this.coursesSubject.next([...current, newCourse]);
  }

  deleteCourse(id: number): void {
    const updatedCourses = this.currentCourses.filter(course => course.id !== id);
    this.coursesSubject.next(updatedCourses);
  }

  searchCourses(term: string): Observable<Course[]> {
    const current = this.currentCourses;
    if (!term.trim()) {
      return of(current).pipe(delay(400));
    }
    const filteredCourses = current.filter(course =>
      course.title.toLowerCase().includes(term.toLowerCase())
    );
    return of(filteredCourses).pipe(delay(400));
  }
}