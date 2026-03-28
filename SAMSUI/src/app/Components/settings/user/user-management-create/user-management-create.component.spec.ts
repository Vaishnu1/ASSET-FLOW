import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserManagementCreateComponent } from './user-management-create.component';

describe('UserManagementCreateComponent', () => {
  let component: UserManagementCreateComponent;
  let fixture: ComponentFixture<UserManagementCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManagementCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
