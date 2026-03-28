import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { getData } from 'src/app/Model/common/fetchListData';
import { ItemTransactionModel } from 'src/app/Model/inventory/itemTransaction';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserPrefernce } from 'src/app/Services/user-preference/user-preference';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-item-register-list',
  templateUrl: './item-register-list.component.html',
  styleUrls: ['./item-register-list.component.css']
})
export class ItemRegisterListComponent implements OnInit {
  defaultColumns = ['sno','locationName','itemTypeName','itemName','itemDescription','transactionSourceName','transactionReference','transactionType', 'transactionDtDisp','transactionQty','storeName','createdBy'];
  displayedColumns = [...this.defaultColumns];
  
  itemTransactionDataSource = [];;

  
  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page
  subLoaderItemTransaction:boolean = false;

  itemPageNumber: number;
  storePageNumber: number;
  itemDescPageNumber: number;
  locationNamePageNumber: number;
  closingQty : Number;
  openingQty : Number;

  itemList = [];
  storeList = [];
  itemDescList = [];
  locationCombo: any = [];

  scrollItemNamesync: boolean = false;
  scrollStoreNamesync: boolean = false;
  scrollItemDescsync: boolean = false;
  scrollLocationNamesync: boolean = false;
  
  limitCount: any;

  modelAccessModule: ModuleAccessModel;
  getData: getData;

  title = 'Asset Optima - ITEM TRANSACTIONS';
  public itemTransactionModel: ItemTransactionModel;

  selectAllItemTransaction: boolean = false;
  enableActionBtn: boolean=true;
  selectedItemTransactionList=[];

  itemTransactionForm: FormGroup;

  itemTypePageNumber: number;
  scrollItemTypeNamesync: boolean = false;
  itemTypeList: any = [];

  //USER PREFERENCE
  public userPreference: UserPrefernce;
  showManageColumns: boolean = false;
  
  constructor(private router: Router,
              private commonService: CommonService,
              public assetOptimaServices: AssetOptimaServices,
              private titleService: Title,
              private readonly dialog: MatDialog,
              private userSession: UserSessionService,
              private readonly userSessionService: UserSessionService,) { 
                this.pageSize = '100';
                this.pageIndex = '0';
                this.itemTypePageNumber = 1;
                this.itemPageNumber = 1;
                this.storePageNumber = 1;
                this.itemDescPageNumber = 1;
                this.locationNamePageNumber = 1;
                this.closingQty = 0;
                this.openingQty = 0;
                this.itemTransactionModel = new ItemTransactionModel();
                this.modelAccessModule = new ModuleAccessModel();
                this.getData = new getData();

                this.showManageColumns = false;
                this.userPreference = new UserPrefernce();
              }

  ngOnInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_ITEM_TRANSACTIONS'];
    this.titleService.setTitle(this.title);

    this.itemPageNumber = 1;
    this.storePageNumber = 1;
    this.itemDescPageNumber = 1;
    this.locationNamePageNumber = 1;
    this.closingQty = 0;
    this.openingQty = 0;
    this.itemTransactionForm = new FormGroup({
      transactionId : new FormControl(0),
      transactionDate : new FormControl(''),
      locationId : new FormControl(this.userSessionService.getUserLocationId(),[Validators.required]),
      locationName : new FormControl(this.userSessionService.getUserLocationName(),[Validators.required]),
      itemTypeId : new FormControl(0,[Validators.required]),
      itemTypeName : new FormControl('',[Validators.required]),
      itemId : new FormControl(0,[Validators.required]),
      itemName : new FormControl('',[Validators.required]),
      itemDesc : new FormControl('',[Validators.required]),
      storeId : new FormControl(0),
      storeName : new FormControl(''),
      transFromDtDisp : new FormControl(''),
      transToDtDisp : new FormControl(this.commonService.getCurrentDateYYYYMMDD())
    });
    // this.fetchListItemTransaction();
    this.itemTransactionModel.direction = 'asc';
    this.itemTransactionModel.columnName = 'transactionDate';

