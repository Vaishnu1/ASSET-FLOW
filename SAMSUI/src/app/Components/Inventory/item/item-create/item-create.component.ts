import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getData } from 'src/app/Model/common/fetchListData';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { ActivatedRoute } from '@angular/router';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { allBusinessPartnerRoles, allWorkflowStatus } from 'src/app/Constants/AllStatusConstants';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ItemApprovedSupplierComponent } from '../item-approved-supplier/item-approved-supplier.component';


@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent implements OnInit {

displayedColumns = ['sno', 'itemSupplierCd', 'itemSupplierName', 'itemSupplierSiteName', 'itemSupplierSiteCurrCd', 'itemLeadTime','moq', 'active','action'];

//COMMON HINT MESSAGE
CommonhintMsg = new CommonHint();

tempValue: String = '';
ErrorMsg :string;

itemFormGroup: FormGroup;
itemMasterFormGroup: FormGroup;
itemApprovedSupplierFormGroup: FormGroup;
itemSupplierListDataSource= new MatTableDataSource<any>();

disableClearButton: boolean = false;
uploadItemFlag: boolean = false;
modeDisplay: boolean = false;

headingDisplay: String = '';
buttonDisplay: String = '';
mode: String ='';
length: number = 0;

scrollsyncLocation = false;
recordsPerPageForCombo: string;
locationPageNumber: number;
locationCombo: any = [];

scrollItemNameSync: boolean = false;
itemPageNumber: number;
itemCombo: any[] =[];

scrollStoreNamesync: boolean = false;
storePageNumber: number;
storeList: any = [];

costingType = [
  { id: 1, name: 'FIFO' },
  { id: 2, name: 'MOVING AVERAGE COST' }
];

getData: getData;
subLoaderItemSupplier:boolean = false;

currentItemId: number;
public transactionSource: any;
employeeId: string = '';
approvalId: string = '0';
itemApproveButtonEnable: boolean = false;
workFlowDisable: boolean = false;

scrollSupplierNamesync: boolean = false;
limitCount: any;
supplierPageNumber: number;
supplierList: any = [];

scrollSupplierSiteSync: boolean = false;
supplierSitePageNumber: number;
supplierSiteList: any = [];

itemSupplierSiteIdValid: boolean = false;

enableSubmitBtn: boolean = true;

constructor(private locationRef: Location,
  private commonService: CommonService,
  private assetOptimaServices: AssetOptimaServices,
  private activatedRoute: ActivatedRoute,
  private userSession: UserSessionService,
  private assetOptimaConstants: AssetOptimaConstants,
  private dialog: MatDialog) {
    this.locationPageNumber = 1;
    this.itemPageNumber =1;
    this.storePageNumber =1;
    this.getData = new getData();
    this.supplierPageNumber = 1;
    this.supplierSitePageNumber = 1;
}

ngOnInit() {
  this.itemSupplierListDataSource.data=[]

  this.itemMasterFormGroup = new FormGroup({
    itemMasterId: new FormControl(0),
    orgId: new FormControl(0),
    itemMasterName: new FormControl(null, [ Validators.required]),
    itemMasterDesc: new FormControl(null),
    itemTypeId: new FormControl(0),
    itemTypeName: new FormControl(null),
    masterUOMId: new FormControl(0),
    masterUOMName: new FormControl(null),
    stockable: new FormControl(false),
    purchasable: new FormControl(false),
    active: new FormControl(false),
    itemCategoryName: new FormControl(null)
    });


  this.itemFormGroup = new FormGroup({
    itemLocId: new FormControl(0),
    orgId: new FormControl(0),
    locationId: new FormControl(0, [ Validators.required]),
    itemMasterTO : this.itemMasterFormGroup,
    invoiceable:  new FormControl(false),
    itemStatus:  new FormControl(''),
    storeId:  new FormControl(0),
    storeName:  new FormControl(null),
    maxStockQty:  new FormControl(0,[this.assetOptimaConstants.customDecimalValidator(6,2)]),
    minStockQty:  new FormControl(0,[this.assetOptimaConstants.customDecimalValidator(6,2)]),
    costingType:  new FormControl('MOVING AVERAGE COST'),
    serialControlled:  new FormControl(false),
    batchControlled:  new FormControl(false),
    itemMasterId:  new FormControl(0),
    supplierSiteId:  new FormControl(0),
    locationName:  new FormControl(null, [ Validators.required]),
    itemApprovalStatus:  new FormControl(null),
    createdBy:  new FormControl(''),
    createdDt:  new FormControl(''),
    updatedBy:  new FormControl(''),
    updatedDt:  new FormControl(''),
    active: new FormControl(true),
    itemSupplierList: new FormControl([])
  });

  this.itemApprovedSupplierFormGroup = new FormGroup({
    itemApprovedSuppId:  new FormControl(0),
    itemLocId:  new FormControl(0),
    supplierId:  new FormControl(0),
    supplierSiteId:  new FormControl(0),
    supplierName:  new FormControl(null, [ Validators.required]),
    supplierSiteName:  new FormControl(null, [ Validators.required]),
    suppItemCd:  new FormControl(null),
    moq:  new FormControl(0),
    leadTimeDays:  new FormControl(0),
    createdBy:  new FormControl(''),
    createdDt:  new FormControl(''),
    updatedBy:  new FormControl(''),
    updatedDt:  new FormControl(''),
    active: new FormControl(true),
    itemPurchasePriceList: new FormControl([]),
    suppSiteCurCd: new FormControl('')
  });

  this.itemMasterFormGroup.controls.itemMasterDesc.disable();
  this.itemMasterFormGroup.controls.itemTypeName.disable();
  this.itemMasterFormGroup.controls.masterUOMName.disable();
  this.itemMasterFormGroup.controls.stockable.disable();
  this.itemMasterFormGroup.controls.purchasable.disable();
  this.itemApprovedSupplierFormGroup.controls.supplierSiteName.disable();
  this.itemMasterFormGroup.controls.itemCategoryName.disable();

  this.validateEditMode();
}

validateEditMode() {
  this.activatedRoute.params.subscribe(
    params => {
      var primaryId = params.pId;
      this.currentItemId = Number(primaryId);
      this.transactionSource = allWorkflowStatus[allWorkflowStatus.ITEM_APPROVAL];   
      var mode = params.mode;
      this.mode = mode;
      if(primaryId === '0') {
        primaryId = Number(primaryId);
        this.buttonDisplay = 'Submit';
        this.headingDisplay = 'Create';
        this.workFlowDisable = true;
      } else {
        this.fetchItembyId(primaryId,mode);
        if(mode === 'edit') {
          this.buttonDisplay = 'Update';
          this.headingDisplay = 'Edit';
          this.disableClearButton = true;
          this.enableSubmitBtn = false;
        } else {
          this.buttonDisplay = 'Update';
          this.headingDisplay = 'View';
          this.modeDisplay = true;
          this.itemFormGroup.disable();
        }
      }
    }
  );
  this.disableItemName();
}

disableItemName(){
  if(this.itemFormGroup.controls.locationName.value == null){
    this.itemMasterFormGroup.controls.itemMasterName.disable();
  }else{
    this.itemMasterFormGroup.controls.itemMasterName.enable();
  }
}

fetchItembyId(primaryId,mode){
  this.subLoaderItemSupplier = true;
  this.commonService.commonGetService(this.assetOptimaServices.loadItemInfo, primaryId,'ITEM CREATE').subscribe(
    data => {
      if (data.success) {
        this.subLoaderItemSupplier = false;
        this.itemFormGroup.patchValue(data.responseData);
        
        this.itemSupplierListDataSource.data = data.responseData.itemSupplierList;
        this.itemMasterFormGroup.controls.itemTypeName.setValue(data.responseData.itemMasterTO.itemTypeTO.itemTypeName);
        if( this.itemFormGroup.controls.itemStatus.value === 'MATCHED' && mode === 'edit'){
          this.itemFormGroup.disable();
          this.itemFormGroup.controls.active.enable();
        }

        if (this.itemFormGroup.controls.costingType.value === "") {
          this.itemFormGroup.controls.costingType.setValue(null);
        }
        if (this.itemFormGroup.controls.storeName.value === "") {
          this.itemFormGroup.controls.storeName.setValue(null);
        }

        this.getWorkflowApprovalForItem();
      }else{
        this.subLoaderItemSupplier = false;
      }
    }
  );
}
 
backToPreviousPage() {
  this.locationRef.back();
}

saveOrUpdateItem(){
  this.itemFormGroup.controls.itemSupplierList.setValue(this.itemSupplierListDataSource.data)  
  this.uploadItemFlag = true;  
  this.commonService.commonInsertService(this.assetOptimaServices.saveOrUpdateItem, this.itemFormGroup.getRawValue())
  .subscribe(
    data => {
      if(data.success) {
        this.uploadItemFlag = false;
        this.commonService.openToastSuccessMessage(data.message);
        this.backToPreviousPage();
      } else {
        this.uploadItemFlag = false;
        this.commonService.openToastErrorMessage(data.message);
      }
    }
  );
}

checkForItemNameExistence(){
    let constraintData: UniqueValidationModel = new UniqueValidationModel();
    constraintData.className = "com.sams.to.master.ItemTO";
    constraintData.constraints = {
    'itemMasterId': this.itemMasterFormGroup.controls.itemMasterId.value,
    'orgId':this.userSession.getUserOrgId(),
    'locationId':this.itemFormGroup.controls.locationId.value
    };
    this.commonService.checkUniqueValidation(constraintData).subscribe(
    data => {
      if(!data.success){
        this.ErrorMsg = data.message;
        this.itemMasterFormGroup.controls.itemMasterName.setErrors({"notUnique": true});
      }else{
        this.ErrorMsg = '';
        this.itemMasterFormGroup.controls.itemMasterName.setErrors(null);
      }
    }
  );
}

clear() {
  this.itemMasterFormGroup.reset();
  this.ngOnInit();
}

selectedLocationData(event) {
  if (event === undefined) {
    this.itemFormGroup.get('locationId').setValue(0);
    this.locationCombo = [];
    this.locationPageNumber = 1;
    this.selectedItemName(event);
  } else {
    this.itemFormGroup.get('locationId').setValue(event.locationId);
    this.itemFormGroup.get('locationName').setValue(event.locationName);
    this.checkForItemNameExistence();
    if (this.itemFormGroup.controls.itemMasterId.value === 0) {
      this.enableSubmitBtn = true;      
    }
  }
  this.disableItemName();
}

loadLocationComboData(searchValue) {
  this.scrollsyncLocation = true;
  this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
  this.commonService.getComboResults(this.assetOptimaServices.listAllUserLocForCombo, searchValue.term, '', '',
    this.recordsPerPageForCombo, this.locationPageNumber).subscribe(
      (data) => {

        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.locationPageNumber , this.locationCombo , data.responseData.comboList)
        this.locationPageNumber = this.getData.pageNumber;
        this.locationCombo = this.getData.dataList;
        this.scrollsyncLocation = false;
      }
    );
}

