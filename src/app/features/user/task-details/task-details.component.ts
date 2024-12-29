import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../../services/task/task.service'; // Adjust path if needed
import { ProjectService } from '../../../services/project/project.service'; // Adjust path if needed
import { TaskDto } from '../../../models/task/taskDto.model'; // Adjust path if needed
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports : [CommonModule,FormsModule],
  selector: 'app-task-detail',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  task: TaskDto = {} as TaskDto;
  users: string[] = [];
  selectedUser: string = '';
  projectId: number = 0;
  taskId: number = 0;
  errorMessage: string = ''; // To hold error messages
  

  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    // Retrieve projectId and taskId from the route
    this.route.paramMap.subscribe(params => {
      this.projectId = Number(params.get('projectId'));
      this.taskId = Number(params.get('taskId'));
      this.loadTaskDetails();
      this.loadProjectUsers();
    });
  }

  loadTaskDetails(): void {
    this.taskService.getTaskById(this.projectId, this.taskId).subscribe(
      (task) => {
        this.task = task;
      },
      (err) => {
        console.error('Error fetching task details:', err);
        this.message = 'Error loading task details';
      }
    );
  }

  loadProjectUsers(): void {
    this.projectService.getUsersByProjectId(this.projectId).subscribe(
      (users) => {
        this.users = users;
      },
      (err) => {
        console.error('Error fetching users:', err);
        this.message = 'Error loading project users';
      }
    );
  }

  updateTask(): void {
    this.taskService.updateTask(this.taskId, this.task).subscribe(
      () => {
        this.message = 'Task updated successfully!';
      },
      (err) => {
        console.error('Error updating task:', err);
        this.message = 'Error updating task';
      }
    );
  }

  assignTask(): void {
    if (!this.selectedUser) {
      this.errorMessage = 'Please select a user to assign the task.';
      return;
    }
  
    this.taskService.assignTask(this.task.id, this.selectedUser).subscribe({
      next: (response) => {
        this.message = 'Task assigned successfully!';
        this.errorMessage = ''; // Clear any previous error
        console.log('Assign Task Response:', response);
        this.fetchTaskDetails();
      },
      error: (err) => {
        console.error('Error assigning task:', err);
        this.errorMessage = 'Error assigning task';
      }

      
    });
    this.loadTaskDetails();
  }

  fetchTaskDetails(): void {
    this.taskService.getTaskById(this.projectId, this.task.id).subscribe({
      next: (task) => {
        this.task = task; // Update the task object with the latest details
      },
      error: (err) => {
        console.error('Error fetching task details:', err);
      },
    });
  }
  
}
