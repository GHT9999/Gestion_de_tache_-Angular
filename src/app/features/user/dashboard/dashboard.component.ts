import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarUserComponent } from '../sidebar-user/sidebar-user.component';
import { NavbarComponent } from '../user-navbar/user-navbar.component';


@Component({
  selector: 'app-dashboard',
  
  imports: [RouterModule,SidebarUserComponent,NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}

