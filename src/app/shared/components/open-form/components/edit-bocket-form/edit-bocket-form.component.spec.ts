import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditBocketFormComponent } from './edit-bocket-form.component';

describe('EditBocketFormComponent', () => {
  let component: EditBocketFormComponent;
  let fixture: ComponentFixture<EditBocketFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBocketFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditBocketFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
