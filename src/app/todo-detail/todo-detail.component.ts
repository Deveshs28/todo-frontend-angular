import { Component, OnInit } from '@angular/core';
import { TodoHttpService } from '../todo-http.service';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
})
export class TodoDetailComponent implements OnInit {
  private todoId: string;
  public todoItem = [];
  public loading = false;

  constructor(
    private todoHttpService: TodoHttpService,
    private _route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.todoId = this._route.snapshot.paramMap.get('todoId');
    this.getTodoDetails();
    this.viewTodo(this.todoId);
    this.todoUpdated();
  }

  private getTodoDetails() {
    this.loading = true;
    console.log(this.todoId);
    this.todoHttpService.todoDetail(this.todoId).subscribe(
      (response) => {
        this.loading = false;
        console.log(response);
        if (response.status === 200) {
          console.log('items: ', response.data.items);
          this.todoItem = response.data.items;
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

  public addTodoItem() {
    this.router.navigate(['/addItems', this.todoId]);
  }

  public viewTodo(todoId) {
    console.log('socket view todo : ', todoId);
    this.socketService.viewTodo(todoId);
  }

  public todoUpdated() {
    this.socketService.todoUpdated().subscribe((info) => {
      console.log('todo-updated: ', info);
      this.getTodoDetails();
    });
  }
}
