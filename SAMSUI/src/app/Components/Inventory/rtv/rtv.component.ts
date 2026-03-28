import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { allBusinessPartnerRoles, allWorkflowStatus } from 'src/app/Constants/AllStatusConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { getData } from 'src/app/Model/common/fetchListData';
import { RTVHdrModel } from 'src/app/Model/inventory/rtvHdr';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { CancelConfirmationComponent } from '../../Common-components/cancel-confirmation/cancel-confirmation/cancel-confirmation.component';
import { RejectConfirmationComponent } from '../../Common-components/reject-confirmation/reject-confirmation.component';
import { UserPrefernce } from 'src/app/Services/user-preference/user-preference';

@Component({
  selector: 'app-rtv',
  templateUrl: './rtv.component.html',
  styleUrls: ['./rtv.component.css']
})
export class RtvComponent implements OnInit {
  defaultColumns = ['select', 'sno', 'rtvNo', 'rtvDate', 'supplierName', 'doNo', 'grnNo', 'rtvStatus', 'approvalStatus', 'createdBy'];
  displayedColumns = [...this.defaultColumns];

  rtvMainDataSource = [];
  subLoaderRtvMain: boolean = false;
  scrollLocationNamesync: boolean = false;
  limitCount: any;
  locationCombo: any = [];
  locationNamePageNumber: number;
  rtvStatus = ['BOOKED', 'APPROVED', 'REJECTED', 'CANCELLED'];

  scrollSupplierNamesync = false;
  supplierPageNumber: number;
  supplierList = [];

  enableActionBtn: boolean = true;
  selectAllRtv: boolean = false;

  scrollDonosync: boolean = false;
  donoPageNumber: number;
  doNoList = [];

  scrollgrnNosync: boolean = false;
  grnNoPageNumber: number;
  fetchGrnNoList = [];

  scrollRtvsync: boolean = false;
  rtvPageNumber: number;
  fetchRtvList = [];

  scrollItemNamesync: boolean = false;
  itemPageNumber: number;
  itemCombo = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public rtvHdrModel: RTVHdrModel
  //PERMISSIONS 
  modelAccessModule: ModuleAccessModel;
  getData: getData;

  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page
  enableActionBtnForCancel: boolean = true;
  rtvStatusCancel: string;
  rtvNumberCancel: string;
  rtvhdrIdCancel: number;
  rtvCancelList: any =[];

  itemTypePageNumber: number;
  scrollItemTypeNamesync: boolean = false;
  itemTypeList: any = [];

  //USER PREFERENCE
  public userPreference: UserPrefernce;
  showManageColumns: boolean = false;

  constructor(private commonService: CommonService,
    public router: Router,
    private readonly dialog: MatDialog,
    private assetOptimaServices: AssetOptimaServices,
    private userSession: UserSessionService) {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.rtvHdrModel = new RTVHdrModel();
    this.modelAccessModule = new ModuleAccessModel();
    this.getData = new getData();
    this.locationNamePageNumber = 1;
    this.supplierPageNumber = 1;
    this.grnNoPageNumber = 1;
    this.rtvPageNumber = 1;
    this.itemPageNumber = 1;
    this.itemTypePageNumber = 1;

    this.showManageColumns = false;
    this.userPreference = new UserPrefernce();
  }

  ngOnInit(): void {

    this.supplierPageNumber = 1;
    this.enableActionBtn = true;
    this.selectedRtvList = [];
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_RETURN_TO_VENDOR'];

    this.rtvHdrModel.locationName = this.userSession.getUserLocationName();
    this.rtvHdrModel.locationId = this.userSession.getUserLocationId();

    // this.fetchListofRtvHdr();

    this.rtvHdrModel.direction = 'desc';
    this.rtvHdrModel.columnName = 'rtvNo';

    this.userPreference.moduleKey = 'GROUPACCESS_RETURN_TO_VENDOR';
    // this.getUserPreferenceInfo();

    let userPreferenceData = this.getUserPreferenceInfo();
    userPreferenceData.then((response) => {
      this.fetchListofRtvHdr();

    })
  }

