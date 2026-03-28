import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { Location } from '@angular/common';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetAssignee } from 'src/app/Model/master/asset-assignee';
import {  MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MaintenanceScheduleHdrModel } from 'src/app/Model/maintenance/maintenanceScheduleHdr';
import { DeleteConfirmationComponent } from '../../Common-components/delete-confirmation/delete-confirmation.component';
import { AssetModel } from 'src/app/Model/master/asset';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { RetirementDisposal } from 'src/app/Model/asset/retirementDisposal';
import { allAssetRetirmentStatus, allBusinessPartnerRoles, allWorkflowStatus } from '../../../Constants/AllStatusConstants'
import { TranslateService } from '@ngx-translate/core';
import { getData } from 'src/app/Model/common/fetchListData';
import { DocumentListComponent } from '../document-list/document-list.component';
import { ConfirmConfirmationComponent } from '../../Common-components/confirm-confirmation/confirm-confirmation.component';
import { RejectConfirmationComponent } from '../../Common-components/reject-confirmation/reject-confirmation.component';
import { AssetDocCreateComponent } from '../Asset/asset-doc/asset-doc-create/asset-doc-create.component';


@Component({
  selector: 'app-service-request-asset-retirement',
  templateUrl: './service-request-asset-retirement.component.html',
  styleUrls: ['./service-request-asset-retirement.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ServiceRequestAssetRetirementComponent implements OnInit {

  headingDisplay: string;
  buttonDisplay:string;
  retireDisposeForm: FormGroup;
  assetMainForm: FormGroup;
  buyBackForm: FormGroup;
  salvateItemsForm: FormGroup;
  retireHistoryForm: FormGroup;
  selectedIndex: number;
  sourceScreen: string ="";

  pageSize: string = '0';
  pageIndex: string = '0';

  //ASSET CODE
  scrollsyncAssetCode: boolean = false;
  recordsPerPageForCombo: string;
  assetCodePageNumber: number;
  assetCodeCombo: any = [];

  scrollsyncAssetCategory: boolean = false;
  assetCategoryPageNumber: number;
  assetCategoryList: any = [];

  scrollsyncAssetSubCategory: boolean = false;
  assetSubCategorPageNumber: number;
  subCategoryList: any = [];

  scrollsyncAssetGroup: boolean = false;
  assetGroupPageNumber: number;
  assetGroupList: any = [];

  scrollsyncModel: boolean = false;
  modelComboPageNumber: number;
  modelComboList: any = [];

  scrollsyncPersonIncharge: boolean = false;
  personInchargePageNumber: number;
  personInchargeComboList: any = [];

  storeList = [];
  storePageNumber: number;
  scrollStoreNamesync: boolean = false;

  supplierList: any=[];
  scrollSupplierNamesync: boolean = false;
  supplierPageNumber: number = 0;

  itemList: any = [];
  scrollItemNameSync: boolean = false;
  itemNamePageNumber: number;

  uploadAssetFlag: boolean = false;

  approvalFlag: boolean = false;
  disableClear: boolean;
  modeDisplay: boolean = false;
  showApprovalButton: boolean = false;
  //SET VALUE IF SR CALLS ARE CLOSE WHILE SELECTING ASSET CODE
  public serviceRequestOpenCount: number=0;

  scrollsync: boolean = false;
  locationPageNumber: number;
  locationCombo: any = [];

  scrollsyncMode: boolean = false;
  modeofDisposalPageNumber: number;
  modeofDisposalCombo: any = [];

  scrollApprovedSuppliersync: boolean = false;
  approvedSupplierPageNumber: number;
  supplierLocationList: any = [];
  workflowDataSource: any = [];

  public tempList: RetirementDisposal[] = [];

  retirementRequest:string;
  accessories:string;
  spareParts:string;
  consumables:string;
  buyBack:string;
  salvage:string;
  dispose:string;
  workflowApproval:string;

  insExternalEnggInfo : boolean = false;
  assetAssigneeLength: number = 0;
  public  assetAssigneeDataSource :AssetAssignee[] = [];
  assigneeDisplayedColumns=['sno','deptName','assignedTo','assigneeType','startDt','endDt','emailId','phoneNo','defaultPIC'];

  contractLength: String = '0';
  contractDataSource: any = [];
  contractDisplayCol = ['sno', 'contractNo','coverageType','contractType','contractingPartyType','contractPartyName',
  'contractStartDtEndDtDisp','active','netContractValue', 'action'];

  scheduleingdisplayedColumns = ['sno','scheduleTitle', 'scheduleType','priority','frequency','occurances','active','action'];
  maintenanceScheduleDataSource = [];
  schedulingLength: number = 0;

  statutoryRequirementLength : String = '0';
  listOfCertificates: any = [];
  statutoryRequirementCol = ['sno', 'certificateName', 'issueDt', 'startDt', 'expiryDt', 'fileCertificateNo', 'documentNo'];

  assetDocumentDataSource: any = [];
  assetDocumentLength:number=0;
  assetRetDocumentDataSource: any = [];
  // assetDocumentDisCol = ['sno', 'docName', 'docType', 'createdBy', 'createdDt', 'action'];
  assetDocumentDisCol = ['sno', 'docName', 'docType', 'startDt', 'expiryDt', 'createdBy', 'createdDt', 'action'];

  accessoriesDataSource = new MatTableDataSource<any>();
  accessoriesLength:number=0;
  accessoriesDispCol = ['sno', 'itemName', 'itemDesc', 'manufacturerName', 'uomCode'];

  consumablesDataSource = new MatTableDataSource<any>();
  consumablesLength:number=0;
  consumableDispCol = ['sno', 'itemName', 'itemDesc', 'manufacturerName', 'uomCode'];

  sparePartsDataSource = new MatTableDataSource<any>();
  sparePartsLength:number=0;
  sparePartsDisCol = ['sno', 'itemName', 'itemDesc', 'manufacturerName', 'uomCode'];

  prDataSource : any = [];
  purchaseRequestLength:number=0;
  purchaseRequestDispCol = ['sno', 'prNO', 'srNO', 'prDate', 'prType', 'prStatus', 'grandTotal'];
  prTotalAmount:number=0;
  navigateSrId:number=0;

  retireHistoryDispCol = ['sno','retirementProcess','personInvolved','updatedBy','date','remarks'];

  public scheduleHdrModel : MaintenanceScheduleHdrModel;

  buyBackModelTempPush: any = [];
  addBuyBackModelDataSource = new MatTableDataSource<any>();
  @ViewChild('matBuyBackModel') tableBuyBackModel: MatTable<any>;

  addSalvageDataTempPush: any = [];
  addSalvageDataSource = new MatTableDataSource<any>();
  @ViewChild('matSalvageItem') tableSalvageItem: MatTable<any>;

  retireHistoryDataSource = [];
  retireHistoryExpandedDataSource:any;

  dispColumnsBuyBackModel = ['sno', 'buyBackModelName', 'manufacturerName', 'buyBackRemarks', 'action'];
  dispColumnsSalvageItems = ['sno', 'moduleName', 'itemName', 'itemDesc','itemType','quantity', 'storeName', 'action'];

    //APPROVALS
  public retirementId: any;
  public transactionSource: any;

  disableBuyBack: boolean = false;
  disableSalvage: boolean = false;
  disableDisposal: boolean = false;

  employeeId: string = '0';
  approvalId: string = '0';
  approvebuttonEnable: boolean = false;

  scrollModelModuleSync: boolean = false;
  modelModulePageNumber: number;
  modelModuleCombo: any = [];

  salvageItemDtlList: FormArray;
  salvageDtlList: any;

  itemNameForHistory :string;


  addMode:boolean=false;

  public asset: AssetModel;

  searchKey: any = '';

  generateGatePass: boolean = false;

  retirement = allWorkflowStatus[allWorkflowStatus.RETIREMENT];
  getData: getData;

  assetConditionCombo: any = [];
  scrollsyncAssetCondition: boolean;

  assetConditionPageNumber: number;

  retiredRequestStatusId: any;
  retiredStatusId: any;
  salvageRequestStatusId: any;
  salvagedStatusId: any;
  updateFlagForSalvage:boolean=false;
  isStraightLineMethod:boolean = false;
  public fileToUpload: File;
  fileUploadFlag: boolean;
  disableSubmitBtn: boolean = true;
  docFilePath: String = '';
  uploadedFileName: String = '';
  newFileName: String = '';
  srListLenght: number = 0;

  today: Date = new Date();

  retirementModes = [
  { retirementModeId: 1, retirementMode: 'BUY BACK' },
  { retirementModeId: 2, retirementMode: 'SCRAP' },
  { retirementModeId: 3, retirementMode: 'SALVAGEABLE' },
  { retirementModeId: 4, retirementMode: 'DISPOSE' }
];

  isRetirementModeDisable = false;
  constructor(private activatedRoute: ActivatedRoute, private commonService: CommonService,
    private locationRef: Location, private assetOptimaConstants: AssetOptimaConstants,
    private userSessionService: UserSessionService, private assetOptimaServices: AssetOptimaServices,
    private router: Router, private changeDetectorRefs: ChangeDetectorRef,
    private translateService: TranslateService,
    private dialog: MatDialog, private formBuilder: FormBuilder) {
    this.assetCodePageNumber = 1;
    this.assetCategoryPageNumber = 1;
    this.assetSubCategorPageNumber = 1;
    this.assetGroupPageNumber = 1;
    this.modelComboPageNumber = 1;
    this.modeofDisposalPageNumber = 1;
    this.personInchargePageNumber = 1;
    this.locationPageNumber = 1;
    this.storePageNumber = 1;
    this.supplierPageNumber =1;
    this.modelModulePageNumber=1;
    this.approvedSupplierPageNumber = 1;
    this.itemNamePageNumber = 1;
    this.assetConditionPageNumber=1;
    this.retirementRequest = "Retirement Request";
    this.accessories = "Accessories";
    this.consumables = "Consumables";
    this.spareParts = "Spare Parts";
    this.buyBack = "Buy Back";
    this.salvage = "Salvage";
    this.dispose = "Dispose";
    this.workflowApproval = "Workflow Approval";
    this.itemNameForHistory = '';

    this.retiredRequestStatusId = allAssetRetirmentStatus.AWAITING_FOR_RETAIR_APPROVAL;
    this.retiredStatusId = allAssetRetirmentStatus.RETIRED;
    this.salvageRequestStatusId = allAssetRetirmentStatus.AWAITING_FOR_SALVAGE_APPROVAL;
    this.salvagedStatusId = allAssetRetirmentStatus.SALVAGED;

    this.retireHistoryExpandedDataSource = this.retireHistoryDataSource;

    this.scheduleHdrModel = new MaintenanceScheduleHdrModel();
    this.asset= new AssetModel();
  }

  ngOnInit() {
    this.addBuyBackModelDataSource.data=[];
    this.addSalvageDataSource.data=[];
    this.approvalFlag = this.assetOptimaConstants.retireDisposedApproval;

    this.retireDisposeForm = new FormGroup({
      assetRetireId: new FormControl(0),
      retirementNo: new FormControl(''),
      requestedBy: new FormControl(this.userSessionService.getUserName()),
      requestReason: new FormControl(null,[Validators.required]),
      retirementRemarks: new FormControl(''),
      retirementStatus: new FormControl(''),
      retirementStoreId: new FormControl(0),
      assetCode: new FormControl(null,[Validators.required]),
      assetHdrId: new FormControl(0),
      salvageable: new FormControl(false),
      buyBack: new FormControl(''),
      buyBackSupplierId: new FormControl(''),
      buyBackSupplierName: new FormControl(null),
      buyBackSupplierSiteId: new FormControl(''),
      buyBackSupplierSiteName: new FormControl(null),
      buyBackCurrencyCode: new FormControl(''),
      dispose: new FormControl(false),
      disposeSupplierId: new FormControl(''),
      disposeValue:new FormControl(''),
      disposeRemarks: new FormControl('',[Validators.maxLength(500)]),
      disposalDt: new FormControl(''),
      disposalDtDisp: new FormControl(''),
      issueGatePass: new FormControl(''),
      assetStatusPreviousId: new FormControl(''),
      orgId: new FormControl(0),
      locationId: new FormControl(0),
      locationName: new FormControl(''),
      assetCategoryId: new FormControl(''),
      assetCategoryName: new FormControl(null),
      subCategoryId: new FormControl(''),
      subCategoryName: new FormControl(null),
      storeName: new FormControl(null),
      createdBy: new FormControl(this.userSessionService.getUserName()),
      createdDt: new FormControl(new Date()),
      createdDtDisp: new FormControl(this.commonService.convertToDateStringdd_mm_yyyy(new Date())),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      retirementStoreName: new FormControl(null),
      retireValueforBuyBack: new FormControl(''),
      retireRemarkforBuyBack: new FormControl('',[Validators.maxLength(100)]),
      buyBackModelList: new FormControl([]),
      approvalStatusRetirement: new FormControl(''),
      modelId: new FormControl(0),
      modelName: new FormControl(null),
      salvageDtlList:new FormControl([]),
      retirementDt: new FormControl(''),
      retirementDtDisp: new FormControl('',[Validators.required]),
      roomName: new FormControl(''),
      floorName: new FormControl(''),
      segmentName: new FormControl(''),
      blockName: new FormControl(''),
      disposeSupplierName: new FormControl(null),
      retirementStatusTemp: new FormControl(''),
      assignedPersonEmail: new FormControl(''),
      assetConditionId: new FormControl(0),
      assetCondition: new FormControl(null),
      retirementStatusId: new FormControl(0),
      retirementModeId : new FormControl(0),
      retirementMode: new FormControl(''),
      rejectReason: new FormControl(''),
      regulatoryCompliance : new FormControl(false)
    });

    this.assetMainForm = new FormGroup({
      modelId: new FormControl(),
      modelImage: new FormControl(''),
      assetGroupName: new FormControl(''),
      modelName: new FormControl(null),
      manufacturerName: new FormControl(),
      manufacturerId: new FormControl(),
      assetGroupId: new FormControl(),
      assetCategoryId: new FormControl(),
      assetCategoryName: new FormControl(),
      assetTypeId: new FormControl(),
      assetTypeName: new FormControl(),
      subCategoryId: new FormControl(),
      subCategoryName: new FormControl(),
      assetCode: new FormControl(''),
      description : new FormControl(''),
      serialNo: new FormControl(''),
      installationDtDisp: new FormControl(''),
      businessPartnerName: new FormControl(''),
      businessPartnerId: new FormControl(0),
      purchaseOrderNo: new FormControl(''),
      purchaseDtDisp: new FormControl(''),
      exchangeRt: new FormControl(0),
      originalPurchaseAmt: new FormControl(0),
      localPurchaseAmt: new FormControl(0),
      localTaxRate: new FormControl(0),
      localTaxAmt: new FormControl(0),
      totalPurchaseAmt: new FormControl(0),
      locationCurrencyCode: new FormControl(''),
      purchaseCurrencyCode: new FormControl(''),
      ownershipType: new FormControl(''),
      locationId: new FormControl(''),
      locationName: new FormControl(''),
      assetStatus: new FormControl(null),
      assetStatusId: new FormControl(''),
      departmentId: new FormControl(''),
      departmentName: new FormControl(''),
      personInCharge: new FormControl(null),
      personInChargeId: new FormControl(''),
      assetHdrId: new FormControl(0),
      orgId: new FormControl(''),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      functionalStatus: new FormControl(''),
      subDepartmentId: new FormControl(''),
      subDepartment: new FormControl(),
      depreciationMethod: new FormControl(''),
      bookedValue: new FormControl(0),
      noOfYears: new FormControl(0),
      scrapValue: new FormControl(0),
      accessoriesList: new FormControl([]),
      installationType: new FormControl(),
      equipmentCode : new FormControl(''),
      assignToPersonId : new FormControl(0),
      maintainanceThreshold : new FormControl(''),
      doNo: new FormControl(''),
      doDt: new FormControl(''),
      doDtDisp: new FormControl(''),
      //for schedule
      retiredDisposedBy: new FormControl(''),
      retiredDisposedDt: new FormControl(''),
      retiredDisposedDtDisp: new FormControl(''),
      srId: new FormControl(0),
      volumeLicensePresent: new FormControl(''),
      volumeLicenseList: new FormControl([]),
      assetAssigneeList:new FormControl([]),
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
      priorityName:  new FormControl(''),
      riskNature: new FormControl(''),
      depreciationMethodId: new FormControl(0),
      businessPartnerSiteName: new FormControl(''),
      businessPartnerSiteId: new FormControl(0),
      businessPartnerSiteContactNo: new FormControl(''),
      businessPartnerSiteAddress: new FormControl(''),
      businessPartnerSiteEmailId: new FormControl(''),
      handoverDtDisp: new FormControl(''),
      invoiceValue: new FormControl(''),
      expectedArrivalDt: new FormControl(''),
      expectedArrivalDtDisp: new FormControl(''),
      receivedDt: new FormControl(''),
      receivedDtDisp: new FormControl(''),
      deliveryRemarks: new FormControl(''),
      receivedBy: new FormControl(''),
      expectedInstallationDt: new FormControl(''),
      expectedInstallationDtDisp: new FormControl(''),
      screenType: new FormControl(''),
      installationRemarks: new FormControl(''),
      preInwInventoryHdrId: new FormControl(0),
      preInwInventoryDtlId: new FormControl(0),
      ageOfTheYear: new FormControl(0),
      personInchargeNumber :new FormControl(0),
      personInChargeEmailId:new FormControl(''),
      insInternalEngineerName:new FormControl(''),
      installationProvidedBy:new FormControl(''),
      installationProvidedById:new FormControl(0),
      installationProvidedByName:new FormControl(''),
      insExtEngineerName : new FormControl(''),
	    insExtEngineerContactNo : new FormControl(''),
      insExtEngineerEmailId : new FormControl(''),
      installationDoneBy: new FormControl(''),
      approvalStatusAsset: new FormControl(''),
      totalAmcCmcCostIncurred: new FormControl(''),
      totalaccessoriesCost: new FormControl(''),
      totalConsumableCost: new FormControl(''),
      labourCharge: new FormControl(''),
      spareCostUsedForStock:new FormControl(''),
      spareCostMiscPurchase:new FormControl(''),
      lastUpdatedCostInfoDtlDt:new FormControl(''),
      currentAgeInYears:new FormControl(''),
      purchaseDt: new FormControl(''),
      scrapValuePer:new FormControl(0),
      rateOfDepreciation:new FormControl(0),
      assetCondition: new FormControl(null),

      });

    this.buyBackForm = new FormGroup({
      retireBuyBackId: new FormControl(0),
      orgId: new FormControl(0),
      assetRetirementId: new FormControl(0),
      buyBackModelId: new FormControl(0),
      buyBackModelName: new FormControl(null,[Validators.required]),
      buyBackValuation: new FormControl(0),
      buyBackRemarks: new FormControl(''),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      buyBackManufacturerName: new FormControl('')
    });

    this.salvateItemsForm = new FormGroup({
      retireSalvageId: new FormControl(0),
      assetRetireId: new FormControl(0),
      salvageType: new FormControl(null),
      modelId: new FormControl(''),
      modelName: new FormControl(null),
      moduleId: new FormControl(0),
      moduleName: new FormControl(null),
      itemId: new FormControl(0),
      itemDesc: new FormControl(''),
      itemName: new FormControl(null),
      itemType: new FormControl(''),
      storeId: new FormControl(0),
      storeName: new FormControl(null),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      quantity: new FormControl(0)
    });

    this.assetMainForm.disable();

    this.retireDisposeForm.controls['locationName'].setValue(this.userSessionService.getUserLocationName());
    this.retireDisposeForm.controls['locationId'].setValue(this.userSessionService.getUserLocationId());

    //DISABLE
    this.retireDisposeForm.controls.retirementStatus.disable();
    this.retireDisposeForm.controls.retirementNo.disable();
    this.retireDisposeForm.controls.requestedBy.disable();

    this.retireDisposeForm.controls.assetCondition.disable();


    this.sourceScreen='retirement';

    //Add
    this.loadAssetInfo();

    //EDIT
    this.validateEditMode();
  }

  loadAssetInfo(){
    const assetHdrId = localStorage.getItem('assetHdrIdForAssetRetirement');

    if(Number(assetHdrId) > 0){
    this.commonService.commonGetService('fetchAssetDtlByAssetId.sams', assetHdrId).subscribe(
      data => {

        this.assetMainForm.patchValue(data.responseData);

        this.retireDisposeForm.controls.assetHdrId.setValue(assetHdrId);
        this.retireDisposeForm.controls.assetCode.setValue(data.responseData.assetCode);

        this.retireDisposeForm.controls.assetCategoryId.setValue(data.responseData.assetCategoryId);
        this.retireDisposeForm.controls.assetCategoryName.setValue(data.responseData.assetCategoryName);
      
        this.retireDisposeForm.controls.subCategoryId.setValue(data.responseData.assetCategoryId);
        this.retireDisposeForm.controls.subCategoryName.setValue(data.responseData.assetCategoryName);

        this.retireDisposeForm.controls.assetConditionId.setValue(data.responseData.assetCondition);
        this.retireDisposeForm.controls.assetCondition.setValue(data.responseData.assetCondition);
      })

      localStorage.removeItem('assetHdrIdForAssetRetirement');
    }
  }

  validateEditMode() {
    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        primaryId = Number(primaryId);
        var mode = params.mode;
        this.retirementId = Number(primaryId);
        if (primaryId <= 0) {
          this.headingDisplay = 'Create';
          this.buttonDisplay = 'Submit';
          this.showApprovalButton=false;
          this.addMode=true;

          var source = localStorage.getItem('source');
          if(source != null && source != '') {
             if(source == 'WORKORDER') {
              this.retireDisposeForm.controls['assetCode'].setValue(localStorage.getItem('assetCode'));
              this.retireDisposeForm.controls['assetHdrId'].setValue(localStorage.getItem('assetId'));
              this.retireDisposeForm.controls['requestedBy'].setValue(localStorage.getItem('requestedBy'));

              this.fetchAssetDtlByAssetId(localStorage.getItem('assetId'));
             }
          }
       } else {
          this.commonService.commonGetService('getAssetRetireDisposedIndividualRecord.sams', primaryId).subscribe(
            data => {
              this.retireDisposeForm.patchValue(data.responseData);
              this.docFilePath = data.responseData.retireDocFilePath;
              if(this.retireDisposeForm.controls.requestReason.value != 'BEYOND ECONOMICAL REPAIR' && this.retireDisposeForm.controls.requestReason.value != 'ECONOMICALLY NOT VIABLE' && this.docFilePath != ''){
                this.fileName = this.docFilePath.split('/').pop()?.split('.')[0];
                this.uploadedFileName = this.docFilePath.split('/').pop()?.split('.')[0];
                this.fileUploadFlag = true;
              }
              this.translateService.get([data.responseData.assetCondition])
              .subscribe((val) => {
                const status = Object.values(val)
                if(status.length > 0){
                  this.retireDisposeForm.controls.assetCondition.setValue(status[0]);
                }
              });

              this.translateService.get([data.responseData.retirementStatus])
              .subscribe((val) => {
                const status = Object.values(val)
                if(status.length > 0){
                  this.retireDisposeForm.controls.retirementStatus.setValue(status[0]);
                }
              });
			
              this.assetMainForm.patchValue(data.responseData.assetHdrTO);
              if(this.assetMainForm.controls.depreciationMethod.value === 'STRAIGHT LINE') {
                this.isStraightLineMethod = true;
              } else if(this.assetMainForm.controls.depreciationMethod.value === 'WRITTEN DOWN'){
                this.isStraightLineMethod = false;
              }
              if(this.assetMainForm.controls.localPurchaseAmt.value > 0){
                this.assetMainForm.controls.scrapValuePer.setValue(((100 * this.assetMainForm.controls.scrapValue.value)/this.assetMainForm.controls.localPurchaseAmt.value).toFixed(2));
              }
              this.salvateItemsForm.controls.modelId.setValue(data.responseData.assetHdrTO.modelId);
              this.salvateItemsForm.controls.modelName.setValue(data.responseData.assetHdrTO.modelName);
              this.addBuyBackModelDataSource.data = data.responseData.buyBackModelList;
              this.addSalvageDataSource.data = data.responseData.salvageDtlList;
              this.fetchAssetDtlByAssetId(data.responseData.assetHdrId);
			  this.checkAssetCodeExistingPR(data.responseData.assetHdrId);
              this.getWorkflowApprovalForRetirement();
              this.disableFieldsBasedOnRetirementStatus(this.retireDisposeForm.controls.retirementStatusId.value);
              this.retireHistory(data);
              this.transactionSource = this.retirement;


              this.getInvalidControls();
              console.log('Form Validity:', this.retireDisposeForm.valid);
console.log('Invalid Controls:', this.getInvalidControls());

            }
          );
          if(mode =='view'){
            this.retireDisposeForm.disable();
            this.buyBackForm.disable();
            this.salvateItemsForm.disable();
            this.headingDisplay = 'View';
            this.modeDisplay=true;
            this.showApprovalButton=false;
          }else{
            this.headingDisplay = 'Edit';
            this.buttonDisplay = 'Update';
            this.disableClear = true;
          }
        }
      });

      console.log(this.retireDisposeForm.controls.disposeSupplierName);

  }

  loadAssetCodeComboData(searchValue) {
    this.scrollsyncAssetCode = true;
    const locId = this.retireDisposeForm.controls.locationId.value;
    const defaultuserLocId = this.userSessionService.getUserLocationId();
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetCodeCombo.sams', searchValue.term, defaultuserLocId > 0 ? locId: 0, 0, this.recordsPerPageForCombo, this.assetCodePageNumber,'','assetRetirement').subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assetCodePageNumber , this.assetCodeCombo , data.responseData.comboList)
        this.assetCodePageNumber = this.getData.pageNumber;
        this.assetCodeCombo = this.getData.dataList;
        //this.assetCodeCombo = (this.assetCodeCombo).filter(data => {return data.avilableToProcess === true;});
        this.scrollsyncAssetCode = false
      }
    );;
  }

  selectedAssetCodeData(event) {

    if (event === undefined) {
      this.retireDisposeForm.controls['assetCode'].setValue(null);
      this.retireDisposeForm.controls['assetHdrId'].setValue(0);
      this.retireDisposeForm.controls['assetCategoryId'].setValue(0);
      this.retireDisposeForm.controls['assetCategoryName'].setValue(null);
      this.retireDisposeForm.controls['subCategoryId'].setValue(0);
      this.retireDisposeForm.controls['subCategoryName'].setValue(null);
      this.assetCodePageNumber = 1;
      this.assetCodeCombo = [];
      this.personInchargeComboList =[];
      this.personInchargePageNumber = 1;
	  this.purchaseRequestLength = 0;
      this.prDataSource = [];
      this.prTotalAmount = 0;
      this.retireDisposeForm.controls['requestReason'].setValue('');
      this.assetMainForm.controls['assetHdrId'].setValue(0);
      // this.retireDisposeForm.controls.requestedBy.setValue(null);
      // this.retireDisposeForm.controls.assignedPersonEmail.setValue(null);
    } else {
	  this.retireDisposeForm.controls['requestReason'].setValue('');
      this.assetMainForm.controls['assetHdrId'].setValue(0);
      // this.retireDisposeForm.controls.requestedBy.setValue(null);
      // this.retireDisposeForm.controls.assignedPersonEmail.setValue(null);
      // this.personInchargeComboList =[];
      // this.personInchargePageNumber = 1;
      // this.checkAssetCodeExistinginSR(event);
	  this.checkAssetCodeExistingPR(event.assetHdrId);
      }
  }

  calculateDownHours(assetId){
    this.commonService.commonGetService('calculateAssetInfo.sams',assetId).subscribe(
      data => {
        this.retireDisposeForm.controls.noOfYrsUsed.setValue(data.responseData.TOTAL_YEARS);
        this.retireDisposeForm.controls.utilizationHrs.setValue(data.responseData.UTIL_HRS);
        this.retireDisposeForm.controls.breakDownHrs.setValue(data.responseData.TOTAL_DOWN_HRS);
      });
  }

  listOfCategory(searchValue) {
    this.scrollsyncAssetCategory = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetCategoryCombo.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.assetCategoryPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assetCategoryPageNumber , this.assetCategoryList , data.responseData.comboList)
        this.assetCategoryPageNumber = this.getData.pageNumber;
        this.assetCategoryList = this.getData.dataList;
        this.scrollsyncAssetCategory = false;
      }
    );

  }

  getCategoryComboValue(event) {
    if (event === undefined) {
      this.retireDisposeForm.controls['assetCategoryId'].setValue(0);
      this.retireDisposeForm.controls['assetCategoryName'].setValue(null);
      this.assetCategoryPageNumber = 1;
      this.assetCategoryList = [];
      this.clearAllFieldsForCEID();
    } else {
      this.retireDisposeForm.controls['assetCategoryId'].setValue(event.assetCategoryId);
      this.retireDisposeForm.controls['assetCategoryName'].setValue(event.assetCategoryName);
      this.clearAllFieldsForCEID();
    }
  }

  listOfSubCategory(searchValue) {
    this.scrollsyncAssetSubCategory = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetSubCategoryCombo.sams', searchValue.term, this.retireDisposeForm.controls['assetCategoryId'].value,
      '', this.recordsPerPageForCombo, this.assetSubCategorPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetSubCategorPageNumber , this.subCategoryList , data.responseData.comboList)
          this.assetSubCategorPageNumber = this.getData.pageNumber;
          this.subCategoryList = this.getData.dataList;
          this.scrollsyncAssetSubCategory = false;
        }
      );
  }

  getSubCategoryComboValue(event) {
    if (event === undefined) {
      this.retireDisposeForm.controls['subCategoryId'].setValue(0);
      this.retireDisposeForm.controls['subCategoryName'].setValue(null);
      this.assetSubCategorPageNumber = 1;
      this.subCategoryList = [];
      this.assetCategoryPageNumber = 1;
      this.assetCategoryList = [];
      this.clearAllFieldsForCEID();
    } else {
      this.retireDisposeForm.controls['subCategoryId'].setValue(event.subCategoryId);
      this.retireDisposeForm.controls['subCategoryName'].setValue(event.subCategoryName);
      this.clearAllFieldsForCEID();
    }

  }

  listOfAllAssetGroup(searchKey) {
    this.scrollsyncAssetGroup = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetGroupCombo.sams', searchKey.term, this.retireDisposeForm.controls['subCategoryId'].value, '',
      this.recordsPerPageForCombo, this.assetGroupPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchKey, this.assetGroupPageNumber , this.assetGroupList , data.responseData.comboList)
          this.assetGroupPageNumber = this.getData.pageNumber;
          this.assetGroupList = this.getData.dataList;
          this.scrollsyncAssetGroup = false;
        });
  }

  getAssetGroupComboValue(event) {
    if (event != null) {
      this.retireDisposeForm.controls['assetGroupName'].setValue(event.assetGroupName);
      this.retireDisposeForm.controls['assetGroupId'].setValue(event.assetGroupId);
      this.retireDisposeForm.controls['assetTypeName'].setValue(event.assetTypeName);
      this.retireDisposeForm.controls['assetTypeId'].setValue(event.assetTypeId);
      this.retireDisposeForm.controls['assetCategoryName'].setValue(event.assetCategoryName);
      this.retireDisposeForm.controls['assetCategoryId'].setValue(event.assetCategoryId);
      this.retireDisposeForm.controls['subCategoryName'].setValue(event.subCategoryName);
      this.retireDisposeForm.controls['subCategoryId'].setValue(event.subCategoryId);
    }else{
      this.retireDisposeForm.controls['assetGroupName'].setValue("");
      this.retireDisposeForm.controls['assetGroupId'].setValue(0);
      this.retireDisposeForm.controls['assetTypeName'].setValue("");
      this.retireDisposeForm.controls['assetTypeId'].setValue(0);
      this.retireDisposeForm.controls['assetCategoryName'].setValue("");
      this.retireDisposeForm.controls['assetCategoryId'].setValue(0);
      this.retireDisposeForm.controls['subCategoryName'].setValue("");
      this.retireDisposeForm.controls['subCategoryId'].setValue(0);
    }
  }

  listOfAllModel(searchKey) {
    this.scrollsyncModel=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults('listOfAllModelCombo.sams', searchKey.term, '', '', this.recordsPerPageForCombo, this.modelComboPageNumber).subscribe(
    (data) => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchKey, this.modelComboPageNumber , this.modelComboList , data.responseData.comboList)
      this.modelComboPageNumber = this.getData.pageNumber;
      this.modelComboList = this.getData.dataList;
      this.scrollsyncModel=false;
    });
  }

  getModelComboValue(event){
    if(event!=null){
      this.buyBackForm.controls['buyBackModelId'].setValue(event.modelId);
      this.buyBackForm.controls['buyBackManufacturerName'].setValue(event.manufacturerName);
    }else{
      this.buyBackForm.controls['buyBackModelId'].setValue(0);
      this.buyBackForm.controls['buyBackManufacturerName'].setValue(null);
      this.modelComboList=[];
      this.modelComboPageNumber=1;
    }
  }

  loadPersonInchargeComboData(searchValue) {

    const assetHdrId = this.retireDisposeForm.controls.assetHdrId.value;
    this.scrollsyncPersonIncharge=true;
    if (assetHdrId > 0) {
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllAssigneeMappedAgainstAssetCombo.sams',searchValue.term,assetHdrId,'',
            this.recordsPerPageForCombo,this.personInchargePageNumber).subscribe(
      (data)=>{
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.personInchargePageNumber , this.personInchargeComboList , data.responseData.comboList)
        this.personInchargePageNumber = this.getData.pageNumber;
        this.personInchargeComboList = this.getData.dataList;
        this.scrollsyncPersonIncharge=false;
     }
    );
    }else {
      this.personInchargeComboList = [];
      this.personInchargePageNumber = 1;
      this.scrollsyncPersonIncharge = false;
      this.commonService.openToastWarningMessage(`Kindly Select The "Asset Code".`);
    }
  }

  dateValidationRequestedDt(event){
    return false;
  }

  dateValidationinstall(event){
    return false;
  }

  clear(){
    this.retireDisposeForm.reset();
    this.assetMainForm.reset();
    this.maintenanceScheduleDataSource=[];
    this.listOfCertificates=[];
    this.contractDataSource=[];
    this.assetDocumentDataSource=[];
    this.assetAssigneeDataSource=[];
    this.sparePartsDataSource.data=[];
    this.consumablesDataSource.data=[];
    this.accessoriesDataSource.data=[]
	this.prDataSource=[];
    this.retireDisposeForm.updateValueAndValidity();
  }

  exit(){
    this.locationRef.back();
  }

  checkDisposeFormValidation(event){
    let disposeValid = false;
    if(this.retireDisposeForm.controls.retirementModeId.value == 4){
      if(this.retireDisposeForm.controls.disposeSupplierId.value > 0 && this.retireDisposeForm.controls.disposeValue.value != '' &&
        this.retireDisposeForm.controls.disposeRemarks.value != null && this.retireDisposeForm.controls.disposeRemarks.value != ''
        && this.retireDisposeForm.controls.disposeValue.value != null){
          disposeValid = true;
      }
      else if(event == 0){
        this.commonService.openToastWarningMessage("Kindly Input Disposal Information");
        disposeValid = false;
      }
      else{
        disposeValid = false;
      }
    }
    else{
      disposeValid = true
    }

	// EOL document upload
    if(this.retireDisposeForm.controls.assetHdrId.value > 0 && this.retireDisposeForm.controls.requestReason.value != 'BEYOND ECONOMICAL REPAIR' && this.retireDisposeForm.controls.requestReason.value != 'ECONOMICALLY NOT VIABLE'){
      if(this.fileUploadFlag){
        if(this.newFileName != '' && this.newFileName != this.uploadedFileName){
          this.uploadFile();
        }
        disposeValid = true
      } else{
        // this.commonService.openToastWarningMessage("Kindly Attach Asset Retirement document");
        // disposeValid = false;
        disposeValid = true;
      }
    }

    return disposeValid;

  }

  save(){

      let enableSaveFlag = this.checkDisposeFormValidation(0);

      if(enableSaveFlag){
        this.uploadAssetFlag=true;
        this.retireDisposeForm.controls.salvageDtlList.setValue(this.addSalvageDataSource.data);
        this.commonService.commonInsertService('saveOrUpdateAssetRetireDisposal.sams',this.retireDisposeForm.getRawValue()).subscribe(
          data => {
            if(data.success){
              this.uploadAssetFlag=false;
              this.commonService.openToastSuccessMessage(data.message);
              this.locationRef.back();
            } else {
              this.uploadAssetFlag=false;
              this.commonService.openToastErrorMessage(data.message);
            }
          }
        );

      }

  }

  decisionAgainstSR(status){
    this.retireDisposeForm.controls.retireDisposalStatus.setValue(status);

    this.commonService.commonInsertService('approvalsRetireDisposal.sams',this.retireDisposeForm.getRawValue()).subscribe(
      data => {
        if(data.success){
          let message = data.responseData + ' successfully';
          this.commonService.openToastSuccessMessage(message);
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }
    );
  }

  checkAssetCodeExistinginSR(element){
    let serviceRequestOpenCount = 0;
    this.commonService.commonGetService('checkAssetCodeIsExisting.sams',element.assetHdrId).subscribe(
      data => {

        if(data.responseData > 0){
          let message= `"${element.assetCode}" Has Active Service Requests. Kindly Close them to Proceed.`;
          this.commonService.openToastWarningMessage(message);
          serviceRequestOpenCount=1;
        }
        else{
          this.retireDisposeForm.controls['assetCode'].setValue(element.assetCode);
          this.retireDisposeForm.controls['assetHdrId'].setValue(element.assetHdrId);
          this.retireDisposeForm.controls['assetCategoryId'].setValue(element.assetCategoryId);
          this.retireDisposeForm.controls['assetCategoryName'].setValue(element.assetCategoryName);
          this.retireDisposeForm.controls['subCategoryId'].setValue(element.subCategoryId);
          this.retireDisposeForm.controls['subCategoryName'].setValue(element.subCategoryName);
          this.fetchAssetDtlByAssetId(element.assetHdrId)
          serviceRequestOpenCount=0;
        }
      });

      return serviceRequestOpenCount;
  }

  clearAllFieldsForCEID(){
    this.retireDisposeForm.controls['assetCode'].setValue(null);
    this.retireDisposeForm.controls['assetHdrId'].setValue(0);
    this.retireDisposeForm.controls['assetTypeName'].setValue(null);
    this.retireDisposeForm.controls['assetTypeId'].setValue(0);
    this.retireDisposeForm.controls['assetTypeName'].setValue(null);
    this.retireDisposeForm.controls['assetGroupId'].setValue(0);
    this.retireDisposeForm.controls['assetGroupName'].setValue(null);
    this.retireDisposeForm.controls['modelId'].setValue(0);
    this.retireDisposeForm.controls['modelName'].setValue(null);
    this.retireDisposeForm.controls['manufacturerId'].setValue(0);
    this.retireDisposeForm.controls['manufacturerName'].setValue(null);
    this.retireDisposeForm.controls['serialNo'].setValue(null);
    this.retireDisposeForm.controls['assetStatusId'].setValue(0);
    this.retireDisposeForm.controls['assetStatus'].setValue(null);
    this.retireDisposeForm.controls['departmentName'].setValue(null);
    this.retireDisposeForm.controls['departmentId'].setValue(0);
    this.retireDisposeForm.controls['subDepartmentId'].setValue(0);
    this.retireDisposeForm.controls['subDepartment'].setValue(null);
    this.retireDisposeForm.controls['ownershipType'].setValue(null);
    this.retireDisposeForm.controls['functionalStatus'].setValue(null);
    this.retireDisposeForm.controls['maintenanceType'].setValue(null);
    this.retireDisposeForm.controls['personInChargeId'].setValue(0);
    this.retireDisposeForm.controls['personInCharge'].setValue(null);
    this.retireDisposeForm.controls['supplierId'].setValue(0);
    this.retireDisposeForm.controls['supplierName'].setValue(null);
    this.retireDisposeForm.controls['locationCurrencyCode'].setValue(null);
    this.retireDisposeForm.controls['purchaseCurrencyCode'].setValue(null);
    this.retireDisposeForm.controls['exchangeRt'].setValue(null);
    this.retireDisposeForm.controls['originalPurchaseAmt'].setValue(0);
    this.retireDisposeForm.controls['localPurchaseAmt'].setValue(0);
    this.retireDisposeForm.controls['localTaxRate'].setValue(0);
    this.retireDisposeForm.controls['localTaxAmt'].setValue(0);
    this.retireDisposeForm.controls['totalPurchaseAmt'].setValue(0);
    this.retireDisposeForm.controls['doNo'].setValue(null);
    this.retireDisposeForm.controls['doDtDisp'].setValue(null);
    this.retireDisposeForm.controls['installationDtDisp'].setValue(null);
    this.retireDisposeForm.controls['warrentyCoverageType'].setValue(null);
    this.retireDisposeForm.controls['warrentyStartDtDisp'].setValue(null);
    this.retireDisposeForm.controls['warrentyEndDtDisp'].setValue(null);
    this.retireDisposeForm.controls['purchaseDtDisp'].setValue(null);
    this.retireDisposeForm.controls['depreciationMethod'].setValue(null);
    this.retireDisposeForm.controls['bookedValue'].setValue(0);
    this.retireDisposeForm.controls['noOfYears'].setValue(0);
    this.retireDisposeForm.controls['scrapValue'].setValue(0);
    this.retireDisposeForm.controls['depreciationMethod'].setValue(null);
    this.retireDisposeForm.controls['personInChargeId'].setValue(0);
    this.retireDisposeForm.controls['personInCharge'].setValue(null);
    this.retireDisposeForm.controls['orgId'].setValue(0);
    this.retireDisposeForm.controls['locationId'].setValue(0);
    this.retireDisposeForm.controls['locationName'].setValue(null);
    this.retireDisposeForm.controls['assetStatusOldId'].setValue(0);
    this.retireDisposeForm.controls.noOfYrsUsed.setValue(null);
    this.retireDisposeForm.controls.utilizationHrs.setValue(null);
    this.retireDisposeForm.controls.breakDownHrs.setValue(null);
  }

  navigateToAssetRetireDisposal(){
    this.locationRef.back();
  }

  loadLocationComboData(searchValue) {
    this.scrollsync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllUserLocForCombo, searchValue.term, '', '',
      this.recordsPerPageForCombo, this.locationPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.locationPageNumber , this.locationCombo , data.responseData.comboList)
          this.locationPageNumber = this.getData.pageNumber;
          this.locationCombo = this.getData.dataList;
          this.scrollsync = false;
        }
      );
  }

  selectedLocationData(event) {
    if (event === undefined) {
      this.retireDisposeForm.controls.locationId.setValue(0);
      this.retireDisposeForm.controls.locationName.setValue(null);
      this.locationPageNumber = 1;
      this.locationCombo = [];
    } else {
      this.retireDisposeForm.controls.locationId.setValue(event.locationId);
      this.retireDisposeForm.controls.locationName.setValue(event.locDisplayField);
    }
  }


  loadRequestReasonComboData(searchValue) {
    this.scrollsyncMode = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllRetirementReasonCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.modeofDisposalPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.modeofDisposalPageNumber , this.modeofDisposalCombo , data.responseData.comboList)
          this.modeofDisposalPageNumber = this.getData.pageNumber;
          this.modeofDisposalCombo = this.getData.dataList;
          this.scrollsyncMode = false;
        }
      );
  }

  fetchAssetDtlByAssetId(assetId){
    this.commonService.commonGetService('fetchAssetDtlByAssetId.sams', assetId).subscribe(
      data => {

        this.translateService.get(data.responseData.assetStatus)
        .subscribe(val => {
          this.assetMainForm.patchValue(data.responseData);
          this.assetMainForm.controls.assetStatus.setValue(val);
        });

        //FOR SET VALUES FROM SCREEN CALLED FROM WORKORDER SCREEN
 		    this.retireDisposeForm.controls['assetCode'].setValue(data.responseData.assetCode);
        this.retireDisposeForm.controls['assetHdrId'].setValue(data.responseData.assetHdrId);
        this.retireDisposeForm.controls['assetCategoryId'].setValue(data.responseData.assetCategoryId);
        this.retireDisposeForm.controls['assetCategoryName'].setValue(data.responseData.assetCategoryName);
        this.retireDisposeForm.controls['subCategoryId'].setValue(data.responseData.subCategoryId);
        this.retireDisposeForm.controls['subCategoryName'].setValue(data.responseData.subCategoryName);
        this.retireDisposeForm.controls.modelName.setValue(data.responseData.modelName);



        this.translateService.get([data.responseData.assetCondition])
              .subscribe((val) => {
                const status = Object.values(val)
                this.retireDisposeForm.controls.assetCondition.setValue(status[0])
                this.retireDisposeForm.controls['assetCondition'].setValue(status[0]);
              });

        this.translateService.get([data.responseData.assetStatus])
              .subscribe((val) => {
                const status = Object.values(val)
                this.assetMainForm.controls.assetStatus.setValue(status[0])
                this.assetMainForm.controls['assetStatus'].setValue(status[0]);
              });

        //this.retireDisposeForm.controls['assetCondition'].setValue(data.responseData.assetCondition);
        this.retireDisposeForm.controls['assetConditionId'].setValue(data.responseData.assetConditionId);
       

        //this.accessoriesDataSource = data.responseData.modelTO.accessoriesList;
        //this.accessoriesLength= this.accessoriesDataSource.data.length;
        //this.consumablesDataSource = data.responseData.modelTO.consumableList;
        //this.consumablesLength= this.consumablesDataSource.data.length;
        //this.sparePartsDataSource = data.responseData.modelTO.modelItemList;
        //this.sparePartsLength= this.sparePartsDataSource.data.length;
        this.assetAssigneeDataSource = data.responseData.assetAssigneeList;
        this.assetAssigneeLength = this.assetAssigneeDataSource.length;
        this.assetDocumentDataSource = data.responseData.assetDocList;
        this.assetDocumentLength=this.assetDocumentDataSource.length;
        this.loadContractDetailsForAssetList();//to get Contract Details for Asset
        this.fetchListOfAssetCertificates() //to get Asset Certificates
        this.fetchListForSchedule();
        this.retireDisposeForm.controls.modelId.setValue(data.responseData.modelId);
        this.retireDisposeForm.controls.modelName.setValue(data.responseData.modelName);
        //this.calculateAgeofAsset(this.assetMainForm.controls.purchaseDtDisp.value);
        this.retireDisposeForm.controls.assetStatusPreviousId.setValue(this.assetMainForm.controls.assetStatusId.value);
      });
  }

  calculateAgeofAsset(purchaseDtDisp){
    let date1=new Date(purchaseDtDisp);
    let date2=new Date();
    let result = date2.getFullYear()-date1.getFullYear();
    this.assetMainForm.controls.currentAgeInYears.setValue(result);
  }

  downloadDocument(filePath: string, contentType: string) {
    var fileName = filePath.split('.')[0];
    this.commonService.downloadFile(filePath, contentType).subscribe(
      data => {
        let file = filePath.split('.');
        this.commonService.showDownloadPopUp(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
      }
    );
  }

  loadContractDetailsForAssetList(){
    this.contractDataSource=[];
    this.commonService.commonGetService('loadAssetContract.sams', this.assetMainForm.controls.assetHdrId.value).subscribe(
      data => {
        if (data.success) {
          this.contractDataSource = data.responseData;

          this.contractDataSource = data.responseData.filter(
        (contract: any) => contract.woApprovalStatus === 'APPROVED'
      );
          console.log("this.contractDataSource ", this.contractDataSource);
          console.log("data.responseData ", data.responseData);
          this.contractLength = this.contractDataSource.length;
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
      }
    );
  }

  fetchListOfAssetCertificates() {
    this.commonService.commonGetService('loadAssetCertificate.sams', this.assetMainForm.controls.assetHdrId.value).subscribe(
      (data) => {
        if(data.success) {
        this.listOfCertificates = [];
        this.listOfCertificates = this.listOfCertificates.concat(data.responseData);
        this.statutoryRequirementLength=this.listOfCertificates.length;
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }

      }
    );
  }

  fetchListForSchedule(){
    this.scheduleHdrModel.direction = 'desc';
    this.scheduleHdrModel.columnName = 'updatedDt';
    this.scheduleHdrModel.pageNumber = Number(this.pageIndex);
    this.scheduleHdrModel.recordsPerPage = Number(this.pageSize);
    this.scheduleHdrModel.assetHdrId=this.assetMainForm.controls.assetHdrId.value;
    this.maintenanceScheduleDataSource=[];
    this.commonService.commonListService('listOfSchedules.sams',this.scheduleHdrModel).subscribe(
      data => {
        if(data.success){
          this.maintenanceScheduleDataSource = data.responseData.dataList;
          this.schedulingLength = this.maintenanceScheduleDataSource.length;
        }else{
        }
      },error =>{
      }
    );
  }

  contractAddEdit(contractId,mode) {
    this.router.navigate(['home/asset/contractCreate/'+contractId+ '/' +mode+ '/' +'asset']);
    localStorage.setItem('assetHdrId',this.assetMainForm.controls.assetHdrId.value);
    localStorage.setItem('assetCode',this.assetMainForm.controls.assetCode.value);
    localStorage.setItem('modelId',this.assetMainForm.controls.modelId.value);
    localStorage.setItem('modelName',this.assetMainForm.controls.modelName.value);
    localStorage.setItem('ownershipType',this.assetMainForm.controls.ownershipType.value);
    localStorage.setItem('totalPurchaseAmt',this.assetMainForm.controls.totalPurchaseAmt.value);
  }

  generateContractPDF(contractHdrId?: number) {
    this.commonService.commonGetService('generateContractPDF.sams', contractHdrId).subscribe(
      data => {
        if (data.success) {
          this.downloadDocument(data.responseData, 'application/pdf');
        } else {
        }
      }, error => {
      }
    );
  }

  createMaintenanceSchedule(scheduleHdrId,mode){
    this.commonService.showSpinner();
    this.router.navigate(['home/serviceRequest/maintenanceScheduleCreate/'+scheduleHdrId + '/' + mode]);
    localStorage.setItem('assetIdForScheduling',String(this.assetMainForm.controls.assetHdrId.value));
    localStorage.setItem('sourceScreen','ASSET');
    this.commonService.hideSpinner();
  }

  listOfStore(searchTerms) {
    this.scrollStoreNamesync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults('listOfAllStoreCombo.sams', searchTerms.term, '', '', this.recordsPerPageForCombo, this.storePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.storePageNumber , this.storeList , data.responseData.comboList)
        this.storePageNumber = this.getData.pageNumber;
        this.storeList = this.getData.dataList;
        this.scrollStoreNamesync = false;
      }
    );
  }

  getStoreValue(event) {
    if (event === undefined) {
      this.retireDisposeForm.controls['retirementStoreId'].setValue(0);
      this.storeList = [];
      this.storePageNumber = 1;
    } else {
      this.retireDisposeForm.controls['retirementStoreId'].setValue(event.storeId);
    }
  }

  getStoreValueLineLevel(event,index){
    if(event === undefined){
      this.addSalvageDataSource.data[index].storeId=0;
      this.addSalvageDataSource.data[index].storeName=null;
      this.storeList = [];
      this.storePageNumber = 1;
    } else {
      this.addSalvageDataSource.data[index].storeId=event.storeId;
      this.addSalvageDataSource.data[index].storeName=event.storeName;
    }
    this.checkSalvageableValidations();
  }

  // listOfSupplier(searchTerms) {
  //   this.scrollSupplierNamesync = true;
  //   this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
  //   this.commonService.getComboResults(this.assetOptimaServices.listOfAllSupplierNameCombo, searchTerms.term, '', '', this.recordsPerPageForCombo, this.supplierPageNumber,'').subscribe(
  //     (data) => {
  //       this.getData = new getData();
  //       this.getData = this.commonService.fetchDataList(searchTerms, this.supplierPageNumber , this.supplierList , data.responseData.comboList)
  //       this.supplierPageNumber = this.getData.pageNumber;
  //       this.supplierList = this.getData.dataList;
  //       this.scrollSupplierNamesync = false;
  //     }
  //   );
  // }

  fetchIdOfSupplierForBuyBack(event) {
    this.retireDisposeForm.controls.buyBackSupplierSiteId.setValue(null);
    this.retireDisposeForm.controls.buyBackSupplierSiteName.setValue(null);

    if (event === undefined) {
      this.retireDisposeForm.controls.buyBackSupplierId.setValue(0);
      this.supplierList = [];
      this.supplierPageNumber = 1;
    } else {
      this.retireDisposeForm.controls.buyBackSupplierId.setValue(event.businessPartnerId);
      this.retireDisposeForm.controls.buyBackSupplierName.setValue(event.businessPartnerName);

    }
    this.supplierLocationList = [];
    this.approvedSupplierPageNumber =1;
  }

  listOfSupplier(searchTerms) {
      this.scrollSupplierNamesync = true;
      this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
      let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.SUPPLIER];
      this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchTerms.term, '', '', this.recordsPerPageForCombo, this.supplierPageNumber,'',partnerRoles).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchTerms, this.supplierPageNumber , this.supplierList , data.responseData.comboList)
          this.supplierPageNumber = this.getData.pageNumber;
          this.supplierList = this.getData.dataList;
          this.scrollSupplierNamesync = false;
        }
      );
    }

    fetchIdOfSupplier(event) {
    if (event === undefined || event.length <=0) {
      this.retireDisposeForm.controls.disposeSupplierId.setValue(0);
      this.supplierList = [];
      this.supplierPageNumber = 1;

    } else {
      this.retireDisposeForm.controls.disposeSupplierId.setValue(event.businessPartnerId);
      this.retireDisposeForm.controls.disposeSupplierName.setValue(event.businessPartnerName);
      this.supplierList = [];
      this.supplierPageNumber = 1;
  }
}

  addBuyBackModel(){
    let index=this.commonService.getIndexOfTheItem(this.addBuyBackModelDataSource.data, true, 'buyBackModelId', this.buyBackForm.controls.buyBackModelId.value)
    if(index== -1){
      this.addBuyBackModelDataSource.data.push(this.buyBackForm.value);
      this.retireDisposeForm.controls.buyBackModelList.setValue(this.addBuyBackModelDataSource.data);
      this.changeDetectorRefs.detectChanges();
      this.tableBuyBackModel.renderRows();
      this.buyBackForm.controls.buyBackModelId.setValue(0);
      this.buyBackForm.controls.buyBackModelName.setValue(null);
    }else{
      this.commonService.openToastWarningMessage('Selected Model already added.')
    }
  }

  deleteBuyBackModel(deleteid,index){
      let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        height: 'auto',
        width: '400px',
        data: {
          'Text': 'Buy Back Model'
        }
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(
        data => {
          if (data.status) {
            if (deleteid <= 0) {
              this.buyBackModelTempPush = this.addBuyBackModelDataSource.data;
              this.addBuyBackModelDataSource.data.splice(index, 1);
              this.addBuyBackModelDataSource.data = this.buyBackModelTempPush;
              this.changeDetectorRefs.detectChanges();
              this.commonService.openToastSuccessMessage("Record Deleted Successfully.");
            } else {
              this.commonService.commonGetService('deleteBuyBackModel.sams', deleteid).subscribe(
                data => {
                  if (data.success) {
                    this.commonService.openToastSuccessMessage(data.message);
                    this.buyBackModelTempPush = this.addBuyBackModelDataSource.data;
                    this.addBuyBackModelDataSource.data.splice(index, 1);
                    this.addBuyBackModelDataSource.data = this.buyBackModelTempPush;
                    this.changeDetectorRefs.detectChanges();
                  } else {
                    this.commonService.openToastErrorMessage(data.message);
                  }
                }
              );
            }
          }
        });
  }

  enableTabs(moduleName){
    if(moduleName='BUY_BACK'){
      this.disableBuyBack=true;
      this.disableDisposal=false;
      this.disableSalvage=false;
    }else if(moduleName='SALVAGE'){
      this.disableBuyBack=true;
      this.disableDisposal=false;
      this.disableSalvage=true;
    }else if(moduleName='DISPOSE'){
      this.disableBuyBack=true;
      this.disableDisposal=true;
      this.disableSalvage=true;
    }
  }

  getWorkflowApprovalForRetirement() {
    let retirmentStatusId = this.retireDisposeForm.controls.retirementStatusId.value;

    if(retirmentStatusId == allAssetRetirmentStatus.AWAITING_FOR_RETAIR_APPROVAL || retirmentStatusId == allAssetRetirmentStatus.RETIRED){
      this.retirement = allWorkflowStatus[allWorkflowStatus.RETIREMENT];
    }
    else if(retirmentStatusId == allAssetRetirmentStatus.AWAITING_FOR_SALVAGE_APPROVAL || retirmentStatusId == allAssetRetirmentStatus.SALVAGED){
      this.retirement = allWorkflowStatus[allWorkflowStatus.SALVAGE];
    }
    else if(retirmentStatusId == allAssetRetirmentStatus.AWAITING_FOR_DISPOSAL_APPROVAL || retirmentStatusId == allAssetRetirmentStatus.DISPOSED){
      this.retirement = allWorkflowStatus[allWorkflowStatus.DISPOSAL];
    }
     else if(retirmentStatusId == allAssetRetirmentStatus.AWAITING_FOR_SCRAP_APPROVAL || retirmentStatusId == allAssetRetirmentStatus.SCRAPPED){
      this.retirement = allWorkflowStatus[allWorkflowStatus.SCRAPPED];
    }

    this.transactionSource = this.retirement;

    this.commonService.commonGetService('getWorkflowForId.sams', this.retireDisposeForm.controls.assetRetireId.value,
      this.userSessionService.getUserEmpId(),this.retirement,this.userSessionService.getUserOrgId()).subscribe(
        data => {
          if (data.success) {
            this.employeeId = this.userSessionService.getUserEmpId();
            this.approvebuttonEnable = data.responseData.approvalFlag;
            this.approvalId = data.responseData.workflowApprovalId;
            this.selectedIndex =0;
          } else {
            this.commonService.openToastWarningMessage(data.message);
          }
        }, error => {
        }
      );
  }

  salvageFor = [
    { id: 2, name: 'MODULE' },
    { id: 3, name: 'SPARE PARTS' },
    { id: 4, name: 'ACCESSORIES' },
    { id: 5, name: 'CONSUMABLES' }
  ];

  fetchIdOfDisposeSupplier(event){
    if (event === undefined) {
      this.retireDisposeForm.controls.disposeSupplierId.setValue(0);
      this.supplierList = [];
      this.supplierPageNumber = 1;
    } else {
      this.retireDisposeForm.controls.disposeSupplierId.setValue(event.supplierId);
      this.supplierList = [];
      this.supplierPageNumber = 1;
      this.checkDisposeFormValidation(1);
    }
  }

  listOfSupplierApproved(searchValue) {
    this.scrollApprovedSuppliersync = true;
    const businessPartnerId = this.retireDisposeForm.controls.buyBackSupplierId.value;
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
      this.retireDisposeForm.get('buyBackSupplierSiteId').setValue(0);
      this.supplierLocationList = [];
      this.approvedSupplierPageNumber = 1;
    } else {
      this.retireDisposeForm.controls.buyBackSupplierSiteId.setValue(event.partnerSiteId);
      this.retireDisposeForm.controls.buyBackSupplierSiteName.setValue(event.partnerSiteName);
      this.retireDisposeForm.controls.buyBackCurrencyCode.setValue(event.partnerSiteCurCd)
    }
  }

  listOfModelModuleName(searchValue) {
    this.scrollModelModuleSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfModelModuleCombo, searchValue.term, this.assetMainForm.controls.modelId.value, '', this.recordsPerPageForCombo, this.modelModulePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.modelModulePageNumber , this.modelModuleCombo , data.responseData.comboList)
        this.modelModulePageNumber = this.getData.pageNumber;
        this.modelModuleCombo = this.getData.dataList;
        this.scrollModelModuleSync = false;
      }
    );
  }

  selectedModuleData(event){
      if(event != undefined){
      this.commonService.getComboResults(this.assetOptimaServices.listOfModuleItems, event.itemModuleName, this.assetMainForm.controls.modelId.value, '', this.recordsPerPageForCombo, this.modelModulePageNumber).subscribe(
        (data) => {
          data.responseData.map(obj => {
            const Group = this.formBuilder.group({
              retireSalvageId: new FormControl(0),
              assetRetireId: new FormControl(this.retireDisposeForm.controls.assetRetireId.value),
              salvageType: new FormControl('MODULE'),
              modelId: new FormControl(obj.modelId),
              moduleId: new FormControl(obj.itemModuleId != null ? obj.itemModuleId : 0),
              moduleName: new FormControl(event.itemModuleName != null ? event.itemModuleName : null),
              itemId: new FormControl(obj.itemId),
              itemName: new FormControl(obj.itemName),
              itemDesc: new FormControl(obj.itemDesc),
              itemType: new FormControl(obj.itemType),
              storeId: new FormControl(0),
              storeName: new FormControl(null)
            });
          this.salvateItemsForm.patchValue(Group.value);
          this.addSalvageDataSource.data.push(this.salvateItemsForm.value);
          this.tableSalvageItem.renderRows();
          this.changeDetectorRefs.detectChanges();
          });
          this.itemList=[];
          this.itemNamePageNumber=1;
        }
      )
      this.checkSalvageableValidations();
    }else{
      this.modelModuleCombo=[];
      this.modelModulePageNumber=1;
    }
  };

  selectedItemDataData(event,salvageType){
      const Group = this.formBuilder.group({
        retireSalvageId: new FormControl(0),
        assetRetireId: new FormControl(this.retireDisposeForm.controls.assetRetireId.value),
        salvageType: new FormControl(salvageType),
        modelId: new FormControl(event.modelId),
        moduleId: new FormControl(event.itemModuleId != null ? event.itemModuleId : 0),
        moduleName: new FormControl(event.itemModuleName != null ? event.itemModuleName : null),
        itemId: new FormControl(event.modelItemId),
        itemName: new FormControl(event.itemMasterName),
        itemDesc: new FormControl(event.itemMasterDesc),
        itemType: new FormControl(event.itemType),
        storeId: new FormControl(0),
        storeName: new FormControl(null)
      });
      this.salvateItemsForm.patchValue(Group.value);
      this.addSalvageDataSource.data.push(this.salvateItemsForm.value);
      this.retireDisposeForm.controls.salvageDtlList.setValue(this.addSalvageDataSource.data);
      this.tableSalvageItem.renderRows();
      this.changeDetectorRefs.detectChanges();
      this.itemList=[];
      this.itemNamePageNumber=1;
      this.salvateItemsForm.controls.itemId.setValue(0);
      this.salvateItemsForm.controls.itemName.setValue(null);
      this.checkSalvageableValidations();
  };

  deleteSalvageItem(deleteId,index){
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Salvage Item'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          if (deleteId <= 0) {
            this.addSalvageDataTempPush = this.addSalvageDataSource.data;
            this.addSalvageDataSource.data.splice(index, 1);
            this.addSalvageDataSource.data = this.addSalvageDataTempPush;
            this.changeDetectorRefs.detectChanges();
            this.commonService.openToastSuccessMessage("Record Deleted Successfully.");
            this.checkSalvageableValidations();
          } else {
            this.commonService.commonGetService('deleteSalvageItem.sams', deleteId).subscribe(
              data => {
                if (data.success) {
                  this.commonService.openToastSuccessMessage(data.message);
                  this.addSalvageDataTempPush = this.addSalvageDataSource.data;
                  this.addSalvageDataSource.data.splice(index, 1);
                  this.addSalvageDataTempPush.data = this.addSalvageDataTempPush;
                  this.changeDetectorRefs.detectChanges();
                  this.checkSalvageableValidations();
                } else {
                  this.commonService.openToastErrorMessage(data.message);
                }
              }
            );
          }
        }
      });
  }

  listOfItem(searchValue,itemType) {
    this.scrollItemNameSync = true;
    const modelId = this.assetMainForm.controls.modelId.value;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfModelItemsCombo.sams', searchValue.term,modelId, '', this.recordsPerPageForCombo, this.itemNamePageNumber, itemType).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.itemNamePageNumber , this.itemList , data.responseData.comboList)
        this.itemNamePageNumber = this.getData.pageNumber;
        this.itemList = this.getData.dataList;
        this.scrollItemNameSync = false;
      }
    );
  }

  createGatePassFromRetirement(element){
    this.commonService.commonInsertService('createGatePassFromRetirement.sams',element).subscribe(
      data => {
        if(data.success){
          this.commonService.openToastSuccessMessage(data.message);
          this.ngOnInit();
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }
    );
  }

  downloadExcel(assetId){
    this.asset.recordsPerPage = 0;
    this.asset.assetHdrId=assetId;
    this.commonService.commonListService('generateAssetReportIndividually.sams',this.asset).subscribe(
      (data) => {
        this.downloadDocumentExcel(data.responseData);
        this.commonService.openToastSuccessMessage('Report generated successfully.');
      }, error => {
        this.commonService.openToastWarningMessage('Failed to generate report.');
      });
  }


  downloadDocumentExcel(filePath: string) {
    var fileName = filePath.split('.')[0];
    this.commonService.downloadExcelFile(filePath).subscribe(
      data => {
        let file = filePath.split('.');
        this.commonService.showDownloadPopUp(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
      }
    );
  }

  disableFieldsBasedOnRetirementStatus(statusId){
    if(statusId != allAssetRetirmentStatus.AWAITING_FOR_RETAIR_APPROVAL){
      this.retireDisposeForm.controls.locationName.disable();
      this.retireDisposeForm.controls.retirementNo.disable();
      this.retireDisposeForm.controls.assetCode.disable();
      this.retireDisposeForm.controls.assetCategoryName.disable();
      this.retireDisposeForm.controls.subCategoryName.disable();
      this.retireDisposeForm.controls.requestedBy.disable();
      this.retireDisposeForm.controls.retirementRemarks.disable();
      this.retireDisposeForm.controls.requestReason.disable();
      this.retireDisposeForm.controls.retirementStoreName.disable();
      this.retireDisposeForm.controls.assetCondition.disable();
    }

  }

  uploadDocumentList(){
    let dialogRef = this.dialog.open(DocumentListComponent, {
          height: '75%',
          width: '75%',
          data: {
            'assetHdrId': this.assetMainForm.controls.assetHdrId.value,
            'source': "Asset Retirement"
          }
        });
  }

  selectedPersonInchargeComboData(event) {
    if(event === undefined) {
      this.personInchargePageNumber = 1;
      this.personInchargeComboList = [];
      this.retireDisposeForm.controls.requestedBy.setValue(null);
      this.retireDisposeForm.controls.assignedPersonEmail.setValue(null);
    } else {
      this.retireDisposeForm.controls.requestedBy.setValue(event.displayValue);
      this.retireDisposeForm.controls.assignedPersonEmail.setValue(event.assignedPersonEmail);
      this.personInchargePageNumber = 1;
    }
  }
retireHistoryItemList = [];
retireHistoryItemLength = 0;

workflowDataSourceMethod(event){
  this.workflowDataSource = event;
  this.retireHistoryDataSource.push({'retirementRequestHeading': this.workflowApproval,
                                        'userOrSupplierInvolved' : 'Approvals',
                                        'updatedBy' :'',
                                        'date' :'',
                                        'remarks' :'',
                                        'subList' :this.workflowDataSource,
                          });
 this.retireHistoryItemList =  this.retireHistoryDataSource;
 this.retireHistoryItemLength= this.retireHistoryItemList.length;
}

  retireHistory(data){
    // if(data.responseData.assetHdrTO.modelTO.accessoriesList !== []){
    //   this.itemNameForHistory ="Item Name"
    // }

    this.retireHistoryDataSource = [{'retirementRequestHeading': this.retirementRequest,
                                      'userOrSupplierInvolved' : data.responseData.requestedBy,
                                      'updatedBy' : data.responseData.updatedBy,
                                      'date' : data.responseData.createdDtDisp,
                                      'remarks' : data.responseData.retirementRemarks,
                                      'subList' :'',
                                      }];

    this.retireHistoryDataSource.push({ 'retirementRequestHeading': this.accessories,
                                        'userOrSupplierInvolved' : this.itemNameForHistory,
                                        'updatedBy' :'',
                                        'date' :'',
                                        'remarks' :'',
                                        'subList' : data.responseData.assetHdrTO.modelTO.accessoriesList,
                                      });
    this.retireHistoryDataSource.push({'retirementRequestHeading': this.consumables,
                                        'userOrSupplierInvolved' : this.itemNameForHistory,
                                        'updatedBy' :'',
                                        'date' :'',
                                        'remarks' :'',
                                        'subList': data.responseData.assetHdrTO.modelTO.consumableList,
                                    });
    this.retireHistoryDataSource.push({ 'retirementRequestHeading': this.spareParts,
                                        'userOrSupplierInvolved' : this.itemNameForHistory,
                                        'updatedBy' :'',
                                        'date' :'',
                                        'remarks' :'',
                                        'subList': data.responseData.assetHdrTO.modelTO.modelItemList,

                                  });
    this.retireHistoryDataSource.push({'retirementRequestHeading': this.buyBack,
                                        'userOrSupplierInvolved' : data.responseData.buyBackSupplierName,
                                        'updatedBy' :'',
                                        'date' :'',
                                        'remarks' :data.responseData.retireRemarkforBuyBack,
                                        'subList' :'',
                                });
    this.retireHistoryDataSource.push({'retirementRequestHeading': this.salvage,
                                        'userOrSupplierInvolved' : this.itemNameForHistory,
                                        'updatedBy' :'',
                                        'date' :'',
                                        'remarks' :'',
                                        'subList': data.responseData.salvageDtlList,
                              });
    this.retireHistoryDataSource.push({'retirementRequestHeading': this.dispose,
                                        'userOrSupplierInvolved' : data.responseData.disposeSupplierName,
                                        'updatedBy' :'',
                                        'date' :'',
                                        'remarks' :data.responseData.disposeRemarks,
                                        'subList' :'',
                            });

  }

  updateDisposalWarningMessage(){
    if(!this.retireDisposeForm.controls.dispose.value){
          this.commonService.openToastWarningMessage("Kindly Input Disposal Information");
    }
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
      this.retireDisposeForm.controls.assetCondition.setValue(null);
      this.retireDisposeForm.controls.assetConditionId.setValue(0);

      this.assetConditionPageNumber = 1;
      this.assetConditionCombo = [];
    } else {
      this.retireDisposeForm.controls.assetConditionId.setValue(event.assetConditionId);

      this.translateService.get([event.assetCondition])
              .subscribe((val) => {
                const status = Object.values(val)
                this.retireDisposeForm.controls.assetCondition.setValue(status[0])
              });
    }
  }

  retirementWorkflowApproval(status){
    let result;
    let selectedRetirementList = [];
    selectedRetirementList.push({ ...this.retireDisposeForm.value, approvalId: this.approvalId });

    if (status) {
      result = this.commonService.commonWorkflowService(allWorkflowStatus[allWorkflowStatus.RETIREMENT], selectedRetirementList, " Retirment / Disposal ");
    } else {
      // result = this.commonService.rejectRetirement(selectedRetirementList);
      // result.then(data => {
      //   if (data) {
      //     this.locationRef.back();
      //   }
      // })

      this.prWorkflowReject(selectedRetirementList);
    }
  }


  prWorkflowReject(selectedRetirementList) {

    let selectedRetirementItems = 0;
  
      if(Number(this.approvalId) == 0){
       selectedRetirementItems = 0;
      }else{
        selectedRetirementItems = 1;
      }
  
      const dialogRef = this.dialog.open(RejectConfirmationComponent, {
        height: 'auto',
        width: '400px',
        data: {
          confirmHeading: 'Confirmation',
          confirmMsg: 'Are you sure to Reject selected Record ?',
          note : 'Note : Only Record under your queue will be Rejected',
          selectedElementListLength : selectedRetirementItems
        }
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(
        data => {
          if (data.status === true) {
            let rejectReason = data.reason

             let approvalList = {selectedApprovalList: []};
        let assetLists = {selectedAssetList: [], status: "Rejected",transSource : '',rejectReason: rejectReason};
        for(let i=0; i<= selectedRetirementList.length-1 ; i++){
            approvalList.selectedApprovalList.push(selectedRetirementList[i].approvalId);
            assetLists.selectedAssetList.push(selectedRetirementList[i].assetRetireId)
          }
        let assetListData = {...approvalList,...assetLists};
        this.commonService.commonInsertService('updateStatusBasedOnApproval.sams', assetListData).subscribe(
          data => {
            if (data.success) {
                this.commonService.openToastSuccessMessage('Record Rejected Successfully.');
            }
            else {
              this.commonService.openToastWarningMessage(data.message);
            }
            
          }, error => {
          }
        );

          this.ngOnInit();
          }
        });
    }




  checkDisposeValidations(){
    this.retireDisposeForm.controls.disposeSupplierName.setErrors(null);
    this.retireDisposeForm.controls.disposeValue.setErrors(null);
    this.retireDisposeForm.controls.disposeRemarks.setErrors(null);

    if(!this.retireDisposeForm.controls.dispose.value){
      this.retireDisposeForm.controls.disposeSupplierName.setValidators([Validators.required]);
      this.retireDisposeForm.controls.disposeValue.setValidators([Validators.required]);
      this.retireDisposeForm.controls.disposeRemarks.setValidators([Validators.required]);
    }else{
      this.retireDisposeForm.controls.disposeSupplierName.setValidators([]);
      this.retireDisposeForm.controls.disposeValue.setValidators([]);
      this.retireDisposeForm.controls.disposeRemarks.setValidators([]);
    }
  }

  checkSalvageableValidations(){
    if(this.retireDisposeForm.controls.salvageable.value){
      if(this.addSalvageDataSource.data.length > 0){
        for (let index = 0; index < this.addSalvageDataSource.data.length; index++) {
          const element = this.addSalvageDataSource.data[index];
          if(element.quantity !='' && element.storeName !='' && element.quantity !=null && element.storeName !=null){
            this.updateFlagForSalvage = false;
          }else{
            this.updateFlagForSalvage = true;
          }
        }
      }else{
        this.updateFlagForSalvage = true;
      }
    }else{
      this.updateFlagForSalvage = false;
    }
  }

  salvageCheckBox(event){
    this.retireDisposeForm.controls.salvageable.setValue(event.checked);
    this.salvageTypeValidater();
    this.checkSalvageableValidations();
  }

  salvageTypeValidater(){
    if(this.retireDisposeForm.controls.salvageable.value){
      this.salvateItemsForm.controls.salvageType.setValidators([Validators.required]);
    }else{
      this.salvateItemsForm.controls.salvageType.setValidators([]);
    }
  }

  salvageType: String=undefined;

  changeSalvageType(event){
    if(event==undefined){
      this.salvateItemsForm.controls.salvageType.setValue(null);
    }else{
      if(this.salvageType != event.name){
        this.itemNamePageNumber=1;
        this.itemList=[];
      }
      this.salvageType=event.name;
      this.salvateItemsForm.controls.salvageType.setValue(event.name);
      this.SalavageItemValidater();
    }
  }

  SalavageItemValidater(){
    if(this.salvateItemsForm.controls.salvageType.value=='MODULE'){
      this.salvateItemsForm.controls.moduleName.setValidators([Validators.required]);
      this.salvateItemsForm.controls.itemName.setValidators([]);
    }else if(this.salvateItemsForm.controls.salvageType.value=='CONSUMABLES'
    || this.salvateItemsForm.controls.salvageType.value=='ACCESSORIES'
    || this.salvateItemsForm.controls.salvageType.value=='SPARE PARTS'){
      this.salvateItemsForm.controls.moduleName.setValidators([]);
      this.salvateItemsForm.controls.itemName.setValidators([Validators.required]);
    }else{
      this.salvateItemsForm.controls.moduleName.setValidators([]);
      this.salvateItemsForm.controls.itemName.setValidators([]);
    }
  }


  checkAssetCodeExistingPR(assetHdrId){
    this.commonService.commonGetService('listOfPurchaseRequestInfoByAssetId.sams',assetHdrId).subscribe(
      data => {
        this.prDataSource = data.responseData;
        this.purchaseRequestLength = this.prDataSource.length;
        
        this.prTotalAmount = 0;
        this.prDataSource.forEach(element => {
          this.prTotalAmount += element.grandTotal;
        });
          // this.retireDisposeForm.controls['assetCode'].setValue(element.assetCode);
          // this.retireDisposeForm.controls['assetHdrId'].setValue(element.assetHdrId);
          // this.retireDisposeForm.controls['assetCategoryId'].setValue(element.assetCategoryId);
          // this.retireDisposeForm.controls['assetCategoryName'].setValue(element.assetCategoryName);
          // this.retireDisposeForm.controls['subCategoryId'].setValue(element.subCategoryId);
          // this.retireDisposeForm.controls['subCategoryName'].setValue(element.subCategoryName);
          this.fetchAssetDtlByAssetId(assetHdrId)
      });
  }

  getRequestReason(event){
    if(event == undefined){
      this.retireDisposeForm.controls['requestReason'].setValue('');
    } else{
      if(event.retirementReasonName == 'BEYOND ECONOMICAL REPAIR' || event.retirementReasonName == 'ECONOMICALLY NOT VIABLE'){
        if((this.assetMainForm.controls.localPurchaseAmt.value / 2) <= this.prTotalAmount){

        } else{
          let confirmMsg;
          if(this.srListLenght == 0){
            confirmMsg = 'No open BM SR available. Open BM SR now ?';
          } else{
            confirmMsg = 'Total purchase value less than 50% of the equipment value.  Are you sure to raise PR ? ';
          }
          const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
            height: 'auto',
            width: '400px',
            data: {
              confirmHeading: 'Warning',
              confirmMsg: confirmMsg,
              note : '',
              selectedElementListLength : 1
            }
          });
          dialogRef.disableClose = true;
          dialogRef.afterClosed().subscribe(
            async data => {
              if (data.status === true) {
                if(this.navigateSrId > 0){
                  let mode = 'edit';
                  this.router.navigate(['home/serviceRequest/serviceView/', this.navigateSrId, mode, 'sr_item_request' ]);
                } else {
                  this.router.navigate(['home/serviceRequest/serviceRequestCreate/'+ 0]);
                }

              } else{
                this.retireDisposeForm.controls['requestReason'].setValue('');
              }
            });
        }
      }
    }
  }

  assetSrList(srList){
    this.srListLenght = 0;
    console.log("srList",this.srListLenght)
    this.navigateSrId = 0;
    srList.forEach(data => {
      if(data.srStatusName != 'COMPLETED' && data.srStatusName != 'CLOSED' && data.srType == 'BM'){
        this.navigateSrId = data.srId;
        this.srListLenght  = srList.length;
      }
    });
  }

  getFormattedValue(): string {
    return this.prTotalAmount.toFixed(2);  // This will return "#.00"
  }

  getFormattedValueGrandTotal(num){
    return num.toFixed(2);
  }

  // docFileName: string;
  // docTypeName: string;
  // formData: FormData = new FormData();
  // fileNum: number = 0;

  // handleFileInput(files: FileList){
  //   this.fileToUpload = files[0];
  //   let tempFileName = this.fileToUpload.name;
  //     if (((this.fileToUpload.size / 1024) / 1024) < 25) {
  //       this.docFileName = this.fileToUpload.name;
  //       this.fileUploadFlag = true;
  //       this.disableSubmitBtn = false;
  //     } else {
  //       this.commonService.openToastWarningMessage(this.fileToUpload.name +' File size > 25 MB');
  //       this.fileUploadFlag = false;
  //       this.disableSubmitBtn = true;
  //     }
            
  // }

  uploadFile() {
    // let formData: FormData = new FormData();
    // formData.append('fileInfo', this.fileToUpload);
    // formData.append('inwardInventoryHdrId', inwardInventoryHdrId);
    // formData.append('fileName', this.docFileName);
    // formData.append('docType', this.docTypeName);
    // formData.append('orgId', orgId);
    // this.commonService.commonFileUpload('poRegistrationDoc.sams', formData).subscribe(
    //   data => {
    //     if (data.success) {
    //       //this.validateEditMode();
    //     } else {
    //     }
    //   }, error => {
    //     this.commonService.openToastErrorMessage("Error");
    //   }
    // );

    let formData: FormData = new FormData();
    formData.append('assetRetDocImage', this.fileToUpload); 
    var assetData={'docName':this.fileName,'fileName':this.fileName,'docType':'Asset Retirement','assetHdrId':this.retireDisposeForm.controls.assetHdrId.value,
                   'userId':this.userSessionService.getUserId(),'orgId':this.userSessionService.getUserOrgId()}; 
    formData.append('assetRetDocImageData',JSON.stringify(assetData));
    //To start loading 
    this.commonService.commonFileUpload('saveOrUpdateAssetRetDoc.sams', formData).subscribe(
      data => {
        if (data.success) {
          // this.commonService.openToastSuccessMessage(data.message);
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
        // To end loading
      }, error => {
        this.commonService.openToastErrorMessage(this.assetOptimaConstants.serverError); 
        //To end loading
      }
    );


  }



  fileName: string;
  handleFileInput(files: FileList) { 
    this.fileToUpload = files[0]; 
    if (true) {
      if (((this.fileToUpload.size / 1024) / 1024) < 5) {
        this.fileName = this.fileToUpload.name.split('.')[0];
        this.newFileName = this.fileToUpload.name.split('.')[0];   
        this.fileUploadFlag = true;
      } else { 
        this.commonService.openToastWarningMessage('File Size Can Be Up To 5MB.');
        this.fileUploadFlag = false;
      }
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

  getStatusConditionCombined(): string {
  const status = this.assetMainForm?.controls?.['assetStatus']?.value || '';
  const condition = this.retireDisposeForm?.controls?.['assetCondition']?.value || '';
  return `${status} - ${condition}`; // Or any separator you like
}

dateChange(){
    this.retireDisposeForm.controls.retirementDtDisp.setValue(this.commonService.addCurrenrtTimeToDate(this.retireDisposeForm.controls.retirementDtDisp.value));
  }

  setRetirementMode(event) {
    const form = this.retireDisposeForm;
  if (event === undefined) {
    this.retireDisposeForm.controls['retirementModeId'].setValue(0);
    this.retireDisposeForm.controls['retirementMode'].setValue('');

    // Clear validators
      form.controls['buyBackSupplierId'].clearValidators();
      form.controls['buyBackSupplierName'].clearValidators();
      form.controls['buyBackSupplierSiteId'].clearValidators();
      form.controls['buyBackSupplierSiteName'].clearValidators();
      form.controls['retireValueforBuyBack'].clearValidators();
  } else {
    

    form.controls['retirementModeId'].setValue(event.retirementModeId);
    form.controls['retirementMode'].setValue(event.retirementMode);

    if (form.controls.retirementModeId.value == 1) {
      // Set required validators
      form.controls['buyBackSupplierId'].setValidators(Validators.required);
      form.controls['buyBackSupplierName'].setValidators(Validators.required);
      form.controls['buyBackSupplierSiteId'].setValidators(Validators.required);
      form.controls['buyBackSupplierSiteName'].setValidators(Validators.required);
      form.controls['retireValueforBuyBack'].setValidators(Validators.required);
    } else {
      // Clear validators
      form.controls['buyBackSupplierId'].clearValidators();
      form.controls['buyBackSupplierName'].clearValidators();
      form.controls['buyBackSupplierSiteId'].clearValidators();
      form.controls['buyBackSupplierSiteName'].clearValidators();
      form.controls['retireValueforBuyBack'].clearValidators();
    } 
    
    if (form.controls.retirementModeId.value == 3) {
      // Set required validators
      this.salvateItemsForm.controls['salvageType'].setValidators(Validators.required);
      
    } else {
      // Clear validators
      this.salvateItemsForm.controls['salvageType'].clearValidators();
    }

    // Update validation state
    form.controls['buyBackSupplierId'].updateValueAndValidity();
    form.controls['buyBackSupplierName'].updateValueAndValidity();
    form.controls['buyBackSupplierSiteId'].updateValueAndValidity();
    form.controls['buyBackSupplierSiteName'].updateValueAndValidity();
    form.controls['retireValueforBuyBack'].updateValueAndValidity();

    this.salvateItemsForm.controls['salvageType'].updateValueAndValidity();
  }
}

showBuyBackErrorIcon(): boolean {
  const form = this.retireDisposeForm;
  
  // Check if retirement mode requires validation
  if (form.controls['retirementModeId'].value !== 1) return false;

  // Return true if any required field is invalid
  return (
    form.controls['buyBackSupplierId'].invalid ||
    form.controls['buyBackSupplierName'].invalid ||
    form.controls['buyBackSupplierSiteId'].invalid ||
    form.controls['buyBackSupplierSiteName'].invalid ||
    form.controls['retireValueforBuyBack'].invalid
  );
}


showSalvageErrorIcon(): boolean {
  const form = this.retireDisposeForm;
  
  // Check if retirement mode requires validation
  if (form.controls['retirementModeId'].value !== 3) return false;

  // Return true if any required field is invalid
  return (
    this.salvateItemsForm.controls['salvageType'].invalid 
  );
}

getInvalidControls() {
    const invalid = [];
    const controls = this.retireDisposeForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
  
  documentAddEdit() {
      let dialogRef = this.dialog.open(AssetDocCreateComponent, {
        height: '440px',
        width: '500px',
        data: {
          'assetHdrId': this.retireDisposeForm.controls.assetHdrId.value
        }
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(
        data => {
          this.fetchListOfAssetDocs();
        });
    }
  
    fetchListOfAssetDocs() {
      this.commonService.commonGetService('loadAssetDoc.sams', this.retireDisposeForm.controls.assetHdrId.value).subscribe(
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
                this.assetDocumentDataSource.splice(index, 1);
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

  viewAssetImage(filePath: string, contentType: string) {
    let fileData = this.commonService.downloadFileFromServerToView(filePath,"");
    this.commonService.pdfViwer(fileData, 'application/pdf');
  }

}
