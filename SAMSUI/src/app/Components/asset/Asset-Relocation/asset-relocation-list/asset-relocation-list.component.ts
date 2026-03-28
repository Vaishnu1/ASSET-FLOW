import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetRelocationModel } from 'src/app/Model/master/assetRelocation';
import { Title } from '@angular/platform-browser';
import { AssetRelocationApproveRejectComponent } from '../asset-relocation-approve-reject/asset-relocation-approve-reject.component';
import { MatDialog } from '@angular/material/dialog';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { getData } from 'src/app/Model/common/fetchListData';
import { allAssetTransferStatus, allWorkflowStatus } from 'src/app/Constants/AllStatusConstants';
import { processList } from 'src/app/Constants/ProcessList';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { UserPrefernce } from 'src/app/Services/user-preference/user-preference';

@Component({
  selector: 'app-asset-relocation-list',
  templateUrl: './asset-relocation-list.component.html',
  styleUrls: ['./asset-relocation-list.component.css']
})
export class AssetRelocationListComponent implements OnInit {

  defaultColumns = ['select', 'sNo', 'relocateBatchNo', 'sourceLocName', 'sourceDepName', 'relocateLocName', 'relocateDepName', 'relocateStatus','relocateApprovalStatus','createdBy','updatedDt'];
  displayedColumns = [...this.defaultColumns];

  //For Pagination
  length: String = '0';     //set total record count here
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  dataSource = [];
  subLoader: boolean = false;

  scrollsyncLocation: boolean = false;
  scrollsyncLocationRelocate: boolean = false;
  locationPageNumber: number = 0;
  locationCombo: any = [];
  recordsPerPageForCombo: string;

  scrollsyncDepartment: boolean = false;
  scrollsyncDepartmentRelocate: boolean = false;
  departmentPageNumber: number = 0;
  departmentComboList: any = [];

  scrollsyncSubDepartment: boolean = false;
  subDepartmentPageNumber: number = 0;
  subDepartmentCombo: any = [];
  subDepartmentComboList: any = [];

  scrollsyncRelocateStatus: boolean = false;
  relocateStatusPageNumber: number = 0;
  relocateStatusCombo: any = [];

  scrollsyncSubDepartmentRelocate: boolean = false;
  subDepartmentPageNumberRelocate: number = 0;

  //Set Page Title
  title = 'Asset Optima - Asset Transfer Approval';

  public assetRelocation: AssetRelocationModel;
  modelAccessModule: ModuleAccessModel;
  getData: getData;

  enableActionBtn: boolean=true;

  //USER PREFERENCE
  public userPreference: UserPrefernce;
  showManageColumns: boolean = false;

  selectedAllAssest: boolean = false;
  constructor(private commonService: CommonService,
              private readonly userSession: UserSessionService,
              private titleService: Title,
              private translateService: TranslateService,
              private dialog: MatDialog,
              private router: Router,
              private samsService:AssetOptimaServices,) {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.locationPageNumber = 1;
    this.departmentPageNumber = 1;
    this.subDepartmentPageNumber = 1;
    this.subDepartmentPageNumberRelocate = 1;
    this.relocateStatusPageNumber = 1;
    this.assetRelocation = new AssetRelocationModel();
    this.modelAccessModule = new ModuleAccessModel();

    this.showManageColumns = false;
    this.userPreference = new UserPrefernce();
  }

  ngOnInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_ASSET_RELOCATION'];
    this.titleService.setTitle(this.title);
    
    // this.fetchListMethod();

    this.assetRelocation.direction = 'desc';
    this.assetRelocation.columnName = 'updatedDt';

    this.userPreference.moduleKey = 'GROUPACCESS_ASSET_RELOCATION';
    // this.getUserPreferenceInfo();

