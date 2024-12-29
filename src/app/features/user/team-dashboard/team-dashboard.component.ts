import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../../../services/team/team.service';  // Import your team service
import { TeamDto } from '../../../models/team/teamDto.model';  // Import your Team DTO
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Add this import

@Component({
  imports: [
    CommonModule,
    FormsModule,  // Add this to the imports array
  ],
  selector: 'app-team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.css']
})
export class TeamDashboardComponent implements OnInit {
  selectedProjectId: number = 0;
  projects: any[] = [];
  projectId: number = 0;
  teams: any[] = [];
  teamName: string = ''; // Bind for team name input field
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService, // Corrected
    private teamService: TeamService, // Inject the TeamService
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the project ID from route parameters
    this.loadProjects();
    // Fetch the list of teams associated with this project
    this.loadTeams();
  }

  loadProjects(): void {
    this.projectService.getProjectsForUser().subscribe({
      next: (projects: any[]) => {
         // Added type for 'projects'
        this.projects = projects;
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
      }
    });
  }


  loadTeams(): void {
    this.teamService.getUserTeams().subscribe({
      next: (teams: TeamDto[]) => {
        this.teams = teams;
        


        // Fetch project names for each team
        this.teams.forEach((team) => {
          
          if (team.projectid) {
            
            this.projectService.getProjectById(team.projectid).subscribe({
              next: (project) => {
                team.projectName = project.name;  // Add the project name to the team object
                console.log(`Project ID: ${team.projectid}, Team ID: ${team.id}`);
              },
              error: (err) => {
                console.error('Error fetching project:', err);
              }
            });
          }
        });
      },
      error: (err) => {
        this.errorMessage = 'Error loading teams';
        console.error('Error loading teams:', err);
      },
    });
  }

  

  createTeam(): void {
    if (this.teamName.trim() === '') {
      this.errorMessage = 'Team name cannot be empty';
      return;
    }
  
    if (this.selectedProjectId === 0) {
      this.errorMessage = 'Please select a project';
      return;
    }
  
    // Create a new TeamDto object
    const newTeam: TeamDto = {
      id: null, // This will be set by the backend
      name: this.teamName.trim(),
      dateCreation: new Date(),
      projectName: '', // The backend might populate this
      projectId: this.selectedProjectId, // Ensure projectId is set correctly
      users: [] // Initialize with an empty user list
    };
  
    // Call your service to create the team
    this.teamService.createTeam(this.selectedProjectId, newTeam).subscribe({
      next: (team) => {
        // Ensure the backend response has the correct projectId and other details
        this.teams.push({
          ...team,
          projectId: this.selectedProjectId // Ensure projectId is correctly assigned
        });
        this.teamName = ''; // Clear the input field after success
        this.errorMessage = ''; // Reset the error message
        console.log('New team created:', team);
        this.loadTeams();
      },
      error: (err) => {
        console.error('Error creating team:', err);
        this.errorMessage = 'Failed to create team';
      }
    });
  }
  
  

  viewTeam(projectid: number, teamId: number): void {
    
    if (projectid && teamId) {
      this.router.navigate([`user/team-management/${projectid}/${teamId}`])
        .then(() => console.log(`Navigated to team page for team with ID: ${teamId}`))
        .catch((err) => console.error('Navigation error:', err));
    } else {
      console.error('Error: Missing projectId or teamId');
    }
  }
  
  deleteTeam(projectId: number, teamId: number): void {
    this.teamService.deleteTeam(projectId, teamId).subscribe({
      next: () => {
        // Remove the deleted team from the list without reloading the entire page
        this.teams = this.teams.filter((team) => team.id !== teamId);
        console.log('Team deleted successfully');
      },
      error: (err) => {
        console.error('Error deleting team:', err);
        this.errorMessage = 'Error deleting team';
      }
    });
  }

}
