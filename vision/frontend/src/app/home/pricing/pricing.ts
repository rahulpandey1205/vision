import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faCheck, faXmark, faBuildingColumns } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [RouterModule, CommonModule, FontAwesomeModule],
  templateUrl: './pricing.html',
  styleUrls: ['./pricing.css']
})
export class Pricing {
    isMenuOpen = false;
  currentYear = new Date().getFullYear();
  faBuildingColumns = faBuildingColumns;
  faCheck = faCheck;
  faXmark = faXmark;

  pricingPlans = [
    {
      name: "Basic",
      price: "$29",
      period: "per month",
      description: "Perfect for small businesses and startups",
      features: [
        "Up to 50 visitors/month",
        "Digital check-in",
        "Email notifications",
        "Basic reporting",
        "Custom badges",
        "Email support"
      ],
      limitations: [
        "No SMS notifications",
        "No API access",
        "No custom branding"
      ],
      highlighted: false
    },
    {
      name: "Professional",
      price: "$79",
      period: "per month",
      description: "Ideal for growing businesses",
      features: [
        "Up to 200 visitors/month",
        "Digital check-in",
        "Email & SMS notifications",
        "Advanced reporting",
        "Custom badges",
        "API access",
        "Slack integration",
        "Priority support"
      ],
      limitations: [
        "No custom branding",
        "No dedicated account manager"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "tailored pricing",
      description: "For large organizations with complex needs",
      features: [
        "Unlimited visitors",
        "All Professional features",
        "Custom branding",
        "On-premise deployment",
        "Advanced security features",
        "Dedicated account manager",
        "Custom integrations",
        "24/7 premium support"
      ],
      limitations: [],
      highlighted: false
    }
  ];

  faqs = [
    {
      question: "Can I change plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated."
    },
    {
      question: "Is there a setup fee?",
      answer: "No, there are no setup fees for any of our plans. You only pay the monthly subscription."
    },
    {
      question: "Do you offer discounts for non-profits?",
      answer: "Yes, we offer a 20% discount for registered non-profit organizations."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and for Enterprise plans, we can also process bank transfers."
    }
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
