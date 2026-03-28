import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CategoryDepartmentMappingComponent } from './category-department-mapping.component';

describe('CategoryDepartmentMappingComponent', () => {
  let component: CategoryDepartmentMappingComponent;
  let fixture: ComponentFixture<CategoryDepartmentMappingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryDepartmentMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDepartmentMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