listOfItemMaster(searchTerms) {
  this.scrollItemNameSync = true;
  this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
  //this.recordsPerPageForCombo = (searchTerms.term === '' || searchTerms.term === undefined || searchTerms.term === null) ? '10' : '';
  this.commonService.getComboResults(this.assetOptimaServices.listAllItemMasterCombo, searchTerms.term, '', '', this.recordsPerPageForCombo, this.itemPageNumber).subscribe(
    (data) => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchTerms, this.itemPageNumber , this.itemCombo , data.responseData.comboList)
      this.itemPageNumber = this.getData.pageNumber;
      this.itemCombo = this.getData.dataList;
      this.scrollItemNameSync = false;        
    }
  );
}

selectedItemName(event) {    
  if (event === undefined) {
    this.itemMasterFormGroup.controls.itemMasterName.setValue(null);
    this.itemMasterFormGroup.controls.itemMasterDesc.setValue(null);
    this.itemMasterFormGroup.controls.itemMasterId.setValue(0);
    this.itemMasterFormGroup.controls.masterUOMName.setValue(null);
    this.itemMasterFormGroup.controls.masterUOMId.setValue(0);
    this.itemMasterFormGroup.controls.itemTypeName.setValue(null);
    this.itemMasterFormGroup.controls.itemTypeId.setValue(0);
    this.itemMasterFormGroup.controls.stockable.setValue(false);
    this.itemMasterFormGroup.controls.purchasable.setValue(false);
    this.itemMasterFormGroup.controls.active.setValue(false);
    this.itemFormGroup.controls.itemMasterId.setValue(0);
    this.itemMasterFormGroup.controls.itemCategoryName.setValue(null);
    this.itemPageNumber = 1;
    this.itemCombo = [];
  } else {
    this.itemMasterFormGroup.patchValue(event);
    this.itemFormGroup.controls.itemMasterId.setValue(event.itemMasterId);
    this.itemMasterFormGroup.controls.itemCategoryName.setValue(event.itemCategoryName);
    this.checkForItemNameExistence();
    this.enableSubmitBtn = false;
  }
}

