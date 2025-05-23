import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemContentComponent } from './item-content.component';

describe('ItemContentComponent', () => {
  let component: ItemContentComponent;
  let fixture: ComponentFixture<ItemContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
