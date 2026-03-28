import { Component, OnInit } from '@angular/core';
import { GatePassHdrModel } from 'src/app/Model/asset/gatePassHdr';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { Title } from '@angular/platform-browser';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { getData } from 'src/app/Model/common/fetchListData';
import { allGatePassStatus, allWorkflowStatus } from 'src/app/Constants/AllStatusConstants';
import { processList } from 'src/app/Constants/ProcessList';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { UserPrefernce } from 'src/app/Services/user-preference/user-preference';

@Component({
  selector: 'app-gate-pass-list',
  templateUrl: './gate-pass-list.component.html',
  styleUrls: ['./gate-pass-list.component.css']
})
export class GatePassListComponent implements OnInit {

  public gatePassHdrModel: GatePassHdrModel;
  moduleAccessModel: ModuleAccessModel;

  //For Pagination
  length = '0';     //set total record count here
  pageIndex: string;  //set page number starts with zeroo
  pageSize: string;   // records per page

  scrollsyncLocation: boolean = false;
  locationPageNumber: number = 0;
  locationCombo: any = [];

  //Set Page Title
  title = 'Asset Optima - Gate Pass';

  subLoader: boolean = false;

  defaultColumns = ['select', 'sno', 'locationName', 'gatePassNo', 'gatePassPurpose', 'gatePassStatusId', 'woApprovalStatus', 'deliveryTo','createdBy', 'updatedBy'];
  displayedColumns = [...this.defaultColumns];

  gatePassDataSource = [];
  scrollsyncAssetGroup: boolean = false;
  recordsPerPageForCombo: string = '0';
  assetGroupPageNumber: number = 0;
  assetGroup: any = [];
  exceedsCurrentDate: boolean = false;
  disableNextAndPrevButton: boolean = false;
  currentDate :Date= new Date();
  hideNextPrevButtons =false;

  durataionOptions = [
    { id: 1, duration: 'WEEKLY' },
    { id: 2, duration: 'MONTHLY' },
    { id: 3, duration: 'YEARLY' }
  ]
  getData: getData;
  selectedItem: any=0;
  scrollsyncGatePassStatus: boolean= false;
  GatePassStatusPageNumber: number= 1;
  GatePassStatusCombo: any=[];

  enableActionBtn: boolean=true;
  selectAllGP: boolean = false;

  //USER PREFERENCE
  public userPreference: UserPrefernce;
  showManageColumns: boolean = false;

  constructor(private commonService: CommonService,
    private router: Router,
    public route: ActivatedRoute,
    private assetOptimaServices: AssetOptimaServices,
    private titleService: Title,
    private userSessionService: UserSessionService,
    private translateService: TranslateService,
    private assetOptimaConstants: AssetOptimaConstants) {

    this.moduleAccessModel = new ModuleAccessModel();
    this.gatePassHdrModel = new GatePassHdrModel();
    this.pageSize = '100';
    this.pageIndex = '0';
    this.assetGroupPageNumber = 1;
    this.locationPageNumber = 1;
    this.GatePassStatusPageNumber=1;
    this.assetCodePageNumber=1;

    this.showManageColumns = false;
    this.userPreference = new UserPrefernce();
  }

  ngOnInit() {
    this.moduleAccessModel = this.userSessionService.getUserGroupAccess()['GROUPACCESS_GATE_PASS'];
    this.titleService.setTitle(this.title);

    this.hideNextPrevButtons=true;
    this.gatePassHdrModel.locationId=this.userSessionService.getUserLocationId();
    this.gatePassHdrModel.locationName=this.userSessionService.getUserLocationName();
    // this.fetchList();
    // this.selectedGatepassList = [];
    // this.enableActionBtn = true;
    // this.gatePassDataSource = [];

    
    this.gatePassHdrModel.direction = 'desc';
    this.gatePassHdrModel.columnName = 'updatedDt';

    this.userPreference.moduleKey = 'GROUPACCESS_GATE_PASS';
    // this.getUserPreferenceInfo();

    let userPreferenceData = this.getUserPreferenceInfo();
    userPreferenceData.then((response) => {
      console.log("USER INSIDE");
      this.fetchList();
      this.adjustTableWidth();
      this.selectedGatepassList = [];
      this.enableActionBtn = true;
      this.gatePassDataSource = [];
    })
  }

  createGatePass(mode) {
    this.router.navigate(['home/asset/gatePassCreate/' + 0 + '/' + mode]);
    localStorage.setItem('gatePassSource', '');
  }

