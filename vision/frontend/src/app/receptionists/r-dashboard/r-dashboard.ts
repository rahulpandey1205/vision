import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-r-dashboard',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './r-dashboard.html',
  styleUrl: './r-dashboard.css'
})
export class RDashboard implements OnInit {
  faBell = faBell;
  faDoorOpen = faDoorOpen;

  currentDate = new Date().toDateString();

  userName: string = '';
  userInitials: string = '';
  visitorsToday: number = 0;
  activeVisitors: number = 0;
  hostsOnDuty: number = 0;
  preRegistrationsToday: number = 0;
  recentVisitors: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUserFromLocalStorage();
    this.loadDashboardData();
  }

  loadUserFromLocalStorage(): void {
    const userStr = localStorage.getItem('user');

    if (userStr) {
      const userObj = JSON.parse(userStr);
      this.userName = userObj.username || 'User'; // fallback
      this.setUserInitials();
    } else {
      this.userName = 'User';
      this.userInitials = 'U';
    }
  }

  setUserInitials(): void {
    const parts = this.userName.trim().split(' ');
    const first = parts[0]?.[0] || '';
    const second = parts[1]?.[0] || '';
    this.userInitials = (first + second).toUpperCase();
  }

  loadDashboardData() {
    const token = localStorage.getItem('visitor_management_token');

    if (!token) {
      console.warn('No auth token found. Cannot load dashboard stats.');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>('http://localhost:8080/api/dashboard/stats', { headers }).subscribe({
      next: (data) => {
        this.visitorsToday = data.visitorsToday;
        this.activeVisitors = data.activeVisitors;
        this.hostsOnDuty = data.hostsOnDuty;
        this.preRegistrationsToday = data.preRegistrationsToday;
        this.recentVisitors = data.recentVisitors;
      },
      error: (err) => {
        console.error('Failed to load dashboard stats:', err);
      }
    });
  }

  checkOutVisitor(visitorId: number) {
    const token = localStorage.getItem('visitor_management_token');

    if (!token) {
      console.warn('No auth token found. Cannot check out visitor.');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.put(`http://localhost:8080/api/visitors/${visitorId}/checkout`, {}, { headers }).subscribe({
      next: () => {
        this.loadDashboardData();
      },
      error: (err) => {
        console.error(`Failed to check out visitor ${visitorId}:`, err);
      }
    });
  }
}
