import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetPhysicalAuditListComponent } from './asset-physical-audit-list.component';

describe('AssetPhysicalAuditListComponent', () => {
  let component: AssetPhysicalAuditListComponent;
  let fixture: ComponentFixture<AssetPhysicalAuditListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetPhysicalAuditListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetPhysicalAuditListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