  editGatePass(mode) {
    this.router.navigate(['home/asset/gatePassCreate/' + this.selectedGatepassList[0].gatePassHdrId + '/' + mode]);
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchList();
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  customSort(event) {
    this.gatePassHdrModel.pageNumber = 0;
    this.gatePassHdrModel.columnName = event.active;
    this.gatePassHdrModel.direction = event.direction;
    this.fetchList();
  }

  searchGatePass() {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
    this.selectedItem=0;

    this.applyPreferredFilters();
  }

  clear() {

    this.gatePassHdrModel.assetGroupId = 0;
    this.gatePassHdrModel.assetGroupName = '';
    this.gatePassHdrModel.assetCode = '';
    this.gatePassHdrModel.assetId = 0;
    
    this.assetCodeCombo = [];
    this.assetGroup = [];
    this.applyPreferredFilters();
    
    this.gatePassHdrModel = new GatePassHdrModel();
    this.ngOnInit();
    this.selectedItem=0;
  }

  fetchList() {
    this.gatePassHdrModel.pageNumber = Number(this.pageIndex);
    this.gatePassHdrModel.recordsPerPage = Number(this.pageSize);
    this.subLoader = true;
    this.gatePassDataSource = [];
    this.commonService.commonListService('fetchListOfAllGatePass.sams', this.gatePassHdrModel).subscribe(
      data => {
        if (data.success) {
          this.subLoader = false;
          this.length = data.responseData.dataTotalRecCount;
          this.gatePassDataSource = data.responseData.dataList;

        } else {
          this.subLoader = false;
        }
      }, error => {
        this.subLoader = false;
      }
    );
  }

  generateGatePassPDF() {
    if (this.selectedGatepassList[0].gatePassStatusId === allGatePassStatus.GATE_PASS_APPROVED || this.selectedGatepassList[0].gatePassStatusId === allGatePassStatus.GATE_PASS_REJECTED ) {
      this.commonService.commonGetService('generateGatePassPDF.sams', this.selectedGatepassList[0].gatePassHdrId).subscribe(
        data => {
          if (data.success) {
            this.downloadDocument(data.responseData, 'application/pdf');
          } else {
            this.commonService.openToastErrorMessage('Error Occurred While Downloading The "Gate Pass PDF".')
          }
        }, error => {
        }
      );
    }else{
      this.commonService.openToastWarningMessage("Please Approve/Reject The Gate Pass To Download The PDF.")
    }

  }

  downloadDocument(filePath: string, contentType) {
    this.commonService.showSpinner();
    const fileName = filePath.split('.')[0];
    this.commonService.downloadFile(filePath, contentType).subscribe(
      data => {
        this.commonService.showDownloadPopUpPDF(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
      }
    );
    this.commonService.hideSpinner();
  }

  getGatePassApprovalStatus() {
    if (this.assetOptimaConstants.assetGatePassApproval)
      return true;
    else
      return false;
  }

  listOfAllAssetGroup(searchKey) {
    this.scrollsyncAssetGroup = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllAssetGroupCombo, searchKey.term, '', '',
      this.recordsPerPageForCombo, this.assetGroupPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchKey, this.assetGroupPageNumber , this.assetGroup , data.responseData.comboList)
          this.assetGroupPageNumber = this.getData.pageNumber;
          this.assetGroup = this.getData.dataList;
          this.scrollsyncAssetGroup = false;
        });
  }

  getAssetGroupComboValue(event) {
    if (event != null) {
      this.gatePassHdrModel.assetGroupName = event.assetGroupName;
      this.gatePassHdrModel.assetGroupId = event.assetGroupId;
    } else {
      this.gatePassHdrModel.assetGroupName = "";
      this.gatePassHdrModel.assetGroupId = 0;
      this.assetGroup = [];
      this.assetGroupPageNumber = 1;
    }
  }

  generateGatePassReport() {
    this.gatePassHdrModel.recordsPerPage = 0;
    this.commonService.commonListService('generateGatePassReport.sams', this.gatePassHdrModel).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      }, error => {
      }
    );
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
      this.gatePassHdrModel.locationName = '';
      this.gatePassHdrModel.locationId = 0;
    } else {
      this.gatePassHdrModel.locationName = event.locDisplayField;
      this.gatePassHdrModel.locationId = event.locationId;
    }
  }

  slecetedDuration(event) {
    if (event !== undefined) {
      //MONTHLY
      this.gatePassHdrModel.duration = event.duration;
      if (event.id === 1) {
        const currentDate = new Date;
        //week first date
        const firstWeekday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
        //week last date
        const lastWeekday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()+6));
        if (firstWeekday >= new Date()) {
          this.exceedsCurrentDate = true;
          this.gatePassHdrModel.createdDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(this.gatePassHdrModel.createdDtDisp);
          this.gatePassHdrModel.updatedDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(this.gatePassHdrModel.updatedDtDisp);
        } else if (lastWeekday >= new Date()) {
          this.exceedsCurrentDate = true;
          this.gatePassHdrModel.createdDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(firstWeekday);
          this.gatePassHdrModel.updatedDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(new Date());

        } else {
          this.exceedsCurrentDate = false;
          this.gatePassHdrModel.createdDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(firstWeekday);
          this.gatePassHdrModel.updatedDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(lastWeekday);
        }
      }
      //MONTHLY
      else if (event.id === 2) {
        const date = new Date();
        //get month frist date
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

        //month last date
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        //check whether last date exceeds current date
        if (lastDay > new Date()) {
          //next button should be disabled if last day exceed current date
          this.exceedsCurrentDate = true;
          this.gatePassHdrModel.createdDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(firstDay);
          this.gatePassHdrModel.updatedDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(new Date());
        } else {
          this.exceedsCurrentDate = false;
          this.gatePassHdrModel.createdDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(firstDay);
          this.gatePassHdrModel.updatedDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(lastDay);
        }
      } else {
        //YEARLY
        const d = new Date(new Date().getFullYear(), 0, 1);
        this.exceedsCurrentDate = true;

        this.gatePassHdrModel.createdDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(d);
        this.gatePassHdrModel.updatedDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(new Date())
      }

      this.hideNextPrevButtons= false;
    } else {
      this.gatePassHdrModel.duration = '';
      this.hideNextPrevButtons=true;
    }
  }

  getToDate(event) {
    if(event.value){
      this.gatePassHdrModel.updatedDtDisp = moment(event.value).format(this.assetOptimaConstants.ISODate);
    }
    else{
      this.gatePassHdrModel.updatedDtDisp = "";
    }
  }

  getFromDate(event) {
    if(event.value){
      this.gatePassHdrModel.createdDtDisp = moment(event.value).format(this.assetOptimaConstants.ISODate);
    }
    else{
      this.gatePassHdrModel.createdDtDisp = "";
    }
   }

  startOfWeek(date) {
    const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    return new Date(date.setDate(diff));

  }

  changeToPreviousDate(event) {
    let currentFromDate = new Date(this.gatePassHdrModel.createdDtDisp);
    let currentToDate = new Date(this.gatePassHdrModel.updatedDtDisp);

    if (this.gatePassHdrModel.duration === 'WEEKLY') {

      currentFromDate.setDate(currentFromDate.getDate() - (currentFromDate.getDay() + 6) % 7);
      const firstWeekday = new Date(currentFromDate.setDate(currentFromDate.getDate() - currentFromDate.getDay()));
      const lastWeekday = new Date(currentFromDate.setDate(currentFromDate.getDate() - currentFromDate.getDay() + 6));
      if (firstWeekday >= new Date()) {
        this.exceedsCurrentDate = true;
        this.gatePassHdrModel.createdDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(this.gatePassHdrModel.createdDtDisp);
        this.gatePassHdrModel.updatedDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(this.gatePassHdrModel.updatedDtDisp);
      } else if (lastWeekday >= new Date()) {
        this.exceedsCurrentDate = true;
        this.gatePassHdrModel.createdDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(firstWeekday);
        this.gatePassHdrModel.updatedDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(new Date());

      } else {
        this.exceedsCurrentDate = false;
        this.gatePassHdrModel.createdDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(firstWeekday);
        this.gatePassHdrModel.updatedDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(lastWeekday);
      }
    } else if (this.gatePassHdrModel.duration === 'MONTHLY') {
      const firstDay = new Date(currentFromDate.getFullYear(), currentFromDate.getMonth() - 1, 1);
      const lastDay = new Date(currentFromDate.getFullYear(), (currentFromDate.getMonth() - 1) + 1, 0);

      if (lastDay >= new Date()) {
        this.exceedsCurrentDate = true;
        this.gatePassHdrModel.createdDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(firstDay);
        this.gatePassHdrModel.updatedDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(new Date())
      } else {
        this.exceedsCurrentDate = false;
        this.gatePassHdrModel.createdDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(firstDay);
        this.gatePassHdrModel.updatedDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(lastDay);
      }

    } else {

      const pastYear = currentFromDate.getFullYear() - 1;
      currentFromDate.setFullYear(pastYear);
      currentToDate.setFullYear(pastYear);
      currentFromDate = new Date(currentFromDate.getFullYear(), 0, 1);
      currentToDate = new Date(currentFromDate.getFullYear(), 11, 31)
      if (currentToDate < new Date()) {
        this.exceedsCurrentDate = false;
      }
      this.gatePassHdrModel.createdDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(currentFromDate);
      this.gatePassHdrModel.updatedDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(currentToDate)


    }
  }

  changeToNextDate(event) {
    let currentToDate = new Date(this.gatePassHdrModel.updatedDtDisp);
    let currentFromDate = new Date(this.gatePassHdrModel.createdDtDisp);

    if (this.gatePassHdrModel.duration === 'WEEKLY') {

      currentToDate.setDate(currentToDate.getDate() + (1 + 7 - currentToDate.getDay()) % 7);
      const firstWeekday = new Date(currentToDate.setDate(currentToDate.getDate() - currentToDate.getDay()));
      const lastWeekday = new Date(currentToDate.setDate(currentToDate.getDate() - currentToDate.getDay() + 6));
      if (firstWeekday >= new Date()) {
        this.exceedsCurrentDate = true;
        this.gatePassHdrModel.createdDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(this.gatePassHdrModel.createdDtDisp);
        this.gatePassHdrModel.updatedDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(this.gatePassHdrModel.updatedDtDisp);
      } else if (lastWeekday >= new Date()) {
        this.exceedsCurrentDate = true;
        this.gatePassHdrModel.createdDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(firstWeekday);
        this.gatePassHdrModel.updatedDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(new Date());
      } else {
        this.exceedsCurrentDate = false;
        this.gatePassHdrModel.createdDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(firstWeekday);
        this.gatePassHdrModel.updatedDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(lastWeekday);
      }
    } else if (this.gatePassHdrModel.duration === 'MONTHLY') {
      const firstDay = new Date(currentFromDate.getFullYear(), currentFromDate.getMonth() + 1, 1);
      const lastDay = new Date(currentFromDate.getFullYear(), (currentFromDate.getMonth() + 1) + 1, 0);
      if (lastDay >= new Date()) {
        this.exceedsCurrentDate = true;
        this.gatePassHdrModel.createdDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(firstDay);
        this.gatePassHdrModel.updatedDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(new Date())
      } else {
        this.exceedsCurrentDate = false;
        this.gatePassHdrModel.createdDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(firstDay);
        this.gatePassHdrModel.updatedDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(lastDay);
      }

    } else {
      const pastYear = currentFromDate.getFullYear() + 1;
      currentFromDate.setFullYear(pastYear);
      currentToDate.setFullYear(pastYear);
      currentFromDate = new Date(currentFromDate.getFullYear(), 0, 1);
      currentToDate = new Date(currentFromDate.getFullYear(), 11, 31)
      if (currentToDate > new Date()) {
        this.exceedsCurrentDate = true;
        this.gatePassHdrModel.createdDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(currentFromDate);
        this.gatePassHdrModel.updatedDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(new Date())

      } else {
        this.gatePassHdrModel.createdDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(currentFromDate);
        this.gatePassHdrModel.updatedDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(currentToDate)
      }


    }
  }

  selectedGatepassList=[];
  selectGatePass(element){
    const gatepasstId = this.selectedGatepassList.findIndex(data => data.gatePassHdrId === element.gatePassHdrId);

    this.enableActionBtn = false;
    if(gatepasstId === -1){
      this.selectedGatepassList.push(element);
    }else{
      this.selectedGatepassList.splice(gatepasstId,1);
    }

    if(this.selectedGatepassList.length === 1){
      this.enableActionBtn = false;
    }
    else{
      this.enableActionBtn = true;
    }
  }

  selectAllGatepass(event){
    this.selectedGatepassList = event.checked;
    this.enableActionBtn = false;

    if(event.checked){
      this.selectedGatepassList = this.gatePassDataSource;
    }
    else{
      this.selectedGatepassList = [];
    }

    if(this.selectedGatepassList.length === 1){
      this.enableActionBtn = false;
    }
    else{
      this.enableActionBtn = true;
    }
  }

  compareValue(element: any): boolean{
    return this.selectedGatepassList.findIndex(data => data.gatePassHdrId === element.gatePassHdrId) !== -1;
  }

  checkApprovalValid(){
    if(this.selectedGatepassList.length>0){
      return !(this.selectedGatepassList.findIndex(data => data.relocateStatus === allGatePassStatus.GATE_PASS_APPROVED || data.relocateStatus === allGatePassStatus.GATE_PASS_REJECTED || data.approvalId == 0) === -1);
    }
    else
      return true;
  }

  gatepassWorkflowApproval(status){
    let result;
    if(status){
      result = this.commonService.commonWorkflowService(allWorkflowStatus[allWorkflowStatus.GATE_PASS], this.selectedGatepassList," Selected Gate Pass ");
    }
    else{
      result = this.commonService.rejectApprove(allWorkflowStatus[allWorkflowStatus.GATE_PASS],this.selectedGatepassList," Selected Gate Pass ");
    }

    result.then(data=>{
      if(data){
        this.gatePassDataSource = [];
         this.ngOnInit();
      }
    })
  }

  loadStatusComboData(searchValue) {
    this.scrollsyncGatePassStatus = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllMasterStatusCombo.sams', searchValue.term, processList.ASSET_GATE_PASS, '',
      this.recordsPerPageForCombo, this.GatePassStatusPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.GatePassStatusPageNumber , this.GatePassStatusCombo , data.responseData.comboList)
          this.GatePassStatusPageNumber = this.getData.pageNumber;
          this.GatePassStatusCombo = this.getData.dataList;
          this.scrollsyncGatePassStatus = false;
        }
      );
  }

  selectedGatePassStatus(event){
    if(event === undefined){
      this.gatePassHdrModel.gatePassStatusId=0;
      this.gatePassHdrModel.gatePassStatus = '';
      this.GatePassStatusPageNumber = 1;
      this.GatePassStatusCombo = [];
    }else{
      this.translateService.get([event.processStatusName])
      .subscribe((val) => {
        const status = Object.values(val)
        if(status.length > 0){
          this.gatePassHdrModel.gatePassStatus = status[0].toString();
        }
      });
      this.gatePassHdrModel.gatePassStatusId=event.processStatusId;
    }
  }

  disableEdit(){
    if(this.selectedGatepassList.length>0){
      return !(this.selectedGatepassList.findIndex(data => (data.gatePassStatusId == allGatePassStatus.GATE_PASS_REJECTED)) === -1);
    }
    else
      return true;
  }

  toggleColumn(column: string): void {
    const index = this.displayedColumns.indexOf(column);
    if (index >= 0) {
      this.displayedColumns.splice(index, 1); // Column is selected, remove it
    } else {
      this.displayedColumns.push(column); // Column is not selected, add it
    }

    this.adjustTableWidth();
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

    this.adjustTableWidth();
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
            this.gatePassHdrModel = JSON.parse(this.userPreference.customFilters);
          }
          resolve(true);
        }
      )
    });
    return userPreferenceInfo;
    
  }
  
  applyPreferredFilters() {
    //SAVE TO USER PREFERENCE TABLE
    this.userPreference.customFilters = JSON.stringify(this.gatePassHdrModel);
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
  
  // for dynamica table alignment
  adjustTableWidth() {

    if(this.displayedColumns.length > 12){
      document.getElementById("gatePassTable").style.minWidth = "150%";
    }else{
      document.getElementById("gatePassTable").style.minWidth = "100%";
    }

  }

  scrollsyncAssetCode: boolean = false;
  assetCodePageNumber: number;
  assetCodeCombo: any = [];
  
  loadAssetCodeComboData(searchValue) {
    console.log("Search Value : ",searchValue)
    this.scrollsyncAssetCode = true;
    const locIds = '';
    const departmentIds = '';

    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';

    console.log("this.recordsPerPageForCombo : ",this.recordsPerPageForCombo)
    this.commonService.getComboResults('listAllAssetCodeCombo.sams', searchValue.term, '',
      '', this.recordsPerPageForCombo, this.assetCodePageNumber, '', '', '', '', locIds, departmentIds).subscribe(
        (data) => {
          if (data.success) {
            this.getData = new getData();
            this.getData = this.commonService.fetchDataList(searchValue, this.assetCodePageNumber, this.assetCodeCombo, data.responseData.comboList)
            this.assetCodePageNumber = this.getData.pageNumber;
            this.assetCodeCombo = this.getData.dataList;
          }

          this.scrollsyncAssetCode = false;
        }
      );
  }

  selectedAssetCodeData(event) {

    if (event === undefined || event.length <= 0) {
      this.gatePassHdrModel.assetCode = '';
      this.assetCodePageNumber = 1;
      this.assetCodeCombo = [];

    } else {
      this.gatePassHdrModel.assetCode = event.assetCode;
      this.gatePassHdrModel.assetId = event.assetHdrId;
    }
  }

}
