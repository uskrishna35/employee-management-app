import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
@Component({
  selector: 'app-profile-list2',
  imports: [CommonModule,
      RouterModule,
      MatSidenavModule,
      MatToolbarModule,
      MatIconModule,
      MatListModule,
      MatButtonModule,
      MatIconModule,
      MatExpansionModule,
    MatFormFieldModule,
  MatSelectModule,
  MatTableModule,MatMenuModule],
  templateUrl: './profile-list2.component.html',
  styleUrl: './profile-list2.component.scss'
})
export class ProfileList2Component {

  constructor(private router: Router) {}

  navItems = [
    { name: 'lab-profile list' },
    { name: 'Employees' },
    { name: 'Reports', icon: 'bar_chart' }
  ];

  displayedColumns: string[] = [ 'name', 'department', 'action'];
  employees = [
    {  name: '', department: '' },
    {  name: '', department: '' },
    
  ];


  editEmployee() {
    this.router.navigate(['/edit']);
}

}


