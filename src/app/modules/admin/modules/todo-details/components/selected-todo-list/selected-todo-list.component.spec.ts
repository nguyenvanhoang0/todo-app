import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectedTodoListComponent } from './selected-todo-list.component';

describe('SelectedTodoListComponent', () => {
  let component: SelectedTodoListComponent;
  let fixture: ComponentFixture<SelectedTodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedTodoListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectedTodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
