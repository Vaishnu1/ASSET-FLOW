import { Component, OnInit } from '@angular/core';
import { MaintenanceScheduleHdrModel } from 'src/app/Model/maintenance/maintenanceScheduleHdr';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { getData } from 'src/app/Model/common/fetchListData';
import { UserPrefernce } from 'src/app/Services/user-preference/user-preference';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
@Component({
  selector: 'app-maintenance-schedule-list',
  templateUrl: './maintenance-schedule-list.component.html',
  styleUrls: ['./maintenance-schedule-list.component.css']
})
export class MaintenanceScheduleListComponent implements OnInit {

  defaultColumns = ['select','sNo','locationName','scheduleTitle', 'scheduleType','priority','frequency',
                      'totalAsset','occurances','active','createdBy','updatedDt'];
  displayedColumns = [...this.defaultColumns];
  

  maintenanceScheduleDataSource = []; 

  public scheduleHdrModel : MaintenanceScheduleHdrModel;
  subLoader : boolean = false;

  scrollPrioritysync : boolean = false;
  scrollsyncAssetCode:boolean=false;
  priorityPageNumber : number;
  assetCodePageNumber:number;
  priorityCombo: any = [];
  assetCodeCombo: any = [];
  limitCount:any;

  scrollfrequencySync : boolean = false;
  frequencyPageNumber : number;
  frequencyCombo: any = [];
 
  title = 'Asset Optima - Schedule Maintenance';

  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page
  modelAccessModule: ModuleAccessModel;
  getData: getData;

  selectedItem: any = 0;

  locationCombo: any = [];
  locationPageNumber: number;
  scrollsyncLocation: boolean = false;
  recordsPerPageForCombo: string;

  srTypeCombo: any = [];
  scrollsyncSrType: boolean = false;
  srTypePageNumber: number;

  //USER PREFERENCE
  public userPreference: UserPrefernce;
  showManageColumns: boolean = false;
  
  constructor(private commonService:CommonService,
    private readonly userSession: UserSessionService,
              private readonly router:Router,
              private readonly titleService: Title,
              public assetOptimaServices: AssetOptimaServices) { 
    this.scheduleHdrModel = new MaintenanceScheduleHdrModel();
    this.pageSize = '100';
    this.pageIndex = '0';
    this.priorityPageNumber = 1;
    this.assetCodePageNumber = 1;
    this.locationPageNumber = 1;
    this.modelAccessModule = new ModuleAccessModel();
    this.srTypePageNumber = 1;
    this.frequencyPageNumber = 1;

    this.showManageColumns = false;
    this.userPreference = new UserPrefernce();
  }

  ngOnInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_SCHEDULE_MAINTENANCE'];
    this.titleService.setTitle(this.title);

    this.scheduleHdrModel.locationName = this.userSession.getUserLocationName();
    this.scheduleHdrModel.locationId = this.userSession.getUserLocationId();
    // this.fetchList();

    this.scheduleHdrModel.direction = 'desc';
    this.scheduleHdrModel.columnName = 'updatedDt';
    this.userPreference.moduleKey = 'GROUPACCESS_SCHEDULE_MAINTENANCE';
    // this.getUserPreferenceInfo();

