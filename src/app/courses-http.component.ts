import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseApiService } from './course-api.service';
import { Course } from './course.model';

@Component({
  selector: 'app-courses-http',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses-http.component.html'
})
export class CoursesHttpComponent implements OnInit {
  courses: Course[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private courseApiService: CourseApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.courseApiService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = 'Помилка сервера. Дивіться консоль.';
        this.isLoading = false;
        this.cdr.detectChanges();
        console.error(err);
      }
    });
  }
}