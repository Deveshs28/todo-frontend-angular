import { Component, OnInit } from '@angular/core';
import { TodoHttpService } from '../todo-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Location } from '@angular/common';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-add-todo-sub-item',
  templateUrl: './add-todo-sub-item.component.html',
  styleUrls: ['./add-todo-sub-item.component.css'],
})
export class AddTodoSubItemComponent implements OnInit {
  public todoItemTitle: string;
  public loading = false;
  constructor(
    private todoHttpService: TodoHttpService,
    private _route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private location: Location
  ) {}

  ngOnInit(): void {}

  public addSubTodoItem() {
    this.loading = true;
    let todoId = this._route.snapshot.paramMap.get('todoId');
    let itemId = this._route.snapshot.paramMap.get('itemId');
    let userInfo = this.todoHttpService.getUserInfoFromLocalStorage();
    const data = {
      title: this.todoItemTitle,
      createdBy: `${userInfo.firstName} ${userInfo.lastName}`,
      createdById: userInfo.userId,
    };
    this.todoHttpService.addTodoSubItem(todoId, itemId, data).subscribe(
      (response) => {
        this.loading = false;
        if (response.status === 200) {
          this.toastr.success('Item added successfully');
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
}
