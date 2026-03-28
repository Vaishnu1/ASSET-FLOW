import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentSubdepartmentCreateComponent } from './department-subdepartment-create.component';

describe('DepartmentSubdepartmentCreateComponent', () => {
  let component: DepartmentSubdepartmentCreateComponent;
  let fixture: ComponentFixture<DepartmentSubdepartmentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentSubdepartmentCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentSubdepartmentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
