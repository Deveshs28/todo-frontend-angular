import { Component, OnInit } from '@angular/core';
import { TodoHttpService } from '../todo-http.service';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Location } from '@angular/common';

@Component({
  selector: 'app-todo-add-items',
  templateUrl: './todo-add-items.component.html',
  styleUrls: ['./todo-add-items.component.css'],
})
export class TodoAddItemsComponent implements OnInit {
  public todoItemTitle: string;
  private todoId: string;
  public loading = false;

  constructor(
    private todoHttpService: TodoHttpService,
    private _route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.todoId = this._route.snapshot.paramMap.get('todoId');
  }

  public addTodoItem(): any {
    this.loading = true;
    let userData = this.todoHttpService.getUserInfoFromLocalStorage();
    let todoData = {
      title: this.todoItemTitle,
      createdBy: userData.userId,
      createdById: `${userData.firstName} ${userData.lastName}`,
    };
    this.todoHttpService.addTodoItem(this.todoId, todoData).subscribe(
      (data) => {
        this.loading = false;
        console.log(data);
        if (data.status === 200) {
          this.toastr.success('Item added successfully');
          this.location.back();
        } else {
          this.toastr.error('Error while adding todo item');
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
}
