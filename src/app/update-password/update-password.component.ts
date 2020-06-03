import { Component, OnInit } from '@angular/core';
import { TodoHttpService } from '../todo-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { error } from 'protractor';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
})
export class UpdatePasswordComponent implements OnInit {
  public password: string;
  public userId: string;
  public loading = false;

  constructor(
    private todoHttpService: TodoHttpService,
    private _route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userId = this._route.snapshot.paramMap.get('userId');
  }

  public updatePassword() {
    if (!this.password) {
      this.toastr.warning('Enter password');
    } else {
      this.loading = true;
      this.todoHttpService.updatePassword(this.userId, this.password).subscribe(
        (response) => {
          this.loading = false;
          console.log(response);
          if (response.status === 200) {
            this.toastr.success('Password updated successfully');
            this.router.navigate(['/home'], { queryParams: { userId: '' } });
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
}
