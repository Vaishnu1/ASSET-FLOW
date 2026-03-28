import { Component, OnInit, ViewChild, Inject, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetCategoryModel } from 'src/app/Model/master/assetCategory';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { AssetCategoryListComponent } from '../asset-category-list/asset-category-list.component';

@Component({
  selector: 'app-asset-category-create',
  templateUrl: './asset-category-create.component.html',
  styleUrls: ['./asset-category-create.component.css']
})
export class AssetCategoryCreateComponent implements OnInit {

  assetCategoryForm: FormGroup;

  @ViewChild('assetcategoryFocus', { static: true }) assetcategoryFocusSet : ElementRef;

  //Create, Edit, Save and Update button name change based on the place
  headingDisplay : string;
  displayButton: string;
  businessType: any[] = [
    {  businessTypeId: 1, businessTypeValue: 'Bio Medical'},
  ];
  checked : boolean;
  uploadFlagAssetCategory : boolean = false;
  ErrorMsg : String='';
  ErrorMsgCode:string='';
  tempValue: String = '';
  tempValue1: String = '';
  //MODEL
  public assetCategoryModel : AssetCategoryModel;
  viewFlag: boolean;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  constructor(public dialogRef: MatDialogRef<AssetCategoryListComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    public commonService: CommonService,
    public assetOptimeMthnd: AssetOptimaServices,
    private userSession: UserSessionService,
    private cdr: ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.assetCategoryForm = new FormGroup({

      assetCategoryName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      assetCategoryCode: new FormControl('', [Validators.maxLength(100)]),
      businessType: new FormControl(''),
      assetCategoryId: new FormControl(''),
      specification: new FormControl(false),
      depreciation: new FormControl(false),
      customFields: new FormControl(false),
      modelItems: new FormControl(false),
      selfAnalysis: new FormControl(false),
      document: new FormControl(false),
      checkList: new FormControl(false),
      solutionBank: new FormControl(false),
      additionalInfo: new FormControl(false),
      inventoryModule: new FormControl(false),
      technicalSpecelist: new FormControl(false),
      maintenanceSchedule: new FormControl(false),
      childModel: new FormControl(false),

       //COMMON OBJECTS
       createdDt: new FormControl(''),
       createdBy: new FormControl(''),
       updatedDt: new FormControl(''),
       createdDtDisp: new FormControl(''),
       updatedBy: new FormControl(''),
       updatedDtDisp: new FormControl(''),
       pageNumber: new FormControl(''),
       recordsPerPage: new FormControl(''),
       orgName: new FormControl(''),
       orgId: new FormControl(''),
       active: new FormControl(true)
    })
    this.assetCategoryForm.controls.businessType.setValue('Bio Medical');
    this.getBusinessTypeComboValue(this.businessType[0]);
    this.headingDisplay = "Create";
    this.displayButton = "Submit";
  }
  ngAfterViewInit() {
    this.commonService.setFormFocus(this.assetcategoryFocusSet);
    if(this.data.assetCategoryModel!=0){
      this.assetCategoryForm.patchValue(this.data.assetCategoryModel);
      this.viewFlag = this.data.viewFlag;

      // this.assetCategoryForm.invalid;
      this.headingDisplay = "Edit";
      this.displayButton = "Update";
      this.tempValue = this.data.assetCategoryModel.assetCategoryName!= null ? this.data.assetCategoryModel.assetCategoryName : '';
      this.tempValue1 = this.data.assetCategoryModel.assetCategoryCode!= null ? this.data.assetCategoryModel.assetCategoryCode : '';

      if (this.viewFlag) {
        this.assetCategoryForm.controls.assetCategoryName.disable();
        this.assetCategoryForm.controls.assetCategoryCode.disable();
        this.headingDisplay = "View";
      }

    }else{
      this.headingDisplay = "Create";
      this.displayButton = "Submit";
      this.tempValue = this.data.assetCategoryModel.assetCategoryName!= null ? this.data.assetCategoryModel.assetCategoryName : '';
      this.tempValue1 = this.data.assetCategoryModel.assetCategoryCode!= null ? this.data.assetCategoryModel.assetCategoryCode : '';
    }
    this.cdr.detectChanges();

  }

  closeModal() {
    this.dialogRef.close();
  }

  submit(){
    this.uploadFlagAssetCategory = true;
    if(this.assetCategoryForm.controls.assetCategoryCode.value.trim() == ""){
      this.assetCategoryForm.controls.assetCategoryCode.setValue(null);
    }
    this.assetCategoryModel = this.assetCategoryForm.value;
    var assetCategoryModel = this.assetCategoryModel['assetCategoryName'].trim();
    if(assetCategoryModel==""){
            this.uploadFlagAssetCategory =  false;
            this.commonService.openToastWarningMessage("Kindly Enter the Valid asset category");
    }else{
      this.assetCategoryModel.assetCategoryName=assetCategoryModel;
      this.commonService.commonInsertService(this.assetOptimeMthnd.saveOrUpdateAssetCategory,this.assetCategoryModel).subscribe(
        data => {
          if(data.success){
            this.uploadFlagAssetCategory =  false;
            this.commonService.openToastSuccessMessage(data.message);
            this.dialogRef.close();
          } else {
            this.uploadFlagAssetCategory =  false;
            this.commonService.openToastErrorMessage(data.message);
          }
        }
      );
    }

  }

