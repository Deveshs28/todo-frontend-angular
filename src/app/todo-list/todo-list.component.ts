import { Component, OnInit } from '@angular/core';
import { TodoHttpService } from '../todo-http.service';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  public allTodos = [];
  public page: string = '1';
  public recordCount = '10';
  public userId: string = '';
  public loading = false;
  constructor(
    private todoHttpService: TodoHttpService,
    private toasterServie: ToastrService,
    private _route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    // this.router.navigate(['/login'],{ queryParams: { userId:'1234'}})
    if (this._route.queryParams) {
      if (
        this._route.snapshot.queryParams['userId'] === '' ||
        this._route.snapshot.queryParams['userId'] === null ||
        this._route.snapshot.queryParams['userId'] === undefined
      ) {
        this.userId = this.cookieService.get('userId');
      } else {
        this.userId = this._route.snapshot.queryParams['userId'];
      }
    } else {
      this.userId = this.cookieService.get('userId');
    }
    this.getTodoList();
  }

  public getTodoList() {
    this.loading = true;
    this.todoHttpService
      .todoList(this.userId, this.page, this.recordCount)
      .subscribe(
        (data) => {
          this.loading = false;
          console.log(data);
          if (data.status === 200) {
            this.allTodos = data['data'];
          } else {
            this.toasterServie.error(data.message);
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
            this.toasterServie.error(err.error.message);
          }
        }
      );
  }
}
