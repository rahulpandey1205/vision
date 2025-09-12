import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, ViewportScroller } from '@angular/common';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faBuildingColumns } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, FontAwesomeModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  title = 'Visory - Smart Visitor Management';
  isMenuOpen = false;
  currentYear = new Date().getFullYear();
  constructor(private viewportScroller: ViewportScroller) {}

  features = [
    {
      icon: 'fas fa-id-card',
      title: 'Digital Check-In',
      description: 'Visitors can check in quickly using our intuitive digital interface, reducing wait times and paperwork.'
    },
    {
      icon: 'fas fa-bell',
      title: 'Instant Notifications',
      description: 'Hosts receive immediate notifications when their visitors arrive via email or SMS.'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Enhanced Security',
      description: 'Screen visitors against watchlists, capture ID photos, and maintain detailed logs for security.'
    },
    {
      icon: 'fas fa-print',
      title: 'Custom Badges',
      description: 'Print professional visitor badges with photos, names, and visit details for easy identification.'
    },
    {
      icon: 'fas fa-chart-bar',
      title: 'Detailed Reports',
      description: 'Generate comprehensive reports on visitor traffic, trends, and security incidents.'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Mobile Friendly',
      description: 'Manage visitors from anywhere with our responsive web app and mobile companion apps.'
    }
  ];

  steps = [
    {
      title: 'Visitor Arrival',
      description: 'Visitors check in at your reception or kiosk by entering their details or scanning a QR code from their pre-registration email.'
    },
    {
      title: 'Host Notification',
      description: 'The system instantly notifies the host via email, SMS, or Slack that their visitor has arrived.'
    },
    {
      title: 'Secure Access',
      description: 'The visitor receives a printed or digital badge and can be escorted or granted access to approved areas.'
    }
  ];

  testimonials = [
  {
    content: "Visory has completely transformed the way we manage guests. It’s simple, intuitive, and secure.",
    name: "Priya Sharma",
    position: "Office Manager, TechNova",
    avatar: "assets/images/testimonial1.jpg"
  },
  {
    content: "We’ve improved front desk efficiency by 80%. I highly recommend Visory!",
    name: "Rohan Mehta",
    position: "Admin Head, GreenLeaf Corp",
    avatar: "assets/images/testimonial2.jpg"
  },
  {
    content: "From visitor logs to security checks, Visory handles it all effortlessly.",
    name: "Ayesha Khan",
    position: "Facility Lead, EduBridge",
    avatar: "assets/images/testimonial3.jpg"
  }
];
faBuildingColumns = faBuildingColumns;

   // 🔥 Smooth scroll function
  scrollTo(sectionId: string) {
    this.viewportScroller.scrollToAnchor(sectionId);
    this.closeMenu();
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}