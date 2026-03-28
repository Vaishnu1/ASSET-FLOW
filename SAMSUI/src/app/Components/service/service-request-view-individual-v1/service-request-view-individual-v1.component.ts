import { Component, OnInit, HostBinding, ViewChild, OnDestroy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ServiceRequestModel } from '../../../../app/Model/serviceRequest/serviceRequest';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../../app/Services/common-service/common.service';
import { AssetOptimaServices } from '../../../../app/Constants/AssetOptimaServices';
import { AssetOptimaConstants } from '../../../../app/Constants/AssetOptimaConstants';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceRequestViewComponent } from '../service-request-view/service-request-view.component';
import { PurchaseRequestHdr } from '../../../../app/Model/purchase/prReqHdr';
import { PurchaseReqForNhComponent } from '../purchase-req-for-nh/purchase-req-for-nh.component';
import { SrPurchaseRequestAddForNhComponent } from '../sr-purchase-request-add-for-nh/sr-purchase-request-add-for-nh.component';
import { SrViewWorkLogComponent } from '../tabs/sr-view-work-log/sr-view-work-log.component';
import { StockIndentModel } from '../../../../app/Model/inventory/stockIndent';
import { SubTicketPopupComponent } from '../sub-ticket-popup/sub-ticket-popup.component';
import { SparepartsCreateComponent } from '../../Model/subTabs/spareparts-create/spareparts-create.component';
import { AccessoriesCreateComponent } from '../../Model/subTabs/accessories-create/accessories-create.component';
import { ConsumablesCreateComponent } from '../../Model/subTabs/consumables-create/consumables-create.component';
import { ServiceRequestTrainingComponent } from '../tabs/service-request-training/service-request-training.component';
import { ServiceRequestHandOverComponent } from '../tabs/service-request-hand-over/service-request-hand-over.component';
import { SrDocumentComponent } from '../tabs/sr-document/sr-document.component';
import { UserSessionService } from '../../../../app/Services/user-session-service/user-session.service';
import { DeleteConfirmationComponent } from '../../Common-components/delete-confirmation/delete-confirmation.component';
import { HeaderComponent } from '../../Common-components/header/header.component';
import { SrUpdateStatusComponent } from '../sr-update-status/sr-update-status.component';
import { SrAssignEngineerComponent } from '../sr-assign-engineer/sr-assign-engineer.component';
import { SrReOpenComponent } from '../sr-re-open/sr-re-open.component';
import { SrAddLabourComponent } from '../tabs/sr-add-labour/sr-add-labour.component';
import { SrActivityServiceCostComponent } from '../tabs/sr-activity-service-cost/sr-activity-service-cost.component';
import { SrActivityDocComponent } from '../tabs/sr-activity-doc/sr-activity-doc.component';
import { SrActivityEmailComponent } from '../tabs/sr-activity-email/sr-activity-email.component';
import { ConfirmConfirmationComponent } from '../../Common-components/confirm-confirmation/confirm-confirmation.component';
import { UpdateInstallationWoByBatchDialogComponent } from '../update-installation-wo-by-batch-dialog/update-installation-wo-by-batch-dialog.component';
import { ModelBatchHdr } from '../../../../app/Model/base/batchHdrModel';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { allWorkflowStatus } from '../../../../app/Constants/AllStatusConstants';
import { AssetItemViewComponent } from '../../asset/asset-item-view/asset-item-view.component';
import { SrItemRequestComponent } from '../sr-item-request/sr-item-request.component';
import { SrDamageInfoComponent } from '../sr-damage-info/sr-damage-info.component';
import { ServiceRequestScreenTabs } from 'src/app/Constants/ServiceRequestScreenTabs';
import { SrFeedbackComponent } from '../sr-feedback/sr-feedback.component';
import { SrReOpenConfirmationComponent } from '../sr-re-open-confirmation/sr-re-open-confirmation.component';
import { SrUpdateRemarksComponent } from '../sr-update-remarks/sr-update-remarks.component';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';


@Component({
  selector: 'app-service-request-view-individual-v1',
  templateUrl: './service-request-view-individual-v1.component.html',
  styleUrls: ['./service-request-view-individual-v1.component.css']
})
export class ServiceRequestViewIndividualV1Component implements OnInit, OnDestroy {

  displayedColumns = ['sNo', 'indentNo', 'indentDt', 'requestBy', 'requestDt', 'totalIndentValue', 'indentStatus', 'approvedBy', 'approvedDt', 'action'];
  public serviceRequestmodel: ServiceRequestModel;

  public srId: any;
  public transactionSource: any;

  tab1= false;
  tab2 = false;
  tab3 = false;
  tab4 = false;
  tab5 = false;
  tab6 = false;
  tab7 = false;

  srBreakDownGeneralForm: FormGroup;
  srBreakDownSrDetailsForm: FormGroup;

  @ViewChild(SrViewWorkLogComponent) srViewWorkLogComponent: SrViewWorkLogComponent;
  @ViewChild('firstTab') setFocus: ElementRef;

  @ViewChild(HeaderComponent) headerComponent: HeaderComponent;


  headingDisplay: string;
  serialNoRangeForBatchUpdate: string;
  assetCodeRangeForBatchUpdate: string;
  srNoForRangeForBatchUpdate: string;

  woTabDisplay = false;
  woActivityTabDisplay = false;

  modeDisplay = false;
  assetTabDisplay = false;
  contractWarrantyTabDisplay = false;
  installationTabDisplay = false;
  srSubTicketTabDisplay = false;
  workActivityTabDisplay = false;
  activityLogTabDisplay = false;
  activityChartTabDisplay = false;
  itemReqTabDisplay = false;
  prTabDisplay = false;
  stockRequestTabDisplay = false;
  serviceReqTabDisplay = false;
  sparePartsTabDisplay = false;
  accessoriesTabDisplay = false;
  consumablesTabDisplay = false;
  trainingTabDisplay = false;
  checkListTabDisplay = false;
  srDocTabDisplay = false;
  handOverTabDisplay = false;
  gatePassTabDisplay = false;
  reopenedTabDisplay = false;
  displayBatchButton = false;
  updateByBatch = false;
  srImagesTabDisplay = false;
  srFeedbackTabDisplay = false;

  public prHdr: PurchaseRequestHdr;
  prMainDataSource = [];
  stockIndentMainDataSource = [];
  public stockIndentModel: StockIndentModel;
  batchHdrModel: ModelBatchHdr;

  length = '0';
  lengthPurchase = '0';
 
  srHistoryLength = '0';
  srServiceHistoryDataSource = [];
  srHistoryLoader = false;
  displayedSRServiceHistoryColumns = ['sno', 'srNo', 'srStatusName', 'srAttribute3Name', 'assignedTo', 'action'];

  prDisplayedColumns = ['sNo', 'poReqNo', 'poReqDtDisp', 'poReqStatus', 'grandTotal', 'createdBy', 'action'];
  tlApproved = false;

  showAccessories = false;
  accessoriesDataSource = [];
  accessoriesDispCol = ['sno', 'itemName', 'itemDesc', 'manufacturerName', 'uomCode', 'accReceivedQty', 'accConsumedQty', 'accRemainingQty','action'];
  
  showConsumables = false;
  consumablesDataSource = [];
  consumableDispCol = ['sno', 'itemName', 'itemDesc', 'manufacturerName', 'uomCode', 'conReceivedQty', 'conConsumedQty', 'conRemainingQty','action'];

  showSpareParts = false;
  sparePartsDataSource = [];
  sparePartsDisCol = ['sno', 'itemName', 'itemDesc', 'manufacturerName', 'uomCode', 'spReceivedQty', 'spConsumedQty', 'spRemainingQty','action'];
  @ViewChild('matSpareParts') spareParts: MatTable<any>;

  subTicketsDataSource = [];
  subTicketsDisCol = ['sno', 'srNo', 'srStatusName', 'srPriority', 'srType', 'assignedTo', 'srOpenedDtDisp', 'srAckDtDisp', 'srClosedDtDisp', 'subTicketFor', 'action']
  lengthStock = '0';
  subLoaderStockIndentMain = false;

  documentDataSource: any = [];
  documentDisCol = ['sno', 'docName', 'docType', 'createdBy', 'createdDtDisp', 'action'];

  trainingDataSource: any = [];
  srTrainingLoader = false;
  trainingDisCol = ['sno', 'trainingTypeName', 'trainingCompany', 'trainingDtDispView', 'traineerName', 'traineerContactNo', 'traineerEmailId', 'updatedBy', 'updatedDtDisp', 'action'];

  handOverItemsDataSource: any = [];
  srHandOverLoader = false;
  handOverItemDisCol = ['sno', 'handOverItemType', 'handOverDtDispView', 'employeeNameDIsp', 'handOverRemarks', 'updatedBy', 'updatedDtDisp', 'action'];

  sparepartTempPush: any = [];
  accessoriesTempPush: any = [];
  consumablesTempPush: any = [];
  selectedSrList: any = [];
  selectedSrIdList: any = [];

  serviceRequestLaborModelList = [];
  displayedLabourColumns = ['sNo', 'activityDoneBy', 'serviceProvidedBy', 'activityStartDt', 'totalHrs','totalLabourCost', 'totalSpareCost', 
                            'internalEngineerCost', 'totalUsedFromCost', 'action'];

  gatePassDataSource: any = [];
  gatePassLoader = false;
  gatePassDisCol = ['sno', 'gatePassNo', 'gatePassStatus', 'deliveryTo', 'deliveryToName', 'deliveryMode', 'deliveryTakenByPerson', 'deliveryTakenByContactNo', 'deliveryTakenByEmailId', 'action'];

  reOpenedDataSource: any = [];
  reOpenedLoader = false;
  reOpenedDisCol = ['sno', 'reOpenedBy', 'reOpenedDtDisp', 'reOpenedRemarks', 'updatedBy', 'updatedDtDisp'];

  activityLogDataSource: any = [];
  activityLogLoader = false;
  activityLogColumns = ['sNo', 'transactionName', 'transactionDesc', 'fromDate', 'tat'];

  contractLength = '0';
  contractDataSource: any = [];
  contractDisplayCol = ['sno', 'contractNo', 'coverageType', 'contractingPartyType','contactInfo',
    'contractStatus', 'contractStartDtDisp', 'active', 'Service']

  isHideTab = false;
  closedSubTicketCount = 0;
  backButtonHeadingDisplay= '';
  selectedIndex= 0;
  disableSubTicketAddButton = false;
  isAllSubTicketsClosed = true;

  reAssignBtn = false;
  ackBtn  = false;
	completeBtn  = false;
	reOpenBtn  = false;
	closeBtn  = false;
	wfAppBtn  = false;

  count = 0;

  employeeId = 0;
  approvalId = '0';

  tabsList = ServiceRequestScreenTabs;
  
  insExternalEnggInfo = false;

  installationDoneBy = [
    { id: 1, name: 'INTERNAL' },
    { id: 2, name: 'EXTERNAL' }
  ];

  installationProvidedBy = [
    { id: 1, name: 'MANUFACTURER' },
    { id: 2, name: 'SUPPLIER' }
  ];

  //COMBO
  personInchargeCombo: any = [];
  personInchargePageNumber: number;
  scrollsyncPersonIncharge = false;
  recordsPerPageForCombo: string;

  scrollSuppliersync = false;
  supplierListPageNumber: number;
  supplierList: any = [];

  scrollManufacturersync = false;
  manufacturerListPageNumber: number;
  manufacturerList: any = [];

  priorityCombo: any = [];
  scrollsyncPriority = false;
  priorityPageNumber: number;

  severityCombo: any = [];
  scrollsyncSeverity = false;
  severityPageNumber: number;

  limitCount: any;

  currentDate = new Date();
  receivedDate: Date;

  disableHandOver  = false;
  handoverCompleted  = false;
  approve: string;

