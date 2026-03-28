import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfirmConfirmationComponent } from './confirm-confirmation.component';

describe('ConfirmConfirmationComponent', () => {
  let component: ConfirmConfirmationComponent;
  let fixture: ComponentFixture<ConfirmConfirmationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
