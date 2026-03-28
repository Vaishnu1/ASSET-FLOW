import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UpdateInstallationWoByBatchDialogComponent } from './update-installation-wo-by-batch-dialog.component';

describe('UpdateInstallationWoByBatchDialogComponent', () => {
  let component: UpdateInstallationWoByBatchDialogComponent;
  let fixture: ComponentFixture<UpdateInstallationWoByBatchDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateInstallationWoByBatchDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInstallationWoByBatchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
