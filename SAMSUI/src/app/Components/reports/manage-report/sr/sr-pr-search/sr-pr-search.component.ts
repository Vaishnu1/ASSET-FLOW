import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepicker } from '@angular/material/datepicker';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { BASE_FORM_GROUP_CONST } from 'src/app/Model/base/baseFormGroup';
import { RepairServiceRequestReportComponent } from '../../../repair-service-request-report/repair-service-request-report.component';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { getData } from 'src/app/Model/common/fetchListData';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-sr-pr-search',
  templateUrl: './sr-pr-search.component.html',
  styleUrls: ['./sr-pr-search.component.css']
})
export class SrPrSearchComponent implements OnInit {

  @ViewChild('FormFirstLoc') locationFocus: NgSelectComponent;
  @ViewChild('picker1') picker1: MatDatepicker<Date>;
  @ViewChild('picker2') picker2: MatDatepicker<Date>;

  listOfSRtoPR = [];
  displayedColumns = ['sno', 'locationName', 'srNo', 'srStatus', 'createdDtDisp', 'updatedDtDisp', 'woPrDaysDisp', 'assetCode', 'departmentName'];
  srReportsList = ['Work Order Count Report', 'Work Order Detail Report', 'Maintenance Performance Report', 'Breakdown Performance Report','Consumed Spares Report'];
  srDtlReports = ['Resolved By Service Engineer', 'Resolved By External Resource', 'Resolved By Department', 'Resolved Beyond Hours'];
  enableFieldSet: boolean = false;
  partValue: number;
  assetCodeCombo: any = [];
  srTypeCombo: any = [];
  srTypeCombo1: any = [];
  disableAllFieldsForBMMaintenanceReport: boolean = true;
  bdPerformanceReport = 'Breakdown Performance Report';

  currentDate: Date = new Date();

  public srReportForm: FormGroup;
  public bmPeformanceReportForm: FormGroup;

  scrollLocationsync: boolean = false;
  scrollDepartmentsync: boolean = false;
  scrollModelsync: boolean = false;
  scrollGroupsync: boolean = false;
  scrollUsersync: boolean = false;
  scrollAssetCodesync: boolean = false;
  scrollsyncSrType: boolean = false;
  scrollsyncSrType1: boolean = false;

  limitCount: any;
  locationPageNumber: number;
  departmentPageNumber: number;
  modelPageNumber: number;
  groupPageNumber: number;
  userPageNumber: number;
  assetCodePageNumber: number;
  srTypePageNumber: number;
  disableColumnsBasedOnReportType: boolean = true;

  pageSize = 10;
  length = 0;
  pageIndex = 0;
  mandatoryString: string = '*';
  functionalityList = [
    { functionality: 'CRITICAL' },
    { functionality: 'NON CRITICAL' }
  ];

  srStatusList = [
    { srStatus: 'OPEN' },
    { srStatus: 'CLOSED' },
    { srStatus: 'COMPLETED' },
    { srStatus: 'ACKNOWLEDGED' },
    { srStatus: 'IN-PROGRESS' }
  ];

  groupByColumnList = [
    { label: 'COMPANY' ,columnName : 'LOCATION_ID' },
    { label: 'DEPARTMENT' , columnName :'DEPARTMENT_ID' },
    { label: 'ASSET GROUP' , columnName : 'ASSET_GROUP_ID' },
    { label: 'CONTRACT TYPE' ,columnName : 'CONTRACT_TYPE'},
    { label: 'COVERAGE TYPE' , columnName : 'COVERAGE_TYPE'},
    { label: 'AMC' , columnName : 'AMC' },
    { label: 'CMC', columnName : 'CMC' },
    { label: 'RENTAL', columnName : 'RENTAL' },
    { label: 'LEASE' , columnName : 'LEASE' },
    { label: 'CONTRACT' , columnName : 'CONTRACT'},
    { label: 'WARRANTY' , columnName : 'WARRANTY'},
    { label: 'EXTENDED WARRANTY' , columnName : 'EXTENDED WARRANTY' },
  ];

  periodOption = [
    { period: 'Monthly' },
    { period: 'Weekly' },
    { period: 'Daily' }
  ]

  orderByOptions = [
    { label: 'WO Registration Date' ,orderBy : 'srOpenedDt'},
    { label: 'WO Last Updated Date' , orderBy :'updatedDt' }
  ]

