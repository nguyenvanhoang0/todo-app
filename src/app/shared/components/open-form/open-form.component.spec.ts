import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenFormComponent } from './open-form.component';

describe('OpenFormComponent', () => {
  let component: OpenFormComponent;
  let fixture: ComponentFixture<OpenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpenFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
