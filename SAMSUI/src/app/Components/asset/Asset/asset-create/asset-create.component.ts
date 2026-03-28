import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { CusFieldHdr } from 'src/app/Model/master/cusFieldHdr';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { AssetCategoryModel } from 'src/app/Model/master/assetCategory';
import { AssetDocCreateComponent } from '../asset-doc/asset-doc-create/asset-doc-create.component';
import { DeleteConfirmationComponent } from 'src/app/Components/Common-components/delete-confirmation/delete-confirmation.component';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { BulkSerialNumberUploadComponent } from '../../pop-up/bulk-serial-number-upload/bulk-serial-number-upload.component';
import { AssetModel } from 'src/app/Model/master/asset';
import { AssetAssignee } from 'src/app/Model/master/asset-assignee';
import readXlsxFile from 'read-excel-file';
import { MaintenanceScheduleHdrModel } from 'src/app/Model/maintenance/maintenanceScheduleHdr';
import { ConfirmConfirmationComponent } from 'src/app/Components/Common-components/confirm-confirmation/confirm-confirmation.component';

import { AssetItemViewComponent } from 'src/app/Components/asset/asset-item-view/asset-item-view.component';
import { allassetStatus , allWorkflowStatus , allAssetAgeCriteriaStatus , allAssetCondition ,allAssetStatusType, allPreInwardStatus, allAssetCreateStatus, allAssetCodeChangeStatus} from '../../../../Constants/AllStatusConstants'

import { getData } from '../../../../Model/common/fetchListData';
import { EditAssetInfoGroupedByPoNoDialogComponent } from '../edit-asset-info-grouped-by-po-no-dialog/edit-asset-info-grouped-by-po-no-dialog.component';
import { UploadCertificateComponent } from '../../upload-certificate/upload-certificate.component';

import {AssetScreenTabs} from '../../../../Constants/AssetScreenTabs';
import { DateTimeService } from 'src/app/Services/date-time/date-time.service';
import { AssetStatusEditComponent } from '../asset-status-edit/asset-status-edit.component';
import * as moment from 'moment';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { allBusinessPartnerRoles } from 'src/app/Constants/AllStatusConstants';
import { TranslateService } from '@ngx-translate/core';
import { ChangeAssetCodeCreateComponent } from '../change-asset-code-create/change-asset-code-create.component';
import { CommonWorkflowApprovalDialogComponent } from 'src/app/Components/workflow/workflowApproval/common-workflow-approval-dialog/common-workflow-approval-dialog.component';


