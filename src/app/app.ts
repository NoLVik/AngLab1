import { Component } from '@angular/core';
import { CoursesFilterComponent } from './courses-filter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CoursesFilterComponent],
  templateUrl: './app.html' 
})
export class AppComponent {
  title = 'AngLab1';
}