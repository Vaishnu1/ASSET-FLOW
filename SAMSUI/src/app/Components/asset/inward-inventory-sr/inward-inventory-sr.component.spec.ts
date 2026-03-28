import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InwardInventorySrComponent } from './inward-inventory-sr.component';

describe('InwardInventorySrComponent', () => {
  let component: InwardInventorySrComponent;
  let fixture: ComponentFixture<InwardInventorySrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InwardInventorySrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InwardInventorySrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