listOfStore(searchTerms){
  this.scrollStoreNamesync = true;  
  this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
  this.commonService.getComboResults('listOfAllStoreCombo.sams', searchTerms.term, '', '', this.recordsPerPageForCombo, this.storePageNumber).subscribe(
    (data) => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchTerms, this.storePageNumber , this.storeList , data.responseData.comboList)
      this.storePageNumber = this.getData.pageNumber;
      this.storeList = this.getData.dataList;
      this.scrollStoreNamesync = false;
    }
  );
}

getStoreValue(event) {
  if (event === undefined) {
    this.itemFormGroup.get('storeName').setValue(null);
    this.itemFormGroup.get('storeId').setValue(0);
    this.storeList = [];
    this.storePageNumber = 1;
  } else {
    this.itemFormGroup.get('storeName').setValue(event.storeName);
    this.itemFormGroup.get('storeId').setValue(event.storeId);
  }
}

selectedCostingType(event) {
  if (event === undefined) {
    this.itemFormGroup.controls.costingType.setValue(null);
  } else {
    this.itemFormGroup.controls.costingType.setValue(event.name);
  }
}

getWorkflowApprovalForItem() {     
  this.commonService.commonGetService('getWorkflowForId.sams', this.itemFormGroup.controls.itemLocId.value,
    this.userSession.getUserEmpId(),
    allWorkflowStatus[allWorkflowStatus.ITEM_APPROVAL], this.userSession.getUserOrgId()).subscribe(
      data => {
        if (data.success) {    
          this.employeeId = this.userSession.getUserEmpId();
          this.itemApproveButtonEnable = data.responseData.approvalFlag; 
          this.approvalId = data.responseData.workflowApprovalId;
        } else {
          this.commonService.openToastWarningMessage(data.message);
        }
      }, error => {
      }
    );
}

