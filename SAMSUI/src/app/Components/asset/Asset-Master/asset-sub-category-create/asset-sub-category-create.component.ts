import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetSubCategoryModel } from 'src/app/Model/master/asset-sub-category';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { getData } from 'src/app/Model/common/fetchListData';
import { AssetSubCategoryListComponent } from '../asset-sub-category-list/asset-sub-category-list.component';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';


@Component({
  selector: 'app-asset-sub-category-create',
  templateUrl: './asset-sub-category-create.component.html',
  styleUrls: ['./asset-sub-category-create.component.css']
})
export class AssetSubCategoryCreateComponent implements OnInit {

  assetSubCategoryForm: FormGroup;
  @ViewChild('assetsubcategoryFocus') assetsubcategoryFocusSet : NgSelectComponent;

  //Create, Edit, Save and Update button name change based on the place
  headingDisplay : string;
  displayButton: string;
  assetCategoryName: any = [];
  installationTypeCombo: any = [];
  categoryScrollsync:boolean = false;
  limitCount: string = '';
  assetCategoryPageNumber:number;

  //MODEL
  public AssetSubCategoryModel : AssetSubCategoryModel;
  uploadFlagAssetSubCategory: boolean = false;
  scrollsyncInstallationType: boolean = false;

  ErrorMsg :String='';
  ErrorMsgCode : string='';
  tempValue : String = '';
  tempValue1 : string='';

  installationTypePageNumber: number;
  recordsPerPageForCombo:string;
  getData: getData;

  depreciationMethodCombo: any = [];
  depreciationMethodPageNumber: number;
  scrollsyncDepreciationMethod: boolean=false;
  enableRateOfDepreciation: boolean=false;

  constructor(public dialogRef: MatDialogRef<AssetSubCategoryListComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    public commonService: CommonService,
    public assetOptimeMthnd: AssetOptimaServices ,
    private userSession: UserSessionService,
    private assetOptimaConstants: AssetOptimaConstants,
    private cdr: ChangeDetectorRef
    ) {
      this.depreciationMethodPageNumber = 1;
      this.installationTypePageNumber = 1;
      this.assetCategoryPageNumber = 1;
    }


  ngOnInit() {
    this.assetSubCategoryForm = new FormGroup({
      subCategoryId    : new FormControl(''),
      subCategoryName  : new FormControl('',[Validators.required,Validators.maxLength(100)]),
      assetSubCategoryCode: new FormControl('',[Validators.maxLength(5)]),
      orgId            : new FormControl(''),
      categoryName     : new FormControl(null, Validators.required),
      categoryId  : new FormControl(''),
       //COMMON OBJECTS
      createdBy        : new FormControl(''),
      createdDt: new FormControl(''),
      updatedDt        : new FormControl(''),
      createdDtDisp    : new FormControl(''),
      updatedBy        : new FormControl(''),
      updatedDtDisp    : new FormControl(''),
      pageNumber       : new FormControl(''),
      recordsPerPage   : new FormControl(''),
      orgName          : new FormControl(''),
      active           : new FormControl(true),
      sourceScreen     : new FormControl(''),
      expectedLifeInYears: new FormControl(0.0 ,[Validators.pattern(this.assetOptimaConstants.percentageValidation)]),
      maintainanceThresholdPer: new FormControl(0.0, [Validators.pattern(this.assetOptimaConstants.percentageValidation)]),
      depreciationMethodName: new FormControl(null),
      depreciationMethodId: new FormControl(0),
      rateOfDepreciation: new FormControl(0.0, [Validators.pattern(this.assetOptimaConstants.percentageValidation)]),
      scrapValuePer: new FormControl(0.0, [Validators.pattern(this.assetOptimaConstants.percentageValidation)]),
    });
    this.assetCategoryPageNumber = 1;
  }

