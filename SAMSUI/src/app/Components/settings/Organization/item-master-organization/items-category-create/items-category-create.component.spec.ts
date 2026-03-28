import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsCategoryCreateComponent } from './items-category-create.component';

describe('ItemsCategoryCreateComponent', () => {
  let component: ItemsCategoryCreateComponent;
  let fixture: ComponentFixture<ItemsCategoryCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsCategoryCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsCategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
