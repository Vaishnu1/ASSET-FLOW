import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommonService } from '../../../../Services/common-service/common.service';
import { AssetOptimaServices } from '../../../../Constants/AssetOptimaServices';
import { Location } from '@angular/common';
import { CommonHint } from '../../../../Constants/CommonHint';
import { GatePassHdrModel } from '../../../../Model/asset/gatePassHdr';
import { AssetOptimaConstants } from '../../../../Constants/AssetOptimaConstants';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { UserSessionService } from '../../../../Services/user-session-service/user-session.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ConfirmConfirmationComponent } from '../../../Common-components/confirm-confirmation/confirm-confirmation.component';
import { allBusinessPartnerRoles } from 'src/app/Constants/AllStatusConstants';

import { allloanStatus } from '../../../../Constants/AllStatusConstants';
import { TranslateService } from '@ngx-translate/core';
import { getData } from 'src/app/Model/common/fetchListData';
import { ReturnRequestPopupComponent } from '../return-request-popup/return-request-popup.component';
import * as moment from 'moment';

@Component({
  selector: 'app-loan-create',
  templateUrl: './loan-create.component.html',
  styleUrls: ['./loan-create.component.css']
})
export class LoanCreateComponent implements OnInit {

  @ViewChild('assetCode') assetCodeFocus: NgSelectComponent;

  loanApprovalFlag: boolean = false;
  CommonhintMsg = new CommonHint();
  saveSuccessBoolean: boolean = false;
  currentDate:Date = new Date();

  employeeId: string = '0';
  approvalId: string = '0';
  approvebuttonEnable: boolean = false;

  scrollsyncAssetCondition: boolean = false;
  assetConditionPageNumber: number;
  assetConditionCombo: any = [];

  gatePassDisplayedColumns = ['sno', 'gatePassNo', 'generatedDate', 'gatePassStatus', 'approvedBy', 'approvedDate', 'updatedBy', 'updatedDt', 'action'];
  gatePassDataSource = [];

  public gatePassHdrModel: GatePassHdrModel;

  loanCreateForm: FormGroup;
  scrollsyncAssetCode: boolean = false;
  recordsPerPageForCombo: string = '0';
  assetCodePageNumber: number;
  custScrollsync: boolean = false;
  userPageNumber: number;
  customerEmployeeSupplierComboData: any = [];
  loanToName: string;
  locationPageNumber: number;
  scrollsyncLocation: boolean = false;
  scrollsyncLocation1: boolean = false;
  locationCombo: any = [];
  scrollsyncDept: boolean = false;
  departmentPageNumber: number;
  limitCount: string;
  departmentList: any = [];
  pageSize: string;
  pageIndex: string;
  subLoader: boolean = false;
  length: number;
  isLoanedToOthers: boolean = false;
  uploadLoanFlag: boolean = false;
  headingDisplay: string;
  displayButton: string;
  modeDisplay: boolean = false;
  disbleClear: boolean = false;

  loanNumber: any;

  accessoriesDataSource = new MatTableDataSource<any>();
  accessoriesDispCol = ['sno', 'itemName', 'itemDesc', 'accessoriesIssued', 'accessoriesReturned', 'rightof', 'rightofRemarks'];

  childAssetDataSource = new MatTableDataSource<any>()
  childAssetDispCol = ['sno', 'childAssetCode', 'ChildAssetModel', 'childAssetIssued', 'childAssetReturned', 'rightof', 'rightofRemarks'];

  loanStatusPageNumber: number;
  loanStatusList: any = [];

  //Set Page Title
  title = 'Asset Optima - Loan/Returns';

  scrollContractNumberSync: boolean = false;
  contractNumberPageNumber: number;
  contractNumberList: any = [];

  scrollSuppliersync: boolean = false;
  supplierListPageNumber: number;
  supplierList: any = [];

  scrollSupplierLocationSync: boolean = false;
  supplierLocationListPageNumber: number;
  supplierLocationCombo: any = [];

  scrollManufacturersync: boolean = false;
  manufacturerListPageNumber: number;
  manufacturerList: any = [];

  manuServiceLocationList: any = [];
  manuServiceLocationPageNumber: number;
  scrollManuServiceLocationSync: boolean = false;

  scrollsyncEmployee1: boolean = false;
  scrollsyncEmployee2: boolean = false;
  scrollsyncEmployee3: boolean = false;
  employeePageNumber: number;
  employeeCombo: any = [];
  recordsPerPageForEmpCombo: string;

  scrollCustomersync: boolean = false;
  customerListPageNumber: number;
  customerList: any = [];

  scrollCustomerLocationSync: boolean = false;
  customerLocationListPageNumber: number;
  customerLocationCombo: any = [];

  returnInfoTabvalid : boolean = false;
  returnInfoTabEnable : boolean = false;

  loanToOptions = [
    { id: 2, name: 'CUSTOMER' },
    { id: 1, name: 'EMPLOYEE' },
    { id: 3, name: 'SUPPLIER' },
    { id: 4, name: 'OTHERS' },
    { id: 5, name: 'BRANCH' },
    { id: 6, name: 'MANUFACTURER' },
  ];

  loanToOptionsemp = [
    { id: 2, name: 'CUSTOMER' },
    { id: 3, name: 'SUPPLIER' },
    { id: 4, name: 'OTHERS' },
    { id: 5, name: 'BRANCH' },
    { id: 6, name: 'MANUFACTURER' },
  ];

  assetCodeCombo: any = [];

  //APPROVALS
  public loanTransactionId: any;
  public transactionSource: any;
  getData: getData;
  status: string;
  loanType:String;

  constructor(private commonService: CommonService,
    private samsServices: AssetOptimaServices,
    private location: Location,
    private assetOptimaConstants: AssetOptimaConstants,
    private router: Router,
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private dialog: MatDialog,
    private userSession: UserSessionService) {
    this.gatePassHdrModel = new GatePassHdrModel();
    this.assetCodePageNumber = 1;
    this.userPageNumber = 1;
    this.locationPageNumber = 1;
    this.departmentPageNumber = 1;
    this.gatePassHdrModel.pageNumber = 1;
    this.loanStatusPageNumber = 1;
    this.contractNumberPageNumber = 1;
    this.supplierListPageNumber = 1;
    this.supplierLocationListPageNumber = 1;
    this.manufacturerListPageNumber = 1;
    this.manuServiceLocationPageNumber = 1;
    this.employeePageNumber = 1;
    this.customerLocationListPageNumber = 1;
    this.customerListPageNumber = 1;
    this.assetConditionPageNumber=1;

    //Loan Approvals
    this.loanApprovalFlag = this.assetOptimaConstants.loanReturnApproval;

  }

