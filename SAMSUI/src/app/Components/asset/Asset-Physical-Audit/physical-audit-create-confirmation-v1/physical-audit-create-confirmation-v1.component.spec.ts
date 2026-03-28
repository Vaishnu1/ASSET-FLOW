import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalAuditCreateConfirmationV1Component } from './physical-audit-create-confirmation-v1.component';

describe('PhysicalAuditCreateConfirmationV1Component', () => {
  let component: PhysicalAuditCreateConfirmationV1Component;
  let fixture: ComponentFixture<PhysicalAuditCreateConfirmationV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicalAuditCreateConfirmationV1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalAuditCreateConfirmationV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
