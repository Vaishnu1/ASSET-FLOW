import { Component, OnInit, Inject, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NumberControlListComponent } from '../number-control-list/number-control-list.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { numberControlModel } from 'src/app/Model/base/numberControl';
import { getData } from 'src/app/Model/common/fetchListData';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-number-control-create',
  templateUrl: './number-control-create.component.html',
  styleUrls: ['./number-control-create.component.css']
})
export class NumberControlCreateComponent implements OnInit {

  @ViewChild('numberControlfocus') numberControlFocusSet: ElementRef;



  //COMBO
  public branchCombo: any = [];
  numberControlCombo: any = [];
  moduleCombo: any = [];
  comboList: any = [];
  scrollsyncModule: boolean = false;
  scrollsyncNumberControlSeq: boolean = false;
  scrollsyncBranch: boolean = false;
  numberControlForm: FormGroup;
  mberControlSqeuence: string;
  uploadFlag: boolean = false;
  isView: boolean = false;
  isEdit: boolean = false;
  headingDisplay: string;
  buttonDisplay: string;
  tempValue: string = '';
  CommonhintMsg = new CommonHint();
  public numberControlModel: numberControlModel;
  recordsPerPageForCombo: string;
  numberControlPageNumber: number;
  branchPageNumber : number;
  numberControlIdForModule: number;
  numberCtrlModulePageNumber: number;
  getData: getData;
  tempValue1: string = '';
  updateFlag=false;
  ErrorMsg :String;

  constructor(public dialogRef: MatDialogRef<NumberControlListComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private commonService: CommonService,
    private assetOptimaConstants: AssetOptimaConstants,
    private assetOptimaServices: AssetOptimaServices,
    private cdr: ChangeDetectorRef,
    private userSession: UserSessionService,
  ) {
    this.numberControlPageNumber = 1;
    this.branchPageNumber=1;
    this.numberCtrlModulePageNumber = 1;
  }

  ngOnInit() {
    this.numberControlForm = new FormGroup({
      numberCtrlId: new FormControl(0),
      locationName: new FormControl('', [Validators.required]),
      prefixCd: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      lastNumber: new FormControl('', [Validators.required, Validators.pattern(this.assetOptimaConstants.numericValidation)]),
      numberCtrlName: new FormControl('', [Validators.required]),
      suffixCd: new FormControl('', [Validators.maxLength(10)]),
      maxNumber: new FormControl('', [Validators.required, Validators.pattern(this.assetOptimaConstants.numericValidation)]),
      numberCtrlModuleDisp: new FormControl(''),
      numberCtrlModule: new FormControl(''),
      locationId: new FormControl(0),
      numberCtrlDesc: new FormControl(''),
      updatedDt: new FormControl(''),
      updatedBy: new FormControl(''),
      createdDt: new FormControl(''),
      createdBy: new FormControl(''),
      orgId: new FormControl(''),
      active: new FormControl('TRUE')
    });
    this.headingDisplay = "Create Number Control";
    this.buttonDisplay = "Submit";
    this.numberControlForm.controls.numberCtrlModule.disable();
  }

  close() {
    this.dialogRef.close();
  }

