import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItemTypeCreateComponent } from './item-type-create.component';

describe('ItemTypeCreateComponent', () => {
  let component: ItemTypeCreateComponent;
  let fixture: ComponentFixture<ItemTypeCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemTypeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
