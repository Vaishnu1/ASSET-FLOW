import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectReasonViewComponent } from './reject-reason-view.component';

describe('RejectReasonViewComponent', () => {
  let component: RejectReasonViewComponent;
  let fixture: ComponentFixture<RejectReasonViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectReasonViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectReasonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