@Component({
  selector: 'app-asset-create',
  templateUrl: './asset-create.component.html',
  styleUrls: ['./asset-create.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AssetCreateComponent implements OnInit {

  step = 0;
  assetDisCol = ['sno', 'assetCode', 'serialNo', 'installDt', 'funcStatus', 'location', 'dept', 'status', 'action'];

  supplierDataSource: any = [];
  supplierDispCol = ['sno', 'supplierName', 'supplierType', 'serviceType', 'active', 'action'];

  modelItems = false;
  modelItemListDataSource = [];
  modelItemsDisCol = ['sno', 'itemName', 'itemDesc', 'itemType', 'uomCode', 'active', 'quantity', 'consumedQty', 'remainingQty', 'action'];

  showDocument = false;
  documentDataSource: any = [];
  documentDisCol = ['sno', 'docName', 'docType', 'createdBy', 'createdDtDisp', 'action'];

  assetDocumentDataSource: any = [];
  assetDocumentDisCol = ['sno', 'docName', 'docType', 'createdBy', 'createdDt', 'action'];

  ceidDisplayedColumns = ['sno', 'assetCode', 'newAssetCode', 'reason', 'newCeidStatus', 'action']

  contractLength = '0';
  contractDataSource: any = [];
  contractDisplayCol = ['sno', 'contractNo', 'coverageType', 'contractingPartyType',
    'contractStatus', 'contractStartDtDisp', 'active', 'netContractValue', 'action']

  statutoryRequirementLength = '0';
  listOfCertificates: any = [];
  statutoryRequirementCol = ['sno', 'certificateName', 'issueDt', 'expiryDt', 'fileCertificateNo', 'documentNo', 'action']

  bulkSerialLength = '0';
  listOfAssetVolumeLicense = new MatTableDataSource<any>();
  volumeLicenseDisplayedColumns = ['sno', 'productKey', 'assignedTo', 'status', 'assignedAssetCode', 'assignedAssetModel', 'assignedAssetSerialNo', 'assignedAssetEquipmentCode', 'action'];

  consumedSparesDataSource: any = [];
  consumedSparesLength = '0';
  consumedSparesDisplayCol = ['sno', 'WoNo', 'source', 'itemName', 'itemType', 'store', 'issuedQty', 'uom', 'unitPrice', 'totalAmount', 'action']

  gatepassDispCol = ['sno', 'gatePassNo', 'gatePassDt', 'gatePassPurpose', 'deliveryTo', 'gatePassStatus', 'gatePassSource', 'gatePassSourceNo', 'deliveryMode', 'receivedBy', 'contactNo', 'email', 'action']
  gatePassHistoryDataSource: any = [];
  gatePassHistoryLength = '0';

  showSelfAnalysis = false;
  selfAnalysisDataSource : any = [];
  selfAnalysisDisCol = ['sno', 'defectType', 'defectTag', 'defectQuestion'];
  lengthSelfAnalysisList: number = 0;

  showAdditionalInfo = false;
  additionalInfoDataSource : any =[];
  additionalInfoDisCol = ['sno', 'infoName', 'infoLabel', 'infoTitle', 'infoDetails'];
  lengthAdditionalInfoList: number = 0;

  showCheckList = false;
  addCheckPointsDataSource: any =[];
  checkPointsDisCol = ['sno', 'parameterName', 'parameterTypeName', 'startValue', 'endValue', 'uom'];
  lengthCheckPointsList: number = 0;

  showInventoryModule = false;
  itemModuleListDataSource: any =[];
  displayedColumns = ['sno', 'itemModuleName', 'itemCount', 'active'];
  innerDisplayedColumns = ['sno', 'itemName', 'itemDesc', 'itemTypeName','uomCode', 'active'];
  lengthModelModuleList: number = 0;
  subLoaderItemModule:boolean=false;

  showSolutionBank = false;
  solutionBankDataSource: any =[];
  solutionBankDisCol = ['sno', 'defectName', 'defectTag', 'defectCause', 'defectSolution'];
  lengthSolutionBankList: number = 0;

  showTechnicalSpecelist =false;
  specialistDataSource: any =[];
  specialistDispCol = ['sno', 'orgType', 'orgName', 'specialistName', 'contactNo', 'emailId']
  lengthTechnicalSpecialistList: number = 0;

  assetCodeChangeDataSource: any = [];
  assetCodeChangeDisCol = ['sno', 'assetCode', 'newAssetCode', 'reason', 'requestRaisedBy' , 'newCeidStatus', 'approvedOrRejectedBy', 'updatedBy','action'];
  assetCodeChange = allAssetCodeChangeStatus[allAssetCodeChangeStatus.AWAITING_FOR_CHANGE_ASSET_CODE_APPROVAL]
  lengthAssetCodeChangeList: number = 0;
  assetCodeChangeBtn: boolean = true;
  refreshSameScreen: boolean = false;

  public assetCategoryModel: AssetCategoryModel;
  pageSize = '0';
  pageIndex = '0';
  filePath: string;
  option: any;
  option2: any;

  totalVolumeLicenseCount : any = 0;
  inStockVolumeLicenseCount = 0;
  sourceScreen = "";

  itemScrollSync = false;
  itemPageNumber: number;
  itemNameList = [];
  addMode = false;

  buttonHeadingDisplay = '';
  itemButtonHeading = 'Add';

  isStraightLineMethod: boolean = false;

  asset_register = allWorkflowStatus[allWorkflowStatus.ASSET_CREATE]

  //Set Page Title
  title = 'Asset Optima - Asset';

  @ViewChild('modelNameFocus') modelNameFocusSet: NgSelectComponent;
  @ViewChild('assetCertificate') table1: MatTable<any>;
  @ViewChild('assetVolumeLicense') table2: MatTable<any>;
  @ViewChild('uploadExcelFile') uploadExcelFile: ElementRef<HTMLElement>;
  assetModel: AssetModel = new AssetModel();

  scheduleingdisplayedColumns = ['sno', 'scheduleTitle', 'scheduleType', 'priority', 'frequency', 'occurances', 'active', 'action'];
  public scheduleHdrModel: MaintenanceScheduleHdrModel;
  maintenanceScheduleDataSource = [];
  subLoader = false;

  assigneeDisplayedColumns = ['sno', 'deptName', 'assignedTo', 'assigneeType', 'startDt', 'endDt', 'emailId', 'phoneNo', 'primaryTechnician','secondaryTechnician', 'pmPATechnician', 'qaTechnician', 'action']
  @ViewChild('matAssignee') tableAssignee: MatTable<any>;
  @ViewChild('matAccessories') tableAccessories: MatTable<any>;
  @ViewChild('matConsumables') tableConsumables: MatTable<any>;
  @ViewChild('matSpareParts') tableSpareParts: MatTable<any>;
  @ViewChild('volumLicenseInsertTable') tableVolumLicenseInsertTable: MatTable<any>;

  public assetAssigneeDataSource: AssetAssignee[] = [];
  public assetAssigneeDataSourceFilterByPersonIncharge: AssetAssignee[] = [];
  public assetAssigneeForm: FormGroup;
  assetAssigneeTypeNameCombo: any = [];
  scrollsyncAssigneeType = false;
  assigneePageNumber: number;
  disableCheckBox = false;
  assigneeDepartmentPageNumber = 1;
  scrollsyncAssigneeDepartment = false;
  assigneeDepartmentCombo: any = [];
  assetAssigneeTempPush: any = [];


  scrollSuppliersync = false;

  //COMBO LIST
  modelList: any = [];
  assetGroupList: any = [];
  departmentList: any = [];
  subCategoryName: any = [];
  assetCategoryName: any = [];
  assetTypeName: any = [];
  subDepartmentList: any = [];
  locationList: any = [];
  personInChargeList: any = [];
  supplierList: any = [];
  currencycdList: any = [];

  assetDataSource: any[] = [];
  res = [];
  diableAssigneeAddButton = false;

  assetMainForm: FormGroup;
  assetCertificateFormGroup: FormGroup;
  headingDisplay: string;
  buttonDisplay: string;
  disableClear: boolean;
  partValue: any;
  pmMonthDisp: any;
  paMonthDisp: any;
  qaMonthDisp: any;
  installDt: Date = new Date();
  selectedIndex = 0;
  maxNumberOfTabs = 4;
  changeCeidButtonDisplay = false;

  //ICON TO SHOW VALIDATION IN TAB WISE
  assetInfoTabValidation = false;
  assetPurchaseInvoiceInfoTabValidation = false;
  assetAssetDeliveryInstallationInfoTabValidation = false;

  scrollsyncCertificateCombo = false;
  isUploadButtonDisabled = false;

  modeDisplay = false;

  uploadAssetFlag = false;

  //COMBO
  assetGroup: any = [];
  modelCombo: any = [];
  locationCombo: any = [];
  departmentCombo: any = [];
  subDepartmentCombo: any = [];
  personInchargeCombo: any = [];
  serviceEngineer1Combo: any = [];
  serviceEngineer2Combo: any = [];
  serviceEngineer3Combo: any = [];
  serviceEngineer4Combo: any = [];
  supplierCombo: any = [];
  certificateNameList: any = [];
  blockNameCombo: any = [];
  floorNameCombo: any = [];
  segmentNameCombo: any = [];
  roomNameCombo: any = [];
  priorityCombo: any = [];
  depreciationMethodCombo: any = [];
  supplierLocationList: any = [];
  cusFiledHdrTempList: any[];

  assetGroupPageNumber: number;
  modelComboPageNumber: number;
  assetCategoryPageNumber: number;
  assetSubCategorPageNumber: number;
  assetTypePageNumber: number;
  locationPageNumber: number;
  departmentPageNumber: number = 1;
  subDepartmentPageNumber: number;
  personInchargePageNumber: number;
  serviceEngineer1PageNumber: number;
  serviceEngineer2PageNumber: number;
  serviceEngineer3PageNumber: number;
  serviceEngineer4PageNumber: number;
  asssetStatusPageNumber: number;
  supplierPageNumber: number;
  certificatePageNumber: number;
  priorityPageNumber: number;
  blockNamePageNumber: number;
  floorNamePageNumber: number;
  segmentNamePageNumber: number;
  roomNamePageNumber: number;
  depreciationMethodPageNumber: number;
  approvedSupplierPageNumber: number;
  supplierListPageNumber: number;

  scrollsyncAssetGroup = false;
  scrollManufacturersync =false;
  scrollsyncModel = false;
  scrollsyncLocation = false;
  scrollsyncDepartment = false;
  scrollsyncSubDepartment = false;
  scrollsyncPersonIncharge = false;
  scrollsyncServiceEngineer1 = false;
  scrollsyncServiceEngineer2 = false;
  scrollsyncServiceEngineer3 = false;
  scrollsyncServiceEngineer4 = false;
  scrollsyncSupplier = false;
  scrollsyncAssetCategory = false;
  scrollsyncAssetSubCategory = false;
  scrollsyncAssetType = false;
  scrollsyncCertificate = false;
  subLoaderCertificate = false;
  recordsPerPageForCombo: string;
  assignToPersonPageNumber: number = 0;
  assignToPersonCombo: any = [];
  scrollsyncAssignToPerson = false;
  scrollsyncPriority = false;
  scrollsyncBlock = false;
  scrollsyncFloor = false;
  scrollsyncRoom = false;
  scrollsyncSegment = false;
  scrollsyncDepreciationMethod = false;
  scrollApprovedSuppliersync = false;

  installationDoneByCheck = false;
  receivedDtDispCheck = false;
  storeNameCheck = false;
  expectedInstallationDtDispCheck = false;
  receivedByCheck = false;

  srId: number;
  srType: string;
  srStatus: string;
  certificateName: string;
  lengthOfCertificate = '0';
  duplicateProductList = '';

  insExternalEnggInfo = false;
  volumeLicenseForm: FormGroup;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  ErrorMsg: string;
  tempValue = '';
  ErrorMsgSerialNo: string;
  tempValueSerialNo = '';

  cusFieldHdr: CusFieldHdr;
  cusFieldHdrList: CusFieldHdr[];

  ceidMandatory: string;

  assetId: number;
  status = '';
  disableUpdateButton = false;

  changeStrategySubloader = false;

  // HEADDING DISPLAY
  menu = '';
  screen = '';
  inclusiveTax = "false";

  editButtonEnabled = false;
  isViewMode = false;
  subLoaderForVolumeLicense = false;

  fileUploadFlag: boolean;
  public fileToUpload: File;

  pathForSampleDocOfVolumeLicense = '/assets/doc-template/VOLUME_PRODUCT_KEY_SAMPLE_TEMPLATE.xlsx';

  //PERMISSIONS
  modelAccessModule: ModuleAccessModel;

  manufacturerListPageNumber: number = 0;
  manufacturerList: any = [];

  installationDoneBy = [
    { id: 1, name: 'INTERNAL' },
    { id: 2, name: 'EXTERNAL' }
  ];

  installationProvidedBy = [
    { id: 1, name: 'MANUFACTURER' },
    { id: 2, name: 'SUPPLIER' }
  ];

  //APPROVAL WORK FLOW
  public transactionSource: any;

  employeeId = '0';
  approvalId = '0';
  approvebuttonEnable = false;

  scrollCustomersync = false;
  customerListPageNumber: number;
  customerList: any = [];

  scrollCustomerLocationSync = false;
  customerLocationListPageNumber: number;
  customerLocationCombo: any = [];

  scrollSyncStore = false;
  storePageNo: number;
  storeNameList: any = [];

  disableItemAllocation = false;

  //PERMISSIONS
  modelAccessModuleSR: ModuleAccessModel;
  modelAccessModuleAssetStatus: ModuleAccessModel;
  modelAccessModuleAssetCodeChange: ModuleAccessModel;

  assetAccessoriesFormGroup: FormGroup;

  customerFieldMandatory:boolean =false;

  currencyCdPageNumber: number;
  limitCount: any;
  currencyScrollsync: boolean = false;

  //BATCH BUTTON CONTROL
  disableBatch: boolean = false;

  employeeFirstName: any = [];

  searchKey: any = '';
  assetPOqty: any = 0;

  totalAssignedLicenseQty: any = 0;

  allassetStatus = allassetStatus;
  mode: any;
  activetab: any;
  previousPath : any;

  AssetAgeCriteriaStatus = allAssetAgeCriteriaStatus;
  assetAge: String;
  getData: getData;

  showcustomField: Boolean;

  productKeyArray: any=[];
  volumeLicenseInsertForm: FormGroup;

  volumeLicenseListCol = ['sno', 'productKey', 'licenseQty', 'productPrefix', 'action']
  isVolumeLicensePresent: any = false;
  trackIndividualLicense: any = false;
  productKeyQty: number = 0;
  scrollsyncLicenseEmpFirstName: boolean;
  employeePageNumber: number;
  validLicense: any = false;

  unAssignedAssetLicenseQty: any = 0;
  assignedAssetLicenseQty : any = 0;
  volumeLicenseSuffix : any = 0;

  tabsList = AssetScreenTabs;
  checkModelInstallationType: any = '';
  formTwoValid: boolean = false;

  approveStatus = 'APPROVED';
  content: string = '';
  transactionSrc: string = '';

  inUseStatus = allassetStatus.IN_USE;
  notInStock = allassetStatus.NOT_IN_STOCK;

  expandedElement: any | null;
  underProcess: boolean =false;
  fromContact: boolean =false;
  subCategory: any;
  manufacturer: any;

  scrollServiceProviderNamesync: boolean = false;
  ServiceProviderPageNumber: number;
  ServiceProviderList: any = [];

  scrollApprovedServiceProvidersync: boolean = false;
  approvedServiceProviderPageNumber: number;
  ServiceProviderLocationList: any = [];
  sourceScreenOfSupplier = '';
  docFilePath: String = '';
  imageFilePath: String = '';
  showPoDocView: boolean = false;
  poDocFileType: string = '';

  purchaseStatusList = [
    { purchaseStatus: 'Actual' },
    { purchaseStatus: 'Estimated' }
  ];

  scrollsyncSRFunctionlityPriority: boolean = false;
  functionlityCombo =[];
  funtionlityPageNumber: number;
  locDepartmentId: number = 0;
  deptSearchvalueFlag: string = '';

  scrollsyncAssignee = false;
  assigneePersonPageNumber: number;
  assigneePersonCombo: any = [];

  scrollsyncMaintenanceStrategy = false;
  maintenanceStrategyPageNumber: number;
  maintenanceStrategyCombo:any = [];

  scrollsyncPMMaintenanceStrategy = false;
  pmMaintenanceStrategyPageNumber: number;
  pmMaintenanceStrategyCombo:any = [];

  scrollsyncPAMaintenanceStrategy = false;
  paMaintenanceStrategyPageNumber: number;
  paMaintenanceStrategyCombo:any = [];

  scrollsyncQAMaintenanceStrategy = false;
  qaMaintenanceStrategyPageNumber: number;
  qaMaintenanceStrategyCombo:any = [];

  constructor(private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private change: ChangeDetectorRef,
    private assetOptimaConstants: AssetOptimaConstants,
    private locationRef: Location,
    private router: Router,
    private titleService: Title,
    private userSessionService: UserSessionService,
    private changeDetectorRefs: ChangeDetectorRef,
    private translateService: TranslateService,
    private _dateTimeService: DateTimeService,
    private dialog: MatDialog) {
    this.assetGroupPageNumber = 1;
    this.modelComboPageNumber = 1;
    this.assetCategoryPageNumber = 1;
    this.assetTypePageNumber = 1;
    this.assetSubCategorPageNumber = 1;
    this.locationPageNumber = 1;
    this.departmentPageNumber = 1;
    this.subDepartmentPageNumber = 1;
    this.personInchargePageNumber = 1;
    this.serviceEngineer1PageNumber = 1;
    this.serviceEngineer2PageNumber = 1;
    this.serviceEngineer3PageNumber = 1;
    this.serviceEngineer4PageNumber = 1;
    this.asssetStatusPageNumber = 1;
    this.supplierPageNumber = 1;
    this.certificatePageNumber = 1;
    this.assignToPersonPageNumber = 1;
    this.assigneePageNumber = 1;
    this.priorityPageNumber = 1;
    this.blockNamePageNumber = 1;
    this.floorNamePageNumber = 1;
    this.segmentNamePageNumber = 1;
    this.roomNamePageNumber = 1;
    this.depreciationMethodPageNumber = 1;
    this.approvedSupplierPageNumber = 1;
    this.manufacturerListPageNumber = 1;
    this.customerListPageNumber = 1;
    this.customerLocationListPageNumber = 1;
    this.supplierListPageNumber = 1;
    this.scheduleHdrModel = new MaintenanceScheduleHdrModel();
    this.employeePageNumber = 1;

    this.getData = new getData();
    this.cusFieldHdr = new CusFieldHdr();
    this.assetCategoryModel = new AssetCategoryModel();
    this.itemPageNumber = 1;
    this.storePageNo = 1;
    this.currencyCdPageNumber = 1;
    this.ServiceProviderPageNumber = 1;
    this.approvedServiceProviderPageNumber = 1;
    this.assigneePersonPageNumber = 1;
    this.maintenanceStrategyPageNumber = 1;

    this.pmMaintenanceStrategyPageNumber = 1;
    this.paMaintenanceStrategyPageNumber = 1;
    this.qaMaintenanceStrategyPageNumber = 1;
  }

  ngOnInit() {
    //For Creating Contract Access
    this.modelAccessModule = this.userSessionService.getUserGroupAccess()['GROUPACCESS_CONTRACT'];
    this.modelAccessModuleSR = this.userSessionService.getUserGroupAccess()['GROUPACCESS_WORK_ORDER'];
    this.modelAccessModuleAssetStatus = this.userSessionService.getUserGroupAccess()['GROUPACCESS_ASSET_STATUS_CHANGE'];
    this.modelAccessModuleAssetCodeChange = this.userSessionService.getUserGroupAccess()['GROUPACCESS_ASSET_CODE_CHANGE'];

    this.cusFiledHdrTempList = [];

    this.titleService.setTitle(this.title);

    this.assetMainForm = new FormGroup({
      modelId: new FormControl(0),
      modelImage: new FormControl(''),
      assetGroupName: new FormControl(''),
      modelName: new FormControl(null),
      manufacturerName: new FormControl(),
      manufacturerId: new FormControl(),
      assetGroupId: new FormControl(0),
      assetCategoryId: new FormControl(),
      assetCategoryName: new FormControl(null, [Validators.required]),
      assetTypeId: new FormControl(0),
      assetTypeName: new FormControl(),
      subCategoryId: new FormControl(),
      subCategoryName: new FormControl(null),
      assetCode: new FormControl('', [Validators.required,Validators.maxLength(100)]),
      description: new FormControl('', [Validators.maxLength(200)]),
      serialNo: new FormControl('', [ Validators.maxLength(50)]),
      installationDtDisp: new FormControl(''),
      supplierType: new FormControl(''),
      businessPartnerName: new FormControl(''),
      businessPartnerId: new FormControl(0),
      purchaseOrderNo: new FormControl('', [Validators.maxLength(200)]),
      purchaseDtDisp: new FormControl(''),
      exchangeRt: new FormControl(0, [Validators.pattern(this.assetOptimaConstants.decimalValidation)]),
      originalPurchaseAmt: new FormControl(0, [this.assetOptimaConstants.customDecimalValidator(10,5),Validators.min(0),
        this.assetOptimaConstants.multpliePatternsValidator(this.assetOptimaConstants.decimalValidation1,{'numbersOnly':true})]),
      localPurchaseAmt: new FormControl(0, [this.assetOptimaConstants.customDecimalValidator(10,5),Validators.min(0),
        this.assetOptimaConstants.multpliePatternsValidator(this.assetOptimaConstants.decimalValidation1,{'numbersOnly':true})]),
      localTaxRate: new FormControl(0, [Validators.maxLength(5), Validators.pattern(this.assetOptimaConstants.percentageValidation)]),
      localTaxAmt: new FormControl(0, [this.assetOptimaConstants.customDecimalValidator(10,5),Validators.min(0),
        this.assetOptimaConstants.multpliePatternsValidator(this.assetOptimaConstants.decimalValidation1,{'numbersOnly':true})]),
      totalPurchaseAmt: new FormControl(0, [this.assetOptimaConstants.customDecimalValidator(10,5),Validators.min(0),
        this.assetOptimaConstants.multpliePatternsValidator(this.assetOptimaConstants.decimalValidation1,{'numbersOnly':true})]),
      locationCurrencyCode: new FormControl(''),
      purchaseCurrencyCode: new FormControl(''),
      ownershipType: new FormControl('OWN'),
      locationId: new FormControl(''),
      locationName: new FormControl(null, [Validators.required]),
      assetStatus: new FormControl(null),
      assetStatusId: new FormControl(0),
      departmentId: new FormControl(0),
      departmentName: new FormControl(''),
      departmentCode: new FormControl(''),
      personInCharge: new FormControl(''),
      employeeCode: new FormControl(''),
      personInChargeId: new FormControl(''),
      assetHdrId: new FormControl(''),
      orgId: new FormControl(''),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      functionalStatus: new FormControl('NON CRITICAL'),
      subDepartmentId: new FormControl(''),
      subDepartment: new FormControl(),
      depreciationMethod: new FormControl('WRITTEN DOWN'),
      bookedValue: new FormControl(0, [Validators.pattern(this.assetOptimaConstants.decimalValidation)]),
      noOfYears: new FormControl(0, [Validators.pattern(this.assetOptimaConstants.decimalValidation)]),
      scrapValue: new FormControl(0, [Validators.pattern(this.assetOptimaConstants.decimalValidation)]),
      installationType: new FormControl(),
      equipmentCode: new FormControl(''),
      assignToPersonId: new FormControl(0),
      maintainanceThreshold: new FormControl(''),
      rateOfDepreciation:new FormControl(0, [Validators.pattern(this.assetOptimaConstants.percentageValidation)]),

      doNo: new FormControl('', [Validators.maxLength(100)]),
      doDt: new FormControl(''),
      doDtDisp: new FormControl(''),

      //for schedule
      retiredDisposedBy: new FormControl(''),
      retiredDisposedDt: new FormControl(''),
      retiredDisposedDtDisp: new FormControl(''),

      srId: new FormControl(0),
      volumeLicensePresent: new FormControl(''),
      volumeLicenseList: new FormControl([]),
      assetAssigneeList: new FormControl([]),
      blockName: new FormControl(''),
      buildingSegmentId: new FormControl(0),
      buildingRoomId: new FormControl(0),
      buildingFloorId: new FormControl(0),
      buildingBlockId: new FormControl(0),
      floorName: new FormControl(''),
      segmentName: new FormControl(''),
      roomName: new FormControl(''),
      expectedLifeInYears: new FormControl(0),
      priorityId: new FormControl(0),
      priorityName: new FormControl(''),
      riskNature: new FormControl(''),
      depreciationMethodId: new FormControl(0),
      businessPartnerSiteName: new FormControl(''),
      businessPartnerSiteId: new FormControl(0),
      businessPartnerSiteContactNo: new FormControl(''),
      businessPartnerSiteAddress: new FormControl(''),
      businessPartnerSiteEmailId: new FormControl(''),
      handoverDtDisp: new FormControl(''),
      invoiceValue: new FormControl(0,[this.assetOptimaConstants.customDecimalValidator(10,5),Validators.min(0),
        this.assetOptimaConstants.multpliePatternsValidator(this.assetOptimaConstants.decimalValidation1,{'numbersOnly':true})]),
      expectedArrivalDt: new FormControl(''),
      expectedArrivalDtDisp: new FormControl(''),
      receivedDt: new FormControl(''),
      receivedDtDisp: new FormControl(''),
      deliveryRemarks: new FormControl('', [Validators.maxLength(500)]),
      receivedBy: new FormControl(''),
      expectedInstallationDt: new FormControl(''),
      expectedInstallationDtDisp: new FormControl(''),
      screenType: new FormControl(''),
      installationRemarks: new FormControl('', [Validators.maxLength(5000)]),
      preInwInventoryHdrId: new FormControl(0),
      preInwInventoryDtlId: new FormControl(0),
      ageOfTheYear: new FormControl(0),
      personInchargeNumber: new FormControl(''),
      personInChargeEmailId: new FormControl(''),

      insInternalEngineerName: new FormControl(''),
      insInternalEngineerId: new FormControl(0),
      installationProvidedBy: new FormControl(''),
      installationProvidedById: new FormControl(0),
      installationProvidedByName: new FormControl(''),
      insExternalEngineerName: new FormControl(''),
      insExternalEngineerContactNo: new FormControl('', [Validators.pattern(this.assetOptimaConstants.phoneNumberValidation)]),
      insExternalEngineerEmailId: new FormControl('', [Validators.pattern(this.assetOptimaConstants.emailValidation)]),
      installationDoneBy: new FormControl(''),
      approvalStatusAsset: new FormControl(''),
      locationType: new FormControl(''),
      customerId: new FormControl(0),
      customerName: new FormControl(''),
      customerSiteId: new FormControl(0),
      customerSiteName: new FormControl(''),
      custContactPerson: new FormControl(''),
      custPhoneNumber: new FormControl(''),
      custAddress1: new FormControl(''),
      custAddress2: new FormControl(''),
      custCity: new FormControl(''),
      custState: new FormControl(''),
      custCountry: new FormControl(''),
      custZipCode: new FormControl(''),
      supplierList: new FormControl([]),
      handoverStatusDisplay: new FormControl(''),
      inclusiveTax: new FormControl('false'),
      accessoriesConsumablesTOList: new FormControl([]),
      storeName: new FormControl(''),
      storeId: new FormControl(0),
      ageCriteria: new FormControl(allAssetAgeCriteriaStatus.PURCHASE_DATE),
      volumeLicenseQty: new FormControl(0),
      usedVolumeLicenseQty: new FormControl(0),
      remainingVolumeLicenseQty: new FormControl(0),
      trackIndividualLicense: new FormControl(0),
      assetGroupCode: new FormControl(''),
      assetCategoryCode: new FormControl(''),
      subDepartmentCode: new FormControl(''),
      regionCode: new FormControl(''),
      legalEntityCode: new FormControl(''),
      assetSubCategoryCode: new FormControl(''),
      orgCode: new FormControl(''),
      locationCode: new FormControl(''),
      statusType: new FormControl(null),
      assetCondition: new FormControl(null),
      statusTypeId: new FormControl(0),
      assetConditionId: new FormControl(0),
      processStatusId: new FormControl(0),
      processStatus: new FormControl(null),
      processName: new FormControl(null),
      processId: new FormControl(0),
      contractForInvDt: new FormControl(false),
      scrapValuePer: new FormControl(0.0,[Validators.pattern(this.assetOptimaConstants.percentageValidation)]),
      maintainanceThresholdPer: new FormControl(0),
      transactionSrc: new FormControl(''),
      avilableToProcess:new FormControl(true),
      handoverCompletedStatus: new FormControl('false'),
      remarks: new FormControl(''),
      capexNumber: new FormControl('', [Validators.maxLength(500)]),
      commonAssetName: new FormControl(''),
      preInwardNumber: new FormControl(''),
      farNumber: new FormControl(''),
      serviceProviderId: new FormControl(0),
      serviceProviderSiteId: new FormControl(0),
      serviceProviderSiteName: new FormControl(''),
      serviceProviderName: new FormControl(''),
      purchaseStatus: new FormControl(''),
      maintenanceStrategy: new FormControl(''),
      pmMaintenanceStrategy: new FormControl(''),
      paMaintenanceStrategy: new FormControl(''),
      qaMaintenanceStrategy: new FormControl(''),
      amcPercent : new FormControl('0'),
      cmcPercent : new FormControl('0'),
      amcValue : new FormControl('0'),
      cmcValue : new FormControl('0'),
      amcEscalationPercent : new FormControl('0'),
      cmcEscalationPercent : new FormControl('0'),
      amcEscalationValue : new FormControl('0'),
      cmcEscalationValue : new FormControl('0'),
      changeAssetCodeReqFlag: new FormControl(false)
    });


    this.assetMainForm.controls.volumeLicenseQty.disable();
    this.assetMainForm.controls.usedVolumeLicenseQty.disable();
    this.assetMainForm.controls.remainingVolumeLicenseQty.disable();
    this.assetMainForm.controls.expectedArrivalDtDisp.disable();
    this.assetMainForm.controls.preInwardNumber.disable();
    this.assetMainForm.controls.commonAssetName.disable();

    this.assetCertificateFormGroup = new FormGroup({
      assetCertificateId: new FormControl(0),
      orgId: new FormControl(0),
      assetHdrId: new FormControl(0),
      certificateId: new FormControl(0),
      startDt: new FormControl(''),
      startDtDisp: new FormControl(''),
      issueDt: new FormControl(''),
      issueDtDisp: new FormControl(''),
      expiryDt: new FormControl(''),
      expiryDtDisp: new FormControl(''),
      fileCertificateNo: new FormControl(''),
      documentNo: new FormControl(''),
      fileDocumentPath: new FormControl(''),
      certificateName: new FormControl(''),
      certificationAuthorityName: new FormControl(''),
      issuingAuthority: new FormControl('')
    });

    this.volumeLicenseForm = new FormGroup({
      volumeLicenseId: new FormControl(0),
      productKey: new FormControl('', [Validators.maxLength(100)]),
      status: new FormControl('IN STOCK'),
      assetHdrId: new FormControl(0),
      assignedAssetId: new FormControl(0),
      assignedTo: new FormControl(''),
    });

    this.volumeLicenseInsertForm = new FormGroup({
      productKey: new FormControl('', [Validators.required]),
      licenseQty: new FormControl('', [Validators.required]),
      productPrefix: new FormControl('', [Validators.required])
    });

    this.assetAssigneeForm = new FormGroup({
      assetAssigneeId: new FormControl(0),
      assignedToEmpId: new FormControl(0),
      assetId: new FormControl(0),
      assigneeTypeId: new FormControl(0),
      startDt: new FormControl('', [Validators.required]),
      endDt: new FormControl('',[Validators.required]),
      defaultPersonIncharge: new FormControl(false),
      assigneeTypeName: new FormControl('', [Validators.required]),
      startDtDisp: new FormControl(''),
      endDtDisp: new FormControl(''),
      assignedPersonContactNumber: new FormControl(''),
      assignedPersonEmail: new FormControl(''),
      assignToEmpName: new FormControl('', [Validators.required]),
      departmentName: new FormControl('', [Validators.required]),
      departmentId: new FormControl(0),
      assignedVolumeLicenseQty: new FormControl(0),
      primaryTechnician: new FormControl(false),
      secondaryTechnician: new FormControl(false),
      pmPaTechnician: new FormControl(false),
      qaTechnician: new FormControl(false)
    })

    this.assetAssigneeForm.controls.assignToEmpName.disable();
    //this.assetMainForm.controls.personInCharge.disable();
    //this.assetMainForm.controls.employeeCode.disable();
    //this.assetMainForm.controls.personInchargeNumber.disable();
    //this.assetMainForm.controls.personInChargeEmailId.disable();

    this.assetMainForm.controls.businessPartnerSiteAddress.disable();
    this.assetMainForm.controls.businessPartnerSiteEmailId.disable();
    this.assetMainForm.controls.businessPartnerSiteContactNo.disable();

    this.assetMainForm.controls.floorName.disable();
    this.assetMainForm.controls.segmentName.disable();

    if (this.assetMainForm.controls.departmentName.value != null) {
      this.assetAssigneeForm.controls.departmentName.setValue(this.assetMainForm.controls.departmentName.value);
      this.assetAssigneeForm.controls.departmentId.setValue(this.assetMainForm.controls.departmentId.value);
      this.assetAssigneeForm.controls.assignToEmpName.enable();
    }
    this.listOfAssetVolumeLicense.data = [];

    this.assetMainForm.controls['locationName'].setValue(this.userSessionService.getUserLocationName());
    this.assetMainForm.controls['locationId'].setValue(this.userSessionService.getUserLocationId());
    this.assetMainForm.controls['locationCurrencyCode'].setValue(this.userSessionService.getlocCurrCd());
    this.assetMainForm.controls['locationCode'].setValue(this.userSessionService.getUserLocationCode());
    this.assetMainForm.controls['orgCode'].setValue(this.userSessionService.getUserOrgCode());
    this.assetMainForm.controls['legalEntityCode'].setValue(this.userSessionService.getUserLegalEntityCode());
    this.assetMainForm.controls['regionCode'].setValue(this.userSessionService.getUserRegionCode());
    this.assetMainForm.controls['locationType'].setValue(this.assetOptimaConstants.locationType);

    //Read Only
    this.assetMainForm.controls['assetTypeName'].disable();
    this.assetMainForm.controls['manufacturerName'].disable();
    this.assetMainForm.controls['retiredDisposedDtDisp'].disable();
    this.assetMainForm.controls['retiredDisposedBy'].disable();
    this.assetMainForm.controls['locationCurrencyCode'].disable();
    this.assetMainForm.controls['totalPurchaseAmt'].disable();
    this.assetMainForm.controls['bookedValue'].disable();
    this.assetMainForm.controls.totalPurchaseAmt.disable();
    this.res = [];

    this.assetMainForm.controls.custAddress1.disable();
    this.assetMainForm.controls.custAddress2.disable();
    this.assetMainForm.controls.custCity.disable();
    this.assetMainForm.controls.custState.disable();
    this.assetMainForm.controls.custCountry.disable();
    this.assetMainForm.controls.custZipCode.disable();
    this.assetMainForm.controls.custPhoneNumber.disable();
    this.assetMainForm.controls.custContactPerson.disable();

    this.assetCategoryModel.direction = 'desc';
    this.assetCategoryModel.columnName = 'updatedDt';

    this.setHeadings();


    this.validateEditMode();

    this.option = this.getChartOptions();
    this.option2 = this.getChartOptions2();

    this.sourceScreen = 'asset';
    this.assetMainForm.controls.installationDoneBy.setValue('INTERNAL');
    this.assetMainForm.controls.supplierType.disable();

    this.buttonHeadingDisplay = "Add";
    localStorage.setItem('assetCode', '');
    localStorage.setItem('assetStatusId', '');
    // this.assetMainForm.controls['assetGroupName'].disable();
    // this.assetMainForm.controls['modelId'].disable();
  }

  updateMenuList(name){
    this.router.navigate(['home/asset/assetCreate/' + this.assetId + '/' + this.mode + '/' + name]);
  }

  selectedAssetAge(event){


    if(event == 1 && this.assetMainForm.controls.purchaseDtDisp.value){
       this.assetAge = this.commonService.calculateAge(this.assetMainForm.controls.purchaseDtDisp.value)
    }
    else if(event == 2 && this.assetMainForm.controls.receivedDtDisp.value){
      this.assetAge = this.commonService.calculateAge(this.assetMainForm.controls.receivedDtDisp.value)
    }
    else if(event == 3 && this.assetMainForm.controls.installationDtDisp.value){
      this.assetAge = this.commonService.calculateAge(this.assetMainForm.controls.installationDtDisp.value)
    }
    else{
      this.assetAge = "0"
    }

    this.assetMainForm.controls.ageCriteria.setValue(event);
    this.assetMainForm.controls.ageOfTheYear.setValue(this.assetAge);

  }

  ownership = [
    { id: 1, name: 'OWN' },
    { id: 2, name: 'OWNED BY CUSTOMER' },
    { id: 3, name: 'RENTAL' },
    { id: 4, name: 'LEASE' },
    { id: 5, name: 'LOAN' }
  ];

  riskNatureCombo = [
    { id: 1, name: 'HIGH' },
    { id: 2, name: 'LOW' }
  ];

  handoverStatusCombo = [
    { id: 1, name: 'YES' },
    { id: 2, name: 'NO' }
  ];

  changeMaintenanceStrategy(event) {
    if (event.name === 'OWN') {
      //this.assetMainForm.controls['maintenanceType'].setValue("");
      this.assetMainForm.controls['maintenanceType'].enable();
    } else if (event.name === 'LEASE' || event.name === 'RENTAL') {
      this.assetMainForm.controls['maintenanceType'].setValue(event.name);
      this.assetMainForm.controls['maintenanceType'].disable();
    }
  }

  warrantCoverageType = [
    { id: 1, name: 'PART AND LABOUR' },
    { id: 2, name: 'PART ONLY' },
    { id: 3, name: 'LABOUR ONLY' }
  ];

  // functionalStatus = [
  //   { id: 1, name: 'PATIENT CRITICAL' },
  //   { id: 2, name: 'MISSION CRITICAL' },
  //   { id: 3, name: 'REVENUE CRITICAL' },
  //   { id: 4, name: 'NON CRITICAL' }
  // ];

  criticalNature = [
    { id: 1, name: 'REVENUE CRITICAL' },
    { id: 2, name: 'REV & MI CRITICAL' },
    { id: 3, name: 'REV & PT CRITICAL' },
    { id: 4, name: 'PATIENT CRITICAL' },
    { id: 5, name: 'MISSION CRITICAL' },
    { id: 6, name: 'MI & PT CRITICAL' },
    { id: 7, name: 'R, M & P CRITICAL' }
  ];

  pmFrequency = [
    { id: 1, name: 'HALF ANNUALLY' },
    { id: 2, name: 'ANNUALLY' },
    { id: 3, name: 'QUARTERLY' },
    { id: 4, name: 'PAAR' },
    { id: 5, name: 'NA' }
  ];

  paFrequency = [
    { id: 1, name: 'HALF ANNUALLY' },
    { id: 2, name: 'ANNUALLY' },
    { id: 3, name: 'QUARTERLY' },
    { id: 4, name: 'PAAR' },
    { id: 5, name: 'NA' }
  ];

  qaFrequency = [
    { id: 1, name: 'HALF ANNUALLY' },
    { id: 2, name: 'ANNUALLY' },
    { id: 3, name: 'QUARTERLY' },
    { id: 4, name: 'PAAR' },
    { id: 5, name: 'NA' }
  ];

  pmMonth = [
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

  paMonth = [
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

  qaMonth = [
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


  dateValidationinstall(event) {
    return false;
  }

  setStep(index: number) {
    this.step = index;
  }

  listOfCategory(searchValue) {
    this.scrollsyncAssetCategory = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetCategoryCombo.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.assetCategoryPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assetCategoryPageNumber , this.assetCategoryName , data.responseData.comboList)
        this.assetCategoryPageNumber = this.getData.pageNumber;
        this.assetCategoryName = this.getData.dataList;
        this.scrollsyncAssetCategory = false;
      }
    );
  }

  getCategoryComboValue(event) {
    if (event === undefined) {
      this.assetMainForm.controls['assetCategoryId'].setValue(0);
      this.assetMainForm.controls['assetCategoryName'].setValue('');
      this.assetMainForm.controls['assetCategoryCode'].setValue('');
      this.assetMainForm.controls['subCategoryId'].setValue(0);
      this.assetMainForm.controls['subCategoryName'].setValue('');
      this.assetMainForm.controls['assetGroupName'].setValue("");
      this.assetMainForm.controls['assetGroupId'].setValue(0);
      this.assetCategoryPageNumber = 1;
      this.assetCategoryName = [];
      this.assetSubCategorPageNumber = 1;
      this.subCategoryName = [];
      this.assetGroup = [];
      this.assetGroupPageNumber = 1;
    } else {      
      this.assetMainForm.controls['assetCategoryId'].setValue(event.assetCategoryId);
      this.assetMainForm.controls['assetCategoryName'].setValue(event.assetCategoryName);
      this.assetMainForm.controls['assetCategoryCode'].setValue(event.assetCategoryCode);
      this.assetMainForm.controls['subCategoryId'].setValue(0);
      this.assetMainForm.controls['subCategoryName'].setValue('');
      this.assetMainForm.controls['assetGroupName'].setValue("");
      this.assetMainForm.controls['assetGroupId'].setValue(0);
      this.assetSubCategorPageNumber = 1;
      this.subCategoryName = [];
      this.assetGroup = [];
      this.assetGroupPageNumber = 1;      
    }
  }

  listOfSubCategory(searchValue) {
    this.scrollsyncAssetSubCategory = true;
    const assetCategoryId = this.assetMainForm.controls['assetCategoryId'].value;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetSubCategoryCombo.sams', searchValue.term,assetCategoryId,
      '', this.recordsPerPageForCombo, this.assetSubCategorPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetSubCategorPageNumber , this.subCategoryName , data.responseData.comboList)
          this.assetSubCategorPageNumber = this.getData.pageNumber;
          this.subCategoryName = this.getData.dataList;
          this.scrollsyncAssetSubCategory = false;
        }
      );
  }

  getSubCategoryComboValue(event) {
    if (event === undefined) {
      this.assetMainForm.controls['subCategoryId'].setValue(0);
      this.assetMainForm.controls['subCategoryName'].setValue('');
      this.assetMainForm.controls['assetSubCategoryCode'].setValue('');
      this.assetMainForm.controls['assetCategoryName'].setValue('');
      this.assetMainForm.controls['assetCategoryId'].setValue(0);
      this.assetMainForm.controls['assetCategoryName'].enable();
      this.assetMainForm.controls['assetGroupName'].setValue("");
      this.assetMainForm.controls['assetGroupId'].setValue(0);
      this.assetMainForm.controls['rateOfDepreciation'].setValue(0);
      this.assetMainForm.controls['depreciationMethod'].setValue(0);
      this.assetMainForm.controls['maintainanceThresholdPer'].setValue(0);
      this.assetMainForm.controls['expectedLifeInYears'].setValue(0);
      this.assetMainForm.controls['scrapValuePer'].setValue(0);
      this.assetMainForm.controls['maintainanceThreshold'].setValue(0);
      this.assetMainForm.controls['scrapValue'].setValue(0);
      this.assetSubCategorPageNumber = 1;
      this.subCategoryName = [];
      this.assetCategoryPageNumber = 1;
      this.assetCategoryName = [];
      this.assetGroup = [];
      this.assetGroupPageNumber = 1;
    } else {
      this.generateCEIDBasedonSubCategory(event.subCategoryName, this.assetMainForm.controls.locationId.value, this.userSessionService.getUserOrgId());
      this.assetMainForm.controls['subCategoryId'].setValue(event.subCategoryId);
      this.assetMainForm.controls['subCategoryName'].setValue(event.subCategoryName);
      this.assetMainForm.controls['assetSubCategoryCode'].setValue(event.assetSubCategoryCode);
      this.assetMainForm.controls['assetCategoryName'].setValue(event.categoryName);
      this.assetMainForm.controls['assetCategoryId'].setValue(event.categoryId);
      this.assetMainForm.controls['assetCategoryCode'].setValue(event.assetCategoryCode);
      this.assetMainForm.controls['assetCategoryName'].disable();
      this.assetMainForm.controls['assetGroupName'].enable();
      this.assetGroup = [];
      this.assetGroupPageNumber = 1;
      this.modelCombo = [];
      this.modelComboPageNumber = 1;
      this.assetMainForm.controls['rateOfDepreciation'].setValue(event.rateOfDepreciation);
      this.assetMainForm.controls['depreciationMethod'].setValue(event.depreciationMethodName);
      this.assetMainForm.controls['maintainanceThresholdPer'].setValue(event.maintainanceThresholdPer);
      this.assetMainForm.controls['expectedLifeInYears'].setValue(event.expectedLifeInYears);
      this.assetMainForm.controls['scrapValuePer'].setValue(event.scrapValuePer);
      if(this.assetMainForm.controls.localPurchaseAmt.value > 0){
        this.assetMainForm.controls['maintainanceThreshold'].setValue((this.assetMainForm.controls.localPurchaseAmt.value * event.maintainanceThresholdPer)/100);
        this.assetMainForm.controls['scrapValue'].setValue((this.assetMainForm.controls.localPurchaseAmt.value * event.scrapValuePer)/100);
      }
      if(this.assetMainForm.controls.depreciationMethod.value === 'STRAIGHT LINE') {
        this.isStraightLineMethod = true;
      } else if(this.assetMainForm.controls.depreciationMethod.value === 'WRITTEN DOWN'){
        this.isStraightLineMethod = false;
      }
      if (event.subCategoryId > 0) {
        this.getCustomFieldList(-1, event.subCategoryId, 'Add', '');
      }
      this.assetMainForm.controls['modelId'].enable();
    }

  }

  listOfAssetType(searchValue) {
    this.scrollsyncAssetType = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetTypeCombo.sams', searchValue.term, '', '', this.recordsPerPageForCombo,
      this.assetTypePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetTypePageNumber , this.assetTypeName , data.responseData.comboList)
          this.assetTypePageNumber = this.getData.pageNumber;
          this.assetTypeName = this.getData.dataList;
          this.scrollsyncAssetType = false;
        }
      );
  }

  getAssetTypeComboValue(event) {
    if (event === undefined) {
      this.assetMainForm.controls['assetTypeId'].setValue(0);
      this.assetMainForm.controls['assetTypeName'].setValue('');
      this.assetTypePageNumber = 1;
      this.assetTypeName = [];
    } else {
      this.assetMainForm.get('assetTypeId').setValue(event.assetTypeId);
      this.assetMainForm.get('assetTypeName').setValue(event.assetTypeName);
    }
  }

  listOfAllAssetGroup(searchKey) {
    this.scrollsyncAssetGroup = true;
    const subCategoryId =this.assetMainForm.controls['subCategoryId'].value;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllAssetGroupCombo, searchKey.term,subCategoryId, '',
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
      this.assetMainForm.controls['assetGroupName'].setValue(event.assetGroupName);
      this.assetMainForm.controls['assetGroupId'].setValue(event.assetGroupId);
      this.assetMainForm.controls['assetGroupCode'].setValue(event.assetGroupCode);
      this.assetMainForm.controls['assetTypeName'].setValue(event.assetTypeName);
      this.assetMainForm.controls['assetTypeId'].setValue(event.assetTypeId);
      this.getCustomFieldList(event.assetGroupId, event.subCategoryId, 'Add', 'GROUP');
      this.assetMainForm.controls['assetCategoryName'].disable();
      this.assetMainForm.controls['subCategoryName'].disable();
      this.assetMainForm.controls['modelId'].enable();
      this.modelCombo = [];
      this.modelComboPageNumber = 1;
    } else {
      this.assetMainForm.controls['assetGroupName'].setValue("");
      this.assetMainForm.controls['assetGroupId'].setValue(0);
      this.assetMainForm.controls['assetGroupCode'].setValue('');
      this.assetMainForm.controls['assetTypeName'].setValue("");
      this.assetMainForm.controls['assetTypeId'].setValue(0);
      this.assetMainForm.controls['assetCategoryName'].enable();
      this.assetMainForm.controls['subCategoryName'].enable();
      this.assetGroup = [];
      this.assetGroupPageNumber = 1;
      this.modelCombo = [];
      this.modelComboPageNumber = 1;
    }
  }

  listOfAllModel(searchKey) {
    this.scrollsyncModel = true;

    const subCategoryId = this.assetMainForm.controls.subCategoryId.value > 0 ? this.assetMainForm.controls.subCategoryId.value : '';
    const groupId = this.assetMainForm.controls.assetGroupId.value > 0 ? this.assetMainForm.controls.assetGroupId.value : '' ;
    this.res = [];
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults('listOfAllModelCombo.sams', searchKey.term, '', groupId,
      this.recordsPerPageForCombo, this.modelComboPageNumber,subCategoryId,'Y').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchKey, this.modelComboPageNumber , this.modelCombo , data.responseData.comboList)
          this.modelComboPageNumber = this.getData.pageNumber;
          this.modelCombo = this.getData.dataList;
          this.scrollsyncModel = false;
        });
    this.scrollsyncModel = false;
  }

  getModelComboValue(event) {
    if (event != null) {
      this.assetMainForm.controls['modelId'].setValue(event.modelId);
      this.assetMainForm.controls['manufacturerId'].setValue(event.businessPartnerId);
      this.assetMainForm.controls['manufacturerName'].setValue(event.businessPartnerName);
      this.assetMainForm.controls['installationType'].setValue(event.installationType);
      this.assetMainForm.controls['volumeLicensePresent'].setValue(event.volumeLicensePresent);
      this.isVolumeLicensePresent = event.volumeLicensePresent;
      this.assetMainForm.controls.volumeLicenseQty.setValue(1);
      if(this.isVolumeLicensePresent){
        this.assetMainForm.controls.volumeLicenseQty.enable();
        //this.assetMainForm.controls.volumeLicenseQty.setValidators([Validators.required,Validators.min(1)]);
      }else{
        this.assetMainForm.controls.volumeLicenseQty.disable();
        this.assetMainForm.controls.volumeLicenseQty.setValidators([]);
      }
      if(this.assetMainForm.controls.modelName.value !== this.assetOptimaConstants.notApplicable){
        if(event.assetGroupId>0){	
          this.assetMainForm.controls['assetGroupId'].setValue(event.assetGroupId);	
          this.assetMainForm.controls['assetGroupName'].setValue(event.assetGroupName);	
          this.assetMainForm.controls['assetGroupCode'].setValue(event.assetGroupCode);	
          this.assetMainForm.controls['assetTypeName'].setValue(event.assetTypeName);	
        }	
        else{	
          this.assetMainForm.controls['assetGroupId'].setValue(0);	
          this.assetMainForm.controls['assetGroupName'].setValue('');	
          this.assetMainForm.controls['assetGroupCode'].setValue('');	
          this.assetMainForm.controls['assetTypeName'].setValue('');	
        }
        this.assetMainForm.controls['assetCategoryId'].setValue(event.assetCategoryId);
        this.assetMainForm.controls['assetCategoryName'].setValue(event.assetCategoryName);
        this.assetMainForm.controls['assetCategoryCode'].setValue(event.assetCategoryCode);
        this.assetMainForm.controls['subCategoryId'].setValue(event.subCategoryId);
        this.assetMainForm.controls['subCategoryName'].setValue(event.subCategoryName);
        this.assetMainForm.controls['assetSubCategoryCode'].setValue(event.assetSubCategoryCode);
        this.assetMainForm.controls['assetGroupName'].disable();
        this.assetMainForm.controls['assetCategoryName'].disable();
        this.assetMainForm.controls['subCategoryName'].disable();
        this.getCustomFieldList(event.modelId, event.subCategoryId, 'Add', 'MODEL');
        this.generateCEIDBasedonSubCategory(event.subCategoryName, this.assetMainForm.controls.locationId.value, this.userSessionService.getUserOrgId());
        this.assetMainForm.controls['rateOfDepreciation'].setValue(event.rateOfDepreciation);
        this.assetMainForm.controls['depreciationMethod'].setValue(event.depreciationMethodName);
        this.assetMainForm.controls['maintainanceThresholdPer'].setValue(event.maintainanceThresholdPer);
        this.assetMainForm.controls['expectedLifeInYears'].setValue(event.expectedLifeInYears);
        this.assetMainForm.controls['scrapValuePer'].setValue(event.scrapValuePer);
        if(this.assetMainForm.controls.localPurchaseAmt.value > 0){
          this.assetMainForm.controls['maintainanceThreshold'].setValue((this.assetMainForm.controls.localPurchaseAmt.value * event.maintainanceThresholdPer)/100);
          this.assetMainForm.controls['scrapValue'].setValue((this.assetMainForm.controls.localPurchaseAmt.value * event.scrapValuePer)/100);
        }
        if(this.assetMainForm.controls.depreciationMethod.value === 'STRAIGHT LINE') {
          this.isStraightLineMethod = true;
        } else if(this.assetMainForm.controls.depreciationMethod.value === 'WRITTEN DOWN'){
          this.isStraightLineMethod = false;
        }
      }
    } else {
      this.assetMainForm.controls['modelId'].setValue(0);
      this.assetMainForm.controls['manufacturerId'].setValue(0);
      this.assetMainForm.controls['manufacturerName'].setValue('');
      this.assetMainForm.controls['installationType'].setValue("");
      this.assetMainForm.controls['assetGroupName'].enable();
      this.assetMainForm.controls['assetCategoryName'].enable();
      this.assetMainForm.controls['subCategoryName'].enable();
      this.assetMainForm.controls['rateOfDepreciation'].setValue(0);
      this.assetMainForm.controls['depreciationMethod'].setValue(0);
      this.assetMainForm.controls['maintainanceThresholdPer'].setValue(0);
      this.assetMainForm.controls['expectedLifeInYears'].setValue(0);
      this.assetMainForm.controls['scrapValuePer'].setValue(0);
      this.assetMainForm.controls['maintainanceThreshold'].setValue(0);
      this.assetMainForm.controls['scrapValue'].setValue(0);
      this.modelCombo = [];
      this.modelComboPageNumber = 1;
      this.selectedSupplierList(undefined);
      this.isVolumeLicensePresent = false;
    }
  }

  loadLocationComboData(searchValue) {
    this.scrollsyncLocation = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllUserLocForCombo, searchValue.term, '', '',
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
      this.assetMainForm.controls['locationId'].setValue(0);
      this.assetMainForm.controls['locationName'].setValue('');
      this.assetMainForm.controls['locationType'].setValue('');
      this.locationPageNumber = 1;
      this.locationCombo = [];
    } else {
      this.assetMainForm.controls['locationName'].setValue(event.locationName);
      this.assetMainForm.controls['locationId'].setValue(event.locationId);
      this.assetMainForm.controls['locationType'].setValue(event.locationType);
      //IF LOCATION TYPE IS NOT SERVICE PROVIDER THEN NEED TO RESET ALL THE VALUE
      if (event.locationType != 'Service Provider') {
        this.assetMainForm.controls.customerId.setValue(0);
        this.assetMainForm.controls.customerName.setValue('');
        this.assetMainForm.controls.customerSiteId.setValue('');
        this.assetMainForm.controls.customerSiteName.setValue('');
        this.assetMainForm.controls.custContactPerson.setValue('');
        this.assetMainForm.controls.custPhoneNumber.setValue('');
        this.assetMainForm.controls.custAddress1.setValue('');
        this.assetMainForm.controls.custAddress2.setValue('');
        this.assetMainForm.controls.custCity.setValue('');
        this.assetMainForm.controls.custState.setValue('');
        this.assetMainForm.controls.custCountry.setValue('');
        this.assetMainForm.controls.custZipCode.setValue('');
      }
      this.generateCEIDBasedonSubCategory(this.assetMainForm.controls.subCategoryName.value, this.assetMainForm.controls.locationId.value, this.userSessionService.getUserOrgId());
      this.departmentCombo = [];
      this.departmentPageNumber = 1;
      this.subDepartmentCombo = [];
      this.subDepartmentPageNumber = 1;
      this.personInchargeCombo = [];
      this.personInchargePageNumber = 1;
    }

  }


  loadDepartmentComboData(searchValue) {
    this.scrollsyncDepartment = true;
    if(searchValue.term){
      this.deptSearchvalueFlag = 'deptSearched';
    }  
    const locId = this.assetMainForm.controls.locationId.value;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfDepartmentInBranchCombo.sams', searchValue.term, locId, '',
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
      this.assetMainForm.controls['departmentId'].setValue(0);
      this.assetMainForm.controls['departmentName'].setValue('');
      this.assetMainForm.controls['subDepartmentId'].setValue(0);
      this.assetMainForm.controls['subDepartment'].setValue('');
      this.assetMainForm.controls['buildingBlockId'].setValue(0);
      this.assetMainForm.controls['blockName'].setValue('');
      this.assetMainForm.controls['buildingFloorId'].setValue(0);
      this.assetMainForm.controls['floorName'].setValue('');
      this.assetMainForm.controls['buildingRoomId'].setValue(0);
      this.assetMainForm.controls['roomName'].setValue('');
      this.assetMainForm.controls['buildingSegmentId'].setValue(0);
      this.assetMainForm.controls['segmentName'].setValue('');
      this.assetMainForm.controls['personInCharge'].setValue(null);
      this.assetMainForm.controls['employeeCode'].setValue(null);
      this.assetMainForm.controls['personInchargeNumber'].setValue(null);
      this.assetMainForm.controls['personInChargeEmailId'].setValue(null);
      this.departmentPageNumber = 1;
      this.departmentCombo = [];
      this.subDepartmentPageNumber = 1;
      this.subDepartmentCombo = [];
      this.locDepartmentId = 0;
    } else {
      this.assetMainForm.controls['departmentId'].setValue(event.departmentId);
      this.assetMainForm.controls['departmentName'].setValue(event.departmentName);
      this.assetMainForm.controls['departmentCode'].setValue(event.departmentCode);
      this.assetMainForm.controls['subDepartmentId'].setValue(0);
      this.assetMainForm.controls['subDepartment'].setValue('');
      this.assetMainForm.controls['buildingBlockId'].setValue(event.buildingBlockId);
      this.assetMainForm.controls['blockName'].setValue(event.blockName);
      this.assetMainForm.controls['buildingFloorId'].setValue(event.buildingFloorId);
      this.assetMainForm.controls['floorName'].setValue(event.floorName);
      this.assetMainForm.controls['buildingRoomId'].setValue(event.buildingRoomId);
      this.assetMainForm.controls['roomName'].setValue(event.roomName);
      this.assetMainForm.controls['buildingSegmentId'].setValue(event.buildingSegmentId);
      this.assetMainForm.controls['segmentName'].setValue(event.segmentName);
      this.assetMainForm.controls['personInCharge'].setValue(event.inchargeName);
      this.assetMainForm.controls['employeeCode'].setValue(event.employeeCode);
      this.assetMainForm.controls['personInchargeNumber'].setValue(event.inchargeContactNo);
      this.assetMainForm.controls['personInChargeEmailId'].setValue(event.inchargeEmailId);
      this.locDepartmentId = event.locDepartmentId;
      this.assetAssigneeForm.controls.assignToEmpName.enable();
      this.subDepartmentPageNumber = 1;
      this.subDepartmentCombo = [];
    }
  }

  loadSubDepartmentComboData(searchValue) {
    this.scrollsyncSubDepartment = true;
    const locId = this.assetMainForm.controls.locationId.value;
    const departmentId = this.assetMainForm.controls.departmentId.value;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfSubDepartmentInBranchCombo.sams', searchValue.term, locId, this.locDepartmentId > 0 ? this.locDepartmentId : 0,
      this.recordsPerPageForCombo, this.subDepartmentPageNumber,departmentId, this.deptSearchvalueFlag).subscribe(
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
      this.assetMainForm.controls['subDepartmentId'].setValue(0);
      this.assetMainForm.controls['subDepartment'].setValue('');
      this.assetMainForm.controls['departmentId'].setValue(0);
      this.assetMainForm.controls['departmentName'].setValue('');
      this.assetMainForm.controls['buildingBlockId'].setValue(0);
      this.assetMainForm.controls['blockName'].setValue('');
      this.assetMainForm.controls['buildingFloorId'].setValue(0);
      this.assetMainForm.controls['floorName'].setValue('');
      this.assetMainForm.controls['buildingRoomId'].setValue(0);
      this.assetMainForm.controls['roomName'].setValue('');
      this.assetMainForm.controls['buildingSegmentId'].setValue(0);
      this.assetMainForm.controls['segmentName'].setValue('');
      this.assetMainForm.controls['departmentId'].setValue(0);
      this.assetMainForm.controls['departmentName'].setValue('');
      this.subDepartmentPageNumber = 1;
      this.subDepartmentCombo = [];
    } else {
      this.assetMainForm.controls['subDepartmentId'].setValue(event.subDepartmentId);
      this.assetMainForm.controls['subDepartment'].setValue(event.subDepartmentName);
      this.assetMainForm.controls['subDepartmentCode'].setValue(event.subDepartmentCode);
      this.assetMainForm.controls['buildingBlockId'].setValue(event.buildingBlockId);
      this.assetMainForm.controls['blockName'].setValue(event.blockName);
      this.assetMainForm.controls['buildingFloorId'].setValue(event.buildingFloorId);
      this.assetMainForm.controls['floorName'].setValue(event.floorName);
      this.assetMainForm.controls['buildingRoomId'].setValue(event.buildingRoomId);
      this.assetMainForm.controls['roomName'].setValue(event.roomName);
      this.assetMainForm.controls['buildingSegmentId'].setValue(event.buildingSegmentId);
      this.assetMainForm.controls['segmentName'].setValue(event.segmentName);
      this.assetMainForm.controls['departmentId'].setValue(event.departmentId);
      this.assetMainForm.controls['departmentName'].setValue(event.departmentName);
    }
  }

  loadPersonInchargeComboData(searchValue) {
    var OnlyServiceIncharge = true;
    this.scrollsyncPersonIncharge = true;
    // const departmentId = this.assetMainForm.controls.departmentId.value;
    const locId = this.assetMainForm.controls.locationId.value;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllEmployeeComboByLocId.sams', searchValue.term, '', locId,this.recordsPerPageForCombo, this.personInchargePageNumber, OnlyServiceIncharge,'').subscribe(
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
      this.assetMainForm.controls['personInChargeId'].setValue(0);
      this.assetMainForm.controls['personInCharge'].setValue('');
      this.personInchargePageNumber = 1;
      this.personInchargeCombo = [];
    } else {
      this.assetMainForm.controls['personInChargeId'].setValue(event.employeeId);
      this.assetMainForm.controls['personInCharge'].setValue(event.employeeFirstName);
    }
  }

  loadSupplierComboData(searchValue) {
    this.scrollsyncSupplier = true;
    let manufacturerId = this.assetMainForm.controls.manufacturerId.value;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.SUPPLIER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchValue.term, '', manufacturerId,
      this.recordsPerPageForCombo, this.supplierPageNumber, '', partnerRoles).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.supplierPageNumber , this.supplierCombo , data.responseData.comboList)
          this.supplierPageNumber = this.getData.pageNumber;
          this.supplierCombo = this.getData.dataList;
          this.scrollsyncSupplier = false;
        }
      );
  }

  selectedSupplierList(event) {

    this.assetMainForm.controls.businessPartnerId.setValue('');
    this.assetMainForm.controls.businessPartnerName.setValue('');
    //SET OTHER INFO
    this.assetMainForm.controls.businessPartnerSiteAddress.setValue('');
    this.assetMainForm.controls.businessPartnerSiteEmailId.setValue('');
    this.assetMainForm.controls.businessPartnerSiteContactNo.setValue('');
    this.assetMainForm.controls.businessPartnerSiteName.setValue('')
    this.assetMainForm.controls.businessPartnerSiteId.setValue('0')

    if (event === undefined) {
      this.assetMainForm.controls['businessPartnerId'].setValue(0);
      this.assetMainForm.controls['businessPartnerName'].setValue('');
      this.assetMainForm.controls['supplierType'].setValue('');
      this.supplierPageNumber = 1;
      this.supplierCombo = [];
      this.supplierLocationList = [];
      this.approvedSupplierPageNumber = 1;
    } else {
      this.assetMainForm.controls['businessPartnerId'].setValue(event.businessPartnerId);
      this.assetMainForm.controls['businessPartnerName'].setValue(event.businessPartnerName);
      //this.assetMainForm.controls['supplierType'].setValue(event.supplierType);
      this.supplierLocationList = [];
      this.approvedSupplierPageNumber = 1;
    }

    this.formValidationForPurchaseInfo();
  }


  listOfCurrencyCd(searchValue) {
    this.currencyScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '5' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfCurCdCombo, searchValue.term, '', '', this.limitCount, this.currencyCdPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.currencyCdPageNumber , this.currencycdList , data.responseData.comboList)
        this.currencyCdPageNumber = this.getData.pageNumber;
        this.currencycdList = this.getData.dataList;
        this.currencyScrollsync = false;
      }
    );
    this.formValidationForPurchaseInfo();
  }

  checkLocAndPurCd(event) {
    this.assetMainForm.controls['exchangeRt'].setValue(0);
    if (event !== undefined) {
      if (event.curCd === this.assetMainForm.controls['locationCurrencyCode'].value) {
        this.assetMainForm.controls['exchangeRt'].setValue(1);
        this.assetMainForm.controls['exchangeRt'].disable();
      } else {
        this.assetMainForm.controls['exchangeRt'].enable();
        this.assetMainForm.controls['exchangeRt'].setValue(0);
      }
    } else {
      this.assetMainForm.controls['exchangeRt'].enable();
      this.assetMainForm.controls['exchangeRt'].setValue(0);
      this.currencyCdPageNumber = 1;
      this.currencycdList = [];
    }
    this.formValidationForPurchaseInfo();
  }


  //ALREADY EXIST FOR ASSET CODE
  checkForAssetSerialNoExistence() {
    if (((this.tempValueSerialNo != null || this.tempValueSerialNo != '') ? this.tempValueSerialNo.toLowerCase() : '')
      === ((this.assetMainForm.controls.serialNo.value != null) ? this.assetMainForm.controls.serialNo.value.toLowerCase() : '')) {

    }
    else {
      this.commonService.commonGetService('validateAssetSerialNoUnique.sams', this.assetMainForm.controls.serialNo.value,
        this.userSessionService.getUserOrgId()).subscribe(
          data => {
            if (data.success) {
              this.ErrorMsgSerialNo = data.message;
              this.assetMainForm.controls.serialNo.setErrors(Validators.maxLength);
              this.assetMainForm.controls.serialNo.setErrors({ "notUnique": true });
            } else {
              this.ErrorMsgSerialNo = '';
              this.assetMainForm.controls.serialNo.setErrors(null);
            }
          });
    }
  }

  uniqueValidation() {
    if (((this.tempValue != null || this.tempValue != '') ? this.tempValue.toLowerCase() : '')
      === ((this.assetMainForm.controls.assetCode.value != null) ? this.assetMainForm.controls.assetCode.value.toLowerCase() : '')) {

    } else {
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.asset.AssetHdrTO";
      constraintData.constraints = {
        'assetCode': this.assetMainForm.controls.assetCode.value.trim(),
        'orgId': this.userSessionService.getUserOrgId()
      };

      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if (!data.success) {
            this.ErrorMsg = data.message;
            this.assetMainForm.controls.assetCode.setErrors(Validators.maxLength);
            this.assetMainForm.controls.assetCode.setErrors({ "notUnique": true });
          } else {
            this.ErrorMsg = '';
            this.assetMainForm.controls.assetCode.setErrors(null);
          }
        }
      );
    }
  }

  addAsset() {
    this.assetDataSource.push(this.assetMainForm.getRawValue());
    this.change.detectChanges();
  }

  checkInwardMandatory = false;
  save() {
    this.checkInwardMandatory = this.checkMandatoryForPreInwardValue();
    if (this.checkInwardMandatory) {
        if (this.screen == 'Inward Inventory SR') {
          this.assetMainForm.controls.screenType.setValue('Inward Inventory SR');
        }
        this.formatDateFields();

        let validLicense = this.totalLicenseQtyToUser();

       if(!this.isVolumeLicensePresent){
          this.assetMainForm.controls.usedVolumeLicenseQty.setValue(1);
        }
        this.assetMainForm.controls['assetAssigneeList'].setValue(this.assetAssigneeDataSource);
        this.assetMainForm.controls.volumeLicenseList.setValue(this.listOfAssetVolumeLicense.data);
        this.assetMainForm.controls.accessoriesConsumablesTOList.setValue(this.modelItemListDataSource);
        this.assetMainForm.controls.trackIndividualLicense.setValue(this.trackIndividualLicense);

        if(this.isVolumeLicensePresent && this.trackIndividualLicense){
          this.unAssignedLicenseQty();
        }
        
        if (this.assetMainForm.controls.handoverStatusDisplay.value === 'YES') {
          this.assetMainForm.controls.handoverCompletedStatus.setValue(true);
        }

        if(validLicense.saveFlag){
            this.content ="";
            if(this.assetMainForm.controls.ageCriteria.value === allAssetAgeCriteriaStatus.PURCHASE_DATE && this.assetMainForm.controls.purchaseDtDisp.value === ''){
              this.content=`"Purchase Date" Is Missing. Do You Want To Continue? Used for Deprication Calculation`;
            }else if(this.assetMainForm.controls.ageCriteria.value === allAssetAgeCriteriaStatus.INSTALLATION_DATE && this.assetMainForm.controls.installationDtDisp.value === ''){
              this.content=`"Installation Date" Is Missing. Do You Want To Continue?`;
            }else if(this.assetMainForm.controls.ageCriteria.value === allAssetAgeCriteriaStatus.RECEIVED_DATE && this.assetMainForm.controls.receivedDtDisp.value === ''){
              this.content=`"Received Date" Is Missing. Do You Want To Continue?`;
            }

          if(this.content === ""){
            this.saveOrUpdate();
          }else{
            this.conformationBox(this.content);
          }
      }
    }

  }

  totalLicenseQtyToUser(){
    let totalAssignedLicenseQty = 0;

    let saveFlag = true;

    if(this.assetMainForm.controls.volumeLicensePresent.value && !this.trackIndividualLicense){
      this.assetAssigneeDataSource.forEach((element: any,i: any) => {
        totalAssignedLicenseQty = element.assignedVolumeLicenseQty + totalAssignedLicenseQty ;

       if(element.assignedVolumeLicenseQty < 0 && saveFlag){
          this.commonService.openToastWarningMessage("License Qty should not less then 0");
          saveFlag = false;
        }
      });

      let assignedAssetLicenseQty = this.listOfAssetVolumeLicense.data.filter(obj=> (obj?.assignedAssetModel));
      totalAssignedLicenseQty = totalAssignedLicenseQty + assignedAssetLicenseQty.length;

      if(totalAssignedLicenseQty > this.assetMainForm.controls.volumeLicenseQty.value && saveFlag){
        saveFlag = false;
        this.commonService.openToastWarningMessage('Total "License Assigned Quantity" should not exceed "Total License Quantity".')
       }

    }
    else if(this.assetMainForm.controls.volumeLicensePresent.value && this.trackIndividualLicense) {
      let listOfAssetVolumeLicense = this.listOfAssetVolumeLicense.data;
      let assignedAssetLicenseQty = [];

      this.assetAssigneeDataSource.forEach((element: any,i: any) => {
        assignedAssetLicenseQty = listOfAssetVolumeLicense.filter(obj=> (obj?.assignedEmployeeId == element?.assignedToEmpId));
        if(element.assignedVolumeLicenseQty < 0 && saveFlag){
          this.commonService.openToastWarningMessage("License Qty should not less then 0");
          saveFlag = false;
        }
        else if(element.assignedVolumeLicenseQty > assignedAssetLicenseQty.length && saveFlag){
          this.commonService.openToastWarningMessage('"Product Quantity" should not exceed "License assigned Quantity".');
          saveFlag = false;
        }
      })
    }

    return {totalAssignedLicenseQty,saveFlag}

  }

  formatDateFields() {
    this.assetMainForm.controls['installationDtDisp'].setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.assetMainForm.get('installationDtDisp').value));
    this.assetMainForm.controls['purchaseDtDisp'].setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.assetMainForm.get('purchaseDtDisp').value));
    this.assetMainForm.controls['doDtDisp'].setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.assetMainForm.get('doDtDisp').value));
    this.assetMainForm.controls['receivedDtDisp'].setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.assetMainForm.get('receivedDtDisp').value))
    this.assetMainForm.controls['expectedInstallationDtDisp'].setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.assetMainForm.get('expectedInstallationDtDisp').value))
  }

  checkMandatoryForPreInwardValue() {

    if (this.assetMainForm.controls.assetStatusId.value === allPreInwardStatus.AWAITING_FOR_ARRIVAL) {
      if ((this.assetMainForm.controls.receivedBy.value !== '' && this.assetMainForm.controls.receivedBy.value !== null && this.assetMainForm.controls.receivedBy.value !== undefined) &&
        (this.assetMainForm.controls.receivedDtDisp.value !== '' && this.assetMainForm.controls.receivedDtDisp.value !== null && this.assetMainForm.controls.receivedDtDisp.value !== undefined) &&
        (this.assetMainForm.controls.expectedInstallationDtDisp.value !== '' && this.assetMainForm.controls.expectedInstallationDtDisp.value !== null &&
        this.assetMainForm.controls.expectedInstallationDtDisp.value !== undefined)
        && (this.assetMainForm.controls.storeId.value !== 0)
      ) {

        return true;
      } else {
        this.commonService.openToastWarningMessage("Kindly input Received By, Received Dt, Received into , Exp. Installation Dt and Default Person Incharge")
      }
    } else {
      return true;
    }

  }



  validateEditMode():boolean {
    let primaryId;
    let mode;

    this.activatedRoute.params.subscribe(
      params => {

        primaryId = params.pId;
        this.activetab =  params.tab;
        primaryId = Number(primaryId);
        this.assetId = primaryId;
        this.transactionSource = this.asset_register;
        this.assetCertificateFormGroup.controls.assetHdrId.setValue(primaryId);
         mode = params.mode;
        this.mode =  params.mode;
        if((this.screen !== "" && !this.previousPath) || this.refreshSameScreen){
            this.previousPath = this.screen;
            this.refreshSameScreen = false;
            if (primaryId <= 0) {
              // button and heading names for add
              this.headingDisplay = "Create";
              this.buttonDisplay = "Submit";
              this.tempValue = '';
              this.tempValueSerialNo = '';
              this.assetMainForm.controls.noOfYears.setValue(this.assetOptimaConstants.defaultUseFulYrsForAsset);
              this.formTwoValid = true;

            } else {
              this.commonService.commonGetService('fetchAssetDtlByAssetId.sams', primaryId).subscribe(
                data => {
                  this.assetMainForm.patchValue(data.responseData);
                  this.subCategory = data.responseData.subCategoryName;
                  this.manufacturer = data.responseData.manufacturerName;
                  
                  if(this.assetMainForm.controls.processName.value !== ''){
                    this.underProcess = true;
                  }
                  if(this.assetMainForm.controls.preInwInventoryHdrId.value > 0){
                    this.assetMainForm.controls.purchaseOrderNo.disable();
                  }
                  this.docFilePath = data.responseData.poRegDocFilePath != null ? data.responseData.poRegDocFilePath : '';
                  this.imageFilePath = data.responseData.filePath != null ? data.responseData.filePath : '';
                  this.calculateScrapValue();
                  this.assetMainForm.controls['departmentName'].setValue(data.responseData.departmentName);
                  //this.assetMainForm.controls['assetCategoryCode'].setValue(data.responseData.modelTO.assetCategoryCode);
                  //this.assetMainForm.controls['assetGroupCode'].setValue(data.responseData.modelTO.assetGroupCode);
                  this.assetMainForm.controls['locationCode'].setValue(data.responseData.locationTO.locationCode);
                  this.assetMainForm.controls['regionCode'].setValue(data.responseData.locationTO.regionTO != null ? data.responseData.locationTO.regionTO.regionCode : '');
                  this.assetMainForm.controls['legalEntityCode'].setValue(data.responseData.locationTO.legalEntityTO.legalEntityCode);
                  //this.assetMainForm.controls['assetSubCategoryCode'].setValue(data.responseData.modelTO.assetSubCategoryCode);
                  this.assetMainForm.controls['orgCode'].setValue(data.responseData.locationTO.orgCode);
                  this.assetMainForm.controls['personInCharge'].setValue(data.responseData.personInCharge);
                  this.assetMainForm.controls['ownershipType'].setValue(data.responseData.ownershipType);
                  this.assetMainForm.controls['functionalStatus'].setValue(data.responseData.functionalStatus);
                  this.assetMainForm.controls['businessPartnerName'].setValue(data.responseData.businessPartnerName);
                  this.assetMainForm.controls['assetStatusId'].setValue(data.responseData.assetStatusId);
                  this.assetMainForm.controls['exchangeRt'].setValue(data.responseData.exchangeRt);
                  this.assetMainForm.controls['originalPurchaseAmt'].setValue(data.responseData.originalPurchaseAmt);
                  this.assetMainForm.controls['localPurchaseAmt'].setValue(data.responseData.localPurchaseAmt);
                  this.assetMainForm.controls['volumeLicensePresent'].setValue(data.responseData.volumeLicensePresent);
                  if (this.assetMainForm.controls.contractForInvDt.value) {
                    //this.assetMainForm.controls.doDtDisp.setValidators([Validators.required]);
                    //this.assetMainForm.controls.doNo.setValidators([Validators.required]);
                    //this.assetMainForm.controls.invoiceValue.setValidators([Validators.required]);
                    if (this.screen == 'Inward Inventory SR') {
                      this.assetMainForm.controls['doDtDisp'].setValue('');
                      this.assetMainForm.controls['doNo'].setValue('');
                      this.assetMainForm.controls['invoiceValue'].setValue(0);
                    }
                  }
                  if(data.responseData.volumeLicensePresent){
                    this.assigneeDisplayedColumns = ['sno', 'deptName', 'assignedTo', 'assigneeType', 'startDt', 'endDt', 'emailId', 'phoneNo', 'assignedVolumeLicenseQty', 'primaryTechnician','secondaryTechnician', 'pmPATechnician', 'qaTechnician','action']

                    if(!data.responseData.trackIndividualLicense){
                      this.volumeLicenseDisplayedColumns = ['sno', 'productKey','status', 'assignedType', 'assignedTo', 'assignedAssetCode', 'assignedAssetModel', 'assignedAssetSerialNo', 'assignedAssetEquipmentCode','assignedVolumeLicenseQty', 'action'];

                      this.commonService.commonGetService('getAssignedAssetInfo.sams', '',this.assetId).subscribe(
                        data => {
                          if (data.success){
                            this.listOfAssetVolumeLicense.data = data.responseData.dataList;

                          } else {
                            this.commonService.openToastErrorMessage('Unable to volume License');
                          }
                        }
                      );
                      this.assetMainForm.controls['remainingVolumeLicenseQty'].setValue(this.assetMainForm.controls.volumeLicenseQty.value - this.assetMainForm.controls.usedVolumeLicenseQty.value);
                    }
                    else{
                      this.listOfAssetVolumeLicense.data = data.responseData.volumeLicenseList;
                      this.assetMainForm.controls.usedVolumeLicenseQty.setValue(data.responseData.usedVolumeLicenseQty)
                      this.volumeLicenseSuffix = (data.responseData.volumeLicenseList).length;

                       this.assetMainForm.controls['remainingVolumeLicenseQty'].setValue(data.responseData.volumeLicenseQty - (data.responseData.volumeLicenseList).length);
                    }
                  }
                  localStorage.setItem('locationName', this.assetMainForm.controls.locationName.value);
                  localStorage.setItem('locationId', this.assetMainForm.controls.locationId.value);
                  this.selectedAssetAge(data.responseData.ageCriteria)

                  if (data.responseData.localTaxRate != 0 || (data.responseData.localTaxRate > 0)) {
                    this.assetMainForm.controls['localTaxRate'].setValue(data.responseData.localTaxRate);

                  } else if (data.responseData.localTaxRate === 0 && data.responseData.localPurchaseAmt != 0 && data.responseData.localTaxAmt != 0) {
                    this.assetMainForm.controls.localTaxRate.setValue(((data.responseData.localPurchaseAmt) / (data.responseData.localTaxAmt)).toFixed(2));
                  } else {
                    this.assetMainForm.controls['localTaxRate'].setValue(0);
                  }
                  this.assetMainForm.controls['localTaxAmt'].setValue(data.responseData.localTaxAmt);
                  this.assetMainForm.controls['totalPurchaseAmt'].setValue(data.responseData.totalPurchaseAmt);
                  this.tempValue = data.responseData.assetCode != null ? data.responseData.assetCode : '';
                  this.tempValueSerialNo = data.responseData.serialNo != null ? data.responseData.serialNo : '';
                  this.inStockVolumeLicenseCount = data.responseData.inStockVolumeLicenseCount;
                  this.totalVolumeLicenseCount = data.responseData.volumeLicenseList.length;
                  this.assetAssigneeDataSourceFilterByPersonIncharge = (data.responseData.assetAssigneeList);
                  // filter person incharge flag false only
                  for(let i=0; i<this.assetAssigneeDataSourceFilterByPersonIncharge.length; i++){
                    if(!this.assetAssigneeDataSourceFilterByPersonIncharge[i].defaultPersonIncharge){
                      this.assetAssigneeDataSource.push(this.assetAssigneeDataSourceFilterByPersonIncharge[i]);
                    }
                  }

                  if (this.assetMainForm.controls.departmentName != null) {
                    this.assetAssigneeForm.controls.departmentName.setValue(this.assetMainForm.controls.departmentName.value)
                    this.assetAssigneeForm.controls.departmentId.setValue(this.assetMainForm.controls.departmentId.value)
                    if(this.isViewMode){
                      this.assetAssigneeForm.controls.assignToEmpName.disable();
                    }else{
                      this.assetAssigneeForm.controls.assignToEmpName.enable();
                    }
                  }
                  this.inclusiveTax = String(this.assetMainForm.controls.inclusiveTax.value);
                  if (this.inclusiveTax === "true") {
                    this.assetMainForm.controls.originalPurchaseAmt.disable();
                    this.assetMainForm.controls.localPurchaseAmt.disable();
                    this.assetMainForm.controls.localTaxAmt.disable();
                    this.assetMainForm.controls.totalPurchaseAmt.enable();
                  } else {
                    this.assetMainForm.controls.originalPurchaseAmt.enable();
                    this.assetMainForm.controls.localPurchaseAmt.enable();
                    if(this.assetMainForm.controls.localTaxRate.value > 0){
                      this.assetMainForm.controls.localTaxAmt.disable();
                    }else{
                      this.assetMainForm.controls.localTaxAmt.enable();
                    }
                    this.assetMainForm.controls.totalPurchaseAmt.disable();
                  }

                  if(this.assetMainForm.controls.depreciationMethod.value === 'STRAIGHT LINE') {
                    this.isStraightLineMethod = true;
                    this.assetMainForm.controls.noOfYears.enable();
                  } else if(this.assetMainForm.controls.depreciationMethod.value === 'WRITTEN DOWN'){
                    this.isStraightLineMethod = false;
                    this.assetMainForm.controls.noOfYears.disable();
                  }
                  //  check validation on edit mode
                  //this.formValidationForAssetInfo();
                  //this.formValidationForPurchaseInfo();
                  if(this.assetMainForm.controls['locationCurrencyCode'].value == this.assetMainForm.controls['purchaseCurrencyCode'].value){
                    this.assetMainForm.controls['exchangeRt'].disable();
                  }
                  else{
                    this.assetMainForm.controls['exchangeRt'].enable();
                  }
                  this.deliveryInstallationDetails();
                  this.updateCustomerDetails();
                  //this.formValidationForMaintainenceIncharge();
                  //this.getCustomFieldList(this.assetMainForm.controls['assetHdrId'].value, data.responseData.subCategoryId, 'Edit', 'ASSET');
                  //To Show Model Accessories Tab in Edit and View Mode
                  //this.modelItems = data.responseData.modelTO.modelItems;
                  this.modelItemListDataSource = data.responseData.accessoriesConsumablesTOList;                  
                  //this.showDocument = data.responseData.modelTO.document;
                  //this.documentDataSource = data.responseData.modelTO.modelDocList;
                  this.assetDocumentDataSource = data.responseData.assetDocList;
                  //this.showcustomField = data.responseData.modelTO.customFields;
                  this.supplierDataSource = [];
                  this.supplierDataSource.push(data.responseData.businessPartnerTO);

                  //this.showSelfAnalysis = data.responseData.modelTO.selfAnalysis;
                  //this.selfAnalysisDataSource = data.responseData.modelTO.selfAnalysisList;
                  this.lengthSelfAnalysisList = this.selfAnalysisDataSource.length;

                  //this.showAdditionalInfo = data.responseData.modelTO.additionalInfo;
                  //this.additionalInfoDataSource = data.responseData.modelTO.additionalInfoList;
                  this.lengthAdditionalInfoList = this.additionalInfoDataSource.length;

                  //this.showCheckList = data.responseData.modelTO.checkList;
                  //this.addCheckPointsDataSource = data.responseData.modelTO.checkPointsList;
                  this.lengthCheckPointsList = this.addCheckPointsDataSource.length;

                  //this.showInventoryModule = data.responseData.modelTO.inventoryModule;
                  //this.itemModuleListDataSource = data.responseData.modelTO.modelModuleList;
                  this.lengthModelModuleList = this.itemModuleListDataSource.length;

                  //this.showSolutionBank = data.responseData.modelTO.solutionBank;
                  //this.solutionBankDataSource = data.responseData.modelTO.solutionBankList;
                  this.lengthSolutionBankList = this.solutionBankDataSource.length;

                  //this.showTechnicalSpecelist = data.responseData.modelTO.technicalSpecelist;
                  ///this.specialistDataSource = data.responseData.modelTO.technicalSpecialistList;

                  //this.isVolumeLicensePresent = data.responseData.modelTO.volumeLicensePresent;
                  //this.lengthTechnicalSpecialistList = this.specialistDataSource.length;

                  //this.trackIndividualLicense = data.responseData.modelTO.trackIndividualLicense;

                  //this.checkModelInstallationType = data.responseData.modelTO.installationType;

                  this.assetCodeChangeDataSource = data.responseData.assetCodeChangeList;
                  this.lengthAssetCodeChangeList = this.assetCodeChangeDataSource.length;

                  if (this.checkModelInstallationType == '' || this.checkModelInstallationType == 'SELF INSTALLATION' || this.checkModelInstallationType == 'NONE'){
                    this.assetMainForm.controls.installationDoneBy.setValue('INTERNAL');
                  }
                  else{
                    this.assetMainForm.controls.installationDoneBy.setValue('EXTERNAL');
                  }


                  // if(!data.responseData.modelTO.trackIndividualLicense){
                  //   this.volumeLicenseInsertForm.disable();
                  // }
                  // else{
                  //   this.unAssignedLicenseQty()
                  // }

                  //this.fetchListOfAssetDocs();
                  this.loadContractDetailsForAssetList();//to get Contract Details for Asset
                  this.fetchListOfAssetCertificates() //to get Asset Certificates
                  this.fetchListForSchedule();
                  if (this.assetMainForm.controls.assetStatusId.value == allassetStatus.NOT_IN_STOCK && this.assetMainForm.controls.preInwInventoryHdrId.value > 0) {
                    this.generateCEIDBasedonSubCategory(this.assetMainForm.controls.subCategoryName.value, this.assetMainForm.controls.locationId.value, this.userSessionService.getUserOrgId())
                  }
                  //CHECK FOR INTERNAL INSTALLATION TYPE
                  if (this.assetMainForm.controls.installationDoneBy.value == 'INTERNAL') {
                    this.insExternalEnggInfo = false;
                  } else {
                    this.insExternalEnggInfo = true;
                  }
                  this.getWorkflowApprovalForAsset();
                  this.consumedSparesDetailList();
                  this.gatePassDetailsForAsset();

                  this.checkForFormValues();

                  // to enable/disable item allocation
                  this.checkItemAllocationValidation();

                  if (this.assetMainForm.controls.handoverStatusDisplay.value === 'YES') {
                    this.assetMainForm.controls.handoverDtDisp.disable();
                    this.assetMainForm.controls.handoverStatusDisplay.disable();
                  }

                  if (this.assetMainForm.controls.assetStatusId.value === allassetStatus.IN_USE) {
                    this.disableBatch = true;
                  }

                  if(data.responseData.purchaseOrderNo){
                    this.commonService.commonGetService('getInwardAssetQtyGroupedByPoNo.sams', '', data.responseData.purchaseOrderNo, data.responseData.modelName, data.responseData.locationId).subscribe(
                      (data) => {
                          if (data.success) {
                              this.assetPOqty = data.responseData.qty;
                          }

                      }
                    )
                  }
                  if(this.docFilePath == undefined || this.docFilePath == '' || this.docFilePath == null) {
                    this.showPoDocView = false;
                  } else {
                    this.poDocFileType = this.commonService.getFileType(this.docFilePath).toLowerCase();
                    if(this.poDocFileType == 'pdf' || this.poDocFileType == 'jpg' || this.poDocFileType == 'png' || this.poDocFileType == 'jpeg') {
                      this.showPoDocView = true;
                    } else {
                      this.showPoDocView = false;
                    }
                  }

                  if (mode == 'view') {
                    this.isViewMode = true;
                    this.modeDisplay = true;
                    this.changeCeidButtonDisplay = false;
                    this.assetMainForm.disable();
                    this.headingDisplay = "View";
                    this.assetMainForm.controls['modelName'].disable();
                    this.assetMainForm.controls['assetGroupName'].disable();
                    this.assetMainForm.controls['assetCategoryName'].disable();
                    this.assetMainForm.controls['subCategoryName'].disable();
                    this.volumeLicenseForm.disable();
                    this.assetAssigneeForm.disable();
                  } else {
                    // button and heading names for edit
                    this.headingDisplay = "Edit";
                    this.buttonDisplay = "Update";
                    this.changeCeidButtonDisplay = true;
                    this.disableClear = true;
                    if(data.responseData.approvalStatusAsset === 'APPROVED') {
                      this.assetMainForm.controls['modelName'].disable();
                      this.assetMainForm.controls['assetGroupName'].disable();
                      this.assetMainForm.controls['assetCategoryName'].disable();
                      this.assetMainForm.controls['subCategoryName'].disable();
                      this.assetMainForm.controls['assetCode'].disable();
                    }
                    
                  }
                });
            }
        }
        else{
              return null;
        }

      }
    );
    return false;
  }

  getWorkflowApprovalForAsset() {
    this.commonService.commonGetService('getWorkflowForId.sams', this.assetMainForm.controls.assetHdrId.value,
      this.userSessionService.getUserEmpId(), this.asset_register, this.userSessionService.getUserOrgId()).subscribe(
        data => {
          if (data.success) {
            this.employeeId = this.userSessionService.getUserEmpId();
            this.approvebuttonEnable = data.responseData.approvalFlag;
            this.approvalId = data.responseData.workflowApprovalId;
          } else {
            this.commonService.openToastWarningMessage(data.message);
          }
        }, error => {
        }
      );
  }

  // Installation Date onchange event
  changeInstallationDt(installDate) {
    this.assetMainForm.controls.warrentyStartDtDisp.setValue(installDate.value);
    this.installDt = new Date(installDate.value);
    this.getWarrentyPart(this.assetMainForm.controls.warrantyCoveragePart.value)
  }
  getWarrentyPart(warrentyPart) {
    let warrantyPartMonth;

    if (warrentyPart === 'Infinite Days') {
      warrantyPartMonth = 100;
    } else {
      warrantyPartMonth = Number(warrentyPart.substring(0, 2));
    }

    this.partValue = warrantyPartMonth;
    var tempStartDate = this.assetMainForm.controls.warrentyStartDtDisp.value;
    var startDate = new Date(tempStartDate);
    var getStartMonth = startDate.getMonth() + this.partValue;
    var endDate = startDate.setMonth(getStartMonth);
    var warrentyendDt = new Date(endDate);
    this.assetMainForm.controls.warrentyEndDtDisp.setValue(warrentyendDt);
    this.assetMainForm.controls['warrentyEndDtDisp'].disable();
    this.getWarrentyLabor(this.assetMainForm.controls.warrantyCoverageLabor.value);
  }
  getWarrentyLabor(warrentyLabor) {
    let warrantyLaborMonth;

    if (warrentyLabor === 'Infinite Days') {
      warrantyLaborMonth = 100;
    } else {
      warrantyLaborMonth = Number(warrentyLabor.substring(0, 2));
    }
    this.partValue = warrantyLaborMonth;
    var tempStartDate = this.assetMainForm.controls.warrentyStartDtDisp.value;
    var startDate = new Date(tempStartDate);
    var getStartMonth = startDate.getMonth() + this.partValue;
    var endDate = startDate.setMonth(getStartMonth);
    var warrentyendDt = new Date(endDate);
    this.assetMainForm.controls.warrentyEndDtDispForLabor.setValue(warrentyendDt);
    this.assetMainForm.controls['warrentyEndDtDispForLabor'].disable();
  }

  months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  clear() {
    this.assetMainForm.controls["assetCode"].setValidators([Validators.maxLength(100)]);
    this.ceidMandatory = "";
    this.assetMainForm.controls['assetCode'].enable();
    this.assetMainForm.controls['assetGroupName'].disable();
    this.assetMainForm.controls['assetCategoryName'].enable();
    this.assetMainForm.controls['subCategoryName'].enable();
    this.assetMainForm.controls['exchangeRt'].enable();
    this.assetMainForm.reset();
    this.assetMainForm.updateValueAndValidity();
    this.assetAssigneeForm.reset();
    this.assetAssigneeForm.updateValueAndValidity();
    this.assetAssigneeForm.controls.assignToEmpName.disable();
    this.assetAssigneeDataSource = [];
    this.ngOnInit();
    this.inclusiveTax = "false";
    this.assetMainForm.controls.exchangeRt.setValue(0);
    this.assetMainForm.controls['locationName'].setValue(this.userSessionService.getUserLocationName());
    this.assetMainForm.controls['locationId'].setValue(this.userSessionService.getUserLocationId());
    this.assetMainForm.controls['locationCurrencyCode'].setValue(this.userSessionService.getlocCurrCd());
    this.assetMainForm.controls['locationType'].setValue(this.assetOptimaConstants.locationType);
    this.assetMainForm.controls['locationCode'].setValue(this.userSessionService.getUserLocationCode());
    this.assetMainForm.controls['orgCode'].setValue(this.userSessionService.getUserOrgCode());
    this.assetMainForm.controls['legalEntityCode'].setValue(this.userSessionService.getUserLegalEntityCode());
    this.assetMainForm.controls['regionCode'].setValue(this.userSessionService.getUserRegionCode());
    this.getModelComboValue(null);
  }

  // Move to Next Tab
  nextStep() {
    if (this.selectedIndex != this.maxNumberOfTabs) {
      this.selectedIndex = this.selectedIndex + 1;
    }
  }

  previousStep() {
    if (this.selectedIndex != 0) {
      this.selectedIndex = this.selectedIndex - 1;
    }
  }

  formValidationForAssetInfo() {
    if (this.assetMainForm.get('ownershipType').valid && this.assetMainForm.get('departmentName').valid) {
      this.assetInfoTabValidation = false;
    } else {
      this.assetInfoTabValidation = false;
    }
  }

  updateCustomerDetails(){
    if(this.assetMainForm.controls.ownershipType.value === 'OWNED BY CUSTOMER'){

      if(this.assetMainForm.controls.customerName.value != "" && this.assetMainForm.controls.customerSiteName.value != ""){
        this.customerFieldMandatory = false;
      }
      else{
        this.customerFieldMandatory = true;
      }
    }
    else{
      this.customerFieldMandatory = false;
    }
  }

  formValidationForPurchaseInfo() {
    if (this.assetMainForm.get('businessPartnerName').valid && this.assetMainForm.get('businessPartnerSiteName').valid && this.assetMainForm.get('purchaseCurrencyCode').valid &&  this.assetMainForm.get('doDtDisp').valid && this.assetMainForm.get('doNo').valid && this.assetMainForm.get('invoiceValue').valid) {
      this.assetPurchaseInvoiceInfoTabValidation = false;
    } else {
      this.assetPurchaseInvoiceInfoTabValidation = false;
    }

  }

  deliveryInstallationDetails(){
    let mf = this.assetMainForm;
    const instType = this.checkModelInstallationType

    if (this.screen === "Inward"){
      //mf.controls.receivedDtDisp.setValidators([Validators.required]);
      //mf.controls.storeName.setValidators([Validators.required]);
      //mf.controls.expectedInstallationDtDisp.setValidators([Validators.required]);
      //mf.controls.receivedBy.setValidators([Validators.required]);

      if (instType == '' || instType == 'SELF INSTALLATION' || instType == 'NONE'){
        this.installationDoneByCheck = false;
      }
      else{
        this.installationDoneByCheck = true;
        //mf.controls.installationDoneBy.setValidators([Validators.required]);
        //while working on work order need to discuss and do
      }

      this.receivedDtDispCheck = true;
      this.storeNameCheck = true;
      this.expectedInstallationDtDispCheck = true;
      this.receivedByCheck = true;
    }

      if (mf.get('installationDoneBy').valid&&mf.get('receivedDtDisp').valid&&mf.get('storeName').valid&&mf.get('expectedInstallationDtDisp').valid&&mf.get('receivedBy').valid&&mf.get('insInternalEngineerName').valid) {
        this.assetAssetDeliveryInstallationInfoTabValidation = false;
      } else {
        this.assetAssetDeliveryInstallationInfoTabValidation = true;
      }

      this.assetMainForm = mf;
  }

  totCallAmnt() {

    if(this.assetMainForm.controls.localTaxRate.value > 0 || this.inclusiveTax === 'true'){
      this.assetMainForm.controls.localTaxAmt.disable();
    }else{
      this.assetMainForm.controls.localTaxAmt.enable();
    }
    this.assetMainForm.controls.localPurchaseAmt.setValue(Number(this.assetMainForm.controls.originalPurchaseAmt.value) *
      Number(this.assetMainForm.controls.exchangeRt.value));

    this.assetMainForm.controls.localTaxAmt.setValue(Math.round(this.assetMainForm.controls.localPurchaseAmt.value *
      (this.assetMainForm.controls.localTaxRate.value / 100)));

    this.assetMainForm.controls.totalPurchaseAmt.setValue(Number(this.assetMainForm.controls.localTaxAmt.value) +
      Number(this.assetMainForm.controls.localPurchaseAmt.value));
  }

  addToTotal(){
    if(this.assetMainForm.controls.localPurchaseAmt.value > 0){
      this.assetMainForm.controls.totalPurchaseAmt.setValue(Number(this.assetMainForm.controls.localTaxAmt.value) +
      Number(this.assetMainForm.controls.localPurchaseAmt.value))

      this.assetMainForm.controls.localTaxRate.setValue((this.assetMainForm.controls.localTaxAmt.value *
        (100 / this.assetMainForm.controls.localPurchaseAmt.value)).toFixed(2));
    }
  }

  customFieldLength: number = 0;
  getCustomFieldList(assetHdrId: number, subCategoryId: number, mode: string, searchBy: string) { 
    if (this.assetMainForm.controls['assetGroupName'].value == this.assetOptimaConstants.notApplicable && this.assetMainForm.controls['modelName'].value == this.assetOptimaConstants.notApplicable) {
      this.cusFieldHdr.basedOnDisp = ["ASSET"];
     }else if(this.assetMainForm.controls['assetGroupName'].value == this.assetOptimaConstants.notApplicable){
      this.cusFieldHdr.basedOnDisp = ["ASSET","MODEL"];
     }else if(this.assetMainForm.controls['modelName'].value == this.assetOptimaConstants.notApplicable){
      this.cusFieldHdr.basedOnDisp = ["ASSET","GROUP"];
     }else{
      this.cusFieldHdr.basedOnDisp = ["ASSET","GROUP","MODEL"];
     }
    this.cusFieldHdr.customHdrId = 0;
    this.cusFieldHdr.assetGroupId = this.assetMainForm.controls.assetGroupId.value;
    this.cusFieldHdr.modelId = this.assetMainForm.controls.modelId.value;
    if (subCategoryId > 0) {
      this.cusFieldHdr.assetSubCategoryId = subCategoryId;
    }
    this.cusFieldHdr.customHdrId = assetHdrId;
    this.cusFieldHdr.basedOn = searchBy;
    this.commonService.commonInsertService('fetchListOfAllCustomFields.sams', this.cusFieldHdr).subscribe(
      data => {
        if (data.success) {
          this.cusFieldHdrList = data.responseData;
          this.customFieldLength = data.responseData.length;
          var len = this.cusFieldHdrList.length;
          for (var k = 0; len > k; k++) {
            this.cusFiledHdrTempList.push(this.cusFieldHdrList[k].value);
            if (this.cusFieldHdrList[k].inputType == "CHECKBOX") {
              this.cusFieldHdrList[k].value1 = this.cusFieldHdrList[k].value == 'TRUE' ? true : false;
            } else if (this.cusFieldHdrList[k].inputType == "DATE") {
              this.cusFieldHdrList[k].value1 = this.cusFieldHdrList[k].value;
            }
            if (mode === 'Add') {
              this.cusFieldHdrList[k].customFieldValId = 0;
            }
          }
          let displayValue = '';
          if (len > 0) {
            for (let i = 0; i < this.cusFieldHdrList.length; i++) {
              if ((displayValue != this.cusFieldHdrList[i].displayGroup) || i === 0) {
                this.res.push(this.cusFieldHdrList[i].displayGroup);
              }
              displayValue = this.cusFieldHdrList[i].displayGroup;
            }
          }
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
      }
    );
  }

  dateConvert(values, i, labelName, inputType) {

    for (let i = 0; i < this.cusFieldHdrList.length; i++) {
      if ((labelName === this.cusFieldHdrList[i].labelName) && (inputType === this.cusFieldHdrList[i].inputType)) {
        this.cusFieldHdrList[i].value = this.commonService.convertToDateStringyyyy_mm_dd(values);
      }
    }
  }

  mainList: CusFieldHdr[];
  getValueFromMainList(displayValue) {
    this.mainList = [];
    for (let i = 0; i < this.cusFieldHdrList.length; i++) {
      if (displayValue === this.cusFieldHdrList[i].displayGroup) {
        this.mainList.push(this.cusFieldHdrList[i]);
      }
    }
    return this.mainList;
  }

  downloadDocument(filePath: string, contentType: string) {
    var fileName = filePath.split('.')[0];
    this.commonService.downloadFile(filePath, contentType).subscribe(
      data => {
        const file = filePath.split('.');
        this.commonService.showDownloadPopUp(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
      }
    );
  }

  generateCEIDBasedonSubCategory(subCategoryName, locationId, orgId) {
    this.commonService.commonGetService('validateAssetCodeBasedonSubCategory.sams', subCategoryName, locationId, orgId).subscribe(
      data => {
        if (data.success) {
          this.ceidMandatory = "";
          this.assetMainForm.controls["assetCode"].disable();
          this.assetMainForm.controls["assetCode"].updateValueAndValidity();
          this.assetMainForm.controls["assetCode"].setValidators([]);
        } else {
          this.ceidMandatory = "*";
          //this.assetMainForm.controls["assetCode"].setValidators([Validators.required]);
          this.assetMainForm.controls["assetCode"].updateValueAndValidity();
          if(this.headingDisplay === "View"){
            this.assetMainForm.controls["assetCode"].disable();
          }else{
            this.assetMainForm.controls["assetCode"].enable();
          }
        }
      }, error => {
        this.assetMainForm.controls["assetCode"].enable();
        this.assetMainForm.controls["assetCode"].updateValueAndValidity();
      }
    );
  }

  navigateToAsset() {
    this.locationRef.back();
  }

  documentAddEdit() {
    let dialogRef = this.dialog.open(AssetDocCreateComponent, {
      height: '440px',
      width: '500px',
      data: {
        'assetHdrId': this.assetMainForm.controls.assetHdrId.value
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        this.fetchListOfAssetDocs();
      });
  }

  fetchListOfAssetDocs() {
    this.commonService.commonGetService('loadAssetDoc.sams', this.assetMainForm.controls.assetHdrId.value).subscribe(
      (data) => {
        this.assetDocumentDataSource = [];
        this.assetDocumentDataSource = this.assetDocumentDataSource.concat(data.responseData);
      }
    )
  }

  deleteDocument(deleteid, index) {
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Document'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          // if (deleteid <= 0) {
          //   this.documentDataSource.splice(index, 1);
          //   this.refreshDocumentInfoTable();
          // } else {
          this.commonService.commonGetService('deleteAssetDoc.sams', deleteid).subscribe(
            data => {
              if (data.success) {
                this.commonService.openToastSuccessMessage(data.message);
                this.documentDataSource.splice(index, 1);
                // this.refreshDocumentInfoTable();
                this.fetchListOfAssetDocs();
              } else {
                this.commonService.openToastErrorMessage(data.message);
              }
            }
          );
          // }
        }
      });
  }

  refreshDocumentInfoTable() {
    let tempArray = this.documentDataSource;
    this.assetDocumentDataSource = [];
    for (var i = 0; i < tempArray.length; i++) {
      this.documentDataSource.push(tempArray[i]);
      this.change.detach();
    }
    this.change.detectChanges();
  }

  changeStatus(status: string) {
    this.status = status;
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  setHeadings() {

    if (localStorage.getItem('previousRoute') != null) {
      if (localStorage.getItem('previousRoute').startsWith('/home/asset/asset')) {
        this.menu = 'Asset';
        this.screen = 'Asset Register';
        this.transactionSrc = 'ASSET REGISTER';
        localStorage.setItem('previousRoute', '/home/asset/asset');
      } else if (localStorage.getItem('previousRoute').startsWith('/home/asset/inwardInventorySR')) {
        localStorage.setItem('previousRoute', '');
        this.menu = 'Asset';
        this.screen = 'Inward';
        this.transactionSrc = 'INWARD INVENTORY';
        this.enableRequiredFields();
        localStorage.setItem('previousRoute', '/home/asset/inwardInventorySR');
      }else if(localStorage.getItem('previousRoute').startsWith('/home/asset/contractCreate')){
        this.fromContact = true;
        this.menu = 'Asset';
        this.screen = 'Asset Register';
        this.transactionSrc = 'ASSET REGISTER';
        localStorage.setItem('previousRoute', '/home/asset/contractCreate');
      }
    }
  }

  backToPreviousPage() {

    if(this.screen === "Asset Register"){
      this.router.navigate(['home/asset/asset']);
    }
    else if(this.screen === "Inward"){
      this.router.navigate(['home/asset/inwardInventorySR']);
    }
    else{
      this.locationRef.back();
    }
  }

  enableRequiredFields() {
    let instType = this.checkModelInstallationType;
    this.assetMainForm.controls.assetCode.disable();
    this.assetMainForm.controls.serialNo.enable();
    this.assetMainForm.controls.installationDtDisp.enable();

    //this.assetMainForm.controls.receivedBy.setValidators([Validators.required]);
    //this.assetMainForm.controls.receivedDtDisp.setValidators([Validators.required]);
    //this.assetMainForm.controls.storeName.setValidators([Validators.required]);
    //this.assetMainForm.controls.expectedInstallationDtDisp.setValidators([Validators.required]);

    if (instType == '' || instType == 'SELF INSTALLATION' || instType == 'NONE'){
      this.installationDoneByCheck = false;
    }
    else{
      //this.assetMainForm.controls.installationDoneBy.setValidators([Validators.required]);
      //while working on work order need to discuss and do
      this.installationDoneByCheck = true;
    }
  }

  contractAddEdit(contractId, mode) {
    
    this.router.navigate(['home/asset/contractCreate/' + contractId + '/' + mode + '/' + 'asset']);
    localStorage.setItem('assetHdrId', this.assetMainForm.controls.assetHdrId.value);
    localStorage.setItem('assetCode', this.assetMainForm.controls.assetCode.value);
    localStorage.setItem('serialNo', this.assetMainForm.controls.serialNo.value);
    localStorage.setItem('subCategoryId', this.assetMainForm.controls.subCategoryId.value);
    localStorage.setItem('subCategoryName', this.subCategory);
    localStorage.setItem('manufacturerId', this.assetMainForm.controls.subCategoryId.value);
    localStorage.setItem('manufacturerName', this.manufacturer);
    localStorage.setItem('modelId', this.assetMainForm.controls.modelId.value);
    localStorage.setItem('modelName', this.assetMainForm.controls.modelName.value);
    localStorage.setItem('equipmentCode', this.assetMainForm.controls.equipmentCode.value);
    localStorage.setItem('description', this.assetMainForm.controls.description.value);
    localStorage.setItem('totalPurchaseAmt', this.assetMainForm.controls.totalPurchaseAmt.value);
  }

  loadContractDetailsForAssetList() {
    this.contractDataSource = [];
    this.commonService.commonGetService('loadAssetContract.sams', this.assetMainForm.controls.assetHdrId.value).subscribe(
      data => {
        if (data.success) {
          this.contractDataSource = data.responseData;
          this.contractLength = this.contractDataSource.length;
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
      }
    );
  }

  generateContractPDF(contractHdrId?: number) {
    this.commonService.commonGetService('generateContractPDF.sams', contractHdrId).subscribe(
      data => {
        if (data.success) {
          this.downloadDocument(data.responseData, 'application/pdf');
        } else {
          this.commonService.openToastErrorMessage("Error occurred while downloading contract pdf");
        }
      }, error => {
      }
    );
  }

  getSrId(event) {
    this.assetMainForm.controls.srId.setValue(event.srId);
    this.srType = event.srType;
    this.srStatus = event.srStatus;
    if (this.srType === 'INSTALLATION' && this.srStatus === 'OPEN') {
      this.assetMainForm.controls['installationDtDisp'].disable();
    }
  }

  addStatutoryRequirement() {

    const index = this.commonService.getIndexOfTheItem(this.listOfCertificates, true, 'certificateName', this.assetCertificateFormGroup.controls.certificateName.value)

    this.listOfCertificates.push(this.assetCertificateFormGroup.value);
    this.listOfCertificates = this.listOfCertificates.reverse();
    this.change.detectChanges();
    this.formTwoValidation();
    this.table1.renderRows();

  }

  loadCertificateComboData(searchValue) {
    this.scrollsyncCertificateCombo = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllCertificateCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.certificatePageNumber, '', '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.certificatePageNumber , this.certificateNameList , data.responseData.comboList)
          this.certificatePageNumber = this.getData.pageNumber;
          this.certificateNameList = this.getData.dataList;
          this.scrollsyncCertificateCombo = false;
        }
      );
  }

  selectedCertificateAuthorityData(event) {
    if (event === 'undefined') {
      this.assetCertificateFormGroup.controls.certificateId.setValue(0);
      this.assetCertificateFormGroup.controls.certificationAuthorityName.setValue('');
      this.assetCertificateFormGroup.controls.issuingAuthority.setValue('');
      this.assetCertificateFormGroup.controls.assetHdrId.setValue(0);
    } else {
      this.assetCertificateFormGroup.controls.certificateId.setValue(event.certificateId);
      this.assetCertificateFormGroup.controls.certificationAuthorityName.setValue(event.certificationAuthorityName);
      this.assetCertificateFormGroup.controls.issuingAuthority.setValue(event.issuingAuthority);
      this.assetCertificateFormGroup.controls.assetHdrId.setValue(this.assetCertificateFormGroup.controls.assetHdrId.value);
    }
  }

  addBulkAssetPopUp;
  addBulkAsset() {
    this.addBulkAssetPopUp = this.dialog.open(BulkSerialNumberUploadComponent, {
      height: '600px',
      width: '600px',
      data: {}
    });
    this.addBulkAssetPopUp.disableClose = true;
    this.addBulkAssetPopUp.afterClosed().subscribe(
      data => {
        this.ngOnInit();
      });
  }

  uploadDocDialog;
  uploadDocument(element,view) {
    let dialogRef = this.dialog.open(UploadCertificateComponent, {
      height: 'auto',
      width: '500px',
      data: {
        'certificateModel': element,
        'mode': element.fileCertificateNo == '' ? 'add' : 'edit',
        'view':view
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        this.fetchListOfAssetCertificates();
      });
  }

  fetchListOfAssetCertificates() {
    this.subLoaderCertificate = true;
    this.commonService.commonGetService('loadAssetCertificate.sams', this.assetId).subscribe(
      (data) => {
        if (data.success) {
          this.listOfCertificates = [];
          this.listOfCertificates = this.listOfCertificates.concat(data.responseData);
          this.formTwoValidation();
          this.subLoaderCertificate = false;
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.subLoaderCertificate = false;
        }

      }
    );
  }

  deleteNewProductKeys(assetId){

    this.commonService.commonGetService('deleteVolumeLicense.sams', assetId).subscribe(
      (data) => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.subLoaderCertificate = false;
        }

      }
    );
  }

  deleteProductKey(element,index) {

    let confirmMsg = "";

    if(this.trackIndividualLicense){
      confirmMsg = "Do you want to delete assigned license";
    }
    else{
      confirmMsg = "Do you want to delete all assigned licenses"
    }

    let dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'confirmHeading': 'Confirmation',
        'confirmMsg' : confirmMsg
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          if(!this.trackIndividualLicense){
            this.assetAssigneeDataSource.forEach((element1: any,i: any) => {
              if(element.assignedEmployeeId === element1.assignedToEmpId){
                this.assetMainForm.controls.usedVolumeLicenseQty.setValue(this.assetMainForm.controls.usedVolumeLicenseQty.value-this.assetAssigneeDataSource[i].assignedVolumeLicenseQty);
                this.assetAssigneeDataSource[i].assignedVolumeLicenseQty = 0;
              }
            });
            let listOfAssetVolumeLicenseArray = this.listOfAssetVolumeLicense.data;
            listOfAssetVolumeLicenseArray[index].assignedVolumeLicenseQty = 0;
            this.listOfAssetVolumeLicense.data = listOfAssetVolumeLicenseArray;
          }
          else if(this.trackIndividualLicense){
              let listOfAssetVolumeLicenseArray = this.listOfAssetVolumeLicense.data;

              this.assetAssigneeDataSource.forEach((element1: any,i: any) => {
                if(element.assignedEmployeeId === element1.assignedToEmpId){
                  this.assetAssigneeDataSource[i].assignedVolumeLicenseQty = element1.assignedVolumeLicenseQty - 1;
                  this.assetMainForm.controls.usedVolumeLicenseQty.setValue(this.assetMainForm.controls.usedVolumeLicenseQty.value-1);
                }
              });

              this.deleteNewProductKeys(listOfAssetVolumeLicenseArray[index].volumeLicenseId)
              listOfAssetVolumeLicenseArray.splice(index, 1)
              this.listOfAssetVolumeLicense.data = listOfAssetVolumeLicenseArray;
          }
          if(this.assetMainForm.controls.usedVolumeLicenseQty.value == 0){
            this.assetMainForm.controls.assetStatusId.setValue(allPreInwardStatus.IN_STOCK);
            this.assetMainForm.controls.statusTypeId.setValue(allAssetStatusType.AST_STS_TYP_UNASSIGNED);
            this.assetMainForm.controls.assetConditionId.setValue(allAssetCondition.AST_CDN_GOOD);
          }
        }
      }
    );
    this.unAssignedLicenseQty();
  }

  async handleFileInput(files: any,type: any) {

    let listOfAssetVolumeLicense = [];
    listOfAssetVolumeLicense.push(...this.listOfAssetVolumeLicense.data);

    let vLIF = this.volumeLicenseInsertForm.controls;

    if(type === 1){
        for(let i=0;i<vLIF.licenseQty.value;i++){
          let productKeyArrays = {
            productKey: vLIF.productPrefix.value+vLIF.productKey.value+ (this.volumeLicenseSuffix++) ,
            status : allPreInwardStatus[allPreInwardStatus.IN_STOCK],
            active : true,
            assignedAssetModel : ''
          };
          listOfAssetVolumeLicense.push(productKeyArrays);

        }
        this.listOfAssetVolumeLicense.data = listOfAssetVolumeLicense;
        this.unAssignedLicenseQty();
        this.volumeLicenseInsertForm.controls.productKey.setValue('');
        this.volumeLicenseInsertForm.controls.licenseQty.setValue('');
        this.volumeLicenseInsertForm.controls.productPrefix.setValue('');
    }
    else if(type === 2){
      this.fileToUpload = files[0];
        readXlsxFile(files[0]).then((rows) => {
          let test = rows.filter((obj,i)=> (i > 13 && obj[1] && obj[2] && obj[3]));
          let update_qty = true;

            if(test.length > 0){
              test.forEach((data) => {
                if(typeof data[2] == "number"){

                  if(this.assetMainForm.controls.remainingVolumeLicenseQty.value >= data[2]){
                    for(let i=0;i<(Number(data[2]));i++){
                      let productKeyArrays2 = {
                        productKey: ((String(data[3])).trim())+((String(data[1])).trim())+ (this.volumeLicenseSuffix++) ,
                        status : allPreInwardStatus[allPreInwardStatus.IN_STOCK],
                        active : true,
                        assignedAssetModel : ''
                      };

                      listOfAssetVolumeLicense.push(productKeyArrays2);

                      this.assetMainForm.controls.usedVolumeLicenseQty.setValue(this.assetMainForm.controls.usedVolumeLicenseQty.value +  1);
                      this.assetMainForm.controls['remainingVolumeLicenseQty'].setValue(this.assetMainForm.controls.volumeLicenseQty.value - this.assetMainForm.controls.usedVolumeLicenseQty.value);

                      this.listOfAssetVolumeLicense.data = listOfAssetVolumeLicense;
                      this.unAssignedLicenseQty();

                    }
                  }
                  else if(update_qty){
                    update_qty = false;
                    this.commonService.openToastWarningMessage('product qty sholud be less then remaining qty.');
                  }

                }
                else{
                  this.commonService.openToastWarningMessage('Import License Quantity should be only numbers.');
                }

              })

          }
        })
        .catch(function(){
          this.commonService.openToastErrorMessage('Only Excel Files of Type ".xlsx" is allowed');
        })

      }



  }

  downloadFile() {
    let link = document.createElement("a");
    link.download = "VOLUME_PRODUCT_KEY_SAMPLE_TEMPLATE.xlsx";
    link.href = "/assets/doc-template/VOLUME_PRODUCT_KEY_SAMPLE_TEMPLATE.xlsx";
    link.click();
  }
  loadAssignToComboData(searchValue) {
    this.scrollsyncAssignToPerson = true;
    const locId = this.assetMainForm.controls.locationId.value;
    const departmentId = this.assetAssigneeForm.controls.departmentId.value;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllEmployeeComboByLocId.sams', 0, searchValue.term, locId, this.recordsPerPageForCombo, this.assignToPersonPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assignToPersonPageNumber , this.assignToPersonCombo , data.responseData.comboList)
        this.assignToPersonPageNumber = this.getData.pageNumber;
        this.assignToPersonCombo = this.getData.dataList;
        this.scrollsyncAssignToPerson = false;
      }
    );
  }

  listOfEmployeeName(searchKey) {
    this.scrollsyncLicenseEmpFirstName = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllEmployeeForOrgCombo, searchKey.term, '', '',
      this.recordsPerPageForCombo, this.employeePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchKey, this.employeePageNumber , this.employeeFirstName , data.responseData.comboList)
          this.employeePageNumber = this.getData.pageNumber;
          this.employeeFirstName = this.getData.dataList;
          this.scrollsyncLicenseEmpFirstName = false;
        });
  }

  getEmployeeNameComboValue(event,i) {
    if(event){
      let data = this.listOfAssetVolumeLicense.data;
      data[i].assignedEmployeeId = event.employeeId;
      data[i].assignedTo = event.employeeFirstName;
      data[i].status = allAssetCreateStatus[allassetStatus.IN_USE];
      this.listOfAssetVolumeLicense.data = data;
    }
    else{
      let data = this.listOfAssetVolumeLicense.data;
      data[i].assignedEmployeeId = '';
      data[i].assignedTo = '';
      data[i].status = '';
      data[i].status = allPreInwardStatus[allPreInwardStatus.IN_STOCK];
      this.listOfAssetVolumeLicense.data = data;
    }
  }

  selectedAssignToPerson(event) {
    if (event === undefined) {
      this.assetAssigneeForm.controls['assignedToEmpId'].setValue(0);
      this.assetAssigneeForm.controls['assignToEmpName'].setValue('');
      this.assetAssigneeForm.controls.assignedPersonEmail.setValue('');
      this.assetAssigneeForm.controls.assignedPersonContactNumber.setValue('')
      this.personInchargePageNumber = 1;
      this.personInchargeCombo = [];
      this.assignToPersonPageNumber = 1;
      this.assignToPersonCombo  = [];
    } else {
      if (this.assetAssigneeDataSource.length > 0) {
        let checkUser = this.assetAssigneeDataSource.findIndex(data => data.assignedToEmpId === event.employeeId && data.approvalStatus != 'REJECTED') !== -1;

          if (checkUser) {
            this.commonService.openToastWarningMessage("Asset Is Already Assigned To This Employee.")
            this.diableAssigneeAddButton = false;
            this.assetAssigneeForm.controls['assignedToEmpId'].setValue(0);
            this.assetAssigneeForm.controls['assignToEmpName'].setValue('');
            this.assetAssigneeForm.controls.assignedPersonEmail.setValue('');
            this.assetAssigneeForm.controls.assignedPersonContactNumber.setValue('')
            this.personInchargePageNumber = 1;
            this.personInchargeCombo = [];
          } else {
            this.assetAssigneeForm.controls['assignedToEmpId'].setValue(event.employeeId);
            this.assetAssigneeForm.controls['assignToEmpName'].setValue(event.employeeFirstName);
            this.assetAssigneeForm.controls.assignedPersonEmail.setValue(event.officeEmailId);
            this.assetAssigneeForm.controls.assignedPersonContactNumber.setValue(event.officeContactNo)
            this.diableAssigneeAddButton = true;
          }
      } else {
        this.assetAssigneeForm.controls['assignedToEmpId'].setValue(event.employeeId);
        this.assetAssigneeForm.controls['assignToEmpName'].setValue(event.employeeFirstName);
        this.assetAssigneeForm.controls.assignedPersonEmail.setValue(event.officeEmailId);
        this.assetAssigneeForm.controls.assignedPersonContactNumber.setValue(event.officeContactNo)
        this.assetAssigneeForm.controls.departmentId.setValue(this.assetMainForm.controls.departmentId.value);
            this.assetAssigneeForm.controls.departmentName.setValue(this.assetMainForm.controls.departmentName.value);
        this.diableAssigneeAddButton = true;
      }
    }
  }

  addAssetAssignee() {
    this.assetAssigneeForm = new FormGroup({
      assetAssigneeId: new FormControl(0),
      assignedToEmpId: new FormControl(0),
      assetId: new FormControl(0),
      assigneeTypeId: new FormControl(0),
      startDt: new FormControl(''),
      endDt: new FormControl(''),
      defaultPersonIncharge: new FormControl(false),
      assigneeTypeName: new FormControl(''),
      startDtDisp: new FormControl(''),
      endDtDisp: new FormControl(''),
      assignedPersonContactNumber: new FormControl(''),
      assignedPersonEmail: new FormControl(''),
      assignToEmpName: new FormControl(''),
      departmentName: new FormControl(''),
      departmentId: new FormControl(0),
      assignedVolumeLicenseQty: new FormControl(0),
      primaryTechnician: new FormControl(false),
      secondaryTechnician: new FormControl(false),
      pmPaTechnician: new FormControl(false),
      qaTechnician: new FormControl(false)

    })
    if (this.assetMainForm.controls.departmentName.value != null) {
      this.assetAssigneeForm.controls.departmentName.setValue(this.assetMainForm.controls.departmentName.value);
      this.assetAssigneeForm.controls.departmentId.setValue(this.assetMainForm.controls.departmentId.value)
      this.assetAssigneeForm.controls.assignToEmpName.enable();
    }
    this.checkForAssigneeTypeValue(this.assetAssigneeDataSource,'')
    this.changeDetectorRefs.detectChanges();
    this.tableAssignee.renderRows();
  }

  customSort() { }

  loadAssigneeTypeComboData(searchValue) {
    this.scrollsyncAssigneeType = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllAssigneeTypeCombo.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.assigneePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assigneePageNumber , this.assetAssigneeTypeNameCombo , data.responseData.comboList)
        this.assigneePageNumber = this.getData.pageNumber;
        this.assetAssigneeTypeNameCombo = this.getData.dataList;
        this.scrollsyncAssigneeType = false;
      }
    );
  }

  selectedAssigneeType(event, index) {
    if (!event) {
      this.assetAssigneeForm.controls['assigneeTypeId'].setValue(0);
      this.assetAssigneeForm.controls['assigneeTypeName'].setValue('');
      this.assetAssigneeDataSource[index].assigneeTypeId = 0;
      this.assetAssigneeDataSource[index].assigneeTypeName = '';
      this.assigneePageNumber = 1;
      this.assetAssigneeTypeNameCombo = [];
      this.checkForAssigneeTypeValue(this.assetAssigneeDataSource,index)

    } else {
      this.assetAssigneeForm.controls['assigneeTypeId'].setValue(event.assigneeTypeId);
      this.assetAssigneeForm.controls['assigneeTypeName'].setValue(event.assigneeTypeName);
      this.assetAssigneeDataSource[index].assigneeTypeId = event.assigneeTypeId;
      this.assetAssigneeDataSource[index].assigneeTypeName = event.assigneeTypeName;
      this.checkForAssigneeTypeValue(this.assetAssigneeDataSource,index)
    }
  }

  addNewAssetAssignee() {
    this.assetAssigneeForm.controls.assigneeTypeName.setValue('');
    this.assetAssigneeForm.controls.assigneeTypeId.setValue(0);
    this.assetMainForm.controls['installationDtDisp'].setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.assetMainForm.get('installationDtDisp').value))
    this.assetAssigneeForm.controls.startDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(new Date()));
    this.assetAssigneeForm.controls.endDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.assetOptimaConstants.defaultAssigneeEndDate))
    this.assetAssigneeForm.controls.assignedVolumeLicenseQty.setValue(0);
    this.assetAssigneeDataSource.push(this.assetAssigneeForm.value);
    // Maintenance Incharge not to set as Person Incharge present(Assign To) in Asset Information tab
    // if (this.assetAssigneeDataSource.length == 1) {
    //   this.assetAssigneeDataSource[0].defaultPersonIncharge = true;
    //   this.assetMainForm.controls.personInCharge.setValue(this.assetAssigneeDataSource[0].assignToEmpName)
    // }
    if (this.assetMainForm.controls.departmentName.value != null) {
      this.assetAssigneeForm.controls.departmentName.setValue(this.assetMainForm.controls.departmentName.value)
      this.assetAssigneeForm.controls.departmentId.setValue(this.assetMainForm.controls.departmentId.value)
      this.assetAssigneeForm.controls.assignToEmpName.enable();
    } else {
      this.assetAssigneeForm.controls.assignToEmpName.disable();
    }
    
    this.assetAssigneeForm.controls.departmentName.setValue(this.assetMainForm.controls.departmentName.value);
    this.assetAssigneeForm.controls.departmentId.setValue(this.assetMainForm.controls.departmentId.value);
    this.diableAssigneeAddButton = false;
    this.addAssetAssignee();
  }

  getChartOptions() {
    let chartOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      toolbox: {
        show: false,
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        data: [5, 10, 15, 20, 25]
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [1, 5, 2, 3, 4.5],
        type: 'line',
        symbol: 'circle',
        symbolSize: 15,
        lineStyle: {
          normal: {
            color: '#001a4d',
            width: 4,
            type: 'solid'
          }
        },
        itemStyle: {
          normal: {
            borderWidth: 2,
            borderColor: '#e60000',
            color: '#e60000'
          }
        }
      }]
    };
    return chartOption;
  }

  getChartOptions2() {
    let chartOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      toolbox: {
        show: false,
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        data: [5, 10, 15, 20, 25]
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [200, 230, 222, 239, 201],
        type: 'line',
        symbol: 'circle',
        symbolSize: 15,
        lineStyle: {
          normal: {
            color: '#001a4d',
            width: 4,
            type: 'solid'
          }
        },
        itemStyle: {
          normal: {
            borderWidth: 2,
            borderColor: '#e60000',
            color: '#e60000'
          }
        }
      }]
    };
    return chartOption;
  }

  selectedDepartment(event) {
    if (event === undefined) {
      this.assetAssigneeForm.controls.departmentName.setValue('');
      this.assetAssigneeForm.controls.departmentId.setValue(0)
      this.assigneeDepartmentPageNumber = 1;
      this.assigneeDepartmentCombo = [];
      this.assignToPersonCombo = [];
    } else {
      this.assetAssigneeForm.controls.departmentId.setValue(event.departmentId);
      this.assetAssigneeForm.controls.departmentName.setValue(event.departmentName);
      this.assetAssigneeForm.controls.assignToEmpName.setValue('');
      this.assetAssigneeForm.controls.assignedToEmpId.setValue(0);
      this.assetAssigneeForm.controls.assignToEmpName.enable();
      this.assignToPersonCombo = [];
      this.assignToPersonPageNumber = 1;
    }
  }

  checkDefaultPIC(event, element) {
    for (const index of this.assetAssigneeDataSource) {
      if (index.assignedToEmpId == element.assignedToEmpId) {
        if ((index.startDtDisp == element.startDtDisp) && (index.endDtDisp != null ? index.endDtDisp == element.endDtDisp : true)) {
          index.defaultPersonIncharge = true;
          this.assetMainForm.controls.personInCharge.setValue(index.assignToEmpName)
        } else {
          index.defaultPersonIncharge = false;
        }
      } else {
        index.defaultPersonIncharge = false;
      }
    }
  }

  loadAssigneeDepartmentComboData(searchValue) {
    this.scrollsyncAssigneeDepartment = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllDeparment.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.assigneeDepartmentPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assigneeDepartmentPageNumber , this.assigneeDepartmentCombo , data.responseData.comboList)
          this.assigneeDepartmentPageNumber = this.getData.pageNumber;
          this.assigneeDepartmentCombo = this.getData.dataList;
          this.scrollsyncAssigneeDepartment = false;
        }
      );
  }


  loadBlockNameComboData(searchValue) {
    this.scrollsyncBlock = true;
    const locId = this.assetMainForm.controls.locationId.value;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllBuildingCombo.sams', searchValue.term,locId, '',
      this.recordsPerPageForCombo, this.blockNamePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.blockNamePageNumber , this.blockNameCombo , data.responseData.comboList)
          this.blockNamePageNumber = this.getData.pageNumber;
          this.blockNameCombo = this.getData.dataList;
          this.scrollsyncBlock = false;
        }
      );
  }

  selectedBlockData(event) {
    if (event === undefined) {
      this.assetMainForm.controls.buildingBlockId.setValue(0);
      this.blockNamePageNumber = 1;
      this.blockNameCombo = [];

      this.assetMainForm.controls.buildingRoomId.setValue(0);
      this.assetMainForm.controls.roomName.setValue('');

      this.assetMainForm.controls.buildingFloorId.setValue(0);
      this.assetMainForm.controls.floorName.setValue('');

      this.assetMainForm.controls.buildingSegmentId.setValue(0);
      this.assetMainForm.controls.segmentName.setValue('');
    } else {
      this.assetMainForm.controls.buildingBlockId.setValue(event.buildingBlockId);

      this.assetMainForm.controls.buildingRoomId.setValue(0);
      this.assetMainForm.controls.roomName.setValue('');

      this.assetMainForm.controls.buildingFloorId.setValue(0);
      this.assetMainForm.controls.floorName.setValue('');

      this.assetMainForm.controls.buildingSegmentId.setValue(0);
      this.assetMainForm.controls.segmentName.setValue('');
    }
    this.roomNamePageNumber = 1;
    this.roomNameCombo = [];
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
      this.assetMainForm.controls.priorityName.setValue('');
      this.priorityPageNumber = 1;
      this.priorityCombo = [];
    } else {
      this.assetMainForm.controls.priorityName.setValue(event.priorityName);
    }
  }

  loadFloorComboData(searchValue) {
    this.scrollsyncFloor = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllFloorCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.floorNamePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.floorNamePageNumber , this.floorNameCombo , data.responseData.comboList)
          this.floorNamePageNumber = this.getData.pageNumber;
          this.floorNameCombo = this.getData.dataList;
          this.scrollsyncFloor = false;
        }
      );
  }

  selectedFloorData(event) {
    if (event === undefined) {
      this.assetMainForm.controls.buildingFloorId.setValue(0);
      this.floorNamePageNumber = 1;
      this.floorNameCombo = [];
    } else {
      this.assetMainForm.controls.buildingFloorId.setValue(event.buildingFloorId);
    }
  }

  loadSegmentNameComboData(searchValue) {
    this.scrollsyncSegment = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllSegmentCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.segmentNamePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.segmentNamePageNumber , this.segmentNameCombo , data.responseData.comboList)
          this.segmentNamePageNumber = this.getData.pageNumber;
          this.segmentNameCombo = this.getData.dataList;
          this.scrollsyncSegment = false;
        }
      );
  }

  selectedSegmentData(event) {
    if (event === undefined) {
      this.assetMainForm.controls.buildingSegmentId.setValue(0);
      this.segmentNamePageNumber = 1;
      this.segmentNameCombo = [];
    } else {
      this.assetMainForm.controls.buildingSegmentId.setValue(event.buildingSegmentId);
    }
  }
  loadRoomNameComboData(searchValue) {
    this.scrollsyncRoom = true;
    const locId = this.assetMainForm.controls.locationId.value;
    const buildingBlockId = this.assetMainForm.controls.buildingBlockId.value;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllRoomCombo.sams', searchValue.term,locId,buildingBlockId,
      this.recordsPerPageForCombo, this.roomNamePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.roomNamePageNumber , this.roomNameCombo , data.responseData.comboList)
          this.roomNamePageNumber = this.getData.pageNumber;
          this.roomNameCombo = this.getData.dataList;
          this.scrollsyncRoom = false;
        }
      );
  }

  selectedRoomData(event) {
    if (event === undefined) {
      this.assetMainForm.controls.buildingRoomId.setValue(0);
      this.assetMainForm.controls.roomName.setValue('');
      this.roomNamePageNumber = 1;
      this.roomNameCombo = [];

      this.assetMainForm.controls.buildingFloorId.setValue(0);
      this.assetMainForm.controls.floorName.setValue('');

      this.assetMainForm.controls.buildingSegmentId.setValue(0);
      this.assetMainForm.controls.segmentName.setValue('');
    } else {
      this.assetMainForm.controls.buildingRoomId.setValue(event.buildingRoomId);
      this.assetMainForm.controls.floorName.setValue(event.floorName);
      this.assetMainForm.controls.segmentName.setValue(event.segmentName);
      this.assetMainForm.controls.floorName.disable();
      this.assetMainForm.controls.segmentName.disable();

      this.assetMainForm.controls.buildingBlockId.setValue(event.blockId);
      this.assetMainForm.controls.blockName.setValue(event.blockName);
    }
  }

  loadDepreciationMethodComboData(searchValue) {
    this.scrollsyncDepreciationMethod = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllDepreciationCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.depreciationMethodPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.depreciationMethodPageNumber , this.depreciationMethodCombo , data.responseData.comboList)
          this.depreciationMethodPageNumber = this.getData.pageNumber;
          this.depreciationMethodCombo = this.getData.dataList;
          this.scrollsyncDepreciationMethod = false;
        }
      );
  }

  selectedDepreciationMethodData(event) {
    if (event === undefined) {
      this.assetMainForm.controls.depreciationMethodId.setValue(0);
      this.depreciationMethodPageNumber = 1;
      this.depreciationMethodCombo = [];
      this.assetMainForm.controls.rateOfDepreciation.setValue(0);
    } else {
      this.assetMainForm.controls.depreciationMethodId.setValue(event.depreciationMethodId);
      if (event.assetDepreciationMethodName === 'STRAIGHT LINE') {
        this.isStraightLineMethod = true;
        this.assetMainForm.controls.rateOfDepreciation.setValue(0);
        this.assetMainForm.controls.noOfYears.enable();
      } else {
        this.isStraightLineMethod = false;
        this.assetMainForm.controls.noOfYears.disable();
      }

      if (event.assetDepreciationMethodName === 'WRITTEN DOWN') {
        this.assetMainForm.controls.noOfYears.setValue(this.assetMainForm.controls.expectedLifeInYears.value);
        this.calculateDepRate();
      }
    }
  }

  listOfSupplierApproved(searchValue) {
    this.scrollApprovedSuppliersync = true;
    const businessPartnerId = this.assetMainForm.controls.businessPartnerId.value;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerSiteCombo, searchValue.term,businessPartnerId, '', this.recordsPerPageForCombo, this.approvedSupplierPageNumber).subscribe(
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
      this.assetMainForm.get('businessPartnerSiteId').setValue(0);
      this.assetMainForm.controls.businessPartnerName.enable();
      this.supplierLocationList = [];
      this.approvedSupplierPageNumber = 1;
    } else {
      // this.assetMainForm.controls.supplierName.disable();

      this.assetMainForm.controls.businessPartnerSiteId.setValue(event.partnerSiteId);
      this.assetMainForm.controls.businessPartnerSiteName.setValue(event.partnerSiteName);
      //SET OTHER INFO
      this.assetMainForm.controls.businessPartnerSiteAddress.setValue(event.partnerSiteAddress1);
      this.assetMainForm.controls.businessPartnerSiteEmailId.setValue(event.partnerSiteContactEmailId);
      this.assetMainForm.controls.businessPartnerSiteContactNo.setValue(event.partnerSiteMobileNumber);
    }
  }

  loadServiceEngineer1ComboData(searchValue) {
    this.scrollsyncServiceEngineer1 = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllEmployeeComboFromUser.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.serviceEngineer1PageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.serviceEngineer1PageNumber , this.serviceEngineer1Combo , data.responseData.comboList)
          this.serviceEngineer1PageNumber = this.getData.pageNumber;
          this.serviceEngineer1Combo = this.getData.dataList;
          this.scrollsyncServiceEngineer1 = false;
        }
      );
  }

  selectedServiceEngineerList1(event) {

    if (event === undefined) {
      this.assetMainForm.controls.receivedBy.setValue('');
      this.serviceEngineer1PageNumber = 1;
      this.serviceEngineer1Combo = [];
    } else {
      this.assetMainForm.controls.receivedBy.setValue(event.employeeFirstName);
    }
  }

  // approveWorkFlowProcess() {
  //   this.commonService.commonGetService('approveWorkflow.sams', this.approvalId, this.employeeId, status, this.assetMainForm.controls.assetHdrId.value, this.asset_register).subscribe(
  //     data => {
  //       if (data.success) {
  //         this.commonService.openToastSuccessMessage(data.message);
  //         if (data.responseData) {
  //           this.approveAssetStatus(data.responseData);
  //         } else {
  //           this.ngOnInit();
  //         }
  //       } else {
  //         this.commonService.openToastWarningMessage(data.message);
  //       }
  //     }, error => {
  //     }
  //   );
  // }

  // approveAssetStatus(status) {
  //   if (this.assetMainForm.controls.installationDtDisp.value != null && this.assetMainForm.controls.installationDtDisp.value != undefined &&
  //     this.assetMainForm.controls.handoverDtDisp.value != null && this.assetMainForm.controls.handoverDtDisp.value != undefined) {
  //     // this.assetMainForm.controls.assetStatusId.setValue(allassetStatus.IN_USE);
  //     this.save();
  //   } else {
  //     this.commonService.openToastWarningMessage("Kindly input the Installation Date and Handover Date")
  //   }
  // }

  calculateInstallationDate() {
    var date = this.assetMainForm.controls.purchaseDtDisp.value;
    var year = date.getFullYear();
    var installationdt = "01-01-" + year;
  }

  createMaintenanceSchedule(scheduleHdrId, mode) {
    this.commonService.showSpinner();
    this.router.navigate(['home/serviceRequest/maintenanceScheduleCreate/' + scheduleHdrId + '/' + mode]);
    localStorage.setItem('assetIdForScheduling', String(this.assetId));
    localStorage.setItem('sourceScreen', 'ASSET');
    this.commonService.hideSpinner();
  }

  length = '0';

  fetchListForSchedule() {
    this.scheduleHdrModel.direction = 'desc';
    this.scheduleHdrModel.columnName = 'updatedDt';
    this.scheduleHdrModel.pageNumber = Number(this.pageIndex);
    this.scheduleHdrModel.recordsPerPage = Number(this.pageSize);
    this.scheduleHdrModel.assetHdrId = this.assetId;
    this.maintenanceScheduleDataSource = [];
    this.subLoader = true;
    this.commonService.commonListService('listOfSchedules.sams', this.scheduleHdrModel).subscribe(
      data => {
        if (data.success) {
          this.maintenanceScheduleDataSource = data.responseData.dataList;
          this.length = data.responseData.dataTotalRecCount;
          this.subLoader = false;
        } else {
          this.subLoader = false;
        }
      }, error => {
        this.subLoader = false;
      }
    );
  }

  changeInstallationDoneBy(event) {
    this.assetAssetDeliveryInstallationInfoTabValidation = false;
    this.assetMainForm.controls.insInternalEngineerName.setValidators([]);

    if (event && event.name == "INTERNAL") {
      this.insExternalEnggInfo = false;

      if (this.screen === "Inward"){
        this.assetMainForm.controls.insInternalEngineerName.setValue('')
        //this.assetMainForm.controls.insInternalEngineerName.setValidators([Validators.required]);
        this.assetAssetDeliveryInstallationInfoTabValidation = true;
      }

    }
    else{
      this.assetAssetDeliveryInstallationInfoTabValidation = false;
      this.assetMainForm.controls.insInternalEngineerName.setValue('');
      this.assetMainForm.controls.insInternalEngineerId.setValue(0);

      this.insExternalEnggInfo = true;
      this.assetMainForm.controls.insInternalEngineerName.setValidators([]);
      this.deliveryInstallationDetails();
    }

  }

  listOfManufacturer(searchValue) {
    this.scrollManufacturersync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.MANUFACTURER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchValue.term, '', '',
      this.recordsPerPageForCombo, this.manufacturerListPageNumber, '', partnerRoles).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.manufacturerListPageNumber , this.manufacturerList , data.responseData.comboList)
          this.manufacturerListPageNumber = this.getData.pageNumber;
          this.manufacturerList = this.getData.dataList;
          this.scrollManufacturersync = false;
        }
      );
  }

  setSupplierData(event) {
    if (event === undefined) {
      this.assetMainForm.controls.installationProvidedById.setValue(0);
      this.assetMainForm.controls.installationProvidedByName.setValue('');
      this.supplierPageNumber = 1;
      this.supplierList = [];
    } else {
      this.assetMainForm.controls.installationProvidedById.setValue(event.businessPartnerId);
      this.assetMainForm.controls.installationProvidedByName.setValue(event.businessPartnerName);
    }
  }

  setManufacturerData(event) {
    if (event === undefined) {
      this.assetMainForm.controls.installationProvidedById.setValue(0);
      this.assetMainForm.controls.installationProvidedByName.setValue('');
      this.manufacturerListPageNumber = 1;
      this.manufacturerList = [];
    } else {
      this.assetMainForm.controls.installationProvidedById.setValue(event.businessPartnerId);
      this.assetMainForm.controls.installationProvidedByName.setValue(event.businessPartnerName);
    }
  }

  listOfCustomer(searchValue) {
    this.scrollCustomersync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllCustomerCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.customerListPageNumber).subscribe(
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
      this.assetMainForm.controls.customerId.setValue(0);
      this.assetMainForm.controls.customerName.setValue('');
      this.assetMainForm.controls.customerSiteId.setValue('');
      this.assetMainForm.controls.customerSiteName.setValue('');
      this.assetMainForm.controls.custContactPerson.setValue('');
      this.assetMainForm.controls.custPhoneNumber.setValue('');
      this.assetMainForm.controls.custAddress1.setValue('');
      this.assetMainForm.controls.custAddress2.setValue('');
      this.assetMainForm.controls.custCity.setValue('');
      this.assetMainForm.controls.custState.setValue('');
      this.assetMainForm.controls.custCountry.setValue('');
      this.assetMainForm.controls.custZipCode.setValue('');
      this.customerListPageNumber = 1;
      this.customerList = [];
      this.customerLocationListPageNumber = 1;
      this.customerLocationCombo = [];
    } else {
      this.assetMainForm.controls.customerId.setValue(event.customerId);
      this.assetMainForm.controls.customerName.setValue(event.customerName);
      this.assetMainForm.controls.customerSiteId.setValue('');
      this.assetMainForm.controls.customerSiteName.setValue('');
      this.assetMainForm.controls.custContactPerson.setValue('');
      this.assetMainForm.controls.custPhoneNumber.setValue('');
      this.assetMainForm.controls.custAddress1.setValue('');
      this.assetMainForm.controls.custAddress2.setValue('');
      this.assetMainForm.controls.custCity.setValue('');
      this.assetMainForm.controls.custState.setValue('');
      this.assetMainForm.controls.custCountry.setValue('');
      this.assetMainForm.controls.custZipCode.setValue('');
      this.customerLocationListPageNumber = 1;
      this.customerLocationCombo = [];
    }

  }

  listOfCustomerLocation(searchValue) {
    this.scrollCustomerLocationSync = true;
    const customerId = this.assetMainForm.controls.customerId.value;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllCustomerSiteCombo.sams', searchValue.term,customerId, '', this.recordsPerPageForCombo, this.customerLocationListPageNumber, '').subscribe(
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
      this.assetMainForm.controls.customerSiteId.setValue('');
      this.assetMainForm.controls.customerSiteName.setValue('');
      this.assetMainForm.controls.custContactPerson.setValue('');
      this.assetMainForm.controls.custPhoneNumber.setValue('');
      this.assetMainForm.controls.custAddress1.setValue('');
      this.assetMainForm.controls.custAddress2.setValue('');
      this.assetMainForm.controls.custCity.setValue('');
      this.assetMainForm.controls.custState.setValue('');
      this.assetMainForm.controls.custCountry.setValue('');
      this.assetMainForm.controls.custZipCode.setValue('');
      this.customerLocationListPageNumber = 1;
      this.customerLocationCombo = [];
    } else {
      this.assetMainForm.controls.customerId.setValue(event.customerId);
      this.assetMainForm.controls.customerName.setValue(event.customerName);
      this.assetMainForm.controls.customerSiteId.setValue(event.customerSiteId);
      this.assetMainForm.controls.customerSiteName.setValue(event.customerSiteName);
      this.assetMainForm.controls.custContactPerson.setValue(event.custContactPerson);
      this.assetMainForm.controls.custPhoneNumber.setValue(event.custSiteCompanyPhoneNo);
      this.assetMainForm.controls.custAddress1.setValue(event.custSiteAddress1 + event.custSiteAddress2);
      this.assetMainForm.controls.custAddress2.setValue(event.customerArea);
      this.assetMainForm.controls.custCity.setValue(event.customerCity);
      this.assetMainForm.controls.custState.setValue(event.customerState);
      this.assetMainForm.controls.custCountry.setValue(event.customerCountry);
      this.assetMainForm.controls.custZipCode.setValue(event.custSitePinCode);
    }
  }

  resetDatesWhichAreGreaterThanPODate() {
    if (this.assetMainForm.controls.expectedArrivalDtDisp.value != null && this.assetMainForm.controls.expectedArrivalDtDisp.value != '') {
      if ((new Date(this.assetMainForm.controls.purchaseDtDisp.value).valueOf() > new Date(this.assetMainForm.controls.expectedArrivalDtDisp.value).valueOf()))
        this.assetMainForm.controls.expectedArrivalDtDisp.setValue('');
    }

    if (this.assetMainForm.controls.receivedDtDisp.value != null && this.assetMainForm.controls.receivedDtDisp.value != '') {
      if ((new Date(this.assetMainForm.controls.purchaseDtDisp.value).valueOf() > new Date(this.assetMainForm.controls.receivedDtDisp.value).valueOf()))
        this.assetMainForm.controls.receivedDtDisp.setValue('');
    }

    if (this.assetMainForm.controls.installationDtDisp.value != null && this.assetMainForm.controls.installationDtDisp.value != '') {
      if ((new Date(this.assetMainForm.controls.purchaseDtDisp.value).valueOf() > new Date(this.assetMainForm.controls.installationDtDisp.value).valueOf()))
        this.assetMainForm.controls.installationDtDisp.setValue('');
    }
  }

  resetDtWhichIsGreaterThanExpArrivalDt() {
    if (this.assetMainForm.controls.expectedInstallationDtDisp.value != null && this.assetMainForm.controls.expectedInstallationDtDisp.value != '') {
      if ((new Date(this.assetMainForm.controls.expectedArrivalDtDisp.value).valueOf() > new Date(this.assetMainForm.controls.expectedInstallationDtDisp.value).valueOf()))
        this.assetMainForm.controls.expectedInstallationDtDisp.setValue('');
    }
  }

  resetHandOverDtIfSmaller() {
    if (this.assetMainForm.controls.handoverDtDisp.value != null && this.assetMainForm.controls.handoverDtDisp.value != '') {
      if ((new Date(this.assetMainForm.controls.receivedDtDisp.value).valueOf() > new Date(this.assetMainForm.controls.handoverDtDisp.value).valueOf()))
        this.assetMainForm.controls.handoverDtDisp.setValue('');
    }
  }

  handoverDtValidation(event) {
      if(event.value){
        this.assetMainForm.controls.handoverDtDisp.setValue(moment(event.value).format(this.assetOptimaConstants.ISODate));
      }
      else{
        this.assetMainForm.controls.handoverDtDisp.setValue("");
      }
      return false;
  }

  setInternalEngineerName(event) {
    if (event === undefined) {
      this.assetMainForm.controls.insInternalEngineerName.setValue('');
      this.personInchargePageNumber = 1;
    } else {
      this.assetMainForm.controls.insInternalEngineerName.setValue(event.employeeFirstName);
      this.assetMainForm.controls.insInternalEngineerId.setValue(event.employeeId);
    }

    this.deliveryInstallationDetails();
  }

  listOfSupplier(searchValue) {
    this.scrollSuppliersync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.SUPPLIER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchValue.term, '', '',
      this.recordsPerPageForCombo, this.supplierListPageNumber, '', partnerRoles).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.supplierListPageNumber , this.supplierList , data.responseData.comboList)
          this.supplierListPageNumber = this.getData.pageNumber;
          this.supplierList = this.getData.dataList;
          this.scrollSuppliersync = false;
        }
      );
  }

  consumedSparesDetailList() {
    this.consumedSparesDataSource = [];
    this.commonService.commonGetService('loadConsumedSparesList.sams', this.assetMainForm.controls.assetHdrId.value).subscribe(
      data => {
        if (data.success) {
          this.consumedSparesDataSource = data.responseData;
          this.consumedSparesLength = this.consumedSparesDataSource.length;
          for (let element of this.consumedSparesDataSource) {
            if (element.sourceOrStore === 'SPARE') {
              element.sourceOrStore = '';
              element.source = 'EXTERNAL'
            } else {
              element.source = 'FROM STOCK';
            }

          }
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
      }
    );
  }

  consumedSparesDetails(element, mode) {
    if (element.srType != 'RFS') {
      this.router.navigate(['home/serviceRequest/serviceView/' + element.srId + '/' + mode +"/"+"asset_info"]);
    } else if (element.srType === 'RFS') {
      this.router.navigate(['home/requestForStock/' + element.srId + '/' + mode]);
    }
  }

  createSupplier(supplierId, mode) {
    this.router.navigate(['home/purchase/supplierCreate/' + supplierId + '/' + mode]);
  }

  gatePassDetailsForAsset() {
    this.commonService.commonGetService('loadGatePassHistoryForAsset.sams', this.assetMainForm.controls.assetHdrId.value).subscribe(
      data => {
        if (data.success) {
          this.gatePassHistoryDataSource = data.responseData;
          this.gatePassHistoryLength = this.gatePassHistoryDataSource.length;
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
      }
    );
  }

  gatePassDetails(element, mode) {
    this.router.navigate(['home/asset/gatePassCreate/' + element.gatePassHdrId + '/' + mode]);
  }

  checkForAssigneeTypeValue(dataSource,index) {
   // if(index===''){
      if (dataSource.length > 0) {
        this.disableUpdateButton = false;
        for (const index of dataSource) {
          if (index.assigneeTypeId === 0 ) {
            this.commonService.openToastWarningMessage(`Kindly Select The "Assignee Type" For Each Assignee.`);
            this.disableUpdateButton = true;
          }
        }
      }
    // }else{
    //   if (dataSource.length > 0) {
    //     this.disableUpdateButton = false;
        
    //       if (dataSource[index].assigneeTypeId === 0 && dataSource[index].endDtDisp === "") {
    //         this.commonService.openToastWarningMessage(`Kindly Select The "Assignee Type and Assigned End Date" For Each Assignee`);
    //         this.disableUpdateButton = true;
    //       }else if(dataSource[index].assigneeTypeId > 0 && dataSource[index].endDtDisp === ""){
    //         this.commonService.openToastWarningMessage(`Kindly Select The "Assigned End Date" For Each Assignee`);
    //         this.disableUpdateButton = true;
    //       }else if((dataSource[index].assigneeTypeId === 0 && dataSource[index].endDtDisp !== "")){
    //         this.commonService.openToastWarningMessage(`Kindly Select The "Assignee Type" For Each Assignee`);
    //         this.disableUpdateButton = true;
    //       }
        
    //   }
    // }
  }

  dialogRef;

  selectedExclusiveTaxType(event) {
    if (this.inclusiveTax === 'false') {
      this.assetMainForm.controls.inclusiveTax.setValue(this.inclusiveTax);
      this.assetMainForm.controls.originalPurchaseAmt.setValue(0);
      this.assetMainForm.controls.localPurchaseAmt.setValue(0);
      this.assetMainForm.controls.localTaxAmt.setValue(0);
      this.assetMainForm.controls.totalPurchaseAmt.setValue(0);

      this.assetMainForm.controls.originalPurchaseAmt.enable();
      this.assetMainForm.controls.localPurchaseAmt.enable();
      this.assetMainForm.controls.localTaxAmt.enable();
      this.assetMainForm.controls.localTaxRate.enable();
      this.assetMainForm.controls.totalPurchaseAmt.disable();
    }
  }

  selectedInclusiveTaxType(event) {
    if (this.inclusiveTax === 'true') {
      this.assetMainForm.controls.inclusiveTax.setValue(this.inclusiveTax);
      this.assetMainForm.controls.originalPurchaseAmt.setValue(0);
      this.assetMainForm.controls.localPurchaseAmt.setValue(0);
      this.assetMainForm.controls.localTaxAmt.setValue(0);
      this.assetMainForm.controls.totalPurchaseAmt.setValue(0);
      this.assetMainForm.controls.localTaxRate.setValue(0);
      

      this.assetMainForm.controls.inclusiveTax.setValue(this.inclusiveTax);
      this.assetMainForm.controls.localTaxRate.disable();
      this.assetMainForm.controls.localTaxAmt.disable();
      this.assetMainForm.controls.totalPurchaseAmt.disable();
    }
  }

  calculateAmtByInclusiveTax() {
    if (this.assetMainForm.controls.exchangeRt.value !== 0 && this.assetMainForm.controls.exchangeRt.value !== undefined) {
      this.assetMainForm.controls.originalPurchaseAmt.setValue(Math.round((Number(this.assetMainForm.controls.totalPurchaseAmt.value) * 100) /
        ((Number(this.assetMainForm.controls.localTaxRate.value) + 100) * Number(this.assetMainForm.controls.exchangeRt.value))));

      this.assetMainForm.controls.localPurchaseAmt.setValue(Number(this.assetMainForm.controls.originalPurchaseAmt.value) *
        Number(this.assetMainForm.controls.exchangeRt.value));

      this.assetMainForm.controls.localTaxAmt.setValue(Math.round(this.assetMainForm.controls.localPurchaseAmt.value *
        (this.assetMainForm.controls.localTaxRate.value / 100)));
    } else {
      this.commonService.openToastWarningMessage('Exchange rate should be greater than 0.');
      this.assetMainForm.controls.totalPurchaseAmt.setValue(0);
    }
  }

  allocateItem(id, itemType) {
    localStorage.setItem('ItemType',itemType);
    if (this.assetMainForm.controls.assetStatusId.value === allPreInwardStatus.AWAITING_FOR_ARRIVAL || this.assetMainForm.controls.assetStatusId.value === allassetStatus.NOT_IN_STOCK) {
      if (this.assetMainForm.controls.storeId.value > 0) {
        localStorage.setItem('storeId', this.assetMainForm.controls.storeId.value);
        localStorage.setItem('storeName', this.assetMainForm.controls.storeName.value);
        localStorage.setItem('assetStatusId', this.assetMainForm.controls.assetStatusId.value)
      } else {
        this.commonService.openToastWarningMessage("Please enter the received into info");
      }
    }
    localStorage.setItem('previousFormValue',JSON.stringify(this.assetMainForm.getRawValue()));
    localStorage.setItem('assetCode', this.assetMainForm.controls.assetCode.value);
    localStorage.setItem('toAssetId', this.assetMainForm.controls.assetHdrId.value);
    localStorage.setItem('previousRoute', this.router.url);
    localStorage.setItem('ItemType', itemType);
    this.router.navigate(['home/inventory/assetStockCreate/' + id + '/' + 'add']);
  }

  riseWorkorder(event){
    if(event){
      const id = this.assetMainForm.controls.assetHdrId.value;
      this.router.navigate(['home/serviceRequest/serviceRequestCreate/'+ id]);
    }
  }

  editAssetItem(element, mode) {
      this.dialogRef = this.dialog.open(AssetItemViewComponent, {
        height: 'auto',
        width: '1200px',
        data: {
          'element': element,
          'assetHdrId': this.assetMainForm.controls.assetHdrId.value,
          'mode': mode
        }
      });
      this.dialogRef.disableClose = true;
      this.changeDetectorRefs.detectChanges();

    this.dialogRef.afterClosed().subscribe(
      data => {
        this.validateEditMode();
      }
    );
  }

  groupEditAsset(mode) {
    if (this.assetMainForm.controls.purchaseOrderNo.value !== null && this.assetMainForm.controls.purchaseOrderNo.value !== '') {
      this.dialogRef = this.dialog.open(EditAssetInfoGroupedByPoNoDialogComponent, {
        data: {
          'mode': mode,
          'inwardAssetInfo': this.assetMainForm.getRawValue()
        },
        width: "100%", height: "650px", maxWidth: "95%"
      });
      this.dialogRef.disableClose = true;
      this.dialogRef.afterClosed().subscribe(
        data => {
          if (data.status) {
            this.assetMainForm.controls.serialNo.disable();
            this.assetMainForm.controls.assetCode.disable();
            this.disableUpdateButton = true;
            const serialNoRange = `${data.batchHdr.assetList[0].serialNo} - ${data.batchHdr.assetList[data.batchHdr.assetList.length - 1].serialNo} - ${data.batchHdr.qty}`;
            const AssetCodeRange = `${data.batchHdr.assetList[0].assetCode} - ${data.batchHdr.assetList[data.batchHdr.assetList.length - 1].assetCode} - ${data.batchHdr.qty}`;
            this.assetMainForm.controls.serialNo.setValue(serialNoRange);
            this.assetMainForm.controls.assetCode.setValue(AssetCodeRange);

            this.assetMainForm.controls.departmentName.setValue(data.batchHdr.assetList[0].departmentName);
            this.assetMainForm.controls.subDepartment.setValue(data.batchHdr.assetList[0].subDepartment);
            this.assetMainForm.controls.subDepartment.setValue(data.batchHdr.assetList[0].subDepartment);
            this.assetMainForm.controls.blockName.setValue(data.batchHdr.assetList[0].blockName);
            this.assetMainForm.controls.roomName.setValue(data.batchHdr.assetList[0].roomName);
            this.assetMainForm.controls.floorName.setValue(data.batchHdr.assetList[0].floorName);
            this.assetMainForm.controls.segmentName.setValue(data.batchHdr.assetList[0].segmentName);
            this.assetMainForm.controls.functionalStatus.setValue(data.batchHdr.assetList[0].functionalStatus);
            this.assetMainForm.controls.priorityName.setValue(data.batchHdr.assetList[0].priorityName);
            this.assetMainForm.controls.riskNature.setValue(data.batchHdr.assetList[0].riskNature);
            this.assetMainForm.controls.receivedBy.setValue(data.batchHdr.assetList[0].receivedBy);
            this.assetMainForm.controls.receivedDtDisp.setValue(data.batchHdr.assetList[0].receivedDtDisp);
            this.assetMainForm.controls.expectedInstallationDtDisp.setValue(data.batchHdr.assetList[0].expectedInstallationDtDisp);
            this.assetMainForm.controls.equipmentCode.setValue(data.batchHdr.assetList[0].equipmentCode);
            this.assetMainForm.controls.description.setValue(data.batchHdr.assetList[0].description);
            this.backToPreviousPage();
          }
        }
      );
    } else {
      this.commonService.openToastWarningMessage('PoNo should not be empty.');
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
      this.assetMainForm.controls.storeName.setValue('');
      this.assetMainForm.controls.storeId.setValue(0);
      this.storeNameList = [];
      this.storePageNo = 1;
      this.checkItemAllocationValidation();
    } else {
      this.assetMainForm.controls.storeName.setValue(event.storeName);
      this.assetMainForm.controls.storeId.setValue(event.storeId);
      this.checkItemAllocationValidation();
    }

  }

  checkItemAllocationValidation() {
    if (this.assetMainForm.controls.assetStatusId.value === allPreInwardStatus.AWAITING_FOR_ARRIVAL || this.assetMainForm.controls.assetStatusId.value === allassetStatus.NOT_IN_STOCK) {
      if (this.assetMainForm.controls.storeId.value > 0) {
        this.disableItemAllocation = false;
        localStorage.setItem('storeId', this.assetMainForm.controls.storeId.value);
        localStorage.setItem('storeName', this.assetMainForm.controls.storeName.value);
      } else {
        this.disableItemAllocation = true;
      }
    } else {
      localStorage.removeItem('storeId');
      localStorage.removeItem('storeName');

    }
  }

  checkForFormValues(){
    if(localStorage.getItem('previousFormValue') !== null){
      const temp =JSON.parse(localStorage.getItem('previousFormValue'));
      this.assetMainForm.patchValue(temp);
      this.change.detectChanges();
      this.assetAssigneeDataSource = temp.assetAssigneeList;
      this.tableAssignee.renderRows();
      localStorage.removeItem('previousFormValue')
    }
  }

  keyPressNumbersWithDecimal(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  unAssignedLicenseQty(){
    let unAssignedAssetLicenseQty = [];
    let listOfAssetVolumeLicense = this.listOfAssetVolumeLicense.data;
    unAssignedAssetLicenseQty = listOfAssetVolumeLicense.filter(obj=> !(obj?.assignedTo || obj?.assignedAssetModel));

    this.unAssignedAssetLicenseQty = unAssignedAssetLicenseQty.length;
    this.assignedAssetLicenseQty = (listOfAssetVolumeLicense.length)-unAssignedAssetLicenseQty.length;
    return unAssignedAssetLicenseQty.length;
  }

  validateUnAssignedQty(event, element){
    let assignedAssetLicenseQty = [];
    let listOfAssetVolumeLicense = this.listOfAssetVolumeLicense.data;

    assignedAssetLicenseQty = listOfAssetVolumeLicense.filter(obj=> (obj?.assignedEmployeeId == element?.assignedToEmpId));

    let unAssignedAssetLicenseQty = this.unAssignedLicenseQty();

    if(event > (unAssignedAssetLicenseQty)+(assignedAssetLicenseQty.length)){
        if (element.assignedVolumeLicenseQty > 0) {
          element.assignedVolumeLicenseQty = 0;
          this.changeDetectorRefs.detectChanges();
          this.tableAssignee.renderRows();          
        }     
        this.commonService.openToastWarningMessage(`Volume License "Product Keys" Are Not Available. Kindly Import Or Generate Keys In The Volume License Tab.`);  
    }
    else if(event > assignedAssetLicenseQty.length){
      let totalAddqty = event - assignedAssetLicenseQty.length;

      listOfAssetVolumeLicense.forEach((data, i) => {
        if(!(data?.assignedTo || data?.assignedAssetModel) && totalAddqty>0){
            totalAddqty = totalAddqty-1;

            listOfAssetVolumeLicense[i].assignedTo = element.assignToEmpName
            listOfAssetVolumeLicense[i].assignedEmployeeId = element.assignedToEmpId
            listOfAssetVolumeLicense[i].status = allPreInwardStatus[allPreInwardStatus.IN_STOCK]
        }
      });
      this.listOfAssetVolumeLicense.data = listOfAssetVolumeLicense;

    }
    else if(event < assignedAssetLicenseQty.length){

      let totalDeleteqty = assignedAssetLicenseQty.length - event;
      listOfAssetVolumeLicense.forEach((data, i) => {
        if(totalDeleteqty>0 && (data.assignedEmployeeId == element?.assignedToEmpId)){
          totalDeleteqty = totalDeleteqty-1;

            listOfAssetVolumeLicense[i].assignedTo = ""
            listOfAssetVolumeLicense[i].assignedEmployeeId = ""
            listOfAssetVolumeLicense[i].status = allPreInwardStatus[allPreInwardStatus.IN_STOCK]
        }
      });
      this.listOfAssetVolumeLicense.data = listOfAssetVolumeLicense;

    }
    this.unAssignedLicenseQty();


  }

  validateRemainingProductKey(){
    let totalproductkey = this.assetMainForm.controls.volumeLicenseQty.value - this.listOfAssetVolumeLicense.data.length;
    let productKeyListQty = 0;
    for (let index = 0; index < this.productKeyArray.length; index++) {
      const element = this.productKeyArray[index];
      productKeyListQty = productKeyListQty + element.licenseQty;
    }
    this.productKeyQty = totalproductkey - productKeyListQty;
    return this.productKeyQty;
  }

  setDepreciationNumOfYears() {
    if((this.assetMainForm.controls.expectedLifeInYears.value === null) || (this.assetMainForm.controls.expectedLifeInYears.value === undefined)) {
      this.assetMainForm.controls.expectedLifeInYears.setValue(0);
    }

    if(this.assetMainForm.controls.noOfYears.value <= 0) {
      this.assetMainForm.controls.noOfYears.setValue(this.assetMainForm.controls.expectedLifeInYears.value);
      if(this.assetMainForm.controls.originalPurchaseAmt.value>0) {
        this.calculateDepRate();
      }
    }
  }

  calculateDepRate() {
    if((this.assetMainForm.controls.noOfYears.value>0) &&
    (this.assetMainForm.controls.originalPurchaseAmt.value>0)) {
      let noOfYears = parseInt(this.assetMainForm.controls.noOfYears.value);
      let deprValuePerYear = parseFloat(this.assetMainForm.controls.originalPurchaseAmt.value)/noOfYears;
      let rateOfDepreciation = (deprValuePerYear * 100)/(parseFloat(this.assetMainForm.controls.originalPurchaseAmt.value));
      this.assetMainForm.controls.rateOfDepreciation.setValue(rateOfDepreciation.toFixed(2));
    } else {
      this.assetMainForm.controls.rateOfDepreciation.setValue(0);
      this.assetMainForm.controls.noOfYears.setValue(0);
      this.assetMainForm.controls.bookedValue.setValue(0);
    }
  }

  validateRateOfDepreciation() {
    if(this.assetMainForm.controls.rateOfDepreciation.value > 100) {
      return false
    }
    else{
      return true
    }
  }

  formTwoValidation() {
//its a quick fix because this need to be done during work order

    if(this.listOfCertificates.length > 0 && this.screen === "Inward"){
      for (let index = 0; index < this.listOfCertificates.length; index++) {
        const element = this.listOfCertificates[index];
        // if (element.documentNo == '') {
        //   this.formTwoValid = false;
        //   return this.formTwoValid;
        // } else {
          this.formTwoValid = true;
        // }
      }
    }else{
      this.formTwoValid = true;
    }
    return this.formTwoValid;
  }

  assetWorkflowApproval(status){
    let result;
    let selectedAssetList = [];
    selectedAssetList.push({...this.assetMainForm.value,approvalId: this.approvalId});

    if(status){
      result = this.commonService.commonWorkflowService(allWorkflowStatus[allWorkflowStatus.ASSET_CREATE], selectedAssetList," Asset ");
    }
    else{
      result = this.commonService.rejectApprove(allWorkflowStatus[allWorkflowStatus.ASSET_CREATE], selectedAssetList," Asset ");
    }

    result.then(data=>{
      if(data){
        this.ngOnInit();
        this.backToPreviousPage();
      }
    })
  }

  assetStatusEdit;
  assigneePresent;

  editStatus(){    
    if(this.assetMainForm.controls.approvalStatusAsset.value == 'APPROVED') {
      if (this.assetAssigneeDataSource.length > 0) {
        this.assigneePresent = (this.assetAssigneeDataSource.findIndex(data => data.approvalStatus === "PENDING") !== -1);
      } else {
        this.assigneePresent = false;
      }
      this.assetStatusEdit = this.dialog.open(AssetStatusEditComponent, {
        height: '500px',
        width: '500px',
        data: {
          'assetStatusId': this.assetMainForm.controls.assetStatusId.value,
          'assetStatus': this.assetMainForm.controls.assetStatus.value,
          'assetTypeId': this.assetMainForm.controls.statusTypeId.value,
          'assetType': this.assetMainForm.controls.statusType.value,
          'assetConditionId': this.assetMainForm.controls.assetConditionId.value,
          'assetCondition': this.assetMainForm.controls.assetCondition.value,
          'assetHdrId': this.assetMainForm.controls.assetHdrId.value,
          'assigneePresent': this.assigneePresent,
          'remarks': this.assetMainForm.controls.remarks.value
        }
      });
      this.assetStatusEdit.disableClose = true;
      this.assetStatusEdit.afterClosed().subscribe(
        data => {
          if (data.status) {
            this.previousPath = "";
            this.validateEditMode();
          }
        });
      } else {
        this.commonService.openToastWarningMessage(`Kindly Approve Asset to continue Edit Status!`);  
      }
  }

  updateDepriciation(){
    if(this.assetMainForm.controls.localPurchaseAmt.value > 0){
      this.assetMainForm.controls['maintainanceThreshold'].setValue((this.assetMainForm.controls.localPurchaseAmt.value * this.assetMainForm.controls.maintainanceThresholdPer.value)/100);
      this.assetMainForm.controls['scrapValue'].setValue((this.assetMainForm.controls.localPurchaseAmt.value * this.assetMainForm.controls.scrapValuePer.value)/100);
      this.scrapValidation();
    }
  }

  calculatePer(){
    if(this.assetMainForm.controls.localPurchaseAmt.value > 0){
      this.assetMainForm.controls['scrapValue'].setValue((this.assetMainForm.controls.localPurchaseAmt.value * this.assetMainForm.controls.scrapValuePer.value)/100);
      this.scrapValidation();
    }
  }

  calculateScrapValue(){
    if(this.assetMainForm.controls.localPurchaseAmt.value > 0){
      this.assetMainForm.controls['scrapValuePer'].setValue(((100 * this.assetMainForm.controls.scrapValue.value)/this.assetMainForm.controls.localPurchaseAmt.value).toFixed(2));
      this.scrapValidation();
    }
  }

  scrapValidation(){
    if(this.assetMainForm.controls['scrapValuePer'].value > 100){
      this.commonService.openToastWarningMessage(`Scrap Value Cannot Be Greater Than Asset "Purchase Amount".`);
      this.assetMainForm.controls['scrapValue'].setValue(0);
      this.assetMainForm.controls['scrapValuePer'].setValue(0);
    }
  }


  conformationBox(content){

      let dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
        height: 'auto',
        width: '400px',
        data: {
          'confirmHeading': 'Confirmation',
          'confirmMsg' : content
        }
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(
        data => {
          if (data.status) {
            this.saveOrUpdate();
          }else{
          }
        }
      );
  }

  saveOrUpdate(){
    this.uploadAssetFlag = true;
    this.assetMainForm.controls['transactionSrc'].setValue(this.transactionSrc);
    this.assetMainForm.controls.description.setValue((this.assetMainForm.controls.description.value).trim());
    var obj = {
      'customFields': this.cusFieldHdrList != null ? this.cusFieldHdrList : [],
      'assetObj': this.assetMainForm.getRawValue()
    }
    
      this.commonService.commonInsertService('saveOrUpdateAssetInfo.sams', obj).subscribe(
        data => {
          if (data.success) {
            this.uploadAssetFlag = false;
            this.commonService.openToastSuccessMessage(data.message);
            this.backToPreviousPage();
          } else {
            this.uploadAssetFlag = false;
            this.commonService.openToastErrorMessage(data.message);
          }
        }
      );
    this.uploadAssetFlag = false;
  }


  expArrStartDataValidation(event,i){
    if(event.value){
      this.assetAssigneeDataSource[i].startDtDisp = moment(event.value).format(this.assetOptimaConstants.ISODate);
    }
    else{
      this.assetAssigneeDataSource[i].startDtDisp = "";
    }
    return false;
  }

  expArrEndDataValidation(event,i){
    if(event.value){
      this.assetAssigneeDataSource[i].endDtDisp = moment(event.value).format(this.assetOptimaConstants.ISODate);
    }
    else{
      this.assetAssigneeDataSource[i].endDtDisp = "";
    }
    this.checkForAssigneeTypeValue(this.assetAssigneeDataSource,i)
    return false;
  }

  toggleRow(element: any){        
    this.expandedElement = this.expandedElement === element ? null : element;    
  }

  deleteAssetAssignee(deleteid, index) {
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Asset Assignee '
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          if (deleteid <= 0 || deleteid == undefined) {
            this.assetAssigneeTempPush = this.assetAssigneeDataSource;
            this.assetAssigneeTempPush.splice(index, 1);
            this.assetAssigneeDataSource = this.assetAssigneeTempPush;
            this.commonService.openToastSuccessMessage("Record Deleted Successfully.");
            this.changeDetectorRefs.detectChanges();
            this.tableAssignee.renderRows();
          } else {
            this.commonService.commonGetService(this.assetOptimaServices.deleteApprovalPendingAssetAssignee, deleteid).subscribe(
              data => {
                if (data.success) {
                  this.commonService.openToastSuccessMessage(data.message);
                  this.assetAssigneeTempPush = this.assetAssigneeDataSource;
                  this.assetAssigneeTempPush.splice(index, 1);
                  this.assetAssigneeDataSource = this.assetAssigneeTempPush;
                  this.changeDetectorRefs.detectChanges();
                  this.tableAssignee.renderRows();
                } else {
                  this.commonService.openToastErrorMessage(data.message);
                }
              }
            );
          }
        }
      });
  }
  closeCurrentTab() {
    window.close();
  }

  listOfServiceProviderApproved(searchValue) {
    this.scrollApprovedServiceProvidersync = true;
    // this.assetMainForm.controls.sourceScreen.setValue(this.sourceScreenOfSupplier);
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerSiteCombo, searchValue.term, this.assetMainForm.controls.serviceProviderId.value, '', this.limitCount, this.approvedServiceProviderPageNumber, '','').subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.approvedServiceProviderPageNumber , this.ServiceProviderLocationList , data.responseData.comboList)
        this.approvedServiceProviderPageNumber = this.getData.pageNumber;
        this.ServiceProviderLocationList = this.getData.dataList;
        this.scrollApprovedServiceProvidersync = false;
      }
    );
  }

  fetchIdOfServiceProviderApproved(event) {
    if (event === undefined) {
      this.assetMainForm.get('serviceProviderSiteId').setValue(0);
      this.ServiceProviderLocationList = [];
      this.approvedServiceProviderPageNumber = 1;
    } else {
      this.assetMainForm.controls.serviceProviderSiteId.setValue(event.partnerSiteId);
      this.assetMainForm.controls.serviceProviderSiteName.setValue(event.partnerSiteName);
    }
  }

  listOfServiceProvider(searchTerms) {
    this.scrollServiceProviderNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.SERVICE_PROVIDER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchTerms.term, '', '', this.limitCount, this.ServiceProviderPageNumber, '', partnerRoles).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.ServiceProviderPageNumber , this.ServiceProviderList , data.responseData.comboList)
        this.ServiceProviderPageNumber = this.getData.pageNumber;
        this.ServiceProviderList = this.getData.dataList;
        this.scrollServiceProviderNamesync = false;
      }
    );
  }

  fetchIdOfServiceProvider(event) {
    if (event === undefined) {
      this.assetMainForm.controls['serviceProviderId'].setValue(0);
      this.assetMainForm.controls['serviceProviderName'].setValue(null);
      this.ServiceProviderList = [];
      this.ServiceProviderPageNumber = 1;
      this.assetMainForm.controls['serviceProviderSiteId'].setValue(0);
      this.assetMainForm.controls['serviceProviderSiteName'].setValue(null);
      this.ServiceProviderLocationList = [];
      this.approvedServiceProviderPageNumber = 1;
      this.assetMainForm.controls.serviceProviderSiteName.disable();
    } else {
      this.assetMainForm.controls.serviceProviderId.setValue(event.businessPartnerId);
      this.assetMainForm.controls.serviceProviderName.setValue(event.businessPartnerName);
      this.assetMainForm.controls['serviceProviderSiteId'].setValue(0);
      this.assetMainForm.controls['serviceProviderSiteName'].setValue(null);
      this.ServiceProviderLocationList = [];
      this.approvedServiceProviderPageNumber = 1;
      this.assetMainForm.controls.serviceProviderSiteName.enable();
    }
  }

  downloadPODocument() {   
    let filePath = this.docFilePath;
    let contentType = "";
    var fileName = filePath.split('.')[0];
    this.commonService.showSpinner();
    this.commonService.downloadFile(filePath, contentType).subscribe(
      data => {
        let file = filePath.split('.');
        this.commonService.showDownloadPopUp(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
        this.commonService.hideSpinner();
      }, error => {
        this.commonService.hideSpinner();
      }
    );
  }

  viewPODocument() {
    let fileData = this.commonService.downloadFileFromServerToView(this.docFilePath, "");
    this.commonService.pdfViwer(fileData, 'application/pdf');
  }

  viewAssetImage(filePath: string, contentType: string) {
    let fileData = this.commonService.downloadFileFromServerToView(filePath,"");
    this.commonService.pdfViwer(fileData, 'application/pdf');
  }

  srFunctionalityStatusComboData(searchValue) {
    this.functionlityCombo = [];
    this.scrollsyncSRFunctionlityPriority = true;
    this.funtionlityPageNumber = 1;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllSRFuntionalityCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.funtionlityPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.funtionlityPageNumber , this.functionlityCombo , data.responseData.comboList)
          this.funtionlityPageNumber = this.getData.pageNumber;
          this.functionlityCombo = this.getData.dataList;
          this.scrollsyncSRFunctionlityPriority = false;
        }
      );
  }

  selectedSRFunctionalityStatusComboData(event) {
    if (event === undefined) {
      this.assetMainForm.controls.functionalStatus.setValue('');
      this.funtionlityPageNumber = 1;
      this.functionlityCombo = [];
    } else {
      this.translateService.get([event.functionalityName])
      .subscribe((val) => {
        const status = Object.values(val)
        this.assetMainForm.controls.functionalStatus.setValue(status[0].toString());
      });
      
    }
  }

  srMaintenanceStrategyComboData(searchValue) {
    this.maintenanceStrategyCombo = [];
    this.scrollsyncMaintenanceStrategy = true;
    this.maintenanceStrategyPageNumber = 1;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfMaintenanceStrategyCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.maintenanceStrategyPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.maintenanceStrategyPageNumber , this.maintenanceStrategyCombo , data.responseData.comboList)
          this.maintenanceStrategyPageNumber = this.getData.pageNumber;
          this.maintenanceStrategyCombo = this.getData.dataList;
          this.scrollsyncMaintenanceStrategy = false;
        }
      );
  }

  selectedMaintenanceStrategyComboData(event) {
    if (event === undefined) {
      this.assetMainForm.controls.maintenanceStrategy.setValue('');
      this.maintenanceStrategyPageNumber = 1;
      this.maintenanceStrategyCombo = [];
    } else {
      this.translateService.get([event.maintenanceStrategyName])
      .subscribe((val) => {
        const status = Object.values(val)
        this.assetMainForm.controls.maintenanceStrategy.setValue(status[0].toString());
      });
      
    }
  }

  loadAssigneeComboData(searchValue) {
    this.scrollsyncAssignee = true;
    const departmentId = this.assetMainForm.controls.departmentId.value;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllEmployeeForOrgCombo.sams', searchValue.term, departmentId > 0 ? departmentId : '', '', this.recordsPerPageForCombo, this.assigneePersonPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assigneePersonPageNumber , this.assigneePersonCombo , data.responseData.comboList)
        this.assigneePersonPageNumber = this.getData.pageNumber;
        this.assigneePersonCombo = this.getData.dataList;
        this.scrollsyncAssignee = false;
      }
    );
  }

  selectedAssigneeCombo(event) {
    if (event === undefined) {
      this.assetMainForm.controls['personInChargeId'].setValue(0);
      this.assetMainForm.controls['personInCharge'].setValue('');
      this.assigneePersonPageNumber = 1;
     this.assigneePersonCombo = [];
    } else {
      this.assetMainForm.controls['personInChargeId'].setValue(event.employeeId);
      this.assetMainForm.controls['personInCharge'].setValue(event.employeeFirstName);
      this.assetMainForm.controls['employeeCode'].setValue(event.employeeCode);
      this.assetMainForm.controls['personInchargeNumber'].setValue(event.officeContactNo);
      this.assetMainForm.controls['personInChargeEmailId'].setValue(event.officeEmailId);
      for(let i=0; i<this.assetAssigneeDataSource.length; i++){
        if(this.assetAssigneeDataSource[i].defaultPersonIncharge){
          this.assetAssigneeDataSource[i].assignedToEmpId = event.employeeId;
          this.assetAssigneeDataSource[i].empCode = event.employeeCode;
        }
      }
      
    }
  }

  srPMMaintenanceStrategyComboData(searchValue) {
    this.pmMaintenanceStrategyCombo = [];
    this.scrollsyncPMMaintenanceStrategy = true;
    this.pmMaintenanceStrategyPageNumber = 1;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfMaintenanceStrategyCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.pmMaintenanceStrategyPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.pmMaintenanceStrategyPageNumber , this.pmMaintenanceStrategyCombo , data.responseData.comboList)
          this.pmMaintenanceStrategyPageNumber = this.getData.pageNumber;
          this.pmMaintenanceStrategyCombo = this.getData.dataList;
          this.scrollsyncPMMaintenanceStrategy = false;
        }
      );
  }

  selectedPMMaintenanceStrategyComboData(event) {
    if (event === undefined) {
      this.assetMainForm.controls.pmMaintenanceStrategy.setValue('');
      this.pmMaintenanceStrategyPageNumber = 1;
      this.pmMaintenanceStrategyCombo = [];
    } else {
      this.translateService.get([event.maintenanceStrategyName])
      .subscribe((val) => {
        const status = Object.values(val)
        this.assetMainForm.controls.pmMaintenanceStrategy.setValue(status[0].toString());
      });
      
    }
  }

  srPAMaintenanceStrategyComboData(searchValue) {
    this.paMaintenanceStrategyCombo = [];
    this.scrollsyncPAMaintenanceStrategy = true;
    this.paMaintenanceStrategyPageNumber = 1;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfMaintenanceStrategyCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.paMaintenanceStrategyPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.paMaintenanceStrategyPageNumber , this.paMaintenanceStrategyCombo , data.responseData.comboList)
          this.paMaintenanceStrategyPageNumber = this.getData.pageNumber;
          this.paMaintenanceStrategyCombo = this.getData.dataList;
          this.scrollsyncPAMaintenanceStrategy = false;
        }
      );
  }

  selectedPAMaintenanceStrategyComboData(event) {
    if (event === undefined) {
      this.assetMainForm.controls.paMaintenanceStrategy.setValue('');
      this.paMaintenanceStrategyPageNumber = 1;
      this.paMaintenanceStrategyCombo = [];
    } else {
      this.translateService.get([event.maintenanceStrategyName])
      .subscribe((val) => {
        const status = Object.values(val)
        this.assetMainForm.controls.paMaintenanceStrategy.setValue(status[0].toString());
      });
      
    }
  }

  srQAMaintenanceStrategyComboData(searchValue) {
    this.qaMaintenanceStrategyCombo = [];
    this.scrollsyncQAMaintenanceStrategy = true;
    this.qaMaintenanceStrategyPageNumber = 1;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfMaintenanceStrategyCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.qaMaintenanceStrategyPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.qaMaintenanceStrategyPageNumber , this.qaMaintenanceStrategyCombo , data.responseData.comboList)
          this.qaMaintenanceStrategyPageNumber = this.getData.pageNumber;
          this.qaMaintenanceStrategyCombo = this.getData.dataList;
          this.scrollsyncQAMaintenanceStrategy = false;
        }
      );
  }

  selectedQAMaintenanceStrategyComboData(event) {
    if (event === undefined) {
      this.assetMainForm.controls.qaMaintenanceStrategy.setValue('');
      this.qaMaintenanceStrategyPageNumber = 1;
      this.qaMaintenanceStrategyCombo = [];
    } else {
      this.translateService.get([event.maintenanceStrategyName])
      .subscribe((val) => {
        const status = Object.values(val)
        this.assetMainForm.controls.qaMaintenanceStrategy.setValue(status[0].toString());
      });
      
    }
  }

  calcAMCValue(){
    this.assetMainForm.controls.amcValue.setValue(Math.round(Number(this.assetMainForm.controls.localPurchaseAmt.value) *
    (Number(this.assetMainForm.controls.amcPercent.value) / 100)));
  }

  calcCMCValue(){
    this.assetMainForm.controls.cmcValue.setValue(Math.round(Number(this.assetMainForm.controls.localPurchaseAmt.value) *
    (Number(this.assetMainForm.controls.cmcPercent.value) / 100)));
  }


  assetDocumentViewValidation(value: any): boolean{
    if(value.filePath != null && value.filePath != undefined){
     var filePath = []
     filePath = value.filePath.split('/')
     var format = []
     format = filePath[(filePath.length-1)].split('.');
     let docFormat = (format[(format.length-1)]).toLowerCase();

     if(docFormat ==='jpg' || docFormat ==='png' || docFormat ==='pdf' || docFormat ==='jpeg') {
      return true;
     } else {
      return false;
     }
    } else {
      return false;
    }
  }

  openChangeAssetCodeReqCreate(element, mode) {
    let dialogRef = this.dialog.open(ChangeAssetCodeCreateComponent, {
      height: '250px',
      width: '450px',
      data: {
        'assetMainForm': this.assetMainForm.getRawValue(),
        'mode': mode,
        'assetCodeChangeReqInfo': element
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if(data === 'close') {
          this.fetchListOfAssetCodeChangeReq();
        } else if(data === 'submit') {
          setTimeout(() => {
            this.refreshSameScreen = true;
            this.underProcess = false;
            this.ngOnInit();
          }, 1000);
        }
      });
  }

  fetchListOfAssetCodeChangeReq() {
    this.commonService.commonGetService('loadAssetCodeChangeReqList.sams', this.assetMainForm.controls.assetHdrId.value).subscribe(
      (data) => {
        this.assetCodeChangeDataSource = [];
        this.assetCodeChangeDataSource = this.assetCodeChangeDataSource.concat(data.responseData);
        this.lengthAssetCodeChangeList = this.assetCodeChangeDataSource.length;
      }
    )
  }

  openChangeAssetCodeReqWFApproval(element) {
    let dialogRef = this.dialog.open(CommonWorkflowApprovalDialogComponent, {
      height: '350px',
      width: '85%',
      data: {
        'assetCodeChangeReqInfo': element
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        setTimeout(() => {
          if(data === 'close') {

          } else if(data === 'approveOrReject') {
            this.refreshSameScreen = true;
            this.underProcess = false;
            this.ngOnInit();
          }
        }, 1000);
      });
  }

}