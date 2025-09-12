import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ASidebar } from "../a-sidebar/a-sidebar";

@Component({
  selector: 'app-a-reports',
  imports: [CommonModule, FormsModule, NgChartsModule, ASidebar],
  templateUrl: './a-reports.html',
  styleUrl: './a-reports.css'
})

export class AReports {
  chartType: ChartType = 'bar';
  selectedTimeframe = 'week';
  selectedReportType = 'visitors';
  
  chartData: ChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Visitors',
      data: [45, 72, 86, 64, 78, 32, 18],
      backgroundColor: '#4a6fa5'
    }]
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        bodyFont: { size: 12 },
        padding: 12
      }
    },
    scales: {
      y: { 
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.05)' }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  visits = [
    { 
      date: new Date('2023-06-15'), 
      visitor: 'Rahul P.', 
      host: 'Mr. Roy', 
      purpose: 'Meeting', 
      duration: 45,
      status: 'Completed',
      checkIn: '09:30 AM',
      checkOut: '10:15 AM'
    },
    { 
      date: new Date('2023-06-14'), 
      visitor: 'Neha S.', 
      host: 'Admin', 
      purpose: 'Delivery', 
      duration: 15,
      status: 'Checked Out',
      checkIn: '11:45 AM',
      checkOut: '12:00 PM'
    },
    { 
      date: new Date('2023-06-14'), 
      visitor: 'Amit K.', 
      host: 'Ms. Sharma', 
      purpose: 'Interview', 
      duration: 60,
      status: 'Completed',
      checkIn: '02:30 PM',
      checkOut: '03:30 PM'
    },
    { 
      date: new Date('2023-06-13'), 
      visitor: 'Priya M.', 
      host: 'Mr. Gupta', 
      purpose: 'Client Visit', 
      duration: 90,
      status: 'Overdue',
      checkIn: '10:00 AM',
      checkOut: 'Pending'
    },
    { 
      date: new Date('2023-06-12'), 
      visitor: 'Sanjay R.', 
      host: 'Admin', 
      purpose: 'Service', 
      duration: 30,
      status: 'Completed',
      checkIn: '03:15 PM',
      checkOut: '03:45 PM'
    }
  ];

  timeframes = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];

  reportTypes = [
    { value: 'visitors', label: 'Visitors' },
    { value: 'duration', label: 'Duration' },
    { value: 'purpose', label: 'Purpose' }
  ];

  updateChart(): void {
    // Update chart data based on selections
    if (this.chartType === 'bar') {
      this.chartData.datasets[0].backgroundColor = '#4a6fa5';
    } else {
      this.chartData.datasets[0].backgroundColor = '#4fc3f7';
    }
    
    // In a real app, we would fetch new data based on timeframe and report type
    this.loadChartData();
  }

  loadChartData(): void {
    // This would be replaced with actual API calls in a real app
    console.log(`Loading ${this.selectedReportType} data for ${this.selectedTimeframe}`);
  }

  exportReport(format: string): void {
    console.log(`Exporting report as ${format}`);
    // Implementation for exporting data
  }
}

