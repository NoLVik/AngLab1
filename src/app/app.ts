import { Component } from '@angular/core';
import { CoursesHttpComponent } from './courses-http.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CoursesHttpComponent],
  templateUrl: './app.html' 
})
export class AppComponent {
  title = 'AngLab1';
}