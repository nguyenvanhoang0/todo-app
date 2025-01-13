import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiLevelDropdownComponent } from './multi-level-dropdown.component';

describe('MultiLevelDropdownComponent', () => {
  let component: MultiLevelDropdownComponent;
  let fixture: ComponentFixture<MultiLevelDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiLevelDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiLevelDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
