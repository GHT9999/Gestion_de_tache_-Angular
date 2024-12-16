import { Component } from '@angular/core';
import { SidebarUserComponent } from '../sidebar-user/sidebar-user.component';
@Component({
  selector: 'app-user-dashboard',
  imports: [SidebarUserComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

}
