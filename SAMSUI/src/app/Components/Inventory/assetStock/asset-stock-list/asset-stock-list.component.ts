import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StockTransferModel } from '../../../..//Model/inventory/stockTransfer';
import { ModuleAccessModel } from '../../../..//Model/base/moduleAccess';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../../..//Services/common-service/common.service'; 
import { Title } from '@angular/platform-browser';
import { AssetOptimaConstants } from '../../../..//Constants/AssetOptimaConstants';
import { UserSessionService } from '../../../..//Services/user-session-service/user-session.service';
import { AssetOptimaServices } from '../../../..//Constants/AssetOptimaServices';
import { getData } from 'src/app/Model/common/fetchListData';
import { ConfirmConfirmationComponent } from 'src/app/Components/Common-components/confirm-confirmation/confirm-confirmation.component';
import { allWorkflowStatus } from 'src/app/Constants/AllStatusConstants';
import * as moment from 'moment';
import { UserPrefernce } from 'src/app/Services/user-preference/user-preference';

@Component({
  selector: 'app-asset-stock-list',
  templateUrl: './asset-stock-list.component.html',
  styleUrls: ['./asset-stock-list.component.css']
})
export class AssetStockListComponent implements OnInit {

  defaultColumns = ['sno', 'select', 'locationName', 'stockTransferNo', 'fromStoreName', 'toAssetCode', 'stockTransferStatus', 'transferApprovalStatus', 'createdBy', 'createdDtDisp'];
  displayedColumns = [...this.defaultColumns];

  assetStockMainDataSource =[];
  stockTransferModel: StockTransferModel;

  //PERMISSIONS 
  modelAccessModule: ModuleAccessModel;

  locationList = [];
  locationPageNumber: number;
  scrollLocationNamesync: boolean = false;

  limitCount: any;

  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  subLoader : boolean = false;
  getData: getData;

  selectedItem:any = 0;
  enableActionBtn: boolean=true;
  selectAllAllocate: boolean = false;
  approve: any;
  employeeId: any;
  status: string;
  
  //USER PREFERENCE
  public userPreference: UserPrefernce;
  showManageColumns: boolean = false;
  
  constructor(private readonly router: Router, 
              private readonly dialog: MatDialog,
              private readonly commonService: CommonService,
              private readonly assetConstants: AssetOptimaConstants,
              private readonly userSession: UserSessionService,
              public assetOptimaServices: AssetOptimaServices,) { 
                  this.stockTransferModel = new StockTransferModel();
                  this.pageSize = '100';
                  this.pageIndex = '0';
                  this.modelAccessModule = new ModuleAccessModel();
                  this.locationPageNumber = 1;

                  this.showManageColumns = false;
                  this.userPreference = new UserPrefernce();
              }

  ngOnInit(): void {
    this.employeeId = this.userSession.getUserEmpId();
    this.selectedAllocateList = [];
    this.enableActionBtn = true;
    this.stockTransferModel.endDt = "";
    this.stockTransferModel.fromDt = ""
    this.stockTransferModel.locationName = this.assetConstants.defaultuserLocName;
    this.stockTransferModel.locationId = this.assetConstants.defaultuserLocId;

    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_STOCK_INDENT'];
    // this.stockTransferModel.direction = 'desc';
    // this.stockTransferModel.columnName = 'stockTransferNo'
    this.stockTransferModel.stockTransferType = 'STORE TO ASSET';
    this.stockTransferModel.stockTransferFor = "ASSET";
    // this.fetchListAssetStockTransfer();

    this.stockTransferModel.direction = 'desc';
    this.stockTransferModel.columnName = 'stockTransferNo';

    this.userPreference.moduleKey = 'GROUPACCESS_STOCK_INDENT';
    // this.getUserPreferenceInfo();

    let userPreferenceData = this.getUserPreferenceInfo();
    userPreferenceData.then((response) => {
      this.fetchListAssetStockTransfer();
    })

    localStorage.setItem('previousRoute',this.router.url)
  }

  createAssetStockTransfer(mode?: string) {
    if (mode !== 'add') {
      this.router.navigate(['home/inventory/assetStockCreate/'+ this.selectedAllocateList[0].stockTransferHdrId +'/'+mode]);
    }else{
      this.router.navigate(['home/inventory/assetStockCreate/'+ 0 + '/' + mode]);
    }
  }

