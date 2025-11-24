import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getRemoteConfig, fetchAndActivate, getValue } from 'firebase/remote-config';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private remoteConfig: any;

  constructor() {
    this.initializeFirebase();
  }

  private async initializeFirebase() {
    try {
      const app = initializeApp(environment.firebase);
      this.remoteConfig = getRemoteConfig(app);
      this.remoteConfig.settings.minimumFetchIntervalMillis = 0; // Always fetch for testing
      
      // Set default values
      this.remoteConfig.defaultConfig = {
        'show_categories_feature': true,
        'max_tasks_per_category': 50,
        'enable_dark_theme': false
      };
      
      console.log('Firebase initialized successfully');
      await this.fetchRemoteConfig();
    } catch (error) {
      console.error('Firebase initialization error:', error);
    }
  }

  async fetchRemoteConfig(): Promise<void> {
    try {
      await fetchAndActivate(this.remoteConfig);
      console.log('Remote Config fetched successfully');
      console.log('Categories feature:', this.getFeatureFlag('show_categories_feature'));
    } catch (error) {
      console.error('Error fetching remote config:', error);
    }
  }

  getFeatureFlag(key: string): boolean {
    try {
      const value = getValue(this.remoteConfig, key);
      return value.asBoolean();
    } catch (error) {
      console.error('Error getting feature flag:', error);
      return false;
    }
  }

  getRemoteConfigValue(key: string): string {
    try {
      const value = getValue(this.remoteConfig, key);
      return value.asString();
    } catch (error) {
      console.error('Error getting remote config value:', error);
      return '';
    }
  }
}