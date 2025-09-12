import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ASidebar } from "../a-sidebar/a-sidebar";

interface VisitRecord {
  id: number;
  visitorName: string;
  checkInTime: Date;
  checkOutTime: Date | null;
  hostName: string;
  purpose: string;
  status: 'Inside' | 'Checked Out' | 'Overdue';
}

@Component({
  selector: 'app-a-history',
  imports: [CommonModule, FormsModule, ASidebar],
  templateUrl: './a-history.html',
  styleUrl: './a-history.css'
})
export class AHistory implements OnInit{
  notificationCount = 3;
  allVisits: VisitRecord[] = [];
  filteredVisits: VisitRecord[] = [];
  visitTypes = ['Meeting', 'Delivery', 'Interview', 'Client Visit', 'Service'];
  
  // Filter controls
  selectedDateRange = '30';
  selectedVisitType = 'all';
  searchQuery = '';
  
  // Sorting
  sortColumn = 'checkInTime';
  sortDirection: 'asc' | 'desc' = 'desc';
  
  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  ngOnInit(): void {
    // Generate mock data
    this.generateMockData();
    this.applyFilters();
  }

  generateMockData(): void {
    const names = ['Rahul P.', 'Neha S.', 'Amit K.', 'Priya M.', 'Sanjay R.', 'Anjali T.', 'Vikram D.', 'Meera K.'];
    const hosts = ['Mr. Roy', 'Ms. Sharma', 'Mr. Gupta', 'Admin', 'Ms. Patel'];
    const purposes = ['Meeting', 'Delivery', 'Interview', 'Client Visit', 'Service'];
    
    for (let i = 1; i <= 50; i++) {
      const daysAgo = Math.floor(Math.random() * 90);
      const checkInDate = new Date();
      checkInDate.setDate(checkInDate.getDate() - daysAgo);
      
      const checkInHours = 8 + Math.floor(Math.random() * 8);
      const checkInMinutes = Math.floor(Math.random() * 60);
      checkInDate.setHours(checkInHours, checkInMinutes, 0, 0);
      
      const durationMinutes = 15 + Math.floor(Math.random() * 120);
      const checkOutDate = new Date(checkInDate.getTime() + durationMinutes * 60000);
      
      // 10% chance of being overdue
      const status = Math.random() > 0.9 ? 'Overdue' : 
                    Math.random() > 0.3 ? 'Checked Out' : 'Inside';
      
      this.allVisits.push({
        id: i,
        visitorName: names[Math.floor(Math.random() * names.length)],
        checkInTime: checkInDate,
        checkOutTime: status === 'Inside' ? null : checkOutDate,
        hostName: hosts[Math.floor(Math.random() * hosts.length)],
        purpose: purposes[Math.floor(Math.random() * purposes.length)],
        status: status as any
      });
    }
  }

  applyFilters(): void {
    let filtered = [...this.allVisits];
    
    // Date range filter
    if (this.selectedDateRange !== 'all') {
      const days = parseInt(this.selectedDateRange);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      
      filtered = filtered.filter(visit => visit.checkInTime >= cutoffDate);
    }
    
    // Visit type filter
    if (this.selectedVisitType !== 'all') {
      filtered = filtered.filter(visit => visit.purpose === this.selectedVisitType);
    }
    
    // Search filter
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(visit => 
        visit.visitorName.toLowerCase().includes(query) || 
        visit.hostName.toLowerCase().includes(query)
      );
    }
    
    // Sort data
    filtered.sort((a, b) => {
      const aValue = a[this.sortColumn as keyof VisitRecord];
      const bValue = b[this.sortColumn as keyof VisitRecord];
      
      if (aValue instanceof Date && bValue instanceof Date) {
        return this.sortDirection === 'asc' 
          ? aValue.getTime() - bValue.getTime() 
          : bValue.getTime() - aValue.getTime();
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return this.sortDirection === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });
    
    this.filteredVisits = filtered;
    this.currentPage = 1;
    this.updatePagination();
  }

  sortData(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  calculateDuration(visit: VisitRecord): string {
    if (!visit.checkOutTime) return 'N/A';
    
    const diffMs = visit.checkOutTime.getTime() - visit.checkInTime.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 60) return `${diffMins} mins`;
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    return `${hours}h ${mins}m`;
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredVisits.length / this.itemsPerPage);
    this.filteredVisits = this.filteredVisits.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFilters();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyFilters();
    }
  }

  exportData(): void {
    // In a real app, this would export the data
    console.log('Exporting data...', this.filteredVisits);
    alert('Export functionality would be implemented here');
  }
}
