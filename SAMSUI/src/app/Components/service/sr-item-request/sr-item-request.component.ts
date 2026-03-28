import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { getData } from 'src/app/Model/common/fetchListData';
import { ConfirmConfirmationComponent } from '../../Common-components/confirm-confirmation/confirm-confirmation.component';

@Component({
  selector: 'app-sr-item-request',
  templateUrl: './sr-item-request.component.html',
  styleUrls: ['./sr-item-request.component.css']
})
export class SrItemRequestComponent implements OnInit {

  itemRequestAddForm: FormGroup;

  headingDisplay: string;
  buttonDisplay: string;

  itemRequestTypeList = [
    { id: 1, name: 'PURCHASE REQUEST' },
    { id: 2, name: 'STOCK INDENT' }
  ];

  itemRequestForList = [
    { id: 1, name: 'MATERIAL' },
    { id: 2, name: 'SERVICE' }
  ];

  displayedColumnsForItemReq = ['sNo', 'srNo', 'itemName', 'itemDescription','itemTypeName', 'requiredQty','itemRequestType','itemUnApprovedFlagDisp', 'action'];
  itemReqMainDataSource : any[] = [];
  
  lengthItemReq : any;

  limitCount: any;

  itemPageNumber: number;
  scrollItemNamesync: boolean = false;
  itemList: any = [];

  itemDescPageNumber: number;
  scrollItemDescsync: boolean = false;
  itemDescList = [];

  getData: getData;
  unApprovedItemFlag: boolean = false;

  locationId : number;
  defaultStoreId: Number = 0;
  defaultStoreName: String;

  uomCdPageNumber: number;
  scrollUomCdSync: boolean = false;
  uomComboList: any = [];

  itemTypePageNumber: number;
  scrollItemTypeNamesync: boolean = false;
  itemTypeList: any = [];
  
  scrollPRReasonsync: boolean = false;
  prReasonPageNumber: number;
  prReasonList: any = [];
  currentDate: Date;

  constructor(public dialogRef: MatDialogRef<SrItemRequestComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private dialog: MatDialog,
              private change: ChangeDetectorRef,
              private commonService: CommonService,
              private assetOptimaServices: AssetOptimaServices,
              private validationService: AssetOptimaConstants,
              private detectorRefs: ChangeDetectorRef,
              private userSessionService: UserSessionService,
              private readonly router: Router,
              private readonly location: Location) { 

        this.itemPageNumber = 1;
        this.itemDescPageNumber = 1;
        this.uomCdPageNumber = 1;
        this.itemTypePageNumber = 1;
        this.prReasonPageNumber = 1;
        this.getData = new getData();
        this.currentDate = new Date();
  }

  ngOnInit(): void {
    this.itemRequestAddForm = new FormGroup({
      srId : new FormControl(''),
      srNo : new FormControl(''),
      itemId : new FormControl(''),
      itemName : new FormControl('', [Validators.required]),
      itemDescription : new FormControl('', [Validators.required]),
      itemUnApprovedFlag : new FormControl(false),
      itemRequestType : new FormControl('', [Validators.required]),
      itemRequestFor : new FormControl('', [Validators.required]),
      requiredQty : new FormControl('', [Validators.required,Validators.min(1),Validators.max(1000)]),
      uomCd : new FormControl(''),
      availableQty : new FormControl('0'),
      // itemNameNew : new FormControl('', [Validators.required]),
      // itemDescriptionNew : new FormControl('', [Validators.required]),
      // uomCdNew : new FormControl('', [Validators.required]),
      storeName : new FormControl(''),
      storeId : new FormControl(''),
      itemUnApprovedFlagDisp : new FormControl('No'),
      locationId : new FormControl(''),
      locationName : new FormControl(''),
      assetHdrId : new FormControl(''),
      assetCode : new FormControl(''),
      itemTypeName : new FormControl('', [Validators.required]),
      itemTypeId : new FormControl(0),
      prReason: new FormControl(''),
      needByDtDisp : new FormControl('')
    });
    this.itemRequestAddForm.controls.srId.setValue(this.data.srId);
    this.itemRequestAddForm.controls.srNo.setValue(this.data.srNo);
    this.itemRequestAddForm.controls.locationId.setValue(this.data.locationId);
    this.itemRequestAddForm.controls.locationName.setValue(this.data.locationName);
    this.itemRequestAddForm.controls.assetHdrId.setValue(this.data.assetHdrId);
    this.itemRequestAddForm.controls.assetCode.setValue(this.data.assetCode);
    this.locationId = this.data.locationId;

    this.itemRequestAddForm.controls.availableQty.disable();
    this.itemRequestAddForm.controls.storeName.disable();

    this.headingDisplay = "Create";
    this.buttonDisplay = "Submit";

    this.itemPageNumber = 1;
    this.itemDescPageNumber = 1;
    this.uomCdPageNumber = 1;
    this.itemTypePageNumber = 1;
    this.lengthItemReq = '0';
    this.fetchDefaultStoreForLoc();
  }

