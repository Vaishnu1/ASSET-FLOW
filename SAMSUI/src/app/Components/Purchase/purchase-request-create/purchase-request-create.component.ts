import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { Location } from '@angular/common';
import { PurchaseSuppSitePopUpComponent } from '../purchase-supp-site-pop-up/purchase-supp-site-pop-up.component';
import { TaxCalcforPurchaseComponent } from '../tax-calcfor-purchase/tax-calcfor-purchase.component';
import { ViewAssetInfoDetailsComponent } from '../view-asset-info-details/view-asset-info-details.component';
import { UserSessionService } from '../../../Services/user-session-service/user-session.service';
import { ModuleAccessModel } from '../../../Model/base/moduleAccess';
import { getData } from 'src/app/Model/common/fetchListData';
import { allBusinessPartnerRoles } from '../../../Constants/AllStatusConstants';
import { PrItemAddComponent } from '../pr-item-add/pr-item-add.component';
import { PrNewItemAddComponent } from '../pr-new-item-add/pr-new-item-add.component';
import { allWorkflowStatus } from '../../../Constants/AllStatusConstants';
import { RejectConfirmationComponent } from '../../Common-components/reject-confirmation/reject-confirmation.component';
import { ConfirmConfirmationComponent } from '../../Common-components/confirm-confirmation/confirm-confirmation.component';
import { PrPoConvertInfoComponent } from '../purchase-request-list/pr-po-convert-info/pr-po-convert-info.component';
import { CancelConfirmationComponent } from '../../Common-components/cancel-confirmation/cancel-confirmation/cancel-confirmation.component';
import { UpdateApproveConfirmationComponent } from '../../Common-components/update-approve-confirmation/update-approve-confirmation.component';


@Component({
  selector: 'app-purchase-request-create',
  templateUrl: './purchase-request-create.component.html',
  styleUrls: ['./purchase-request-create.component.css']
})
export class PurchaseRequestCreateComponent implements OnInit {
  @ViewChild('focusLocationName') focusLocationName: ElementRef;
  prMainForm: FormGroup;

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

  serviceEngineer1PageNumber: number;
  serviceEngineer1Combo: any = [];
  scrollsyncServiceEngineer1: boolean = false;

  assetCodePageNumber: number;
  assetCodeCombo: any = [];
  scrollsyncAssetCode: boolean = false;

  scrollSRNosync: boolean = false;
  srNoCombo: any = [];
  srNoPageNumber: number;

  recordsPerPageForCombo: string;
  limitCount: any;

  poItemList: FormArray;

  accessoriesList: any = [];
  skipCount: number;

  scrollApprovedSuppliersync: boolean = false;
  approvedSupplierPageNumber: number;
  supplierLocationList: any = [];

  scrollSuppliersync: boolean = false;
  supplierPageNumber: number;
  supplierList: any = [];

  scrollTaxCd1sync: boolean = false;
  taxCd1PageNumber: number;
  taxCD1List: any = [];

  scrollTaxCd2sync: boolean = false;
  taxCd2PageNumber: number;
  taxCD2List: any = [];

  scrollTaxCd3sync: boolean = false;
  taxCd3PageNumber: number;
  taxCD3List: any = [];

  scrollPRReasonsync: boolean = false;
  prReasonPageNumber: number;
  prReasonList: any = [];

  scrollorderReasonsync: boolean = false;
  orderReasonPageNumber: number;
  orderReasonList: any = [];

  enableSubmitButton: boolean = false;
  unmatched: boolean = false;
  unmatchedConfirm: boolean = false;
  sourcingApproval: boolean = false;
  rmApproval: boolean = false;
  location: any;

  scrollPurchaseUsagesync: boolean = false;
  purchaseUsagePageNumber: number;
  purchaseUsageCombo: any = [];

  //PERMISSIONS 
  poModelAccessModule: ModuleAccessModel;
  prModelAccessModule: ModuleAccessModel;

  getData: getData;
  scrollItemsync: boolean = false;


  scrollPurchaseTypesync: boolean = false;
  purchaseTypePageNumber: number;
  purchaseTypeCombo: any = [];

  prTypeDisp: string;

  // used for workflow process
  public poReqId: any;
  public transactionSource: any;

  selectedContractItems: number = -1;
  public notesEnable: Boolean = false;
  public notesText: string = 'Kindly fill in all the mandatory data.';

  constructor(private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private activatedRoute: ActivatedRoute,
    private assetOptimaConstants: AssetOptimaConstants,
    private formBuilder: FormBuilder,
    private locationRef: Location,
    private dialog: MatDialog,
    private readonly userSessionService: UserSessionService,
    private router: Router) {
    this.locationNamePageNumber = 1;
    this.serviceEngineer1PageNumber = 1;
    this.assetCodePageNumber = 1;
    this.srNoPageNumber = 1;
    this.skipCount = 1;
    this.approvedSupplierPageNumber = 1;
    this.supplierPageNumber = 1;
    this.taxCd1PageNumber = 1;
    this.taxCd2PageNumber = 1;
    this.prReasonPageNumber = 1;
    this.orderReasonPageNumber = 1;
    this.purchaseTypePageNumber = 1;
    this.purchaseUsagePageNumber = 1;
    this.getData = new getData();
  }

  ngOnInit() {



    this.poModelAccessModule = this.userSessionService.getUserGroupAccess()['GROUPACCESS_PURCHASE_ORDER'];
    this.prModelAccessModule = this.userSessionService.getUserGroupAccess()['GROUPACCESS_PURCHASE_REQUEST'];

    this.sourcingApproval = this.assetOptimaConstants.sourcingApproved;
    this.rmApproval = this.assetOptimaConstants.rmApproved;
    // document.getElementById('commonFooter').style.display = 'none';
    this.prMainForm = new FormGroup({
      orgId: new FormControl(0),
      locationName: new FormControl('', [Validators.required]),
      locationId: new FormControl(0),
      poReqId: new FormControl(0),
      poReqNo: new FormControl(''),
      poReqDt: new FormControl(''),
      poReqDtDisp: new FormControl('', [Validators.required]),
      poReqStatus: new FormControl(''),
      totalBasicAmt: new FormControl(0.00),
      totalTaxAmt: new FormControl(0.00),
      grandTotal: new FormControl(0.00),
      localGrandTotal: new FormControl(0.00),
      remarks: new FormControl(''),
      assetHdrId: new FormControl(0),
      assetCode: new FormControl(null),
      srId: new FormControl(0),
      srNo: new FormControl(null),
      prType: new FormControl('', [Validators.required]),
      prReason: new FormControl(''),
      prUsage: new FormControl('', Validators.required),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      pageNumber: new FormControl(''),
      recordsPerPage: new FormControl(''),
      poItemList: this.formBuilder.array([]),
      cancelReason: new FormControl(''),
      rejectReason: new FormControl(''),
      prWithoutUnitPrice: new FormControl(false),
      prWithoutSupplier: new FormControl(false),
      approvalId: new FormControl(0),
      workflowProcessStatusId: new FormControl(0),
    });

    this.prMainForm.controls.srId.setValue(localStorage.getItem('srId'));
    if (localStorage.getItem('srId') == null || localStorage.getItem('srId') == undefined) {
      this.prMainForm.controls.srId.setValue(0);
    }
    this.prMainForm.controls.srNo.setValue(localStorage.getItem('srNumber'));

    this.prMainForm.controls.assetHdrId.setValue(localStorage.getItem('assetHdrId'));
    if (localStorage.getItem('assetHdrId') == null || localStorage.getItem('assetHdrId') == undefined) {
      this.prMainForm.controls.assetHdrId.setValue(0);
    }

    this.prMainForm.controls.assetCode.setValue(localStorage.getItem('assetCode'));
    this.prMainForm.controls['locationName'].setValue(this.userSessionService.getUserLocationName());
    this.prMainForm.controls['locationId'].setValue(this.userSessionService.getUserLocationId());

    this.locationNamePageNumber = 1;
    this.purchaseTypePageNumber = 1;
    this.purchaseUsagePageNumber = 1;
    this.validateEditMode();

    this.prMainForm.valueChanges.subscribe(() => {
      const poItemList = this.prMainForm.controls.poItemList.value;

      const hasInvalidItem = poItemList.some(item =>
        !item.supplierId ||
        !item.supplierName ||
        item.unitPrice === 0 ||
        item.unitPrice == null
      );
      if (hasInvalidItem) {
        this.notesEnable = true;
      } else {
        this.notesEnable = false;
      }
    });

    //this.commonService.setFormFocus(this.focusLocationName);
  }