  period:FormControl;

  scrollSrStatusSync:boolean=false;
  recordsPerPageForCombo: string='0';
  srStatusPageNumber:number=0;
  srStatusCombo:any=[];

  disableNextAndPrevButton: boolean =false;
  exceedsCurrentDate: boolean =false;

  showIncident = false;
  getData: getData;

  constructor(public dialogRef: MatDialogRef<RepairServiceRequestReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonService: CommonService,
    private userSession: UserSessionService,
    private samsService: AssetOptimaServices,
    private cdr: ChangeDetectorRef,
    private assetOptimaConstants: AssetOptimaConstants
  ) {
    this.locationPageNumber = 1;
    this.departmentPageNumber = 1;
    this.modelPageNumber = 1;
    this.groupPageNumber = 1;
    this.userPageNumber = 1;
    this.assetCodePageNumber = 1;
    this.srTypePageNumber = 1;
    this.srStatusPageNumber=1;
    this.getData = new getData();
  }
  a: any = '';
  ngOnInit() {
    this.initiateFormGroup();

    //dynamicly add all base from controls to the form Group
    Object.keys(BASE_FORM_GROUP_CONST.controls).forEach(key => {
      this.srReportForm.addControl(key, BASE_FORM_GROUP_CONST.get(key));
    });

    this.bmPeformanceReportForm = new FormGroup({
      locationName: new FormControl(''),
      locationId: new FormControl(0),
      createdDtDisp: new FormControl(''),
      updatedDtDisp: new FormControl(new Date()),
      createdDt: new FormControl(''),
      updatedDt: new FormControl(new Date()),
      departmentName: new FormControl(''), 
      departmentId: new FormControl(0),
      srType: new FormControl('BM'),
      assignedTo: new FormControl(''),
      assignedToId: new FormControl(0),
      srReportType: new FormControl(this.srReportForm.controls.srReportType.value),
      srSubReportType: new FormControl(''),
      beyondHours: new FormControl(0),
      reportStartDtDisp: new FormControl(''),
      reportEndDtDisp: new FormControl(''),
      srStatusId: new FormControl(''),
      srStatusName: new FormControl(''),
    });

    this.srReportForm.controls.searchValue.setValue(this.data.screenName);
    this.srReportForm.controls.searchValue1.setValue(this.data.title);
    this.srReportForm.controls.srReportType.setValue(this.data.srReportType);
    this.srReportForm.controls.locationName.setValue(this.userSession.getUserLocationName());
    this.srReportForm.controls.locationId.setValue(this.userSession.getUserLocationId());

    this.bmPeformanceReportForm.controls.locationName.setValue(this.userSession.getUserLocationName());
    this.bmPeformanceReportForm.controls.locationId.setValue(this.userSession.getUserLocationId());

    this.listOfSRtoPR = [];
    this.length = 0;

    this.locationPageNumber = 1;
    this.departmentPageNumber = 1;
    this.modelPageNumber = 1;
    this.groupPageNumber = 1;
    this.userPageNumber = 1;
    this.assetCodePageNumber = 1;

    this.getInitialFromDate(6);
    this.disableNextAndPrevButton=false;
    this.exceedsCurrentDate= false;

    //set from and to Date to current date
    this.srReportForm.controls.period.setValue('Daily');
    this.srReportForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(new Date()));
    this.srReportForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(new Date()));
    //by default next button should be disabled since to date set to current date
    this.exceedsCurrentDate=true;

    this.enableIncident(this.srReportForm.controls.srReportType.value);
   
    this.hidePeriod(this.srReportForm.controls.period.value);
  }

  ngAfterViewInit() {
    this.setFormFocus();
    this.cdr.detectChanges();
  }

  setFormFocus() {
    setTimeout(() => {
      this.locationFocus.focus();
    }, 500);
  }

  initiateFormGroup() {
    this.srReportForm = new FormGroup({
      locationName: new FormControl('', [Validators.required]),
      locationId: new FormControl(0),
      srReportType: new FormControl('', [Validators.required]),
      srType: new FormControl(''),
      srStatusId: new FormControl(''),
      srStatusName: new FormControl(''),
      srNo: new FormControl(''),
      srId: new FormControl(0),
      assetCategoryName: new FormControl(''),
      assetCategoryId: new FormControl(0),
      assetGroupName: new FormControl(''),
      assetGroupId: new FormControl(0),
      modelId: new FormControl(0),
      modelName: new FormControl(''),
      manufacturerName: new FormControl(),
      manufacturerId: new FormControl(0),
      departmentName: new FormControl(''),
      departmentId: new FormControl(0),
      assignedTo: new FormControl(),
      assignedToId: new FormControl(0),
      createdDtDisp: new FormControl('', [Validators.required]),
      updatedDtDisp: new FormControl(new Date(), [Validators.required]),
      assetCode: new FormControl(''),
      assetHdrId: new FormControl(0),
      assetStatus: new FormControl(''),
      assetStatusId: new FormControl(0),
      functionality: new FormControl(),
      assetTypeId: new FormControl(0),
      assetTypeName: new FormControl(''),
      srDtlReports: new FormControl([]),
      beyondHours: new FormControl(0),
      reportStartDtDisp: new FormControl(''),
      reportEndDtDisp: new FormControl(''),
      srSubReportType: new FormControl(''),
      groupByColumnName: new FormControl(''),
      orderBy: new FormControl(''),
      period : new FormControl('Daily', [Validators.required]),
      coverageType : new FormControl(''),
      contractType : new FormControl(''),
      woWithIncident : new FormControl(false)
    });
  }

  locationCombo: any = [];
  loadLocationComboData(searchValue) {
    this.scrollLocationsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.samsService.listAllUserLocForCombo, searchValue.term, '', '', this.limitCount, this.locationPageNumber).subscribe(
      (data) => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchValue, this.locationPageNumber , this.locationCombo , data.responseData.comboList)
      this.locationPageNumber = this.getData.pageNumber;
      this.locationCombo = this.getData.dataList;
      this.scrollLocationsync = false;
      }
    );
  }

  closeModal(): void { }

  selectedLocationData(event) {
    if (event === undefined) {
      this.locationPageNumber = 1;
    } else {
      this.srReportForm.controls.locationId.setValue(event.locationId);
      this.srReportForm.controls.locationName.setValue(event.locDisplayField);
    }
  }


  dateValidation1(event) {
    return false;
  }

  dateValidation2(event) {
    return false;
  }

  getFromDate(fromDate) {
    this.srReportForm.controls.createdDtDisp.setValue(fromDate.value);
  }

  getToDate(toDate) {
    this.srReportForm.controls.updatedDtDisp.setValue(toDate.value);
  }

  getInitialFromDate(monthDuration) {
    this.partValue = monthDuration;
    const tempEndDate = this.srReportForm.controls.updatedDtDisp.value;
    const endDate = new Date(tempEndDate);
    const getEndMonth = endDate.getMonth() - this.partValue;
    const startDate = endDate.setMonth(getEndMonth);
    const fromDate = new Date(startDate);
    this.srReportForm.controls.createdDtDisp.setValue(fromDate);
  }

  clearData() {
    this.disableNextAndPrevButton= true;
    
    this.ngOnInit();
  }

  loadAssetCodeComboData(searchValue) {
    this.scrollAssetCodesync = true;
    const deplocId = this.srReportForm.controls.departmentId.value;
    const locId = this.srReportForm.controls.locationId.value;
    const modelId = this.srReportForm.controls.modelId.value >0 ? this.srReportForm.controls.modelId.value : 0;
    const assetGroupId = this.srReportForm.controls.assetGroupId.value >0 ? this.srReportForm.controls.assetGroupId.value : 0;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResultsV1('listAllAssetCodeCombo.sams', searchValue.term,locId > 0 ? locId : 0,
    deplocId > 0 ? deplocId: 0, modelId, '', '', assetGroupId, this.limitCount, this.assetCodePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetCodePageNumber , this.assetCodeCombo , data.responseData.comboList)
          this.assetCodePageNumber = this.getData.pageNumber;
          this.assetCodeCombo = this.getData.dataList;
          this.scrollAssetCodesync = false;
        }
      );
  }

  selectedAssetCodeData(event) {        
    if (event === undefined) {
      this.srReportForm.controls['assetCode'].setValue('');
      this.srReportForm.controls['assetHdrId'].setValue(0);
      this.assetCodePageNumber = 1;

      this.srReportForm.controls.departmentName.setValue('');
      this.srReportForm.controls.departmentId.setValue(0);
      this.srReportForm.controls.departmentName.enable();

      this.srReportForm.controls.modelName.setValue('');
      this.srReportForm.controls.modelId.setValue(0);
      this.srReportForm.controls.modelName.enable();

      this.srReportForm.controls.assetGroupId.setValue(0);
      this.srReportForm.controls.assetGroupName.setValue('');
      this.srReportForm.controls.assetGroupName.enable();

      this.srReportForm.controls.functionality.setValue('');
      this.srReportForm.controls.functionality.enable();
    } else {
      this.srReportForm.controls['assetCode'].setValue(event.assetCode);
      this.srReportForm.controls['assetHdrId'].setValue(event.assetHdrId);

      this.srReportForm.controls.departmentName.setValue(event.departmentName);
      this.srReportForm.controls.departmentId.setValue(event.departmentId);
      this.srReportForm.controls.departmentName.disable();

      this.srReportForm.controls.modelName.setValue(event.modelName);
      this.srReportForm.controls.modelId.setValue(event.modelId);
      this.srReportForm.controls.modelName.disable();

      this.srReportForm.controls.assetGroupId.setValue(event.assetGroupId);
      this.srReportForm.controls.assetGroupName.setValue(event.assetGroupName);
      this.srReportForm.controls.assetGroupName.disable();

      this.srReportForm.controls.functionality.setValue(event.functionalStatus);
      this.srReportForm.controls.functionality.disable();
    }
  }
  submit() { 
    this.srReportForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.srReportForm.controls.createdDtDisp.value));
    this.srReportForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.srReportForm.controls.updatedDtDisp.value));
    this.dialogRef.close(this.srReportForm.getRawValue());    

  }
  close() {
    this.dialogRef.close();
  }

  modelCombo: any = [];
  loadModelComboData(searchValue) {
    this.scrollModelsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.samsService.listOfAllModelCombo, searchValue.term, '', '', this.limitCount, this.modelPageNumber).subscribe(
      (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.modelPageNumber , this.modelCombo , data.responseData.comboList)
          this.modelPageNumber = this.getData.pageNumber;
          this.modelCombo = this.getData.dataList;
          this.scrollModelsync = false;
      }
    );
  }

  selectedModelData(event) {
    if (event === undefined) {
      this.srReportForm.controls.modelId.setValue(0);
      this.srReportForm.controls.modelName.setValue('');
      this.modelPageNumber = 1;

      this.srReportForm.controls.assetGroupName.enable();
    } else {
      this.srReportForm.controls.modelId.setValue(event.modelId);
      this.srReportForm.controls.modelName.setValue(event.modelName);

      this.srReportForm.controls.assetGroupId.setValue(0);
      this.srReportForm.controls.assetGroupName.setValue('');
      this.srReportForm.controls.assetGroupName.disable();

      this.assetCodeCombo = [];
      this.assetCodePageNumber = 1;
    }
  }

  assetGroupCombo: any = [];
  loadGroupComboData(searchValue) {
    this.scrollGroupsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.samsService.listAllAssetGroupCombo, searchValue.term, '', '', this.limitCount, this.groupPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.groupPageNumber , this.assetGroupCombo , data.responseData.comboList)
        this.groupPageNumber = this.getData.pageNumber;
        this.assetGroupCombo = this.getData.dataList;
        this.scrollGroupsync = false;
      }
    );
  }

  selectedGroupData(event) {
    if (event === undefined) {
      this.srReportForm.controls.assetGroupId.setValue(0);
      this.srReportForm.controls.assetGroupName.setValue('');
      this.groupPageNumber = 1;
    } else {
      this.srReportForm.controls.assetGroupId.setValue(event.assetGroupId);
      this.srReportForm.controls.assetGroupName.setValue(event.assetGroupName);
    }
  }

  selectedFunctionalityData(event) {
    this.srReportForm.controls.functionality.setValue(event.functionality);
  }

  selectedSrStatusData(event) {
    this.srReportForm.controls.srStatus.setValue(event.srStatus);
  }

  loadSrTypeComboData(searchValue) {
    this.scrollsyncSrType = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllSrTypeCombo.sams', searchValue.term, '', '',
      this.limitCount, this.srTypePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.srTypePageNumber , this.srTypeCombo , data.responseData.comboList)
          this.srTypePageNumber = this.getData.pageNumber;
          this.srTypeCombo = this.getData.dataList;
          this.scrollsyncSrType = false;
        }
      );
  }

  loadSrTypeComboData1(searchValue) {
    this.scrollsyncSrType1 = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllSrTypeCombo.sams', searchValue.term, '', '',
      this.limitCount, this.srTypePageNumber, 'qualityReport').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.srTypePageNumber , this.srTypeCombo1 , data.responseData.comboList)
          this.srTypePageNumber = this.getData.pageNumber;
          this.srTypeCombo1 = this.getData.dataList;
          this.scrollsyncSrType1 = false;
        }
      );
  }

  selectedSrTypeData(event) {
    this.srReportForm.controls.srType.setValue(event.srId);
  }

  selectedSrTypeData2(event) {
    this.bmPeformanceReportForm.controls.srType.setValue(event.srId);
  }

  departmentCombo: any = [];
  loadDepartmentComboData(searchValue) {
    this.scrollDepartmentsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.samsService.listOfAllDeparment, searchValue.term, '', '', this.limitCount, this.departmentPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.departmentPageNumber , this.departmentCombo , data.responseData.comboList)
        this.departmentPageNumber = this.getData.pageNumber;
        this.departmentCombo = this.getData.dataList;
        this.scrollDepartmentsync = false;
      }
    );
  }

  selectedDepartmentData(event) {
    if (event === undefined) {
      this.srReportForm.controls.departmentId.setValue(0);
      this.srReportForm.controls.departmentName.setValue('');
      this.departmentPageNumber = 1;
    } else {
      this.srReportForm.controls.departmentId.setValue(event.departmentId);
      this.srReportForm.controls.departmentName.setValue(event.departmentName);
    }
  }

  selectedDepartmentData1(event) {
    if (event === undefined) {
      this.bmPeformanceReportForm.controls.departmentId.setValue(0);
      this.bmPeformanceReportForm.controls.departmentName.setValue('');
      this.departmentCombo = [];
      this.departmentPageNumber = 1;
    } else {
      this.bmPeformanceReportForm.controls.departmentId.setValue(event.departmentId);
      this.bmPeformanceReportForm.controls.departmentName.setValue(event.departmentName);
    }
  }

  woStatusCombo: any = [];
  loadWoStatusComboData(searchValue) {
    this.commonService.getComboResults(this.samsService.listAllServiceRequestStatusForCombo, searchValue.term, '', '', 0, 25).subscribe(
      (data) => {
        this.woStatusCombo = data.responseData.comboList;
      }
    );
  }

  selectedWoStatusData(event) {
    this.srReportForm.controls.srStatus.setValue(event.displayValue);
  }


  userCombo: any = [];
  loadPersonInchargeComboData(searchValue) {
    this.scrollUsersync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllEmployeeForOrgCombo.sams', searchValue.term,
      this.srReportForm.controls.departmentId.value > 0 ? this.srReportForm.controls.departmentId.value : '', '',
      this.limitCount, this.userPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.userPageNumber , this.userCombo , data.responseData.comboList)
          this.userPageNumber = this.getData.pageNumber;
          this.userCombo = this.getData.dataList;
          this.scrollUsersync = false;
        }
      );
  }

  selectedPersonInchargeData(event) {
    if (event === undefined) {
      this.srReportForm.controls.assignedToId.setValue(0);
      this.srReportForm.controls.assignedTo.setValue('');
      this.userPageNumber = 1;
    } else {
      this.srReportForm.controls.assignedToId.setValue(event.employeeId);
      this.srReportForm.controls.assignedTo.setValue(event.employeeFirstName);
    }
  }

  clear() {
    this.srReportForm.reset();
    this.srReportForm.updateValueAndValidity();
    this.enableFieldSet = false;
    this.ngOnInit();
  }

  onChange(event, index) {
    if (event.checked) {
      this.srReportForm.controls.srDtlReports.value.push(event.source.value);
    } else {
      let indexValue = this.commonService.getIndexOfTheItem(this.srReportForm.controls.srDtlReports.value, false, '', event.source.value);
      if (indexValue >= 0) {
        this.srReportForm.controls.srDtlReports.value.splice(indexValue, 1);
      }
    }
  }

  enableFlag: boolean = false;
  onChangeForCategory(i, name) {
    if (i === 3) {
      this.enableFlag = true;
    } else {
      this.enableFlag = false;
    }
    this.bmPeformanceReportForm.controls.srSubReportType.setValue(name);
  }

  selectReportType(event) {
    if (this.srReportForm.controls.srReportType.value === 'Maintenance Performance Report') {
      this.srReportForm.controls.srType.setValidators(Validators.required);
      this.srReportForm.updateValueAndValidity();
      this.disableColumnsBasedOnReportType = false;
    } else {
      this.disableColumnsBasedOnReportType = true;
    }
    if (this.srReportForm.controls.srReportType.value === this.bdPerformanceReport) {
      this.enableFieldSet = true;
      this.disableAllFieldsForBMMaintenanceReport = false;
      this.srReportForm.controls.srType.setValue('BM');      
      this.bmPeformanceReportForm.controls.srReportType.setValue(this.bdPerformanceReport);
    } else {
      this.enableFieldSet = false;
      this.disableAllFieldsForBMMaintenanceReport = true;
      this.bmPeformanceReportForm.controls.srReportType.setValue('');
      this.srReportForm.controls.srType.setValue('');
    }
    this.enableIncident(this.srReportForm.controls.srReportType.value);
  }

  checkMandatoryFields: boolean = false;
  submitForQualityIndicator() {
    
    if (this.srReportForm.controls.locationName.value === '') {
      this.commonService.openToastWarningMessage("Kindly enter the Branch Name");
    } else {
      if (this.srReportForm.controls.srType.value === '' || this.srReportForm.controls.srType.value === null) {
        this.commonService.openToastWarningMessage("Kindly enter the Work Order Type");
      } else {
        this.checkMandatoryFields = true;
      }
    }
    this.srReportForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.srReportForm.controls.createdDtDisp.value));
    this.srReportForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.srReportForm.controls.updatedDtDisp.value));

    this.srReportForm.controls.reportStartDtDisp.setValue(this.commonService.convertToDateStringdd_mm_yyyy(this.srReportForm.controls.createdDtDisp.value));
    this.srReportForm.controls.reportEndDtDisp.setValue(this.commonService.convertToDateStringdd_mm_yyyy(this.srReportForm.controls.updatedDtDisp.value));

    this.dialogRef.close(this.srReportForm.getRawValue());
  }

  performanceReport: boolean = false;
  submitPerformanceReport() {
    this.bmPeformanceReportForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.srReportForm.controls.createdDtDisp.value));
    this.bmPeformanceReportForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.srReportForm.controls.updatedDtDisp.value));
    //for display
    this.bmPeformanceReportForm.controls.reportStartDtDisp.setValue(this.commonService.convertToDateStringdd_mm_yyyy(this.srReportForm.controls.createdDtDisp.value));
    this.bmPeformanceReportForm.controls.reportEndDtDisp.setValue(this.commonService.convertToDateStringdd_mm_yyyy(this.srReportForm.controls.updatedDtDisp.value));
    if (this.bmPeformanceReportForm.controls.srSubReportType.value === "Resolved By Service Engineer") {
      if (this.bmPeformanceReportForm.controls.assignedToId.value > 0) {
        this.performanceReport = true;
      } else {
        this.commonService.openToastWarningMessage("Kindly enter the Service Engineer")
      }
    } else if (this.bmPeformanceReportForm.controls.srSubReportType.value === "Resolved By Department") {
      if (this.bmPeformanceReportForm.controls.departmentId.value > 0) {
        this.performanceReport = true;
      } else {
        this.commonService.openToastWarningMessage("Kindly enter the Department")
      }
    } else if (this.bmPeformanceReportForm.controls.srSubReportType.value === "Resolved By External Resource") {
      this.performanceReport = true;
    } else if (this.bmPeformanceReportForm.controls.srSubReportType.value === "Resolved Beyond Hours") {
      if (this.srReportForm.controls.beyondHours.value > 0) {
        this.bmPeformanceReportForm.controls.beyondHours.setValue(this.srReportForm.controls.beyondHours.value);
        this.performanceReport = true;
      } else {
        this.commonService.openToastWarningMessage("Beyond hours should greater than 0")
      }
    } else if (this.bmPeformanceReportForm.controls.srSubReportType.value === "") {
      this.performanceReport = true;
    }
    if (this.performanceReport) {
      this.commonService.commonListService('generateBreakDownPerformanceReport.sams', this.bmPeformanceReportForm.getRawValue()).subscribe(
        (data) => {
          this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
        }, error => {
        }
      );
    }
  }

  selectedGroupByColumn(event) {
    if (event === undefined) {
      this.srReportForm.controls.groupByColumnName.setValue('');
    } else {
      if(event.columnName === 'AMC' || event.columnName === 'CMC' || event.columnName === 'LEASE' || event.columnName === 'RENTAL'){
        this.srReportForm.controls.contractType.setValue(event.columnName)
      }else if(event.columnName === 'CONTRACT' || event.columnName === 'WARRANTY' || event.columnName === 'EXTENDED WARRANTY'){
        this.srReportForm.controls.coverageType.setValue(event.columnName)
       }
      this.srReportForm.controls.groupByColumnName.setValue(event.columnName);
    }

  }

  setDuration(event) {
    if (event === undefined) {
      this.srReportForm.controls.period.setValue('');
    } else {
      if(event.period === 'Daily'){
        this.exceedsCurrentDate =true;
        this.srReportForm.controls.createdDtDisp.setValue(this.commonService.getCurrentDateYYYYMMDD());
        this.srReportForm.controls.updatedDtDisp.setValue(this.commonService.getCurrentDateYYYYMMDD())
      }else if(event.period === 'Monthly'){
        var date= new Date();
        //get month frist date
        var firstDay =   new Date(date.getFullYear(), date.getMonth(), 1); 

        //month last date
        var lastDay =   new Date(date.getFullYear(), date.getMonth() + 1, 0); 

        //check whether last date exceeds current date
        if(lastDay> new Date()){
          //next button should be disabled if last day exceed current date
          this.exceedsCurrentDate=true;
          this.srReportForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(firstDay));
          this.srReportForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(new Date()));           
        }else{
          this.exceedsCurrentDate = false;
        this.srReportForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(firstDay));
        this.srReportForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(lastDay)); 
        }          
      }else{
        var currentDate = new Date;
        //week first date
        var firstWeekday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
        //week last date
        var lastWeekday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()+6));

        //check whether last date exceeds current date
        if(lastWeekday>new Date()){
          this.exceedsCurrentDate= true;
          this.srReportForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(firstWeekday));
          this.srReportForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(new Date()));
        }else{
        this.srReportForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(firstWeekday));
        this.srReportForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(lastWeekday));  
        }
      }
      this.srReportForm.controls.period.setValue(event.period);
     // this.disableNextAndPrevButton=true;
     this.hidePeriod(this.srReportForm.controls.period.value)
    }
  }

  selectedOrder(event) {
    if (event !== undefined){
      this.srReportForm.controls.orderBy.setValue(event.orderBy);
    } 
     else {
      this.srReportForm.controls.orderBy.setValue('');
    }
  }

  changeToNext(event){
    this.exceedsCurrentDate=false;
  
    var currentFromDate= new Date(this.srReportForm.controls.updatedDtDisp.value);
    var currentToDate = new Date(this.srReportForm.controls.updatedDtDisp.value)
    if(this.srReportForm.controls.period.value === 'Daily'){
      currentFromDate.setDate(currentFromDate.getDate()+1);
      currentToDate.setDate(currentToDate.getDate()+1)

      //check if currentFromDate exceeds today's date
      if(currentToDate>=new Date() ) {
        this.exceedsCurrentDate=true;
        this.srReportForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(new Date()))
      this.srReportForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(new Date()));
      }else{
        this.exceedsCurrentDate=false;
        this.srReportForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(currentFromDate))
        this.srReportForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(currentToDate))

      }   
    }else if(this.srReportForm.controls.period.value === 'Monthly'){
      var currentDate= new Date(this.srReportForm.controls.createdDtDisp.value);
      var firstDay =   new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 1); 
      var lastDay =   new Date(currentDate.getFullYear(), (currentDate.getMonth()+1) + 1, 0); 
      if(lastDay >= new Date()){
        this.exceedsCurrentDate= true;
        this.srReportForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(firstDay));
      this.srReportForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(new Date()))
      }else{
        this.exceedsCurrentDate= false;
      this.srReportForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(firstDay));
      this.srReportForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(lastDay));
      }
    }else{
        currentFromDate.setDate(currentFromDate.getDate() + (1 + 7 - currentFromDate.getDay()) % 7);
        var firstWeekday = new Date(currentFromDate.setDate(currentFromDate.getDate() - currentFromDate.getDay()));
        var lastWeekday = new Date(currentFromDate.setDate(currentFromDate.getDate() - currentFromDate.getDay()+6));
        if(firstWeekday>= new Date()){
          this.exceedsCurrentDate=true;
          this.srReportForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.srReportForm.controls.createdDtDisp.value));
          this.srReportForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.srReportForm.controls.updatedDtDisp.value));
        }else if(lastWeekday >= new Date()){
          this.exceedsCurrentDate = true;
          this.srReportForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(firstWeekday));
          this.srReportForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(new Date()));
        }else{
        this.exceedsCurrentDate=false;
        this.srReportForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(firstWeekday));
        this.srReportForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(lastWeekday));
    }
  }
  }
  changeToPrevious(event){
    var currentFromDate= new Date(this.srReportForm.controls.createdDtDisp.value);
    var currentToDate = new Date(this.srReportForm.controls.updatedDtDisp.value)
    if(this.srReportForm.controls.period.value === 'Daily'){

      currentFromDate.setDate(currentFromDate.getDate()-1);
      currentToDate.setDate(currentToDate.getDate()-1)

      //check if currentFromDate exceeds today's date
      if(currentToDate>= new Date() ) {
        this.exceedsCurrentDate=true;
        this.srReportForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(new Date()))
         this.srReportForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(new Date()));
      }else{
        this.exceedsCurrentDate=false;
      this.srReportForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(currentFromDate))
      this.srReportForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(currentToDate))
      }
    }else if(this.srReportForm.controls.period.value === 'Monthly'){
        var currentDate= new Date(this.srReportForm.controls.createdDtDisp.value);
        var firstDay =   new Date(currentDate.getFullYear(), currentDate.getMonth()-1, 1); 
        var lastDay =   new Date(currentDate.getFullYear(), (currentDate.getMonth()-1) + 1, 0);
        
        if(lastDay>= new Date()){
          this.exceedsCurrentDate= true;
          this.srReportForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(firstDay));
        this.srReportForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(new Date()))
        }else{
          this.exceedsCurrentDate= false;
        this.srReportForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(firstDay));
        this.srReportForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(lastDay));
        }
      }else{
        currentFromDate.setDate(currentFromDate.getDate() - (currentFromDate.getDay() +6) % 7);
        var firstWeekday = new Date(currentFromDate.setDate(currentFromDate.getDate() - currentFromDate.getDay()));
        var lastWeekday = new Date(currentFromDate.setDate(currentFromDate.getDate() - currentFromDate.getDay()+6));
        if(firstWeekday>= new Date()){
          this.exceedsCurrentDate= true;
          this.srReportForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.srReportForm.controls.createdDtDisp.value));
          this.srReportForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.srReportForm.controls.updatedDtDisp.value));
        }else if(lastWeekday >= new Date()){
           this.exceedsCurrentDate = true;
           this.srReportForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(firstWeekday));
          this.srReportForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(new Date()));
           
        }else{
          this.exceedsCurrentDate=false;
        this.srReportForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(firstWeekday));
        this.srReportForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(lastWeekday));
        }
      }
    }

    hidePeriod(period){
      if(period !== null){
        this.disableNextAndPrevButton = true;
      }else{
        this.disableNextAndPrevButton = false;
      }
    }

    loadSrStatusComboData(searchValue) {
      
      this.scrollSrStatusSync = true;
      this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '50' : '';
      this.commonService.getComboResults('fetchSRStatusList.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.srStatusPageNumber
        , '0', '').subscribe(
          (data) => {
            this.getData = new getData();
            this.getData = this.commonService.fetchDataList(searchValue, this.srStatusPageNumber , this.srStatusCombo , data.responseData.comboList)
            this.srStatusPageNumber = this.getData.pageNumber;
            this.srStatusCombo = this.getData.dataList;
            this.scrollSrStatusSync = false;
          }
        );
    }

    selectedSrStatus(event){
      if(event !== undefined){
        this.srReportForm.controls.srStatusId.setValue(event.srStatusId);
        this.srReportForm.controls.srStatusName.setValue(event.srStatusName);
      }else{
        this.srReportForm.controls.srStatusId.setValue(0);
        this.srReportForm.controls.srStatusName.setValue('');
      }
    }

    enableIncident(reportType){
      if(reportType === 'Work Order Detail Report'){
        this.showIncident=true;
      }else{
        this.showIncident=false;

      }

    }
 
  }







