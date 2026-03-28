import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserMainComponent } from './user-main.component';

describe('UserMainComponent', () => {
  let component: UserMainComponent;
  let fixture: ComponentFixture<UserMainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
