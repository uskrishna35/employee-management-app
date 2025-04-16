import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-auth',
  imports:[MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  loginForm: FormGroup;
  authService= inject(AuthService)
  // router: any;
  constructor(private fb: FormBuilder, private routes: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  
  onSubmit() {
    if (this.loginForm.valid) {
      console.log("valide")
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          alert('Login successful!');
          localStorage.setItem('token', response.token);
          this.routes.navigate(['/profile']);
        },
        error: (err) => {
          console.error('Login failed', err);
          alert('Invalid credentials!');
        }
      });
    }
  }
}
