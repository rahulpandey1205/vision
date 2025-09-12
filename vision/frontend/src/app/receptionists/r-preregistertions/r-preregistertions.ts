import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faPlus, faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-r-preregistertions',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './r-preregistertions.html',
  styleUrl: './r-preregistertions.css'
})
export class RPreregistertions implements OnInit {
  faCheck = faCheck;
  faPlus = faPlus;
  faBell = faBell;

  preregistrations = [
    { id: 1, name: "Priya M.", phone: "6543210987", email: "priya@example.com", date: "2025-06-15", time: "10:00 AM", host: "Mr. Gupta", purpose: "Appointment", status: "pending" },
    { id: 2, name: "Sanjay T.", phone: "5432109876", email: "sanjay@example.com", date: "2025-06-16", time: "02:30 PM", host: "Ms. Sharma", purpose: "Meeting", status: "confirmed" }
  ];

  hosts = [
    { id: 1, name: "Mr. Roy", department: "HR" },
    { id: 2, name: "Ms. Sharma", department: "Finance" },
    { id: 3, name: "Mr. Gupta", department: "IT" }
  ];

  currentDate = '';

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

  togglePreregStatus(id: number) {
    const prereg = this.preregistrations.find(p => p.id === id);
    if (prereg) {
      prereg.status = prereg.status === 'confirmed' ? 'pending' : 'confirmed';
    }
  }

  addPreregistration() {
    const newPrereg = {
      id: this.preregistrations.length + 1,
      name: "New Visitor " + (this.preregistrations.length + 1),
      phone: "9" + Math.floor(100000000 + Math.random() * 900000000).toString(),
      email: "visitor" + (this.preregistrations.length + 1) + "@example.com",
      date: new Date(Date.now() + 86400000 * (Math.floor(Math.random() * 7) + 1)).toISOString().split('T')[0],
      time: `${Math.floor(Math.random() * 4) + 9}:00 ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      host: this.hosts[Math.floor(Math.random() * this.hosts.length)].name,
      purpose: ["Meeting", "Interview", "Delivery", "Appointment"][Math.floor(Math.random() * 4)],
      status: "pending"
    };
    this.preregistrations.push(newPrereg);
  }

  formatDate(dateString: string) {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }
}

