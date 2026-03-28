import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { Location } from '@angular/common';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { NgSelectComponent } from '@ng-select/ng-select';
import { allBusinessPartnerRoles, allWorkflowStatus } from 'src/app/Constants/AllStatusConstants';
import { ConfirmConfirmationComponent } from '../../../Common-components/confirm-confirmation/confirm-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { getData } from '../../../../Model/common/fetchListData';
import { DeleteConfirmationComponent } from 'src/app/Components/Common-components/delete-confirmation/delete-confirmation.component';
import { GrnDocInfoComponent } from 'src/app/Components/Dialog-Components/inventory/grn-doc-info/grn-doc-info.component';
import { GrnStoreInfoComponent } from '../grn-store-info/grn-store-info.component';

@Component({
  selector: 'app-grn-create',
  templateUrl: './grn-create.component.html',
  styleUrls: ['./grn-create.component.css']
})
export class GrnCreateComponent implements OnInit {
  displayedColumns = ['sNo', 'poNo', 'poLineNo', 'itemName', 'itemDescription', 'makerPartCode', 'poQty', 'shipQty', 'acceptQty', 'rejectQty', 'primaryUom', 'storeName', 'iqcRequired', 'iqcRequired', 'unitPrice', 'itemQtyPrice', 'itemTax', 'receivedStatus', 'createdBy', 'createdDt', 'updatedBy', 'updatedDt'];

  //Set page title
  title = 'Asset Optima - GRN';
  grnForm: FormGroup;
  grnDtlList: FormArray;
  poCalculationInternalList: any = [];

  recordsPerPageForCombo: number;
  currentPageNumber: number;
  currentPage: number;

  //COMBO LIST
  supplierList: any = [];
  supplierLocationList: any = [];
  poList: any = [];
  scrollStoreNamesync: boolean = false;
  scrollItemNamesync: boolean = false;
  scrollSupplierNamesync: boolean = false;
  scrollApprovedSupplierNamesync: boolean = false;
  scrollPoNumbersync: boolean = false;
  scrollRejectReasonsync: boolean = false;
  ErrorMsg: string = '';
  supplierInvoiceErrorMsg: string = '';

  limitCount: any;
  skipCount: any;
  searchKey: any = '';

  scrollLocationNamesync: boolean = false;
  locationNamePageNumber: number;
  locationCombo: any = [];

  itemList = [];
  uom = [];
  storeList = [];
  rejectReasonList = [];
  poDtlList: any;

  //Heading static
  buttonDisplay: string;
  headingDisplay: string;
  disbleClear: boolean;
  storePageNumber: number;
  itemPageNumber: number;
  supplierPageNumber: number;
  approvedSupplierPageNumber: number;
  poPageNumber: number;
  rejectReasonPageNumber: number;

  disableSubmit: boolean = false;

  grnListStatus: number = 0;

  defaultStoreId: Number = 0;
  defaultStoreName: String;

  @ViewChild('supplierSiteName') supplierSiteName: NgSelectComponent;
  @ViewChild('doNo') doNo: ElementRef;
  @ViewChild('poNo') poNo: NgSelectComponent;
  @ViewChild('remarks') remarks: ElementRef;

  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page
  grnId: number;
  transactionSource: string;

  employeeId: string = '0';
  approvalId: string = '0';
  approvebuttonEnable: boolean = false;
  approve: any;
  getData: getData;
  modeDisplay: boolean = false;
  formOneValid: boolean = false;
  confirmApprove: boolean = false;

  scrollGrnForsync: boolean = false;
  grnForPageNumber: number;
  grnForCombo: any = [];

  constructor(public commonService: CommonService,
    public assetOptimaServices: AssetOptimaServices,
    public location: Location,
    private formBuilder: FormBuilder,
    public assetOptimaConstants: AssetOptimaConstants,
    public activatedRoute: ActivatedRoute,
    private userSessionService: UserSessionService,
    private readonly dialog: MatDialog,
    private titleService: Title,
    private readonly router: Router) {
    this.recordsPerPageForCombo = 10;
    this.currentPageNumber = 0;
    this.currentPage = 1;
    this.storePageNumber = 1;
    this.itemPageNumber = 1;
    this.supplierPageNumber = 1;
    this.approvedSupplierPageNumber = 1;
    this.poPageNumber = 1;
    this.rejectReasonPageNumber = 1;
    this.grnForPageNumber = 1;
    this.approve = 'APPROVED';
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.grnForm = new FormGroup({
      grnId: new FormControl(0),
      grnNo: new FormControl(''),
      itemDesc: new FormControl(''),
      doNo: new FormControl(''),
      supplierName: new FormControl('', [Validators.required]),
      supplierId: new FormControl(0),
      supplierCd: new FormControl(''),
      poId: new FormControl(0),
      poNo: new FormControl(''),
      poDateDisp: new FormControl(''),
      grnDateDisp: new FormControl(this.commonService.getCurrentDateYYYYMMDD(), [Validators.required]),
      doDateDisp: new FormControl(''),
      revNo: new FormControl(0),
      supplierSiteName: new FormControl('', [Validators.required]),
      supplierSiteId: new FormControl(''),
      orderType: new FormControl(''),
      grnStatus: new FormControl(0),
      locationId: new FormControl(''),
      locationName: new FormControl(''),
      address: new FormControl(''),
      totalPoQty: new FormControl(0),
      createdDt: new FormControl(''),
      createdBy: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedDt: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      orgId: new FormControl(''),
      errorFlg: new FormControl(''),
      errorMessage: new FormControl(''),
      remarks: new FormControl(''),
      supplierInvoiceDtDisp: new FormControl('', [Validators.required]),
      supplierInvoiceNo: new FormControl('', [Validators.required]),
      supplierInvoiceAmount: new FormControl(0, [Validators.required, Validators.pattern(/^\d{1,7}(\.\d{1,2})?$/)]),
      supplierCurCd: new FormControl(''),
      grnDtlList: this.formBuilder.array([]),
      grnDocList: this.formBuilder.array([]),
      cancelReason: new FormControl(''),
      rejectReason: new FormControl(''),
      grnFor: new FormControl(''),
    });
    this.grnForm.controls['supplierName'].enable();
    this.grnForm.controls['address'].enable();
    //this.grnForm.controls['poNo'].disable();
    this.grnForm.controls['grnFor'].disable();

    this.storePageNumber = 1;
    this.itemPageNumber = 1;
    this.supplierPageNumber = 1;
    this.approvedSupplierPageNumber = 1;
    this.poPageNumber = 1;
    this.locationNamePageNumber = 1;
    this.grnForPageNumber = 1;
    this.poCalculationInternalList = [];
    this.formOneValid = false;
    this.fetchDefaultStoreForLoc();
    this.validateEditMode();

    let fromScreen = (localStorage.getItem('fromScreen'));
    let transNo = (localStorage.getItem('transNo'));
    let transId = (localStorage.getItem('transId'));

    console.log("fromScreen", fromScreen);
    console.log("transNo", transNo);
    console.log("transId", transId);
    if (fromScreen == 'serviceRequestList') {
      this.loadDataByPOId(transNo, transId);
    }
  }

  fetchDefaultStoreForLoc() {
    this.commonService.commonGetService('fetchDefualtStore.sams', this.grnForm.controls['locationId'].value).subscribe(
      data => {
        this.defaultStoreId = (data.responseData.storeId);
        this.defaultStoreName = (data.responseData.storeName);
      });
  }

