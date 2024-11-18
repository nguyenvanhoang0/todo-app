import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddBucketItemFormComponent } from './add-bucket-item-form.component';

describe('AddBucketItemFormComponent', () => {
  let component: AddBucketItemFormComponent;
  let fixture: ComponentFixture<AddBucketItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBucketItemFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddBucketItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