  exit() {
    this.dialogRef.close();
  }

  listOfItemFromMaster(searchTerms) {
    this.scrollItemNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    let itemTypeId = this.itemRequestAddForm.controls['itemTypeId'].value;
    this.commonService.getComboResults(this.assetOptimaServices.listAllItemCombo, searchTerms.term, '', itemTypeId, this.limitCount, this.itemPageNumber, '','MATCHED', '', this.itemRequestAddForm.controls.itemRequestFor.value).subscribe(
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
      this.itemRequestAddForm.controls['itemId'].setValue(0);
      this.itemRequestAddForm.controls['itemName'].setValue('');
      this.itemRequestAddForm.controls['itemDescription'].setValue('');

      this.itemPageNumber = 1;
    } else {
      this.itemRequestAddForm.controls['itemId'].setValue(event.itemMasterId);
      this.itemRequestAddForm.controls['itemName'].setValue(event.itemMasterName);
      this.itemRequestAddForm.controls['itemDescription'].setValue(event.itemMasterDesc);
      this.itemRequestAddForm.controls['uomCd'].setValue(event.masterUOMName);
      this.itemRequestAddForm.controls['itemTypeId'].setValue(event.itemTypeId);
      this.itemRequestAddForm.controls['itemTypeName'].setValue(event.itemTypeName);
      this.fetchOnHandQty();
    }
  }

  listOfItemDescFromMaster(searchTerms) {
    this.scrollItemDescsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    let itemTypeId = this.itemRequestAddForm.controls['itemTypeId'].value;
    this.commonService.getComboResults('listOfItemDescCombo.sams', searchTerms.term, '', itemTypeId, this.limitCount, this.itemDescPageNumber, '','MATCHED', '', this.itemRequestAddForm.controls.itemRequestFor.value).subscribe(
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
      this.itemRequestAddForm.controls['itemId'].setValue(0);
      this.itemRequestAddForm.controls['itemName'].setValue('');
      this.itemRequestAddForm.controls['itemDescription'].setValue('');

      this.itemDescPageNumber = 1;
    } else {
      this.itemRequestAddForm.controls['itemId'].setValue(event.itemMasterId);
      this.itemRequestAddForm.controls['itemName'].setValue(event.itemMasterName);
      this.itemRequestAddForm.controls['itemDescription'].setValue(event.itemMasterDesc);
      this.itemRequestAddForm.controls['uomCd'].setValue(event.masterUOMName);
      this.itemRequestAddForm.controls['itemTypeId'].setValue(event.itemTypeId);
      this.itemRequestAddForm.controls['itemTypeName'].setValue(event.itemTypeName);
      // this.itemRequestAddForm.controls.uomCd.disable();
      this.fetchOnHandQty();
    }
  }

