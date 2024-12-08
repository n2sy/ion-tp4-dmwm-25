import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GestionTaskService {
  constructor(private http: HttpClient) {}

  getAllTasks() {
    return this.http.get('https://ng-tasks-c6b03.firebaseio.com/Tasks.json');
  }

  addTask(newTask) {
    return this.http.post(
      'https://ng-tasks-c6b03.firebaseio.com/Tasks.json',
      newTask
    );
  }

  deleteTask(taskId) {
    return this.http.delete(
      `https://ng-tasks-c6b03.firebaseio.com/Tasks/${taskId}.json`
    );
  }

  getTaskById(id) {
    return this.http.get(
      `https://ng-tasks-c6b03.firebaseio.com/Tasks/${id}.json`
    );
  }
  updateTask(checkedValue, taskId) {
    return this.http.patch(
      `https://ng-tasks-c6b03.firebaseio.com/Tasks/${taskId}.json`,
      {
        checked: checkedValue,
      }
    );
  }
}
