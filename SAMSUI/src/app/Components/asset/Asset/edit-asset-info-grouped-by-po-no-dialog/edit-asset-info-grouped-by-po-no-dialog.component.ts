import { Component, OnInit, Inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ConfirmConfirmationComponent } from '../../../Common-components/confirm-confirmation/confirm-confirmation.component';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { getData } from 'src/app/Model/common/fetchListData';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-edit-asset-info-grouped-by-po-no-dialog',
  templateUrl: './edit-asset-info-grouped-by-po-no-dialog.component.html',
  styleUrls: ['./edit-asset-info-grouped-by-po-no-dialog.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class EditAssetInfoGroupedByPoNoDialogComponent implements OnInit {

  displayedColumns = ['sno', 'assetCode', 'serialNO', 'equipmentCode', 'description', 'department', 'subDepartment', 'functionality', 'priority'];

  innerDisplayedColumns = ['assetRisk','blockName','roomName','floorName','segmentName','assetReceivedBy','assetReceivedDt','expInstallDt'];

  @ViewChild('innerTable') tableAssignee: MatTable<any>;


  inwardAssetInfo: any;

  inwardAssetFormGroup: FormGroup;

  scrollsyncServiceEngineer1 = false;
  scrollsyncDepartment = false;
  scrollsyncSubDepartment = false;
  scrollsyncBlock = false;
  scrollsyncPriority = false;
  scrollsyncRoom = false;
  scrollsyncFloor = false;
  scrollsyncSegment = false;
  scrollsyncSubDepartmentForElement = false;
  uploadAssetFlag = false;
  generateSerialNoFlag = false;
  nonUniqueValue = false;
  autoGenerateAssetCode = false;
  disableSubmit = false;

  recordsPerPageForCombo: string;
  purchaseOrderNo: string;
  purchaseDtDisp: string;
  ErrorMsgSerialNo: string;
  subCategoryName: string;
  expectedArrivalDtDisp: string;

  serviceEngineer1PageNumber: number;
  departmentPageNumber: number;
  subDepartmentPageNumber: number;
  blockNamePageNumber: number;
  roomNamePageNumber: number;
  floorNamePageNumber: number;
  segmentNamePageNumber: number;
  priorityPageNumber: number;
  subDepartmentPageNumberForElement: number;
  selectedDepartmentId = 0;
  modelName: string;
  roomNamePageNumberForElement: number;
  orgId: number;
  locationId: number;
  length = 0;
  contractForInvDt = false;

  serviceEngineer1Combo: any = [];
  departmentCombo: any = [];
  subDepartmentCombo: any = [];
  blockNameCombo: any = [];
  roomNameCombo: any = [];
  floorNameCombo: any = [];
  segmentNameCombo: any = [];
  priorityCombo: any = [];
  assetList: any = [];
  subDepartmentComboForElement: any = [];
  expandedElement: any = this.assetList;
  roomNameComboForElement: any = [];
  tempAssetList: any = [];

  serialNoGeneratorModel: any;

  scrollSyncStore = false;
  storePageNo: number;
  storeNameList: any = [];
  getData: getData;

  scrollApprovedSuppliersync = false;
  approvedSupplierPageNumber: number;
  supplierLocationList: any = [];

  assetListData: any = [];

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  functionalStatus = [
    { id: 1, name: 'CRITICAL' },
    { id: 2, name: 'NON CRITICAL' }
  ];

  riskNatureCombo = [
    { id: 1, name: 'HIGH' },
    { id: 2, name: 'LOW' }
  ];

  //VARIABLES FOR CODE GENERATION
  variableList =[
    {id: 1, name:'ASSET CATEGORY'},
    {id: 2, name:'ASSET GROUP'},
    {id: 3, name:'BRANCH'},
    {id: 4, name:'DEPARTMENT'},
    {id: 5, name:'LEGAL ENTITY'},
    {id: 6, name:'ORGANIZATION'},
    {id: 7, name:'REGION'},
    {id: 8, name:'SUB CATEGORY'},
    {id: 9, name:'SUB DEPARTMENT'}
  ]

  defaultPurchaseDt;

  constructor(
    private readonly commonService: CommonService,
    public dialogRef: MatDialogRef<EditAssetInfoGroupedByPoNoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data,
    private readonly userSessionService: UserSessionService,
    private readonly dialog: MatDialog,
    private readonly changeDetectorRefs: ChangeDetectorRef,

  ) {
    this.serviceEngineer1PageNumber = 1;
    this.departmentPageNumber = 1;
    this.subDepartmentPageNumber = 1;
    this.blockNamePageNumber = 1;
    this.roomNamePageNumber = 1;
    this.floorNamePageNumber = 1;
    this.segmentNamePageNumber = 1;
    this.priorityPageNumber = 1;
    this.subDepartmentPageNumberForElement = 1;
    this.storePageNo = 1;
    this.approvedSupplierPageNumber = 1;
    this.roomNamePageNumberForElement = 1;
  }

  ngOnInit(): void {
    this.inwardAssetFormGroup = new FormGroup({
      batchHdrId: new FormControl(0),
      batchName: new FormControl(''),
      reference1: new FormControl(''),
      reference2: new FormControl(''),
      locationId: new FormControl(0),
      orgId: new FormControl(0),
      subCategoryId: new FormControl(0),
      subCategoryName: new FormControl(''),
      preFix: new FormControl(''),
      suffix: new FormControl(''),
      seriesStart: new FormControl('', [Validators.pattern('^$|^[A-Za-z0-9]+')]),
      qty: new FormControl(0, [Validators.required]),
      receivedBy: new FormControl('', [Validators.required]),
      receivedById: new FormControl(0),
      receivedDtDisp: new FormControl('', [Validators.required]),
      receivedDt: new FormControl(''),
      departmentId: new FormControl(0),
      departmentName: new FormControl('', [Validators.required]),
      subDepartment: new FormControl(''),
      subDepartmentId: new FormControl(0),
      blockName: new FormControl(''),
      buildingBlockId: new FormControl(0),
      floorName: new FormControl(''),
      buildingFloorId: new FormControl(0),
      segmentName: new FormControl(''),
      buildingSegmentId: new FormControl(0),
      roomName: new FormControl(''),
      buildingRoomId: new FormControl(0),
      functionalStatus: new FormControl(''),
      riskNature: new FormControl(''),
      priorityName: new FormControl(''),
      purchaseOrderNo: new FormControl(''),
      modelId: new FormControl(0),
      modelName: new FormControl(''),
      equipmentCode: new FormControl('', [Validators.maxLength(100)]),
      description: new FormControl('', [Validators.maxLength(200)]),
      expectedInstallationDtDisp: new FormControl('', [Validators.required]),
      expectedInstallationDt: new FormControl(''),
      assetList: new FormControl([]),
      purchaseDtDisp: new FormControl(''),
      preFixForAssetCode: new FormControl(''),
      suffixForAssetCode: new FormControl(''),
      seriesStartForAssetCode: new FormControl('', [Validators.pattern('^$|^[A-Za-z0-9]+')]),
      separator:new FormControl(''),
      autoGenerateAssetCode: new FormControl(false),
      storeId: new FormControl(0),
      storeName: new FormControl('', [Validators.required]),
      supplierSiteId: new FormControl(0),
      supplierSiteName: new FormControl('',[Validators.required]),
      supplSiteContactNo: new FormControl(''),
      supplSiteAddress: new FormControl(''),
      supplSiteEmailId: new FormControl(''),
      departmentCode: new FormControl(''),
      subDepartmentCode: new FormControl(''),
      variable1 :new FormControl(''),
      variable2 : new FormControl(''),
      variable3 : new FormControl(''),
      doNo: new FormControl('', [Validators.maxLength(100)]),
      doDt: new FormControl(''),
      doDtDisp: new FormControl(''),
      invoiceValue: new FormControl(0),
    });
    this.assetList = [];
  }

  ngAfterViewInit() {        
    if (this.data.inwardAssetInfo !== 0) {
      this.inwardAssetInfo = this.data.inwardAssetInfo;
      this.defaultPurchaseDt = new Date(this.data.inwardAssetInfo.purchaseDtDisp);
      this.purchaseDtDisp = this.data.inwardAssetInfo.purchaseDtDisp;
      this.expectedArrivalDtDisp = this.data.inwardAssetInfo.expectedArrivalDtDisp;
      this.locationId = this.data.inwardAssetInfo.locationId;
      this.purchaseOrderNo = this.data.inwardAssetInfo.purchaseOrderNo;
      this.modelName = this.data.inwardAssetInfo.modelName;
      this.orgId = this.data.inwardAssetInfo.orgId;
      this.subCategoryName = this.data.inwardAssetInfo.subCategoryName;
      this.contractForInvDt = this.data.inwardAssetInfo.contractForInvDt;
      this.initializeFormData1();
      this.checkWhetherAssetCodeGenerationisAutoOrNot();
      this.fetchInwardAssetInfoOrQtyGroupedByPONo();
      console.log(this.inwardAssetFormGroup);

      if (this.contractForInvDt) {   
        this.inwardAssetFormGroup.controls.doDtDisp.setValidators([Validators.required]);
        this.inwardAssetFormGroup.controls.doNo.setValidators([Validators.required]);
        this.inwardAssetFormGroup.controls.invoiceValue.setValidators([Validators.required]);     
      }
    }
  }

  closeDialog() {
    this.dialogRef.close({ status: false });
  }

  initializeFormData1() {
    this.inwardAssetFormGroup.controls.reference1.setValue(this.purchaseOrderNo);
    this.inwardAssetFormGroup.controls.reference2.setValue(this.modelName);
    this.inwardAssetFormGroup.controls.purchaseOrderNo.setValue(this.purchaseOrderNo);
    this.inwardAssetFormGroup.controls.modelName.setValue(this.modelName);
    this.inwardAssetFormGroup.controls.orgId.setValue(this.orgId);
    this.inwardAssetFormGroup.controls.locationId.setValue(this.locationId);
    this.inwardAssetFormGroup.controls.subCategoryId.setValue(this.data.inwardAssetInfo.subCategoryId);
    this.inwardAssetFormGroup.controls.subCategoryName.setValue(this.data.inwardAssetInfo.subCategoryName);
    this.inwardAssetFormGroup.controls.purchaseDtDisp.setValue(this.purchaseDtDisp);
    this.inwardAssetFormGroup.controls.autoGenerateAssetCode.setValue(this.autoGenerateAssetCode);   
    this.inwardAssetFormGroup.controls.supplierSiteId.setValue(this.data.inwardAssetInfo.supplierSiteId);
    this.inwardAssetFormGroup.controls.supplierSiteName.setValue(this.data.inwardAssetInfo.supplierSiteName);
  }

  loadServiceEngineer1ComboData(searchValue) {
    this.scrollsyncServiceEngineer1 = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllEmployeeComboFromUser.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.serviceEngineer1PageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.serviceEngineer1PageNumber === 1) {
              this.serviceEngineer1Combo = data.responseData.comboList;
            } else {
              this.serviceEngineer1Combo = this.serviceEngineer1Combo.concat(data.responseData.comboList);
            }
          } else {
            this.serviceEngineer1Combo = data.responseData.comboList;
          }
          data.responseData.comboList.length !== 0 ? this.serviceEngineer1PageNumber += 1 : this.serviceEngineer1PageNumber = 1;
        }
      );
    this.scrollsyncServiceEngineer1 = false;
  }

  selectedServiceEngineerList1(event) {
    if (event === undefined) {
      this.inwardAssetFormGroup.controls.receivedById.setValue(0);
      this.inwardAssetFormGroup.controls.receivedBy.setValue('');
      this.serviceEngineer1PageNumber = 1;
      this.serviceEngineer1Combo = [];
    } else {
      this.inwardAssetFormGroup.controls.receivedById.setValue(event.employeeId);
      this.inwardAssetFormGroup.controls.receivedBy.setValue(event.employeeFirstName);
    }
  }

  dateValidationinstall(event) {    
    return false;
  }

  dateValidations(mode){
    if (mode === 'receivedDt') {
      this.checkForMandatoryFields(this.assetList,"Received Date");
    }else if (mode === 'expectedInstallationDt') {
      this.checkForMandatoryFields(this.assetList,"Expected Installation Date");
    }
  }

  loadDepartmentComboData(searchValue) {
    this.scrollsyncDepartment = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllDeparment.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.departmentPageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.departmentPageNumber === 1) {
              this.departmentCombo = data.responseData.comboList;
            } else {
              this.departmentCombo = this.departmentCombo.concat(data.responseData.comboList);
            }
          } else {
            this.departmentCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length !== 0 ? this.departmentPageNumber += 1 : this.departmentPageNumber = 1;
        }
      );
    this.scrollsyncDepartment = false;
  }

  selectedDepartmentData(event) {    
    if (event === undefined) {
      this.inwardAssetFormGroup.controls['departmentId'].setValue(0);
      this.inwardAssetFormGroup.controls['departmentName'].setValue('');
      this.inwardAssetFormGroup.controls['departmentCode'].setValue('');
      this.inwardAssetFormGroup.controls['subDepartmentId'].setValue(0);
      this.inwardAssetFormGroup.controls['subDepartment'].setValue('');
      this.inwardAssetFormGroup.controls['subDepartmentCode'].setValue('');

      this.departmentPageNumber = 1;
      this.departmentCombo = [];
      this.subDepartmentPageNumber = 1;
      this.subDepartmentCombo = [];
    } else {
      this.inwardAssetFormGroup.controls['departmentId'].setValue(event.departmentId);
      this.inwardAssetFormGroup.controls['departmentName'].setValue(event.departmentName);
      this.inwardAssetFormGroup.controls['departmentCode'].setValue(event.departmentCode);
      this.inwardAssetFormGroup.controls['subDepartmentId'].setValue(0);
      this.inwardAssetFormGroup.controls['subDepartment'].setValue('');
      this.inwardAssetFormGroup.controls['subDepartmentCode'].setValue('');

      this.subDepartmentPageNumber = 1;
      this.subDepartmentCombo = [];
    }
  }

  loadSubDepartmentComboData(searchValue) {
    this.scrollsyncSubDepartment = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllSubDeparment.sams', searchValue.term,
      this.inwardAssetFormGroup.controls.departmentId.value > 0 ? this.inwardAssetFormGroup.controls.departmentId.value : '', '',
      this.recordsPerPageForCombo, this.subDepartmentPageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.subDepartmentPageNumber === 1) {
              this.subDepartmentCombo = data.responseData.comboList;
            } else {
              this.subDepartmentCombo = this.subDepartmentCombo.concat(data.responseData.comboList);
            }
          } else {
            this.subDepartmentCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length !== 0 ? this.subDepartmentPageNumber += 1 : this.subDepartmentPageNumber = 1;
        }
      );
    this.scrollsyncSubDepartment = false;
  }

  selectedSubDepartmentData(event) {    
    if (event === undefined) {
      this.inwardAssetFormGroup.controls['subDepartmentId'].setValue(0);
      this.inwardAssetFormGroup.controls['subDepartment'].setValue('');
      this.inwardAssetFormGroup.controls['subDepartmentCode'].setValue('');

      this.subDepartmentPageNumber = 1;
      this.subDepartmentCombo = [];
    } else {
      this.inwardAssetFormGroup.controls['subDepartmentId'].setValue(event.subDepartmentId);
      this.inwardAssetFormGroup.controls['subDepartment'].setValue(event.subDepartmentName);
      this.inwardAssetFormGroup.controls['subDepartmentCode'].setValue(event.subDepartmentCode);

    }
  }

  clearAllFields() {
    this.inwardAssetFormGroup.reset();
    this.ngOnInit();
    this.ngAfterViewInit();
  }

  loadBlockNameComboData(searchValue) {
    this.scrollsyncBlock = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllBuildingCombo.sams', searchValue.term, this.inwardAssetFormGroup.controls.locationId.value, '',
      this.recordsPerPageForCombo, this.blockNamePageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.blockNamePageNumber === 1) {
              this.blockNameCombo = data.responseData.comboList;
            } else {
              this.blockNameCombo = this.blockNameCombo.concat(data.responseData.comboList);
            }
          } else {
            this.blockNameCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length !== 0 ? this.blockNamePageNumber += 1 : this.blockNamePageNumber = 1;
        }
      );
    this.scrollsyncBlock = false;
  }

  selectedBlockData(event) {
    if (event === undefined) {
      this.inwardAssetFormGroup.controls.buildingBlockId.setValue(0);
      this.blockNamePageNumber = 1;
      this.blockNameCombo = [];
    } else {
      this.inwardAssetFormGroup.controls.buildingBlockId.setValue(event.buildingBlockId);
    }
  }

  loadRoomNameComboData(searchValue) {
    this.scrollsyncPriority = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllRoomCombo.sams', searchValue.term, this.inwardAssetFormGroup.controls.locationId.value,
      this.inwardAssetFormGroup.controls.buildingBlockId.value,
      this.recordsPerPageForCombo, this.roomNamePageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.roomNamePageNumber === 1) {
              this.roomNameCombo = data.responseData.comboList;
            } else {
              this.roomNameCombo = this.roomNameCombo.concat(data.responseData.comboList);
            }
          } else {
            this.roomNameCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length !== 0 ? this.roomNamePageNumber += 1 : this.roomNamePageNumber = 1;
        }
      );
    this.scrollsyncPriority = false;
  }

  selectedRoomData(event) {
    if (event === undefined) {
      this.inwardAssetFormGroup.controls.buildingRoomId.setValue(0);
      this.inwardAssetFormGroup.controls.buildingBlockId.setValue(0);
      this.inwardAssetFormGroup.controls.blockName.setValue('');
      this.inwardAssetFormGroup.controls.roomName.setValue('');
      this.roomNamePageNumber = 1;
      this.roomNameCombo = [];
    } else {
      this.inwardAssetFormGroup.controls.buildingRoomId.setValue(event.buildingRoomId);
      this.inwardAssetFormGroup.controls.floorName.setValue(event.floorName);
      this.inwardAssetFormGroup.controls.segmentName.setValue(event.segmentName);
      this.inwardAssetFormGroup.controls.floorName.disable();
      this.inwardAssetFormGroup.controls.segmentName.disable();
    }
  }

  loadFloorComboData(searchValue) {
    this.scrollsyncFloor = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllFloorCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.floorNamePageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.floorNamePageNumber === 1) {
              this.floorNameCombo = data.responseData.comboList;
            } else {
              this.floorNameCombo = this.floorNameCombo.concat(data.responseData.comboList);
            }
          } else {
            this.floorNameCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length !== 0 ? this.floorNamePageNumber += 1 : this.floorNamePageNumber = 1;
        }
      );
    this.scrollsyncFloor = false;
  }

  selectedFloorData(event) {
    if (event === undefined) {
      this.inwardAssetFormGroup.controls.buildingFloorId.setValue(0);
      this.floorNamePageNumber = 1;
      this.floorNameCombo = [];
    } else {
      this.inwardAssetFormGroup.controls.buildingFloorId.setValue(event.buildingFloorId);
    }
  }

  loadSegmentNameComboData(searchValue) {
    this.scrollsyncSegment = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllSegmentCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.segmentNamePageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.segmentNamePageNumber === 1) {
              this.segmentNameCombo = data.responseData.comboList;
            } else {
              this.segmentNameCombo = this.segmentNameCombo.concat(data.responseData.comboList);
            }
          } else {
            this.segmentNameCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length !== 0 ? this.segmentNamePageNumber += 1 : this.segmentNamePageNumber = 1;
        }
      );
    this.scrollsyncSegment = false;
  }

  selectedSegmentData(event) {
    if (event === undefined) {
      this.inwardAssetFormGroup.controls.buildingSegmentId.setValue(0);
      this.segmentNamePageNumber = 1;
      this.segmentNameCombo = [];
    } else {
      this.inwardAssetFormGroup.controls.buildingSegmentId.setValue(event.buildingSegmentId);
    }
  }

  loadPriorityComboData(searchValue) {
    this.scrollsyncPriority = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllPriorityForCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.priorityPageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.priorityPageNumber === 1) {
              this.priorityCombo = data.responseData.comboList;
            } else {
              this.priorityCombo = this.priorityCombo.concat(data.responseData.comboList);
            }
          } else {
            this.priorityCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length !== 0 ? this.priorityPageNumber += 1 : this.priorityPageNumber = 1;
        }
      );
    this.scrollsyncPriority = false;
  }

  selectedPriorityData(event) {
    if (event === undefined) {
      this.inwardAssetFormGroup.controls.priorityName.setValue('');
      this.priorityPageNumber = 1;
      this.priorityCombo = [];
    } else {
      this.inwardAssetFormGroup.controls.priorityName.setValue(event.priorityName);
    }
  }

  selectedDepartmentForElement(event,index) {
    if (event === undefined) {
      this.assetList[index].departmentId = 0;
      this.assetList[index].departmentName = '';
      this.assetList[index].departmentCode = '';
      this.assetList[index].subDepartmentId = 0;
      this.assetList[index].subDepartment = '';
      this.selectedDepartmentId = 0;
      this.subDepartmentPageNumber = 1;
      this.subDepartmentCombo = [];
    } else {
      this.assetList[index].departmentId = event.departmentId;
      this.assetList[index].departmentName = event.departmentName;
      this.assetList[index].departmentCode = event.departmentCode;
      this.assetList[index].subDepartmentId = 0;
      this.assetList[index].subDepartment = '';
      this.selectedDepartmentId = event.departmentId;
      this.assetList[index].assetCode = this.assetList[index].assetCode.replace(this.inwardAssetFormGroup.controls.departmentCode.value,event.departmentCode);
      this.assetList[index].assetCode = this.assetList[index].assetCode.replace(this.inwardAssetFormGroup.controls.subDepartmentCode.value,'');
    }
    this.checkForMandatoryFields(this.assetList,"Department");
  }

  checkForMandatoryFields(dataSource,msg){    
    if (dataSource.length > 0) {
    this.disableSubmit = false;
      for (const index of dataSource) {        
        if (index.departmentId === 0 || index.receivedById === 0 || index.receivedDtDisp === ''
        || index.expectedInstallationDtDisp === '') {        
          this.commonService.openToastWarningMessage(`Kindly Select The ` + msg);
          this.disableSubmit = true;
        }      
      }
    }
    
  }

  selectedReceivedEmpForElement(event, index) {
    if (event === undefined) {
      this.assetList[index].receivedById = 0;
      this.assetList[index].receivedBy = '';
      this.serviceEngineer1PageNumber = 1;
      this.serviceEngineer1Combo = [];
    } else {
      this.assetList[index].receivedById = event.employeeId;
      this.assetList[index].receivedBy = event.employeeFirstName;
    }
    this.checkForMandatoryFields(this.assetList,"Received By");
  }

  selectedSubDepartmentForElement(event, index) {
    if (event === undefined) {
      this.assetList[index].subDepartmentId = 0;
      this.assetList[index].subDepartment = '';
      this.assetList[index].subDepartmentCode = '';
      this.subDepartmentPageNumber = 1;
      this.subDepartmentCombo = [];
    } else {
      this.assetList[index].subDepartmentId = event.subDepartmentId;
      this.assetList[index].subDepartment = event.subDepartmentName;
      this.assetList[index].subDepartmentCode = event.subDepartmentCode;

      this.assetList[index].assetCode = this.assetList[index].assetCode.replace(this.inwardAssetFormGroup.controls.subDepartmentCode.value,event.subDepartmentCode);
      this.assetList[index].assetCode = this.assetList[index].assetCode.replace('//','/'+event.subDepartmentCode+'/');
    }
  }

  selectedPriorityNameForElement(event, index) {
    if (event === undefined) {
      this.assetList[index].priorityName = '';
      this.priorityPageNumber = 1;
      this.priorityCombo = [];
    } else {
      this.assetList[index].priorityName = event.priorityName;
    }
  }

  loadSubDepartmentForElementComboData(searchValue,element) {    
    this.scrollsyncSubDepartmentForElement = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllSubDeparment.sams', searchValue.term,
    element.departmentId === 0 ? '' : element.departmentId, '',
      this.recordsPerPageForCombo, this.subDepartmentPageNumberForElement).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.subDepartmentPageNumberForElement === 1) {
              this.subDepartmentComboForElement = data.responseData.comboList;
            } else {
              this.subDepartmentComboForElement = this.subDepartmentComboForElement.concat(data.responseData.comboList);
            }
          } else {
            this.subDepartmentComboForElement = data.responseData.comboList;
          }
          data.responseData.comboList.length !== 0 ? this.subDepartmentPageNumberForElement += 1 : this.subDepartmentPageNumberForElement = 1;
        }
      );
    this.scrollsyncSubDepartment = false;
  }

  fetchInwardAssetInfoOrQtyGroupedByPONo() {
    this.commonService.commonGetService('getInwardAssetQtyGroupedByPoNo.sams', '', this.purchaseOrderNo, this.modelName, this.locationId).subscribe(
      (data) => {
        if (data.success) {
          this.serialNoGeneratorModel = data.responseData;
          this.inwardAssetFormGroup.patchValue(data.responseData);
          this.inwardAssetFormGroup.controls.qty.setValue(data.responseData.qty);
          this.inwardAssetFormGroup.controls.qty.disable();
          if (this.inwardAssetFormGroup.controls.qty.value <= 0) {
            const errorMessageWhenQtyIsLtEZero = `There are no assets for PoNo='${this.purchaseOrderNo}' and Model=' + ${this.modelName} '`;
            this.commonService.openToastWarningMessage(errorMessageWhenQtyIsLtEZero);
          }
          this.assetList = data.responseData.assetList;          
          this.length = this.assetList.length;
          this.storeAssetListInfoInTempList();
          this.initializeFormData1();
          this.validateDuplicateRecord();

        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }
    );
  }

  generateSerialNo() {
    if ((this.inwardAssetFormGroup.controls.preFix.value.length + this.inwardAssetFormGroup.controls.suffix.value.length
      + this.inwardAssetFormGroup.controls.seriesStart.value.length) > 50) {
      this.commonService.openToastWarningMessage("Total length of (Prefix + Suffix + SeriesStart) for SerialNo should not be greater than 50")
    } else if ((this.inwardAssetFormGroup.controls.preFixForAssetCode.value.length + this.inwardAssetFormGroup.controls.suffixForAssetCode.value.length
      + this.inwardAssetFormGroup.controls.seriesStartForAssetCode.value.length) > 100) {
      this.commonService.openToastWarningMessage("Total length of (Prefix + Suffix + SeriesStart) for AssetCode should not be greater than 100")
    } else {
      this.generateSerialNoFlag = true;
      this.inwardAssetFormGroup.controls['receivedDtDisp']
      .setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.inwardAssetFormGroup.get('receivedDtDisp').value));
      this.inwardAssetFormGroup.controls['expectedInstallationDtDisp']
      .setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.inwardAssetFormGroup.get('expectedInstallationDtDisp').value));
      this.inwardAssetFormGroup.controls['doDtDisp']
      .setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.inwardAssetFormGroup.get('doDtDisp').value));
      this.inwardAssetFormGroup.controls.seriesStartForAssetCode.setValue('0002');      
      this.commonService.commonInsertService('generateSerialNoGroupedByPoNoAndModel.sams', this.inwardAssetFormGroup.getRawValue()).subscribe(
        (data) => {
          if (data.success) {
            this.generateSerialNoFlag = false;
            const validationMessage = `Kindly Update If Required And "Submit".`;
            this.commonService.openToastSuccessMessage(data.message);
            setTimeout(() => {
              this.commonService.openToastSuccessMessage(validationMessage);
            }, 1500);                        
            this.assetList = data.responseData.dataList;                        
            this.length = this.assetList.length;
            this.storeAssetListInfoInTempList();
            this.validateDuplicateRecord();
            this.inwardAssetFormGroup.controls.assetList.setValue(this.assetList);
          } else {
            this.generateSerialNoFlag = false;
            this.commonService.openToastErrorMessage(data.message);
          }
        }
      );
    }
  }

  saveInwardAssetListGroupedByPoNo() {
    this.validateDuplicateRecord();
    const lengthOfAssetList = this.assetList.length;
    if (this.nonUniqueValue) {
      this.commonService.openToastWarningMessage("One or more Non Unique record found");
    } else {
      const confirmationMessage = `Are You Sure To Update The "Batch" With PO No: ${this.purchaseOrderNo}, Having ${lengthOfAssetList} Assets?`;
      this.uploadAssetFlag = true;
      const confirmationDialog = this.dialog.open(ConfirmConfirmationComponent, {
        height: 'auto',
        width: '400px',
        data: {
          'confirmHeading': 'Confirmation',
          'confirmMsg': confirmationMessage
        }
      });
      confirmationDialog.disableClose = true;
      confirmationDialog.afterClosed().subscribe(
        data => {
          if (data.status) {                 
            this.inwardAssetFormGroup.controls.assetList.setValue(this.assetList);
            this.commonService.commonInsertService('saveInwardAssetBatchByPoNo.sams', this.inwardAssetFormGroup.getRawValue()).subscribe(
              (data) => {
                if (data.success) {
                  this.uploadAssetFlag = false;
                  this.commonService.openToastSuccessMessage(data.message);
                  this.dialogRef.close({ status: true, batchHdr: this.inwardAssetFormGroup.getRawValue() });
                } else {
                  this.uploadAssetFlag = false;
                  this.commonService.openToastErrorMessage(data.message);
                }
              }
            );
          } else {
            this.uploadAssetFlag = false;
          }
        });
    }
  }

  selectedBlockDataForElement(event, index) {
    if (event === undefined) {
      this.assetList[index].buildingBlockId = 0;
      this.blockNamePageNumber = 1;
      this.blockNameCombo = [];
    } else {
      this.assetList[index].buildingBlockId = event.buildingBlockId;
    }
  }

  loadRoomNameComboDataForElement(searchValue, index) {
    console.log(this.assetList[index].buildingBlockId);
    console.log(this.assetList[index]);

    
    this.scrollsyncRoom = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllRoomCombo.sams', searchValue.term, this.inwardAssetFormGroup.controls.locationId.value, this.assetList[index].buildingBlockId,
      this.recordsPerPageForCombo, this.roomNamePageNumberForElement).subscribe(
        (data) => {
          console.log(data);
          
          console.log(data.responseData.comboList);

          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.roomNamePageNumberForElement === 1) {
              console.log(data.responseData.comboList);
              
              this.roomNameComboForElement = data.responseData.comboList;
            } else {
              this.roomNameComboForElement = this.roomNameComboForElement.concat(data.responseData.comboList);
            }
          } else {
            this.roomNameComboForElement = data.responseData.comboList;
          }
          data.responseData.comboList.length !== 0 ? this.roomNamePageNumberForElement += 1 : this.roomNamePageNumberForElement = 1;
        }
      );
    this.scrollsyncRoom = false;
  }

  selectedRoomDataForElement(event, index) {
    if (event === undefined) {
      this.assetList[index].buildingRoomId = 0;
      this.assetList[index].buildingBlockId = 0;
      this.assetList[index].blockName = '';
      this.assetList[index].roomName = '';
      this.roomNamePageNumberForElement = 1;
      this.roomNameComboForElement = [];
    } else {
      this.assetList[index].buildingRoomId = event.buildingRoomId;
      this.assetList[index].floorName = event.floorName;
      this.assetList[index].segmentName = event.segmentName;
    }
  }

  checkForAssetSerialNoExistence(serialNoValue, index) {
    if (this.tempAssetList[index].serialNo === serialNoValue) {
      this.ErrorMsgSerialNo = '';
      this.assetList[index].serialNoIsNotUnique = false;
    }
    else if ((serialNoValue !== null && serialNoValue !== '') &&
      (this.tempAssetList[index].serialNo !== serialNoValue)) {
      this.commonService.commonGetService('validateAssetSerialNoUnique.sams', serialNoValue,
        this.userSessionService.getUserOrgId()).subscribe(
          data => {
            if (data.success) {
              this.ErrorMsgSerialNo = data.message;
              this.assetList[index].serialNoIsNotUnique = true;
            } else {
              this.ErrorMsgSerialNo = '';
              this.assetList[index].serialNoIsNotUnique = false;
            }
          });
    }
  }

  validateDuplicateRecord() {
    for (const asset of this.assetList) {
      if (asset.serialNoIsNotUnique || asset.nonUniqueAssetCode) {
        this.nonUniqueValue = true;
        break;
      } else {
        this.nonUniqueValue = false;
      }
    }
    return this.nonUniqueValue;
  }

  storeAssetListInfoInTempList() {
    if (this.assetList.length > 0) {
      this.tempAssetList = [];
      for (const asset of this.assetList) {
        const obj = {
          serialNo: asset.serialNo,
          assetCode: asset.assetCode
        }
        this.tempAssetList.push(obj);
      }
    }
  }

  checkWhetherAssetCodeGenerationisAutoOrNot() {
    this.commonService.commonGetService('validateAssetCodeBasedonSubCategory.sams', this.subCategoryName, this.locationId, this.orgId).subscribe(
      data => {
        if (data.success) {
          this.autoGenerateAssetCode = true;
          this.inwardAssetFormGroup.controls.autoGenerateAssetCode.setValue(this.autoGenerateAssetCode);
          this.inwardAssetFormGroup.controls['seriesStartForAssetCode'].setValidators([]);
          this.inwardAssetFormGroup.controls['seriesStartForAssetCode'].updateValueAndValidity();
        } else {
          this.autoGenerateAssetCode = false;
          this.inwardAssetFormGroup.controls.autoGenerateAssetCode.setValue(this.autoGenerateAssetCode);
          this.inwardAssetFormGroup.controls['separator'].setValidators([Validators.required]);
          this.inwardAssetFormGroup.controls['preFixForAssetCode'].setValidators([Validators.required]);
          this.inwardAssetFormGroup.controls['seriesStartForAssetCode'].updateValueAndValidity();
        }
      }, error => {
        this.commonService.openToastErrorMessage("Error Occurred");
      }
    );
  }

  uniqueValidation(assetCode, index) {
    if (this.tempAssetList[index].assetCode === assetCode) {
      this.ErrorMsgSerialNo = '';
      this.assetList[index].nonUniqueAssetCode = false;
    }
    else if ((assetCode !== null && assetCode !== '') &&
      (this.tempAssetList[index].assetCode !== assetCode)) {
      this.commonService.commonGetService('validateAssetCodeUnique.sams', assetCode,
        this.userSessionService.getUserOrgId()).subscribe(
          data => {
            if (data.success) {
              this.ErrorMsgSerialNo = data.message;
              this.assetList[index].nonUniqueAssetCode = true;
            } else {
              this.ErrorMsgSerialNo = '';
              this.assetList[index].nonUniqueAssetCode = false;
            }
          }
        );
    }
  }

  listOfStore(searchTerms) {
    this.scrollSyncStore = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults('listOfAllStoreCombo.sams', searchTerms.term, '', '', this.recordsPerPageForCombo, this.storePageNo).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.storePageNo , this.storeNameList , data.responseData.comboList)
        this.storePageNo = this.getData.pageNumber;
        this.storeNameList = this.getData.dataList;
        this.scrollSyncStore = false;
      }
    );
  }

  selectedStoreName(event) {    
    if (event === undefined) {
      this.inwardAssetFormGroup.controls.storeName.setValue('');
      this.inwardAssetFormGroup.controls.storeId.setValue(0);
      this.storeNameList = [];
      this.storePageNo = 1;
    } else {
      this.inwardAssetFormGroup.controls.storeName.setValue(event.storeName);
      this.inwardAssetFormGroup.controls.storeId.setValue(event.storeId);
    }

  }

  listOfSupplierApproved(searchValue) {
    this.scrollApprovedSuppliersync = true;
    const supplierId = this.data.inwardAssetInfo.supplierId;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllSupplierLocCombo.sams', searchValue.term,supplierId, '', this.recordsPerPageForCombo, this.approvedSupplierPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.approvedSupplierPageNumber , this.supplierLocationList , data.responseData.comboList)
        this.approvedSupplierPageNumber = this.getData.pageNumber;
        this.supplierLocationList = this.getData.dataList;
        this.scrollApprovedSuppliersync = false;
      }
    );
  }

  fetchIdOfSupplierApproved(event) {    
    if (event === undefined) {
      this.inwardAssetFormGroup.get('supplierSiteId').setValue(0);   
      this.supplierLocationList = [];
      this.approvedSupplierPageNumber = 1;
    } else {
      this.inwardAssetFormGroup.controls.supplierSiteId.setValue(event.supplierLocationId);
      this.inwardAssetFormGroup.controls.supplierSiteName.setValue(event.supplierSiteName);
      //SET OTHER INFO
      this.inwardAssetFormGroup.controls.supplSiteAddress.setValue(event.suppLocAddress1);
      this.inwardAssetFormGroup.controls.supplSiteEmailId.setValue(event.supplierSiteContactEmailId);
      this.inwardAssetFormGroup.controls.supplSiteContactNo.setValue(event.supplierSitePersonPhoneNo);
    }
  }

  setVariableOne(event){
    if(event === undefined){
      this.inwardAssetFormGroup.controls.variable1.setValue('');
    }else{
      if (this.inwardAssetFormGroup.controls.variable2.value === event.name || this.inwardAssetFormGroup.controls.variable3.value === event.name) {
        this.inwardAssetFormGroup.controls.variable1.setValue('');
        this.commonService.openToastWarningMessage("Selected Variable Exists Already");
      }else{
        this.inwardAssetFormGroup.controls.variable1.setValue(event.name);
      }
    }
    this.changeDetectorRefs.detectChanges();
  }

  setVariableTwo(event){    
    if(event === undefined){
      this.inwardAssetFormGroup.controls.variable2.setValue('');
    }else{
      if (this.inwardAssetFormGroup.controls.variable1.value === event.name || this.inwardAssetFormGroup.controls.variable3.value === event.name) {
        this.inwardAssetFormGroup.controls.variable2.setValue('');
        this.commonService.openToastWarningMessage("Selected Variable Exists Already");
        this.changeDetectorRefs.detectChanges();
      }else{
        this.inwardAssetFormGroup.controls.variable2.setValue(event.name);
      }
    }
  }

  setVariableThree(event){
    if(event === undefined){
      this.inwardAssetFormGroup.controls.variable3.setValue('');
    }else{
      if (this.inwardAssetFormGroup.controls.variable2.value === event.name || this.inwardAssetFormGroup.controls.variable1.value === event.name) {
        this.inwardAssetFormGroup.controls.variable3.setValue('');
        this.commonService.openToastWarningMessage("Selected Variable Exists Already");
      }else{
        this.inwardAssetFormGroup.controls.variable3.setValue(event.name);
      }
      this.changeDetectorRefs.detectChanges();
    }
  }

  toggleRow(element: any,index) {
    this.expandedElement = this.expandedElement === element ? null : element;
  }

}