    let userPreferenceData = this.getUserPreferenceInfo();
    userPreferenceData.then((response) => {
      this.fetchList();
    })
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchList();
  }
  customSort(event) {
    this.scheduleHdrModel.pageNumber = 0;
    this.scheduleHdrModel.columnName = event.active;
    this.scheduleHdrModel.direction = event.direction;
    this.fetchList();
  }

  fetchList(){    
    if(this.scheduleHdrModel.startDateDisp != null){
      this.scheduleHdrModel.startDateDisp=this.commonService.convertToDateStringyyyy_mm_dd(this.scheduleHdrModel.startDateDisp);
    }
    if(this.scheduleHdrModel.startDateDisp != null){
      this.scheduleHdrModel.endDateDisp=this.commonService.convertToDateStringyyyy_mm_dd(this.scheduleHdrModel.endDateDisp);
    }

    this.scheduleHdrModel.pageNumber = Number(this.pageIndex);
    this.scheduleHdrModel.recordsPerPage = Number(this.pageSize);    
    this.maintenanceScheduleDataSource=[];
    this.subLoader =true;
    this.commonService.commonListService('listOfSchedulesV1.sams',this.scheduleHdrModel).subscribe(
      data => {
        if(data.success){
          this.maintenanceScheduleDataSource = data.responseData.dataList;  
          this.length = data.responseData.dataTotalRecCount;
          this.subLoader =false;
        }else{
          this.subLoader =false;
        }
      },error =>{
        this.subLoader =false;  
      }
    );
  }

  searchMaintenance(){
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
    this.applyPreferredFilters();
    this.selectedItem = 0;
  }

  clear(){
    this.scheduleHdrModel = new MaintenanceScheduleHdrModel();
    this.ngOnInit();
    this.selectedItem = 0;
  }


  createMaintenanceSchedule(scheduleHdrId,mode){
    this.commonService.showSpinner();
    this.router.navigate(['home/serviceRequest/maintenanceScheduleCreate/'+scheduleHdrId + '/' + mode]);
    localStorage.setItem('assetIdForScheduling','0');
    localStorage.setItem('sourceScreen','SCHEDULING');
    this.commonService.hideSpinner();
  }

  scheduleTypeList = [
    // { scheduleType: 'DAILY ROUNDS'},
    { scheduleType: 'PREVENTIVE MAINTENANCE'},
    { scheduleType: 'PERFORMANCE ASSURANCE'},
    { scheduleType: 'QUALITY ASSURANCE'},
    { scheduleType: 'DAILY ROUNDS'}
  ];

  scheduleFrequencyList = [
    { frequency :'ANNUALLY'},
    // { frequency :'TRIANNUAL'},
    { frequency :'QUARTERLY'},
    { frequency :'MONTHLY'},
    { frequency :'DAILY'},
    { frequency :'WEEKLY'},
    { frequency :'SPECIFIC DATE'},
    // { frequency :'TWO YEARS ONCE'}
  ]

  dateValidation(event){
    return false;
  }

  loadPriorityComboData(searchValue) {
    this.scrollPrioritysync=true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllPriorityForCombo.sams',searchValue.term,'','',
            this.limitCount,this.priorityPageNumber).subscribe(
      (data)=>{
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.priorityPageNumber , this.priorityCombo , data.responseData.comboList)
        this.priorityPageNumber = this.getData.pageNumber;
        this.priorityCombo = this.getData.dataList;
        this.scrollPrioritysync = false;
     }
    );
  }

  setPriorityNameComboValue(event){
    if (event === undefined) {
      this.scheduleHdrModel.priority='';
      this.priorityCombo = [];
      this.priorityPageNumber = 1;
    } else {
      this.scheduleHdrModel.priority=event.priorityName;
    }
  }

  frequencyComboData(searchValue) {
    this.scrollfrequencySync=true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllSrScheduleFrequencyForCombo.sams',searchValue.term,'','',
            this.limitCount,this.frequencyPageNumber).subscribe(
      (data)=>{
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.frequencyPageNumber , this.frequencyCombo , data.responseData.comboList)
        this.frequencyPageNumber = this.getData.pageNumber;
        this.frequencyCombo = this.getData.dataList;
        this.scrollfrequencySync = false;
     }
    );
  }

  // loadAssetCodeComboData(searchValue) {
  //   this.scrollsyncAssetCode=true;
  //   this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
  //   this.commonService.getComboResults('listAllAssetCodeCombo.sams',searchValue.term,'' ,'',this.limitCount,this.assetCodePageNumber
  //                                      ,'0','').subscribe(
  //     (data)=>{
  //       this.getData = new getData();
  //       this.getData = this.commonService.fetchDataList(searchValue, this.assetCodePageNumber , this.assetCodeCombo , data.responseData.comboList)
  //       this.assetCodePageNumber = this.getData.pageNumber;
  //       this.assetCodeCombo = this.getData.dataList;
  //       this.scrollsyncAssetCode = false;
  //    }
  //   );
  // }

  // selectedAssetCodeData(event) {
  //   if(event===undefined){
  //     this.scheduleHdrModel.assetHdrId=0;
  //     this.assetCodePageNumber=1;
  //     this.assetCodeCombo=[];
  //   }else{
  //     this.scheduleHdrModel.assetHdrId=event.assetHdrId;
  //   }
  // }

  
  selectAssets(element){
    if(this.selectedItem == element.scheduleHdrId){
      this.selectedItem = 0;
    }
    else{
      this.selectedItem = element.scheduleHdrId;
    }
  }

  loadLocationComboData(searchValue) {
    this.scrollsyncLocation = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllUserLocForCombo.sams', searchValue.term, '', '',
      this.limitCount, this.locationPageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.locationPageNumber === 1) {
              this.locationCombo = data.responseData.comboList;
            } else {
              this.locationCombo = this.locationCombo.concat(data.responseData.comboList);
            }data.responseData.comboList.length != 0 ? this.locationPageNumber += 1 : this.locationPageNumber = 1;
          } else {
            this.locationCombo = data.responseData.comboList;
            this.locationPageNumber = 1; 
          }
          this.scrollsyncLocation = false;
        }
      );
  }

  selectedLocationData(event) {
    
    if (event === undefined) {
      this.scheduleHdrModel.locationName = '';
      this.scheduleHdrModel.locationId = 0; 
      this.locationPageNumber = 1;
      this.locationCombo = []; 
    } else {
      this.scheduleHdrModel.locationName = event.locDisplayField;
      this.scheduleHdrModel.locationId = event.locationId; 
    }
    
  }

  loadAssetCodeComboData(searchValue) {
    this.scrollsyncAssetCode = true;
    const locId = this.scheduleHdrModel.locationId;
    const departmentId = 0;

    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetCodeComboSR.sams', searchValue.term,locId > 0 ? locId : 0,
    departmentId > 0 ? departmentId : 0, this.recordsPerPageForCombo, this.assetCodePageNumber, '', '').subscribe(
        (data) => {
          if (data.success) {
            this.getData = new getData();
            this.getData = this.commonService.fetchDataList(searchValue, this.assetCodePageNumber , this.assetCodeCombo , data.responseData.comboList)
            this.assetCodePageNumber = this.getData.pageNumber;
            this.assetCodeCombo = this.getData.dataList;
          }        
          this.scrollsyncAssetCode = false;
        }
      );
  }

  selectedAssetCodeData(event) {
  }

  generateScheduleMaintenanceReport() {
    if(this.selectedItem > 0){
      this.commonService.commonGetService('generateScheduleMaintenanceDetailsReport.sams', this.selectedItem).subscribe(
        (data) => {
          this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
        }, error => {
        }
      );
    } else{
      this.scheduleHdrModel.pageNumber = 0;
      this.scheduleHdrModel.recordsPerPage = 0;
      this.commonService.commonListService('generateScheduleMaintenanceSummaryReport.sams', this.scheduleHdrModel).subscribe(
        (data) => {
          this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
        }, error => {
        }
      );
    } 
  }

  loadSrTypeComboData(searchValue) {
    this.scrollsyncSrType = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllSrTypeCombo.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.srTypePageNumber,"Schedule Maintenance").subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.srTypePageNumber , this.srTypeCombo , data.responseData.comboList)
        this.srTypePageNumber = this.getData.pageNumber;
        this.srTypeCombo = this.getData.dataList;
        this.scrollsyncSrType = false;
      }
    );
  }

  selectedScheduleTypeData(event) {
    if(event === undefined){
      this.scheduleHdrModel.scheduleType = '';
      this.scheduleHdrModel.scheduleTypeName = '';
    }else{
      this.scheduleHdrModel.scheduleType = event.srId;
      this.scheduleHdrModel.scheduleTypeName = event.srTypeName;
    }
  }

  selectedfrequencyData(event){

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
            this.scheduleHdrModel = JSON.parse(this.userPreference.customFilters);
          }
          resolve(true);
        }
      )
    });
    return userPreferenceInfo;
    
  }
  
  applyPreferredFilters() {
    //SAVE TO USER PREFERENCE TABLE
    this.userPreference.customFilters = JSON.stringify(this.scheduleHdrModel);
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