  listOfSupplier(searchTerms) {
    this.scrollSupplierNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.SUPPLIER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchTerms.term, '', '', this.limitCount, this.supplierPageNumber, '', partnerRoles).subscribe(
      (data) => {
        if (data.success) {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchTerms, this.supplierPageNumber, this.supplierList, data.responseData.comboList)
          this.supplierPageNumber = this.getData.pageNumber;
          this.supplierList = this.getData.dataList;
        }
        this.scrollSupplierNamesync = false;
      }
    );
  }
  fetchIdOfSupplier(event) {
    this.grnForm.controls.supplierSiteName.setValue('')

    if (event === undefined) {
      this.grnForm.controls['supplierId'].setValue(0);
      this.grnForm.controls['supplierName'].setValue('');
      this.supplierList = [];
      this.supplierPageNumber = 1;
      this.grnForm.controls['supplierSiteId'].setValue(0);
      this.grnForm.controls['address'].setValue('');
      this.supplierLocationList = [];
      this.approvedSupplierPageNumber = 1;
      this.grnForm.controls.supplierSiteName.disable();
    } else {
      this.grnForm.controls['supplierId'].setValue(event.businessPartnerId);
      this.grnForm.controls['supplierName'].setValue(event.businessPartnerName);
      this.grnForm.controls['supplierCd'].setValue(event.businessPartnerCode);
      this.commonService.setComboFocus(this.supplierSiteName);
      this.grnForm.controls.supplierSiteName.enable()

    }
  }

  listOfSupplierApproved(searchTerms) {
    let supplierId = this.grnForm.get('supplierId').value;
    if (supplierId > 0) {
      this.scrollApprovedSupplierNamesync = true;
      this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
      this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerSiteCombo, searchTerms.term, this.grnForm.get('supplierId').value, '', this.limitCount, this.approvedSupplierPageNumber, '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchTerms, this.approvedSupplierPageNumber, this.supplierLocationList, data.responseData.comboList)
          this.approvedSupplierPageNumber = this.getData.pageNumber;
          this.supplierLocationList = this.getData.dataList;
          this.scrollApprovedSupplierNamesync = false;
        }
      );
    } else {
      this.commonService.openToastWarningMessage("Kindly select supplier name");
    }
  }

  fetchIdOfSupplierApproved(event) {
    if (event === undefined) {
      this.grnForm.controls['supplierSiteId'].setValue(0);
      this.grnForm.controls['address'].setValue('');
      this.supplierLocationList = [];
      this.approvedSupplierPageNumber = 1;
      this.grnForm.controls['poNo'].disable();
    } else {
      this.grnForm.controls['supplierSiteId'].setValue(event.partnerSiteId);
      this.grnForm.controls['address'].setValue(event.partnerSiteName);
      this.grnForm.controls['supplierCurCd'].setValue(event.partnerSiteCurCd);
      this.grnForm.controls['supplierCurCd'].disable();
      this.grnForm.controls['address'].disable();
      this.commonService.setFormFocus(this.doNo);
      this.grnForm.controls['poNo'].enable();
    }
  }
  // listOfpoNumbersOnclick(searchTerms) {
  //   this.poList = [];
  //   if ((this.grnForm.controls.grnDtlList.value).length == 0) {
  //     this.grnListStatus = 1;
  //   }
  //   else {
  //     this.grnListStatus = 2;
  //   }

  //   this.poPageNumber = 1;
  //   this.listOfpoNumbers(searchTerms);
  // }

  backTOItemScreen() {
    this.location.back();
    ;
  }

  listOfpoNumbers(searchTerms) {

    console.log('listOfpoNumbers', JSON.stringify(searchTerms));
    this.scrollPoNumbersync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    let poType = this.grnForm.controls.grnFor.value;
    this.commonService.getComboResults('listOfAllApprovedPOCombo.sams', searchTerms.term, this.grnForm.get('supplierId').value, '', this.limitCount, this.poPageNumber, poType).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.poPageNumber, this.poList, data.responseData.comboList)
        this.poPageNumber = this.getData.pageNumber;
        this.poList = this.getData.dataList;
        this.scrollPoNumbersync = false;
      }
    );
  }

  exitForm() {
    this.location.back();
  }

  clear() {
    this.storePageNumber = 1;
    this.itemPageNumber = 1;
    this.supplierPageNumber = 1;
    this.approvedSupplierPageNumber = 1;
    this.poPageNumber = 1;
    this.grnForm.reset();
    this.grnForm.controls['supplierName'].enable();
    this.grnForm.controls['address'].enable();
    //this.grnForm.controls['poNo'].disable();
    this.ngOnInit();
    //this.grnForm.reset();
  }

  submit() {

    const errorProducts: string[] = [];
    const errorProductsForReceivedQty: string[] = [];
    const errorProductsForReceivedQtyEmpty: string[] = [];

    // Iterate the grnDtlList FormArray
    for (let i = 0; i < this.grnDtlList.length; i++) {
      const grnItem = this.grnDtlList.at(i);

      // Get values from form controls
      let receivedQty = grnItem.get('receivedQty').value;
      const poQty = grnItem.get('poQty').value;
      const acceptQty = grnItem.get('acceptQty').value;
      const poBalQty = grnItem.get('poBalQty').value;
      const poNo = grnItem.get('poNo').value;

      if (this.grnForm.controls.grnFor.value == 'CONTRACT') {
        receivedQty = 1;
      }

      // Check if receivedQty is greaterthan poBalQty
      if (receivedQty > poBalQty) {
        errorProductsForReceivedQty.push(poNo);
      }

      // Check if receivedQty is greaterthan 0
      if (receivedQty == 0 || receivedQty == '' || receivedQty == undefined) {
        errorProductsForReceivedQtyEmpty.push(poNo);
      }

      // Check if acceptQty is greater than poQty
      if (acceptQty > poQty) {
        // Add the poNo to the errorProducts array
        errorProducts.push(poNo);
      }

    }

    if (errorProductsForReceivedQtyEmpty.length > 0 && this.grnDtlList.length == errorProductsForReceivedQtyEmpty.length) {
      this.commonService.openToastWarningMessage(`ReceivedQty is required`);
    } else if (errorProductsForReceivedQty.length > 0) {
      // Display a warning message with the poNo values
      this.commonService.openToastWarningMessage(`Products with PO No ${errorProductsForReceivedQty.join(', ')} have receivedQty greater than poQty`);
    } else if (errorProducts.length > 0) {
      // Display a warning message with the poNo values
      this.commonService.openToastWarningMessage(`Products with PO No ${errorProducts.join(', ')} have GRNQty greater than poQty`);
    } else {

      // To add the items with recievedQty greaterthan 0 in GRN
      let grnDtlFormArray = this.grnForm.controls.grnDtlList as FormArray;
      // Create a new FormArray to store only poBalQty > 0 records
      let filteredFormArray = new FormArray([]);
      // Loop through existing FormArray and add only poBalQty > 0 records
      grnDtlFormArray.controls.forEach(control => {

        if (this.grnForm.controls.grnFor.value == 'CONTRACT') {
          control.get('receivedQty')?.setValue(1);
          control.get('acceptQty')?.setValue(1);
        }
        if (control.get('receivedQty')?.value > 0) {
          filteredFormArray.push(control);
        }

      });
      this.grnDtlList = filteredFormArray;

      // Replace the original FormArray with the filtered one
      this.grnForm.setControl('grnDtlList', this.grnDtlList);

      this.commonService.showSpinner();
      setTimeout(() => {
        let length = this.grnForm.controls.grnDtlList.value.length;
        if (length > 0) {
          if (this.grnForm.get('grnId').value == 0) {
            this.grnForm.controls.grnStatus.setValue("WAITING FOR APPROVAL");
          }
          if (this.grnForm.get('poNo').value != null && this.grnForm.get('poNo').value != "") {
            this.grnForm.controls.orderType.setValue(1);
          } else {
            this.grnForm.controls.orderType.setValue(0);
          }
          //this.grnForm.controls.poNo.setValue('');
          this.grnForm.controls.grnDateDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.grnForm.controls.grnDateDisp.value));
          this.grnForm.controls.doDateDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.grnForm.controls.doDateDisp.value));
          this.checkValidation('enable');
          // if (this.grnForm.get('doNo').value != '' && this.grnForm.get('doNo').value != null) {


          // } else {
          //   this.commonService.openToastWarningMessage("Do No is mandatory");
          // }
        } else {
          this.commonService.openToastWarningMessage("Kindly add atleast one item");
        }
        this.commonService.hideSpinner();

      }, 1500)
    }
  }

  closeGrn() {
    this.router.navigate(['/home/inventory/grn']);
  }

  callSaveMethod(message, event) {
    if (message == 'enable') {
      this.commonService.showSpinner();
      this.commonService.commonInsertService('saveOrUpdateGrnInfo.sams', this.grnForm.getRawValue()).subscribe(
        data => {
          if (data.success) {
            this.commonService.openToastSuccessMessage(data.message);
            if (event) {
              this.commonService.hideSpinner();
              this.closeGrn();
            }
          } else {
            this.commonService.openToastErrorMessage(data.message);
          }
        }
      );
    } else if (message == 'disable') {
      this.grnDtlList = this.grnForm.get('grnDtlList') as FormArray;
      this.grnDtlList.push(this.createGrnDtl());
    }
  }

  createGrnDtl(): FormGroup {
    return this.formBuilder.group({
      grnNo: new FormControl(this.grnForm.controls.grnNo.value),
      grnId: new FormControl(''),
      revisionNo: new FormControl(''),
      description: new FormControl(''),
      makerPartCode: new FormControl(''),
      poQty: new FormControl(''),
      shipQty: new FormControl(''),
      acceptQty: new FormControl(''),
      rejectQty: new FormControl(''),
      doNo: new FormControl(this.grnForm.controls.doNo.value),
      uom: new FormControl(''),
      unitPrice: new FormControl(''),
      itemId: new FormControl(''),
      itemName: new FormControl(''),
      itemDesc: new FormControl(''),
      supplierId: new FormControl(this.grnForm.controls.supplierId.value),
      supplierName: new FormControl(this.grnForm.controls.supplierName.value),
      supplierSiteId: new FormControl(this.grnForm.controls.supplierSiteId.value),
      supplierSiteName: new FormControl(this.grnForm.controls.supplierSiteName.value),
      poId: new FormControl(''),
      poNo: new FormControl(''),
      poDate: new FormControl(''),
      poReqId: new FormControl(''),
      poReqNo: new FormControl(''),
      reqDt: new FormControl(''),
      custId: new FormControl(''),
      custCd: new FormControl(''),
      custName: new FormControl(''),
      ceid: new FormControl(''),
      depName: new FormControl(''),
      depId: new FormControl(''),
      receiptDt: new FormControl(''),
      companyId: new FormControl(''),
      companyName: new FormControl(''),
      address: new FormControl(''),
      rejectReason: new FormControl(''),
      rejectReasonId: new FormControl(0),
      receivedQty: new FormControl('0'),
      poLineNoId: new FormControl(''),
      poLineId: new FormControl(0),
      cancelFlag: new FormControl('N'),
      confirmApproval: new FormControl(false),
      storeId: new FormControl(0),
      storeName: new FormControl('', [Validators.required]),
      poBalQty: new FormControl(0),
      poUnitPrice: new FormControl(0),
      poTaxAmt1: new FormControl(0),
      poTaxAmt2: new FormControl(0),
      poTaxAmt3: new FormControl(0),
      poLineTotalAmt: new FormControl(0),
      manufacturerPartNo: new FormControl(''),
      manufacturerName: new FormControl(''),
      rtvQty: new FormControl('0'),
      poType: new FormControl(''),
    });
  }

  addGRNForItem(): void {
    if (this.grnForm.get('grnDtlList').value.length == 0) {
      this.grnDtlList = this.grnForm.get('grnDtlList') as FormArray;
      this.grnDtlList.push(this.createGrnDtl());
      this.grnForm.get('poNo').disable();
    } else {
      this.grnForm.get('poNo').disable();
      this.checkValidation('disable');
    }
  }
  validationFlg: boolean = false;
  checkValidation(msg) {
    this.validationFlg = false;
    let rowindex = this.grnForm.controls.grnDtlList.value.length - 1;
    if (this.grnForm.controls.grnDtlList['controls'][rowindex]['controls'].storeId.value > 0) {
      if (this.grnForm.controls.grnDtlList['controls'][rowindex]['controls'].rejectQty.value > 0) {
        if (this.grnForm.controls.grnDtlList['controls'][rowindex]['controls'].rejectReasonId.value > 0) {
          for (let i = 0; i < this.grnForm.controls.grnDtlList.value.length; i++) {
            if (this.grnForm.controls.grnDtlList['controls'][i]['controls'].storeId.value > 0) {
            } else {
              this.validationFlg = true;
            }
          }
          if (!this.validationFlg) {
            this.callSaveMethod(msg, true);
          } else {
            this.commonService.openToastWarningMessage("Store is Mandatory");
          }
        } else {
          this.commonService.openToastWarningMessage("Reject Reason is Mandatory");
        }
      } else {
        for (let i = 0; i < this.grnForm.controls.grnDtlList.value.length; i++) {
          if (this.grnForm.controls.grnDtlList['controls'][i]['controls'].storeId.value > 0) {
          } else {
            this.validationFlg = true;
          }
        }
        if (!this.validationFlg) {
          this.callSaveMethod(msg, true);
        } else {
          this.commonService.openToastWarningMessage("Store is Mandatory");
        }
      }
    } else {
      this.commonService.openToastWarningMessage("Store Name is mandatory");
    }
  }


  listOfItem(searchTerms) {
    this.scrollItemNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllItemCombo, searchTerms.term, '', '', this.limitCount, this.itemPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.itemPageNumber, this.itemList, data.responseData.comboList)
        this.itemPageNumber = this.getData.pageNumber;
        this.itemList = this.getData.dataList;
        this.scrollItemNamesync = false;
      }
    );
  }

  getItemValue(event, index) {
    if (event === undefined) {
      this.grnForm.controls.grnDtlList['controls'][index]['controls'].description.setValue('');
      this.grnForm.controls.grnDtlList['controls'][index]['controls'].uom.setValue('');
      this.grnForm.controls.grnDtlList['controls'][index]['controls'].itemId.setValue(0);
      this.grnForm.controls.grnDtlList['controls'][index]['controls'].makerPartCode.setValue('');
      this.grnForm.controls.grnDtlList['controls'][index]['controls'].storeName.setValue('');
      this.grnForm.controls.grnDtlList['controls'][index]['controls'].storeId.setValue(0);
      this.itemList = [];
      this.itemPageNumber = 1;
    } else {
      this.grnForm.controls.grnDtlList['controls'][index]['controls'].description.setValue(event.itemDesc);
      this.grnForm.controls.grnDtlList['controls'][index]['controls'].uom.setValue(event.uomCode);
      this.grnForm.controls.grnDtlList['controls'][index]['controls'].itemId.setValue(event.itemId);
      this.grnForm.controls.grnDtlList['controls'][index]['controls'].makerPartCode.setValue(event.oemCode);
      this.grnForm.controls.grnDtlList['controls'][index]['controls'].storeName.setValue(event.storeName);
      this.grnForm.controls.grnDtlList['controls'][index]['controls'].storeId.setValue(event.storeId);
    }

  }

  listOfUOM(searchValue) {
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.skipCount = !(this.commonService.fetchSearchValue(searchValue)) ? this.uom.length.toString() : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfUOMCombo, searchValue != null ? searchValue.terms : '', '', '1', this.limitCount, this.skipCount).subscribe(
      (data) => {
        this.uom = data.responseData.comboList;
      }
    );
  }

  listOfStore(searchTerms) {
    this.scrollStoreNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    let locId = this.grnForm.controls['locationId'].value;
    this.commonService.getComboResults('listOfAllStoreCombo.sams', searchTerms.term, locId, '', this.limitCount, this.storePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.storePageNumber, this.storeList, data.responseData.comboList)
        this.storePageNumber = this.getData.pageNumber;
        this.storeList = this.getData.dataList;
        this.scrollStoreNamesync = false;
      }
    );
  }

  getStoreValue(event, index) {
    if (event === undefined) {
      this.grnForm.controls.grnDtlList['controls'][index]['controls'].storeName.setValue('');
      this.grnForm.controls.grnDtlList['controls'][index]['controls'].storeId.setValue(0);
      this.storeList = [];
      this.storePageNumber = 1;
    } else {
      this.grnForm.controls.grnDtlList['controls'][index]['controls'].storeName.setValue(event.storeName);
      this.grnForm.controls.grnDtlList['controls'][index]['controls'].storeId.setValue(event.storeId);
    }
  }

  listOfGrnFor(searchTerms) {
    this.scrollGrnForsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults('listOfAllGrnFor.sams', searchTerms.term, '', '', this.limitCount, this.grnForPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.grnForPageNumber, this.grnForCombo, data.responseData.comboList)
        this.grnForPageNumber = this.getData.pageNumber;
        this.grnForCombo = this.getData.dataList;
        this.scrollGrnForsync = false;
      }
    );
  }

  getGrnForValue(event) {
    if (event === undefined) {
      this.grnForm.controls.grnFor.setValue('');
      this.grnForCombo = [];
      this.grnForPageNumber = 1;
    } else {
      this.grnForm.controls.grnFor.setValue(event.grnFor);
      // if(event.grnFor == 'SERVICE') {
      //   this.grnForm.controls.supplierInvoiceAmount.enable();
      // } else {
      //   this.grnForm.controls.supplierInvoiceAmount.disable();
      // }
    }
  }

  delete(index) {
    this.grnDtlList = this.grnForm.get('grnDtlList') as FormArray;
    if (this.grnDtlList.length > 1) {
      this.grnDtlList.removeAt(index)

      if ((this.grnDtlList.value).length == 0) {
        this.grnListStatus = 1
      }

      this.poCalculationInternalList.splice(index, 1);
      this.formValidation();
    } else {
      this.commonService.openToastWarningMessage("Minimum one data is Required");
    }
  }

  // insertFlg: boolean = false;
  // poNumber: string = '';
  // fetchSelectedPONumber(event) {
  //   console.log('poTypeNew' , event);
  //   if(event[event.length - 1].grnStatus == 'WAITING FOR APPROVAL' || event[event.length - 1].grnStatus == 'BOOKED'){
  //     this.commonService.openToastWarningMessage("Selected Supplier and PO Number already added in the GRN : "+event[event.length - 1].grnNo+" !");
  //   } else{
  //     if (event.length == 0) {
  //       this.grnListStatus = 1;
  //     }
  //     console.log('poTypeNew' , event.poType);
  //     this.insertFlg = false;
  //     this.grnDtlList = this.grnForm.get('grnDtlList') as FormArray;
  //     let poTypeNew = '';
  //     //event[0].poDtlList.map(obj => {
  //     event[event.length - 1].poDtlList.map(obj => {
  //       let count = this.poCalculationInternalList.length;
  //       if (count > 0) {
  //         for (let i = 0; i < count; i++) {
  //           if (this.poCalculationInternalList[i] === obj.poNo) {
  //             this.insertFlg = true;
  //           }
  //         }
  //       }

  //       if (!this.insertFlg) {
  //         var tempValue = (obj.poNo != '' && obj.poNo != null) ? obj.poQty : obj.shipQty;
  //         var totalTaxAmt = Number(obj.taxAmt1 + obj.taxAmt2 + obj.taxAmt3);
  //         var grnBasicAmt = Number(obj.poBalanceQty * obj.unitPrice);
  //         var grnTaxInfo1 = obj.taxCd1 + " - " + obj.taxAmt1;
  //         var grnTaxInfo2 = obj.taxCd2 + " - " + obj.taxAmt2;
  //         const Group = this.formBuilder.group({
  //           grnNo: new FormControl(''),
  //           grnId: new FormControl(''),
  //           revisionNo: new FormControl(''),
  //           description: new FormControl(obj.itemDesc),
  //           makerPartCode: new FormControl(obj.oemCode),
  //           poQty: new FormControl(obj.poQty),
  //           shipQty: new FormControl(''),
  //           acceptQty: new FormControl(obj.poBalanceQty),
  //           rejectQty: new FormControl('0'),
  //           doNo: new FormControl(this.grnForm.controls.doNo.value),
  //           uom: new FormControl(obj.uomCd),
  //           unitPrice: new FormControl(obj.unitPrice),
  //           itemId: new FormControl(obj.itemId),
  //           itemName: new FormControl(obj.itemName),
  //           itemDesc: new FormControl(obj.itemDesc),
  //           poId: new FormControl(obj.poId),
  //           poNo: new FormControl(obj.poNo),
  //           poDate: new FormControl(''),
  //           poReqId: new FormControl(''),
  //           poReqNo: new FormControl(obj.prReqNo),
  //           reqDt: new FormControl(''),
  //           custId: new FormControl(''),
  //           custCd: new FormControl(''),
  //           custName: new FormControl(''),
  //           ceid: new FormControl(''),
  //           depName: new FormControl(''),
  //           depId: new FormControl(''),
  //           receiptDt: new FormControl(''),
  //           companyId: new FormControl(''),
  //           companyName: new FormControl(''),
  //           address: new FormControl(''),
  //           storeId: new FormControl(this.defaultStoreId),
  //           storeName: new FormControl(this.defaultStoreName),
  //           rejectReason: new FormControl(''),
  //           rejectReasonId: new FormControl(0),
  //           receivedQty: new FormControl(obj.poBalanceQty),
  //           poLineNoId: new FormControl(obj.poDtlId),
  //           poLineNo: new FormControl(obj.poLineNo),
  //           cancelFlag: new FormControl('N'),
  //           confirmApproval: new FormControl(false),
  //           supplierId: new FormControl(this.grnForm.controls.supplierId.value),
  //           // supplierCd: new FormControl(this.grnForm.controls.supplierCd.value),
  //           supplierName: new FormControl(this.grnForm.controls.supplierName.value),
  //           supplierSiteId: new FormControl(this.grnForm.controls.supplierSiteId.value),
  //           supplierSiteName: new FormControl(this.grnForm.controls.supplierSiteName.value),
  //           grnBasicAmt: new FormControl(grnBasicAmt),
  //           poBalQty: new FormControl(obj.poBalanceQty),
  //           taxCd1: new FormControl(obj.taxCd1),
  //           taxRate1: new FormControl(obj.taxRate1),
  //           taxAmt1: new FormControl(obj.taxAmt1),
  //           taxCd2: new FormControl(obj.taxCd2),
  //           taxRate2: new FormControl(obj.taxRate2),
  //           taxAmt2: new FormControl(obj.taxAmt2),
  //           taxAmt3: new FormControl(obj.taxAmt3),
  //           grnTaxInfo1: new FormControl(grnTaxInfo1),
  //           grnTaxInfo2: new FormControl(grnTaxInfo2),
  //           grnTaxInfo3: new FormControl(''),
  //           totalTaxAmt: new FormControl(totalTaxAmt),
  //           grnItemTotalAmt: new FormControl(obj.netAmt),
  //           rtvFlag: new FormControl(false),
  //           manufacturerPartNo: new FormControl(''),
  //           manufacturerName: new FormControl(''),
  //           rtvQty: new FormControl('0')
  //         });
  //         this.grnDtlList.push(Group);

  //       } else {
  //         this.commonService.openToastWarningMessage("PO Number is already Selected");
  //       }
  //       this.poNumber = obj.poNo;
  //       this.grnForm.controls.grnFor.setValue(poTypeNew);
  //     });
  //     if (event === undefined) {
  //       this.grnForm.get('poNo').setValue('');
  //       this.poList = [];
  //       this.poPageNumber = 1;
  //     } else {
  //       this.grnForm.get('poNo').setValue(event.poNO);
  //       if (this.poCalculationInternalList.findIndex(x => x === this.poNumber) === -1) {
  //         this.poCalculationInternalList.push(this.poNumber);
  //       }
  //       this.poList = [];
  //       this.poPageNumber = 1;
  //     }
  //     this.formValidation();
  //   }
  // }

  fetchSelectedPONumber(event) {
    console.log('fetchSelectedPONumber', event);
    if (event === undefined) {
      this.grnForm.controls.poNo.setValue('');
      this.grnForm.controls.grnFor.setValue('');
      this.poList = [];
      this.poPageNumber = 1;
    } else {
      this.grnForm.controls.grnFor.setValue(event.poType);
      this.grnForm.controls.poNo.setValue(event.poNO);
      this.grnForm.controls.poId.setValue(event.poId);
      this.grnDtlList = this.grnForm.get('grnDtlList') as FormArray;

      let insertFlg = true;
      let count = this.poCalculationInternalList.length;
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          if (this.poCalculationInternalList[i] === event.poNO) {
            insertFlg = false;
          }
        }
      } else {
        this.poCalculationInternalList.push(event.poNO);
      }

      if (insertFlg) {

        this.grnForm.controls.supplierName.setValue(event.businessPartnerName);
        this.grnForm.controls.supplierId.setValue(event.businessPartnerId);
        this.grnForm.controls.supplierSiteName.setValue(event.businessPartnerSiteName);
        this.grnForm.controls.supplierSiteId.setValue(event.businessPartnerSiteId);
        this.grnForm.controls.locationId.setValue(event.locationId);
        this.grnForm.controls.locationName.setValue(event.locationName);
        this.grnForm.controls.supplierCurCd.setValue(event.curCd);
        this.grnForm.controls.poNo.setValue(event.poNO);
        this.grnForm.controls.poId.setValue(event.poId);

        this.defaultStoreId = (event.storeId);
        this.defaultStoreName = (event.storeName);

        console.log("default store name ", this.defaultStoreName);

        this.poCalculationInternalList.push(event.poNO);
        event.poDtlList.map(obj => {
          var tempValue = (obj.poNo != '' && obj.poNo != null) ? obj.poQty : obj.shipQty;
          var totalTaxAmt = Number(obj.taxAmt1 + obj.taxAmt2 + obj.taxAmt3);
          var grnBasicAmt = Number(obj.poBalanceQty * obj.unitPrice);
          var grnTaxInfo1 = obj.taxCd1 + " - " + obj.taxAmt1;
          var grnTaxInfo2 = obj.taxCd2 + " - " + obj.taxAmt2;
          const Group = this.formBuilder.group({
            grnNo: new FormControl(''),
            grnId: new FormControl(''),
            poId: new FormControl(obj.poId),
            poNo: new FormControl(obj.poNo),
            poReqId: new FormControl(''),
            poReqNo: new FormControl(obj.prReqNo),
            poQty: new FormControl(obj.poQty),
            assetCode: new FormControl(obj.assetCode),
            assetHdrId: new FormControl(obj.assetHdrId),
            modelName: new FormControl(obj.modelName),
            assetGroupName: new FormControl(obj.assetGroupName),
            serialNo: new FormControl(obj.serialNo),
            storeId: new FormControl(this.defaultStoreId),
            storeName: new FormControl(this.defaultStoreName),
            rejectReason: new FormControl(''),
            rejectReasonId: new FormControl(0),
            receivedQty: new FormControl(0),
            acceptQty: new FormControl(0),
            rejectQty: new FormControl('0'),
            poLineNoId: new FormControl(obj.poDtlId),
            poLineNo: new FormControl(obj.poLineNo),
            cancelFlag: new FormControl('N'),
            confirmApproval: new FormControl(false),
            supplierId: new FormControl(this.grnForm.controls.supplierId.value),
            supplierName: new FormControl(this.grnForm.controls.supplierName.value),
            supplierSiteId: new FormControl(this.grnForm.controls.supplierSiteId.value),
            supplierSiteName: new FormControl(this.grnForm.controls.supplierSiteName.value),
            grnBasicAmt: new FormControl(grnBasicAmt),
            poBalQty: new FormControl(obj.poBalanceQty),
            unitPrice: new FormControl(obj.unitPrice),
            taxCd1: new FormControl(obj.taxCd1),
            taxRate1: new FormControl(obj.taxRate1),
            taxAmt1: new FormControl(obj.taxAmt1),
            taxCd2: new FormControl(obj.taxCd2),
            taxRate2: new FormControl(obj.taxRate2),
            taxAmt2: new FormControl(obj.taxAmt2),
            taxAmt3: new FormControl(obj.taxAmt3),
            grnTaxInfo1: new FormControl(grnTaxInfo1),
            grnTaxInfo2: new FormControl(grnTaxInfo2),
            grnTaxInfo3: new FormControl(''),
            totalTaxAmt: new FormControl(totalTaxAmt),
            grnItemTotalAmt: new FormControl(obj.netAmt),

            uom: new FormControl(obj.uomCd),
            itemId: new FormControl(obj.itemId),
            itemName: new FormControl(obj.itemName),
            itemDesc: new FormControl(obj.itemDesc),
            description: new FormControl(obj.itemDesc),
            manufacturerName: new FormControl(''),
            manufacturerPartNo: new FormControl(''),
            rtvQty: new FormControl('0'),
            rtvFlag: new FormControl(false),

            srId: new FormControl(obj.srId),
            srNo: new FormControl(obj.srNo),

            itemTypeId: new FormControl(obj.itemTypeId),
            itemTypeName: new FormControl(obj.itemTypeName),
            poType: new FormControl(obj.poType),


          });

          if (obj.poBalanceQty > 0) {
            this.grnDtlList.push(Group);
          }
          // this.grnDtlList.push(Group);
        });
      } else {
        this.commonService.openToastWarningMessage("PO Number is already Selected");
      }

      // event.poDtlList.map(obj => {
      //   let count = this.poCalculationInternalList.length;

      //   if (!this.insertFlg) {

      //   } 
      // });
      this.poList = [];
      this.poPageNumber = 1;
      this.grnForm.controls.poNo.setValue('');
      this.formValidation();
    }

  }

  validateEditMode() {
    this.commonService.showSpinner();
    this.grnForm.get('grnNo').disable();
    this.grnForm.controls.supplierSiteName.disable();
    this.grnForm.controls.supplierCurCd.disable();
    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        var mode = params.mode;
        this.grnId = Number(primaryId);
        this.transactionSource = allWorkflowStatus[allWorkflowStatus.GRN_APPROVAL];
        primaryId = Number(primaryId);
        if (primaryId <= 0) {
          this.grnForm.controls['supplierName'].enable();
          this.grnForm.controls['address'].enable();

          this.headingDisplay = "Create";
          this.buttonDisplay = "Submit";

          // if(this.grnForm.controls.grnFor.value == 'SERVICE') {
          //   this.grnForm.controls.supplierInvoiceAmount.enable();
          // } else {
          //   this.grnForm.controls.supplierInvoiceAmount.disable();
          // }
        } else {
          if (mode == 'view') {
            this.headingDisplay = "View";
            this.buttonDisplay = "Update";

            this.disableSubmit = true;
            this.grnForm.disable();
            this.modeDisplay = true;
            this.disbleClear = true;
          } else {
            //button and heading names for edit
            this.grnListStatus = 2;
            this.disbleClear = true;
            this.disableSubmit = false;
            this.grnForm.enable();
            console.log("grnForm.controls.grnFor.value", this.grnForm.controls.grnFor.value)
            this.grnForm.controls.grnNo.disable()

            this.headingDisplay = "Edit";
            this.buttonDisplay = "Update";
            // this.grnForm.get('doNo').disable();
            // this.grnForm.get('supplierName').disable();
            // this.grnForm.get('supplierSiteName').disable();
            // this.grnForm.get('poNo').disable();
            // this.grnForm.get('grnDateDisp').disable();
            // this.grnForm.get('doDateDisp').disable();
          }
          this.commonService.commonGetService('loadGrnInfo.sams', primaryId).subscribe(
            data => {
              console.log("asset code : " + data.responseData.grnDtlList.assetCode);
              this.grnForm.patchValue(data.responseData);
              this.itemListinEditMode(data.responseData.grnDtlList);
              let poNo = "";
              for (let i = 0; i < data.responseData.grnDtlList.length; i++) {
                if (data.responseData.grnDtlList[i].poNo == '' || data.responseData.grnDtlList[i].poNo == null) {
                  this.grnForm.get('poNo').disable();
                }
              }
              let rowindex = this.grnForm.controls.grnDtlList.value.length - 1;
              this.grnForm.get('poNo').setValue(this.grnForm.controls.grnDtlList['controls'][rowindex]['controls'].poNo.value);
              if (this.poCalculationInternalList.findIndex(x => x === this.grnForm.get('poNo').value) === -1) {
                this.poCalculationInternalList.push(this.grnForm.get('poNo').value);
              }
              this.grnDocDataSource = data.responseData.grnDocList;
              setTimeout(() => {
                this.grnForm.controls.grnDocList.setValue(data.responseData.grnDocList);
              });
              this.grnForm.controls.grnFor.disable();
              this.getWorkflowApprovalForGRN();
            }
          )
        }
      }
    );
    this.commonService.hideSpinner();
    this.formValidation();
  }

  itemListinEditMode(event) {
    this.grnDtlList = this.grnForm.get('grnDtlList') as FormArray;
    event.map(obj => {
      var tempValue = (obj.poNo != '' && obj.poNo != null) ? obj.poQty : obj.shipQty;

      var totalTaxAmt = Number(obj.taxAmt1 + obj.taxAmt2 + obj.taxAmt3);
      var grnBasicAmt = Number(obj.acceptQty * obj.unitPrice);
      var grnTaxInfo1 = obj.taxCd1 + " - " + obj.taxAmt1;
      var grnTaxInfo2 = obj.taxCd2 + " - " + obj.taxAmt2;
      var grnLineTotalAmt = Number(grnBasicAmt) + Number(totalTaxAmt);
      const Group = this.formBuilder.group({
        grnDtlId: new FormControl(obj.grnDtlId),
        grnNo: new FormControl(obj.grnNo),
        grnId: new FormControl(obj.grnId),
        revisionNo: new FormControl(''),
        makerPartCode: new FormControl(obj.oemCode),
        poQty: new FormControl(obj.poQty),
        shipQty: new FormControl(''),
        acceptQty: new FormControl(obj.acceptQty),
        rejectQty: new FormControl(obj.rejectQty),
        doNo: new FormControl(obj.doNo),
        uom: new FormControl(obj.uom),
        unitPrice: new FormControl(obj.unitPrice),
        itemId: new FormControl(obj.itemId),
        itemName: new FormControl(obj.itemName),
        itemDesc: new FormControl(obj.description),
        description: new FormControl(obj.description),
        poId: new FormControl(obj.poId),
        poNo: new FormControl(obj.poNo),
        poDate: new FormControl(''),
        poReqId: new FormControl(''),
        poReqNo: new FormControl(obj.poReqNo),
        reqDt: new FormControl(''),
        custId: new FormControl(''),
        custCd: new FormControl(''),
        custName: new FormControl(''),
        ceid: new FormControl(''),
        depName: new FormControl(''),
        depId: new FormControl(''),
        receiptDt: new FormControl(''),
        companyId: new FormControl(''),
        companyName: new FormControl(''),
        address: new FormControl(''),
        storeId: new FormControl(obj.storeId),
        storeName: new FormControl(obj.storeName),
        rejectReason: new FormControl(''),
        rejectReasonId: new FormControl(0),
        receivedQty: new FormControl(obj.receivedQty),
        poLineNoId: new FormControl(obj.poLineNoId),
        poLineNo: new FormControl(obj.poLineNo),
        cancelFlag: new FormControl('N'),
        supplierId: new FormControl(this.grnForm.controls.supplierId.value),
        // supplierCd: new FormControl(this.grnForm.controls.supplierCd.value),
        supplierName: new FormControl(this.grnForm.controls.supplierName.value),
        supplierSiteId: new FormControl(this.grnForm.controls.supplierSiteId.value),
        supplierSiteName: new FormControl(this.grnForm.controls.supplierSiteName.value),
        grnBasicAmt: new FormControl(grnBasicAmt),
        poBalQty: new FormControl(obj.poBalQty),
        taxCd1: new FormControl(obj.taxCd1),
        taxRate1: new FormControl(obj.taxRate1),
        taxAmt1: new FormControl(obj.taxAmt1),
        taxCd2: new FormControl(obj.taxCd2),
        taxRate2: new FormControl(obj.taxRate2),
        taxAmt2: new FormControl(obj.taxAmt2),
        taxAmt3: new FormControl(obj.taxAmt3),
        grnTaxInfo1: new FormControl(grnTaxInfo1),
        grnTaxInfo2: new FormControl(grnTaxInfo2),
        grnTaxInfo3: new FormControl(''),
        totalTaxAmt: new FormControl(totalTaxAmt),
        grnItemTotalAmt: new FormControl(grnLineTotalAmt),
        rtvFlag: new FormControl(obj.rtvFlag),
        confirmApproval: new FormControl(obj.confirmApproval),
        manufacturerPartNo: new FormControl(obj.manufacturerPartNo),
        manufacturerName: new FormControl(obj.manufacturerName),
        rtvQty: new FormControl(obj.rtvQty),

        assetCode: new FormControl(obj.assetCode),
        assetGroupName: new FormControl(obj.assetGroupName),
        modelName: new FormControl(obj.modelName),
        serialNo: new FormControl(obj.serialNo),

        itemTypeId: new FormControl(obj.itemTypeId),
        itemTypeName: new FormControl(obj.itemTypeName),
        poType: new FormControl(obj.poType)

      });

      // const Group = this.formBuilder.group({
      //   grnDtlId: new FormControl(obj.grnDtlId),
      //   grnNo: new FormControl(obj.grnNo),
      //   grnId: new FormControl(''),
      //   revisionNo: new FormControl(''),
      //   description: new FormControl(obj.description),
      //   makerPartCode: new FormControl(obj.makerPartCode),
      //   poQty: new FormControl(obj.poQty),
      //   shipQty: new FormControl(obj.shipQty),
      //   acceptQty: new FormControl(obj.acceptQty), 
      //   rejectQty: new FormControl(obj.rejectQty),
      //   supplierReceiptNo: new FormControl(''),
      //   uom: new FormControl(obj.uom),
      //   unitPrice: new FormControl(obj.unitPrice),
      //   itemId: new FormControl(obj.itemId),
      //   itemName: new FormControl(obj.itemName),
      //   itemDesc: new FormControl(obj.itemName),
      //   poId: new FormControl(obj.poId),
      //   poNo: new FormControl(obj.poNo),
      //   poReqNo: new FormControl(obj.poReqNo),
      //   doNo: new FormControl(obj.doNo),
      //   poDate: new FormControl(''),
      //   doDt: new FormControl(''),
      //   storeId: new FormControl(obj.storeId),
      //   storeName: new FormControl(obj.storeName),
      //   rejectReason: new FormControl(obj.rejectReason),
      //   rejectReasonId: new FormControl(obj.rejectReasonId),
      //   receivedQty: new FormControl(obj.receivedQty),
      //   poLineNoId: new FormControl(obj.poLineNoId),
      //   poLineNo: new FormControl(obj.poLineNo),
      //   cancelFlag: new FormControl(obj.cancelFlag),
      //   confirmApproval: new FormControl(obj.confirmApproval),
      //   supplierId: new FormControl(this.grnForm.controls.supplierId.value),
      //   supplierName: new FormControl(this.grnForm.controls.supplierName.value),
      //   supplierSiteId: new FormControl(this.grnForm.controls.supplierSiteId.value),
      //   supplierSiteName: new FormControl(this.grnForm.controls.supplierSiteName.value),
      //   poBalQty: new FormControl(obj.poBalQty),
      //   poUnitPrice: new FormControl(0),
      //   poTaxAmt1: new FormControl(0),
      //   poTaxAmt2: new FormControl(0),
      //   poTaxAmt3: new FormControl(0),
      //   poLineTotalAmt : new FormControl(0)
      // });
      this.grnDtlList.push(Group);
    });
    this.formValidation();
  }

  //VALIDATION
  quantityValidation(value, index) {
    const setList = value['controls'];
    const maxValue: number = (this.grnForm.controls.poNo.value != '' && this.grnForm.controls.poNo.value != null) ? setList['poQty'].value : setList['shipQty'].value;
    this.grnForm.controls['grnDtlList']['controls'][index]['controls']['receivedQty'].setValidators([Validators.max(maxValue)]);
    if (this.grnForm.controls.grnDtlList['controls'][index]['controls']['receivedQty'].status == 'INVALID') {
      this.commonService.openToastWarningMessage("Received Qty should be equal or less than PO Qty/Ship Qty")
    }
  }

  acceptanceValidation(_element, _index) {
    const setListValue = _element['controls'];
    //let _receivedQty:number = setListValue['receivedQty'].value;
    let _shipQty = setListValue['shipQty'].value;
    let _acceptanceQty: number = this.grnForm.controls['grnDtlList']['controls'][_index]['controls']['acceptQty'].value;
    let _rejectQty = _shipQty - _acceptanceQty;

    //let _rejectQty = _receivedQty - _acceptanceQty;
    if (_rejectQty < 0) {
      this.commonService.openToastWarningMessage("Acceptance Qty should not be greater then Ship Qty");
      this.grnForm.controls['grnDtlList']['controls'][_index]['controls']['acceptQty'].setValue(0);
      _rejectQty = 0;
    }
    this.grnForm.controls['grnDtlList']['controls'][_index]['controls']['rejectQty'].setValue(_rejectQty);
  }

  rejectValidation(_element, _index) {
    const setListValue = _element['controls'];
    //let _receivedQty:number = setListValue['receivedQty'].value;
    let _shipQty = setListValue['shipQty'].value;
    let _rejectQty: number = this.grnForm.controls['grnDtlList']['controls'][_index]['controls']['rejectQty'].value;
    let _acceptanceQty = _shipQty - _rejectQty;

    //let _rejectQty = _receivedQty - _acceptanceQty;
    if (_acceptanceQty < 0) {
      this.commonService.openToastWarningMessage("Acceptance Qty should not be greater then Ship Qty");
      this.grnForm.controls['grnDtlList']['controls'][_index]['controls']['rejectQty'].setValue(0);
      _acceptanceQty = 0;
    }
    this.grnForm.controls['grnDtlList']['controls'][_index]['controls']['acceptQty'].setValue(_acceptanceQty);
  }

  listOfRejectReason(searchTerms) {
    this.scrollRejectReasonsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults('listOfAllRejectReasons.sams', searchTerms.term, '', '', this.limitCount, this.rejectReasonPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.rejectReasonPageNumber, this.rejectReasonList, data.responseData.comboList)
        this.rejectReasonPageNumber = this.getData.pageNumber;
        this.rejectReasonList = this.getData.dataList;
        this.scrollRejectReasonsync = false;
      }
    );
  }

  getRejectReasonValue(event, index) {
    if (event === undefined) {
      this.grnForm.controls.grnDtlList['controls'][index]['controls'].rejectReason.setValue('');
      this.grnForm.controls.grnDtlList['controls'][index]['controls'].rejectReasonId.setValue(0);
      this.rejectReasonList = [];
      this.rejectReasonPageNumber = 1;
    } else {
      this.grnForm.controls.grnDtlList['controls'][index]['controls'].rejectReasonId.setValue(event.rejectReasonId);
    }
  }

  setShipQty(_element, _index) {
    const setListValue = _element['controls'];
    let _shipQty = setListValue['shipQty'].value;
    if (this.grnForm.controls.poNo.value != '') {
      let _poNumber = setListValue['poNo'].value;
      let _balanceQty = setListValue['poBalQty'].value;
      if (_poNumber != null) {
        this.grnForm.controls['grnDtlList']['controls'][_index]['controls']['rejectQty'].setValue(0);
        if (_shipQty > _balanceQty) {
          this.grnForm.controls['grnDtlList']['controls'][_index]['controls']['shipQty'].setValue(0);
          this.grnForm.controls['grnDtlList']['controls'][_index]['controls']['acceptQty'].setValue(0);
          this.commonService.openToastWarningMessage("Ship Qty should not be greater than Balance Qty");
        } else {
          this.grnForm.controls['grnDtlList']['controls'][_index]['controls']['shipQty'].setValue(_shipQty);
          this.grnForm.controls['grnDtlList']['controls'][_index]['controls']['acceptQty'].setValue(_shipQty);
        }
      }
    } else {
      this.grnForm.controls['grnDtlList']['controls'][_index]['controls']['shipQty'].setValue(_shipQty);
      this.grnForm.controls['grnDtlList']['controls'][_index]['controls']['acceptQty'].setValue(_shipQty);
    }

  }

  getShipQty(_element, _index) {
    let _shipqty: number;
    const setListValue = _element['controls'];
    _shipqty = setListValue['shipQty'].value;
    return _shipqty;
  }

  dateValidation(event) {
    return false;
  }

  //Check Asset Type Name existence
  checkForDoNoExistence() {
    let constraintData: UniqueValidationModel = new UniqueValidationModel();
    constraintData.className = "com.sams.to.inventory.GrnHdrTO";
    constraintData.constraints = {
      'doNo': this.grnForm.controls.doNo.value.toLowerCase(),
      'supplierId': this.grnForm.controls.supplierId.value

    };
    this.commonService.checkUniqueValidation(constraintData).subscribe(
      data => {
        if (!data.success) {
          //show the warning invalidate the form group 
          this.ErrorMsg = data.message;
          this.grnForm.controls.doNo.setErrors(Validators.minLength);
          this.grnForm.controls.doNo.setErrors({ "notUnique": true });
        } else {
          this.ErrorMsg = '';
          this.grnForm.controls.doNo.setErrors(null);
        }
      });
  }

  getWorkflowApprovalForGRN() {
    this.commonService.commonGetService('getWorkflowForId.sams', this.grnForm.controls.grnId.value,
      this.userSessionService.getUserEmpId(),
      allWorkflowStatus[allWorkflowStatus.GRN_APPROVAL], this.userSessionService.getUserOrgId()).subscribe(
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

  formValidation() {
    if (this.grnDtlList && this.grnDtlList.length > 0) {
      this.formOneValid = true;
      this.grnForm.controls['supplierName'].disable();
      this.grnForm.controls['supplierSiteName'].disable();
    } else {
      this.formOneValid = false;
    }
    return this.formOneValid;
  }

  grnWorkflowApproval(status) {
    let result;
    let selectedGrnList = [];
    selectedGrnList.push({ ...this.grnForm.value, approvalId: this.approvalId });
    this.commonService.showSpinner();
    if (status) {
      result = this.commonService.commonWorkflowService(allWorkflowStatus[allWorkflowStatus.GRN_APPROVAL], selectedGrnList, " GRN ");
    }
    else {
      result = this.commonService.rejectApprove(allWorkflowStatus[allWorkflowStatus.GRN_APPROVAL], selectedGrnList, " GRN ");
    }

    result.then(data => {
      if (data) {
        this.closeGrn();
      }
    })
    this.commonService.hideSpinner();
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
      this.grnForm.controls['locationId'].setValue(0);
      this.locationNamePageNumber = 1;
    } else {
      this.grnForm.controls['locationId'].setValue(event.locationId);
    }
  }

  documentAddEdit() {
    let dialogRef = this.dialog.open(GrnDocInfoComponent, {
      height: 'auto',
      width: '500px',
      data: {
        'grnHdrId': this.grnForm.controls.grnId.value
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        this.fetchListOfGrnDocList();
        this.commonService.openToastSuccessMessage("Record Added Successfully.");
      });
  }

  grnDocDataSource: any = [];
  grnDocDisCol = ['sno', 'docName', 'docType', 'createdBy', 'createdDtDisp', 'action'];

  fetchListOfGrnDocList() {
    this.commonService.commonGetService('loadGrnDocList.sams', this.grnForm.controls.grnId.value).subscribe(
      (data) => {
        this.grnDocDataSource = [];
        this.grnDocDataSource = data.responseData;
        this.grnForm.controls.grnDocList.setValue(this.grnDocDataSource);
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
          this.commonService.commonGetService('deleteGrnDocInfo.sams', deleteid).subscribe(
            data => {
              if (data.success) {
                this.commonService.openToastSuccessMessage(data.message);
                this.fetchListOfGrnDocList();
              } else {
                this.commonService.openToastErrorMessage(data.message);
              }
            }
          );
          // }
        }
      });
  }

  dialogRef
  updateStoreandMPNInfo(rowindex) {
    this.dialogRef = this.dialog.open(GrnStoreInfoComponent, {
      height: '250px',
      width: '550px',
      data: {
        'rowIndex': rowindex,
        'itemId': this.grnForm.controls.grnDtlList['controls'][rowindex]['controls'].itemId.value,
        'storeId': this.grnForm.controls.grnDtlList['controls'][rowindex]['controls'].storeId.value > 0 ?
          this.grnForm.controls.grnDtlList['controls'][rowindex]['controls'].storeId.value : 0,
        'storeName': this.grnForm.controls.grnDtlList['controls'][rowindex]['controls'].storeName.value != '' ?
          this.grnForm.controls.grnDtlList['controls'][rowindex]['controls'].storeName.value : '',
        'manufacturerName': this.grnForm.controls.grnDtlList['controls'][rowindex]['controls'].manufacturerName.value != '' ?
          this.grnForm.controls.grnDtlList['controls'][rowindex]['controls'].manufacturerName.value : '',
        'manufacturerPartNo': this.grnForm.controls.grnDtlList['controls'][rowindex]['controls'].manufacturerPartNo.value != '' ?
          this.grnForm.controls.grnDtlList['controls'][rowindex]['controls'].manufacturerPartNo.value : ''
      }
    });
    this.dialogRef.disableClose = true;
    this.dialogRef.afterClosed().subscribe(
      data => {
        if (data.exit) {
          this.grnForm.controls.grnDtlList['controls'][data.form.rowIndex]['controls'].storeId.setValue(data.form.storeId)
          this.grnForm.controls.grnDtlList['controls'][data.form.rowIndex]['controls'].storeName.setValue(data.form.storeName);
          this.grnForm.controls.grnDtlList['controls'][data.form.rowIndex]['controls'].manufacturerPartNo.setValue(data.form.manufacturerPartNo);
          this.grnForm.controls.grnDtlList['controls'][data.form.rowIndex]['controls'].manufacturerName.setValue(data.form.manufacturerName);
        }
      });
  }

  checkForSupplierInvoiceNoExistence() {
    let supplierId = this.grnForm.controls.supplierId.value;
    let supplierSiteId = this.grnForm.controls.supplierSiteId.value;
    let supplierInvoiceNo = this.grnForm.controls.supplierInvoiceNo.value;
    this.commonService.commonGetService('validateSupplierInvoiceNo.sams', supplierId, supplierSiteId, supplierInvoiceNo).subscribe(
      data => {
        if (data.success) {
          if (data.responseData) {
            this.supplierInvoiceErrorMsg = data.message;
            this.grnForm.controls.supplierInvoiceNo.setErrors(Validators.minLength);
            this.grnForm.controls.supplierInvoiceNo.setErrors({ "notUnique": true });
          }
        } else {
          this.supplierInvoiceErrorMsg = '';
          this.grnForm.controls.supplierInvoiceNo.setErrors(null);
        }
      });
  }

  loadDataByPOId(transNo, transId) {
    this.commonService.commonGetService('loadGrnInfoByPOId.sams', transId, transNo).subscribe(
      data => {

        this.grnForm.controls.supplierName.setValue(data.responseData.businessPartnerName);
        this.grnForm.controls.supplierId.setValue(data.responseData.businessPartnerId);
        this.grnForm.controls.supplierSiteName.setValue(data.responseData.businessPartnerSiteName);
        this.grnForm.controls.supplierSiteId.setValue(data.responseData.businessPartnerSiteId);
        this.grnForm.controls.locationId.setValue(data.responseData.locationId);
        this.grnForm.controls.locationName.setValue(data.responseData.locationName);
        this.grnForm.controls.supplierCurCd.setValue(data.responseData.curCd);
        this.grnForm.controls.supplierCurCd.setValue(data.responseData.curCd);
        this.grnForm.controls.grnFor.setValue(data.responseData.poType);
        this.grnForm.controls.poNo.setValue(data.responseData.poNO);

        this.defaultStoreId = (data.responseData.storeId);
        this.defaultStoreName = (data.responseData.storeName);

        this.grnForm.controls.supplierName.disable();
        this.grnForm.controls.locationName.disable();
        this.grnForm.controls.poNo.disable();

        console.log("default store name ", this.defaultStoreName);

        this.poCalculationInternalList.push(data.responseData.poNO);
        this.grnDtlList = this.grnForm.get('grnDtlList') as FormArray;
        data.responseData.poDtlList.map(obj => {
          var tempValue = (obj.poNo != '' && obj.poNo != null) ? obj.poQty : obj.shipQty;
          var totalTaxAmt = Number(obj.taxAmt1 + obj.taxAmt2 + obj.taxAmt3);
          var grnBasicAmt = Number(obj.poBalanceQty * obj.unitPrice);
          var grnTaxInfo1 = obj.taxCd1 + " - " + obj.taxAmt1;
          var grnTaxInfo2 = obj.taxCd2 + " - " + obj.taxAmt2;
          const Group = this.formBuilder.group({
            grnNo: new FormControl(''),
            grnId: new FormControl(''),
            poId: new FormControl(obj.poId),
            poNo: new FormControl(obj.poNo),
            poReqId: new FormControl(''),
            poReqNo: new FormControl(obj.prReqNo),
            poQty: new FormControl(obj.poQty),
            assetCode: new FormControl(obj.assetCode),
            assetHdrId: new FormControl(obj.assetHdrId),
            modelName: new FormControl(obj.modelName),
            assetGroupName: new FormControl(obj.assetGroupName),
            serialNo: new FormControl(obj.serialNo),
            storeId: new FormControl(this.defaultStoreId),
            storeName: new FormControl(this.defaultStoreName),
            rejectReason: new FormControl(''),
            rejectReasonId: new FormControl(0),
            receivedQty: new FormControl(obj.poBalanceQty),
            acceptQty: new FormControl(obj.poBalanceQty),
            rejectQty: new FormControl('0'),
            poLineNoId: new FormControl(obj.poDtlId),
            poLineNo: new FormControl(obj.poLineNo),
            cancelFlag: new FormControl('N'),
            confirmApproval: new FormControl(true),
            supplierId: new FormControl(this.grnForm.controls.supplierId.value),
            supplierName: new FormControl(this.grnForm.controls.supplierName.value),
            supplierSiteId: new FormControl(this.grnForm.controls.supplierSiteId.value),
            supplierSiteName: new FormControl(this.grnForm.controls.supplierSiteName.value),
            grnBasicAmt: new FormControl(grnBasicAmt),
            poBalQty: new FormControl(obj.poBalanceQty),
            unitPrice: new FormControl(obj.unitPrice),
            taxCd1: new FormControl(obj.taxCd1),
            taxRate1: new FormControl(obj.taxRate1),
            taxAmt1: new FormControl(obj.taxAmt1),
            taxCd2: new FormControl(obj.taxCd2),
            taxRate2: new FormControl(obj.taxRate2),
            taxAmt2: new FormControl(obj.taxAmt2),
            taxAmt3: new FormControl(obj.taxAmt3),
            grnTaxInfo1: new FormControl(grnTaxInfo1),
            grnTaxInfo2: new FormControl(grnTaxInfo2),
            grnTaxInfo3: new FormControl(''),
            totalTaxAmt: new FormControl(totalTaxAmt),
            grnItemTotalAmt: new FormControl(obj.netAmt),

            uom: new FormControl(obj.uomCd),
            itemId: new FormControl(obj.itemId),
            itemName: new FormControl(obj.itemName),
            itemDesc: new FormControl(obj.itemDesc),
            description: new FormControl(obj.itemDesc),
            manufacturerName: new FormControl(''),
            manufacturerPartNo: new FormControl(''),
            rtvQty: new FormControl('0'),
            rtvFlag: new FormControl(false),

            srId: new FormControl(obj.srId),
            srNo: new FormControl(obj.srNo),
            poType: new FormControl(obj.poType),
          });
          this.grnDtlList.push(Group);
        });
      }
    )
  }

  updateAcceptQty(i: number) {
    const grnDtlList = this.grnForm.get('grnDtlList') as FormArray;
    const receivedQty = grnDtlList.at(i).get('receivedQty').value;
    grnDtlList.at(i).get('acceptQty').setValue(receivedQty);
  }
}