  //THIS IS USED TO STORE SRTYPE LOCAL. BECAUSE LOADSERVICEDETAILS METHOD IS COMMONLY USED.
  //WHICH IS RESTTING THE SRTYPE IN THE FORMCONTROL
  srTypeTemp = '';
  activetab: any;
  previousPath: any;
  screen: string;
  wo_id: number;
  mode: any;
  srStatusId: any;
  formOneValid: boolean;
  formTwoValid: boolean;

  //SR IMAGES UPLOADED FROM MOBILE APP
  srCompletedImagesDisp = [];
  srCreatedImagesDisp = [];
  srFeedbackCallerSignDisp = [];

  isAssetInfoPanelExpanded : boolean = false;
  isContractInfoPanelExpanded : boolean = false;
  isServiceDetailsInfoPanelExpanded : boolean = false;

  isWorkActivityInfoPanelExpanded : boolean = true;
  isActivityLogInfoPanelExpanded : boolean = false;
  isActivityChartInfoPanelExpanded : boolean = false;

  isSubTicketsInfoPanelExpanded : boolean = false;
  isCheckPointsInfoPanelExpanded : boolean = false;

  isGatePassInfoPanelExpanded : boolean = true;
  isWoReopenedInfoPanelExpanded : boolean = false;
  isHandOverInfoPanelExpanded : boolean = false;

  isDocumentsInfoPanelExpanded : boolean = true;
  isWoImagesInfoPanelExpanded : boolean = false;
  isWoFeedbackInfoPanelExpanded : boolean = false;
  woReassignModuleAccess: ModuleAccessModel;

