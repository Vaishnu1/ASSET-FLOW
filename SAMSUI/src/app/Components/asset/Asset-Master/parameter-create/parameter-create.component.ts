import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonHint } from '../../../../Constants/CommonHint';
import { ParameterModel } from '../../../../Model/master/parameter';
import { ParameterListComponent } from '../parameter-list/parameter-list.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../../../Services/common-service/common.service';
import { AssetOptimaServices } from '../../../../Constants/AssetOptimaServices';
import { UserSessionService } from '../../../../Services/user-session-service/user-session.service';
import { UniqueValidationModel } from '../../../../Model/base/uniqueValidation';
import { NgSelectComponent } from '@ng-select/ng-select';
import { getData } from 'src/app/Model/common/fetchListData';

@Component({
  selector: 'app-parameter-create',
  templateUrl: './parameter-create.component.html',
  styleUrls: ['./parameter-create.component.css']
})
export class ParameterCreateComponent implements OnInit {

  parameterForm: FormGroup;
  uploadParameterFlag: boolean = false;
  @ViewChild('parameterFocus') parameterFocusSet: NgSelectComponent;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  //Create, Edit, Save and Update button name change based on the place
  headingDisplay: string;
  displayButton: string;

  //MODEL
  public ParameterModel: ParameterModel;

  //UNIQUE VALIDATION
  ErrorMsgParameter: string;
  tempValueParameter: String = '';

  //COMBO
  parameterTypeCombo: any = [];
  parameterTypePageNumber: number;
  scrollsyncParameterType: boolean = false;
  recordsPerPageForCombo: string;
  getData: getData;

  parameterGroupCombo: any = [];
  parameterGroupPageNumber: number;
  scrollsyncParameterGroup: boolean = false;

  limitCount: any;

  scrollUomsync: boolean = false;
  uomPageNumber: number;
  uomCombo = [];

  inputTypeList = [
    { id: 1, name: 'Text' },
    { id: 2, name: 'Number' },
    { id: 3, name: 'Pass/Fail' },
    { id: 4, name: 'Yes/No' },
    // { id: 3, name: 'Radio' },
    //{ id: 4, name: 'Check Box' },
    //{ id: 5, name: 'Combo Field' },
  ];

  constructor(public assetDialog: MatDialogRef<ParameterListComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data,
    public commonService: CommonService,
    public assetOptimeMthnd: AssetOptimaServices,
    public changeDetector: ChangeDetectorRef,
    public userSession: UserSessionService,
    private assetOptimaServices: AssetOptimaServices,) {
    this.parameterTypePageNumber = 1;
    this.parameterGroupPageNumber = 1;
    this.uomPageNumber = 1;
  }

  ngOnInit() {
    this.parameterForm = new FormGroup({
      parameterId: new FormControl(''),
      parameterName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      parameterTypeName: new FormControl(null, [Validators.required]),
      parameterTypeId: new FormControl(''),
      parameterGroupName: new FormControl(''),
      parameterGroupId: new FormControl(''),
      orgId: new FormControl(''),
      //COMMON OBJECTS
      createdBy: new FormControl(''),
      updatedDt: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      pageNumber: new FormControl(''),
      recordsPerPage: new FormControl(''),
      orgName: new FormControl(''),
      active: new FormControl(true),
      createdDt: new FormControl(''),
      uomCd: new FormControl(''),
      defaultValue: new FormControl(''),
      minAllowedValue: new FormControl(''),
      maxAllowedValue: new FormControl(''),
      inputType: new FormControl('', [Validators.required]),
      parameterTypeNameDisp: new FormControl('')
    });
    this.parameterTypePageNumber = 1;
    this.parameterGroupPageNumber = 1;
    this.uomPageNumber = 1;
  }
  ngAfterViewInit() {
    this.commonService.setComboFocus(this.parameterFocusSet);
    if (this.data.ParameterModel !== 0) {
      if (this.data.mode === "edit") {
        this.parameterForm.patchValue(this.data.ParameterModel);
        this.parameterForm.invalid;
        this.headingDisplay = "Edit";
        this.displayButton = "Update";
        this.tempValueParameter = this.data.ParameterModel.parameterName != null ? this.data.ParameterModel.parameterName : '';
      } else if (this.data.mode === 'view') {
        this.parameterForm.patchValue(this.data.ParameterModel);
        this.headingDisplay = 'View';
        this.displayButton = 'Back';
        this.parameterForm.disable();
      }
    } else {
      this.headingDisplay = "Create";
      this.displayButton = "Submit";
      this.tempValueParameter = this.data.ParameterModel.parameterName != null ? this.data.ParameterModel.parameterName : '';

    }
    this.changeDetector.detectChanges();
  }

  closeParameterModal() {
    this.assetDialog.close();
  }

  submitParameter() {
    this.uploadParameterFlag = true;
    this.ParameterModel = this.parameterForm.value;
    const ParameterModel = this.ParameterModel.parameterName.trim();
    if (ParameterModel === "") {
      this.uploadParameterFlag = false;
      this.commonService.openToastWarningMessage("Kindly Enter the valid Parameter Name");
    } else {
      this.ParameterModel.parameterName = ParameterModel;
      this.commonService.commonInsertService(this.assetOptimeMthnd.saveOrUpdateParameter, this.ParameterModel).subscribe(
        data => {
          if (data.success) {
            this.uploadParameterFlag = false;
            this.commonService.openToastSuccessMessage(data.message);
            this.assetDialog.close();
          } else {
            this.uploadParameterFlag = false;
            this.commonService.openToastErrorMessage(data.message);
          }
        }
      );
    }
  }

