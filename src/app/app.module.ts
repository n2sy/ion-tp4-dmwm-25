import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const firebaseConfig = {
  apiKey: 'AIzaSyBDDfZzZShRyDiMtYA41lafi7xGYCgDQ4g',
  authDomain: 'ng-tasks-c6b03.firebaseapp.com',
  databaseURL: 'https://ng-tasks-c6b03.firebaseio.com',
  projectId: 'ng-tasks-c6b03',
  storageBucket: 'ng-tasks-c6b03.firebasestorage.app',
  messagingSenderId: '577282019785',
  appId: '1:577282019785:web:db19d822bc874e0b18d818',
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
