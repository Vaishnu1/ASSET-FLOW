import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItemRegisterListComponent } from './item-register-list.component';

describe('ItemRegisterListComponent', () => {
  let component: ItemRegisterListComponent;
  let fixture: ComponentFixture<ItemRegisterListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemRegisterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemRegisterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
