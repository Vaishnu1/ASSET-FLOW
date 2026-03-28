import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemCategoryComponent } from 'src/app/Components/Master/itemMaster/item-category/item-category.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ItemCategoryModel } from 'src/app/Model/master/item-category';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { CommonHint } from 'src/app/Constants/CommonHint';

@Component({
  selector: 'app-item-category-create',
  templateUrl: './item-category-create.component.html',
  styleUrls: ['./item-category-create.component.css']
})

export class ItemCategoryCreateComponent implements OnInit {

    //COMMON HINT MESSAGE
    CommonhintMsg = new CommonHint();
 
  itemCategoryForm : FormGroup;
  public itemCategoryModel: ItemCategoryModel;
  headingDisplay : string;
  buttonDisplay : string;
  @ViewChild('itemCategory') itemCategoryFocus : ElementRef;

  uploadFlagUser: boolean = false;

  ErrorMsg :string;

  tempValue: String = '';

  constructor(public dialogRef: MatDialogRef<ItemCategoryComponent>,
              public commonServices : CommonService,
              @Inject(MAT_DIALOG_DATA) private data,
              private samsConstants: AssetOptimaConstants,
              private samsService: AssetOptimaServices,
              private userSession: UserSessionService,
              private cdr: ChangeDetectorRef
              ) { }

  ngOnInit() {
    this.itemCategoryForm = new FormGroup({
      orgId : new FormControl(''),
      categoryId : new FormControl(''),
      categoryName : new FormControl('',[Validators.required, Validators.maxLength(50)]),
      categoryDesc : new FormControl('',[Validators.maxLength(100)]),
      active : new FormControl(true),
      createdDt : new FormControl(''),
      createdBy : new FormControl(''),
      createdDtDisp : new FormControl(''),
      updatedBy : new FormControl(''),
      updatedDtDisp : new FormControl(''),
      orgName : new FormControl(''),
    })
  }

  ngAfterViewInit() {
   this.itemCategoryFocus.nativeElement.focus();
   if(this.data.ItemCategoryModel!=0){
    this.headingDisplay = "Edit";
    this.buttonDisplay = "Update";
    this.itemCategoryForm.patchValue(this.data.ItemCategoryModel);
    this.tempValue = this.data.ItemCategoryModel.categoryName!= null ? this.data.ItemCategoryModel.categoryName : '';
   }else{
    this.headingDisplay = "Create";
    this.buttonDisplay = "submit";
    this.tempValue = this.data.ItemCategoryModel.categoryName!= null ? this.data.ItemCategoryModel.categoryName : '';
   }
   this.cdr.detectChanges();  
  }

  closeModal() {
    this.dialogRef.close();
  }

  submit(){
    this.uploadFlagUser=true;
    this.itemCategoryModel = this.itemCategoryForm.value;
    var categoryName = this.itemCategoryModel.categoryName.trim();
    if(categoryName==""){
            this.commonServices.openToastWarningMessage("Kindly Enter the Valid Item Category");
            this.uploadFlagUser=false;
    }else{
      this.itemCategoryModel.categoryName=categoryName;
      this.commonServices.commonInsertService('saveOrUpdateItemCategory.sams',this.itemCategoryForm.value).subscribe(
        data =>{
          if(data.success){
            this.commonServices.openToastSuccessMessage(data.message);
              this.dialogRef.close();
              this.uploadFlagUser=false;
          }else{
            this.commonServices.openToastErrorMessage(data.message);
            this.uploadFlagUser=false;
          }

        }
      )
    }
  }

  checkUniqueConstrainForItemCategory(){
    if(((this.tempValue!= null || this.tempValue!= '') ? this.tempValue.toLowerCase() : '') === 
       ((this.itemCategoryForm.controls.categoryName.value!= null) ? this.itemCategoryForm.controls.categoryName.value.toLowerCase():'')) {

    }else  if(this.itemCategoryForm.controls.categoryName.value === ''){
      this.itemCategoryForm.controls.categoryName.setErrors(Validators.required);
    }else{
    let constraintData: UniqueValidationModel = new UniqueValidationModel();
    constraintData.className = "com.sams.to.master.ItemCategoryTO"; 
    constraintData.constraints = { 
      'categoryName': this.itemCategoryForm.controls.categoryName.value.toLowerCase(),
      'orgId':this.userSession.getUserOrgId() 
    };
    this.commonServices.checkUniqueValidation(constraintData).subscribe(
      data => {
        if(!data.success){ 
          //show the warning invalidate the form group 
          this.ErrorMsg = data.message;
          this.itemCategoryForm.controls.categoryName.setErrors(Validators.minLength);
          this.itemCategoryForm.controls.categoryName.setErrors({"notUnique": true});
        } else {
          this.ErrorMsg = '';
          this.itemCategoryForm.controls.categoryName.setErrors(null);  
        }
      }
    );
  }
 }

 //CHECK MAXIMUM LENGTH IF IS GREATER THAN 100. SHOULD NOT ALLOW TO TYPE
 lengthMaximumCharacter(){
  if(this.itemCategoryForm.controls.categoryName.value.length <= 100) {
    return true;
  } else {
    return false;
  }
 }
}
