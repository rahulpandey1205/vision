import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDoorOpen, faEye, faPlus, faFilter, faBell } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-r-visitor',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './r-visitor.html',
  styleUrl: './r-visitor.css'
})
export class RVisitor implements OnInit {
  faDoorOpen = faDoorOpen;
  faEye = faEye;
  faPlus = faPlus;
  faFilter = faFilter;
  faBell = faBell;

  visitors = [
    { id: 1, name: "Rahul P.", phone: "9876543210", email: "rahul@example.com", checkin: "10:45 AM", checkout: "", host: "Mr. Roy", purpose: "Interview", status: "inside" },
    { id: 2, name: "Neha S.", phone: "8765432109", email: "neha@example.com", checkin: "11:20 AM", checkout: "12:45 PM", host: "Admin", purpose: "Delivery", status: "checked-out" },
    { id: 3, name: "Amit K.", phone: "7654321098", email: "amit@example.com", checkin: "01:15 PM", checkout: "", host: "Ms. Sharma", purpose: "Meeting", status: "inside" }
  ];

  currentDate = '';

  constructor(private router: Router) {}

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

  checkOutVisitor(id: number) {
    const visitor = this.visitors.find(v => v.id === id);
    if (visitor) {
      const now = new Date();
      visitor.checkout = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      visitor.status = "checked-out";
    }
  }

  viewVisitorDetails(visitor: any) {
    alert(`Visitor Details:\nName: ${visitor.name}\nPhone: ${visitor.phone}\nEmail: ${visitor.email}\nHost: ${visitor.host}\nPurpose: ${visitor.purpose}\nStatus: ${visitor.status}`);
  }

  addNewVisitor() {
    this.router.navigate(['/register']);
  }
}

