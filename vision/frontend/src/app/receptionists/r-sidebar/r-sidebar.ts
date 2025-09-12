import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faGauge, faUserPlus, faUsers, faUserTie, 
  faCalendarCheck, faRightFromBracket, faBuildingColumns 
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-r-sidebar',
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './r-sidebar.html',
  styleUrl: './r-sidebar.css'
})

export class RSidebar {
faGauge = faGauge;
  faUserPlus = faUserPlus;
  faUsers = faUsers;
  faUserTie = faUserTie;
  faCalendarCheck = faCalendarCheck;
  faRightFromBracket = faRightFromBracket;
  faBuildingColumns = faBuildingColumns;

  navItems = [
    { path: '/dashboard', icon: faGauge, label: 'Dashboard' },
    { path: '/r-register', icon: faUserPlus, label: 'Register Visitor' },
    { path: '/r-visitor', icon: faUsers, label: 'Visitors' },
    { path: '/r-hosts', icon: faUserTie, label: 'Hosts' },
    { path: '/r-preregisterations', icon: faCalendarCheck, label: 'Pre-Registrations' }
  ];

logout() {
  if (confirm('Are you sure you want to logout?')) {
    console.log('User logged out');
    // Redirect to home page
    window.location.href = '/'; // or your home page URL
  } else {
    // Stay on the current page (dashboard)
    console.log('User cancelled logout');
  }
}
}