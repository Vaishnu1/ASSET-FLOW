import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AssetOptimaServices } from '../../../../../Constants/AssetOptimaServices';
import { CommonService } from '../../../../../Services/common-service/common.service';
import { AssetOptimaConstants } from '../../../../../Constants/AssetOptimaConstants';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationPopupComponent } from './modal/registration-popup/registration-popup.component';
import { Location } from '@angular/common';
import { UniqueValidationModel } from '../../../../../Model/base/uniqueValidation';
import { UserSessionService } from '../../../../../Services/user-session-service/user-session.service';
import { DeleteConfirmationComponent } from '../../../../Common-components/delete-confirmation/delete-confirmation.component';
import { departmentModel } from '../../../../../Model/master/department';
import { CommonHint } from '../../../../../Constants/CommonHint';
import { AssetSubCategoryModel } from '../../../../../Model/master/asset-sub-category';
import { getData } from '../../../../../Model/common/fetchListData';
import { DateTimeService } from 'src/app/Services/date-time/date-time.service';
import { DepartmentSubdepartmentCreateComponent } from './department-subdepartment-create/department-subdepartment-create.component';

export interface Department {
  orgId?: number;
}

@Component({
  selector: 'app-location-create',
  templateUrl: './location-create.component.html',
  styleUrls: ['./location-create.component.css']
})
export class LocationCreateComponent implements OnInit {
  _Tax: any[] = [];
  displayedColumns = ['sno', 'name', 'email', 'phone', 'action'];
  displayedregsiterColumns = ['sno', 'name', 'info', 'action'];
  displayedDepartmentColumns = ['Select', 'sno', 'departmentName', 'reportingInchargeName', 'designation', 'block', 'floor', 'room', 'segment', 'subDepartmentName'];
  displayedAssetCodeColumns = ['selectAssetCode', 'sno', 'subCategoryName', 'prefix', 'variable_1', 'variable_2', 'variable_3', 'separator'];
  public cities: any = [{ orgCity: 'Coimbatore' }, { orgCity: 'Salem' }, { orgCity: 'Chennai' }];

  uploadLocationFlag: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  locationCreateFormGroup: FormGroup;
  deptForm: FormGroup;
  assetCodeGeneration: FormGroup;

  // User Define
  pId = 0;
  locRegistrationList = new MatTableDataSource<any>()
  locDepartmentList: any[] = [];
  locAssetCodeGenerationList: any[] = [];
  locSubDepartmentList: any[] = [];

  //UNIQUE CONSTRAINS
  ErrorMsgLocation: string;
  ErrorMsgLocationCode: string;
  ErrorMsgLocationShortName: string;
  tempValueLocation: String = '';
  tempValueLocationCode: string = '';
  tempValueLocationShortName: string = '';

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();
  regionPageNumber: number;
  legalEntityPageNumber: number;
  statePageNumber: number;
  cityPageNumber: number;
  countryPageNumber: number;

  formOneValid: boolean = false;  // valid if form one
  formOneDirty: boolean = false;  // make dirty form one touched
  formTwoValid: boolean = false;  // valid if form two
  formTwoDirty: boolean = false;  // make dirty form two touched

  modeDisplay: boolean = false;
  regionscrollsync: boolean = false;
  legalcrollsync: boolean = false;
  stateScrollsync: boolean = false;
  cityscrollsync: boolean = false;
  currencyScrollsync: boolean = false;
  countryScrollsync: boolean = false;
  personscrollsync: boolean = false;
  designationScrollsync: boolean = false;
  selectAllFlag: boolean = false;
  blockScrollsync: boolean = false;
  floorScrollsync: boolean = false;
  roomScrollsync: boolean = false;
  segmentScrollsync: boolean = false;
  locDeptIndex: number = -1;

  //COMBO
  countries: any = [];
  states: any = [];
  legalentitylist: any = [];
  departmentList: any = [];
  regionlist: any = [];
  currencycdList: any = [];
  editMode: boolean = false;
  //BUTTONS DISPLAY
  disbleClear: boolean = false;
  displayButton: string;
  headingDisplay: string;
  inchargeNameList: any[] = [];
  isAnySelected: boolean = false;
  isSelecetdSuBCategoryIsAny: boolean = false;
  enableUpdate: boolean = false;

  //FOR COMBO
  recordsPerPageForCombo: number;
  currentPageNumber: number;
  limitCount: any;
  skipCount: any;
  searchKey: any = '';
  designationList: any[] = [];
  selectedIndex: number = 0;
  maxNumberOfTabs: number = 4;
  blockList: any[] = [];
  floorList: any[] = [];
  roomList: any[] = [];
  segmentList: any[] = [];

  public departmentModel: departmentModel;
  public assetSubCategory: AssetSubCategoryModel;

  localRegistrationTempPush: any = [];

  @ViewChild('locationName') locationNameFocus: ElementRef;
  @ViewChild('locationCode') locationCodeFocus: ElementRef;
  @ViewChild('tab1Focus') streetNametab1Focus: ElementRef;
  @ViewChild('tab2Focus') contactNameTab2Focus: ElementRef;

  inchargePageNumber: number;
  departmentPageNumber: number;
  currencyCdPageNumber: number;
  fyStartMonthDisp: string = '';
  blockPageNumber: number;
  floorPageNumber: number;
  roomPageNumber: number;
  segmentPageNumber: number;

  //VARIABLES FOR CODE GENERATION
  variableList = [
    { id: 1, name: 'ASSET CATEGORY' },
    { id: 2, name: 'ASSET GROUP' },
    { id: 3, name: 'BRANCH' },
    { id: 4, name: 'DEPARTMENT' },
    { id: 5, name: 'LEGAL ENTITY' },
    { id: 6, name: 'ORGANIZATION' },
    { id: 7, name: 'REGION' },
    { id: 8, name: 'SUB CATEGORY' },
    { id: 9, name: 'SUB DEPARTMENT' }
  ]
  getData: getData;

  selectedFormat: string;
  formatList = [];

  moduleTabAccessForm: FormGroup;
  viewFlag: boolean;

