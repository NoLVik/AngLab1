import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CourseService } from './course.service';
import { Course } from './course.model';

@Component({
  selector: 'app-courses-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './courses-filter.component.html'
})
export class CoursesFilterComponent implements OnInit {
  searchControl = new FormControl('');
  categoryControl = new FormControl('');

  filteredCourses$!: Observable<Course[]>;
  
  categories: string[] = ['Програмування', 'Фреймворки', 'Дизайн', 'Бази даних'];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    const search$ = this.searchControl.valueChanges.pipe(startWith(''));
    const category$ = this.categoryControl.valueChanges.pipe(startWith(''));
    const courses$ = this.courseService.courses$;

    this.filteredCourses$ = combineLatest([courses$, search$, category$]).pipe(
      map(([courses, searchTerm, category]) => {
        return courses.filter(course => {
          const term = (searchTerm || '').toLowerCase();
          const matchesSearch = course.title.toLowerCase().includes(term);
          const matchesCategory = category ? course.category === category : true;
          
          return matchesSearch && matchesCategory;
        });
      })
    );
  }
}