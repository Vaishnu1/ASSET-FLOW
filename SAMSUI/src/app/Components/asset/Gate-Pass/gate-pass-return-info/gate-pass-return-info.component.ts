import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-gate-pass-return-info',
  templateUrl: './gate-pass-return-info.component.html',
  styleUrls: ['./gate-pass-return-info.component.css']
})
export class GatePassReturnInfoComponent implements OnInit {

  gatePassReturnInfo: FormGroup;

  mandatoryActivity: string = "";

  headingDisplay: string;
  buttonDisplay: string;
  uploadFlag: boolean = false;

  submitButton: boolean = true;

  returnReceivedByCombo: any = [];
  returnReceivedByPageNumber: number;
  scrollSyncReturnReceivedBy: boolean = false;


  constructor(public dialogRef: MatDialogRef<GatePassReturnInfoComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private commonService: CommonService,
              private userSessionService: UserSessionService) {
        this.returnReceivedByPageNumber = 1;
  }

  ngOnInit() {
    this.gatePassReturnInfo = new FormGroup({
        gatePassDtlId : new FormControl(this.data.gatePassDtlInfo.gatePassDtlId),
        gatePassHdrId : new FormControl(this.data.gatePassDtlInfo.gatePassHdrId),
        returnedStatus : new FormControl('RETURNED'),
        returnReceivedById : new FormControl(this.data.gatePassDtlInfo.returnReceivedById),
        returnReceivedDt : new FormControl(this.data.gatePassDtlInfo.returnReceivedDt),
        returnReceivedDtDisp : new FormControl(this.data.gatePassDtlInfo.returnReceivedDtDisp, Validators.required),
        returnReceivedByName : new FormControl(this.data.gatePassDtlInfo.returnReceivedByName),
        returnRemarks : new FormControl(this.data.gatePassDtlInfo.returnRemarks),
        assetId : new FormControl(this.data.gatePassDtlInfo.assetId),
        source: new FormControl(this.data.source)
    });
    if (this.data.gatePassDtlInfo.returnReceivedById <= 0) {
      this.buttonDisplay = "Submit";
    } else {
      this.buttonDisplay = "Update";
    }
    if(this.data.mode == 'edit') {
      this.gatePassReturnInfo.controls.returnReceivedById.setValue(this.userSessionService.getUserEmpId());
      this.gatePassReturnInfo.controls.returnReceivedByName.setValue(this.userSessionService.getUserEmpName());
    } else if(this.data.mode == 'view'){
      this.submitButton = false;
      this.gatePassReturnInfo.disable();
    }
  }

  selectedReceivedBy(event) {
    if(event === undefined) {
      this.gatePassReturnInfo.controls.returnReceivedById.setValue('');
      this.gatePassReturnInfo.controls.returnReceivedByName.setValue('');

      this.returnReceivedByPageNumber = 1;
      this.returnReceivedByCombo = [];
    } else {
      this.gatePassReturnInfo.controls.returnReceivedById.setValue(event.employeeId);
      this.gatePassReturnInfo.controls.returnReceivedByName.setValue(event.employeeFirstName);
    }
  }

  loadReturnReceivedByComboData(searchValue) {
    this.scrollSyncReturnReceivedBy = true;
    this.returnReceivedByCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllEmployeeForOrgCombo.sams', searchValue.term, '', '',
      this.returnReceivedByCombo, this.returnReceivedByPageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.returnReceivedByPageNumber === 1) {
              this.returnReceivedByCombo = data.responseData.comboList;
            } else {
              this.returnReceivedByCombo = this.returnReceivedByCombo.concat(data.responseData.comboList);
            }
          } else {
            this.returnReceivedByCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length != 0 ? this.returnReceivedByPageNumber += 1 : this.returnReceivedByPageNumber = 1;
        }
      );
    this.scrollSyncReturnReceivedBy = false;
  }

  exit() {
    this.dialogRef.close();
  }

  updateGatePassReturnInfo() {
    this.commonService.commonInsertService('updateGatePassReturnInfo.sams', this.gatePassReturnInfo.getRawValue()).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
          this.uploadFlag = false;
          this.dialogRef.close();
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.uploadFlag = false;
        }
      }
    );
  }

  dateValidationinstall(event) {
    return false;
  }

}
