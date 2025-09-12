import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ASidebar } from "../a-sidebar/a-sidebar";

@Component({
  selector: 'app-a-settings',
  imports: [CommonModule, FormsModule, ASidebar],
  templateUrl: './a-settings.html',
  styleUrl: './a-settings.css'
})
export class ASettings {
activeTab: string = 'account';
  isDarkMode: boolean = false;
  isTwoFactorEnabled: boolean = true;
  isMaintenanceMode: boolean = false;
  sessionTimeout: number = 30;
  
  user = {
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Super Admin',
    lastLogin: new Date('2023-06-20T14:30:00'),
    avatar: 'AD'
  };

  securitySettings = {
    allowedIPs: ['192.168.1.1', '10.0.0.1'],
    loginAttempts: 5,
    sessionTimeout: 30
  };

  systemPreferences = {
    language: 'English',
    timezone: 'UTC+05:30',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12-hour'
  };

  notificationPreferences = {
    email: true,
    sms: false,
    push: true
  };

  users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastActive: '2 hours ago' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active', lastActive: '1 day ago' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Suspended', lastActive: '1 week ago' }
  ];

  roles = ['Admin', 'Editor', 'Viewer', 'Guest'];

  integrations = [
    { name: 'Google', connected: true },
    { name: 'Slack', connected: false },
    { name: 'Stripe', connected: true }
  ];

  activityLogs = [
    { action: 'Login', user: 'Admin User', ip: '192.168.1.1', time: new Date('2023-06-20T14:30:00') },
    { action: 'Settings Updated', user: 'Admin User', ip: '192.168.1.1', time: new Date('2023-06-20T10:15:00') },
    { action: 'User Created', user: 'Admin User', ip: '192.168.1.1', time: new Date('2023-06-19T16:45:00') }
  ];

  changeTab(tab: string): void {
    this.activeTab = tab;
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    // In a real app, you would apply the theme change globally
    console.log('Dark mode:', this.isDarkMode ? 'ON' : 'OFF');
  }

  saveSettings(): void {
    console.log('Settings saved');
    // In a real app, this would call an API to save settings
  }

  resetToDefault(): void {
    console.log('Settings reset to default');
    // In a real app, this would reset settings to default values
  }

  addAllowedIP(ip: string): void {
    if (ip && !this.securitySettings.allowedIPs.includes(ip)) {
      this.securitySettings.allowedIPs.push(ip);
    }
  }

  removeAllowedIP(ip: string): void {
    this.securitySettings.allowedIPs = this.securitySettings.allowedIPs.filter(item => item !== ip);
  }
}
