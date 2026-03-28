import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms'; 
import { CommonService } from '../../../../Services/common-service/common.service';
import { AssetOptimaServices } from '../../../../Constants/AssetOptimaServices';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AssetOptimaConstants } from '../../../../Constants/AssetOptimaConstants';
import { UserSessionService } from '../../../../Services/user-session-service/user-session.service';
import { ConfirmConfirmationComponent } from '../../../Common-components/confirm-confirmation/confirm-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { allassetStatus, allWorkflowStatus } from '../../../../Constants/AllStatusConstants'
import { getData } from 'src/app/Model/common/fetchListData';
import { min } from 'rxjs';


@Component({
  selector: 'app-asset-stock-create',
  templateUrl: './asset-stock-create.component.html',
  styleUrls: ['./asset-stock-create.component.css']
})
export class AssetStockCreateComponent implements OnInit {

  public stockTransferHdrId: any;
  public transactionSource: any;

  @ViewChild('fromStoreName') fromStoreNameSet: ElementRef;

  assetStockTransferHdrForm: FormGroup;
  stockTransferDtlForm: FormArray; 
  disableSubmit: boolean = false;
  approveDisableButton: boolean = true;

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

  itemTypeList = [];
  scrollItemTypesync: boolean = false;
  itemTypePageNumber: number;

  approveButtonEnable: boolean;

  limitCount: any;

  employeeId = '0';
  approvalId = '0';
  tlApproved = false;
  approve: string;

  assetStatusId = 0;

  INWARD_SCREEN = "INWARD";
  isAddToStore = false;

  mandatoryField = '*';

  stock_allocate = allWorkflowStatus[allWorkflowStatus.STOCK_ALLOCATE]
  ItemType: string = "";
  getData: getData;
  headingDisplay: string;
  modeDisplay: boolean = false;
  formOneValid: boolean = false;
  createMode: boolean = false;
  check: boolean = false;
  status: any;
  mode: any;

