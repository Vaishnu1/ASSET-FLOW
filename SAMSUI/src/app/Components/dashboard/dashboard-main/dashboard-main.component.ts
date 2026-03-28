import { Component, OnInit, NgZone } from '@angular/core';
import { CommonService } from '../../../Services/common-service/common.service';
import { AssetOptimaServices } from '../../../Constants/AssetOptimaServices';
import { AssetOptimaConstants } from '../../../Constants/AssetOptimaConstants';
import { MatDialog } from '@angular/material/dialog';
import { WinByCategoryComponent } from '../popUp/win-by-category/win-by-category.component';
import { Title } from '@angular/platform-browser';
import { ModuleAccessModel } from '../../../Model/base/moduleAccess';
import { UserSessionService } from '../../../Services/user-session-service/user-session.service';
import { DashBoardDurationComponent } from '../dash-board-duration/dash-board-duration.component';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css']
})
export class DashboardMainComponent implements OnInit {

  //Set Page Title
  title = 'Asset Optima - Dashboard';

  resetFormSubject: Subject<boolean> = new Subject<boolean>();


  public frame1Data = { 'locationId': 0, 'status': '', 'srStatus': '', 'srFunctionality': '', 'locationName': '' ,'locationList': '','theme': ''};
  currentMonth:String = "";
  currentYear:String = "";

  fromDateForOpen:any;
  toDateForOpen:any;
  fromDateForAll:any;
  toDateForAll:any;
  fromDateForPreventive:any;
  toDateForPreventive:any;
  fromDateForCalibration:any;
  toDateForCalibration:any;
  fromDateForSpareConsume:any;
  toDateForSpareConsume:any;

  completedDateForOpen: string;
  completedDateForAll: string;
  completedDateForPreventive: string;
  completedDateForCalibration: string;
  completedDateForSpareConsume: string;

  locationList:string;
  periodForOpen:string;
  periodForAll:string;
  periodForPreventive:string;
  periodForCalibration:string;
  periodForSpareConsume:string;

  toDisplay:string;
  allTillDateForOpen:string;
  allTillDateForAll:string;
  allTillDateForPreventive:string;
  allTillDateForCalibration:string;
  allTillDateForSpareConsumed:string;


  displayDate:any;
  displayAlltill:string;

  locationFormGroup: FormGroup;
  _Date = new Date;
  transactionSourceForAllWOType: string;
  transactionSourceForPrimitiveWOType: string;
  transactionSourceForCalibrationWOType: string;
  transactionSourceForConsumedWOType:string;
  transactionSourceForCategory:string;

  scrollLocationNamesync: boolean;
  locationNamePageNumber: number;
  locationCombo: any;
  limitCount: string;
  allBranch: string;

  branchComboDisplay: boolean;

  //PERMISSIONS
  modelAccessModuleAsset: ModuleAccessModel;
  modelAccessModuleBM:ModuleAccessModel
  modelAccessModuleBMAgeing:ModuleAccessModel
  modelAccessModuleMissedMaintenance:ModuleAccessModel
  modelAccessModuleBM3Months:ModuleAccessModel
  modelAccessWarrantyContract:ModuleAccessModel
  modelAccessRetireDispose:ModuleAccessModel
  modelAccessRentalLease:ModuleAccessModel
  modelAccessModuleAllWo: ModuleAccessModel
  moduleAccessModulePmWo : ModuleAccessModel
  moduleAccessModuleQAWo : ModuleAccessModel
  modelAccessModuleConsumedSpares: ModuleAccessModel
  modelAccessAssetCount: ModuleAccessModel

  allWorkOrder =  'GROUPACCESS_ALL_WORKORDER';
  pmWorkOrder = 'GROUPACCESS_PREVENTIVE_WORK_ORDER';
  calibrationWO = 'GROUPACCESS_CALIBRATION_WORK_ORDER';
  consumedSpares = 'GROUPACCESS_SPARES_CONSUMED';

  theme: string;

