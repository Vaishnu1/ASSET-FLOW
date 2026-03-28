import { Component, OnInit } from '@angular/core';
import { StockTransferModel } from 'src/app/Model/inventory/stockTransfer';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { getData } from 'src/app/Model/common/fetchListData';
import { ConfirmConfirmationComponent } from '../../Common-components/confirm-confirmation/confirm-confirmation.component';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import * as moment from 'moment';
import { UserPrefernce } from 'src/app/Services/user-preference/user-preference';

@Component({
  selector: 'app-stock-transfer',
  templateUrl: './stock-transfer.component.html',
  styleUrls: ['./stock-transfer.component.css']
})
export class StockTransferComponent implements OnInit {

  defaultColumns = ['select','sno', 'locationName', 'stockTransferNo', 'fromStoreName', 'toStoreName', 'stockTransferStatus', 'transferApprovalStatus', 'fromAssetCode', 'toAssetCode','createdBy', 'createdDtDisp'];
  displayedColumns = [...this.defaultColumns];

  stockTrnasferMainDataSource = [];
  stockTransferModel: StockTransferModel;

  //PERMISSIONS 
  modelAccessModule: ModuleAccessModel;

  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  recordsPerPageForCombo: string = '0';

  subLoader : boolean = false;

  scrollsyncLocation: boolean = false;
  locationPageNumber: number = 0;
  locationCombo: any = [];
  getData: getData;

  selectedItem:any = 0;
  enableActionBtn: boolean=true;
  selectAllTransfer: boolean = false;
  approve: any;
  employeeId: any;
  status: string;
  
  //USER PREFERENCE
  public userPreference: UserPrefernce;
  showManageColumns: boolean = false;

  constructor(private router: Router,
              private dialog: MatDialog,
              private commonService: CommonService,
              private assetConstants: AssetOptimaConstants,
              private userSession: UserSessionService,
              private assetOptimaServices:AssetOptimaServices,
              private samsService: AssetOptimaServices,) { 
                this.stockTransferModel = new StockTransferModel();
                this.pageSize = '100';
                this.pageIndex = '0';
                this.modelAccessModule = new ModuleAccessModel();
                this.locationPageNumber = 1;
                this.getData = new getData();

                
                this.showManageColumns = false;
                this.userPreference = new UserPrefernce();
              }

  ngOnInit(): void {
    this.employeeId = this.userSession.getUserEmpId();
    this.selectedTransferList = [];
    this.enableActionBtn = true;
    this.stockTransferModel.locationName = this.assetConstants.defaultuserLocName;
    this.stockTransferModel.locationId = this.assetConstants.defaultuserLocId;

    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_STOCK_INDENT'];
    // this.stockTransferModel.direction = 'desc';
    // this.stockTransferModel.columnName = 'stockTransferNo'
    // this.fetchListofStockTransfer();

    this.stockTransferModel.direction = 'desc';
    this.stockTransferModel.columnName = 'updatedDt';

    this.userPreference.moduleKey = 'GROUPACCESS_STOCK_INDENT';
    // this.getUserPreferenceInfo();

    let userPreferenceData = this.getUserPreferenceInfo();
    userPreferenceData.then((response) => {
      this.fetchListofStockTransfer();
    })
  }

  createStockTransfer(mode?: string) {
    if (mode !== 'add') {
      this.router.navigate(['home/inventory/stockTransferCreate/'+ this.selectedTransferList[0].stockTransferHdrId +'/'+mode]);
    }else{
      this.router.navigate(['home/inventory/stockTransferCreate/'+ 0 + '/' + mode]);
    }
  }

