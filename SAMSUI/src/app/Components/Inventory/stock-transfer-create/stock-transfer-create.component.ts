import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { ConfirmConfirmationComponent } from '../../Common-components/confirm-confirmation/confirm-confirmation.component';
import { MatDialog } from '@angular/material/dialog'; 
import { allloanStatus , allWorkflowStatus } from '../../../Constants/AllStatusConstants'
import { getData } from 'src/app/Model/common/fetchListData';

@Component({
  selector: 'app-stock-transfer-create',
  templateUrl: './stock-transfer-create.component.html',
  styleUrls: ['./stock-transfer-create.component.css']
})
export class StockTransferCreateComponent implements OnInit {

  public transactionSource: any;

  @ViewChild('fromStoreName') fromStoreNameSet: ElementRef;

  stockTransferHdrForm: FormGroup;
  stockTransferDtlForm: FormArray;
  disableSubmit: boolean = false;
  approveDisableButton: boolean = true;

  approveButtonEnable: boolean;

  disableClear: boolean = false;

  itemPageNumber: number;
  fromStorePageNumber: number;
  toStorePageNumber: number;
  locationPageNumber: number;

  fromAssetPageNumber: number;
  toAssetPageNumber: number;
  itemDescPageNumber: number;

  scrollFromStoreNamesync: boolean = false;
  scrollToStoreNamesync: boolean = false;

  scrollFromAssetNamesync: boolean = false;
  scrollToAssetNamesync: boolean = false;

  scrollLocationNamesync: boolean = false;
  scrollItemNamesync: boolean = false;
  scrollItemDescsync: boolean = false;

  itemList = [];
  itemDescList = [];
  fromStoreList = [];
  toStoreList = [];

  fromAssetList = [];
  toAssetList = [];

  locationList = [];

  limitCount: any;

  itemTypeList = [];
  scrollItemTypesync: boolean = false;
  itemTypePageNumber: number;

  employeeId = '0';
  approvalId = '0';
  tlApproved = false;
  approve:string;

  fromStore : Boolean = false;
  toStore : Boolean = false;
  fromAsset : Boolean = false;
  toAsset : Boolean = false;

  stockTransferType = [
    { id: 1, name: 'STORE TO STORE' },
    // { id: 2, name: 'ASSET TO STORE' },
    // { id: 3, name: 'ASSET TO ASSET' }
  ];
  public stockTransferId: any;
  getData: getData;
  headingDisplay: any;
  createMode: boolean;
  check: boolean = false;
  status: string;
  mode: any;

  constructor(private formBuilder: FormBuilder,
              public commonService: CommonService,
              public assetOptimaServices: AssetOptimaServices,
              public location: Location,
              public activatedRoute: ActivatedRoute,
              public assetOptimaConstants: AssetOptimaConstants,
              private cdr: ChangeDetectorRef,
              private dialog: MatDialog,
              private router: Router,
              private userSessionService: UserSessionService) { 

    this.locationPageNumber = 1;
    this.fromStorePageNumber = 1;
    this.toStorePageNumber = 1;
    this.fromAssetPageNumber = 1;
    this.toAssetPageNumber = 1;
    this.itemPageNumber = 1;
    this.itemDescPageNumber = 1;
    this.itemTypePageNumber = 1;
    this.approveButtonEnable = false;
    this.approve = 'APPROVED';
  }