  createItemList(): FormGroup {
    return this.formBuilder.group({
      poReqDtlId: new FormControl(0),
      itemId: new FormControl(0),
      itemName: new FormControl(''),
      supplierId: new FormControl(0),
      supplierName: new FormControl(''),
      supplierSiteId: new FormControl(0),
      supplierSiteName: new FormControl(''),
      description: new FormControl(''),
      makerPartCode: new FormControl(''),
      curCd: new FormControl(''),
      uomCode: new FormControl(''),
      unitPrice: new FormControl(0),
      poReqQty: new FormControl(0),
      basicAmt: new FormControl(0),
      taxId1: new FormControl(0),
      taxCd1: new FormControl(''),
      taxRate1: new FormControl(0),
      taxAmt1: new FormControl(0),
      taxId2: new FormControl(0),
      taxCd2: new FormControl(''),
      taxRate2: new FormControl(0),
      taxAmt2: new FormControl(0),
      taxId3: new FormControl(0),
      taxCd3: new FormControl(''),
      taxRate3: new FormControl(0),
      taxAmt3: new FormControl(0),
      totalAmt: new FormControl(0),
      itemTotalTaxAmt: new FormControl(0),
      itemCategoryName: new FormControl(''),
      itemTypeName: new FormControl(''),
      itemCategoryId: new FormControl(0),
      itemTypeId: new FormControl(0),
      itemDetailsDisp: new FormControl(''),
      taxRateTemp1: new FormControl(''),
      taxRateTemp2: new FormControl(''),
      unmatchedFlag: new FormControl(false),
    });
  }

