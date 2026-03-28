import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CusFieldHdr } from 'src/app/Model/master/cusFieldHdr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { CustomFieldComboAddComponent } from '../custom-field-combo-add/custom-field-combo-add.component';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetSubCategoryCustomGroupFieldsComponent } from '../asset-sub-category-custom-group-fields/asset-sub-category-custom-group-fields.component';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { getData } from 'src/app/Model/common/fetchListData';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';

@Component({
  selector: 'app-asset-sub-category-custom-fields',
  templateUrl: './asset-sub-category-custom-fields.component.html',
  styleUrls: ['./asset-sub-category-custom-fields.component.css']
})

export class AssetSubCategoryCustomFieldsComponent implements OnInit {

  cusFieldHdr: CusFieldHdr;
  ErrorMsg: String;

  cusFieldHdrList = [];
  displayGroupList = [];
  subCategoryCombo:any=[];

  custFieldsFormGroup: FormGroup;

  @ViewChild('input1') inputEl :ElementRef;

  //for pagination
  length: number = 0;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  //LOADER
  subloader: boolean = false;

  mandatoryString: String = "";
  displayGroupSync:boolean = false;
  subScrollsync:boolean = false;
  limitCount:any;

  displayGroupPageNumber: number;
  assetSubCategorPageNumber: number;
  getData: getData;
  selectedItem: any=0;
  tempInputMaxLength:number=0;

  tempValue: String = '';

  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page
  buttonDisp:String;
  moduleAccessModel: ModuleAccessModel;

  constructor(private commonService: CommonService,
    private dialogRef: MatDialogRef<AssetSubCategoryCustomFieldsComponent>, @Inject(MAT_DIALOG_DATA) private data,
    private dialog: MatDialog,
    private validationService: AssetOptimaConstants,
    private assetOptimaServices:AssetOptimaServices,
    private userSessionService: UserSessionService,
    private cdr: ChangeDetectorRef) {
    this.moduleAccessModel=new ModuleAccessModel();
    this.cusFieldHdr = new CusFieldHdr();
    this.displayGroupPageNumber = 1;
    this.assetSubCategorPageNumber   = 1;
  }


  displayedColumns = ['select', 'labelName', 'assetSubCategoryTO.subCategoryName', 'inputType', 'inputMaxLength','basedOn','displayGroup', 'active', 'updatedBy', 'updatedDt'];

  ngOnInit() {
    this.moduleAccessModel=this.userSessionService.getUserGroupAccess()['GROUPACCESS_ASSET_CUSTOM_FIELDS'];
    this.custFieldsFormGroup = new FormGroup({
      labelName : new FormControl('', [Validators.required, Validators.maxLength(50)]),
      customHdrId : new FormControl(0),
      orgId : new FormControl(0),
      assetSubCategoryId : new FormControl(0),
      inputType : new FormControl(null, [Validators.required]),
      inputMaxLength : new FormControl(0, [Validators.maxLength(4), Validators.pattern(this.validationService.numericValidation)]),
      active : new FormControl(true),
      values : new FormControl('', [Validators.maxLength(1000)]),
      basedOn : new FormControl(null, [Validators.required]),
      createdBy : new FormControl(''),
      createdDt : new FormControl(''),
      updatedBy : new FormControl(''),
      updatedDt : new FormControl(''),
      updatedDtDisp : new FormControl(''),
      createdDtDisp : new FormControl(''),
      customComboList : new FormControl([]),
      value1 : new FormControl(''),
      assetCustomFieldValue : new FormControl(''),
      displayGroup: new FormControl(null),
      color : new FormControl(''),
      displayGroupId: new FormControl(0),
      subCategoryName: new FormControl(null, [Validators.required]),
      direction: new FormControl('desc'),
      columnName: new FormControl('updatedDt'),
      pageNumber: new FormControl(0),
      recordsPerPage:new FormControl(0)
    });
    this.pageSize = '100';
    this.pageIndex = '0';
    this.getList();
    this.displayGroupPageNumber = 1;
    this.buttonDisp="Submit";
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getList();
  }


  changeInputMaxLengthAsMandatory(event){
    if(event.name==='TEXT' || event.name==='NUMBER'){
    this.custFieldsFormGroup.controls["inputMaxLength"].setValidators(Validators.required);
    this.custFieldsFormGroup.controls["inputMaxLength"].updateValueAndValidity();
    this.mandatoryString = "*";
    this.custFieldsFormGroup.controls.inputMaxLength.setValue(null);
    this.custFieldsFormGroup.controls.inputMaxLength.enable();
    } else {
    this.custFieldsFormGroup.controls["inputMaxLength"].reset();
    this.custFieldsFormGroup.controls["inputMaxLength"].updateValueAndValidity();
    this.mandatoryString = "";
    this.custFieldsFormGroup.controls.inputMaxLength.setValue(0);
    this.custFieldsFormGroup.controls.inputMaxLength.disable();
    }
  }

