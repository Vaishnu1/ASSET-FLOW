import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalAuditCreateConfirmationComponent } from './physical-audit-create-confirmation.component';

describe('PhysicalAuditCreateConfirmationComponent', () => {
  let component: PhysicalAuditCreateConfirmationComponent;
  let fixture: ComponentFixture<PhysicalAuditCreateConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicalAuditCreateConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalAuditCreateConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
