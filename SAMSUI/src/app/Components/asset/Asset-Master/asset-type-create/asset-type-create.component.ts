import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetTypeModel } from 'src/app/Model/master/asset-type';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { AssetSubCategoryModel } from '../../../../Model/master/asset-sub-category';
import { getData } from 'src/app/Model/common/fetchListData';
import { AssetTypeListComponent } from '../asset-type-list/asset-type-list.component';

@Component({
  selector: 'app-asset-type-create',
  templateUrl: './asset-type-create.component.html',
  styleUrls: ['./asset-type-create.component.css']
})
export class AssetTypeCreateComponent implements OnInit {

  assetTypeForm: FormGroup;
  @ViewChild('assetTypeFocus') assetTypeFocusSet: ElementRef;

  //Create, Edit, Save and Update button name change based on the place
  headingDisplay: string;
  displayButton: string;
  uploadFlag: boolean = false;
  ErrorMsg: String;
  tempValue: String = '';


  //MODEL
  public AssetTypeModel: AssetTypeModel;
  public assetSubCategoryModel : AssetSubCategoryModel;
  subScrollsync: boolean;
  limitCount:  string = '';
  assetSubCategorPageNumber: number;
  subCategoryCombo: any=[];
  getData: getData;

  constructor(public assetDialog: MatDialogRef<AssetTypeListComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    public commonService: CommonService,
    public assetOptimeMthnd: AssetOptimaServices,
    private userSession: UserSessionService,
    private cdr: ChangeDetectorRef
  ) {
    this.assetSubCategoryModel = new AssetSubCategoryModel();
    this.assetSubCategorPageNumber = 1;
  }

  ngOnInit() {
    this.assetTypeForm = new FormGroup({
      assetTypeId: new FormControl(''),
      assetTypeName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      subCategoryName  : new FormControl('',[Validators.maxLength(100)]),
      subCategoryId : new FormControl(0),
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
      createdDt: new FormControl('')

    })
    this.headingDisplay = "Create";
    this.displayButton = "Submit";
  }
  ngAfterViewInit() {
    this.commonService.setFormFocus(this.assetTypeFocusSet);
    if (this.data.AssetTypeModel != 0) {
      if (this.data.mode == 'edit') {
        this.assetTypeForm.patchValue(this.data.AssetTypeModel);
        this.assetTypeForm.invalid;
        this.headingDisplay = "Edit";
        this.displayButton = "Update";
        this.tempValue = this.data.AssetTypeModel.assetTypeName != null ? this.data.AssetTypeModel.assetTypeName : '';
      }else if(this.data.mode == 'view'){
        this.assetTypeForm.patchValue(this.data.AssetTypeModel);
        this.assetTypeForm.invalid;
        this.headingDisplay = "View";
        this.displayButton = "Back";
        this.assetTypeForm.disable();
        this.tempValue = this.data.AssetTypeModel.assetTypeName != null ? this.data.AssetTypeModel.assetTypeName : '';
      }
    } else {

      this.headingDisplay = "Create";
      this.displayButton = "Submit";
      this.tempValue = this.data.AssetTypeModel.assetTypeName != null ? this.data.AssetTypeModel.assetTypeName : '';
    }
    this.cdr.detectChanges();

  }

  closeModal() {
    this.assetDialog.close();
  }

  submit() {
    this.uploadFlag = true;
    this.AssetTypeModel = this.assetTypeForm.value;
    var AssetTypeModel = this.AssetTypeModel.assetTypeName.trim();
    if (AssetTypeModel == "") {
      this.uploadFlag = false;
      this.commonService.openToastWarningMessage("Kindly Enter the Valid Asset Type");
    } else {
      this.AssetTypeModel.assetTypeName = AssetTypeModel;
      this.commonService.commonInsertService(this.assetOptimeMthnd.saveOrUpdateAssetType, this.AssetTypeModel).subscribe(
        data => {
          if (data.success) {
            this.commonService.openToastSuccessMessage(data.message);
            this.assetDialog.close();
            this.uploadFlag = false;
          } else {
            this.commonService.openToastErrorMessage(data.message);
            this.uploadFlag = false;
          }
        }
      );
    }

  }

  //Check Asset Type Name existence
  checkForAssetTypeNameExistence() {
    if (((this.tempValue != null || this.tempValue != '') ? this.tempValue.toLowerCase() : '') === ((this.assetTypeForm.controls.assetTypeName.value != null) ? this.assetTypeForm.controls.assetTypeName.value.toLowerCase() : '')) {

    }else if(this.assetTypeForm.controls.assetTypeName.value.replace (/s+/g, ' ').trim() === ''){
      this.assetTypeForm.controls['assetTypeName'].setValue('');
    }else{
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.master.AssetTypeTO";
      constraintData.constraints = {
        'assetTypeName': this.assetTypeForm.controls.assetTypeName.value.toLowerCase().trim(),
        'orgId': this.userSession.getUserOrgId()
      };
      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if (!data.success) {
            this.ErrorMsg = data.message;
            this.assetTypeForm.controls.assetTypeName.setErrors(Validators.minLength);
            this.assetTypeForm.controls.assetTypeName.setErrors({ "notUnique": true });
          } else {
            this.ErrorMsg = '';
            this.assetTypeForm.controls.assetTypeName.setErrors(null);
          }
        }
      );
    }

  }

  //CHECK MAXIMUM LENGTH IF IS GREATER THAN 100. SHOULD NOT ALLOW TO TYPE
  lengthMaximumCharacter() {
    if (this.assetTypeForm.controls.assetTypeName.value.length <= 100) {
      return true;
    } else {
      return false;
    }
  }


  listOfSubCategory(searchValue) {
    this.subScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimeMthnd.listAllAssetSubCategoryCombo, searchValue.term, this.assetSubCategoryModel,
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
      this.assetTypeForm.controls.subCategoryName.setValue(null);
      this.assetTypeForm.controls.subCategoryId.setValue(0);
      this.assetSubCategorPageNumber=1;
      this.subCategoryCombo=[];
    }else{
      this.assetTypeForm.controls.subCategoryName.setValue(event.subCategoryName);
      this.assetTypeForm.controls.subCategoryId.setValue(event.subCategoryId);
    }
  }

}
