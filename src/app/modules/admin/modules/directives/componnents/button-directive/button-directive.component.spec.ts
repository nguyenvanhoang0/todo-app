import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonDirectiveComponent } from './button-directive.component';

describe('ButtonDirectiveComponent', () => {
  let component: ButtonDirectiveComponent;
  let fixture: ComponentFixture<ButtonDirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonDirectiveComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
