import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';

import * as firebase from 'firebase/app';
import '@firebase/messaging';

import { BehaviorSubject } from 'rxjs';
import { TodoHttpService } from './todo-http.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class MessagingService {
  messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(null);
  constructor(
    private angularFireDB: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private angularFireMessaging: AngularFireMessaging,
    private todoHttpService: TodoHttpService,
    private cookieService: CookieService
  ) {}

  private updateToken(token) {
    if (this.cookieService.get('userId')) {
      if (this.cookieService.get('FcToken')) {
        this.cookieService.delete('FcToken');
      }
      this.todoHttpService.registerPushNotification(token).subscribe(
        (response) => {
          console.log(response);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.cookieService.set('FcToken', token);
    }
  }

  getPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
        this.updateToken(token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  receiveMessage() {
    this.angularFireMessaging.onMessage((payload) => {
      console.log('Message received. ', payload);
      console.log('Message received. ', payload.notification.body);
      this.showNotificationPopup(payload);
    });
  }

  tokenRefresh() {
    this.angularFireMessaging.onTokenRefresh(() => {
      this.angularFireMessaging.requestToken.subscribe(
        (token) => {
          console.log(token);
          this.updateToken(token);
        },
        (err) => {
          console.error('Unable to get permission to notify.', err);
        }
      );
    });
  }

  private showNotificationPopup(payload: any) {
    let notificationData = payload['notification'];
    let title = notificationData['title'];

    let options = {
      body: notificationData['body'],
    };
    let notify: Notification = new Notification(title, options);
    notify.onclick = (event) => {
      event.preventDefault();
    };
  }
}
