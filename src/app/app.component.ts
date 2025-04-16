import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { ResultEntryComponent } from './result-entry/result-entry.component';





@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Magnolia-Project';

}