  listOfItemTypeCombo(searchTerms) {
    this.scrollItemTypeNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllItemTypeCombo, searchTerms.term, '', '', this.limitCount, this.itemTypePageNumber, this.itemRequestAddForm.controls.itemRequestFor.value).subscribe(
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
      this.itemRequestAddForm.controls['itemTypeId'].setValue(0);
      this.itemRequestAddForm.controls['itemTypeName'].setValue('');
      this.itemTypePageNumber = 1;
    } else {
      this.itemRequestAddForm.controls['itemTypeId'].setValue(event.itemTypeId);
      this.itemRequestAddForm.controls['itemTypeName'].setValue(event.itemTypeName);

      this.itemRequestAddForm.controls['itemId'].setValue(0);
      this.itemRequestAddForm.controls['itemName'].setValue('');
      this.itemRequestAddForm.controls['itemDescription'].setValue('');
      this.itemRequestAddForm.controls['uomCd'].setValue('');
      this.itemList  = [];
      this.itemDescList = [];
      this.itemPageNumber = 1;
      this.itemDescPageNumber = 1;
    }
  }

  changeItemReqFor(event) {
    if (event === undefined) {
      this.itemRequestAddForm.controls.itemRequestFor.setValue('');
      this.itemRequestAddForm.controls.itemRequestType.enable();
    } else {
      this.itemRequestAddForm.controls.itemRequestFor.setValue(event.name);
      if(event.name == 'SERVICE') {
        this.itemRequestAddForm.controls.requiredQty.setValue(1);
        this.itemRequestAddForm.controls.itemRequestType.setValue('PURCHASE REQUEST');
        this.itemRequestAddForm.controls.itemRequestType.disable();
        

        this.itemRequestAddForm.controls.itemName.clearValidators();
        this.itemRequestAddForm.controls.itemName.updateValueAndValidity();

        this.itemRequestAddForm.controls.itemUnApprovedFlag.disable();

        this.itemRequestAddForm.controls.itemUnApprovedFlag.setValue(false);
        this.enableUnApprovedItem();

        this.itemRequestAddForm.controls.itemUnApprovedFlag.disable();
      }else if(event.name == 'MATERIAL'){
        this.itemRequestAddForm.controls.itemRequestType.enable();
        this.itemRequestAddForm.controls.itemUnApprovedFlag.enable();
        this.itemRequestAddForm.controls.itemName.setValidators(Validators.required);
      this.itemRequestAddForm.controls.itemName.updateValueAndValidity();
      }
    }
    this.itemTypePageNumber = 1;
    this.itemTypeList = [];

    this.itemRequestAddForm.controls['itemTypeId'].setValue(0);
    this.itemRequestAddForm.controls['itemTypeName'].setValue('');
    this.itemTypePageNumber = 1;

    this.itemRequestAddForm.controls['itemId'].setValue(0);
    this.itemRequestAddForm.controls['itemName'].setValue('');
    this.itemRequestAddForm.controls['itemDescription'].setValue('');
    this.itemRequestAddForm.controls['uomCd'].setValue('');
    this.itemList  = [];
    this.itemDescList = [];
    this.itemPageNumber = 1;
    this.itemDescPageNumber = 1;
  }

  changeItemReqType(event) {
    if (event === undefined) {
      this.itemRequestAddForm.controls.itemRequestType.setValue('');
    } else {
      this.itemRequestAddForm.controls.itemRequestType.setValue(event.name);
    }
  }

  enableUnApprovedItem() {
    if(this.itemRequestAddForm.controls.itemUnApprovedFlag.value == true) {
      this.unApprovedItemFlag = true;
      this.itemRequestAddForm.controls.itemName.clearValidators();
      this.itemRequestAddForm.controls.itemName.updateValueAndValidity();

      this.itemRequestAddForm.controls.itemId.setValue('0');
      this.itemRequestAddForm.controls.itemName.setValue('');
      this.itemRequestAddForm.controls.itemDescription.setValue('');
      this.itemRequestAddForm.controls.uomCd.setValue('');

      this.itemRequestAddForm.controls.storeName.setValue('');
      this.itemRequestAddForm.controls.availableQty.setValue('0');

      //this.itemRequestAddForm.controls.itemName.disable();
      //this.itemRequestAddForm.controls.itemDescription.disable();
      //this.itemRequestAddForm.controls.uomCd.disable();
      this.itemRequestAddForm.controls.itemUnApprovedFlagDisp.setValue('Yes');
    } else if (this.itemRequestAddForm.controls.itemUnApprovedFlag.value == false) {
      // this.itemRequestAddForm.controls.itemName.setValidators(Validators.required);
      // this.itemRequestAddForm.controls.itemName.updateValueAndValidity();
      this.unApprovedItemFlag = false;
      this.itemRequestAddForm.controls.itemName.enable();
      this.itemRequestAddForm.controls.itemDescription.enable();
      this.itemRequestAddForm.controls.itemUnApprovedFlagDisp.setValue('No');
    }
  }

  fetchOnHandQty() {
      let locId = this.locationId;
      let storeId = this.defaultStoreId;
      let itemId = this.itemRequestAddForm.controls.itemId.value;
      let makerPartCode = '';
      this.commonService.commonGetService('fetchOnHandQty.sams', locId, storeId, itemId, makerPartCode).subscribe(
        data => {
          this.itemRequestAddForm.controls.availableQty.setValue(data.responseData);
          let availQty = this.itemRequestAddForm.controls.availableQty.value;
          if(Number(availQty) > 0) {
            this.itemRequestAddForm.controls.itemRequestType.setValue('STOCK INDENT');
          } else {
            this.itemRequestAddForm.controls.itemRequestType.setValue('PURCHASE REQUEST');
          }
        }
      )
  }

  fetchDefaultStoreForLoc() {
    this.commonService.commonGetService('fetchDefualtStore.sams', this.locationId).subscribe(
      data => {
        this.defaultStoreId = (data.responseData.storeId);
        this.defaultStoreName = (data.responseData.storeName);

        this.itemRequestAddForm.controls.storeId.setValue(this.defaultStoreId);
        this.itemRequestAddForm.controls.storeName.setValue(this.defaultStoreName);
      });
  }

  addItemReqInfo() {
    this.itemReqMainDataSource = this.itemReqMainDataSource.concat([this.itemRequestAddForm.getRawValue()]);
    this.lengthItemReq = this.itemReqMainDataSource.length;

    this.itemRequestAddForm.controls.itemRequestType.enable();
    this.itemRequestAddForm = new FormGroup({
      srId : new FormControl(''),
      srNo : new FormControl(''),
      itemId : new FormControl(''),
      itemName : new FormControl('', [Validators.required]),
      itemDescription : new FormControl('', [Validators.required]),
      itemUnApprovedFlag : new FormControl(false),
      itemRequestType : new FormControl('', [Validators.required]),
      itemRequestFor : new FormControl('', [Validators.required]),
      requiredQty : new FormControl('1', [Validators.required]),
      uomCd : new FormControl(''),
      availableQty : new FormControl('0'),
      storeName : new FormControl(''),
      storeId : new FormControl(''),
      itemUnApprovedFlagDisp : new FormControl('No'),
      locationId : new FormControl(''),
      locationName : new FormControl(''),
      assetHdrId : new FormControl(''),
      assetCode : new FormControl(''),
      itemTypeName : new FormControl('', [Validators.required]),
      itemTypeId : new FormControl(0),
      prReason: new FormControl(''),
      needByDtDisp : new FormControl('')
    });
    this.itemRequestAddForm.controls.srId.setValue(this.data.srId);
    this.itemRequestAddForm.controls.srNo.setValue(this.data.srNo);
    this.itemRequestAddForm.controls.locationId.setValue(this.data.locationId);
    this.itemRequestAddForm.controls.locationName.setValue(this.data.locationName);
    this.itemRequestAddForm.controls.assetHdrId.setValue(this.data.assetHdrId);
    this.itemRequestAddForm.controls.assetCode.setValue(this.data.assetCode);
    this.itemRequestAddForm.controls['itemTypeId'].setValue(0);
    this.itemRequestAddForm.controls['itemTypeName'].setValue('');
    this.locationId = this.data.locationId;

    this.itemRequestAddForm.controls.availableQty.disable();
    this.itemRequestAddForm.controls.storeName.disable();
    // this.itemRequestAddForm.controls.uomCd.disable();
    this.unApprovedItemFlag = false;
    this.fetchDefaultStoreForLoc();
  }

  listOfUOM(searchTerms) {
    this.scrollUomCdSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfUOMCombo, searchTerms.term, '', '', this.limitCount, this.uomCdPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.uomCdPageNumber, this.uomComboList, data.responseData.comboList)
        this.uomCdPageNumber = this.getData.pageNumber;
        this.uomComboList = this.getData.dataList;
        this.scrollUomCdSync = false;
      }
    );
  }

  createPRStockIndent() {
    let obj={ 'itemRequestList':this.itemReqMainDataSource,
              'srId': this.data.srId }
    this.commonService.showSpinner();
    this.commonService.commonInsertService('createPRStockIndentFromSR.sams', obj).subscribe(
      data => {
        if (data.success) {
          this.commonService.hideSpinner();
          this.commonService.openToastSuccessMessage(data.message);
          this.dialogRef.close('proceed');
        } else {
          this.commonService.hideSpinner();
          this.commonService.openToastErrorMessage(data.message);
        }
      }
    );
  }

  validateQty () {
    let requiredQty = this.itemRequestAddForm.controls.requiredQty.value;
    let availQty = this.itemRequestAddForm.controls.availableQty.value;

    if(Number(requiredQty) > Number(availQty)) {
      let dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
        height: 'auto',
        width: '400px',
        data: {
          'confirmHeading': 'Confirmation',
          'confirmMsg': 'Required Qty is Greater than Available Qty. Purchase Request will be created for Remaining Qty!'
        }
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(
        data => {
          if (data.status == true) {
                let itemId = this.itemRequestAddForm.controls.itemId.value;
                let itemName = this.itemRequestAddForm.controls.itemName.value;
                let itemDescription = this.itemRequestAddForm.controls.itemDescription.value;
                let uomCd = this.itemRequestAddForm.controls.uomCd.value;
                let storeId = this.itemRequestAddForm.controls.storeId.value;
                let storeName = this.itemRequestAddForm.controls.storeName.value;
                let availableQty = this.itemRequestAddForm.controls.availableQty.value;
                let itemTypeId = this.itemRequestAddForm.controls.itemTypeId.value;
                let itemTypeName = this.itemRequestAddForm.controls.itemTypeName.value;
                let prReason = this.itemRequestAddForm.controls.prReason.value;
                let needByDtDisp = this.itemRequestAddForm.controls.needByDtDisp.value;

                this.itemRequestAddForm = new FormGroup({
                  srId : new FormControl(this.data.srId),
                  srNo : new FormControl(this.data.srNo),
                  itemId : new FormControl(itemId),
                  itemName : new FormControl(itemName),
                  itemDescription : new FormControl(itemDescription),
                  itemUnApprovedFlag : new FormControl(false),
                  itemRequestType : new FormControl('STOCK INDENT'),
                  itemRequestFor : new FormControl('MATERIAL'),
                  requiredQty : new FormControl(Number(availQty)),
                  uomCd : new FormControl(uomCd),
                  availableQty : new FormControl(availableQty),
                  storeName : new FormControl(storeName),
                  storeId : new FormControl(storeId),
                  itemUnApprovedFlagDisp : new FormControl('No'),
                  locationId : new FormControl(this.data.locationId),
                  locationName : new FormControl(this.data.locationName),
                  assetHdrId : new FormControl(this.data.assetHdrId),
                  assetCode : new FormControl(this.data.assetCode),
                  itemTypeId : new FormControl(itemTypeId),
                  itemTypeName : new FormControl(itemTypeName),
                  prReason: new FormControl(prReason),
                  needByDtDisp : new FormControl(needByDtDisp)
                });
                this.itemReqMainDataSource = this.itemReqMainDataSource.concat([this.itemRequestAddForm.getRawValue()]);
                this.lengthItemReq = this.itemReqMainDataSource.length;
                
                this.itemRequestAddForm = new FormGroup({
                  srId : new FormControl(this.data.srId),
                  srNo : new FormControl(this.data.srNo),
                  itemId : new FormControl(itemId),
                  itemName : new FormControl(itemName),
                  itemDescription : new FormControl(itemDescription),
                  itemUnApprovedFlag : new FormControl(false),
                  itemRequestType : new FormControl('PURCHASE REQUEST'),
                  itemRequestFor : new FormControl('MATERIAL'),
                  requiredQty : new FormControl(Number(requiredQty) - Number(availQty)),
                  uomCd : new FormControl(uomCd),
                  availableQty : new FormControl('0'),
                  storeName : new FormControl(''),
                  storeId : new FormControl(''),
                  itemUnApprovedFlagDisp : new FormControl('No'),
                  locationId : new FormControl(this.data.locationId),
                  locationName : new FormControl(this.data.locationName),
                  assetHdrId : new FormControl(this.data.assetHdrId),
                  assetCode : new FormControl(this.data.assetCode),
                  itemTypeId : new FormControl(itemTypeId),
                  itemTypeName : new FormControl(itemTypeName),
                  prReason: new FormControl(prReason),
                  needByDtDisp : new FormControl(needByDtDisp)
                  
                });
                this.itemReqMainDataSource = this.itemReqMainDataSource.concat([this.itemRequestAddForm.getRawValue()]);
                this.lengthItemReq = this.itemReqMainDataSource.length;

                this.itemRequestAddForm.controls.itemRequestType.enable();
                this.itemRequestAddForm = new FormGroup({
                  srId : new FormControl(''),
                  srNo : new FormControl(''),
                  itemId : new FormControl(''),
                  itemName : new FormControl('', [Validators.required]),
                  itemDescription : new FormControl('', [Validators.required]),
                  itemUnApprovedFlag : new FormControl(false),
                  itemRequestType : new FormControl('', [Validators.required]),
                  itemRequestFor : new FormControl('', [Validators.required]),
                  requiredQty : new FormControl('1', [Validators.required]),
                  uomCd : new FormControl(''),
                  availableQty : new FormControl('0'),
                  storeName : new FormControl(''),
                  storeId : new FormControl(''),
                  itemUnApprovedFlagDisp : new FormControl('No'),
                  locationId : new FormControl(''),
                  locationName : new FormControl(''),
                  assetHdrId : new FormControl(''),
                  assetCode : new FormControl(''),
                  itemTypeId : new FormControl('0'),
                  itemTypeName : new FormControl(''),
                  prReason: new FormControl(''),
                  needByDtDisp : new FormControl('')
                });
                this.itemRequestAddForm.controls.srId.setValue(this.data.srId);
                this.itemRequestAddForm.controls.srNo.setValue(this.data.srNo);
                this.itemRequestAddForm.controls.locationId.setValue(this.data.locationId);
                this.itemRequestAddForm.controls.locationName.setValue(this.data.locationName);
                this.itemRequestAddForm.controls.assetHdrId.setValue(this.data.assetHdrId);
                this.itemRequestAddForm.controls.assetCode.setValue(this.data.assetCode);
                this.itemRequestAddForm.controls['itemTypeId'].setValue(0);
                this.itemRequestAddForm.controls['itemTypeName'].setValue('');
                this.locationId = this.data.locationId;
                this.itemRequestAddForm.controls.availableQty.disable();
                this.itemRequestAddForm.controls.storeName.disable();
                this.unApprovedItemFlag = false;
                this.fetchDefaultStoreForLoc();
          }
        }
      );
    }
  }

  clear() {

    this.itemRequestAddForm.reset();
    this.itemRequestAddForm.updateValueAndValidity();
    
  }

  loadPRReasonComboData(searchValue) {
    this.scrollPRReasonsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfPRReasons.sams', searchValue.term, '', '', this.limitCount, this.prReasonPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.prReasonPageNumber , this.prReasonList , data.responseData.comboList)
          this.prReasonPageNumber = this.getData.pageNumber;
          this.prReasonList = this.getData.dataList;  
          this.scrollPRReasonsync = false;
      }
    );
  }

  selectedPRReasonData(event) {
    if (event === undefined) {
      this.itemRequestAddForm.controls['prReason'].setValue('');
      this.prReasonPageNumber = 1;
    } else {
      this.itemRequestAddForm.controls['prReason'].setValue(event.prReasonName);
    }    
  }

  dateChange(){
    this.itemRequestAddForm.controls.needByDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.itemRequestAddForm.controls.needByDtDisp.value));
  }

  removeItemRequest(index: number) {
    this.itemReqMainDataSource.splice(index, 1);
    this.lengthItemReq = this.itemReqMainDataSource.length;
    this.itemReqMainDataSource = [...this.itemReqMainDataSource];
  }

}
