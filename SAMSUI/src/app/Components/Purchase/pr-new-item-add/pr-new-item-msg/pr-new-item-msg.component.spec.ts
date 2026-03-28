import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrNewItemMsgComponent } from './pr-new-item-msg.component';

describe('PrNewItemMsgComponent', () => {
  let component: PrNewItemMsgComponent;
  let fixture: ComponentFixture<PrNewItemMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrNewItemMsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrNewItemMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
