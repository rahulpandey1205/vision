// services/visitor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {
  private apiUrl = `${environment.apiUrl}`; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getRecentVisitors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/visitors/recent`);
  }

  getDashboardMetrics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard/metrics`);
  }

  getVisitorAnalytics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/analytics/visitors`);
  }

  getNotifications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/notifications`);
  }

  getAdminProfile(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/admin/profile`);
  }
}