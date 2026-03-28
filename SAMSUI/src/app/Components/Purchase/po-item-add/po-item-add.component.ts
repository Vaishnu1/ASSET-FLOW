import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { getData } from 'src/app/Model/common/fetchListData';
import { CommonService } from 'src/app/Services/common-service/common.service';

@Component({
  selector: 'app-po-item-add',
  templateUrl: './po-item-add.component.html',
  styleUrls: ['./po-item-add.component.css']
})
export class PoItemAddComponent implements OnInit {

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

  poType: string;
  title : string;

  itemTypePageNumber: number;
  scrollItemTypeNamesync: boolean = false;
  itemTypeList: any = [];

  currentDate: Date;

  poTypeList: Array<{ poType: string }> = [
    { poType: 'MATERIAL' },
    { poType: 'SERVICE' },
    { poType: 'SERVICE/MATERIAL' }
  ];

  hdrPoType: string;

  constructor(public dialogRef: MatDialogRef<PoItemAddComponent>,
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
                this.itemTypePageNumber = 1;
                this.getData = new getData();
                this.currentDate = new Date();
              }

  ngOnInit(): void {

    this.mode = this.data.mode;
    this.poDtlForm = new FormGroup({

      poDtlId: new FormControl('0'),
      poId: new FormControl('0'),
      poType : new FormControl(''),
      poNo: new FormControl(''),
      poLineNo: new FormControl(''),
      itemId: new FormControl(''),
      itemName: new FormControl('',Validators.required),
      itemDesc: new FormControl('',Validators.required),
      manufacturerPartNo: new FormControl(''),
      uomCd: new FormControl(''),
      poQty: new FormControl('0',Validators.required),
      cancelQty: new FormControl('0'),
      cancelReason: new FormControl(''),
      receivedQty: new FormControl('0'),
      invoicedQty: new FormControl('0'),
      rtvQty: new FormControl('0'),
      unitPrice: new FormControl('0',Validators.required),
      locUnitPrice: new FormControl('0'),
      poBasicAmt: new FormControl('0'),
      poBalanceQty: new FormControl('0'),
      locPoBasicAmt: new FormControl('0'),
      inspectionRequired: new FormControl(''),
      poReqDt: new FormControl(''),
      poReqDtDisp : new FormControl('',Validators.required),
      lastReceivedDt: new FormControl(''),
      remarks: new FormControl(''),
      holdFlg: new FormControl(''),
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
      netAmt: new FormControl('0'),
      expDeliveryDt: new FormControl(''),
      expDeliveryDtDisp: new FormControl(''),
      prDtlId: new FormControl('0'),
      invoiceRdvcDt: new FormControl(''),
      invoiceClear: new FormControl(''),
      pendingInvAmt: new FormControl('0'),
      rejectQty: new FormControl('0'),
      prHdrId: new FormControl('0'),
      prReqNo: new FormControl('N/A'),
      deliveryCfmDt: new FormControl(''),
      srId: new FormControl('0'),
      srNo: new FormControl(''),
      assetHdrId: new FormControl('0'),
      assetCode: new FormControl(''),
      prCancel: new FormControl(''),
      masterUnitPrice: new FormControl('0'),
      itemLevelCancel: new FormControl(''),

      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      pageNumber: new FormControl(''),
      recordsPerPage: new FormControl(''),

      assetGroupName: new FormControl(''),
      serialNo: new FormControl(''),
      modelName: new FormControl(''),
      manufacturerName : new FormControl(''),

      itemTypeName : new FormControl('', [Validators.required]),
      itemTypeId : new FormControl(0)
    });


    this.itemPageNumber = 1;
    this.itemDescPageNumber = 1;
    this.taxCd1PageNumber = 1;
    this.taxCd2PageNumber = 1;
    this.taxCd3PageNumber = 1;
    this.itemTypePageNumber = 1;

    this.poDtlForm.controls.uomCd.disable();
    this.poDtlForm.controls.poBasicAmt.disable();

    this.poDtlForm.controls.taxRate1.disable();
    this.poDtlForm.controls.taxRate2.disable();
    this.poDtlForm.controls.taxRate3.disable();
    this.poDtlForm.controls.taxAmt1.disable();
    this.poDtlForm.controls.taxAmt2.disable();
    this.poDtlForm.controls.taxAmt3.disable();

    
    this.hdrPoType = this.data.poHdrInfo.poType ? this.data.poHdrInfo.poType : null;
    this.poType = this.poDtlForm.controls.poType.value;

    console.log("hdrPoType", this.poType);
    if(this.poType == 'CONTRACT') {
      if(this.mode == 'view'){
        this.title = 'View PO Asset';
      }else{
        this.title = 'Update PO Asset';
        this.displayButton = "Update";
      }
      this.poDtlForm.controls.assetCode.disable();
      this.poDtlForm.controls.serialNo.disable();
      this.poDtlForm.controls.assetGroupName.disable();
      this.poDtlForm.controls.modelName.disable();
      this.poDtlForm.controls.manufacturerName.disable();
    } else if (this.poType == 'MATERIAL') {
      if(this.mode == 'view'){
         this.title = 'View PO Part'
      } else{
         this.title = 'Add/Edit PO Part'
      }
    } else if(this.poType == 'SERVICE'){
      if(this.mode == 'view'){
        this.title = 'View PO Part'
      } else{
        this.title = 'Add/Edit PO Part'
      }
      this.poDtlForm.controls.itemName.clearValidators();
      this.poDtlForm.controls.itemName.updateValueAndValidity();
      this.poDtlForm.controls.itemDesc.clearValidators();
      this.poDtlForm.controls.itemDesc.updateValueAndValidity();
      this.poDtlForm.controls.itemTypeName.clearValidators();
      this.poDtlForm.controls.itemTypeName.updateValueAndValidity();
    }
    
  }

