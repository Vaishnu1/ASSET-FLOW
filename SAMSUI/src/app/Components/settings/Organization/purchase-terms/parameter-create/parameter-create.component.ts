import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-parameter-create',
  templateUrl: './parameter-create.component.html',
  styleUrls: ['./parameter-create.component.css']
})
export class ParameterCreateComponent implements OnInit {

  purchaseParameterForm: FormGroup;
  displayButton: string = 'Add';
  ErrorMsgParameter: string;

  uploadParameterFlag: boolean = false;

  tempValueTcParameter: String = '';

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();
  headingDisplay: string;

  inputTypeList = [
    { id: 1, name: 'TEXT AREA' },
    { id: 2, name: 'NUMBER' },
    // { id: 3, name: 'RADIO' },
    // { id: 4, name: 'CHECK BOX' },
    { id: 3, name: 'DROP DOWN' },
    // { id: 4, name: 'TEXT AREA - HTML' }
  ];

  tcParameterForList = [
    { id: 1, name: 'SERVICE/MATERIAL' },
    { id: 2, name: 'OSPR/CONTRACT' }
  ];

  constructor(public dialogRef: MatDialogRef<ParameterCreateComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private dialog: MatDialog,
    private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private validationService: AssetOptimaConstants,
    private detectorRefs: ChangeDetectorRef,
    private cdr: ChangeDetectorRef,
    public userSession: UserSessionService) {

  }

  ngOnInit(): void {
    this.purchaseParameterForm = new FormGroup({
      tcParameterId: new FormControl(''),
      tcParameterName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      tcParameterInputType: new FormControl('', [Validators.required]),
      tcParameterInputValues: new FormControl(''),
      active: new FormControl(true),
      tcParameterRemarks: new FormControl('', [Validators.maxLength(500)]),
      createdBy: new FormControl(''),
      createdDtDisp: new FormControl(''),
      createdDt: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      tcParameterFor: new FormControl('', [Validators.required]),
      isEditable: new FormControl(false)
    });
    this.purchaseParameterForm.controls.tcParameterInputValues.disable();
    this.purchaseParameterForm.valueChanges.subscribe(() => {
      this.evaluateUpdateButtonStatus();
      this.detectorRefs.detectChanges();

    });

    this.purchaseParameterForm.valueChanges.subscribe(() => {
      this.evaluateUpdateButtonStatus();
      this.detectorRefs.detectChanges();

    });
  }

  ngAfterViewInit() {
    if (this.data.purchaseParameter !== 0) {
      if (this.data.mode === "edit") {
        console.log('this.data.purchaseParameter', this.data.purchaseParameter);
        this.purchaseParameterForm.patchValue(this.data.purchaseParameter);
        console.log("this.data.purchaseParameter", this.purchaseParameterForm.value)
        this.purchaseParameterForm.invalid;
        this.headingDisplay = "Edit";
        this.displayButton = "Update";
        this.tempValueTcParameter = this.data.purchaseParameter.tcParameterName != null ? this.data.purchaseParameter.tcParameterName : '';
      } else if (this.data.mode === 'view') {
        this.purchaseParameterForm.patchValue(this.data.purchaseParameter);
        this.headingDisplay = 'View';
        this.displayButton = 'Back';
        this.purchaseParameterForm.disable();
      }
    } else {
      this.headingDisplay = "Create";
      this.displayButton = "Submit";
      this.tempValueTcParameter = this.data.purchaseParameter.tcParameterName != null ? this.data.purchaseParameter.tcParameterName : '';
    }
    this.detectorRefs.detectChanges();
  }

  closeParameterModal() {
    this.dialogRef.close();
  }