  getBusinessTypeComboValue(event){

    var tempSelected = (event !== null && event !== undefined && event !== '') ? event.businessTypeId : null;
     if (tempSelected === 1) {
       this.assetCategoryForm.controls['specification'].setValue(false);
       this.assetCategoryForm.controls['depreciation'].setValue(true);
       this.assetCategoryForm.controls['customFields'].setValue(true);
       this.assetCategoryForm.controls['modelItems'].setValue(true);
       this.assetCategoryForm.controls['selfAnalysis'].setValue(true);
       this.assetCategoryForm.controls['document'].setValue(true);
       this.assetCategoryForm.controls['solutionBank'].setValue(true);
       this.assetCategoryForm.controls['checkList'].setValue(true);
       this.assetCategoryForm.controls['additionalInfo'].setValue(true);
       this.assetCategoryForm.controls['inventoryModule'].setValue(true);
       this.assetCategoryForm.controls['technicalSpecelist'].setValue(true);
       this.assetCategoryForm.controls['maintenanceSchedule'].setValue(true);
       this.assetCategoryForm.controls['childModel'].setValue(true);
     } else {
      this.assetCategoryForm.controls['specification'].setValue(false);
      this.assetCategoryForm.controls['depreciation'].setValue(false);
      this.assetCategoryForm.controls['customFields'].setValue(false);
      this.assetCategoryForm.controls['modelItems'].setValue(false);
      this.assetCategoryForm.controls['selfAnalysis'].setValue(false);
      this.assetCategoryForm.controls['document'].setValue(false);
      this.assetCategoryForm.controls['solutionBank'].setValue(false);
      this.assetCategoryForm.controls['checkList'].setValue(false);
      this.assetCategoryForm.controls['additionalInfo'].setValue(false);
      this.assetCategoryForm.controls['inventoryModule'].setValue(false);
      this.assetCategoryForm.controls['technicalSpecelist'].setValue(false);
      this.assetCategoryForm.controls['maintenanceSchedule'].setValue(false);
      this.assetCategoryForm.controls['childModel'].setValue(false);
    }

  }

  listOfBusinessType(event) {

  }

    //Check Asset Category Name existence
checkForAssetCategoryNameExistence() {
  if(((this.tempValue!= null || this.tempValue!= '') ? this.tempValue.toLowerCase() : '') === ((this.assetCategoryForm.controls.assetCategoryName.value!= null) ? this.assetCategoryForm.controls.assetCategoryName.value.toLowerCase():'')) {

  }else if(this.assetCategoryForm.controls.assetCategoryName.value.replace (/s+/g, ' ').trim () === ''){
    this.assetCategoryForm.controls['assetCategoryName'].setValue('');
  }else{
    let constraintData: UniqueValidationModel = new UniqueValidationModel();
    constraintData.className = "com.sams.to.master.AssetCategoryTO";
    constraintData.constraints = {
    'assetCategoryName': this.assetCategoryForm.controls.assetCategoryName.value.toLowerCase().trim(),
    'orgId':this.userSession.getUserOrgId()

    };
    this.commonService.checkUniqueValidation(constraintData).subscribe(
    data => {
    if(!data.success){
      this.ErrorMsg = data.message;
      this.assetCategoryForm.controls.assetCategoryName.setErrors(Validators.minLength);
      this.assetCategoryForm.controls.assetCategoryName.setErrors({"notUnique": true});
    }else{
      this.ErrorMsg = '';
      this.assetCategoryForm.controls.assetCategoryName.setErrors(null);
    }

    }
    );
  }
}

checkForAssetCategoryCodeExistence() {
  if(this.assetCategoryForm.controls.assetCategoryCode.value != '' && this.assetCategoryForm.controls.assetCategoryCode.value != null){
    this.assetCategoryForm.controls.assetCategoryCode.setValue(this.assetCategoryForm.controls.assetCategoryCode.value.trim())
  }
  if(((this.tempValue1!= null || this.tempValue1!= '') ? this.tempValue1.toLowerCase() : '') === ((this.assetCategoryForm.controls.assetCategoryCode.value!= null) ? this.assetCategoryForm.controls.assetCategoryCode.value.toLowerCase():'')) {

  }else{
    let constraintData: UniqueValidationModel = new UniqueValidationModel();
    constraintData.className = "com.sams.to.master.AssetCategoryTO";
    constraintData.constraints = {
    'assetCategoryCode': this.assetCategoryForm.controls.assetCategoryCode.value.toLowerCase().trim(),
    'orgId':this.userSession.getUserOrgId()

    };
    this.commonService.checkUniqueValidation(constraintData).subscribe(
    data => {
    if(!data.success){
      this.ErrorMsgCode = data.message;
      this.assetCategoryForm.controls.assetCategoryCode.setErrors(Validators.minLength);
      this.assetCategoryForm.controls.assetCategoryCode.setErrors({"notUnique": true});
    }else{
      this.ErrorMsgCode = '';
      this.assetCategoryForm.controls.assetCategoryCode.setErrors(null);
    }

    }
    );
  }
}


}
