import { Component, OnInit } from '@angular/core';
import { MessagingService } from './messaging.service';
import { SocketService } from './socket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'TODO List';
  message;

  constructor(
    private msgService: MessagingService,
    private socketService: SocketService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.msgService.getPermission();
    this.msgService.receiveMessage();
    this.msgService.tokenRefresh();
    // this.message = this.msgService.currentMessage;
    this.todoUpdated();
  }

  public todoUpdated() {
    this.socketService.todoUpdated().subscribe((info) => {
      console.log('todo-updated: ', info);
      let message = `${info.action} by ${info.user}`;
      this.toastr.success(message);
    });
  }
}
