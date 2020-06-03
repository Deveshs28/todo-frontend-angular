import { Component, OnInit } from '@angular/core';

import { TodoHttpService } from '../todo-http.service';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css'],
})
export class TodoCreateComponent implements OnInit {
  public todoTitle: string;
  public loading = false;
  constructor(
    private todoHttpService: TodoHttpService,
    private _route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  public createTodo(): any {
    this.loading = true;
    let userData = this.todoHttpService.getUserInfoFromLocalStorage();
    let todoData = {
      title: this.todoTitle,
      userId: userData.userId,
      username: `${userData.firstName} ${userData.lastName}`,
    };
    this.todoHttpService.todoCreate(todoData).subscribe(
      (data) => {
        this.loading = false;
        console.log(data);
        if (data.status === 200) {
          this.toastr.success('Todo created successfully');
          this.router.navigate(['/home'], { queryParams: { userId: '' } });
        } else {
          this.toastr.error('Error while creating todo');
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
