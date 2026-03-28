import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { getData } from 'src/app/Model/common/fetchListData';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';


@Component({
  selector: 'app-template-create',
  templateUrl: './template-create.component.html',
  styleUrls: ['./template-create.component.css']
})
export class TemplateCreateComponent implements OnInit {

  purchaseTemplateHdrForm: FormGroup;
  purchaseTemplateDtlForm: FormGroup;
  displayButton: string = 'Add';
  ErrorMsgPurchaseTemplate: string;
  uploadPurchaseTemplateFlag: boolean = false;
  tempValuePurchaseTemplateName: String = '';
  viewButtonFlag: boolean = true;

  scrollParameterNameSync: boolean = false;
  parameterPageNumber: number;
  purchaseParameterCombo: any = [];

  scrollDispSeqNoSync: boolean = false;
  dispSeqNoPageNumber: number;
  dispSeqNoCombo: any = [];

  scrollPurchaseProcessSync: boolean = false;
  purchaseProcessPageNumber: number;
  purchaseProcessCombo: any = [];

  scrollParameterNameChildSync: boolean = false;
  parameterChildPageNumber: number;
  purchaseParameterChildCombo: any = [];

  limitCount: any;
  getData: getData;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();
  headingDisplay: string;

  purchaseTempDtlDispCols = ['sNo', 'tcParameterName', 'displaySequenceNo', 'tcParameterChildName', 'action'];
  purchaseTemplateDtlList: any[] = [];
  subloaderPurchaseTempDtl: boolean = false;

  parameterAddBtn = true;

  constructor(public dialogRef: MatDialogRef<TemplateCreateComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private dialog: MatDialog,
    private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private validationService: AssetOptimaConstants,
    private detectorRefs: ChangeDetectorRef,
    public userSession: UserSessionService,
    private changeDetectorRef: ChangeDetectorRef) {

    this.parameterPageNumber = 1;
    this.dispSeqNoPageNumber = 1;
    this.purchaseProcessPageNumber = 1;
    this.parameterChildPageNumber = 1;
  }

  ngOnInit(): void {
    this.purchaseTemplateHdrForm = new FormGroup({
      tcTemplateHdrId: new FormControl(''),
      processName: new FormControl('', [Validators.required]),
      templateName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      active: new FormControl(true),
      remarks: new FormControl('', [Validators.maxLength(500)]),
      createdBy: new FormControl(''),
      createdDtDisp: new FormControl(''),
      createdDt: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      orgId: new FormControl('0'),
      purchaseTemplateDtlList: new FormControl('', []),
    });
    this.purchaseTemplateDtlForm = new FormGroup({
      tcTemplateDtlId: new FormControl('0'),
      tcTemplateHdrId: new FormControl('0'),
      tcParameterId: new FormControl('0'),
      tcParameterName: new FormControl(''),
      displaySequenceNo: new FormControl('0'),
      remarks: new FormControl(''),
      createdBy: new FormControl(''),
      createdDtDisp: new FormControl(''),
      createdDt: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      tcParameterRemarks: new FormControl(''),
      tcParameterInputType: new FormControl(''),
      tcParameterInputValues: new FormControl(''),
      tcParameterEditable: new FormControl(),

      tcParameterChildId: new FormControl('0'),
      tcParameterChildName: new FormControl(''),
      tcParameterChildRemarks: new FormControl(''),
      tcParameterChildInputType: new FormControl(''),
      tcParameterChildInputValues: new FormControl(''),
      tcParameterChildEditable: new FormControl(),
    });
    this.purchaseTemplateDtlForm.controls.tcParameterRemarks.disable();
    this.purchaseTemplateDtlForm.controls.tcParameterInputType.disable();
    this.purchaseTemplateDtlForm.controls.tcParameterInputValues.disable();
    this.purchaseTemplateDtlForm.controls.tcParameterChildRemarks.disable();
    this.purchaseTemplateDtlForm.controls.tcParameterChildInputType.disable();
    this.purchaseTemplateDtlForm.controls.tcParameterChildInputValues.disable();

    this.purchaseTemplateDtlForm.controls.tcParameterChildName.disable();

    this.parameterPageNumber = 1;
    this.dispSeqNoPageNumber = 1;
    this.purchaseProcessPageNumber = 1;
    this.parameterChildPageNumber = 1;
    //this.purchaseTemplateHdrForm.controls.tcParameterInputValues.disable();
    this.validateEditMode();
  }

