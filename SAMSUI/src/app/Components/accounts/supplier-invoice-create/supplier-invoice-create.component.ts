import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { Location } from '@angular/common';

import { getData } from 'src/app/Model/common/fetchListData';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { AccGrnListComponent } from '../../Dialog-Components/accounts/acc-grn-list/acc-grn-list.component';
import { AccPoListComponent } from '../../Dialog-Components/accounts/acc-po-list/acc-po-list.component';
import { allBusinessPartnerRoles, allWorkflowStatus } from 'src/app/Constants/AllStatusConstants';
import { SuppInvAddInfoComponent } from '../../Dialog-Components/accounts/supp-inv-add-info/supp-inv-add-info.component';
import { MatTable } from '@angular/material/table';
import { DocumentCreateComponent } from '../../asset/Asset-Master/Model/subTabs/document-create/document-create.component';
import { SuppInvDocInfoComponent } from '../../Dialog-Components/accounts/supp-inv-doc-info/supp-inv-doc-info.component';
import { DeleteConfirmationComponent } from '../../Common-components/delete-confirmation/delete-confirmation.component';
import { PurchaseTermsTemplateDtl } from 'src/app/Model/base/purchase-terms-dtl';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-supplier-invoice-create',
  templateUrl: './supplier-invoice-create.component.html',
  styleUrls: ['./supplier-invoice-create.component.css']
})
export class SupplierInvoiceCreateComponent implements OnInit {

  title = 'Asset Optima - Supplier Invoice';

  @ViewChild('focusSupplierName') focusSupplierName: ElementRef;
  supplierInvoiceMainForm: FormGroup;

  supplierInvoiceDtlList: FormArray;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();
  //Heading static
  buttonDisplay: string;
  headingDisplay: string;
  disbleClear: boolean;
  uploadAssetFlag: boolean = false;
  viewMode: boolean = false;

  approveRejectBtn: boolean = false;

  approveBtnFlg = false;
  rejectBtnFlg = false;

  scrollLocationNamesync: boolean = false;
  locationNamePageNumber: number;
  locationCombo: any = [];

  scrollSuppliersync: boolean = false;
  supplierPageNumber: number;
  supplierList: any = [];
  supplierCombo: any = [];

  scrollApprovedSuppliersync: boolean = false;
  approvedSupplierPageNumber: number;
  supplierLocationList: any = [];

  skipCount: number;
  getData: getData;

  supplierInvoiceModelAccessModule: ModuleAccessModel;

  recordsPerPageForCombo: string;
  limitCount: any;

  scrollMatchActionsync: boolean = false;
  matchActionPageNumber: number;
  matchActionReasonList: any = [];

  scrollInvoiceStatussync: boolean = false;
  invoiceStatusPageNumber: number;
  invoiceStatusReasonList: any = [];

  enableSubmitButton: boolean = false;

  enableSupplierInvoiceDtlTable: boolean = true;

  scrollTaxCd1sync: boolean = false;
  taxCd1PageNumber: number;
  taxCD1List: any = [];

  scrollTaxCd2sync: boolean = false;
  taxCd2PageNumber: number;
  taxCD2List: any = [];

  grnIdsList: any = [];
  poIdsList: any = [];

  public supplierInvoiceHdrId: any;
  public transactionSource: any;

  employeeId: string = '0';
  approvalId: string = '0';
  approvebuttonEnable: boolean = false;
  approve: any;

  documentDataSource: [];
  documentDisCol = ['sno', 'docName', 'docType', 'createdBy', 'createdDtDisp', 'action'];

  currentDate: Date;

  constructor(private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private activatedRoute: ActivatedRoute,
    private assetOptimaConstants: AssetOptimaConstants,
    private formBuilder: FormBuilder,
    private locationRef: Location,
    private dialog: MatDialog,
    private readonly userSessionService: UserSessionService,
    private router: Router,
    private change: ChangeDetectorRef,
    private titleService: Title) {
    this.locationNamePageNumber = 1;
    this.skipCount = 1;
    this.supplierPageNumber = 1;
    this.approvedSupplierPageNumber = 1;
    this.getData = new getData();

    this.taxCd1PageNumber = 1;
    this.taxCd2PageNumber = 1;

    this.currentDate = new Date();
    
  }

