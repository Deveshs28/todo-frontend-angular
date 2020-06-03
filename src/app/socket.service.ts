import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private url = 'https://api.epril-dev.co.in';

  private socket;

  constructor(public http: HttpClient) {
    this.socket = io(this.url);
  }

  public viewTodo = (todoId) => {
    this.socket.emit('view-todo', todoId);
  };

  public emitTodoSuccess = (data) => {
    this.socket.emit('edit-todo-success', data);
  };

  public todoUpdated = () => {
    return Observable.create((observer) => {
      this.socket.on('todo-updated', (info) => {
        console.log('socket: info : ', info);
        observer.next(info);
      });
    });
  };

  public exitSocket = () => {
    this.socket.disconnect();
  };
}