  ngAfterViewInit() {
    this.commonService.setComboFocus(this.assetsubcategoryFocusSet);
    if(this.data.AssetSubCategoryModel!=0 && this.data.mode=='edit'){
      this.assetSubCategoryForm.patchValue(this.data.AssetSubCategoryModel);
      this.headingDisplay = "Edit";
      this.displayButton = "Update";
      this.tempValue = this.data.AssetSubCategoryModel.subCategoryName!= null ? this.data.AssetSubCategoryModel.subCategoryName : '';
      this.tempValue1 = this.data.AssetSubCategoryModel.assetSubCategoryCode!= null ? this.data.AssetSubCategoryModel.assetSubCategoryCode : '';
    }else if(this.data.mode=='view'){
      this.assetSubCategoryForm.patchValue(this.data.AssetSubCategoryModel);
      this.assetSubCategoryForm.disable();
      this.headingDisplay = "View";
      this.displayButton = "Update";
      this.tempValue = this.data.AssetSubCategoryModel.subCategoryName!= null ? this.data.AssetSubCategoryModel.subCategoryName : '';
      this.tempValue1 = this.data.AssetSubCategoryModel.assetSubCategoryCode!= null ? this.data.AssetSubCategoryModel.assetSubCategoryCode : '';
    }
    else{
      this.headingDisplay = "Create";
      this.displayButton = "Submit";
      this.tempValue = this.data.AssetSubCategoryModel.subCategoryName!= null ? this.data.AssetSubCategoryModel.subCategoryName : '';
      this.tempValue1 = this.data.AssetSubCategoryModel.assetSubCategoryCode!= null ? this.data.AssetSubCategoryModel.assetSubCategoryCode : '';

    }
    this.cdr.detectChanges();
    if(this.assetSubCategoryForm.controls.depreciationMethodName.value === 'WRITTEN DOWN'){
      this.enableRateOfDepreciation = true;
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  submit(){
    this.uploadFlagAssetSubCategory = true;
    if(this.assetSubCategoryForm.controls.assetSubCategoryCode.value.trim() == ""){
      this.assetSubCategoryForm.controls.assetSubCategoryCode.setValue(null);
    }
    this.AssetSubCategoryModel = this.assetSubCategoryForm.value;
    var assetSUbCategoryName = this.AssetSubCategoryModel.subCategoryName.trim();
    if(assetSUbCategoryName===""){
      this.uploadFlagAssetSubCategory = false;
      this.commonService.openToastWarningMessage("Kindly Enter the Valid Sub Category");
    }else{
      this.AssetSubCategoryModel.subCategoryName=assetSUbCategoryName;
      this.commonService.commonInsertService(this.assetOptimeMthnd.saveOrUpdateAssetSubCategory,this.AssetSubCategoryModel).subscribe(
        data => {
          if(data.success){
            this.uploadFlagAssetSubCategory = false;
            this.commonService.openToastSuccessMessage(data.message);
            this.dialogRef.close();
          } else {
            this.commonService.openToastErrorMessage(data.message);
            this.uploadFlagAssetSubCategory = false;
          }
        }
      );
    }
  }

  listOfCategory(searchTerms){
    this.categoryScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimeMthnd.listAllAssetCategoryCombo, searchTerms.term,'', '', this.limitCount, this.assetCategoryPageNumber).subscribe(
      (data) =>{
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.assetCategoryPageNumber , this.assetCategoryName , data.responseData.comboList)
        this.assetCategoryPageNumber = this.getData.pageNumber;
        this.assetCategoryName = this.getData.dataList;
        this.categoryScrollsync = false;
      }
    );
  }

  getCategoryComboValue(event){

    if (event === undefined) {
      this.assetSubCategoryForm.get('categoryId').setValue(0);
      this.assetCategoryPageNumber = 1;
      this.assetCategoryName = [];
    } else {
      this.assetSubCategoryForm.get('categoryId').setValue(event.assetCategoryId);
    }
  }

  //Check Asset Sub Category Name existence
  checkForAssetSubCategoryNameExistence() {
    if(((this.tempValue!= null || this.tempValue!= '') ? this.tempValue.toLowerCase() : '') === ((this.assetSubCategoryForm.controls.subCategoryName.value!= null) ? this.assetSubCategoryForm.controls.subCategoryName.value.toLowerCase() :'')) {

    }else if(this.assetSubCategoryForm.controls.subCategoryName.value.replace (/s+/g, ' ').trim () === ''){
      this.assetSubCategoryForm.controls['subCategoryName'].setValue('');
    }else{
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
    constraintData.className = "com.sams.to.master.AssetSubCategoryTO";
    constraintData.constraints = {
      'subCategoryName': this.assetSubCategoryForm.controls.subCategoryName.value.toLowerCase().trim(),
      'orgId': this.userSession.getUserOrgId(),
      'categoryId' : this.assetSubCategoryForm.controls.categoryId.value,

    };
    this.commonService.checkUniqueValidation(constraintData).subscribe(
      data => {
        if (!data.success) {
          this.ErrorMsg = data.message;
          this.assetSubCategoryForm.controls.subCategoryName.setErrors(Validators.minLength);
          this.assetSubCategoryForm.controls.subCategoryName.setErrors({"notUnique": true});
        } else {
          this.ErrorMsg = '';
          this.assetSubCategoryForm.controls.subCategoryName.setErrors(null);
        }
      }
    );
    }
  }

