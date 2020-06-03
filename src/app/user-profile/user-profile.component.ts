import { Component, OnInit } from '@angular/core';
import { TodoHttpService } from '../todo-http.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  public allUsers = [];
  public friendList = [];
  public userInfo;
  private userListPage = '1';
  private userListRecordCount = '10';
  private friendListPage = '1';
  private friendListRecordCount = '10';
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
    this.userInfo = this.todoHttpService.getUserInfoFromLocalStorage();
    this.fetchAllUserList();
    this.fetchFriendList();
  }

  public trackByUser(index: number, user: any): string {
    return user.userId;
  }

  private fetchAllUserList() {
    this.loading = true;
    let previousData = this.allUsers.length > 0 ? this.allUsers.slice() : [];

    this.todoHttpService
      .userList(this.userListPage, this.userListRecordCount)
      .subscribe(
        (response) => {
          this.loading = false;
          console.log(response);
          if (response.status === 200) {
            if (this.allUsers.length > 0) {
              this.allUsers = response.data.concat(previousData);
            } else {
              this.allUsers = response.data;
            }
          } else {
            this.toasterServie.error(response.message);
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

  private fetchFriendList() {
    this.loading = true;
    let previousData =
      this.friendList.length > 0 ? this.friendList.slice() : [];
    this.todoHttpService
      .userFriendList(
        this.userInfo.userId,
        this.friendListPage,
        this.friendListRecordCount
      )
      .subscribe(
        (response) => {
          this.loading = false;
          if (response.status === 200) {
            if (this.friendList.length > 0) {
              this.friendList = response.data.concat(previousData);
            } else {
              this.friendList = response.data;
            }
          } else {
            this.toasterServie.error(response.message);
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

  public loadMoreFriends() {
    this.friendListPage = (Number(this.friendListPage) + 1).toString();
    this.fetchFriendList();
  }

  public loadMoreUsers() {
    this.userListPage = (Number(this.userListPage) + 1).toString();
    this.fetchAllUserList();
  }

  public isSenderAndUserSame(senderId): boolean {
    if (senderId === this.cookieService.get('userId')) {
      return true;
    } else {
      return false;
    }
  }

  public sendUserRequest(index) {
    this.loading = true;
    let user = this.allUsers[index];
    let userInfo = this.todoHttpService.getUserInfoFromLocalStorage();
    const data = {
      senderId: userInfo.userId,
      senderName: `${userInfo.firstName} ${userInfo.lastName}`,
      receiverId: user.userId,
      receiverName: `${user.firstName} ${user.lastName}`,
    };
    this.todoHttpService.sendFriendRequest(data).subscribe(
      (response) => {
        this.loading = false;
        if (response.status === 200) {
          this.toasterServie.success(response.message);
          this.userListPage = '1';
          this.fetchAllUserList();
        } else {
          this.toasterServie.error(response.message);
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

  public acceptRequest(index) {
    this.loading = true;
    let user = this.friendList[index];
    const requestId = user.requestId;
    this.todoHttpService.acceptFriendRequest(requestId).subscribe(
      (response) => {
        this.loading = false;
        if (response.status === 200) {
          this.toasterServie.success(response.message);
          this.friendListPage = '1';
          this.fetchFriendList();
        } else {
          this.toasterServie.error(response.message);
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

  public logout() {
    this.loading = true;
    this.todoHttpService.logoutUser().subscribe(
      (response) => {
        this.loading = false;
        if (response.status === 200) {
          this.toasterServie.success(response.message);
          if (this.cookieService.check('authToken'))
            this.cookieService.delete('authToken', '/');
          if (this.cookieService.check('userId'))
            this.cookieService.delete('userId', '/');
          this.todoHttpService.removeUserInfoFromLocalStorage();
          this.socketService.exitSocket();
          this.router.navigate(['/']);
        } else {
          this.toasterServie.error(response.message);
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
