import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GroupAccessComponent } from './group-access.component';

describe('GroupAccessComponent', () => {
  let component: GroupAccessComponent;
  let fixture: ComponentFixture<GroupAccessComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