  checkForAssetSubCategoryCodeExistence() {
    if(this.assetSubCategoryForm.controls.assetSubCategoryCode.value != '' && this.assetSubCategoryForm.controls.assetSubCategoryCode.value != null){
      this.assetSubCategoryForm.controls.assetSubCategoryCode.setValue(this.assetSubCategoryForm.controls.assetSubCategoryCode.value.trim())
    }
    if(((this.tempValue1!= null || this.tempValue1!= '') ? this.tempValue1.toLowerCase() : '') === ((this.assetSubCategoryForm.controls.assetSubCategoryCode.value!= null) ? this.assetSubCategoryForm.controls.assetSubCategoryCode.value.toLowerCase() :'')) {

    }else{
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
    constraintData.className = "com.sams.to.master.AssetSubCategoryTO";
    constraintData.constraints = {
      'assetSubCategoryCode': this.assetSubCategoryForm.controls.assetSubCategoryCode.value.toLowerCase().trim(),
      'orgId': this.userSession.getUserOrgId(),
      'categoryId' : this.assetSubCategoryForm.controls.categoryId.value,

    };
    this.commonService.checkUniqueValidation(constraintData).subscribe(
      data => {
        if (!data.success) {
          this.ErrorMsgCode = data.message;
          this.assetSubCategoryForm.controls.assetSubCategoryCode.setErrors(Validators.minLength);
          this.assetSubCategoryForm.controls.assetSubCategoryCode.setErrors({"notUnique": true});
        } else {
          this.ErrorMsgCode = '';
          this.assetSubCategoryForm.controls.assetSubCategoryCode.setErrors(null);
        }
      }
    );
    }
  }

  //CHECK MAXIMUM LENGTH IF IS GREATER THAN 100. SHOULD NOT ALLOW TO TYPE
  lengthMaximumCharacter(){
    if(this.assetSubCategoryForm.controls.subCategoryName.value.length <= 100) {
      return true;
    } else {
      return false;
    }
  }

    loadDepreciationMethodComboData(searchValue) {
      this.scrollsyncDepreciationMethod = true;
      this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
      this.commonService.getComboResults(this.assetOptimeMthnd.listOfAllDepreciationCombo, searchValue.term, '', '',
        this.recordsPerPageForCombo, this.depreciationMethodPageNumber).subscribe(
          (data) => {
            this.getData = new getData();
            this.getData = this.commonService.fetchDataList(searchValue, this.depreciationMethodPageNumber , this.depreciationMethodCombo , data.responseData.comboList)
            this.depreciationMethodPageNumber = this.getData.pageNumber;
            this.depreciationMethodCombo = this.getData.dataList;
            this.scrollsyncDepreciationMethod = false;
          }
        );
    }

    selectedDepreciationMethodData(event) {
      if (event === undefined) {
        this.assetSubCategoryForm.controls.depreciationMethodId.setValue(0);
        this.depreciationMethodPageNumber = 1;
        this.depreciationMethodCombo = [];
        this.enableRateOfDepreciation = false;
        this.assetSubCategoryForm.controls.rateOfDepreciation.setValue(0);
      } else {
        this.assetSubCategoryForm.controls.depreciationMethodId.setValue(event.assetDepreciationMethodId);
        if (event.assetDepreciationMethodName === 'STRAIGHT LINE') {
          this.enableRateOfDepreciation = false;
          this.assetSubCategoryForm.controls.rateOfDepreciation.setValue(0);
        } else {
          this.enableRateOfDepreciation = true;
        }
      }
    }

    validatePer(event){
      let beforeDecimal: any = (event.target.value).split(".")[0];
      let AfterDecimal: any = (event.target.value).split(".")[1];
      let checkDotFirstPosition: string = AfterDecimal.substring(0, 2);

      if(beforeDecimal.length > 3){
        beforeDecimal = beforeDecimal.substring(0,3)
      }
      if(AfterDecimal.length > 2){
        AfterDecimal = AfterDecimal.substring(0,2)
      }
      this.assetSubCategoryForm.controls.scrapValuePer.setValue(beforeDecimal+"."+checkDotFirstPosition);
    }

}
