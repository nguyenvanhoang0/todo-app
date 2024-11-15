import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddBucketFormComponent } from './add-bucket-form.component';

describe('AddBucketFormComponent', () => {
  let component: AddBucketFormComponent;
  let fixture: ComponentFixture<AddBucketFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBucketFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddBucketFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