  ngAfterViewInit() {
    //this.commonService.setFormFocus(this.partnerSiteNameFocus);
    if (this.data.poDtlInfo != 0) {
      this.poDtlForm.patchValue(this.data.poDtlInfo.getRawValue());
    } 
    if(this.hdrPoType == null){
      this.hdrPoType = this.data.poDtlInfo
    }
    

    console.log("hdrPoType", this.poType);
    if(this.hdrPoType == null){
      this.hdrPoType = this.data.poDtlInfo.value;
    }

    this.poType = this.poDtlForm.controls.poType.value;

    if(this.poType != "MATERIAL" && this.poType != 'SERVICE'){
      this.poType = "CONTRACT";
    }
    if(this.poType == 'CONTRACT') {
      if(this.mode == 'view'){
        this.title = 'View PO Asset';
      }else{
        this.title = 'Update PO Asset';
        this.displayButton = "Update";
      }
      this.poDtlForm.controls.assetCode.disable();
      this.poDtlForm.controls.serialNo.disable();
      this.poDtlForm.controls.assetGroupName.disable();
      this.poDtlForm.controls.modelName.disable();
      this.poDtlForm.controls.manufacturerName.disable();
    } else if (this.poType == 'MATERIAL') {
      if(this.mode == 'view'){
         this.title = 'View PO Part'
      } else{
         this.title = 'Add/Edit PO Part'
      }
    } else if(this.poType == 'SERVICE'){
      if(this.mode == 'view'){
        this.title = 'View PO Part'
      } else{
        this.title = 'Add/Edit PO Part'
      }
      this.poDtlForm.controls.itemName.clearValidators();
      this.poDtlForm.controls.itemName.updateValueAndValidity();
      this.poDtlForm.controls.itemDesc.clearValidators();
      this.poDtlForm.controls.itemDesc.updateValueAndValidity();
      this.poDtlForm.controls.itemTypeName.clearValidators();
      this.poDtlForm.controls.itemTypeName.updateValueAndValidity();
    }

    this.cdr.detectChanges();
    
  }