  ngAfterViewInit() {
    // setTimeout(() => {this.inputEl.nativeElement.focus();}, 500);
    this.cdr.detectChanges();
  }


  clear() {
    this.custFieldsFormGroup.reset();
    this.custFieldsFormGroup.updateValueAndValidity();
    this.custFieldsFormGroup.controls['inputType'].enable();
    this.custFieldsFormGroup.controls['inputMaxLength'].enable();
    this.custFieldsFormGroup.controls['basedOn'].enable();
    this.custFieldsFormGroup.controls['subCategoryName'].enable();
    this.mandatoryString = "";
    this.ngOnInit();
    this.selectedItem = 0;
    this.tempValue = "";
    this.tempInputMaxLength=0;
  }

  exit(){
    this.dialogRef.close();
  }

  saveUpdate() {
    this.tempInputMaxLength=0;
    this.commonService.commonInsertService(this.assetOptimaServices.saveOrUpdateCatCustField, this.custFieldsFormGroup.getRawValue()).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
          this.clear();
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
        throw error;
      }
    );
  }

  getList() {
    this.custFieldsFormGroup.controls.pageNumber.setValue(Number(this.pageIndex));
    this.custFieldsFormGroup.controls.recordsPerPage.setValue(Number(this.pageSize));
    this.cusFieldHdrList = [];
    this.subloader = true;
    this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllCategoryCustomFields, this.custFieldsFormGroup.value).subscribe(
      data => {
        if (data.success) {
          this.cusFieldHdrList = data.responseData.dataList;
          this.length = data.responseData.dataTotalRecCount;
          this.subloader = false;
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.subloader = false;
        }
      }, error => {
        this.subloader = false;
      }
    );
  }






  inputTypeCombo = [
    {id: 1, name: 'TEXT'},
    {id: 2, name: 'NUMBER'},
    {id: 3, name: 'DATE'},
    {id: 4, name: 'CHECKBOX'},
    {id: 5, name: 'DROP DOWN(TEXT LIST)'}
  ];

  basedOnCombo = [
    {id: 1, name: 'GROUP'},
    {id: 2, name: 'MODEL'},
    {id: 3, name: 'ASSET'}
  ];

  popUpComboCustom() {
    //open model add popup

    let dialogRef = this.dialog.open(CustomFieldComboAddComponent, {
      height: '500px',
      width: '450px',
      data: {
        'customComboList':[...this.custFieldsFormGroup.controls.customComboList.value],
        'custHdrId': this.selectedItem.customHdrId
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.custFieldsFormGroup.controls.customComboList.setValue(data);
        }
      });
  }

  //Edit Custom Field
  editCustomField(element) {
    this.buttonDisp="Update";
    this.custFieldsFormGroup.patchValue(element);
    this.custFieldsFormGroup.controls['inputType'].disable();
    this.tempInputMaxLength = this.custFieldsFormGroup.controls['inputMaxLength'].value;
    this.changeInputMaxLengthAsMandatory({name:this.custFieldsFormGroup.controls['inputType'].value});
    this.custFieldsFormGroup.controls['inputMaxLength'].setValue(this.tempInputMaxLength);
    this.custFieldsFormGroup.controls['basedOn'].disable();
    this.custFieldsFormGroup.controls['subCategoryName'].disable();
  }

  popUpDisplayGroupCustom() {
    //open model add popup
    let dialogRef = this.dialog.open(AssetSubCategoryCustomGroupFieldsComponent, {
      height: '500px',
      width: '80%'
    });
    // dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {

        }
      });
  }

  listOfDisplayGroup(searchValue) {
    this.displayGroupSync=true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfDisplayGroups, searchValue.term,'','',this.limitCount,this.displayGroupPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.displayGroupPageNumber , this.displayGroupList , data.responseData.comboList)
        this.displayGroupPageNumber = this.getData.pageNumber;
        this.displayGroupList = this.getData.dataList;
        this.displayGroupSync=false;
      }
    );
  }

  getDisplayGroupComboValue(comboValue) {
    if(comboValue === undefined){
      this.custFieldsFormGroup.get('displayGroup').setValue(null);
      this.custFieldsFormGroup.get('color').setValue('');
      this.custFieldsFormGroup.get('displayGroupId').setValue(0);
      this.displayGroupList=[];
      this.displayGroupPageNumber=1;
    }else{
      this.custFieldsFormGroup.get('displayGroup').setValue(comboValue.displayGroupName);
      this.custFieldsFormGroup.get('color').setValue(comboValue.color);
      this.custFieldsFormGroup.get('displayGroupId').setValue(comboValue.displayGroupId);
    }
  }

  listOfSubCategory(searchValue) {
    this.subScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllAssetSubCategoryCombo, searchValue.term, '',
      '', this.limitCount, this.assetSubCategorPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetSubCategorPageNumber , this.subCategoryCombo , data.responseData.comboList)
          this.assetSubCategorPageNumber = this.getData.pageNumber;
          this.subCategoryCombo = this.getData.dataList;
          this.subScrollsync = false;
        }
      );
  }

  selectedSubCategory(event){
    if(event===undefined){
      this.custFieldsFormGroup.controls.subCategoryName.setValue(null);
      this.custFieldsFormGroup.controls.assetSubCategoryId.setValue(0);
      this.custFieldsFormGroup.controls.orgId.setValue(0);
      this.assetSubCategorPageNumber=1;
      this.subCategoryCombo=[];
    }else{
      if(event.subCategoryName === this.validationService.notApplicable){
        this.commonService.openToastWarningMessage('Custom Fields Cannot be Configured for "Not Applicable" Sub Category');
        this.selectedSubCategory(undefined);
      }else{
        this.custFieldsFormGroup.controls.subCategoryName.setValue(event.subCategoryName);
        this.custFieldsFormGroup.controls.assetSubCategoryId.setValue(event.subCategoryId);
        this.custFieldsFormGroup.controls.orgId.setValue(event.orgId);
      }

    }
  }

  selectCusField(element){
    if(this.selectedItem.customHdrId == element.customHdrId){
      this.selectedItem = 0;
    }
    else{
      this.selectedItem = element;
      this.tempValue = element.labelName
      this.editCustomField(this.selectedItem)
    }
  }

  customSort(event) {
    this.custFieldsFormGroup.controls.pageNumber.setValue(0);
    this.custFieldsFormGroup.controls.columnName.setValue(event.active);
    this.custFieldsFormGroup.controls.direction.setValue(event.direction);

    this.getList();
  }

  uniqueValidation() {
    if(((this.tempValue!= null || this.tempValue!= '') ? this.tempValue.toLowerCase() : '') === ((this.custFieldsFormGroup.controls.labelName.value!= null) ? this.custFieldsFormGroup.controls.labelName.value.toLowerCase():'')) {

    }else if(this.custFieldsFormGroup.controls.labelName.value.replace (/s+/g, ' ').trim () === ''){
      this.custFieldsFormGroup.controls['labelName'].setValue('');
    }else{
  let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.master.CusFieldHdrTO";
      constraintData.constraints = {
        'assetSubCategoryId': this.custFieldsFormGroup.controls.assetSubCategoryId.value,
        'orgId': this.userSessionService.getUserOrgId(),
        'labelName': this.custFieldsFormGroup.controls.labelName.value
      };

      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if (!data.success) {
            this.ErrorMsg = data.message;
            this.custFieldsFormGroup.controls.labelName.setErrors([Validators.required, Validators.maxLength(50)]);
            this.custFieldsFormGroup.controls.labelName.setErrors({ "notUnique": true });
          } else {
            this.ErrorMsg = '';
            this.custFieldsFormGroup.controls.labelName.setErrors(null);
          }
        }
      );
    }
    }

    validateInputMaxLength(){
      if(this.buttonDisp === "Update" && (this.tempInputMaxLength > this.custFieldsFormGroup.controls.inputMaxLength.value)){
        this.custFieldsFormGroup.controls.inputMaxLength.setErrors(Validators.maxLength);
        this.custFieldsFormGroup.controls.inputMaxLength.setErrors(Validators.pattern(this.validationService.numericValidation));
        this.custFieldsFormGroup.controls.inputMaxLength.setErrors({"lessThan": true});
      }else{
        this.custFieldsFormGroup.controls.inputMaxLength.setErrors(null);
      }
    }


    generateReportOfCustomField(){
      this.commonService.commonListService(this.assetOptimaServices.generateAssetCustomFieldReport, this.cusFieldHdr).subscribe(
        (data) => {
          this.downloadDocument(data.responseData);
          this.commonService.openToastSuccessMessage('Download Successful.');
        }, error => {
          this.commonService.openToastWarningMessage('Failed to generate report.');
        }
      );
    }
    
    downloadDocument(filePath: string) {
      var fileName = filePath.split('.')[0];
      this.commonService.downloadExcelFile(filePath).subscribe(
        data => {
          let file = filePath.split('.');
          this.commonService.showDownloadPopUp(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
        }
      );
    }
  
}
