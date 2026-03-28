
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { allBusinessPartnerRoles } from 'src/app/Constants/AllStatusConstants';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { getData } from 'src/app/Model/common/fetchListData';
import { CommonService } from 'src/app/Services/common-service/common.service';

@Component({
  selector: 'app-pr-item-add',
  templateUrl: './pr-item-add.component.html',
  styleUrls: ['./pr-item-add.component.css']
})
export class PrItemAddComponent implements OnInit {

  poDtlForm: FormGroup;

  headingDisplay: string;
  
  buttonDisplay: string;

  displayButton: string = 'Add';

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  limitCount: any;

  itemPageNumber: number;
  scrollItemNamesync: boolean = false;
  itemList: any = [];

  itemDescPageNumber: number;
  scrollItemDescsync: boolean = false;
  itemDescList = [];

  scrollTaxCd1sync: boolean = false;
  taxCd1PageNumber: number;
  taxCD1List: any = [];

  scrollTaxCd2sync: boolean = false;
  taxCd2PageNumber: number;
  taxCD2List: any = [];

  scrollTaxCd3sync: boolean = false;
  taxCd3PageNumber: number;
  taxCD3List: any = [];

  getData: getData;
  viewMode : boolean = false;
  mode:string;

  scrollSuppliersync: boolean = false;
  supplierPageNumber: number;
  supplierList: any = [];

  scrollApprovedSuppliersync: boolean = false;
  approvedSupplierPageNumber: number;
  supplierLocationList: any = [];

  itemTypePageNumber: number;
  scrollItemTypeNamesync: boolean = false;
  itemTypeList: any = [];

  currencyCodePageNumber: number;
  scrollCurrencyCodesync: boolean = false;
  currencycdList: any = [];

  prType : string = null;

  currentDate: Date;
  assetHdrId:Number = 0;
  assetMainForm: FormGroup;
  displayedColumns = ['sNo','supplierName','supplierSite','unitPrice','tax1','tax2','tax3','prNo','prDate','qty','poNo'];
  prItemHistorySource = [];
  length: number = 0; 
  subloaderPR: boolean = false;
  itemId: number = 0;

  itemCount : number = 0;

  constructor(public dialogRef: MatDialogRef<PrItemAddComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private cdr: ChangeDetectorRef,
              private validationService: AssetOptimaConstants,
              private commonService: CommonService,
              public assetOptimaServices: AssetOptimaServices) { 
                this.itemPageNumber = 1;
                this.itemDescPageNumber = 1;
                this.taxCd1PageNumber = 1;
                this.taxCd2PageNumber = 1;
                this.taxCd3PageNumber = 1;
                this.supplierPageNumber = 1;
                this.approvedSupplierPageNumber = 1;
                this.currencyCodePageNumber = 1;
                this.getData = new getData();
                this.currentDate = new Date();
              }

