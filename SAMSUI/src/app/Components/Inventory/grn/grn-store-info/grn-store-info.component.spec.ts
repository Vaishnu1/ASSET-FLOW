import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnStoreInfoComponent } from './grn-store-info.component';

describe('GrnStoreInfoComponent', () => {
  let component: GrnStoreInfoComponent;
  let fixture: ComponentFixture<GrnStoreInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrnStoreInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnStoreInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