  constructor(private readonly zone: NgZone,
    private readonly commonService: CommonService,
    private readonly assetOptimaService: AssetOptimaServices,
    private readonly assetOptimaConstants: AssetOptimaConstants,
    private readonly dialog:MatDialog,
    private readonly titleService: Title,
    private readonly userSessionService: UserSessionService) {

      this.transactionSourceForAllWOType = "OPEN";
      this.transactionSourceForPrimitiveWOType = "PRIMITIVE";
      this.transactionSourceForCalibrationWOType = "CALIBRATION";
      this.transactionSourceForConsumedWOType = "CONSUMED";
      this.transactionSourceForCategory = "CATEGORY";
      this.scrollLocationNamesync = false;
      this.locationNamePageNumber = 1;
      this.locationCombo = [];
      this.limitCount = '';
      this.fromDateForOpen = "";
      this.toDateForOpen = "";
      this.fromDateForAll =  "";
      this.toDateForAll = "";
      this.fromDateForPreventive =  "";
      this.toDateForPreventive = "";
      this.fromDateForCalibration =  "";
      this.toDateForCalibration = "";
      this.fromDateForSpareConsume = "";
      this.toDateForSpareConsume = "";
      this.periodForOpen = "Till";
      this.periodForAll = "Till";
      this.periodForPreventive = "Till";
      this.periodForCalibration = "Till";
      this.periodForSpareConsume = "Till";
      this.allBranch = "All Branch";
      this.toDisplay = " to ";
      this.allTillDateForOpen = `(${this.commonService.convertToDateStringdd_mm_yyyy(this._Date)})`;
      this.allTillDateForAll = `(${this.commonService.convertToDateStringdd_mm_yyyy(this._Date)})`;
      this.allTillDateForPreventive =`(${this.commonService.convertToDateStringdd_mm_yyyy(this._Date)})` ;
      this.allTillDateForCalibration =`(${this.commonService.convertToDateStringdd_mm_yyyy(this._Date)})` ;
      this.allTillDateForSpareConsumed = `(${this.commonService.convertToDateStringdd_mm_yyyy(this._Date)})`;
      this.displayDate = `(${this.commonService.convertToDateStringdd_mm_yyyy(this._Date)})`;
      this.displayAlltill = "Till";
      this.branchComboDisplay = true;
      this.theme = localStorage.getItem('theme');
      this.commonService.getComboResults(this.assetOptimaService.listAllUserLocForCombo, '', '', '', this.limitCount, this.locationNamePageNumber).subscribe(
        (data) => {

          if (data.success) {

            this.locationList ="";
            for(const value of data.responseData.comboList){
               this.locationList= `${this.locationList} ${value.locationId.toString()},`;
            }
           this.locationList =  this.locationList.substring(0,this.locationList.length-1);

           if(this.locationList !== ""){
            this.frame1Data.locationList = this.locationList;
            this.frame1Data.locationId = -1;
            this.frame1Data.locationName = this.allBranch;
            this.resetFormSubject.next(true);
           }
          }
        });


  }

  public currencySymbol = this.assetOptimaConstants.baseCurrencySymbol;

  public activeAssetCount = { 'currentCount': 0, 'currentCountValue': 0, 'dataForMonth': '', 'addedCount': '',
                              'addedValue': '', 'desposalCount': '', 'desposalValue': '', 'currentValue': '',
                              'assetOwnedCount': '', 'assetRentalCount': '', 'assetTrialCount': '',
                              'criticalAssetCount': '', 'nonCriticalAssetCount': '' };

  public breakDownCount = { 'totalBreakDownCount': 0, 'totalBDCountCritical': 0, 'totalBDCountNonCritical': 0 };

  public breakDownAgeingCount = { 'oneDayCountOpen': 0, 'twoDayCountOpen': 0, 'threeDayCountOpen': 0, 'fourDayCountOpen': 0, 'fiveDayCountOpen': 0,
                                  'oneDayCountAck': 0, 'twoDayCountAck': 0, 'threeDayCountAck': 0, 'fourDayCountAck': 0, 'fiveDayCountAck': 0,
                                  'oneDayCountInp': 0, 'twoDayCountInp': 0, 'threeDayCountInp': 0, 'fourDayCountInp': 0, 'fiveDayCountInp': 0 };

  public warrantyContractExpCount = { 'warranty30Days': 0, 'warranty60Days': 0, 'warrantyAbove60Days': 0,
                                      'contract30Days': 0, 'contract60Days': 0, 'contractAbove60Days': 0 };

  public warrantyContractInfoCount = { 'onWarrantyCount': 0, 'offWarrantyCount': 0, 'onContractCount': 0,
                                       'amcContractCount': 0, 'cmcContractCount': 0 };

