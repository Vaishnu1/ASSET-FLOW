import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserGroupMappingComponent } from './user-group-mapping.component';

describe('UserGroupMappingComponent', () => {
  let component: UserGroupMappingComponent;
  let fixture: ComponentFixture<UserGroupMappingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
