import { Component, OnInit, HostListener } from '@angular/core';
import { TodoHttpService } from '../todo-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Location } from '@angular/common';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css'],
})
export class EditTodoComponent implements OnInit {
  public todoItemTitle;
  public todoHistory = [];
  public loading = false;
  constructor(
    private todoHttpService: TodoHttpService,
    private _route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private location: Location,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.getTodoItemDetail();
    this.getTodoHistory();
  }

  private getTodoItemDetail() {
    this.loading = true;
    let itemId = this._route.snapshot.paramMap.get('itemId');
    this.todoHttpService.todoSingleItemDetail(itemId).subscribe(
      (response) => {
        this.loading = false;
        console.log(response);
        if (response.status === 200) {
          this.todoItemTitle = response.data.title;
        } else {
          this.toastr.error(response.message);
        }
      },
      (err) => {
        this.loading = false;
        console.log(err);
        if (err.status === 404 || err.status === 500) {
          this.router.navigate([
            '/serverError',
            `${err.status}`,
            `${err.error.message}`,
          ]);
        } else {
          this.toastr.error(err.error.message);
        }
      }
    );
  }

  public editTodoItem() {
    this.loading = true;
    let todoId = this._route.snapshot.paramMap.get('todoId');
    let itemId = this._route.snapshot.paramMap.get('itemId');
    let userInfo = this.todoHttpService.getUserInfoFromLocalStorage();
    const data = {
      title: this.todoItemTitle,
      updatedBy: `${userInfo.firstName} ${userInfo.lastName}`,
      updatedById: userInfo.userId,
    };
    this.todoHttpService.editTodoItem(todoId, itemId, data).subscribe(
      (response) => {
        this.loading = false;
        if (response.status === 200) {
          this.toastr.success('Item Updated Successfully');
          const actionData = {
            userName: `${userInfo.firstName} ${userInfo.lastName}`,
            action: `Todo Title Updated To: ${this.todoItemTitle}`,
            todoItemId: itemId,
            todoId: todoId,
          };
          console.log('socket : ', actionData);
          this.socketService.emitTodoSuccess(actionData);
          this.location.back();
        } else {
          this.toastr.error(response.message);
        }
      },
      (err) => {
        this.loading = false;
        if (err.status === 404 || err.status === 500) {
          this.router.navigate([
            '/serverError',
            `${err.status}`,
            `${err.error.message}`,
          ]);
        } else {
          this.toastr.error(err.error.message);
        }
      }
    );
  }

  private getTodoHistory() {
    this.loading = true;
    let itemId = this._route.snapshot.paramMap.get('itemId');
    this.todoHttpService.todoItemHistory(itemId).subscribe(
      (response) => {
        this.loading = false;
        if (response.status === 200) {
          this.todoHistory = response.data;
        }
      },
      (err) => {
        this.loading = false;
      }
    );
  }

  @HostListener('window:keydown', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    let charCode = String.fromCharCode($event.which).toLowerCase();
    if (($event.ctrlKey || $event.metaKey) && charCode === 'z') {
      this.performUndoOperation();
    }
  }

  public performUndoOperation() {
    let todoId = this._route.snapshot.paramMap.get('todoId');
    let itemId = this._route.snapshot.paramMap.get('itemId');
    if (this.todoHistory.length > 0) {
      this.loading = true;
      this.todoHttpService.undoTodo(itemId).subscribe(
        (response) => {
          this.loading = false;
          if (response.status === 200) {
            console.log(response);
            this.toastr.success('Undo Successfully');
            let userInfo = this.todoHttpService.getUserInfoFromLocalStorage();
            const actionData = {
              userName: `${userInfo.firstName} ${userInfo.lastName}`,
              action: `${userInfo.firstName} ${userInfo.lastName} performs undo operation.`,
              todoItemId: itemId,
              todoId: todoId,
            };
            this.socketService.emitTodoSuccess(actionData);
            this.getTodoItemDetail();
            this.getTodoHistory();
          } else {
            this.toastr.error(response.message);
          }
        },
        (err) => {
          this.loading = false;
          this.toastr.error(err.error.message);
        }
      );
    } else {
      this.toastr.error('No last operation found');
    }
  }
}
