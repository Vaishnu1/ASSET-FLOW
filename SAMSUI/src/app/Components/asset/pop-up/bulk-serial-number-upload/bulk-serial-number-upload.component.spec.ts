import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BulkSerialNumberUploadComponent } from './bulk-serial-number-upload.component';

describe('BulkSerialNumberUploadComponent', () => {
  let component: BulkSerialNumberUploadComponent;
  let fixture: ComponentFixture<BulkSerialNumberUploadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkSerialNumberUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkSerialNumberUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
