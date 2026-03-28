import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { Location } from '@angular/common';
import { MaintenanceScheduleHdrModel } from 'src/app/Model/maintenance/maintenanceScheduleHdr';
import { MatDialog } from '@angular/material/dialog';
import { MaintenanceAddAssetScheduleComponent } from '../maintenance-add-asset-schedule/maintenance-add-asset-schedule.component';
import { MaintenanceScheduleAssetWiseComponent } from '../maintenance-schedule-asset-wise/maintenance-schedule-asset-wise.component';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetModel } from 'src/app/Model/master/asset';
import { Title } from '@angular/platform-browser';
import { MaintenanceScheduleDtlModel } from 'src/app/Model/maintenance/maintenanceScheduleDtl';
import { getData } from 'src/app/Model/common/fetchListData';
import { CancelConfirmationWithoutReasonComponent } from '../../Common-components/cancel-confirmation-without-reason/cancel-confirmation-without-reason.component';

@Component({
  selector: 'app-maintenanace-schedule-create',
  templateUrl: './maintenanace-schedule-create.component.html',
  styleUrls: ['./maintenanace-schedule-create.component.css']
})
export class MaintenanaceScheduleCreateComponent implements OnInit {
  @ViewChild('focusSet') focusLocationName: ElementRef;
  maintenanceScheduleForm: FormGroup;
  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();
  //Heading static
  buttonDisplay: string;
  headingDisplay: string;
  disbleClear: boolean;

  scrollLocationNamesync: boolean = false;
  scrollPrioritysync: boolean = false;
  uploadFlagMaintanaceSchedule: boolean = false;
  disableRadio: boolean;
  submitButtonDisplay: boolean = false;
  addButtonDisplay: boolean = false;

  createsubLoader: boolean = false;

  locationNamePageNumber: number;
  priorityPageNumber: number;
  currentDate: string;

  locationCombo: any = [];
  priorityCombo: any = [];
  scheduleStartDateTempList: any[];

  srTypeCombo: any = [];
  scrollsyncSrType: boolean = false;
  srTypePageNumber: number;

  scheduleTypeList = [
    // { scheduleType: 'DAILY ROUNDS'},
    { scheduleType: 'PREVENTIVE MAINTENANCE' },
    { scheduleType: 'PERFORMANCE ASSURANCE' },
    { scheduleType: 'QUALITY ASSURANCE' },
    { scheduleType: 'DAILY ROUNDS' }
  ];

  scheduleFrequencyList = [
    { frequency: 'ANNUALLY' },
    // { frequency :'TRIANNUAL'},
    { frequency: 'QUARTERLY' },
    { frequency: 'MONTHLY' },
    { frequency: 'DAILY' },
    { frequency: 'WEEKLY' },
    { frequency: 'SPECIFIC DATE' },
    // { frequency :'TWO YEARS ONCE'}
  ]

  ErrorMsg: String = '';
  tempValue: String = '';
  newDate: String = '';

  assetGroup: any = [];
  modelCombo: any = [];
  scrollsyncAssetGroup: boolean = false;
  scrollsyncModel: boolean = false;
  assetGroupPageNumber: number;
  modelComboPageNumber: number;


  limitCount: any;

  public scheduleHdrModel: MaintenanceScheduleHdrModel;
  public scheduleDtlModel: MaintenanceScheduleDtlModel;
  public scheduleDtlModel1: MaintenanceScheduleDtlModel;
  public assetHdrTO: AssetModel;
  scheduleDtlList: any[];
  scheduleDtlTOList: MaintenanceScheduleDtlModel[];


  assetDetailDispCol = ['select', 'sNo', 'assetCode', 'modelName', 'assetGroupName', 'startDate', 'plannedSchedules', 'cancelledSchedules', 'completedSchedules', 'actions'];

  //For Pagination
  length: number;     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page
  title = 'Asset Optima - Schedule Maintenance';

  endDateCalc: String;

  isAddMode: boolean = false;
  isEditMode: boolean = false;
  isViewMode: boolean = false;

  sourceScreen: string = '';
  getData: getData;