  constructor(private readonly formBuilder: FormBuilder,
    public commonService: CommonService,
    public assetOptimaServices: AssetOptimaServices,
    public location: Location,
    public activatedRoute: ActivatedRoute,
    public assetOptimaConstants: AssetOptimaConstants,
    private readonly cdr: ChangeDetectorRef,
    private readonly userSessionService: UserSessionService,
    private readonly dialog: MatDialog,
    private router: Router) {
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

  ngOnInit(): void {
    this.tlApproved = this.assetOptimaConstants.tlApproved;
    this.activatedRoute.params.subscribe(
      params => {
        let primaryId = params.pId;
        primaryId = Number(primaryId);
        this.stockTransferHdrId = primaryId;
        this.transactionSource = this.stock_allocate;
      });

    this.assetStockTransferHdrForm = new FormGroup({
      stockTransferHdrId: new FormControl(0),
      stockTransferNo: new FormControl(''),
      stockTransferStatus: new FormControl('BOOKED'),
      stockTransferFor: new FormControl(''),
      fromStoreId: new FormControl(0),
      fromStoreName: new FormControl('', [Validators.required]),
      toStoreId: new FormControl(0),
      toStoreName: new FormControl(''),
      fromAssetId: new FormControl(0),
      fromAssetCode: new FormControl(''),
      toAssetId: new FormControl(0, [Validators.required]),
      toAssetCode: new FormControl('', [Validators.required]),
      stockTransferType: new FormControl('STORE TO ASSET'),
      createdBy: new FormControl(this.userSessionService.getUserName()),
      createdDt: new FormControl(),
      createdDtDisp: new FormControl(this.commonService.getCurrentDateYYYYMMDD()),
      orgId: new FormControl(''),
      locationId: new FormControl((this.userSessionService.getUserLocationId())),
      locationName: new FormControl(this.userSessionService.getUserLocationName()),
      stockTransferDtlForm: this.formBuilder.array([]),
      sourceScreen: new FormControl(''),
      assetStatusId: new FormControl(0),
    });
 
    this.assetStockTransferHdrForm.get('stockTransferNo').disable();
    this.assetStockTransferHdrForm.get('stockTransferStatus').disable();

    // if(localStorage.getItem('ItemType')){
    //   this.ItemType=localStorage.getItem('ItemType');
    // }

    localStorage.setItem('ItemType',"");


    if (localStorage.getItem('previousRoute') !== null) { 
      
      if (localStorage.getItem('previousRoute').startsWith('/home/asset/assetCreate') ||
        localStorage.getItem('previousRoute').startsWith('/home/serviceRequest/serviceView/')) { 
        this.assetStockTransferHdrForm.controls.toAssetCode.setValue(localStorage.getItem('assetCode'));
        this.assetStockTransferHdrForm.controls.toAssetId.setValue(localStorage.getItem('toAssetId'));
        this.assetStockTransferHdrForm.controls.sourceScreen.setValue('ASSET');
        if (!localStorage.getItem('previousRoute').startsWith('/home/serviceRequest/serviceView/')){
          if (localStorage.getItem('storeName') != null) {
            this.assetStatusId = Number(localStorage.getItem('assetStatusId'));
            this.mandatoryField = '';
            this.assetStockTransferHdrForm.controls.toAssetCode.setValidators([]);
            this.assetStockTransferHdrForm.controls.fromStoreId.setValue(localStorage.getItem('storeId'));
            this.assetStockTransferHdrForm.controls.fromStoreName.setValue(localStorage.getItem('storeName'));
            this.assetStockTransferHdrForm.controls.assetStatusId.setValue(localStorage.getItem('assetStatusId'));
            this.assetStockTransferHdrForm.controls.sourceScreen.setValue('INWARD');
            this.isAddToStore = true;
            this.assetStockTransferHdrForm.controls.toAssetCode.disable() 
            this.cdr.detectChanges();
          }
        } else {
          localStorage.removeItem('storeId'); 
          this.isAddToStore = false;
        }
      } else { 
        this.assetStockTransferHdrForm.controls.fromStoreId.setValue(localStorage.getItem('storeId'));
        this.assetStockTransferHdrForm.controls.fromStoreName.setValue(localStorage.getItem('storeName'));
        this.assetStockTransferHdrForm.controls.toAssetCode.setValue(localStorage.getItem('assetCode'));
        this.assetStockTransferHdrForm.controls.toAssetId.setValue(localStorage.getItem('toAssetId'));
        this.assetStockTransferHdrForm.controls.toAssetCode.setValidators(Validators.required) 
        this.isAddToStore = false;

      }
    }
    this.validateEditMode();
    this.formValidation();
  }

  backToMainScreen() {
    this.location.back();

  }

  exitForm() {  
    this.location.back();

  }

  clear() {
    this.fromStorePageNumber = 1;
    this.toStorePageNumber = 1;
    this.itemPageNumber = 1;
    this.ngOnInit();
  }

  listOfFromStore1(data){
    if (this.fromStorePageNumber === 1) {
      this.fromStoreList = data.responseData.comboList;
    } else {
      this.fromStoreList = this.fromStoreList.concat(data.responseData.comboList);
    }
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
      this.assetStockTransferHdrForm.controls['fromStoreName'].setValue('');
      this.assetStockTransferHdrForm.controls['fromStoreId'].setValue(0);
      this.fromStorePageNumber = 1;
      this.fromStoreList = [];
    } else {
      this.assetStockTransferHdrForm.controls['fromStoreName'].setValue(event.storeName);
      this.assetStockTransferHdrForm.controls['fromStoreId'].setValue(event.storeId);
      this.assetStockTransferHdrForm.controls['fromStoreName'].disable();
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
      this.assetStockTransferHdrForm.controls['locationId'].setValue(0);
      this.assetStockTransferHdrForm.controls['locationName'].setValue('');
      this.locationPageNumber = 1;
      this.locationList = [];
    } else {
      this.assetStockTransferHdrForm.controls['locationId'].setValue(event.locationId);
      this.assetStockTransferHdrForm.controls['locationName'].setValue(event.locationName);
    }
  }

