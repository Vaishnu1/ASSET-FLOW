import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NumberControlListComponent } from './number-control-list.component';

describe('NumberControlListComponent', () => {
  let component: NumberControlListComponent;
  let fixture: ComponentFixture<NumberControlListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberControlListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberControlListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
