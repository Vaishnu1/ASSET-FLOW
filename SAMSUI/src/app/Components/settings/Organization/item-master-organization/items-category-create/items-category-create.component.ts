import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { ItemCategoryModel } from 'src/app/Model/master/item-category';
import { ItemsCategoryComponent } from '../items-category/items-category.component';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-items-category-create',
  templateUrl: './items-category-create.component.html',
  styleUrls: ['./items-category-create.component.css']
})
export class ItemsCategoryCreateComponent implements OnInit {

  itemCategoryForm: FormGroup;
  public itemCategoryModel: ItemCategoryModel;
  ErrorMsg :string;

  CommonhintMsg = new CommonHint();
  headingDisplay : string;
  buttonDisplay : string='Submit';
  tempValue: String = '';
  allowPrRadioButtonFlagChange : boolean = true;
  @ViewChild('itemCategory') itemCategoryFocus : ElementRef;
  uploadFlagUser: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<ItemsCategoryComponent>,
    private commonService: CommonService,
    private samsService: AssetOptimaServices,
    private userSession: UserSessionService
  ) { }

  ngOnInit(): void {
    this.itemCategoryForm = new FormGroup({
      categoryName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      categoryId: new FormControl(''),
      itemCategoryDesc: new FormControl('', [Validators.maxLength(100)]),
      createdBy             : new FormControl(''),
      createdDtDisp         : new FormControl(''),
      updatedBy             : new FormControl(''),
      updatedDtDisp         : new FormControl(''),
      pageNumber            : new FormControl(''),
      recordsPerPage        : new FormControl(''),
      orgName               : new FormControl(''),
      orgId                 : new FormControl(''),
      active                : new FormControl(true),
      createdDt             : new FormControl(''),
      updatedDt             : new FormControl(''),
      systemGenerated       : new FormControl(false),
      allowEditItemName     : new FormControl('N',[Validators.required])
    });
  }

  ngAfterViewInit() {
    this.itemCategoryFocus.nativeElement.focus();
    if(this.data.mode === 'add'){
      this.buttonDisplay = "Submit";
      this.headingDisplay = "Create";
      this.tempValue = this.data.itemCategory.categoryName!= null ? this.data.itemCategory.categoryName : '';
    }else if(this.data.mode === 'edit') {
      this.allowPrRadioButtonFlagChange = true;
      this.buttonDisplay = "Update";
      this.headingDisplay = "Edit";
      this.itemCategoryForm.patchValue(this.data.itemCategory);
      this.tempValue = this.data.itemCategory.categoryName!= null ? this.data.itemCategory.categoryName : '';
    }else if(this.data.mode === 'view'){
      this.allowPrRadioButtonFlagChange = true;
      this.buttonDisplay = "Update";
      this.headingDisplay = "View";
      this.itemCategoryForm.patchValue(this.data.itemCategory);
      this.itemCategoryForm.disable();
    }
    this.cdr.detectChanges();
  }

  closeModal() {
    this.dialogRef.close();
  }

  checkUniqueConstrainForItemType(){
    if(((this.tempValue!= null || this.tempValue!= '') ? this.tempValue.toLowerCase() : '') === 
    ((this.itemCategoryForm.controls.categoryName.value!= null) ? this.itemCategoryForm.controls.categoryName.value.toLowerCase():'')) {
  
    }else if(this.itemCategoryForm.controls.categoryName.value.replace(/s+/g, ' ').trim() === ''){
      this.itemCategoryForm.controls['categoryName'].setValue('');
    }else{
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.master.ItemCategoryTO";
      constraintData.constraints = {
      'categoryName': this.itemCategoryForm.controls.categoryName.value.toLowerCase().trim(),
      'orgId':this.userSession.getUserOrgId()
      };
      this.commonService.checkUniqueValidation(constraintData).subscribe(
      data => {
        if(!data.success){
          this.ErrorMsg = data.message;
          this.itemCategoryForm.controls.categoryName.setErrors(Validators.minLength);
          this.itemCategoryForm.controls.categoryName.setErrors({"notUnique": true});
        }else{
          this.ErrorMsg = '';
          this.itemCategoryForm.controls.categoryName.setErrors(null);
        }
      }
    );
  }
  }

  createitemCategory() {  
    this.uploadFlagUser=true;
    this.itemCategoryModel = this.itemCategoryForm.value;
    var categoryName = this.itemCategoryModel.categoryName.trim();
      this.itemCategoryModel.categoryName=categoryName;
      this.commonService.commonInsertService(this.samsService.saveOrUpdateItemCategory,this.itemCategoryModel).subscribe(
        data => {
          if(data.success){
            this.commonService.openToastSuccessMessage(data.message);
            this.dialogRef.close();
            this.uploadFlagUser=false;
          }else{
            this.commonService.openToastErrorMessage(data.message);
            this.uploadFlagUser=false;
          }
        }
      );
  }

  changeAllowEditItem(event){
    if(this.headingDisplay == "Edit"){
      this.allowPrRadioButtonFlagChange = false;
    }
    this.itemCategoryForm.controls.allowEditItemName.setValue(event);
  }
}