  recordsPerPageForCombo: string;
  selectAllFlag: boolean = false;
  scheduleCancelList: any =[];
  enableCancelButton: boolean = true;
  cancelScheduleFlag: boolean = true;

  scrollfrequencySync : boolean = false;
  frequencyPageNumber : number;
  frequencyCombo: any = [];

  constructor(private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private activatedRoute: ActivatedRoute,
    private userSession: UserSessionService,
    private location: Location,
    private matDialog: MatDialog,
    private validationService: AssetOptimaConstants,
    private readonly router: Router,
    private readonly titleService: Title) {
    this.assetHdrTO = new AssetModel();
    this.scheduleHdrModel = new MaintenanceScheduleHdrModel();
    this.scheduleDtlModel1 = new MaintenanceScheduleDtlModel();
    this.pageSize = '100';
    this.pageIndex = '0';
    this.locationNamePageNumber = 1;
    this.priorityPageNumber = 1;
    this.scheduleDtlList = [];
    this.scheduleDtlTOList = [];
    this.assetGroupPageNumber = 1;
    this.modelComboPageNumber = 1;
    this.srTypePageNumber = 1;
    this.frequencyPageNumber = 1;

  }

  ngOnInit() {
    this.pageSize = '100';
    this.pageIndex = '0';

    this.titleService.setTitle(this.title);
    this.currentDate = this.commonService.convertToDateStringyyyy_mm_dd(new Date());

    this.newDate = this.commonService.getCurrentDateYYYYMMDD();

    this.maintenanceScheduleForm = new FormGroup({
      scheduleTitle: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      locationName: new FormControl('', [Validators.required]),
      locationId: new FormControl(0),
      scheduleHdrId: new FormControl(0),
      scheduleType: new FormControl(''),
      scheduleTypeName: new FormControl('', [Validators.required]),
      active: new FormControl(true),
      frequency: new FormControl('', [Validators.required]),
      startDate: new FormControl(''),
      srCreateBfrSch: new FormControl(0, [Validators.pattern(this.validationService.numericValidation)]),
      occurances: new FormControl(0, [Validators.pattern(this.validationService.numericValidation)]),
      priority: new FormControl('', [Validators.required]),
      startDateDisp: new FormControl(''),
      endDateDisp: new FormControl(''),
      scheduleEndType: new FormControl('OCCURANCE'),
      //COMMON OBJECTS
      orgId: new FormControl(''),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      pageNumber: new FormControl(''),
      recordsPerPage: new FormControl(''),
      orgName: new FormControl(''),
      assetList: new FormControl([]),
      scheduleDtlList: new FormControl([]),
      frequencyDispName: new FormControl('')
    });
    this.locationNamePageNumber = 1;
    this.priorityPageNumber = 1;
    this.validateEditMode();
    this.maintenanceScheduleForm.controls['occurances'].enable();
    this.maintenanceScheduleForm.controls['locationName'].setValue(this.validationService.defaultuserLocName);
    this.maintenanceScheduleForm.controls['locationId'].setValue(this.validationService.defaultuserLocId);
    this.sourceScreen = localStorage.getItem('sourceScreen');
    if (this.sourceScreen == 'ASSET') {
      this.commonService.commonGetService('fetchAssetDtlByAssetId.sams', Number(localStorage.getItem('assetIdForScheduling'))).subscribe(
        data => {
          this.assetHdrTO = data.responseData;
        });
    }
    this.maintenanceScheduleForm.controls.startDateDisp.setValue(new Date());

    this.scheduleStartDateTempList = [];
  }