  ngOnInit(): void {

    this.titleService.setTitle(this.title);
    this.supplierInvoiceModelAccessModule = this.userSessionService.getUserGroupAccess()['GROUPACCESS_SUPPLIER_INVOICE'];

    this.supplierInvoiceMainForm = new FormGroup({
      supplierInvoiceHdrId: new FormControl(0),
      supplierInvoiceNo: new FormControl('',[Validators.required]),
      invoiceRegDtDisp: new FormControl('',[Validators.required]),
      invoiceDtDisp: new FormControl('',[Validators.required]),
      invoiceStatus: new FormControl('UNMATCHED',[Validators.required]),
      locationId: new FormControl(0),
      locationName: new FormControl('',[Validators.required]),
      supplierId: new FormControl(0),
      supplierCd: new FormControl(''),
      supplierName: new FormControl('',[Validators.required]),
      supplierSiteId: new FormControl(0),
      supplierSiteName: new FormControl('',[Validators.required]),
      supplierSiteAddress: new FormControl(''),
      payTermCd: new FormControl(''),
      payTermDays: new FormControl('0'),
      curCd: new FormControl(''),
      exchRt: new FormControl('1'),
      basicInvAmount: new FormControl('0'),
      taxTotal: new FormControl('0'),
      tranCharges: new FormControl('0'),
      miscCharges: new FormControl('0'),
      totalInvAmount: new FormControl('0'),
      localCurCd: new FormControl(''),
      localTotalAmt: new FormControl('0'),
      matchAction: new FormControl('RECEIPT',[Validators.required]),
      paymentDueDtDisp: new FormControl('',[Validators.required]),
      advancePayments: new FormControl('0'),
      remarks: new FormControl(''),
      remarks1: new FormControl(''),
      supplierInvoiceDtlList: this.formBuilder.array([]),
      supplierInvoiceDocList: new FormControl('', []),
      erpInterfacedFlag : new FormControl('NO'),
      erpInterfacedRemarks : new FormControl('NOT INTEFRACED'),
      createdBy : new FormControl(''),
      createdDtDisp : new FormControl(''),
      poTempDtlList : new FormControl([]),
      grnType : new FormControl('')
    })

    this.supplierInvoiceMainForm.controls['locationName'].setValue(this.userSessionService.getUserLocationName());
    this.supplierInvoiceMainForm.controls['locationId'].setValue(this.userSessionService.getUserLocationId());
    this.supplierInvoiceMainForm.controls['exchRt'].setValue(1);
    this.locationNamePageNumber = 1;
    this.supplierInvoiceMainForm.controls.matchAction.disable();
    this.supplierInvoiceMainForm.controls.grnType.disable();
    this.supplierInvoiceMainForm.controls.taxTotal.disable();
    this.supplierInvoiceMainForm.controls.basicInvAmount.disable();
    this.supplierInvoiceMainForm.controls.curCd.disable();
    this.supplierInvoiceMainForm.controls.localTotalAmt.disable();
    this.validateEditMode();

    //this.commonService.setFormFocus(this.focusSupplierName);
  }

  createSupplierIinvoiceDtlList(): FormGroup {
    return this.formBuilder.group({
      supplierInvoiceDtlId: new FormControl(0),
      poNo: new FormControl(''),
      receiptNo: new FormControl(''),
      itemId: new FormControl(0),
      itemCd: new FormControl(''),
      itemDesc: new FormControl(''),
      uomCd: new FormControl(''),
      poQty: new FormControl(0),
      grnQty: new FormControl(0),
      poUnitPrice: new FormControl(0),
      unitPrice: new FormControl(0),
      invoiceQty: new FormControl(0),
      basicInvAmt: new FormControl(0),
      taxId1: new FormControl(0),
      taxCd1: new FormControl(''),
      taxRate1: new FormControl(0),
      taxAmt1: new FormControl(0),
      taxId2: new FormControl(0),
      taxCd2: new FormControl(''),
      taxRate2: new FormControl(0),
      taxAmt2: new FormControl(0),
      totalTaxAmt: new FormControl(0),
      totalInvAmt: new FormControl(0),
    });
  }

  backTOPRScreen() {
    this.locationRef.back();
  }

