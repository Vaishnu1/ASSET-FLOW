import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMasterCreateComponent } from './item-master-create.component';

describe('ItemMasterCreateComponent', () => {
  let component: ItemMasterCreateComponent;
  let fixture: ComponentFixture<ItemMasterCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemMasterCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemMasterCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
