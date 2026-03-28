import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserLocationListComponent } from './user-location-list.component';

describe('UserLocationListComponent', () => {
  let component: UserLocationListComponent;
  let fixture: ComponentFixture<UserLocationListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLocationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
