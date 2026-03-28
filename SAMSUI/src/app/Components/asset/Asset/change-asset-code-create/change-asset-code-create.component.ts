import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-change-asset-code-create',
  templateUrl: './change-asset-code-create.component.html',
  styleUrls: ['./change-asset-code-create.component.css']
})
export class ChangeAssetCodeCreateComponent implements OnInit {

  changeAssetCodeForm: FormGroup;
  buttonDisplay: string;
  CommonhintMsg = new CommonHint();

  constructor(private dialogRef: MatDialogRef<ChangeAssetCodeCreateComponent>,
    private userSessionService: UserSessionService,
    private commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) private data) { 
      
    }

  ngOnInit(): void {
    this.changeAssetCodeForm = new FormGroup({
      assetCodeChangeReqId: new FormControl(0),
      assetId: new FormControl(this.data.assetMainForm.assetHdrId),
      assetCode: new FormControl(this.data.assetMainForm.assetCode),
      newAssetCode: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      reason: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      newCeidStatus: new FormControl(''),
      requestRaisedBy: new FormControl(''),
      requestRaisedDt: new FormControl(''),
      requestRaisedDtDisp: new FormControl(''),
      approvedOrRejectedBy: new FormControl(''),
      approvedOrRejectedDt: new FormControl(null),
      approvedOrRejectedDtDisp: new FormControl(''),
      orgId: new FormControl(this.data.assetMainForm.orgId),
      locationId: new FormControl(this.data.assetMainForm.locationId),
      locationName: new FormControl(this.data.assetMainForm.locationName),
      active: new FormControl(true),
      createdBy: new FormControl(null),
      createdDt: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedDt: new FormControl(null),
      updatedBy: new FormControl(''),
      updatedDtDisp: new FormControl(''),
    });

    this.buttonDisplay = 'Submit';
    this.validateEditMode();
  }

  closeModal(action) {
    this.dialogRef.close(action);
  }

  validateEditMode() {
    if(this.data.mode === 'add') {
      this.buttonDisplay = 'Submit';
      this.changeAssetCodeForm.controls.assetId.setValue(this.data.assetMainForm.assetHdrId);
      this.changeAssetCodeForm.controls.assetCode.setValue(this.data.assetMainForm.assetCode);

    } else {
      // this.changeAssetCodeForm = this.data.assetCodeChangeReqInfo;
      this.changeAssetCodeForm.controls.assetCodeChangeReqId.setValue(this.data.assetCodeChangeReqInfo.assetCodeChangeReqId);
      this.changeAssetCodeForm.controls.assetId.setValue(this.data.assetCodeChangeReqInfo.assetId);
      this.changeAssetCodeForm.controls.assetCode.setValue(this.data.assetCodeChangeReqInfo.assetCode);
      this.changeAssetCodeForm.controls.newAssetCode.setValue(this.data.assetCodeChangeReqInfo.newAssetCode);
      this.changeAssetCodeForm.controls.reason.setValue(this.data.assetCodeChangeReqInfo.reason);
      this.changeAssetCodeForm.controls.newCeidStatus.setValue(this.data.assetCodeChangeReqInfo.newCeidStatus);
      this.changeAssetCodeForm.controls.requestRaisedBy.setValue(this.data.assetCodeChangeReqInfo.requestRaisedBy);
      this.changeAssetCodeForm.controls.requestRaisedDt.setValue(this.data.assetCodeChangeReqInfo.requestRaisedDt);
      this.changeAssetCodeForm.controls.approvedOrRejectedBy.setValue(this.data.assetCodeChangeReqInfo.approvedOrRejectedBy);
      this.changeAssetCodeForm.controls.approvedOrRejectedDt.setValue(this.data.assetCodeChangeReqInfo.approvedOrRejectedDt);
      this.changeAssetCodeForm.controls.orgId.setValue(this.data.assetCodeChangeReqInfo.orgId);
      this.changeAssetCodeForm.controls.locationId.setValue(this.data.assetCodeChangeReqInfo.locationId);
      this.changeAssetCodeForm.controls.createdBy.setValue(this.data.assetCodeChangeReqInfo.createdBy);
      this.changeAssetCodeForm.controls.createdDt.setValue(this.data.assetCodeChangeReqInfo.createdDt);
      this.changeAssetCodeForm.controls.updatedBy.setValue(this.data.assetCodeChangeReqInfo.updatedBy);
      this.changeAssetCodeForm.controls.updatedDt.setValue(this.data.assetCodeChangeReqInfo.updatedDt);
      
      if(this.data.mode === 'edit') {
        this.buttonDisplay = 'Update';
      } else if(this.data.mode === 'view') {
        this.buttonDisplay = '';
        this.changeAssetCodeForm.disable();
      }
    }
  }

  tempValue = '';
  uniqueValidation() {
    if (((this.tempValue != null || this.tempValue != '') ? this.tempValue.toLowerCase() : '')
      === ((this.changeAssetCodeForm.controls.newAssetCode.value != null) ? this.changeAssetCodeForm.controls.newAssetCode.value.toLowerCase() : '')) {

    } else {
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.asset.AssetHdrTO";
      constraintData.constraints = {
        'assetCode': this.changeAssetCodeForm.controls.newAssetCode.value.trim(),
        'orgId': this.userSessionService.getUserOrgId()
      };

      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if (!data.success) {
            this.changeAssetCodeForm.controls.newAssetCode.setErrors(Validators.maxLength);
            this.changeAssetCodeForm.controls.newAssetCode.setErrors({ "notUnique": true });
            this.commonService.openToastWarningMessage(data.message);
          } else {
            this.changeAssetCodeForm.controls.newAssetCode.setErrors(null);
          }
        }
      );
    }
  }

  submitChangeAssetCodeRequest() {
    this.commonService.commonInsertService('saveOrupdateChangeAssetCodeReq.sams', this.changeAssetCodeForm.getRawValue()).subscribe(
      (data) => {
        if(data.success) {
          this.commonService.openToastSuccessMessage(data.message);
          this.closeModal('submit');
        } else {
          this.commonService.openToastWarningMessage(data.message);
        }
      }
    )
    
  }

}
