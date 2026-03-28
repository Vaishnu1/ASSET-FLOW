import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { NgSelectComponent } from '@ng-select/ng-select';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { ModuleAccessModel } from '../../../../Model/base/moduleAccess';
import { allWorkflowStatus } from 'src/app/Constants/AllStatusConstants';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmConfirmationComponent } from '../../../Common-components/confirm-confirmation/confirm-confirmation.component';
import { getData } from 'src/app/Model/common/fetchListData';

@Component({
  selector: 'app-stock-indent-create',
  templateUrl: './stock-indent-create.component.html',
  styleUrls: ['./stock-indent-create.component.css']
})
export class StockIndentCreateComponent implements OnInit {
  stockIndentForm: FormGroup;
  stockIndentDtl: FormArray;

  @ViewChild('srNo') srNo: NgSelectComponent;
  @ViewChild('requestedBy') requestedBy: NgSelectComponent;
  @ViewChild('storeName') storeName: NgSelectComponent;
  @ViewChild('requestedDtDisp') requestedDtDisp: ElementRef;


  itemList = [];
  storeList = [];
  personInchargeCombo = [];
  srNoCombo = [];
  itemDescList = [];
  scrollItemNamesync: boolean = false;
  scrollStoreNamesync: boolean = false;
  scrollsyncPersonIncharge: boolean = false;
  scrollSRNosync: boolean = false;
  scrollItemDescsync: boolean = false;
  disbleClear: boolean = false;
  disableSubmit: boolean = false;

  limitCount: any;
  newDate: String = '';


  approveDisableButton: boolean = true;

  itemPageNumber: number;
  storePageNumber: number;
  personInchargePageNumber: number;
  srNoPageNumber: number;
  itemDescPageNumber: number;
  
  //PERMISSIONS 
  modelAccessModule: ModuleAccessModel;


  public StockIndentId: any;
  public transactionSource: any;

  employeeId: string = '0';
  approvalId: string = '0';
  approvebuttonEnable: boolean = false;
  approve : any;
  getData: getData;
  headingDisplay: string;
  formOneValid: boolean = true;
  createMode: boolean = false;
  check: boolean;
  status: string;
  mode: any;

  scrollLocationNamesync: boolean = false;
  locationNamePageNumber: number;
  locationCombo: any = [];

  scrollManufacturerPartNosync: boolean = false;
  manufacturePartComboPageNumber : Number;
  manufacturerPartNoList = [];

  itemTypePageNumber: number;
  scrollItemTypeNamesync: boolean = false;
  itemTypeList: any = [];

  constructor(private formBuilder: FormBuilder,
    public commonService: CommonService,
    public assetOptimaServices: AssetOptimaServices,
    public location: Location,
    public activatedRoute: ActivatedRoute,
    public assetOptimaConstants: AssetOptimaConstants,
    private cdr: ChangeDetectorRef,
    private userSessionService: UserSessionService,
    private router: Router,
    private readonly dialog: MatDialog
  ) {
    this.itemTypePageNumber = 1;
    this.itemPageNumber = 1;
    this.storePageNumber = 1;
    this.personInchargePageNumber = 1;
    this.srNoPageNumber = 1;
    this.itemDescPageNumber = 1;
    this.approve='APPROVED';
    this.locationNamePageNumber = 1;
    this.manufacturePartComboPageNumber = 1;
    this.modelAccessModule = new ModuleAccessModel();
  }


