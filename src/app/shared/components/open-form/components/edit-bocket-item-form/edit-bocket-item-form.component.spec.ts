import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditBocketItemFormComponent } from './edit-bocket-item-form.component';

describe('EditBocketItemFormComponent', () => {
  let component: EditBocketItemFormComponent;
  let fixture: ComponentFixture<EditBocketItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBocketItemFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditBocketItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
