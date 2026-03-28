import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetPhysicalAuditEditComponent } from './asset-physical-audit-edit.component';

describe('AssetPhysicalAuditEditComponent', () => {
  let component: AssetPhysicalAuditEditComponent;
  let fixture: ComponentFixture<AssetPhysicalAuditEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetPhysicalAuditEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetPhysicalAuditEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
