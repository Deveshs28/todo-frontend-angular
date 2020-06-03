import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoAddItemsComponent } from './todo-add-items.component';

describe('TodoAddItemsComponent', () => {
  let component: TodoAddItemsComponent;
  let fixture: ComponentFixture<TodoAddItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoAddItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoAddItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