  checkSRActivityClose: boolean = false;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly commonService: CommonService,
              private readonly assetOptimaConstants: AssetOptimaConstants,
              private readonly router: Router,
              private readonly dialog: MatDialog,
              private readonly location: Location,
              private readonly changeDetectorRefs: ChangeDetectorRef,
              private readonly userSessionService: UserSessionService,
              private readonly assetOptimaServices: AssetOptimaServices) {

    this.personInchargePageNumber = 1;
    this.supplierListPageNumber = 1;
    this.manufacturerListPageNumber = 1;
    this.priorityPageNumber = 1;
    this.severityPageNumber = 1;
    this.approve = 'APPROVED';

    this.prHdr = new PurchaseRequestHdr();
    this.stockIndentModel = new StockIndentModel();
    this.batchHdrModel = new ModelBatchHdr();
    this.woReassignModuleAccess = new ModuleAccessModel();
  }

  @HostBinding('@.disabled') disabled = true

  ngOnInit() {
    this.woReassignModuleAccess = this.userSessionService.getUserGroupAccess()['GROUPACCESS_WO_REASSIGN'];

    this.tlApproved = this.assetOptimaConstants.tlApproved;
    this.activatedRoute.params.subscribe(
      params => {
        let primaryId = params.pId;
        primaryId = Number(primaryId);
        this.srId = primaryId;
        this.transactionSource = '';
      });
    this.selectedIndex = 0;

    this.validateEditMode();

    this.srBreakDownGeneralForm = new FormGroup({
      orgId: new FormControl(0),
      locationName: new FormControl(''),
      locationId: new FormControl(0),
      departmentName: new FormControl(''),
      departmentId: new FormControl(0),

      assignedTo: new FormControl(''),
      assignedToId: new FormControl(0),
      assignedToContactNo: new FormControl(''),
      assignedBy: new FormControl(''),
      assignedDtDisp: new FormControl(''),

      reAssignedToId: new FormControl(0),
      reAssignedTo: new FormControl(''),
      reAssignedDt: new FormControl(''),
      reAssignedDtDisp: new FormControl(''),
      reAssignedBy: new FormControl(''),
      reAssignedStatus: new FormControl(''),
      srRemarks: new FormControl(''),

      assetCode: new FormControl(''),
      assetDescription: new FormControl(''),
      subDepartment: new FormControl(''),
      callerName: new FormControl(''),
      callerContactNo: new FormControl(''),
      problemReported: new FormControl(''),
      srPriority: new FormControl(''),
      srSeverity: new FormControl(''),
      assetId: new FormControl(0),
      assetSerialNo: new FormControl(''),
      modelId: new FormControl(0),
      modelName: new FormControl(''),
      assetGroupId: new FormControl(0),
      assetGroupName: new FormControl(''),
      maintenanceType: new FormControl(''),
      subDepartmentId: new FormControl(0),
      srType: new FormControl(''),
      assetCategoryId: new FormControl(0),
      assetCategoryName: new FormControl(''),
      assetTypeName: new FormControl(''),
      assetTypeId: new FormControl(0),
      functionality: new FormControl(''),
      ecs: new FormControl(''),
      efs: new FormControl(''),
      manufacturerId: new FormControl(''),
      manufacturerName: new FormControl(''),
      equipmentCode: new FormControl(''),
      srAttribute3Name: new FormControl(''),
      srAttribute4Name: new FormControl(''),
      srAttribute5Name: new FormControl(''),

      assetStatusId: new FormControl(0),
      assetStatus: new FormControl(''),
      srId: new FormControl(0),
      srNo: new FormControl(''),
      srStatusId: new FormControl(0),
      srStatusName: new FormControl(''),
      srStatusTemp: new FormControl(''),
      problemObserved: new FormControl(''),
      actionTaken: new FormControl(''),
      inProgressStartDateDisp: new FormControl(''),
      inProgressEndDateDisp: new FormControl(''),
      startTime: new FormControl(''),
      endTime: new FormControl(''),
      srOpenedDtDisp: new FormControl(''),
      srAckDtDisp: new FormControl(''),
      date3Disp: new FormControl(''),
      srWorkStartDtDisp: new FormControl(''),
      srCompletedDtDisp: new FormControl(''),
      srClosedDtDisp: new FormControl(''),

      srOpenedDt: new FormControl(''),
      srClosedDt: new FormControl(''),

      totalDownHrs: new FormControl(''),
      totalDownHrsStr : new FormControl(''),
      warrentyStartDtDisp: new FormControl(''),
      warrentyEndDtDisp: new FormControl(''),
      warrantyCoveragePart: new FormControl(''),
      warrantyCoverageLabor: new FormControl(''),
      warrentyEndDtForLaborDisp: new FormControl(''),
      parentSrId: new FormControl(0),
      isParent: new FormControl(''),
      subTicketList: new FormControl([]),
      closedSubticketCount: new FormControl(0),
      subTicketCount: new FormControl(0),

      assetRisk: new FormControl(''),
      assetPriority: new FormControl(''),
      assetFloor: new FormControl(''),
      assetBlock: new FormControl(''),
      assetSegment: new FormControl(''),
      assetRoom: new FormControl(''),

      installationType: new FormControl(''),
      actualInstalledDtDisp: new FormControl(''),
      expectedInstallationDtDisp: new FormControl(''),
      installationRemarks: new FormControl(''),

      poNo: new FormControl(''),
      poDtDisp: new FormControl(''),
      businessPartnerName: new FormControl(''),
      supplierContactPerson: new FormControl(''),
      supplierContactNo: new FormControl(''),

      installedBy: new FormControl(''),
      installationDtDisp: new FormControl(''),

      totalServiceCost: new FormControl(0),

      accReceivedQty: new FormControl(''),
      accConsumedQty: new FormControl(''),
      accRemainingQty: new FormControl(''),

      conReceivedQty: new FormControl(''),
      conConsumedQty: new FormControl(''),
      conRemainingQty: new FormControl(''),

      spReceivedQty: new FormControl(''),
      spConsumedQty: new FormControl(''),
      spRemainingQty: new FormControl(''),

      receivedDtDisp: new FormControl(''),
      doNo: new FormControl(''),
      doDtDisp: new FormControl(''),
      invoiceValue: new FormControl(''),

      installationDoneBy: new FormControl('', [Validators.required]),
      installedInternalEngId: new FormControl('0'),
      installedInternalEngName: new FormControl(''),
      insExtEngineerName: new FormControl(''),
      insExtEngineerContactNo: new FormControl('', [Validators.pattern(this.assetOptimaConstants.phoneNumberValidation)]),
      insExtEngineerEmailId: new FormControl('', [Validators.pattern(this.assetOptimaConstants.emailValidation)]),
      installationProvidedBy: new FormControl(''),
      installationProvidedById: new FormControl('0'),
      installationProvidedByName: new FormControl(''),

      updatedBy: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      isPartiallyWork: new FormControl(''),
      holdWO: new FormControl(''),
      holdWODisp: new FormControl(''),
      isPartiallyWorkingDisp: new FormControl(''),
      partiallyWorkingReason: new FormControl(''),

      reAssignBtn: new FormControl(''),
      ackBtn : new FormControl(''),
      completeBtn : new FormControl(''),
      reOpenBtn : new FormControl(''),
      closeBtn : new FormControl(''),
      wfAppBtn : new FormControl(''),
      sumOfHours : new FormControl(''),
      sumOfDays : new FormControl(''),
      handoverCompletedDtDisp : new FormControl(''),
      handoverCompletedStatus : new FormControl(false),
      handoverCompletedDt : new FormControl(''),
      selectedSrIdList: new FormControl([]),
      updateByBatch: new FormControl(false),
      batchHdrId: new FormControl(0),

      scheduleDtlId: new FormControl(0),
      srEFSValue : new FormControl(''),
      srEFSValueId : new FormControl(''),
      physicalDamageDisp : new FormControl(''),
      physicalDamageDescription : new FormControl(''),
      patientIncidentDisp : new FormControl(''),
      incidentDescription : new FormControl(''),
      // used for asset code unknown use case
      assetCodeUpdated :  new FormControl(''),
      srCompletedImages: new FormControl(null),
      srCreateImages: new FormControl(null),
      srFeedbackCallerSign: new FormControl(null),
      srFeedback : new FormControl(''),
      srFeedbackCallerRemarks : new FormControl(''),
      efsSoftDate : new FormControl(''),
      srTypeName : new FormControl(''),
      assetCondition: new FormControl(''),
    })
    
    //To fetch all service details on that particular asset
    this.srBreakDownSrDetailsForm = new FormGroup ({
      assetId: new FormControl(0)
    });
  }

  validateEditMode() {
    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        this.activetab =  params.tab;
        primaryId = Number(primaryId);
        this.wo_id = Number(primaryId);
        var mode = params.mode;
        this.mode = params.mode;

        if(this.screen !== "" && !this.previousPath){
          this.previousPath = this.screen;``
         this.commonService.commonGetService('getServiceRequestById.sams', primaryId).subscribe(
            data => {  

              this.srBreakDownGeneralForm.patchValue(data.responseData); 
              
              if ( data.responseData.assetHdrTO) {
                  this.srBreakDownGeneralForm.controls.poNo.setValue(data.responseData.assetHdrTO.purchaseOrderNo);
                  this.srBreakDownGeneralForm.controls.businessPartnerName.setValue(data.responseData.assetHdrTO.businessPartnerName);
                  this.srBreakDownGeneralForm.controls.supplierContactPerson.setValue(data.responseData.assetHdrTO.businessPartnerContactPersonName);
                  this.srBreakDownGeneralForm.controls.supplierContactNo.setValue(data.responseData.assetHdrTO.businessPartnerSiteContactNo);
              }        
              
              this.srTypeTemp = data.responseData.srType;
              this.srTabEnable(this.srBreakDownGeneralForm.controls.srType.value);
              
              this.srStatusId = this.srBreakDownGeneralForm.controls.srStatusId.value;
              this.srBreakDownGeneralForm.controls.srStatusId.setValue(data.responseData.srStatusId);
              this.srBreakDownGeneralForm.controls.srStatusName.setValue(data.responseData.srStatusName);

              this.contractDataSource = data.responseData.assetHdrTO.contractList;
              this.contractLength = this.contractDataSource.length;

              if (data.responseData.assetHdrTO.purchaseDtDisp !== null && data.responseData.assetHdrTO.purchaseDtDisp !== '') {
                this.srBreakDownGeneralForm.controls.poDtDisp.setValue(this.commonService.convertToDateStringdd_mm_yyyy(data.responseData.assetHdrTO.purchaseDtDisp));
              }
              if (data.responseData.assetHdrTO.expectedInstallationDtDisp !== null && data.responseData.assetHdrTO.expectedInstallationDtDisp !== '') {
                this.srBreakDownGeneralForm.controls.expectedInstallationDtDisp.setValue(this.commonService.convertToDateStringdd_mm_yyyy(data.responseData.assetHdrTO.expectedInstallationDtDisp));
              }
               if (data.responseData.assetHdrTO.installationDtDisp !== null && data.responseData.assetHdrTO.installationDtDisp !== '') {
                this.srBreakDownGeneralForm.controls.installationDtDisp.setValue(this.commonService.convertToDateStringdd_mm_yyyy(data.responseData.assetHdrTO.installationDtDisp));
              }
              if (data.responseData.assetHdrTO.receivedDtDisp !== null && data.responseData.assetHdrTO.receivedDtDisp !== '') {
                this.srBreakDownGeneralForm.controls.receivedDtDisp.setValue(this.commonService.convertToDateStringdd_mm_yyyy(data.responseData.assetHdrTO.receivedDtDisp));
                this.receivedDate = this.srBreakDownGeneralForm.controls.receivedDtDisp.value;            }
              if (data.responseData.assetHdrTO.doDtDisp !== null && data.responseData.assetHdrTO.doDtDisp !== '') {
                this.srBreakDownGeneralForm.controls.doDtDisp.setValue(this.commonService.convertToDateStringdd_mm_yyyy(data.responseData.assetHdrTO.doDtDisp));
              }

              this.srBreakDownGeneralForm.controls.assetStatus.setValue(data.responseData.assetHdrTO.assetStatus);
              this.srBreakDownGeneralForm.controls.doNo.setValue(data.responseData.assetHdrTO.doNo);
              this.srBreakDownGeneralForm.controls.invoiceValue.setValue(data.responseData.assetHdrTO.invoiceValue);
              this.srBreakDownGeneralForm.controls.installationType.setValue(data.responseData.assetHdrTO.installationType);
              this.srBreakDownGeneralForm.controls.assetDescription.setValue(data.responseData.assetHdrTO.description);
              this.srBreakDownGeneralForm.controls.equipmentCode.setValue(data.responseData.assetHdrTO.equipmentCode);

              this.srBreakDownGeneralForm.controls.assetCondition.setValue(data.responseData.assetHdrTO.assetCondition);

              if (this.srBreakDownGeneralForm.controls.installationDoneBy.value === null || this.srBreakDownGeneralForm.controls.installationDoneBy.value === '') {
                if (this.srBreakDownGeneralForm.controls.installationType.value === 'SELF INSTALLATION') {
                  this.srBreakDownGeneralForm.controls.installationDoneBy.setValue('INTERNAL');
                  this.insExternalEnggInfo = false;
                } else {
                  this.insExternalEnggInfo = true;
                }
              } else {
                if (this.srBreakDownGeneralForm.controls.installationDoneBy.value === 'INTERNAL') {
                  this.insExternalEnggInfo = false;
                } else {
                  this.insExternalEnggInfo = true;
                }
              }

              if (this.accessoriesTabDisplay === true) {
                this.fetchListOfSRAccessories();
              }
              if (this.consumablesTabDisplay === true) {
                this.fetchListOfSRConsumables();
              }
              if (this.sparePartsTabDisplay === true) {
                this.fetchListOfSRSpareparts();
              } 

              if (this.srSubTicketTabDisplay === true) { 
                this.subTicketsDataSource = data.responseData.subTicketList;
              }

              if (this.trainingTabDisplay === true) {
                this.loadSrTrainingList();
              }

              if (this.handOverTabDisplay === true) {
                this.loadSrHandOverList();
              }

              if (this.srDocTabDisplay === true) {
                this.fetchListOfSRDocs();
              }

              if (this.prTabDisplay === true) {
                this.listOfAllPurchaseRequestList(this.srBreakDownGeneralForm.controls.srId.value);
              }

              if (this.stockRequestTabDisplay === true) {
                this.listOfAllStockIndentList(this.srBreakDownGeneralForm.controls.srId.value);
              }

              if (this.gatePassTabDisplay === true) {
                this.listOfAllGatePassList(this.srBreakDownGeneralForm.controls.srId.value);
              }

              if (this.serviceReqTabDisplay === true) {
                this.srBreakDownSrDetailsForm.controls.assetId.setValue(this.srBreakDownGeneralForm.controls.assetId.value);
                this.loadServiceDetailsList();
              }

              if (this.reopenedTabDisplay === true) {
                this.loadReOpenedList(this.srBreakDownGeneralForm.controls.srId.value);
              }

              this.fetchSRActivityList(this.srBreakDownGeneralForm.controls.srId.value);
              this.loadActivityLogList();

              let currentDate: Date = new Date();
              let currentDateInMillisecod = currentDate.getTime();
              let srOpenedDt: any = this.srBreakDownGeneralForm.controls.srOpenedDt.value;
              let currentDateInMillisecodDate1 = srOpenedDt.time;

              this.validateTab(this.srBreakDownGeneralForm.controls.parentSrId.value);
              this.getCountOfClosedSubTickets(this.subTicketsDataSource);


              if (this.srBreakDownGeneralForm.controls.parentSrId.value === 0) {
                this.showWaringIfsubTicketIsNotClosed();
                this.disableAddButtonForSubTicket(this.srBreakDownGeneralForm.controls.srStatusId.value);
              }
              if (this.srBreakDownGeneralForm.controls.srStatusId.value === '7') {
                let srClosedDt: any = this.srBreakDownGeneralForm.controls.srClosedDt.value;
                let currentDateInMillisecodDate6 = srClosedDt.time;
                this.srBreakDownGeneralForm.controls.totalDownHrs.setValue(this.commonService.CalculateMilliSecondDateinhh_mm(currentDateInMillisecodDate6, currentDateInMillisecodDate1));
              }
              else {
                this.srBreakDownGeneralForm.controls.totalDownHrs.setValue(this.commonService.CalculateMilliSecondDateinhh_mm(currentDateInMillisecod, currentDateInMillisecodDate1));
              }

              if(this.srTypeTemp === 'BM') {
                this.transactionSource = allWorkflowStatus[allWorkflowStatus.WO_BD];
              } else if(this.srTypeTemp === 'PM') {
                this.transactionSource = allWorkflowStatus[allWorkflowStatus.WO_PM];
              } else if(this.srTypeTemp === 'PA') {
                this.transactionSource = allWorkflowStatus[allWorkflowStatus.WO_PA];
              } else if(this.srTypeTemp === 'QA') {
                this.transactionSource = allWorkflowStatus[allWorkflowStatus.WO_QA];
              } else if(this.srTypeTemp === 'INSTALLATION' && this.srStatusId === 17) {
                this.transactionSource = allWorkflowStatus[allWorkflowStatus.WO_HANDOVER];
              } else if(this.srTypeTemp === 'INSTALLATION') {
                this.transactionSource = allWorkflowStatus[allWorkflowStatus.WO_INSTALLATION];
              }
              this.getWorkflowApprovalForSR(); 
 
              if(data.responseData.srStatusName === "RE-OPENED"){
                this.reopenedTabDisplay = true;
                this.loadReOpenedList(this.srBreakDownGeneralForm.controls.srId.value);
              }

              this.reAssignBtn = data.responseData.reAssignBtn;
              this.ackBtn = data.responseData.ackBtn;
              this.completeBtn = data.responseData.completeBtn;
              this.reOpenBtn = data.responseData.reOpenBtn;
              this.closeBtn = data.responseData.closeBtn;
              this.wfAppBtn = data.responseData.wfAppBtn;


              this.disableUpdateHandOverDateButton(this.srBreakDownGeneralForm.controls.handoverCompletedStatus.value)
              this.getBatchDetails();

              if(this.updateByBatch) {
                this.srBreakDownGeneralForm.controls.updateByBatch.setValue(true);
                this.srBreakDownGeneralForm.controls.selectedSrIdList.setValue(this.selectedSrIdList);
              }

              //SR ACTIVITY IMAGES FROM MOBILE APP              
              if(this.srBreakDownGeneralForm.controls.srCreateImages.value != null) {
                this.srCreatedImagesDisp = [];
                let srCreatedImagesList = (this.srBreakDownGeneralForm.controls.srCreateImages.value).split(";");
                srCreatedImagesList.forEach(element => {
                  if(element != '') {                    
                    this.srCreatedImagesDisp.push(this.assetOptimaConstants.getServerURL()+"downloadFileFromServer.sams?fileName="+element.trim()+"&contentType=image/png");
                  }
                });                
              }

              //SR COMPLETED IMAGES FROM MOBILE APP
              if(this.srBreakDownGeneralForm.controls.srCompletedImages.value != null) {
                this.srCompletedImagesDisp = [];
                let srCompletedImagesList = (this.srBreakDownGeneralForm.controls.srCompletedImages.value).split(";");
                srCompletedImagesList.forEach(element => {
                  if(element != '') {                    
                    this.srCompletedImagesDisp.push(this.assetOptimaConstants.getServerURL()+"downloadFileFromServer.sams?fileName="+element.trim()+"&contentType=image/png");
                  }
                });                
              }

              //SR CLOSED IMAGES FROM MOBILE APP
              if(this.srBreakDownGeneralForm.controls.srFeedbackCallerSign.value != null) {
                this.srFeedbackCallerSignDisp = [];
                let srFeedbackCallerSignList = (this.srBreakDownGeneralForm.controls.srFeedbackCallerSign.value).split(";");
                srFeedbackCallerSignList.forEach(element => {
                  if(element != '') {                    
                    this.srFeedbackCallerSignDisp.push(this.assetOptimaConstants.getServerURL()+"downloadFileFromServer.sams?fileName="+element.trim()+"&contentType=image/png");
                  }
                });                
              }

            });
          if (mode === 'view') {
            this.headingDisplay = "View";
          } else {
            this.modeDisplay = true;
            this.headingDisplay = "Edit";
          } 
      }
        else{
          return null;
        }
      }
    );
    this.formValidation();
  }

  approvalSR(status) {
    if(status == '6' && this.srBreakDownGeneralForm.controls.srEFSValue.value != 'UP'){
        this.commonService.openToastWarningMessage("Kindly Change EFS status to UP");
    }else{
      this.srBreakDownGeneralForm.controls.srStatusId.setValue(status);
    if(this.srBreakDownGeneralForm.controls.updateByBatch.value) {
      this.checkConfirmationForBatchUpdate('approvalSR');
    } else {
      if(status == '7'){
        this.openFeedback();
      }else{
        this.checkForConfirmationForApprovalSr();
      }
      
    }

    }
    
  }

  checkForConfirmationForApprovalSr() {
    this.commonService.commonInsertService('saveUpdateApprovalsServiceRequest.sams', this.srBreakDownGeneralForm.getRawValue()).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage('Work Order ' + data.responseData + ' successfully.');
          this.refresh();
          this.navigateBackOnBatchUpdate();
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {

      }
    );
  }

  back() {
    this.selectedIndex = 0;
    if (this.srBreakDownGeneralForm.controls.parentSrId.value > 0) {
      this.router.navigate(['home/serviceRequest/serviceView/' + this.srBreakDownGeneralForm.controls.parentSrId.value + '/' + this.mode +"/sr_sub_tickects"]);
    } else {
      this.router.navigate(['home/serviceRequest/serviceRequestList']);
    }
  }

  ngOnDestroy() {
    //this.dialogRef.close();
  }

  raisePurchaseRequest(id, mode) {
    if (this.assetOptimaConstants.orgPurchaseReqForNHModule) {
      let dialogRefNH = this.dialog.open(PurchaseReqForNhComponent, {
        height: '22%',
        width: '55%',
        position: { top: '1em' },
        data: {
        }
      });
      dialogRefNH.disableClose = true;
      dialogRefNH.afterClosed().subscribe(
        data => {
          if (data.exit) {
            let dialogRef1 = this.dialog.open(SrPurchaseRequestAddForNhComponent, {
              height: '80%',
              width: '80%',
              data: {
                'srModel': this.srBreakDownGeneralForm.value,
                'prFor': data.form
              }
            });
            dialogRef1.afterClosed().subscribe(
              data => {
                this.listOfAllPurchaseRequestList(this.srBreakDownGeneralForm.controls.srId.value);
              });
          }
        });
    } else {
      this.router.navigate(['home/purchase/purchaseRequestCreate/' + id + '/' + mode]);
      localStorage.setItem('srId', this.srBreakDownGeneralForm.controls.srId.value);
      localStorage.setItem('srNumber', this.srBreakDownGeneralForm.controls.srNo.value);
      localStorage.setItem('assetHdrId', this.srBreakDownGeneralForm.controls.assetId.value);
      localStorage.setItem('assetCode', this.srBreakDownGeneralForm.controls.assetCode.value);
    }
  }

  listOfAllPurchaseRequestList(srId) {
    this.commonService.commonGetService('getRFSByServiceRequestId.sams', srId).subscribe(
      data => {
        if (data.success) {
          this.lengthPurchase = data.responseData.poItemList.length;
          this.prMainDataSource = data.responseData.poItemList;
        } else {
          this.commonService.openToastErrorMessage("Error occurred while fetching po Item list")
        }
      }, error => {
      }
    );
  }

  listOfAllStockIndentList(srId) {
    this.stockIndentModel.srId = srId;
    this.commonService.commonListService('fetchListOfAllStockIndentDetails.sams', this.stockIndentModel).subscribe(
      data => {
        if (data.success) {
          this.lengthStock = data.responseData.dataTotalRecCount;
          this.stockIndentMainDataSource = data.responseData.dataList;
        } else {
           this.commonService.openToastErrorMessage("Error occurred while fetching stock indent details")
        }
      }, error => {
      }
    );
  }

  viewServiceRequestScreen(id?: number, mode?: string) {
    this.router.navigate(['home/purchase/purchaseRequestCreate/' + id + '/' + mode]);
  } 

  navigateBackToService() {
    this.location.back();
  }

  openReassignPopUp(srId) {
    let dialogRef = this.dialog.open(SrAssignEngineerComponent, {
      height: 'auto',
      width: '1200px',
      data: {
        'modelId': this.srBreakDownGeneralForm.controls.modelId.value,
        'locationId': this.srBreakDownGeneralForm.controls.locationId.value,
        'assignedToId': this.srBreakDownGeneralForm.controls.assignedToId.value,
        'assignedDate': this.srBreakDownGeneralForm.controls.assignedDtDisp.value
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {        
        if (data.exit) {
          this.srBreakDownGeneralForm.controls.reAssignedTo.setValue(data.assignEmpName);
          this.srBreakDownGeneralForm.controls.reAssignedToId.setValue(data.assignEmpId);
          this.srBreakDownGeneralForm.controls.assignedTo.setValue(data.assignEmpName);
          this.srBreakDownGeneralForm.controls.assignedToId.setValue(data.assignEmpId);
          this.srBreakDownGeneralForm.controls.assignedToContactNo.setValue(data.officeContactNo);
          this.srBreakDownGeneralForm.controls.assignedDtDisp.setValue(data.assignedDtDisp);
          if(this.srBreakDownGeneralForm.controls.updateByBatch.value) {
            this.checkConfirmationForBatchUpdate('reassignServiceRequest');
          } else {
          this.reassignServiceRequest();
          }
        }
      });
  }

  reassignServiceRequest() {
    this.commonService.commonInsertService('reassignServiceRequest.sams', this.srBreakDownGeneralForm.value).subscribe(
      data => {
        if (data.success) {
          this.refresh();
          this.commonService.openToastSuccessMessage('Reassigned Successfully.');
          this.navigateBackOnBatchUpdate();
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
      }
    );
  }

  loadServiceDetailsList() {
    this.srHistoryLoader = true;
    this.srServiceHistoryDataSource = [];
    this.srBreakDownGeneralForm.controls.srType.setValue('');
    this.commonService.commonListService('fetchListOfServiceRequest.sams', this.srBreakDownSrDetailsForm.value).subscribe(
      data => {
        if (data.success) {
          this.srBreakDownGeneralForm.controls.srType.setValue(this.srTypeTemp);
          this.srServiceHistoryDataSource = data.responseData.dataList;
          this.srHistoryLength = data.responseData.dataTotalRecCount;
          this.srHistoryLoader = false;
        } else {
          this.srHistoryLoader = false;
        }
      }, error => {
      }

    );
  }

  loadSrTrainingList() {
    this.srTrainingLoader = true;
    this.trainingDataSource = [];
    this.commonService.commonGetService('fetchSRTrainingList.sams', this.srBreakDownGeneralForm.controls.srId.value).subscribe(
      data => {
        if (data.success) {
          this.trainingDataSource = data.responseData;
          this.srTrainingLoader = false;
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.srTrainingLoader = false;
        }
      }, error => {
      }
    );
  }

  loadSrHandOverList() {
    this.srHandOverLoader = true;
    this.handOverItemsDataSource = [];
    this.commonService.commonGetService('fetchHandOverListBySRId.sams', this.srBreakDownGeneralForm.controls.srId.value).subscribe(
      data => {
        if (data.success) {
          this.handOverItemsDataSource = data.responseData;
          if(this.completeBtn){
            this.disableHandOver=false;
          }else{
            this.disableHandOver = true;
          }
          this.srTrainingLoader = false;
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.srHandOverLoader = false;
        }
      }, error => {
      }
    );
  }

  listOfAllGatePassList(srId) {
    this.gatePassLoader = true;
    this.gatePassDataSource = [];
    this.commonService.commonGetService('fetchListOfGatePassForSrId.sams', srId).subscribe(
      data => {
        if (data.success) {
          this.gatePassDataSource = data.responseData.dataList;
          this.gatePassLoader = false;
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.gatePassLoader = false;
        }
      }, error => {
      }
    );
  }

  loadReOpenedList(srId) {
    this.reOpenedLoader = true;
    this.reOpenedDataSource = [];
    this.commonService.commonGetService('fetchSRReOpenedList.sams', srId).subscribe(
      data => {
        if (data.success) {
          this.reOpenedDataSource = data.responseData.dataList;
          this.reOpenedLoader = false;
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.reOpenedLoader = false;
        }
      }, error => {

      }
    );
  }

  viewServiceRequestDtl(srId, mode) {
    this.selectedIndex = 0;
    this.router.navigate(['home/serviceRequest/serviceView/' + srId + '/' + mode +"/asset_info"]);
  }

  raiseStockEnquiry(id, mode) {
    localStorage.setItem('srId', this.srBreakDownGeneralForm.controls.srId.value);
    localStorage.setItem('srNo', this.srBreakDownGeneralForm.controls.srNo.value);
    localStorage.setItem('assetCode', this.srBreakDownGeneralForm.controls.assetCode.value);
    localStorage.setItem('assetId',this.srBreakDownGeneralForm.controls.assetId.value);
    this.router.navigate(['home/inventory/stockIndentCreate/' + id + '/' + mode]);
  }

  createStockIndent(indentHdrId?: number, mode?: string) {
    this.router.navigate(['home/inventory/stockIndentCreate/' + indentHdrId + '/' + mode]);
  }

  generateStockIndentPDF(indentHdrId?: number) {
    this.commonService.showSpinner();
    this.commonService.commonGetService('generateStockIndentPdf.sams', indentHdrId).subscribe(
      data => {
        if (data.success) {
          this.downloadDocument(data.responseData, 'application/pdf');
        } else {
          this.commonService.openToastErrorMessage("Error occurred while downloading document")
        }
      }, error => {
      }
    );
    this.commonService.hideSpinner();
  }

  downloadDocument(filePath: string, contentType) {
    this.commonService.showSpinner();
    var fileName = filePath.split('.')[0];
    this.commonService.downloadFile(filePath, contentType).subscribe(
      data => {
        this.commonService.showDownloadPopUpPDF(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
      }
    );
    this.commonService.hideSpinner();
  }

  approveStockIndent(event) {
    this.commonService.showSpinner();
    this.commonService.commonGetService('approveStockIndent.sams', event.indentHdrId).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }
    );
    this.commonService.hideSpinner();
    this.listOfAllStockIndentList(this.srBreakDownGeneralForm.controls.srId.value);
    this.ngOnInit();
  }

  generateReport() {
    this.stockIndentModel.srId = this.srBreakDownGeneralForm.controls.srId.value;
    this.commonService.commonListService('reports/assets/generateStockIndentReport.sams', this.stockIndentModel).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      }, error => {
        // alert('error');
      }
    );
  }

  refresh() {
    this.ngOnInit();
    this.srViewWorkLogComponent.ngOnInit();
  }

  openCreateSubTicketPopUp() {
    this.serviceRequestmodel = this.srBreakDownGeneralForm.getRawValue();
    this.serviceRequestmodel.subTicketList = this.subTicketsDataSource;
    let dialogRef = this.dialog.open(SubTicketPopupComponent, {
      height: 'auto',
      width: '910px',
      data: {
        'srId': this.srId,
        'departmentId': this.srBreakDownGeneralForm.controls.departmentId,
        'serviceReqModel': this.serviceRequestmodel
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        this.validateEditMode();
      });
  }

  validateTab(parentId) {
    if (parentId > 0) {
      this.isHideTab = true;
      this.backButtonHeadingDisplay = 'Back To Parent'
    } else {
      this.isHideTab = false;
      this.backButtonHeadingDisplay = 'Back'
    }
  }

  getCountOfClosedSubTickets(subTicketList) { 
    this.closedSubTicketCount = 0;
    for (let ticket of subTicketList) {  
      if (ticket.srStatusId === 7) {
        this.closedSubTicketCount = this.closedSubTicketCount + 1;
      }
    } 
    
    if (this.closedSubTicketCount === subTicketList.length) { 
      this.isAllSubTicketsClosed = true;
    } else { 
      this.isAllSubTicketsClosed = false;
    } 
  }

  showWaringIfsubTicketIsNotClosed() {
    if (this.srBreakDownGeneralForm.controls.srStatusId.value === '6' && (this.srBreakDownGeneralForm.controls.parentSrId.value === 0) && !(this.isAllSubTicketsClosed)) {
      this.commonService.openToastWarningMessage("Please close all the sub tickets before closing a service request")
    }
  }

  disableAddButtonForSubTicket(status) {
    if (status === '6') {
      this.disableSubTicketAddButton = true;
    } else {
      this.disableSubTicketAddButton = false;
    }
  }

  srTabEnable(srType) {
    if (srType === 'INSTALLATION') {
      this.formTwoValidation();
      this.woTabDisplay = true;
      this.woActivityTabDisplay = true

      this.contractWarrantyTabDisplay = false;
      this.installationTabDisplay = true;
      this.srSubTicketTabDisplay = false;
      this.workActivityTabDisplay = true;
      this.activityLogTabDisplay = true;
      this.activityChartTabDisplay = true;
      this.itemReqTabDisplay = false;
      this.prTabDisplay = false;
      this.stockRequestTabDisplay = false;
      this.serviceReqTabDisplay = false;
      this.sparePartsTabDisplay = true;
      this.accessoriesTabDisplay = true;
      this.consumablesTabDisplay = true;
      this.trainingTabDisplay = true;
      this.checkListTabDisplay = false;
      this.srDocTabDisplay = true;
      this.handOverTabDisplay = true;
      this.gatePassTabDisplay = true;
      this.reopenedTabDisplay = false;
      this.srImagesTabDisplay = false;
    } else if (srType === 'BM') {
      this.woTabDisplay = true;
      this.woActivityTabDisplay = true

      this.contractWarrantyTabDisplay = true;
      this.installationTabDisplay = true;
      this.srSubTicketTabDisplay = true;
      this.workActivityTabDisplay = true;
      this.activityLogTabDisplay = true;
      this.activityChartTabDisplay = true;
      this.itemReqTabDisplay = true;
      this.prTabDisplay = true;
      this.stockRequestTabDisplay = true;
      this.serviceReqTabDisplay = true;
      this.sparePartsTabDisplay = false;
      this.accessoriesTabDisplay = false;
      this.consumablesTabDisplay = false;
      this.trainingTabDisplay = false;
      this.checkListTabDisplay = false;
      this.srDocTabDisplay = true;
      this.handOverTabDisplay = false;
      this.gatePassTabDisplay = true;
      this.reopenedTabDisplay = true;
      this.srImagesTabDisplay = true;
      this.srFeedbackTabDisplay = true;
    }else if (srType === 'PM') {
      this.woTabDisplay = true;
      this.woActivityTabDisplay = false

      this.contractWarrantyTabDisplay = false;
      this.installationTabDisplay = true;
      this.srSubTicketTabDisplay = false;
      this.workActivityTabDisplay = false;
      this.activityLogTabDisplay = true;
      this.activityChartTabDisplay = true;
      this.itemReqTabDisplay = true;
      this.prTabDisplay = false;
      this.stockRequestTabDisplay = false;
      this.serviceReqTabDisplay = false;
      this.sparePartsTabDisplay = false;
      this.accessoriesTabDisplay = false;
      this.consumablesTabDisplay = false;
      this.trainingTabDisplay = false;
      this.checkListTabDisplay = true;
      this.srDocTabDisplay = true;
      this.handOverTabDisplay = false;
      this.gatePassTabDisplay = true;
      this.reopenedTabDisplay = true;
      this.srImagesTabDisplay = true;
      this.srFeedbackTabDisplay = true;
    } else if (srType === 'PA') {
      this.woTabDisplay = true;
      this.woActivityTabDisplay = false

      this.contractWarrantyTabDisplay = false;
      this.installationTabDisplay = true;
      this.srSubTicketTabDisplay = false;
      this.workActivityTabDisplay = false;
      this.activityLogTabDisplay = true;
      this.activityChartTabDisplay = true;
      this.itemReqTabDisplay = true;
      this.prTabDisplay = false;
      this.stockRequestTabDisplay = false;
      this.serviceReqTabDisplay = false;
      this.sparePartsTabDisplay = false;
      this.accessoriesTabDisplay = false;
      this.consumablesTabDisplay = false;
      this.trainingTabDisplay = false;
      this.checkListTabDisplay = true;
      this.srDocTabDisplay = true;
      this.handOverTabDisplay = false;
      this.gatePassTabDisplay = true;
      this.reopenedTabDisplay = true;
      this.srImagesTabDisplay = true;
      this.srFeedbackTabDisplay = true;
    } else if (srType === 'QA') {
      this.woTabDisplay = true;
      this.woActivityTabDisplay = false

      this.contractWarrantyTabDisplay = false;
      this.installationTabDisplay = true;
      this.srSubTicketTabDisplay = false;
      this.workActivityTabDisplay = false;
      this.activityLogTabDisplay = true;
      this.activityChartTabDisplay = true;
      this.itemReqTabDisplay = true;
      this.prTabDisplay = false;
      this.stockRequestTabDisplay = false;
      this.serviceReqTabDisplay = false;
      this.sparePartsTabDisplay = false;
      this.accessoriesTabDisplay = false;
      this.consumablesTabDisplay = false;
      this.trainingTabDisplay = false;
      this.checkListTabDisplay = true;
      this.srDocTabDisplay = true;
      this.handOverTabDisplay = false;
      this.gatePassTabDisplay = true;
      this.reopenedTabDisplay = true;
      this.srImagesTabDisplay = true;
      this.srFeedbackTabDisplay = true;
    } else if (srType === 'RFS') {
      this.woTabDisplay = true;
      this.woActivityTabDisplay = false

      this.contractWarrantyTabDisplay = false;
      this.installationTabDisplay = true;
      this.srSubTicketTabDisplay = false;
      this.workActivityTabDisplay = false;
      this.activityLogTabDisplay = false;
      this.activityChartTabDisplay = false;
      this.itemReqTabDisplay = true;
      this.prTabDisplay = true;
      this.stockRequestTabDisplay = true;
      this.serviceReqTabDisplay = false;
      this.sparePartsTabDisplay = false;
      this.accessoriesTabDisplay = false;
      this.consumablesTabDisplay = false;
      this.trainingTabDisplay = false;
      this.checkListTabDisplay = false;
      this.srDocTabDisplay = true;
      this.handOverTabDisplay = false;
      this.gatePassTabDisplay = false;
      this.reopenedTabDisplay = true;
    } else if (srType === 'DR') {
      this.woTabDisplay = true;
      this.woActivityTabDisplay = false

      this.contractWarrantyTabDisplay = false;
      this.installationTabDisplay = true;
      this.srSubTicketTabDisplay = false;
      this.workActivityTabDisplay = false;
      this.activityLogTabDisplay = true;
      this.activityChartTabDisplay = true;
      this.itemReqTabDisplay = true;
      this.prTabDisplay = false;
      this.stockRequestTabDisplay = false;
      this.serviceReqTabDisplay = false;
      this.sparePartsTabDisplay = false;
      this.accessoriesTabDisplay = false;
      this.consumablesTabDisplay = false;
      this.trainingTabDisplay = false;
      this.checkListTabDisplay = true;
      this.srDocTabDisplay = true;
      this.handOverTabDisplay = false;
      this.gatePassTabDisplay = true;
      this.reopenedTabDisplay = true;
      this.srImagesTabDisplay = true;
    }else if (srType === 'PM/PA') {
      this.woTabDisplay = true;
      this.woActivityTabDisplay = false

      this.contractWarrantyTabDisplay = false;
      this.installationTabDisplay = true;
      this.srSubTicketTabDisplay = false;
      this.workActivityTabDisplay = false;
      this.activityLogTabDisplay = true;
      this.activityChartTabDisplay = true;
      this.itemReqTabDisplay = true;
      this.prTabDisplay = false;
      this.stockRequestTabDisplay = false;
      this.serviceReqTabDisplay = false;
      this.sparePartsTabDisplay = false;
      this.accessoriesTabDisplay = false;
      this.consumablesTabDisplay = false;
      this.trainingTabDisplay = false;
      this.checkListTabDisplay = true;
      this.srDocTabDisplay = true;
      this.handOverTabDisplay = false;
      this.gatePassTabDisplay = true;
      this.reopenedTabDisplay = true;
      this.srImagesTabDisplay = true;
      this.srFeedbackTabDisplay = true;
    }
  }

  sparePartsAddEdit(element, type, rowIndex) {
    let diaLogRef = this.dialog.open(SparepartsCreateComponent, {
      height: 'auto',
      width: '500px',
      data: {
        'spareParts': element,
        'mode': type
      }
    });
    diaLogRef.disableClose = true;
    if (this.sparePartsTabDisplay === true) {
      this.fetchListOfSRSpareparts();
    }
  }

  accessories(element, type, rowIndex) {
    let diaLogRef = this.dialog.open(AccessoriesCreateComponent, {
      height: 'auto',
      width: '500px',
      data: {
        'accessories': element,
        'mode': type
      }
    });
    diaLogRef.disableClose = true;
    if (this.consumablesTabDisplay === true) {
      this.fetchListOfSRAccessories();
    }
  }

  consumables(element, type, rowIndex) {
    let diaLogRef = this.dialog.open(ConsumablesCreateComponent, {
      height: 'auto',
      width: '500px',
      data: {
        'consumables': element,
        'mode': type
      }
    });
    diaLogRef.disableClose = true;
    if (this.consumablesTabDisplay === true) {
      this.fetchListOfSRConsumables();
    }
  }

  srDocAddEdit() {
    let dialogRef = this.dialog.open(SrDocumentComponent, { 
      width: '430px',
      data: {
        'srId': this.srBreakDownGeneralForm.controls.srId.value,
        'updateByBatch': this.srBreakDownGeneralForm.controls.updateByBatch.value,
        'selectedSrIdList': this.srBreakDownGeneralForm.controls.selectedSrIdList.value
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        this.fetchListOfSRDocs();
      });
  }

  fetchListOfSRDocs() {
    this.commonService.commonGetService('loadSrDoc.sams', this.srBreakDownGeneralForm.controls.srId.value).subscribe(
      (data) => {
        this.documentDataSource = [];
        this.documentDataSource = this.documentDataSource.concat(data.responseData);
        this.formTwoValidation();
      }
    )
  }

  addTrainingInfo() {

    let dialogRef = this.dialog.open(ServiceRequestTrainingComponent, {
      height: 'auto',
      width: '1200px',
      data: { 
        'srId': this.srBreakDownGeneralForm.controls.srId.value,
        'updateByBatch': this.srBreakDownGeneralForm.controls.updateByBatch.value,
        'selectedSrIdList': this.srBreakDownGeneralForm.controls.selectedSrIdList.value
      }

    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        this.validateEditMode();
      });
  }

  addHandOverInfo(srId) {
    let dialogRef = this.dialog.open(ServiceRequestHandOverComponent, {
      height: 'auto',
      width: '400px',
      data: { 
        'srId': this.srBreakDownGeneralForm.controls.srId.value,
        'updateByBatch': this.srBreakDownGeneralForm.controls.updateByBatch.value,
        'selectedSrIdList': this.srBreakDownGeneralForm.controls.selectedSrIdList.value
      }

    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        this.validateEditMode();
      });
  }

  editViewHandOverInfo(srHandOverData, type) {
    let dialogRef = this.dialog.open(ServiceRequestHandOverComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'srId': this.srBreakDownGeneralForm.controls.srId.value,
        'srHandOverData': srHandOverData,
        'type': type
      }

    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        this.validateEditMode();
      });
  }

  editViewTrainingInfo(srTrainingData, type) {
    let dialogRef = this.dialog.open(ServiceRequestTrainingComponent, {
      height: 'auto',
      width: '1200px',
      maxWidth: "90%",
      maxHeight: "500px",
      data: {
        'srId': this.srBreakDownGeneralForm.controls.srId.value,
        'srTrainingData': srTrainingData,
        'type': type
      }

    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        this.validateEditMode();
      });
  }

  getWorkflowApprovalForSR() {
    this.commonService.commonGetService('getWorkflowForId.sams', this.srBreakDownGeneralForm.controls.srId.value,
      this.userSessionService.getUserEmpId(),
      this.transactionSource, this.userSessionService.getUserOrgId()).subscribe(
        data => {
          if (data.success) {
            this.employeeId = this.userSessionService.getUserEmpId();            
            this.approvalId = data.responseData.workflowApprovalId;
            this.wfAppBtn = data.responseData.approvalFlag;
            this.srId = this.srBreakDownGeneralForm.controls.srId.value;            
          } else {
            this.commonService.openToastWarningMessage(data.message);
          }
        }, error => {
        }
      );
  }

  approveSR() {
      let data = {selectedApprovalList : [this.approvalId]};
      this.commonService.commonInsertService('approveMultipleData.sams', data).subscribe(
        data => {
          if (data.success) {
            this.commonService.openToastSuccessMessage(data.message);
            if (data.success) {
              this.commonService.commonGetService('updateServiceRequestStatus.sams', this.srBreakDownGeneralForm.controls.srId.value, 'APPROVAL COMPLETED', 'AFTER_WF').subscribe(
                data => {
                  if (data.success) {
                    this.refresh();
                  } else {
                    this.commonService.openToastWarningMessage(data.message);
                  }
                }, error => {
              });
            }
          this.refresh();
          } else {
            this.commonService.openToastErrorMessage(data.message);
          }
        }
      );
  }

  fetchListOfSRAccessories() {
    this.commonService.commonGetService(this.assetOptimaServices.assetItemsDetails, this.srBreakDownGeneralForm.controls.assetId.value, "ACCESSORIES").subscribe(
      (data) => {
        this.accessoriesDataSource = [];
        this.accessoriesDataSource = this.accessoriesDataSource.concat(data.responseData);
      }
    )
  }

  fetchListOfSRConsumables() {
    this.commonService.commonGetService(this.assetOptimaServices.assetItemsDetails, this.srBreakDownGeneralForm.controls.assetId.value, "CONSUMABLES").subscribe(
      (data) => {
        this.consumablesDataSource = [];
        this.consumablesDataSource = this.consumablesDataSource.concat(data.responseData);
      }
    )
  }

  fetchListOfSRSpareparts() {
    this.commonService.commonGetService(this.assetOptimaServices.assetItemsDetails, this.srBreakDownGeneralForm.controls.assetId.value, "SPARE PARTS").subscribe(
      (data) => {
        this.sparePartsDataSource = [];
        this.sparePartsDataSource = this.sparePartsDataSource.concat(data.responseData);
      }
    )
  }

  saveSrModelItem(itemTypeName) {
    let dataList: any[];
    let itemTypeNameDisp: String;
    if (itemTypeName === 'ACCESSORIES') {
      dataList = this.accessoriesDataSource;
      itemTypeNameDisp = "ACCESSORIES";
    } else if (itemTypeName === 'CONSUMABLES') {
      dataList = this.consumablesDataSource;
      itemTypeNameDisp = "CONSUMABLES";
    } else if (itemTypeName === 'SPARE PARTS') {
      dataList = this.sparePartsDataSource;
      itemTypeNameDisp = "SPARE PARTS";
    }
    if (dataList.length > 0) {
      var srObj = {
        'srInfo': this.srBreakDownGeneralForm.getRawValue(),
        'srItemTypeList': dataList,
        'itemTypeNameDisp': itemTypeNameDisp
      }

      this.commonService.commonInsertService('saveUpdateSrModelItem.sams', srObj).subscribe(
        data => {
          if (data.success) {
            this.commonService.openToastSuccessMessage(data.message);
            if (itemTypeName === 'ACCESSORIES') {
              this.fetchListOfSRAccessories();
            } else if (itemTypeName === 'CONSUMABLES') {
              this.fetchListOfSRConsumables();
            } else if (itemTypeName === 'SPARE PARTS') {
              this.fetchListOfSRSpareparts();
            }
          } else {
            this.commonService.openToastErrorMessage(data.message);
          }
        }
      );
    } else {
      this.commonService.openToastWarningMessage("Add at least one " + itemTypeName);
    }
  }

  loadPersonInchargeComboData(searchValue) {
    this.scrollsyncPersonIncharge = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllEmployeeForOrgCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.personInchargePageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.personInchargePageNumber === 1) {
              this.personInchargeCombo = data.responseData.comboList;
            } else {
              this.personInchargeCombo = this.personInchargeCombo.concat(data.responseData.comboList);
            }data.responseData.comboList.length !== 0 ? this.personInchargePageNumber += 1 : this.personInchargePageNumber = 1;
          } else {
            this.personInchargeCombo = data.responseData.comboList;
            this.personInchargePageNumber = 1;
          }
          this.scrollsyncPersonIncharge = false;
        }
      );
  }

  selectedPersonInchargeData(event) {
    if(event === undefined) {
      this.srBreakDownGeneralForm.controls.installedInternalEngName.setValue('');
      this.personInchargePageNumber = 1
    } else {
      this.srBreakDownGeneralForm.controls.installedInternalEngName.setValue(event.employeeFirstName);
    }
  }

  changeInstallationDoneBy(event) {
    if (event.name === "INTERNAL") {
      this.insExternalEnggInfo = false;
    } else if (event.name === "EXTERNAL") {
      this.insExternalEnggInfo = true;
    }
  }

  listOfSupplier(searchValue) {
    this.scrollSuppliersync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllSupplierNameCombo, searchValue.term, '', '',
      this.limitCount, this.supplierListPageNumber, '', 'SUPPLIER').subscribe(
        (data) => {
          if (data.success) {
            if (!(this.commonService.fetchSearchValue(searchValue))) {
              if (this.supplierListPageNumber === 1) {
                this.supplierList = data.responseData.comboList;
              } else {
                this.supplierList = this.supplierList.concat(data.responseData.comboList);
              }this.supplierList.length !== 0 ? this.supplierListPageNumber += 1 : this.supplierListPageNumber = 1;
            } else {
              this.supplierList = data.responseData.comboList;
              this.supplierListPageNumber = 1;
            }
            this.scrollSuppliersync = false;
          }
        }
      );
  }

  listOfManufacturer(searchValue) {
    this.scrollManufacturersync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfManufacturerCombo, searchValue.term, '', '',
      this.limitCount, this.manufacturerListPageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.manufacturerListPageNumber === 1) {
              this.manufacturerList = data.responseData.comboList;
            } else {
              this.manufacturerList = this.manufacturerList.concat(data.responseData.comboList);
            }this.manufacturerList.length !== 0 ? this.manufacturerListPageNumber += 1 : this.manufacturerListPageNumber = 1;
          } else {
            this.manufacturerList = data.responseData.comboList;
            this.manufacturerListPageNumber = 1;
          }
          this.scrollManufacturersync = true;
        }
      );
  }

  setSupplierData(event) {
    if (event === undefined) {
      this.srBreakDownGeneralForm.controls.installationProvidedById.setValue(0);
      this.srBreakDownGeneralForm.controls.installationProvidedByName.setValue('');
      this.supplierListPageNumber = 1;
      this.supplierList = [];
    } else {
      this.srBreakDownGeneralForm.controls.installationProvidedById.setValue(event.supplierId);
      this.srBreakDownGeneralForm.controls.installationProvidedByName.setValue(event.supplierName);
    }
  }

  setManufacturerData(event) {
    if (event === undefined) {
      this.srBreakDownGeneralForm.controls.installationProvidedById.setValue(0);
      this.srBreakDownGeneralForm.controls.installationProvidedByName.setValue('');
      this.manufacturerListPageNumber = 1;
      this.manufacturerList = [];
    } else {
      this.srBreakDownGeneralForm.controls.installationProvidedById.setValue(event.manufacturerId);
      this.srBreakDownGeneralForm.controls.installationProvidedByName.setValue(event.manufacturerName);
    }
  }

  deleteSRDoc(deleteid, index) {
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
          if (deleteid <= 0) {
            this.documentDataSource.splice(index, 1);
            this.formTwoValidation();
          } else {
            this.commonService.commonGetService('deleteSRDoc.sams', deleteid).subscribe(
              data => {
                if (data.success) {
                  this.commonService.openToastSuccessMessage(data.message);
                  this.documentDataSource.splice(index, 1);
                  this.fetchListOfSRDocs();
                  this.formTwoValidation();
                } else {
                  this.commonService.openToastErrorMessage(data.message);
                }
              }
            );
          }
        }
      });
  }

  generateSRHandOverFormPDF(srId?: number) {
    this.commonService.commonGetService('generateSRHandOverFormPdf.sams', srId, "Handover Form").subscribe(
      data => {
        if (data.success) {
          this.downloadDocument(data.responseData, 'application/pdf');
          this.commonService.openToastSuccessMessage("Handover Pdf report generated successfully.");
        } else {
          this.commonService.openToastWarningMessage("Failed to generate Handover Pdf report.");
        }
      }, error => {
        this.commonService.openToastWarningMessage("Failed to generate Handover Pdf report.");
      }
    );
  }

  gatePassAddEdit(gatePassHdrId, mode) {
    this.router.navigate(['home/asset/gatePassCreate/' + gatePassHdrId + '/' + mode]);
    localStorage.setItem('srId', this.srBreakDownGeneralForm.controls.srId.value);
    localStorage.setItem('gatePassSource', 'WORKORDER');
    localStorage.setItem('gatePassSourceId', this.srBreakDownGeneralForm.controls.srId.value);
    localStorage.setItem('gatePassSourceNo', this.srBreakDownGeneralForm.controls.srNo.value);
    localStorage.setItem('assetCode', this.srBreakDownGeneralForm.controls.assetCode.value);

    localStorage.setItem('assetCode', this.srBreakDownGeneralForm.controls.assetCode.value);
    localStorage.setItem('modelId', this.srBreakDownGeneralForm.controls.modelId.value);
    localStorage.setItem('modelName', this.srBreakDownGeneralForm.controls.modelName.value);
    localStorage.setItem('manufacturerName', this.srBreakDownGeneralForm.controls.manufacturerName.value);
    localStorage.setItem('assetDescription', this.srBreakDownGeneralForm.controls.assetDescription.value);
    localStorage.setItem('equipmentCode', this.srBreakDownGeneralForm.controls.equipmentCode.value);
    localStorage.setItem('serialNo', this.srBreakDownGeneralForm.controls.assetSerialNo.value);
    localStorage.setItem('assetGroupName', this.srBreakDownGeneralForm.controls.assetGroupName.value);

    localStorage.setItem('assetId', this.srBreakDownGeneralForm.controls.assetId.value);
    localStorage.setItem('gatePassPurpose', 'EXTERNAL REPAIRS');
    localStorage.setItem('locationName', this.srBreakDownGeneralForm.controls.locationName.value);
    localStorage.setItem('locationId', this.srBreakDownGeneralForm.controls.locationId.value);

  }

  loadPriorityComboData(searchValue) {
    this.scrollsyncPriority = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllPriorityForCombo.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.priorityPageNumber).subscribe(
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
      this.srBreakDownGeneralForm.controls.srPriority.setValue('');
      this.priorityPageNumber = 1;
      this.priorityCombo = [];
    } else {
      this.srBreakDownGeneralForm.controls.srPriority.setValue(event.priorityName);
    }
  }


  selectedSeverityData(event) {
    if (event === undefined) {
      this.srBreakDownGeneralForm.controls.srSeverity.setValue('');
      this.severityPageNumber = 1;
      this.severityCombo = [];
    } else {
      this.srBreakDownGeneralForm.controls.srSeverity.setValue(event.severityName);
    }
  }

  showPrioritySeverityStatus() {

    if (this.srBreakDownGeneralForm.controls.isPartiallyWorkingDisp.value === 'Y') {
      this.srBreakDownGeneralForm.controls.isPartiallyWork.setValue(true);
    } else {
      this.srBreakDownGeneralForm.controls.isPartiallyWork.setValue(false);
    }

    let dialogRef = this.dialog.open(SrUpdateStatusComponent, {
      height: '525px',
      width: '700px',
      data: {
        'srId': this.srBreakDownGeneralForm.controls.srId.value,
        'srSeverity': this.srBreakDownGeneralForm.controls.srSeverity.value,
        'srPriority': this.srBreakDownGeneralForm.controls.srPriority.value,
        'srStatusId': this.srBreakDownGeneralForm.controls.srStatusId.value,
        'srStatusName': this.srBreakDownGeneralForm.controls.srStatusName.value,
        'isPartiallyWork': this.srBreakDownGeneralForm.controls.isPartiallyWork.value,
        'partiallyWorkingReason': this.srBreakDownGeneralForm.controls.partiallyWorkingReason.value,
        'assetId' : this.srBreakDownGeneralForm.controls.assetId.value,
        'assetCode' : this.srBreakDownGeneralForm.controls.assetCode.value,
        'locationId' : this.srBreakDownGeneralForm.controls.locationId.value,
        'departmentId' : this.srBreakDownGeneralForm.controls.departmentId.value,
        'physicalDamageDisp' : this.srBreakDownGeneralForm.controls.physicalDamageDisp.value,
        'physicalDamageDescription' : this.srBreakDownGeneralForm.controls.physicalDamageDescription.value,
        'patientIncidentDisp' : this.srBreakDownGeneralForm.controls.patientIncidentDisp.value,
        'incidentDescription' : this.srBreakDownGeneralForm.controls.incidentDescription.value,
        'srEFSValue' : this.srBreakDownGeneralForm.controls.srEFSValue.value,
        'srEFSValueId' : this.srBreakDownGeneralForm.controls.srEFSValueId.value,
        'srActivityCount' : this.serviceRequestLaborModelList.length,
        'checkSRActivityClose': this.checkSRActivityClose
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.exit) {

          this.srBreakDownGeneralForm.controls.srSeverity.setValue(data.srSeverity);
          this.srBreakDownGeneralForm.controls.srPriority.setValue(data.srPriority);
          this.srBreakDownGeneralForm.controls.srStatusId.setValue(data.srStatusId);
          this.srBreakDownGeneralForm.controls.srStatusName.setValue(data.srStatusName);
          this.srBreakDownGeneralForm.controls.isPartiallyWork.setValue(data.isPartiallyWork);
          this.srBreakDownGeneralForm.controls.partiallyWorkingReason.setValue(data.partiallyWorkingReason);
          this.srBreakDownGeneralForm.controls.srEFSValue.setValue(data.srEFSValue);
          this.srBreakDownGeneralForm.controls.srEFSValueId.setValue(data.srEFSValueId);

          if(this.srBreakDownGeneralForm.controls.assetId.value <= 0) {
            this.srBreakDownGeneralForm.controls.assetCode.setValue(data.assetCode);
            this.srBreakDownGeneralForm.controls.assetId.setValue(data.assetId);
          }

          this.srBreakDownGeneralForm.controls.physicalDamageDisp.setValue(data.physicalDamageDisp);
          this.srBreakDownGeneralForm.controls.physicalDamageDescription.setValue(data.physicalDamageDescription);
          this.srBreakDownGeneralForm.controls.patientIncidentDisp.setValue(data.patientIncidentDisp);
          this.srBreakDownGeneralForm.controls.incidentDescription.setValue(data.incidentDescription);
          this.srBreakDownGeneralForm.controls.assetCodeUpdated.setValue(data.assetCodeUpdated);

          //let assetCodeUpdated = data.assetCodeUpdated;

          if (data.isPartiallyWork) {
            this.srBreakDownGeneralForm.controls.isPartiallyWorkingDisp.setValue('Y');
          } else {
            this.srBreakDownGeneralForm.controls.isPartiallyWorkingDisp.setValue('N');
          }

          this.commonService.showSpinner();
          this.commonService.commonInsertService('updateSRSeverityPriorityStatus.sams', this.srBreakDownGeneralForm.getRawValue()).subscribe(
            data => {
              if (data.success) {
                this.commonService.openToastSuccessMessage(data.message);
                if(this.serviceRequestLaborModelList.length <= 0) {
                  this.commonService.hideSpinner();
                  let srLabourId = 0;
                  let srId = this.srId;
                  this.addLabour(srLabourId,srId);
                  this.refresh();
                } else {
                  this.commonService.hideSpinner();
                  this.refresh();
                }
                
              } else {
                this.commonService.openToastErrorMessage(data.message);
              }
            }, error => {

            }
          );
        }
      }
    );
  }

  openReOpenInfo() {
    let dialogRef = this.dialog.open(SrReOpenComponent, {
      height: '525px',
      width: '380px',
      data: {
        'srId': this.srBreakDownGeneralForm.controls.srId.value,
        'reOpenedById': this.userSessionService.getUserId(),
        'reOpenedBy': this.userSessionService.getUserName(),
        'reOpenedDtDisp': this.commonService.convertToDateStringdd_mm_yyyy(new Date()),
        'reOpenedRemarks': 'RE-OPENED',
        'updateByBatch': this.srBreakDownGeneralForm.controls.updateByBatch.value,
        'selectedSrIdList': this.srBreakDownGeneralForm.controls.selectedSrIdList.value
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        this.refresh();
        this.validateEditMode();
      });
  }

  fetchSRActivityList(srId) {
    this.commonService.commonGetService('fetchListOfSrActivityForSrId.sams', srId).subscribe(
      data => {
        this.serviceRequestLaborModelList = [];
        this.serviceRequestLaborModelList = this.serviceRequestLaborModelList.concat(data.responseData);
        this.formValidation();

        // check sr activity closed
        this.checkSRActivityClose = false;
        for (let i = 0; i < data.responseData.length; i++) {
          if (data.responseData[i].endDtndTimeDisp == '-') {
            this.checkSRActivityClose = true;
          }
        }

      },
      error => {
      }
    );
  }

  openBreakDownAnalysis() {

    // let dialogRef = this.dialog.open(ServiceRequestViewComponent, {
    //   height: 'auto',
    //   width: '400px',
    //   data: { 'srId': this.srBreakDownGeneralForm.controls.srId.value }
    // });
    // dialogRef.disableClose = true;
    // dialogRef.afterClosed().subscribe(
    //   data => {
    //     this.ngOnInit();
    //   });
    //   this.formValidation();

    let dialogRef = this.dialog.open(SrDamageInfoComponent, {
      height: 'auto',
      width: '400px',
      maxWidth: '100%',
      data: {
        'srId': this.srBreakDownGeneralForm.controls.srId.value,
        'physicalDamageDisp' : this.srBreakDownGeneralForm.controls.physicalDamageDisp.value,
        'patientIncidentDisp' : this.srBreakDownGeneralForm.controls.patientIncidentDisp.value,
        'physicalDamageDescription' : this.srBreakDownGeneralForm.controls.physicalDamageDescription.value,
        'incidentDescription' : this.srBreakDownGeneralForm.controls.incidentDescription.value
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        //this.refresh();
      });
  }

  addLabour(addLabourModel, type) {
    if(this.srBreakDownGeneralForm.controls.physicalDamageDisp.value == 'YES' || this.srBreakDownGeneralForm.controls.physicalDamageDisp.value == 'NO') {
      if (addLabourModel.srLabourId <= 0 && this.serviceRequestLaborModelList.length > 0
        && this.serviceRequestLaborModelList[0].activityEndDt === null && this.serviceRequestLaborModelList[0].srActivityId > 0) {
        this.commonService.openToastWarningMessage('Kindly Input End date &Time for previous activity.');
        addLabourModel = this.serviceRequestLaborModelList[0];
      }
      let dialogRef = this.dialog.open(SrAddLabourComponent, {
        height: 'auto',
        width: '1200px',
        maxWidth: '100%',
        data: {
          'addLabourModel': addLabourModel,
          'serviceRequestModel': this.srBreakDownGeneralForm.value,
          'type': type,
          'parentSrId': this.srBreakDownGeneralForm.controls.parentSrId.value
        }
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(
        data => {

          if(data){
            this.router.navigate(['home/serviceRequest/serviceViewV1/'+ this.srBreakDownGeneralForm.controls.srId.value +'/edit/wo_item_request/']);
            this.srItemRequest()
          }
          

          this.validateEditMode();
        });
      this.formValidation();
    } else {
      this.showPrioritySeverityStatus();
    }
  }

  deleteActivity(srActivityId,srId) {
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Work Order Activity/Documents/External Service Information'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          this.commonService.commonGetService('validateDeleteSRActivity.sams', srId, srActivityId).subscribe(
            data => {
              if (data.success) {
                var allowDelete = data.responseData;
                if(allowDelete) {
                  this.commonService.commonGetService('deleteSRActivity.sams', srId, srActivityId).subscribe(
                    data => {
                      if (data.success) {
                        this.commonService.openToastSuccessMessage("Activity Deleted Successfully.");
                        this.validateEditMode();
                      }
                    }
                  );
                } else {
                  this.commonService.openToastWarningMessage('Stock Indent issued for the Work Order Activity. Cannot Delete Activity!');
                }
              } else {
                this.commonService.openToastErrorMessage(data.message);
              }
            }
          );
        }
      }
    );
  }

  addServiceCost(srActivityId, srId, type) {
    let dialogRef = this.dialog.open(SrActivityServiceCostComponent, {
      height: '600px',
      width: '1100px',
      data: { 'srActivityId': srActivityId, 'srId': srId, 'modelId' : this.srBreakDownGeneralForm.controls.modelId.value }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        this.validateEditMode();
      });
  }

  raiseStockIndent(id, srActivityId, srId, mode) {
    localStorage.setItem('srId', srId);
    localStorage.setItem('srActivityId', srActivityId);
    localStorage.setItem('srNo', this.srBreakDownGeneralForm.controls.srNo.value);
    localStorage.setItem('assetCode', this.srBreakDownGeneralForm.controls.assetCode.value);
    localStorage.setItem('assetId',this.srBreakDownGeneralForm.controls.assetId.value);
    this.router.navigate(['home/inventory/stockIndentCreate/' + id + '/' + mode]);
  }

  uploadSRActvitiyDoc(id, srActivityId,srId, mode) {
    let dialogRef = this.dialog.open(SrActivityDocComponent, {
      height: '500px',
      width: '1200px',
      data: { 'srId': srId,
              'srActivityId': srActivityId }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        this.validateEditMode();
      });
  }

  loadActivityLogList() {
    this.commonService.commonGetService('fetchListOfApprovalsTAT.sams', this.srBreakDownGeneralForm.controls.srId.value).subscribe(
      data => {
        this.activityLogDataSource = [];
        this.activityLogDataSource = data.responseData;
        this.srBreakDownGeneralForm.controls['sumOfDays'].setValue(this.activityLogDataSource[0].sumOfDays);
        this.srBreakDownGeneralForm.controls['sumOfHours'].setValue(this.activityLogDataSource[0].sumOfHours);
      }, error => {

      }
    );
  }

  emailPopUp() {
    let dialogRef = this.dialog.open(SrActivityEmailComponent, {
      height: 'auto',
      width: '500px',
      data: { 'srId': this.srId }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        this.validateEditMode();
      });
  }

  dateValidationinstall(event) {
    return false;
  }

  setHandoverCompletedate(event){
    if(event.checked === true){
      this.srBreakDownGeneralForm.controls.handoverCompletedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(new Date()));
      this.handoverCompleted=true;
    }else{
      this.srBreakDownGeneralForm.controls.handoverCompletedDtDisp.setValue('');
      this.handoverCompleted=false;
    }


  }
  confirmApprove() {
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
          
          this.approveSR();
        }
      });
  }

  updateHandoverDateByCheckingConfirmationFoBatchUpdate() {
    if(this.srBreakDownGeneralForm.controls.updateByBatch.value) {
      this.checkConfirmationForBatchUpdate('updateHandoverDate');
    } else {
      this.updateHandoverDate();
    }
  }

  updateHandoverDate(){
    this.commonService.commonInsertService('updateHandoverCompletedDate.sams',this.srBreakDownGeneralForm.getRawValue()).subscribe(
      data => {
        if(data.success){
          this.commonService.openToastSuccessMessage("Handover completed Date updated successfully.");
        }else{
          this.commonService.openToastErrorMessage("Error occurred while updating handover date.")
        }
      }
    );


  }

  disableUpdateHandOverDateButton(handOverCompletedStatus){
    if(handOverCompletedStatus){
      this.handoverCompleted = true;
    }else{
      this.handoverCompleted = false;
    }
  }

  getBatchDetails() {
    this.commonService.commonGetService('fetchInstallationWoListForBatchUpdate.sams',
    this.srBreakDownGeneralForm.controls.assetId.value, this.srBreakDownGeneralForm.controls.poNo.value, 
    this.srBreakDownGeneralForm.controls.modelName.value).subscribe(
      (data) => {
        if(data.success && data.responseData.installationWoList.length > 0) {
            this.displayBatchButton = true;
        }
      }
    );
  }

  updateWOByBatch() {
    const confirmationTextToBeForwarded = `Please select the Installation Wo from following grid ( 
     grouped by <br> PoNo = '${this.srBreakDownGeneralForm.controls.poNo.value}' and <br> model = 
    '${this.srBreakDownGeneralForm.controls.modelName.value}') <br> to update by batch.`;
    const dialogRef = this.dialog.open(UpdateInstallationWoByBatchDialogComponent, {
      height: 'auto',
      width: '40%',
      data: {
        installationSrDetailModel: this.srBreakDownGeneralForm.getRawValue(),
        confirmationText: confirmationTextToBeForwarded
      }
    });
    dialogRef.disableClose  = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          this.batchHdrModel = data.batchHdrModel;
          this.selectedSrList = data.selectedSrList;
          this.selectedSrIdList = data.selectedSrIdList;
          const selectedSrListLength = data.selectedSrList.length;
          const serialNoRange = (selectedSrListLength > 1) ? `(${data.selectedSrList[0].serialNo} - 
            ${data.selectedSrList[selectedSrListLength - 1].serialNo} - (${selectedSrListLength}))` 
            : `(${data.selectedSrList[0].serialNo} - (${selectedSrListLength}))`;
          const assetCodeRange =  (selectedSrListLength > 1) ? `(${data.selectedSrList[0].assetCode} -
             ${data.selectedSrList[selectedSrListLength - 1].assetCode} - (${selectedSrListLength}))` 
            : `(${data.selectedSrList[0].assetCode} - (${selectedSrListLength}))`;
          const srNoRange = (selectedSrListLength > 1) ? `(${data.selectedSrList[0].srNo} - 
            ${data.selectedSrList[selectedSrListLength - 1].srNo} - (${selectedSrListLength}))` 
            : `(${data.selectedSrList[0].srNo} - (${selectedSrListLength}))`;
          this.srNoForRangeForBatchUpdate = srNoRange;
          this.assetCodeRangeForBatchUpdate = assetCodeRange;
          this.serialNoRangeForBatchUpdate = serialNoRange;
          this.updateByBatch = true;
          this.wfAppBtn = false;
          this.srBreakDownGeneralForm.controls.updateByBatch.setValue(true);
          this.srBreakDownGeneralForm.controls.selectedSrIdList.setValue(this.selectedSrIdList);
        } else {
          if(this.updateByBatch) {
            this.updateByBatch = true;
            this.wfAppBtn = false;
            this.srBreakDownGeneralForm.controls.updateByBatch.setValue(true);
            this.srBreakDownGeneralForm.controls.selectedSrIdList.setValue(this.selectedSrIdList);
          } else {
            this.updateByBatch = false;
            this.wfAppBtn = true;
            this.srBreakDownGeneralForm.controls.updateByBatch.setValue(false);
            this.srBreakDownGeneralForm.controls.selectedSrIdList.setValue([]);
          }
        }
      });
  }

  navigateBackOnBatchUpdate() {
    if(this.updateByBatch) {
      localStorage.setItem('updateInstallationWOByBatch', 'true');
      // this.location.back();
    } else {
      localStorage.setItem('updateInstallationWOByBatch', 'false');
    }
  }

  checkConfirmationForBatchUpdate(callerMethodName) {
    const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'confirmHeading': 'Confirmation',
        'confirmMsg':'Are you sure, You want to Update the selected Installation WO by Batch ?'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          if(callerMethodName === 'approvalSR') {
            this.checkForConfirmationForApprovalSr();
          } else if(callerMethodName === 'reassignServiceRequest') {
            this.reassignServiceRequest();
          } else if(callerMethodName === 'updateHandoverDate') {
            this.updateHandoverDate();
          }
        }
      });
  }


  dialogRef;
  editAssetItem(element,itemType,mode){
    this.dialogRef = this.dialog.open(AssetItemViewComponent, {
      height: 'auto',
      width: '767px',
      data: {
        'element': element,
        'assetHdrId': this.srBreakDownGeneralForm.controls.assetId.value,
        'itemType': itemType,
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

  addItemToAsset(id,itemTypeName){
    localStorage.setItem('assetCode', this.srBreakDownGeneralForm.controls.assetCode.value);
    localStorage.setItem('toAssetId', this.srBreakDownGeneralForm.controls.assetId.value);
    localStorage.setItem('previousRoute', this.router.url);
    localStorage.setItem('ItemType', itemTypeName);
    this.router.navigate(['home/inventory/assetStockCreate/' + id + '/' + 'add']);
  }

  Active_Tab_Change(event: MatTabChangeEvent) {
 
    if (localStorage.getItem('currentTab') === 'Work Activity' && 
    localStorage.getItem('previousRoute').startsWith('/home/inventory/stockIndentCreate') && 
    localStorage.getItem('previousRoute') !== null) {
      if (this.srTypeTemp === 'QA' || this.srTypeTemp === 'INSTALLATION' || this.srTypeTemp === 'PM' || this.srTypeTemp === 'PA') {
        this.selectedIndex = 2;
      } else if (this.srTypeTemp === 'BM') {
        this.selectedIndex = 4;
      }
      
      localStorage.setItem('previousRoute', '');
    }
    localStorage.setItem('wotabindex', event.index.toString());
    localStorage.setItem('currentTab', event.tab.textLabel);
    
  }

  rejectApprove(){
    const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
      height: 'auto',
      width: '100px',
      data: {
        'confirmHeading': 'Confirmation',
        'confirmMsg':'Are You Sure To Reject This Record?'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status === true) {
          this.rejectWorkOrder();
        }
      });
  }
  rejectWorkOrder() {
      let data = {selectedApprovalList : [this.approvalId], status: 'REJECT PERMANENTLY',rejectReason: ''};   
      this.commonService.commonInsertService('rejectMultipleData.sams', data).subscribe(
        dataResult => {
          if (dataResult.success) {
            this.commonService.openToastSuccessMessage(dataResult.message);
            this.openReOpenInfo();
          } else {
            this.commonService.openToastWarningMessage(dataResult.message);
          }
        }, error => {
        }
      );
  }

  formValidation(): boolean {
    if(this.srStatusId == 4 && this.srTypeTemp == 'PM/PA'){
      this.formOneValid = true;
    }else if (this.srStatusId < 3) {            
      this.formOneValid = true;
    }else if(this.serviceRequestLaborModelList.length > 0) {
      this.formOneValid = true;
    }else{
      this.formOneValid =false;
    }
    return this.formOneValid;
  }

  formTwoValidation() {   
    if (this.documentDataSource.length > 0) {
      for (let index = 0; index < this.documentDataSource.length; index++) {
        const element = this.documentDataSource[index];
        if(element.docType === 'Installation Report'){
          this.formTwoValid = true;
          return this.formTwoValid;
        }else{
          this.formTwoValid = false;
        }
      }   
    }else if(this.documentDataSource.length > 0 || this.srBreakDownGeneralForm.controls.srType.value !== 'INSTALLATION'){
      this.formTwoValid = true;
    } 
    else {
      this.formTwoValid = false;
    }        
    return this.formTwoValid;
  }

  srItemRequest() {

    let srId = this.srBreakDownGeneralForm.controls.srId.value;
    let srNo = this.srBreakDownGeneralForm.controls.srNo.value;
    let locId = this.srBreakDownGeneralForm.controls.locationId.value;
    let locName = this.srBreakDownGeneralForm.controls.locationName.value;
    let assetHdrId = this.srBreakDownGeneralForm.controls.assetId.value;
    let assetCode = this.srBreakDownGeneralForm.controls.assetCode.value;
    const dialogRef = this.dialog.open(SrItemRequestComponent, {
      height: '650px',
      width: '1100px',
      data: {
        'srId' : srId,
        'srNo' : srNo,
        'locationId' : locId,
        'locationName' : locName,
        'assetHdrId' : assetHdrId,
        'assetCode' : assetCode
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if(data == 'proceed') {
           this.listOfAllPurchaseRequestList(srId);
           this.listOfAllStockIndentList(srId);
        }
      });
  }

  imageDisp = '';
  viewImage(imageInfo) {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    modal.style.transition = "2s";
    this.imageDisp = imageInfo;
  }

  closeViewImage() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    modal.style.transition = "2s";
    this.imageDisp = '';
  }

  openFeedback() {
    let dialogRef = this.dialog.open(SrFeedbackComponent, {
        height: 'auto',
        width: '400px',
        data: {
            srScreen: "Edit"
        }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(data => {
        if (data) { 
            this.srBreakDownGeneralForm.controls.srFeedback.setValue(data.feedback);
            this.srBreakDownGeneralForm.controls.srFeedbackCallerRemarks.setValue(data.remarks);

            if(data.feedback == 'UNSATISFACTORY'){
              this.srBreakDownGeneralForm.controls.srEFSValueId.setValue(1);
              this.srBreakDownGeneralForm.controls.srStatusId.setValue(5); 
              
            }else{
              this.srBreakDownGeneralForm.controls.srStatusId.setValue(7); 
            }

            this.srClose(data);
            
        }
    });
}

srClose(data){
  if(data.feedback == 'UNSATISFACTORY'){
    let dialogRef = this.dialog.open(SrReOpenConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
            this.checkForConfirmationForApprovalSr();
        }
});
}else if(data.feedback == 'GOOD' || data.feedback == 'SATISFACTORY'){
      this.checkForConfirmationForApprovalSr();
}
}

addOrUpdateRemarks(){
  this.commonService.commonInsertService('saveUpdateSrRemarks.sams', this.srBreakDownGeneralForm.getRawValue()).subscribe(
    data => {
      if (data.success) {
        this.commonService.openToastSuccessMessage('Work Order ' + data.responseData + ' successfully.');
        this.refresh();

      } else {
        this.commonService.openToastErrorMessage(data.message);
      }
    }, error => {

    }
  );
}

refereshPage(){
  this.ngOnInit();
}

get filteredTabsList() {
  return this.tabsList.filter((tab) => {
    if(this.srBreakDownGeneralForm.controls.srType.value !== 'BM'){
      return this.srBreakDownGeneralForm.controls.srType.value !== 'BM' && tab.name !== 'sr_work_activity'
    }else{
      return true;
    }
  }  
  );
}

  // Expansion Panel icon
  togglePanel(panelName,state): void {

    if(panelName == 'Work Activity Info'){
      state == 'opened' ?  this.isWorkActivityInfoPanelExpanded = true : this.isWorkActivityInfoPanelExpanded = false;
    }else if(panelName == 'Activity Log Info'){
      state == 'opened' ?  this.isActivityLogInfoPanelExpanded = true : this.isActivityLogInfoPanelExpanded = false;
    }else if(panelName == 'Activity Chart Info'){
      state == 'opened' ?  this.isActivityChartInfoPanelExpanded = true : this.isActivityChartInfoPanelExpanded = false;
    }else if(panelName == 'Asset Info'){
      state == 'opened' ?  this.isAssetInfoPanelExpanded = true : this.isAssetInfoPanelExpanded = false;
    }else if(panelName == 'Contract Info'){
      state == 'opened' ?  this.isContractInfoPanelExpanded = true : this.isContractInfoPanelExpanded = false;
    }else if(panelName == 'Service Details Info'){
      state == 'opened' ?  this.isServiceDetailsInfoPanelExpanded = true : this.isServiceDetailsInfoPanelExpanded = false;
    }else if(panelName == 'Sub Tickets Info'){
      state == 'opened' ?  this.isSubTicketsInfoPanelExpanded = true : this.isSubTicketsInfoPanelExpanded = false;
    }else if(panelName == 'Check Points Info'){
      state == 'opened' ?  this.isCheckPointsInfoPanelExpanded = true : this.isCheckPointsInfoPanelExpanded = false;
    }else if(panelName == 'Gate Pass Info'){
      state == 'opened' ?  this.isGatePassInfoPanelExpanded = true : this.isGatePassInfoPanelExpanded = false;
    }else if(panelName == 'Wo Reopened Info'){
      state == 'opened' ?  this.isWoReopenedInfoPanelExpanded = true : this.isWoReopenedInfoPanelExpanded = false;
    }else if(panelName == 'Hand Over Info'){
      state == 'opened' ?  this.isHandOverInfoPanelExpanded = true : this.isHandOverInfoPanelExpanded = false;
    }else if(panelName == 'Documents Info'){
      state == 'opened' ?  this.isDocumentsInfoPanelExpanded = true : this.isDocumentsInfoPanelExpanded = false;
    }else if(panelName == 'Wo Images Info'){
      state == 'opened' ?  this.isWoImagesInfoPanelExpanded = true : this.isWoImagesInfoPanelExpanded = false;
    }else if(panelName == 'Wo Feedback Info'){
      state == 'opened' ?  this.isWoFeedbackInfoPanelExpanded = true : this.isWoFeedbackInfoPanelExpanded = false;
    }
  }

}