  changeFieldsForInputType(event) {
    const inputTypeValue = event.name;

    if (inputTypeValue === 'RADIO' || inputTypeValue === 'CHECK BOX' || inputTypeValue === 'DROP DOWN' || inputTypeValue === 'TEXT AREA') {
      this.purchaseParameterForm.controls.tcParameterInputValues.enable();
    }
    if (inputTypeValue === 'NUMBER') {
      this.purchaseParameterForm.controls.tcParameterInputValues.disable();
    }

    // if (inputTypeValue === 'Number') {
    //   this.parameterForm.controls['minAllowedValue'].enable();
    //   this.parameterForm.controls['maxAllowedValue'].enable();
    //   this.parameterForm.controls['defaultValue'].enable();
    //   this.parameterForm.controls.minAllowedValue.setValidators(Validators.required);
    //   this.parameterForm.controls.minAllowedValue.updateValueAndValidity();
    //   this.parameterForm.controls.maxAllowedValue.setValidators(Validators.required);
    //   this.parameterForm.controls.maxAllowedValue.updateValueAndValidity();
    //   this.parameterForm.controls.defaultValue.setValidators(Validators.required);
    //   this.parameterForm.controls.defaultValue.updateValueAndValidity();
    // } else {
    //   this.parameterForm.controls.minAllowedValue.clearValidators();
    //   this.parameterForm.controls.minAllowedValue.updateValueAndValidity();
    //   this.parameterForm.controls.maxAllowedValue.clearValidators();
    //   this.parameterForm.controls.maxAllowedValue.updateValueAndValidity();
    //   this.parameterForm.controls.defaultValue.clearValidators();
    //   this.parameterForm.controls.defaultValue.updateValueAndValidity();
    //   this.parameterForm.controls['minAllowedValue'].disable();
    //   this.parameterForm.controls['maxAllowedValue'].disable();
    //   this.parameterForm.controls['defaultValue'].disable();
    // }
  }

  submitParameter() {
    this.uploadParameterFlag = true;
    const ParameterModel = this.purchaseParameterForm.controls.tcParameterName.value.trim();
    if (ParameterModel === "") {
      this.uploadParameterFlag = false;
      this.commonService.openToastWarningMessage("Kindly Enter the valid Parameter Name");
    } else {
      this.commonService.showSpinner();
      this.commonService.commonInsertService(this.assetOptimaServices.saveOrUpdatePurchaseParameter, this.purchaseParameterForm.getRawValue()).subscribe(
        data => {
          if (data.success) {
            this.commonService.hideSpinner();
            this.uploadParameterFlag = false;
            this.commonService.openToastSuccessMessage(data.message);
            this.dialogRef.close();
          } else {
            this.uploadParameterFlag = false;
            this.commonService.openToastErrorMessage(data.message);
          }
        }
      );
    }
  }

  checkUniqueConstrainForParameter() {
    if (((this.tempValueTcParameter != null || this.tempValueTcParameter != '') ? this.tempValueTcParameter.toUpperCase() : '') === ((this.purchaseParameterForm.controls.tcParameterName.value != null || this.purchaseParameterForm.controls.tcParameterName.value != '') ? this.purchaseParameterForm.controls.tcParameterName.value.toUpperCase() : '')) {

    } else if (this.purchaseParameterForm.controls.tcParameterName.value.replace(/s+/g, ' ').trim() === '') {
      this.purchaseParameterForm.controls['tcParameterInputType'].setValue('');
    } else {
      const constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.base.PurchaseParameterTO";
      constraintData.constraints = {
        'tcParameterName': this.purchaseParameterForm.controls.tcParameterName.value.toUpperCase().trim(),
        'orgId': this.userSession.getUserOrgId(),
        'tcParameterFor': this.purchaseParameterForm.controls.tcParameterFor.value.toUpperCase().trim()

      };
      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if (data.success) {
            //show the warning invalidate the form group
            this.ErrorMsgParameter = data.message;
            this.purchaseParameterForm.controls.tcParameterName.setErrors(Validators.minLength);
            this.purchaseParameterForm.controls.tcParameterName.setErrors({ "notUnique": true });
          } else {
            this.ErrorMsgParameter = '';
            this.purchaseParameterForm.controls.parameterName.setErrors(null);
          }
        }
      );
    }
  }

  evaluateUpdateButtonStatus() {
    const inputType = this.purchaseParameterForm.controls.tcParameterInputType.value;
    const isEditable = this.purchaseParameterForm.controls.isEditable.value;
    const inputValues = this.purchaseParameterForm.controls.tcParameterInputValues.value;

    if (inputType === 'TEXT AREA' || inputType == 'DROP DOWN') {
      if (!isEditable && inputType === 'TEXT AREA') {
        this.uploadParameterFlag = !(inputValues && inputValues.trim().length > 0);
      } else if (inputType === 'DROP DOWN') {
        this.uploadParameterFlag = !(inputValues && inputValues.trim().length > 0);
      } else if (isEditable && inputType === 'TEXT AREA') {
        this.uploadParameterFlag = false  
      }
    } else {
      this.uploadParameterFlag = false;
    }
  }


}
