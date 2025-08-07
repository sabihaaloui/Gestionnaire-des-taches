import { Component } from '@angular/core';

interface Task {
  id: number;
  title: string;
  desc: string;
  start: string;
  end: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title: string = '';
  desc: string = '';
  start: string = '';
  end: string = '';

  tasks: Task[] = [];
  editId: number | null = null;

  activeDetailsId: number | null = null;
  showModal: boolean = false;
  modalTask: Task | null = null;

  addOrUpdateTask() {
    if (!this.title || !this.start || !this.end) {
      alert('Veuillez remplir au minimum le titre, la date de début et la date de fin.');
      return;
    }

    if (this.editId !== null) {
      // Modifier tâche existante
      const index = this.tasks.findIndex(t => t.id === this.editId);
      if (index !== -1) {
        this.tasks[index] = {
          id: this.editId,
          title: this.title,
          desc: this.desc,
          start: this.start,
          end: this.end
        };
      }
      this.editId = null;
    } else {
      // Ajouter nouvelle tâche
      const newTask: Task = {
        id: Date.now(),
        title: this.title,
        desc: this.desc,
        start: this.start,
        end: this.end
      };
      this.tasks.push(newTask);
    }

    // Reset form
    this.title = '';
    this.desc = '';
    this.start = '';
    this.end = '';
  }

  editTask(task: Task) {
    this.editId = task.id;
    this.title = task.title;
    this.desc = task.desc;
    this.start = task.start;
    this.end = task.end;
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    if (this.activeDetailsId === id) {
      this.activeDetailsId = null;
    }
  }

  toggleInlineDetails(id: number) {
    this.activeDetailsId = this.activeDetailsId === id ? null : id;
  }

  showDetails(task: Task) {
    this.modalTask = task;
    this.showModal = true;
  }

  closeDetails() {
    this.showModal = false;
    this.modalTask = null;
  }
}
