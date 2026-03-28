import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { StockEnquiryModel } from 'src/app/Model/inventory/stockEnquiry';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { StockenquiryDtlComponent } from '../stockenquiry-dtl/stockenquiry-dtl.component';
import { getData } from 'src/app/Model/common/fetchListData';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { UserPrefernce } from 'src/app/Services/user-preference/user-preference';

@Component({
  selector: 'app-stockenquiry-list',
  templateUrl: './stockenquiry-list.component.html',
  styleUrls: ['./stockenquiry-list.component.css']
})
export class StockenquiryListComponent implements OnInit {
  
  defaultColumns = ['sno', 'locationName', 'itemName', 'itemDesc', 'itemTypeName', 'manufacturerPartNo', 'uomCd', 'storeName', 'onHandQty'];
  displayedColumns = [...this.defaultColumns];
  
  //dataSource = ELEMENT_DATA;
  stockEnquiryMainDataSource = new MatTableDataSource<StockenquiryListComponent>();

  //FOR VIEW
  viewData: any;

  subLoaderStockEnquirtMain: boolean = false;
  scrollItemCategorysync: boolean = false;
  scrollItemTypesync: boolean = false;
  scrollStoreNamesync: boolean = false;
  scrollItemNamesync: boolean = false;
  scrollOemCode: boolean = false;
  scrollDoNo: boolean = false;
  limitCount: any;

  itemTypePageNumber: number;
  storePageNumber: number;
  itemPageNumber: number;
  oemCodePageNumber: number;
  itemType: any = [];
  storeList: any = [];
  itemList: any = [];
  oemList: any = [];


  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  locationCombo: any = [];
  locationNamePageNumber: number;
  scrollLocationNamesync: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public stockEnquiryModel: StockEnquiryModel;
  searchvalue: any = '';
  getData: getData;

  selectedItem: any = 0;

    //USER PREFERENCE
  public userPreference: UserPrefernce;
  showManageColumns: boolean = false;

  constructor(public router: Router,
    private assetOptimaServices: AssetOptimaServices,
    private userSessionService: UserSessionService,
    private dialog: MatDialog,
    private commonService: CommonService,
    private samsService: AssetOptimaServices,) {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.stockEnquiryModel = new StockEnquiryModel();
    this.itemTypePageNumber = 1;
    this.itemPageNumber = 1;
    this.storePageNumber = 1;
    this.oemCodePageNumber = 1;
    this.locationNamePageNumber = 1;

    this.showManageColumns = false;
    this.userPreference = new UserPrefernce();
  }