  moduleNameList = [
    { "moduleName": "ASSET REGISTER" },
    // {"moduleName" : "WORK ORDER"},

  ]

  locationModuleTabAccessList = [];
  tabAccessForm: FormGroup;
  moduleName: string = '';

  constructor(private readonly samsService: AssetOptimaServices,
    private readonly commonService: CommonService,
    private readonly assetOptimaConstants: AssetOptimaConstants,
    private readonly activatedRoute: ActivatedRoute,
    private readonly dialog: MatDialog,
    private readonly changeDetectorRefs: ChangeDetectorRef,
    private readonly location: Location,
    private readonly detectorRefs: ChangeDetectorRef,
    private readonly userSessionService: UserSessionService,
    private readonly userSession: UserSessionService,
    private readonly router: Router,
    private _dateTimeService: DateTimeService,
    private fb: FormBuilder

  ) {
    this.recordsPerPageForCombo = 10;
    this.currentPageNumber = 0;
    this.departmentModel = new departmentModel();
    this.assetSubCategory = new AssetSubCategoryModel();
    this.regionPageNumber = 1;
    this.legalEntityPageNumber = 1;
    this.statePageNumber = 1;
    this.cityPageNumber = 1;
    this.inchargePageNumber = 1;
    this.departmentPageNumber = 1;
    this.currencyCdPageNumber = 1;
    this.countryPageNumber = 1;
    this.blockPageNumber = 1;
    this.floorPageNumber = 1;
    this.roomPageNumber = 1;
    this.segmentPageNumber = 1;

    this.formatList = this.assetOptimaConstants.formatList;
  }