  ngOnInit(): void {

    this.prType = this.data.prHdrInfo.prType;
    this.mode = this.data.mode;
    this.assetHdrId = this.data.assetHdrId;
    this.itemCount = this.data.itemCount;

    this.poDtlForm = new FormGroup({

      poReqDtlId: new FormControl('0'),
      poReqId: new FormControl('0'),
      prLineNo: new FormControl(''),
      itemId: new FormControl(''),
      
      itemCategoryName : new FormControl(''),
      itemCategoryId : new FormControl(''),
      manufacturerPartNo: new FormControl(''),
      uomCode: new FormControl(''),

      poReqQty: new FormControl('0',Validators.required),
      cancelQty: new FormControl('0'),
      unitPrice: new FormControl('0',Validators.required),
      

      basicAmt: new FormControl('0'),
      needByDt: new FormControl(''),
      needByDtDisp : new FormControl('',Validators.required),
      remarks: new FormControl(''),
      
      taxCd1: new FormControl(''),
      taxRate1: new FormControl('0'),
      taxAmt1: new FormControl('0'),
      taxCd2: new FormControl(''),
      taxRate2: new FormControl('0'),
      taxAmt2: new FormControl('0'),
      taxCd3: new FormControl(''),
      taxRate3: new FormControl('0'),
      taxAmt3: new FormControl('0'),
      itemTotalTaxAmt: new FormControl('0'),
      totalAmt: new FormControl('0'),
      exchRate : new FormControl('1'),
      localTotalAmt: new FormControl('0'),


      supplierId: new FormControl(''),
      supplierName: new FormControl('',Validators.required),
      supplierSiteId: new FormControl(''),
      supplierSiteName: new FormControl('',Validators.required),
      curCd : new FormControl(''),
      newItem : new FormControl(false),

      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      pageNumber: new FormControl(''),
      recordsPerPage: new FormControl(''),
      partnerSiteAddress: new FormControl(''),

      // itemTypeName : new FormControl('', [Validators.required]),
      // itemTypeId : new FormControl(0),
  
    });

    // for asset info tab
    this.assetMainForm = new FormGroup({
      assetCode: new FormControl(''),
      serialNo: new FormControl(''),
      assetStatus: new FormControl(null),
      assetCategoryName: new FormControl(),
      assetGroupName: new FormControl(''),
      manufacturerName: new FormControl(),
      modelName: new FormControl(''),
      departmentName: new FormControl(null),
      subDepartmentId: new FormControl(0),
      subDepartment: new FormControl(),
      assetPriority: new FormControl(),
      assetRisk: new FormControl(),
      functionalityName: new FormControl(''),
      roomName: new FormControl(''),
      floorName: new FormControl(''),
      segmentName: new FormControl(''),
      blockName: new FormControl(''),
      purchaseOrderNo: new FormControl(''),
      purchaseDtDisp: new FormControl(''),
      supplierName: new FormControl(),
      supplierContactPerson: new FormControl(),
      supplierContactNo: new FormControl(),
      actualInstalledDtDisp: new FormControl(),
      installationDoneBy: new FormControl(),
      amcPercent: new FormControl(0),
      cmcPercent: new FormControl(0),
      amcValue: new FormControl(0),
      cmcValue: new FormControl(0)
    });

    this.itemPageNumber = 1;
    this.itemDescPageNumber = 1;
    this.taxCd1PageNumber = 1;
    this.taxCd2PageNumber = 1;
    this.taxCd3PageNumber = 1;
    this.itemTypePageNumber = 1;

    this.poDtlForm.controls.uomCode.disable();
    this.poDtlForm.controls.basicAmt.disable();

    this.poDtlForm.controls.taxRate1.disable();
    this.poDtlForm.controls.taxRate2.disable();
    this.poDtlForm.controls.taxRate3.disable();
    this.poDtlForm.controls.taxAmt1.disable();
    this.poDtlForm.controls.taxAmt2.disable();
    this.poDtlForm.controls.taxAmt3.disable();

    if (this.prType === 'MATERIAL') {
      this.poDtlForm.addControl('itemTypeName', new FormControl('', Validators.required));
      this.poDtlForm.addControl('itemTypeId', new FormControl('', Validators.required));
      this.poDtlForm.addControl('itemName', new FormControl('',Validators.required));
      this.poDtlForm.addControl('itemDesc', new FormControl('',Validators.required));
    }else if(this.prType === 'SERVICE'){
      this.poDtlForm.controls.taxRate1.disable();
      this.poDtlForm.addControl('itemName', new FormControl(''));
      this.poDtlForm.addControl('itemDesc', new FormControl('', Validators.required));

      this.poDtlForm.addControl('itemTypeName', new FormControl(''));
      this.poDtlForm.addControl('itemTypeId', new FormControl(''));

      // this.poDtlForm.controls.itemTypeId.setValue('26');
      // this.poDtlForm.controls.itemTypeName.setValue('SERVICE');
      
    }else{
      this.poDtlForm.addControl('itemDesc', new FormControl(''));
    }

    if(this.mode == 'edit') {
      // this.poDtlForm.controls.itemName.disable();
      // this.poDtlForm.controls.itemDesc.disable();
    }

    this.validateEditMode();
    
  }

  ngAfterViewInit() {
    if (this.data.prDtlInfo != 0) {
      this.poDtlForm.patchValue(this.data.prDtlInfo.getRawValue());
      this.fetchPrItemHistory();    
    } 
    this.cdr.detectChanges();
  }

