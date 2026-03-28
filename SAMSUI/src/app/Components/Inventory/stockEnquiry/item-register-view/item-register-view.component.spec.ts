import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItemRegisterViewComponent } from './item-register-view.component';

describe('ItemRegisterViewComponent', () => {
  let component: ItemRegisterViewComponent;
  let fixture: ComponentFixture<ItemRegisterViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemRegisterViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemRegisterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
