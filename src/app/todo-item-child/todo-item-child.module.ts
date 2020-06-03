import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildItemComponent } from './child-item/child-item.component';



@NgModule({
  declarations: [ChildItemComponent],
  imports: [
    CommonModule
  ]
})
export class TodoItemChildModule { }
