import { Component, OnInit, ChangeDetectorRef, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { Title } from '@angular/platform-browser';
import { NgSelectComponent } from '@ng-select/ng-select';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { Location } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SrAssignEngineerComponent } from '../sr-assign-engineer/sr-assign-engineer.component';
import { ConfirmConfirmationComponent } from '../../Common-components/confirm-confirmation/confirm-confirmation.component';
import { getData } from 'src/app/Model/common/fetchListData';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import * as moment from 'moment';

@Component({
  selector: 'app-service-request-create',
  templateUrl: './service-request-create.component.html',
  styleUrls: ['./service-request-create.component.css']
})
export class ServiceRequestCreateComponent implements OnInit {
  //Set Page title
  title = 'Asset Optima - Service Request';
  //COMBO LIST
  locationList: any = [];
  departmentList: any = [];
  subDepartmentList: any = [];
  personInChargeList: any = [];
  assetList: any = [];
  limitCount: any;
  skipCount: any;
  searchKey: any = '';

  @ViewChild('srLocFocus') srLocFocusSet: NgSelectComponent;

  currentPageNumber: number

  srBreakDownForm: FormGroup;

  //COMBO
  locationCombo: any = [];
  departmentCombo: any = [];
  subDepartmentCombo: any = [];
  personInchargeCombo: any = [];
  assetCodeCombo: any = [];
  priorityCombo: any = [];
  severityCombo: any = [];
  srTypeCombo: any = [];
  serialNoCombo: any = [];

  locationPageNumber: number;
  departmentPageNumber: number;
  subDepartmentPageNumber: number;
  personInchargePageNumber: number;
  assetCodePageNumber: number;
  priorityPageNumber: number;
  severityPageNumber: number;
  srTypePageNumber: number;
  serialNoPageNumber: number;

  scrollsyncLocation: boolean = false;
  scrollsyncDepartment: boolean = false;
  scrollsyncSubDepartment: boolean = false;
  scrollsyncAssetCode: boolean = false;
  scrollsyncPersonIncharge: boolean = false;
  scrollsyncPriority: boolean = false;
  scrollsyncSeverity: boolean = false;
  scrollsyncSrType: boolean = false;
  scrollsyncSerialNo: boolean = false;

  recordsPerPageForCombo: string;

  //DISABLE BUTTON AFTER A SINGLE CLICK
  uploadFlag: boolean = false;
  disableSubDepartment: boolean = true;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  serviceRequestType: String;

  srHistoryLength: String = '0';
  srServiceHistoryDataSource = [];
  srHistoryLoader: boolean = false;
  displayedSRServiceHistoryColumns = ['sno', 'srNo', 'srStatus', 'srAttribute3Name', 'assignedTo', 'action'];

  contractLength = '0';
  contractDataSource: any = [];
  contractDisplayCol = ['sno', 'contractNo', 'coverageType', 'contractingPartyType','contactInfo',
    'contractStatus', 'contractStartDtDisp', 'active', 'Service']

  insExternalEnggInfo: boolean = false;

  priority = [
    { id: 1, name: 'HIGH' },
    { id: 2, name: 'MEDIUM' },
    { id: 3, name: 'LOW' }
  ];

  severity = [
    { id: 1, name: 'HIGH' },
    { id: 2, name: 'MEDIUM' },
    { id: 3, name: 'LOW' }
  ];
  activetab: any;
  eventvalue: any;
  getData: getData;

  constructor(private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private samsServices: AssetOptimaServices,
    private assetOptimaServices: AssetOptimaServices,
    private change: ChangeDetectorRef,
    private assetOptimaConstants: AssetOptimaConstants,
    private validationService: AssetOptimaConstants,
    private titleService: Title,
    private locationRef: Location,
    private router: Router,
    private userSession: UserSessionService,
    private dialog: MatDialog
  ) {
    this.locationPageNumber = 1;
    this.departmentPageNumber = 1;
    this.subDepartmentPageNumber = 1;
    this.personInchargePageNumber = 1;
    this.assetCodePageNumber = 1;
    this.priorityPageNumber = 1;
    this.severityPageNumber = 1;
    this.srTypePageNumber = 1;
    this.serialNoPageNumber = 1;

  }

