import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CourseService } from './course.service';
import { Course } from './course.model';

@Component({
  selector: 'app-courses-manager',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './courses-manager.component.html'
})
export class CoursesManagerComponent implements OnInit {
  courses$!: Observable<Course[]>;
  courseForm!: FormGroup;

  constructor(
    private courseService: CourseService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.courses$ = this.courseService.courses$;

    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      duration: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      this.courseService.addCourse(this.courseForm.value);
      this.courseForm.reset();
    }
  }

  onDelete(id: number): void {
    this.courseService.deleteCourse(id);
  }
}