  checkUniqueConstrainForParameter() {
    if (((this.tempValueParameter != null || this.tempValueParameter != '') ? this.tempValueParameter.toUpperCase() : '') === ((this.parameterForm.controls.parameterName.value != null || this.parameterForm.controls.parameterName.value != '') ? this.parameterForm.controls.parameterName.value.toUpperCase() : '')) {

    } else if (this.parameterForm.controls.parameterName.value.replace(/s+/g, ' ').trim() === '') {
      this.parameterForm.controls['parameterTypeName'].setValue('');
    } else {
      const constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.master.ParameterTO";
      constraintData.constraints = {
        'parameterName': this.parameterForm.controls.parameterName.value.toUpperCase().trim(),
        'orgId': this.userSession.getUserOrgId(),
        'parameterTypeId': this.parameterForm.controls.parameterTypeId.value,
        // 'parameterGroupId': this.parameterForm.controls.parameterGroupId.value,

      };
      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if (!data.success) {
            //show the warning invalidate the form group
            this.ErrorMsgParameter = data.message;
            this.parameterForm.controls.parameterName.setErrors(Validators.minLength);
            this.parameterForm.controls.parameterName.setErrors({ "notUnique": true });
          } else {
            this.ErrorMsgParameter = '';
            this.parameterForm.controls.parameterName.setErrors(null);
          }
        }
      );
    }
  }

  loadParameterTypeComboData(searchValue) {
    this.scrollsyncParameterType = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimeMthnd.listAllParameterTypeForCombo, searchValue.term, '', '',
      this.recordsPerPageForCombo, this.parameterTypePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.parameterTypePageNumber, this.parameterTypeCombo, data.responseData.comboList)
          this.parameterTypePageNumber = this.getData.pageNumber;
          this.parameterTypeCombo = this.getData.dataList;
          this.scrollsyncParameterType = false;
        }
      );
  }

  selectedParameterTypeData(event) {
    if (event === undefined) {
      this.parameterForm.controls['parameterTypeNameDisp'].setValue('');
      this.parameterForm.controls['parameterTypeId'].setValue(0);
      this.parameterForm.controls['parameterTypeName'].setValue(null);
      this.parameterTypePageNumber = 1;
      this.parameterTypeCombo = [];
    } else {
      this.parameterForm.controls['parameterTypeNameDisp'].setValue(event.parameterTypeNameDisp);
      this.parameterForm.controls['parameterTypeId'].setValue(event.parameterTypeId);
      this.parameterForm.controls['parameterTypeName'].setValue(event.parameterTypeName);
    }
  }

  //for parameter group combo 
  loadParameterGroupComboData(searchValue) {
    this.scrollsyncParameterGroup = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimeMthnd.listAllParameterGroupForCombo, searchValue.term, '', '',
      this.recordsPerPageForCombo, this.parameterGroupPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.parameterGroupPageNumber, this.parameterGroupCombo, data.responseData.comboList)
          this.parameterGroupPageNumber = this.getData.pageNumber;
          this.parameterGroupCombo = this.getData.dataList;
          this.scrollsyncParameterGroup = false;
        }
      );
  }

  selectedParameterGroupData(event) {
    if (event === undefined) {
      this.parameterForm.controls['parameterGroupId'].setValue(0);
      this.parameterForm.controls['parameterGroupName'].setValue('');
      this.parameterGroupPageNumber = 1;
      this.parameterGroupCombo = [];
    } else {
      this.parameterForm.controls['parameterGroupId'].setValue(event.parameterGroupId);
      this.parameterForm.controls['parameterGroupName'].setValue(event.parameterGroupName);
    }
  }

  listOfUOM(searchTerms) {
    this.scrollUomsync = true;
    this.limitCount = (!(this.commonService.fetchSearchValue(searchTerms))) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfUOMCombo, searchTerms.term, '', '', this.limitCount, this.uomPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.uomPageNumber, this.uomCombo, data.responseData.comboList)
        this.uomPageNumber = this.getData.pageNumber;
        this.uomCombo = this.getData.dataList;
        this.scrollUomsync = false;
      }
    );
  }

  getUOMValue(event) {
    if (event === undefined) {
      this.parameterForm.get('uomCd').setValue(0);
      this.uomCombo = [];
      this.uomPageNumber = 1;
    } else {
      this.parameterForm.get('uomCd').setValue(event.uomCode);
    }
  }

  changeFieldsForInputType(event) {
    const inputTypeValue = event.name;
    if (inputTypeValue === 'Number') {
      this.parameterForm.controls['minAllowedValue'].enable();
      this.parameterForm.controls['maxAllowedValue'].enable();
      this.parameterForm.controls['defaultValue'].enable();
      this.parameterForm.controls.minAllowedValue.setValidators(Validators.required);
      this.parameterForm.controls.minAllowedValue.updateValueAndValidity();
      this.parameterForm.controls.maxAllowedValue.setValidators(Validators.required);
      this.parameterForm.controls.maxAllowedValue.updateValueAndValidity();
      this.parameterForm.controls.defaultValue.setValidators(Validators.required);
      this.parameterForm.controls.defaultValue.updateValueAndValidity();

    } else {
      this.parameterForm.controls.minAllowedValue.clearValidators();
      this.parameterForm.controls.minAllowedValue.updateValueAndValidity();
      this.parameterForm.controls.maxAllowedValue.clearValidators();
      this.parameterForm.controls.maxAllowedValue.updateValueAndValidity();
      this.parameterForm.controls.defaultValue.clearValidators();
      this.parameterForm.controls.defaultValue.updateValueAndValidity();
      this.parameterForm.controls['minAllowedValue'].disable();
      this.parameterForm.controls['maxAllowedValue'].disable();
      this.parameterForm.controls['defaultValue'].disable();
    }
  }

  formOneValidation() {

  }



}
