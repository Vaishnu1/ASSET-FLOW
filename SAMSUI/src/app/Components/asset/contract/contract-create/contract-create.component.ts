import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { CommonService } from '../../../../Services/common-service/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ContractAddAssetComponent } from '../contract-add-asset/contract-add-asset.component';
import { AssetOptimaServices } from '../../../../Constants/AssetOptimaServices';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, ValidationErrors } from '@angular/forms';
import { AssetOptimaConstants } from '../../../../Constants/AssetOptimaConstants';
import { DeleteConfirmationComponent } from '../../../../Components/Common-components/delete-confirmation/delete-confirmation.component';
import { ContractPeriodCreateComponent } from '../contract-period-create/contract-period-create.component';
import { CommonHint } from '../../../../Constants/CommonHint';
import { Location } from '@angular/common';
import { ContractDocCreateComponent } from '../contract-doc-create/contract-doc-create.component';
import { UserSessionService } from '../../../../Services/user-session-service/user-session.service';
import { ConfirmConfirmationComponent } from '../../../../Components/Common-components/confirm-confirmation/confirm-confirmation.component';
import { getData } from 'src/app/Model/common/fetchListData';
import { allContractStatus } from 'src/app/Constants/AllStatusConstants';
import { ContractDetailAssetModel } from 'src/app/Model/master/contractAsset';
import { SearchContractAssetComponent } from '../search-contract-asset/search-contract-asset.component';
import { InformationPopupComponent } from 'src/app/Components/Common-components/information-popup/information-popup.component';
import { EmailReminderScheduleCreateComponent } from 'src/app/Components/settings/EmailReminderSchedule/email-reminder-schedule-create/email-reminder-schedule-create.component';
import { processList } from 'src/app/Constants/ProcessList';
import { allBusinessPartnerRoles } from 'src/app/Constants/AllStatusConstants';
import { PoTcTemplateListComponent } from 'src/app/Components/Dialog-Components/po-tc-template-list/po-tc-template-list.component';
import { PurchaseTermsTemplateDtl } from 'src/app/Model/base/purchase-terms-dtl';
import { AssetViewNhComponent } from 'src/app/Components/Dialog-Components/asset-view-nh/asset-view-nh.component';
import { UpdateApproveConfirmationComponent } from 'src/app/Components/Common-components/update-approve-confirmation/update-approve-confirmation.component';
import { RejectConfirmationComponent } from 'src/app/Components/Common-components/reject-confirmation/reject-confirmation.component';
import { CancelConfirmationComponent } from 'src/app/Components/Common-components/cancel-confirmation/cancel-confirmation/cancel-confirmation.component';

@Component({
  selector: 'app-contract-create',
  templateUrl: './contract-create.component.html',
  styleUrls: ['./contract-create.component.css']
})
export class ContractCreateComponent implements OnInit {

  contractCreateComponent: ContractCreateComponent;
  
  @ViewChild('matAddContract') contractDocumentTable: MatTable<any>;

  contractingPartyType = [
    { id: 1, name: 'SUPPLIER' },
    { id: 2, name: 'MANUFACTURER' },
    { id: 3, name: 'CUSTOMER' },
    { id: 4, name: 'SERVICE PROVIDER' },
  ];

  autoRenewal = [
    { id: 1, name: 'YES' },
    { id: 2, name: 'NO' }
  ];

  paymentType = [
    { id: 1, name: 'CASH' },
    { id: 2, name: 'CARD' },
    { id: 3, name: 'CHEQUE' },
    { id: 4, name: 'RTGS/NEFT' },
  ];

  paymentFrequency = [
    { id: 1, name: 'MONTHLY' },
    { id: 2, name: 'QUARTERLY' },
    { id: 3, name: 'HALF-ANNUALLY' },
    { id: 4, name: 'ANNUALLY' },
  ];

  partValue: any;
  contractCreateFormGroup: FormGroup;
  scrollTaxCode1sync : boolean=false;
  selectedIndex: number = 0;
  subLoader : boolean = false;

  recordsPerPageForCombo: string;

  contractAutoRenewalCombo: any = [];
  scrollsyncContractAutoRenewal: boolean = false;
  contractAutoRenewalPageNumber: number;

  formOneValidation: boolean = false;

  formOneDirty: boolean = false;

  pageSize: String;
  pageIndex: String;

  displayButton: string;
  headingDisplay: string;
  isAddMode: boolean = false;
  isEditMode: boolean = false;
  isViewMode: boolean = false;
  disableClear: boolean = false;
  length: String;
  occaranceRange: number = 0;

  uploadContractFlag: boolean = false;

  limitCount: any;

  scrollLocationNameSync: boolean = false;
  locationNamePageNumber: number;
  locationCombo: any = [];

  scrollSuppliersync: boolean = false;
  supplierListPageNumber: number;
  supplierList: any =[];

  scrollCustomersync: boolean = false;
  customerListPageNumber: number;
  customerList: any =[];

  scrollManufacturersync: boolean = false;
  manufacturerListPageNumber: number;
  manufacturerList: any =[];

  scrollSupplierLocationSync: boolean = false;
  supplierLocationListPageNumber: number;
  supplierLocationCombo: any = [];

  scrollCustomerLocationSync: boolean = false;
  customerLocationListPageNumber: number;
  customerLocationCombo: any = [];

  scrollManufacturerLocationSync: boolean = false;
  manufacturerLocationListPageNumber: number;
  manufacturerLocationCombo: any = [];

  contractDocDataSource: any = [];
  contractDispColumns = ['s.no', 'docName', 'docType', 'createdBy', 'createdDtDisp', 'action'];

  assetDataSource = new MatTableDataSource<any>();
  assetTempPush: any = [];
  assetLength : String = '0';
  assetDispCol = ['slNo','assetCode', 'modelName', 'assetGroupName', 'assetInfo' ,'includedServices','excludedServices','action'];
  @ViewChild('matAsset') asset: MatTable<any>;
  assetTabViaContract: boolean = false;
  assetTabViaAsset: boolean = false;

  contractPeriodDataSource = new MatTableDataSource<any>();
  contractPeriodTempPush: any = [];
  contractPeriodLength: String = '0';
  contractPeriodDisCol = ['sno', 'periodStartDtDisp', 'periodEndDtDisp', 'periodBasicValue', 'periodNetValue', 'action'];
  @ViewChild('matContractPeriod') contractPeriod: MatTable<any>;

  tenurePaymentDataSource: any = [];
  tenurePaymentTempPush: any = [];
  @ViewChild('matPayment') tablePayment: MatTable<any>;
  tenurePaymentDispCol = ['sNo', 'tenureAmount','tenureDateDisp', 'paymentMode', 'instrumentNo', 'instrumentDtDisp', 'bankName','instrumentAmnt'];

  scrollTaxCode1Sync: boolean = false;
  taxCode1PageNumber: number;
  taxCode1List: any = [];

  scrollTaxCode2Sync: boolean = false;
  taxCode2PageNumber: number;
  taxCode2List: any = [];

  scrollCoverageTypeSync: boolean = false;
  coverageTypePageNumber: number;
  coverageTypeList: any = [];

  scrollContractTypeSync: boolean = false;
  contractTypePageNumber: number;
  contractTypeList: any = [];

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  public assetList:FormArray;

  assetCodeTemp: any;
  modelNameTemp: any;
  ownershipTypeTemp: any;

  contractTypeMandatory: String = "";
  contractValueMandatory: String = "";
  autoRenewalMandatory: String = "";

  contractApprovalFlag: boolean = false;
  contractCancelFlag: boolean = false;

  partyLocationMandatory: String = "";
  contactPersonMandatory: String = "";
  phoneNumberMandatory: String = "";

  assetListFormGroup:FormGroup;

  tenurePaymentFormGroup:FormGroup;

  totalAssetPoAmount : Number = 0;
  totalAssetAmount : Number = 0;
  remainingAmount : Number = 0;

  //For Workflow
  employeeId: string = '0';
  approvalId: string = '0';
  approvebuttonEnable: boolean = false;
  approve:string;

  public contractId: any;
  public transactionSource: any;

  searchKey: any = '';
  reject: string;
  getData: getData;
  formOneValid: boolean =false;
  status: string;
  fileUpload: any= [];
  frequencyErrorMsg:string='';
  error_msg:string='Kindly Select At least One "Asset"';
  assetCode : string ='';
  serialNo: string='';
  assetModel:string='';
  assetSubCat:string='';
  assetDataSourceTemp = new MatTableDataSource<any>();
  daysElapsed: number=0;
  fromDate:string='Today';
  selectedContractItems: number = 0;

  isContractActive : boolean = false;
  isContractExpired : boolean = false;

  contractStatusForActive: any[] = [
   
    { id: 1704, name: 'CONTRACT_CANCELLED' },
    { id: 1705, name: 'CONTRACT_TERMINATED' },

  ]; 

  contractStatusForExpired: any[] = [

    { id: 1707, name: 'CONTRACT_COMPLETED' },

  ]; 