  ngOnInit() {

    this.tlApproved = this.assetOptimaConstants.tlApproved;
    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        primaryId = Number(primaryId);
        this.stockTransferId = primaryId;
        this.transactionSource = allWorkflowStatus[allWorkflowStatus.STOCK_TRANSFER];
      });

    this.stockTransferHdrForm = new FormGroup({
      stockTransferHdrId: new FormControl(0),
      stockTransferNo: new FormControl(''),
      stockTransferStatus: new FormControl('BOOKED'),
      stockTransferFor: new FormControl(''),
      fromStoreId: new FormControl(0),
      fromStoreName: new FormControl(''),
      toStoreId: new FormControl(0),
      toStoreName: new FormControl(''),
      fromAssetId: new FormControl(0),
      fromAssetCode: new FormControl(''),
      toAssetId: new FormControl(0),
      toAssetCode: new FormControl(''),
      stockTransferType : new FormControl('STORE TO STORE'),
      createdBy: new FormControl(this.userSessionService.getUserName()),
      createdDt: new FormControl(),
      createdDtDisp: new FormControl(this.commonService.getCurrentDateYYYYMMDD()),
      orgId: new FormControl(''),
      locationId: new FormControl(this.userSessionService.getUserLocationId()),
      locationName: new FormControl(this.userSessionService.getUserLocationName()),
      stockTransferDtlForm: this.formBuilder.array([]),
      sourceScreen: new FormControl(''),
    });

    this.stockTransferHdrForm.get('locationName').disable();
    this.stockTransferHdrForm.get('stockTransferNo').disable();
    this.stockTransferHdrForm.get('stockTransferStatus').disable();

    this.fromStore = true;
    this.toStore = true;
    this.stockTransferHdrForm.get('fromAssetCode').disable();
    this.stockTransferHdrForm.get('toAssetCode').disable();

    this.validateEditMode();
  }

  ngAfterViewInit() {
    //this.fromStoreNameSet.nativeElement.focus();
  }

  exitForm() {
    this.location.back();
  }

  clear() {
    this.stockTransferHdrForm.get('fromStoreName').enable();
      this.stockTransferHdrForm.get('toStoreName').enable();

      this.stockTransferHdrForm.get('fromAssetCode').disable();
      this.stockTransferHdrForm.get('toAssetCode').disable();

    this.fromStorePageNumber = 1;
    this.toStorePageNumber = 1;
    this.itemPageNumber = 1;
    this.ngOnInit();
  }

  listOfFromStore(searchTerms) {
    this.scrollFromStoreNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults('listOfAllStoreCombo.sams', searchTerms.term, '', '', this.limitCount, this.fromStorePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.fromStorePageNumber , this.fromStoreList , data.responseData.comboList)
        this.fromStorePageNumber = this.getData.pageNumber;
        this.fromStoreList = this.getData.dataList;
        this.scrollFromStoreNamesync = false;
      }
    );
  }

  getFromStoreValue(event) {
    if (event === undefined) {
      this.stockTransferHdrForm.controls['fromStoreName'].setValue('');
      this.stockTransferHdrForm.controls['fromStoreId'].setValue(0);
      this.fromStorePageNumber = 1;
    } else {
      
      const toStoreName = this.stockTransferHdrForm.controls['toStoreName'].value;
      if(toStoreName !== event.storeName) {
        this.stockTransferHdrForm.controls['fromStoreName'].setValue(event.storeName);
        this.stockTransferHdrForm.controls['fromStoreId'].setValue(event.storeId);
      } else {
        this.stockTransferHdrForm.controls['fromStoreName'].setValue('');
        this.stockTransferHdrForm.controls['fromStoreId'].setValue(0);
        this.commonService.openToastWarningMessage("Cannot transfer to same store");
      }

    }
  }

  listOfToStore(searchTerms) {
    this.scrollToStoreNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults('listOfAllStoreCombo.sams', searchTerms.term, '', '', this.limitCount, this.toStorePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.toStorePageNumber , this.toStoreList , data.responseData.comboList)
        this.toStorePageNumber = this.getData.pageNumber;
        this.toStoreList = this.getData.dataList;
        this.scrollToStoreNamesync = false;
      }
    );
  }

  getToStoreValue(event) {
    if (event === undefined) {
      this.stockTransferHdrForm.controls['toStoreName'].setValue('');
      this.stockTransferHdrForm.controls['toStoreId'].setValue(0);
      this.toStorePageNumber = 1;
    } else {
      var fromStoreName = this.stockTransferHdrForm.controls['fromStoreName'].value;
      if(fromStoreName != event.storeName) {
        this.stockTransferHdrForm.controls['toStoreName'].setValue(event.storeName);
        this.stockTransferHdrForm.controls['toStoreId'].setValue(event.storeId);
      } else {
        this.stockTransferHdrForm.controls['toStoreName'].setValue('');
        this.stockTransferHdrForm.controls['toStoreId'].setValue(0);
        this.commonService.openToastWarningMessage("Cannot transfer to same store");
      }
    }
  }

  listOfLocation(searchValue) {
    this.scrollLocationNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllUserLocForCombo, searchValue.term, '', '',
      this.limitCount, this.locationPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.locationPageNumber , this.locationList , data.responseData.comboList)
          this.locationPageNumber = this.getData.pageNumber;
          this.locationList = this.getData.dataList;
          this.scrollLocationNamesync = false;
        }
      );
  }

  selectedLocationData(event) {
    if (event === undefined) {
      this.stockTransferHdrForm.controls['locationId'].setValue(0);
      this.stockTransferHdrForm.controls['locationName'].setValue('');
      this.locationPageNumber = 1;
    } else {
      this.stockTransferHdrForm.controls['locationId'].setValue(event.locationId);
      this.stockTransferHdrForm.controls['locationName'].setValue(event.locationName);
    }
  }

  selectedFromAssetCodeData(event) {
    if (event === undefined) {
      this.stockTransferHdrForm.controls['fromAssetCode'].setValue('');
      this.stockTransferHdrForm.controls['fromAssetId'].setValue(0);
      this.fromAssetPageNumber = 1;
    } else {
      const toAssetCode = this.stockTransferHdrForm.controls['toAssetCode'].value;
      if(toAssetCode !== event.assetCode) {
        this.stockTransferHdrForm.controls['fromAssetCode'].setValue(event.assetCode);
        this.stockTransferHdrForm.controls['fromAssetId'].setValue(event.assetHdrId);
      } else {
        this.stockTransferHdrForm.controls['fromAssetCode'].setValue('');
        this.stockTransferHdrForm.controls['fromAssetId'].setValue(0);
        this.commonService.openToastWarningMessage("Cannot transfer to same Asset");
      }
    }
  }

  selectedToAssetCodeData(event) {
    if (event === undefined) {
      this.stockTransferHdrForm.controls['toAssetCode'].setValue('');
      this.stockTransferHdrForm.controls['toAssetId'].setValue(0);
      this.fromAssetPageNumber = 1;
    } else {
      const fromAssetCode = this.stockTransferHdrForm.controls['fromAssetCode'].value;
      if(fromAssetCode !== event.assetCode) {
        this.stockTransferHdrForm.controls['toAssetCode'].setValue(event.assetCode);
        this.stockTransferHdrForm.controls['toAssetId'].setValue(event.assetHdrId);
      } else {
        this.stockTransferHdrForm.controls['toAssetCode'].setValue('');
        this.stockTransferHdrForm.controls['toAssetId'].setValue(0);
        this.commonService.openToastWarningMessage("Cannot transfer to same Asset");
      }
    }
  }

  loadFromAssetCodeComboData(searchValue) {
    this.scrollFromAssetNamesync = true;
    const locId = this.stockTransferHdrForm.controls.locationId.value;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetCodeCombo.sams', searchValue.term,locId > 0 ? locId : 0,
      0, this.limitCount, this.fromAssetPageNumber, '1', '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.fromAssetPageNumber , this.fromAssetList , data.responseData.comboList)
          this.fromAssetPageNumber = this.getData.pageNumber;
          this.fromAssetList = this.getData.dataList;
          this.scrollFromAssetNamesync = false;
        }
      );
  }

  loadToAssetCodeComboData(searchValue) {
    this.scrollToAssetNamesync = true;
    const locId= this.stockTransferHdrForm.controls.locationId.value;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetCodeCombo.sams', searchValue.term,locId > 0 ? locId : 0,
        0,this.limitCount, this.toAssetPageNumber, '1', '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.toAssetPageNumber , this.toAssetList , data.responseData.comboList)
          this.toAssetPageNumber = this.getData.pageNumber;
          this.toAssetList = this.getData.dataList;
          this.scrollToAssetNamesync = false;
        }
      );
  }

  addStockTransferForItem(): void {
    if (this.stockTransferHdrForm.get('stockTransferDtlForm').value.length == 0) {
      this.stockTransferDtlForm = this.stockTransferHdrForm.get('stockTransferDtlForm') as FormArray;
      this.stockTransferDtlForm.push(this.createStockTranferDtl());
    } else {
      this.checkValidation('disable');
    }
  }

  createStockTranferDtl(): FormGroup {
    return this.formBuilder.group({
      stockTransferNo        : new FormControl(this.stockTransferHdrForm.controls.stockTransferNo.value),
      stockTransferHdrId     : new FormControl(0),
      stockTransferDtlId     : new FormControl(0),
      itemTypeId             : new FormControl(0),
      itemTypeName           : new FormControl(''),
      itemId                 : new FormControl(0,[Validators.required]),
      itemName               : new FormControl('',[Validators.required]),
      description            : new FormControl(''),
      makerPartCode          : new FormControl(''),
      availQty               : new FormControl(0),
      transferQty            : new FormControl(0,[Validators.required,Validators.min(1)]),
      issueQty               : new FormControl(0),
      uom                    : new FormControl(''),
      errorFlg               : new FormControl(''),
      errorMessage           : new FormControl(''),
      createdBy              : new FormControl(''),
      createdDt              : new FormControl(''),
      updatedBy              : new FormControl(''),
      updatedDt              : new FormControl(''),
      processedFlg           : new FormControl('0')
    });
  }

  validationFlg: boolean = false;
  checkValidation(msg) {
    this.validationFlg = false;
    let rowindex = this.stockTransferHdrForm.controls.stockTransferDtlForm.value.length - 1;
    if (this.stockTransferHdrForm.controls.fromStoreId.value > 0 || this.stockTransferHdrForm.controls.fromAssetId.value > 0) {
      if (this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][rowindex]['controls'].transferQty.value > 0) {
        for (let i = 0; i < this.stockTransferHdrForm.controls.stockTransferDtlForm.value.length; i++) {
          if (this.stockTransferHdrForm.controls.fromStoreId.value > 0 || this.stockTransferHdrForm.controls.fromAssetId.value > 0) {

          } else {
            this.validationFlg = true;
          }
        }
        if (!this.validationFlg) {
          this.callSaveMethod(msg);
        } else {
          this.commonService.openToastWarningMessage("From Store/Asset Code is Mandatory");
        }
      } else {
        this.commonService.openToastWarningMessage("Transfer Qty is Mandatory");
      }
    } else {
      this.commonService.openToastWarningMessage("From Store/Asset Code is Mandatory");
    }
  }

  //this.commonService.getComboResults('listAllItemComboFromInventory.sams', searchTerms.term, storeId, itemTypeId, this.limitCount, this.itemPageNumber,itemTypeName).subscribe(

  listOfItemFromInventory(searchTerms, index) {
    // let storeId = this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].storeId.value;
    let storeId = this.stockTransferHdrForm.controls.fromStoreId.value;
    let itemTypeId =  this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemTypeId.value;
    const itemTypeName = this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemTypeName.value;

    console.log(storeId,itemTypeId,itemTypeName)

    let fromAssetId = this.stockTransferHdrForm.controls.fromAssetId.value;
    if (storeId > 0 || fromAssetId > 0) {
      this.scrollItemNamesync = true;
      this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
      this.commonService.getComboResults('listAllItemComboFromInventory.sams', searchTerms.term, storeId, itemTypeId, this.limitCount, this.itemPageNumber,itemTypeName).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchTerms, this.itemPageNumber , this.itemList , data.responseData.comboList)
          this.itemPageNumber = this.getData.pageNumber;
          this.itemList = this.getData.dataList;
          this.scrollItemNamesync = false;
        }
      );
    } else {
      this.commonService.openToastWarningMessage("Kindly select from Store/Asset name");
    }

  }

  getItemValueFromInventory(event, index) {
    if (event === undefined) {
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemName.setValue('');
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].description.setValue('');
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].uom.setValue('');
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemId.setValue(0);
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].makerPartCode.setValue('');
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].availQty.setValue('');
      this.itemPageNumber = 1;
    } else {
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemName.setValue(event.itemName);
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].description.setValue(event.itemDesc);
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].uom.setValue(event.uomCode);
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemId.setValue(event.itemId);
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].makerPartCode.setValue(event.makerPartCode);
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].availQty.setValue(event.onHandQty);

    }
  }

  listOfItemDescFromInventory(searchTerms, index) {
    let storeId = this.stockTransferHdrForm.controls.fromStoreId.value;
    if (storeId > 0) {
      this.scrollItemDescsync = true;
      this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
      this.commonService.getComboResults('listAllItemComboFromInventory.sams', searchTerms.term, storeId, '', this.limitCount, this.itemDescPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchTerms, this.itemDescPageNumber , this.itemDescList , data.responseData.comboList)
          this.itemDescPageNumber = this.getData.pageNumber;
          this.itemDescList = this.getData.dataList;
          this.scrollItemDescsync = false;
        }
      );
    } else {
      this.commonService.openToastWarningMessage("Kindly select store name");
    }

  }

  getItemDescValueFromInventory(event, index) {
    if (event === undefined) {
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemName.setValue('');
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].description.setValue('');
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].uom.setValue('');
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemId.setValue(0);
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].makerPartCode.setValue('');
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].availQty.setValue('');

      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemTypeId.setValue(0);
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemTypeName.setValue('');
      this.itemDescPageNumber = 1;
    } else {
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemName.setValue(event.itemCd);
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].description.setValue(event.itemDesc);
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].uom.setValue(event.uomCode);
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemId.setValue(event.itemId);
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].makerPartCode.setValue(event.makerPartCode);
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].availQty.setValue(event.event.onHandQty);

      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemTypeId.setValue(event.itemTypeId);
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemTypeName.setValue(event.itemType);

    }
  }

  setTransferQty(element, index) {
    const setListValue = element['controls'];
    let _transferQty = setListValue['transferQty'].value;
    let availQty =  this.stockTransferHdrForm.controls['stockTransferDtlForm']['controls'][index]['controls']['availQty'].value;

    if(_transferQty > availQty){
      this.commonService.openToastWarningMessage("Transfer Qty should not be greater than Available Qty");
      this.stockTransferHdrForm.controls['stockTransferDtlForm']['controls'][index]['controls']['transferQty'].setValue(availQty);
    }else{
      this.stockTransferHdrForm.controls['stockTransferDtlForm']['controls'][index]['controls']['transferQty'].setValue(_transferQty);
      this.stockTransferHdrForm.controls['stockTransferDtlForm']['controls'][index]['controls']['issueQty'].setValue(_transferQty);
    }
    
  }

  setIssueQty(element, index) {
    const setListValue = element['controls'];
    let _availableQty = setListValue['availQty'].value;
    let _transferQty = setListValue['transferQty'].value;
    let _issueQty = setListValue['issueQty'].value;
    if (_issueQty <= _transferQty) {
      this.stockTransferHdrForm.controls['stockTransferDtlForm']['controls'][index]['controls']['issueQty'].setValue(_issueQty);
    } else {
      this.commonService.openToastWarningMessage("Issue Qty should not be greater than Transfer Qty");
      this.stockTransferHdrForm.controls['stockTransferDtlForm']['controls'][index]['controls']['issueQty'].setValue(0);
    }
  }

  delete(index) {
    this.stockTransferDtlForm = this.stockTransferHdrForm.get('stockTransferDtlForm') as FormArray;
    this.stockTransferDtlForm.removeAt(index)
  }

  submitStockTransfer() {
    let saveFlag = true;
    const stf = this.stockTransferHdrForm;

    if(stf.get('stockTransferType').value === 'STORE TO STORE' && (stf.get('fromStoreName').value === '' || (stf.get('toStoreName').value === ''))) { // store to store
      saveFlag = false;
      this.commonService.openToastWarningMessage('From Store and To Store is mandatory.');
    } else if(stf.get('stockTransferType').value === 'ASSET TO STORE' && (stf.get('fromAssetCode').value === '' || (stf.get('toStoreName').value === ''))) { // asset to store
      saveFlag = false;
      this.commonService.openToastWarningMessage('From Asset and To Store is mandatory.');
    } else if(stf.get('stockTransferType').value === 'ASSET TO ASSET' && (stf.get('fromAssetCode').value === '' || (stf.get('toAssetCode').value === ''))) { // asset to asset
      saveFlag = false;
      this.commonService.openToastWarningMessage('From Asset and To Asset is mandatory.');
    }

    let length = this.stockTransferHdrForm.controls.stockTransferDtlForm.value.length;               
    if (length > 0 && saveFlag) {
      for (let i = 0; i < length; i++) {
        const sIForm = this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][i]['controls'];
        if (!(sIForm.transferQty.value > 0 && sIForm.itemTypeName.value !== '' && sIForm.itemName.value !== '' )) {
          saveFlag = false;
          this.commonService.openToastWarningMessage('Transfer Qty, Item type and Item name is mandatory.');
        }
      }
    }
    
    if (saveFlag) {
      this.callSaveMethod('enable');
    }
  }

  callSaveMethod(message) {
    if (message == 'enable') {
      this.stockTransferHdrForm.controls['stockTransferFor'].setValue('STORE');
      this.commonService.commonInsertService('saveUpdateStockTransfer.sams', this.stockTransferHdrForm.getRawValue()).subscribe(
        data => {
          if (data.success) {
              this.commonService.openToastSuccessMessage(data.message);
              if(this.mode === 'add'){
                this.exitForm();
              }            
          } else {
            this.commonService.openToastErrorMessage(data.message);
          }
        });
    } else if (message == 'disable') {
      this.stockTransferDtlForm = this.stockTransferHdrForm.get('stockTransferDtlForm') as FormArray;
      this.stockTransferDtlForm.push(this.createStockTranferDtl());
    }
  }

  validateEditMode() {
    this.commonService.showSpinner();
    this.stockTransferHdrForm.get('locationName').disable();
    this.stockTransferHdrForm.get('stockTransferNo').disable();
    this.stockTransferHdrForm.get('stockTransferStatus').disable();
    this.stockTransferHdrForm.get('createdBy').disable();
    this.stockTransferHdrForm.get('createdDtDisp').disable();

    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        this.mode = params.mode;
        primaryId = Number(primaryId);
        this.stockTransferId = Number(primaryId);
        this.transactionSource = allWorkflowStatus[allWorkflowStatus.STOCK_TRANSFER];
        if (primaryId <= 0) {
          this.headingDisplay = 'Create';
          this.disableClear = false;
          this.createMode=true;
        } else {
          if (this.mode == 'view') {
            this.headingDisplay =  'View';
            this.disableSubmit = true;
            this.approveDisableButton = true;
            this.disableClear = false;
            this.stockTransferHdrForm.disable();
          } else {
            //button and heading names for edit
            this.approveDisableButton = false;
            this.headingDisplay = 'Edit';
            this.stockTransferHdrForm.get('fromStoreName').disable();
            this.stockTransferHdrForm.get('toStoreName').disable();
            this.stockTransferHdrForm.get('stockTransferType').disable();
          }
          this.commonService.commonGetService('loadStockTransferInfo.sams', primaryId).subscribe(
            data => {
              this.stockTransferHdrForm.patchValue(data.responseData);
              this.stockTransferHdrForm.controls['fromAssetCode'].setValue(data.responseData.fromAssetDisplayField);
              this.stockTransferHdrForm.controls['toAssetCode'].setValue(data.responseData.toAssetDisplayField);
              this.itemListinEditMode(data.responseData.stockTransferDtlForm);
              
              this.getWorkflowApprovalForStockTransfer();
            }
          )
        }
      }
    );
    this.commonService.hideSpinner();
  }

  itemListinEditMode(event) {
    this.stockTransferDtlForm = this.stockTransferHdrForm.get('stockTransferDtlForm') as FormArray;
    event.map(obj => {
      const Group = this.formBuilder.group({
        stockTransferDtlId   : new FormControl(obj.stockTransferDtlId),
        stockTransferHdrId   : new FormControl(obj.stockTransferHdrId),
        itemTypeId           : new FormControl(obj.itemTypeId),
        itemTypeName         : new FormControl(obj.itemTypeName),
        itemId               : new FormControl(obj.itemId),
        itemName             : new FormControl(obj.itemName),
        description          : new FormControl(obj.itemDesc),
        availQty             : new FormControl(obj.availQty),
        transferQty          : new FormControl(obj.transferQty),
        issueQty             : new FormControl(obj.issueQty),
        uom                  : new FormControl(obj.uom),
        errorFlg             : new FormControl(obj.errorFlg),
        errorMessage         : new FormControl(obj.errorMessage),
        createdBy            : new FormControl(obj.createdBy),
        createdDt            : new FormControl(obj.createdDt),
        updatedBy            : new FormControl(obj.updatedBy),
        updatedDt            : new FormControl(obj.updatedDt)
      });
      this.stockTransferDtlForm.push(Group);
      if(this.headingDisplay ===  'View'){
        this.stockTransferDtlForm.disable();
      }
    });
  }

  selectedTransferType(event) {
    
    this.stockTransferHdrForm.controls['fromAssetId'].setValue(0);
    this.stockTransferHdrForm.controls['fromAssetCode'].setValue('');

    this.stockTransferHdrForm.controls['toAssetId'].setValue(0);
    this.stockTransferHdrForm.controls['toAssetCode'].setValue('');

    this.stockTransferHdrForm.controls['fromStoreId'].setValue(0);
    this.stockTransferHdrForm.controls['fromStoreName'].setValue('');

    this.stockTransferHdrForm.controls['toStoreId'].setValue(0);
    this.stockTransferHdrForm.controls['toStoreName'].setValue('');

    if(event.id == 1) { // store to store
      this.stockTransferHdrForm.get('fromStoreName').enable();
      this.stockTransferHdrForm.get('toStoreName').enable();
      this.fromStore = true;
      this.toStore = true;
      this.fromAsset = false;
      this.toAsset = false;
      this.stockTransferHdrForm.get('fromAssetCode').disable();
      this.stockTransferHdrForm.get('toAssetCode').disable();
    } else if (event.id == 2) { // asset to store
      this.stockTransferHdrForm.get('fromStoreName').disable();
      this.stockTransferHdrForm.get('toStoreName').disable();
      this.stockTransferHdrForm.get('toAssetCode').disable();
      this.fromStore = false;
      this.toStore = true;
      this.fromAsset = true;
      this.toAsset = false;
      this.stockTransferHdrForm.get('fromAssetCode').enable();
      this.stockTransferHdrForm.get('toStoreName').enable();
    } else if (event.id == 3) { // asset to asset 
      this.stockTransferHdrForm.get('fromStoreName').disable();
      this.stockTransferHdrForm.get('toStoreName').disable();
      this.fromStore = false;
      this.toStore = false;
      this.fromAsset = true;
      this.toAsset = true;
      this.stockTransferHdrForm.get('fromAssetCode').enable();
      this.stockTransferHdrForm.get('toAssetCode').enable();
    }
  }

  listofItemType(searchTerms) {
    this.scrollItemTypesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllItemTypeCombo, searchTerms.term, '', '', this.limitCount, this.itemTypePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.itemTypePageNumber , this.itemTypeList , data.responseData.comboList)
        this.itemTypePageNumber = this.getData.pageNumber;
        this.itemTypeList = this.getData.dataList;
        this.scrollItemTypesync = false;
      }
    );
  }


  getItemTypeComboValue(event, index) {
    if (event === undefined) {
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemTypeId.setValue(0);
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemTypeName.setValue('');
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemName.setValue('');
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].description.setValue('');
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].uom.setValue('');
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemId.setValue(0);
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].makerPartCode.setValue('');
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].availQty.setValue('');
      this.itemTypePageNumber = 1;
    } else {
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemTypeId.setValue(event.itemTypeId);
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemTypeName.setValue(event.itemTypeName);

      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemName.setValue('');
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].description.setValue('');
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].uom.setValue('');
      this.stockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemId.setValue(0);

      this.itemList  = [];
    }
  }

  getWorkflowApprovalForStockTransfer() {
    this.commonService.commonGetService('getWorkflowForId.sams', this.stockTransferHdrForm.controls.stockTransferHdrId.value,this.userSessionService.getUserEmpId(),allWorkflowStatus[allWorkflowStatus.STOCK_TRANSFER], this.userSessionService.getUserOrgId()).subscribe(
        data => {
          if (data.success) {
            this.employeeId = this.userSessionService.getUserEmpId();
            this.approvalId = data.responseData.workflowApprovalId;
            this.approveButtonEnable = data.responseData.approvalFlag;
            if (!data.responseData.approvalFlag) {
              for (let index = 0; index < this.stockTransferDtlForm.controls.length; index++) {
                const element = this.stockTransferDtlForm.controls[index];
                element['controls'].issueQty.disable();
              }
            }else{
              for (let index = 0; index < this.stockTransferDtlForm.controls.length; index++) {
              const element = this.stockTransferDtlForm.controls[index];
              element['controls'].transferQty.disable();
              }
            } 
          } else {
            this.commonService.openToastWarningMessage(data.message);
          }
        }, error => {
        }
      );
  }

  confirmStockTransferApprove() {
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
        if (data.status) {
          this.submitStockTransfer();
          this.status = 'APPROVED';
          this.stockTransferValidateAndStatusUpdate(this.status);
        }
      });
  }

  stockTransferValidateAndStatusUpdate(status) {
    let stockTransferHdrId = {selectedTransferList: [this.stockTransferHdrForm.controls.stockTransferHdrId.value],status: status,selectedApprovalList : [this.approvalId]};
      this.commonService.commonInsertService(this.assetOptimaServices.stockTransferValidateAndStatusUpdate, stockTransferHdrId).subscribe(
        data => {
          if (data.success) {
            this.commonService.openToastSuccessMessage(data.message);           
            this.ngOnInit();
          } else {
            this.commonService.openToastErrorMessage(data.message);
          }
        });
  }

  rejectStockTransferApprove() {
    const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'confirmHeading': 'Confirmation',
        'confirmMsg':'Are You Sure To Reject This Record?'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status === true) {
          this.status = 'REJECTED';
          this.stockTransferValidateAndStatusUpdate(this.status);
        }
      });
  }
}
