import { Component, OnInit, Input } from '@angular/core';
import { TodoHttpService } from 'src/app/todo-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-child-item',
  templateUrl: './child-item.component.html',
  styleUrls: ['./child-item.component.css'],
})
export class ChildItemComponent implements OnInit {
  @Input() todo;
  @Input() index;

  constructor(
    private todoHttpService: TodoHttpService,
    private _route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private location: Location
  ) {}

  ngOnInit(): void {}

  public addTodoSubItem(todo) {
    this.router.navigate(['/addSubItem', todo.todoId, todo.itemId]);
  }

  public editItem(todo) {
    this.router.navigate(['/editTodo', todo.todoId, todo.itemId]);
  }

  public openAgainItem(todo) {
    let userData = this.todoHttpService.getUserInfoFromLocalStorage();
    const data = {
      updatedBy: `${userData.firstName} ${userData.lastName}`,
      updatedById: userData.userId,
      completed: false,
    };
    this.todoHttpService.markTodoDone(todo.todoId, todo.itemId, data).subscribe(
      (response) => {
        if (response.status === 200) {
          this.toastr.success('Item marked done successfully');
        } else {
          this.toastr.error(response.message);
        }
      },
      (err) => {
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

  public deleteTodoItem(todo) {
    this.todoHttpService.deleteTodoItem(todo.todoId, todo.itemId).subscribe(
      (response) => {
        if (response.status === 200) {
          this.toastr.success('Todo Deleted Successfully');
        } else {
          this.toastr.error(response.message);
        }
      },
      (err) => {
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

  public markDoneItem(todo) {
    let userData = this.todoHttpService.getUserInfoFromLocalStorage();
    const data = {
      updatedBy: `${userData.firstName} ${userData.lastName}`,
      updatedById: userData.userId,
      completed: true,
    };
    this.todoHttpService.markTodoDone(todo.todoId, todo.itemId, data).subscribe(
      (response) => {
        if (response.status === 200) {
          this.toastr.success('Item marked done successfully');
        } else {
          this.toastr.error(response.message);
        }
      },
      (err) => {
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
