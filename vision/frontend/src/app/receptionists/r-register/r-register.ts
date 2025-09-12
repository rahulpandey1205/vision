import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faCheck, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-r-register',
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, FormsModule,],
  templateUrl: './r-register.html',
  styleUrl: './r-register.css'
})
export class RRegister implements OnInit {
  faCheck = faCheck;
  faRotateLeft = faRotateLeft;
  faBell = faBell;

  hosts = [
    { id: 1, name: "Mr. Roy", department: "HR" },
    { id: 2, name: "Ms. Sharma", department: "Finance" },
    { id: 3, name: "Mr. Gupta", department: "IT" }
  ];

  currentDate = '';
  dashboardService: any;
  

constructor(private http: HttpClient, private router: Router) {}
  ngOnInit() {
    this.updateDateTime();
  }

  updateDateTime() {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    this.currentDate = now.toLocaleDateString('en-US', options);
  }

  registerVisitor(form: NgForm): void {
  if (form.invalid) {
    alert('Form is invalid!');
    console.warn('Invalid form data:', form.value);
    return;
  }

  console.log('Submitting Visitor:', form.value); // See if fullName exists

  const token = localStorage.getItem('visitor_management_token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  const visitorData = {
    fullName: form.value.fullName,
    phone: form.value.phone,
    email: form.value.email,
    hostEmployee: form.value.host,  // ✅ match Java entity
    purpose: form.value.purpose,
    checkin: new Date().toISOString().slice(0, -1),
    status: 'inside'
  };
  this.http.post('http://localhost:8080/api/visitors', visitorData, { headers }).subscribe({
    next: () => {
      alert('Visitor registered successfully!');
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      console.error('Error registering visitor:', err);
      alert('Failed to register visitor.');
    }
  });
}

}
