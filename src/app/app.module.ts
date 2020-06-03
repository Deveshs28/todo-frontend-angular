import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { TodoCreateComponent } from './todo-create/todo-create.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TodoAddItemsComponent } from './todo-add-items/todo-add-items.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

import { CookieService } from 'ngx-cookie-service';
import { TodoHttpService } from './todo-http.service';
import { TodoRouteGuardService } from './todo-route-guard.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { MessagingService } from './messaging.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ChildItemComponent } from './todo-item-child/child-item/child-item.component';
import { AddTodoSubItemComponent } from './add-todo-sub-item/add-todo-sub-item.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { SocketService } from './socket.service';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    TodoCreateComponent,
    TodoDetailComponent,
    TodoListComponent,
    UserProfileComponent,
    TodoAddItemsComponent,
    UpdatePasswordComponent,
    NotFoundComponent,
    ServerErrorComponent,
    ChildItemComponent,
    AddTodoSubItemComponent,
    EditTodoComponent,
    LoadingBarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'registration', component: RegistrationComponent },
      {
        path: 'home',
        canActivate: [TodoRouteGuardService],
        component: TodoListComponent,
      },
      {
        path: 'create',
        canActivate: [TodoRouteGuardService],
        component: TodoCreateComponent,
      },
      {
        path: 'detail/:todoId',
        canActivate: [TodoRouteGuardService],
        component: TodoDetailComponent,
      },
      {
        path: 'addItems/:todoId',
        canActivate: [TodoRouteGuardService],
        component: TodoAddItemsComponent,
      },
      {
        path: 'addSubItem/:todoId/:itemId',
        canActivate: [TodoRouteGuardService],
        component: AddTodoSubItemComponent,
      },
      {
        path: 'editTodo/:todoId/:itemId',
        canActivate: [TodoRouteGuardService],
        component: EditTodoComponent,
      },
      {
        path: 'profile',
        canActivate: [TodoRouteGuardService],
        component: UserProfileComponent,
      },
      {
        path: 'updatePassword/:userId',
        component: UpdatePasswordComponent,
      },
      {
        path: 'serverError/:errorCode/:message',
        component: ServerErrorComponent,
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
  ],
  providers: [
    TodoHttpService,
    CookieService,
    TodoRouteGuardService,
    MessagingService,
    SocketService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