  ngOnInit() {
    this.titleService.setTitle(this.title);

    this.srBreakDownForm = new FormGroup({
      orgId: new FormControl(''),
      locationName: new FormControl('', [Validators.required]),
      locationId: new FormControl(''),
      departmentName: new FormControl(null),
      departmentId: new FormControl(''),
      assignedTo: new FormControl(null, [Validators.required]),
      assignedToId: new FormControl(''),
      assignedToContactNo: new FormControl(''),
      assignedToDisp: new FormControl(''),
      assignedDtDisp: new FormControl(''),
      assetCode: new FormControl(null, [Validators.required]),
      assetDescription: new FormControl(''),
      subDepartment: new FormControl(null),
      callerName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      callerContactNo: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(10), Validators.pattern(this.validationService.phoneNumberValidation)]),
      problemReported: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      srPriority: new FormControl(null),
      srSeverity: new FormControl(null),
      assetId: new FormControl(''),
      assetSerialNo: new FormControl(null),
      modelId: new FormControl(''),
      modelName: new FormControl(''),
      assetGroupId: new FormControl(''),
      assetGroupName: new FormControl(''),
      maintenanceType: new FormControl(''),
      subDepartmentId: new FormControl(''),
      srType: new FormControl('',),
      srTypeName : new FormControl('',[Validators.required]),
      assetCategoryId: new FormControl(''),
      assetCategoryName: new FormControl(''),
      subCategoryId: new FormControl(''),
      subCategoryName: new FormControl(''),
      assetTypeName: new FormControl(''),
      assetTypeId: new FormControl(''),
      functionality: new FormControl(''),
      ecs: new FormControl(''),
      efs: new FormControl(''),
      manufacturerId: new FormControl(''),
      manufacturerName: new FormControl(''),
      assetStatusId: new FormControl(),
      assetStatus: new FormControl(),
      approvedBy: new FormControl(''),
      isParent: new FormControl(false),
      parentSrId: new FormControl(0),

      assetRisk: new FormControl(''),
      assetPriority: new FormControl(''),
      assetFloor: new FormControl(''),
      assetBlock: new FormControl(''),
      assetSegment: new FormControl(''),
      assetRoom: new FormControl(''),
      poNo: new FormControl(''),
      poDtDisp: new FormControl(''),
      businessPartnerName: new FormControl(''),
      businessPartnerContactPersonName: new FormControl(''),
      businessPartnerSiteContactNo: new FormControl(''),

      installedBy: new FormControl(''),
      actualInstalledDtDisp: new FormControl(''),
      expectedInstallationDtDisp: new FormControl(''),
      installationDtDisp : new FormControl(''),

      installationDoneBy: new FormControl(''),
      installedInternalEngId: new FormControl('0'),
      installedInternalEngName: new FormControl(''),
      insExternalEngineerName: new FormControl(''),
      insExternalEngineerContactNo: new FormControl(''),
      insExternalEngineerEmailId: new FormControl(''),
      installationProvidedBy: new FormControl(''),
      installationProvidedById: new FormControl('0'),
      installationProvidedByName: new FormControl(''),
      installationRemarks: new FormControl(''),
      installationType: new FormControl(''),
      receivedDtDisp: new FormControl(''),
      doNo: new FormControl(''),
      doDtDisp: new FormControl(''),
      invoiceValue: new FormControl(''),
      srId: new FormControl(0),
      maintenanceStrategy: new FormControl(''),
      pmMaintenanceStrategy: new FormControl(''),
      paMaintenanceStrategy: new FormControl(''),
      qaMaintenanceStrategy: new FormControl(''),
      srEFSValue: new FormControl(''),
      srEFSValueId: new FormControl('0'),
      unknownAssetCode : new FormControl(''),
      assetCondition: new FormControl(''),
    });
    //this.srBreakDownForm.controls['locationName'].setValue(this.userSession.getUserLocationName());
    //this.srBreakDownForm.controls['locationId'].setValue(this.userSession.getUserLocationId());
    this.srBreakDownForm.controls.subDepartment.disable();
    // this.srBreakDownForm.controls['srType'].setValue('BREAKDOWN MAINTENANCE');
    this.srBreakDownForm.controls.assignedToDisp.disable();
    this.srBreakDownForm.controls.srEFSValue.disable();

    // this.serviceRequestType = 'BREAKDOWN MAINTENANCE';
    this.contractLength = '0';
    this.contractDataSource = [];
    this.validateEditMode()
  }

  validateEditMode() {
    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        this.activetab =  params.tab;
        if (primaryId <= 0) {          
        }else{
          this.selectedAssetCodeData(primaryId,false);
          this.commonService.setComboFocus(this.srLocFocusSet);
        }
      }
    );
  }


  loadLocationComboData(searchValue) {
    
    this.scrollsyncLocation = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.samsServices.listAllUserLocForCombo, searchValue.term, '', '',
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
      this.srBreakDownForm.controls['locationId'].setValue(0);
      this.srBreakDownForm.controls['locationName'].setValue(null);
      this.locationPageNumber = 1;
      this.locationCombo = [];
    } else {
      if(this.userSession.getUserLocationName() != event.locationName){
        //this.clear();
      }  
      this.srBreakDownForm.controls['locationId'].setValue(event.locationId);
      this.srBreakDownForm.controls['locationName'].setValue(event.locationName);   
    }
  }

  loadDepartmentComboData(searchValue) {
    this.scrollsyncDepartment = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllDeparment.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.departmentPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.departmentPageNumber , this.departmentCombo , data.responseData.comboList)
          this.departmentPageNumber = this.getData.pageNumber;
          this.departmentCombo = this.getData.dataList;
          this.scrollsyncDepartment = false;
        }
      );
  }

  selectedDepartmentData(event) {
    if (event === undefined) {
      this.srBreakDownForm.controls['departmentId'].setValue(0);
      this.srBreakDownForm.controls['departmentName'].setValue(null);
      this.srBreakDownForm.controls['subDepartmentId'].setValue(0);
      this.srBreakDownForm.controls['subDepartment'].setValue(null);
      this.departmentPageNumber = 1;
      this.departmentCombo = [];
      this.subDepartmentPageNumber = 1;
      this.subDepartmentCombo = [];
    } else {
      this.srBreakDownForm.controls['departmentId'].setValue(event.departmentId);
      this.srBreakDownForm.controls['departmentName'].setValue(event.departmentName);
      this.srBreakDownForm.controls['subDepartmentId'].setValue(0);
      this.srBreakDownForm.controls['subDepartment'].setValue(null);
      this.subDepartmentPageNumber = 1;
      this.subDepartmentCombo = [];
      //TO ENABLE SUB DEPARTMENT FIELD AFTER DEPARTMENT IS SELECTED
      this.srBreakDownForm.controls.subDepartment.enable();
    }
  }

  loadSubDepartmentComboData(searchValue) {
    this.scrollsyncSubDepartment = true;
    const departmentId = this.srBreakDownForm.controls.departmentId.value;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllSubDeparment.sams', searchValue.term,
    departmentId > 0 ? departmentId : '', '',this.recordsPerPageForCombo, this.subDepartmentPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.subDepartmentPageNumber , this.subDepartmentCombo , data.responseData.comboList)
          this.subDepartmentPageNumber = this.getData.pageNumber;
          this.subDepartmentCombo = this.getData.dataList;
          this.scrollsyncSubDepartment = false;
        }
      );
  }

  selectedSubDepartmentData(event) {
    if (event === undefined) {
      this.srBreakDownForm.controls['subDepartmentId'].setValue(0);
      this.srBreakDownForm.controls['subDepartment'].setValue(null);
      this.subDepartmentPageNumber = 1;
      this.subDepartmentCombo = [];
    } else {
      this.srBreakDownForm.controls['subDepartmentId'].setValue(event.subDepartmentId);
      this.srBreakDownForm.controls['subDepartment'].setValue(event.subDepartmentName);

    }
  }

  loadPersonInchargeComboData(searchValue) {
    this.scrollsyncPersonIncharge = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllEmployeeComboFromUser.sams', searchValue.term,
      this.srBreakDownForm.controls.departmentId.value > 0 ? this.srBreakDownForm.controls.departmentId.value : '', '',
      this.recordsPerPageForCombo, this.personInchargePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.personInchargePageNumber , this.personInchargeCombo , data.responseData.comboList)
          this.personInchargePageNumber = this.getData.pageNumber;
          this.personInchargeCombo = this.getData.dataList;
          this.scrollsyncPersonIncharge = false;
        }
      );
  }

  selectedPersonInchargeData(event) {
    if (event === undefined) {
      this.srBreakDownForm.controls['assignedToId'].setValue(0);
      this.srBreakDownForm.controls['assignedTo'].setValue('');
      this.personInchargePageNumber = 1;
      this.personInchargeCombo = [];
    } else {
      this.srBreakDownForm.controls['assignedToId'].setValue(event.employeeId);
      this.srBreakDownForm.controls['assignedTo'].setValue(event.employeeFirstName);
    }
  }

  loadAssetCodeComboData(searchValue) {
    this.scrollsyncAssetCode = true;
    const locId = this.srBreakDownForm.controls.locationId.value;
    const departmentId = this.srBreakDownForm.controls.departmentId.value;

    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetCodeComboSR.sams', searchValue.term,locId > 0 ? locId : 0,
    departmentId > 0 ? departmentId : 0, this.recordsPerPageForCombo, this.assetCodePageNumber, '1', '').subscribe(
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

  selectedAssetCodeData(event,check : boolean) {

    if (event === undefined) {
      this.ngOnInit();
    } else {
      if (check) {
            this.srBreakDownForm.controls['assetId'].setValue(event.assetHdrId);
            this.srBreakDownForm.controls['assetCode'].setValue(event.assetCode);
            this.srBreakDownForm.controls['assetSerialNo'].setValue(event.serialNo);
            this.eventvalue = event.assetHdrId;
      }else{
        this.eventvalue = event;
      }
      this.commonService.commonGetService('fetchAssetDtlByAssetId.sams', this.eventvalue).subscribe(
        data => {
          this.srBreakDownForm.patchValue(data.responseData);
          // this.srBreakDownForm.controls['srType'].setValue(this.serviceRequestType);
          this.srBreakDownForm.controls['assetId'].setValue(data.responseData.assetHdrId);
          this.srBreakDownForm.controls.assetCode.setValue(data.responseData.assetCode);
          this.srBreakDownForm.controls['assetSerialNo'].setValue(data.responseData.serialNo);
          this.srBreakDownForm.controls.assetDescription.setValue(data.responseData.description);
          this.srBreakDownForm.controls.assetRisk.setValue(data.responseData.riskNature);
          this.srBreakDownForm.controls.assetPriority.setValue(data.responseData.priorityName);
          this.srBreakDownForm.controls.assetFloor.setValue(data.responseData.floorName);
          this.srBreakDownForm.controls.assetBlock.setValue(data.responseData.blockName);
          this.srBreakDownForm.controls.assetSegment.setValue(data.responseData.segmentName);
          this.srBreakDownForm.controls.assetRoom.setValue(data.responseData.roomName);

          this.srBreakDownForm.controls.functionality.setValue(data.responseData.functionalStatus);
          this.srBreakDownForm.controls.poNo.setValue(data.responseData.purchaseOrderNo);
          // this.srBreakDownForm.controls.supplierContactPerson.setValue(data.responseData.supplContactPersonName);
          // this.srBreakDownForm.controls.supplierContactNo.setValue(data.responseData.supplSiteContactNo);

          this.contractDataSource = data.responseData.contractList;
          this.contractLength = this.contractDataSource.length;

          if (data.responseData.receivedDtDisp != null && data.responseData.receivedDtDisp != '') {
            this.srBreakDownForm.controls.receivedDtDisp.setValue(this.commonService.convertToDateStringdd_mm_yyyy(data.responseData.receivedDtDisp));
          }
          if (data.responseData.doDtDisp != null && data.responseData.doDtDisp != '') {
            this.srBreakDownForm.controls.doDtDisp.setValue(this.commonService.convertToDateStringdd_mm_yyyy(data.responseData.doDtDisp));
          }
          if (data.responseData.expectedInstallationDtDisp != null && data.responseData.expectedInstallationDtDisp != '') {
            this.srBreakDownForm.controls.expectedInstallationDtDisp.setValue(this.commonService.convertToDateStringdd_mm_yyyy(data.responseData.expectedInstallationDtDisp));
          }
          if (data.responseData.actualInstalledDtDisp != null && data.responseData.actualInstalledDtDisp != '') {
            this.srBreakDownForm.controls.actualInstalledDtDisp.setValue(this.commonService.convertToDateStringdd_mm_yyyy(data.responseData.actualInstalledDtDisp));
          }
          if (data.responseData.purchaseDtDisp != null && data.responseData.purchaseDtDisp != '') {
            this.srBreakDownForm.controls.poDtDisp.setValue(this.commonService.convertToDateStringdd_mm_yyyy(data.responseData.purchaseDtDisp));
          }

          if (this.srBreakDownForm.controls.installationDoneBy.value == null || this.srBreakDownForm.controls.installationDoneBy.value == '') {
            if (this.srBreakDownForm.controls.installationType.value == 'SELF INSTALLATION') {
              this.srBreakDownForm.controls.installationDoneBy.setValue('INTERNAL');
              this.insExternalEnggInfo = false;
            } else {
              this.insExternalEnggInfo = true;
            }
          } else {
            if (this.srBreakDownForm.controls.installationDoneBy.value == 'INTERNAL') {
              this.insExternalEnggInfo = false;
            } else {
              this.insExternalEnggInfo = true;
            }
          }

          this.srBreakDownForm.controls.assignedTo.setValue(data.responseData.serviceEngineerName);
          this.srBreakDownForm.controls.assignedToId.setValue(data.responseData.serviceEngineerId);
          this.srBreakDownForm.controls.assignedToContactNo.setValue(data.responseData.serviceEngineerContactNo);

          const assignedFormatted1 = moment(new Date()).format("YYYY-MM-DD HH:mm");
          this.srBreakDownForm.controls.assignedDtDisp.setValue(assignedFormatted1);
          this.srBreakDownForm.controls.assignedToDisp.setValue(data.responseData.serviceEngineerName + ' -- ' +
            data.responseData.serviceEngineerContactNo + ' -- ' + assignedFormatted1);

          this.loadServiceDetailsList();
          this.checkIsWorkflowCompleted(event.assetHdrId);
          
        }
      );

    }
  }

  loadServiceDetailsList() {
    this.srHistoryLoader = true;
    this.srServiceHistoryDataSource = [];
    this.srBreakDownForm.controls.srType.setValue('');
    this.commonService.commonListService('fetchListOfServiceRequest.sams', this.srBreakDownForm.value).subscribe(
      data => {
        if (data.success) {
          this.srServiceHistoryDataSource = data.responseData.dataList;
          this.srHistoryLength = data.responseData.dataTotalRecCount;
          // this.srBreakDownForm.controls.srType.setValue(this.serviceRequestType);
          this.srHistoryLoader = false;
        } else {
          this.srHistoryLoader = false;
        }
      }, error => {
      }
    );
  }

  viewServiceRequestDtl(srId, mode) {
    this.router.navigate(['home/serviceRequest/serviceView/' + srId + '/' + mode]);
  }

  loadPriorityComboData(searchValue) {
    this.scrollsyncPriority = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllPriorityForCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.priorityPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.priorityPageNumber , this.priorityCombo , data.responseData.comboList)
          this.priorityPageNumber = this.getData.pageNumber;
          this.priorityCombo = this.getData.dataList;
          this.scrollsyncPriority = false;
        }
      );
  }

  selectedPriorityData(event) {
    if (event === undefined) {
      this.srBreakDownForm.controls['srPriority'].setValue(null);
      this.priorityPageNumber = 1;
      this.priorityCombo = [];
    } else {
      this.srBreakDownForm.controls['srPriority'].setValue(event.priorityName);
    }
  }

  loadSeverityComboData(searchValue) {
    this.scrollsyncSeverity = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllSeverityForCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.severityPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.severityPageNumber , this.severityCombo , data.responseData.comboList)
          this.severityPageNumber = this.getData.pageNumber;
          this.severityCombo = this.getData.dataList;
          this.scrollsyncSeverity = false;
        }
      );
  }

  selectedSeverityData(event) {
    if (event === undefined) {
      this.srBreakDownForm.controls['srSeverity'].setValue(null);
      this.severityPageNumber = 1;
      this.severityCombo = [];
    } else {
      this.srBreakDownForm.controls['srSeverity'].setValue(event.severityName);
    }
  }

  changeFieldsForSRType(event) {

    this.serviceRequestType = event.srId;
    this.srBreakDownForm.controls.srType.setValue(event.srId);
    this.srBreakDownForm.controls.srTypeName.setValue(event.srTypeName);

    if (event.srId === 'PM') {
      this.srBreakDownForm.controls["problemReported"].setValue('PREVENTATIVE MAINTANENCE PERFORMED');
      this.srBreakDownForm.controls["efs"].setValue('WORKING');
    } else if (event.srId === 'PA') {
      this.srBreakDownForm.controls["problemReported"].setValue('PREVENTIVE ASSURANCE PERFORMED');
      this.srBreakDownForm.controls["efs"].setValue('WORKING');
    } else if (event.srId === 'QA') {
      this.srBreakDownForm.controls["problemReported"].setValue('QUALITY ASSURANCE PERFORMED');
      this.srBreakDownForm.controls["efs"].setValue('WORKING');
    } else if (event.srId === 'BM') {
      this.srBreakDownForm.controls["problemReported"].setValue('');
      this.srBreakDownForm.controls["efs"].setValue('NOT WORKING');
    } if (event.srId === 'RFS') {
      this.router.navigate(['home/requestForStock/0/Create']);
    }
  }

  createServiceRequest() {
    if (this.srBreakDownForm.controls.efs.value === 'WORKING') {
      this.srBreakDownForm.controls.efs.setValue('1')
    } else if (this.srBreakDownForm.controls.efs.value === 'NOT WORKING') {
      this.srBreakDownForm.controls.efs.setValue('2')
    }
    this.uploadFlag = true;
    if (this.srBreakDownForm.controls.subDepartment.value == null) {
      this.srBreakDownForm.controls['subDepartment'].setValue('');
    }

    if(this.srBreakDownForm.controls.assetId.value != null && this.srBreakDownForm.controls.assetId.value > 0) {
      // this.setSrTypeValue(this.srBreakDownForm.controls.srType.value);
      
      this.commonService.commonInsertService('validateServiceRequest.sams', this.srBreakDownForm.getRawValue()).subscribe(
        data => {
          if (data.success) {
            if (data.responseData <= 0) {
              
              this.commonService.commonInsertService('saveUpdateBreakDownServiceRequest.sams',this.srBreakDownForm.getRawValue()).subscribe(
                data => {
                  if(data.success) {
                    this.commonService.openToastSuccessMessage(data.message);
                    this.uploadFlag = false;
                    this.locationRef.back();
                  } else {
                    this.commonService.openToastErrorMessage(data.message);
                    this.uploadFlag=false;
                  }
                } 
              );
            } else {
              this.uploadFlag = false;
              this.commonService.openToastWarningMessage('Service Request already available for the Asset Code ' + this.srBreakDownForm.controls.assetCode.value + '!');
              // let dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
              //   height: 'auto',
              //   width: '400px',
              //   data: {
              //     'confirmHeading': 'Warning',
              //     'confirmMsg' : 'Service Request already available for the CEID ' + this.srBreakDownForm.controls.assetCode.value + '! Do you want to create another ?'
              //   }
              // });
              // dialogRef.disableClose = true;
              // dialogRef.afterClosed().subscribe(
              //   data => {
              //     if (data.status) {
              //       this.commonService.commonInsertService('saveUpdateBreakDownServiceRequest.sams',this.srBreakDownForm.getRawValue()).subscribe(
              //         data => {
              //           if(data.success) {
              //             this.commonService.openToastSuccessMessage(data.message);
              //             this.uploadFlag = false;
              //             this.locationRef.back();
              //           } else {
              //             this.commonService.openToastErrorMessage(data.message);
              //             this.uploadFlag=false;
              //           }
              //         } 
              //       );
              //     } else {
              //       this.uploadFlag=false;
              //     }
              //   }
              // );
            }
          } else {
            this.commonService.openToastErrorMessage(data.message);
            this.uploadFlag=false;
          }
        }
      );
    } else {
      
      this.srBreakDownForm.controls.assetStatusId.setValue('0');
      // this.setSrTypeValue(this.srBreakDownForm.controls.srType.value);
      this.commonService.commonInsertService('saveUpdateBreakDownServiceRequest.sams',this.srBreakDownForm.getRawValue()).subscribe(
        data => {
          if(data.success) {
            this.commonService.openToastSuccessMessage(data.message);
            this.uploadFlag = false;
            this.locationRef.back();
          } else {
            this.commonService.openToastErrorMessage(data.message);
            this.uploadFlag=false;
          }
        } 
      );
    }
  }

  clear() {
    this.srBreakDownForm.reset();
    this.srBreakDownForm.updateValueAndValidity();
    this.srBreakDownForm.controls.assetCode.enable();
    this.ngOnInit();
  }

  exit() {
    this.locationRef.back();
  }

  loadSrTypeComboData(searchValue) {
    this.scrollsyncSrType = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllSrTypeCombo.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.srTypePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.srTypePageNumber , this.srTypeCombo , data.responseData.comboList)
        this.srTypePageNumber = this.getData.pageNumber;
        this.srTypeCombo = this.getData.dataList;
        this.scrollsyncSrType = false;
      }
    );
  }

  loadSerialNoComboData(searchValue) {
    this.scrollsyncSerialNo = true;
    const locId = this.srBreakDownForm.controls.locationId.value;
    const departmentId = this.srBreakDownForm.controls.departmentId.value;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllSerialNoCombo.sams', searchValue.term, locId > 0 ? locId : 0,
    departmentId > 0 ? departmentId : 0, this.recordsPerPageForCombo, this.serialNoPageNumber, '1', '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.serialNoPageNumber , this.serialNoCombo , data.responseData.comboList)
          this.serialNoPageNumber = this.getData.pageNumber;
          this.serialNoCombo = this.getData.dataList;
          this.scrollsyncSerialNo = false;
        }
      );
  }

  selectedSerialCodeData(event) {
    if (event === undefined) {
      this.srBreakDownForm.controls['assetCode'].setValue(null);
      this.srBreakDownForm.controls['assetId'].setValue(0);
      this.srBreakDownForm.controls['assetSerialNo'].setValue(null);
      this.srBreakDownForm.controls['modelId'].setValue(0);
      this.srBreakDownForm.controls['modelName'].setValue(null);
      this.srBreakDownForm.controls['manufacturerId'].setValue(0);
      this.srBreakDownForm.controls['manufacturerName'].setValue(null);
      this.srBreakDownForm.controls['assetGroupId'].setValue(0);
      this.srBreakDownForm.controls['assetGroupName'].setValue(null);
      this.srBreakDownForm.controls['assetSerialNo'].setValue(null);
      this.srBreakDownForm.controls['maintenanceType'].setValue(null);
      this.srBreakDownForm.controls['assetCategoryId'].setValue(0);
      this.srBreakDownForm.controls['assetCategoryName'].setValue(null);
      this.srBreakDownForm.controls['subCategoryId'].setValue(0);
      this.srBreakDownForm.controls['subCategoryName'].setValue(null);
      this.srBreakDownForm.controls['assetTypeId'].setValue(0);
      this.srBreakDownForm.controls['assetTypeName'].setValue(null);
      this.srBreakDownForm.controls['functionality'].setValue(null);
      this.srBreakDownForm.controls['assetStatusId'].setValue(0);
      this.srBreakDownForm.controls['assetStatus'].setValue(null);
      this.srBreakDownForm.controls['departmentName'].setValue(null);
      this.srBreakDownForm.controls['departmentId'].setValue(0);
      this.srBreakDownForm.controls['locationName'].setValue(null);
      this.srBreakDownForm.controls['locationId'].setValue(0);
      this.srBreakDownForm.controls['assignedTo'].setValue(null);
      this.srBreakDownForm.controls['assignedToId'].setValue(0);
      this.srBreakDownForm.controls['subDepartment'].setValue(null);
      this.srBreakDownForm.controls['subDepartmentId'].setValue(0);
      this.srBreakDownForm.controls['ecs'].setValue(null);
      this.assetCodePageNumber = 1;
      this.assetCodeCombo = [];
    } else {
      this.srBreakDownForm.controls['assetCode'].setValue(event.assetCode);
      this.srBreakDownForm.controls['assetId'].setValue(event.assetHdrId);
      this.srBreakDownForm.controls['assetSerialNo'].setValue(event.assetSerialNo);
      this.srBreakDownForm.controls['modelId'].setValue(event.modelId);
      this.srBreakDownForm.controls['modelName'].setValue(event.modelName);
      this.srBreakDownForm.controls['manufacturerId'].setValue(event.manufacturerId);
      this.srBreakDownForm.controls['manufacturerName'].setValue(event.manufacturer);
      this.srBreakDownForm.controls['assetGroupId'].setValue(event.assetGroupId);
      this.srBreakDownForm.controls['assetGroupName'].setValue(event.assetGroupName);
      this.srBreakDownForm.controls['assetSerialNo'].setValue(event.serialNo);
      this.srBreakDownForm.controls['maintenanceType'].setValue(event.maintenanceType);
      this.srBreakDownForm.controls['assetCategoryId'].setValue(event.assetCategoryId);
      this.srBreakDownForm.controls['assetCategoryName'].setValue(event.assetCategoryName);
      this.srBreakDownForm.controls['subCategoryId'].setValue(event.subCategoryId);
      this.srBreakDownForm.controls['subCategoryName'].setValue(event.subCategoryName);
      this.srBreakDownForm.controls['assetTypeId'].setValue(event.assetTypeId);
      this.srBreakDownForm.controls['assetTypeName'].setValue(event.assetTypeName);
      this.srBreakDownForm.controls['functionality'].setValue(event.functionalStatus);
      this.srBreakDownForm.controls['assetStatusId'].setValue(event.assetStatusId);
      this.srBreakDownForm.controls['assetStatus'].setValue(event.assetStatus);
      this.srBreakDownForm.controls['departmentName'].setValue(event.departmentName);
      this.srBreakDownForm.controls['departmentId'].setValue(event.departmentId);
      this.srBreakDownForm.controls['locationName'].setValue(event.locationName);
      this.srBreakDownForm.controls['locationId'].setValue(event.locationId);
      this.srBreakDownForm.controls['assignedTo'].setValue(event.serviceEngg1);
      this.srBreakDownForm.controls['assignedToId'].setValue(event.serviceEngg1Id);
      this.srBreakDownForm.controls['subDepartment'].setValue(event.subDepartment);
      this.srBreakDownForm.controls['subDepartmentId'].setValue(event.subDepartmentId);
      if (event.maintenanceType == 'WARRANTY' && event.ownershipType == 'OWN') {
        this.srBreakDownForm.controls['ecs'].setValue('WARRANTY');
      } else if (event.maintenanceType == 'IN HOUSE' && event.ownershipType == 'OWN') {
        this.srBreakDownForm.controls['ecs'].setValue('IN HOUSE');
      } else if (event.maintenanceType == 'AMC' && event.ownershipType == 'OWN') {
        this.srBreakDownForm.controls['ecs'].setValue('AMC');
      } else if (event.maintenanceType == 'CMC' && event.ownershipType == 'OWN') {
        this.srBreakDownForm.controls['ecs'].setValue('CMC');
      } else if (event.ownershipType == 'RENTAL') {
        this.srBreakDownForm.controls['ecs'].setValue('RENTAL');
      } else if (event.ownershipType == 'LEASE') {
        this.srBreakDownForm.controls['ecs'].setValue('LEASE');
      }
    }
  }

  dialogRef;

  // openAssignEng() {
  //   this.dialogRef = this.dialog.open(SrAssignEngineerComponent, {
  //     height: 'auto',
  //     width: '1300px',
  //     data: {
  //       'modelId': this.srBreakDownForm.controls.modelId.value,
  //       'locationId': this.srBreakDownForm.controls.locationId.value
  //     }
  //   });
  //   this.dialogRef.disableClose = true;
  //   this.dialogRef.afterClosed().subscribe(
  //     data => {
  //       if (data.exit) {
  //         this.srBreakDownForm.controls.assignedTo.setValue(data.assignEmpName);
  //         this.srBreakDownForm.controls.assignedToId.setValue(data.assignEmpId);
  //         this.srBreakDownForm.controls.assignedToContactNo.setValue(data.officeContactNo);
  //         this.srBreakDownForm.controls.assignedDtDisp.setValue(data.assignedDtDisp);

  //         this.srBreakDownForm.controls.assignedToDisp.setValue(data.assignEmpName + ' -- ' +
  //           data.officeContactNo + ' -- ' +
  //           this.commonService.convertToDateStringdd_mm_yyyy(data.assignedDtDisp));
  //       }
  //     });
  // }

  openAssignEng() {
    if (this.srBreakDownForm.controls.locationId.value > 0) {
      this.dialogRef = this.dialog.open(SrAssignEngineerComponent, {
        height: 'auto',
        width: '1300px',
        data: {
          'modelId': this.srBreakDownForm.controls.modelId.value,
          'locationId': this.srBreakDownForm.controls.locationId.value
        }
      });
      this.dialogRef.disableClose = true;
      this.dialogRef.afterClosed().subscribe(
        data => {
          if (data.exit) {
            this.srBreakDownForm.controls.assignedTo.setValue(data.assignEmpName);
            this.srBreakDownForm.controls.assignedToId.setValue(data.assignEmpId);
            this.srBreakDownForm.controls.assignedToContactNo.setValue(data.officeContactNo);
            this.srBreakDownForm.controls.assignedDtDisp.setValue(data.assignedDtDisp);

            this.srBreakDownForm.controls.assignedToDisp.setValue(data.assignEmpName + ' -- ' +
              data.officeContactNo + ' -- ' +
              this.commonService.convertToDateStringdd_mm_yyyy(data.assignedDtDisp));
          }
        });
    } else {
      this.commonService.openToastWarningMessage('Kindly select the Branch!')
    }

  }

  setSrTypeValue(srType){
    var srTypeName:string ='';
    if(srType === 'ASSET INSTALLATION'){
      srTypeName='INSTALLATION';
    }else if(srType === 'BREAKDOWN MAINTENANCE'){
      srTypeName='BM';
    }else if(srType=== 'PREVENTIVE ASSURANCE'){
      srTypeName='PA';
    }else if(srType === 'PREVENTIVE MAINTENANCE'){
      srTypeName='PM';
    }else if(srType === 'QUALITY ASSURANCE'){
      srTypeName='QA';
    }else if(srType === 'DAILY ROUNDS'){
      srTypeName='DR';
    }else if(srType === 'PM/PA'){
      srTypeName='PM/PA';
    }
    this.srBreakDownForm.controls.srType.setValue(srTypeName);
  }

  setUnkownAssetCode(){

    let unknownAsset = this.srBreakDownForm.controls.unknownAssetCode.value;
    if(unknownAsset) {
      this.srBreakDownForm.controls.assetCode.disable();
      this.srBreakDownForm.controls.assetId.setValue('0');
    } else {
      this.srBreakDownForm.controls.assetCode.enable();
    }
  }

  checkIsWorkflowCompleted(hdrId){
     this.commonService.commonGetService('isWorkflowCompleted.sams', hdrId, 'ASSET_CREATE').subscribe(
            data => {  

              if(!data.responseData){
                this.commonService.openToastWarningMessage("Registration Approval pending in asset register module.");
                this.clear();
              }

            });
  }
}