  ngOnDestroy() {
    localStorage.setItem('srId', '');
    localStorage.setItem('srNumber', '');
    localStorage.setItem('assetHdrId', '');
    localStorage.setItem('assetCode', '');

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
      this.prMainForm.controls['locationId'].setValue(0);
      this.locationNamePageNumber = 1;
    } else {
      this.prMainForm.controls['locationId'].setValue(event.locationId);
    }
  }

  backTOPRScreen() {
    this.locationRef.back();
  }

  validateEditMode() {
    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        var mode = params.mode;
        primaryId = Number(primaryId);
        if (primaryId <= 0) {
          this.poReqId = Number(0);
          //button and heading names for add
          this.prMainForm.controls['poReqStatus'].setValue('REQUEST RAISED');
          this.prMainForm.controls['poReqDtDisp'].setValue(new Date());

          this.prMainForm.controls.poReqStatus.disable();
          this.prMainForm.controls.poReqNo.disable();
          this.prMainForm.controls.createdBy.disable();

          this.prMainForm.controls.totalBasicAmt.disable();
          this.prMainForm.controls.totalTaxAmt.disable();
          this.prMainForm.controls.grandTotal.disable();
          this.prMainForm.controls.localGrandTotal.disable();

          //this.prMainForm.controls.prType.setValue("MATERIAL");
          //this.prTypeDisp = 

          this.prMainForm.controls['createdBy'].setValue(this.userSessionService.getUserName());

          this.headingDisplay = "Create";
          this.buttonDisplay = "Submit";
          this.approveBtnFlg = true;
          this.rejectBtnFlg = true;
          // //this.addItem();
          // if(localStorage.getItem('previousRoute').startsWith('/home/itemCreate')){
          //   this.prMainForm.patchValue(JSON.parse(localStorage.getItem('localprMainForm'))); 
          //   this.itemListinEditMode(this.prMainForm.controls.poItemList.value);                       
          //   localStorage.removeItem('localprMainForm');
          //   localStorage.removeItem('previousRoute');
          // }  
        } else {

          this.poReqId = Number(primaryId);
          this.transactionSource = allWorkflowStatus[allWorkflowStatus.PR];

          if (mode === "view") {
            this.viewMode = true;
            this.headingDisplay = "View";
            this.buttonDisplay = "Update";
            this.prMainForm.disable();
          }
          else {
            this.viewMode = false;
            this.headingDisplay = "Edit";
            this.buttonDisplay = "Update";
          }

          this.prMainForm.controls.poReqStatus.disable();
          this.prMainForm.controls.poReqNo.disable();
          this.prMainForm.controls.createdBy.disable();
          this.prMainForm.controls.locationName.disable();
          this.prMainForm.controls.totalBasicAmt.disable();
          this.prMainForm.controls.totalTaxAmt.disable();
          this.prMainForm.controls.grandTotal.disable();
          this.prMainForm.controls.prType.disable();

          this.commonService.showSpinner();
          this.commonService.commonGetService('fetchPurchaseRequestInfo.sams', primaryId).subscribe(
            data => {
              this.prMainForm.patchValue(data.responseData);
              this.approveRejectBtn = true;
              this.itemListinEditMode(data.responseData.poItemList);
              this.prTypeDisp = data.responseData.prType;
              this.getWorkflowApprovalForPR();

              this.commonService.hideSpinner();

              if (this.prMainForm.controls.poReqStatus.value === 'Approved') {
                this.prMainForm.disable();
              }
              else if (this.prMainForm.controls.poReqStatus.value === 'REQUEST RAISED') {
                this.approveBtnFlg = false;
                this.rejectBtnFlg = false;
              }
            }
          )
        }
      }
    );
  }

  itemListinEditMode(event) {
    let isNewItem = false;
    this.poItemList = this.prMainForm.get('poItemList') as FormArray;
    event.map(obj => {
      const Group = this.formBuilder.group({
        newItemFlag: new FormControl(obj.newItemFlag),
        poReqDtlId: new FormControl(obj.poReqDtlId),
        poReqId: new FormControl(obj.poReqId),
        prLineNo: new FormControl(obj.prLineNo),

        supplierId: new FormControl(obj.supplierId),
        supplierName: new FormControl(obj.supplierName),
        supplierSiteId: new FormControl(obj.supplierSiteId),
        supplierSiteName: new FormControl(obj.supplierSiteName),

        itemId: new FormControl(obj.itemId),
        itemName: new FormControl(obj.itemName),
        itemDesc: new FormControl(obj.itemDesc),
        uomCode: new FormControl(obj.uomCode),
        manufacturerPartNo: new FormControl(obj.manufacturerPartNo),

        poReqQty: new FormControl(obj.poReqQty),
        unitPrice: new FormControl(obj.unitPrice),
        needByDt: new FormControl(obj.needByDt),
        needByDtDisp: new FormControl(obj.needByDtDisp),


        curCd: new FormControl(obj.curCd),
        basicAmt: new FormControl(obj.basicAmt),
        taxId1: new FormControl(obj.taxId1),
        taxCd1: new FormControl(obj.taxCd1),
        taxRate1: new FormControl(obj.taxRate1),
        taxAmt1: new FormControl(obj.taxAmt1),
        taxId2: new FormControl(obj.taxId2),
        taxCd2: new FormControl(obj.taxCd2),
        taxRate2: new FormControl(obj.taxRate2),
        taxAmt2: new FormControl(obj.taxAmt2),
        taxId3: new FormControl(obj.taxId3),
        taxCd3: new FormControl(obj.taxCd3),
        taxRate3: new FormControl(obj.taxRate3),
        taxAmt3: new FormControl(obj.taxAmt3),
        totalAmt: new FormControl(obj.totalAmt),
        itemTotalTaxAmt: new FormControl(obj.itemTotalTaxAmt),

        itemCategoryName: new FormControl(obj.itemCategoryName),
        itemTypeName: new FormControl(obj.itemTypeName),
        itemCategoryId: new FormControl(0),
        itemTypeId: new FormControl(obj.itemTypeId),
        shipTo: new FormControl(0),
        itemDetailsDisp: new FormControl(obj.itemCategoryName + '-' + obj.itemTypeName),
        unApprovedItemTO: new FormControl(obj.unApprovedItemTO),

        exchRate: new FormControl(obj.exchRate),
        localTotalAmt: new FormControl(obj.localTotalAmt),
        partnerSiteAddress: new FormControl(obj.partnerSiteAddress),
        remarks: new FormControl(obj.remarks)

      });
      this.poItemList.push(Group);

      if (obj.newItemFlag) {
        isNewItem = true;
      }
    });
    if (isNewItem) {
      this.commonService.openToastWarningMessage("UnApproved item, kindly register the item");
    }
  }

  clear() {
    this.prMainForm.reset();
    this.prMainForm.updateValueAndValidity();
    this.ngOnInit();
  }

  loadServiceEngineer1ComboData(searchValue) {
    this.scrollsyncServiceEngineer1 = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllEmployeeForOrgCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.serviceEngineer1PageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.serviceEngineer1PageNumber, this.serviceEngineer1Combo, data.responseData.comboList)
          this.serviceEngineer1PageNumber = this.getData.pageNumber;
          this.serviceEngineer1Combo = this.getData.dataList;
          this.scrollsyncServiceEngineer1 = false;
        }
      );
  }

  selectedServiceEngineerList1(event) {
    this.approveRejectBtn = false;
    if (event === undefined) {
      this.prMainForm.controls['requestedById'].setValue(0);
      this.prMainForm.controls['requestedBy'].setValue('');
      this.serviceEngineer1PageNumber = 1;
    } else {
      this.prMainForm.controls['requestedById'].setValue(event.employeeId);
      this.prMainForm.controls['requestedBy'].setValue(event.employeeFirstName);
    }
  }

  loadAssetCodeComboData(searchValue) {
    this.scrollsyncAssetCode = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetCodeCombo.sams', searchValue.term, 0,
      0, this.recordsPerPageForCombo, this.assetCodePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetCodePageNumber, this.assetCodeCombo, data.responseData.comboList)
          this.assetCodePageNumber = this.getData.pageNumber;
          this.assetCodeCombo = this.getData.dataList;
          this.scrollsyncAssetCode = false;
        }
      );
  }

  selectedAssetCodeData(event) {
    this.approveRejectBtn = false;
    if (event === undefined) {
      this.prMainForm.controls['assetCode'].setValue('');
      this.prMainForm.controls['assetHdrId'].setValue(0);
      this.assetCodePageNumber = 1;
    } else {
      this.prMainForm.controls['assetCode'].setValue(event.assetCode);
      this.prMainForm.controls['assetHdrId'].setValue(event.assetHdrId);
    }
  }

  loadServiceRequestNumbers(searchValue) {
    this.scrollSRNosync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllSRNoForCombo, searchValue.term, this.prMainForm.controls['assetCode'].value > 0 ? this.prMainForm.controls['assetCode'].value : 0,
      this.prMainForm.controls.locationId.value > 0 ? this.prMainForm.controls.locationId.value : 0, this.limitCount, this.srNoPageNumber).subscribe(
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
    this.approveRejectBtn = false;
    if (event === undefined) {
      this.prMainForm.controls['srId'].setValue(0);
      this.prMainForm.controls['srNo'].setValue('');
      this.prMainForm.controls['assetHdrId'].setValue(0);
      this.prMainForm.controls['assetCode'].setValue('');
      this.prMainForm.controls['assetCode'].enable();
      this.prMainForm.controls['prType'].setValue('');
      this.prMainForm.controls['prType'].enable();
      this.prMainForm.controls['prUsage'].setValue('');
      this.prMainForm.controls['prUsage'].enable();
      this.srNoPageNumber = 1;
    } else {
      this.prMainForm.controls['srId'].setValue(event.srId);
      this.prMainForm.controls['srNo'].setValue(event.srNo);
      this.prMainForm.controls['assetHdrId'].setValue(event.assetHdrId);
      this.prMainForm.controls['assetCode'].setValue(event.assetCode);
      this.prMainForm.controls['assetCode'].disable();
      // this.prMainForm.controls['prType'].setValue('SERVICE');
      // this.prMainForm.controls['prType'].disable();
      this.prMainForm.controls['prUsage'].setValue('SERVICE REQUEST');
      this.prMainForm.controls['prUsage'].disable();

    }
  }

  listOfItem(searchValue) {
    this.scrollItemsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllItemCombo, searchValue.term, '', '', this.limitCount, this.skipCount, '').subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.skipCount, this.accessoriesList, data.responseData.comboList)
        this.skipCount = this.getData.pageNumber;
        this.accessoriesList = this.getData.dataList;
        this.scrollItemsync = false;
      }
    );
  }

  itemName: any = [];

  getAccessoriesComboValue(event, index) {
    this.approveRejectBtn = false;
    let insertFlag: boolean = false;
    let poItemList = this.prMainForm.controls.poItemList.value;

    if (event === undefined) {
      this.prMainForm.controls.poItemList['controls'][index]['controls'].uomCode.setValue('');
      this.prMainForm.controls.poItemList['controls'][index]['controls'].itemId.setValue(0);
      this.prMainForm.controls.poItemList['controls'][index]['controls'].itemName.setValue('');
      this.prMainForm.controls.poItemList['controls'][index]['controls'].description.setValue('');
      this.prMainForm.controls.poItemList['controls'][index]['controls'].makerPartCode.setValue('');
      this.prMainForm.controls.poItemList['controls'][index]['controls'].itemCategoryName.setValue('');
      this.prMainForm.controls.poItemList['controls'][index]['controls'].itemTypeName.setValue('');
      this.prMainForm.controls.poItemList['controls'][index]['controls'].itemCategoryId.setValue(0);
      this.prMainForm.controls.poItemList['controls'][index]['controls'].itemTypeId.setValue(0);
      const valueDisp = "";
      this.prMainForm.controls.poItemList['controls'][index]['controls'].itemDetailsDisp.setValue(valueDisp);
    }
    else {
      if (poItemList.length > 1) {
        const duplicates = [];
        for (let i = 0; i < poItemList.length; i++) {
          if (poItemList[i].itemName === event.itemMasterName) {
            duplicates.push(poItemList[i].itemMasterName)
            if (duplicates.length > 1) {
              this.commonService.openToastWarningMessage("Selected Item is already exist");
              insertFlag = false;
            }
          } else {
            insertFlag = true;
          }
        }

      } else {
        insertFlag = true;
      }
    }

    if (insertFlag) {
      this.prMainForm.controls.poItemList['controls'][index]['controls'].unmatchedFlag.setValue(false);
      this.prMainForm.controls.poItemList['controls'][index]['controls'].uomCode.setValue(event.uomCode);
      this.prMainForm.controls.poItemList['controls'][index]['controls'].itemId.setValue(event.itemMasterId);
      this.prMainForm.controls.poItemList['controls'][index]['controls'].itemName.setValue(event.itemMasterName);
      this.prMainForm.controls.poItemList['controls'][index]['controls'].description.setValue(event.itemMasterDesc);
      this.prMainForm.controls.poItemList['controls'][index]['controls'].makerPartCode.setValue(event.oemCode);
      this.prMainForm.controls.poItemList['controls'][index]['controls'].itemCategoryName.setValue(event.itemCategoryName);
      this.prMainForm.controls.poItemList['controls'][index]['controls'].itemTypeName.setValue(event.itemTypeName);
      this.prMainForm.controls.poItemList['controls'][index]['controls'].itemCategoryId.setValue(event.itemCategoryId);
      this.prMainForm.controls.poItemList['controls'][index]['controls'].itemTypeId.setValue(event.itemTypeId);
      let valueDisp = event.itemCategoryName + "-" + event.itemTypeName;
      this.prMainForm.controls.poItemList['controls'][index]['controls'].itemDetailsDisp.setValue(valueDisp);
    }

  }

  listOfSupplier(searchValue) {
    this.scrollSuppliersync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.SUPPLIER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchValue.term, '', '', this.limitCount, this.supplierPageNumber, '', partnerRoles).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.supplierPageNumber, this.supplierList, data.responseData.comboList)
        this.supplierPageNumber = this.getData.pageNumber;
        this.supplierList = this.getData.dataList;
        this.scrollSuppliersync = false;
      }
    );
  }

  fetchIdOfSupplier(event, index) {
    this.approveRejectBtn = false;
    this.prMainForm.controls.poItemList['controls'][index]['controls'].supplierId.setValue(event.businessPartnerId);
    this.prMainForm.controls.poItemList['controls'][index]['controls'].supplierName.setValue(event.businessPartnerName);
  }

  listOfSupplierApproved(searchValue) {
    this.scrollApprovedSuppliersync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllSupplierLocCombo, searchValue.term, '', '', this.limitCount, this.approvedSupplierPageNumber, '').subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.approvedSupplierPageNumber, this.supplierLocationList, data.responseData.comboList)
        this.approvedSupplierPageNumber = this.getData.pageNumber;
        this.supplierLocationList = this.getData.dataList;
        this.scrollApprovedSuppliersync = false;
      }
    );
  }

  fetchIdOfSupplierApproved(event, index) {
    this.prMainForm.controls.poItemList['controls'][index]['controls'].curCd.setValue(event.suppLocCurCd);
    this.prMainForm.controls.poItemList['controls'][index]['controls'].supplierSiteId.setValue(event.supplierLocationId);
    this.prMainForm.controls.poItemList['controls'][index]['controls'].supplierSiteName.setValue(event.supplierSiteName);
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
    this.prMainForm.controls.poItemList['controls'][index]['controls'].taxId1.setValue(event.taxId);
    this.prMainForm.controls.poItemList['controls'][index]['controls'].taxRate1.setValue(event.taxRate);
    this.prMainForm.controls.poItemList['controls'][index]['controls'].taxCd1.setValue(event.taxCode);
    let tax1 = this.prMainForm.controls.poItemList['controls'][index]['controls'].taxCd1.value;
    let tax2 = this.prMainForm.controls.poItemList['controls'][index]['controls'].taxCd2.value;
    if (tax1 == tax2) {
      this.commonService.openToastWarningMessage("Tax 1 and Tax 2 should not be same");
      this.prMainForm.controls.poItemList['controls'][index]['controls'].taxId1.setValue(0);
      this.prMainForm.controls.poItemList['controls'][index]['controls'].taxRate1.setValue(0);
      this.prMainForm.controls.poItemList['controls'][index]['controls'].taxCd1.setValue('');
    }

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
    this.prMainForm.controls.poItemList['controls'][index]['controls'].taxId2.setValue(event.taxId);
    this.prMainForm.controls.poItemList['controls'][index]['controls'].taxRate2.setValue(event.taxRate);
    this.prMainForm.controls.poItemList['controls'][index]['controls'].taxCd2.setValue(event.taxCode);
    let tax1Calc = this.prMainForm.controls.poItemList['controls'][index]['controls'].taxCd1.value;
    let tax2Calc = this.prMainForm.controls.poItemList['controls'][index]['controls'].taxCd2.value;
    if (tax1Calc == tax2Calc) {
      this.commonService.openToastWarningMessage("Tax 1 and Tax 2 should not be same");
      this.prMainForm.controls.poItemList['controls'][index]['controls'].taxId2.setValue(0);
      this.prMainForm.controls.poItemList['controls'][index]['controls'].taxRate2.setValue(0);
      this.prMainForm.controls.poItemList['controls'][index]['controls'].taxCd2.setValue('');
    }
  }

  fetchTaxCd3Id(event, index) {
    this.prMainForm.controls.poItemList['controls'][index]['controls'].taxId3.setValue(event.taxId);
    this.prMainForm.controls.poItemList['controls'][index]['controls'].taxRate3.setValue(event.taxRate);
    this.prMainForm.controls.poItemList['controls'][index]['controls'].taxCd3.setValue(event.taxCode);
  }

  dateChange() {
    this.approveRejectBtn = false;
    this.prMainForm.controls.poReqDtDisp.setValue(this.commonService.addCurrenrtTimeToDate(this.prMainForm.controls.poReqDtDisp.value));
  }

  onChangeRemarks() {
    this.approveRejectBtn = false;
  }

  calculation(value, index) {
    this.approveRejectBtn = false;
    var unitPrice = this.prMainForm.controls.poItemList['controls'][index]['controls'].unitPrice.value;
    var poReqQty = this.prMainForm.controls.poItemList['controls'][index]['controls'].poReqQty.value;
    var taxRate1 = this.prMainForm.controls.poItemList['controls'][index]['controls'].taxRate1.value;
    var taxRate2 = this.prMainForm.controls.poItemList['controls'][index]['controls'].taxRate2.value;

    var basicAmt = (unitPrice * poReqQty);
    this.prMainForm.controls.poItemList['controls'][index]['controls'].basicAmt.setValue(basicAmt);
    var taxAmt1 = (basicAmt * taxRate1) / 100;
    var taxAmt2 = (basicAmt * taxRate2) / 100;

    this.prMainForm.controls.poItemList['controls'][index]['controls'].taxAmt1.setValue(taxAmt1.toFixed(2));
    this.prMainForm.controls.poItemList['controls'][index]['controls'].taxAmt2.setValue(taxAmt2.toFixed(2));

    var totalAmtC = (basicAmt + taxAmt1 + taxAmt2);
    this.prMainForm.controls.poItemList['controls'][index]['controls'].totalAmt.setValue(totalAmtC.toFixed(2));
    this.calculateTotals();
  }

  calculateTotals() {
    let obj = {
      'poItemList': this.prMainForm.controls.poItemList.value
    }
    this.commonService.commonInsertService('calculatePRTotals.sams', obj).subscribe(
      data => {
        if (data.success) {

          this.prMainForm.controls.totalBasicAmt.setValue(data.responseData.totalBasicAmt);
          this.prMainForm.controls.totalTaxAmt.setValue(data.responseData.totalTaxAmt);
          this.prMainForm.controls.grandTotal.setValue(data.responseData.totalGrandAmt);

          let sumLocalGrandTotal = 0.00;
          for (let element of this.prMainForm.get('poItemList')['controls']) {

            let localGrandTotalValue = element.get('localTotalAmt').value;
            sumLocalGrandTotal += parseFloat(localGrandTotalValue);
          }
          console.log('Total localGrandTotal sum:', sumLocalGrandTotal);
          this.prMainForm.controls.localGrandTotal.setValue(sumLocalGrandTotal);

        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }
    );
  }

  addItem() {

    this.approveRejectBtn = false;
    if (this.prMainForm.controls.poItemList.value.length == 0) {
      this.poItemList = this.prMainForm.get('poItemList') as FormArray;
      this.poItemList.push(this.createItemList());
      this.enableSubmitButton = true;
    } else {
      let rowindex = this.prMainForm.controls.poItemList.value.length - 1;
      let displaySNo = this.prMainForm.controls.poItemList.value.length;
      if (this.prMainForm.controls.poItemList['controls'][rowindex]['controls'].itemId.value > 0) {
        this.poItemList = this.prMainForm.get('poItemList') as FormArray;
        this.poItemList.push(this.createItemList());
      }
      else if (this.prMainForm.controls.poItemList['controls'][rowindex]['controls'].description.value) {
        this.poItemList.push(this.createItemList());
      }
      else {
        this.commonService.openToastWarningMessage("Kindly select the Item " + displaySNo);
      }

    }

  }

  saveFlag: boolean = false;
  save() {
    this.saveFlag = true;
    if (this.prMainForm.controls.poItemList.value.length <= 0) {
      this.saveFlag = false;
      this.commonService.openToastWarningMessage("Atlease add One Item to Create Purchase Request!");
    }
    // for (let i = 0; i < this.prMainForm.controls.poItemList.value.length; i++) {

    //   const item_id = this.prMainForm.controls.poItemList['controls'][i]['controls'].itemId.value;

    //   if (item_id > 0 && !this.prMainForm.controls.poItemList['controls'][i]['controls'].unmatchedFlag.value && this.saveFlag) {
    //     if (this.prMainForm.controls.poItemList['controls'][i]['controls'].supplierId.value > 0) {
    //       if (this.prMainForm.controls.poItemList['controls'][i]['controls'].supplierSiteId.value > 0) {  
    //         this.saveFlag=true;
    //       }else{
    //         this.commonService.openToastWarningMessage("Kindly check the data");
    //         this.saveFlag=false;
    //       }
    //     }else{
    //       this.saveFlag=false;
    //       this.commonService.openToastWarningMessage("Kindly check the data");
    //     }
    //   }
    //   else if(this.prMainForm.controls.poItemList['controls'][i]['controls'].description.value && this.saveFlag){
    //     if (this.prMainForm.controls.poItemList['controls'][i]['controls'].supplierId.value > 0) {
    //       if (this.prMainForm.controls.poItemList['controls'][i]['controls'].supplierSiteId.value > 0) { 
    //         this.saveFlag=true;
    //       }else{
    //         this.commonService.openToastWarningMessage("Kindly check the data");
    //         this.saveFlag=false;
    //       }
    //     }else{
    //       this.commonService.openToastWarningMessage("Kindly check the data");
    //       this.saveFlag=false;
    //     }
    //   }
    //   else{
    //     this.commonService.openToastWarningMessage("Kindly check the data");
    //     this.saveFlag=false;
    //   }
    // }

    if (this.saveFlag) {
      this.commonService.showSpinner();
      this.commonService.commonInsertService('saveOrUpdatePurchaseRequest.sams', this.prMainForm.getRawValue()).subscribe(
        data => {
          if (data.success) {
            this.commonService.hideSpinner();
            this.commonService.openToastSuccessMessage(data.message);
            this.locationRef.back();
          } else {
            this.commonService.hideSpinner();
            this.commonService.openToastErrorMessage(data.message);
          }
        }
      );
    }


  }

  addNewItem() {
    localStorage.setItem('previousRoute', this.router.url);
    const itemCreatePath = ['home/inventory/itemCreate/' + 0 + '/' + 'create'];
    localStorage.setItem('localprMainForm', JSON.stringify(this.prMainForm.value));
    this.router.navigate(itemCreatePath);
  }

  exit() {
    this.locationRef.back();
  }

  convertFlag: boolean = true;
  prUpdateStatus(status) {

    if (status == "Approve") {
      var prHdrId = this.prMainForm.controls.poReqId.value;
      for (let i = 0; i < this.prMainForm.controls.poItemList.value.length; i++) {
        let rowindex = i + 1;
        if (this.prMainForm.controls.poItemList['controls'][i]['controls'].supplierId.value > 0) {
          if (this.prMainForm.controls.poItemList['controls'][i]['controls'].supplierSiteId.value > 0) {
          } else {
            this.convertFlag = false;
            this.commonService.openToastWarningMessage("Kindly select the Supplier Site for Line Item" + rowindex);
          }
        } else {
          this.convertFlag = false;
          this.commonService.openToastWarningMessage("Kindly select the Supplier for Line Item" + rowindex);
        }
        if (this.prMainForm.controls.poItemList['controls'][i]['controls'].unmatchedFlag.value) {
          this.convertFlag = false;
          this.commonService.openToastWarningMessage("Entered unmatched item. Please match the item" + rowindex);
        }
      }

      const poDtlList = { poDtlList: [], LocId: 0 };
      poDtlList.poDtlList.push(prHdrId)
      poDtlList.LocId = this.prMainForm.controls.locationId.value;

      if (this.convertFlag) {
        this.commonService.commonInsertService('convertMultiplePRIntoPO.sams', poDtlList).subscribe(
          data => {
            if (data.success) {
              this.locationRef.back();
              this.commonService.openToastSuccessMessage(data.message);
            } else {
              this.commonService.openToastErrorMessage(data.message);
            }
          }
        );
      }
    }
    else {
      let prCancelList = [];

      prCancelList.push(this.prMainForm.controls.poReqId.value);
      this.commonService.commonInsertService('convertMultiplePR.sams', prCancelList).subscribe(
        data => {
          if (data.success) {
            this.locationRef.back();
            this.commonService.openToastSuccessMessage(data.message);
          } else {
            this.commonService.openToastErrorMessage(data.message);
          }
        }
      );
    }

  }

  delete(index) {
    this.approveRejectBtn = false;

    this.poItemList = this.prMainForm.get('poItemList') as FormArray;
    var poReqDtlId: number = this.prMainForm.controls.poItemList['controls'][index]['controls'].poReqDtlId.value;

    if (this.poItemList.length === 1) {
      this.commonService.openToastWarningMessage("This is the last item to delete this item add one more item");
    }
    else if (poReqDtlId > 0) {
      this.commonService.commonGetService('deletePRLineItem.sams', poReqDtlId).subscribe(
        data => {
          if (data.success) {
            this.commonService.openToastSuccessMessage(data.message);
            this.poItemList.removeAt(index);
            if (this.poItemList.length === 0) {
              this.addItem();
            }
          } else {
            this.commonService.openToastErrorMessage(data.message);
          }
        }
      );
    } else {
      this.poItemList.removeAt(index);
      if (this.poItemList.length === 0) {
        this.addItem();
      }
    }
  }

  dialogRef

  updateSupplierSite(rowindex) {
    this.approveRejectBtn = false;
    this.dialogRef = this.dialog.open(PurchaseSuppSitePopUpComponent, {
      height: '220px',
      width: '400px',
      data: {
        'rowIndex': rowindex,
        'supplierId': this.prMainForm.controls.poItemList['controls'][rowindex]['controls'].supplierId.value,
        'supplierSiteId': this.prMainForm.controls.poItemList['controls'][rowindex]['controls'].supplierSiteId.value > 0 ?
          this.prMainForm.controls.poItemList['controls'][rowindex]['controls'].supplierSiteId.value : 0,
        'supplierSiteName': this.prMainForm.controls.poItemList['controls'][rowindex]['controls'].supplierSiteName.value != '' ?
          this.prMainForm.controls.poItemList['controls'][rowindex]['controls'].supplierSiteName.value : ''
      }
    });
    this.dialogRef.disableClose = true;
    this.dialogRef.afterClosed().subscribe(
      data => {
        if (data.exit) {
          this.prMainForm.controls.poItemList['controls'][data.form.rowIndex]['controls'].supplierSiteId.setValue(data.form.supplierSiteId)
          this.prMainForm.controls.poItemList['controls'][data.form.rowIndex]['controls'].supplierSiteName.setValue(data.form.supplierSiteName);
          this.prMainForm.controls.poItemList['controls'][data.form.rowIndex]['controls'].curCd.setValue(data.form.suppLocCurCd);
        }
      });
  }
  dialogRefTax;
  taxCalculation(rowindex) {
    if (this.prMainForm.controls.poItemList['controls'][rowindex]['controls'].basicAmt.value > 0) {
      this.dialogRefTax = this.dialog.open(TaxCalcforPurchaseComponent, {
        height: '45%',
        width: '45%',
        data: {
          'rowIndex': rowindex,
          'basicAmount': this.prMainForm.controls.poItemList['controls'][rowindex]['controls'].basicAmt.value,
          'taxRate1': this.prMainForm.controls.poItemList['controls'][rowindex]['controls'].taxRate1.value,
          'taxCd1': this.prMainForm.controls.poItemList['controls'][rowindex]['controls'].taxCd1.value,
          'taxAmt1': this.prMainForm.controls.poItemList['controls'][rowindex]['controls'].taxAmt1.value,
          'taxRate2': this.prMainForm.controls.poItemList['controls'][rowindex]['controls'].taxRate2.value,
          'taxCd2': this.prMainForm.controls.poItemList['controls'][rowindex]['controls'].taxCd2.value,
          'taxAmt2': this.prMainForm.controls.poItemList['controls'][rowindex]['controls'].taxAmt2.value,
        }
      });
      this.dialogRefTax.disableClose = true;
      this.dialogRefTax.afterClosed().subscribe(
        data => {
          if (data.exit) {
            for (let i = 0; i < data.listForm.length; i++) {
              if (i == 0) {
                this.prMainForm.controls.poItemList['controls'][rowindex]['controls'].taxRate1.setValue(data.listForm[i].taxRate);
                this.prMainForm.controls.poItemList['controls'][rowindex]['controls'].taxCd1.setValue(data.listForm[i].taxCode);
                this.prMainForm.controls.poItemList['controls'][rowindex]['controls'].taxAmt1.setValue(data.listForm[i].totalTaxAmount);
              } else if (i == 1) {
                this.prMainForm.controls.poItemList['controls'][rowindex]['controls'].taxRate2.setValue(data.listForm[i].taxRate);
                this.prMainForm.controls.poItemList['controls'][rowindex]['controls'].taxCd2.setValue(data.listForm[i].taxCode);
                this.prMainForm.controls.poItemList['controls'][rowindex]['controls'].taxAmt2.setValue(data.listForm[i].totalTaxAmount);
              }
            }
            this.prMainForm.controls.poItemList['controls'][rowindex]['controls'].itemTotalTaxAmt.setValue(data.basicInfo.totalTaxAmount);
          }
        });
    }

  }

  viewAssetDetails(assetHdrId) {
    if (assetHdrId > 0) {
      this.dialogRef = this.dialog.open(ViewAssetInfoDetailsComponent, {
        height: '65%',
        width: '60%',
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

  loadPRReasonComboData(searchValue) {
    this.scrollPRReasonsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfPRReasons.sams', searchValue.term, '', '', this.limitCount, this.prReasonPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.prReasonPageNumber, this.prReasonList, data.responseData.comboList)
        this.prReasonPageNumber = this.getData.pageNumber;
        this.prReasonList = this.getData.dataList;
        this.scrollPRReasonsync = false;
      }
    );
  }

  loadOrderReasonComboData(searchValue) {
    this.scrollorderReasonsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllOrderReasons.sams', searchValue.term, '', '', this.limitCount, this.orderReasonPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.orderReasonPageNumber, this.orderReasonList, data.responseData.comboList)
        this.orderReasonPageNumber = this.getData.pageNumber;
        this.orderReasonList = this.getData.dataList;
        this.scrollorderReasonsync = false;
      }
    );
  }

  selectedPRReasonData(event) {
    this.approveRejectBtn = false;
    if (event === undefined) {
      this.prMainForm.controls['prReason'].setValue('');
      this.prReasonPageNumber = 1;
    } else {
      this.prMainForm.controls['prReason'].setValue(event.prReasonName);
    }

    console.log(event.prReasonName);

  }

  selectedOrderReasonData(event) {
    this.approveRejectBtn = false;
    if (event === undefined) {
      this.prMainForm.controls['orderReason'].setValue('');
      this.orderReasonPageNumber = 1;
    } else {
      this.prMainForm.controls['orderReason'].setValue(event.orderReasonName);
    }
  }

  viewAssetInfo(assetHdrId, mode) {
    if (assetHdrId > 0) {
      this.router.navigate(['home/asset/assetCreate/', assetHdrId, mode, 'asset_info']);
    }
  }

  setUnmathcedPart(event, index) {
    this.approveRejectBtn = false;
    this.prMainForm.controls.poItemList['controls'][index]['controls'].uomCode.setValue('');
    this.prMainForm.controls.poItemList['controls'][index]['controls'].itemId.setValue(0);
    this.prMainForm.controls.poItemList['controls'][index]['controls'].itemName.setValue('');
    this.prMainForm.controls.poItemList['controls'][index]['controls'].description.setValue('');
    this.prMainForm.controls.poItemList['controls'][index]['controls'].makerPartCode.setValue('');
    this.prMainForm.controls.poItemList['controls'][index]['controls'].itemCategoryName.setValue('');
    this.prMainForm.controls.poItemList['controls'][index]['controls'].itemTypeName.setValue('');
    this.prMainForm.controls.poItemList['controls'][index]['controls'].itemCategoryId.setValue(0);
    this.prMainForm.controls.poItemList['controls'][index]['controls'].itemTypeId.setValue(0);
    const valueDisp = "";
    this.prMainForm.controls.poItemList['controls'][index]['controls'].itemDetailsDisp.setValue(valueDisp);

    this.prMainForm.get('poItemList')['controls'][index]['controls'].unmatchedFlag.setValue(event.checked);

  }

  //Purchase Usage
  listofPurchaseUsage(searchValue) {
    this.scrollPurchaseUsagesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfPurchasingUsageCombo, searchValue.term, '', '', this.limitCount, this.purchaseUsagePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        console.log('purchase usage', JSON.stringify(data));
        const prType = this.prMainForm.get('prType')?.value;

        let filter = null;
        if (prType === 'SERVICE') {
          filter = data.responseData.comboList.filter(
            usage => usage.purchasingUsageName !== 'STOCK'
          );
        } else {
          filter = data.responseData.comboList
        }
        this.getData = this.commonService.fetchDataList(searchValue, this.purchaseUsagePageNumber, this.purchaseUsageCombo, data.responseData.comboList)
        this.purchaseUsagePageNumber = this.getData.pageNumber;
        this.purchaseUsageCombo = filter;
        this.scrollPurchaseUsagesync = false;
      }
    );
  }

  setPurchaseUsage(event) {
    if (event === undefined) {
      this.prMainForm.controls['prUsage'].setValue('');
      this.purchaseUsagePageNumber = 1;
    } else {
      this.prMainForm.controls['prUsage'].setValue(event.purchasingUsageName);
    }
  }

  addPRItem(index, mode, prDtlInfo) {

    let itemsCount = 0;
    if (this.poItemList != null && this.poItemList != undefined) {
      itemsCount = this.poItemList.length;

    }

    let dialogRef = this.dialog.open(PrItemAddComponent, {
      height: '95%',
      width: '70%',
      data: {
        'prDtlInfo': prDtlInfo,
        'prHdrInfo': this.prMainForm.getRawValue(),
        'mode': mode,
        'prDtlList': this.prMainForm.get('poItemList'),
        'assetHdrId': this.prMainForm.controls.assetHdrId.value,
        'itemCount': itemsCount
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          if (index === null) {
            this.pushPoDtlItemTOList(data);
          } else if (index !== null && index !== undefined && index !== '') {
            this.poItemList.removeAt(index);
            this.pushPoDtlItemTOList(data);
          }
        }
      });
  }

  pushPoDtlItemTOList(obj) {
    this.poItemList = this.prMainForm.get('poItemList') as FormArray;
    const group = this.formBuilder.group({

      poReqDtlId: new FormControl(obj.poReqDtlId),
      poReqId: new FormControl(obj.poReqId),
      prLineNo: new FormControl(obj.prLineNo),

      itemId: new FormControl(obj.itemId),
      itemName: new FormControl(obj.itemName),
      itemTypeId: new FormControl(obj.itemTypeId),
      itemTypeName: new FormControl(obj.itemTypeName),
      itemDesc: new FormControl(obj.itemDesc),
      manufacturerPartNo: new FormControl(obj.manufacturerPartNo),
      suppItemCd: new FormControl(obj.suppItemCd),
      uomCode: new FormControl(obj.uomCode),

      poReqQty: new FormControl(obj.poReqQty),
      cancelQty: new FormControl(obj.cancelQty),

      unitPrice: new FormControl(obj.unitPrice),
      basicAmt: new FormControl(obj.basicAmt),
      remarks: new FormControl(obj.remarks),

      needByDt: new FormControl(obj.needByDt),
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
      totalAmt: new FormControl(obj.totalAmt),
      exchRate: new FormControl(obj.exchRate),
      localTotalAmt: new FormControl(obj.localTotalAmt),

      supplierId: new FormControl(obj.supplierId),
      supplierName: new FormControl(obj.supplierName),
      supplierSiteId: new FormControl(obj.supplierSiteId),
      supplierSiteName: new FormControl(obj.supplierSiteName),
      curCd: new FormControl(obj.curCd),
      newItemFlag: new FormControl(obj.newItem),
      needByDtDisp: new FormControl(obj.needByDtDisp),
      partnerSiteAddress: new FormControl(obj.partnerSiteAddress),
      itemCategoryName: new FormControl(obj.itemCategoryName),
      itemCategoryId: new FormControl(obj.itemCategoryId)

    });

    this.poItemList.push(group);
    this.calculateTotals();
    if (obj.itemCategoryName != '') {
      this.prMainForm.controls.prType.setValue(obj.itemCategoryName);
      this.prTypeDisp = obj.itemCategoryName;
    }


    // this.prMainForm.get('prType').disable();

  }

  listofPurchaseType(searchValue) {
    this.scrollPurchaseTypesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfPurchasingTypeCombo, searchValue.term, '', '', this.limitCount, this.purchaseTypePageNumber, 'PR').subscribe(
      (data) => {
        this.getData = new getData();
        console.log('purchase type', JSON.stringify(data));
        const filteredComboList = data?.responseData?.comboList.filter(
          item => item.purchasingTypeName !== "CONTRACT"
        );

        this.getData = this.commonService.fetchDataList(searchValue, this.purchaseTypePageNumber, this.purchaseTypeCombo, data.responseData.comboList)
        this.purchaseTypePageNumber = this.getData.pageNumber;
        this.purchaseTypeCombo = filteredComboList;
        this.scrollPurchaseTypesync = false;
      }
    );
  }

  setPurchaseType(event) {
    if (event === undefined) {
      this.prMainForm.controls['prType'].setValue('');
      this.purchaseTypePageNumber = 1;
      this.prTypeDisp = '';
    } else {
      this.prTypeDisp = event.purchasingTypeName;
      this.prMainForm.controls['prType'].setValue(event.purchasingTypeName);
    }

  }

  addNewPRItem(index, mode, poDtlInfo) {
    let dialogRef = this.dialog.open(PrNewItemAddComponent, {
      width: '35%',
      data: {
        'poDtlInfo': poDtlInfo,
        'poHdrInfo': this.prMainForm.getRawValue(),
        'mode': mode,
        'poDtlList': this.prMainForm.get('poItemList')
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          if (index === null) {

          } else if (index !== null && index !== undefined && index !== '') {
            this.prMainForm.controls.poItemList['controls'][index]['controls'].itemId.setValue(data.itemMasterId);
            this.prMainForm.controls.poItemList['controls'][index]['controls'].itemName.setValue(data.itemMasterName);
            this.prMainForm.controls.poItemList['controls'][index]['controls'].itemDesc.setValue(data.itemMasterDesc);
            this.prMainForm.controls.poItemList['controls'][index]['controls'].uomCode.setValue(data.masterUOMName);
          }
          setTimeout(() => { this.ngOnInit() }, 500);
        }
      });
  }

  employeeId: string = '0';
  approvalId: string = '0';
  approvebuttonEnable: boolean = false;

  getWorkflowApprovalForPR() {
    this.commonService.commonGetService('getWorkflowForId.sams', this.prMainForm.controls.poReqId.value,
      this.userSessionService.getUserEmpId(),
      allWorkflowStatus[allWorkflowStatus.PR], this.userSessionService.getUserOrgId()).subscribe(
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

  prWorkflowApproval(status) {
    let approvalButtonFlag = true;

    const poItemList = this.prMainForm.controls.poItemList.value;

    const hasInvalidItem = poItemList.some(item =>
      !item.supplierId ||
      !item.supplierName ||
      item.unitPrice === 0 ||
      item.unitPrice == null
    );


    if (hasInvalidItem) {
      this.commonService.openToastWarningMessage("Unit price/Supplier information is missing. Kindly input the mandatory fields.");
      approvalButtonFlag = false;

    } else {
      if (this.prMainForm.controls.prWithoutUnitPrice.value || this.prMainForm.controls.prWithoutSupplier.value) {
        for (let i = 0; i < this.prMainForm.controls.poItemList['controls'].length; i++) {
          if (this.prMainForm.controls.poItemList['controls'][i]['controls'].unitPrice.value == 0 && this.prMainForm.controls.poItemList['controls'][i]['controls'].supplierName.value == '') {
            this.commonService.openToastWarningMessage("Unit price/Supplier information is missing. Kindly input the mandatory fields.");
            approvalButtonFlag = false;
            break;
          }
          if (this.prMainForm.controls.prWithoutUnitPrice.value) {
            if (this.prMainForm.controls.poItemList['controls'][i]['controls'].unitPrice.value == 0) {
              approvalButtonFlag = false;
              this.commonService.openToastWarningMessage("Unit Price is Required ! Kindly Update the Unit Price");
              break;
            }
          }
          if (this.prMainForm.controls.prWithoutSupplier.value) {
            if (this.prMainForm.controls.poItemList['controls'][i]['controls'].supplierName.value == '') {
              approvalButtonFlag = false;
              this.commonService.openToastWarningMessage("Supplier Name is Required ! Kindly Update the Supplier Name");
              break;
            }
          }
        }
      }

      if (approvalButtonFlag) {

        if (this.prMainForm.controls.approvalId.value == 0 || this.prMainForm.controls.poReqStatus.value == 'REJECTED') {
          this.selectedContractItems = 0;
        } else {
          this.selectedContractItems = 1;
        }

        let processName = "";
        if (status) {
          processName = 'approve';
        } else {
          processName = 'reject';
        }
        const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
          height: 'auto',
          width: '400px',
          data: {
            confirmHeading: 'Confirmation',
            confirmMsg: `Are you sure to ${processName} Purchase Request ?`,
            note: 'Note : Only PR under your queue will be Approved',
            selectedElementListLength: this.selectedContractItems
          }
        });
        dialogRef.disableClose = true;
        dialogRef.afterClosed().subscribe(data => {
          if (data.status === true) {
            let locationId = this.prMainForm.controls.locationId.value;
            let prType = this.prMainForm.controls.prType.value;
            let prIdList = { selectedPRList: [], status: status, selectedApprovalList: [], locationId: locationId, prType: prType };
            prIdList.selectedPRList.push(this.prMainForm.controls.poReqId.value);
            prIdList.selectedApprovalList.push(this.approvalId);
            this.commonService.showSpinner();
            this.commonService.commonInsertService('approveRejectPR.sams', prIdList).subscribe(
              data => {
                if (data.success) {
                  console.log("pr details ", data.responseData);
                  prIdList = data.responseData;
                  this.commonService.hideSpinner();
                  this.commonService.openToastSuccessMessage(data.message);
                  this.exit();
                  // this.prConvertedPOInfo(prIdList, data.message);
                } else {
                  this.commonService.hideSpinner();
                  this.commonService.openToastWarningMessage(data.message);
                }
              }, error => {

              }
            );
          }
        });
      }
    }
  }

  prConvertedPOInfo(event, message) {
    let dialogRef = this.dialog.open(PrPoConvertInfoComponent, {
      width: '35%',
      height: 'auto',
      data: {
        'tempPRConvertPOList': event,
        'locValidMsg': message
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status === true) {
          this.closePR();
        }
      });
  }

  prWorkflowReject() {

    if (this.prMainForm.controls.approvalId.value == 0) {
      this.selectedContractItems = 0;
    } else {
      this.selectedContractItems = 1;
    }

    const dialogRef = this.dialog.open(RejectConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        confirmHeading: 'Confirmation',
        confirmMsg: 'Are you sure to Reject selected Purchase Request ?',
        note: 'Note : Only PR under your queue will be Rejected',
        selectedElementListLength: this.selectedContractItems
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status === true) {
          let rejectReason = data.reason

          let prIdList = { selectedPRList: [], status: 'false', selectedApprovalList: [], locationId: 0, prType: '', rejectReason: rejectReason };
          prIdList.selectedPRList.push(this.prMainForm.controls.poReqId.value);
          prIdList.selectedApprovalList.push(this.approvalId);

          this.commonService.showSpinner();
          this.commonService.commonInsertService('approveRejectPR.sams', prIdList).subscribe(
            data => {
              if (data.success) {
                prIdList = data.responseData;
                this.commonService.hideSpinner();
                this.commonService.openToastSuccessMessage(data.message);
                this.closePR();
              } else {
                this.commonService.hideSpinner();
                this.commonService.openToastWarningMessage(data.message);
              }
            }, error => {

            }
          );
        }
      });
  }

  closePR() {
    this.router.navigate(['/home/purchase/purchaseRequestList']);
  }

  cancelPR() {
    let dialogRef = this.dialog.open(CancelConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': ' selected Purchase Request'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          let cancelReason = data.cancelReason;
          let prIdList = { prCancelList: [], cancelReason: cancelReason };
          prIdList.prCancelList = this.prMainForm.controls.poReqId.value;
          prIdList.cancelReason = cancelReason;
          this.commonService.showSpinner();
          this.commonService.commonInsertService('cancelMultiplePR.sams', prIdList).subscribe(
            data => {
              if (data.success) {
                this.commonService.openToastSuccessMessage(data.message);
                this.commonService.hideSpinner();
                this.closePR();
              } else {
                this.commonService.hideSpinner();
                this.commonService.openToastErrorMessage(data.message);
              }
            }
          );
        }
      });
  }

  validatePrPoConversion() {

    const poItemList = this.prMainForm.controls.poItemList.value;

    const hasInvalidItem = poItemList.some(item =>
      !item.supplierId ||
      !item.supplierName ||
      item.unitPrice === 0 ||
      item.unitPrice == null
    );

    if (hasInvalidItem) {
      this.commonService.openToastWarningMessage("Kindly check the data for Supplier and Unit Price");
      return;
    } else {

      let locationId: number;
      let prType: string;

      locationId = this.prMainForm.controls.locationId.value;
      prType = this.prMainForm.controls.prType.value;

      this.convertPO(locationId, prType);

      console.log("location id :" + this.prMainForm.controls.locationId.value);
      console.log("prType : " + this.prMainForm.controls.prType.value);
    }
  }

  convertPO(locationId, prType) {
    let processName = "";

    processName = 'convert to PO for';

    const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'confirmHeading': 'Confirmation',
        'confirmMsg': `Are you sure to ${processName} selected Purchase Request ?`
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(data => {
      if (data.status === true) {
        let prIdList = { selectedPRList: [], locationId: locationId, prType: prType };

        prIdList.selectedPRList.push(this.prMainForm.controls.poReqId.value);


        this.commonService.showSpinner();
        this.commonService.commonInsertService('convertPO.sams', prIdList).subscribe(
          data => {
            if (data.success) {
              console.log("pr details ", data.responseData);
              prIdList = data.responseData;
              console.log(data)
              this.commonService.hideSpinner();
              this.commonService.openToastSuccessMessage(data.message);

              if (prIdList != null) {
                this.prConvertedPOInfo(prIdList, data.message);
              }

            } else {
              this.commonService.hideSpinner();
              this.commonService.openToastWarningMessage(data.message);
            }
          }, error => {

          }
        );
      }
    });
  }

  updateAndApprove(headingDisplay) {
    if (headingDisplay == 'Create') {
      this.save();
    } else {
      let approvalButtonFlag = false;
      if (this.prMainForm.controls.approvalId.value == 0) {
        approvalButtonFlag = true;
      } else {
        approvalButtonFlag = false;
      }



      console.log('supplier data', JSON.stringify(this.prMainForm.controls.poItemList.value))

      let dialogRef = this.dialog.open(UpdateApproveConfirmationComponent, {
        height: '30%',
        width: '25%',
        data: {
          'confirmTitle': 'PR Update',
          'approvalButtonFlag': approvalButtonFlag
        }
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(
        data => {
          if (data.status == 'update') {
            this.save();
          } else if (data.status == 'update and approve') {
            const poItemList = this.prMainForm.controls.poItemList.value;

            const hasInvalidItem = poItemList.some(item =>
              !item.supplierId ||
              !item.supplierName ||
              item.unitPrice === 0 ||
              item.unitPrice == null
            );

            console.log('hasInvalidItem', hasInvalidItem);
            if (hasInvalidItem) {
              this.commonService.openToastWarningMessage("Kindly check the data for Supplier and Unit Price");
            } else {
              this.saveUpdateAndApprove(true);
            }

          }
        });
    }

  }

  saveUpdateFlag: boolean = false;
  saveUpdateAndApprove(updateApproveFlag) {
    this.saveUpdateFlag = true;
    if (this.prMainForm.controls.poItemList.value.length <= 0) {
      this.saveUpdateFlag = false;
      this.commonService.openToastWarningMessage("Atlease add One Item to Create Purchase Request!");
    }

    if (this.saveUpdateFlag) {
      this.commonService.showSpinner();
      this.commonService.commonInsertService('saveOrUpdatePurchaseRequest.sams', this.prMainForm.getRawValue()).subscribe(
        data => {
          if (data.success) {
            if (updateApproveFlag) {
              this.prWorkflowApprovalforUpdate(updateApproveFlag);
            }
          } else {
            this.commonService.hideSpinner();
            this.commonService.openToastErrorMessage(data.message);
          }
        }
      );
    }
  }

  prWorkflowApprovalforUpdate(status) {
    let approvalButtonFlag = true;
    if (this.prMainForm.controls.prWithoutUnitPrice.value || this.prMainForm.controls.prWithoutSupplier.value) {
      for (let i = 0; i < this.prMainForm.controls.poItemList['controls'].length; i++) {
        if (this.prMainForm.controls.poItemList['controls'][i]['controls'].unitPrice.value == 0 && this.prMainForm.controls.poItemList['controls'][i]['controls'].supplierName.value == '') {
          this.commonService.openToastWarningMessage("Unit price/Supplier information is missing. Kindly input the mandatory fields.");
          approvalButtonFlag = false;
          break;
        }
        if (this.prMainForm.controls.prWithoutUnitPrice.value) {
          if (this.prMainForm.controls.poItemList['controls'][i]['controls'].unitPrice.value == 0) {
            approvalButtonFlag = false;
            this.commonService.openToastWarningMessage("Unit Price is Required ! Kindly Update the Unit Price");
            break;
          }
        }
        if (this.prMainForm.controls.prWithoutSupplier.value) {
          if (this.prMainForm.controls.poItemList['controls'][i]['controls'].supplierName.value == '') {
            approvalButtonFlag = false;
            this.commonService.openToastWarningMessage("Supplier Name is Required ! Kindly Update the Supplier Name");
            break;
          }
        }
      }
    }

    if (approvalButtonFlag) {
      let locationId = this.prMainForm.controls.locationId.value;
      let prType = this.prMainForm.controls.prType.value;
      let prIdList = { selectedPRList: [], status: status, selectedApprovalList: [], locationId: locationId, prType: prType };
      prIdList.selectedPRList.push(this.prMainForm.controls.poReqId.value);
      prIdList.selectedApprovalList.push(this.approvalId);
      this.commonService.commonInsertService('approveRejectPR.sams', prIdList).subscribe(
        data => {
          if (data.success) {
            prIdList = data.responseData;
            this.commonService.openToastSuccessMessage("Record Update and Approved successfully");
            this.exit();
          } else {
            this.commonService.openToastWarningMessage(data.message);
          }
        }, error => {

        }
      );
    }
    this.commonService.hideSpinner();

  }

}