  listOfItemTypeCombo(searchTerms) {
    this.scrollItemTypeNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllItemTypeCombo, searchTerms.term, '', '', this.limitCount, this.itemTypePageNumber, this.poType).subscribe(
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

    }
      this.poDtlForm.controls['itemId'].setValue(0);
      this.poDtlForm.controls['itemName'].setValue('');
      this.poDtlForm.controls['itemDesc'].setValue('');
      this.poDtlForm.controls['uomCd'].setValue('');
      this.itemList  = [];
      this.itemDescList = [];
      this.itemPageNumber = 1;
      this.itemDescPageNumber = 1;
  }

  getPoTypeValue(event){
    // this.poDtlForm.reset();
    this.poDtlForm.controls.itemTypeName.setValue('');
    this.poDtlForm.controls.itemName.setValue('');
    this.poDtlForm.controls.itemDesc.setValue('');
    this.poDtlForm.controls.poType.setValue(event.poType);

    this.itemDescList = [];
    this.itemPageNumber = 1;
    this.itemDescPageNumber = 1;
    this.itemTypePageNumber = 1;

    this.itemTypeList = [];
    this.itemTypePageNumber = 1;
  }

  listOfItemFromMaster(searchTerms) {
    this.scrollItemNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    let itemTypeId = this.poDtlForm.controls['itemTypeId'].value;
    this.commonService.getComboResults(this.assetOptimaServices.listAllItemCombo, searchTerms.term, '', itemTypeId, this.limitCount, this.itemPageNumber, '','MATCHED', '', this.poType).subscribe(
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
      this.poDtlForm.controls['uomCd'].setValue(event.masterUOMName);
      this.poDtlForm.controls['itemTypeId'].setValue(event.itemTypeId);
      this.poDtlForm.controls['itemTypeName'].setValue(event.itemTypeName);
    }
  }

  listOfItemDescFromMaster(searchTerms) {
    this.scrollItemDescsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    let itemTypeId = this.poDtlForm.controls['itemTypeId'].value;
    this.commonService.getComboResults('listOfItemDescCombo.sams', searchTerms.term, '', itemTypeId, this.limitCount, this.itemDescPageNumber, '','MATCHED', '', this.poType).subscribe(
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
      this.poDtlForm.controls['uomCd'].setValue(event.masterUOMName);
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

  fetchTaxCd1Id(event) {
    if(event !== undefined) {
      this.poDtlForm.controls['taxCd1'].setValue(event.taxCode);
      this.poDtlForm.controls['taxRate1'].setValue(event.taxRate);
  
      let tax1 = this.poDtlForm.controls['taxCd1'].value;
      let tax2 = this.poDtlForm.controls['taxCd2'].value;
      if (tax1 == tax2) {
        this.commonService.openToastWarningMessage("Tax 1 and Tax 2 should not be same");
        this.poDtlForm.controls['taxCd1'].setValue('');
        this.poDtlForm.controls['taxRate1'].setValue('0');
      }
    } else {
      this.poDtlForm.controls['taxCd1'].setValue('');
      this.poDtlForm.controls['taxRate1'].setValue('0');
    }
    
    this.calculationForLineItem();
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
    if(event !== undefined) {
      this.poDtlForm.controls['taxCd2'].setValue(event.taxCode);
      this.poDtlForm.controls['taxRate2'].setValue(event.taxRate);
  
      let tax1 = this.poDtlForm.controls['taxCd1'].value;
      let tax2 = this.poDtlForm.controls['taxCd2'].value;
      if (tax1 == tax2) {
        this.commonService.openToastWarningMessage("Tax 1 and Tax 2 should not be same");
        this.poDtlForm.controls['taxCd1'].setValue('');
        this.poDtlForm.controls['taxRate1'].setValue('0');
      }
    } else {
      this.poDtlForm.controls['taxCd2'].setValue('');
      this.poDtlForm.controls['taxRate2'].setValue('0');
    }
    
    this.calculationForLineItem();
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
    if(event !== undefined) {
      this.poDtlForm.controls['taxCd3'].setValue(event.taxCode);
      this.poDtlForm.controls['taxRate3'].setValue(event.taxRate);
    } else {
      this.poDtlForm.controls['taxCd3'].setValue('');
      this.poDtlForm.controls['taxRate3'].setValue('0');
    }
    
    this.calculationForLineItem();
  }

  clear() {
    this.poDtlForm.reset();
    this.poDtlForm.updateValueAndValidity();
  }

  exit() {
    this.dialogRef.close();
  }

  addPOItem () {
    const newPoDtlInfo = this.poDtlForm.getRawValue();
    let duplicateIndex = -1;
    if(newPoDtlInfo.poDtlId == 0) {
      duplicateIndex = this.isDuplicateItem(newPoDtlInfo);
    }
    
    if(this.poType == 'MATERIAL') {
      if (duplicateIndex !== -1) {
        this.commonService.openToastWarningMessage("Item already added.");
      } else {
        this.dialogRef.close(this.poDtlForm.getRawValue());
      }
    } else if (this.poType == 'CONTRACT') {
      this.dialogRef.close(this.poDtlForm.getRawValue());
    } else if (this.poType == 'SERVICE') {
      this.dialogRef.close(this.poDtlForm.getRawValue());
    }
  }

  calculationForLineItem() {
    var unitPrice = this.poDtlForm.controls.unitPrice.value;
    var poReqQty = this.poDtlForm.controls.poQty.value;
    var taxRate1 = this.poDtlForm.controls.taxRate1.value;
    var taxRate2 = this.poDtlForm.controls.taxRate2.value;
    var taxRate3 = this.poDtlForm.controls.taxRate3.value;

    var poBasicAmt = (unitPrice * poReqQty);
    this.poDtlForm.controls.poBasicAmt.setValue(poBasicAmt);
    var taxAmt1 = (poBasicAmt * taxRate1) / 100;
    var taxAmt2 = (poBasicAmt * taxRate2) / 100;
    var taxAmt3 = (poBasicAmt * taxRate3) / 100;
    var itemTotalTaxAmt = Number(taxAmt1) + Number(taxAmt2) + Number(taxAmt3);

    this.poDtlForm.controls.taxAmt1.setValue(taxAmt1.toFixed(2));
    this.poDtlForm.controls.taxAmt2.setValue(taxAmt2.toFixed(2));
    this.poDtlForm.controls.taxAmt3.setValue(taxAmt3.toFixed(2));

    var totalAmtC = (poBasicAmt + taxAmt1 + taxAmt2 + taxAmt3);
    this.poDtlForm.controls.itemTotalTaxAmt.setValue(itemTotalTaxAmt.toFixed(2));
    this.poDtlForm.controls.netAmt.setValue(totalAmtC.toFixed(2));
  }

  isDuplicateItem(poDtlInfo: any): number {
    const index = this.data.poDtlList.controls.findIndex(control => {
      const item = control.getRawValue();
      return item.itemId === poDtlInfo.itemId
       
    });
 
    return index;
  }

  dateChange(){
    this.poDtlForm.controls.poReqDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.poDtlForm.controls.poReqDtDisp.value));
  }

  dateChange2(){
    this.poDtlForm.controls.expDeliveryDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.poDtlForm.controls.expDeliveryDtDisp.value));
  }


}
