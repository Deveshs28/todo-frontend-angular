import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoSubItemComponent } from './add-todo-sub-item.component';

describe('AddTodoSubItemComponent', () => {
  let component: AddTodoSubItemComponent;
  let fixture: ComponentFixture<AddTodoSubItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTodoSubItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoSubItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