  ngOnInit() {
    this.modelAccessModule = this.userSessionService.getUserGroupAccess()['GROUPACCESS_STOCK_INDENT'];

    this.stockIndentForm = new FormGroup({
      indentHdrId: new FormControl(0),
      indentNo: new FormControl(''),
      indentDt: new FormControl(''),
      requestedBy: new FormControl(this.userSessionService.getUserName()),
      requestedById: new FormControl(this.userSessionService.getUserId()),
      requestedDt: new FormControl(''),
      indentStatus: new FormControl('BOOKED'),
      StockIndentStatusId: new FormControl(''),
      srId: new FormControl(0),
      srActivityId: new FormControl(0),
      srNo: new FormControl(''),
      storeId: new FormControl(0),
      storeName: new FormControl('',[Validators.required]),
      assetHdrId: new FormControl(''),
      assetCode: new FormControl(''),
      errorFlg: new FormControl(''),
      errorMessage: new FormControl(''),
      approvedBy: new FormControl(''),
      approvedDt: new FormControl(''),
      createdDt: new FormControl(''),
      createdBy: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedDt: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      indentDtDisp: new FormControl(''),
      requestedDtDisp: new FormControl(''),
      orgId: new FormControl(''),
      locationId: new FormControl((this.userSessionService.getUserLocationId())),
      locationName: new FormControl(this.userSessionService.getUserLocationName()),
      stockIndentDtl: this.formBuilder.array([]),
    });
    this.itemTypePageNumber = 1;
    this.itemPageNumber = 1;
    this.storePageNumber = 1;
    this.personInchargePageNumber = 1;
    this.srNoPageNumber = 1;
    this.manufacturePartComboPageNumber = 1;
    this.itemDescPageNumber = 1;
    this.newDate = this.commonService.getCurrentDateYYYYMMDD();
    this.commonService.setComboFocus(this.srNo);
    this.stockIndentForm.controls.srId.setValue(localStorage.getItem('srId') !== null ? localStorage.getItem('srId') : 0);
    this.stockIndentForm.controls.srNo.setValue(localStorage.getItem('srNo') !== null ? localStorage.getItem('srNo') : '');
    this.stockIndentForm.controls.srActivityId.setValue(localStorage.getItem('srActivityId') !== null ? localStorage.getItem('srActivityId') : 0 );
    this.stockIndentForm.controls.assetCode.setValue(localStorage.getItem('assetCode') !== null ? localStorage.getItem('assetCode') : '');
    this.stockIndentForm.controls.assetHdrId.setValue(localStorage.getItem('assetId') !== null ? localStorage.getItem('assetId') : 0);
    this.validateEditMode();
    localStorage.setItem('woPriviousPage', this.router.url);
    localStorage.setItem('previousRoute', this.router.url);
  } 