  dateChange(){
    this.poDtlForm.controls.needByDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.poDtlForm.controls.needByDtDisp.value));
  }



  listOfItemFromMaster(searchTerms) {
    this.scrollItemNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    let itemTypeId = this.poDtlForm.controls['itemTypeId'].value;
    this.commonService.getComboResults(this.assetOptimaServices.listAllItemCombo, searchTerms.term, '', itemTypeId, this.limitCount, this.itemPageNumber, '','MATCHED', '', this.prType).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.itemPageNumber, this.itemList, data.responseData.comboList)
        this.itemPageNumber = this.getData.pageNumber;
        this.itemList = this.getData.dataList;
        this.scrollItemNamesync = false;
      }
    );
  }

  

  getItemValueFromMaster(event) {
    if (event === undefined) {
      this.poDtlForm.controls['itemId'].setValue(0);
      this.poDtlForm.controls['itemName'].setValue('');
      this.poDtlForm.controls['itemDesc'].setValue('');

      this.itemPageNumber = 1;
    } else {
      this.poDtlForm.controls['itemId'].setValue(event.itemMasterId);
      this.poDtlForm.controls['itemName'].setValue(event.itemMasterName);
      this.poDtlForm.controls['itemDesc'].setValue(event.itemMasterDesc);
      this.poDtlForm.controls['uomCode'].setValue(event.masterUOMName);
      this.poDtlForm.controls['itemTypeId'].setValue(event.itemTypeId);
      this.poDtlForm.controls['itemTypeName'].setValue(event.itemTypeName);
      this.fetchPrItemHistory();
    }
  }


  listOfItemDescFromMaster(searchTerms) {
    this.scrollItemDescsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    let itemTypeId = this.poDtlForm.controls['itemTypeId'].value;
    this.commonService.getComboResults('listOfItemDescCombo.sams', searchTerms.term, '', itemTypeId, this.limitCount, this.itemDescPageNumber, '','MATCHED', '', this.prType).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.itemDescPageNumber, this.itemDescList, data.responseData.comboList)
        this.itemDescPageNumber = this.getData.pageNumber;
        this.itemDescList = this.getData.dataList;
        this.scrollItemDescsync = false;
      }
    );
  }


  getItemDescValueFromMaster(event) {
    if (event === undefined) {
      this.poDtlForm.controls['itemId'].setValue(0);
      this.poDtlForm.controls['itemName'].setValue('');
      this.poDtlForm.controls['itemDesc'].setValue('');

      this.itemDescPageNumber = 1;
    } else {
      this.poDtlForm.controls['itemId'].setValue(event.itemMasterId);
      this.poDtlForm.controls['itemName'].setValue(event.itemMasterName);
      this.poDtlForm.controls['itemDesc'].setValue(event.itemMasterDesc);
      this.poDtlForm.controls['uomCode'].setValue(event.masterUOMName);
      this.poDtlForm.controls['itemTypeId'].setValue(event.itemTypeId);
      this.poDtlForm.controls['itemTypeName'].setValue(event.itemTypeName);
    }
  }

  listOfTaxCd1(searchValue) {
    this.scrollTaxCd1sync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfTaxCombo, searchValue.term, '', '', this.limitCount, this.taxCd1PageNumber).subscribe(
      (data) => {
        this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.taxCd1PageNumber , this.taxCD1List , data.responseData.comboList)
          this.taxCd1PageNumber = this.getData.pageNumber;
          this.taxCD1List = this.getData.dataList;  
          this.scrollTaxCd1sync = false;
      }
    );
  }

  clearTaxCode(taxCd: string) {
    this.poDtlForm.controls[taxCd].setValue('');
    this.poDtlForm.controls['taxRate' + taxCd.charAt(taxCd.length - 1)].setValue('0');
    this.calculationForLineItem();
  }
  

  fetchTaxCd1Id(event) {
    if (event) {
    this.poDtlForm.controls['taxCd1'].setValue(event.taxCode);
    this.poDtlForm.controls['taxRate1'].setValue(event.taxRate);

    let tax1 = this.poDtlForm.controls['taxCd1'].value;
    let tax2 = this.poDtlForm.controls['taxCd2'].value;
    if (tax1 == tax2) {
      this.commonService.openToastWarningMessage("Tax 1 and Tax 2 should not be same");
      this.poDtlForm.controls['taxCd1'].setValue('');
      this.poDtlForm.controls['taxRate1'].setValue('0');
    }
    this.calculationForLineItem();
    } else {
      this.clearTaxCode('taxCd1');
    }
  }

  listOfTaxCd2(searchValue) {
    this.scrollTaxCd2sync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfTaxCombo, searchValue.term, '', '', this.limitCount, this.taxCd2PageNumber).subscribe(
      (data) => {
        this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.taxCd2PageNumber , this.taxCD2List , data.responseData.comboList)
          this.taxCd2PageNumber = this.getData.pageNumber;
          this.taxCD2List = this.getData.dataList;  
          this.scrollTaxCd2sync = false;
      }
    );
  }

  fetchTaxCd2Id(event) {
    if(event){
    this.poDtlForm.controls['taxCd2'].setValue(event.taxCode);
    this.poDtlForm.controls['taxRate2'].setValue(event.taxRate);

    let tax1 = this.poDtlForm.controls['taxCd1'].value;
    let tax2 = this.poDtlForm.controls['taxCd2'].value;
    if (tax1 == tax2) {
      this.commonService.openToastWarningMessage("Tax 1 and Tax 2 should not be same");
      this.poDtlForm.controls['taxCd1'].setValue('');
      this.poDtlForm.controls['taxRate1'].setValue('0');
    }
    this.calculationForLineItem();
  }else{
    this.clearTaxCode('taxCd2');
  }
  }

  listOfTaxCd3(searchValue) {
    this.scrollTaxCd3sync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfTaxCombo, searchValue.term, '', '', this.limitCount, this.taxCd3PageNumber).subscribe(
      (data) => {
        this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.taxCd3PageNumber , this.taxCD3List , data.responseData.comboList)
          this.taxCd3PageNumber = this.getData.pageNumber;
          this.taxCD3List = this.getData.dataList;  
          this.scrollTaxCd3sync = false;
      }
    );
  }

  fetchTaxCd3Id(event) {
    if(event){
    this.poDtlForm.controls['taxCd3'].setValue(event.taxCode);
    this.poDtlForm.controls['taxRate3'].setValue(event.taxRate);
    this.calculationForLineItem();
    }else{
      this.clearTaxCode('taxCd3');
    }
  }

  clear() {
    this.poDtlForm.reset();
    this.poDtlForm.updateValueAndValidity();
  }

  exit() {
    this.dialogRef.close();
  }

  addPRItem() {
    const newPoDtlInfo = this.poDtlForm.getRawValue();
    if (this.mode == 'add') {
      const duplicateIndex = this.isDuplicateItem(newPoDtlInfo);
      if (duplicateIndex !== -1) {
        this.commonService.openToastWarningMessage("Part already added.");
      } else {
        if(this.prType === 'SERVICE') {
          // this.poDtlForm.controls.itemTypeId.setValue('26');
          // this.poDtlForm.controls.itemTypeName.setValue('SERVICE');
        }
        this.dialogRef.close(this.poDtlForm.getRawValue());
      }
    } else {
      this.dialogRef.close(this.poDtlForm.getRawValue());
    }
  }

  calculationForLineItem() {
    var unitPrice = this.poDtlForm.controls.unitPrice.value;
    var poReqQty = this.poDtlForm.controls.poReqQty.value;
    var taxRate1 = this.poDtlForm.controls.taxRate1.value;
    var taxRate2 = this.poDtlForm.controls.taxRate2.value;
    var taxRate3 = this.poDtlForm.controls.taxRate3.value;
    var exchRate = this.poDtlForm.controls.exchRate.value;

    var basicAmt = (unitPrice * poReqQty);
    this.poDtlForm.controls.basicAmt.setValue(basicAmt);
    var taxAmt1 = (basicAmt * taxRate1) / 100;
    var taxAmt2 = (basicAmt * taxRate2) / 100;
    var taxAmt3 = (basicAmt * taxRate3) / 100;
    var itemTotalTaxAmt = Number(taxAmt1) + Number(taxAmt2) + Number(taxAmt3);

    this.poDtlForm.controls.taxAmt1.setValue(taxAmt1.toFixed(2));
    this.poDtlForm.controls.taxAmt2.setValue(taxAmt2.toFixed(2));
    this.poDtlForm.controls.taxAmt3.setValue(taxAmt3.toFixed(2));

    var totalAmtC = (basicAmt + taxAmt1 + taxAmt2 + taxAmt3);
    this.poDtlForm.controls.itemTotalTaxAmt.setValue(itemTotalTaxAmt.toFixed(2));
    this.poDtlForm.controls.totalAmt.setValue(totalAmtC.toFixed(2));

    this.poDtlForm.controls.localTotalAmt.setValue(this.poDtlForm.controls.totalAmt.value * exchRate);

  }

  isDuplicateItem(poDtlInfo: any): number {
    const index = this.data.prDtlList.controls.findIndex(control => {
      const item = control.getRawValue();
      if(item.itemId)
      {
        return item.itemId === poDtlInfo.itemId
      }
      
       
    });
 
    return index;
  }

  listOfSupplier(searchValue) {
    this.scrollSuppliersync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.SUPPLIER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchValue.term, '', '', this.limitCount, this.supplierPageNumber,'',partnerRoles).subscribe(
      (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.supplierPageNumber , this.supplierList , data.responseData.comboList)
          this.supplierPageNumber = this.getData.pageNumber;
          this.supplierList = this.getData.dataList;  
          this.scrollSuppliersync = false;
      }
    );
  }

  fetchIdOfSupplier(event) {
    if(event===undefined){
      this.poDtlForm.controls.supplierId.setValue(0);
      this.poDtlForm.controls.supplierName.setValue('');
      this.poDtlForm.controls.supplierSiteId.setValue(0);
      this.poDtlForm.controls.supplierSiteName.setValue('');
      this.poDtlForm.controls.partnerSiteAddress.setValue('');
      this.supplierLocationList = [];
      this.approvedSupplierPageNumber = 1;
    }else{
      this.poDtlForm.controls.supplierId.setValue(event.businessPartnerId);
      this.poDtlForm.controls.supplierName.setValue(event.businessPartnerName);
      this.poDtlForm.controls.supplierSiteId.setValue(0);
      this.poDtlForm.controls.supplierSiteName.setValue('');
      this.poDtlForm.controls.partnerSiteAddress.setValue('');
      this.supplierLocationList = [];
      this.approvedSupplierPageNumber = 1;
    }  
  }

  listOfSupplierApproved(searchValue){
    this.scrollApprovedSuppliersync = true;
    this.limitCount = (searchValue.term === '' || searchValue.term  === undefined || searchValue.term  === null) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerSiteCombo,searchValue.term,this.poDtlForm.controls.supplierId.value,'',this.limitCount, this.approvedSupplierPageNumber,'').subscribe(
      (data) =>{
        if (data.success) {
          if (searchValue.term === '' || searchValue.term=== undefined || searchValue.term === null) {
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

  setSupplierSiteNameComboValue(event){
    if (event === undefined) {
      this.poDtlForm.get('supplierSiteId').setValue(0);
      this.supplierLocationList = [];
      this.approvedSupplierPageNumber = 1;
    } else {
      this.poDtlForm.get('supplierSiteId').setValue(event.partnerSiteId);
      this.poDtlForm.get('supplierSiteName').setValue(event.partnerSiteName);
      this.poDtlForm.controls.partnerSiteAddress.setValue(event.partnerSiteAddress1 + "," + event.partnerSiteAddress2 + " , " + event.partnerSiteArea
      + "," + event.partnerSiteCity + "," + event.partnerSiteState + "," + event.partnerSiteCountry
      + "," + event.partnerSitePinCode);
      this.poDtlForm.controls.curCd.setValue(event.partnerSiteCurCd);
    }
  }


  listOfItemTypeCombo(searchTerms) {
    this.scrollItemTypeNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    const prTypeParam = this.itemCount >= 1 && this.mode == 'add' || this.itemCount > 1 && this.mode == 'edit' ? this.prType : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllItemTypeCombo, searchTerms.term, '', '', this.limitCount, this.itemTypePageNumber,prTypeParam).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.itemTypePageNumber, this.itemTypeList, data.responseData.comboList)
        this.itemTypePageNumber = this.getData.pageNumber;
        this.itemTypeList = this.getData.dataList;
        this.scrollItemTypeNamesync = false;
      }
    );
  }


  getItemTypeValue(event) {
    if (event === undefined) {
      this.poDtlForm.controls['itemTypeId'].setValue(0);
      this.poDtlForm.controls['itemTypeName'].setValue('');
      this.itemTypePageNumber = 1;
    } else {
      this.poDtlForm.controls['itemTypeId'].setValue(event.itemTypeId);
      this.poDtlForm.controls['itemTypeName'].setValue(event.itemTypeName);
      this.poDtlForm.controls['itemCategoryName'].setValue(event.itemCategoryName);
      this.poDtlForm.controls['itemCategoryId'].setValue(event.itemCategoryId);

      this.prType = event.itemCategoryName;

      this.poDtlForm.controls['itemId'].setValue(0);
      this.poDtlForm.controls['itemName'].setValue(' ');
      this.poDtlForm.controls['itemDesc'].setValue(' ');
      this.poDtlForm.controls['uomCode'].setValue('');
      
      this.poDtlForm.controls.supplierId.setValue(0);
      this.poDtlForm.controls.supplierName.setValue('');
      this.poDtlForm.controls.supplierSiteId.setValue(0);
      this.poDtlForm.controls.supplierSiteName.setValue('');
      this.poDtlForm.controls.partnerSiteAddress.setValue('');
      this.poDtlForm.controls.poReqQty.setValue('0');
      this.poDtlForm.controls.unitPrice.setValue('0');
      this.poDtlForm.controls.basicAmt.setValue('0');

      this.poDtlForm.controls.taxCd1.setValue('');
      this.poDtlForm.controls.taxRate1.setValue('0');
      this.poDtlForm.controls.taxCd2.setValue('');
      this.poDtlForm.controls.taxRate2.setValue('0');
      this.poDtlForm.controls.taxCd3.setValue('');
      this.poDtlForm.controls.taxRate3.setValue('0');
      this.poDtlForm.controls.taxAmt1.setValue('0');
      this.poDtlForm.controls.taxAmt2.setValue('0');
      this.poDtlForm.controls.taxAmt3.setValue('0');
      this.poDtlForm.controls.itemTotalTaxAmt.setValue('0');
      this.poDtlForm.controls.totalAmt.setValue('0');
      this.poDtlForm.controls.exchRate.setValue('0');
      this.poDtlForm.controls.localTotalAmt.setValue('0');
      this.poDtlForm.controls.needByDt.setValue('');
      this.poDtlForm.controls.needByDtDisp.setValue('');
      this.poDtlForm.controls.curCd.setValue('');
      this.poDtlForm.controls.remarks.setValue('');

      
    }
    this.poDtlForm.controls['itemId'].setValue(0);
    this.poDtlForm.controls['itemName'].setValue(' ');
    this.poDtlForm.controls['itemDesc'].setValue(' ');
    this.poDtlForm.controls['uomCode'].setValue('');
    this.itemList  = [];
    this.itemDescList = [];
    this.itemPageNumber = 1;
    this.itemDescPageNumber = 1;
  }

  listOfCurrencyCd(searchValue) {
    this.scrollCurrencyCodesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfCurCdCombo, searchValue.term, '', '', this.limitCount, this.currencyCodePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.currencyCodePageNumber , this.currencycdList , data.responseData.comboList)
        this.currencyCodePageNumber = this.getData.pageNumber;
        this.currencycdList = this.getData.dataList;
        this.scrollCurrencyCodesync = false;
      }
    );
  }

  getCurrencyCodeData(event) {
    if (event === undefined) {
      this.poDtlForm.controls['curCd'].setValue('');
      this.currencyCodePageNumber = 1;
    } else {
      this.poDtlForm.controls['curCd'].setValue(event.curCd);
    }
  }

  validateEditMode(){
    if(this.assetHdrId){
      this.commonService.commonGetService('fetchAssetDtlByAssetId.sams',this.assetHdrId).subscribe(
        data => {
          this.assetMainForm.patchValue(data.responseData);
        }
      )
    }

  }

  fetchPrItemHistory(){
    this.subloaderPR = true;
    this.prItemHistorySource = null;
    this.itemId = this.poDtlForm.controls.itemId.value;
    if(this.itemId > 0){
      this.commonService.commonGetService('listOfPurchaseRequestDtlInfoByItemId.sams',this.itemId).subscribe(
        data => {
          if (data.success) {
            this.subloaderPR = false;
            this.prItemHistorySource = data.responseData;
            this.length = this.prItemHistorySource.length;
          } else{
            this.subloaderPR = false;
          }
        }
      )
    } else{
      this.subloaderPR = false;
    }
  }
  
}


