import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';  // Import UserRoutingModule
import { RouterModule } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { SidebarUserComponent } from './sidebar-user/sidebar-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent } from './project/project.component';
import { TeamDashboardComponent } from './team-dashboard/team-dashboard.component';
import { TeamManagementComponent } from './team-management/team-management.component';

@NgModule({
 
  imports: [
   
    RouterModule,
    CommonModule,  // Ensure CommonModule is included
    UserRoutingModule ,
    TeamDashboardComponent,
    TeamManagementComponent,
    DashboardComponent,
    ProjectComponent,
    SidebarUserComponent,
    UserDashboardComponent, 
    CreateProjectComponent,
    UserRoutingModule// Include UserRoutingModule here
  ],
})
export class UserModule {}
