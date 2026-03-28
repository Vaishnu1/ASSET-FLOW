import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { ViewAssetInfoDetailsComponent } from '../view-asset-info-details/view-asset-info-details.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../../Common-components/delete-confirmation/delete-confirmation.component';
import { allWorkflowStatus } from '../../../Constants/AllStatusConstants';
import { ConfirmConfirmationComponent } from '../../Common-components/confirm-confirmation/confirm-confirmation.component';
import { UserSessionService } from '../../../Services/user-session-service/user-session.service';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { getData } from 'src/app/Model/common/fetchListData';
import { allBusinessPartnerRoles } from 'src/app/Constants/AllStatusConstants';
import { PoItemAddComponent } from '../po-item-add/po-item-add.component';
import { CancelConfirmationComponent } from '../../Common-components/cancel-confirmation/cancel-confirmation/cancel-confirmation.component';
import { PurchaseTermsTemplateDtl } from 'src/app/Model/base/purchase-terms-dtl';
import { PoTcTemplateListComponent } from '../../Dialog-Components/po-tc-template-list/po-tc-template-list.component';
import { processList } from 'src/app/Constants/ProcessList';
import { ContractAddAssetComponent } from '../../asset/contract/contract-add-asset/contract-add-asset.component';
// import { AngularEditorConfig } from '@/angular-editor';
import { SupplierContactInfoComponent } from '../supplier-contact-info/supplier-contact-info.component';
import { RejectConfirmationComponent } from '../../Common-components/reject-confirmation/reject-confirmation.component';
import { UpdateApproveConfirmationComponent } from '../../Common-components/update-approve-confirmation/update-approve-confirmation.component';
import { PoPdfPreviewComponent } from '../../Common-components/po-pdf-preview/po-pdf-preview/po-pdf-preview.component';
import { PoTcParameterListComponent } from '../po-tc-parameter-list/po-tc-parameter-list.component';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
@Component({
  selector: 'app-purchase-order-create',
  templateUrl: './purchase-order-create.component.html',
  styleUrls: ['./purchase-order-create.component.css']
})
export class PurchaseOrderCreateComponent implements OnInit {

  poMainForm: FormGroup;
  poDtlList: FormArray;

  scrollSuppliersync: boolean = false;
  supplierPageNumber: number;
  supplierList: any = [];

  scrollApprovedSuppliersync: boolean = false;
  approvedSupplierPageNumber: number;
  supplierLocationList: any = [];

  scrollLocationNamesync: boolean = false;
  locationNamePageNumber: number;
  locationCombo: any = [];

  scrollBillToNamesync: boolean = false;
  billToNamePageNumber: number;
  billToCombo: any = [];

  scrollShipToNamesync: boolean = false;
  shipToNamePageNumber: number;
  shipToCombo: any = [];

  scrollSRNosync: boolean = false;
  srNoCombo: any = [];
  srNoPageNumber: number;

  getData: getData;

  limitCount: any;

  accessoriesList: any = [];
  skipCount: number;

  headingDisplay: string;
  buttonDisplay: string = 'Save';

  //LOADING BUTTON CHANGE WHILE SAVE
  uploadPurchaseOrderFlag: boolean = false;
  CommonhintMsg = new CommonHint();

  public porderId: any;
  public transactionSource: any;

  employeeId: string = '0';
  approvalId: string = '0';
  approvebuttonEnable: boolean = false;
  approve: any;
  viewMode: boolean = false;

  scrollPurchaseTypesync: boolean = false;
  purchaseTypePageNumber: number;
  purchaseTypeCombo: any = [];

  scrollPurchaseUsagesync: boolean = false;
  purchaseUsagePageNumber: number;
  purchaseUsageCombo: any = [];

  scrollContractTypesync: boolean = false;
  contractTypePageNumber: number;
  contractTypeCombo: any = [];

  poCancelList: any = [];

  enableUpdate: boolean = false;
  recordUpdated: String = 'NO';

  disableUpdateBtn: boolean = false;
  closeAfterApproval: boolean = false;
  cusFieldHdrList: PurchaseTermsTemplateDtl[];

  cusFieldHdrList1: PurchaseTermsTemplateDtl[] = [];
  parameter;

  poTermsAndConditionForm: FormGroup;
  creditPayment: boolean = false;
  paymentTermsAdvance: boolean = false;
  advancePaymentCoverage: boolean = false;
  longTermCreditPayment: boolean = false;
  shortTermCreditPayment: boolean = false;

  paymentTerms = [
    { id: 1, name: 'ADVANCE' },
    { id: 2, name: 'CREDIT' }
  ]

  creditPaymentTypes = [
    { id: 1, name: 'SHORT TERM CREDIT' },
    { id: 2, name: 'LONG TERM CREDIT' }
  ]

  currentDate: Date;

  // editorConfig!: AngularEditorConfig;
  approvalData: any;
  constructor(private readonly locationRef: Location,
    private readonly router: Router,
    private readonly assetOptimaServices: AssetOptimaServices,
    private readonly activatedRoute: ActivatedRoute,
    private readonly commonService: CommonService,
    private readonly formBuilder: FormBuilder,
    private readonly userSession: UserSessionService,
    private readonly dialog: MatDialog,
    private cdr: ChangeDetectorRef, private assetOptimaConstants: AssetOptimaConstants) {
    this.approvedSupplierPageNumber = 1;
    this.supplierPageNumber = 1;
    this.skipCount = 1;
    this.locationNamePageNumber = 1;
    this.purchaseTypePageNumber = 1;
    this.purchaseUsagePageNumber = 1;
    this.srNoPageNumber = 1;
    this.billToNamePageNumber = 1;
    this.shipToNamePageNumber = 1
    this.contractTypePageNumber = 1;
    this.approve = 'APPROVED'
  }