  public inActiveAssetCount = { 'repairCount': 0, 'repairCountValue': 0, 'disposedCount': 0, 'disposedValue': 0,
                                'retiredCount': 0, 'retiredValue': 0 };
  ngOnInit() {


    this.modelAccessModuleAsset = this.userSessionService.getUserGroupAccess()['GROUPACCESS_ASSET_INFO'];
    this.modelAccessModuleBM = this.userSessionService.getUserGroupAccess()['GROUPACCESS_OPEN_SERVICE_REQUEST'];
    this.modelAccessModuleBMAgeing = this.userSessionService.getUserGroupAccess()['GROUPACCESS_BREAKDOWN_AGEING'];
    this.modelAccessModuleMissedMaintenance= this.userSessionService.getUserGroupAccess()['GROUPACCESS_MISSED_MAINTENANCE_SCHEDULES'];
    this.modelAccessModuleBM3Months= this.userSessionService.getUserGroupAccess()['GROUPACCESS_BREAKDOWN_FOR_LAST_3_MONTHS'];
    this.modelAccessWarrantyContract= this.userSessionService.getUserGroupAccess()['GROUPACCESS_WARRANTY_EXTENDED_WARRANTY_CONTRACT_EXPIRING'];
    this.modelAccessRetireDispose= this.userSessionService.getUserGroupAccess()['GROUPACCESS_RETIRED_DISPOSED_COUNT_WITH_VALUE'];
    this.modelAccessRentalLease= this.userSessionService.getUserGroupAccess()['GROUPACCESS_RENTAL_LEASE_ASSET_COUNT_WITH_VALUE'];
    this.modelAccessAssetCount  =this.userSessionService.getUserGroupAccess()['GROUPACCESS_ASSET_COUNT_WITH_VALUE'];
    this.modelAccessModuleAllWo = this.userSessionService.getUserGroupAccess()[this.allWorkOrder];
    this.moduleAccessModulePmWo = this.userSessionService.getUserGroupAccess()[this.pmWorkOrder];
    this.moduleAccessModuleQAWo = this.userSessionService.getUserGroupAccess()[this.calibrationWO];
    this.modelAccessModuleConsumedSpares  =this.userSessionService.getUserGroupAccess()[this.consumedSpares];
    this.titleService.setTitle(this.title);

    if(this.modelAccessModuleAsset.readFlagDisplay === false &&
       this.modelAccessModuleBM.readFlagDisplay === false &&
       this.modelAccessModuleBMAgeing.readFlagDisplay === false &&
       this.modelAccessModuleMissedMaintenance.readFlagDisplay === false &&
       this.modelAccessModuleBM3Months.readFlagDisplay === false &&
       this.modelAccessWarrantyContract.readFlagDisplay === false &&
       this.modelAccessRetireDispose.readFlagDisplay === false &&
       this.modelAccessRentalLease.readFlagDisplay === false &&
       this.modelAccessModuleAllWo.readFlagDisplay === false &&
       this.moduleAccessModulePmWo.readFlagDisplay === false &&
       this.moduleAccessModuleQAWo.readFlagDisplay === false &&
       this.modelAccessModuleConsumedSpares.readFlagDisplay === false){
        this.branchComboDisplay = false;
       }

    this.locationFormGroup = new FormGroup({
      locationId: new FormControl(0),
      locationName: new FormControl(''),
    });

    this.locationFormGroup.controls.locationId.setValue(-1);
    this.locationFormGroup.controls.locationName.setValue(this.allBranch);

  }

  ngAfterViewInit() {

    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];

    const d = new Date();
    this.currentMonth = monthNames[d.getMonth()].toString();
    this.currentYear = d.getFullYear().toString();

