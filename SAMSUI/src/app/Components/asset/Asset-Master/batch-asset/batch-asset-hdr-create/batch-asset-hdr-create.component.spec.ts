import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BatchAssetHdrCreateComponent } from './batch-asset-hdr-create.component';

describe('BatchAssetHdrCreateComponent', () => {
  let component: BatchAssetHdrCreateComponent;
  let fixture: ComponentFixture<BatchAssetHdrCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchAssetHdrCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchAssetHdrCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
