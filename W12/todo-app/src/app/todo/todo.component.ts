import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class TodoComponent {
  tasks: { text: string; isEditing: boolean }[] = [];
  newTask: string = '';

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({ text: this.newTask.trim(), isEditing: false });
      this.newTask = '';
    }
  }

  editTask(index: number) {
    if (this.tasks[index].isEditing) {
      this.tasks[index].isEditing = false;
    } else {
      this.tasks[index].isEditing = true;
    }
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }
}
