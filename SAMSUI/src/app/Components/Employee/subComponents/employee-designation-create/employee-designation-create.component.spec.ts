import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmployeeDesignationCreateComponent } from './employee-designation-create.component';

describe('EmployeeDesignationCreateComponent', () => {
  let component: EmployeeDesignationCreateComponent;
  let fixture: ComponentFixture<EmployeeDesignationCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDesignationCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDesignationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
