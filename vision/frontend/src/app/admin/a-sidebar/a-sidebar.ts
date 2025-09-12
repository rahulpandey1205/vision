import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUsers, faUserTie, faHistory, faChartBar, faCog, faSignOutAlt, faBuildingColumns } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-a-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './a-sidebar.html',
  styleUrl: './a-sidebar.css'
})
export class ASidebar {
faUsers = faUsers;
  faUserTie = faUserTie;
  faHistory = faHistory;
  faChartBar = faChartBar;
  faCog = faCog;
  faSignOutAlt = faSignOutAlt;
  faBuildingColumns = faBuildingColumns;
}
