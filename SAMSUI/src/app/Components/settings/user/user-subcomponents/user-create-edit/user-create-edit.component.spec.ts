import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserCreateEditComponent } from './user-create-edit.component';

describe('UserCreateEditComponent', () => {
  let component: UserCreateEditComponent;
  let fixture: ComponentFixture<UserCreateEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
