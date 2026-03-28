import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { Location } from '@angular/common';
import { ConfirmConfirmationComponent } from '../../Common-components/confirm-confirmation/confirm-confirmation.component';

@Component({
  selector: 'app-sr-re-open',
  templateUrl: './sr-re-open.component.html',
  styleUrls: ['./sr-re-open.component.css']
})
export class SrReOpenComponent implements OnInit {

  srReOpenForm : FormGroup;

  buttonDisplay: String = 'Update';
  uploadReOpenFlag : boolean = false;
  updateByBatch = false;

  constructor(public dialogRef: MatDialogRef<SrReOpenComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private commonService: CommonService,
              private dialog: MatDialog,
              private readonly location: Location) { }

  ngOnInit() {
      
    this.srReOpenForm = new FormGroup({
      srReOpenedId : new FormControl(0),
      srId : new FormControl(this.data.srId),
      reOpenedById: new FormControl(this.data.reOpenedById),
      reOpenedBy: new FormControl(this.data.reOpenedBy),
      reOpenedDtDisp : new FormControl(this.data.reOpenedDtDisp),
      reOpenedRemarks : new FormControl(this.data.reOpenedRemarks),
      updateByBatch: new FormControl(this.data.updateByBatch),
      selectedSrIdList: new FormControl(this.data.selectedSrIdList)
    });
    this.srReOpenForm.controls.reOpenedBy.disable();
    this.srReOpenForm.controls.reOpenedDtDisp.disable();
    this.updateByBatch = this.data.updateByBatch;

  }

  close() {
    this.dialogRef.close();
  }

  reOpenSRByCheckingConfirmation() {
    if(this.updateByBatch) {
      const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
        height: 'auto',
        width: '400px',
        data: {
          'confirmHeading': 'Confirmation',
          'confirmMsg':'Are you sure, You want to Update the selected Installation WO from Batch ?'
        }
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(
        data => {
          if (data.status) {
            this.reOpenSR();
          }
        });
    } else {
      this.reOpenSR();
    }
  }

  reOpenSR() {
    this.commonService.commonInsertService('saveSRReOpenedInfo.sams', this.srReOpenForm.getRawValue()).subscribe(
      data => {
        if (data.success) {
          this.uploadReOpenFlag = false;
          this.commonService.openToastSuccessMessage(data.message);
          if(this.updateByBatch) {
            this.navigateBackOnBatchUpdate();
          } else {
            this.close();
          }
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.uploadReOpenFlag = false;
        }
      }
    );
  }

  navigateBackOnBatchUpdate() {
    if(this.updateByBatch) {
      localStorage.setItem('updateInstallationWOByBatch', 'true');
      this.location.back();
    } else {
      localStorage.setItem('updateInstallationWOByBatch', 'false');
    }
  }

}
