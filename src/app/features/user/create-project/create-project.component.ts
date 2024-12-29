import { Component } from '@angular/core';
import { ProjectService } from '../../../services/project/project.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Add this

@Component({
  standalone: true,
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  imports: [CommonModule, FormsModule], 
  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent {
  project = {
    name: '',
    description: '',
  };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private projectService: ProjectService) {}

  onSubmit(): void {
    console.log('Submitting project:', this.project);
    this.projectService.createProject(this.project).subscribe({
      next: (response) => {
        console.log('Project created successfully:', response);
        alert('Project created successfully!');
      },
      error: (error) => {
        console.error('Error creating project:', error);
        alert('Failed to create project. Check console for details.');
      }
    });
  }

 
}
