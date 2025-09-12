import { Component } from '@angular/core';
import { ASidebar } from "../../admin/a-sidebar/a-sidebar";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-a-layout',
  imports: [ASidebar, RouterModule],
  templateUrl: './a-layout.html',
  styleUrl: './a-layout.css'
})
export class ALayout {

}
