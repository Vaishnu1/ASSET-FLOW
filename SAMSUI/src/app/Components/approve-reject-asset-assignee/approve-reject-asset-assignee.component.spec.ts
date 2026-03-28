import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRejectAssetAssigneeComponent } from './approve-reject-asset-assignee.component';

describe('ApproveRejectAssetAssigneeComponent', () => {
  let component: ApproveRejectAssetAssigneeComponent;
  let fixture: ComponentFixture<ApproveRejectAssetAssigneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveRejectAssetAssigneeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveRejectAssetAssigneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