  listofLocationName(searchValue) {
    this.scrollLocationNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllUserLocForCombo, searchValue.term, '', '', this.limitCount, this.locationNamePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.locationNamePageNumber , this.locationCombo , data.responseData.comboList)
        this.locationNamePageNumber = this.getData.pageNumber;
        this.locationCombo = this.getData.dataList;
        this.scrollLocationNamesync = false;
      }
    );
  }

  setLocationNameComboValue(event) {
    if (event === undefined) {
      this.maintenanceScheduleForm.controls['locationId'].setValue(0);
      this.locationCombo = [];
      this.locationNamePageNumber = 1;
    } else {
      this.maintenanceScheduleForm.controls['locationId'].setValue(event.locationId);
    }
  }

  lengthMaximumCharacter() {

  }

  setPriorityNameComboValue(event) {
    if (event === undefined) {
      this.maintenanceScheduleForm.controls['priority'].setValue('');
      this.priorityCombo = [];
      this.priorityPageNumber = 1;
    } else {
      this.maintenanceScheduleForm.controls['priority'].setValue(event.priorityName);
    }
  }

  checkForScheduleNameExistence() {
    if (((this.tempValue != null || this.tempValue != '') ? this.tempValue.toLowerCase() : '') === ((this.maintenanceScheduleForm.controls.scheduleTitle.value != null) ? this.maintenanceScheduleForm.controls.scheduleTitle.value.toLowerCase() : '')) {

    } else {
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.asset.ScheduleHdrTO";
      constraintData.constraints = {
        'scheduleTitle': this.maintenanceScheduleForm.controls.scheduleTitle.value.toLowerCase(),
        'orgId': this.userSession.getUserOrgId()

      };
      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if (!data.success) {
            //show the warning invalidate the form group 
            this.ErrorMsg = data.message;
            this.maintenanceScheduleForm.controls.scheduleTitle.setErrors(Validators.minLength);
            this.maintenanceScheduleForm.controls.scheduleTitle.setErrors({ "notUnique": true });
            this.maintenanceScheduleForm.controls.scheduleTitle.invalid;
          } else {
            this.ErrorMsg = '';
            this.maintenanceScheduleForm.controls.scheduleTitle.setErrors(null);
            this.maintenanceScheduleForm.controls.scheduleTitle.valid;
          }

        });
    }
  }

  loadPriorityComboData(searchValue) {
    this.scrollPrioritysync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllPriorityForCombo.sams', searchValue.term, '', '',
      this.limitCount, this.priorityPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.priorityPageNumber , this.priorityCombo , data.responseData.comboList)
          this.priorityPageNumber = this.getData.pageNumber;
          this.priorityCombo = this.getData.dataList;
          this.scrollPrioritysync = false;
        }
      );
  }

  validateEditMode() {
    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        var mode = params.mode;
        primaryId = Number(primaryId);
        if (primaryId <= 0) {
          this.maintenanceScheduleForm.get('active').setValue(true);
          //button and heading names for add
          this.headingDisplay = "Create";
          this.buttonDisplay = "Submit";
          this.maintenanceScheduleForm.controls['scheduleTitle'].enable();
          this.disableRadio = false;
          this.submitButtonDisplay = false;
          this.addButtonDisplay = true;
          this.maintenanceScheduleForm.controls['endDateDisp'].disable();
          this.maintenanceScheduleForm.controls.startDateDisp.setValue(this.commonService.getCurrentDateYYYYMMDD());
          this.newDate = this.commonService.getCurrentDateYYYYMMDD();
          this.isAddMode = true;
        } else {
          // this.loadItemLocAccess(primaryId);
          this.commonService.showSpinner();
          this.commonService.commonGetService('loadScheduleDetailedInfo.sams', primaryId).subscribe(
            data => {
              this.maintenanceScheduleForm.patchValue(data.responseData);
              // this.loadAssetWiseEchedules(data.responseData.scheduleHdrId);
              this.scheduleDtlModel1.scheduleHdrId = data.responseData.scheduleHdrId;
              this.loadAssetWiseEchedules();
              this.tempValue = data.responseData.scheduleTitle != null ? data.responseData.scheduleTitle : '';
              this.maintenanceScheduleForm.controls['occurances'].disable();
              this.disableRadio = true;
            }
          )
          // this.newDate = this.maintenanceScheduleForm.controls.startDateDisp.value;
          //button and heading names for edit
          if (mode == 'view') {
            this.headingDisplay = "View";
            this.submitButtonDisplay = false;
            this.addButtonDisplay = false;
            this.maintenanceScheduleForm.disable();
            this.isViewMode = true;
          } else {
            this.headingDisplay = "Edit";
            this.buttonDisplay = "Update";
            this.disbleClear = true;
            this.submitButtonDisplay = true;
            this.addButtonDisplay = false;
            this.isEditMode = true;
            this.maintenanceScheduleForm.controls['locationName'].disable();
            this.maintenanceScheduleForm.controls['scheduleTitle'].disable();
            this.maintenanceScheduleForm.controls['scheduleTypeName'].disable();
            this.maintenanceScheduleForm.controls['priority'].disable();
            this.maintenanceScheduleForm.controls['frequencyDispName'].disable();
            this.maintenanceScheduleForm.controls['occurances'].disable();
            this.maintenanceScheduleForm.controls['srCreateBfrSch'].disable();
          }
          this.commonService.hideSpinner();
        }
      }
    );
  }

  clear() {
    this.maintenanceScheduleForm.reset();
    this.maintenanceScheduleForm.updateValueAndValidity();
    this.ngOnInit();
  }

  exitForm() {
    this.router.navigate(['home/serviceRequest/maintenanceSchedule']);
  }

  submit(assetModelArray) {
    this.uploadFlagMaintanaceSchedule = true;
    this.scheduleHdrModel = this.maintenanceScheduleForm.getRawValue();
    var v_itemModel = this.scheduleHdrModel.scheduleTitle.trim();
    this.scheduleHdrModel.startDateDisp = this.commonService.convertToDateStringyyyy_mm_dd(this.scheduleHdrModel.startDateDisp);
    //this.scheduleHdrModel.endDateDisp=this.commonService.convertToDateStringyyyy_mm_dd(this.scheduleHdrModel.endDateDisp);
    this.scheduleHdrModel.scheduleEndType = 'OCCURANCE';
    if (v_itemModel == "") {
      this.commonService.openToastWarningMessage("Kinldy Enter the Valid Schedule Name");
    } else {
      this.scheduleHdrModel.scheduleTitle = v_itemModel;
      this.scheduleHdrModel.assetList = assetModelArray;
      this.commonService.commonInsertService('saveUpdateSchedule.sams', this.scheduleHdrModel).subscribe(
        data => {
          if (data.success) {
            this.commonService.openToastSuccessMessage(data.message);
            this.uploadFlagMaintanaceSchedule = false;
            this.validateEditMode();
          } else {
            this.uploadFlagMaintanaceSchedule = false;
            this.commonService.openToastErrorMessage(data.message);
          }
        }
      );
    }
  }

  assetIndividualId: number = 0;

  submitIndividualAsset() {
    this.uploadFlagMaintanaceSchedule = true;
    this.scheduleHdrModel = this.maintenanceScheduleForm.getRawValue();
    var v_itemModel = this.scheduleHdrModel.scheduleTitle.trim();
    this.maintenanceScheduleForm.controls.startDateDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.maintenanceScheduleForm.controls.startDateDisp.value))
    //this.scheduleHdrModel.endDateDisp=this.commonService.convertToDateStringyyyy_mm_dd(this.scheduleHdrModel.endDateDisp);
    this.scheduleHdrModel.scheduleEndType = 'OCCURANCE';
    if (v_itemModel == "") {
      this.commonService.openToastWarningMessage("Kinldy Enter the Valid Schedule Name");
    } else {
      this.scheduleHdrModel.scheduleTitle = v_itemModel;
      this.assetIndividualId = Number(localStorage.getItem('assetIdForScheduling'));
      this.maintenanceScheduleForm.controls.assetList.setValue([this.assetIndividualId]);
      this.commonService.commonInsertService('saveUpdateSchedule.sams', this.maintenanceScheduleForm.getRawValue()).subscribe(
        data => {
          if (data.success) {
            this.commonService.openToastSuccessMessage(data.message);
            this.uploadFlagMaintanaceSchedule = false;
            this.navigateToMaintenanceInEditMode(data.responseData);
          } else {
            this.uploadFlagMaintanaceSchedule = false;
            this.commonService.openToastErrorMessage(data.message);
          }
        }
      );
    }
  }

  selectedScheduleTypeData(event) {
    if(event == undefined){
      this.maintenanceScheduleForm.controls.scheduleType.setValue('');
      this.maintenanceScheduleForm.controls.scheduleTypeName.setValue('');
    } else{
      this.maintenanceScheduleForm.controls.scheduleType.setValue(event.srId);
      this.maintenanceScheduleForm.controls.scheduleTypeName.setValue(event.srTypeName);
    }
    
  }

  submitHdrInfo() {
    this.uploadFlagMaintanaceSchedule = true;
    this.maintenanceScheduleForm.controls.startDateDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.maintenanceScheduleForm.controls.startDateDisp.value));
    this.scheduleDtlTOList = [];
    this.getStartDateChangedScheduleDtlList();
    this.maintenanceScheduleForm.controls.scheduleDtlList.setValue(this.scheduleDtlTOList);
    this.commonService.commonInsertService('saveUpdateScheduleHdr.sams', this.maintenanceScheduleForm.getRawValue()).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
          this.uploadFlagMaintanaceSchedule = false;
          this.navigateToMaintenanceInEditMode(data.responseData);
          if (this.buttonDisplay === 'Update') {
            this.exitForm();
          }
        } else {
          this.uploadFlagMaintanaceSchedule = false;
          this.commonService.openToastErrorMessage(data.message);
        }
      }
    );
  }

  navigateToMaintenanceInEditMode(scheduleHdrId) {
    this.router.navigate(['home/serviceRequest/maintenanceScheduleCreate/' + scheduleHdrId + '/' + 'edit']);

  }

  // loadAssetWiseEchedules(scheduleHdrId: String) {
  //   this.createsubLoader = true;
  //   this.commonService.commonGetService('listOfAssetLevelSchedules.sams', scheduleHdrId).subscribe(
  //     data => {
  //       if (data.success) {
  //         this.scheduleDtlList = data.responseData;
  //         this.length = this.scheduleDtlList.length;
  //         this.scheduleStartDateTempList = [];
  //         for (const scheduleDtlListObj of data.responseData) {
  //           this.scheduleStartDateTempList.push(scheduleDtlListObj.scheduleDateDisp);
  //         }
  //       } else {
  //         this.commonService.openToastErrorMessage(data.message);
  //       }
  //     }, error => {
  //     }
  //   );
  //   this.createsubLoader = false;
  // }

  loadAssetWiseEchedules() {
    this.createsubLoader = true;
    this.scheduleDtlModel1.pageNumber = Number(this.pageIndex);
    this.scheduleDtlModel1.recordsPerPage = Number(this.pageSize);
    this.commonService.showSpinner(); 
    this.commonService.commonListService('listOfAssetLevelSchedulesList.sams', this.scheduleDtlModel1).subscribe(
      data => {
        if (data.success) {
          this.scheduleDtlList = data.responseData.dataList;
          this.length = data.responseData.dataTotalRecCount;
          this.scheduleStartDateTempList = [];
          for (const scheduleDtlListObj of data.responseData) {
            this.scheduleStartDateTempList.push(scheduleDtlListObj.scheduleDateDisp);
          }
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
      }
    );
    this.createsubLoader = false;
    this.commonService.hideSpinner();
  }

  selectedScheduleFrequencyData(event) {
    if (event.frequencyId === 'SPECIFIC DATE') {
      this.maintenanceScheduleForm.controls['occurances'].setValue(1);
      this.maintenanceScheduleForm.controls['occurances'].disable();
    } else {
      this.maintenanceScheduleForm.controls['occurances'].setValue(1);
      this.maintenanceScheduleForm.controls['occurances'].enable();
    }
    this.maintenanceScheduleForm.controls.frequency.setValue(event.frequencyId);
    this.maintenanceScheduleForm.controls['frequencyDispName'].setValue(event.frequencyName);
  }

  dateValidation1(event) {
    return false;
  }
  dateValidation2(event) {
    return false;
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  calculateEndDate() {
    if (this.maintenanceScheduleForm.controls.startDateDisp.value !== '' &&
      this.maintenanceScheduleForm.controls.startDateDisp.value !== null) {
      this.commonService.commonListService('calculateEndDateForSchedule.sams', this.maintenanceScheduleForm.getRawValue()).subscribe(
        data => {
          if (data.success) {
            this.endDateCalc = data.responseData;
            this.addAsset();
          } else {
            this.commonService.openToastErrorMessage(data.message);
          }
        }, error => {
        }
      );
    } else {
      this.commonService.openToastWarningMessage("Please Select Default Start Date");
    }
  }

  addAsset() {
    let dialogRef = this.matDialog.open(MaintenanceAddAssetScheduleComponent, {
      data: {
        'scheduleDtlList': this.scheduleDtlList,
        'locationId': this.maintenanceScheduleForm.controls.locationId.value,
        'startDt': this.maintenanceScheduleForm.controls.startDateDisp.value,
        'endDt': this.endDateCalc,
        'scheduleType': this.maintenanceScheduleForm.controls.scheduleType.value
      }, width: "95%", height: "95%"
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          let assetArray = [];
          for (var i = 0; i < data.length; i++) {
            assetArray.push(data[i].assetHdrId);
          }
          if (assetArray.length > 0) {
            this.submit(assetArray);

          }
        }

      });
  }

  deleteAllSchedulesForAssets(scheduleHdrId) {
    let text;
    if(this.selectedScheduleList.length > 1){
      text = 'Schedules';
    } else{
      text = 'CEID : ' + this.selectedScheduleList[0].assetCode + ' Schedules';
    }
    let dialogRef = this.matDialog.open(CancelConfirmationWithoutReasonComponent, {
      // height: '201px',
      width: '357px',
      data: {
        'Text': text,
        'titleName': 'Schedules', 'body': 'Do you want to Cancel all Schedules for Asset ?'
      },
      panelClass: 'custom-dialog-container'
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          this.scheduleCancelList = []; 
            for (let i = 0; i < this.selectedScheduleList.length; i++) {      
              if (this.selectedScheduleList[i].plannedSchedules.toString() != this.selectedScheduleList[i].cancelledSchedules) {
                this.scheduleCancelList.push(this.selectedScheduleList[i].assetHdrId);
              } 
            } 
  
            let scheduleIdList = {scheduleCancelList: [], scheduleHdrId: scheduleHdrId};
            scheduleIdList.scheduleCancelList = this.scheduleCancelList;
          this.commonService.commonInsertService('multipleCancellAllSchedulesForAsset.sams', scheduleIdList).subscribe(
            data => {
              if (data.success) {
                this.commonService.openToastSuccessMessage(data.message);
                this.scheduleDtlModel1.scheduleHdrId = scheduleHdrId;
                this.selectedScheduleList = [];
                this.selectAllFlag = false;
                this.loadAssetWiseEchedules();
              } else {
                this.commonService.openToastErrorMessage(data.message);
              }
            }, error => {
              this.commonService.openToastErrorMessage(data.message);
            }
          );
        }
      });
  }

  navigateToMaintenance() {
    this.location.back();
  }

 viewAssetWiseSchedule(scheduleHdrId, assetId ,assetCode) {
    let dialogRef = this.matDialog.open(MaintenanceScheduleAssetWiseComponent, {
      data: { 'scheduleHdrId': scheduleHdrId, 'assetId': assetId ,'assetCode': assetCode }, height: "80%", width: '90%',
    });
    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe(
      data => {
        this.scheduleDtlModel1.scheduleHdrId = scheduleHdrId;
        this.loadAssetWiseEchedules();
      });
    this.maintenanceScheduleForm.controls.occurances.disable();

  }

  changeScheduleToEndType(type: number) {
    //   if (type === 1) {
    //     this.maintenanceScheduleForm.controls['scheduleEndType'].setValue('OCCURANCE');
    //     this.maintenanceScheduleForm.controls['endDateDisp'].disable();
    //     this.maintenanceScheduleForm.controls['occurances'].enable();
    //   }
    //   if (type === 2) {
    //     this.maintenanceScheduleForm.controls['scheduleEndType'].setValue('END DATE');
    //     this.maintenanceScheduleForm.controls['occurances'].disable();
    //     this.maintenanceScheduleForm.controls['endDateDisp'].enable();
    //   }
  }

  getStartDateChangedScheduleDtlList() {
    if (this.scheduleDtlList.length === this.scheduleStartDateTempList.length) {
      for (let i = 0; i < this.length; i++) {
        if (this.scheduleDtlList[i].scheduleDateDisp !== this.scheduleStartDateTempList[i]) {
          this.scheduleDtlModel = new MaintenanceScheduleDtlModel();
          this.scheduleDtlModel.assetHdrId = this.scheduleDtlList[i].assetHdrId;
          this.scheduleDtlModel.scheduleHdrId = this.scheduleDtlList[i].scheduleHdrId;
          this.scheduleDtlModel.scheduleDateDisp = this.scheduleDtlList[i].scheduleDateDisp;

          this.scheduleDtlTOList.push(this.scheduleDtlModel);
        }
      }
    }
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadAssetWiseEchedules();
  }

  listOfAllModel(searchKey) {
    this.scrollsyncModel = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults('listOfAllModelCombo.sams', searchKey.term, 0,
      this.scheduleDtlModel1.assetGroupId > 0 ? this.scheduleDtlModel1.assetGroupId : 0,
      this.recordsPerPageForCombo, this.modelComboPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchKey, this.modelComboPageNumber , this.modelCombo , data.responseData.comboList)
          this.modelComboPageNumber = this.getData.pageNumber;
          this.modelCombo = this.getData.dataList;
          this.scrollsyncModel = false;
        });
  }

  getModelComboValue(event) {
    if (event != null) {
      this.scheduleDtlModel1.modelId = event.modelId;
      this.scheduleDtlModel1.modelName = event.modelName;
    } else {
      this.scheduleDtlModel1.modelId = 0;
      this.scheduleDtlModel1.modelName = '';
      this.modelCombo = [];
      this.modelComboPageNumber = 1;
    }
  }

  listOfAllAssetGroup(searchKey) {
    this.scrollsyncAssetGroup = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllAssetGroupCombo, searchKey.term, 0, '',
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
      this.scheduleDtlModel1.assetGroupId = event.assetGroupId;
      this.scheduleDtlModel1.assetGroupName = event.assetGroupName;
    } else {
      this.scheduleDtlModel1.assetGroupId = 0;
      this.scheduleDtlModel1.assetGroupName = '';
      this.assetGroup = [];
      this.assetGroupPageNumber = 1;
    }
  }

  searchSchedule(){
    this.pageSize = '100';
    this.pageIndex = '0';
    this.loadAssetWiseEchedules();
  }

  selectedScheduleList = [];
  selectSchedule(element,checked){
    if(checked){
      if (this.commonService.getIndexOfTheItem(this.selectedScheduleList, true, 'assetHdrId)', element.assetHdrId) == -1) {
        this.selectedScheduleList.push(element);
      }
    } else{
      let index = this.commonService.getIndexOfTheItem(this.selectedScheduleList, true, 'assetHdrId', element.assetHdrId);
      if (index >= 0) {
        this.selectedScheduleList.splice(index, 1);
      }
    }
    if(this.selectedScheduleList.length > 0){
      this.enableCancelButton = false;
    } else{
      this.enableCancelButton = true;
    }
  }

  multipleSelectSchedule(value: boolean) {
    if(value){
      this.enableCancelButton = false;
      // this.selectedScheduleList = this.scheduleDtlList;
      for(let i=0; i<this.scheduleDtlList.length; i++){
        if(this.scheduleDtlList[i].plannedSchedules != this.scheduleDtlList[i].cancelledSchedules){
          this.selectedScheduleList.push(this.scheduleDtlList[i]);
        }
      }

    } else{
      this.enableCancelButton = true;
      this.selectedScheduleList = [];
    }
  }
  compareValue(element) {
    return this.selectedScheduleList.findIndex(data => data.assetHdrId === element.assetHdrId) !== -1;
  }

  cancelSchedule(){
    this.cancelScheduleFlag = true;
    for (let i = 0; i < this.selectedScheduleList.length; i++) { 
      if (this.selectedScheduleList[i].plannedSchedules.toString() === this.selectedScheduleList[i].cancelledSchedules) {
        this.cancelScheduleFlag = false;
        this.commonService.openToastWarningMessage("Asset : "+this.selectedScheduleList[i].assetCode+" Already Cancelled");
     }
    }
    if(this.cancelScheduleFlag){
      this.deleteAllSchedulesForAssets(this.scheduleDtlModel1.scheduleHdrId);
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

}
