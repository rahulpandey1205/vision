import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ASidebar } from "../a-sidebar/a-sidebar";
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



interface Host {
  name: string;
  department: string;
  status: 'available' | 'busy' | 'away';
  visitors: number;
}

@Component({
  selector: 'app-a-hosts',
  imports: [CommonModule, ASidebar],
  templateUrl: './a-hosts.html',
  styleUrl: './a-hosts.css'
})

export class AHosts implements OnInit {
  isLoading = true;
  user: any = null;
  notifications: any[] = [];


  hosts: Host[] = [];
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadNotifications();
    this.loadUserProfile(); // updates local user
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
   loadNotifications(): void {
  this.http.get<any[]>('/api/notifications', { responseType: 'json' as const }).subscribe({
    next: (data) => {
      this.notifications = Array.isArray(data) ? data : [];
    },
    error: (err) => {
      console.error("Error fetching notifications:", err);
      this.notifications = [];
    }
  });
}

loadUserProfile(): void {
  this.http.get<any>('/api/admin/profile', { responseType: 'json' as const }).subscribe({
    next: (data) => {
      if (data && typeof data === 'object') {
        this.user = data;
        localStorage.setItem('user', JSON.stringify(data));
      } else {
        console.warn("Unexpected profile data:", data);
        this.user = null;
      }
    },
    error: (err) => {
      console.error("Profile load error", err);
      this.user = null;
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