  fetchListofStockTransfer(){
    this.subLoader = true;
    this.stockTransferModel.pageNumber = Number(this.pageIndex);
    this.stockTransferModel.recordsPerPage = Number(this.pageSize);
    this.stockTransferModel.stockTransferFor = "STORE";
    this.commonService.commonListService('fetchListAllStockTransfer.sams',this.stockTransferModel).subscribe(
      data => {
        if(data.success){
           this.length = data.responseData.dataTotalRecCount;
           this.stockTrnasferMainDataSource = data.responseData.dataList;

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
    this.fetchListofStockTransfer();
  }

   
  customSort(event) {
    this.stockTransferModel.pageNumber = 0;
    this.stockTransferModel.columnName = event.active;
    this.stockTransferModel.direction = event.direction;
    this.fetchListofStockTransfer();
  }

  loadLocationComboData(searchValue) {
    this.scrollsyncLocation = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllUserLocForCombo.sams', searchValue.term, '', '',
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

  selectedLocationData(event) {
    if (event === undefined) {
      this.stockTransferModel.locationName = '';
      this.stockTransferModel.locationId = 0;
    } else {
      this.stockTransferModel.locationName = event.locDisplayField;
      this.stockTransferModel.locationId = event.locationId;
    }
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
    this.fetchListofStockTransfer();
    this.selectedItem = 0;
  }

  clearStockTransfer() {
    this.stockTransferModel = new StockTransferModel;
    this.ngOnInit();
    this.selectedItem = 0;
  }

  generateStockTransferReport() {
    this.stockTransferModel.recordsPerPage = 0;
    this.commonService.commonListService('reports/assets/generateStockTransferReport.sams', this.stockTransferModel).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      }, error => {
        // alert('error');
      }
    );
  }

  selectedTransferList=[];
  selectStockTransfer(element){

    const transferId = this.selectedTransferList.findIndex(data => data.stockTransferHdrId === element.stockTransferHdrId);
    
    this.enableActionBtn = false;
    if(transferId === -1){
      this.selectedTransferList.push(element);  
    }else{ 
      this.selectedTransferList.splice(transferId,1);   
    }

    if(this.selectedTransferList.length === 1){
      this.enableActionBtn = false;
    }
    else{
      this.enableActionBtn = true;
    }
  }

  selectAllTransfers(event){
    this.selectAllTransfer = event.checked;
    this.enableActionBtn = false;

    if(event.checked){
      this.selectedTransferList = this.stockTrnasferMainDataSource;
    }
    else{
      this.selectedTransferList = [];
    }

    if(this.selectedTransferList.length === 1){
      this.enableActionBtn = false;
    }
    else{
      this.enableActionBtn = true;
    }
  }

  checkApprovalValid(){
    if(this.selectedTransferList.length>0){
      return !(this.selectedTransferList.findIndex(data => data.stockTransferStatus !== "BOOKED") === -1);
    }
    else
      return true;
  }

  compareValue(element: any): boolean{
    return this.selectedTransferList.findIndex(data => data.stockTransferHdrId === element.stockTransferHdrId) !== -1;
  }

  confirmStockTransferApprove() {
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
          this.stockTransferValidateAndStatusUpdate(this.status);
        }
      });
  }

  stockTransferValidateAndStatusUpdate(status) {
    let stockTransferHdrId = {selectedTransferList: [],status: status,selectedApprovalList : []};
    for(let i=0; i<= this.selectedTransferList.length-1 ; i++){
      stockTransferHdrId.selectedTransferList.push(this.selectedTransferList[i].stockTransferHdrId);
      stockTransferHdrId.selectedApprovalList.push(this.selectedTransferList[i].approvalId);
    }
      this.commonService.commonInsertService(this.assetOptimaServices.stockTransferValidateAndStatusUpdate, stockTransferHdrId).subscribe(
        data => {
          if (data.success) {
            this.commonService.openToastSuccessMessage(data.message);           
            this.ngOnInit();
          } else {
            this.commonService.openToastErrorMessage(data.message);
          }
        });
  }

  rejectStockTransferApprove() {
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
          this.stockTransferValidateAndStatusUpdate(this.status);
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
      this.commonService.commonInsertService(this.samsService.fetchUserPreferenceInfo, this.userPreference).subscribe(
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
