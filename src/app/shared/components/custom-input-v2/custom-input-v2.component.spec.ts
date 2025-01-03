import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomInputV2Component } from './custom-input-v2.component';

describe('CustomInputV2Component', () => {
  let component: CustomInputV2Component;
  let fixture: ComponentFixture<CustomInputV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomInputV2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomInputV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
