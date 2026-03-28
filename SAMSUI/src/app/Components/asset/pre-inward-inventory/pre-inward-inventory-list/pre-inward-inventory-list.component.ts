import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { Title } from '@angular/platform-browser';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { InwardInventoryHdrModel } from 'src/app/Model/asset/inwardInventoryHdr';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { DeleteConfirmationComponent } from 'src/app/Components/Common-components/delete-confirmation/delete-confirmation.component';
import { getData } from 'src/app/Model/common/fetchListData';
import { allPreInwardStatus, allWorkflowStatus } from 'src/app/Constants/AllStatusConstants';
import { processList } from 'src/app/Constants/ProcessList';
import { allBusinessPartnerRoles } from 'src/app/Constants/AllStatusConstants';

import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { UserPrefernce } from 'src/app/Services/user-preference/user-preference';
@Component({
  selector: 'app-pre-inward-inventory-list',
  templateUrl: './pre-inward-inventory-list.component.html',
  styleUrls: ['./pre-inward-inventory-list.component.css']
})
export class PreInwardInventoryListComponent implements OnInit {

  //Set Page Title
  title = 'Asset Optima - Inward Inventory Asset';

  myOpenVar : any = false;

  //For Pagination
  length: String = '0';     //set total record count here
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  subloaderInventory: boolean = false;

  inwardInventory: InwardInventoryHdrModel;

  defaultColumns = ['select', 'sno', 'locationName','poNumber','poDate','businessPartnerName','businessPartnerSiteName','expectedArrivalDt','preInwStatusName','approvalStatus','totalAmt','createdInfo','updatedInfo'];
  displayedColumns = [...this.defaultColumns];

  // displayedColumns = ['select', 'sno', 'locationName','poNumber','poDate','businessPartnerName','businessPartnerSiteName','expectedArrivalDt','preInwStatusName','approvalStatus','totalAmt','createdInfo','updatedInfo'];
  piDataSource: any=[];

  //USER PREFERENCE
  public userPreference: UserPrefernce;
  showManageColumns: boolean = false;

  //combo
  scrollsyncLocation: boolean = false;
  recordsPerPageForCombo: string;
  locationPageNumber: number;
  locationCombo: any = [];

  //combo
  scrollsyncInwStatus: boolean = false;
  inwStatusPageNumber: number;
  inwStatusCombo: any = [];

  //supplier combo
  scrollSupplierNamesync: boolean = false;
  supplierPageNumber: number;
  supplierList: any = [];

  //PERMISSIONS
  modelAccessModule: ModuleAccessModel;
  locCurrCd: any;
  getData: getData;

  enableActionBtn: boolean=true;
  enableViewBtn: boolean=true;

  selectedAllAssest: boolean = false;
  dataSource: any[];

  employeeId: any = 0;

constructor(private router: Router,
  private commonService:CommonService,
  private titleService: Title,
  private assetOptimaServices:AssetOptimaServices,
  private assetOptimaConstants: AssetOptimaConstants,
  private userSessionService: UserSessionService,
  private dialog: MatDialog,
  private translateService: TranslateService,
  public assetOptimeMthnd: AssetOptimaServices,
  private samsService: AssetOptimaServices) {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.locationPageNumber=1;
    this.inwStatusPageNumber=1;
    this.supplierPageNumber=1;
    this.inwardInventory = new InwardInventoryHdrModel();
   }

  ngOnInit() {
    this.employeeId = this.userSessionService.getUserEmpId();

    this.selectedAssetList = [];
    this.piDataSource = [];
    this.enableActionBtn = true;
    this.enableViewBtn = true;

    this.modelAccessModule = this.userSessionService.getUserGroupAccess()['GROUPACCESS_PRE_INWARD'];
    this.titleService.setTitle(this.title);
    // if(localStorage.getItem('PRE_INWARD_SEARCH_PARAMETER') == null) {
    //   this.inwardInventory.columnName = 'updatedDt';
    //   this.inwardInventory.direction = 'desc';
    //   //this.inwardInventory.locationName = this.userSessionService.getUserLocationName();
    //   //this.inwardInventory.locationId = this.userSessionService.getUserLocationId();
    //   this.inwardInventory.preInwStatusId = 1001;
    //   this.inwardInventory.preInwStatusName = 'APPROVAL PENDING';
    // } else {
    //   this.inwardInventory = JSON.parse(localStorage.getItem('PRE_INWARD_SEARCH_PARAMETER'));
    // }
    // this.inwardInventory.columnName = 'updatedDt';
    // this.inwardInventory.direction = 'desc';


    // this.inwardInventory.locationName = this.userSessionService.getUserLocationName();
    // this.inwardInventory.locationId = this.userSessionService.getUserLocationId();

    // this.fetchListForInwardInventory();
    // this.locCurrCd = this.userSessionService.getlocCurrCd();

    this.inwardInventory.columnName = 'updatedDt';
    this.inwardInventory.direction = 'desc';

    this.userPreference = new UserPrefernce();
    this.userPreference.moduleKey = 'GROUPACCESS_PRE_INWARD';
    // this.getUserPreferenceInfo();

    let userPreferenceData = this.getUserPreferenceInfo();
    userPreferenceData.then((response) => {
    this.fetchListForInwardInventory();
    this.locCurrCd = this.userSessionService.getlocCurrCd();
    })

  }

