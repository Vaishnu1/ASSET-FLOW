import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetPhysicalAuditCreateComponent } from './asset-physical-audit-create.component';

describe('AssetPhysicalAuditCreateComponent', () => {
  let component: AssetPhysicalAuditCreateComponent;
  let fixture: ComponentFixture<AssetPhysicalAuditCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetPhysicalAuditCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetPhysicalAuditCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