  scrollInsuranceTypeSync: boolean = false;
  insuranceTypePageNumber: number;
  insuranceTypeList: any = [];

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly assetOptimaConstants: AssetOptimaConstants,
              private readonly dialog: MatDialog,
              private readonly commonService: CommonService,
              private readonly assetOptimaServices: AssetOptimaServices,
              private readonly changeDetectorRefs: ChangeDetectorRef,
              private readonly location: Location,
              private readonly userSessionService: UserSessionService,
              private router: Router,
              ) {

    this.locationNamePageNumber = 1;
    this.supplierListPageNumber = 1;
    this.customerListPageNumber = 1;
    this.manufacturerListPageNumber = 1;
    this.supplierLocationListPageNumber = 1;
    this.customerLocationListPageNumber = 1;
    this.manufacturerLocationListPageNumber = 1;
    this.taxCode1PageNumber = 1;
    this.taxCode2PageNumber = 1;
    this.coverageTypePageNumber = 1;
    this.contractTypePageNumber = 1;
    this.insuranceTypePageNumber = 1;
    this.approve = 'APPROVED';
    this.reject = 'REJECTED';
  }

  ngOnInit() {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.contractCreateFormGroup = new FormGroup({
      contractHdrId: new FormControl(0),
      locationId: new FormControl(''),
      locationName: new FormControl('', [Validators.maxLength(50),Validators.required]),
      contractingPartyType: new FormControl('SUPPLIER', [Validators.required]),
      contractPartyId: new FormControl(0),
      contractPartyName: new FormControl(''),
      contractPartyLocationId : new FormControl(0),
      contractPartyLocationName: new FormControl(''),
      contractNo: new FormControl('', [Validators.maxLength(100)]),
      contractName: new FormControl(''),
      coverageType: new FormControl('', [Validators.required]),
      contractType: new FormControl(''),
      active: new FormControl('true'),
      contractStatus: new FormControl(''),
      contractStatusId: new FormControl(''),
      orgId: new FormControl(''),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      rejectReason : new FormControl(''),
      cancelReason : new FormControl(''),
      terminateReason : new FormControl(''),

      contactPerson: new FormControl(''),
      phoneNumber: new FormControl(''),
      emailId : new FormControl('',[Validators.maxLength(50),Validators.pattern(this.assetOptimaConstants.emailValidation)]),
      addressInfo : new FormControl(''),
      curCd: new FormControl(''),
      contractPartyServiceType: new FormControl(''),

      contractStartDt: new FormControl(''),
      contractStartDtDisp: new FormControl('', [Validators.required]),
      contractEndDt: new FormControl(''),
      contractEndDtDisp: new FormControl('', [Validators.required]),
      expiryPriorNotifyDays: new FormControl('', [Validators.required,Validators.maxLength(20),Validators.pattern(this.assetOptimaConstants.numericValidation)]),
      contractPONo : new FormControl('', [Validators.maxLength(100)]),
      contractPODt : new FormControl(''),
      contractPODtDisp: new FormControl(''),

      contractBasicValue: new FormControl('0'),//Validation If combo changes
      discountRate: new FormControl(0,[Validators.maxLength(4),Validators.pattern(this.assetOptimaConstants.percentageValidation)]),
      discountAmt : new FormControl(0,[Validators.pattern(this.assetOptimaConstants.numericValidation)]),
      contractGrossValue : new FormControl(0,[Validators.pattern(this.assetOptimaConstants.numericValidation)]),
      netContractValue: new FormControl('',[Validators.pattern(this.assetOptimaConstants.numericValidation)]),
      exchRate : new FormControl('1',[Validators.pattern(this.assetOptimaConstants.numericValidation)]),
      localNetContractValue: new FormControl('',[Validators.pattern(this.assetOptimaConstants.numericValidation)]),
      taxCode1 : new FormControl(''),
      taxCode2 :  new FormControl(''),
      taxRate1 : new FormControl(0,[Validators.maxLength(4),Validators.pattern(this.assetOptimaConstants.percentageValidation)]),
      taxRate2 : new FormControl(0,[Validators.maxLength(4),Validators.pattern(this.assetOptimaConstants.percentageValidation)]),
      taxValue1 : new FormControl(0,[Validators.pattern(this.assetOptimaConstants.numericValidation)]),
      taxValue2 : new FormControl(0,[Validators.pattern(this.assetOptimaConstants.numericValidation)]),

      includedService: new FormControl('', [Validators.maxLength(500)]),
      excludedService: new FormControl('', [Validators.maxLength(500)]),
      autoRenewal: new FormControl(''),
      excalationPercent: new FormControl(0,[Validators.maxLength(4),Validators.pattern(this.assetOptimaConstants.percentageValidation)]),

      termsCondition : new FormControl('', [Validators.maxLength(1000)]),

      paymentTenureFrequency : new FormControl('MONTHLY'),
      paymentTenureOccurances : new FormControl(0,[Validators.max(12)]),

      //Used on creating new contract for checking previous available validation in backend
      assetHdrId:new  FormControl(0),

      assetList: new FormControl([]),

      contractTenurePaymentList: new FormControl([]),

      totalAssetPoAmount: new FormControl(0),

      //For Enable Normal Approve button if workflow approval does not for contract
      woApprovalStatus: new FormControl(''),
      expiryNotifyId: new FormControl(0),
      contractTempDtlList: new FormControl([]),

      approvalId : new FormControl(0),
      contractWithoutPrice : new FormControl(false),
      contractWithoutSupplier : new FormControl(false),
      insuranceType: new FormControl('',),

    });

    this.assetListFormGroup = new FormGroup({
      assetHdrId : new FormControl(0),
      assetCode : new FormControl(''),
      modelId   :  new FormControl(0),
      modelName : new FormControl(0),
      contractAmnt : new FormControl(0),
      totalPurchaseAmt : new FormControl(0),
      description: new FormControl(0),
      equipmentCode: new FormControl(0),
      manufacturerName: new FormControl(0),
      manufacturerId: new FormControl(0),
      subCategoryName: new FormControl(0),
      subCategoryId: new FormControl(0),
      serialNo: new FormControl(0)
    });

    this.tenurePaymentFormGroup = new FormGroup({
      tenureAmount : new FormControl(0),
      tenureDateDisp : new FormControl(''),
      paymentMode :  new FormControl(''),
      instrumentNo :  new FormControl(''),
      instrumentDtDisp :  new FormControl(''),
      bankName :  new FormControl(''),
      instrumentAmnt   :  new FormControl(0),
    });

    this.contractCreateFormGroup.controls['contractGrossValue'].disable();
    this.contractCreateFormGroup.controls['netContractValue'].disable();
    this.contractCreateFormGroup.controls['discountAmt'].disable();
    // this.contractCreateFormGroup.controls['contractStatus'].disable();
    this.contractCreateFormGroup.controls.curCd.disable();
    this.contractCreateFormGroup.controls.contractPONo.disable();
    this.contractCreateFormGroup.controls.contractPODtDisp.disable();
    this.contractCreateFormGroup.controls.contractNo.disable();
    this.contractCreateFormGroup.controls.contractBasicValue.disable();
    this.contractCreateFormGroup.controls['localNetContractValue'].disable();
    
    
    //this.contractCreateFormGroup.controls.contractPartyServiceType.disable();

    this.contractCreateFormGroup.controls['locationName'].setValue(this.userSessionService.getUserLocationName());
    this.contractCreateFormGroup.controls['locationId'].setValue(this.userSessionService.getUserLocationId());
    
    this.listOfCoverageType('');
    this.validateEditAndViewMode();
    this.formValidation();
  }

  validateEditAndViewMode() {
    this.activatedRoute.params.subscribe(
      params => {
        let primaryId = params.pId;
        primaryId = Number(primaryId);
        this.contractId = primaryId;
        this.transactionSource = 'CONTRACT';
        const mode = params.mode;
        const source = params.source;
        console.log(params.source);
        

        if (primaryId <= 0) {
          this.headingDisplay = "Create";
          this.displayButton = "Submit";
          this.isAddMode = true;
          this.contractCreateFormGroup.controls.contractStartDtDisp.setValue(this.commonService.getCurrentDateYYYYMMDD());
          this.contractCreateFormGroup.controls.expiryPriorNotifyDays.setValue(30);
          this.contractCreateFormGroup.controls.autoRenewal.setValue('NO');
          this.contractCreateFormGroup.controls.contractStatusId.setValue(allContractStatus.CONTRACT_APPROVAL_PENDING);
          this.contractApprovalFlag = false;
          this.contractCancelFlag = false;

          //this.contractCreateFormGroup.controls.coverageType.setValue('CONTRACT');
          this.displayAmountCol(this.contractCreateFormGroup.controls.coverageType.value);
          //console.log("coverage type", this.contractCreateFormGroup.controls.coverageType.value);
          //if(this.contractCreateFormGroup.controls.coverageType.value == 'CONTRACT'){
              //this.contractCreateFormGroup.controls.contractType.setValue('');
              //this.contractCreateFormGroup.controls.contractType.setValidators(Validators.required);
          //}

          //Enable Asset Tab From Asset/Contract Screen
          if(source==='asset'){
            this.assetTabViaAsset=true;

            this.assetCodeTemp = (localStorage.getItem('assetCode') !== null && localStorage.getItem('assetCode') !== '') ? localStorage.getItem('assetCode') : '';
            this.modelNameTemp = (localStorage.getItem('modelName') !== null && localStorage.getItem('modelName') !== '') ? localStorage.getItem('modelName') : '';
            this.ownershipTypeTemp = (localStorage.getItem('ownershipType') !== null && localStorage.getItem('ownershipType') !== '') ? localStorage.getItem('ownershipType') : '';
            this.totalAssetPoAmount = (localStorage.getItem('totalPurchaseAmt') !== null && localStorage.getItem('totalPurchaseAmt') !== '') ? parseInt(localStorage.getItem('totalPurchaseAmt')) : 0;

            this.assetListFormGroup.controls.assetHdrId.setValue(((localStorage.getItem('assetHdrId') !== null && localStorage.getItem('assetHdrId') !=='') ?
            parseInt(localStorage.getItem('assetHdrId')) : 0));

            this.assetListFormGroup.controls.assetCode.setValue((localStorage.getItem('assetCode') !==null && localStorage.getItem('assetCode') !=='') ?
            localStorage.getItem('assetCode') : '');

            this.assetListFormGroup.controls.modelId.setValue((localStorage.getItem('modelId') !==null && localStorage.getItem('modelId') !=='') ?
            parseInt(localStorage.getItem('modelId')) : 0);

            this.assetListFormGroup.controls.modelName.setValue((localStorage.getItem('modelName') !==null && localStorage.getItem('modelName') !=='') ?
            localStorage.getItem('modelName') : '');

            this.assetListFormGroup.controls.totalPurchaseAmt.setValue((localStorage.getItem('totalPurchaseAmt') !==null && localStorage.getItem('totalPurchaseAmt') !=='') ?
            parseInt(localStorage.getItem('totalPurchaseAmt')) : 0);

            this.assetListFormGroup.controls.serialNo.setValue(((localStorage.getItem('serialNo') !== null && localStorage.getItem('serialNo') !=='') ?
            (localStorage.getItem('serialNo')) : ''));

            this.assetListFormGroup.controls.subCategoryId.setValue((localStorage.getItem('subCategoryId') !==null && localStorage.getItem('subCategoryId') !=='') ?
            parseInt(localStorage.getItem('subCategoryId')) : 0);

            this.assetListFormGroup.controls.subCategoryName.setValue((localStorage.getItem('subCategoryName') !==null && localStorage.getItem('subCategoryName') !=='') ?
            (localStorage.getItem('subCategoryName')) : '');

            this.assetListFormGroup.controls.manufacturerId.setValue((localStorage.getItem('manufacturerId') !==null && localStorage.getItem('manufacturerId') !=='') ?
            parseInt(localStorage.getItem('manufacturerId')) : 0);

            this.assetListFormGroup.controls.manufacturerName.setValue((localStorage.getItem('manufacturerName') !==null && localStorage.getItem('manufacturerName') !=='') ?
            (localStorage.getItem('manufacturerName')) : '');

            this.assetListFormGroup.controls.equipmentCode.setValue((localStorage.getItem('equipmentCode') !==null && localStorage.getItem('equipmentCode') !=='') ?
            localStorage.getItem('equipmentCode') : '');

            this.assetListFormGroup.controls.description.setValue((localStorage.getItem('description') !==null && localStorage.getItem('description') !=='') ?
            (localStorage.getItem('description')) : '');
            
            this.assetDataSource.data.push(this.assetListFormGroup.value);
            this.assetDataSourceTemp.data.push(this.assetListFormGroup.value);
            this.calcRemainingAmount();

          }
        } else {
          this.commonService.commonGetService('loadContractInfo.sams', primaryId).subscribe(
            data => {

              // console.log(data.responseData.approvalId)
              // console.log(data.responseData.contractWithoutPrice)
              // console.log(data.responseData.contractWithoutSupplier)

              this.contractCreateFormGroup.patchValue(data.responseData);
              this.formValidation();
              this.displayAmountCol(this.contractCreateFormGroup.controls.coverageType.value);
              this.assetDataSource.data=data.responseData.assetList;
              this.assetDataSourceTemp.data=data.responseData.assetList;
              this.tenurePaymentDataSource=data.responseData.contractTenurePaymentList;
              this.cusFieldHdrList = data.responseData.contractTempDtlList;
              this.fetchListOfContractDocs();
              this.contractCreateFormGroup.controls['coverageType'].disable();
              if(this.contractCreateFormGroup.controls.contractType.value == 'CONTRACT_APPROVED'){
                this.contractCreateFormGroup.controls['contractType'].disable();
              }
              
              this.getWorkflowApprovalForContract();
              this.calcRemainingAmount();
              this.onChangeValidation1();

              if(this.contractCreateFormGroup.controls.contractStatusId.value == 1702){
                this.isContractActive = true;
              }else if(this.contractCreateFormGroup.controls.contractStatusId.value == 1706){
                this.isContractExpired = true;
              }
            }
          );
          if (mode === 'view') {
            this.isViewMode = true;
            this.contractCreateFormGroup.disable();
            this.headingDisplay = "View";
          } else {
            //button and heading names for edit
            this.headingDisplay = "Edit";
            this.displayButton = "Update";
            this.isEditMode = true;
            this.disableClear = true;
          }
        }
        if(source==='contract'){            
          this.assetTabViaContract=true;
        }
      }
    );
  }

  navigateToContract() {
    this.location.back();
  }

  getvalidoccuarance() {
    this.occaranceRange = 0;

        if(this.contractCreateFormGroup.controls.paymentTenureFrequency.value === 'MONTHLY' && this.contractCreateFormGroup.controls.paymentTenureOccurances.value > 12){
            this.occaranceRange = 12;
            this.frequencyErrorMsg = 'Monthly Frequency Can Be Up to 12';
            this.contractCreateFormGroup.controls.paymentTenureOccurances.setValue(0);
        }

        if(this.contractCreateFormGroup.controls.paymentTenureFrequency.value === 'QUARTERLY' && this.contractCreateFormGroup.controls.paymentTenureOccurances.value > 4){
            this.occaranceRange = 4;
            this.frequencyErrorMsg = 'Quarterly Frequency Can Be Up to 4';
            this.contractCreateFormGroup.controls.paymentTenureOccurances.setValue(0);
        }

         if(this.contractCreateFormGroup.controls.paymentTenureFrequency.value === 'HALF-ANNUALLY' && this.contractCreateFormGroup.controls.paymentTenureOccurances.value > 2){
            this.occaranceRange = 2;
            this.frequencyErrorMsg = 'Half-Annually Frequency Can Be Up to 2';
            this.contractCreateFormGroup.controls.paymentTenureOccurances.setValue(0);
        }

         if(this.contractCreateFormGroup.controls.paymentTenureFrequency.value === 'ANNUALLY' && this.contractCreateFormGroup.controls.paymentTenureOccurances.value > 1){
            this.occaranceRange = 1;
            this.frequencyErrorMsg = 'Annually Frequency Should Be 1';
            this.contractCreateFormGroup.controls.paymentTenureOccurances.setValue(0);
        }

  }

  loaContractAutoRenewalComboData(searchValue) {
    this.scrollsyncContractAutoRenewal = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllContractAutoRenewalCombo.sams', searchValue.term, '',
      '', this.recordsPerPageForCombo, this.contractAutoRenewalPageNumber, '1', '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.contractAutoRenewalPageNumber , this.contractAutoRenewalCombo , data.responseData.comboList)
          this.contractAutoRenewalPageNumber = this.getData.pageNumber;
          this.contractAutoRenewalCombo = this.getData.dataList;
          this.scrollsyncContractAutoRenewal = false;
        }
      );
  }

  selectedContractAutoRenewalData(event) {
    this.formOneDirty = true;
    if (this.contractCreateFormGroup.get('serialNo').valid && this.contractCreateFormGroup.get('autoRenewal').valid) {
      this.formOneValidation = true;
    } else {
      this.formOneValidation = false;
    }
  }

  listOfLocationName(searchValue) {
    this.scrollLocationNameSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllUserLocForCombo, searchValue.term, '', '', this.limitCount, this.locationNamePageNumber).subscribe(
      (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.locationNamePageNumber , this.locationCombo , data.responseData.comboList)
          this.locationNamePageNumber = this.getData.pageNumber;
          this.locationCombo = this.getData.dataList;
          this.scrollLocationNameSync = false;
      }
    );
  }

  setLocationNameComboValue(event) {
    if (event === undefined) {
      this.contractCreateFormGroup.controls.locationId.setValue(0);
      this.contractCreateFormGroup.controls.locationName.setValue('');
      this.locationNamePageNumber = 1;
      this.locationCombo = [];
    } else {
      this.contractCreateFormGroup.controls.locationId.setValue(event.locationId);
      this.contractCreateFormGroup.controls.locationName.setValue(event.locationName);
    }

  }

  listOfSupplier(searchValue) {
    this.scrollSuppliersync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.SUPPLIER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchValue.term, '', '',
     this.limitCount, this.supplierListPageNumber,'',partnerRoles).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.supplierListPageNumber , this.supplierList , data.responseData.comboList)
        this.supplierListPageNumber = this.getData.pageNumber;
        this.supplierList = this.getData.dataList;
        this.scrollSuppliersync = false;
      }
    );
  }

  setSupplierData(event) {
    if (event === undefined) {
      this.contractCreateFormGroup.controls.contractPartyId.setValue(0);
      this.contractCreateFormGroup.controls.contractPartyName.setValue('');
      this.contractCreateFormGroup.controls.contractPartyServiceType.setValue('');
      this.supplierListPageNumber = 1;
      this.supplierList = [];
      this.selectedSupplierLocationData(undefined);
    } else {
      this.contractCreateFormGroup.controls.contractPartyId.setValue(event.businessPartnerId);
      this.contractCreateFormGroup.controls.contractPartyName.setValue(event.businessPartnerName);
      //this.contractCreateFormGroup.controls.contractPartyServiceType.setValue(event.serviceType);
      this.supplierLocationListPageNumber = 1;
      this.supplierLocationCombo = [];
      // this.selectedSupplierLocationData(event.supplierLocList[0]);
    }
  }

  listOfCustomer(searchValue) {
    this.scrollCustomersync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.CUSTOMER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchValue.term, '', '',
     this.limitCount, this.customerListPageNumber,'',partnerRoles).subscribe(
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
      this.contractCreateFormGroup.controls.contractPartyId.setValue(0);
      this.contractCreateFormGroup.controls.contractPartyName.setValue('');
      this.customerListPageNumber = 1;
      this.customerList = [];
    } else {
      this.contractCreateFormGroup.controls.contractPartyId.setValue(event.businessPartnerId);
      this.contractCreateFormGroup.controls.contractPartyName.setValue(event.businessPartnerName);
    }
  }

  listOfSupplierLocation(searchValue) {
    const contractPartyId =  this.contractCreateFormGroup.controls.contractPartyId.value
    this.scrollSupplierLocationSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerSiteCombo, searchValue.term, contractPartyId, '', this.limitCount, this.supplierLocationListPageNumber,'').subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.supplierLocationListPageNumber , this.supplierLocationCombo , data.responseData.comboList)
        this.supplierLocationListPageNumber = this.getData.pageNumber;
        this.supplierLocationCombo = this.getData.dataList;
        this.scrollSupplierLocationSync = false;
      }
    );
  }

  

  selectedSupplierLocationData(event) {
    if (event === undefined) {
      this.contractCreateFormGroup.controls.contractPartyLocationId.setValue(0);
      this.contractCreateFormGroup.controls.contractPartyLocationName.setValue('');
      this.contractCreateFormGroup.controls.contactPerson.setValue('');
      this.contractCreateFormGroup.controls.phoneNumber.setValue('');
      this.contractCreateFormGroup.controls.curCd.setValue('');
      this.supplierLocationListPageNumber = 1;
      this.supplierLocationCombo = [];
    } else {
      this.contractCreateFormGroup.controls.contractPartyLocationId.setValue(event.partnerSiteId);
      this.contractCreateFormGroup.controls.contractPartyLocationName.setValue(event.partnerSiteName);
      this.contractCreateFormGroup.controls.contactPerson.setValue(event.contactPersonName);
      this.contractCreateFormGroup.controls.phoneNumber.setValue(event.partnerSitePersonPhoneNo);
      this.contractCreateFormGroup.controls.emailId.setValue(event.partnerSiteEmailId);
      let addressInfo = event.partnerSiteAddress1 + "," + event.partnerSiteAddress2 + " , " + event.partnerSiteArea
                        + "," + event.partnerSiteCity + "," + event.partnerSiteState + "," + event.partnerSiteCountry
                        + "," + event.partnerSitePinCode;
      this.contractCreateFormGroup.controls.addressInfo.setValue(addressInfo);
      this.contractCreateFormGroup.controls.curCd.setValue(event.partnerSiteCurCd);
    }
    this.formValidation();
  }

  listOfManufacturerLocation(searchValue) {
    const contractPartyId =  this.contractCreateFormGroup.controls.contractPartyId.value
    this.scrollManufacturerLocationSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerSiteCombo, searchValue.term, contractPartyId, '', this.limitCount, this.manufacturerLocationListPageNumber,'').subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.manufacturerLocationListPageNumber , this.manufacturerLocationCombo , data.responseData.comboList)
        this.manufacturerLocationListPageNumber = this.getData.pageNumber;
        this.manufacturerLocationCombo = this.getData.dataList;
        this.scrollManufacturerLocationSync = false;
      }
    );
  }

  selectedManufacturerLocationData(event) {
    if (event === undefined) {
      this.contractCreateFormGroup.controls.contractPartyLocationId.setValue(0);
      this.contractCreateFormGroup.controls.contractPartyLocationName.setValue('');
      this.contractCreateFormGroup.controls.contactPerson.setValue('');
      this.contractCreateFormGroup.controls.phoneNumber.setValue('');
      this.contractCreateFormGroup.controls.curCd.setValue('');
      this.manufacturerLocationListPageNumber = 1;
      this.manufacturerLocationCombo = [];
    } else {
      this.contractCreateFormGroup.controls.contractPartyLocationId.setValue(event.partnerSiteId);
      this.contractCreateFormGroup.controls.contractPartyLocationName.setValue(event.partnerSiteName);
      this.contractCreateFormGroup.controls.contactPerson.setValue(event.contactPersonName);
      this.contractCreateFormGroup.controls.phoneNumber.setValue(event.partnerSitePersonPhoneNo);
      this.contractCreateFormGroup.controls.emailId.setValue(event.partnerSiteEmailId);
      let addressInfo = event.partnerSiteAddress1 + "," + event.partnerSiteAddress2 + " , " + event.partnerSiteArea
                        + "," + event.partnerSiteCity + "," + event.partnerSiteState + "," + event.partnerSiteCountry
                        + "," + event.partnerSitePinCode;
      this.contractCreateFormGroup.controls.addressInfo.setValue(addressInfo);
      this.contractCreateFormGroup.controls.curCd.setValue(event.partnerSiteCurCd);
    }
    this.formValidation();
  }

  listOfCustomerLocationextend(data, searchValue){
    if (!(this.commonService.fetchSearchValue(searchValue))) {
      if (this.customerLocationListPageNumber === 1) {
        this.customerLocationCombo = data.responseData.comboList;
      } else {
        this.customerLocationCombo = this.customerLocationCombo.concat(data.responseData.comboList);
      }this.customerLocationCombo.length !==0 ? this.customerLocationListPageNumber += 1 : this.customerLocationListPageNumber = 1;
    } else {
      this.customerLocationListPageNumber = 1;
      this.customerLocationCombo = data.responseData.comboList;
    }
  }

  listOfCustomerLocation(searchValue) {
    this.scrollCustomerLocationSync = true;
    const contractPartyId =  this.contractCreateFormGroup.controls.contractPartyId.value
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerSiteCombo, searchValue.term, contractPartyId, '', this.limitCount, this.supplierLocationListPageNumber,'').subscribe(
      (data) => {
        if (data.success) {
          this.listOfCustomerLocationextend(data, searchValue)
        }
        this.scrollCustomerLocationSync = false;
      }
    );
  }

  selectedCustomerLocationData(event) {
    if (event === undefined) {
      this.contractCreateFormGroup.controls.contractPartyLocationId.setValue(0);
      this.contractCreateFormGroup.controls.contractPartyLocationName.setValue('');
      this.contractCreateFormGroup.controls.contactPerson.setValue('');
      this.contractCreateFormGroup.controls.phoneNumber.setValue('');
      this.contractCreateFormGroup.controls.curCd.setValue('');
      this.customerLocationListPageNumber = 1;
      this.customerLocationCombo = [];
    } else {
      this.contractCreateFormGroup.controls.contractPartyLocationId.setValue(event.partnerSiteId);
      this.contractCreateFormGroup.controls.contractPartyLocationName.setValue(event.partnerSiteName);
      this.contractCreateFormGroup.controls.contactPerson.setValue(event.contactPersonName);
      this.contractCreateFormGroup.controls.phoneNumber.setValue(event.partnerSitePersonPhoneNo);
      this.contractCreateFormGroup.controls.curCd.setValue(event.partnerSiteCurCd);
    }
    this.formValidation();
  }

  dateValidationinstall(event) {
    return false;
  }

  getContractPart(contractPart) {
    this.partValue = contractPart.id;
    const tempStartDate = this.contractCreateFormGroup.controls.contractStartDtDisp.value;
    const startDate = new Date(tempStartDate);
    const getStartMonth = startDate.getMonth() + this.partValue;
    const endDate = startDate.setMonth(getStartMonth);
    const partEndDt = new Date(endDate);
    this.contractCreateFormGroup.controls.contractPartEndDtDisp.setValue(partEndDt);
    this.contractCreateFormGroup.controls['contractPartEndDtDisp'].disable();
    this.contractCreateFormGroup.controls.contractEndDtDisp.setValue(this.contractCreateFormGroup.controls.contractPartEndDtDisp.value);
    this.contractCreateFormGroup.controls['contractEndDtDisp'].disable();
  }

  getContractLabor(contractPart) {

    this.partValue = contractPart.id;
    const tempStartDate = this.contractCreateFormGroup.controls.contractStartDtDisp.value;
    const startDate = new Date(tempStartDate);
    const getStartMonth = startDate.getMonth() + this.partValue;
    const endDate = startDate.setMonth(getStartMonth);
    const contractEndDtLabor = new Date(endDate);
    this.contractCreateFormGroup.controls.contractLaborEndDtDisp.setValue(contractEndDtLabor);
    this.contractCreateFormGroup.controls['contractLaborEndDtDisp'].disable();

    if(this.contractCreateFormGroup.controls.contractPartEndDtDisp.value > this.contractCreateFormGroup.controls.contractLaborEndDtDisp.value){
      this.contractCreateFormGroup.controls.contractEndDtDisp.setValue(this.contractCreateFormGroup.controls.contractPartEndDtDisp.value);
    }else{
      this.contractCreateFormGroup.controls.contractEndDtDisp.setValue(this.contractCreateFormGroup.controls.contractLaborEndDtDisp.value);
    }
    this.contractCreateFormGroup.controls['contractEndDtDisp'].disable();
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  saveContract(){

    console.log("this.contractCreateFormGroup.controls.contractGrossValue.value : ",this.contractCreateFormGroup.controls.contractGrossValue.value)

    this.uploadContractFlag = true;
    //This If Condition is only for setting assetlist which comes from asset or contract Screen
    if(this.assetTabViaAsset && !this.isEditMode){ 
     this.assetListFormGroup.controls.contractAmnt.setValue(this.contractCreateFormGroup.controls.contractGrossValue.value);
     this.contractCreateFormGroup.controls.assetList.setValue([this.assetListFormGroup.value]);
     this.contractCreateFormGroup.controls.totalAssetPoAmount.setValue(this.totalAssetPoAmount);
    }
    if(this.assetTabViaContract  && !this.isEditMode){
      this.contractCreateFormGroup.controls.assetList.setValue([]);
      this.contractCreateFormGroup.controls.assetList.setValue(this.convertAssetToContaractAsset());
      this.contractCreateFormGroup.controls.totalAssetPoAmount.setValue(this.totalAssetPoAmount);
    }
    if(this.isEditMode){
      this.contractCreateFormGroup.controls.assetList.setValue(this.convertAssetToContaractAsset());
    }
    this.contractCreateFormGroup.controls.contractTenurePaymentList.setValue(this.tenurePaymentDataSource);

    const contractStartDtDisps = this.commonService.convertToDateStringyyyy_mm_dd(this.contractCreateFormGroup.controls.contractStartDtDisp.value)

    const contractEndDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(this.contractCreateFormGroup.controls.contractEndDtDisp.value)

    const contractPODtDisp = this.commonService.convertToDateStringyyyy_mm_dd(this.contractCreateFormGroup.controls.contractPODtDisp.value)

    this.contractCreateFormGroup.controls.contractStartDtDisp.setValue(contractStartDtDisps)
    this.contractCreateFormGroup.controls.contractEndDtDisp.setValue(contractEndDtDisp)
    this.contractCreateFormGroup.controls.contractPODtDisp.setValue(contractPODtDisp)

    if(this.contractCreateFormGroup.controls.assetList.value.length > 0){
      this.contractCreateFormGroup.controls.contractTempDtlList.setValue(this.cusFieldHdrList);
      this.commonService.showSpinner();
      if(this.contractCreateFormGroup.controls.coverageType.value != 'CONTRACT' && this.contractCreateFormGroup.controls.coverageType.value != 'INSURANCE') {
        this.contractCreateFormGroup.controls.contractBasicValue.setValue(0);
        this.contractCreateFormGroup.controls.contractGrossValue.setValue(0);
      }
      this.commonService.commonInsertService('saveOrUpdateContract.sams',this.contractCreateFormGroup.getRawValue()).subscribe(
      data => {
        if(data.success){
          this.uploadContractFlag = false;
          this.commonService.openToastSuccessMessage(data.message);
          this.commonService.hideSpinner();
          if(this.fileUpload.length >  0){
            this.uploadContractDocFile(data.responseData.contractHdrId);
          }
          else{
            this.navigateToContract();
          }
        } else {
          this.uploadContractFlag = false;
          this.commonService.openToastErrorMessage(data.message);
          this.commonService.hideSpinner();
        } });
    }else{
      this.uploadContractFlag = false;
      this.commonService.openToastWarningMessage("Kindly Select At least One Asset.");
    }

  }

  clearContract() {
    this.contractCreateFormGroup.reset();
    this.contractCreateFormGroup.updateValueAndValidity();
    this.contractCreateFormGroup.controls["paymentTenureOccurances"].enable();
    this.contractCreateFormGroup.controls["paymentTenureFrequency"].enable();
    this.contractCreateFormGroup.controls["contractType"].enable();
    this.contractCreateFormGroup.controls["contractBasicValue"].enable();
    this.contractCreateFormGroup.controls['coverageType'].enable();
    this.contractCreateFormGroup.controls['contractType'].enable();
    this.tenurePaymentDataSource = [];
    this.ngOnInit();
  }

  calcValue(){

}

addAssetAgainstContract() {  
  const assetIds: number[] = this.assetDataSource.data.map(asset => asset.assetHdrId);
  const dialogRef = this.dialog.open(ContractAddAssetComponent, {
    height: '650px',
    width: '95%',
    data: {
      'assetIds': assetIds
    }
  });
  dialogRef.disableClose = true;
  dialogRef.afterClosed().subscribe(
    data => {    
      if(data != undefined && data !=''){
        this.assetDataSource.data.push(...data);
        this.assetDataSource.data = this.assetDataSource.data.filter((obj,index, self) => index == self.findIndex(obj1 => obj1.assetHdrId === obj.assetHdrId));
        this.calculateContractAmt(this.assetDataSource.data);
        this.calcRemainingAmount();
        this.assetDataSource._updateChangeSubscription();
        this.resetAssetList();    
      }
    });
}

calcRemainingAmountextend(data, rowIndex) {
  if (this.contractPeriodDataSource.data.length !== 0) {
    this.contractPeriodTempPush = this.contractPeriodDataSource.data;
  }
  if (data.contractPeriodId === undefined) data.contractPeriodId = 0;
  if (data.contractPeriodId > 0) {
    this.contractPeriodTempPush.splice(rowIndex, 1);
    this.contractPeriodTempPush.push(data);
    this.contractPeriodDataSource.data = this.contractPeriodTempPush;
  } else {
    const index = this.commonService.getIndexOfTheItem(this.contractPeriodDataSource.data, true, 'itemName', data.itemName);
    if (index === -1) {
      this.contractPeriodTempPush.push(data);
      this.contractPeriodDataSource.data = this.contractPeriodTempPush;
    } else {
      this.commonService.openToastWarningMessage('Spare Item Already Added!');
    }
  }
}

calcRemainingAmount(){
  this.totalAssetAmount = 0;
  let assetData: any  = [] ;
  assetData = this.assetDataSource.data;
  for(let k = 0; k < assetData.length; k++) {
    this.totalAssetAmount = Number(this.totalAssetAmount) + Number(assetData[k].contractAmnt);
  }
  this.contractCreateFormGroup.controls.contractBasicValue.setValue(this.totalAssetAmount);
  this.remainingAmount = Number(this.contractCreateFormGroup.controls.contractGrossValue.value) - Number(this.totalAssetAmount) ;
  
  if (this.totalAssetAmount === 0) {
    // this.contractCreateFormGroup.setErrors({ 'zeroContractAmount': true });
  } else {
    // If totalAssetAmount is not zero, remove the error
    this.contractCreateFormGroup.setErrors(null);
  }
}

  dialogRefContractPeriod;
  contractPeriodAddEdit(element, type, rowIndex) {
    this.dialogRefContractPeriod = this.dialog.open(ContractPeriodCreateComponent, {
      height: '650px',
      width: '500px',
      data: {
        'contractPeriod': element,
        'mode': type
      }
    });
    this.dialogRefContractPeriod.disableClose = true;
    this.dialogRefContractPeriod.afterClosed().subscribe(
      data => {
        if (data !== null || data !== undefined || data !== '') {

          this.calcRemainingAmountextend(data, rowIndex)

          this.contractPeriod.renderRows();
          this.changeDetectorRefs.detectChanges();
        }
      });
  }

  DeleteContractPeriod(deleteid, index) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Contract Period'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if ((data.status) && (deleteid <= 0 || deleteid === undefined)) {
            this.contractPeriodTempPush = this.contractPeriodTempPush.data;
            this.contractPeriodTempPush.splice(index, 1);
            this.contractPeriodDataSource.data = this.contractPeriodTempPush;
            this.changeDetectorRefs.detectChanges();
        }
      });
  }

  contractValChange() {
    this.calcualteDisRate(Number(this.contractCreateFormGroup.controls.discountRate.value), Number(this.contractCreateFormGroup.controls.contractBasicValue.value));
  }

  calcualteDisRate(discountRate1:number, contractBasicValue1:number) {
    const discountRate=Number(discountRate1);
    const contractBasicValue=Number(contractBasicValue1);
    if (isNaN(Number(discountRate)) || isNaN(Number(contractBasicValue))) {
      this.contractCreateFormGroup.controls.discountAmt.setValue(0);
    } else {
      this.contractCreateFormGroup.controls.discountAmt.setValue(Math.round(contractBasicValue * (discountRate / 100)));
    }
    this.contractCreateFormGroup.controls.contractGrossValue.setValue(this.contractCreateFormGroup.controls.contractBasicValue.value -
                                                               this.contractCreateFormGroup.controls.discountAmt.value);

    if(this.contractCreateFormGroup.controls.taxRate1.value > 0){
      this.contractCreateFormGroup.controls.taxValue1.setValue(Math.round(contractBasicValue *
                                                              (Number(this.contractCreateFormGroup.controls.taxRate1.value) / 100)));
    }else{
      this.contractCreateFormGroup.controls.taxValue1.setValue(0);
    }

    if(this.contractCreateFormGroup.controls.taxRate2.value > 0){
      this.contractCreateFormGroup.controls.taxValue2.setValue(Math.round(contractBasicValue *
                                                              (Number(this.contractCreateFormGroup.controls.taxRate2.value) / 100)));
    }else{
      this.contractCreateFormGroup.controls.taxValue2.setValue(0);
    }

    this.contractCreateFormGroup.controls.netContractValue.setValue(((Number(this.contractCreateFormGroup.controls.taxValue1.value) +
                                                               Number(this.contractCreateFormGroup.controls.taxValue2.value)) +
                                                               this.contractCreateFormGroup.controls.contractGrossValue.value).toFixed(2));

    if (isNaN(this.contractCreateFormGroup.controls.netContractValue.value)) {
      this.contractCreateFormGroup.controls.netContractValue.setValue(0);
    }

    this.contractCreateFormGroup.controls.localNetContractValue.setValue(Number(this.contractCreateFormGroup.controls.netContractValue.value) * Number(this.contractCreateFormGroup.controls.exchRate.value));
  }

  listOfTaxCode1(searchValue) {
    this.scrollTaxCode1Sync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfTaxCombo, searchValue.term, '', '', this.limitCount, this.taxCode1PageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.taxCode1PageNumber , this.taxCode1List , data.responseData.comboList)
        this.taxCode1PageNumber = this.getData.pageNumber;
        this.taxCode1List = this.getData.dataList;
        this.scrollTaxCode1Sync = false;
      }
    );
  }

  setTaxCode1Id(event) {
    if (event === undefined) {
      this.contractCreateFormGroup.controls.taxRate1.setValue('');
      this.contractCreateFormGroup.controls.taxCode1.setValue('');
      this.taxCode1PageNumber = 1;
      this.taxCode1List = [];
    }else{
      this.contractCreateFormGroup.controls.taxRate1.setValue(event.taxRate);
      this.contractCreateFormGroup.controls.taxCode1.setValue(event.taxCode);
      const tax1 = this.contractCreateFormGroup.controls.taxCode1.value;
      const tax2 = this.contractCreateFormGroup.controls.taxCode2.value;
      if (tax1 === tax2) {
        this.commonService.openToastWarningMessage(`"Tax 1" And "Tax 2" Should Be Different.`);
        this.contractCreateFormGroup.controls.taxRate1.setValue(0);
        this.contractCreateFormGroup.controls.taxCode1.setValue('');
      }
    }
  }

  listOfTaxCode2(searchValue) {
    this.scrollTaxCode2Sync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfTaxCombo, searchValue.term, '', '', this.limitCount, this.taxCode2PageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.taxCode2PageNumber , this.taxCode2List , data.responseData.comboList)
        this.taxCode2PageNumber = this.getData.pageNumber;
        this.taxCode2List = this.getData.dataList;
        this.scrollTaxCode2Sync = false;
      }
    );
  }

  setTaxCode2Id(event) {
    if (event === undefined) {
      this.contractCreateFormGroup.controls.taxRate2.setValue('');
      this.contractCreateFormGroup.controls.taxCode2.setValue('');
      this.taxCode2PageNumber = 1;
      this.taxCode2List = [];
    }else{
      this.contractCreateFormGroup.controls.taxRate2.setValue(event.taxRate);
      this.contractCreateFormGroup.controls.taxCode2.setValue(event.taxCode);
      const tax1 = this.contractCreateFormGroup.controls.taxCode1.value;
      const tax2 = this.contractCreateFormGroup.controls.taxCode2.value;
      if (tax1 === tax2) {
        this.commonService.openToastWarningMessage(`"Tax 1" And "Tax 2" Should Be Different.`);
        this.contractCreateFormGroup.controls.taxRate2.setValue(0);
        this.contractCreateFormGroup.controls.taxCode2.setValue('');
       }
    }
  }

  listOfCoverageType(searchValue) {
    this.scrollCoverageTypeSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllCoverageTypeCombo.sams', searchValue.term, '', '', this.limitCount, this.coverageTypePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.coverageTypePageNumber , this.coverageTypeList , data.responseData.comboList)
        this.coverageTypePageNumber = this.getData.pageNumber;
        this.coverageTypeList = this.getData.dataList;
        this.scrollCoverageTypeSync = false;
        if(this.coverageTypeList.length == 1) {
          //this.coverageTypeList[0];
          this.contractCreateFormGroup.controls.coverageType.setValue(this.coverageTypeList[0].coverageTypeName);
          this.displayAmountCol(this.contractCreateFormGroup.controls.coverageType.value);
        }
      }
    );
  }

  setCoverageType(event) {
    if (event === undefined) {
      this.contractCreateFormGroup.controls.coverageType.setValue('');
      this.coverageTypePageNumber = 1;
      this.coverageTypeList = [];
    } else{
      this.contractCreateFormGroup.controls.coverageType.setValue(event.coverageTypeName);
    }
  }

  changeContractTypeValidation(event){
    if(event.coverageTypeName==='CONTRACT'){
      this.contractCreateFormGroup.controls["contractType"].setValue('');
      this.contractCreateFormGroup.controls["contractType"].setValidators(Validators.required);
      this.contractCreateFormGroup.controls["contractType"].enable();
      this.contractCreateFormGroup.controls["contractType"].updateValueAndValidity();
      this.contractTypeMandatory = "*";

      //Auto Renewal Combo Mandatory Changes
      this.autoRenewalMandatory = "*";
      this.contractCreateFormGroup.controls["autoRenewal"].setValidators(Validators.required);
      this.contractCreateFormGroup.controls["autoRenewal"].updateValueAndValidity();
    }else if(event.coverageTypeName==='WARRANTY' || event.coverageTypeName==='EXTENDED WARRANTY'){
      this.contractCreateFormGroup.controls["contractType"].setValue('');
      this.contractCreateFormGroup.controls["contractType"].setValidators([]);
      this.contractCreateFormGroup.controls["contractType"].disable();
      this.contractCreateFormGroup.controls["contractType"].updateValueAndValidity();
      this.contractTypeMandatory = "";

      //Auto Renewal Combo Mandatory Changes
      this.autoRenewalMandatory = "";
      this.contractCreateFormGroup.controls["autoRenewal"].setValidators([]);
      this.contractCreateFormGroup.controls["autoRenewal"].updateValueAndValidity();
    }
    this.displayAmountCol(event.coverageTypeName);
  }

  changeContractValueValidation(event){
    if(event.coverageTypeName==='WARRANTY'){
      this.contractCreateFormGroup.controls["contractBasicValue"].setValue(0);
      this.contractCreateFormGroup.controls["contractBasicValue"].setValidators([]);
      this.contractCreateFormGroup.controls["contractBasicValue"].disable();
      this.contractCreateFormGroup.controls["contractBasicValue"].updateValueAndValidity();
      this.contractValueMandatory = "";
    }else if(event.coverageTypeName==='CONTRACT' || event.coverageTypeName==='EXTENDED WARRANTY'){
      this.contractCreateFormGroup.controls["contractBasicValue"].setValue('0');
      this.contractCreateFormGroup.controls["contractBasicValue"].setValidators([Validators.required,
                                                                                 Validators.pattern(this.assetOptimaConstants.numericValidation)]);
      this.contractCreateFormGroup.controls["contractBasicValue"].enable();
      this.contractCreateFormGroup.controls["contractBasicValue"].updateValueAndValidity();
      this.contractValueMandatory = "*";
    }
  }


  listOfContractType(searchValue) {
    this.scrollContractTypeSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllContractTypeCombo.sams', searchValue.term, '', '', this.limitCount, this.contractTypePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.contractTypePageNumber , this.contractTypeList , data.responseData.comboList)
        this.contractTypePageNumber = this.getData.pageNumber;
        this.contractTypeList = this.getData.dataList;
        this.scrollContractTypeSync = false;
      }
    );
  }

  setContractType(event) {
    if (event === undefined) {
      this.contractCreateFormGroup.controls.contractType.setValue('');
      this.contractTypePageNumber = 1;
      this.contractTypeList = [];
    } else{
      this.contractCreateFormGroup.controls.contractType.setValue(event.contractTypeName);
    }
  }

  documentAddEdit() {
    const dialogRef = this.dialog.open(ContractDocCreateComponent, {
      height: '300px',
      width: '500px',
      data: {
        'contractHdrId': this.contractCreateFormGroup.controls.contractHdrId.value,
        'contractDocData': this.contractDocDataSource
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if(data.status == true){
          this.fileUpload.push(data.response)
          this.contractDocDataSource.push(data.response);
          this.contractDocumentTable.renderRows();
          this.commonService.openToastSuccessMessage("Record Added Successfully.");
        }
      });
  }

  fetchListOfContractDocs() {
    this.commonService.commonGetService('loadContractDoc.sams', this.contractCreateFormGroup.controls.contractHdrId.value).subscribe(
      (data) => {
        this.contractDocDataSource = [];
        this.contractDocDataSource = this.contractDocDataSource.concat(data.responseData);
      }
    )
  }

  uploadContractDocFile(contractHdrId) {

    let formData: FormData = new FormData();
   for(let i=0;i<this.fileUpload.length;i++){ 
    formData.append('contractDocImage'+i, this.fileUpload[i].contractDocImage);
    formData.append('docType'+i, this.fileUpload[i].docType);
    formData.append('docName'+i, this.fileUpload[i].docName);
   } 

   formData.append('contractHdrId', contractHdrId);
   formData.append('userId', this.userSessionService.getUserId());
   formData.append('orgId', this.userSessionService.getUserOrgId());
   formData.append('count', this.fileUpload.length);

    //To start loading
    this.commonService.commonFileUpload('saveOrUpdateContractDoc.sams', formData).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
             this.navigateToContract();
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

  downloadDocument(filePath: string, contentType: string) {
    const fileName = filePath.split('.')[0];
    this.commonService.downloadFile(filePath, contentType).subscribe(
      data => {
        this.commonService.showDownloadPopUp(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
      }
    );
  }

  deleteDocument(deleteid,docName, index) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
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
          if(deleteid>0){
            this.commonService.commonGetService('deleteContractDoc.sams', deleteid).subscribe(
              data => {
                if (data.success) {
                  this.commonService.openToastSuccessMessage(data.message);
                  this.contractDocDataSource.splice(index, 1);
                  this.contractDocumentTable.renderRows();
                } else {
                  this.commonService.openToastErrorMessage(data.message);
                }
              }
            );
          }
          else{
            this.fileUpload.splice((this.fileUpload.findIndex(data=> data.docName === docName)),1);
            this.contractDocDataSource.splice(index,1);
            this.commonService.openToastSuccessMessage("Record Deleted Successfully.");
            this.contractDocumentTable.renderRows();
          }
        }
      });
  }

  changePartyValidation(event){
    if(event== undefined){
      this.setSupplierData(undefined)
    }else if(event.name==='MANUFACTURER'){
      this.contractCreateFormGroup.controls["contractPartyLocationName"].setValue('');
      this.contractCreateFormGroup.controls["contractPartyLocationName"].setValidators([]);
      this.contractCreateFormGroup.controls["contractPartyLocationName"].updateValueAndValidity();

      this.contractCreateFormGroup.controls["contactPerson"].setValue('');
      this.contractCreateFormGroup.controls["contactPerson"].setValidators([Validators.maxLength(100)]);
      this.contractCreateFormGroup.controls["contactPerson"].updateValueAndValidity();

      this.contractCreateFormGroup.controls["phoneNumber"].setValue('');
      this.contractCreateFormGroup.controls["phoneNumber"].setValidators([Validators.pattern(this.assetOptimaConstants.phoneNumberValidation),
                                                                          Validators.maxLength(15),Validators.minLength(10)]);
      this.contractCreateFormGroup.controls["phoneNumber"].updateValueAndValidity();

      this.partyLocationMandatory = "";
      this.contactPersonMandatory = "";
      this.phoneNumberMandatory = "";

      this.contractCreateFormGroup.controls["contractPartyId"].setValue(0);
      this.contractCreateFormGroup.controls["contractPartyName"].setValue('');
      this.contractCreateFormGroup.controls["contractPartyLocationId"].setValue(0);
      this.contractCreateFormGroup.controls["contractPartyLocationName"].setValue('');
      this.formValidation();
    }else if(event.name==='CUSTOMER' || event.name==='SUPPLIER'){
      this.contractCreateFormGroup.controls["contractPartyLocationName"].setValue('');
      // this.contractCreateFormGroup.controls["contractPartyLocationName"].setValidators([Validators.required]);
      this.contractCreateFormGroup.controls["contractPartyLocationName"].updateValueAndValidity();

      this.contractCreateFormGroup.controls["contactPerson"].setValue('');
      this.contractCreateFormGroup.controls["contactPerson"].setValidators([Validators.required,Validators.maxLength(100)]);
      this.contractCreateFormGroup.controls["contactPerson"].updateValueAndValidity();

      this.contractCreateFormGroup.controls["phoneNumber"].setValue('');
      this.contractCreateFormGroup.controls["phoneNumber"].setValidators([Validators.pattern(this.assetOptimaConstants.phoneNumberValidation),
                                                                          Validators.maxLength(15), Validators.required,Validators.minLength(10)]);
      this.contractCreateFormGroup.controls["phoneNumber"].updateValueAndValidity();

      this.partyLocationMandatory = "*";
      this.contactPersonMandatory = "*";
      this.phoneNumberMandatory = "*";

      this.contractCreateFormGroup.controls["contractPartyId"].setValue(0);
      this.contractCreateFormGroup.controls["contractPartyName"].setValue('');
      this.contractCreateFormGroup.controls["contractPartyLocationId"].setValue(0);
      this.contractCreateFormGroup.controls["contractPartyLocationName"].setValue('');
      this.formValidation();
    }
  }

  listOfManufacturer(searchValue) {
    this.scrollManufacturersync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.MANUFACTURER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchValue.term, '', '',
    this.limitCount, this.manufacturerListPageNumber,'',partnerRoles).subscribe(
      (data) => {
        if (!(this.commonService.fetchSearchValue(searchValue))) {
          if (this.manufacturerListPageNumber === 1) {
            this.manufacturerList = data.responseData.comboList;
          } else {
            this.manufacturerList = this.manufacturerList.concat(data.responseData.comboList);
          }this.manufacturerList.length !== 0 ? this.manufacturerListPageNumber += 1 : this.manufacturerListPageNumber = 1;
        } else {
          this.manufacturerListPageNumber = 1;
          this.manufacturerList = data.responseData.comboList;
        }
          this.scrollManufacturersync = false;
      }
    );
  }

  setManufacturerData(event) {
    if (event === undefined) {
      this.contractCreateFormGroup.controls.contractPartyId.setValue(0);
      this.contractCreateFormGroup.controls.contractPartyName.setValue('');
      this.manufacturerListPageNumber = 1;
      this.manufacturerList = [];
      this.selectedManufacturerLocationData(undefined);
    } else {
      this.contractCreateFormGroup.controls.contractPartyId.setValue(event.businessPartnerId);
      this.contractCreateFormGroup.controls.contractPartyName.setValue(event.businessPartnerName);
      this.manufacturerLocationListPageNumber = 1;
      this.manufacturerLocationCombo = [];
    }
  }

  addPaymentDetails(){
    if(this.contractCreateFormGroup.controls.paymentTenureOccurances.value === 0){
        this.contractCreateFormGroup.controls["paymentTenureOccurances"].disable();
        this.contractCreateFormGroup.controls["paymentTenureFrequency"].disable();
        this.addManualPaymentDetails();
    }else if(this.contractCreateFormGroup.controls.paymentTenureOccurances.value > 0 &&
             this.contractCreateFormGroup.controls.paymentTenureFrequency.value !=='' &&
             this.contractCreateFormGroup.controls.paymentTenureFrequency.value !==null){
      if(this.isEditMode){
        this.contractCreateFormGroup.controls["paymentTenureOccurances"].disable();
        this.contractCreateFormGroup.controls["paymentTenureFrequency"].disable();
        this.deleteTenurePaymentFromBackendAndGetPaymentDetails();
      }
      if(this.isAddMode){
        this.contractCreateFormGroup.controls["paymentTenureOccurances"].disable();
        this.contractCreateFormGroup.controls["paymentTenureFrequency"].disable();
        this.getTenurePaymentDetails();
      }
    }
  }

  deleteTenurePaymentFromBackendAndGetPaymentDetails(){
    this.commonService.commonGetService('deleteAllTenurePaymentInfo.sams', this.contractCreateFormGroup.controls.contractHdrId.value).subscribe(
      data => {
        if (data.success) {
          this.tenurePaymentDataSource = data.responseData;
          this.getTenurePaymentDetails();
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
      }
    );
  }

  getTenurePaymentDetails(){
    this.commonService.commonListService('fetchListOfAllPaymentTenureDetails.sams', this.contractCreateFormGroup.getRawValue()).subscribe(
      data => {
        if (data.success) {
          this.tenurePaymentDataSource = data.responseData;
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
      }
    );
  }

  addManualPaymentDetails(){
    this.tenurePaymentDataSource.push(this.tenurePaymentFormGroup.value);

    this.tenurePaymentFormGroup.controls.tenureAmount.setValue(0);
    this.tenurePaymentFormGroup.controls.tenureDateDisp.setValue('');
    this.tenurePaymentFormGroup.controls.paymentMode.setValue('');
    this.tenurePaymentFormGroup.controls.instrumentNo.setValue('');
    this.tenurePaymentFormGroup.controls.instrumentDtDisp.setValue('');
    this.tenurePaymentFormGroup.controls.bankName.setValue('');
    this.tenurePaymentFormGroup.controls.instrumentAmnt.setValue(0);

    this.changeDetectorRefs.detectChanges();
    this.tablePayment.renderRows();
  }

  clearPaymentDetails(){
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Payment Schedule'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          this.tenurePaymentDataSource = [];
          this.contractCreateFormGroup.controls["paymentTenureOccurances"].enable();
          this.contractCreateFormGroup.controls["paymentTenureFrequency"].enable();
        }
      });
  }

  getWorkflowApprovalForContract() {

    this.commonService.commonGetService('getWorkflowForId.sams', this.contractCreateFormGroup.controls.contractHdrId.value,
                                                                 this.userSessionService.getUserEmpId(),
                                                                 'CONTRACT',this.userSessionService.getUserOrgId()).subscribe(
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

  contractApprove(isFromUpdate){
    let contractPriceFlag = false;
    if(this.contractCreateFormGroup.controls.approvalId.value > 0){
      if(this.contractCreateFormGroup.controls.contractWithoutPrice.value && this.contractCreateFormGroup.controls.contractWithoutSupplier.value){
        if(this.contractCreateFormGroup.controls.contractPartyName.value == ''){
          this.commonService.openToastWarningMessage("Supplier Name is Required! Kindly Update the Supplier Name");
          contractPriceFlag = true;
        }else if(this.contractCreateFormGroup.controls.contractWithoutPrice.value){
          
          for(let i = 0; i< this.assetDataSourceTemp.data.length; i++){
            if(this.assetDataSourceTemp.data[i].contractAmnt <= 0){
              this.commonService.openToastWarningMessage("Contract Price is Required ! Kindly Update the Contract Price");
              contractPriceFlag = true;
              break;
            }
          }
          
        }
        if(!contractPriceFlag){
          this.confirmContractApprove(isFromUpdate);
        }
        
      }else if(this.contractCreateFormGroup.controls.contractWithoutSupplier.value && this.contractCreateFormGroup.controls.contractPartyName.value == ''){
        this.commonService.openToastWarningMessage("Supplier Name is Required! Kindly Update the Supplier Name");
    }else if(this.contractCreateFormGroup.controls.contractWithoutPrice.value){
      for(let i = 0; i< this.assetDataSourceTemp.data.length; i++){
        if(this.assetDataSourceTemp.data[i].contractAmnt <= 0){
          this.commonService.openToastWarningMessage("Contract Price is Required ! Kindly Update the Contract Price");
          contractPriceFlag = true;
          break;
        }
      }
      if(!contractPriceFlag){
        this.confirmContractApprove(isFromUpdate);
      }
    }else{
      this.confirmContractApprove(isFromUpdate);
      
    }
  }else{
    this.confirmContractApprove(isFromUpdate);
  }
}

  confirmContractApprove(isFromUpdate) {

    if(isFromUpdate){
      this.status = "APPROVED";
            this.updateContractStatus(this.status);
    }else{

      let selectedContractItems = 0;
    if(this.contractCreateFormGroup.controls.approvalId.value == 0){
      selectedContractItems = 0;
    }else{
      selectedContractItems = 1;
    }

      const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
        height: 'auto',
        width: '400px',
        data: {
          confirmHeading: 'Confirmation',
          confirmMsg:'Are you sure to Approve this Contract?',
          note : 'Note : Only OSPR under your queue will be Approved',
          selectedElementListLength : selectedContractItems
        }
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(
        data => {
          if (data.status === true) {
            this.status = "APPROVED";
            this.updateContractStatus(this.status);
            this.navigateToContract();
          }
        });

    }
    
  }

  rejectContractApprove() {


      if(this.contractCreateFormGroup.controls.approvalId.value == 0){
        this.selectedContractItems = 0;
      }else{
        this.selectedContractItems = 1;
      }
  
      const dialogRef = this.dialog.open(RejectConfirmationComponent, {
        height: 'auto',
        width: '400px',
        data: {
          confirmHeading: 'Confirmation',
          confirmMsg: 'Are you sure to Reject selected Purchase Request ?',
          note : 'Note : Only PR under your queue will be Rejected',
          selectedElementListLength : this.selectedContractItems
        }
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(
        data => {
          if (data.status === true) {
          let rejectReason = data.reason;
            this.status = "REJECT PERMANENTLY";
            this.updateContractStatusReject(this.status,rejectReason);
          }
        });
  }


  updateContractStatus(status) {
    this.commonService.showSpinner();
    let contractList = {selectedContractList: [this.contractCreateFormGroup.controls.contractHdrId.value],status: status,selectedApprovalList : [this.approvalId]};
    this.commonService.commonInsertService(this.assetOptimaServices.updateContractStatus, contractList).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
          this.ngOnInit();
          this.commonService.hideSpinner();
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.commonService.hideSpinner();
        }
      });
  }

  updateContractStatusReject(status,rejectReason) {

    this.commonService.showSpinner();
    let contractList = {selectedContractList: [this.contractCreateFormGroup.controls.contractHdrId.value],status: status,selectedApprovalList : [this.approvalId],rejectReason : rejectReason};

    this.commonService.commonInsertService(this.assetOptimaServices.updateContractStatus, contractList).subscribe(
    data => {
      if (data.success) {
        this.commonService.openToastSuccessMessage(data.message);
        this.commonService.hideSpinner();
        this.navigateToContract();
      } else {
        this.commonService.openToastErrorMessage(data.message);
        this.commonService.hideSpinner();
      }
    });
}


  formValidation() {
      if (this.contractCreateFormGroup.controls.contractStartDtDisp.valid && this.contractCreateFormGroup.controls.contractEndDtDisp.valid && this.contractCreateFormGroup.controls.expiryPriorNotifyDays.valid) {
          this.formOneValid = true;
        if(this.contractCreateFormGroup.controls.contractingPartyType.value === 'SUPPLIER' || this.contractCreateFormGroup.controls.        contractingPartyType.value === 'CUSTOMER'){
          if(this.contractCreateFormGroup.controls.contactPerson.valid && this.contractCreateFormGroup.controls.phoneNumber.valid){
            this.formOneValid = true;
            }else{
              this.formOneValid = false;
          }
        }
        if(this.contractCreateFormGroup.controls.coverageType.value === 'EXTENDED WARRANTY'){
          if(this.contractCreateFormGroup.controls.contractBasicValue.valid){
            this.formOneValid = true;
          }else{
              this.formOneValid = false;
          }
        }
        else if(this.contractCreateFormGroup.controls.coverageType.value === 'CONTRACT'){
          if(this.contractCreateFormGroup.controls.autoRenewal.valid && this.contractCreateFormGroup.controls.contractBasicValue.valid){
            this.formOneValid = true;
          }else{
            this.formOneValid = false;
          }
        }

      }else{
            this.formOneValid = false;
        }
        return this.formOneValid;
      }

  onChangeValidation(event){
    this.formValidation();
  }

  convertAssetToContaractAsset(){    
    const assetList = [];
    this.assetDataSource.data.forEach(element => {
      let contractAsset = new ContractDetailAssetModel();
      contractAsset.assetHdrId = element.assetHdrId;
      contractAsset.assetCode = element.assetCode;
      contractAsset.modelId = element.modelId;
      contractAsset.modelName = element.modelName;
      contractAsset.assetGroupName = element.assetGroupName;
      contractAsset.serialNo = element.serialNo;
      contractAsset.description = element.description;
      contractAsset.equipmentCode = element.equipmentCode;
      contractAsset.totalPurchaseAmt = element.totalPurchaseAmt;
      contractAsset.manufacturerName = element.manufacturerName;
      contractAsset.subCategoryName = element.subCategoryName;
      contractAsset.excludedServices = element.excludedServices;
      contractAsset.includedServices = element.includedServices;
      contractAsset.contractAmnt = element.contractAmnt;
      contractAsset.contractAssetId = element.contractAssetId;
      assetList.push(contractAsset);
    });
    return assetList;
  }

  editAsset(assetHdrId,mode) {
    this.commonService.showSpinner();
    localStorage.setItem('previousRoute', this.router.url);
    const url = 'home/asset/assetCreateV1/'+ assetHdrId+'/'+mode+'/asset_info'; 
    window.open(url, '_blank');
    this.commonService.hideSpinner();
  }

  deleteAssetFromContractAssets(assetHdrId){
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Asset'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          this.assetDataSource.data.splice((this.assetDataSource.data.findIndex(data=> data.assetHdrId === assetHdrId)),1);
          this.calculateContractAmt(this.assetDataSource.data);
          this.calcRemainingAmount();
          this.assetDataSource._updateChangeSubscription();
          this.resetAssetList();
          this.commonService.openToastSuccessMessage("Record Deleted Successfully.");
        }
      });
  }

  searchContractAsset() {
      const dialogRef = this.dialog.open(SearchContractAssetComponent, {
      height: '230px',
      width: '550px',
      data: {
        'assetCode': this.assetCode,
        'serialNo': this.serialNo,
        'assetModel':this.assetModel,
        'assetSubCat':this.assetSubCat
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
    data => {
      if(data != undefined || data != ''){        
        this.assetCode = data.assetCode;
        this.serialNo = data.serialNo;
        this.assetModel = data.assetModel;
        this.assetSubCat = data.assetSubCat;
        this.assetDataSourceTemp.data = this.filterAssetFromList();
        this.assetDataSourceTemp._updateChangeSubscription();
      }
    });
  }

  filterAssetFromList(){
      let filteredArray = this.assetDataSource.data.filter(asset =>
        (this.assetCode === null || this.assetCode.trim() === '' || asset.assetCode.toLowerCase().includes(this.assetCode.toLowerCase())) &&
        (this.serialNo === null || this.serialNo.trim() === '' || asset.serialNo.toLowerCase().includes(this.serialNo.toLowerCase())) &&
        (this.assetModel === null || asset.modelName.toLowerCase().includes(this.assetModel.toLowerCase())) &&
        (this.assetSubCat === null || asset.subCategoryName.toLowerCase().includes(this.assetSubCat.toLowerCase()))
      );
    return filteredArray;
  }

  resetAssetList(){
    this.assetCode = null;
    this.serialNo = null;
    this.assetModel = null;
    this.assetSubCat = null;
    this.assetDataSourceTemp.data = []
    this.assetDataSourceTemp.data.push(...this.assetDataSource.data);
    this.assetDataSourceTemp._updateChangeSubscription();
  }

  displayAmountCol(event){
    if(event=== 'CONTRACT' || event ==='EXTENDED WARRANTY' || event === 'INSURANCE'){
      this.assetDispCol = ['slNo','assetCode', 'modelName', 'assetGroupName','departmentName','assetInfo', 'contractAmnt','includedServices','excludedServices','action'];
    }else{
      this.assetDispCol = ['slNo','assetCode', 'modelName', 'assetGroupName','assetInfo','includedServices','excludedServices','action'];
    }
  }

  onChangeValidation1() {
    const startDateString = this.contractCreateFormGroup.controls.contractStartDtDisp.value;
    const endDateString = this.contractCreateFormGroup.controls.contractEndDtDisp.value; 
    const startDate = new Date(startDateString);
    this.fromDate = 'Start Date';
    const endDate = new Date(endDateString);
  
    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      const currentDate = new Date();
      if (startDate.getTime() < currentDate.getTime()) {
        this.fromDate = 'Today';
        startDate.setDate(currentDate.getDate());
        startDate.setMonth(currentDate.getMonth());
        startDate.setFullYear(currentDate.getFullYear());
      }
      const timeDiff = endDate.getTime() - startDate.getTime();
      this.daysElapsed = Math.ceil(timeDiff / (1000 * 3600 * 24));
    } else {
      this.daysElapsed = 0;
    }
    if(this.daysElapsed <= 90 && this.daysElapsed >= 0){
      this.commonService.openToastWarningMessage(this.daysElapsed+" Days Left To Expire From "+this.fromDate+".");
    }else if(this.daysElapsed < 0){
      this.commonService.openToastWarningMessage("Contract Expired Aleady.");
    }
  }

  insertOrEditInfo(element,property,title,infoText){
    let dialogRef = this.dialog.open(InformationPopupComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'title':title,
        'infoText': infoText,
        'commonhint':this.CommonhintMsg.MAX_500,
        'length':500
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          this.updatePropertyById(element.assetHdrId,data.infoText,this.assetDataSourceTemp.data,property);
          this.updatePropertyById(element.assetHdrId,data.infoText,this.assetDataSource.data,property);
          this.commonService.openToastSuccessMessage("Record Updated Successfully.");
        }
      });
  }

  updatePropertyById(assetHdrId, newValue, listOfObjects, property) {
    const objectToUpdate = listOfObjects.find(data=> data.assetHdrId === assetHdrId);
    if (objectToUpdate) {
      objectToUpdate[property] = newValue;
    }    
  }

  emailReminderAddEdit() {
    var mode; 
    if(this.contractCreateFormGroup.controls.contractHdrId.value > 0 && this.headingDisplay != 'View'){
      mode = 'edit';
    }else{
      mode = 'view';
    }
    let dialogRef = this.dialog.open(EmailReminderScheduleCreateComponent, {
      data: { 
        'emailReminderScheduleHdrId': this.contractCreateFormGroup.controls.expiryNotifyId.value,
        'mode': mode,
        'source':"contract",
        'transId':this.contractCreateFormGroup.controls.contractHdrId.value,
        'processId':processList.ASSET_CONTRACT,
        'locId':this.contractCreateFormGroup.controls.locationId.value
      },
       width: '700px', height: '600px'     
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        // this.ngOnInit();
      });
  }

  calculateContractAmt(data){
    if(this.contractCreateFormGroup.controls.coverageType.value === 'CONTRACT'){
      // this.totalAssetPoAmount = 0;
      // this.totalAssetPoAmount = data.reduce((total, item) => total + item.totalPurchaseAmt, 0);
      // for(let j = 0; j < data.length; j++) {
      //   const averagePercentage : any = Number(data[j].totalPurchaseAmt) / Number(this.totalAssetPoAmount);
      //   data[j].contractAmnt=Math.round(this.contractCreateFormGroup.controls.contractGrossValue.value * Number(averagePercentage));
      // }

      if(this.contractCreateFormGroup.controls.contractType.value === 'AMC') {
        for(let j = 0; j < data.length; j++) {
          if(!data[j].contractAmnt){
            data[j].contractAmnt=Math.round(Number(data[j].amcValue));
          }
            
          }
      } else if (this.contractCreateFormGroup.controls.contractType.value === 'CMC'){
        for(let j = 0; j < data.length; j++) {
          
          if(!data[j].contractAmnt){
            data[j].contractAmnt=Math.round(Number(data[j].cmcValue)); 
          }
          }
      }
    }  
  }

  cusFieldHdr: PurchaseTermsTemplateDtl;
  cusFieldHdrList: PurchaseTermsTemplateDtl[];
  customFieldsLength: number=0;

  addPOTCTemplateInfo() {
    let dialogRef = this.dialog.open(PoTcTemplateListComponent, {
      data: {
        'source': "contract",
        'processId': processList.ASSET_CONTRACT,
        'contactType': this.contractCreateFormGroup.controls.coverageType.value
      },
      height: 'auto',
      width: '900px',
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        //console.log('data ' , data);
        this.commonService.commonGetService('fetchPurchaseTemplateDtlForHdrId.sams', data.tcTemplateHdrId).subscribe(
          data => {
            if (data.success) {
              this.cusFieldHdrList = [];
              this.customFieldsLength = 0;
              console.log("dtl list info ", data.responseData);
              this.cusFieldHdrList = data.responseData;
              this.customFieldsLength = data.responseData.length;
              var len = this.cusFieldHdrList.length;
              for (var k = 0; len > k; k++) {
                if (this.cusFieldHdrList[k].tcParameterInputType == "CHECKBOX") {
                  //this.cusFieldHdrList[k].value1 = this.cusFieldHdrList[k].value == 'TRUE' ? true : false;
                } else if (this.cusFieldHdrList[k].tcParameterInputType == "DATE") {
                  //this.cusFieldHdrList[k].value1 = this.cusFieldHdrList[k].value;
                }
              }
            } else {
              this.commonService.openToastWarningMessage(data.message);
            }
          }, error => {
          }
        );
      });
  }

  viewAssetInfo (element) {
    const dialogRef = this.dialog.open(AssetViewNhComponent, {
      height: 'auto',
      width: '60%',
      data: {
        'assetHdrId': element.assetHdrId
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {    
        
      });
    }

    updateAndApprove(headingDisplay) {
      if(headingDisplay == 'Create'){
        this.saveContract();
      } else{
        let approvalButtonFlag = false;
        if(this.contractCreateFormGroup.controls.approvalId.value == 0){
          approvalButtonFlag = true;
        }else{
          approvalButtonFlag = false;
        }
        
        let dialogRef = this.dialog.open(UpdateApproveConfirmationComponent, {
          height: '30%',
          width: '25%',
          data: {
            'confirmTitle': 'OSPR Update',
            'approvalButtonFlag': approvalButtonFlag
          }
        });
        dialogRef.disableClose = true;
        dialogRef.afterClosed().subscribe(
          data => {
            if(data.status == 'update'){
              this.saveContract();
            } else if(data.status == 'update and approve'){
              this.saveUpdateAndApprove(true);
            } else{
    
            }
            
          });
      }
      
    }

  saveUpdateFlag:boolean=false;
  saveUpdateAndApprove(updateApproveFlag) { 
    this.saveUpdateFlag=true; 

    if(this.saveUpdateFlag){
      
      this.uploadContractFlag = true;
    //This If Condition is only for setting assetlist which comes from asset or contract Screen
    if(this.assetTabViaAsset && !this.isEditMode){ 
     this.assetListFormGroup.controls.contractAmnt.setValue(this.contractCreateFormGroup.controls.contractGrossValue.value);
     this.contractCreateFormGroup.controls.assetList.setValue([this.assetListFormGroup.value]);
     this.contractCreateFormGroup.controls.totalAssetPoAmount.setValue(this.totalAssetPoAmount);
    }
    if(this.assetTabViaContract  && !this.isEditMode){
      this.contractCreateFormGroup.controls.assetList.setValue([]);
      this.contractCreateFormGroup.controls.assetList.setValue(this.convertAssetToContaractAsset());
      this.contractCreateFormGroup.controls.totalAssetPoAmount.setValue(this.totalAssetPoAmount);
    }
    if(this.isEditMode){
      this.contractCreateFormGroup.controls.assetList.setValue(this.convertAssetToContaractAsset());
    }
    this.contractCreateFormGroup.controls.contractTenurePaymentList.setValue(this.tenurePaymentDataSource);

    const contractStartDtDisps = this.commonService.convertToDateStringyyyy_mm_dd(this.contractCreateFormGroup.controls.contractStartDtDisp.value)

    const contractEndDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(this.contractCreateFormGroup.controls.contractEndDtDisp.value)

    const contractPODtDisp = this.commonService.convertToDateStringyyyy_mm_dd(this.contractCreateFormGroup.controls.contractPODtDisp.value)

    this.contractCreateFormGroup.controls.contractStartDtDisp.setValue(contractStartDtDisps)
    this.contractCreateFormGroup.controls.contractEndDtDisp.setValue(contractEndDtDisp)
    this.contractCreateFormGroup.controls.contractPODtDisp.setValue(contractPODtDisp)

    if(this.contractCreateFormGroup.controls.assetList.value.length > 0){
      this.contractCreateFormGroup.controls.contractTempDtlList.setValue(this.cusFieldHdrList);
      this.commonService.showSpinner();
      if(this.contractCreateFormGroup.controls.coverageType.value != 'CONTRACT') {
        this.contractCreateFormGroup.controls.contractBasicValue.setValue(0);
        this.contractCreateFormGroup.controls.contractGrossValue.setValue(0);
      }
      this.commonService.commonInsertService('saveOrUpdateContract.sams',this.contractCreateFormGroup.getRawValue()).subscribe(
      data => {
        if(data.success){
          this.contractApprove(true);
          this.uploadContractFlag = false;
          this.commonService.openToastSuccessMessage(data.message);
          this.commonService.hideSpinner();
          if(this.fileUpload.length >  0){
            this.uploadContractDocFile(data.responseData.contractHdrId);
          }
          else{
            this.navigateToContract();
          }
          if(updateApproveFlag){
            this.contractApprove(true);
          }
        } else {
          this.uploadContractFlag = false;
          this.commonService.openToastErrorMessage(data.message);
          this.commonService.hideSpinner();
        } });
    }else{
      this.uploadContractFlag = false;
      this.commonService.openToastWarningMessage("Kindly Select At least One Asset.");
    }

    }
  }

  contractWorkflowApprovalforUpdate(){

  }

  cancelContract(){

   const contractId = this.contractCreateFormGroup.controls.contractHdrId.value;

    let dialogRef = this.dialog.open(CancelConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        Text: 'the OSPR',
        
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {

          let cancelReason = data.cancelReason;

          let contractIdList = {contractCancelList: [],cancelReason: cancelReason};
          contractIdList.contractCancelList = contractId;
          contractIdList.cancelReason = cancelReason;
          this.commonService.showSpinner();
          this.commonService.commonInsertService('cancelMultipleContract.sams', contractIdList).subscribe(
            data => {
              if (data.success) {          
                this.commonService.openToastSuccessMessage(data.message);
                // this.fetchListofContract();
                this.navigateToContract();
                this.commonService.hideSpinner();
                
              } else {
                this.commonService.hideSpinner();
                this.commonService.openToastErrorMessage(data.message);
               
              }
            }
          );


        }else{
         
        }
      });

    
  }

  changeContractStatus(event){
    if(event== undefined){
      this.contractCreateFormGroup.controls.contractStatusId.setValue(0);
      this.contractCreateFormGroup.controls.contractStatus.setValue('');
    }else {
      this.contractCreateFormGroup.controls.contractStatusId.setValue(event.id);
      this.contractCreateFormGroup.controls.contractStatus.setValue(event.name);
    }
  }


  listOfInsuranceType(searchValue) {
    this.scrollInsuranceTypeSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllInsuranceTypeCombo.sams', searchValue.term, '', '', this.limitCount, this.insuranceTypePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.insuranceTypePageNumber , this.insuranceTypeList , data.responseData.comboList)
        this.insuranceTypePageNumber = this.getData.pageNumber;
        this.insuranceTypeList = this.getData.dataList;
        this.scrollInsuranceTypeSync = false;
        if(this.insuranceTypeList.length == 1) {
          //this.coverageTypeList[0];
          this.contractCreateFormGroup.controls.insuranceType.setValue(this.insuranceTypeList[0].insuranceTypeName);
        }
      }
    );
  }

  setInsuranceType(event) {
    if (event === undefined) {
      this.contractCreateFormGroup.controls.insuranceType.setValue('');
      this.insuranceTypePageNumber = 1;
      this.insuranceTypeList = [];
    } else{
      this.contractCreateFormGroup.controls.insuranceType.setValue(event.insuranceTypeName);
    }
  }

}
