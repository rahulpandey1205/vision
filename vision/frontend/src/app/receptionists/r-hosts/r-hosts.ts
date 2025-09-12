import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faPlus, faBell } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-r-hosts',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './r-hosts.html',
  styleUrl: './r-hosts.css'
})
export class RHosts implements OnInit {
  faPen = faPen;
  faPlus = faPlus;
  faBell = faBell;

  hosts = [
    { id: 1, name: "Mr. Roy", department: "HR", email: "roy@company.com", phone: "9123456780", status: "available" },
    { id: 2, name: "Ms. Sharma", department: "Finance", email: "sharma@company.com", phone: "9234567801", status: "available" },
    { id: 3, name: "Mr. Gupta", department: "IT", email: "gupta@company.com", phone: "9345678012", status: "busy" }
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

  toggleHostStatus(id: number) {
    const host = this.hosts.find(h => h.id === id);
    if (host) {
      host.status = host.status === 'available' ? 'busy' : 'available';
    }
  }

  addHost() {
    const newHost = {
      id: this.hosts.length + 1,
      name: "New Host " + (this.hosts.length + 1),
      department: "Department",
      email: "host" + (this.hosts.length + 1) + "@company.com",
      phone: "9" + Math.floor(100000000 + Math.random() * 900000000).toString(),
      status: "available"
    };
    this.hosts.push(newHost);
  }
}
