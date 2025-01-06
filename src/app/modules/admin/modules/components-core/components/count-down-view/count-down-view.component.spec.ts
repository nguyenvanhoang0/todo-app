import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountDownViewComponent } from './count-down-view.component';

describe('CountDownViewComponent', () => {
  let component: CountDownViewComponent;
  let fixture: ComponentFixture<CountDownViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountDownViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CountDownViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
