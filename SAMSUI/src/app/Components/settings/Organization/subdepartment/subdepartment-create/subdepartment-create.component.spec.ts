import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubdepartmentCreateComponent } from './subdepartment-create.component';

describe('SubdepartmentCreateComponent', () => {
  let component: SubdepartmentCreateComponent;
  let fixture: ComponentFixture<SubdepartmentCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdepartmentCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdepartmentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
