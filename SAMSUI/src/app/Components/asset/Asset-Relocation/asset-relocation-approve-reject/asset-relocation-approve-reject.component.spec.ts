import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetRelocationApproveRejectComponent } from './asset-relocation-approve-reject.component';

describe('AssetRelocationApproveRejectComponent', () => {
  let component: AssetRelocationApproveRejectComponent;
  let fixture: ComponentFixture<AssetRelocationApproveRejectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetRelocationApproveRejectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetRelocationApproveRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
