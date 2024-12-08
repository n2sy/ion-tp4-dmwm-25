import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GestionTaskService } from '../gestion-task.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  showAddBtn = true;
  allTasks = [];
  currentDate: Date;
  constructor(
    private gestionTasks: GestionTaskService,
    private alertCtrl: AlertController
  ) {}

  toggleShowAddBtn() {
    this.showAddBtn = !this.showAddBtn;
    //!!this.showAddBtn;
  }

  onCheckedChange(newValueChecked, taskId) {
    this.gestionTasks.updateTask(newValueChecked, taskId).subscribe({
      next: (response) => {
        console.log(response);
        let i = this.allTasks.findIndex((t) => t.id == taskId);
        this.allTasks[i].checked = newValueChecked;
      },
    });
  }

  async onDelete(taskId) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Etes vous sûr de vouloir supprimer ce task ?',
      buttons: [
        'Non',
        {
          text: 'Oui',
          handler: () => {
            this.gestionTasks.deleteTask(taskId).subscribe({
              next: (response) => {
                let i = this.allTasks.findIndex((t) => t.id == taskId);
                this.allTasks.splice(i, 1);
              },
            });
          },
        },
      ],
    });

    await alert.present();
  }

  onAdd(textValue) {
    this.gestionTasks
      .addTask({
        text: textValue,
        date: new Date(),
        checked: false,
      })
      .subscribe({
        next: (response) => {
          console.log(response);
          this.gestionTasks.getTaskById(response['name']).subscribe({
            next: (data) => {
              this.allTasks.push({
                id: response['name'],
                ...data,
              });
            },
          });
          this.toggleShowAddBtn();
        },
      });
  }

  ngOnInit() {
    this.currentDate = new Date();
    this.gestionTasks.getAllTasks().subscribe({
      next: (response) => {
        console.log(response);

        for (const key in response) {
          this.allTasks.push({
            id: key,
            ...response[key],
          });
        }
        console.log(this.allTasks);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
