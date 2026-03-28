import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NotificationExplanationDialogComponent } from './notification-explanation-dialog.component';

describe('NotificationExplanationDialogComponent', () => {
  let component: NotificationExplanationDialogComponent;
  let fixture: ComponentFixture<NotificationExplanationDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationExplanationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationExplanationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
