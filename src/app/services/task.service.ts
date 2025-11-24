import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task, Category } from '../models/task.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  
  tasks$ = this.tasksSubject.asObservable();
  categories$ = this.categoriesSubject.asObservable();

  constructor(private storage: StorageService) {
    this.loadTasks();
    this.loadCategories();
  }

  async loadTasks() {
    const tasks = await this.storage.get('tasks') || [];
    this.tasksSubject.next(tasks);
  }

  async loadCategories() {
    const categories = await this.storage.get('categories') || [];
    this.categoriesSubject.next(categories);
  }

  async addTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const tasks = [...this.tasksSubject.value, newTask];
    await this.storage.set('tasks', tasks);
    this.tasksSubject.next(tasks);
  }

  async updateTask(taskId: string, updates: Partial<Task>): Promise<void> {
    const tasks = this.tasksSubject.value.map(task => 
      task.id === taskId ? { ...task, ...updates, updatedAt: new Date() } : task
    );
    await this.storage.set('tasks', tasks);
    this.tasksSubject.next(tasks);
  }

  async deleteTask(taskId: string): Promise<void> {
    const tasks = this.tasksSubject.value.filter(task => task.id !== taskId);
    await this.storage.set('tasks', tasks);
    this.tasksSubject.next(tasks);
  }

  async addCategory(category: Omit<Category, 'id' | 'createdAt'>): Promise<void> {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    const categories = [...this.categoriesSubject.value, newCategory];
    await this.storage.set('categories', categories);
    this.categoriesSubject.next(categories);
  }

  async deleteCategory(categoryId: string): Promise<void> {
    const categories = this.categoriesSubject.value.filter(cat => cat.id !== categoryId);
    await this.storage.set('categories', categories);
    this.categoriesSubject.next(categories);
    
    // Remove category from tasks
    const tasks = this.tasksSubject.value.map(task => 
      task.categoryId === categoryId ? { ...task, categoryId: undefined } : task
    );
    await this.storage.set('tasks', tasks);
    this.tasksSubject.next(tasks);
  }

  getTasksByCategory(categoryId?: string): Observable<Task[]> {
    return new BehaviorSubject(
      this.tasksSubject.value.filter(task => 
        categoryId ? task.categoryId === categoryId : !task.categoryId
      )
    ).asObservable();
  }
}