import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faBuildingColumns } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, FontAwesomeModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  providers: [MessageService]
})
export class Login {
faBuildingColumns = faBuildingColumns;
currentYear: any;
toggleMenu() {
this.isMenuOpen = !this.isMenuOpen;
}
  activeTab: 'login' | 'register' = 'login';
  isLoggingIn = false;
  isRegistering = false;
  showLoginPassword = false;
  showRegisterPassword = false;
  showConfirmPassword = false;

  loginForm: FormGroup;
  registerForm: FormGroup;
isMenuOpen: any;
closeMenu: any;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false]
    });

    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
      agreeTerms: [false, Validators.requiredTrue]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  setActiveTab(tab: 'login' | 'register') {
    this.activeTab = tab;
  }

  togglePassword(field: string) {
    if (field === 'loginPassword') {
      this.showLoginPassword = !this.showLoginPassword;
    } else if (field === 'registerPassword') {
      this.showRegisterPassword = !this.showRegisterPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  onLoginSubmit() {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }

    this.isLoggingIn = true;
    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        this.isLoggingIn = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Login successful',
          life: 3000
        });
        this.redirectBasedOnRole();
      },
      error: (error: HttpErrorResponse) => {
        this.isLoggingIn = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: this.getLoginErrorMessage(error),
          life: 5000
        });
      }
    });
  }

  onRegisterSubmit() {
  if (this.registerForm.invalid) {
    this.markFormGroupTouched(this.registerForm);
    return;
  }

  this.isRegistering = true;
  const { firstName, lastName, email, phone, password, role } = this.registerForm.value;
  const roles = [role];

  this.authService.register(firstName, lastName, email, phone, password, roles).subscribe({
    next: (response) => {
      this.isRegistering = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: response.message || 'Registration successful!',
        life: 3000
      });

      // Automatically log in after successful registration
      this.authService.login({ email, password }).subscribe({
        next: (loginResponse) => {
          this.redirectBasedOnRole();
        },
        error: (loginError) => {
          // If auto-login fails, just switch to login tab
          this.activeTab = 'login';
          this.registerForm.reset();
        }
      });
    },
    error: (error: HttpErrorResponse) => {
      this.isRegistering = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Registration Failed',
        detail: this.getRegisterErrorMessage(error),
        life: 5000
      });
    }
  });
}

  redirectBasedOnRole(): void {
  if (this.authService.isAdmin()) {
    this.router.navigate(['/adashboard']);
  } else if (this.authService.isReceptionist()) {
    this.router.navigate(['/dashboard']);
  } else {
    this.router.navigate(['/login']); // or a 403 page
  }
}


  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private getLoginErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'Unable to connect to server. Please check your internet connection.';
    } else if (error.status === 401) {
      return 'Invalid email or password. Please try again.';
    } else if (error.error?.message) {
      return error.error.message;
    }
    return 'An unexpected error occurred during login.';
  }

  private getRegisterErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'Unable to connect to server. Please check your internet connection.';
    } else if (error.status === 400) {
      return 'Invalid registration data. Please check your inputs.';
    } else if (error.status === 409) {
      return 'Email already registered. Please use a different email or login.';
    } else if (error.error?.message) {
      return error.error.message;
    }
    return 'An unexpected error occurred during registration.';
  }
}