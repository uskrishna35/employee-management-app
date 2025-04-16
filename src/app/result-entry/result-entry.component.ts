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
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-result-entry',
  imports: [CommonModule, MatTableModule, MatButtonModule,
    CommonModule,
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
    MatTableModule
  ],
  templateUrl: './result-entry.component.html',
  styleUrl: './result-entry.component.scss'
})
export class ResultEntryComponent {

  displayedColumns: string[] = ['sno', 'profile', 'status', 'action'];

  profiles = [
    { name: 'HEALTH RISK INDEX', status: 'Pending' }
  ];

  
  

}