  ngOnInit() {
    // document.getElementById('commonFooter').style.display='block';
    this.itemTypePageNumber = 1;
    this.itemPageNumber = 1;
    this.storePageNumber = 1;
    this.oemCodePageNumber = 1;
    this.stockEnquiryModel.locationId = this.userSessionService.getUserLocationId();
    this.stockEnquiryModel.locationName = this.userSessionService.getUserLocationName();
    console.log("test location name",this.userSessionService.getUserLocationName());
    this.listofLocationName(this.userSessionService.getUserLocationName());
    // this.fetchListofStockEnquiry();


    this.stockEnquiryModel.direction = 'desc';
    this.stockEnquiryModel.columnName = 'updatedDt';

    this.userPreference.moduleKey = 'GROUPACCESS_ASSET_RETIREMENT';
    // this.getUserPreferenceInfo();

    let userPreferenceData = this.getUserPreferenceInfo();
    userPreferenceData.then((response) => {
      this.fetchListofStockEnquiry();
    })

  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  createStock(stockId) {
    this.router.navigate(['/stockCreate/' + stockId]);
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchListofStockEnquiry();
  }

  onSearchChange(searchValue: string) {
    this.stockEnquiryModel.itemCd = searchValue;
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchListofStockEnquiry();
  }

  customSort(event) {
    this.stockEnquiryModel.pageNumber = 0;
    this.stockEnquiryModel.columnName = event.active;
    this.stockEnquiryModel.direction = event.direction;
    this.fetchListofStockEnquiry();
  }

  fetchListofStockEnquiry() {
    this.subLoaderStockEnquirtMain = true;
    this.stockEnquiryModel.pageNumber = Number(this.pageIndex);
    this.stockEnquiryModel.recordsPerPage = Number(this.pageSize);
    this.commonService.commonListService(this.assetOptimaServices.listOfStockEnquiry, this.stockEnquiryModel).subscribe(
      data => {
        if (data.success) {
          this.length = data.responseData.dataTotalRecCount;
          this.stockEnquiryMainDataSource = data.responseData.dataList;
        }
      }
    );
    this.subLoaderStockEnquirtMain = false;
  }


  openStockEnquiryDtl(value, value1): void {
    let initialData = value;
    // let viewData={
    //   value:value
    // }

    let dialogRef = this.dialog.open(StockenquiryDtlComponent, {
      height: '600px',
      width: '2750px',
      data: { 'itemId': value, 'storeName': value1 }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        this.fetchListofStockEnquiry();
      });
  }

  viewItemRegisterDtl(itemId) {
    this.router.navigate(['/itemRegisterView/' + itemId]);
  }

  listofItemType(searchTerms) {
    this.scrollItemTypesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllItemTypeCombo, searchTerms.term, '', '', this.limitCount, this.itemTypePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.itemTypePageNumber, this.itemType, data.responseData.comboList)
        this.itemTypePageNumber = this.getData.pageNumber;
        this.itemType = this.getData.dataList;
        this.scrollItemTypesync = false;
      }
    );
  }


  getItemTypeComboValue(event) {

    this.itemList = [];
    this.itemPageNumber = 1;

    this.stockEnquiryModel.itemId = 0;
    this.stockEnquiryModel.itemCd = "";

    if (event === undefined) {
      this.stockEnquiryModel.itemId = 0;
      this.stockEnquiryModel.itemCd = "";
      this.stockEnquiryModel.itemTypeId = event.itemTypeId = 0;
      this.stockEnquiryModel.itemTypeName = '';
      this.itemTypePageNumber = 1;
    } else {
      this.stockEnquiryModel.itemTypeName = event.itemTypeName;
      this.stockEnquiryModel.itemTypeId = event.itemTypeId;
      this.stockEnquiryModel.itemCd = "";
      this.stockEnquiryModel.itemId = 0;
      this.itemList = [];
    }
  }

  listOfStore(searchTerms) {
    this.storeList = [];
    this.scrollStoreNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults('listOfAllStoreCombo.sams', searchTerms.term, this.stockEnquiryModel.locationId, '', this.limitCount, this.storePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.storePageNumber, this.storeList, data.responseData.comboList)
        this.storePageNumber = this.getData.pageNumber;
        this.storeList = this.getData.dataList;
        this.scrollStoreNamesync = false;
      }
    );
  }

  getStoreValue(event) {
    this.itemList = [];
    this.itemPageNumber = 1;
    this.stockEnquiryModel.storeId = 0;
    this.stockEnquiryModel.storeName = "";


    this.stockEnquiryModel.itemId = 0;
    this.stockEnquiryModel.itemCd = "";

    if (event === undefined) {
      this.stockEnquiryModel.storeName = "";
      this.storePageNumber = 1;
    } else {
      this.stockEnquiryModel.storeName = event.storeName;
      this.stockEnquiryModel.storeId = event.storeId;
    }
  }

  clear() {
    this.stockEnquiryModel = new StockEnquiryModel;
    this.ngOnInit();
    this.selectedItem = 0;
  }

  searchStock() {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchListofStockEnquiry();
    this.selectedItem = 0;
  }


  listOfItemFromInventory1(data) {
    if (this.itemPageNumber === 1) {
      this.itemList = data.responseData.comboList;
    } else {
      this.itemList = this.itemList.concat(data.responseData.comboList);
    }
  }

  listOfItemFromInventory(searchTerms): boolean {
    this.scrollItemNamesync = true;
    const storeId = this.stockEnquiryModel.storeId
    const itemTypeId = this.stockEnquiryModel.itemTypeId;
    const itemTypeName = this.stockEnquiryModel.itemTypeName;

    if (!(storeId > 0)) {
      this.commonService.openToastWarningMessage("Kindly select store");
      this.scrollItemNamesync = false;
      return true;
    }
    else if(!(itemTypeId > 0)){
      this.commonService.openToastWarningMessage("Kindly select Part Group");
      this.scrollItemNamesync = false;
      return true;
    }

    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults('listAllItemComboFromInventory.sams', searchTerms.term, storeId, itemTypeId, this.limitCount, this.itemPageNumber,itemTypeName).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.itemPageNumber, this.itemList, data.responseData.comboList)
        this.itemPageNumber = this.getData.pageNumber;
        this.itemList = this.getData.dataList;
        this.scrollItemNamesync = false;
      }
    );
    return true;
  }


  getItemValue(event) {

    this.stockEnquiryModel.itemId = 0;
    this.stockEnquiryModel.itemCd = "";

    if (event === undefined) {
      // this.stockEnquiryModel.makerPartCode='';
      // this.stockEnquiryModel.storeName='';
      // this.stockEnquiryModel.itemType='';
      // this.stockEnquiryModel.itemGroup='';
      this.itemPageNumber = 1;
    } else {
      this.stockEnquiryModel.itemId = event.itemId;
    }

  }

  //To export report
  generateReport() {
    this.stockEnquiryModel.recordsPerPage = 0;
    this.commonService.commonListService('reports/assets/generateStockEnquiryReport.sams', this.stockEnquiryModel).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      }, error => {
        // alert('error');
      }
    );
  }

  listOfAllOemCodes(searchTerms) {
    this.scrollOemCode = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults('listAllManufacturerPartNoCombo.sams', searchTerms.term, '', '', this.limitCount, this.oemCodePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.oemCodePageNumber, this.oemList, data.responseData.comboList)
        this.oemCodePageNumber = this.getData.pageNumber;
        this.oemList = this.getData.dataList;
        this.scrollOemCode = false;
      }
    );
  }

  getOemCode(event) {
    if (event === undefined) {
      this.stockEnquiryModel.manufacturerPartNo = '';
      this.oemCodePageNumber = 1;
    } else {
      this.stockEnquiryModel.manufacturerPartNo = event.itemManufacturerPartno;
    }
  }

  selectStockEnquiry(element) {
    if (this.selectedItem.itemId == element.itemId && this.selectedItem.storeName == element.storeName) {
      this.selectedItem = 0;
    } else {
      this.selectedItem = element;
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
      this.stockEnquiryModel.locationId = 0;
      this.stockEnquiryModel.locationName = '';
      this.locationNamePageNumber = 1;
    } else {
      this.storePageNumber = 1;
      this.stockEnquiryModel.locationId = event.locationId;
      this.stockEnquiryModel.locationName = event.locationName;
    }
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
      this.commonService.commonInsertService(this.samsService.fetchUserPreferenceInfo, this.userPreference).subscribe(
        data => {
          if(data.responseData !== undefined) {
            this.userPreference = data.responseData;
            if(this.userPreference.customColumnsList.length>0) {
              this.displayedColumns = this.userPreference.customColumnsList;
            }
            this.stockEnquiryModel = JSON.parse(this.userPreference.customFilters);
          }
          resolve(true);
        }
      )
    });
    return userPreferenceInfo;
    
  }
  
  applyPreferredFilters() {
    //SAVE TO USER PREFERENCE TABLE
    this.userPreference.customFilters = JSON.stringify(this.stockEnquiryModel);
    this.commonService.commonInsertService(this.samsService.saveOrUpdateUserPreference, this.userPreference).subscribe(
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