itemWorkflowApproval(status){
  let result;
  let selectedItemList = [];
  selectedItemList.push({...this.itemFormGroup.value,approvalId: this.approvalId});
  if(status){
    result = this.commonService.commonWorkflowService(allWorkflowStatus[allWorkflowStatus.ITEM_APPROVAL], selectedItemList,"");
  }
  else{
    result = this.commonService.rejectApprove(allWorkflowStatus[allWorkflowStatus.ITEM_APPROVAL],selectedItemList,"");
  }
  result.then(data=>{
    if(data){
       this.ngOnInit();
    }
  })
}

listOfSupplier(searchTerms) {
  this.scrollSupplierNamesync = true;
  this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
  let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.SUPPLIER];
  this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo,searchTerms.term,'','',this.limitCount,this.supplierPageNumber,'',partnerRoles).subscribe(
    (data) => {
      if (data.success) {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.supplierPageNumber , this.supplierList , data.responseData.comboList)
        this.supplierPageNumber = this.getData.pageNumber;
        this.supplierList = this.getData.dataList;
      }
      this.scrollSupplierNamesync = false;
    });
}

fetchIdOfSupplier(event) {  
  if (event === undefined) {
    this.resetItemApprovedSupplierFormGroup();
    this.supplierPageNumber = 1;
    this.supplierList =[];
    this.supplierSiteList = [];
    this.supplierSitePageNumber = 1;
  } else {
    this.itemApprovedSupplierFormGroup.controls.supplierId.setValue(event.businessPartnerId);
    this.itemApprovedSupplierFormGroup.controls.supplierName.setValue(event.businessPartnerName);
    // this.fetchIdOfSupplierSite(event.supplierLocList[0]);
    this.itemApprovedSupplierFormGroup.controls.supplierSiteName.enable();
  }
}