  ngOnInit() {


    this.poMainForm = new FormGroup({
      poId: new FormControl(''),
      poNO: new FormControl(''),
      poDt: new FormControl(''),
      poDtDisp: new FormControl('', Validators.required),
      poReqDt: new FormControl(''),
      poReqDtDisp: new FormControl(''),
      poStatus: new FormControl(''),
      poStatusId: new FormControl(''),
      poType: new FormControl('', Validators.required),
      poUsage: new FormControl(''),
      completionFlg: new FormControl(''),
      compFlgDisp: new FormControl(''),
      businessPartnerId: new FormControl(''),
      businessPartnerName: new FormControl('', Validators.required),
      businessPartnerSiteId: new FormControl(''),
      businessPartnerSiteName: new FormControl('', Validators.required),
      poRevNo: new FormControl(''),
      cancelReason: new FormControl(''),
      rejectReason: new FormControl(''),

      totalPOQty: new FormControl('0'),
      totalBasicAmt: new FormControl('0'),
      netTaxAmt: new FormControl('0'),
      grandTotal: new FormControl('0'),
      curCd: new FormControl(''),
      exchRate: new FormControl('1'),
      localTotalAmt: new FormControl('0'),

      billInfoId: new FormControl(''), // match location id
      billInfoName: new FormControl(''),
      billAddress1: new FormControl(''),
      billCity: new FormControl(''),
      billState: new FormControl(''),
      billCountry: new FormControl(''),
      billZipCode: new FormControl('', [Validators.maxLength(10)]),
      billToContactPerson: new FormControl(''),
      billToContactPersonNo: new FormControl(''),

      shipInfoId: new FormControl(''), // match location id
      shipInfoName: new FormControl(''),
      shipAddress1: new FormControl(''),
      shipCity: new FormControl(''),
      shipState: new FormControl(''),
      shipCountry: new FormControl(''),
      shipZipCode: new FormControl('', [Validators.maxLength(10)]),
      shipToContactPerson: new FormControl(''),
      shipToContactPersonNo: new FormControl(''),

      remarks: new FormControl(''),
      contactPerson: new FormControl(''),
      shipTermsCd: new FormControl(''),
      shipModeCd: new FormControl(''),
      payTermsCd: new FormControl(''),
      payTermsDays: new FormControl(''),
      transporterName: new FormControl(''),
      transporterAddress: new FormControl(''),
      localCurCd: new FormControl(''),
      localBasicAmt: new FormControl(''),
      customerId: new FormControl(''),
      customerName: new FormControl(''),
      freightCharges: new FormControl(''),
      handlingCharges: new FormControl(''),
      otherCharges: new FormControl(''),
      locFreightCharges: new FormControl(''),
      locHandlingCharges: new FormControl(''),
      locOtherCharges: new FormControl(''),
      localGrandTotal: new FormControl(''),
      srNo: new FormControl(''),
      poDtlList: this.formBuilder.array([]),

      //default for all screeens
      orgId: new FormControl(''),
      locationId: new FormControl(''),
      locationName: new FormControl(''),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      pageNumber: new FormControl(''),
      recordsPerPage: new FormControl(''),
      termsCondition: new FormControl('', [Validators.maxLength(5000)]),
      recordUpdated: new FormControl('NO'),
      poTcInfoList: new FormControl([]),
      poTempDtlList: new FormControl([]),
      contractStartDt: new FormControl(''),
      contractEndDt: new FormControl(''),
      contractStartDtDisp: new FormControl(''),
      contractEndDtDisp: new FormControl(''),
      noOfContractDays: new FormControl('0'),
      contractType: new FormControl(''),

      partnerSiteAddress: new FormControl(''),
      contactPersonName: new FormControl(''),
      partnerSitePersonPhoneNo: new FormControl(''),
      partnerSiteContactEmailId: new FormControl(''),

      approvalId: new FormControl(0),
      poWithoutPrice: new FormControl(false),
      poWithoutSupplier: new FormControl(false),
    });
    this.poTermsAndConditionForm = new FormGroup({
      poTermsAndConditionsId: new FormControl(0),
      poHdrId: new FormControl(this.poMainForm.controls.poId.value),
      paymentTerms: new FormControl('', [Validators.required]),
      advancePaymentPercentage: new FormControl(0, [Validators.pattern(this.assetOptimaConstants.numericValidation)]),
      advancePaymentCoverage: new FormControl(''),
      creditPaymentType: new FormControl(''),
      expectedArrivalDate: new FormControl(''),
      longTermCreditDays: new FormControl(0, [Validators.pattern(this.assetOptimaConstants.numericValidation)]),
      shortTermCreditDays: new FormControl(0, [Validators.pattern(this.assetOptimaConstants.numericValidation)]),
      warrantyTerms: new FormControl('', [Validators.required]),
      freightChargeIncluded: new FormControl(false),
      frightChargesCoverage: new FormControl(''),
      insuranceCovered: new FormControl(false),
      insuranceCoverageTerms: new FormControl(''),
      taxIncluded: new FormControl(false),
      taxCoverageTerms: new FormControl(''),
      specialTermsAvailable: new FormControl(false),
      specialTerms: new FormControl(''),
      paymentTermsAndConditionsString: new FormControl(''),
      freightChargesString: new FormControl(''),
      insuranceCoveredString: new FormControl(''),
      taxIncludedString: new FormControl(''),
      specialTermsString: new FormControl(''),
      active: new FormControl(true),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      quoteReferenceNo: new FormControl('', [Validators.required]),
      // taxAmt: new FormControl(),
      // taxRate: new FormControl(),
      // taxCd: new FormControl(''),
      // taxId: new FormControl(0),


    });

    this.locationNamePageNumber = 1;
    this.approvedSupplierPageNumber = 1;
    this.supplierPageNumber = 1;
    this.purchaseTypePageNumber = 1;
    this.purchaseUsagePageNumber = 1;
    this.srNoPageNumber = 1;
    this.billToNamePageNumber = 1;
    this.shipToNamePageNumber = 1
    this.contractTypePageNumber = 1;

    this.poMainForm.controls.locationName.setValue(this.userSession.getUserLocationName());
    this.poMainForm.controls.locationId.setValue(this.userSession.getUserLocationId());

    this.poMainForm.controls.poType.setValue('SERVICE/MATERIAL');


    this.validateEditMode();
    this.poMainForm.controls.poNO.disable();
    //this.poMainForm.controls.poDtDisp.disable();
    // this.poMainForm.controls.poStatus.disable();
    this.poMainForm.controls.compFlgDisp.disable();
    this.poMainForm.controls.poRevNo.disable();
    this.poMainForm.controls.totalPOQty.disable();
    this.poMainForm.controls.totalBasicAmt.disable();
    this.poMainForm.controls.netTaxAmt.disable();
    this.poMainForm.controls.grandTotal.disable();
    this.poMainForm.controls.createdBy.disable();
    this.poMainForm.controls.curCd.disable();
    this.poMainForm.controls.localGrandTotal.disable();
    this.poMainForm.controls.noOfContractDays.disable();
    this.setEditorConfig();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isChanged();
    }, 500);
  }


  backTOScreen() {
    this.locationRef.back();
  }

  validateEditMode() {
    this.activatedRoute.params.subscribe(
      params => {
        let primaryId = params.pId;
        var mode = params.mode;
        primaryId = Number(primaryId);

        if (primaryId <= 0) {
          this.porderId = Number(0);

          this.poMainForm.controls['poStatus'].setValue('BOOKED');
          this.poMainForm.controls['poDtDisp'].setValue(new Date());
          this.poMainForm.controls['createdBy'].setValue(this.userSession.getUserName());
          this.poMainForm.controls['compFlgDisp'].setValue('INCOMPLETE');
          this.poMainForm.controls.poType.setValue('SERVICE/MATERIAL');

          this.headingDisplay = "Create";
          this.buttonDisplay = "Submit";

          this.loadLocationDetailInfoShipBillTo(this.poMainForm.controls.locationId.value, '');
        } else {
          this.porderId = Number(primaryId);

          this.transactionSource = allWorkflowStatus[allWorkflowStatus.PO];
          if (mode === 'view') {
            this.viewMode = true;
            this.headingDisplay = "View";
            this.buttonDisplay = "Update";
            this.poMainForm.disable();
          } else {
            this.viewMode = false;
            this.headingDisplay = "Edit";
            this.buttonDisplay = "Update";
            this.poMainForm.controls.locationName.disable();
          }

          this.commonService.showSpinner();
          this.commonService.commonGetService('fetchPurchaseOrderInfo.sams', primaryId).subscribe(
            data => {
              this.poMainForm.patchValue(data.responseData);
              this.poMainForm.controls.poType.disable();
              if (this.poMainForm.controls.poType.value == 'MATERIAL') {
                this.transactionSource = allWorkflowStatus[allWorkflowStatus.PO];
              } else if (this.poMainForm.controls.poType.value == 'CONTRACT') {
                this.transactionSource = allWorkflowStatus[allWorkflowStatus.PO_CONTRACT];
              }
              console.log("data.responseData.poTempDtlList", data.responseData);
              console.log("TEST!", this.poMainForm.controls);
              console.log('approval Id ', this.poMainForm.controls.approvalId.value)

              // PO Terms and Conditions
              this.poTermsAndConditionForm.patchValue(data.responseData.poTermsAndConditions);
              // this.showTandCbasedonPaymentTerms();


              this.poMainForm.controls.approvalId = this.approvalData || data.responseData.approvalId || 0;

              console.log('approval id', this.poMainForm.controls.approvalId.value);
              if (data.responseData.poTempDtlList[0]?.tcTemplateHdrId > 0) {
                this.cusFieldHdrList = data.responseData.poTempDtlList;
              } else {
                this.cusFieldHdrList1 = data.responseData.poTempDtlList;
              }
              this.cusFieldHdrList = data.responseData.poTempDtlList;
              this.itemListinEditMode(data.responseData.poDtlList);
              this.commonService.hideSpinner();
              this.getWorkflowApprovalForPO();
            });
        }
      }
    );
  }

  itemListinEditMode(event) {
    this.poDtlList = this.poMainForm.get('poDtlList') as FormArray;
    event.map(obj => {
      const Group = this.formBuilder.group({
        poDtlId: new FormControl(obj.poDtlId),
        poId: new FormControl(obj.poId),
        poNo: new FormControl(obj.poNo),
        poType: new FormControl(obj.poType),
        poLineNo: new FormControl(obj.poLineNo),
        itemId: new FormControl(obj.itemId),
        itemName: new FormControl(obj.itemName),
        itemDesc: new FormControl(obj.itemDesc),
        itemTypeId: new FormControl(obj.itemTypeId),
        itemTypeName: new FormControl(obj.itemTypeName),
        manufacturerPartNo: new FormControl(obj.manufacturerPartNo),
        suppItemCd: new FormControl(obj.suppItemCd),
        uomCd: new FormControl(obj.uomCd),
        poQty: new FormControl(obj.poQty),
        cancelQty: new FormControl(obj.cancelQty),
        cancelReason: new FormControl(obj.cancelReason),
        receivedQty: new FormControl(obj.receivedQty),
        invoicedQty: new FormControl(obj.invoicedQty),
        rtvQty: new FormControl(obj.rtvQty),
        unitPrice: new FormControl(obj.unitPrice),
        locUnitPrice: new FormControl(obj.locUnitPrice),
        poBasicAmt: new FormControl(obj.poBasicAmt),
        locPoBasicAmt: new FormControl(obj.locPoBasicAmt),
        inspectionRequired: new FormControl(obj.inspectionRequired),
        lastReceivedDt: new FormControl(obj.lastReceivedDt),
        custPoNo: new FormControl(obj.custPoNo),
        remarks: new FormControl(obj.remarks),
        holdFlg: new FormControl(obj.holdFlg),
        poBalanceQty: new FormControl(obj.poBalanceQty),
        poReqDt: new FormControl(obj.poReqDt),
        taxCd1: new FormControl(obj.taxCd1),
        taxRate1: new FormControl(obj.taxRate1),
        taxAmt1: new FormControl(obj.taxAmt1),
        taxCd2: new FormControl(obj.taxCd2),
        taxRate2: new FormControl(obj.taxRate2),
        taxAmt2: new FormControl(obj.taxAmt2),
        taxCd3: new FormControl(obj.taxCd3),
        taxRate3: new FormControl(obj.taxRate3),
        taxAmt3: new FormControl(obj.taxAmt3),
        itemTotalTaxAmt: new FormControl(obj.itemTotalTaxAmt),
        prReqNo: new FormControl(obj.prReqNo),
        srNo: new FormControl(obj.srNo),
        netAmt: new FormControl(obj.netAmt),
        shipType: new FormControl(obj.shipType),
        expDeliveryDt: new FormControl(obj.expDeliveryDt),
        expDeliveryDtDisp: new FormControl(obj.expDeliveryDtDisp),

        prDtlId: new FormControl(obj.prDtlId),
        invoiceRdvcDt: new FormControl(obj.invoiceRdvcDt),
        invoiceClear: new FormControl(obj.invoiceClear),
        pendingInvAmt: new FormControl(obj.pendingInvAmt),
        rejectQty: new FormControl(obj.rejectQty),
        prHdrId: new FormControl(obj.prHdrId),
        deliveryCfmDt: new FormControl(obj.deliveryCfmDt),
        srId: new FormControl(obj.srId),
        assetCode: new FormControl(obj.assetCode),
        assetHdrId: new FormControl(obj.assetHdrId),
        modelName: new FormControl(obj.modelName),
        assetGroupName: new FormControl(obj.assetGroupName),
        serialNo: new FormControl(obj.serialNo),
        manufacturerName: new FormControl(obj.manufacturerName),
        poReqDtDisp: new FormControl(obj.poReqDtDisp)
      });
      this.poDtlList.push(Group);
    });

    if (this.poMainForm.controls.poStatus.value === 'BOOKED') {
      this.poMainForm.controls.poStatusId.setValue(2);
      this.poMainForm.controls.poStatus.setValue('BOOKED');
    }
  }

  //INFO 
  dialogRef;
  infoForAssetDtl(assetHdrId) {
    if (assetHdrId > 0) {
      this.dialogRef = this.dialog.open(ViewAssetInfoDetailsComponent, {
        // height: '65%',
        // width: '60%',
        data: {
          'assetHdrId': assetHdrId
        }
      });
      this.dialogRef.disableClose = true;
      this.dialogRef.afterClosed().subscribe(
        data => {

        });
    }
  }

  //DELETE AN INDIVIDUAL ITEM
  deleteLineLevelPR(poId, index) {
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'the PR'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          // this.poDtlList = this.poMainForm.get('poDtlList') as FormArray;
          // var poDtlId: number = this.poMainForm.controls.poDtlList['controls'][index]['controls'].poDtlId.value;
          // this.commonService.commonGetService('deletePRinPO.sams', poDtlId, poId).subscribe(
          //   data => {
          //     if (data.success) {
          //       this.commonService.openToastSuccessMessage(data.message);
          //       this.poDtlList.removeAt(index);
          //       this.calculateTotals();
          //     } else {
          //       this.commonService.openToastErrorMessage(data.message);
          //     }
          //   }
          // );
        }
      });

  }

  listOfSupplier(searchValue) {
    this.scrollSuppliersync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.SUPPLIER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchValue.term, '', '', this.limitCount, this.supplierPageNumber, '', partnerRoles).subscribe(
      (data) => {
        if (data.success) {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.supplierPageNumber === 1) {
              this.supplierList = data.responseData.comboList;
            } else {
              this.supplierList = this.supplierList.concat(data.responseData.comboList);
            }
          } else {
            this.supplierList = data.responseData.comboList;
          }
          this.supplierList.length != 0 ? this.supplierPageNumber += 1 : this.supplierPageNumber = 1;
        }
      }
    );
    this.scrollSuppliersync = false;
  }

  fetchIdOfSupplier(event) {
    if (event === undefined) {
      this.poMainForm.controls.businessPartnerId.setValue(0);
      this.poMainForm.controls.businessPartnerName.setValue('');
      this.poMainForm.controls.businessPartnerSiteId.setValue(0);
      this.poMainForm.controls.businessPartnerSiteName.setValue('');
      this.poMainForm.controls.partnerSiteAddress.setValue('');
      this.poMainForm.controls.contactPersonName.setValue('');
      this.poMainForm.controls.partnerSitePersonPhoneNo.setValue('');
      this.poMainForm.controls.partnerSiteContactEmailId.setValue('');

      this.supplierLocationList = [];
      this.approvedSupplierPageNumber = 1;
    } else {
      this.poMainForm.controls.businessPartnerId.setValue(event.businessPartnerId);
      this.poMainForm.controls.businessPartnerName.setValue(event.businessPartnerName);
      this.poMainForm.controls.businessPartnerSiteId.setValue(0);
      this.poMainForm.controls.businessPartnerSiteName.setValue('');
      this.poMainForm.controls.partnerSiteAddress.setValue('');
      this.poMainForm.controls.contactPersonName.setValue('');
      this.poMainForm.controls.partnerSitePersonPhoneNo.setValue('');
      this.poMainForm.controls.partnerSiteContactEmailId.setValue('');

      this.supplierLocationList = [];
      this.approvedSupplierPageNumber = 1;
      this.isChanged();
    }
  }

  listOfSupplierApproved(searchValue) {
    this.scrollApprovedSuppliersync = true;
    this.limitCount = (searchValue.term === '' || searchValue.term === undefined || searchValue.term === null) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerSiteCombo, searchValue.term, this.poMainForm.controls.businessPartnerId.value, '', this.limitCount, this.approvedSupplierPageNumber, '').subscribe(
      (data) => {
        if (data.success) {
          if (searchValue.term === '' || searchValue.term === undefined || searchValue.term === null) {
            if (this.approvedSupplierPageNumber === 1) {
              this.supplierLocationList = data.responseData.comboList;
            } else {
              this.supplierLocationList = this.supplierLocationList.concat(data.responseData.comboList);
            }
          } else {
            this.supplierLocationList = data.responseData.comboList;
          }
          this.supplierLocationList.length != 0 ? this.approvedSupplierPageNumber += 1 : this.approvedSupplierPageNumber = 1;
        }
      }
    );
    this.scrollApprovedSuppliersync = false;
  }

  setSupplierSiteNameComboValue(event) {
    if (event === undefined) {
      this.poMainForm.get('businessPartnerSiteId').setValue(0);
      this.supplierLocationList = [];
      this.approvedSupplierPageNumber = 1;
    } else {
      this.poMainForm.get('businessPartnerSiteId').setValue(event.partnerSiteId);
      this.poMainForm.get('businessPartnerSiteName').setValue(event.partnerSiteName);
      this.poMainForm.controls.partnerSiteAddress.setValue(event.partnerSiteAddress1 + "," + event.partnerSiteAddress2 + " , " + event.partnerSiteArea
        + "," + event.partnerSiteCity + "," + event.partnerSiteState + "," + event.partnerSiteCountry
        + "," + event.partnerSitePinCode);
      this.poMainForm.controls.contactPersonName.setValue(event.contactPersonName);
      this.poMainForm.controls.partnerSitePersonPhoneNo.setValue(event.partnerSitePersonPhoneNo);
      this.poMainForm.controls.partnerSiteContactEmailId.setValue(event.partnerSiteEmailId);
      this.poMainForm.controls.curCd.setValue(event.partnerSiteCurCd);
      this.isChanged();
    }
  }



  //LINE LEVEL CALCULATION 
  calculationForLineItem(index) {
    var unitPrice = this.poMainForm.controls.poDtlList['controls'][index]['controls'].unitPrice.value;
    var poReqQty = this.poMainForm.controls.poDtlList['controls'][index]['controls'].poQty.value;
    var taxRate1 = this.poMainForm.controls.poDtlList['controls'][index]['controls'].taxRate1.value;
    var taxRate2 = this.poMainForm.controls.poDtlList['controls'][index]['controls'].taxRate2.value;
    var taxRate3 = this.poMainForm.controls.poDtlList['controls'][index]['controls'].taxRate3.value;

    var poBasicAmt = (unitPrice * poReqQty);
    this.poMainForm.controls.poDtlList['controls'][index]['controls'].poBasicAmt.setValue(poBasicAmt);
    var taxAmt1 = (poBasicAmt * taxRate1) / 100;
    var taxAmt2 = (poBasicAmt * taxRate2) / 100;
    var taxAmt3 = (poBasicAmt * taxRate3) / 100;

    this.poMainForm.controls.poDtlList['controls'][index]['controls'].taxAmt1.setValue(taxAmt1.toFixed(2));
    this.poMainForm.controls.poDtlList['controls'][index]['controls'].taxAmt2.setValue(taxAmt2.toFixed(2));
    this.poMainForm.controls.poDtlList['controls'][index]['controls'].taxAmt3.setValue(taxAmt3.toFixed(2));

    var itemTotalTaxAmt = Number(taxAmt1) + Number(taxAmt2) + Number(taxAmt3);
    this.poMainForm.controls.poDtlList['controls'][index]['controls'].itemTotalTaxAmt.setValue(itemTotalTaxAmt.toFixed(2));

    var totalAmtC = (poBasicAmt + taxAmt1 + taxAmt2 + taxAmt3);
    this.poMainForm.controls.poDtlList['controls'][index]['controls'].netAmt.setValue(totalAmtC.toFixed(2));
    this.calculateTotals();
  }

  //TOTAL AMOUNT CALCULATION
  calculateTotals() {
    let obj = {
      'poDtlList': this.poMainForm.controls.poDtlList.value
    }
    this.commonService.commonInsertService('calculatePOTotals.sams', obj).subscribe(
      data => {
        if (data.success) {
          this.poMainForm.controls.totalBasicAmt.setValue(data.responseData.totalBasicAmt);
          this.poMainForm.controls.netTaxAmt.setValue(data.responseData.totalTaxAmt);
          this.poMainForm.controls.grandTotal.setValue(data.responseData.totalGrandAmt);
          this.poMainForm.controls.totalPOQty.setValue(data.responseData.totalQty);

          var exchangeRt = this.poMainForm.controls.exchRate.value;
          var grandTotalTmp = this.poMainForm.controls.grandTotal.value;
          var localTotalAmtTemp = Number(exchangeRt) * Number(grandTotalTmp);
          this.poMainForm.controls.localGrandTotal.setValue(localTotalAmtTemp);

          this.isChanged();
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }
    );
  }
  saveFlag: boolean = false;
  save() {
    this.saveFlag = true;
    if (this.poMainForm.controls.poDtlList.value.length <= 0) {
      this.saveFlag = false;
      this.commonService.openToastWarningMessage("Atlease add One Item for PO!");
    }
    this.cusFieldHdrList.push(...this.cusFieldHdrList1);


    console.log("this.cusFieldHdrList", this.cusFieldHdrList);


    if (this.saveFlag) {

      this.uploadPurchaseOrderFlag = true;
      this.commonService.showSpinner();
      this.poMainForm.controls.poTempDtlList.setValue(this.cusFieldHdrList);
      this.poTermsAndConditionForm.controls.poHdrId.setValue(this.poMainForm.controls.poId.value);

     
      const poHdrTOData = {};
      Object.keys(this.poMainForm.controls).forEach(key => {
        poHdrTOData[key] = this.poMainForm.controls[key].value;
      });
      console.log("poMainForm", poHdrTOData);

      let obj = {
        'poHdrTO': poHdrTOData,
        'poTermsAndConditions': this.poTermsAndConditionForm.value
      }

      //to delete the child parameter of X NOS
      // this.deleteChildParameter();

      setTimeout(() => {


        this.commonService.commonInsertService('saveOrUpdatePurchaseOrder.sams', obj).subscribe(
          data => {
            if (data.success) {
              this.poMainForm.controls.poId.setValue(data.responseData.poId);
              this.poMainForm.controls.poRevNo.setValue(data.responseData.poRevNo);
              console.log(this.poMainForm.controls.poId.value)
              this.commonService.hideSpinner();
              this.commonService.openToastSuccessMessage(data.message);
              this.uploadPurchaseOrderFlag = false;
              if (this.headingDisplay != 'Create') {
                this.generatePOPdfReport(data.responseData.poId);
                this.closePO();
              }
              if (this.headingDisplay == 'Create') {
                this.closePO();
              }
              if (this.closeAfterApproval) {
                this.closePO();
              }

              // this.closePO(); 
            } else {
              this.commonService.hideSpinner();
              this.commonService.openToastErrorMessage(data.message);
              this.uploadPurchaseOrderFlag = false;
            }
          }
        );

      }, 1000)

    }
  }

  generatePOPdfReport(poId) {
    this.commonService.commonGetService('generatePurchaseOrderPdf.sams', poId).subscribe(
      data => {
        if (data.success) {
          this.downloadDocument(data.responseData, 'application/pdf');
        } else {
        }
      }, error => {
      }
    );

  }

  poPdfRef;
  downloadDocument(filePath: string, contentType) {
    let pdfSrcFile = this.commonService.downloadFileFromServerToView(filePath, contentType);
    this.poPdfRef = this.dialog.open(PoPdfPreviewComponent, {
      data: {
        "filePath": pdfSrcFile,
        "contentType": contentType
      }
    });

    this.poPdfRef.disableClose = true;
    this.poPdfRef.afterClosed().subscribe(
      data => {

      });
  }

  exit() {
    this.locationRef.back();
  }

  isChanged() {
    this.enableUpdate = true;
    this.recordUpdated = 'YES';
    this.poMainForm.controls.recordUpdated.setValue('YES');
  }

  closePO() {
    this.router.navigate(['/home/purchase/purchaseOrderList']);
  }

  getWorkflowApprovalForPO() {
    this.commonService.commonGetService('getWorkflowForId.sams', this.poMainForm.controls.poId.value,
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

  validateAndApprovePO() {
    if (this.cusFieldHdrList.length == 0 && this.poMainForm.controls.termsCondition.value == "") {

      const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
        height: 'auto',
        width: '400px',
        data: {
          confirmHeading: 'Confirmation',
          confirmMsg: `Are you sure to approve without terms and condition?`
        }
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(data => {
        if (data.status === true) {
          this.poApprove();
        } else {

        }
      });

    } else {
      this.poApprove();
    }
  }

  poApprove() {

    let poUnitPriceFlag = false;
    if (this.poMainForm.controls.approvalId.value > 0) {
      if (this.poMainForm.controls.poWithoutPrice.value && this.poMainForm.controls.poWithoutSupplier.value) {
        if (this.poMainForm.controls.businessPartnerName.value == '') {
          this.commonService.openToastWarningMessage("Unit price/Supplier information is missing. Kindly input the mandatory fields.");
          poUnitPriceFlag = true;
        } else if (this.poMainForm.controls.poWithoutPrice.value) {

          for (let i = 0; i < this.poDtlList.value.length; i++) {
            if (this.poDtlList.value[i].unitPrice <= 0) {
              this.commonService.openToastWarningMessage("Unit price/Supplier information is missing. Kindly input the mandatory fields.");
              poUnitPriceFlag = true;
              break;
            }
          }

        }
        if (!poUnitPriceFlag) {
          this.poWorkflowApproval(true);
        }

      } else if (this.poMainForm.controls.poWithoutSupplier.value && this.poMainForm.controls.businessPartnerName.value == '') {
        this.commonService.openToastWarningMessage("Unit price/Supplier information is missing. Kindly input the mandatory fields.");
      } else if (this.poMainForm.controls.poWithoutPrice.value) {
        for (let i = 0; i < this.poDtlList.value.length; i++) {
          if (this.poDtlList.value[i].unitPrice <= 0) {
            this.commonService.openToastWarningMessage("Unit price/Supplier information is missing. Kindly input the mandatory fields.");
            poUnitPriceFlag = true;
            break;
          }
        }
        if (!poUnitPriceFlag) {
          this.poWorkflowApproval(true);
        }
      } else {
        this.poWorkflowApproval(true);

      }
    } else {
      this.poWorkflowApproval(true);
    }
  }

  poWorkflowApproval(status) {
    let result;
    let selectedPoList = [];
    this.poMainForm.controls.poType.enable();
    // let approvalId = this.poMainForm.controls.poStatus.value == 'REJECTED' ? 0 : this.poMainForm.controls.approvalId.value;
  
    selectedPoList.push({
      ...this.poMainForm.value,
      approvalId: this.poMainForm?.controls['approvalId'],
    });
    this.poMainForm.controls.poType.disable();

    if (status) {
      if (this.transactionSource === allWorkflowStatus[allWorkflowStatus.PO]) {
        result = this.commonService.commonWorkflowService(allWorkflowStatus[allWorkflowStatus.PO], selectedPoList, "Purchase Order");
      } else if (this.transactionSource === allWorkflowStatus[allWorkflowStatus.PO_CONTRACT]) {
        result = this.commonService.commonWorkflowService(allWorkflowStatus[allWorkflowStatus.PO_CONTRACT], selectedPoList, "Purchase Order");
      }

    }
    else {
      if (this.transactionSource === allWorkflowStatus[allWorkflowStatus.PO]) {
        // result = this.commonService.rejectApprove(allWorkflowStatus[allWorkflowStatus.PO], selectedPoList,"Purchase Order");
        this.poWorkflowReject(selectedPoList);
      } else if (this.transactionSource === allWorkflowStatus[allWorkflowStatus.PO_CONTRACT]) {
        // result = this.commonService.rejectApprove(allWorkflowStatus[allWorkflowStatus.PO_CONTRACT], selectedPoList,"Purchase Order");
        this.poWorkflowReject(selectedPoList);
      }
    }

    result.then(data => {
      if (data) {
        this.closePO();
      }
    })
  }

  poWorkflowReject(selectedPoList) {

    let selectedPOItems = 0;
    if (this.poMainForm.controls.approvalId.value == 0) {
      selectedPOItems = 0;
    } else {
      selectedPOItems = 1;
    }


    let selectdList = selectedPoList;
    const dialogRef = this.dialog.open(RejectConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        confirmHeading: 'Confirmation',
        confirmMsg: 'Are you sure to Reject the Purchase Order ?',
        note: 'Note : Only PO under your queue will be Rejected',
        selectedElementListLength: selectedPOItems
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status === true) {
          let rejectReason = data.reason

          let poIdList = { selectedPoList: [], status: 'REJECTED', selectedApprovalList: [], selectedPoType: "", rejectReason: rejectReason };
          for (let i = 0; i <= selectdList.length - 1; i++) {
            poIdList.selectedPoList.push(selectdList[i].poId);
            poIdList.selectedPoType = selectdList[i].poType;
            poIdList.selectedApprovalList.push(selectdList[i].approvalId);
          }
          this.commonService.showSpinner();
          this.commonService.commonInsertService('approveRejectPO.sams', poIdList).subscribe(
            data => {
              if (data.success) {
                this.commonService.hideSpinner();
                this.commonService.openToastSuccessMessage(data.message);
                this.closePO();
              } else {
                this.commonService.hideSpinner();
                this.commonService.openToastWarningMessage(data.message);
              }
            }, error => {

            }
          );

        } else {

        }
      });
  }

  listofLocationName(searchValue) {
    this.scrollLocationNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllUserLocForCombo, searchValue.term, '', '', this.limitCount, this.locationNamePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.locationNamePageNumber, this.locationCombo, data.responseData.comboList)
        this.locationNamePageNumber = this.getData.pageNumber;
        this.locationCombo = this.getData.dataList;
        this.scrollLocationNamesync = false;
      }
    );
  }

  setLocationNameComboValue(event) {
    if (event === undefined) {
      this.poMainForm.controls['locationId'].setValue(0);
      this.locationNamePageNumber = 1;
    } else {
      this.poMainForm.controls['locationId'].setValue(event.locationId);
    }
  }

  listofPurchaseType(searchValue) {
    this.scrollPurchaseTypesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfPurchasingTypeCombo, searchValue.term, '', '', this.limitCount, this.purchaseTypePageNumber, 'PO').subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.purchaseTypePageNumber, this.purchaseTypeCombo, data.responseData.comboList)
        this.purchaseTypePageNumber = this.getData.pageNumber;
        this.purchaseTypeCombo = this.getData.dataList;
        this.scrollPurchaseTypesync = false;
      }
    );
  }

  listofPurchaseUsage(searchValue) {
    this.scrollPurchaseUsagesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfPurchasingUsageCombo, searchValue.term, '', '', this.limitCount, this.purchaseUsagePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.purchaseUsagePageNumber, this.purchaseUsageCombo, data.responseData.comboList)
        this.purchaseUsagePageNumber = this.getData.pageNumber;
        this.purchaseUsageCombo = this.getData.dataList;
        this.scrollPurchaseUsagesync = false;
      }
    );
  }

  setPurchaseType(event) {
    if (event === undefined) {
      this.poMainForm.controls['poType'].setValue('');
      this.purchaseTypePageNumber = 1;
    } else {
      this.poMainForm.controls['poType'].setValue(event.purchasingTypeName);
    }
  }

  setPurchaseUsage(event) {
    if (event === undefined) {
      this.poMainForm.controls['poUsage'].setValue('');
      this.purchaseUsagePageNumber = 1;
    } else {
      this.poMainForm.controls['poUsage'].setValue(event.purchasingUsageName);
    }
  }



  loadServiceRequestNumbers(searchValue) {
    this.scrollSRNosync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllSRNoForCombo, searchValue.term, '',
      this.poMainForm.controls.locationId.value > 0 ? this.poMainForm.controls.locationId.value : 0, this.limitCount, this.srNoPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.srNoPageNumber, this.srNoCombo, data.responseData.comboList)
          this.srNoPageNumber = this.getData.pageNumber;
          this.srNoCombo = this.getData.dataList;
          this.scrollSRNosync = false;
        }
      );
  }

  selectedSRNo(event) {
    if (event === undefined) {
      this.poMainForm.controls.srNo.setValue('');
      this.srNoPageNumber = 1;
    } else {
      this.poMainForm.controls.srNo.setValue(event.srNo);
    }
  }


  addPOItem(index, mode, poDtlInfo) {
    console.log("poDtlInfo", poDtlInfo);
    let dialogRef = this.dialog.open(PoItemAddComponent, {
      width: '70%',
      data: {
        'poType': poDtlInfo,
        'poHdrInfo': this.poMainForm.getRawValue(),
        'mode': mode,
        'poDtlList': this.poMainForm.get('poDtlList')

      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          if (index === null) {
            //this.poDtlList = this.poDtlList.concat([data]);
            this.pushPoDtlItemTOList(data);
          } else if (index !== null && index !== undefined && index !== '') {
            this.poDtlList.removeAt(index);
            this.pushPoDtlItemTOList(data);
            // this.poDtlList.splice(index, 1);
            // this.poDtlList = this.poDtlList.concat([data]);
          }
        }
      });
  }

  pushPoDtlItemTOList(obj) {
    this.poDtlList = this.poMainForm.get('poDtlList') as FormArray;
    const group = this.formBuilder.group({
      poDtlId: new FormControl(obj.poDtlId),
      poId: new FormControl(obj.poId),
      poNo: new FormControl(obj.poNo),
      poType: new FormControl(obj.poType),
      poLineNo: new FormControl(obj.poLineNo),
      itemId: new FormControl(obj.itemId),
      itemName: new FormControl(obj.itemName),
      itemDesc: new FormControl(obj.itemDesc),
      itemTypeId: new FormControl(obj.itemTypeId),
      itemTypeName: new FormControl(obj.itemTypeName),
      manufacturerPartNo: new FormControl(obj.manufacturerPartNo),
      suppItemCd: new FormControl(obj.suppItemCd),
      uomCd: new FormControl(obj.uomCd),
      poQty: new FormControl(obj.poQty),
      cancelQty: new FormControl(obj.cancelQty),
      cancelReason: new FormControl(obj.cancelReason),
      receivedQty: new FormControl(obj.receivedQty),
      invoicedQty: new FormControl(obj.invoicedQty),
      unitPrice: new FormControl(obj.unitPrice),
      locUnitPrice: new FormControl(obj.locUnitPrice),
      poBasicAmt: new FormControl(obj.poBasicAmt),
      locPoBasicAmt: new FormControl(obj.locPoBasicAmt),
      inspectionRequired: new FormControl(obj.inspectionRequired),
      lastReceivedDt: new FormControl(obj.lastReceivedDt),
      custPoNo: new FormControl(obj.custPoNo),
      remarks: new FormControl(obj.remarks),
      holdFlg: new FormControl(obj.holdFlg),
      poBalanceQty: new FormControl(obj.poBalanceQty),
      poReqDt: new FormControl(obj.poReqDt),
      taxCd1: new FormControl(obj.taxCd1),
      taxRate1: new FormControl(obj.taxRate1),
      taxAmt1: new FormControl(obj.taxAmt1),
      taxCd2: new FormControl(obj.taxCd2),
      taxRate2: new FormControl(obj.taxRate2),
      taxAmt2: new FormControl(obj.taxAmt2),
      taxCd3: new FormControl(obj.taxCd3),
      taxRate3: new FormControl(obj.taxRate3),
      taxAmt3: new FormControl(obj.taxAmt3),
      itemTotalTaxAmt: new FormControl(obj.itemTotalTaxAmt),
      prReqNo: new FormControl(obj.prReqNo),
      srNo: new FormControl(this.poMainForm.controls.srNo.value),
      netAmt: new FormControl(obj.netAmt),
      shipType: new FormControl(obj.shipType),
      expDeliveryDt: new FormControl(obj.expDeliveryDt),
      expDeliveryDtDisp: new FormControl(obj.expDeliveryDtDisp),
      prDtlId: new FormControl(obj.prDtlId),
      invoiceRdvcDt: new FormControl(obj.invoiceRdvcDt),
      invoiceClear: new FormControl(obj.invoiceClear),
      pendingInvAmt: new FormControl(obj.pendingInvAmt),
      rejectQty: new FormControl(obj.rejectQty),
      prHdrId: new FormControl(obj.prHdrId),
      deliveryCfmDt: new FormControl(obj.deliveryCfmDt),
      srId: new FormControl(obj.srId),
      assetCode: new FormControl(obj.assetCode),
      assetHdrId: new FormControl(obj.assetHdrId),
      taxRateTemp1: new FormControl(obj.taxRate1 + '%'),
      taxRateTemp2: new FormControl(obj.taxRate2 + '%'),
      rtvQty: new FormControl(obj.rtvQty),
      assetGroupName: new FormControl(obj.assetGroupName),
      serialNo: new FormControl(obj.serialNo),
      modelName: new FormControl(obj.modelName),
      manufacturerName: new FormControl(obj.manufacturerName),
      poReqDtDisp: new FormControl(obj.poReqDtDisp)
    });

    this.poDtlList.push(group);
    this.calculateTotals();
  }

  loadLocationDetailInfoShipBillTo(locationId, fromSrc) {
    this.commonService.showSpinner();

    if (fromSrc == 'BILLTO') {
      this.commonService.commonGetService('loadLocationInfo.sams', locationId).subscribe(
        data => {
          let address = data.responseData.locAddress1.concat(',').concat(data.responseData.locAddress2);
          this.poMainForm.controls.billInfoId.setValue(data.responseData.locationId);
          this.poMainForm.controls.billInfoName.setValue(data.responseData.locationName);
          this.poMainForm.controls.billAddress1.setValue(address);
          this.poMainForm.controls.billCity.setValue(data.responseData.locCity);
          this.poMainForm.controls.billState.setValue(data.responseData.locState);
          this.poMainForm.controls.billCountry.setValue(data.responseData.locCountry);
          this.poMainForm.controls.billZipCode.setValue(data.responseData.locPinCode);
          this.poMainForm.controls.billToContactPerson.setValue(data.responseData.contactPersonName);
          this.poMainForm.controls.billToContactPersonNo.setValue(data.responseData.contactPhoneNo);
        }
      );
    } else if (fromSrc == 'SHIPTO') {
      this.commonService.commonGetService('loadLocationInfo.sams', locationId).subscribe(
        data => {
          let address = data.responseData.locAddress1.concat(',').concat(data.responseData.locAddress2);
          this.poMainForm.controls.shipInfoId.setValue(data.responseData.locationId);
          this.poMainForm.controls.shipInfoName.setValue(data.responseData.locationName);
          this.poMainForm.controls.shipAddress1.setValue(address);
          this.poMainForm.controls.shipCity.setValue(data.responseData.locCity);
          this.poMainForm.controls.shipState.setValue(data.responseData.locState);
          this.poMainForm.controls.shipCountry.setValue(data.responseData.locCountry);
          this.poMainForm.controls.shipZipCode.setValue(data.responseData.locPinCode);
          this.poMainForm.controls.shipToContactPerson.setValue(data.responseData.contactPersonName);
          this.poMainForm.controls.shipToContactPersonNo.setValue(data.responseData.contactPhoneNo);
        }
      );
    } else {
      this.commonService.commonGetService('loadLocationInfo.sams', locationId).subscribe(
        data => {
          let address = data.responseData.locAddress1.concat(',').concat(data.responseData.locAddress2);
          this.poMainForm.controls.billInfoId.setValue(data.responseData.locationId);
          this.poMainForm.controls.billInfoName.setValue(data.responseData.locationName);
          this.poMainForm.controls.billAddress1.setValue(address);
          this.poMainForm.controls.billCity.setValue(data.responseData.locCity);
          this.poMainForm.controls.billState.setValue(data.responseData.locState);
          this.poMainForm.controls.billCountry.setValue(data.responseData.locCountry);
          this.poMainForm.controls.billZipCode.setValue(data.responseData.locPinCode);
          this.poMainForm.controls.billToContactPerson.setValue(data.responseData.contactPersonName);
          this.poMainForm.controls.billToContactPersonNo.setValue(data.responseData.contactPhoneNo);

          this.poMainForm.controls.shipInfoId.setValue(data.responseData.locationId);
          this.poMainForm.controls.shipInfoName.setValue(data.responseData.locationName);
          this.poMainForm.controls.shipAddress1.setValue(address);
          this.poMainForm.controls.shipCity.setValue(data.responseData.locCity);
          this.poMainForm.controls.shipState.setValue(data.responseData.locState);
          this.poMainForm.controls.shipCountry.setValue(data.responseData.locCountry);
          this.poMainForm.controls.shipZipCode.setValue(data.responseData.locPinCode);

          this.poMainForm.controls.shipToContactPerson.setValue(data.responseData.contactPersonName);
          this.poMainForm.controls.shipToContactPersonNo.setValue(data.responseData.contactPhoneNo);
        }
      );
    }
    this.commonService.hideSpinner();
  }

  listofBillToName(searchValue) {
    this.scrollBillToNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllUserLocForCombo, searchValue.term, '', '', this.limitCount, this.billToNamePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.billToNamePageNumber, this.billToCombo, data.responseData.comboList)
        this.billToNamePageNumber = this.getData.pageNumber;
        this.billToCombo = this.getData.dataList;
        this.scrollBillToNamesync = false;
      }
    );
  }

  setBillToComboValue(event) {
    if (event === undefined) {
      this.poMainForm.controls['billInfoId'].setValue(0);
      this.poMainForm.controls['billInfoName'].setValue('');
      this.billToNamePageNumber = 1;
    } else {
      this.poMainForm.controls['billInfoId'].setValue(event.locationId);
      this.poMainForm.controls['billInfoName'].setValue(event.locationName);
      this.loadLocationDetailInfoShipBillTo(event.locationId, 'BILLTO');
    }
  }

  listofShipToName(searchValue) {
    this.scrollShipToNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllUserLocForCombo, searchValue.term, '', '', this.limitCount, this.shipToNamePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.shipToNamePageNumber, this.shipToCombo, data.responseData.comboList)
        this.shipToNamePageNumber = this.getData.pageNumber;
        this.shipToCombo = this.getData.dataList;
        this.scrollShipToNamesync = false;
      }
    );
  }

  setShipToComboValue(event) {
    if (event === undefined) {
      this.poMainForm.controls['shipInfoId'].setValue(0);
      this.poMainForm.controls['shipInfoName'].setValue('');
      this.billToNamePageNumber = 1;
    } else {
      this.poMainForm.controls['shipInfoId'].setValue(event.locationId);
      this.poMainForm.controls['shipInfoName'].setValue(event.locationName);
      this.loadLocationDetailInfoShipBillTo(event.locationId, 'SHIPTO');
    }
  }

  // deletePODtl(element, index) {
  //   let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
  //     height: 'auto',
  //     width: '400px',
  //     data: {
  //       'Text': 'PO Dtl'
  //     }
  //   });
  //   dialogRef.disableClose = true;
  //   dialogRef.afterClosed().subscribe( 
  //     data => {
  //       this.poDtlList = this.poMainForm.get('poDtlList') as FormArray;
  //       this.poDtlList.removeAt(index);
  //       if (element.value.poDtlId > 0) {
  //         this.commonService.commonDeleteService(this.assetOptimaServices.deletePRLineItemsFromPO, element.value.poDtlId).subscribe(
  //           data => {
  //             if (data.success) {
  //               this.calculateTotals();
  //               this.commonService.openToastSuccessMessage(data.message);
  //             } else {
  //               this.commonService.openToastWarningMessage(data.message);
  //             }
  //           }
  //         )
  //       } else {
  //         this.calculateTotals();
  //         this.commonService.openToastSuccessMessage("Record Deleted Successfully");
  //       }
  //       if (this.poDtlList.length == 0) {
  //         this.disableUpdateBtn = true;
  //       }
  //     });


  // }

  deletePODtl(element, index) {
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'PO Dtl'
      }
    });
    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) {
        this.poDtlList = this.poMainForm.get('poDtlList') as FormArray;
        this.poDtlList.removeAt(index);

        if (element.value.poDtlId > 0) {
          this.commonService.commonDeleteService(this.assetOptimaServices.deletePRLineItemsFromPO, element.value.poDtlId)
            .subscribe(data => {
              if (data.success) {
                this.calculateTotals();
                this.commonService.openToastSuccessMessage(data.message);
              } else {
                this.commonService.openToastWarningMessage(data.message);
              }
            });
        } else {
          this.calculateTotals();
          this.commonService.openToastSuccessMessage("Record Deleted Successfully");
        }

        if (this.poDtlList.length == 0) {
          this.disableUpdateBtn = true;
        }
      } else {
        console.log("Deletion cancelled by user.");
        dialogRef.disableClose = true
      }
    });
  }


  clear() {
    this.poMainForm.reset();
    this.poMainForm.updateValueAndValidity();
    this.ngOnInit();
  }

  poCancel() {
    const poNoValue = this.poMainForm.controls.poNO.value;
    const poCancelhdrId = this.poMainForm.controls.poId.value;

    let dialogRef = this.dialog.open(CancelConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'PO : ' + poNoValue
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          let cancelReason = data.cancelReason;
          this.poCancelList = [];
          this.poCancelList.push(poCancelhdrId);
          let poIdList = { poCancelList: [], cancelReason: cancelReason };
          poIdList.poCancelList = this.poCancelList;
          poIdList.cancelReason = cancelReason;
          this.commonService.showSpinner();

          this.commonService.commonInsertService('cancelMultiplePO.sams', poIdList).subscribe(
            data => {
              if (data.success) {
                this.commonService.openToastSuccessMessage(data.message);
                this.locationRef.back();
                this.commonService.hideSpinner();
              } else {
                this.commonService.hideSpinner();
                this.commonService.openToastErrorMessage(data.message);
              }
            }
          );
        }
      });
  }

  cusFieldHdr: PurchaseTermsTemplateDtl;
  customFieldsLength: number = 0;

  addPOTCTemplateInfo() {
    let dialogRef = this.dialog.open(PoTcTemplateListComponent, {
      data: {
        'source': "purchaseOrder",
        'processId': processList.ASSET_CONTRACT,
        'poType': this.poMainForm.controls.poType.value
      },
      height: 'auto',
      width: '900px',
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {

        if (this.cusFieldHdrList1.length > 0) {
          this.deleteExistingPoTcTemplate(data);
        } else {
          this.commonService.commonGetService('fetchPurchaseTemplateDtlForHdrId.sams', data.tcTemplateHdrId).subscribe(
            data => {
              if (data.success) {
                console.log('before template', JSON.stringify(data.responseData));
                this.cusFieldHdrList = data.responseData;
                this.customFieldsLength = data.responseData.length;
                var len = this.cusFieldHdrList.length;

                console.log('data for customfield', JSON.stringify(this.cusFieldHdrList))

              } else {
                this.commonService.openToastWarningMessage(data.message);
              }
            }, error => {
            }
          );
        }

      });
  }
  deleteParameter(element: any, index: number, isChildParam?: boolean) {
    console.log('element', element);
    console.log('index', index, isChildParam);
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: { 'Text': 'Parameter' }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        console.log('Dialog closed', data)
        if (data.status) {
          console.log('before deletion ', JSON.stringify(this.cusFieldHdrList1));

          if (element.poTcInfoId > 0) {
            this.commonService.commonGetService('deleteTCParameter.sams', element.poTcInfoId, isChildParam).subscribe(
              data => {
                if (data.success) {

                  console.log('before deletion ', JSON.stringify(this.cusFieldHdrList1));
                  if (isChildParam) {
                    this.commonService.openToastSuccessMessage(data.message);
                    this.cusFieldHdrList1[index].tcParameterChildId = 0;
                    this.cusFieldHdrList1[index].tcParameterChildName = '';
                    this.cusFieldHdrList1[index].tcParameterChildInputType = '';
                    this.cusFieldHdrList1[index].comboValuesChild = null;
                    this.cusFieldHdrList1[index].valueChild = null;

                  } else {
                    this.commonService.openToastSuccessMessage(data.message);
                    this.cusFieldHdrList1.splice(index, 1);
                    this.cusFieldHdrList1 = [...this.cusFieldHdrList1];
                  }
                  console.log('after deletion ', JSON.stringify(this.cusFieldHdrList1));

                } else {
                  this.commonService.openToastErrorMessage(data.message);
                }
              }
            );
          } else {
            if (isChildParam) {

              this.cusFieldHdrList1[index].tcParameterChildId = 0;
              this.cusFieldHdrList1[index].tcParameterChildName = '';
              this.cusFieldHdrList1[index].comboValuesChild = null;
              this.cusFieldHdrList1[index].valueChild = null;

            } else {

              this.cusFieldHdrList1.splice(index, 1);
              this.cusFieldHdrList1 = [...this.cusFieldHdrList1];
            }
          }

        }
      });
  }

  listofContractType(searchValue) {
    this.scrollContractTypesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllContractTypeCombo, searchValue.term, '', '', this.limitCount, this.contractTypePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.contractTypePageNumber, this.contractTypeCombo, data.responseData.comboList)
        this.contractTypePageNumber = this.getData.pageNumber;
        this.contractTypeCombo = this.getData.dataList;
        this.scrollContractTypesync = false;
      }
    );
  }

  setContractType(event) {
    if (event === undefined) {
      this.poMainForm.controls['contractType'].setValue('');
      this.contractTypePageNumber = 1;
    } else {
      this.poMainForm.controls['contractType'].setValue(event.contractTypeName);
    }
  }

  addAssetAgainstPOContract() {
    //const assetIds: number[] = this.assetDataSource.data.map(asset => asset.assetHdrId);
    const assetIds: number[] = [];
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
        if (data != undefined && data != '') {

          this.poDtlList = this.poMainForm.get('poDtlList') as FormArray;

          data.forEach(obj => {

            let netAmtTmp = Number(obj.totalPurchaseAmt) * Number(1);
            const group = this.formBuilder.group({
              poDtlId: new FormControl(0),
              poId: new FormControl(0),
              poNo: new FormControl(0),
              poLineNo: new FormControl(''),
              poQty: new FormControl(1),
              receivedQty: new FormControl(0),
              invoicedQty: new FormControl(0),
              unitPrice: new FormControl(obj.totalPurchaseAmt),
              locUnitPrice: new FormControl(obj.totalPurchaseAmt),
              poBasicAmt: new FormControl(obj.totalPurchaseAmt),
              locPoBasicAmt: new FormControl(obj.totalPurchaseAmt),
              inspectionRequired: new FormControl('N'),
              lastReceivedDt: new FormControl(''),
              custPoNo: new FormControl(''),
              remarks: new FormControl(''),
              holdFlg: new FormControl('N'),
              poBalanceQty: new FormControl(0),
              poReqDt: new FormControl(''),
              taxCd1: new FormControl(''),
              taxRate1: new FormControl(0),
              taxAmt1: new FormControl(0),
              taxCd2: new FormControl(''),
              taxRate2: new FormControl(0),
              taxAmt2: new FormControl(0),
              taxCd3: new FormControl(''),
              taxRate3: new FormControl(0),
              taxAmt3: new FormControl(0),
              itemTotalTaxAmt: new FormControl(0),
              prReqNo: new FormControl(obj.prReqNo),
              srNo: new FormControl(''),
              netAmt: new FormControl(netAmtTmp),
              shipType: new FormControl(''),
              expDeliveryDt: new FormControl(''),
              expDeliveryDtDisp: new FormControl(''),
              prDtlId: new FormControl(''),
              invoiceRdvcDt: new FormControl(''),
              invoiceClear: new FormControl(''),
              pendingInvAmt: new FormControl(''),
              rejectQty: new FormControl(0),
              prHdrId: new FormControl(0),
              deliveryCfmDt: new FormControl(''),
              srId: new FormControl(0),
              assetCode: new FormControl(obj.assetCode),
              assetHdrId: new FormControl(obj.assetHdrId),

              modelName: new FormControl(obj.modelName),
              assetGroupName: new FormControl(obj.assetGroupName),
              serialNo: new FormControl(obj.serialNo),
            });
            this.poDtlList.push(group);
            this.calculateTotals();
          });
        }
      });
  }

  fromDate: string = 'Today';
  daysElapsed: number = 0;

  onChangeValidation1() {
    const startDateString = this.poMainForm.controls.contractStartDtDisp.value;
    const endDateString = this.poMainForm.controls.contractEndDtDisp.value;
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
      this.daysElapsed = Math.ceil(timeDiff / (1000 * 60 * 60 * 24) % 365);
    } else {
      this.daysElapsed = 0;
    }

    this.poMainForm.controls.noOfContractDays.setValue(this.daysElapsed);
    // if(this.daysElapsed <= 90 && this.daysElapsed >= 0){
    //   this.poMainForm.controls.noOfContractDays.setValue(this.daysElapsed);
    //   //this.commonService.openToastWarningMessage(this.daysElapsed+" Days Left To Expire From "+this.fromDate+".");
    // } else if(this.daysElapsed < 0){
    //   //this.commonService.openToastWarningMessage("Contract Expired Aleady.");
    // }
  }

  // editorConfig: AngularEditorConfig = {

  childParameterDeleteList = [];


  //   editable: true,
  //   spellcheck: true,
  //   height: '350px',
  //   minHeight: '350px',
  //   maxHeight: 'auto',
  //   width: 'auto',
  //   minWidth: '0',
  //   translate: 'yes',
  //   enableToolbar: true,
  //   showToolbar: true,
  //   placeholder: 'Enter text here...',
  //   defaultParagraphSeparator: '',
  //   defaultFontName: '',
  //   defaultFontSize: '',
  //   // fonts: [
  //   //   {class: 'arial', name: 'Arial'},
  //   //   {class: 'times-new-roman', name: 'Times New Roman'},
  //   //   {class: 'calibri', name: 'Calibri'},
  //   //   {class: 'comic-sans-ms', name: 'Comic Sans MS'}
  //   // ],
  //   uploadUrl: 'v1/image',
  //   sanitize: true,
  //   toolbarPosition: 'top',
  //   toolbarHiddenButtons: [
  //     ['strikeThrough'],
  //     ['insertVideo', 'insertImage']
  //   ]
  // };

  setEditorConfig() {
    // this.editorConfig = {
    //   editable: this.headingDisplay !== 'View',
    //   spellcheck: true,
    //   height: '350px',
    //   minHeight: '350px',
    //   maxHeight: 'auto',
    //   width: 'auto',
    //   minWidth: '0',
    //   translate: 'yes',
    //   enableToolbar: true,
    //   showToolbar: true,
    //   placeholder: 'Enter text here...',
    //   defaultParagraphSeparator: '',
    //   defaultFontName: '',
    //   defaultFontSize: '',
    //   // fonts: [
    //   //   {class: 'arial', name: 'Arial'},
    //   //   {class: 'times-new-roman', name: 'Times New Roman'},
    //   //   {class: 'calibri', name: 'Calibri'},
    //   //   {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    //   // ],
    //   uploadUrl: 'v1/image',
    //   sanitize: true,
    //   toolbarPosition: 'top',
    //   toolbarHiddenButtons: [
    //     ['strikeThrough'],
    //     ['insertVideo', 'insertImage']
    //   ]
    // };
  }
  viewContactPersonDetails() {

    const dialogRef = this.dialog.open(SupplierContactInfoComponent, {
      height: 'auto',
      width: '700px',
      data: {

        poMainForm: this.poMainForm
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(data => {
      if (data.status === true) {

      } else {

      }
    });
  }

  updateAndApprove(headingDisplay) {
    console.log("updateAndApprove", headingDisplay);
    if (headingDisplay == 'Create') {
      this.save();
    } else {
      let approvalButtonFlag = false;
      console.log("approvalId", this.poMainForm.controls.approvalId.value);
      if (this.poMainForm.controls.approvalId.value == 0) {
        approvalButtonFlag = true;
      } else {
        approvalButtonFlag = false;
      }
      let dialogRef = this.dialog.open(UpdateApproveConfirmationComponent, {
        height: '30%',
        width: '25%',
        data: {
          'confirmTitle': 'PO Update',
          'approvalButtonFlag': approvalButtonFlag
        }
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(
        data => {
          if (data.status == 'update') {
            this.save();
          } else if (data.status == 'update and approve') {
            this.saveUpdateAndApprove(true);
          } else { }
        });
    }

  }


  saveUpdateFlag: boolean = false;
  saveUpdateAndApprove(updateApproveFlag) {

    this.saveFlag = true;
    if (this.poMainForm.controls.poDtlList.value.length <= 0) {
      this.saveFlag = false;
      this.commonService.openToastWarningMessage("Atlease add One Item for PO!");
    }
    this.cusFieldHdrList.push(...this.cusFieldHdrList1);

    if (this.saveFlag) {

      this.uploadPurchaseOrderFlag = true;
      // this.commonService.showSpinner();
      // this.poMainForm.controls.poTempDtlList.setValue(this.cusFieldHdrList);
      this.poMainForm.controls.poStatus.setValue(this.poMainForm.controls.poStatus.value);
      this.poMainForm.controls.poTempDtlList.setValue(this.cusFieldHdrList);
      this.poTermsAndConditionForm.controls.poHdrId.setValue(this.poMainForm.controls.poId.value);


      console.log("poTermsAndConditionForm", this.poTermsAndConditionForm.value);

      const poHdrTOData = {};
      Object.keys(this.poMainForm.controls).forEach(key => {
        poHdrTOData[key] = this.poMainForm.controls[key].value;
      });
      console.log("poMainForm", poHdrTOData);

      let obj = {
        'poHdrTO': poHdrTOData,
        'poTermsAndConditions': this.poTermsAndConditionForm.value
      }

      this.commonService.commonInsertService('saveOrUpdatePurchaseOrder.sams', obj).subscribe(
        data => {
          if (data.success) {
            if (updateApproveFlag) {
              this.poWorkflowApproval(true)             // this.validateTermsAndCondition();
              this.generatePOPdfReport(data.responseData.poId);
            }
          } else {
            // this.commonService.hideSpinner();
            this.commonService.openToastErrorMessage(data.message);
            this.uploadPurchaseOrderFlag = false;
          }
        }
      );
    }
  }

  validateTermsAndCondition() {
    if ((this.cusFieldHdrList == undefined || this.cusFieldHdrList.length == 0) && this.poMainForm.controls.termsCondition.value == "") {

      const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
        height: 'auto',
        width: '400px',
        data: {
          confirmHeading: 'Confirmation',
          confirmMsg: `Are you sure to approve without terms and condition?`,
          selectedElementListLength: 0
        }
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(data => {
        if (data.status === true) {
          this.poApproveforUpdate();
        } else {
          this.uploadPurchaseOrderFlag = false;
        }
      });

    } else {
      this.poApproveforUpdate();
    }
  }

  poApproveforUpdate() {

    let poUnitPriceFlag = false;
    if (this.poMainForm.controls.approvalId.value > 0) {
      if (this.poMainForm.controls.poWithoutPrice.value && this.poMainForm.controls.poWithoutSupplier.value) {
        if (this.poMainForm.controls.businessPartnerName.value == '') {
          this.commonService.openToastWarningMessage("Unit price/Supplier information is missing. Kindly input the mandatory fields.");
          poUnitPriceFlag = true;
        } else if (this.poMainForm.controls.poWithoutPrice.value) {

          for (let i = 0; i < this.poDtlList.value.length; i++) {
            if (this.poDtlList.value[i].unitPrice <= 0) {
              this.commonService.openToastWarningMessage("Unit price/Supplier information is missing. Kindly input the mandatory fields.");
              poUnitPriceFlag = true;
              break;
            }
          }

        }
        if (!poUnitPriceFlag) {
          this.poWorkFlowApprovalForUpdate();
        }

      } else if (this.poMainForm.controls.poWithoutSupplier.value && this.poMainForm.controls.businessPartnerName.value == '') {
        this.commonService.openToastWarningMessage("Unit price/Supplier information is missing. Kindly input the mandatory fields.");
      } else if (this.poMainForm.controls.poWithoutPrice.value) {
        for (let i = 0; i < this.poDtlList.value.length; i++) {
          if (this.poDtlList.value[i].unitPrice <= 0) {
            this.commonService.openToastWarningMessage("Unit price/Supplier information is missing. Kindly input the mandatory fields.");
            poUnitPriceFlag = true;
            break;
          }
        }
        if (!poUnitPriceFlag) {
          this.poWorkFlowApprovalForUpdate();
        }
      } else {
        this.poWorkFlowApprovalForUpdate();

      }
    } else {
      this.poWorkFlowApprovalForUpdate();
    }
  }

  poWorkFlowApprovalForUpdate() {

    let selectedPoList = [];
    this.poMainForm.controls.poType.enable();
    let approvalId = this.poMainForm.controls.approvalId.value;
    selectedPoList.push({ ...this.poMainForm.value, approvalId: approvalId });
    this.poMainForm.controls.poType.disable();

    // let isUpdateAndApprove = this.poMainForm.controls.poStatus.value == 'REJECTED' ? true : false;
    let isUpdateAndApprove = true;

    let poIdList = { selectedPoList: [], status: 'APPROVED', selectedApprovalList: [], selectedPoType: "", isUpdateAndApprove };
    for (let i = 0; i <= selectedPoList.length - 1; i++) {
      poIdList.selectedPoList.push(selectedPoList[i].poId);
      poIdList.selectedPoType = selectedPoList[i].poType;
      poIdList.selectedApprovalList.push(selectedPoList[i].approvalId);
    }
    this.commonService.showSpinner();
    this.commonService.commonInsertService('approveRejectPO.sams', poIdList).subscribe(
      data => {
        if (data.success) {
          this.commonService.hideSpinner();
          this.commonService.openToastSuccessMessage(data.message);
          this.closePO();
        } else {
          this.commonService.hideSpinner();
          this.commonService.openToastWarningMessage(data.message);
        }
      }, error => {

      }
    );
  }

  selectedParameters: any[] = [];

  addPOTCParameterInfo(isFor: string, parameterIndex?: number) {
    const isForChildParam: boolean = isFor == 'childParameter' ? true : false;
    let dialogRef = this.dialog.open(PoTcParameterListComponent, {
      data: {
        source: "purchaseOrder",
        items: isFor == 'parameter' ? this.cusFieldHdrList1 : [],
        isForChildParam: isForChildParam
      },
      height: 'auto',
      width: '900px',
    });

    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.selectedParameters = data;

        console.log('template id,', this.cusFieldHdrList[0].tcTemplateHdrId)

        this.selectedParameters.forEach(param => {
          if (this.cusFieldHdrList1 && Array.isArray(this.cusFieldHdrList1)) {

            if (!isForChildParam) {
              const alreadyInAPI = this.cusFieldHdrList?.some(apiParam =>
                apiParam.tcParameterId === param.tcParameterId
              );
              if (alreadyInAPI) {
                this.commonService.openToastWarningMessage("Parameter already exists from API response!");
                return; // ⛔ Skip adding
              }
            }

            console.log('param values', param)



            if (isForChildParam) {
              if (this.cusFieldHdrList1[parameterIndex].tcParameterId == param.tcParameterId) {
                this.commonService.openToastWarningMessage("Parent and Child Parameter Can't be same!");
              } else {
                this.cusFieldHdrList1[parameterIndex].tcTemplateHdrId = this.cusFieldHdrList[0].tcTemplateHdrId;
                this.cusFieldHdrList1[parameterIndex].tcParameterChildId = param.tcParameterId;
                this.cusFieldHdrList1[parameterIndex].tcParameterChildName = param.tcParameterName;
                this.cusFieldHdrList1[parameterIndex].tcParameterChildInputType = param.tcParameterInputType;
                this.cusFieldHdrList1[parameterIndex].comboValuesChild = param.tcParameterInputValues.split(',');
                this.cusFieldHdrList1[parameterIndex].tcParameterChildInputValues = param.tcParameterInputValues
                this.cusFieldHdrList1[parameterIndex].valueChild = param.tcParameterInputValues || null;
                this.cusFieldHdrList1[parameterIndex].tcParameterChildEditable = param.isEditable;
                this.cdr.detectChanges();
              }
            } else {
              const exists = this.cusFieldHdrList1.some(existingParam =>
                existingParam.tcParameterId === param.tcParameterId
              );

              if (!exists) {
                this.cusFieldHdrList1.push({
                  tcTemplateDtlId: 0,
                  tcTemplateHdrId: this.cusFieldHdrList[0].tcTemplateHdrId,
                  tcParameterId: param.tcParameterId,
                  tcParameterName: param.tcParameterName,
                  displaySequenceNo: (this.cusFieldHdrList1.length + 1).toString(),
                  tcParameterChildId: 0,
                  tcParameterChildName: '',
                  tcParameterInputType: param.tcParameterInputType,
                  comboValues: param.tcParameterInputValues.split(','),
                  value: null,
                  tcParameterEditable: param.isEditable,
                  tcParameterInputValues: param.tcParameterInputValues

                });
              }
            }

            console.log('after add', this.cusFieldHdrList1);

          } else {
            console.warn('cusFieldHdrList1 is not defined or not an array.');
          }
        });
      }
    });
  }


  updateTaxTerms() {
    // if(!this.poTermsAndConditionForm.controls.taxIncluded){
    //   this.poTermsAndConditionForm.controls.taxCoverageTerms.setValidators(Validators.required);
    //   this.poTermsAndConditionForm.controls.taxCoverageTerms.updateValueAndValidity()
    // }else{
    //   this.poTermsAndConditionForm.controls.taxCoverageTerms.setValidators([]);
    //   this.poTermsAndConditionForm.controls.taxCoverageTerms.updateValueAndValidity()
    // }
  }

  //COMMENTED AS PER CHANGE REQUEST - CR_19_02_2023


  updateSpecialTermsAndConditions() {
    if (!this.poTermsAndConditionForm.controls.specialTermsAvailable) {
      this.poTermsAndConditionForm.controls.specialTerms.setValidators(Validators.required);
      this.poTermsAndConditionForm.controls.specialTerms.updateValueAndValidity()
    } else {
      this.poTermsAndConditionForm.controls.specialTerms.setValidators([]);
      this.poTermsAndConditionForm.controls.specialTerms.updateValueAndValidity()
    }
  }

  expectedArrivalDtChange() {
    this.poMainForm.controls.expectedArrivalDtDisp.setValue(this.commonService.addCurrenrtTimeToDate(this.poMainForm.controls.expectedArrivalDtDisp.value));
  }



  isXNos(cusFieldslist) {

    if (cusFieldslist.value == 'X NOS') {
      cusFieldslist.tcParameterChildId2 = 53;
      cusFieldslist.tcParameterChildName2 = 'X NOS';
    } else if (cusFieldslist.value == 'APPLICABLE') {
      cusFieldslist.tcParameterChildId2 = 54;
      cusFieldslist.tcParameterChildName2 = 'APPLICABLE PERCENTAGE';
    } else {
      cusFieldslist.tcParameterChildId2 = 0;
      cusFieldslist.tcParameterChildName2 = '';
    }
  }

  pushToDeleteList(cusFieldslist, i) {

    this.parameter = cusFieldslist;
    if (cusFieldslist.tcParameterChildName2 == '' && cusFieldslist.value != 'X NOS') {
      this.childParameterDeleteList.push([this.parameter, i]);
    } else if (cusFieldslist.tcParameterChildName2 == 'X NOS' && cusFieldslist.value == 'X NOS') {
      this.childParameterDeleteList = this.childParameterDeleteList.filter(item => item[1] !== i);
    } if (cusFieldslist.tcParameterChildName2 == '' && cusFieldslist.value != 'APPLICABLE') {
      this.childParameterDeleteList.push([this.parameter, i]);
    } else if (cusFieldslist.tcParameterChildName2 == 'APPLICABLE PERCENTAGE' && cusFieldslist.value == 'APPLICABLE') {
      this.childParameterDeleteList = this.childParameterDeleteList.filter(item => item[1] !== i);
    }

  }

  deleteChildParameter() {

    for (let i = 0; i < this.childParameterDeleteList.length; i++) {

      const element = this.childParameterDeleteList[i];
      this.deleteChildParameters(element[0], element[1], true);
    }
  }

  deleteChildParameters(element: any, index: number, isChildParam?: boolean) {

    if (isChildParam) {
      // this.commonService.openToastSuccessMessage("Purchase T&C Parameter Deleted");
      this.cusFieldHdrList1[index].tcParameterChildId2 = 0;
      this.cusFieldHdrList1[index].tcParameterChildName2 = '';
      this.cusFieldHdrList1[index].valueChild2 = null;
    } else {
      //  this.commonService.openToastSuccessMessage("Purchase T&C Parameter Deleted");
      this.cusFieldHdrList1.splice(index, 1);
      this.cusFieldHdrList1 = [...this.cusFieldHdrList1];
    }
  }

  updateValueIfEmpty(cusFieldslist) {
    if (!cusFieldslist.value) {
      cusFieldslist.value = cusFieldslist.tcParameterInputValues;
    }
  }

  deleteExistingPoTcTemplate(templateInfo) {
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: { 'Text': 'existing template' }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {

          this.commonService.commonGetService('deletePoTcTemplate.sams', this.poMainForm.controls.poId.value).subscribe(
            data => {
              if (data.success) {
                this.commonService.openToastSuccessMessage(data.message);

                this.cusFieldHdrList1 = [];

                this.commonService.commonGetService('fetchPurchaseTemplateDtlForHdrId.sams', templateInfo.tcTemplateHdrId).subscribe(
                  data => {
                    if (data.success) {
                      this.cusFieldHdrList = data.responseData;
                      this.customFieldsLength = data.responseData.length;
                      var len = this.cusFieldHdrList.length;
                      for (var k = 0; len > k; k++) {

                      }
                    } else {
                      this.commonService.openToastWarningMessage(data.message);
                    }
                  }, error => {
                  }
                );

              } else {
                this.commonService.openToastErrorMessage(data.message);
              }
            }
          );


        }
      });
  }

}
