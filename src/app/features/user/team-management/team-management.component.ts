import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../../../services/team/team.service';  // Adjust the path as needed
import { UserService } from '../../../services/user/user.service';  // Adjust the path as needed
import { TeamDto } from '../../../models/team/teamDto.model';  // Adjust the path as needed
import { UserResponse } from '../../../models/user/user-response.model';  // Adjust the path as needed
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-team-management',
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.css'],
  imports : [CommonModule,
      FormsModule,]
})
export class TeamManagementComponent implements OnInit {
  teamId: number = 0;
  teamName : String = '';
  projectId : number = 0;
  team: TeamDto | null = null;
  users: UserResponse[] = [];
  selectedUserEmail: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const projectId = params.get('projectid');  // Get projectId from URL
      const teamId = params.get('teamId');        // Get teamId from URL
  
      if (projectId && teamId) {
        this.projectId = +projectId;  // Convert to number if not null
        this.teamId = +teamId;        // Convert to number if not null
        this.loadTeamDetails();  // Fetch team details by teamId and projectId
      } else {
        console.error('Missing projectId or teamId');
        this.errorMessage = 'Project or Team not found';
      }
    });
  }
  
  


  loadTeamDetails(): void {
    if (this.projectId && this.teamId) {
      console.log(`Project ID: ${this.projectId}, Team ID ::::: ${this.teamId}`);
      this.teamService.getTeamById(this.projectId, this.teamId).subscribe(
        (team: TeamDto) => {
          this.team = team;
          this.users = team.users || [];  // Populate users list
        },
        (err) => {
          console.error('Error fetching team details:', err);
          this.errorMessage = 'Error loading team details';
        }
      );
    } else {
      console.error('Missing projectId or teamId');
      this.errorMessage = 'Team not found';
    }
  }
  

  
  

  addUserToTeam(): void {
    if (this.selectedUserEmail.trim() === '') {
      this.errorMessage = 'Email cannot be empty';
      return;
    }
  
    this.teamService.addUserToTeam(this.projectId || 0, this.teamId, this.selectedUserEmail).subscribe(
      (updatedTeam) => {
        this.team = updatedTeam;
        this.users = updatedTeam.users || [];
        this.selectedUserEmail = '';  // Reset the input field
        this.errorMessage = '';
      },
      (err) => {
        console.error('Error adding user:', err);
        this.errorMessage = 'Error adding user to team';
      }
    );
  }
  
  

  removeUserFromTeam(userEmail: string): void {
    if (!userEmail.trim()) {
      this.errorMessage = 'Email cannot be empty';
      return;
    }
  
    this.teamService.removeUserFromTeam(this.projectId || 0, this.teamId, userEmail).subscribe(
      (updatedTeam) => {
        this.team = updatedTeam;
        this.users = updatedTeam.users || [];
        this.errorMessage = '';
      },
      (err) => {
        console.error('Error removing user:', err);
        this.errorMessage = 'Error removing user from team';
      }
    );
  }
  
  
}
