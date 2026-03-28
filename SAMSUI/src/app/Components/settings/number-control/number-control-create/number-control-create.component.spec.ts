import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NumberControlCreateComponent } from './number-control-create.component';

describe('NumberControlCreateComponent', () => {
  let component: NumberControlCreateComponent;
  let fixture: ComponentFixture<NumberControlCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberControlCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberControlCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
