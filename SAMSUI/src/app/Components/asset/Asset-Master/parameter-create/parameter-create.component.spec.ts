import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ParameterCreateComponent } from './parameter-create.component';

describe('ParameterCreateComponent', () => {
  let component: ParameterCreateComponent;
  let fixture: ComponentFixture<ParameterCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
