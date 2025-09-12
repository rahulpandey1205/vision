import { Component } from '@angular/core';
import { RSidebar } from "../../receptionists/r-sidebar/r-sidebar";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-r-layout',
  imports: [RSidebar, RouterModule],
  templateUrl: './r-layout.html',
  styleUrl: './r-layout.css'
})
export class RLayout {

}