  ngOnInit() {
    this.childAssetDataSource.data = [];
    this.accessoriesDataSource.data = [];
    this.titleService.setTitle(this.title);
    this.loanCreateForm = new FormGroup({
      loanId: new FormControl(0),
      assetCode: new FormControl('', Validators.required),
      loanNo: new FormControl(''),
      loanNumber: new FormControl(''),
      locationId: new FormControl(0),
      locationName: new FormControl('', Validators.required),
      assetId: new FormControl(0),
      modelId: new FormControl(''),
      loanedTo: new FormControl('', Validators.required),
      loanedToName: new FormControl(null,Validators.required),
      loanedToId: new FormControl(0),
      loanedToSiteName: new FormControl('', Validators.required),
      loanedToSiteId: new FormControl(0),
      loanedPersonName: new FormControl(''),
      loanedPersonContactNo: new FormControl('', [Validators.maxLength(15), Validators.minLength(10), Validators.pattern(this.assetOptimaConstants.phoneNumberValidation)]),
      loanedPersonEmailId: new FormControl('', Validators.pattern(this.assetOptimaConstants.emailValidation)),
      loanedAssetCondition: new FormControl('', [Validators.maxLength(20)]),
      loanedAssetConditionId: new FormControl(0),
      loanType: new FormControl('', [Validators.required]),
      contractNo: new FormControl(''),
      loanStatus: new FormControl(''),
      loanStatusId: new FormControl(0),
      fromDt: new FormControl(''),
      toDt: new FormControl(''),
      fromDtDisp: new FormControl(new Date(), Validators.required),
      toDtDisp: new FormControl('', Validators.required),
      dateOfReturn: new FormControl(''),
      dateOfReturnDisp: new FormControl(''),
      returnAssetCondition: new FormControl(null),
      returnAssetConditionId: new FormControl(0),
      returnById: new FormControl(''),
      returnedByName: new FormControl(''),
      returnedByContactNo: new FormControl('', [Validators.maxLength(15), Validators.minLength(10), Validators.pattern(this.assetOptimaConstants.phoneNumberValidation)]),
      returnedByEmailId: new FormControl('',Validators.pattern(this.assetOptimaConstants.emailValidation)),
      returnReceivedById: new FormControl(0),
      returnReceivedBy: new FormControl(null),
      returnReceivedContactNo: new FormControl('', [Validators.maxLength(15), Validators.minLength(10), Validators.pattern(this.assetOptimaConstants.phoneNumberValidation)]),
      returnReceivedEmailId: new FormControl('',Validators.pattern(this.assetOptimaConstants.emailValidation)),
      returnRemarks: new FormControl(''),
      assetStatusPreviousId: new FormControl(''),
      remarks: new FormControl('', Validators.required),
      loanRaisedBy: new FormControl(''),
      loanChildAsset: new FormControl([]),
      loanAssetAccessories: new FormControl([]),
      createdBy: new FormControl(this.userSession.getUserName()),
      updatedBy: new FormControl(''),
      createdDt: new FormControl(new Date()),
      updatedDt: new FormControl(Date),
      createdDtDisp: new FormControl(this.commonService.convertToDateStringdd_mm_yyyy(new Date())),
      UpdatedDtDisp: new FormControl(''),
      equipmentCode: new FormControl(''),
      assetCategoryName: new FormControl(''),
      subCategoryName: new FormControl(''),
      assetGroupName: new FormControl(''),
      description: new FormControl(''),
      modelName: new FormControl(''),
      manufacturerName: new FormControl(''),
      assetStatus: new FormControl(''),
      serialNo: new FormControl(''),
      departmentName: new FormControl(''),
      subDepartment: new FormControl(''),
      loanedRemarks: new FormControl(''),
      returnToDeptId: new FormControl(0),
      returnToDeptName: new FormControl(''),
      raiseReturn: new FormControl(false),
      generateGatePass: new FormControl(false),
      sourceScreen: new FormControl('EXTERNAL'),
      groupNo: new FormControl(0),
      loanApprovedBy: new FormControl(''),
      loanApprovedDt: new FormControl(''),
      receivedApprovedBy: new FormControl(''),
      receivedApprovedDt: new FormControl(''),
      loanApprovedDtDisp: new FormControl(''),
      receivedApprovedDtDisp: new FormControl(''),
      gatePassReturned: new FormControl(false),
      assetTransactionSrcDesc : new FormControl(''),
      assetTransactionSrc : new FormControl('')
    })
    this.gatePassHdrModel.direction = 'desc';
    this.gatePassHdrModel.columnName = 'updatedDt';
    this.loanCreateForm.controls.locationId.setValue(this.userSession.getUserLocationId());
    this.loanCreateForm.controls.locationName.setValue(this.userSession.getUserLocationName());
    this.disableAssetInfoField();
    this.validateEditMode();
    this.loanCreateForm.controls.contractNo.disable();
  }

  ngAfterViewInit() {
    this.commonService.setComboFocus(this.assetCodeFocus);
  }

  disableAssetInfoField() {
    this.loanCreateForm.controls.assetCategoryName.disable();
    this.loanCreateForm.controls.subCategoryName.disable();
    this.loanCreateForm.controls.assetGroupName.disable();
    this.loanCreateForm.controls.description.disable();
    this.loanCreateForm.controls.modelName.disable();
    this.loanCreateForm.controls.manufacturerName.disable();
    this.loanCreateForm.controls.assetStatus.disable();
    this.loanCreateForm.controls.equipmentCode.disable();
    this.loanCreateForm.controls.serialNo.disable();
    this.loanCreateForm.controls.departmentName.disable();
    this.loanCreateForm.controls.subDepartment.disable();
    this.loanCreateForm.controls.loanStatus.disable();
    this.loanCreateForm.controls.loanNumber.disable();
    this.loanCreateForm.controls.assetTransactionSrcDesc.disable();
  }

  loanTypeList = [
    { id: 1, name: 'RENTAL' },
    { id: 2, name: 'LEASE' },
    { id: 3, name: 'LOAN' }
  ];

