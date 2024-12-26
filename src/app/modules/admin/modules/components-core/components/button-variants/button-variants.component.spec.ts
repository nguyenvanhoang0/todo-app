import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonVariantsComponent } from './button-variants.component';

describe('ButtonVariantsComponent', () => {
  let component: ButtonVariantsComponent;
  let fixture: ComponentFixture<ButtonVariantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonVariantsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonVariantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
