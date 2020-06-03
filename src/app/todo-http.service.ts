import { Injectable } from '@angular/core';
import { Observable, throwError, from } from 'rxjs';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TodoHttpService {
  private url = 'https://api.epril-dev.co.in/api/v1/todolist';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  public register(data): Observable<any> {
    return this.http
      .post(`${this.url}/signup`, data)
      .pipe(catchError(this.handleError));
  }

  public loginUser(emailId, password): Observable<any> {
    const params = { email: emailId, password: password };
    return this.http
      .post(`${this.url}/login`, params)
      .pipe(catchError(this.handleError));
  }

  public forgotPassword(emailId): Observable<any> {
    const params = { email: emailId };
    return this.http
      .post(`${this.url}/forgot-password`, params)
      .pipe(catchError(this.handleError));
  }

  public updatePassword(userId, password): Observable<any> {
    const params = { password: password };
    return this.http
      .post(`${this.url}/update-password/${userId}`, params)
      .pipe(catchError(this.handleError));
  }

  public registerPushNotification(notificationToken): Observable<any> {
    let authToken = this.cookieService.get('authToken');
    let userId = this.cookieService.get('userId');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authToken: authToken,
    });
    let options = { headers: headers };
    let body = {
      notificationToken: notificationToken,
    };

    return this.http
      .post(`${this.url}/register-pushnotification/${userId}`, body, options)
      .pipe(catchError(this.handleError));
  }

  public logoutUser(): Observable<any> {
    let authToken = this.cookieService.get('authToken');
    let userId = this.cookieService.get('userId');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authToken: authToken,
    });
    let options = { headers: headers };

    return this.http
      .post(`${this.url}/logout/${userId}`, null, options)
      .pipe(catchError(this.handleError));
  }

  public userList(page, recordCount): Observable<any> {
    let authToken = this.cookieService.get('authToken');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authToken: authToken,
    });
    let options = { headers: headers };
    let userId = this.cookieService.get('userId');
    return this.http
      .get(`${this.url}/user/list/${userId}/${page}/${recordCount}`, options)
      .pipe(catchError(this.handleError));
  }

  public sendFriendRequest(data): Observable<any> {
    let authToken = this.cookieService.get('authToken');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authToken: authToken,
    });
    let options = { headers: headers };
    return this.http
      .post(`${this.url}/user/sendRequest`, data, options)
      .pipe(catchError(this.handleError));
  }

  public acceptFriendRequest(requestId): Observable<any> {
    let authToken = this.cookieService.get('authToken');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authToken: authToken,
    });
    let options = { headers: headers };
    return this.http
      .put(`${this.url}/user/acceptRequest/${requestId}`, null, options)
      .pipe(catchError(this.handleError));
  }

  public userFriendList(userId, page, recordCount): Observable<any> {
    let authToken = this.cookieService.get('authToken');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authToken: authToken,
    });
    let options = { headers: headers };
    return this.http
      .get(
        `${this.url}/user/friend/list/${userId}/${page}/${recordCount}`,
        options
      )
      .pipe(catchError(this.handleError));
  }

  public todoList(userId, page, recordCount): Observable<any> {
    let authToken = this.cookieService.get('authToken');
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      authToken: authToken,
    });
    let options = { headers: headers };
    return this.http
      .get(`${this.url}/todo/list/${userId}/${page}/${recordCount}`, options)
      .pipe(catchError(this.handleError));
  }

  public todoDetail(todoId): Observable<any> {
    let authToken = this.cookieService.get('authToken');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authToken: authToken,
    });
    let options = { headers: headers };
    return this.http
      .get(`${this.url}/todo/view/${todoId}`, options)
      .pipe(catchError(this.handleError));
  }

  public todoCreate(data): Observable<any> {
    let authToken = this.cookieService.get('authToken');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authToken: authToken,
    });
    let options = { headers: headers };
    return this.http
      .post(`${this.url}/todo/create`, data, options)
      .pipe(catchError(this.handleError));
  }

  public markTodoDone(todoId, itemId, data): Observable<any> {
    let authToken = this.cookieService.get('authToken');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authToken: authToken,
    });
    let options = { headers: headers };
    return this.http
      .put(`${this.url}/todo/${todoId}/${itemId}/markDone`, data, options)
      .pipe(catchError(this.handleError));
  }

  public todoItemHistory(itemId): Observable<any> {
    let authToken = this.cookieService.get('authToken');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authToken: authToken,
    });
    let options = { headers: headers };
    return this.http
      .get(`${this.url}/todo/${itemId}/itemHistory`, options)
      .pipe(catchError(this.handleError));
  }

  public editTodoItem(todoId, itemId, data): Observable<any> {
    let authToken = this.cookieService.get('authToken');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authToken: authToken,
    });
    let options = { headers: headers };
    return this.http
      .put(`${this.url}/todo/${todoId}/${itemId}/editItem`, data, options)
      .pipe(catchError(this.handleError));
  }

  public deleteTodoItem(todoId, itemId): Observable<any> {
    let authToken = this.cookieService.get('authToken');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authToken: authToken,
    });
    let options = { headers: headers };
    return this.http
      .post(`${this.url}/todo/${todoId}/${itemId}/deleteItem`, null, options)
      .pipe(catchError(this.handleError));
  }

  public addTodoSubItem(todoId, itemId, data): Observable<any> {
    let authToken = this.cookieService.get('authToken');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authToken: authToken,
    });
    let options = { headers: headers };
    return this.http
      .post(`${this.url}/todo/${todoId}/${itemId}/addSubItem`, data, options)
      .pipe(catchError(this.handleError));
  }

  public addTodoItem(todoId, data): Observable<any> {
    let authToken = this.cookieService.get('authToken');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authToken: authToken,
    });
    let options = { headers: headers };
    return this.http
      .post(`${this.url}/todo/${todoId}/addItem`, data, options)
      .pipe(catchError(this.handleError));
  }

  public todoSingleItemDetail(itemId): Observable<any> {
    let authToken = this.cookieService.get('authToken');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authToken: authToken,
    });
    let options = { headers: headers };
    return this.http
      .get(`${this.url}/todo/todoSingleItemDetail/${itemId}`, options)
      .pipe(catchError(this.handleError));
  }

  public undoTodo(itemId): Observable<any> {
    let authToken = this.cookieService.get('authToken');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authToken: authToken,
    });
    let options = { headers: headers };
    let userObj = this.getUserInfoFromLocalStorage();
    let bodyObj = {
      userId: userObj.userId,
      userName: `${userObj.firstName} ${userObj.lastName}`,
    };
    return this.http
      .put(`${this.url}/todo/undoTodoItem/${itemId}`, bodyObj, options)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(error);
  }

  public setUserInfoInLocalStorage = (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data));
  };

  public getUserInfoFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('userInfo'));
  };

  public removeUserInfoFromLocalStorage = () => {
    localStorage.removeItem('userInfo');
  };
}
