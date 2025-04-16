import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { ProfileService } from '../services/profile.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profile-edit',
  imports: [MatToolbar,MatIcon,MatButtonModule,MatToolbar,
    MatSidenavModule, CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule, MatFormFieldModule,MatSelect,MatOption,FormsModule
  ],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss'
})
export class ProfileEditComponent implements OnInit {
  isSidebarOpen: boolean | undefined;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  dropdownOptions: { id: number; name: string }[] = []; 
  selectedOption: number | null = null; 

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getDropdownOptions().subscribe({
      next: (response) => {
        console.log('  Full API Response:', response);
  
    
        if (response && response.data && response.data.length > 0 && response.data[0].response) {
          this.dropdownOptions = response.data[0].response.map(item => ({
            id: item.id,
            name: item.test_name 
          }));
  
          console.log(' Dropdown options:', this.dropdownOptions);
        } else {
          console.error(' Unexpected API response format:', response);
        }
      },
      error: (err) => console.error(' Error fetching data:', err)
    });
  }
}  