    let userPreferenceData = this.getUserPreferenceInfo();
    userPreferenceData.then((response) => {
      this.fetchListMethod();
    })
  }

  selectedAssetList=[];
  selectAssets(element){

    const assetid = this.selectedAssetList.findIndex(data => data.relocateBatchNo === element.relocateBatchNo);

    this.enableActionBtn = false;
    if(assetid === -1){
      this.selectedAssetList.push(element);
    }else{
      this.selectedAssetList.splice(assetid,1);
    }

    if(this.selectedAssetList.length === 1){
      this.enableActionBtn = false;
    }
    else{
      this.enableActionBtn = true;
    }
  }

  selectAllAssets(event){
    this.selectedAllAssest = event.checked;
    this.enableActionBtn = false;

    if(event.checked){
      this.selectedAssetList = this.dataSource;
    }
    else{
      this.selectedAssetList = [];
    }  

    if(this.selectedAssetList.length === 1){
      this.enableActionBtn = false;
    }
    else{
      this.enableActionBtn = true;
    }
  }

  compareValue(element: any): boolean{
    if(this.selectedAssetList.length > 0){
      return this.selectedAssetList.findIndex(data => data.relocateBatchNo === element.relocateBatchNo) !== -1;
    }
    else{
      return false;
    }
  }

  checkApprovalValid(){
    if(this.selectedAssetList.length>0){
      return !(this.selectedAssetList.findIndex(data => data.relocateStatus === allAssetTransferStatus.RELOCATION_APPROVED || data.relocateStatus === allAssetTransferStatus.RELOCATION_REJECTED || data.approvalId == 0) === -1);
    }
    else
      return true;
  }

