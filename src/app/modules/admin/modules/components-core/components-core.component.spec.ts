import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentsCoreComponent } from './components-core.component';

describe('ComponentsCoreComponent', () => {
  let component: ComponentsCoreComponent;
  let fixture: ComponentFixture<ComponentsCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsCoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentsCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