  createInwardInventory(mode) {
    if(mode !== 'add'){
      this.router.navigate(['home/asset/preInwardInventoryCreate/'+ this.selectedAssetList[0].inwardInventoryHdrId + '/' + mode]);
    }
    else{
      this.router.navigate(['home/asset/preInwardInventoryCreate/'+ 0 + '/' + mode]);
    }
  }

  selectedAssetList=[];
  selectAssets(element){

    const assetid = this.selectedAssetList.findIndex(data => data.inwardInventoryHdrId === element.inwardInventoryHdrId);

    this.enableActionBtn = false;
    this.enableViewBtn = false;

    if(assetid === -1){
      this.selectedAssetList.push(element);
    }else{
      this.selectedAssetList.splice(assetid,1);
    }

    if(this.selectedAssetList.length === 1){
      this.enableActionBtn = (element.preInwStatusId != allPreInwardStatus.APPROVAL_PENDING);      
    }
    else{
      this.enableActionBtn = true;
      this.enableViewBtn = true;
    }
  }

  selectAllAssets(event){
    this.selectedAllAssest = event.checked;
    this.enableActionBtn = false;
    this.enableViewBtn = true;

    if(event.checked){
      this.selectedAssetList = this.piDataSource;
    }
    else{
      this.selectedAssetList = [];
    }

    if(this.selectedAssetList.length === 1){
      this.enableActionBtn = this.selectedAssetList[0].preInwStatusId != allPreInwardStatus.APPROVAL_PENDING;
    }
    else{
      this.enableActionBtn = true;
    }
  }

  compareValue(element: any): boolean{
    if(this.selectedAssetList.length > 0){
      return this.selectedAssetList.findIndex(data => data.inwardInventoryHdrId === element.inwardInventoryHdrId) !== -1;
    }
    else{
      return false;
    }
  }

  checkApprovalValid(){
    if(this.selectedAssetList.length>0){
      return !(this.selectedAssetList.findIndex(data => data.preInwStatusId !== allPreInwardStatus.APPROVAL_PENDING || data.approvalId == 0) === -1);
    }
    else
      return true;
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchListForInwardInventory();
  }