viewOrEditTabOpen(event :number,mode: string){
  this.assetRelocation.relocateBatchNo = event;
  this.commonService.commonListService('listOfAllAssetRelocate.sams', this.assetRelocation).subscribe(
    data => {
      if (data.success) {
          this.selectedAssetList = data.responseData.dataList;
          this.viewAssets(mode);
      }
    })
}

  fetchListMethod() {

    this.selectedAssetList = [];
    this.enableActionBtn = true;

    this.subLoader = true;
    this.dataSource = [];
    this.commonService.commonListService('listOfAllAssetRelocate.sams', this.assetRelocation).subscribe(
      data => {
        if (data.success) {
          this.subLoader = false;
          this.length = data.responseData.dataTotalRecCount;
          this.dataSource = data.responseData.dataList;


        } else {
          this.subLoader = false;
        }
      }, error => {
        this.subLoader = false;
      }
    );
  }

  relocation;
  viewAssets(mode) {
    //open model add popup
    this.relocation = this.dialog.open(AssetRelocationApproveRejectComponent, {
      height: '600px',
      width: '90%',
      data: {
        'batchNo': this.selectedAssetList[0].relocateBatchNo,
        'locId': this.selectedAssetList[0].locationId,
        'sourceLocName': this.selectedAssetList[0].sourceLocName,
        'sourceDept': this.selectedAssetList[0].sourceDepName,
        'sourceSubDept': this.selectedAssetList[0].sourceSubDepName,
        'relocateLocation': this.selectedAssetList[0].relocateLocName,
        'relocateDept':this.selectedAssetList[0].relocateDepName,
        'relocateSubDept':this.selectedAssetList[0].relocateSubDepName,
        'mode': mode,
        'relocateDeptId' : this.selectedAssetList[0].relocateDepId,
        'approvalStatus' : this.selectedAssetList[0].approvalStatus
      }
    });
    this.relocation.disableClose = true;
    this.relocation.afterClosed().subscribe(
      data => {
        this.ngOnInit();
      });
  }

  ngOnDestroy(): void {
    if (this.relocation != null) this.relocation.disableClose = true;
  }

  loadLocationComboData(searchValue,event) {
    if (event) {
      this.scrollsyncLocation = true;
    }else if(!event){
      this.scrollsyncLocationRelocate = true;
    }
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllUserLocForCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.locationPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.locationPageNumber , this.locationCombo , data.responseData.comboList)
          this.locationPageNumber = this.getData.pageNumber;
          this.locationCombo = this.getData.dataList;
          this.scrollsyncLocation = false;
          this.scrollsyncLocationRelocate = false;
        }
      );
  }

  selectedLocationData(event) {
    if (event === undefined) {
      this.assetRelocation.sourceLocId = 0;
      this.assetRelocation.sourceLocName = null;
      this.locationPageNumber = 1;
      this.locationCombo = [];
    } else {
      this.assetRelocation.sourceLocId = event.locationId;
      this.assetRelocation.sourceLocName = event.locDisplayField;
    }
  }

  selectedLocationDataDestination(event) {
    if (event === undefined) {
      this.assetRelocation.relocateLocId = 0;
      this.assetRelocation.relocateLocName = null;
      this.locationPageNumber = 1;
      this.locationCombo = [];
    } else {
      this.assetRelocation.relocateLocId = event.locationId;
      this.assetRelocation.relocateLocName = event.locDisplayField;
    }
  }

  loadDepartmentComboData(searchValue,event) {
    if (event) {
      this.scrollsyncDepartment = true;
    }else if(!event){
      this.scrollsyncDepartmentRelocate = true;
    }
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllDeparment.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.departmentPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.departmentPageNumber , this.departmentComboList , data.responseData.comboList)
          this.departmentPageNumber = this.getData.pageNumber;
          this.departmentComboList = this.getData.dataList;
          this.scrollsyncDepartment = false;
          this.scrollsyncDepartmentRelocate = false;
        }
      );
  }

  selectedDepartmentDataRelocate(event) {
    if (event === undefined) {
      this.assetRelocation.relocateDepId = 0;
      this.assetRelocation.relocateDepName = null;
      this.assetRelocation.relocateSubDepId = 0;
      this.assetRelocation.relocateSubDepName = null;
      this.departmentPageNumber = 1;
      this.departmentComboList = [];
      this.subDepartmentPageNumber = 1;
      this.subDepartmentCombo = [];
    } else {
      this.assetRelocation.relocateDepId = event.departmentId;
      this.assetRelocation.relocateDepName = event.departmentName;
      this.assetRelocation.relocateSubDepId = 0;
      this.assetRelocation.relocateSubDepName = null;
      this.subDepartmentPageNumber = 1;
      this.subDepartmentCombo = [];
    }
  }

  selectedDepartmentData(event) {
    if (event === undefined) {
      this.assetRelocation.sourceDepId = 0;
      this.assetRelocation.sourceDepName = null;
      this.assetRelocation.sourceSubDepId = 0;
      this.assetRelocation.sourceSubDepName = null;
      this.departmentPageNumber = 1;
      this.departmentComboList = [];
      this.subDepartmentPageNumber = 1;
      this.subDepartmentCombo = [];
    } else {
      this.assetRelocation.sourceDepId = event.departmentId;
      this.assetRelocation.sourceDepName = event.departmentName;
      this.assetRelocation.sourceSubDepId = 0;
      this.assetRelocation.sourceSubDepName = null;
      this.subDepartmentPageNumber = 1;
      this.subDepartmentCombo = [];

    }
  }

  loadSubDepartmentComboData(searchValue) {
    this.scrollsyncSubDepartment = true;
    const sourceDepId = this.assetRelocation.sourceDepId;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllSubDeparment.sams', searchValue.term,
    sourceDepId > 0 ? sourceDepId : '', '',
      this.recordsPerPageForCombo, this.subDepartmentPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.subDepartmentPageNumber , this.subDepartmentCombo , data.responseData.comboList)
          this.subDepartmentPageNumber = this.getData.pageNumber;
          this.subDepartmentCombo = this.getData.dataList;
          this.scrollsyncSubDepartment = false;
        }
      );
  }

  loadSubDepartmentForRelocation(searchValue) {
    this.scrollsyncSubDepartmentRelocate = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllSubDeparment.sams', searchValue.term,
      this.assetRelocation.relocateDepId > 0 ? this.assetRelocation.relocateDepId : '', '',
      this.recordsPerPageForCombo, this.subDepartmentPageNumberRelocate).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.subDepartmentPageNumberRelocate , this.subDepartmentComboList , data.responseData.comboList)
          this.subDepartmentPageNumberRelocate = this.getData.pageNumber;
          this.subDepartmentComboList = this.getData.dataList;
          this.scrollsyncSubDepartmentRelocate = false;
        }
      );
  }

  selectedSubDepartmentData(event) {
    if (event === undefined) {
      this.assetRelocation.sourceSubDepId = 0;
      this.assetRelocation.sourceSubDepName = null;
      this.subDepartmentPageNumber = 1;
      this.subDepartmentCombo = [];
      this.subDepartmentPageNumberRelocate = 1;
      this.subDepartmentComboList = [];
    } else {
      this.assetRelocation.sourceSubDepId = event.subDepartmentId;
      this.assetRelocation.sourceSubDepName = event.subDepartmentName;
    }
  }

  selectedSubDepartmentDataRelocate(event) {
    if (event === undefined) {
      this.assetRelocation.relocateSubDepId = 0;
      this.assetRelocation.relocateSubDepName = null;
      this.subDepartmentPageNumber = 1;
      this.subDepartmentCombo = [];
    } else {
      this.assetRelocation.relocateSubDepId = event.subDepartmentId;
      this.assetRelocation.relocateSubDepName = event.subDepartmentName;
    }
  }

  searchSource() {
    this.fetchListMethod();
  }

  resetSourceDestination() {
    this.assetRelocation = new AssetRelocationModel();
    this.fetchListMethod();
  }

  transferWorkflowApproval(status){

    let relocationList = [];
    for(let i=0;i<this.selectedAssetList.length;i++){

      let relocationObj = {
        approvalId: this.selectedAssetList[i].approvalId,
        batchNo: this.selectedAssetList[i].relocateBatchNo,
        locId: this.selectedAssetList[i].locationId,
        relocateDeptId: this.selectedAssetList[i].relocateDepId
      }

      relocationList.push(relocationObj)
    }

    if(relocationList.length>0){
      let asd;
      if(status){
        asd = this.commonService.commonWorkflowService(allWorkflowStatus[allWorkflowStatus.ASSET_RELOCATION], relocationList," Selected Asset Relocate Request ");
      }
      else{
        asd = this.commonService.rejectApprove(allWorkflowStatus[allWorkflowStatus.ASSET_RELOCATION],relocationList," Selected Asset Relocate Request ");
      }

      asd.then(data=>{
        if(data){
          this.dataSource = [];
           this.ngOnInit();
        }
      })
    }
  }


  loadStatusComboData(searchValue) {
    this.scrollsyncRelocateStatus = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllMasterStatusCombo.sams', searchValue.term, processList.ASSET_TRANSFER, '',
      this.recordsPerPageForCombo, this.relocateStatusPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.relocateStatusPageNumber , this.relocateStatusCombo , data.responseData.comboList)
          this.relocateStatusPageNumber = this.getData.pageNumber;
          this.relocateStatusCombo = this.getData.dataList;
          this.scrollsyncRelocateStatus = false;
        }
      );
  }

  selectedRelocateStatus(event){
    if(event === undefined){
      this.assetRelocation.relocateStatus=0;
      this.assetRelocation.relocateStatusName = null;
      this.relocateStatusPageNumber = 1;
      this.relocateStatusCombo = [];
    }else{
      this.translateService.get([event.processStatusName])
      .subscribe((val) => {
        const status = Object.values(val)
        if(status.length > 0){
          this.assetRelocation.relocateStatusName = status[0].toString();
        }
      });
      this.assetRelocation.relocateStatus=event.processStatusId;
    }
  }

  createAssetTransfer(mode) {
    this.router.navigate(['home/asset/assetRelocation/'+ 0 + '/' + mode]);
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
    this.commonService.commonInsertService(this.samsService.saveOrUpdateUserPreference, this.userPreference).subscribe(
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
            this.assetRelocation = JSON.parse(this.userPreference.customFilters);
          }
          resolve(true);
        }
      )
    });
    return userPreferenceInfo;
    
  }
  
  applyPreferredFilters() {
    //SAVE TO USER PREFERENCE TABLE
    this.userPreference.customFilters = JSON.stringify(this.assetRelocation);
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

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

}
