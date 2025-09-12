import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { 
  faBuildingColumns, 
  faMapMarkerAlt, 
  faPhone, 
  faEnvelope,
  faClock 
} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterModule, CommonModule, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact {
  isMenuOpen = false;
  currentYear = new Date().getFullYear();
  contactForm: FormGroup;
  submitted = false;
  
  faBuildingColumns = faBuildingColumns;
  faMapMarkerAlt = faMapMarkerAlt;
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faClock = faClock;

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: [''],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  contactInfo = [
    {
      icon: faMapMarkerAlt,
      title: "Address",
      content: "123 Business Park, Sector 5, Bangalore, India - 560001"
    },
    {
      icon: faPhone,
      title: "Phone",
      content: "+91 80 1234 5678"
    },
    {
      icon: faEnvelope,
      title: "Email",
      content: "info@visory.com"
    },
    {
      icon: faClock,
      title: "Business Hours",
      content: "Mon - Fri: 9:00 AM - 6:00 PM"
    }
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.contactForm.valid) {
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', this.contactForm.value);
      alert('Thank you for your message. We will get back to you soon!');
      this.contactForm.reset();
      this.submitted = false;
    }
  }
}