import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubdepartmentListComponent } from './subdepartment-list.component';

describe('SubdepartmentListComponent', () => {
  let component: SubdepartmentListComponent;
  let fixture: ComponentFixture<SubdepartmentListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdepartmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdepartmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
