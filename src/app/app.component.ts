import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule} from '@angular/router';
@Component({
  selector: 'students-details-root',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'student-details';


  
}