  ngAfterViewInit() {
    if (this.data.purchaseTermTemplate !== 0) {
      if (this.data.mode === "edit") {
        console.log('this.data.purchaseTermTemplate', this.data.purchaseTermTemplate);
        this.purchaseTemplateHdrForm.patchValue(this.data.purchaseTermTemplate);
        this.purchaseTemplateHdrForm.invalid;
        this.headingDisplay = "Edit";
        this.displayButton = "Update";
        this.tempValuePurchaseTemplateName = this.data.purchaseTermTemplate.templateName != null ? this.data.purchaseTermTemplate.templateName : '';
      } else if (this.data.mode === "view") {
        this.purchaseTemplateHdrForm.patchValue(this.data.purchaseTermTemplate);
        this.headingDisplay = "View";
        this.displayButton = "Back";
        this.viewButtonFlag = false;
        this.purchaseTemplateHdrForm.disable();
        this.purchaseTemplateDtlForm.disable();
      }
    } else {
      this.headingDisplay = "Create";
      this.displayButton = "Submit";
      this.tempValuePurchaseTemplateName = this.data.purchaseTermTemplate.templateName != null ? this.data.purchaseTermTemplate.templateName : '';
    }
    this.detectorRefs.detectChanges();
  }

  closePurchaseTemplateModal() {
    this.dialogRef.close();
  }

