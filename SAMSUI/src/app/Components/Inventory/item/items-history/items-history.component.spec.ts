import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsHistoryComponent } from './items-history.component';

describe('ItemsHistoryComponent', () => {
  let component: ItemsHistoryComponent;
  let fixture: ComponentFixture<ItemsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