  exit() {
    this.locationRef.back();
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
      this.supplierInvoiceMainForm.controls['locationId'].setValue(0);
      this.locationNamePageNumber = 1;
    } else {
      this.supplierInvoiceMainForm.controls['locationId'].setValue(event.locationId);
    }
  }

  loadMatchActionData(searchValue) {
    console.log("match action reason list ", this.matchActionReasonList.length);
    if (this.matchActionReasonList.length == 0) {
      this.scrollMatchActionsync = true;
      this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
      this.commonService.getComboResults('listMatchAction.sams', searchValue.term, (this.userSessionService.getUserLocationId()) > 0 ? (this.userSessionService.getUserLocationId()) : 0,
        0, this.limitCount, this.matchActionPageNumber).subscribe(
          (data) => {
            this.getData = new getData();
            this.getData = this.commonService.fetchDataList(searchValue, this.matchActionPageNumber, this.matchActionReasonList, data.responseData.comboList)
            this.matchActionPageNumber = this.getData.pageNumber;
            this.matchActionReasonList = this.getData.dataList;
            this.scrollMatchActionsync = false;
          }
        );
    }
  }

  supplierInvoiceStatusData(searchValue) {
    console.log("match action reason list ", this.invoiceStatusReasonList.length);
    if (this.invoiceStatusReasonList.length == 0) {
      this.scrollInvoiceStatussync = true;
      this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
      this.commonService.getComboResults('listOfSupplierInvoiceStatus.sams', searchValue.term, (this.userSessionService.getUserLocationId()) > 0 ? (this.userSessionService.getUserLocationId()) : 0,
        0, this.limitCount, this.invoiceStatusPageNumber).subscribe(
          (data) => {
            this.getData = new getData();
            this.getData = this.commonService.fetchDataList(searchValue, this.invoiceStatusPageNumber, this.invoiceStatusReasonList, data.responseData.comboList)
            this.invoiceStatusPageNumber = this.getData.pageNumber;
            this.invoiceStatusReasonList = this.getData.dataList;
            this.scrollInvoiceStatussync = false;
          }
        );
    }
  }

  selectedMatchAction(event) {
    this.approveRejectBtn = false;
    if (event === undefined) {
      this.supplierInvoiceMainForm.controls['matchAction'].setValue('');
      this.matchActionPageNumber = 1;
    } else {
      this.supplierInvoiceMainForm.controls['matchAction'].setValue(event.matchActionName);
      if (event.matchActionName == 'RECEIPT') {
        this.enableSupplierInvoiceDtlTable = true;
        this.supplierInvoiceMainForm.controls['totalInvAmount'].disable();
      } else if (event.matchActionName == 'PO') {
        this.enableSupplierInvoiceDtlTable = false;
        this.supplierInvoiceMainForm.controls['totalInvAmount'].enable();
      }

    }
  }

  selectedInvoiceStatus(event) {
    this.approveRejectBtn = false;
    if (event === undefined) {
      this.supplierInvoiceMainForm.controls['invoiceStatus'].setValue('');
      this.invoiceStatusPageNumber = 1;
    } else {
      this.supplierInvoiceMainForm.controls['invoiceStatus'].setValue(event.supplierInvoiceStatusName);
    }
  }

  validateEditMode() {
    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        var mode = params.mode;
        primaryId = Number(primaryId);

        if (primaryId <= 0) {
          //button and heading names for add
          this.supplierInvoiceMainForm.controls['invoiceStatus'].setValue('UNMATCHED');
          this.supplierInvoiceMainForm.controls['paymentDueDtDisp'].setValue(new Date());
          this.supplierInvoiceMainForm.controls['invoiceDtDisp'].setValue(new Date());
          this.supplierInvoiceMainForm.controls['invoiceRegDtDisp'].setValue(new Date());
          this.supplierInvoiceMainForm.controls['matchAction'].setValue('RECEIPT');

          this.supplierInvoiceMainForm.controls['invoiceStatus'].disable();

          this.supplierInvoiceMainForm.controls['taxTotal'].disable();
          this.supplierInvoiceMainForm.controls['basicInvAmount'].disable();
          this.supplierInvoiceMainForm.controls['curCd'].disable();
          this.supplierInvoiceMainForm.controls['localTotalAmt'].disable();
          this.supplierInvoiceMainForm.controls['totalInvAmount'].disable();

          this.headingDisplay = "Create";
          this.buttonDisplay = "Submit";
          this.approveBtnFlg = false;
          this.rejectBtnFlg = false;
          //this.addItem();
        } else {
          this.supplierInvoiceHdrId = Number(primaryId);
          this.transactionSource = allWorkflowStatus[allWorkflowStatus.WF_SUPPLIER_INVOICE];
          if (mode === "view") {
            this.viewMode = true;
            this.headingDisplay = "View";
            this.buttonDisplay = "Update";
            this.supplierInvoiceMainForm.disable();
          } else {
            this.viewMode = false;
            this.headingDisplay = "Edit";
            this.buttonDisplay = "Update";
          }

          this.commonService.showSpinner();
          this.commonService.commonGetService('loadSupplierInvoiceDetailedInfo.sams', primaryId).subscribe(
            data => {
              this.supplierInvoiceMainForm.patchValue(data.responseData);


              if (this.supplierInvoiceMainForm.controls.grnType.value == 'MATERIAL') {
                this.enableSupplierInvoiceDtlTable = true;
                this.supplierInvoiceMainForm.controls['totalInvAmount'].disable();
              } else if (this.supplierInvoiceMainForm.controls.grnType.value == 'CONTRACT' || this.supplierInvoiceMainForm.controls.grnType.value == 'SERVICE') {
                this.enableSupplierInvoiceDtlTable = false;
                this.supplierInvoiceMainForm.controls['totalInvAmount'].enable();
              }

              this.approveRejectBtn = true;
              this.itemListinEditMode(data.responseData.supplierInvoiceDtlList);

              if (data.responseData.supplierInvoiceDtlList.length == 0) {
                this.addItem();
              }

              if (this.supplierInvoiceMainForm.controls.invoiceStatus.value === 'APPROVED') {
                this.supplierInvoiceMainForm.disable();
              } else if (this.supplierInvoiceMainForm.controls.invoiceStatus.value === 'MATCHED') {
                this.approveBtnFlg = true;
                this.rejectBtnFlg = true;
              }

              this.documentDataSource = data.responseData.supplierInvoiceDocList;
              this.supplierInvoiceMainForm.controls.supplierInvoiceDocList.setValue(this.documentDataSource);
              this.cusFieldHdrList = data.responseData.poTempDtlList;

              this.commonService.hideSpinner();
              this.getWorkflowApprovalForSupplierInvoice();
            }
          )

        }
      }
    );
  }

  itemListinEditMode(event) {
    this.supplierInvoiceDtlList = this.supplierInvoiceMainForm.get('supplierInvoiceDtlList') as FormArray;
    event.map(obj => {
      const Group = this.formBuilder.group({
        supplierInvoiceDtlId: new FormControl(obj.supplierInvoiceDtlId),
        rcvDtlId: new FormControl(obj.rcvDtlId),
        poNo: new FormControl(obj.poNo),
        receiptNo: new FormControl(obj.receiptNo),
        itemId: new FormControl(obj.itemId),
        itemCd: new FormControl(obj.itemCd),
        itemDesc: new FormControl(obj.itemDesc),
        uomCd: new FormControl(obj.uomCd),
        unitPrice: new FormControl(obj.unitPrice),
        invoiceQty: new FormControl(obj.invoiceQty),
        balInvoiceQty: new FormControl(obj.balInvoiceQty),
        basicInvAmt: new FormControl(obj.basicInvAmt),
        taxId1: new FormControl(obj.taxId1),
        taxCd1: new FormControl(obj.taxCd1),
        taxRate1: new FormControl(obj.taxRate1),
        taxAmt1: new FormControl(obj.taxAmt1),
        taxId2: new FormControl(obj.taxId2),
        taxCd2: new FormControl(obj.taxCd2),
        taxRate2: new FormControl(obj.taxRate2),
        taxAmt2: new FormControl(obj.taxAmt2),
        totalTaxAmt: new FormControl(obj.totalTaxAmt),
        totalInvAmt: new FormControl(obj.totalInvAmt),
        poQty: new FormControl(obj.poQty),
        grnQty: new FormControl(obj.grnQty),
        poUnitPrice: new FormControl(obj.poUnitPrice),
        matchedFlag: new FormControl(obj.matchedFlag),
        assetCode: new FormControl(obj.assetCode),
        assetHdrId: new FormControl(obj.assetHdrId),
        modelName: new FormControl(obj.modelName),
        assetGroupName: new FormControl(obj.assetGroupName),
        serialNo: new FormControl(obj.serialNo),
      });
      this.supplierInvoiceDtlList.push(Group);
    });
  }

  addItem() {

    this.approveRejectBtn = false;
    if (this.supplierInvoiceMainForm.controls.supplierInvoiceDtlList.value.length == 0) {
      this.supplierInvoiceDtlList = this.supplierInvoiceMainForm.get('supplierInvoiceDtlList') as FormArray;
      this.supplierInvoiceDtlList.push(this.createSupplierIinvoiceDtlList());
      this.enableSubmitButton = true;
    } else {
      let rowindex = this.supplierInvoiceMainForm.controls.supplierInvoiceDtlList.value.length - 1;
      let displaySNo = this.supplierInvoiceMainForm.controls.supplierInvoiceDtlList.value.length;
      if (this.supplierInvoiceMainForm.controls.supplierInvoiceDtlList['controls'][rowindex]['controls'].itemId.value > 0) {
        this.supplierInvoiceDtlList = this.supplierInvoiceMainForm.get('poItemList') as FormArray;
        this.supplierInvoiceDtlList.push(this.createSupplierIinvoiceDtlList());
      }
      else if (this.supplierInvoiceMainForm.controls.poItemList['controls'][rowindex]['controls'].description.value) {
        this.supplierInvoiceDtlList.push(this.createSupplierIinvoiceDtlList());
      }
      else {
        this.commonService.openToastWarningMessage("Kindly select the Item " + displaySNo);
      }

    }

  }

  listOfTaxCd1(searchValue) {
    this.scrollTaxCd1sync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfTaxCombo, searchValue.term, '', '', this.limitCount, this.taxCd1PageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.taxCd1PageNumber, this.taxCD1List, data.responseData.comboList)
        this.taxCd1PageNumber = this.getData.pageNumber;
        this.taxCD1List = this.getData.dataList;
        this.scrollTaxCd1sync = false;
      }
    );
  }

  fetchTaxCd1Id(event, index) {
    this.supplierInvoiceMainForm.controls.supplierInvoiceDtlList['controls'][index]['controls'].taxRate1.setValue(event.taxRate);
    this.supplierInvoiceMainForm.controls.supplierInvoiceDtlList['controls'][index]['controls'].taxCd1.setValue(event.taxCode);
    let tax1 = this.supplierInvoiceMainForm.controls.supplierInvoiceDtlList['controls'][index]['controls'].taxCd1.value;
    let tax2 = this.supplierInvoiceMainForm.controls.supplierInvoiceDtlList['controls'][index]['controls'].taxCd2.value;
    if (tax1 == tax2) {
      this.commonService.openToastWarningMessage("Tax 1 and Tax 2 should not be same");
      this.supplierInvoiceMainForm.controls.supplierInvoiceDtlList['controls'][index]['controls'].taxRate1.setValue(0);
      this.supplierInvoiceMainForm.controls.supplierInvoiceDtlList['controls'][index]['controls'].taxCd1.setValue('');
    }
    this.calculation(event, index);
  }

  listOfTaxCd2(searchValue) {
    this.scrollTaxCd2sync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfTaxCombo, searchValue.term, '', '', this.limitCount, this.taxCd2PageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.taxCd2PageNumber, this.taxCD2List, data.responseData.comboList)
        this.taxCd2PageNumber = this.getData.pageNumber;
        this.taxCD2List = this.getData.dataList;
        this.scrollTaxCd2sync = false;
      }
    );
  }

  fetchTaxCd2Id(event, index) {
    this.supplierInvoiceMainForm.controls.supplierInvoiceDtlList['controls'][index]['controls'].taxRate2.setValue(event.taxRate);
    this.supplierInvoiceMainForm.controls.supplierInvoiceDtlList['controls'][index]['controls'].taxCd2.setValue(event.taxCode);
    let tax1Calc = this.supplierInvoiceMainForm.controls.supplierInvoiceDtlList['controls'][index]['controls'].taxCd1.value;
    let tax2Calc = this.supplierInvoiceMainForm.controls.supplierInvoiceDtlList['controls'][index]['controls'].taxCd2.value;
    if (tax1Calc == tax2Calc) {
      this.commonService.openToastWarningMessage("Tax 1 and Tax 2 should not be same");
      this.supplierInvoiceMainForm.controls.supplierInvoiceDtlList['controls'][index]['controls'].taxRate2.setValue(0);
      this.supplierInvoiceMainForm.controls.supplierInvoiceDtlList['controls'][index]['controls'].taxCd2.setValue('');
    }
  }



  loadSupplierComboData(searchValue) {
    this.scrollSuppliersync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.SUPPLIER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchValue.term, '', '',
      this.recordsPerPageForCombo, this.supplierPageNumber, '', partnerRoles).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.supplierPageNumber, this.supplierCombo, data.responseData.comboList)
          this.supplierPageNumber = this.getData.pageNumber;
          this.supplierCombo = this.getData.dataList;
          this.scrollSuppliersync = false;
        }
      );
  }

  setSupplierNameComboValue(event) {
    if (event === undefined) {
      this.supplierInvoiceMainForm.controls['supplierId'].setValue(0);
      this.supplierPageNumber = 1;
    } else {
      this.supplierInvoiceMainForm.controls['supplierId'].setValue(event.businessPartnerId);
      this.supplierInvoiceMainForm.controls['supplierCd'].setValue(event.businessPartnerCode);
      this.supplierInvoiceMainForm.controls['supplierName'].setValue(event.businessPartnerName);

      this.supplierInvoiceMainForm.controls['supplierSiteId'].setValue(0);
      this.supplierInvoiceMainForm.controls['supplierSiteName'].setValue('');
      this.supplierInvoiceMainForm.controls['supplierSiteAddress'].setValue('');
      this.supplierInvoiceMainForm.controls['curCd'].setValue('');
    }
  }



  listOfSupplierApproved(searchValue) {
    this.scrollApprovedSuppliersync = true;
    this.limitCount = (searchValue.term === '' || searchValue.term === undefined || searchValue.term === null) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerSiteCombo, searchValue.term, this.supplierInvoiceMainForm.controls.supplierId.value, '', this.limitCount, this.approvedSupplierPageNumber, '').subscribe(
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
      this.supplierInvoiceMainForm.controls['supplierSiteId'].setValue(0);
      this.approvedSupplierPageNumber = 1;
    } else {
      this.supplierInvoiceMainForm.controls['supplierSiteId'].setValue(event.partnerSiteId);
      this.supplierInvoiceMainForm.controls['supplierSiteName'].setValue(event.partnerSiteName);
      this.supplierInvoiceMainForm.controls['curCd'].setValue(event.partnerSiteCurCd);

      const supplierSiteAddress = event.contactPersonName + '-' + event.partnerSiteAddress1 + '-' + event.partnerSiteArea
      this.supplierInvoiceMainForm.controls['supplierSiteAddress'].setValue(supplierSiteAddress);
    }
  }

  saveFlag: boolean = false;
  uploadSupplierInvoiceFlag: boolean = false;

  save() {
    // Create an array to store poNo of products with acceptQty > poBalQty
    const errorProducts: string[] = [];
 
    // Iterate the grnDtlList FormArray
    if(this.supplierInvoiceMainForm.controls.matchAction.value == 'RECEIPT') {
      for (let i = 0; i < this.supplierInvoiceDtlList.length; i++) {
        const grnListItem = this.supplierInvoiceDtlList.at(i);
  
        // Get values from form controls
        const grnQty = grnListItem.get('grnQty').value;
        const invoiceQty = grnListItem.get('invoiceQty').value;
        const poNo = grnListItem.get('poNo').value;
  
        // Check if acceptQty is greater than poBalQty
        if (invoiceQty > grnQty) {
          // Add the poNo to the errorProducts array
          errorProducts.push(poNo);
        }
      }
    } else if (this.supplierInvoiceMainForm.controls.matchAction.value == 'PO') {
      
    }
 
    // Check if there are products with acceptQty > poBalQty
    if (errorProducts.length > 0) {
      // Display a warning message with the poNo values
      this.commonService.openToastWarningMessage(`Products with PO No ${errorProducts.join(', ')} have InvoiceQty greater than GRNQty`);
    } else {
    this.commonService.showSpinner();
    this.saveFlag = true;
    if (this.saveFlag) {
      this.supplierInvoiceMainForm.controls.supplierInvoiceDocList.setValue(this.documentDataSource);
      this.supplierInvoiceMainForm.controls.poTempDtlList.setValue(this.cusFieldHdrList);
      this.commonService.commonInsertService('saveOrUpdateSupplierInvoice.sams', this.supplierInvoiceMainForm.getRawValue()).subscribe(
        data => {
          this.commonService.hideSpinner();
          if (data.success) {
            console.log(" data.responseData " , data.responseData);
            if(data.responseData > 0) {
              this.commonService.openToastSuccessMessage(data.message);
              this.locationRef.back();
            } else {
              this.commonService.openToastWarningMessage(data.message);
            }
          } else {
            this.commonService.openToastErrorMessage(data.message);
          }
        }
      );
    }
  }
  }

  dialogRef;

  updateSupplierInvoiceAddInfo() {
    this.dialogRef = this.dialog.open(SuppInvAddInfoComponent, {
      height: 'auto',
      width: '600px',
      data: {
        'supplierInvoiceHdr': this.supplierInvoiceMainForm.getRawValue()
      }
    });
    this.dialogRef.disableClose = false;
    this.dialogRef.afterClosed().subscribe(
      data => {

      });
  }

  addSupplierGRN() {
    this.dialogRef = this.dialog.open(AccGrnListComponent, {
      height: 'auto',
      width: '1000px',
      data: {
        'supplierInvoiceHdr': this.supplierInvoiceMainForm.getRawValue()
      }
    });
    this.dialogRef.disableClose = false;
    this.dialogRef.afterClosed().subscribe(
      data => {
        data.forEach(element => {
          this.grnIdsList.push(element.grnId);
        });
        this.fetchListofGrnDtlItems();
        this.supplierInvoiceMainForm.controls['matchAction'].disable();
      });
  }

  addSupplierPO() {
    this.dialogRef = this.dialog.open(AccPoListComponent, {
      height: 'auto',
      width: '1300px',
      data: {
        'supplierInvoiceHdr': this.supplierInvoiceMainForm.getRawValue()
      }
    });
    this.dialogRef.disableClose = false;
    this.dialogRef.afterClosed().subscribe(
      data => {
        let poHdrId = 0;
        let poType = '';
        data.forEach(element => {
          this.poIdsList.push(element.poId);
          poHdrId = element.poId;
          poType = element.poType;
        });
        this.fetchListofPODtlItems();
        this.fetchPOTCInfoDetails(poHdrId);
        this.supplierInvoiceMainForm.controls['matchAction'].disable();
      });
  }

  fetchListofPODtlItems() {
    this.commonService.commonListService(this.assetOptimaServices.listOfPODtlItems, this.poIdsList).subscribe(
      data => {
        if (data.success) {
          console.log("data fetched ", data.responseData.dataList);
          this.supplierInvoiceDtlList = this.supplierInvoiceMainForm.get('supplierInvoiceDtlList') as FormArray;
          data.responseData.dataList.forEach(element => {
            let totalInvAmtTmp = element.poQty * element.unitPrice;
            let itemTotalTaxAmt = Number(element.taxAmt1) + Number(element.taxAmt2) + Number(element.taxAmt3);
            totalInvAmtTmp  = totalInvAmtTmp + itemTotalTaxAmt;
            const Group = this.formBuilder.group({
              poNo: new FormControl(element.poNo),
              poId: new FormControl(element.poId),
              poLineNo: new FormControl(element.poLineNo),
              poDtlId: new FormControl(element.poDtlId),
              itemId: new FormControl(element.itemId),
              itemCd: new FormControl(element.itemName),
              itemDesc: new FormControl(element.itemDesc),
              poQty: new FormControl(element.poQty),
              invoiceQty: new FormControl(element.poQty),
              balInvoiceQty: new FormControl('0'),
              unitPrice: new FormControl(element.unitPrice),
              poUnitPrice: new FormControl(element.unitPrice),
              basicInvAmt: Number(element.poQty * element.unitPrice),
              taxCd1: new FormControl(element.taxCd1),
              taxRate1: new FormControl(element.taxRate1),
              taxAmt1: new FormControl(element.taxAmt1),
              taxCd2: new FormControl(element.taxCd2),
              taxRate2: new FormControl(element.taxRate2),
              taxAmt2: new FormControl(element.taxAmt2),
              totalTaxAmt: new FormControl(itemTotalTaxAmt),
              totalInvAmt: Number(totalInvAmtTmp),
              uomCd: new FormControl(element.uom),
              assetCode: new FormControl(element.assetCode),
              assetHdrId: new FormControl(element.assetHdrId),
              modelName: new FormControl(element.modelName),
              assetGroupName: new FormControl(element.assetGroupName),
              serialNo: new FormControl(element.serialNo),
              receiptNo : new FormControl(''),
              matchedFlag : new FormControl('Y'),
            });
            this.supplierInvoiceDtlList.push(Group);
          });

          this.calculationHdrLevel();
          this.poIdsList = [];
        } else {

        }
      }, error => {

      }
    );
  }

  cusFieldHdr: PurchaseTermsTemplateDtl;
  cusFieldHdrList: PurchaseTermsTemplateDtl[];
  customFieldsLength: number=0;

  fetchPOTCInfoDetails(poHdrId) {
    this.commonService.commonGetService('fetchPOTCInfoHdrId.sams', poHdrId).subscribe(
      data => {
        if (data.success) {
          console.log("dtl list info ", data.responseData);
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
  }

  fetchListofGrnDtlItems() {
    this.commonService.commonListService(this.assetOptimaServices.fetchGRNDtlItems, this.grnIdsList).subscribe(
      data => {
        if (data.success) {
          this.supplierInvoiceDtlList = this.supplierInvoiceMainForm.get('supplierInvoiceDtlList') as FormArray;
          data.responseData.dataList.forEach(element => {
            let matchedFlagTmp = 'N';

            if (Number(element.poUnitPrice) == Number(element.unitPrice) && Number(element.poQty) == Number(element.acceptQty)) {
              matchedFlagTmp = 'Y';
            }

            let totalTaxAmtTmp = Number(element.taxAmt1) + Number(element.taxAmt2);
            let totalInvAmtTmp = Number(element.acceptQty) * Number(element.unitPrice);
            totalInvAmtTmp = totalInvAmtTmp + totalTaxAmtTmp;

            const Group = this.formBuilder.group({
              poNo: new FormControl(element.poNo),
              receiptNo: new FormControl(element.doNo),
              rcvDtlId: new FormControl(element.grnDtlId),
              itemId: new FormControl(element.itemId),
              itemCd: new FormControl(element.itemName),
              itemDesc: new FormControl(element.description),
              poQty: new FormControl(element.poQty),
              grnQty: new FormControl(element.acceptQty),
              invoiceQty: new FormControl(element.acceptQty),
              balInvoiceQty: new FormControl('0'),
              poUnitPrice: new FormControl(element.poUnitPrice),
              unitPrice: new FormControl(element.unitPrice),
              basicInvAmt: Number(element.acceptQty * element.unitPrice),
              taxCd1: new FormControl(element.taxCd1),
              taxRate1: new FormControl(element.taxRate1),
              taxAmt1: new FormControl(element.taxAmt1),
              taxCd2: new FormControl(element.taxCd2),
              taxRate2: new FormControl(element.taxRate2),
              taxAmt2: new FormControl(element.taxAmt2),
              totalTaxAmt: new FormControl(totalTaxAmtTmp),
              totalInvAmt: new FormControl(totalInvAmtTmp),
              uomCd: new FormControl(element.uom),
              matchedFlag: new FormControl(matchedFlagTmp),
              assetCode: new FormControl(element.assetCode),
              assetHdrId: new FormControl(element.assetHdrId),
              modelName: new FormControl(element.modelName),
              assetGroupName: new FormControl(element.assetGroupName),
              serialNo: new FormControl(element.serialNo)
            });
            this.supplierInvoiceDtlList.push(Group);
          });

          this.calculationHdrLevel();
          this.grnIdsList = [];
        } else {

        }
      }, error => {

      }
    );
  }

  calculationLocalAmt() {
    let exchangeRtTmp = this.supplierInvoiceMainForm.controls['exchRt'].value;
    let invTotalAmtTmp = this.supplierInvoiceMainForm.controls['totalInvAmount'].value;
    this.supplierInvoiceMainForm.controls['localTotalAmt'].setValue(Number(invTotalAmtTmp) * (exchangeRtTmp));
  }

  calculationHdrLevel() {

    let supplierInvoiceDtlTemp = this.supplierInvoiceMainForm.controls.supplierInvoiceDtlList.value;
    let invTotalAmtTmp = 0;
    let invTotalBasicAmtTmp = 0;
    let invTaxAmtTmp = 0;
    let itemLevelMatchFlag = 'N';
    for (let i = 0; i < supplierInvoiceDtlTemp.length; i++) {
      console.log("INVOICE AMT FROM LIST", supplierInvoiceDtlTemp[i].rcvDtlId);
      invTotalAmtTmp = Number(invTotalAmtTmp) + Number(supplierInvoiceDtlTemp[i].totalInvAmt);
      invTaxAmtTmp = Number(invTaxAmtTmp) + Number(supplierInvoiceDtlTemp[i].totalTaxAmt);

      invTotalBasicAmtTmp = Number(invTotalBasicAmtTmp) + Number(supplierInvoiceDtlTemp[i].basicInvAmt);
      if (supplierInvoiceDtlTemp[i].matchedFlag == 'Y') {
        itemLevelMatchFlag = 'Y';
      } else {
        itemLevelMatchFlag = 'N';
      }
    }
    this.supplierInvoiceMainForm.controls['basicInvAmount'].setValue(invTotalBasicAmtTmp);
    this.supplierInvoiceMainForm.controls['taxTotal'].setValue(invTaxAmtTmp);

    this.supplierInvoiceMainForm.controls['totalInvAmount'].setValue(invTotalAmtTmp);
    let exchangeRtTmp = this.supplierInvoiceMainForm.controls['exchRt'].value;
    this.supplierInvoiceMainForm.controls['localTotalAmt'].setValue(Number(invTotalAmtTmp) * (exchangeRtTmp));


    let tranChargesTmp = this.supplierInvoiceMainForm.controls['tranCharges'].value;
    let miscChargesTmp = this.supplierInvoiceMainForm.controls['miscCharges'].value;

    let totalAmtTmp = Number(tranChargesTmp) + Number(miscChargesTmp) + Number(invTotalAmtTmp);
    this.supplierInvoiceMainForm.controls['totalInvAmount'].setValue(totalAmtTmp);
    this.supplierInvoiceMainForm.controls['localTotalAmt'].setValue(Number(totalAmtTmp) * (exchangeRtTmp));

    if (itemLevelMatchFlag == 'Y') {
      this.supplierInvoiceMainForm.controls['invoiceStatus'].setValue('MATCHED');
    } else {
      this.supplierInvoiceMainForm.controls['invoiceStatus'].setValue('UNMATCHED');
    }

  }

  calculation(value, index) {

    var poUnitPrice = this.supplierInvoiceMainForm.controls.supplierInvoiceDtlList['controls'][index]['controls'].poUnitPrice.value;
    var poQty = this.supplierInvoiceMainForm.controls.supplierInvoiceDtlList['controls'][index]['controls'].poQty.value;

    var unitPrice = this.supplierInvoiceMainForm.controls.supplierInvoiceDtlList['controls'][index]['controls'].unitPrice.value;
    var invoiceQty = this.supplierInvoiceMainForm.controls.supplierInvoiceDtlList['controls'][index]['controls'].invoiceQty.value;
    var taxRate1 = this.supplierInvoiceMainForm.controls.supplierInvoiceDtlList['controls'][index]['controls'].taxRate1.value;
    var taxRate2 = this.supplierInvoiceMainForm.controls.supplierInvoiceDtlList['controls'][index]['controls'].taxRate2.value;

    var basicAmt = (unitPrice * invoiceQty);
    this.supplierInvoiceMainForm.controls.supplierInvoiceDtlList['controls'][index]['controls'].basicInvAmt.setValue(basicAmt);
    var taxAmt1 = (basicAmt * taxRate1) / 100;
    var taxAmt2 = (basicAmt * taxRate2) / 100;

    this.supplierInvoiceMainForm.controls.supplierInvoiceDtlList['controls'][index]['controls'].taxAmt1.setValue(taxAmt1.toFixed(2));
    this.supplierInvoiceMainForm.controls.supplierInvoiceDtlList['controls'][index]['controls'].taxAmt2.setValue(taxAmt2.toFixed(2));

    var totalAmtC = (basicAmt + taxAmt1 + taxAmt2);
    var totalTaxAmtC = (taxAmt1 + taxAmt2);
    console.log("totalTaxAmtC", totalTaxAmtC);
    this.supplierInvoiceMainForm.controls.supplierInvoiceDtlList['controls'][index]['controls'].totalTaxAmt.setValue(totalTaxAmtC.toFixed(2));
    this.supplierInvoiceMainForm.controls.supplierInvoiceDtlList['controls'][index]['controls'].totalInvAmt.setValue(totalAmtC.toFixed(2));

    let matchedFlagTmp = 'N';

    if (Number(poUnitPrice) == Number(unitPrice) && Number(poQty) == Number(invoiceQty)) {
      matchedFlagTmp = 'Y';
    }
    this.supplierInvoiceMainForm.controls.supplierInvoiceDtlList['controls'][index]['controls'].matchedFlag.setValue(matchedFlagTmp);

    this.calculationHdrLevel();
  }

  getWorkflowApprovalForSupplierInvoice() {
    this.commonService.commonGetService('getWorkflowForId.sams', this.supplierInvoiceMainForm.controls.supplierInvoiceHdrId.value,
      this.userSessionService.getUserEmpId(),
      allWorkflowStatus[allWorkflowStatus.WF_SUPPLIER_INVOICE], this.userSessionService.getUserOrgId()).subscribe(
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

  supplierInvoiceWorkflowApproval(status) {
    let result;
    let selectedSupplierInvoiceList = [];
    selectedSupplierInvoiceList.push({ ...this.supplierInvoiceMainForm.value, approvalId: this.approvalId });
    if (status) {
      result = this.commonService.commonWorkflowService(allWorkflowStatus[allWorkflowStatus.WF_SUPPLIER_INVOICE], selectedSupplierInvoiceList, " Supplier Invoice");
    } else {
      result = this.commonService.rejectApprove(allWorkflowStatus[allWorkflowStatus.WF_SUPPLIER_INVOICE], selectedSupplierInvoiceList, " Supplier Invoice");
    }
    result.then(data => {
      if (data) {
        this.commonService.hideSpinner();
        this.closeSupplierInvoice();
      }
    })

  }

  closeSupplierInvoice() {
    this.router.navigate(['/home/accounts/supplierInvoice']);
  }

  clear() {
    this.supplierInvoiceMainForm.reset();
    this.supplierInvoiceMainForm.updateValueAndValidity();

    this.ngOnInit();
  }

  documentAddEdit() {
    let dialogRef = this.dialog.open(SuppInvDocInfoComponent, {
      height: 'auto',
      width: '500px',
      data: {
        'supplierInvoiceHdrId': this.supplierInvoiceMainForm.controls.supplierInvoiceHdrId.value
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        this.fetchListOfSupplierInvoiceDocs();
        this.commonService.openToastSuccessMessage("Record Added Successfully.");
      });
  }

  fetchListOfSupplierInvoiceDocs() {
    this.commonService.commonGetService('loadSupplierInvoiceDoc.sams', this.supplierInvoiceMainForm.controls.supplierInvoiceHdrId.value).subscribe(
      (data) => {

        this.documentDataSource = [];

        this.documentDataSource = data.responseData;
        this.supplierInvoiceMainForm.controls.supplierInvoiceDocList.setValue(this.documentDataSource);
      }
    )
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
          this.commonService.commonGetService('deleteSupplierInvoiceDoc.sams', deleteid).subscribe(
            data => {
              if (data.success) {
                this.commonService.openToastSuccessMessage(data.message);
                this.fetchListOfSupplierInvoiceDocs();
              } else {
                this.commonService.openToastErrorMessage(data.message);
              }
            }
          );
          // }
        }
      });
  }

  delete(index){
    const supplierInvoiceDtlList = this.supplierInvoiceMainForm.get('supplierInvoiceDtlList') as FormArray;
    supplierInvoiceDtlList.removeAt(index);
  }
}