  listOfBranch(searchValue) {
    this.scrollsyncBranch = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllUserLocForCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.branchPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.branchPageNumber , this.branchCombo , data.responseData.comboList)
          this.branchPageNumber = this.getData.pageNumber;
          this.branchCombo = this.getData.dataList;
          this.scrollsyncBranch = false;
        }
      );
  }

  loadNumberControlSequence(searchValue) {
    this.scrollsyncNumberControlSeq = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfNumberControlNameForCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.numberControlPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.numberControlPageNumber , this.numberControlCombo , data.responseData.comboList)
          this.numberControlPageNumber = this.getData.pageNumber;
          this.numberControlCombo = this.getData.dataList;
          this.scrollsyncNumberControlSeq = false;
        }
      );
  }

  loadModulesComboData(searchValue) {
    this.scrollsyncModule = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfNumberControlModuleForCombo.sams', searchValue.term, this.numberControlIdForModule, '',
      this.recordsPerPageForCombo, this.numberCtrlModulePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.numberCtrlModulePageNumber , this.moduleCombo , data.responseData.comboList)
          this.numberCtrlModulePageNumber = this.getData.pageNumber;
          this.moduleCombo = this.getData.dataList;
          this.scrollsyncModule = false;
        }
      );
  }

  Submit() {
    this.uploadFlag = true;
    this.numberControlModel = this.numberControlForm.value;
    this.commonService.commonInsertService(this.assetOptimaServices.saveOrUpdateNumberControl, this.numberControlModel).subscribe(
      data => {
        if (data.success) {
          this.uploadFlag = false;
          this.commonService.openToastSuccessMessage(data.message);
          this.dialogRef.close();
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.uploadFlag = false;
        }
      }
    );
  }

  selectedBrachData(event) {
    if (event === undefined) {
      this.numberControlForm.controls.locationId.setValue(0);
      this.numberControlForm.controls.locationName.setValue('');
      this.branchPageNumber = 1;
      this.branchCombo = [];
    } else {
      this.numberControlForm.controls.locationId.setValue(event.locationId);
      this.numberControlForm.controls.locationName.setValue(event.locDisplayField);
    }
  }

  selectedNumberControl(event) {
    if (event === undefined) {
      this.numberControlForm.controls.numberCtrlId.setValue(0);
      this.numberControlForm.controls.numberCtrlName.setValue('');
      this.numberControlPageNumber = 1;
      this.numberControlForm.controls.numberCtrlModule.disable();
      this.numberControlIdForModule = 0;
      this.numberControlCombo = [];
    } else {
      this.numberControlIdForModule = event.numberCtrlCdId;
      this.numberControlForm.controls.numberCtrlName.setValue(event.numberCtrlCdName);
      this.numberControlForm.controls.numberCtrlDesc.setValue(event.numberCtrlCdName);
      this.moduleCombo = [];
      this.numberControlForm.controls.numberCtrlModule.enable();
      if(this.tempValue1 === event.numberCtrlCdName){
        this.updateFlag=true;
      }else{
        this.updateFlag=false;
      }

      this.checkForNumberControlNameExistence();
    }
  }

  ngAfterViewInit() {
    if (this.data.numberControlModel != 0 && this.data.mode == 'edit') {
      this.isEdit = true;
      this.headingDisplay = "Edit Number Control";
      this.buttonDisplay = "Update";
      this.numberControlForm.patchValue(this.data.numberControlModel);
      this.numberControlForm.controls.numberCtrlModule.setValue(this.numberControlForm.controls.numberCtrlModuleDisp.value);
      this.tempValue = this.data.numberControlModel.locationName != null ? this.data.numberControlModel.locationName : '';
    } else if (this.data.mode == 'view') {
      this.isView = true;
      this.headingDisplay = "View Number Control";
      this.buttonDisplay = "Update";
      this.numberControlForm.disable();
      this.numberControlForm.patchValue(this.data.numberControlModel);
      this.numberControlForm.controls.numberCtrlModule.setValue(this.numberControlForm.controls.numberCtrlModuleDisp.value);
    } else {
      this.tempValue = this.data.numberControlModel.locationName != null ? this.data.numberControlModel.locationName : '';
    }
    this.tempValue1 = this.data.numberControlModel.numberCtrlName;
    this.cdr.detectChanges();
  }

  selectedNumberControlModule(event) {
    if (event === undefined) {
      this.numberControlForm.controls.numberCtrlModule.setValue('');
      this.numberControlForm.controls.numberCtrlModuleDisp.setValue('');
      this.numberCtrlModulePageNumber = 1;
      this.moduleCombo = [];
    } else {
      this.numberControlForm.controls.numberCtrlModule.setValue(event.numberCtrlModule);
      this.numberControlForm.controls.numberCtrlModuleDisp.setValue(event.numberCtrlModule);
    }
  }

  checkForNumberControlNameExistence(){
    if(((this.tempValue!= null || this.tempValue!= '') ? this.tempValue.toLowerCase() : '') === ((this.numberControlForm.controls.numberCtrlName.value!= null) ? this.numberControlForm.controls.numberCtrlName.value.toLowerCase() :'')) {

    }else{
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
    constraintData.className = "com.sams.to.base.NumberControlTO";
    constraintData.constraints = {
      'numberCtrlName': this.numberControlForm.controls.numberCtrlName.value.toLowerCase().trim(),
      'orgId': this.userSession.getUserOrgId(),
      'locationId' : this.numberControlForm.controls.locationId.value,

    };
    this.commonService.checkUniqueValidation(constraintData).subscribe(
      data => {
        if (!data.success) {
          this.ErrorMsg = data.message;
          this.numberControlForm.controls.numberCtrlName.setErrors(Validators.minLength);
          this.numberControlForm.controls.numberCtrlName.setErrors({"notUnique": true});
          this.commonService.openToastWarningMessage(data.message);
        } else {
          this.ErrorMsg = '';
        }
      }
    );
    }
  }

}