  loadToAssetCodeComboData(searchValue) {
    this.scrollToAssetNamesync = true;
    const loc_id = this.assetStockTransferHdrForm.controls.locationId.value
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetCodeCombo.sams', searchValue.term, loc_id > 0 ? loc_id : 0,
      0, this.limitCount, this.toAssetPageNumber, '1', '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.toAssetPageNumber , this.toAssetList , data.responseData.comboList)
          this.toAssetPageNumber = this.getData.pageNumber;
          this.toAssetList = this.getData.dataList;
          this.scrollToAssetNamesync = false;

        }
      );
  }

  selectedToAssetCodeData(event) {
    if (event === undefined) {
      this.assetStockTransferHdrForm.controls['toAssetId'].setValue(0);
      this.assetStockTransferHdrForm.controls['toAssetCode'].setValue('');
      this.assetStockTransferHdrForm.controls.assetStatusId.setValue(0);
      this.toAssetPageNumber = 1;
      this.toAssetList=[];
    } else {
      this.assetStockTransferHdrForm.controls['toAssetId'].setValue(event.assetHdrId);
      this.assetStockTransferHdrForm.controls['toAssetCode'].setValue(event.assetCode);
      this.assetStockTransferHdrForm.controls.assetStatusId.setValue(event.assetStatusId);
      this.assetStatusId = event.assetStatusId;
    }
    this.formValidation();
  }

  createStockTranferDtl(): FormGroup {
    return this.formBuilder.group({
      stockTransferHdrId: new FormControl(0),
      stockTransferDtlId: new FormControl(0),
      itemTypeId: new FormControl(0,[Validators.required]),
      itemTypeName: new FormControl('',[Validators.required]),
      itemId: new FormControl(0,[Validators.required]),
      itemName: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      makerPartCode: new FormControl(''),
      availQty: new FormControl(0),
      transferQty: new FormControl(0,[Validators.required,Validators.min(1)]),
      issueQty: new FormControl(0),
      uom: new FormControl(''),
      errorFlg: new FormControl(''),
      errorMessage: new FormControl(''),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      processedFlg: new FormControl('0')
    });
  }

  checkValidation1(msg){
    for (let i = 0; i < this.assetStockTransferHdrForm.controls.stockTransferDtlForm.value.length; i++) {
      if (!(this.assetStockTransferHdrForm.controls.fromStoreId.value > 0 || this.assetStockTransferHdrForm.controls.toAssetId.value > 0)) {
        this.validationFlg = true;
      }  
    }
    if (!this.validationFlg) {
      this.callSaveMethod(msg);
    } else {
      this.commonService.openToastWarningMessage("From Store/Asset Code is Mandatory");
    }
  }

  validationFlg: boolean = false;
  checkValidation(msg) {
    this.validationFlg = false;
    const rowindex = this.assetStockTransferHdrForm.controls.stockTransferDtlForm.value.length - 1;
    if (this.assetStockTransferHdrForm.controls.fromStoreId.value > 0 || this.assetStockTransferHdrForm.controls.toAssetId.value > 0) {
      if (this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][rowindex]['controls'].transferQty.value > 0) {

        this.checkValidation1(msg) 
      } else {
        this.commonService.openToastWarningMessage("Transfer Qty is Mandatory");
      }
    } else {
      this.commonService.openToastWarningMessage("From Store/Asset Code is Mandatory");
    }
  }

  callSaveMethod(message){
    for (let index = 0; index < this.assetStockTransferHdrForm.controls.stockTransferDtlForm.value.length; index++) {
      const element = this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'];
      if(this.mode === 'add'){
        console.log(element.issueQty.value);
        element.issueQty.setValue(element.transferQty.value);
        console.log(element.issueQty.value);
      }
    }
    this.callSaveOrUpdateMethod(message);
  }

  callSaveOrUpdateMethod(message) {
    if (message === 'enable') {      
      this.assetStockTransferHdrForm.controls['stockTransferFor'].setValue('ASSET');
      this.commonService.commonInsertService('saveUpdateStockTransfer.sams', this.assetStockTransferHdrForm.getRawValue()).subscribe(
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
    } else if (message === 'disable') {
      this.stockTransferDtlForm = this.assetStockTransferHdrForm.get('stockTransferDtlForm') as FormArray;
      this.stockTransferDtlForm.push(this.createStockTranferDtl());
    }
  }

  saveFlag: boolean = false;
  submitAssetStockTransfer() {
    const length = this.assetStockTransferHdrForm.controls.stockTransferDtlForm.value.length;
    const rowindex = this.assetStockTransferHdrForm.controls.stockTransferDtlForm.value.length - 1;
    if (length > 0) {
      for (let i = 0; i < this.assetStockTransferHdrForm.controls.stockTransferDtlForm.value.length; i++) {
        if (this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][rowindex]['controls'].transferQty.value > 0) {
          this.saveFlag = true;
        } else {
          this.commonService.openToastWarningMessage('Transfer Qty is mandatory.');
        }
      }
    } else {
      this.commonService.openToastWarningMessage('Kindly add atleast one item.');
    }
    if (this.saveFlag) {
      this.callSaveMethod('enable');
    }
  }

  validateEditMode() {
    this.commonService.showSpinner(); 
    this.assetStockTransferHdrForm.get('stockTransferNo').disable();
    this.assetStockTransferHdrForm.get('stockTransferStatus').disable();
    this.assetStockTransferHdrForm.get('createdBy').disable();
    this.assetStockTransferHdrForm.get('createdDtDisp').disable();

    this.activatedRoute.params.subscribe(
      params => {
        let primaryId = params.pId;
         this.mode = params.mode;
        primaryId = Number(primaryId);
        if (primaryId <= 0) {
          this.headingDisplay = 'Create';
          this.disableClear = false;
          this.createMode = true;
        } else {
          if (this.mode === 'view') { 
            this.headingDisplay = 'View';
            this.disableSubmit = true;
            this.modeDisplay =true;
            this.approveDisableButton = true;
            this.assetStockTransferHdrForm.disable();
            this.createMode = false;
          } else {
            //button and heading names for edit
            this.headingDisplay = 'Edit';
            this.approveDisableButton = false;
            this.formOneValid = true;
            this.createMode = false;
            this.disableClear = true; 
            this.assetStockTransferHdrForm.get('fromStoreName').disable();
            this.assetStockTransferHdrForm.get('toStoreName').disable();
            this.assetStockTransferHdrForm.get('stockTransferType').disable();
            this.assetStockTransferHdrForm.get('toAssetCode').disable();
          }
          this.commonService.commonGetService('loadStockTransferInfo.sams', primaryId).subscribe(
            data => { 
              this.assetStockTransferHdrForm.patchValue(data.responseData);
              this.assetStockTransferHdrForm.controls['toAssetCode'].setValue(data.responseData.toAssetDisplayField);
              this.itemListinEditMode(data.responseData.stockTransferDtlForm);   
              
              if(data.responseData.stockTransferStatus === "APPROVED"){
                this.assetStockTransferHdrForm.disable();
              }

              this.getWorkflowApprovalForStockAllocate();
            }
          )
        }
      }
    ); 
    this.commonService.hideSpinner();
  }

  itemListinEditMode(event) {
    this.stockTransferDtlForm = this.assetStockTransferHdrForm.get('stockTransferDtlForm') as FormArray;
    event.map(obj => {
      const Group = this.formBuilder.group({
        stockTransferDtlId: new FormControl(obj.stockTransferDtlId),
        stockTransferHdrId: new FormControl(obj.stockTransferHdrId),
        itemTypeId: new FormControl(obj.itemTypeId),
        itemTypeName: new FormControl(obj.itemTypeName),
        itemId: new FormControl(obj.itemId),
        itemName: new FormControl(obj.itemName),
        description: new FormControl(obj.itemDesc),
        availQty: new FormControl(obj.availQty),
        transferQty: new FormControl(obj.transferQty),
        issueQty: new FormControl(obj.issueQty),
        uom: new FormControl(obj.uom),
        errorFlg: new FormControl(obj.errorFlg),
        errorMessage: new FormControl(obj.errorMessage),
        createdBy: new FormControl(obj.createdBy),
        createdDt: new FormControl(obj.createdDt),
        updatedBy: new FormControl(obj.updatedBy),
        updatedDt: new FormControl(obj.updatedDt)
      });
      this.stockTransferDtlForm.push(Group);
    });
  }

  addStockTransferForItem(): void {
    if (this.assetStatusId === allassetStatus.NOT_IN_STOCK ||
      this.assetStockTransferHdrForm.controls.sourceScreen.value === this.INWARD_SCREEN) {
      this.isAddToStore = true;
      this.cdr.detectChanges();
    } else {
      this.isAddToStore = false;
      this.cdr.detectChanges();
    }
    if (this.assetStockTransferHdrForm.get('stockTransferDtlForm').value.length === 0) {
      this.stockTransferDtlForm = this.assetStockTransferHdrForm.get('stockTransferDtlForm') as FormArray;
      this.stockTransferDtlForm.push(this.createStockTranferDtl());
    } else {
      this.checkValidation('disable');
    }    
    this.formValidation()
  }

  listOfItemFromInventory(searchTerms, index) {
    const storeId = this.assetStockTransferHdrForm.controls.fromStoreId.value;
    const toAssetId = this.assetStockTransferHdrForm.controls.toAssetId.value;
    const itemTypeId = this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemTypeId.value;
    const itemTypeName = this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemTypeName.value;
    if (storeId > 0 || toAssetId > 0) {
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
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemName.setValue('');
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].description.setValue('');
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].uom.setValue('');
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemId.setValue(0);
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].makerPartCode.setValue('');
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].availQty.setValue('');
      this.itemPageNumber = 1;
      this.itemList = [];
    } else {
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemId.setValue(event.itemId);
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemName.setValue(event.itemName);
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].description.setValue(event.itemDesc);
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].uom.setValue(event.uomCode);
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemId.setValue(event.itemId);
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].makerPartCode.setValue(event.makerPartCode);
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].availQty.setValue(event.onHandQty);

      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemTypeName.setValue(event.itemTypeName);

    }
    this.formValidation();
  }

  listOfItemDescFromInventory1(data){
    if (this.itemDescPageNumber === 1) {
      this.itemDescList = data.responseData.comboList;
    } else {
      this.itemDescList = this.itemDescList.concat(data.responseData.comboList);
    }
  }


  listOfItemDescFromInventory(searchTerms, index) {
    const storeId = this.assetStockTransferHdrForm.controls.fromStoreId.value;
    const itemTypeId = this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemTypeId.value;
    if (storeId > 0) {
      this.scrollItemDescsync = true;
      this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
      this.commonService.getComboResults('listAllItemComboFromInventory.sams', searchTerms.term, storeId, itemTypeId, this.limitCount, this.itemDescPageNumber).subscribe(
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
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemName.setValue('');
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].description.setValue('');
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].uom.setValue('');
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemId.setValue(0);
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].makerPartCode.setValue('');
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].availQty.setValue('');
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemTypeId.setValue(0);
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemTypeName.setValue('');
      this.itemDescPageNumber = 1;
      this.itemDescList = [];
    } else {
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemName.setValue(event.itemName);
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].description.setValue(event.itemDesc);
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].uom.setValue(event.uomCode);
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemId.setValue(event.itemId);
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].makerPartCode.setValue(event.makerPartCode);
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].availQty.setValue(event.onHandQty);

      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemTypeName.setValue(event.itemType);

      this.formValidation();
    }
  }

  setTransferQty(element, index) { 
    const setListValue = element['controls']; 
    const _availableQty = setListValue['availQty'].value;
    const _transferQty = setListValue['transferQty'].value; 
    if (_transferQty <= _availableQty) {
      this.assetStockTransferHdrForm.controls['stockTransferDtlForm']['controls'][index]['controls']['transferQty'].setValue(_transferQty);
      this.assetStockTransferHdrForm.controls['stockTransferDtlForm']['controls'][index]['controls']['issueQty'].setValue(_transferQty);
    } else {
      this.commonService.openToastWarningMessage("Request Qty should not be greater than Available Qty");
      this.assetStockTransferHdrForm.controls['stockTransferDtlForm']['controls'][index]['controls']['transferQty'].setValue(0);
    } 
    this.formValidation();
  }

  setIssueQty(element, index) {
    const setListValue = element['controls']; 
    const _transferQty = setListValue['transferQty'].value;
    const _issueQty = setListValue['issueQty'].value;
    if (this.assetStatusId !== allassetStatus.NOT_IN_STOCK && this.assetStockTransferHdrForm.controls.sourceScreen.value !== this.INWARD_SCREEN) {
      if (_issueQty <= _transferQty) {
        this.assetStockTransferHdrForm.controls['stockTransferDtlForm']['controls'][index]['controls']['issueQty'].setValue(_issueQty);
      } else {
        this.commonService.openToastWarningMessage("Issue Qty should not be greater than Available Qty");
        this.assetStockTransferHdrForm.controls['stockTransferDtlForm']['controls'][index]['controls']['issueQty'].setValue(0);
      }
    } else {
      this.assetStockTransferHdrForm.controls['stockTransferDtlForm']['controls'][index]['controls']['transferQty'].setValue(_issueQty);
      this.assetStockTransferHdrForm.controls['stockTransferDtlForm']['controls'][index]['controls']['issueQty'].setValue(_issueQty);
    }
  }


  delete(index) {
    this.stockTransferDtlForm = this.assetStockTransferHdrForm.get('stockTransferDtlForm') as FormArray;
    this.stockTransferDtlForm.removeAt(index)
  }

  listofItemType(searchTerms) {
    this.scrollItemTypesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '20' : '';
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
    if (event == undefined) {
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemTypeId.setValue(0);
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemTypeName.setValue('');
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemName.setValue('');
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].description.setValue('');
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].uom.setValue('');
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemId.setValue(0);
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].makerPartCode.setValue('');
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].availQty.setValue('');
      this.itemPageNumber = 1;
    }
    if (event !== undefined) {
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemTypeId.setValue(event.itemTypeId);
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemTypeName.setValue(event.itemTypeName);
      
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemName.setValue('');
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].description.setValue('');
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].uom.setValue('');
      this.assetStockTransferHdrForm.controls.stockTransferDtlForm['controls'][index]['controls'].itemId.setValue(0);
      this.itemTypePageNumber = 1;
      this.itemTypeList = [];
    } else{
      this.itemTypePageNumber = 1;
      this.itemTypeList = [];
    }
    this.formValidation();
  }

  getWorkflowApprovalForStockAllocate() {
    const hdr_id = this.assetStockTransferHdrForm.controls.stockTransferHdrId.value
    this.commonService.commonGetService('getWorkflowForId.sams', hdr_id, this.userSessionService.getUserEmpId(), this.stock_allocate, this.userSessionService.getUserOrgId()).subscribe(
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

  dateValidation(event) {
    return null;
  }


  validateItemQty(element, index) {
    if (this.assetStatusId === allassetStatus.NOT_IN_STOCK || this.assetStatusId === allassetStatus.NOT_IN_STOCK ||
      this.assetStockTransferHdrForm.controls.sourceScreen.value === this.INWARD_SCREEN) {
      this.disableSubmit = false;
    }
    else {
      if (element.value.availQty < element.value.issueQty) {
        this.disableSubmit = true;
      } else {
        this.disableSubmit = false;
      }
    }
  }

  formValidation() {
    for (let index = 0; index < this.stockTransferDtlForm.controls.length; index++) {
      const element = this.stockTransferDtlForm.controls[index];
      if (element.valid) {
        this.formOneValid = true;
      }else {
        this.formOneValid = false;
        return this.formOneValid;
      }   
    }  
    return this.formOneValid;    
  }


  confirmStockAllocateApprove() {
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
          this.submitAssetStockTransfer();
          this.status = 'APPROVED';
          this.stockAllocateValidateAndStatusUpdate(this.status);
        }
      });
  }

  stockAllocateValidateAndStatusUpdate(status) {
    let stockAllocateHdrId = {selectedTransferList: [this.assetStockTransferHdrForm.controls.stockTransferHdrId.value],status: status,selectedApprovalList : [this.approvalId]};

      this.commonService.commonInsertService(this.assetOptimaServices.stockTransferValidateAndStatusUpdate, stockAllocateHdrId).subscribe(
        data => {
          if (data.success) {
            this.commonService.openToastSuccessMessage(data.message);          
            this.ngOnInit();
          } else {
            this.commonService.openToastErrorMessage(data.message);
          }
        });
  }

  rejectStockAllocateApprove() {
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
          this.stockAllocateValidateAndStatusUpdate(this.status);
        }
      });
  }
}