    this.userPreference.moduleKey = 'GROUPACCESS_ITEM_TRANSACTIONS';
    // this.getUserPreferenceInfo();

    let userPreferenceData = this.getUserPreferenceInfo();
    userPreferenceData.then((response) => {
      this.fetchListItemTransaction();
    })
  }

  searchItemTransaction() {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchListItemTransaction();
    this.selectedItemTransactionList = [];
  }

  clear(){
    this.itemTransactionModel = new ItemTransactionModel;
    this.itemTransactionDataSource = [];
    this.pageSize = '100';
    this.pageIndex = '0';
    this.length = '0;'
    this.ngOnInit();
  }
  

  fetchListItemTransaction(){

    if(this.itemTransactionForm.controls['itemId'].value > 0) {

      if(this.itemTransactionForm.controls['transFromDtDisp'].value != null || this.itemTransactionForm.controls['transFromDtDisp'].value == undefined) {
        this.itemTransactionForm.controls['transFromDtDisp'].setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.itemTransactionForm.controls['transFromDtDisp'].value));
      }
      this.itemTransactionForm.controls['transToDtDisp'].setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.itemTransactionForm.controls['transToDtDisp'].value));

      this.itemTransactionModel.itemId = this.itemTransactionForm.controls['itemId'].value;
      this.itemTransactionModel.storeId = this.itemTransactionForm.controls['storeId'].value;
      this.itemTransactionModel.locationId = this.itemTransactionForm.controls['locationId'].value;
      this.itemTransactionModel.transFromDtDisp = this.itemTransactionForm.controls['transFromDtDisp'].value;
      this.itemTransactionModel.transToDtDisp = this.itemTransactionForm.controls['transToDtDisp'].value;

      this.subLoaderItemTransaction = true;
      this.itemTransactionModel.pageNumber = Number(this.pageIndex);
      this.itemTransactionModel.recordsPerPage = Number(this.pageSize);
      this.commonService.commonListService(this.assetOptimaServices.listOfItemTransaction,this.itemTransactionModel).subscribe(
        data => {
          if(data.success){
            this.length = data.responseData.dataTotalRecCount;
            this.itemTransactionDataSource = data.responseData.dataList;
            this.closingQty = data.responseData.CLOSING_QTY;
            this.openingQty = data.responseData.OPENING_QTY;
          }
        }
      );
      this.subLoaderItemTransaction = false;
    }
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchListItemTransaction();
  }
  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  customSort(event) {
    this.itemTransactionModel.pageNumber = 0;
    this.itemTransactionModel.columnName = event.active;
    this.itemTransactionModel.direction = event.direction;
    this.fetchListItemTransaction();
  }

  

  selectAllItemTransactionLists(event){
    this.selectAllItemTransaction = event.checked;
      this.enableActionBtn = false;
  
      if(event.checked){
        this.selectedItemTransactionList = this.itemTransactionDataSource;
      }
      else{
        this.selectedItemTransactionList = [];
      }
  
      if(this.selectedItemTransactionList.length === 1){
        this.enableActionBtn = false;
      }
      else{
        this.enableActionBtn = true;
      }
  }

  selectItemTransaction(element){
    const indentId = this.selectedItemTransactionList.findIndex(data => data.transactionId === element.transactionId);
      
    this.enableActionBtn = false;
    if(indentId === -1){
      this.selectedItemTransactionList.push(element);  
    }else{ 
      this.selectedItemTransactionList.splice(indentId,1);   
    }

    if(this.selectedItemTransactionList.length === 1){
      this.enableActionBtn = false;
    }
    else{
      this.enableActionBtn = true;
    }
  }

  compareValue(element: any): boolean{
    return this.selectedItemTransactionList.findIndex(data => data.transactionId === element.transactionId) !== -1;
  }

  

  listOfItemFromMaster(searchTerms) {
    this.scrollItemNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    let itemTypeId = this.itemTransactionForm.controls['itemTypeId'].value;
    this.commonService.getComboResults(this.assetOptimaServices.listAllItemCombo, searchTerms.term, '', itemTypeId, this.limitCount, this.itemPageNumber, '').subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.itemPageNumber, this.itemList, data.responseData.comboList)
        this.itemPageNumber = this.getData.pageNumber;
        this.itemList = this.getData.dataList;
        this.scrollItemNamesync = false;
      }
    );
  }

  getItemValueFromMaster(event) {
    if (event === undefined) {
      this.itemTransactionForm.controls['itemId'].setValue(0);
      this.itemTransactionForm.controls['itemName'].setValue('');
      this.itemTransactionForm.controls['itemDesc'].setValue('');

      this.itemPageNumber = 1;
    } else {
      this.itemTransactionForm.controls['itemId'].setValue(event.itemMasterId);
      this.itemTransactionForm.controls['itemName'].setValue(event.itemMasterName);
      this.itemTransactionForm.controls['itemDesc'].setValue(event.itemMasterDesc);
      this.itemTransactionForm.controls['itemTypeId'].setValue(event.itemTypeId);
      this.itemTransactionForm.controls['itemTypeName'].setValue(event.itemTypeName);
    }
  }

  listOfItemDescFromMaster(searchTerms) {
    this.scrollItemDescsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    let itemTypeId = this.itemTransactionForm.controls['itemTypeId'].value;
    this.commonService.getComboResults('listOfItemDescCombo.sams', searchTerms.term, '', itemTypeId, this.limitCount, this.itemDescPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.itemDescPageNumber, this.itemDescList, data.responseData.comboList)
        this.itemDescPageNumber = this.getData.pageNumber;
        this.itemDescList = this.getData.dataList;
        this.scrollItemDescsync = false;
      }
    );
  }

  getItemDescValueFromMaster(event) {
    if (event === undefined) {
      this.itemTransactionForm.controls['itemId'].setValue(0);
      this.itemTransactionForm.controls['itemName'].setValue('');
      this.itemTransactionForm.controls['itemDesc'].setValue('');

      this.itemDescPageNumber = 1;
    } else {
      this.itemTransactionForm.controls['itemId'].setValue(event.itemMasterId);
      this.itemTransactionForm.controls['itemName'].setValue(event.itemMasterName);
      this.itemTransactionForm.controls['itemDesc'].setValue(event.itemMasterDesc);
      this.itemTransactionForm.controls['itemTypeId'].setValue(event.itemTypeId);
      this.itemTransactionForm.controls['itemTypeName'].setValue(event.itemTypeName);
    }
  }

  listOfStore(searchTerms) {
    this.scrollStoreNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults('listOfAllStoreCombo.sams', searchTerms.term, '', '', this.limitCount, this.storePageNumber).subscribe(
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
      this.itemTransactionForm.controls['storeId'].setValue(0);
      this.itemTransactionForm.controls['storeName'].setValue('');
      this.storePageNumber = 1;
    } else {
      this.itemTransactionForm.controls['storeId'].setValue(event.storeId);
      this.itemTransactionForm.controls['storeName'].setValue(event.storeName);
    }
  }

  listofLocationName(searchValue) {
    this.scrollLocationNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllUserLocForCombo, searchValue.term, '', '', this.limitCount, this.locationNamePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.locationNamePageNumber, this.locationCombo, data.responseData.comboList)
        this.locationNamePageNumber = this.getData.pageNumber;
        this.locationCombo = this.getData.dataList;
        this.scrollLocationNamesync = false;
      }
    );
  }

  setLocationNameComboValue(event) {
    if (event === undefined) {
      this.itemTransactionForm.controls['locationId'].setValue(0);
      this.itemTransactionForm.controls['locationName'].setValue('');
      this.locationNamePageNumber = 1;
    } else {
      this.itemTransactionForm.controls['locationId'].setValue(event.locationId);
      this.itemTransactionForm.controls['locationName'].setValue(event.locationName);
    }
  }

  listOfItemTypeCombo(searchTerms) {
    this.scrollItemTypeNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllItemTypeCombo, searchTerms.term, '', '', this.limitCount, this.itemTypePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.itemTypePageNumber, this.itemTypeList, data.responseData.comboList)
        this.itemTypePageNumber = this.getData.pageNumber;
        this.itemTypeList = this.getData.dataList;
        this.scrollItemTypeNamesync = false;
      }
    );
  }



  getItemTypeValue(event) {
    if (event === undefined) {
      this.itemTransactionForm.controls['itemTypeId'].setValue(0);
      this.itemTransactionForm.controls['itemTypeName'].setValue('');
      this.itemTypePageNumber = 1;
    } else {
      this.itemTransactionForm.controls['itemTypeId'].setValue(event.itemTypeId);
      this.itemTransactionForm.controls['itemTypeName'].setValue(event.itemTypeName);

      this.itemTransactionForm.controls['itemId'].setValue(0);
      this.itemTransactionForm.controls['itemName'].setValue('');
      this.itemTransactionForm.controls['itemDesc'].setValue('');
      this.itemList  = [];
      this.itemDescList = [];
      this.itemPageNumber = 1;
      this.itemDescPageNumber = 1;
    }
  }

  generateReport() {
    this.itemTransactionModel.recordsPerPage = 0;
    this.commonService.commonListService('reports/assets/generateItemTransactionReport.sams', this.itemTransactionModel).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      }, error => {
        // alert('error');
      }
    );
  }

  toggleColumn(column: string): void {
    const index = this.displayedColumns.indexOf(column);
    if (index >= 0) {
      this.displayedColumns.splice(index, 1); // Column is selected, remove it
    } else {
      this.displayedColumns.push(column); // Column is not selected, add it
    }
  }
  
  editManageColumns() {
    this.showManageColumns = !this.showManageColumns;
  }
  
  applyPreferredColumns() {
    //SAVE TO USER PREFERENCE TABLE
    this.showManageColumns = !this.showManageColumns
    this.userPreference.customColumns = JSON.stringify(this.displayedColumns);
    this.commonService.commonInsertService(this.assetOptimaServices.saveOrUpdateUserPreference, this.userPreference).subscribe(
      data => {
        if(data.success) {
          // this.commonService.openToastSuccessMessage(data.message);
          this.getUserPreferenceInfo();
        } else {
          this.commonService.openToastWarningMessage(data.message);
        }
      }
    )
    
  }
  
  resetPreferredColumns() {
    this.displayedColumns = [...this.defaultColumns];
    this.userPreference.customColumns = JSON.stringify(this.displayedColumns);
  }
  
  getUserPreferenceInfo() {
    let userPreferenceInfo = new Promise((resolve) => {
      this.commonService.commonInsertService(this.assetOptimaServices.fetchUserPreferenceInfo, this.userPreference).subscribe(
        data => {
          if(data.responseData !== undefined) {
            this.userPreference = data.responseData;
            if(this.userPreference.customColumnsList.length>0) {
              this.displayedColumns = this.userPreference.customColumnsList;
            }
            this.itemTransactionModel = JSON.parse(this.userPreference.customFilters);
          }
          resolve(true);
        }
      )
    });
    return userPreferenceInfo;
    
  }
  
  applyPreferredFilters() {
    //SAVE TO USER PREFERENCE TABLE
    this.userPreference.customFilters = JSON.stringify(this.itemTransactionModel);
    this.commonService.commonInsertService(this.assetOptimaServices.saveOrUpdateUserPreference, this.userPreference).subscribe(
      data => {
        if(data.success) {
          // this.commonService.openToastSuccessMessage(data.message);
          this.getUserPreferenceInfo()
        } else {
          this.commonService.openToastWarningMessage(data.message);
        }
      }
    )
  }

}