  customSort(event) {
    this.inwardInventory.pageNumber = 0;
    this.inwardInventory.columnName = event.active;
    this.inwardInventory.direction = event.direction;
    this.fetchListForInwardInventory();
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  expArrStartDataValidation(event){
    if(event.value){
      this.inwardInventory.fromDtDisp = moment(event.value).format(this.assetOptimaConstants.ISODate);
    }
    else{
      this.inwardInventory.fromDtDisp = "";
    }
    return false;
  }

  expArrEndDataValidation(event){
    if(event.value){
      this.inwardInventory.toDtDisp = moment(event.value).format(this.assetOptimaConstants.ISODate);
    }
    else{
      this.inwardInventory.toDtDisp = "";
    }
    return false;
  }

  poDateValidation(event){

    if(event.value){
      this.inwardInventory.poDateDisp = moment(event.value).format(this.assetOptimaConstants.ISODate);
    }
    else{
      this.inwardInventory.poDateDisp = "";
    }
    return false;
  }

  fetchListForInwardInventory(){
    this.subloaderInventory = true;
    this.piDataSource = null;
    this.inwardInventory.pageNumber = Number(this.pageIndex);
    this.inwardInventory.recordsPerPage = Number(this.pageSize);

    this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllInwardInventory,this.inwardInventory).subscribe(
      data => {
        if(data.success){
           this.length = data.responseData.dataTotalRecCount;
           this.piDataSource = data.responseData.dataList;
           this.subloaderInventory = false;
           localStorage.setItem('PRE_INWARD_SEARCH_PARAMETER', JSON.stringify(this.inwardInventory));
        }else{
          this.subloaderInventory = false;
        }
      }
    );
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

  selectedLocationData(event) {

    if (event === undefined) {
      this.inwardInventory.locationName = null;
      this.inwardInventory.locationId = 0;
      this.locationPageNumber = 1;
      this.locationCombo = [];
    } else {
      this.inwardInventory.locationName = event.locDisplayField;
      this.inwardInventory.locationId = event.locationId;
    }
  }

  loadStatusComboData(searchValue) {
    this.scrollsyncInwStatus = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllMasterStatusCombo, searchValue.term, processList.PRE_INWARD, '',
      this.recordsPerPageForCombo, this.inwStatusPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.inwStatusPageNumber , this.inwStatusCombo , data.responseData.comboList)
          this.inwStatusPageNumber = this.getData.pageNumber;
          this.inwStatusCombo = this.getData.dataList;
          this.scrollsyncInwStatus = false;
        }
      );
  }

  selectedInwStatusData(event){
    if(event === undefined){
      this.inwardInventory.preInwStatusId=0;
      this.inwStatusPageNumber = 1;
      this.inwStatusCombo = [];
    }else{
      this.inwardInventory.preInwStatusId=event.processStatusId;
      this.translateService.get([event.processStatusName])
      .subscribe((val) => {
        const status = Object.values(val)
        if(status.length > 0){
          this.inwardInventory.preInwStatusName = status[0].toString();
        }
      });
    }
  }

  listOfSupplier(searchTerms) {

    this.scrollSupplierNamesync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.SUPPLIER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchTerms.term, '', '', this.recordsPerPageForCombo, this.supplierPageNumber,'',partnerRoles).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.supplierPageNumber , this.supplierList , data.responseData.comboList)
        this.supplierPageNumber = this.getData.pageNumber;
        this.supplierList = this.getData.dataList;
        this.scrollSupplierNamesync = false;
      }
    );

    return this.commonService.fetchSearchValue(searchTerms);
  }

  fetchIdOfSupplier(event) {
    if (event === undefined) {
      this.inwardInventory.businessPartnerId=0;
      this.supplierList = [];
      this.supplierPageNumber = 1;
    } else {
      this.inwardInventory.businessPartnerId=event.businessPartnerId;
    }
  }

  searchPreInwAsset(){
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchListForInwardInventory();
    this.selectedAssetList = [];
    this.enableActionBtn = true;
    this.enableViewBtn = true;

    this.applyPreferredFilters();
  }

  clear(){
    this.inwardInventory = new InwardInventoryHdrModel();
    localStorage.removeItem('PRE_INWARD_SEARCH_PARAMETER');

    this.inwardInventory.direction = 'desc';
    this.inwardInventory.columnName = 'updatedDt';
    this.applyPreferredFilters();

    this.ngOnInit();
    this.selectedAssetList = [];
    this.enableActionBtn = true;
    this.enableViewBtn = true;
  }

  deleteInwardInventory(){
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Pre Inward'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
            this.commonService.commonGetService(this.assetOptimaServices.deletePreInwardRecord, this.selectedAssetList[0].inwardInventoryHdrId).subscribe(
              data => {
                if (data.success) {
                  this.commonService.openToastSuccessMessage(data.message);
                  this.selectedAssetList = [];
                  this.enableActionBtn = true;
                  this.enableViewBtn = true;
                  this.fetchListForInwardInventory();
                } else {
                  this.commonService.openToastErrorMessage(data.message);
                }
              }
            );
        }
      });
  }

  preWorkflowApproval(status){
    let asd;
    if(status){
      asd = this.commonService.commonWorkflowService(allWorkflowStatus[allWorkflowStatus.PRE_INWARD], this.selectedAssetList," Selected PO Registration");
    }
    else{
      asd = this.commonService.rejectApprove(allWorkflowStatus[allWorkflowStatus.PRE_INWARD],this.selectedAssetList," Selected PO Registration");
    }

    asd.then(data=>{
      if(data){
        this.piDataSource = [];
         this.ngOnInit();
      }
    })
  }

  
  //for generate report
  generateReport() {

    this.commonService.commonListService('reports/preInwardInventory//generatePreInwardInventoryReport.sams', this.inwardInventory).subscribe(
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
    this.commonService.commonInsertService(this.assetOptimeMthnd.saveOrUpdateUserPreference, this.userPreference).subscribe(
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
            this.inwardInventory = JSON.parse(this.userPreference.customFilters);
          }
          resolve(true);
        }
      )
    });
    return userPreferenceInfo;
    
  }
  
  applyPreferredFilters() {
    //SAVE TO USER PREFERENCE TABLE
    this.userPreference.customFilters = JSON.stringify(this.inwardInventory);
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
