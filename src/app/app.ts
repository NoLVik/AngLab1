import { Component } from '@angular/core';
import { CoursesManagerComponent } from './courses-manager.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CoursesManagerComponent],
  templateUrl: './app.html' 
})
export class AppComponent {
  title = 'AngLab1';
}