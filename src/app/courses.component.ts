import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';
import { CourseService } from './course.service';
import { Course } from './course.model';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './courses.component.html'
})
export class CoursesComponent implements OnInit {
  searchControl = new FormControl('');
  courses$!: Observable<Course[]>;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courses$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.courseService.searchCourses(term || ''))
    );
  }
}