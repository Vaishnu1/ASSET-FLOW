import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemBranchMappingComponent } from './item-branch-mapping.component';

describe('ItemBranchMappingComponent', () => {
  let component: ItemBranchMappingComponent;
  let fixture: ComponentFixture<ItemBranchMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemBranchMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemBranchMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
