// a-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ASidebar } from '../a-sidebar/a-sidebar';
import { NgChartsModule } from 'ng2-charts';
import type { ChartData, ChartConfiguration } from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-a-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ASidebar, NgChartsModule],
  templateUrl: './a-dashboard.html',
  styleUrl: './a-dashboard.css'
})
export class ADashboard implements OnInit {

  user: any = null;
  isLoading: boolean = true;
  currentDateTime: string = '';
  metrics: any = {};
  recentVisitors: any[] = [];
  notifications: any[] = [];
  purposeChartData: ChartData<'pie'> | null = null;
  timeChartData: ChartData<'bar'> | null = null;
  chartOptions: ChartConfiguration['options'] | undefined = undefined;
  Math: any = Math;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserFromStorage();

    if (!this.user) {
      console.warn("No valid user found. Redirecting to login...");
      this.router.navigate(['/login']);
      return;
    }

    this.currentDateTime = new Date().toLocaleString();

    // Fetch all data
    this.loadDashboardMetrics();
    this.loadRecentVisitors();
    this.loadNotifications();
    this.loadUserProfile(); // updates local user
    this.setupCharts();
  }

  private loadUserFromStorage(): void {
    const storedUser = localStorage.getItem('user');
    try {
      if (storedUser && storedUser !== 'undefined') {
        this.user = JSON.parse(storedUser);
      } else {
        this.user = null;
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      this.user = null;
    }
  }

  loadDashboardMetrics(): void {
    this.http.get('/api/dashboard/metrics').subscribe({
      next: (data: any) => this.metrics = data,
      error: (err) => console.error("Error fetching dashboard metrics:", err)
    });
  }

  loadRecentVisitors(): void {
    this.http.get('/api/visitors/recent').subscribe({
      next: (data: any) => this.recentVisitors = data,
      error: (err) => console.error("Error fetching recent visitors:", err)
    });
  }

  loadNotifications(): void {
    this.http.get('/api/notifications').subscribe({
      next: (data: any) => this.notifications = data,
      error: (err) => console.error("Error fetching notifications:", err)
    });
  }

  loadUserProfile(): void {
    this.http.get('/api/admin/profile').subscribe({
      next: (data: any) => {
        this.user = data;
        localStorage.setItem('user', JSON.stringify(data)); // Refresh stored user
      },
      error: (err) => console.error("Profile load error", err)
    });
  }

  setupCharts(): void {
    this.http.get('/api/analytics/visitors').subscribe({
      next: (data: any) => {
        this.purposeChartData = data.purposeChartData;
        this.timeChartData = data.timeChartData;
        this.chartOptions = {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Visitor Statistics' }
          }
        };
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error fetching analytics:", err);
        this.isLoading = false;
      }
    });
  }

  getUserInitials(name: string | undefined): string {
  if (!name) return "";

  const parts = name.trim().split(" ");
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (
    parts[0].charAt(0).toUpperCase() +
    parts[parts.length - 1].charAt(0).toUpperCase()
  );
}
}
