import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { Task, Category } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  tasks: Task[] = [];
  categories: Category[] = [];
  filteredTasks: Task[] = [];
  selectedCategoryId: string = '';
  showCategoriesFeature = true;
  private destroy$ = new Subject<void>();

  constructor(
    private taskService: TaskService,
    private firebaseService: FirebaseService,
    private alertController: AlertController,
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadFeatureFlags();
    this.loadData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadFeatureFlags() {
    this.showCategoriesFeature = this.firebaseService.getFeatureFlag('show_categories_feature');
    
    // Dark theme feature flag
    const darkThemeEnabled = this.firebaseService.getFeatureFlag('enable_dark_theme');
    if (darkThemeEnabled) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  private loadData() {
    this.taskService.tasks$
      .pipe(takeUntil(this.destroy$))
      .subscribe(tasks => {
        this.tasks = tasks;
        this.filterTasks();
      });

    this.taskService.categories$
      .pipe(takeUntil(this.destroy$))
      .subscribe(categories => {
        this.categories = categories;
      });
  }

  filterTasks() {
    if (this.selectedCategoryId && this.selectedCategoryId !== '') {
      this.filteredTasks = this.tasks.filter(task => task.categoryId === this.selectedCategoryId);
    } else {
      this.filteredTasks = this.tasks;
    }
  }

  onCategoryFilter(categoryId: any) {
    this.selectedCategoryId = String(categoryId || '');
    this.filterTasks();
  }

  async addTask() {
    const alert = await this.alertController.create({
      header: 'Nueva Tarea',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Título de la tarea'
        },
        {
          name: 'description',
          type: 'textarea',
          placeholder: 'Descripción (opcional)'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Agregar',
          handler: async (data) => {
            if (data.title.trim()) {
              await this.taskService.addTask({
                title: data.title.trim(),
                description: data.description?.trim(),
                completed: false,
                categoryId: this.selectedCategoryId || undefined
              });
              this.showToast('Tarea agregada exitosamente');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async toggleTask(task: Task) {
    await this.taskService.updateTask(task.id, { completed: !task.completed });
  }

  async deleteTask(task: Task) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que quieres eliminar esta tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.taskService.deleteTask(task.id);
            this.showToast('Tarea eliminada');
          }
        }
      ]
    });
    await alert.present();
  }

  async addCategory() {
    const alert = await this.alertController.create({
      header: 'Nueva Categoría',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre de la categoría'
        },
        {
          name: 'color',
          type: 'text',
          placeholder: 'Color (ej: primary, secondary, success)',
          value: 'primary'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Crear',
          handler: async (data) => {
            if (data.name.trim()) {
              await this.taskService.addCategory({
                name: data.name.trim(),
                color: data.color || 'primary'
              });
              this.showToast('Categoría creada exitosamente');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteCategory(category: Category) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Eliminar esta categoría? Las tareas asociadas perderán su categoría.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.taskService.deleteCategory(category.id);
            this.showToast('Categoría eliminada');
            if (this.selectedCategoryId === category.id) {
              this.selectedCategoryId = '';
              this.filterTasks();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  getCategoryName(categoryId?: string): string {
    if (!categoryId) return '';
    const category = this.categories.find(c => c.id === categoryId);
    return category?.name || '';
  }

  getCategoryColor(categoryId?: string): string {
    if (!categoryId) return 'medium';
    const category = this.categories.find(c => c.id === categoryId);
    return category?.color || 'medium';
  }

  trackByTaskId(index: number, task: Task): string {
    return task.id;
  }

  async deleteAllTasks() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Eliminar todas las tareas visibles?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar Todas',
          handler: async () => {
            for (const task of this.filteredTasks) {
              await this.taskService.deleteTask(task.id);
            }
            this.showToast('Todas las tareas eliminadas');
          }
        }
      ]
    });
    await alert.present();
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}