  enableSave: boolean = false;
  returnedAllItems: boolean = false;
  save() {
    this.uploadLoanFlag = true;
    this.loanCreateForm.controls.fromDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.loanCreateForm.controls.fromDtDisp.value));
    this.loanCreateForm.controls.toDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.loanCreateForm.controls.toDtDisp.value));
    this.loanCreateForm.controls.loanAssetAccessories.setValue(this.accessoriesDataSource.data);
    this.loanCreateForm.controls.loanChildAsset.setValue(this.childAssetDataSource.data);
    if (this.loanCreateForm.controls.loanStatusId.value === allloanStatus.LOANED || this.loanCreateForm.controls.loanStatusId.value === allloanStatus.RETURN_REJECTED) {
      if (this.loanCreateForm.controls.returnReceivedById.value > 0 && this.loanCreateForm.controls.returnAssetCondition.value !== '' && this.loanCreateForm.controls.returnedByName.value !=='') {
        this.enableSave = true;
        this.loanCreateForm.controls.raiseReturn.setValue(true);
        this.loanCreateForm.controls.loanStatusId.setValue(allloanStatus.REQUEST_FOR_RETURN);
        if (this.childAssetDataSource.data.length > 0 || this.accessoriesDataSource.data.length > 0) {
          this.returnedAllItems = this.checkReturnConditions(this.accessoriesDataSource.data, this.childAssetDataSource.data);
          if (this.returnedAllItems) {
            this.enableSave = true;
          } else {
            this.commonService.openToastWarningMessage("Kindly Return All Accessories/Child Assets");
            this.enableSave = false;
            this.uploadLoanFlag = false;
          }
        }
      } else {
        this.enableSave = false;
        this.commonService.openToastWarningMessage("Kindly enter the Return Info");
        this.loanCreateForm.controls.raiseReturn.setValue(false);
        this.uploadLoanFlag = false;
      }
    } else {
      this.enableSave = true;
    }

    if (this.enableSave) {
      this.loanCreateForm.controls.raiseReturn.setValue(true);
      this.commonService.commonInsertService(this.samsServices.saveOrUpdateLoanAndReturns, this.loanCreateForm.getRawValue()).subscribe(
        data => {
          if (data.success) {
            // this.uploadLoanFlag = false;
            this.commonService.openToastSuccessMessage(data.message);
            this.location.back();
            this.saveSuccessBoolean = true;
          } else {
            // this.uploadLoanFlag = false;
            this.commonService.openToastErrorMessage(data.message);
          }
        }, error => {
          //this.uploadLoanFlag = false;
          this.commonService.openToastErrorMessage(this.assetOptimaConstants.serverError);
        }
      );
    }

    localStorage.setItem('previousRoute', this.router.url);
  }

  accessoriesReturnedAll: boolean = false;
  childAssetReturnedAll: boolean = false;
  checkReturnConditions(accessoriesList, childAssetList) {

    if (accessoriesList.length > 0) {
      accessoriesList.map(obj => {
        if (obj.accessoriesIssued) {
          this.countforAccessoriesIssued = this.countforAccessoriesIssued + 1;
        }
        if (obj.accessoiredReturned) {
          this.countforAccessoriesReturned = this.countforAccessoriesReturned + 1;
        }
        if (obj.writtenoff) {
          this.countforAccessorieswrittenOff = this.countforAccessorieswrittenOff + 1;
        }
      });
      if (this.countforAccessoriesIssued = this.countforAccessoriesReturned + this.countforAccessorieswrittenOff) {
        this.accessoriesReturnedAll = true;
      }
    } else {
      this.accessoriesReturnedAll = true;
    }

    if (childAssetList.length > 0) {
      //TO CHECK WHETHER ALL CHILD ASSETS ARE RETURNED OR NOT
      childAssetList.map(obj1 => {
        if (obj1.childAssetIssued) {
          this.countforchildAssetIssued = this.countforchildAssetIssued + 1;
        }
        if (obj1.childAssetReturned) {
          this.countforchildAssetReturned = this.countforchildAssetReturned + 1;
        }
        if (obj1.writtenoff) {
          this.countforchildAssetWrittenOff = this.countforchildAssetWrittenOff + 1;
        }
      });
      if (this.countforchildAssetIssued = this.countforchildAssetReturned + this.countforchildAssetWrittenOff) {
        this.childAssetReturnedAll = true;
      }
    } else {
      this.childAssetReturnedAll = true;
    }

    if (this.accessoriesReturnedAll && this.childAssetReturnedAll) {
      this.returnedAllItems = true;
    }

    return this.returnedAllItems;
  }
  clear() {
    this.loanCreateForm.reset();
    this.loanCreateForm.updateValueAndValidity();
    this.commonService.setComboFocus(this.assetCodeFocus);
    this.ngOnInit();
  }

  exit() {
    this.location.back();
  }

  loadAssetCodeComboData(searchValue) {
    this.scrollsyncAssetCode = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetCodeCombo.sams', searchValue.term, this.loanCreateForm.controls.locationId.value,
      0, this.recordsPerPageForCombo, this.assetCodePageNumber, '','assetLoanReturn').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetCodePageNumber , this.assetCodeCombo , data.responseData.comboList)
          this.assetCodePageNumber = this.getData.pageNumber;
          this.assetCodeCombo = this.getData.dataList;
          //this.assetCodeCombo = (this.assetCodeCombo).filter(data => {return data.avilableToProcess === true;});
          this.scrollsyncAssetCode = false;
        }
      );
  }

  selectedAssetCodeData(event) {
    if (event === undefined) {
      this.loanCreateForm.controls.contractNo.disable();
      this.loanCreateForm.controls['assetCode'].setValue('');
      this.loanCreateForm.controls['assetHdrId'].setValue(0);
      this.assetCodePageNumber = 1;
      this.assetCodeCombo = [];
      this.childAssetDataSource.data = [];
      this.accessoriesDataSource.data = [];
    } else {
      this.loanCreateForm.controls['assetCode'].setValue(event.assetCode);
      this.loanCreateForm.controls['modelName'].setValue(event.modelName);
      this.loanCreateForm.controls.modelId.setValue(event.modelId);
      this.loanCreateForm.controls.assetCategoryName.setValue(event.assetCategoryName);
      this.loanCreateForm.controls.subCategoryName.setValue(event.subCategoryName);
      this.loanCreateForm.controls.assetGroupName.setValue(event.assetGroupName);
      this.loanCreateForm.controls.description.setValue(event.description);
      this.loanCreateForm.controls.modelName.setValue(event.modelName);
      this.loanCreateForm.controls.manufacturerName.setValue(event.manufacturerName);
      this.loanCreateForm.controls.assetStatus.setValue(event.assetStatus);
      this.loanCreateForm.controls.equipmentCode.setValue(event.equipmentCode);
      this.loanCreateForm.controls.serialNo.setValue(event.serialNo);
      this.loanCreateForm.controls.departmentName.setValue(event.departmentName);
      this.loanCreateForm.controls.subDepartment.setValue(event.subDepartment);
      this.loanCreateForm.controls.assetStatusPreviousId.setValue(event.assetStatusId);
      this.loanCreateForm.controls.assetId.setValue(event.assetHdrId);
      this.loanCreateForm.controls.contractNo.enable();
      this.loanCreateForm.controls.assetTransactionSrcDesc.setValue(event.assetTransactionSrcDesc);
      this.loanCreateForm.controls.assetTransactionSrc.setValue(event.assetTransactionSrc);

       this.translateService.get([event.assetStatus])
      .subscribe((val) => {
        const status = Object.values(val)
        this.loanCreateForm.controls.assetStatus.setValue(status[0].toString());
      });

      this.translateService.get([event.assetCondition])
      .subscribe((val) => {
        const status = Object.values(val)
        this.loanCreateForm.controls.loanedAssetCondition.setValue(status[0])
      });
      this.loanCreateForm.controls.loanedAssetConditionId.setValue(event.assetConditionId);
      this.getAccessoriesAndChildAssetList(event.modelId, this.loanCreateForm.controls.loanId.value, event.assetHdrId);
    }
  }

  getAccessoriesAndChildAssetList(modelId, loanId, assetHdrId) {
    this.commonService.commonGetService('loadAccessoriesChildAsset.sams', modelId, loanId, assetHdrId).subscribe(
      (data) => {
        this.accessoriesDataSource.data = data.responseData.loanAssetAccessories;
        this.childAssetDataSource.data = data.responseData.loanChildAsset;
      }
    );
  }

  getCustomerComboData(searchValue) {
    this.custScrollsync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.samsServices.listOfAllCustSuppEmpCombo, searchValue.term,
      0, '', this.recordsPerPageForCombo, this.userPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.userPageNumber , this.customerEmployeeSupplierComboData , data.responseData.comboList)
          this.userPageNumber = this.getData.pageNumber;
          this.customerEmployeeSupplierComboData = this.getData.dataList;
          this.custScrollsync = false;
        }
      );
  }

  loadLocationComboData(searchValue,event) {
    if(event){
      this.scrollsyncLocation = true;
    }else if (!event) {
    this.scrollsyncLocation1 = true;
    }
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.samsServices.listAllUserLocForCombo, searchValue.term, '', '',
      this.recordsPerPageForCombo, this.locationPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.locationPageNumber , this.locationCombo , data.responseData.comboList)
          this.locationPageNumber = this.getData.pageNumber;
          this.locationCombo = this.getData.dataList;
          this.scrollsyncLocation = false;
          this.scrollsyncLocation1 = false;
        }
      );
  }

  selectedLocationData(event) {
    if (event === undefined) {
      this.loanCreateForm.controls['locationId'].setValue(0);
      this.loanCreateForm.controls['locationName'].setValue('');
      this.locationPageNumber = 1;
      this.locationCombo = [];
    } else {
      this.loanCreateForm.controls['locationName'].setValue(event.locationName);
      this.loanCreateForm.controls['locationId'].setValue(event.locationId);
    }
  }

  loadDepartmentComboData(searchValue) {
    this.scrollsyncDept = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '5' : '';
    this.commonService.getComboResults(this.samsServices.listOfAllDeparment, searchValue.term, '', '', this.limitCount, this.departmentPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.departmentPageNumber , this.departmentList , data.responseData.comboList)
        this.departmentPageNumber = this.getData.pageNumber;
        this.departmentList = this.getData.dataList;
        this.scrollsyncDept = false;
      }
    );
  }

  selectedDepartmentData(event) {
    if (event === undefined) {
      this.loanCreateForm.controls.returnToDeptId.setValue(0);
      this.loanCreateForm.controls.returnToDeptName.setValue('');
      this.departmentList = [];
      this.departmentPageNumber = 1;
    } else {
      this.loanCreateForm.controls.returnToDeptId.setValue(event.departmentId);
      this.loanCreateForm.controls.returnToDeptName.setValue(event.departmentName);
    }
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
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

  selectedUserType(event) {
    this.loanCreateForm.controls.loanedToId.setValue(0);
    this.loanCreateForm.controls.loanedToName.setValue(null);
    this.loanCreateForm.controls.loanedToSiteName.setValue('');
    this.loanCreateForm.controls.loanedToSiteId.setValue(0);
    this.loanCreateForm.controls.loanedPersonName.setValue('');
    this.loanCreateForm.controls.loanedPersonContactNo.setValue('');
    this.loanCreateForm.controls.loanedPersonEmailId.setValue('');

    if(event.name === 'OTHERS'){
      this.loanCreateForm.controls.remarks.enable();
      this.loanCreateForm.controls.loanedToName.disable();
      this.loanCreateForm.controls.loanedToSiteName.disable();
    }
    else if(event.name === 'BRANCH'){
      this.loanCreateForm.controls.remarks.disable();
      this.loanCreateForm.controls.loanedToName.enable();
      this.loanCreateForm.controls.loanedToSiteName.disable();
    }
    else if(event.name === "CUSTOMER"){
      this.loanCreateForm.controls.remarks.disable();
      this.loanCreateForm.controls.loanedToName.enable();
      this.loanCreateForm.controls.loanedToSiteName.enable();
    }
    else if(event.name === "EMPLOYEE"){
      this.loanCreateForm.controls.remarks.disable();
      this.loanCreateForm.controls.loanedToName.enable();
      this.loanCreateForm.controls.loanedToSiteName.disable();
    }
    else{
      this.loanCreateForm.controls.remarks.disable();
      this.loanCreateForm.controls.loanedToName.enable();
      this.loanCreateForm.controls.loanedToSiteName.enable();

    }

  }

  validateEditMode() {
    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        primaryId = Number(primaryId);
        var mode = params.mode;
        this.loanTransactionId = Number(primaryId);
        if (primaryId <= 0) {
          this.headingDisplay = "Create";
          this.displayButton = "Submit";
          this.loanCreateForm.controls.loanStatus.setValue("LOAN-AWAITING FOR APPROVAL");
          this.returnInfoTabEnable = false;
        } else {
          if (mode === 'view') {
            this.modeDisplay = true;
            this.loanCreateForm.disable();
            this.headingDisplay = "View";
          } else {
            this.headingDisplay = "Edit";
            this.displayButton = "Update";
            this.disbleClear = true;
          }

          this.commonService.commonGetService('fetchLoanDtlByLoanId.sams', primaryId).subscribe(
            data => {

              if(data.responseData.loanStatusId == allloanStatus.REQUESTED_FOR_LOAN || data.responseData.loanStatusId == allloanStatus.LOANED || data.responseData.loanStatusId == allloanStatus.LOAN_REJECTED){
                this.transactionSource = "LOAN";
                
              }
              else if(data.responseData.loanStatusId == allloanStatus.REQUEST_FOR_RETURN  || data.responseData.loanStatusId == allloanStatus.RETURNED || data.responseData.loanStatusId == allloanStatus.RETURN_REJECTED){
                this.transactionSource = "LOAN_RETURNS";
              }

              

              this.translateService.get([data.responseData.assetStatus , data.responseData.loanStatus])
              .subscribe((val) => {
                const status = Object.values(val)

                if (data.responseData.loanStatusId == allloanStatus.LOANED || data.responseData.loanStatusId == allloanStatus.RETURNED) {
                  this.returnInfoTabvalid = true;
                  this.returnInfoTabEnable = true;
                } else {
                  this.returnInfoTabvalid = false;
                  this.returnInfoTabEnable = false;
                }

                this.loanCreateForm.patchValue(data.responseData);

                if(this.loanCreateForm.controls.gatePassReturned.value){
                  this.loanCreateForm.controls.returnedByName.setValidators([Validators.required]);
                  this.loanCreateForm.controls.returnReceivedBy.setValidators([Validators.required])
                  this.loanCreateForm.controls.returnAssetCondition.setValidators([Validators.required])
                }
                this.loanCreateForm.controls.returnedByName.setValue(data.responseData.returnedByName);
                this.loanCreateForm.controls.returnedByContactNo.setValue(data.responseData.returnedByContactNo);
                this.loanCreateForm.controls.returnedByEmailId.setValue(data.responseData.returnedByEmailId);

                this.translateService.get([data.responseData.loanedAssetCondition,data.responseData.returnAssetCondition])
                .subscribe((val) => {
                  const status = Object.values(val)
                  this.loanCreateForm.controls.loanedAssetCondition.setValue(status[0])
                  this.loanCreateForm.controls.returnAssetCondition.setValue(status[0])
                });

                if(status.length === 1){
                  this.loanCreateForm.controls.assetStatus.setValue(status[0]);
                  this.loanCreateForm.controls.loanStatus.setValue(status[0]);
                }
                else{
                this.loanCreateForm.controls.assetStatus.setValue(status[0]);
                this.loanCreateForm.controls.loanStatus.setValue(status[1]);
                }

                //this.validateReturnInfoTab();
              });
              this.loanCreateForm.controls.loanNumber.setValue(this.loanCreateForm.controls.loanNo.value)

              this.accessoriesDataSource.data = this.loanCreateForm.controls.loanAssetAccessories.value;
              this.childAssetDataSource.data = this.loanCreateForm.controls.loanChildAsset.value;
              this.getWorkflowApprovalForLoans();
              if (this.loanCreateForm.controls.loanStatusId.value === allloanStatus.LOAN_REJECTED) {
                this.modeDisplay = true;
                this.loanCreateForm.disable();
              }

              if(data.responseData.loanedTo === 'OTHERS'){
                this.loanCreateForm.controls.remarks.enable();
                this.loanCreateForm.controls.loanedToName.disable();
                this.loanCreateForm.controls.loanedToSiteName.disable();
              }
              else if(data.responseData.loanedTo === 'BRANCH'){
                this.loanCreateForm.controls.remarks.disable();
                this.loanCreateForm.controls.loanedToName.enable();
                this.loanCreateForm.controls.loanedToSiteName.disable();
              }
              else if(data.responseData.loanedTo === "CUSTOMER"){
                this.loanCreateForm.controls.remarks.disable();
                this.loanCreateForm.controls.loanedToName.enable();
                this.loanCreateForm.controls.loanedToSiteName.enable();
              }
              else if(data.responseData.loanedTo === "EMPLOYEE"){
                this.loanCreateForm.controls.remarks.disable();
                this.loanCreateForm.controls.loanedToName.enable();
                this.loanCreateForm.controls.loanedToSiteName.disable();
              }
              else{
                this.loanCreateForm.controls.remarks.disable();
                this.loanCreateForm.controls.loanedToName.enable();
                this.loanCreateForm.controls.loanedToSiteName.enable();

              }

            }
          );

        }
      }
    );

  }

  getWorkflowApprovalForLoans() {
    this.commonService.commonGetService('getWorkflowForId.sams', this.loanCreateForm.controls.loanId.value,
      this.userSession.getUserEmpId(),
      this.transactionSource, this.userSession.getUserOrgId()).subscribe(
        data => {
          if (data.success) {
            this.employeeId = this.userSession.getUserEmpId();
            this.approvebuttonEnable = data.responseData.approvalFlag;
            this.approvalId = data.responseData.workflowApprovalId;
          } else {
            this.commonService.openToastWarningMessage(data.message);
          }
        }, error => {
        }
      );
  }

  listOfLoanStatus(searchValue) {
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '5' : '';
    this.commonService.getComboResults(this.samsServices.listOfAllLoanStatusCombo, searchValue.term, '', '', this.limitCount, this.loanStatusPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.loanStatusPageNumber , this.loanStatusList , data.responseData.comboList)
        this.loanStatusPageNumber = this.getData.pageNumber;
        this.loanStatusList = this.getData.dataList;
      }
    );
  }

  getLoanStatusValue(event) {
    this.loanCreateForm.controls.loanStatusId.setValue(event.loanStatusId);
  }

  loanUpdateStatus(status) {
    this.commonService.commonGetService('updateLoanStatus.sams', this.loanCreateForm.controls.loanId.value, status, this.loanCreateForm.controls.assetHdrId.value, '', '').subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
          this.ngOnInit();
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      });
  }

  raiseReturnRequestPopUp;
  countforAccessoriesIssued: number = 0;
  countforAccessoriesReturned: number = 0;
  countforAccessorieswrittenOff: number = 0;
  countforchildAssetIssued: number = 0;
  countforchildAssetReturned: number = 0;
  countforchildAssetWrittenOff: number = 0;
  loanstatusTemp: number = 0;

  openPopUpForReturnRequest(accessoriesevent, childAssetEvent, id, sourceScreen) {
    this.loanCreateForm.controls.loanRaisedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.loanCreateForm.controls.loanRaisedDtDisp.value));
    this.loanCreateForm.controls.fromDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.loanCreateForm.controls.fromDtDisp.value));
    this.loanCreateForm.controls.toDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.loanCreateForm.controls.toDtDisp.value));
    this.loanCreateForm.controls.returnRequestRaisedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.loanCreateForm.controls.returnRequestRaisedDtDisp.value));
    this.loanCreateForm.controls.loanApprovedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.loanCreateForm.controls.loanApprovedDtDisp.value));
    this.loanCreateForm.controls.loanAssetAccessories.setValue(accessoriesevent);
    this.loanCreateForm.controls.loanChildAsset.setValue(childAssetEvent);
    this.commonService.commonInsertService(this.samsServices.saveOrUpdateLoanAndReturns, this.loanCreateForm.getRawValue()).subscribe(
      data => {
        if (data.success) {
          this.checkLoanStatusCondition(accessoriesevent, childAssetEvent, sourceScreen);
        } else {
        }
      }, error => {
        this.commonService.openToastErrorMessage(this.assetOptimaConstants.serverError);
      }
    );
  }

  checkLoanStatusCondition(accessoriesevent, childAssetEvent, sourceScreen) {
    //TO CHECK WHETHER ALL ACCESSORIES ARE RETURNED OR NOT
    accessoriesevent.map(obj => {
      if (obj.accessoriesIssued) {
        this.countforAccessoriesIssued = this.countforAccessoriesIssued + 1;
      }
      if (obj.accessoiredReturned) {
        this.countforAccessoriesReturned = this.countforAccessoriesReturned + 1;
      }
    });

    //TO CHECK WHETHER ALL CHILD ASSETS ARE RETURNED OR NOT
    childAssetEvent.map(obj1 => {
      if (obj1.childAssetIssued) {
        this.countforchildAssetIssued = this.countforchildAssetIssued + 1;
      }
      if (obj1.childAssetReturned) {
        this.countforchildAssetReturned = this.countforchildAssetReturned + 1;
      }
    });

    //IF ALL THE ACCESSORIES AND CHILD ASSETS ARE RETURNED THEN LOAN STATUS WILL BE CHANGED AS RETURNED OR IT BE PARTIALLY RETURNED
    if ((this.countforAccessoriesIssued === this.countforAccessoriesReturned) && (this.countforchildAssetIssued === this.countforchildAssetReturned)) {
      this.loanstatusTemp = 4;
    } else {
      this.loanstatusTemp = 6;
    }

    this.openPopUpAndPassCondition(this.loanstatusTemp, sourceScreen);
  }

  openPopUpAndPassCondition(status, sourceScreen) {
    if (this.loanCreateForm.controls.loanStatusId.value !== allloanStatus.REQUEST_FOR_RETURN) {
      this.raiseReturnRequestPopUp = this.dialog.open(ReturnRequestPopupComponent, {
        height: '400px',
        width: '400px',
        data: {
          'loanId': this.loanCreateForm.controls.loanId.value,
          'assetId': this.loanCreateForm.controls.assetHdrId.value,
          'accessoriesList': this.loanCreateForm.controls.loanAssetAccessories.value,
          'childAssetList': this.loanCreateForm.controls.loanChildAsset.value,
          'sourceScreen': sourceScreen,
          'statusId': status
        }
      });
      this.raiseReturnRequestPopUp.disableClose = true;
      this.raiseReturnRequestPopUp.afterClosed().subscribe(
        data => {
          this.ngOnInit();
        });
    } else {
      this.loanUpdateStatus(this.loanstatusTemp);
    }
  }

  listOfContractNumber(searchValue) {
    this.scrollContractNumberSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllContractNumberCombo.sams', searchValue.term, this.loanCreateForm.controls.assetId.value, ''
      , this.recordsPerPageForCombo, this.contractNumberPageNumber, this.loanCreateForm.controls.loanType.value).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.contractNumberPageNumber , this.contractNumberList , data.responseData.comboList)
          this.contractNumberPageNumber = this.getData.pageNumber;
          this.contractNumberList = this.getData.dataList;
          this.scrollContractNumberSync = false;
        }
      );
  }

  setLoanType(event){
    if(event == undefined){
      this.loanType = null;
      this.loanCreateForm.controls.loanedTo.setValue(null);
    }else{
      if(this.loanType != event.name){
        this.setContractNumber(undefined);
      }
      this.loanType = event.name;
    }
  }

  setContractNumber(event) {
    if (event === undefined) {
      this.loanCreateForm.controls.contractNo.setValue('');
      this.contractNumberPageNumber = 1;
      this.contractNumberList = [];
    } else {
      this.loanCreateForm.controls.contractNo.setValue(event.contractNo);
    }
  }

  listOfSupplier(searchValue) {
    this.scrollSuppliersync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.SUPPLIER];
    this.commonService.getComboResults(this.samsServices.listAllBusinessPartnerCombo, searchValue.term, '', '',
      this.limitCount, this.supplierListPageNumber, '', partnerRoles).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.supplierListPageNumber , this.supplierList , data.responseData.comboList)
          this.supplierListPageNumber = this.getData.pageNumber;
          this.supplierList = this.getData.dataList;
          this.scrollSuppliersync = false;
        }
      );
  }

  listOfSupplierLocation(searchValue) {
    this.scrollSupplierLocationSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllPartnerSiteCombo.sams', searchValue.term, this.loanCreateForm.controls.loanedToId.value, '', this.limitCount, this.supplierLocationListPageNumber, '').subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.supplierLocationListPageNumber , this.supplierLocationCombo , data.responseData.comboList)
        this.supplierLocationListPageNumber = this.getData.pageNumber;
        this.supplierLocationCombo = this.getData.dataList;
        this.scrollSupplierLocationSync = false;
      }
    );
  }

  listOfManufacturer(searchValue) {
    this.scrollManufacturersync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.MANUFACTURER];
    this.commonService.getComboResults(this.samsServices.listAllBusinessPartnerCombo, searchValue.term, '', '',
      this.limitCount, this.manufacturerListPageNumber,'',partnerRoles).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.manufacturerListPageNumber , this.manufacturerList , data.responseData.comboList)
          this.manufacturerListPageNumber = this.getData.pageNumber;
          this.manufacturerList = this.getData.dataList;
          this.scrollManufacturersync = false;
        }
      );
  }

  listOfManuServiceLocation(searchValue) {
    this.scrollManuServiceLocationSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllPartnerSiteCombo.sams', searchValue.term, this.loanCreateForm.controls.loanedToId.value, '',
      this.limitCount, this.manuServiceLocationPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.manuServiceLocationPageNumber , this.manuServiceLocationList , data.responseData.comboList)
          this.manuServiceLocationPageNumber = this.getData.pageNumber;
          this.manuServiceLocationList = this.getData.dataList;
          this.scrollManuServiceLocationSync = false;
        }
      );
  }

  listOfEmployeeName(searchKey,event) {
    if(event == 1){
      this.scrollsyncEmployee1 = true;
    }else if (event == 2) {
      this.scrollsyncEmployee2 = true;
    }else if (event == 3) {
      this.scrollsyncEmployee3 = true;
    }
    this.recordsPerPageForEmpCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults('listAllEmployeeForOrgCombo.sams', searchKey.term, '', '',
      this.recordsPerPageForEmpCombo, this.employeePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchKey, this.employeePageNumber , this.employeeCombo , data.responseData.comboList)
          this.employeePageNumber = this.getData.pageNumber;
          this.employeeCombo = this.getData.dataList;
          this.scrollsyncEmployee1 = false;
          this.scrollsyncEmployee2 = false;
          this.scrollsyncEmployee3 = false;
        });
  }

  setSupplierData(event) {
    if (event === undefined) {
      this.loanCreateForm.controls.loanedToId.setValue(0);
      this.loanCreateForm.controls.loanedToName.setValue(null);
      this.loanCreateForm.controls.loanedToSiteId.setValue(0);
      this.loanCreateForm.controls.loanedToSiteName.setValue('');
      this.loanCreateForm.controls.loanedPersonName.setValue('');
      this.loanCreateForm.controls.loanedPersonContactNo.setValue('');
      this.loanCreateForm.controls.loanedPersonEmailId.setValue('');
      this.supplierListPageNumber = 1;
      this.supplierList = [];
    } else {
      this.loanCreateForm.controls.loanedToId.setValue(event.businessPartnerId);
      this.loanCreateForm.controls.loanedToName.setValue(event.businessPartnerName);
      this.loanCreateForm.controls.loanedToSiteId.setValue(0);
      this.loanCreateForm.controls.loanedToSiteName.setValue('');
      this.loanCreateForm.controls.loanedPersonName.setValue('');
      this.loanCreateForm.controls.loanedPersonContactNo.setValue('');
      this.loanCreateForm.controls.loanedPersonEmailId.setValue('');
    }
  }

  setManufacturerData(event) {
    if (event === undefined) {
      this.loanCreateForm.controls.loanedToId.setValue(0);
      this.loanCreateForm.controls.loanedToName.setValue(null);
      this.loanCreateForm.controls.loanedToSiteId.setValue(0);
      this.loanCreateForm.controls.loanedToSiteName.setValue('');
      this.loanCreateForm.controls.loanedPersonName.setValue('');
      this.loanCreateForm.controls.loanedPersonContactNo.setValue('');
      this.loanCreateForm.controls.loanedPersonEmailId.setValue('');
      this.manufacturerListPageNumber = 1;
      this.manufacturerList = [];
    } else {
      this.loanCreateForm.controls.loanedToId.setValue(event.businessPartnerId);
      this.loanCreateForm.controls.loanedToName.setValue(event.businessPartnerName);
    }
  }

  selectedEmployee(event) {
    if (event === undefined) {
      this.loanCreateForm.controls.loanedToId.setValue(0);
      this.loanCreateForm.controls.loanedToName.setValue(null);
      this.loanCreateForm.controls.loanedToSiteId.setValue(0);
      this.loanCreateForm.controls.loanedToSiteName.setValue('');
      this.loanCreateForm.controls.loanedPersonName.setValue('');
      this.loanCreateForm.controls.loanedPersonContactNo.setValue('');
      this.loanCreateForm.controls.loanedPersonEmailId.setValue('');
    } else {
      this.loanCreateForm.controls.loanedToId.setValue(event.employeeId);
      this.loanCreateForm.controls.loanedToName.setValue(event.displayName);
      this.loanCreateForm.controls.loanedPersonName.setValue(event.employeeFirstName);
      this.loanCreateForm.controls.loanedPersonContactNo.setValue(event.officeContactNo);
      this.loanCreateForm.controls.loanedPersonEmailId.setValue(event.officeEmailId);

    }
  }

  selectedLocationLoanData(event) {
    if (event === undefined) {
      this.loanCreateForm.controls.loanedToId.setValue(0);
      this.loanCreateForm.controls.loanedToName.setValue(null);
      this.loanCreateForm.controls.loanedToSiteId.setValue(0);
      this.loanCreateForm.controls.loanedToSiteName.setValue('');
      this.loanCreateForm.controls.loanedPersonName.setValue('');
      this.loanCreateForm.controls.loanedPersonContactNo.setValue('');
      this.loanCreateForm.controls.loanedPersonEmailId.setValue('');
      this.locationCombo = [];
      this.locationPageNumber = 1;
    } else {
      this.loanCreateForm.controls.loanedToId.setValue(event.locationId);
      this.loanCreateForm.controls.loanedToName.setValue(event.locationName);
    }
  }

  setSupplierSiteData(event) {
    if (event === undefined) {
      this.loanCreateForm.controls.loanedToId.setValue(0);
      this.loanCreateForm.controls.loanedToName.setValue(null);
      this.loanCreateForm.controls.loanedToSiteId.setValue(0);
      this.loanCreateForm.controls.loanedToSiteName.setValue('');
      this.loanCreateForm.controls.loanedPersonName.setValue('');
      this.loanCreateForm.controls.loanedPersonContactNo.setValue('');
      this.loanCreateForm.controls.loanedPersonEmailId.setValue('');
      this.supplierLocationListPageNumber = 1;
      this.supplierLocationCombo = [];
    } else {
      this.loanCreateForm.controls.loanedToId.setValue(event.businessPartnerId);
      this.loanCreateForm.controls.loanedToName.setValue(event.businessPartnerName);
      this.loanCreateForm.controls.loanedToSiteId.setValue(event.partnerSiteId);
      this.loanCreateForm.controls.loanedToSiteName.setValue(event.partnerSiteName);
      this.loanCreateForm.controls.loanedPersonName.setValue(event.contactPersonName);
      this.loanCreateForm.controls.loanedPersonContactNo.setValue(event.partnerSitePersonPhoneNo);
      this.loanCreateForm.controls.loanedPersonEmailId.setValue(event.partnerSiteContactEmailId);
    }
  }

  setManuServiceCenterData(event) {
    if (event === undefined) {
      this.loanCreateForm.controls.loanedToId.setValue(0);
      this.loanCreateForm.controls.loanedToName.setValue(null);
      this.loanCreateForm.controls.loanedToSiteId.setValue(0);
      this.loanCreateForm.controls.loanedToSiteName.setValue('');
      this.loanCreateForm.controls.loanedPersonName.setValue('');
      this.loanCreateForm.controls.loanedPersonContactNo.setValue('');
      this.loanCreateForm.controls.loanedPersonEmailId.setValue('');
      this.supplierLocationListPageNumber = 1;
      this.supplierLocationCombo = [];
    } else {
      this.loanCreateForm.controls.loanedToId.setValue(event.businessPartnerId);
      this.loanCreateForm.controls.loanedToName.setValue(event.businessPartnerName);
      this.loanCreateForm.controls.loanedToSiteId.setValue(event.partnerSiteId);
      this.loanCreateForm.controls.loanedToSiteName.setValue(event.partnerSiteName);
      this.loanCreateForm.controls.loanedPersonName.setValue(event.contactPersonName);
      this.loanCreateForm.controls.loanedPersonContactNo.setValue(event.partnerSitePersonPhoneNo);
      this.loanCreateForm.controls.loanedPersonEmailId.setValue(event.partnerSiteContactEmailId);

    }
  }

  receivedByDtls(event) {
    if (event === undefined) {
      this.loanCreateForm.controls.returnById.setValue(0);
      this.loanCreateForm.controls.returnedByName.setValue('');
      this.loanCreateForm.controls.returnedByEmailId.setValue('');
      this.loanCreateForm.controls.returnedByContactNo.setValue('');
    } else {
      this.loanCreateForm.controls.returnById.setValue(event.employeeId);
      this.loanCreateForm.controls.returnedByName.setValue(event.displayName);
      this.loanCreateForm.controls.returnedByContactNo.setValue(event.officeContactNo);
      this.loanCreateForm.controls.returnedByEmailId.setValue(event.officeEmailId);

    }
  }

  returnReceivedByDtl(event) {
    if (event === undefined) {
      this.loanCreateForm.controls.returnReceivedById.setValue(0);
      this.loanCreateForm.controls.returnReceivedBy.setValue(null);
      this.loanCreateForm.controls.returnReceivedEmailId.setValue('');
      this.loanCreateForm.controls.returnReceivedContactNo.setValue('');
    } else {
      this.loanCreateForm.controls.returnReceivedById.setValue(event.employeeId);
      this.loanCreateForm.controls.returnReceivedBy.setValue(event.displayName);
      this.loanCreateForm.controls.returnReceivedContactNo.setValue(event.officeContactNo);
      this.loanCreateForm.controls.returnReceivedEmailId.setValue(event.officeEmailId);
    }
    this.validateReturnInfoTab();
  }

  listOfCustomer(searchValue) {
    this.scrollCustomersync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllCustomerCombo.sams', searchValue.term, '', '',
      this.limitCount, this.customerListPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.customerListPageNumber , this.customerList , data.responseData.comboList)
          this.customerListPageNumber = this.getData.pageNumber;
          this.customerList = this.getData.dataList;
          this.scrollCustomersync = false;
        }
      );
  }

  setCustomerData(event) {
    if (event === undefined) {
      this.loanCreateForm.controls.loanedToId.setValue(0);
      this.loanCreateForm.controls.loanedToName.setValue(null);
      this.loanCreateForm.controls.loanedToSiteId.setValue(0);
      this.loanCreateForm.controls.loanedToSiteName.setValue('');
      this.loanCreateForm.controls.loanedPersonName.setValue('');
      this.loanCreateForm.controls.loanedPersonContactNo.setValue('');
      this.loanCreateForm.controls.loanedPersonEmailId.setValue('');
      this.customerListPageNumber = 1;
      this.customerList = [];
    } else {
      this.loanCreateForm.controls.loanedToId.setValue(event.customerId);
      this.loanCreateForm.controls.loanedToName.setValue(event.customerName);
      this.loanCreateForm.controls.loanedToSiteId.setValue(0);
      this.loanCreateForm.controls.loanedToSiteName.setValue('');
      this.loanCreateForm.controls.loanedPersonName.setValue('');
      this.loanCreateForm.controls.loanedPersonContactNo.setValue('');
      this.loanCreateForm.controls.loanedPersonEmailId.setValue('');
    }
    this.customerLocationListPageNumber =1;
    this.customerLocationCombo = [];
  }

  listOfCustomerLocation(searchValue) {
    this.scrollCustomerLocationSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllCustomerSiteCombo.sams', searchValue.term, this.loanCreateForm.controls.loanedToId.value, '', this.limitCount, this.customerLocationListPageNumber, '').subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.customerLocationListPageNumber , this.customerLocationCombo , data.responseData.comboList)
        this.customerLocationListPageNumber = this.getData.pageNumber;
        this.customerLocationCombo = this.getData.dataList;
        this.scrollCustomerLocationSync = false;
      }
    );
  }

  selectedCustomerLocationData(event) {
    if (event === undefined) {
      this.loanCreateForm.controls.loanedToId.setValue(0);
      this.loanCreateForm.controls.loanedToName.setValue(null);
      this.loanCreateForm.controls.loanedToSiteId.setValue(0);
      this.loanCreateForm.controls.loanedToSiteName.setValue('');
      this.loanCreateForm.controls.loanedPersonName.setValue('');
      this.loanCreateForm.controls.loanedPersonContactNo.setValue('');
      this.loanCreateForm.controls.loanedPersonEmailId.setValue('');
      this.customerLocationListPageNumber = 1;
      this.supplierLocationCombo = [];
    } else {
      this.loanCreateForm.controls.loanedToId.setValue(event.customerId);
      this.loanCreateForm.controls.loanedToName.setValue(event.customerName);
      this.loanCreateForm.controls.loanedToSiteId.setValue(event.customerSiteId);
      this.loanCreateForm.controls.loanedToSiteName.setValue(event.customerSiteName);
      this.loanCreateForm.controls.loanedPersonName.setValue(event.custContactPerson);
      this.loanCreateForm.controls.loanedPersonContactNo.setValue(event.custSiteCompanyPhoneNo);
      this.loanCreateForm.controls.loanedPersonEmailId.setValue(event.custContactPersonEmailId);
    }
  }

  confirmLoanApprove() {
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
        if (data.status === true) {
          this.status = "APPROVED";
          this.updateLoanOrReturnStatus(this.status);
        }
      });
  }

  updateLoanOrReturnStatus(status) {
    let loanIdList = {selectedLoanList: [this.loanCreateForm.controls.loanId.value],status: status,selectedApprovalList : [this.approvalId],loanStatusId :this.loanCreateForm.controls.loanStatusId.value}
    this.commonService.commonInsertService(this.samsServices.updateLoanOrReturnStatus,loanIdList).subscribe(
      data=>{
        if(data.success){
            this.commonService.openToastSuccessMessage(data.message);
            this.ngOnInit();
        }
      },error =>{
      }
    );
  }

  rejectLoanApprove() {
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
          this.status = "REJECT PERMANENTLY";
          this.updateLoanOrReturnStatus(this.status);
        }
      });
  }

  loadAssetConditionComboData(searchValue) {
    this.scrollsyncAssetCondition = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetConditionCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.assetConditionPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetConditionPageNumber , this.assetConditionCombo , data.responseData.comboList)
          this.assetConditionPageNumber = this.getData.pageNumber;
          this.assetConditionCombo = this.getData.dataList;
          this.scrollsyncAssetCondition = false;
        }
      );
  }


  selectedAssetCondition(event) {
    if (event === undefined) {
      this.assetConditionPageNumber = 1;
      this.assetConditionCombo = [];
      this.loanCreateForm.controls.returnAssetCondition.setValue(null);
    } else {
      this.loanCreateForm.controls.returnAssetConditionId.setValue(event.assetConditionId);
      this.translateService.get([event.assetCondition])
      .subscribe((val) => {
        const status = Object.values(val)
        this.loanCreateForm.controls.returnAssetCondition.setValue(status[0])
      });
    }

    this.validateReturnInfoTab();
  }

  selectedAssetCondition1(event) {
    if (event === undefined) {
      this.assetConditionPageNumber = 1;
      this.assetConditionCombo = [];
      this.loanCreateForm.controls.loanedAssetCondition.setValue('');
    } else {
      this.loanCreateForm.controls.loanedAssetConditionId.setValue(event.assetConditionId);
      this.translateService.get([event.assetCondition])
      .subscribe((val) => {
        const status = Object.values(val)
        this.loanCreateForm.controls.loanedAssetCondition.setValue(status[0])
      });
    }
  }

  remarkTrim(){
    if(this.loanCreateForm.controls.returnRemarks.value){
      this.loanCreateForm.controls.returnRemarks.setValue(this.loanCreateForm.controls.returnRemarks.value.trim());
    }
  }

  validateReturnInfoTab(){
    let data = this.loanCreateForm.controls;
      if(data.returnedByName.invalid || data.returnedByContactNo.invalid || data.returnedByEmailId.invalid || data.returnReceivedBy.invalid || data.returnReceivedContactNo.invalid || data.returnReceivedEmailId.invalid || data.returnAssetCondition.invalid){
        this.returnInfoTabvalid = true;
        this.approvebuttonEnable = false;
      }
      else{
        this.returnInfoTabvalid = false;
        this.getWorkflowApprovalForLoans();
      }

  }

  loanReturnDateValidation(event){
    if(event.value){
      this.loanCreateForm.controls.dateOfReturnDisp.setValue(moment(event.value).format(this.assetOptimaConstants.ISODate));
    }
    else{
      this.loanCreateForm.controls.dateOfReturnDisp.setValue('');
    }
    return false;
  }

  dateValidationinstall(event){
    return false;
  }
}