  customSort(event) {
    this.rtvHdrModel.pageNumber = 0;
    this.rtvHdrModel.columnName = event.active;
    this.rtvHdrModel.direction = event.direction;
    this.fetchListofRtvHdr();
  }

  fetchListofRtvHdr() {
    this.subLoaderRtvMain = true;
    this.rtvHdrModel.pageNumber = Number(this.pageIndex);
    this.rtvHdrModel.recordsPerPage = Number(this.pageSize);
    this.commonService.commonListService('listAllRtvHdr.sams', this.rtvHdrModel).subscribe(
      data => {
        if (data.success) {
          this.length = data.responseData.dataTotalRecCount;
          this.rtvMainDataSource = data.responseData.dataList;
        }
      }
    );
    console.log("rtvlist", this.rtvMainDataSource);
    this.subLoaderRtvMain = false;
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchListofRtvHdr();
  }

  compareValue(element) {
    return this.selectedRtvList.findIndex(data => data.rtvHdrId === element.rtvHdrId) !== -1;
  }

  checkApprovalValid() {
    if(this.selectedRtvList.length>0){
      return !(this.selectedRtvList.findIndex(data => data.rtvStatus !== "BOOKED") === -1);
    }
    else
      return true;
  }
  rejectStockIndentApprove() {

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
      this.rtvHdrModel.locationId = 0;
      this.rtvHdrModel.locationName = '';
      this.locationNamePageNumber = 1;
    } else {
      this.rtvHdrModel.locationId = event.locationId;
      this.rtvHdrModel.locationName = event.locationName;
    }
  }

  listOfSupplier(searchTerms) {
    this.scrollSupplierNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.SUPPLIER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchTerms.term, '', '', this.limitCount, this.supplierPageNumber, '', partnerRoles).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.supplierPageNumber, this.supplierList, data.responseData.comboList)
        this.supplierPageNumber = this.getData.pageNumber;
        this.supplierList = this.getData.dataList;
        this.scrollSupplierNamesync = false;
      }
    );
  }

  fetchIdOfSupplier(event) {
    if (event === undefined) {
      this.rtvHdrModel.supplierId = 0;
      this.rtvHdrModel.supplierName = '';
      this.supplierPageNumber = 1;
    } else {
      this.rtvHdrModel.supplierId = event.businessPartnerId;
      this.rtvHdrModel.supplierName = event.businessPartnerName;
    }
  }

  createRtv(mode?: string) {
    if (mode !== 'add') {
      this.router.navigate(['home/inventory/rtvCreate/' + this.selectedRtvList[0].rtvHdrId + '/' + mode]);
    } else {
      this.router.navigate(['home/inventory/rtvCreate/' + 0 + '/' + mode]);
    }
  }

  selectedRtvList = [];
  selectRTV(element) {
    this.rtvhdrIdCancel = element.rtvHdrId;
    this.rtvNumberCancel = element.rtvNo;
    this.rtvStatusCancel = element.rtvStatus;
    const indentId = this.selectedRtvList.findIndex(data => data.rtvHdrId === element.rtvHdrId);

    this.enableActionBtn = false;
    if (indentId === -1) {
      this.selectedRtvList.push(element);
    } else {
      this.selectedRtvList.splice(indentId, 1);
    }

    if(element.rtvStatus == 'BOOKED'){
      this.enableActionBtnForCancel = false;
    }else{
      this.enableActionBtnForCancel = true;
    }
    if (this.selectedRtvList.length === 1) {
      this.enableActionBtn = false;
    }
    else {
      this.enableActionBtn = true;
      // this.enableActionBtnForCancel = true;
    }
    
  }

  selectAllRTV(event) {
    this.selectAllRtv = event.checked;
    this.enableActionBtn = false;

    if (event.checked) {
      this.selectedRtvList = this.rtvMainDataSource;
    }
    else {
      this.selectedRtvList = [];
    }

    if (this.selectedRtvList.length === 1) {
      this.enableActionBtn = false;
    }
    else {
      this.enableActionBtn = true;
    }
  }

  searchGrn() {
    if (this.rtvHdrModel.fromDateDisp != null) {
      this.rtvHdrModel.fromDateDisp = this.commonService.convertToDateStringyyyy_mm_dd(this.rtvHdrModel.fromDateDisp);
    }
    if (this.rtvHdrModel.toDateDisp != null) {
      this.rtvHdrModel.toDateDisp = this.commonService.convertToDateStringyyyy_mm_dd(this.rtvHdrModel.toDateDisp);
    }
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchListofRtvHdr();
  }

  clear(){
    this.rtvHdrModel=new RTVHdrModel;
    this.ngOnInit();
  }

  listOfGrnDoNo(searchTerms) {

      this.donoPageNumber = 1;
      this.scrollDonosync = true;
      this.doNoList = [];
      this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
      this.commonService.getComboResults(this.assetOptimaServices.listOfGrnHdrSupplierNameCombo, searchTerms.term, 0, '', this.limitCount, this.donoPageNumber, '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchTerms, this.donoPageNumber, this.doNoList, data.responseData.comboList)
          this.donoPageNumber = this.getData.pageNumber;
          this.doNoList = this.getData.dataList;
          this.scrollDonosync = false;
        }
      );
 
  }

  fetchIdOfGrnDoNo(event) {
    if (event === undefined) {
      this.doNoList = [];
      this.rtvHdrModel.doNo = '';
      this.donoPageNumber = 1;
    } else {
      this.rtvHdrModel.doNo = event.doNo
    }
  }

  listOfGrnNo(searchTerms) {

    this.grnNoPageNumber = 1;
    this.scrollgrnNosync = true;
    this.fetchGrnNoList = [];
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults('listOfAllRtvGrnNoListCombo.sams', searchTerms.term, 0, '', this.limitCount, this.grnNoPageNumber, '').subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.grnNoPageNumber, this.fetchGrnNoList, data.responseData.comboList)
        this.grnNoPageNumber = this.getData.pageNumber;
        this.fetchGrnNoList = this.getData.dataList;
        this.scrollgrnNosync = false;
      }
    );
  }

  fetchIdOfGrnNo(event) {
    if (event === undefined) {
      this.fetchGrnNoList = [];
      this.grnNoPageNumber = 1;
    } else {

    }
  }

  listOfRtvNo(searchTerms) {

    this.rtvPageNumber = 1;
    this.scrollRtvsync = true;
    this.fetchRtvList = [];
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults('listOfAllRtvNoListCombo.sams',searchTerms.term, 0, '', this.limitCount, this.rtvPageNumber, '').subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.rtvPageNumber, this.fetchRtvList, data.responseData.comboList)
        this.rtvPageNumber = this.getData.pageNumber;
        this.fetchRtvList = this.getData.dataList;
        this.scrollRtvsync = false;
      }
    );
  }

  fetchIdOfRtvNo(event) {
    if (event === undefined) {
      this.fetchRtvList = [];
      this.rtvPageNumber = 1;
    } else {

    }
  }

  listOfItem(searchTerms) {
    let locationId;
    if (this.rtvHdrModel.locationId > 0) {
      locationId = this.rtvHdrModel.locationId;
    }
    this.scrollItemNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    let itemTypeId = this.rtvHdrModel.searchItemTypeId;
    console.log(this.rtvHdrModel.searchItemTypeId);
    this.commonService.getComboResults(this.assetOptimaServices.listAllItemCombo, searchTerms.term, locationId, itemTypeId, this.limitCount, this.itemPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.itemPageNumber , this.itemCombo , data.responseData.comboList)
        this.itemPageNumber = this.getData.pageNumber;
        this.itemCombo = this.getData.dataList;
        this.scrollItemNamesync = false;
      }
    );
  }


  selectedItemName(event) {    
    if (event === undefined) {
      this.rtvHdrModel.searchItemName = null;
      this.itemPageNumber = 1;
      this.itemCombo = [];
    } else {
      this.rtvHdrModel.searchItemName = event.itemMasterName;
      this.rtvHdrModel.searchItemTypeName = event.itemTypeName;
      console.log("this.rtvHdrModel.searchItemName", this.rtvHdrModel.searchItemName);
    }
  }

  generateReport() {

    this.commonService.commonListService('reports/rtv/generateRtvReport.sams', this.rtvHdrModel).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      }, error => {
        // alert('error');
      }
    );
  } 

  setRtvStatus(rtvStatus) {
    this.rtvHdrModel.rtvStatus = rtvStatus;
  }

  checkRtvCancel(){
    if(this.rtvStatusCancel == 'BOOKED'){
      return false;
    }
    else
      return true;
  }

  rtvCancel() {
    let dialogRef = this.dialog.open(CancelConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'RTV : '+this.rtvNumberCancel
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          let cancelReason = data.cancelReason;
          this.rtvCancelList = []; 
          for (let i = 0; i < this.selectedRtvList.length; i++) {      
            if (this.selectedRtvList[i].rtvStatus === 'BOOKED') {
              this.rtvCancelList.push(this.selectedRtvList[i].rtvHdrId);
            }
          } 

          let rtvIdList = {rtvCancelList: [],cancelReason: cancelReason};
          rtvIdList.rtvCancelList = this.rtvCancelList;
          rtvIdList.cancelReason = cancelReason;
          this.commonService.showSpinner();

          this.commonService.commonInsertService('cancelMultipleRtv.sams',rtvIdList).subscribe(
            data => {
              if (data.success) {
                this.commonService.openToastSuccessMessage(data.message);
                this.fetchListofRtvHdr();
                this.commonService.hideSpinner();
                this.selectedRtvList = [];
              } else {
                this.commonService.hideSpinner();
                this.commonService.openToastErrorMessage(data.message);
                this.selectedRtvList = [];
              }
            }
          );
          // }
        }
      });
  }

  rtvWorkflowApproval(status){
    let result;
    if(status){
      result = this.commonService.commonWorkflowService(allWorkflowStatus[allWorkflowStatus.RTV_APPROVAL], this.selectedRtvList," Selected Return To Vendor ");
    }

    result.then(data=>{
      if(data){
        setTimeout(() => {
          this.ngOnInit();
        },1500);
        
      }
    })
  }

  rtvWorkflowReject() {

    let selectdList = this.selectedRtvList;
    const dialogRef = this.dialog.open(RejectConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'confirmHeading': 'Confirmation',
        'confirmMsg': 'Are you sure to Reject selected Return To Vendor ?'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status === true) {
          let rejectReason = data.reason

          let rtvIdList = {selectedRtvList: [],status: 'REJECTED',selectedApprovalList : [], rejectReason : rejectReason};
          for(let i=0; i<= selectdList.length-1 ; i++){
            rtvIdList.selectedRtvList.push(selectdList[i].rtvHdrId);
            rtvIdList.selectedApprovalList.push(selectdList[i].approvalId);
          }
          this.commonService.showSpinner();
          this.commonService.commonInsertService('approveRejectRtv.sams', rtvIdList).subscribe(
            data => {
              if (data.success) {
                this.commonService.hideSpinner();
                this.commonService.openToastSuccessMessage(data.message);
                this.ngOnInit();
              } else {
                this.commonService.hideSpinner();
                this.commonService.openToastWarningMessage(data.message);
              }
            }, error => {
              
            }
          );
        }
      });
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.ngOnInit();
    },1000);
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
      this.rtvHdrModel.searchItemTypeId = 0;
      this.rtvHdrModel.searchItemTypeName = '';
      this.itemTypePageNumber = 1;
    } else {
      this.rtvHdrModel.searchItemTypeId = event.itemTypeId;
      this.rtvHdrModel.searchItemTypeName = event.itemTypeName;

      this.rtvHdrModel.searchItemName = '';
      this.itemCombo  = [];
      this.itemPageNumber = 1;
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
      this.commonService.commonInsertService(this.assetOptimaServices.fetchUserPreferenceInfo, this.userPreference).subscribe(
        data => {
          if(data.responseData !== undefined) {
            this.userPreference = data.responseData;
            if(this.userPreference.customColumnsList.length>0) {
              this.displayedColumns = this.userPreference.customColumnsList;
            }
            this.rtvHdrModel = JSON.parse(this.userPreference.customFilters);
          }
          resolve(true);
        }
      )
    });
    return userPreferenceInfo;
    
  }
  
  applyPreferredFilters() {
    //SAVE TO USER PREFERENCE TABLE
    this.userPreference.customFilters = JSON.stringify(this.rtvHdrModel);
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