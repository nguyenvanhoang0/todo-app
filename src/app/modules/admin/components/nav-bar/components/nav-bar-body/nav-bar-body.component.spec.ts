import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBarBodyComponent } from './nav-bar-body.component';

describe('NavBarBodyComponent', () => {
  let component: NavBarBodyComponent;
  let fixture: ComponentFixture<NavBarBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarBodyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
