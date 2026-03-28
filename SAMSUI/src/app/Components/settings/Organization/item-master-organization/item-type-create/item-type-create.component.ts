import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ItemTypeComponent } from 'src/app/Components/settings/Organization/item-master-organization/item-type/item-type.component';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { ItemTypeModel } from 'src/app/Model/master/item-type';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { getData } from 'src/app/Model/common/fetchListData';

@Component({
  selector: 'app-item-type-create',
  templateUrl: './item-type-create.component.html',
  styleUrls: ['./item-type-create.component.css']
})
export class ItemTypeCreateComponent implements OnInit {
  itemTypeForm: FormGroup;
  public itemTypeModel: ItemTypeModel;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();
  headingDisplay : string;
  buttonDisplay : string='Submit';
  @ViewChild('itemType') itemTypeFocus : ElementRef;

  uploadFlagUser: boolean = false;

  limitCount: any;
  itemTypeList = [];
  ErrorMsg :string;

  tempValue: String = '';
  getData: getData;

  itemCateogoryList : any = [];
  scrollItemCategorysync : boolean = false;
  itemCategoryPageNumber : number ;
  // timer;
  // inputModel: String='';

  constructor(public dialogRef: MatDialogRef<ItemTypeComponent>,
              private commonService: CommonService,
              private samsService: AssetOptimaServices,
              @Inject(MAT_DIALOG_DATA) private data,
              private userSession: UserSessionService,
              private cdr: ChangeDetectorRef
              ) { 
                this.getData = new getData();
               }

  ngOnInit() {
    this.itemTypeForm = new FormGroup({
      itemTypeName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      itemTypeId: new FormControl(''),
      itemTypeDesc: new FormControl('', [Validators.maxLength(100)]),
      hsnCode: new FormControl('', [Validators.maxLength(100)]),
      glAccCode: new FormControl('', [Validators.maxLength(100)]),
      slAccCode: new FormControl('', [Validators.maxLength(100)]),
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
      itemCategoryId        : new FormControl(0),
      itemCategoryName      : new FormControl('')
    });
    this.itemCategoryPageNumber = 1;

  }

  ngAfterViewInit() {
    this.itemTypeFocus.nativeElement.focus();
    if(this.data.mode === 'add'){
      this.buttonDisplay = "Submit";
      this.headingDisplay = "Create";
      this.tempValue = this.data.itemType.itemTypeName!= null ? this.data.itemType.itemTypeName : '';
    }else if(this.data.mode === 'edit') {
      this.buttonDisplay = "Update";
      this.headingDisplay = "Edit";
      this.itemTypeForm.patchValue(this.data.itemType);
      this.tempValue = this.data.itemType.itemTypeName!= null ? this.data.itemType.itemTypeName : '';
    }else if(this.data.mode === 'view'){
      this.buttonDisplay = "Update";
      this.headingDisplay = "View";
      this.itemTypeForm.patchValue(this.data.itemType);
      this.itemTypeForm.disable();
    }
    this.cdr.detectChanges();
  }
  closeModal() {
    this.dialogRef.close();
  }

  createitemtype() {  
    this.uploadFlagUser=true;
    this.itemTypeModel = this.itemTypeForm.value;
    var itemTypeName = this.itemTypeModel.itemTypeName.trim();
      this.itemTypeModel.itemTypeName=itemTypeName;
      this.commonService.commonInsertService(this.samsService.saveOrUpdateItemType,this.itemTypeModel).subscribe(
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

  checkUniqueConstrainForItemType() {
      if(((this.tempValue!= null || this.tempValue!= '') ? this.tempValue.toLowerCase() : '') === 
      ((this.itemTypeForm.controls.itemTypeName.value!= null) ? this.itemTypeForm.controls.itemTypeName.value.toLowerCase():'')) {
    
      }else if(this.itemTypeForm.controls.itemTypeName.value.replace(/s+/g, ' ').trim() === ''){
        this.itemTypeForm.controls['itemTypeName'].setValue('');
      }else{
        let constraintData: UniqueValidationModel = new UniqueValidationModel();
        constraintData.className = "com.sams.to.master.ItemTypeTO";
        constraintData.constraints = {
        'itemTypeName': this.itemTypeForm.controls.itemTypeName.value.toLowerCase().trim(),
        'orgId':this.userSession.getUserOrgId()
        };
        this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if(!data.success){
            this.ErrorMsg = data.message;
            this.itemTypeForm.controls.itemTypeName.setErrors(Validators.minLength);
            this.itemTypeForm.controls.itemTypeName.setErrors({"notUnique": true});
          }else{
            this.ErrorMsg = '';
            this.itemTypeForm.controls.itemTypeName.setErrors(null);
          }
        }
      );
    }
  }

  listofItemCategory(searchTerms) {
    this.scrollItemCategorysync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults(this.samsService.listOfItemCategoryCombo, searchTerms.term, '', '', this.limitCount, this.itemCategoryPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.itemCategoryPageNumber , this.itemCateogoryList , data.responseData.comboList)
        this.itemCategoryPageNumber = this.getData.pageNumber;
        this.itemCateogoryList = this.getData.dataList;
        this.scrollItemCategorysync = false;
      }
    );
  }

  getItemCategoryComboValue(event) {
    if (event === undefined) {
      this.itemCateogoryList = [];
      this.itemTypeForm.get('itemCategoryId').setValue(0);
      this.itemTypeForm.get('itemCategoryName').setValue('');
    } else {
      this.itemTypeForm.get('itemCategoryName').setValue(event.categoryName);
      this.itemTypeForm.get('itemCategoryId').setValue(event.categoryId);
    }
  }

  //only white space validation
  // checkFormFields(element){    
  //   if(this.itemTypeForm.controls[element].value.replace (/s+/g, ' ').trim () === ''){
  //     this.itemTypeForm.controls[element].setValue('');
  //   }
  // }

  //only special characters validation
  // checkFormFieldSpecialCharValidation(element){ 
  //   clearTimeout(this.timer);
  //   this.timer = setTimeout(() => {
  //     this.inputModel = this.itemTypeForm.controls[element].value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').toUpperCase();      
  //     if(this.inputModel.length===0 && this.itemTypeForm.controls[element].value!==''){
  //       this.itemTypeForm.controls[element].setValue('');
  //       this.commonService.openToastWarningMessage("Please Enter The Valid Data.");
  //       this.itemTypeForm.controls[element].setErrors(Validators.required);
  //     }
  //   }, 900);
  // }
}