  fetchListAssetStockTransfer() {
    this.subLoader = true;
    this.stockTransferModel.pageNumber = Number(this.pageIndex);
    this.stockTransferModel.recordsPerPage = Number(this.pageSize);
    this.stockTransferModel.stockTransferType = 'STORE TO ASSET';
    this.stockTransferModel.stockTransferFor = "ASSET";
    this.commonService.commonListService('fetchListAllStockTransfer.sams',this.stockTransferModel).subscribe(
      data => {
        if(data.success){
           this.length = data.responseData.dataTotalRecCount;
           this.assetStockMainDataSource = data.responseData.dataList;
        }
      }
    );
   this.subLoader = false;
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  getServerData(event) {    
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchListAssetStockTransfer();
  }

   
  customSort(event) {
    this.stockTransferModel.pageNumber = 0;
    this.stockTransferModel.columnName = event.active;
    this.stockTransferModel.direction = event.direction;
    this.fetchListAssetStockTransfer();
  }

  loadLocationComboData(searchValue) {
    this.scrollLocationNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllUserLocForCombo, searchValue.term, '', '',
      this.limitCount, this.locationPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.locationPageNumber , this.locationList , data.responseData.comboList)
          this.locationPageNumber = this.getData.pageNumber;
          this.locationList = this.getData.dataList;
          this.scrollLocationNamesync = false;
        }
      );
  }

  selectedLocationData(event) {
    if (event === undefined) {
      this.stockTransferModel.locationId = 0;
      this.stockTransferModel.locationName = '';
      this.locationPageNumber = 1;
    } else {
      this.stockTransferModel.locationId = event.locationId;
      this.stockTransferModel.locationName = event.locationName;
    }
  }

  dateValidationinstall(event) { 
    return null;
  }

  

  srStartDateValidation(event){
    
    if(event.value){
      this.stockTransferModel.fromDt = moment(event.value).format(this.assetConstants.ISODate);
    }
    else{
      this.stockTransferModel.fromDt = "";
    } 
    return null;
  }

  srEndDateValidation(event){
    if(event.value){
      this.stockTransferModel.endDt = moment(event.value).format(this.assetConstants.ISODate);
    }
    else{
      this.stockTransferModel.endDt = "";
    } 
    return null;
  }

  searchStockTransfer() {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchListAssetStockTransfer();
    this.selectedItem = 0;
  }

  clearStockTransfer() {
    this.stockTransferModel = new StockTransferModel;
    this.ngOnInit();   
    this.selectedItem = 0;
  }

  generateStockTransferReport() {
    this.stockTransferModel.recordsPerPage = 0;
    this.commonService.commonListService('reports/assets/generateStockAllocateReport.sams', this.stockTransferModel).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      }, error => {
      }
    );
  }

  selectedAllocateList=[];
  selectStockAllocate(element){

    const transferId = this.selectedAllocateList.findIndex(data => data.stockTransferHdrId === element.stockTransferHdrId);
    
    this.enableActionBtn = false;
    if(transferId === -1){
      this.selectedAllocateList.push(element);  
    }else{ 
      this.selectedAllocateList.splice(transferId,1);   
    }

    if(this.selectedAllocateList.length === 1){
      this.enableActionBtn = false;
    }
    else{
      this.enableActionBtn = true;
    }
  }

  selectAllAllocates(event){
    this.selectAllAllocate = event.checked;
    this.enableActionBtn = false;

    if(event.checked){
      this.selectedAllocateList = this.assetStockMainDataSource;
    }
    else{
      this.selectedAllocateList = [];
    }

    if(this.selectedAllocateList.length === 1){
      this.enableActionBtn = false;
    }
    else{
      this.enableActionBtn = true;
    }
  }

  checkApprovalValid(){
    if(this.selectedAllocateList.length>0){
      return !(this.selectedAllocateList.findIndex(data => data.stockTransferStatus !== "BOOKED") === -1);
    }
    else
      return true;
  }

  compareValue(element: any): boolean{
    return this.selectedAllocateList.findIndex(data => data.stockTransferHdrId === element.stockTransferHdrId) !== -1;
  }

  confirmStockAllocateApprove() {
    const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'confirmHeading': 'Confirmation',
        'confirmMsg':'Are You Sure To Approve This Record?'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          this.status = 'APPROVED';
          this.stockAllocateValidateAndStatusUpdate(this.status);
        }
      });
  }

  stockAllocateValidateAndStatusUpdate(status) {
    let stockAllocateHdrId = {selectedTransferList: [],status: status,selectedApprovalList :[]};
    for(let i=0; i<= this.selectedAllocateList.length-1 ; i++){
      stockAllocateHdrId.selectedTransferList.push(this.selectedAllocateList[i].stockTransferHdrId);
      stockAllocateHdrId.selectedApprovalList.push(this.selectedAllocateList[i].approvalId);
    }
      this.commonService.commonInsertService(this.assetOptimaServices.stockTransferValidateAndStatusUpdate, stockAllocateHdrId).subscribe(
        data => {
          if (data.success) {
            this.commonService.openToastSuccessMessage(data.message);            
            this.ngOnInit();
          } else {
            this.commonService.openToastErrorMessage(data.message);
          }
        });
  }

  rejectStockAllocateApprove() {
    const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'confirmHeading': 'Confirmation',
        'confirmMsg':'Are You Sure To Reject This Record?'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status === true) {
          this.status = 'REJECTED';
          this.stockAllocateValidateAndStatusUpdate(this.status);
        }
      });
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
            this.stockTransferModel = JSON.parse(this.userPreference.customFilters);
          }
          resolve(true);
        }
      )
    });
    return userPreferenceInfo;
    
  }
  
  applyPreferredFilters() {
    //SAVE TO USER PREFERENCE TABLE
    this.userPreference.customFilters = JSON.stringify(this.stockTransferModel);
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
