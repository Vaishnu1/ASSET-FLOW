import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccPoListComponent } from './acc-po-list.component';

describe('AccPoListComponent', () => {
  let component: AccPoListComponent;
  let fixture: ComponentFixture<AccPoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccPoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccPoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
