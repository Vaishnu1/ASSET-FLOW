import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { getData } from 'src/app/Model/common/fetchListData';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { ActivatedRoute, Router } from '@angular/router';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'src/app/Components/Common-components/delete-confirmation/delete-confirmation.component';
import { allBusinessPartnerRoles } from 'src/app/Constants/AllStatusConstants';

@Component({
  selector: 'app-item-master-create',
  templateUrl: './item-master-create.component.html',
  styleUrls: ['./item-master-create.component.css']
})

export class ItemMasterCreateComponent implements OnInit {

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();
  displayedColumns = ['sno', 'itemManufacturerName', 'itemManufacturerPartno', 'active','action'];
  limitCount: any;
  getData: getData;
  itemType = [];
  uom = [];
  manufactuer = [];
  itemTypePageNumber: number;
  uomPageNumber: number;
  manufacturerPageNumber: number;
  scrollsyncmanufactuer: boolean = false;
  scrollUomsync: boolean = false;
  scrollItemTypesync: boolean = false;
  subLoaderItemManufacturer: boolean = false;

  headingDisplay: String = '';
  buttonDisplay: String = '';
  mode: String ='';
  length: number = 0;

  disableClearButton: boolean = false;
  uploadItemMasterFlag: boolean = false;
  modeDisplay: boolean = false;


  itemMasterFormGroup: FormGroup;
  itemMasterManufacturerFormGroup:FormGroup;
  itemMasterManufacturerListDataSource = new MatTableDataSource<any>();

  tempValue: String = '';
  ErrorMsg :string;

  dialogRef;
  tempList: any[] = [];
  itemMakebuttonDisplay: String = 'Add';
  itemMakeIndex:number = 0;
  disableButton:boolean = true;
  enableUpdate: boolean = false;

  constructor(private commonService: CommonService,
              private assetOptimaServices: AssetOptimaServices,
              private activatedRoute: ActivatedRoute,
              private locationRef: Location,
              private userSession: UserSessionService,
              private readonly dialog: MatDialog,
              private router: Router) {
                this.itemTypePageNumber = 1;
                this.uomPageNumber = 1;
                this.manufacturerPageNumber = 1;
                this.getData = new getData();
               }

  ngOnInit(): void {
    this.itemMasterManufacturerListDataSource.data = [];

    this.itemMasterFormGroup = new FormGroup({
      itemMasterId: new FormControl(0),
      orgId: new FormControl(0),
      itemMasterName: new FormControl(null, [ Validators.required, Validators.maxLength(50)]),
      itemMasterDesc: new FormControl(''),
      itemTypeId: new FormControl(0, [ Validators.required]),
      itemTypeName: new FormControl(null, [ Validators.required]),
      masterUOMId: new FormControl(0),
      masterUOMName: new FormControl(null, [Validators.required]),
      stockable: new FormControl(false),
      purchasable: new FormControl(false),
      active: new FormControl(true),
      createdBy:  new FormControl(''),
      createdDt:  new FormControl(''),
      updatedBy:  new FormControl(''),
      updatedDt:  new FormControl(''),
      itemCategoryId:  new FormControl(0),
      itemCategoryName : new FormControl(''),
      hsnCode : new FormControl(''),
      glAccCode : new FormControl(''),
      slAccCode : new FormControl(''),
      itemMasterManufacturerList: new FormControl([])
    });

    this.itemMasterManufacturerFormGroup = new FormGroup({
      itemMakeId: new FormControl(0),
      itemManufacturerId: new FormControl(0),
      itemManufacturerName: new FormControl(null),
      itemManufacturerPartno: new FormControl(null),
      active: new FormControl(true)
    });
    this.itemMasterFormGroup.get('itemCategoryName').disable();
    this.validateEditMode();
  }