  ngOnInit() {
    this.locDeptIndex = -1;
    this.locRegistrationList.data = [];
    this.locationCreateFormGroup = new FormGroup({
      orgName: new FormControl(''),
      locationName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      locId: new FormControl(0),
      locationCode: new FormControl('', [Validators.maxLength(5)]),
      regionName: new FormControl(null, [Validators.maxLength(50)]),
      regionId: new FormControl(0),
      legalEntityName: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      legalEntityId: new FormControl(0),
      entityGroupId: new FormControl(0),
      entityGroupName: new FormControl(''),
      locAddress1: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      locAddress2: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      locCity: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      locCityId: new FormControl(0),
      locState: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      locStateId: new FormControl(0),
      locCountry: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      locCountryId: new FormControl(0),
      locPinCode: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      contactPhoneNo: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(15), Validators.pattern(this.assetOptimaConstants.phoneNumberValidation)]),
      altPhoneNo: new FormControl('', [Validators.maxLength(15), Validators.minLength(10), Validators.pattern(this.assetOptimaConstants.phoneNumberValidation)]),
      locEmailId: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(this.assetOptimaConstants.emailValidation)]),
      contactPersonName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      locRegistrationList: new FormControl([]),
      locDepartmentList: new FormControl([]),
      locAssetCodeGenerationList: new FormControl([]),
      active: new FormControl(true),
      enableCustomerEntry: new FormControl(false),
      locShortName: new FormControl(''),
      languageCode: new FormControl(''),
      labelLanguage: new FormControl(''),
      labelFilePath: new FormControl(''),
      popAccountPwd: new FormControl(''),
      popAccountId: new FormControl(''),
      popServerName: new FormControl(''),
      smtpServerName: new FormControl(''),
      smtpPortNo: new FormControl(''),
      locCurCd: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      locWebURL: new FormControl(''),
      locationId: new FormControl(''),
      orgId: new FormControl(this.userSession.getUserOrgId),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      locationType: new FormControl(null, [Validators.required]),
      userLocationSessionTimeOut: new FormControl(30),
      fyStartMonth: new FormControl(null, [Validators.required]),
      fyEndMonth: new FormControl(null, [Validators.required]),
      checkAttendanceForAsssigEng: new FormControl(''),
      dateFormat: new FormControl('', [Validators.required]),

      locationModuleTabAccessList: new FormControl([]),
    });
    this.deptForm = new FormGroup({
      designationId: new FormControl(''),
      designation: new FormControl(''),
      inchargeName: new FormControl(''),
      inchargeId: new FormControl(0),
      departmentName: new FormControl(''),
      departmentId: new FormControl(''),
      employeeId: new FormControl(''),
      locationId: new FormControl(''),
      orgId: new FormControl(''),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
    });
    this.assetCodeGeneration = new FormGroup({
      locAssetCodeGenerationId: new FormControl(0),
      subCategoryId: new FormControl(0),
      subCategoryName: new FormControl(''),
      prefix: new FormControl(0),
      variable1: new FormControl(''),
      variable2: new FormControl(''),
      variable3: new FormControl(''),
      separator: new FormControl('', Validators.maxLength(1)),
      autoGenerateFlag: new FormControl(false),
      locationName: new FormControl(''),
      locationId: new FormControl(0),
      orgId: new FormControl(''),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      assetCategoryTO: new FormControl([])
    });

    this.moduleTabAccessForm = new FormGroup({

      locModuleTabAccessId: new FormControl(0),
      moduleName: new FormControl('Asset_Register', [Validators.required]),
      tabName: new FormControl(''),
      isEnabled: new FormControl(false),

      //COMMON OBJECTS
      createdDt: new FormControl(''),
      createdBy: new FormControl(''),
      updatedDt: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      pageNumber: new FormControl(''),
      recordsPerPage: new FormControl(''),
      orgName: new FormControl(''),
      orgId: new FormControl(''),
      locationId: new FormControl(''),

    })

    this.locationCreateFormGroup.controls['locState'].disable();
    this.locationCreateFormGroup.controls['locCity'].disable();
    this.validateEditMode();
    //Disable Entity Group Name
    this.locationCreateFormGroup.controls.entityGroupName.disable();
  }


  validateEditMode() {
    this.activatedRoute.params.subscribe(
      params => {
        let primaryId = params.pId;
        primaryId = Number(primaryId);
        const mode = params.mode;

        if (primaryId <= 0) {
          this.headingDisplay = "Create";
          this.displayButton = "Submit";
          this.commonService.setFormFocus(this.locationNameFocus);
          //TO GET DEPARTMENT LIST FOR MAPPING
          this.getListofAllDepartment();
          this.getListofAllSubCategoryList();
          this.getOrgDetails();
          this.tempValueLocation = '';
          this.tempValueLocationCode = '';
          this.tempValueLocationShortName = '';
        } else {
          this.commonService.commonGetService(this.samsService.loadLocationInfo, primaryId).subscribe(
            data => {
              this.locationCreateFormGroup.patchValue(data.responseData);
              this.locationCreateFormGroup.controls.legalEntityName.setValue(data.responseData.legalEntityTO.legalEntityName);
              if (data.responseData.regionTO != null && data.responseData.regionTO.regionName != null) {
                this.locationCreateFormGroup.controls.regionName.setValue(data.responseData.regionTO.regionName);
              }
              this.locRegistrationList.data = this.locationCreateFormGroup.controls.locRegistrationList.value;
              this.locDepartmentList = this.locationCreateFormGroup.controls.locDepartmentList.value;
              this.locAssetCodeGenerationList = this.locationCreateFormGroup.controls.locAssetCodeGenerationList.value;
              this.tempValueLocation = data.responseData.locationName != null ? data.responseData.locationName : '';
              this.tempValueLocationCode = data.responseData.locationCode != null ? data.responseData.locationCode : '';
              this.tempValueLocationShortName = data.responseData.locShortName != null ? data.responseData.locShortName : '';

              this.formOneValidation();
              this.formTwoValidation();
              ;
            }
          );
          if (mode === 'view') {
            this.modeDisplay = true;
            this.locationCreateFormGroup.disable();
            this.headingDisplay = "View";
          } else {
            //button and heading names for edit
            this.headingDisplay = "Edit";
            this.displayButton = "Update";
            this.disbleClear = true;
            this.locationCreateFormGroup.controls.locationName.disable();
            this.locationCreateFormGroup.controls['locState'].enable();
            this.locationCreateFormGroup.controls['locCity'].enable();
            this.commonService.setFormFocus(this.locationCodeFocus);

          }

        }
      }
    );
  }

  getOrgDetails() {
    let userOrgId = this.userSessionService.getUserOrgId();
    this.commonService.commonGetService(this.samsService.loadOrganisationDtl, userOrgId).subscribe(
      data => {
        this.locationCreateFormGroup.controls['dateFormat'].setValue(data.responseData.dateFormat);
      }
    );
  }

  getListofAllDepartment() {
    this.commonService.commonListService('fetchListOfAllDepartment.sams', this.departmentModel).subscribe(
      data => {
        if (data.success) {
          this.locDepartmentList = data.responseData.dataList;
          for (let i = 0; this.locDepartmentList.length > i; i++) {
            this.locDepartmentList[i].active = false;
          }
        }
      }
    );
  }

  getListofAllSubCategoryList() {
    this.assetSubCategory.direction = 'asc';
    this.assetSubCategory.columnName = 'subCategoryName';
    this.assetSubCategory.sourceScreen = 'LOCATION';
    this.commonService.commonListService('fetchListOfAllAssetSubCategory.sams', this.assetSubCategory).subscribe(
      data => {
        if (data.success) {
          this.locAssetCodeGenerationList = data.responseData.dataList;
          for (var i = 0; this.locAssetCodeGenerationList.length > i; i++) {
            this.locAssetCodeGenerationList[i].autoGenerateFlag = false;
            this.locAssetCodeGenerationList[i].active = false;
          }
        }
      });
  }

  save() {

    const updatedTabs = this.locationModuleTabAccessList;
    console.log('Updated Tab Access:', updatedTabs);
    this.locationCreateFormGroup.controls.locationModuleTabAccessList.setValue(this.locationModuleTabAccessList);

    this.uploadLocationFlag = true;
    this.locationCreateFormGroup.controls.locRegistrationList.setValue(this.locRegistrationList.data);
    this.locationCreateFormGroup.controls.locDepartmentList.setValue(this.locDepartmentList);
    this.locationCreateFormGroup.controls.locAssetCodeGenerationList.setValue(this.locAssetCodeGenerationList);

    let userData = this.userSessionService.getUserData();

    userData.dateFormat = this.locationCreateFormGroup.controls.dateFormat.value;

    this.userSessionService.initiateUserSession(userData);

    this._dateTimeService.format = this.locationCreateFormGroup.controls.dateFormat.value;
    if (this.locationCreateFormGroup.controls.locationCode.value.trim() == "") {
      this.locationCreateFormGroup.controls.locationCode.setValue(null);
    }

    this.commonService.commonInsertService(this.samsService.saveLocation, this.locationCreateFormGroup.getRawValue()).subscribe(
      data => {
        if (data.success) {
          this.uploadLocationFlag = false;
          this.commonService.openToastSuccessMessage(data.message);
          this.location.back();
        } else {
          this.uploadLocationFlag = false;
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
        this.uploadLocationFlag = false;
        this.commonService.openToastErrorMessage(this.assetOptimaConstants.serverError);
      }
    );
    localStorage.setItem('previousRoute', this.router.url);
  }

  deleteRegistration(deleteid, index) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Registration Info'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          if (deleteid <= 0) {
            this.localRegistrationTempPush = this.locRegistrationList.data;
            this.locRegistrationList.data.splice(index, 1);
            this.locRegistrationList.data = this.localRegistrationTempPush;
            this.detectorRefs.detectChanges();
            this.commonService.openToastSuccessMessage("Record Deleted Successfully.");
          } else {
            this.commonService.commonGetService('deleteLocationRegistration.sams', deleteid).subscribe(
              data => {
                if (data.success) {
                  this.commonService.openToastSuccessMessage(data.message);
                  this.localRegistrationTempPush = this.locRegistrationList.data;
                  this.locRegistrationList.data.splice(index, 1);
                  this.locRegistrationList.data = this.localRegistrationTempPush;
                  this.detectorRefs.detectChanges();
                } else {
                  this.commonService.openToastErrorMessage(data.message);
                }
              }
            );
          }
          this.enableUpdate = true;
        }
      });
  }

  saveUpdateRegistration() {
    const dialogRef = this.dialog.open(RegistrationPopupComponent, {
      height: 'auto',
      width: '350px',
      data: { 'locRegistrationId': '0' }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          if (data) {
            this.localRegistrationTempPush = this.locRegistrationList.data;
            let duplicatePresent = this.localRegistrationTempPush.findIndex(obj => ((((obj.registrationName).trim()).toLowerCase()) == (((data.registrationName).trim()).toLowerCase()))) === -1;

            if (this.locRegistrationList.data.length === 0 || duplicatePresent) {
              this.checkIsEmpty((((data.registrationName).trim()).toLowerCase()), data);
            }
            else {
              this.commonService.openToastWarningMessage("Registration Name already exists");
            }
            this.enableUpdate = true;
          }
        }
      });
  }

  checkIsEmpty(regName, data) {
    if (regName !== "") {
      this.localRegistrationTempPush.push(data);
      this.locRegistrationList.data = this.localRegistrationTempPush;
    } else {
      this.commonService.openToastWarningMessage("Registration Name is Invalid");
    }
  }

  setLegalEntityValue(comboValue) {
    if (comboValue === undefined) {
      this.legalEntityPageNumber = 1;
      this.legalentitylist = [];
    } else {
      this.locationCreateFormGroup.controls.legalEntityId.setValue(comboValue.legalEntityId);
      this.locationCreateFormGroup.controls.legalEntityName.setValue(comboValue.legalEntityName);
      this.locationCreateFormGroup.controls.entityGroupId.setValue(comboValue.entityGroupId);
      this.locationCreateFormGroup.controls.entityGroupName.setValue(comboValue.entityGroupName);
    }


  }
  setRegionComboValue(comboValue) {
    if (comboValue === undefined) {
      this.locationCreateFormGroup.get('regionId').setValue(0);
      this.regionPageNumber = 1;
      this.regionlist = [];
    } else {
      this.locationCreateFormGroup.get('regionId').setValue(comboValue.regionId);
    }
  }
  setLocationType(value) {
    if (value.id === 1) {
      this.locationCreateFormGroup.controls.enableCustomerEntry.setValue(true);
    } else {
      this.locationCreateFormGroup.controls.enableCustomerEntry.setValue(false);
    }

  }
  exit() {
    localStorage.setItem('previousRoute', this.router.url);
    this.location.back();
  }

  locationtypelist = [
    // { id: 1, name: 'SERVICE PROVIDER' },
    // { id: 2, name: 'END USER' },
    // { id: 3, name: 'HEALTH CARE SERVICE PROVIDER' }
    { id: 1, name: 'SERVICE PROVIDER' },
    { id: 2, name: 'END USER' },
    { id: 3, name: 'VENDOR LOCATION' },
    { id: 4, name: 'HEAD OFFICE' },
    { id: 5, name: 'REGIONAL OFFICE' },
  ];

  public fields: Object = { text: 'Name', value: 'Id' };
  // set the placeholder to MultiSelect input element
  public waterMark: string = 'Departments';
  // set the type of mode for how to visualized the selected items in input element.
  public default: string = 'Default';
  public box: string = 'Box';
  public delimiter: string = 'Delimiter';


  //COMBO METHOD

  getCountryData(searchValue) {
    this.countryScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '50' : '';
    this.commonService.getComboResults(this.samsService.listOfAllCountryForCombo, searchValue.term, '', '', this.limitCount, this.countryPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.countryPageNumber, this.countries, data.responseData.comboList)
        this.countryPageNumber = this.getData.pageNumber;
        this.countries = this.getData.dataList;
        this.countryScrollsync = false;
      });
  }

  getStateData(searchValue) {
    const locCountryId = this.locationCreateFormGroup.controls.locCountryId.value;
    this.stateScrollsync = true;
    if (locCountryId > 0) {
      this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '50' : '';
      this.commonService.getComboResults(this.samsService.listOfStateCombo, searchValue.term, locCountryId, '', this.limitCount, this.statePageNumber, this.locationCreateFormGroup.controls['locCountry'].value !== 0 ? this.locationCreateFormGroup.controls['locCountry'].value : '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.statePageNumber, this.states, data.responseData.comboList)
          this.statePageNumber = this.getData.pageNumber;
          this.states = this.getData.dataList;
          this.stateScrollsync = false;
        }
      );
    } else {
      this.states = [];
      this.statePageNumber = 1;
      this.stateScrollsync = false;
      this.commonService.openToastWarningMessage(`Kindly Select The "Country".`);
    }
  }


  getCityData(searchValue) {
    const suppLocStateId = this.locationCreateFormGroup.controls.locStateId.value;
    const locCountryId = this.locationCreateFormGroup.controls.locCountryId.value;

    this.cityscrollsync = true;
    if (suppLocStateId > 0) {
      this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '50' : '';
      this.commonService.getComboResults(this.samsService.listOfCityCombo, searchValue.term, '', '', this.limitCount, this.cityPageNumber, this.locationCreateFormGroup.controls['locState'].value !== null ? this.locationCreateFormGroup.controls['locState'].value : '', this.locationCreateFormGroup.controls['locCountry'].value !== null ? this.locationCreateFormGroup.controls['locCountry'].value : '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.cityPageNumber, this.cities, data.responseData.comboList)
          this.cityPageNumber = this.getData.pageNumber;
          this.cities = this.getData.dataList;
          this.cityscrollsync = false;
        }
      );
    } else {
      this.cities = [];
      this.cityPageNumber = 1;
      this.cityscrollsync = false;
      if (locCountryId === 0 && suppLocStateId === 0) {
        this.commonService.openToastWarningMessage(`Kindly Select The "Country" And The "State".`);
      } else if (locCountryId > 0 && suppLocStateId === 0) {
        this.commonService.openToastWarningMessage(`Kindly Select The "State".`);
      }
    }
  }


  getStateList(event) {
    this.locationCreateFormGroup.controls['locCity'].setValue('');
    this.locationCreateFormGroup.controls['locCityId'].setValue(0);
    if (event === undefined) {
      this.locationCreateFormGroup.controls['locState'].setValue('');
      this.locationCreateFormGroup.controls['locStateId'].setValue(0);
      this.locationCreateFormGroup.controls['locCity'].disable();
      this.cityPageNumber = 1;
      this.statePageNumber = 1;
      this.states = [];
      this.cities = [];
    } else {
      this.locationCreateFormGroup.controls['locState'].setValue(event.stateName);
      this.locationCreateFormGroup.controls['locStateId'].setValue(event.stateId);
      this.locationCreateFormGroup.controls['locCity'].enable();
      this.cityPageNumber = 1;
      this.cities = [];
    }
  }

  getCityList(event) {

    if (event) {
      this.locationCreateFormGroup.controls['locCity'].setValue(event.cityName);
      this.locationCreateFormGroup.controls['locCityId'].setValue(event.cityId);
      // this.cityPageNumber = 1;
    } else {
      this.locationCreateFormGroup.controls['locCity'].setValue('');
      this.locationCreateFormGroup.controls['locCityId'].setValue(0);
      this.cityPageNumber = 1;
      this.cities = [];
    }
  }

  getDateFormat(event) {
    if (event) {
      this.locationCreateFormGroup.controls['dateFormat'].setValue(event);
      this.cityPageNumber = 1;
    } else {
      this.locationCreateFormGroup.controls['dateFormat'].setValue('');
    }
  }

  getCountryList(event) {
    if (event === null || event === undefined) {
      this.locationCreateFormGroup.controls['locCity'].setValue('');
      this.locationCreateFormGroup.controls['locCityId'].setValue(0);
      this.locationCreateFormGroup.controls['locCity'].disable();
      this.locationCreateFormGroup.controls['locState'].setValue('');
      this.locationCreateFormGroup.controls['locStateId'].setValue(0);
      this.locationCreateFormGroup.controls['locState'].disable();
      this.locationCreateFormGroup.controls['locCountry'].setValue('');
      this.locationCreateFormGroup.controls['locCountryId'].setValue(0);
      this.countryPageNumber = 1;
      this.cityPageNumber = 1;
      this.statePageNumber = 1;
      this.countries = [];
      this.states = [];
      this.cities = [];
    } else {
      this.locationCreateFormGroup.controls['locCountry'].setValue(event.countryName);
      this.locationCreateFormGroup.controls['locCountryId'].setValue(event.countryId);
      this.locationCreateFormGroup.controls['locState'].enable();
      this.statePageNumber = 1;
      this.states = [];
    }
  }


  disableError() {
    this.locationCreateFormGroup.controls.locEmailId.setErrors(null);
    this.locationCreateFormGroup.controls.locEmailId.markAsUntouched();

    this.locationCreateFormGroup.controls.contactPhoneNo.setErrors(null);
    this.locationCreateFormGroup.controls.contactPhoneNo.markAsUntouched();
  }

  listOfLegalEntityGroup(searchValue) {
    this.legalcrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.samsService.listOfAllLegalEntity, searchValue.term, '', '', this.limitCount, this.legalEntityPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.legalEntityPageNumber, this.legalentitylist, data.responseData.comboList)
        this.legalEntityPageNumber = this.getData.pageNumber;
        this.legalentitylist = this.getData.dataList;
        this.legalcrollsync = false;
      }
    );
  }

  getEntityGroup(event) {
    this.locationCreateFormGroup.get('itemTypeId').setValue(event.itemTypeId);

  }

  listOfRegion(searchValue) {
    this.regionscrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.samsService.listOfAllRegion, searchValue.term, '', '', this.limitCount, this.regionPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.regionPageNumber, this.regionlist, data.responseData.comboList)
        this.regionPageNumber = this.getData.pageNumber;
        this.regionlist = this.getData.dataList;
        this.regionscrollsync = false;
      }
    );
  }

  regionValues(event) {
    if (event === undefined) {
      this.locationCreateFormGroup.get('regionId').setValue(0);
      this.regionPageNumber = 1;
    } else {
      this.locationCreateFormGroup.get('regionId').setValue(event.regionId);
    }

  }

  listOfCurrencyCd(searchValue) {
    this.currencyScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '5' : '';
    this.commonService.getComboResults(this.samsService.listOfCurCdCombo, searchValue.term, '', '', this.limitCount, this.currencyCdPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.currencyCdPageNumber, this.currencycdList, data.responseData.comboList)
        this.currencyCdPageNumber = this.getData.pageNumber;
        this.currencycdList = this.getData.dataList;
        this.currencyScrollsync = false;
      }
    );
  }

  setCurrencyCd(event) {
    if (event === undefined) {
      this.locationCreateFormGroup.controls['locCurCd'].setValue('');
      this.currencyCdPageNumber = 1;
      this.currencycdList = [];
    } else {
      this.locationCreateFormGroup.controls['locCurCd'].setValue(event.curCd);
    }
  }

  validateUniqueConstraint() {
    if (this.locationCreateFormGroup.controls.locationName.value != '') {
      this.locationCreateFormGroup.controls.locationName.setValue(this.locationCreateFormGroup.controls.locationName.value.trim())
    }

    if (((this.tempValueLocation !== null || this.tempValueLocation !== '') ? this.tempValueLocation.toLowerCase() : '') ===
      ((this.locationCreateFormGroup.controls.locationName.value != null) ? this.locationCreateFormGroup.controls.locationName.value.toLowerCase() : '')) {

    } else {
      const constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.base.LocationTO";
      constraintData.constraints = {
        'locationName': this.locationCreateFormGroup.controls.locationName.value,
        'orgId': this.userSessionService.getUserOrgId()
      };
      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if (!data.success) {
            this.ErrorMsgLocation = data.message;
            this.locationCreateFormGroup.controls.locationName.setErrors(Validators.minLength);
            this.locationCreateFormGroup.controls.locationName.setErrors({ "notUnique": true });
          } else {
            //show the warning invalidate the form group   
            this.ErrorMsgLocation = '';
            this.locationCreateFormGroup.controls.locationName.setErrors(null);
          }
        }
      );
    }
  }

  validateUniqueConstraintForCode() {
    if (this.locationCreateFormGroup.controls.locationCode.value != '' && this.locationCreateFormGroup.controls.locationCode.value != null) {
      this.locationCreateFormGroup.controls.locationCode.setValue(this.locationCreateFormGroup.controls.locationCode.value.trim())
    }

    if (((this.tempValueLocationCode !== null || this.tempValueLocationCode !== '') ? this.tempValueLocationCode.toLowerCase() : '') ===
      ((this.locationCreateFormGroup.controls.locationCode.value != null) ? this.locationCreateFormGroup.controls.locationCode.value.toLowerCase() : '')) {

    } else {
      const constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.base.LocationTO";
      constraintData.constraints = {
        'locationCode': this.locationCreateFormGroup.controls.locationCode.value,
        'orgId': this.userSessionService.getUserOrgId()
      };
      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if (!data.success) {
            this.ErrorMsgLocationCode = data.message;
            this.locationCreateFormGroup.controls.locationCode.setErrors(Validators.minLength);
            this.locationCreateFormGroup.controls.locationCode.setErrors({ "notUnique": true });
          } else {
            //show the warning invalidate the form group   
            this.ErrorMsgLocationCode = '';
            this.locationCreateFormGroup.controls.locationCode.setErrors(null);
          }
        }
      );
    }
  }

  validateUniqueConstraintForShortName() {
    if (this.locationCreateFormGroup.controls.locShortName.value != '' && this.locationCreateFormGroup.controls.locShortName.value != null) {
      this.locationCreateFormGroup.controls.locShortName.setValue(this.locationCreateFormGroup.controls.locShortName.value.trim())
    }

    if (((this.tempValueLocationShortName !== null || this.tempValueLocationShortName !== '') ? this.tempValueLocationShortName.toLowerCase() : '') ===
      ((this.locationCreateFormGroup.controls.locShortName.value != null) ? this.locationCreateFormGroup.controls.locShortName.value.toLowerCase() : '')) {

    } else {
      const constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.base.LocationTO";
      constraintData.constraints = {
        'locShortName': this.locationCreateFormGroup.controls.locShortName.value,
        'orgId': this.userSessionService.getUserOrgId()
      };
      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if (!data.success) {
            this.ErrorMsgLocationShortName = data.message;
            this.locationCreateFormGroup.controls.locShortName.setErrors(Validators.minLength);
            this.locationCreateFormGroup.controls.locShortName.setErrors({ "notUnique": true });
          } else {
            //show the warning invalidate the form group   
            this.ErrorMsgLocationShortName = '';
            this.locationCreateFormGroup.controls.locShortName.setErrors(null);
          }
        }
      );
    }
  }

  clear() {
    this.locationCreateFormGroup.reset();
    this.locationCreateFormGroup.updateValueAndValidity();
    this.assetCodeGeneration.reset();
    this.assetCodeGeneration.updateValueAndValidity();
    this.locationNameFocus.nativeElement.focus();
    this.formOneValid = false;
    this.formTwoValid = false;
  }


  //List of designation
  listOfDesignation(searchValue) {
    this.designationScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.samsService.listOfAllDesignationCombo, searchValue.term, '', '', this.limitCount, this.departmentPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.departmentPageNumber, this.designationList, data.responseData.comboList)
        this.departmentPageNumber = this.getData.pageNumber;
        this.designationList = this.getData.dataList;
        this.designationScrollsync = false;
      }
    );
  }

  getDesignationValue(event, index) {
    this.enableUpdate = true;
    if (event === undefined) {
      this.locDepartmentList[index].designationId = 0;
      this.departmentPageNumber = 1;
      this.designationList = [];
    } else {
      this.locDepartmentList[index].designationId = event.designationId;
    }
  }

  getEmployeeValue(event, index) {
    this.enableUpdate = true;
    if (event === undefined) {
      this.locDepartmentList[index].inchargeId = 0;
      this.locDepartmentList[index].designationId = 0;
      this.locDepartmentList[index].designation = '';
      this.inchargePageNumber = 1;
      this.inchargeNameList = [];
    } else {
      this.locDepartmentList[index].inchargeId = event.employeeId;
      this.locDepartmentList[index].designationId = event.designationId;
      this.locDepartmentList[index].designation = event.designationName;
    }
  }
  getDepartmentValue(event) {
    this.deptForm.get('departmentId').setValue(event.departmentId);
  }

  // Add Department
  addDepartment() {
    this.locDepartmentList = this.locDepartmentList.concat(this.deptForm.value);
    this.deptForm.reset();
    this.deptForm.updateValueAndValidity();
  }

  //Inactive Department
  listOfDeptLoc = [];

  selectAll(value: boolean) {
    this.enableUpdate = true;
    for (let i = 0; this.locDepartmentList.length > i; i++) this.locDepartmentList[i].active = value;
  }

  selectOne(event, index) {
    this.enableUpdate = true;
    if (!event) {
      this.locDepartmentList[index].inchargeName = '';
      this.locDepartmentList[index].designation = '';
      this.locationCreateFormGroup.controls.locDepartmentList.setValue(this.locDepartmentList);
    }
  }

  // listOfPersonInCharge(searchValue) {
  //   this.personscrollsync = true;
  //   this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
  //   this.commonService.getComboResults('listAllEmployeeForOrgCombo.sams', searchValue.term, '', '', this.limitCount, this.inchargePageNumber).subscribe(
  //     (data) => {
  //       this.getData = new getData();
  //       this.getData = this.commonService.fetchDataList(searchValue, this.inchargePageNumber , this.inchargeNameList , data.responseData.comboList)
  //       this.inchargePageNumber = this.getData.pageNumber;
  //       this.inchargeNameList = this.getData.dataList;
  //       this.personscrollsync = false;
  //     }
  //   );
  // }

  listOfPersonInCharge(searchValue) {
    if (this.locationCreateFormGroup.controls.locationId.value > 0) {
      this.personscrollsync = true;
      const locId = this.locationCreateFormGroup.controls.locationId.value;
      this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
      this.commonService.getComboResults('listOfAllEmployeeComboByLocId.sams', 0, searchValue.term, locId, this.limitCount, this.inchargePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.inchargePageNumber, this.inchargeNameList, data.responseData.comboList)
          this.inchargePageNumber = this.getData.pageNumber;
          this.inchargeNameList = this.getData.dataList;
          this.personscrollsync = false;
        }
      );
    } else {
      this.personscrollsync = true;
      this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
      this.commonService.getComboResults('listAllEmployeeForOrgCombo.sams', searchValue.term, '', '', this.limitCount, this.inchargePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.inchargePageNumber, this.inchargeNameList, data.responseData.comboList)
          this.inchargePageNumber = this.getData.pageNumber;
          this.inchargeNameList = this.getData.dataList;
          this.personscrollsync = false;
        }
      );
    }

  }


  // Move to Next Tab
  nextStep() {
    if (this.selectedIndex === 0) {
      this.disableError();
    }
    if (this.selectedIndex !== this.maxNumberOfTabs) {
      this.selectedIndex = this.selectedIndex + 1;
    }
  }

  previousStep() {
    if (this.selectedIndex !== 0) {
      this.selectedIndex = this.selectedIndex - 1;
    }
  }

  // Check validation based on form
  // form one validation (* in-order to check individual form dirty)
  formOneValidation() {


    this.formOneDirty = true;
    if ( // Form One Validation
      this.locationCreateFormGroup.controls.locAddress1.valid &&
      this.locationCreateFormGroup.controls.locAddress2.valid &&
      this.locationCreateFormGroup.get('locCity').valid &&
      this.locationCreateFormGroup.get('locState').valid &&
      this.locationCreateFormGroup.get('locPinCode').valid &&
      this.locationCreateFormGroup.get('locCountry').valid &&
      this.locationCreateFormGroup.get('locCurCd').valid &&
      this.locationCreateFormGroup.get('dateFormat').valid
    ) {
      this.formOneValid = true;
    } else {
      this.formOneValid = false;
    }
  }

  // form two validation (* in-order to check individual form dirty)
  formTwoValidation() {
    this.formTwoDirty = true;
    if ( // Form Two Validation
      this.locationCreateFormGroup.get('contactPersonName').valid &&
      this.locationCreateFormGroup.get('locEmailId').valid &&
      this.locationCreateFormGroup.get('contactPhoneNo').valid &&
      this.locationCreateFormGroup.get('altPhoneNo').valid
    ) {
      this.formTwoValid = true;
    } else {
      this.formTwoValid = false;
    }
  }

  changeTabValidation(event) {
    if (event.index === 0) {
      this.streetNametab1Focus.nativeElement.focus();
    }
    if (event.index === 1) {
      this.formOneValidation();
    }
    if (event.index === 2) {
      this.formOneValidation();
      this.formTwoValidation();
    }
    if (event.index === 3) {
      this.formOneValidation();
      this.formTwoValidation();
    }
    this.changeDetectorRefs.detectChanges();
  }

  //FINANCIAL YEAR CALCULATION
  listofMonth = [
    { id: 1, name: 'JANUARY' },
    { id: 2, name: 'FEBRUARY' },
    { id: 3, name: 'MARCH' },
    { id: 4, name: 'APRIL' },
    { id: 5, name: 'MAY' },
    { id: 6, name: 'JUNE' },
    { id: 7, name: 'JULY' },
    { id: 8, name: 'AUGUST' },
    { id: 9, name: 'SEPTEMBER' },
    { id: 10, name: 'OCTOBER' },
    { id: 11, name: 'NOVEMBER' },
    { id: 12, name: 'DECEMBER' }
  ];

  months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

  updateFyEndMonth(startMonth) {
    let monthValue;
    if (startMonth !== null || startMonth !== undefined)
      this.listofMonth.forEach((array) => {
        if (array.name === startMonth) {
          monthValue = array.id;
        }
      });
    const nextFrequency = parseInt(monthValue) + parseInt('10') > 11 ? parseInt(monthValue) + parseInt('10') - 11 : parseInt(monthValue) + parseInt('10');
    this.fyStartMonthDisp = this.months[nextFrequency - parseInt('1')];
    this.listofMonth.push({ id: 13, name: this.fyStartMonthDisp });
    this.locationCreateFormGroup.controls.fyEndMonth.setValue(this.fyStartMonthDisp);
  }

  selectAllAssetCode(assetCodeFlag) {
    for (let i = 0; this.locAssetCodeGenerationList.length > i; i++) this.locAssetCodeGenerationList[i].autoGenerateFlag = assetCodeFlag;
  }

  backToOrganization() {
    this.location.back();
  }

  setVariableOne(event, i) {
    this.enableUpdate = true;
    if (event === undefined) {
      this.assetCodeGeneration.controls.variable1.setValue('');
    } else {
      if (this.locAssetCodeGenerationList[i].variable2 === event.name || this.locAssetCodeGenerationList[i].variable3 === event.name) {
        this.locAssetCodeGenerationList[i].variable1 = null;
        this.commonService.openToastWarningMessage("Selected Variable Exists Already");
      } else {
        this.assetCodeGeneration.controls.variable1.setValue(event.name);
      }
    }
  }

  setVariableTwo(event, i) {
    this.enableUpdate = true;
    if (event === undefined) {
      this.assetCodeGeneration.controls.variable2.setValue('');
    } else {
      if (this.locAssetCodeGenerationList[i].variable1 === event.name || this.locAssetCodeGenerationList[i].variable3 === event.name) {
        this.locAssetCodeGenerationList[i].variable2 = null;
        this.commonService.openToastWarningMessage("Selected Variable Exists Already");
      } else {
        this.assetCodeGeneration.controls.variable2.setValue(event.name);
      }
    }
  }

  setVariableThree(event, i) {
    this.enableUpdate = true;
    if (event === undefined) {
      this.assetCodeGeneration.controls.variable3.setValue('');
    } else {
      if (this.locAssetCodeGenerationList[i].variable1 === event.name || this.locAssetCodeGenerationList[i].variable2 === event.name) {
        this.locAssetCodeGenerationList[i].variable3 = null;
        this.commonService.openToastWarningMessage("Selected Variable Exists Already");
      } else {
        this.assetCodeGeneration.controls.variable3.setValue(event.name);
      }
    }
  }

  isSubCategoryIsAny(subCategoryName, active, i) {
    this.enableUpdate = true;
    if (subCategoryName === 'ANY' && active === true) {
      this.isAnySelected = true;
    }
    else {
      this.isAnySelected = false;
    }
    if (active === true) {
      this.assetCodeGeneration.controls.autoGenerateFlag.setValue(true);
    } else {
      this.assetCodeGeneration.controls.autoGenerateFlag.setValue(false);
    }
  }

  enableUpdateButton() {
    this.enableUpdate = true;
  }

  addItem() {

  }

  listOfBlock(searchValue) {
    this.blockScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllBuildingCombo.sams', searchValue.term, '', '', this.limitCount, this.blockPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.blockPageNumber, this.blockList, data.responseData.comboList)
        this.blockPageNumber = this.getData.pageNumber;
        this.blockList = this.getData.dataList;
        this.blockScrollsync = false;
      }
    );
  }

  listOfFloor(searchValue) {
    this.floorScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllFloorCombo.sams', searchValue.term, '', '', this.limitCount, this.floorPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.floorPageNumber, this.floorList, data.responseData.comboList)
        this.floorPageNumber = this.getData.pageNumber;
        this.floorList = this.getData.dataList;
        this.floorScrollsync = false;
      }
    );
  }

  listOfRoom(searchValue) {
    this.roomScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllRoomCombo.sams', searchValue.term, '', '', this.limitCount, this.roomPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.roomPageNumber, this.roomList, data.responseData.comboList)
        this.roomPageNumber = this.getData.pageNumber;
        this.roomList = this.getData.dataList;
        this.roomScrollsync = false;
      }
    );
  }

  listOfSegment(searchValue) {
    this.segmentScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllSegmentCombo.sams', searchValue.term, '', '', this.limitCount, this.segmentPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.segmentPageNumber, this.segmentList, data.responseData.comboList)
        this.segmentPageNumber = this.getData.pageNumber;
        this.segmentList = this.getData.dataList;
        this.segmentScrollsync = false;
      }
    );
  }

  dialogRef;
  createDeptWithSubDept(deptIndex, headType) {
    let locDeptId;
    if (headType == 'Add') {
      locDeptId = this.locDepartmentList[deptIndex].departmentId;
    } else {
      locDeptId = this.locDepartmentList[deptIndex].locDepartmentId;
    }
    if (this.locDepartmentList[deptIndex].active) {
      this.dialogRef = this.dialog.open(DepartmentSubdepartmentCreateComponent, {
        height: '600px',
        width: '90%',
        data: {
          'locDeptList': this.locDepartmentList[deptIndex],
          'locDeptId': locDeptId,
          'headType': headType,
          'locDeptIndex': deptIndex,
          'locationId':this.locationCreateFormGroup.controls.locationId.value
        }
      });
      this.dialogRef.disableClose = true;
      this.dialogRef.afterClosed().subscribe(
        data => {
          if (!data.exit) {
            this.locDeptIndex = data.locDeptIndex;
            this.locDepartmentList[deptIndex].locSubDepartmentTO = data.locSubDeptList;
          }
        });
    } else {
      this.commonService.openToastWarningMessage('Kindly select department');
    }
  }

  editSubDepartment() {

  }

  getBlockValue(event, index) {
    if (event === undefined) {
      this.locDepartmentList[index].buildingBlockId = 0;
      this.blockPageNumber = 1;
      this.blockList = [];
    } else {
      this.locDepartmentList[index].buildingBlockId = event.buildingBlockId;
    }
  }

  getFloorValue(event, index) {
    if (event === undefined) {
      this.locDepartmentList[index].buildingFloorId = 0;
      this.floorPageNumber = 1;
      this.floorList = [];
    } else {
      this.locDepartmentList[index].buildingFloorId = event.buildingFloorId;
    }
  }

  getRoomValue(event, index) {
    if (event === undefined) {
      this.locDepartmentList[index].buildingRoomId = 0;
      this.roomPageNumber = 1;
      this.roomList = [];
    } else {
      this.locDepartmentList[index].buildingRoomId = event.buildingRoomId;
    }
  }

  getSegmentValue(event, index) {
    if (event === undefined) {
      this.locDepartmentList[index].buildingSegmentId = 0;
      this.segmentPageNumber = 1;
      this.segmentList = [];
    } else {
      this.locDepartmentList[index].buildingSegmentId = event.buildingSegmentId;
    }
  }

  changeModuleName(event) {

    if (event != undefined) {
      const moduleName = event.moduleName;
      const locationId = this.locationCreateFormGroup.controls.locationId.value;
      console.log("locationId", this.locationCreateFormGroup.getRawValue())
      this.commonService.commonGetService('fetchLocationModuleTabAccessList.sams', locationId, moduleName).subscribe(
        data => {

          this.locationModuleTabAccessList = data.responseData;

          this.moduleName = this.locationModuleTabAccessList[0].moduleName;

          this.tabAccessForm = this.fb.group({});

          // Initialize form controls for each tab in the list
          this.locationModuleTabAccessList.forEach((tab, index) => {
            this.tabAccessForm.addControl(
              'tab_' + index,
              this.fb.control(tab.isEnabled)
            );
          });

        });
    } else {
      this.moduleName = '';
      this.locationModuleTabAccessList = [];
    }


  }

  onTabToggle(index: number, event: any): void {
    // Update the isEnabled value in the list based on checkbox toggle
    this.locationModuleTabAccessList[index].isEnabled = event.target.checked;
  }

}

