import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private firebaseService: FirebaseService
  ) {}

  async ngOnInit() {
    await this.platform.ready();
    await this.firebaseService.fetchRemoteConfig();
  }
}