    this.zone.runOutsideAngular(() => {

    });
  }

  loadAssetLocationDataByuserLocationAcces() {
    this.commonService.commonGetService('fetchListOfAssetCount.sams', (this.userSessionService.getUserLocationId()).toString()).subscribe(
      data => {
        if (data.success) {
          this.activeAssetCount = data.responseData;
        }
      }
    );
  }

  loadBreakDownServiceRequest() {
    this.commonService.commonGetService('fetchOpenServiceRequestInfo.sams', (this.userSessionService.getUserLocationId()).toString()).subscribe(
      data => {
        if (data.success) {
          this.breakDownCount = data.responseData;
        }
      }
    );
  }

  loadBreakDownAgeingServiceRequest() {
    this.commonService.commonGetService('fatchBreakDownSRAgeing.sams', (this.userSessionService.getUserLocationId()).toString()).subscribe(
      data => {
        if (data.success) {
          this.breakDownAgeingCount = data.responseData;
        }
      }
    );
  }

  loadWarrantyContractExpiryInfo() {
    this.commonService.commonGetService('fatchWarrantyContractExpiryInfo.sams', (this.userSessionService.getUserLocationId()).toString()).subscribe(
      data => {
        if (data.success) {
          this.warrantyContractExpCount = data.responseData;
        }
      }
    );
  }

  loadWarrantyContractInfo() {
    this.commonService.commonGetService('fetchWarrantyContractInfo.sams', (this.userSessionService.getUserLocationId()).toString()).subscribe(
      data => {
        if (data.success) {
          this.warrantyContractInfoCount = data.responseData;
        }
      }
    );
  }

  loadInActiveAssetInfo() {
    this.commonService.commonGetService('fetchInActiveAssetCountInfo.sams', (this.userSessionService.getUserLocationId()).toString()).subscribe(
      data => {
        if (data.success) {
          this.inActiveAssetCount = data.responseData;
        }
      }
    );
  }

  loadAssetDetails(value:string) {
    this.frame1Data.status = value;
    let dialogRef = this.dialog.open(WinByCategoryComponent, {
      width: '30%',
      height: '45%',
      position: { top: '12%', left: '2%' },
      data: this.frame1Data,
      panelClass: 'custom-dialog-container-dashboard'
    });
  }

  duration(){
    this.dialog.open(DashBoardDurationComponent, {
      width: '30%',
      height: 'auto',
    });
  }

  listofLocationName(searchValue) {

    this.scrollLocationNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaService.listAllUserLocForCombo, searchValue.term, '', '', this.limitCount, this.locationNamePageNumber).subscribe(
      (data) => {

        if (data.success) {

          this.locationList ="";
          for(const value of data.responseData.comboList){
             this.locationList= `${this.locationList} ${value.locationId.toString()},`;
          }
         this.locationList =  this.locationList.substring(0,this.locationList.length-1);

         if(this.locationList !== ""){
          this.frame1Data.locationList = this.locationList;
         }

          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.locationNamePageNumber === 1) {
              this.locationCombo =[];
              this.locationCombo = data.responseData.comboList;
              this.locationCombo.unshift({'locationId': -1,
                                          'locationName' : this.allBranch,
            });

            } else {
              this.locationCombo = this.locationCombo.concat(data.responseData.comboList);
            }
          } else {
            this.locationCombo =[];
            this.locationCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length !== 0 ? this.locationNamePageNumber += 1 : this.locationNamePageNumber = 1;
        }
      }
    );
    this.scrollLocationNamesync = false;

  }

  setLocationNameComboValue(event) {
    if (event === undefined) {
      this.frame1Data.locationId = 0;
      this.locationCombo = [];
      this.locationNamePageNumber = 1;
    } else {
      this.frame1Data.locationId = event.locationId;
      this.frame1Data.locationName  =event.locationName;

    }

    this.resetFormSubject.next(true);
    this.defaultTimeDisplay()

  }

  defaultTimeDisplay(){
    this.fromDateForOpen = "";
      this.toDateForOpen = "";
      this.fromDateForAll =  "";
      this.toDateForAll = "";
      this.fromDateForPreventive =  "";
      this.toDateForPreventive = "";
      this.fromDateForCalibration =  "";
      this.toDateForCalibration = "";
      this.fromDateForSpareConsume =  "";
      this.toDateForSpareConsume = "";
      this.periodForOpen = "Till";
      this.periodForAll = "Till";
      this.periodForPreventive = "Till";
      this.periodForCalibration = "Till";
      this.periodForSpareConsume = "Till";

      this.completedDateForOpen = "";
      this.completedDateForAll = "";
      this.completedDateForPreventive = "";
      this.completedDateForCalibration = "";
      this.completedDateForSpareConsume = "";

      this.allTillDateForOpen = `(${this.commonService.convertToDateStringdd_mm_yyyy(this._Date)})`;
      this.allTillDateForAll = `(${this.commonService.convertToDateStringdd_mm_yyyy(this._Date)})`;
      this.allTillDateForPreventive =`(${this.commonService.convertToDateStringdd_mm_yyyy(this._Date)})` ;
      this.allTillDateForCalibration =`(${this.commonService.convertToDateStringdd_mm_yyyy(this._Date)})` ;
      this.allTillDateForSpareConsumed = `(${this.commonService.convertToDateStringdd_mm_yyyy(this._Date)})`;
  }

  dateMethodForOpen(dateList){

    if(dateList.length > 0){
    this.fromDateForOpen= `(${dateList[0].fromDate}`;
    this.toDateForOpen = `${dateList[0].toDate})`;
    this.periodForOpen = dateList[0].period;
    this.allTillDateForOpen = "";
    if(this.fromDateForOpen !== "(" && this.toDateForOpen !== ")"){

      if(dateList[0].fromDate === dateList[0].toDate){
        this.fromDateForOpen= `(${dateList[0].fromDate})`;
        this.toDateForOpen = "";
        this.completedDateForOpen = "";
      }else{
    this.completedDateForOpen = this.toDisplay;
  }
    }
    if(dateList[0].fromDate === ""){
      this.completedDateForOpen = "";
    }

  }


  }

  dateMethodForAll(dateList){
    if(dateList.length > 0){
      this.fromDateForAll=`(${dateList[0].fromDate}`;
      this.toDateForAll = `${dateList[0].toDate})`;
      this.periodForAll = dateList[0].period;
      this.allTillDateForAll = "";
      if(this.fromDateForAll !== "(" && this.toDateForAll !== ")"){

        if(dateList[0].fromDate === dateList[0].toDate){
          this.fromDateForAll= `(${dateList[0].fromDate})`;
          this.toDateForAll = "";
          this.completedDateForAll = "";
        }else{
      this.completedDateForAll = this.toDisplay;
    }

      }
      if(dateList[0].fromDate === ""){
        this.completedDateForAll = "";
      }

    }

  }

  dateMethodForPreventive(dateList){
    if(dateList.length > 0){
      this.fromDateForPreventive=`(${dateList[0].fromDate}`;
      this.toDateForPreventive = `${dateList[0].toDate})`;
      this.periodForPreventive = dateList[0].period;
      this.allTillDateForPreventive = "";
      if(this.fromDateForPreventive !== "(" && this.toDateForPreventive !== ")"){
        if(dateList[0].fromDate === dateList[0].toDate){
          this.fromDateForPreventive= `(${dateList[0].fromDate})`;
          this.toDateForPreventive = "";
          this.completedDateForPreventive = "";
        }else{
      this.completedDateForPreventive = this.toDisplay;
    }

      }
      if(dateList[0].fromDate === ""){
        this.completedDateForPreventive = "";
      }

    }

  }

  dateMethodForCalibration(dateList){
    if(dateList.length > 0){
      this.fromDateForCalibration=`(${dateList[0].fromDate}`;
      this.toDateForCalibration = `${dateList[0].toDate})`;
      this.periodForCalibration = dateList[0].period;
  this.allTillDateForCalibration = "";
      if(this.fromDateForCalibration !== "(" && this.toDateForCalibration !== ")"){

        if(dateList[0].fromDate === dateList[0].toDate){
          this.fromDateForCalibration= `(${dateList[0].fromDate})`;
            this.toDateForCalibration = "";
            this.completedDateForCalibration = "";
          }else{
        this.completedDateForCalibration = this.toDisplay;
      }

      }

      if(dateList[0].fromDate === ""){
        this.completedDateForCalibration = "";
      }

    }

  }

  dateMethodForSparesConsume(dateList){
    if(dateList.length > 0){
      this.fromDateForSpareConsume=`(${dateList[0].fromDate}`;
      this.toDateForSpareConsume =`${dateList[0].toDate})`;
      this.periodForSpareConsume = dateList[0].period;
      this.allTillDateForSpareConsumed = "";
      if(this.fromDateForSpareConsume !== "(" && this.toDateForSpareConsume !== ")"){

        if(dateList[0].fromDate === dateList[0].toDate){
          this.fromDateForSpareConsume= `(${dateList[0].fromDate})`;
            this.toDateForSpareConsume= "";
            this.completedDateForSpareConsume = "";
          }else{
        this.completedDateForSpareConsume = this.toDisplay;
      }
      }
      if(dateList[0].fromDate === ""){
        this.completedDateForSpareConsume = "";
      }

    }

  }

  changingTheme(theme){
    this.theme = theme;
    this.frame1Data.theme = theme;
    localStorage.setItem('theme', theme);
    this.resetFormSubject.next(true);
  }

}