  validateEditMode() {
    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;        
        var mode = params.mode;
        this.mode = mode;
        if(primaryId === '0') {
          primaryId = Number(primaryId);
          this.buttonDisplay = 'Submit';
          this.headingDisplay = 'Create';
        } else {
          this.fetchItemMasterbyId(primaryId);
          if(mode === 'edit') {
            this.buttonDisplay = 'Update';
            this.headingDisplay = 'Edit';
            this.disableClearButton = true;
          } else {
            this.buttonDisplay = 'Update';
            this.headingDisplay = 'View';
            this.modeDisplay = true;
            this.displayedColumns = ['sno', 'itemManufacturerName', 'itemManufacturerPartno', 'active'];
            this.itemMasterFormGroup.disable();
          }
        }
      }
    );
  }

  backToPreviousPage() {
    localStorage.setItem('previousRoute', this.router.url);
    this.locationRef.back();
  }

  backToInventoryMaster(){
    this.locationRef.back();
  }

  clear() {
    this.itemMasterFormGroup.reset();
    this.ngOnInit();
  }

  listofItemType(searchTerms) {
    this.scrollItemTypesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllItemTypeCombo, searchTerms.term, '', '', this.limitCount, this.itemTypePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.itemTypePageNumber , this.itemType , data.responseData.comboList)
        this.itemTypePageNumber = this.getData.pageNumber;
        this.itemType = this.getData.dataList;
        this.scrollItemTypesync = false;
      }
    );
  }

  getItemTypeComboValue(event) {
    if (event === undefined) {
      this.itemMasterFormGroup.get('itemTypeId').setValue(0);
      this.itemMasterFormGroup.get('itemCategoryId').setValue(0);
      this.itemMasterFormGroup.get('itemCategoryName').setValue('');
      this.itemMasterFormGroup.get('hsnCode').setValue('');
      this.itemMasterFormGroup.get('glAccCode').setValue('');
      this.itemMasterFormGroup.get('slAccCode').setValue('');
      this.itemType = [];
      this.itemTypePageNumber = 1;
    } else {
      this.itemMasterFormGroup.get('itemTypeId').setValue(event.itemTypeId);
      this.itemMasterFormGroup.get('itemCategoryName').setValue(event.itemCategoryName);
      this.itemMasterFormGroup.get('itemCategoryId').setValue(event.itemCategoryId);
      this.itemMasterFormGroup.get('hsnCode').setValue(event.hsnCode);
      this.itemMasterFormGroup.get('glAccCode').setValue(event.glAccCode);
      this.itemMasterFormGroup.get('slAccCode').setValue(event.slAccCode);
    }
  }

  listOfUOM(searchTerms) {
    this.scrollUomsync = true;
    this.limitCount = (!(this.commonService.fetchSearchValue(searchTerms))) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfUOMCombo, searchTerms.term, '', '', this.limitCount, this.uomPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.uomPageNumber , this.uom , data.responseData.comboList)
        this.uomPageNumber = this.getData.pageNumber;
        this.uom = this.getData.dataList;
        this.scrollUomsync = false;
      }
    );
  }

  getUOMValue(event) {
    if (event === undefined) {
      this.itemMasterFormGroup.get('masterUOMId').setValue(0);
      this.uom = [];
      this.uomPageNumber = 1;
    } else {
      this.itemMasterFormGroup.get('masterUOMId').setValue(event.uomId);
    }
  }

  listOfManufacturer(searchValue) {
    this.scrollsyncmanufactuer = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.MANUFACTURER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchValue.term, '', '', this.limitCount, this.manufacturerPageNumber,'', partnerRoles).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.manufacturerPageNumber , this.manufactuer , data.responseData.comboList)
        this.manufacturerPageNumber = this.getData.pageNumber;
        this.manufactuer = this.getData.dataList;
        this.scrollsyncmanufactuer = false;
      }
    );
    if (searchValue === 'clear') {
      this.disableButton = true;
      this.itemMasterManufacturerFormGroup.reset();
      this.itemMasterManufacturerFormGroup.controls.itemMakeId.setValue(0);
      this.itemMasterManufacturerFormGroup.controls.active.setValue(true);
      this.itemMakebuttonDisplay = 'Add';  
    }
  }

  getManfacturerComboValue(event) {
    if (event === undefined) {
      this.itemMasterManufacturerFormGroup.controls.itemManufacturerId.setValue(0);
      this.manufacturerPageNumber = 1;
      this.manufactuer = [];
    } else {
      this.itemMasterManufacturerFormGroup.controls.itemManufacturerId.setValue(event.businessPartnerId);
      this.disableButton = false;
    }
  }

  fetchItemMasterbyId(primaryId){
    this.subLoaderItemManufacturer = true;
    this.commonService.commonGetService(this.assetOptimaServices.loadItemMasterInfoByItemMasterId, primaryId,'ITEM MASTER CREATE').subscribe(
      data => {
        if (data.success) {
          this.subLoaderItemManufacturer = false;
          this.itemMasterFormGroup.patchValue(data.responseData);
          this.itemMasterFormGroup.controls.itemTypeName.setValue(data.responseData.itemTypeTO.itemTypeName);
          this.itemMasterFormGroup.controls.itemCategoryName.setValue(data.responseData.itemTypeTO.itemCategoryName);
          this.itemMasterManufacturerListDataSource.data = this.itemMasterFormGroup.controls.itemMasterManufacturerList.value;
          this.length = this.itemMasterManufacturerListDataSource.data.length;    
          this.tempValue = this.itemMasterFormGroup.controls.itemMasterName.value;
        }else{
          this.subLoaderItemManufacturer = false;
        }
      }
    );
  }

  checkForItemNameExistence(){
    if(((this.tempValue!= null || this.tempValue!= '') ? this.tempValue.toLowerCase() : '') === 
      ((this.itemMasterFormGroup.controls.itemMasterName.value!= null) ? this.itemMasterFormGroup.controls.itemMasterName.value.toLowerCase():'')) {
    
      }else if(this.itemMasterFormGroup.controls.itemMasterName.value.replace(/s+/g, ' ').trim() === ''){
        this.itemMasterFormGroup.controls['itemMasterName'].setValue('');
      }else{
        let constraintData: UniqueValidationModel = new UniqueValidationModel();
        constraintData.className = "com.sams.to.inventory.ItemMasterTO";
        constraintData.constraints = {
        'itemMasterName': this.itemMasterFormGroup.controls.itemMasterName.value.trim(),
        'orgId':this.userSession.getUserOrgId()
        };
        this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if(!data.success){
            this.ErrorMsg = data.message;
            this.itemMasterFormGroup.controls.itemMasterName.setErrors(Validators.minLength);
            this.itemMasterFormGroup.controls.itemMasterName.setErrors({"notUnique": true});
          }else{
            this.ErrorMsg = '';
            this.itemMasterFormGroup.controls.itemMasterName.setErrors(null);
          }
        }
      );
    }
  }

  saveOrUpdateItemMaster() {
    this.uploadItemMasterFlag = true;
    this.itemMasterFormGroup.enable();
    this.itemMasterFormGroup.controls.itemMasterManufacturerList.setValue(this.itemMasterManufacturerListDataSource.data);
    this.commonService.commonInsertService(this.assetOptimaServices.saveOrUpdateItemMaster, this.itemMasterFormGroup.getRawValue())
    .subscribe(
      data => {
        if(data.success) {
          this.uploadItemMasterFlag = false;
          this.commonService.openToastSuccessMessage(data.message);
          this.backToPreviousPage();
        } else {
          this.uploadItemMasterFlag = false;
          this.commonService.openToastErrorMessage(data.message);
        }
      }
    );
  }

  addItemManufacturerToList(source,itemMakeIndex){           
    this.isChanged();       
    let itemMakeMsg= `"Item Manufacturer" Is Already Added.`;

    this.itemMasterManufacturerFormGroup.value.itemManufacturerPartno = this.itemMasterManufacturerFormGroup.value.itemManufacturerPartno === null ? '' : this.itemMasterManufacturerFormGroup.value.itemManufacturerPartno.trim();

    const itemManufacturerIdValid = this.itemMasterManufacturerListDataSource.data.findIndex(data => data.itemManufacturerId === this.itemMasterManufacturerFormGroup.value.itemManufacturerId) === -1;

    if (source === 'Add' && itemManufacturerIdValid) {
      this.itemMasterManufacturerListDataSource.data.push(this.itemMasterManufacturerFormGroup.value);  
    }else if(source === 'Update'){  
      const itemManufacturerIdValid1 = this.itemMasterManufacturerListDataSource.data[itemMakeIndex].itemManufacturerId === this.itemMasterManufacturerFormGroup.value.itemManufacturerId;
      
      if (itemManufacturerIdValid1 || itemManufacturerIdValid) {        
        this.itemMasterManufacturerListDataSource.data[itemMakeIndex].itemManufacturerId = this.itemMasterManufacturerFormGroup.value.itemManufacturerId;
        this.itemMasterManufacturerListDataSource.data[itemMakeIndex].itemManufacturerName = this.itemMasterManufacturerFormGroup.value.itemManufacturerName;
        this.itemMasterManufacturerListDataSource.data[itemMakeIndex].itemManufacturerPartno = this.itemMasterManufacturerFormGroup.value.itemManufacturerPartno;
        this.itemMasterManufacturerListDataSource.data[itemMakeIndex].active = this.itemMasterManufacturerFormGroup.value.active;
      } else if(!itemManufacturerIdValid1){
        this.commonService.openToastWarningMessage(itemMakeMsg);
      } 
      this.itemMakebuttonDisplay = 'Add';  

    }else if(!itemManufacturerIdValid){
      this.commonService.openToastWarningMessage(itemMakeMsg);
    }

    this.itemMasterManufacturerListDataSource._updateChangeSubscription();
    this.itemMasterManufacturerFormGroup.reset();
    this.itemMasterManufacturerFormGroup.controls.itemMakeId.setValue(0);
    this.itemMasterManufacturerFormGroup.controls.active.setValue(true);
    this.length = this.itemMasterManufacturerListDataSource.data.length;  
    this.disableButton = true;  
  }

  editItemManufacturer(element,i){
    this.itemMakebuttonDisplay = 'Update';
    this.itemMakeIndex = i;
    this.disableButton = false;  
    this.itemMasterManufacturerFormGroup.patchValue(element);
  }

  deleteItemManufacturer(i){
    this.dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Item Manufacturer'
      }
    });
    this.dialogRef.disableClose = true;
    this.dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          this.tempList = this.itemMasterManufacturerListDataSource.data;
          this.tempList.splice(i, 1);
          this.itemMasterManufacturerListDataSource.data = this.tempList;
          this.length = this.itemMasterManufacturerListDataSource.data.length;
          this.commonService.openToastSuccessMessage("Record Deleted Successfully.");
        }
      });
  }
  
  isChanged(){
    this.enableUpdate = true;
  }
}