  approved() {  
    this.commonService.showSpinner();
    this.commonService.commonGetService('approveStockIndent.sams',this.stockIndentForm.controls.indentHdrId.value).subscribe(
      data => {
        if(data.success){
          this.commonService.openToastSuccessMessage(data.message);
          this.ngOnInit();
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }
    );
    this.commonService.hideSpinner();
    this.validateEditMode();
  }

  backTOItemScreen() {
    this.location.back();

  }

  exitForm() {
    this.location.back();
  }

  clear() {
    this.storePageNumber = 1;
    this.itemPageNumber = 1;
    this.personInchargePageNumber = 1;
    this.srNoPageNumber = 1;
    this.ngOnInit();

  }
  setAvailableQty(element, index) {

  }

  validateEditMode() {
    this.commonService.showSpinner();
    this.stockIndentForm.get('indentNo').disable();
    this.stockIndentForm.get('indentDtDisp').disable();
    this.stockIndentForm.get('indentStatus').disable();
    this.stockIndentForm.get('assetCode').disable();
    

    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        this.mode = params.mode;
        primaryId = Number(primaryId);
        this.StockIndentId = Number(primaryId);
        this.transactionSource = allWorkflowStatus[allWorkflowStatus.STOCK_INDENT];
        if (primaryId <= 0) {

          this.stockIndentForm.get('requestedBy').disable();
          this.stockIndentForm.get('requestedDtDisp').disable();

          this.stockIndentForm.controls['requestedDtDisp'].setValue(new Date());

          this.headingDisplay = "Create";
          this.createMode = true;
        } else {
          if (this.mode === 'view') {
            this.headingDisplay = "View";
            this.disableSubmit = true;
            this.approveDisableButton = true;
            this.stockIndentForm.disable();
          } else {
            //button and heading names for edit
            this.approveDisableButton = false;
            this.headingDisplay = 'Edit';
            this.stockIndentForm.get('requestedDtDisp').disable();
            this.stockIndentForm.get('storeName').disable();
            this.stockIndentForm.get('srNo').disable();
            this.stockIndentForm.get('requestedBy').disable();

          } 
          this.commonService.commonGetService('loadStockIndentInfo.sams', primaryId).subscribe(
            data => {
              this.stockIndentForm.patchValue(data.responseData);
              this.itemListinEditMode(data.responseData.stockIndentDtl);
              this.commonService.hideSpinner();
              this.getWorkflowApprovalForStockIndent();
              if(this.approveDisableButton === true){
                for (let index = 0; index < this.stockIndentDtl.controls.length; index++) {
                  const element = this.stockIndentDtl.controls[index];
                  element['controls'].indentQty.disable();
                  }
              }
            }
          )
        }
      }
    );
    this.commonService.hideSpinner();

  }

  itemListinEditMode(event) {
    this.stockIndentDtl = this.stockIndentForm.get('stockIndentDtl') as FormArray;
    event.map(obj => {
      const Group = this.formBuilder.group({
        indentDtlId: new FormControl(obj.indentDtlId),
        indentNo: new FormControl(obj.indentNo),
        indentHdrId: new FormControl(obj.indentHdrId),
        srId: new FormControl(obj.srId),
        srNo: new FormControl(obj.srNo),
        srActivityId: new FormControl(obj.srActivityId),
        itemId: new FormControl(obj.itemId),
        itemName: new FormControl(obj.itemName),
        description: new FormControl(obj.description),
        makerPartCode: new FormControl(obj.makerPartCode),
        availableQty: new FormControl(obj.availableQty),
        indentQty: new FormControl(obj.indentQty),
        issueQty: new FormControl(obj.issueQty),
        uom: new FormControl(obj.uom),
        storeId: new FormControl(obj.storeId),
        storeName: new FormControl(obj.storeName, [Validators.required]),
        errorFlg: new FormControl(obj.errorFlg),
        errorMessage: new FormControl(obj.errorMessage),
        createdBy: new FormControl(obj.createdBy),
        createdDt: new FormControl(obj.createdDt),
        updatedBy: new FormControl(obj.updatedBy),
        updatedDt: new FormControl(obj.updatedDt),
        processedFlg: new FormControl(obj.processedFlg),
        itemTypeId: new FormControl(obj.itemTypeId),
        itemTypeName: new FormControl(obj.itemTypeName),
      });
      this.stockIndentDtl.push(Group);
    });
    if (this.stockIndentForm.controls.indentStatus.value === 'BOOKED') {
      this.stockIndentForm.controls.StockIndentStatusId.setValue(2);
    }
  }


  addStockIndentForItem(): void {
    if (this.stockIndentForm.get('stockIndentDtl').value.length === 0) {
      this.stockIndentDtl = this.stockIndentForm.get('stockIndentDtl') as FormArray;
      this.stockIndentDtl.push(this.createStockIndentDtl());
    } else {
      this.checkValidation('disable');
    }
    this.formValidation();
  }

  validationFlg: boolean = false;
  checkValidation(msg) {
    this.validationFlg = false;
    let rowindex = this.stockIndentForm.controls.stockIndentDtl.value.length - 1;
    if (this.stockIndentForm.controls.stockIndentDtl['controls'][rowindex]['controls'].storeId.value > 0) {
      if (this.stockIndentForm.controls.stockIndentDtl['controls'][rowindex]['controls'].indentQty.value > 0) {
        for (let i = 0; i < this.stockIndentForm.controls.stockIndentDtl.value.length; i++) {
          if (this.stockIndentForm.controls.stockIndentDtl['controls'][i]['controls'].storeId.value > 0) {
          } else {
            this.validationFlg = true;
          }
        }
        if (!this.validationFlg) {
          this.callSaveMethod(msg);
        } else {
          this.commonService.openToastWarningMessage("Store is Mandatory");
        }

      } else {
        this.commonService.openToastWarningMessage("Indent Qty is Mandatory");
      }
    } else {
      this.commonService.openToastWarningMessage("Store Name is mandatory");
    }
  }

  submit() {
    let saveFlag = true;
    let length = this.stockIndentForm.controls.stockIndentDtl.value.length;               
    if (length > 0) {
      for (let i = 0; i < this.stockIndentForm.controls.stockIndentDtl.value.length; i++) {
        let sIForm = this.stockIndentForm.controls.stockIndentDtl['controls'][i]['controls'];
        if (!(sIForm.indentQty.value > 0 && sIForm.itemName.value != '')) {
          saveFlag = false;
          this.commonService.openToastWarningMessage('Indent Qty and Item name is mandatory.');
        }
      }
    } else {
      this.commonService.openToastWarningMessage('Kindly add atleast one item.');
    }
    
    if (saveFlag) {            
      this.callSaveMethod('enable');
    }
  }

  callSaveMethod(message) {
    if (message === 'enable') {
      this.commonService.commonInsertService('saveOrUpdateStockIndentInfo.sams', this.stockIndentForm.getRawValue()).subscribe(
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
      this.stockIndentDtl = this.stockIndentForm.get('stockIndentDtl') as FormArray;
      this.stockIndentDtl.push(this.createStockIndentDtl());
    }
  }


  createStockIndentDtl(): FormGroup {
    return this.formBuilder.group({
      indentNo: new FormControl(this.stockIndentForm.controls.indentNo.value),
      indentHdrId: new FormControl(''),
      indentDtlId: new FormControl(0),
      srId: new FormControl(this.stockIndentForm.controls.srId.value),
      srNo: new FormControl(this.stockIndentForm.controls.srNo.value),
      srActivityId: new FormControl(this.stockIndentForm.controls.srActivityId.value),
      itemTypeId: new FormControl('',[Validators.required]),
      itemTypeName: new FormControl('',[Validators.required]),
      itemId: new FormControl('',[Validators.required]),
      itemName: new FormControl('',[Validators.required]),
      description: new FormControl(''),
      makerPartCode: new FormControl(''),
      availableQty: new FormControl(''),
      indentQty: new FormControl(0,[Validators.required,Validators.min(1)]),
      issueQty: new FormControl(0),
      uom: new FormControl(''),
      storeId: new FormControl(this.stockIndentForm.controls.storeId.value),
      storeName: new FormControl(this.stockIndentForm.controls.storeName.value),
      errorFlg: new FormControl(''),
      errorMessage: new FormControl(''),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      processedFlg: new FormControl('0')
    });
  }


  listOfItemFromMaster(searchTerms, index) {
    let storeId = this.stockIndentForm.controls.storeId.value;
    if (storeId > 0) {
      this.scrollItemNamesync = true;
      this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
      let itemTypeId = this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].itemTypeId.value;
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].itemTypeId.value;
      this.commonService.getComboResults(this.assetOptimaServices.listAllItemCombo, searchTerms.term, this.stockIndentForm.controls.locationId.value, itemTypeId, this.limitCount, this.itemPageNumber, '').subscribe(
      (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchTerms, this.itemPageNumber , this.itemList , data.responseData.comboList)
          this.itemPageNumber = this.getData.pageNumber;
          this.itemList = this.getData.dataList;
          this.scrollItemNamesync = false;
        }
      );
    } else {
      this.commonService.openToastWarningMessage("Kindly select store name");
    }
  }

  getItemValueFromMaster(event, index) {
    if (event === undefined) {
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].uom.setValue('');
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].itemId.setValue('');
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].itemName.setValue('');
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].description.setValue('');
      this.itemPageNumber = 1;
    } else {
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].uom.setValue(event.masterUOMName);
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].itemId.setValue(event.itemMasterId);
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].itemName.setValue(event.itemMasterName);
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].description.setValue(event.itemMasterDesc);
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].itemTypeId.setValue(event.itemTypeId);
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].itemTypeName.setValue(event.itemTypeName);

      let locId = this.stockIndentForm.controls.locationId.value;
      let storeId = this.stockIndentForm.controls.storeId.value;
      let itemId = event.itemMasterId;
      let makerPartCode = this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].makerPartCode.value;
      this.commonService.commonGetService('fetchOnHandQty.sams', locId, storeId, itemId, makerPartCode).subscribe(
        data => {
          this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].availableQty.setValue(data.responseData);
        }
      )
    }
    this.formValidation();
  }



  listOfItemDescFromMaster(searchTerms, index) {
    let storeId = this.stockIndentForm.controls.storeId.value;
    if (storeId > 0) {
      this.scrollItemDescsync = true;
      this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
      let itemTypeId = this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].itemTypeId.value;
      this.commonService.getComboResults('listOfItemDescCombo.sams', searchTerms.term, this.stockIndentForm.controls.locationId.value, itemTypeId, this.limitCount, this.itemDescPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchTerms, this.itemDescPageNumber, this.itemDescList, data.responseData.comboList)
          this.itemDescPageNumber = this.getData.pageNumber;
          this.itemDescList = this.getData.dataList;
          this.scrollItemDescsync = false;
        }
      );
    } else {
      this.commonService.openToastWarningMessage("Kindly select store name");
    }
  }

  getItemDescValueFromMaster(event, index) {
    if (event === undefined) {
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].uom.setValue('');
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].itemId.setValue('');
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].itemName.setValue('');
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].description.setValue('');
      this.itemPageNumber = 1;
    } else {
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].uom.setValue(event.masterUOMName);
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].itemId.setValue(event.itemMasterId);
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].itemName.setValue(event.itemMasterName);
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].description.setValue(event.itemMasterDesc);
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].itemTypeId.setValue(event.itemTypeId);
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].itemTypeName.setValue(event.itemTypeName);


      let locId = this.stockIndentForm.controls.locationId.value;
      let storeId = this.stockIndentForm.controls.storeId.value;
      let itemId = event.itemMasterId;
      let makerPartCode = this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].makerPartCode.value;
      this.commonService.commonGetService('fetchOnHandQty.sams', locId, storeId, itemId, makerPartCode).subscribe(
        data => {
          this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].availableQty.setValue(data.responseData);
        }
      )
    }
    this.formValidation();
  }

  listOfStore(searchTerms) {
    this.scrollStoreNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults('listOfAllStoreCombo.sams', searchTerms.term, '', '', this.limitCount, this.storePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.storePageNumber , this.storeList , data.responseData.comboList)
        this.storePageNumber = this.getData.pageNumber;
        this.storeList = this.getData.dataList;
        this.scrollStoreNamesync = false;
      }
    );
  }

  getStoreValue(event) {
    if (event === undefined) {
      this.stockIndentForm.controls['storeName'].setValue('');
      this.stockIndentForm.controls['storeId'].setValue(0);
      this.storePageNumber = 1;
    } else {
      this.stockIndentForm.controls['storeName'].setValue(event.storeName);
      this.stockIndentForm.controls['storeId'].setValue(event.storeId);
      this.commonService.setFormFocus(this.requestedDtDisp);
    }
  }

  loadPersonInchargeComboData(searchValue) {
    this.scrollsyncPersonIncharge = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllEmployeeForOrgCombo.sams', searchValue.term, '', '', this.limitCount, this.personInchargePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.personInchargePageNumber , this.personInchargeCombo , data.responseData.comboList)
        this.personInchargePageNumber = this.getData.pageNumber;
        this.personInchargeCombo = this.getData.dataList;
        this.scrollsyncPersonIncharge = false;
      }
    );
  }

  selectedPersonInchargeData(event) {
    if (event === undefined) {
      this.stockIndentForm.controls['requestedById'].setValue(0);
      this.stockIndentForm.controls['requestedBy'].setValue('');
      this.personInchargePageNumber = 1;
    } else {
      this.stockIndentForm.controls['requestedById'].setValue(event.employeeId);
      this.stockIndentForm.controls['requestedBy'].setValue(event.employeeFirstName);
      this.commonService.setComboFocus(this.storeName);
    }
  }

  loadServiceRequestNumbers(searchValue) {
    this.scrollSRNosync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllSRNoForCombo, searchValue.term, '', '', this.limitCount, this.srNoPageNumber,
      'IN-PROGRESS', 'stockIndent').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.srNoPageNumber , this.srNoCombo , data.responseData.comboList)
          this.srNoPageNumber = this.getData.pageNumber;
          this.srNoCombo = this.getData.dataList;
          this.scrollSRNosync =  false;
        }
      );
  }

  selectedSRNo(event) {
    if (event === undefined) {
      this.stockIndentForm.controls['srId'].setValue(0);
      this.stockIndentForm.controls['srNo'].setValue('');
      this.stockIndentForm.controls['assetCode'].setValue('');
      this.stockIndentForm.controls['assetHdrId'].setValue(0);
      this.srNoPageNumber = 1;
    } else {
      this.stockIndentForm.controls['srId'].setValue(event.srId);
      this.stockIndentForm.controls['srNo'].setValue(event.srNo);
      this.stockIndentForm.controls['assetCode'].setValue(event.assetCode);
      this.stockIndentForm.controls['assetHdrId'].setValue(event.assetId);
      this.commonService.setComboFocus(this.requestedBy);
    }
    this.formValidation();
  }


  setIndentQty(element, index) {
    const setListValue = element['controls'];
    let _availableQty = setListValue['availableQty'].value;
    let _indentQty = setListValue['indentQty'].value;
    // if(_indentQty <= _availableQty){      
    this.stockIndentForm.controls['stockIndentDtl']['controls'][index]['controls']['indentQty'].setValue(_indentQty);
    this.stockIndentForm.controls['stockIndentDtl']['controls'][index]['controls']['issueQty'].setValue(_indentQty);
    // this.stockIndentForm.controls['stockIndentDtl']['controls'][index]['controls']['issueQty'].setValue(_indentQty);
    // }else{
    //   this.commonService.openToastWarningMessage("Indent Qty should not be greater than Available Qty");
    //   this.stockIndentForm.controls['stockIndentDtl']['controls'][index]['controls']['indentQty'].setValue(0);
    //   this.stockIndentForm.controls['stockIndentDtl']['controls'][index]['controls']['issueQty'].setValue(0);
    // }
    this.formValidation();
  }

  setIssueQty(element, index) {
    const setListValue = element['controls'];
    let _availableQty = setListValue['availableQty'].value;
    let _indentQty = setListValue['indentQty'].value;
    let _issueQty = setListValue['issueQty'].value;
    if (_issueQty <= _availableQty) {
      this.stockIndentForm.controls['stockIndentDtl']['controls'][index]['controls']['issueQty'].setValue(_issueQty);
    } else {
      this.commonService.openToastWarningMessage("Issue Qty should not be greater than Available Qty");
      this.stockIndentForm.controls['stockIndentDtl']['controls'][index]['controls']['issueQty'].setValue(0);
    }
    this.formValidation();
  }

  delete(index) {
    this.stockIndentDtl = this.stockIndentForm.get('stockIndentDtl') as FormArray;
    this.stockIndentDtl.removeAt(index)
  }

  getWorkflowApprovalForStockIndent() { 
    this.commonService.commonGetService('getWorkflowForId.sams', this.stockIndentForm.controls.indentHdrId.value,
      this.userSessionService.getUserEmpId(),
      allWorkflowStatus[allWorkflowStatus.STOCK_INDENT], this.userSessionService.getUserOrgId()).subscribe(
        data => {
          if (data.success) {
            this.employeeId = this.userSessionService.getUserEmpId();
            this.approvebuttonEnable = data.responseData.approvalFlag;
            this.approvalId = data.responseData.workflowApprovalId;
            if (!data.responseData.approvalFlag) {
              for (let index = 0; index < this.stockIndentDtl.controls.length; index++) {
                const element = this.stockIndentDtl.controls[index];
                element['controls'].issueQty.disable();
              }
            }else{
              for (let index = 0; index < this.stockIndentDtl.controls.length; index++) {
              const element = this.stockIndentDtl.controls[index];
              element['controls'].indentQty.disable();
              }
            }          
          } else {
            this.commonService.openToastWarningMessage(data.message);
          }
        }, error => {
      }
      );
  }
  
  formValidation() {
    for (let index = 0; index < this.stockIndentDtl.controls.length; index++) {
      const element = this.stockIndentDtl.controls[index];
      if (element.valid) {
        if(this.createMode) {
            let indentQty = this.stockIndentForm.controls['stockIndentDtl']['controls'][index]['controls']['indentQty'].value;
            if(Number(indentQty) > 0) {
                this.formOneValid = true;   
            } else {
                this.formOneValid = false;
            }   
          } else {
            let issueQty = this.stockIndentForm.controls['stockIndentDtl']['controls'][index]['controls']['issueQty'].value;
            if(Number(issueQty) > 0) {
              this.formOneValid = true;   
            } else {
              this.formOneValid = false;
            }
          }  
      } else {
        this.formOneValid = false;
        return this.formOneValid;
      }   
    }  
    return this.formOneValid;    
  }

  confirmStockIndentApprove() {
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
          this.submit();
          this.status = 'PARTIALLY APPROVED';
          this.indentValidateAndStatusUpdate(this.status);
        }
      });
  }

  indentValidateAndStatusUpdate(status) {
    let indentHdrIdList = {selectedIndentList: [this.stockIndentForm.controls.indentHdrId.value],status: status,selectedApprovalList : [this.approvalId]};
      this.commonService.commonInsertService(this.assetOptimaServices.indentValidateAndStatusUpdate, indentHdrIdList).subscribe(
        data => {
          if (data.success) {
            this.commonService.openToastSuccessMessage(data.message);           
            this.ngOnInit();
          } else {
            this.commonService.openToastErrorMessage(data.message);
          }
        });
  }

  rejectStockIndentApprove() {
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
          this.indentValidateAndStatusUpdate(this.status);
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
      this.stockIndentForm.controls['locationId'].setValue(0);
      this.locationNamePageNumber = 1;
    } else {
      this.stockIndentForm.controls['locationId'].setValue(event.locationId);
    }
  }

  listOfManufacturerPartNo(searchTerms,index) {
    let itemId = this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].itemId.value;
    this.scrollManufacturerPartNosync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults('listAllManufacturerPartNoCombo.sams', searchTerms.term, itemId, '', this.limitCount, this.manufacturePartComboPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.manufacturePartComboPageNumber , this.manufacturerPartNoList , data.responseData.comboList)
        this.manufacturePartComboPageNumber = this.getData.pageNumber;
        this.manufacturerPartNoList = this.getData.dataList;
        this.scrollManufacturerPartNosync = false;
      }
    );
  }

  getManufacturerPartNoValue(event, index) {
    if (event === undefined) {
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].makerPartCode.setValue('');
      this.manufacturePartComboPageNumber = 1;
    } else {
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].makerPartCode.setValue(event.itemManufacturerPartno);
    }

    let locId = this.stockIndentForm.controls.locationId.value;
    let storeId = this.stockIndentForm.controls.storeId.value;
    let itemId = this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].itemId.value;;
    let makerPartCode = this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].makerPartCode.value;
    this.commonService.commonGetService('fetchOnHandQty.sams', locId, storeId, itemId, makerPartCode).subscribe(
      data => {
        this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].availableQty.setValue(data.responseData);
      }
    )
    this.formValidation();
  }

  listOfItemTypeCombo(searchTerms) {
    this.scrollItemTypeNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllItemTypeCombo, searchTerms.term, '', '', this.limitCount, this.itemTypePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.itemTypePageNumber, this.itemTypeList, data.responseData.comboList)
        this.itemTypePageNumber = this.getData.pageNumber;
        this.itemTypeList = this.getData.dataList;
        this.scrollItemTypeNamesync = false;
      }
    );
  }

  getItemTypeValue(event,index) {
    if (event === undefined) {
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].itemTypeId.setValue(0);
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].itemTypeName.setValue('');
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].uom.setValue('');
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].itemId.setValue('');
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].itemName.setValue('');
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].description.setValue('');
      this.itemTypePageNumber = 1;
    } else {
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].itemTypeId.setValue(event.itemTypeId);
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].itemTypeName.setValue(event.itemTypeName);
    

      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].uom.setValue('');
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].itemId.setValue('');
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].itemName.setValue('');
      this.stockIndentForm.controls.stockIndentDtl['controls'][index]['controls'].description.setValue('');
      this.itemList  = [];
      this.itemDescList = [];
      this.itemPageNumber = 1;
      this.itemDescPageNumber = 1;
    }
  }
}
