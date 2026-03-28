import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccGrnListComponent } from './acc-grn-list.component';

describe('AccGrnListComponent', () => {
  let component: AccGrnListComponent;
  let fixture: ComponentFixture<AccGrnListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccGrnListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccGrnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