listOfSupplierSiteName(searchValue) {
  this.scrollSupplierSiteSync = true;
  const supplierId =  this.itemApprovedSupplierFormGroup.controls.supplierId.value
  this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
  this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerSiteCombo, searchValue.term, supplierId, '', this.limitCount, this.supplierSitePageNumber, '').subscribe(
    (data) => {
      if (data.success) {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.supplierSitePageNumber , this.supplierSiteList , data.responseData.comboList)
        this.supplierSitePageNumber = this.getData.pageNumber;
        this.supplierSiteList = this.getData.dataList;
      }
      this.scrollSupplierSiteSync = false;
    });
}

fetchIdOfSupplierSite(event) {  
  if (event === undefined) {
    this.itemApprovedSupplierFormGroup.get('supplierSiteId').setValue(0);
    this.itemApprovedSupplierFormGroup.controls['supplierSiteName'].setValue(null);
    this.itemApprovedSupplierFormGroup.controls.suppSiteCurCd.setValue(null);
    this.supplierSitePageNumber = 1;   
    this.supplierSiteList =[];
  } else {
    this.itemApprovedSupplierFormGroup.controls.supplierSiteId.setValue(event.partnerSiteId);
    this.itemApprovedSupplierFormGroup.controls.supplierSiteName.setValue(event.partnerSiteName);
    this.itemApprovedSupplierFormGroup.controls.suppSiteCurCd.setValue(event.suppLocCurCd);
    this.itemSupplierSiteValidation(this.itemApprovedSupplierFormGroup.value);   
  }
}

itemSupplierSiteValidation(element){ 
  this.itemSupplierSiteIdValid = this.itemSupplierListDataSource.data.findIndex(data => data.supplierSiteId === element.supplierSiteId) === -1;

  if(!this.itemSupplierSiteIdValid){
    this.commonService.openToastWarningMessage("Item Supplier Site Is Already Added.");
    this.resetItemApprovedSupplierFormGroup();
  } 
}

addApprovedSupplier(element,action,index){  
  this.itemSupplierSiteValidation(this.itemApprovedSupplierFormGroup.getRawValue()); 
  
  if (this.itemSupplierSiteIdValid) {
    if(action === 'Add'){
      element.suppItemCd = this.itemMasterFormGroup.controls.itemMasterName.value;
    }
    let dialogRef = this.dialog.open(ItemApprovedSupplierComponent, {
      height: '600px',
      width: '1300px',
      data: {
        'itemAppSuppTO': element,
        'action': action
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if(data){                
          if(index===null){
            this.itemSupplierListDataSource.data = this.itemSupplierListDataSource.data.concat([data]);
            this.resetItemApprovedSupplierFormGroup();
            this.commonService.openToastSuccessMessage('Record Added Successfully.');
          }else if (index !== null && index !== undefined && index !== ''){
            this.itemSupplierListDataSource.data.splice(index, 1);
            this.itemSupplierListDataSource.data = this.itemSupplierListDataSource.data.concat([data]);
            this.commonService.openToastSuccessMessage('Record Updated Successfully.');
          }                
        }
      });
  }
}

resetItemApprovedSupplierFormGroup(){
  this.itemApprovedSupplierFormGroup.controls.supplierId.setValue(0);    
  this.itemApprovedSupplierFormGroup.controls.supplierName.setValue(null);
  this.itemApprovedSupplierFormGroup.controls.supplierSiteId.setValue(0);
  this.itemApprovedSupplierFormGroup.controls.supplierSiteName.setValue(null);
  this.itemApprovedSupplierFormGroup.controls.suppSiteCurCd.setValue(null);     
  this.itemApprovedSupplierFormGroup.controls.supplierSiteName.disable();
}

validateMinStockQty(){
  if(parseFloat(this.itemFormGroup.get('minStockQty').value) > parseFloat(this.itemFormGroup.get('maxStockQty').value)){    
    this.commonService.openToastWarningMessage('Item Min Stock Qty Should Not Be Greater Than Item Max Stock Qty.');
  }
}
 
}