  checkUniqueConstrainForParameter() {
    if (((this.tempValuePurchaseTemplateName != null || this.tempValuePurchaseTemplateName != '') ? this.tempValuePurchaseTemplateName.toUpperCase() : '') === ((this.purchaseTemplateHdrForm.controls.templateName.value != null || this.purchaseTemplateHdrForm.controls.templateName.value != '') ? this.purchaseTemplateHdrForm.controls.templateName.value.toUpperCase() : '')) {

    } else if (this.purchaseTemplateHdrForm.controls.templateName.value.replace(/s+/g, ' ').trim() === '') {
      this.purchaseTemplateHdrForm.controls['processName'].setValue('');
    } else {
      const constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.base.PurchaseTemplateHdrTO";
      constraintData.constraints = {
        'templateName': this.purchaseTemplateHdrForm.controls.templateName.value.toUpperCase().trim(),
        'orgId': this.userSession.getUserOrgId()

      };
      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if (!data.success) {
            //show the warning invalidate the form group
            this.ErrorMsgPurchaseTemplate = data.message;
            this.purchaseTemplateHdrForm.controls.templateName.setErrors(Validators.minLength);
            this.purchaseTemplateHdrForm.controls.templateName.setErrors({ "notUnique": true });
          } else {
            this.ErrorMsgPurchaseTemplate = '';
            this.purchaseTemplateHdrForm.controls.templateName.setErrors(null);
          }
        }
      );
    }
  }



  listOfParameterName(searchValue) {
    this.scrollParameterNameSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listPurchaseParameterCombo, searchValue.term, '', '', this.limitCount, this.parameterPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.parameterPageNumber, this.purchaseParameterCombo, data.responseData.comboList)
        this.parameterPageNumber = this.getData.pageNumber;
        this.purchaseParameterCombo = this.getData.dataList;
        this.scrollParameterNameSync = false;
      }
    );
    console.log("purchaseParameterCombo", this.purchaseParameterCombo);
  }

  setParameterNameComboValue(event) {

    if (event === undefined) {
      this.purchaseTemplateDtlForm.controls.tcParameterId.setValue(0);
      this.purchaseTemplateDtlForm.controls.tcParameterName.setValue('');
      this.purchaseTemplateDtlForm.controls.tcParameterRemarks.setValue('');
      this.purchaseTemplateDtlForm.controls.tcParameterInputType.setValue('');
      this.purchaseTemplateDtlForm.controls.tcParameterInputValues.setValue('');
      // this.purchaseTemplateDtlForm.controls.isEditable.setValue(true);
      this.parameterPageNumber = 1;
      this.purchaseParameterCombo = [];
    } else {
      this.purchaseTemplateDtlForm.controls.tcParameterId.setValue(event.tcParameterId);
      this.purchaseTemplateDtlForm.controls.tcParameterName.setValue(event.tcParameterName);
      this.purchaseTemplateDtlForm.controls.tcParameterRemarks.setValue(event.tcParameterRemarks);
      this.purchaseTemplateDtlForm.controls.tcParameterInputType.setValue(event.tcParameterInputType);
      this.purchaseTemplateDtlForm.controls.tcParameterInputValues.setValue(event.tcParameterInputValues);
      this.purchaseTemplateDtlForm.controls.tcParameterEditable.setValue(event.isEditable);
      this.purchaseTemplateDtlForm.controls.tcParameterChildName.enable();
    }

        console.log("event",  this.purchaseTemplateDtlForm);

  }

  listOfParameterNameChild(searchValue) {
    this.scrollParameterNameChildSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listPurchaseParameterCombo, searchValue.term, '', '', this.limitCount, this.parameterChildPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.parameterChildPageNumber, this.purchaseParameterChildCombo, data.responseData.comboList)
        this.parameterChildPageNumber = this.getData.pageNumber;
        this.purchaseParameterChildCombo = this.getData.dataList;
        this.scrollParameterNameChildSync = false;
      }
    );
  }

  setParameterNameChildComboValue(event) {
    if (event === undefined) {
      this.purchaseTemplateDtlForm.controls.tcParameterChildId.setValue(0);
      this.purchaseTemplateDtlForm.controls.tcParameterChildName.setValue('');
      this.purchaseTemplateDtlForm.controls.tcParameterChildRemarks.setValue('');
      this.purchaseTemplateDtlForm.controls.tcParameterChildInputType.setValue('');
      this.purchaseTemplateDtlForm.controls.tcParameterChildInputValues.setValue('');
      this.parameterChildPageNumber = 1;
      this.purchaseParameterChildCombo = [];
    } else {
      if (event.tcParameterId != this.purchaseTemplateDtlForm.controls.tcParameterId.value) {
        this.purchaseTemplateDtlForm.controls.tcParameterChildId.setValue(event.tcParameterId);
        this.purchaseTemplateDtlForm.controls.tcParameterChildName.setValue(event.tcParameterName);
        this.purchaseTemplateDtlForm.controls.tcParameterChildRemarks.setValue(event.tcParameterRemarks);
        this.purchaseTemplateDtlForm.controls.tcParameterChildInputType.setValue(event.tcParameterInputType);
        this.purchaseTemplateDtlForm.controls.tcParameterChildInputValues.setValue(event.tcParameterInputValues);
        this.purchaseTemplateDtlForm.controls.tcParameterChildEditable.setValue(event.isEditable);
      } else {
        this.commonService.openToastWarningMessage("Parent and Child Parameter Can't be same!");

        this.purchaseTemplateDtlForm.controls.tcParameterChildId.setValue(0);
        this.purchaseTemplateDtlForm.controls.tcParameterChildName.setValue('');
        this.purchaseTemplateDtlForm.controls.tcParameterChildRemarks.setValue('');
        this.purchaseTemplateDtlForm.controls.tcParameterChildInputType.setValue('');
        this.purchaseTemplateDtlForm.controls.tcParameterChildInputValues.setValue('');
        this
        this.parameterChildPageNumber = 1;
        this.purchaseParameterChildCombo = [];
      }
    }
  }

  setDispSeqNoComboValue(event) {
    if (event === undefined) {
      this.purchaseTemplateDtlForm.controls.displaySequenceNo.setValue(0);
    } else {
      this.purchaseTemplateDtlForm.controls.displaySequenceNo.setValue(event.seqNo);
      this.parameterAddBtn = false;
    }
  }

  addParameterToTemplate() {
    let flag = 0;
    let parameterFlag = 0;
    let data = this.purchaseTemplateDtlForm.getRawValue();

    //const existingIndexForTcParameterName = this.purchaseTemplateDtlList.findIndex(item => item.tcParameterName === data.tcParameterName);

    // console.log("Display Sequence Numbers:");
    this.purchaseTemplateDtlList.forEach(item => {
      if (item.displaySequenceNo == data.displaySequenceNo) {
        flag++;
      }
      if (item.tcParameterName == data.tcParameterName) {
        parameterFlag++;
      }
    });

    if (flag > 0) {
      this.commonService.openToastWarningMessage('DisplaySequenceNo already exists!');
    } else if (parameterFlag > 0) {
      this.commonService.openToastWarningMessage('Parameter Name already exists!');
    } else {
      this.purchaseTemplateDtlList = this.purchaseTemplateDtlList.concat([data]);
      this.resetFormControls();
    }

    // if(existingIndexForTcParameterName !== -1) {
    //   this.commonService.openToastWarningMessage('Parameter Name already exists!');
    // } else if(flag > 0) {
    //   this.commonService.openToastWarningMessage('DisplaySequenceNo already exists!');
    // }
    // else {
    //   this.purchaseTemplateDtlList = this.purchaseTemplateDtlList.concat([data]);
    //   this.resetFormControls();
    // }
  }

  resetFormControls() {
    this.parameterAddBtn = true;
    this.purchaseTemplateDtlForm.controls.tcParameterId.setValue(0);
    this.purchaseTemplateDtlForm.controls.tcParameterName.setValue('');
    this.purchaseTemplateDtlForm.controls.displaySequenceNo.setValue(0);
    this.purchaseTemplateDtlForm.controls.tcParameterRemarks.setValue('');
    this.purchaseTemplateDtlForm.controls.tcParameterInputType.setValue('');
    this.purchaseTemplateDtlForm.controls.tcParameterInputValues.setValue('');

    this.purchaseTemplateDtlForm.controls.tcParameterChildName.disable();
    this.purchaseTemplateDtlForm.controls.tcParameterChildId.setValue(0);
    this.purchaseTemplateDtlForm.controls.tcParameterChildName.setValue('');
    this.purchaseTemplateDtlForm.controls.tcParameterChildRemarks.setValue('');
    this.purchaseTemplateDtlForm.controls.tcParameterChildInputType.setValue('');
    this.purchaseTemplateDtlForm.controls.tcParameterChildInputValues.setValue('');
  }


  flagForToggleBtn: boolean = false;

  submitPurchaseTemplate() {
    if (this.purchaseTemplateDtlList.length == 0) {
      this.commonService.openToastWarningMessage('Kindly add atlest one Business Partner Site!');
    } else {
      console.log('purchase template', this.purchaseTemplateDtlList)
      console.log(this.purchaseTemplateHdrForm)
      this.purchaseTemplateHdrForm.controls.purchaseTemplateDtlList.setValue(this.purchaseTemplateDtlList);
      this.commonService.showSpinner();
      this.commonService.commonInsertService(this.assetOptimaServices.saveOrUpdatePurchaseTemplate, this.purchaseTemplateHdrForm.getRawValue()).subscribe(
        data => {
          if (data.success) {
            this.commonService.openToastSuccessMessage(data.message);
            this.closePurchaseTemplateModal();
            this.commonService.hideSpinner();
          } else {
            this.commonService.hideSpinner();
            this.commonService.openToastErrorMessage(data.message);
          }
        }
      );
    }
    this.flagForToggleBtn = false;
  }

  listOfDispSeqNo(searchValue) {
    this.scrollDispSeqNoSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllDispSeqNo, searchValue.term, '', '', this.limitCount, this.dispSeqNoPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.dispSeqNoPageNumber, this.dispSeqNoCombo, data.responseData.comboList)
        this.dispSeqNoPageNumber = this.getData.pageNumber;
        this.dispSeqNoCombo = this.getData.dataList;
        this.scrollDispSeqNoSync = false;
      }
    );
  }

  listOfPurchaseProcess(searchValue) {
    this.scrollPurchaseProcessSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllPurchaseProcess, searchValue.term, '', '', this.limitCount, this.purchaseProcessPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.purchaseProcessPageNumber, this.purchaseProcessCombo, data.responseData.comboList)
        this.purchaseProcessPageNumber = this.getData.pageNumber;
        this.purchaseProcessCombo = this.getData.dataList;
        this.scrollPurchaseProcessSync = false;
      }
    );
  }

  setPurchseProcessComboValue(event) {
    if (event === undefined) {
      this.purchaseTemplateDtlForm.controls.processName.setValue('');
    } else {
      this.purchaseTemplateDtlForm.controls.processName.setValue(event.purchaseProcessName);
    }
  }

  validateEditMode() {
    if (this.data.mode === 'view' || this.data.mode === 'edit') {
      this.commonService.showSpinner();
      this.commonService.commonGetService('fetchPurchaseTemplateInfo.sams', this.data.purchaseTermTemplate.tcTemplateHdrId).subscribe(
        data => {
          this.purchaseTemplateHdrForm.patchValue(data.responseData);

          this.purchaseTemplateDtlList = data.responseData.purchaseTemplateDtlList;
          this.purchaseTemplateHdrForm.controls.purchaseTemplateDtlList.setValue(this.purchaseTemplateDtlList);

          this.commonService.hideSpinner();
        });
    }
    if (this.data.mode === 'edit') {
      this.displayButton = "Update";
    } else if (this.data.mode === 'view') {
      this.purchaseTemplateHdrForm.disable();
    }
  }

  delete(index: number) {
    this.purchaseTemplateDtlList.splice(index, 1);
    this.purchaseTemplateDtlList = [...this.purchaseTemplateDtlList];

    console.log(this.purchaseTemplateDtlList)
    console.log(this.purchaseTemplateDtlList.length)

  }

}
