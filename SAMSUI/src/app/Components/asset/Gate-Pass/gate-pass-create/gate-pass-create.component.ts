import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { UserSessionService } from '../../../../Services/user-session-service/user-session.service';
import { CommonService } from '../../../../Services/common-service/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetOptimaConstants } from '../../../../Constants/AssetOptimaConstants';
import { MatDialog } from '@angular/material/dialog';
import {  MatTable, MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { CommonHint } from '../../../../Constants/CommonHint';
import { DeleteConfirmationComponent } from '../../../../Components/Common-components/delete-confirmation/delete-confirmation.component';
import { AssetOptimaServices } from '../../../../Constants/AssetOptimaServices';
import { GatePassReturnInfoComponent } from '../gate-pass-return-info/gate-pass-return-info.component';
import { allGatePassStatus, allWorkflowStatus } from '../../../../Constants/AllStatusConstants';
import { getData } from '../../../../../app/Model/common/fetchListData';
import { AssetModel } from '../../../../../app/Model/master/asset';
import { TranslateService } from '@ngx-translate/core';
import { allBusinessPartnerRoles } from 'src/app/Constants/AllStatusConstants';
import { GatePassSourceInfoComponent } from '../gate-pass-source-info/gate-pass-source-info.component';
import { GatePassCollectedInfoComponent } from '../gate-pass-collected-info/gate-pass-collected-info.component';

@Component({
  selector: 'app-gate-pass-create',
  templateUrl: './gate-pass-create.component.html',
  styleUrls: ['./gate-pass-create.component.css']
})
export class GatePassCreateComponent implements OnInit {

  gatePassHdrForm: FormGroup;
  gatePassDtlForm: FormGroup;

  public gatePassHdrId: any;
  public transactionSource: any;
  public asset: AssetModel;

  mandatoryActivity: string = "";

  headingDisplay: string;
  displayButton: string;
  disableClear: boolean = false;
  uploadFlag: boolean = false;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  //COMBO LIST
  assetCodeCombo: any = [];
  assetCodePageNumber: number;
  scrollsyncAssetCode: boolean = false;

  employeeId: string = '0';
  approvalId: string = '0';

  recordsPerPageForCombo: string;
  recordsPerPage: string;

  @ViewChild('matGatePassDtlModel') matGatePassDtlModel: MatTable<any>;
  gatePassModuleList: any[];

  gatePassDtlFormList = new MatTableDataSource<any>();getData: getData;
  modeDisplay: boolean = false;
  formOneValid: boolean = false;
  assetListArray: any[];

  dispColumnsGatePassForAsset = ['sNo', 'assetCode', 'description', 'modelName', 'manufacturerName', 'assetGroupName', 'returnType', 'returnedStatus', 'quantity','expectedReturnDt', 'action'];
  dispColumnsGatePassForOther = ['sNo', 'assetCode', 'itemName', 'itemDesc', 'returnType', 'returnedStatus', 'quantity','expectedReturnDt', 'action'];

  submitButton: boolean = false;

  enableSupplierCombo: boolean = false;
  enableManufacturerCombo: boolean = false;
  enableBranchCombo: boolean = false;
  enableEmployee: boolean =false;
  enableCustomer: boolean = false;

  customerLocationListPageNumber: number;
  customerLocationCombo: any = [];
  scrollCustomerLocationSync: boolean = false;

  employeePageNumber : number;
  employeeCombo: any = [];
  scrollsyncEmployee: boolean = false;

  customerListPageNumber : number;
  customerList : any = [];
  scrollCustomersync: boolean = false;

  scrollSuppliersync: boolean = false;
  supplierListPageNumber: number;
  supplierList: any = [];

  scrollManufacturersync: boolean = false;
  manufacturerListPageNumber: number;
  manufacturerList: any = [];

  gatePassPurposeList: any = [];
  gatePassPurposePageNumber: number;
  scrollGatePassPurposesync: boolean = false;

  manuServiceLocationList: any = [];
  manuServiceLocationPageNumber: number;
  scrollManuServiceLocationSync: boolean = false;

  scrollSupplierLocationSync: boolean = false;
  supplierLocationListPageNumber: number;
  supplierLocationCombo: any = [];

  scrollLocationNameSync: boolean = false;
  scrollLocationNameSync1: boolean = false;
  locationNamePageNumber: number;
  locationCombo: any = [];

  scrollModelModuleSync: boolean = false;
  modelModulePageNumber: number;
  modelModuleCombo: any = [];

  scrollItemNameSync: boolean = false;
  itemList: any = [];
  itemNamePageNumber: number;

  scrollGatePassSourceNosync: boolean = false;
  gatePassSourceNoPageNumber: number;
  gatePassHdrList: any = [];

  approvebuttonEnable: boolean;
  limitCount: any;

  assetHdrIdTemp: any;
  assetCodeTemp: any;
  assetCodeDisp: any;
  gatePassSourceTemp: any;
  srIdTemp: any;
  gatePassSourceIdTemp: any;
  gatePassSourceNoTemp: any;
  modelId: any;
  approve:string;

  assetTransactionSrcDesc: any;
  assetTransactionSrc : any;


  gatePassForAsset: boolean = false;
  gatePassForAssetCombo: boolean = false;
  gatePassForModule: boolean = false;
  gatePassForSpares: boolean = false;
  gatePassForAcc: boolean = false;
  gatePassForCon: boolean = false;
  gatePassSourceInfo: boolean = false;
  gatepassStatusApproved:number = 0;
  returnTypeList = [
    { id: 1, name: 'RETURNABLE' },
    { id: 2, name: 'NON-RETURNABLE' },
  ];

  deliveryMode = [
    { id: 1, name: 'BY ROAD' },
    { id: 2, name: 'BY AIR' },
    { id: 3, name: 'BY SEA' }
  ];

  deliveryTo = [
    { id: 1, name: 'SUPPLIER' },
    { id: 2, name: 'MANUFACTURER' },
    { id: 3, name: 'BRANCH' },
    { id: 4, name: 'CUSTOMER' },
    { id: 5, name: 'EMPLOYEE' },
    { id: 6, name: 'OTHERS' }
  ];

  Spare_Parts = 'Spare Parts';

  gatePassFor = [
    { id: 1, name: 'Asset' },
    { id: 2, name: 'Module' },
    { id: 3, name: this.Spare_Parts },
    { id: 4, name: 'Accessories' },
    { id: 5, name: 'Consumables' }
  ];

  tlApproved: boolean = false;

  constructor(private readonly commonService: CommonService,
    private readonly changeDetectorRefs: ChangeDetectorRef,
    private readonly activatedRoute: ActivatedRoute,
    private readonly appGlobals: AssetOptimaConstants,
    private readonly locationRef: Location,
    private readonly dialog: MatDialog,
    private readonly userSessionService: UserSessionService,
    private readonly assetOptimaServices: AssetOptimaServices,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private translateService: TranslateService,
    ) {
      this.assetCodePageNumber = 1;
      this.supplierListPageNumber = 1;
      this.manufacturerListPageNumber = 1;
      this.gatePassPurposePageNumber = 1;
      this.manuServiceLocationPageNumber = 1;
      this.locationNamePageNumber = 1;
      this.supplierLocationListPageNumber = 1;
      this.modelModulePageNumber = 1;
      this.itemNamePageNumber = 1;
      this.gatePassSourceNoPageNumber = 1;
      this.customerLocationListPageNumber=1;
      this.employeePageNumber=1;
      this.customerListPageNumber = 1;
      this.approvebuttonEnable = false;
      this.approve = 'APPROVED';

      this.gatePassModuleList = [];
      this.gatePassDtlFormList.data = [];
      this.gatePassHdrList=[];
      this.asset = new AssetModel();
  }

  ngOnInit() {

    this.tlApproved = this.appGlobals.tlApproved;
    this.activatedRoute.params.subscribe(
      params => {
        let primaryId = params.pId;
        primaryId = Number(primaryId);
        this.gatePassHdrId = primaryId;
        this.transactionSource = allWorkflowStatus[allWorkflowStatus.GATE_PASS];
      });

      this.gatepassStatusApproved =allGatePassStatus.GATE_PASS_APPROVED;

    this.gatePassHdrForm = new FormGroup({
      gatePassHdrId: new FormControl(0),
      gatePassNo: new FormControl(''),
      gatePassDt : new FormControl(''),
      gatePassDtDisp : new FormControl(new Date(),[Validators.required]),
      gatePassStatus: new FormControl(''),
      locationName: new FormControl(null, [Validators.required]),
      locationId: new FormControl(0),
      gatePassSource: new FormControl(''),
      gatePassSourceId: new FormControl('0'),
      gatePassSourceNo: new FormControl(null),
      deliveryTo: new FormControl(null, [Validators.required]),
      deliveryToId: new FormControl('0'),
      deliveryToName: new FormControl(null, [Validators.required]),
      deliveryToAddress1: new FormControl(''),
      deliveryToAddress2: new FormControl(''),
      deliveryToCity: new FormControl(''),
      deliveryToState: new FormControl(''),
      deliveryToCountry: new FormControl(''),
      deliveryToZipcode: new FormControl(''),
      deliveryMode: new FormControl('',),
      deliveryInfo: new FormControl(''),
      deliveryVehicleInfo: new FormControl(''),
      gatePassRemarks: new FormControl('', [Validators.maxLength(500)]),
      //COMMON FIELDS
      orgId: new FormControl(''),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),

      deliveryTakenByPerson: new FormControl(''),
      deliveryTakenByContactNo: new FormControl('',[Validators.pattern(this.appGlobals.phoneNumberValidation), Validators.maxLength(15), Validators.minLength(10)]),
      deliveryTakenByEmailId: new FormControl(''),
      gatePassFor: new FormControl(''),
      gatePassPurpose: new FormControl(null, [Validators.required]),

      siteServiceLocationId: new FormControl('0'),
      siteServiceLocationName: new FormControl(null),
      assetId: new FormControl(''),
      gatePassStatusId : new FormControl(0),
    });

    this.gatePassDtlForm = new FormGroup({
      gatePassDtlId: new FormControl(0),
      gatePassHdrId: new FormControl(0),
      transactionId: new FormControl(0),
      transactionName: new FormControl(''),
      itemName: new FormControl(''),
      itemDesc: new FormControl(''),
      assetCode: new FormControl(null, [Validators.required]),
      modelName: new FormControl(''),
      manufacturerName: new FormControl(''),
      assetGroupName: new FormControl(''),
      returnType: new FormControl(null),
      assetRemarks: new FormControl(''),
      quantity: new FormControl(1,[Validators.min(1)]),
      gatePassFor: new FormControl('', [Validators.required]),
      assetId: new FormControl(0),
      expectedReturnDt : new FormControl(''),
      expectedReturnDtDisp : new FormControl(''),
      description: new FormControl(''),
    });

    this.gatePassHdrForm.controls['locationId'].setValue(this.userSessionService.getUserLocationId());
    this.gatePassHdrForm.controls['locationName'].setValue(this.userSessionService.getUserLocationName());
    this.gatePassHdrForm.controls['createdBy'].setValue(this.userSessionService.getUserName());
    this.gatePassHdrForm.controls['gatePassNo'].disable();
    this.gatePassHdrForm.controls['gatePassStatus'].disable();
    this.gatePassHdrList=[];
    this.validateEditMode();
    this.gatePassDtlForm.controls.gatePassFor.disable();
  }

  EndDateChange(event){
    console.log(event);
  }

  onDate(event){
    console.log(event);
  }

  backTOGatePassScreen() {
    this.locationRef.back();
  }

  dateValidationinstall(event) {
    return false;
  }

  listAssetsOfManufacturer(searchValue) {
    this.scrollsyncAssetCode = true;
    const locId = this.gatePassHdrForm.controls.locationId.value;
    let manufacturerId = this.gatePassHdrForm.controls.deliveryToId.value;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAssetsOfManufacturerCombo.sams', searchValue.term,
    locId > 0 ? locId : 0, manufacturerId,this.recordsPerPageForCombo, this.assetCodePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetCodePageNumber , this.assetCodeCombo , data.responseData.comboList)
          this.assetCodePageNumber = this.getData.pageNumber;
          this.assetCodeCombo = this.getData.dataList;
          this.scrollsyncAssetCode = false;
        }
      );
  }

  loadAssetCodeComboData(searchValue) {
    this.scrollsyncAssetCode = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetCodeCombo.sams', searchValue.term,
      this.gatePassHdrForm.controls.locationId.value > 0 ? this.gatePassHdrForm.controls.locationId.value : 0, '',
      this.recordsPerPageForCombo, this.assetCodePageNumber, '', '').subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.assetCodePageNumber === 1) {
              this.assetCodeCombo = data.responseData.comboList;
            } else {
              this.assetCodeCombo = this.assetCodeCombo.concat(data.responseData.comboList);
            }
          } else {
            this.assetCodeCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length != 0 ? this.assetCodePageNumber += 1 : this.assetCodePageNumber = 1;
        }
      );
    this.scrollsyncAssetCode = false;
  }

  selectedAssetCodeData(event) {
    if (event === undefined) {
      this.gatePassDtlForm.controls['assetCode'].setValue(null);
      this.gatePassDtlForm.controls['assetId'].setValue(0);
      this.gatePassDtlForm.controls['transactionId'].setValue(0);
      this.gatePassDtlForm.controls['transactionName'].setValue('');
      this.gatePassDtlForm.controls['modelName'].setValue('');
      this.gatePassDtlForm.controls['manufacturerName'].setValue('');
      this.gatePassDtlForm.controls['assetGroupName'].setValue('');
      this.gatePassDtlForm.controls['description'].setValue('');
      this.gatePassHdrForm.controls.deliveryToId.setValue(0);
      this.assetCodePageNumber = 1;
      this.assetCodeCombo = [];
      this.assetCodeDisp = '';
    } else {
      this.gatePassDtlForm.controls['assetCode'].setValue(event.assetCode);
      this.gatePassDtlForm.controls['assetId'].setValue(event.assetHdrId);
      this.gatePassDtlForm.controls['transactionId'].setValue(event.assetHdrId);
      this.gatePassDtlForm.controls['transactionName'].setValue(event.assetCode);
      this.gatePassDtlForm.controls['modelName'].setValue(event.modelName);
      this.gatePassDtlForm.controls['manufacturerName'].setValue(event.manufacturerName);
      this.gatePassDtlForm.controls['assetGroupName'].setValue(event.assetGroupName);
      this.gatePassDtlForm.controls['description'].setValue(event.description);
      if(event.source != null || event.source != ''){
        this.gatePassHdrForm.controls['gatePassSource'].setValue(event.source);
        this.gatePassHdrForm.controls['gatePassSourceId'].setValue(event.sourceId);
        this.gatePassHdrForm.controls['gatePassSourceNo'].setValue(event.sourceNo);
        this.gatePassDtlForm.controls['transactionName'].setValue(event.source);
        this.gatePassDtlForm.controls['transactionId'].setValue(event.sourceId);
      }
      this.assetCodeDisp = event.assetCode + " - " + event.modelName + " - " + event.description + " - " + event.equipmentCode + " - " + event.serialNo;
      this.assetTransactionSrcDesc = event.assetTransactionSrcDesc;
      this.assetTransactionSrc = event.assetTransactionSrc;
    }
  }

  selectedItemDataData(event) {
    if (event === undefined) {
      this.gatePassDtlForm.controls['assetCode'].setValue(null);
      this.gatePassDtlForm.controls['assetId'].setValue(0);
      this.gatePassDtlForm.controls['transactionId'].setValue(0);
      this.gatePassDtlForm.controls['transactionName'].setValue('');
      this.gatePassDtlForm.controls['modelName'].setValue('');
      this.gatePassDtlForm.controls['manufacturerName'].setValue('');
      this.gatePassDtlForm.controls['assetGroupName'].setValue('');
      this.itemNamePageNumber = 1;
      this.itemList = [];
    } else {
      this.gatePassDtlForm.controls['assetCode'].setValue(this.assetCodeTemp);
      this.gatePassDtlForm.controls['assetId'].setValue(this.assetHdrIdTemp);
      this.gatePassDtlForm.controls['transactionId'].setValue(event.itemId);
      this.gatePassDtlForm.controls['transactionName'].setValue(event.itemName);
      this.gatePassDtlForm.controls['itemName'].setValue(event.itemName);
      this.gatePassDtlForm.controls['itemDesc'].setValue(event.itemDesc);
    }
  }

  addAssetOrItemInfo(assetCode, transactionId) {

    if (this.commonService.getIndexOfTheItem(this.gatePassDtlFormList.data, true, 'assetId', transactionId) === -1) {

      this.gatePassDtlFormList.data.push(this.gatePassDtlForm.value);
      this.changeDetectorRefs.detectChanges();
      this.matGatePassDtlModel.renderRows();
      this.clearAssetCombo();
    } else {
      this.commonService.openToastWarningMessage(assetCode + ' is Already added !!!');
    }
    this.formValidation();
  }

  clearAssetCombo() {
    this.gatePassDtlForm.controls.assetCode.setValue(null);
    this.gatePassDtlForm.controls.transactionId.setValue(0);
    this.assetCodeDisp = '';
  }

  //Delete Asset
  deleteGatePassItem(gatePassDtlId, index) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Asset'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          if (gatePassDtlId <= 0) {
            this.gatePassDtlFormList.data.splice(index, 1);
            this.commonService.openToastSuccessMessage("Record Deleted Successfully.");
            this.changeDetectorRefs.detectChanges();
            this.matGatePassDtlModel.renderRows();
            this.formValidation();
          } else {
            this.commonService.commonGetService('deleteGatePassDtl.sams', gatePassDtlId).subscribe(
              data => {
                if (data.success) {
                  this.commonService.openToastSuccessMessage("Record Deleted Successfully.");
                  this.gatePassDtlFormList.data.splice(index, 1);
                  this.formValidation();
                } else {
                  this.commonService.openToastErrorMessage(data.message);
                }
              }
            );
          }
        }
      });
  }


  saveGatePass() {
    if (this.gatePassDtlFormList.data.length > 0) {

      this.gatePassDtlFormList.data.map((e,i)=>{
        return this.gatePassDtlFormList.data[i].expectedReturnDt = this.gatePassDtlFormList.data[i].expectedReturnDtDisp;
      })

      this.uploadFlag = true;
      const gatePassObj = {
        'gatePassHdr': this.gatePassHdrForm.getRawValue(),
        'gatePassDtlList': this.gatePassDtlFormList.data
      }
      this.commonService.showSpinner();
      this.commonService.commonInsertService('saveOrUpdateGatePass.sams', gatePassObj).subscribe(
        data => {
          if (data.success) {
            this.commonService.openToastSuccessMessage(data.message);
            this.commonService.hideSpinner();
            this.locationRef.back();
            this.uploadFlag = false;
          } else {
            this.commonService.hideSpinner();
            this.commonService.openToastErrorMessage(data.message);
            this.uploadFlag = false;
          }
          
        }
      );
    } else {
      this.commonService.openToastWarningMessage("Select One Asset");
    }
  }

  validateEditMode() {
    this.activatedRoute.params.subscribe(
      params => {
        let primaryId = params.pId;
        primaryId = Number(primaryId);
        const mode = params.mode;

        if (primaryId <= 0) {
          this.displayButton = "Submit";
          this.disableClear = false;
          this.headingDisplay = "Create";
          this.submitButton = true;

          const gatePassSource = localStorage.getItem('gatePassSource');
          const gatePassSourceId = localStorage.getItem('gatePassSourceId');

          this.gatePassSourceTemp = (gatePassSource !== null && gatePassSource !== '') ? gatePassSource : '';
          if (this.gatePassSourceTemp === 'WORKORDER') {

            this.gatePassHdrForm.controls.gatePassDtDisp.disable();
            this.assetCodeTemp = (localStorage.getItem('assetCode') !== null && localStorage.getItem('assetCode') !== '') ? localStorage.getItem('assetCode') : '';
            this.gatePassSourceIdTemp = (gatePassSourceId !== null && gatePassSourceId !== '') ? gatePassSourceId : '';
            this.gatePassSourceNoTemp = (localStorage.getItem('gatePassSourceNo') !== null && localStorage.getItem('gatePassSourceNo') !== '') ? localStorage.getItem('gatePassSourceNo') : '';

            this.gatePassHdrForm.controls.gatePassSource.setValue(this.gatePassSourceTemp);
            this.gatePassHdrForm.controls.gatePassSourceId.setValue(this.gatePassSourceIdTemp);
            this.gatePassHdrForm.controls.gatePassSourceNo.setValue(this.gatePassSourceNoTemp);

            this.gatePassHdrForm.controls.gatePassStatus.setValue('GATE PASS REQUESTED - EXTERNAL REPAIRS');

            this.gatePassHdrForm.controls.gatePassPurpose.setValue(localStorage.getItem('gatePassPurpose'));
            this.gatePassHdrForm.controls.gatePassPurpose.disable();

            this.gatePassHdrForm.controls.locationId.setValue(localStorage.getItem('locationId'));
            this.gatePassHdrForm.controls.locationName.setValue(localStorage.getItem('locationName'));


            this.gatePassDtlForm.controls.gatePassFor.setValue('Asset');

            const modelName = localStorage.getItem('modelName');
            const assetDescription = localStorage.getItem('assetDescription');
            const equipmentCode = localStorage.getItem('equipmentCode');
            const serialNo = localStorage.getItem('serialNo');
            const manufacturerName = localStorage.getItem('manufacturerName');
            const assetGroupName = localStorage.getItem('assetGroupName');
            const modelId = localStorage.getItem('modelId');

            this.assetHdrIdTemp = localStorage.getItem('assetId');

            this.assetCodeDisp = this.assetCodeTemp + " - " + modelName + " - " + assetDescription + " - " + equipmentCode + " - " + serialNo;
            this.gatePassDtlForm.controls.assetCode.setValue(this.assetCodeTemp);

            this.gatePassDtlForm.controls.modelName.setValue(modelName);
            this.gatePassDtlForm.controls.manufacturerName.setValue(manufacturerName);
            this.gatePassDtlForm.controls.assetGroupName.setValue(assetGroupName);
            this.gatePassDtlForm.controls.returnType.setValue('RETURNABLE');
            this.gatePassDtlForm.controls.assetId.setValue(this.assetHdrIdTemp);
            this.gatePassDtlForm.controls.transactionId.setValue(this.assetHdrIdTemp);
            this.gatePassDtlForm.controls.transactionName.setValue(this.assetCodeTemp);
            this.modelId = modelId;

            this.gatePassDtlForm.controls['assetCode'].setValue(this.assetCodeTemp);
            this.gatePassDtlForm.controls['assetId'].setValue(this.assetHdrIdTemp);
            this.gatePassDtlForm.controls['transactionId'].setValue(this.assetHdrIdTemp);
            this.gatePassDtlForm.controls['transactionName'].setValue(this.assetCodeTemp);
            this.gatePassDtlForm.controls['modelName'].setValue(modelName);
            this.gatePassDtlForm.controls['manufacturerName'].setValue(manufacturerName);
            this.gatePassDtlForm.controls['assetGroupName'].setValue(assetGroupName);
            this.gatePassDtlForm.controls['description'].setValue(assetDescription);
            this.gatePassDtlForm.controls['transactionName'].setValue(this.gatePassSourceTemp);
            this.gatePassDtlForm.controls['transactionId'].setValue(gatePassSourceId);

            this.assetCodeDisp = this.assetCodeTemp + " - " + modelName + " - " + assetDescription + " - " + equipmentCode + " - " + serialNo;
            this.addAssetOrItemInfo(this.assetCodeTemp,gatePassSourceId);

            this.gatePassForAsset = true;
            this.gatePassForAssetCombo = true;
            this.gatePassForModule = false;
            this.gatePassForSpares = false;
            this.gatePassForAcc = false;
            this.gatePassForCon = false;

            this.gatePassSourceInfo = true;

          }
        } else {
          this.commonService.commonGetService('loadGatePassInfo.sams', primaryId).subscribe(
            data => {

              if (mode === 'view') {
                this.gatePassHdrForm.disable();
                this.gatePassDtlForm.disable();
                this.headingDisplay = "View";
                this.modeDisplay = true;
                this.submitButton = false;
                this.gatePassHdrForm.controls.gatePassSourceNo.disable();
              } else {
                // button and heading names for edit
                this.headingDisplay = "Edit";
                this.displayButton = "Update";
                this.disableClear = true;
                this.submitButton = true;
                this.gatePassHdrForm.controls.gatePassSourceNo.disable();
              }
              this.patchValuefromData(data.responseData);
              this.getWorkflowApprovalForGatePass()
            }
          );
        }
      }
    );
  }
  patchValuefromData(data) {
    this.gatePassHdrForm.patchValue(data);
    this.translateService.get([data.gatePassStatus])
    .subscribe((val) => {
      const status = Object.values(val)
      if(status.length > 0){
        this.gatePassHdrForm.controls.gatePassStatus.setValue(status[0]);
      }
    });

    this.gatePassHdrForm.controls.gatePassPurpose.disable();
    this.gatePassHdrForm.controls.locationName.disable();
    this.gatePassHdrForm.controls.deliveryTo.disable();
    this.gatePassHdrForm.controls.deliveryToName.disable();
    this.gatePassHdrForm.controls.siteServiceLocationName.disable();

    const modelName = data.modelName;
    const assetDescription = data.assetDescription;
    const equipmentCode = data.equipmentCode;
    const serialNo = data.serialNo;

    this.assetCodeTemp = data.assetCode;

    this.assetCodeDisp = this.assetCodeTemp + " - " + modelName + " - " + assetDescription + " - " + equipmentCode + " - " + serialNo;
    this.modelId = data.modelId;
    this.assetHdrIdTemp = data.assetId;

    if (this.gatePassHdrForm.controls.deliveryTo.value === "SUPPLIER") {
      this.enableSupplierCombo = true;
      this.enableManufacturerCombo = false;
      this.enableBranchCombo = false;
      this.enableEmployee=false;
      this.enableCustomer= false;
    } else if (this.gatePassHdrForm.controls.deliveryTo.value === "MANUFACTURER") {
      this.enableSupplierCombo = false;
      this.enableManufacturerCombo = true;
      this.enableBranchCombo = false;
      this.enableEmployee=false;
      this.enableCustomer= false;
    } else if (this.gatePassHdrForm.controls.deliveryTo.value === "BRANCH") {
      this.enableSupplierCombo = false;
      this.enableManufacturerCombo = false;
      this.enableBranchCombo = true;
      this.enableEmployee=false;
      this.enableCustomer= false;
    } else if(this.gatePassHdrForm.controls.deliveryTo.value === 'EMPLOYEE'){
      this.enableSupplierCombo = false;
      this.enableManufacturerCombo = false;
      this.enableBranchCombo = false;
      this.enableEmployee= true;
      this.enableCustomer= false;
    }else if(this.gatePassHdrForm.controls.deliveryTo.value === 'CUSTOMER' ){
      this.enableSupplierCombo = false;
      this.enableManufacturerCombo = false;
      this.enableBranchCombo = false;
      this.enableEmployee=false;
      this.enableCustomer=true;
    } else if (this.gatePassHdrForm.controls.deliveryTo.value === "OTHERS") {
      this.enableSupplierCombo = false;
      this.enableManufacturerCombo = false;
      this.enableBranchCombo = false;
      this.enableEmployee = false;
      this.enableCustomer = false;
    }

    this.gatePassDtlForm.controls.gatePassFor.setValue(data.gatePassFor);
    this.gatePassDtlForm.controls.gatePassFor.disable();

    if (data.gatePassFor === 'Asset') {
      this.gatePassForAsset = true;
      this.gatePassForAssetCombo = true;
      this.gatePassForModule = false;
      this.gatePassForSpares = false;
      this.gatePassForAcc = false;
      this.gatePassForCon = false;
    } else if (data.gatePassFor === 'Module') {
      this.gatePassForAsset = false;
      this.gatePassForAssetCombo = false;
      this.gatePassForModule = true;
      this.gatePassForSpares = false;
      this.gatePassForAcc = false;
      this.gatePassForCon = false;
    } else if (data.gatePassFor === this.Spare_Parts) {
      this.gatePassForAsset = false;
      this.gatePassForAssetCombo = false;
      this.gatePassForModule = false;
      this.gatePassForSpares = true;
      this.gatePassForAcc = false;
      this.gatePassForCon = false;
    } else if (data.gatePassFor === 'Accessories') {
      this.gatePassForAsset = false;
      this.gatePassForAssetCombo = false;
      this.gatePassForModule = false;
      this.gatePassForSpares = false;
      this.gatePassForAcc = true;
      this.gatePassForCon = false;
    } else if (data.gatePassFor === 'Consumables') {
      this.gatePassForAsset = false;
      this.gatePassForAssetCombo = false;
      this.gatePassForModule = false;
      this.gatePassForSpares = false;
      this.gatePassForAcc = false;
      this.gatePassForCon = true;
    }
    this.gatePassDtlFormList.data = data.gatePassDtl;
    this.formValidation();
  }

  exit() {
    this.locationRef.back();
  }

  clearGatePass() {
    this.gatePassHdrForm.reset();
    this.gatePassDtlForm.reset();
    this.assetCodeDisp = '';
    this.gatePassDtlFormList.data = [];
    this.gatePassHdrForm.updateValueAndValidity();
    this.gatePassDtlForm.updateValueAndValidity();
    this.gatePassHdrForm.controls.createdBy.setValue(this.userSessionService.getUserName());
    this.formOneValid = false;
    this.gatePassForAssetCombo = false;
    this.gatePassHdrForm.controls.gatePassPurpose.enable();
    this.gatePassHdrForm.controls.locationName.enable();
    this.gatePassHdrForm.controls.deliveryTo.enable();
    this.validateAndEnableDtlForm();
  }

  changeDeliveryTo(event) {
    this.gatePassHdrForm.controls.deliveryToId.setValue(0);
    this.gatePassHdrForm.controls.deliveryToName.setValue(null);

    this.gatePassHdrForm.controls.siteServiceLocationId.setValue(0);
    this.gatePassHdrForm.controls.siteServiceLocationName.setValue(null);

    this.manufacturerListPageNumber = 1;
    this.manufacturerList = [];

    this.locationNamePageNumber = 1;
    this.locationCombo = [];

    this.supplierListPageNumber = 1;
    this.supplierList = [];

    this.supplierLocationListPageNumber = 1;
    this.supplierLocationCombo = [];

    this.manuServiceLocationPageNumber = 1;
    this.manuServiceLocationList = [];

    this.clearDeliveryAddress();

    this.gatePassHdrForm.controls.deliveryToId.setValue(0);
    this.gatePassHdrForm.controls.deliveryToName.setValue(null);
    this.gatePassHdrForm.controls.siteServiceLocationId.setValue(0);
    this.gatePassHdrForm.controls.siteServiceLocationName.setValue(null);


    this.assetCodeCombo = [];
    this.assetCodePageNumber = 1;

    this.validateAndEnableDtlForm();
    if(this.gatePassSourceTemp != 'WORKORDER') {
      this.clearGatePassForOldData();
    }
    this.formValidation();
    if(event !== undefined){
      this.gatePassHdrForm.controls.deliveryTo.setValue(event.name);
      if (event.name === "SUPPLIER") {
        this.enableSupplierCombo = true;
        this.enableManufacturerCombo = false;
        this.enableBranchCombo = false;
        this.enableEmployee = false;
        this.enableCustomer = false;
        this.gatePassHdrForm.controls.deliveryToName.setValidators(Validators.required);
        this.gatePassHdrForm.controls.siteServiceLocationName.setValidators(Validators.required);
        this.gatePassHdrForm.controls.siteServiceLocationName.enable();
        this.gatePassHdrForm.controls.deliveryToName.enable();
        this.gatePassHdrForm.updateValueAndValidity();
        this.asset.manufacturerId = 0;
        this.asset.manufacturerName = '';
      } else if (event.name === "MANUFACTURER") {
        this.enableSupplierCombo = false;
        this.enableManufacturerCombo = true;
        this.enableBranchCombo = false;
        this.enableEmployee = false;
        this.enableCustomer = false;
        this.gatePassHdrForm.controls.deliveryToName.setValidators(Validators.required);
        this.gatePassHdrForm.controls.siteServiceLocationName.setValidators(Validators.required);
        this.gatePassHdrForm.controls.deliveryToName.enable();
        this.gatePassHdrForm.controls.siteServiceLocationName.enable();
        this.gatePassHdrForm.updateValueAndValidity();
        this.asset.businessPartnerId = 0;
        this.asset.businessPartnerName = '';
      } else if (event.name === "BRANCH") {
        this.enableSupplierCombo = false;
        this.enableManufacturerCombo = false;
        this.enableBranchCombo = true;
        this.enableEmployee = false;
        this.enableCustomer = false;
        this.gatePassHdrForm.controls.siteServiceLocationName.disable();
        this.asset.businessPartnerId = 0;
        this.asset.businessPartnerName = '';
        this.asset.manufacturerId = 0;
        this.asset.manufacturerName = '';
        this.gatePassHdrForm.controls.deliveryToName.enable();
      } else if (event.name === "OTHERS") {
        this.gatePassHdrForm.controls.siteServiceLocationName.disable();
        this.gatePassHdrForm.controls.deliveryToName.disable();
        this.enableSupplierCombo = false;
        this.enableManufacturerCombo = false;
        this.enableBranchCombo = false;
        this.enableEmployee = false;
        this.enableCustomer = false;
        this.asset.businessPartnerId = 0;
        this.asset.businessPartnerName = '';
        this.asset.manufacturerId = 0;
        this.asset.manufacturerName = '';
        this.gatePassDtlForm.controls.gatePassFor.enable();
        this.gatePassDtlForm.controls.gatePassFor.setValue('');
      } else if(event.name === 'EMPLOYEE'){
        this.gatePassHdrForm.controls.siteServiceLocationName.disable();
        this.gatePassHdrForm.controls.deliveryToName.enable();
        this.enableSupplierCombo = false;
        this.enableManufacturerCombo = false;
        this.enableBranchCombo = false;
        this.asset.businessPartnerId = 0;
        this.asset.businessPartnerName = '';
        this.asset.manufacturerId = 0;
        this.asset.manufacturerName = '';
        this.gatePassDtlForm.controls.gatePassFor.enable();
        this.gatePassDtlForm.controls.gatePassFor.setValue('');
        this.enableEmployee=true;
        this.enableCustomer= false;
      } else if(event.name === 'CUSTOMER'){
        this.gatePassHdrForm.controls.siteServiceLocationName.enable();
        this.gatePassHdrForm.controls.deliveryToName.enable();
        this.enableSupplierCombo = false;
        this.enableManufacturerCombo = false;
        this.enableBranchCombo = false;
        this.asset.businessPartnerId = 0;
        this.asset.businessPartnerName = '';
        this.asset.manufacturerId = 0;
        this.asset.manufacturerName = '';
        this.gatePassDtlForm.controls.gatePassFor.enable();
        this.gatePassDtlForm.controls.gatePassFor.setValue('');
        this.enableEmployee=false;
        this.enableCustomer= true;
      }
    }else {
      this.enableSupplierCombo = false;
      this.enableManufacturerCombo = false;
      this.enableBranchCombo = false;
      this.enableEmployee = false;
      this.enableCustomer = false;
      this.asset.businessPartnerId = 0;
      this.asset.businessPartnerName = '';
      this.asset.manufacturerId = 0;
      this.asset.manufacturerName = '';
      this.gatePassDtlForm.controls.gatePassFor.enable();
      this.gatePassDtlForm.controls.gatePassFor.setValue('');
      this.gatePassHdrForm.controls.deliveryToName.setValidators([]);
      this.gatePassHdrForm.controls.siteServiceLocationName.setValidators([]);
    }
  }

  listOfSupplier1(data){
    if (this.supplierListPageNumber === 1) {
      this.supplierList = data.responseData.comboList;
    } else {
      this.supplierList = this.supplierList.concat(data.responseData.comboList);
    }
  }

  listOfSupplier(searchValue) {
    this.scrollSuppliersync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.SUPPLIER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchValue.term, '', '',
      this.limitCount, this.supplierListPageNumber, '', partnerRoles).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.supplierListPageNumber , this.supplierList , data.responseData.comboList)
          this.supplierListPageNumber = this.getData.pageNumber;
          this.supplierList = this.getData.dataList;
          this.scrollSuppliersync = false;
        }
      );
  }

  listOfManufacturer(searchValue) {
    this.scrollManufacturersync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.MANUFACTURER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchValue.term, '', '',
      this.limitCount, this.manufacturerListPageNumber,'',partnerRoles).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.manufacturerListPageNumber , this.manufacturerList , data.responseData.comboList)
          this.manufacturerListPageNumber = this.getData.pageNumber;
          this.manufacturerList = this.getData.dataList;
          this.scrollManufacturersync = false;
        }
      );
  }

  setSupplierData(event) {
    if (event === undefined) {
      this.gatePassHdrForm.controls.deliveryToId.setValue(0);
      this.gatePassHdrForm.controls.deliveryToName.setValue(null);
      this.supplierListPageNumber = 1;
      this.supplierList = [];
      this.asset.businessPartnerId = 0;
      this.asset.businessPartnerName = '';
    } else {
      this.gatePassHdrForm.controls.deliveryToId.setValue(event.businessPartnerId);
      this.gatePassHdrForm.controls.deliveryToName.setValue(event.businessPartnerName);
      this.asset.businessPartnerId = event.businessPartnerId;
      this.asset.businessPartnerName = event.businessPartnerName;
    }
    this.assetCodeCombo = [];
    this.assetCodePageNumber = 1;
    this.gatePassHdrForm.controls.siteServiceLocationId.setValue(0);
    this.gatePassHdrForm.controls.siteServiceLocationName.setValue(null);
    this.clearDeliveryAddress();
    this.gatePassDtlForm.controls.gatePassFor.setValue('');
    this.gatePassForAssetCombo = false;
    this.validateAndEnableDtlForm();
    if(this.gatePassSourceTemp != 'WORKORDER') {
      this.clearGatePassForOldData();
    }
    this.formValidation();
    this.setSupplierSiteData(undefined);
  }

  setSupplierSiteData(event) {
    if (event === undefined) {
      this.gatePassHdrForm.controls.siteServiceLocationId.setValue(0);
      this.gatePassHdrForm.controls.siteServiceLocationName.setValue(null);
      this.gatePassHdrForm.controls.deliveryToAddress1.setValue('');
      this.gatePassHdrForm.controls.deliveryToAddress2.setValue('');
      this.gatePassHdrForm.controls.deliveryToCity.setValue('');
      this.gatePassHdrForm.controls.deliveryToState.setValue('');
      this.gatePassHdrForm.controls.deliveryToCountry.setValue('');
      this.gatePassHdrForm.controls.deliveryToZipcode.setValue('');
      this.supplierLocationListPageNumber = 1;
      this.supplierLocationCombo = [];
    } else {
      this.gatePassHdrForm.controls.deliveryToId.setValue(event.businessPartnerId);
      this.gatePassHdrForm.controls.deliveryToName.setValue(event.businessPartnerName);
      this.gatePassHdrForm.controls.siteServiceLocationId.setValue(event.partnerSiteId);
      this.gatePassHdrForm.controls.siteServiceLocationName.setValue(event.partnerSiteName);
      this.gatePassHdrForm.controls.deliveryToAddress1.setValue(event.partnerSiteAddress1);
      this.gatePassHdrForm.controls.deliveryToAddress2.setValue(event.partnerSiteAddress2);
      this.gatePassHdrForm.controls.deliveryToCity.setValue(event.partnerSiteCity);
      this.gatePassHdrForm.controls.deliveryToState.setValue(event.partnerSiteState);
      this.gatePassHdrForm.controls.deliveryToCountry.setValue(event.partnerSiteCountry);
      this.gatePassHdrForm.controls.deliveryToZipcode.setValue(event.partnerSitePinCode);

      let fullAddress1 = event.partnerSiteAddress1 + ' , ' + event.partnerSiteCity + ' , ' +  event.partnerSiteState + 
                         ' , ' + event.partnerSiteCountry + ' , ' + event.partnerSitePinCode;
      this.gatePassHdrForm.controls.deliveryToAddress1.setValue(fullAddress1);
    }
    this.validateAndEnableDtlForm();
  }

  setManufacturerData(event) {
    if (event === undefined) {
      this.gatePassHdrForm.controls.deliveryToId.setValue(0);
      this.gatePassHdrForm.controls.deliveryToName.setValue(null);
      this.manufacturerListPageNumber = 1;
      this.manufacturerList = [];
      this.assetCodeCombo = [];
      this.asset.manufacturerId = 0;
      this.asset.manufacturerName = '';
    } else {
      this.gatePassHdrForm.controls.deliveryToId.setValue(event.businessPartnerId);
      this.gatePassHdrForm.controls.deliveryToName.setValue(event.businessPartnerName);
      this.assetCodeCombo = [];
      this.asset.manufacturerId = event.businessPartnerId;
      this.asset.manufacturerName = event.businessPartnerName;
    }
    this.gatePassHdrForm.controls.siteServiceLocationId.setValue(0);
    this.gatePassHdrForm.controls.siteServiceLocationName.setValue(null);
    this.clearDeliveryAddress();
    if(this.gatePassSourceTemp != 'WORKORDER') {
      this.clearGatePassForOldData();
    }
    this.assetCodeCombo = [];
    this.assetCodePageNumber = 1;
    this.gatePassDtlForm.controls.gatePassFor.setValue('');
    this.gatePassForAssetCombo = false;
    this.validateAndEnableDtlForm();
    this.formValidation();
    this.setManuServiceCenterData(undefined);
  }

  setManuServiceCenterData(event) {
    if (event === undefined) {
      this.gatePassHdrForm.controls.siteServiceLocationId.setValue(0);
      this.gatePassHdrForm.controls.siteServiceLocationName.setValue(null);
      this.gatePassHdrForm.controls.deliveryToAddress1.setValue('');
      this.gatePassHdrForm.controls.deliveryToAddress2.setValue('');
      this.gatePassHdrForm.controls.deliveryToCity.setValue('');
      this.gatePassHdrForm.controls.deliveryToState.setValue('');
      this.gatePassHdrForm.controls.deliveryToCountry.setValue('');
      this.gatePassHdrForm.controls.deliveryToZipcode.setValue('');
      this.manuServiceLocationPageNumber = 1;
      this.manuServiceLocationList = [];
    } else {
      this.gatePassHdrForm.controls.deliveryToId.setValue(event.businessPartnerId);
      this.gatePassHdrForm.controls.deliveryToName.setValue(event.businessPartnerName);
      this.gatePassHdrForm.controls.siteServiceLocationId.setValue(event.partnerSiteId);
      this.gatePassHdrForm.controls.siteServiceLocationName.setValue(event.partnerSiteName);
      this.gatePassHdrForm.controls.deliveryToAddress1.setValue(event.partnerSiteAddress1);
      this.gatePassHdrForm.controls.deliveryToAddress2.setValue(event.partnerSiteAddress2);
      this.gatePassHdrForm.controls.deliveryToCity.setValue(event.partnerSiteCity);
      this.gatePassHdrForm.controls.deliveryToState.setValue(event.partnerSiteState);
      this.gatePassHdrForm.controls.deliveryToCountry.setValue(event.partnerSiteCountry);
      this.gatePassHdrForm.controls.deliveryToZipcode.setValue(event.partnerSitePinCode);
    }
    this.validateAndEnableDtlForm();
  }

  setFromLocationNameComboValue(event) {
    if (event === undefined) {
      this.gatePassHdrForm.controls.locationId.setValue(0);
      this.gatePassHdrForm.controls.locationName.setValue(null);
      this.locationNamePageNumber = 1;
      this.locationCombo = [];
    } else {
      this.gatePassHdrForm.controls.locationId.setValue(event.locationId);
      this.gatePassHdrForm.controls.locationName.setValue(event.locationName);
    }
    this.validateAndEnableDtlForm();
  }

  clearDeliveryAddress() {
    this.gatePassHdrForm.controls.deliveryToAddress1.setValue('');
    this.gatePassHdrForm.controls.deliveryToAddress2.setValue('');
    this.gatePassHdrForm.controls.deliveryToCity.setValue('');
    this.gatePassHdrForm.controls.deliveryToState.setValue('');
    this.gatePassHdrForm.controls.deliveryToCountry.setValue('');
    this.gatePassHdrForm.controls.deliveryToZipcode.setValue('');
    this.gatePassHdrForm.controls.deliveryTakenByPerson.setValue('');
    this.gatePassHdrForm.controls.deliveryTakenByContactNo.setValue('');
    this.gatePassHdrForm.controls.deliveryTakenByEmailId.setValue('');
  }

  setToLocationNameComboValue(event) {
    if (event === undefined) {
      this.gatePassHdrForm.controls.deliveryToId.setValue(0);
      this.gatePassHdrForm.controls.deliveryToName.setValue(null);
      this.gatePassHdrForm.controls.deliveryToAddress1.setValue('');
      this.gatePassHdrForm.controls.deliveryToAddress2.setValue('');
      this.gatePassHdrForm.controls.deliveryToCity.setValue('');
      this.gatePassHdrForm.controls.deliveryToState.setValue('');
      this.gatePassHdrForm.controls.deliveryToCountry.setValue('');
      this.gatePassHdrForm.controls.deliveryToZipcode.setValue('');

      this.locationNamePageNumber = 1;
      this.locationCombo = [];
    } else if(this.gatePassHdrForm.controls.locationId.value !== event.locationId){
      this.gatePassHdrForm.controls.deliveryToId.setValue(event.locationId);
      this.gatePassHdrForm.controls.deliveryToName.setValue(event.locationName);
      this.gatePassHdrForm.controls.deliveryToAddress1.setValue(event.locAddress1);
      this.gatePassHdrForm.controls.deliveryToAddress2.setValue(event.locAddress2);
      this.gatePassHdrForm.controls.deliveryToCity.setValue(event.locCity);
      this.gatePassHdrForm.controls.deliveryToState.setValue(event.locState);
      this.gatePassHdrForm.controls.deliveryToCountry.setValue(event.locCountry);
      this.gatePassHdrForm.controls.deliveryToZipcode.setValue(event.locPinCode);
    }else {
      this.commonService.openToastWarningMessage("From Branch And To Branch Cannot Be Same");
      this.gatePassHdrForm.controls.deliveryToId.setValue(0);
      this.gatePassHdrForm.controls.deliveryToName.setValue(null);
    }
    this.assetCodeCombo = [];
    this.assetCodePageNumber = 1;
    this.gatePassDtlForm.controls.gatePassFor.setValue('');
    this.gatePassForAssetCombo = false;
    this.validateAndEnableDtlForm();
    if(this.gatePassSourceTemp != 'WORKORDER') {
      this.clearGatePassForOldData();
    }
  }

  setGatePassForData(event) {
    this.clearGatePassForOldData();
    this.formValidation();
    if (event) {
      this.gatePassDtlForm.controls.gatePassFor.setValue(event.name);
      if (event.name === 'Asset') {
        this.gatePassForAsset = true;
        this.gatePassForAssetCombo = true;
        this.gatePassForModule = false;
        this.gatePassForSpares = false;
        this.gatePassForAcc = false;
        this.gatePassForCon = false;
      } else if (event.name === 'Module') {
        this.gatePassForAsset = false;
        this.gatePassForAssetCombo = false;
        this.gatePassForModule = true;
        this.gatePassForSpares = false;
        this.gatePassForAcc = false;
        this.gatePassForCon = false;
      } else if (event.name === this.Spare_Parts) {
        this.gatePassForAsset = false;
        this.gatePassForAssetCombo = false;
        this.gatePassForModule = false;
        this.gatePassForSpares = true;
        this.gatePassForAcc = false;
        this.gatePassForCon = false;
      } else if (event.name === 'Accessories') {
        this.gatePassForAsset = false;
        this.gatePassForAssetCombo = false;
        this.gatePassForModule = false;
        this.gatePassForSpares = false;
        this.gatePassForAcc = true;
        this.gatePassForCon = false;
      } else if (event.name === 'Consumables') {
        this.gatePassForAsset = false;
        this.gatePassForAssetCombo = false;
        this.gatePassForModule = false;
        this.gatePassForSpares = false;
        this.gatePassForAcc = false;
        this.gatePassForCon = true;
      }
      this.itemNamePageNumber = 1;
      this.itemList = [];
    }
    else{
      this.gatePassForAsset = false;
      this.gatePassForAssetCombo = false;
      this.gatePassForModule = false;
      this.gatePassForSpares = false;
      this.gatePassForAcc = false;
      this.gatePassForCon = false;
      this.gatePassDtlFormList.data = [];
    }
  }

  clearGatePassForOldData() {
    this.gatePassDtlFormList.data = [];
    this.assetCodeDisp = '';
    this.gatePassForAssetCombo = false;
    this.gatePassDtlForm.controls['assetCode'].setValue(null);
    this.gatePassDtlForm.controls['assetId'].setValue(0);
    this.gatePassDtlForm.controls['transactionId'].setValue(0);
    this.gatePassDtlForm.controls['transactionName'].setValue('');
    this.gatePassDtlForm.controls['modelName'].setValue('');
    this.gatePassDtlForm.controls['manufacturerName'].setValue('');
    this.gatePassDtlForm.controls['assetGroupName'].setValue('');
  }

  listOfGatePassPurpose(searchValue) {
    this.scrollGatePassPurposesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfGatePassPurposeCombo, searchValue.term, '', '',
      this.limitCount, this.gatePassPurposePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.gatePassPurposePageNumber , this.gatePassPurposeList , data.responseData.comboList)
          this.gatePassPurposePageNumber = this.getData.pageNumber;
          this.gatePassPurposeList = this.getData.dataList;
          this.scrollGatePassPurposesync = false;
        }
      );
  }

  listOfManuServiceLocation(searchValue) {
    this.scrollManuServiceLocationSync = true;
    const deliveryToId = this.gatePassHdrForm.controls.deliveryToId.value;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerSiteCombo, searchValue.term,deliveryToId, '',
      this.limitCount, this.manuServiceLocationPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.manuServiceLocationPageNumber , this.manuServiceLocationList , data.responseData.comboList)
          this.manuServiceLocationPageNumber = this.getData.pageNumber;
          this.manuServiceLocationList = this.getData.dataList;
          this.scrollManuServiceLocationSync = false;
        }
      );
  }

  listOfSupplierLocation1(data){
    if (this.supplierLocationListPageNumber === 1) {
      this.supplierLocationCombo = data.responseData.comboList;
    } else {
      this.supplierLocationCombo = this.supplierLocationCombo.concat(data.responseData.comboList);
    }
  }

  listOfSupplierLocation(searchValue) {
    this.scrollSupplierLocationSync = true;
    const deliveryToId = this.gatePassHdrForm.controls.deliveryToId.value
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllPartnerSiteCombo.sams', searchValue.term, deliveryToId, '', this.limitCount, this.supplierLocationListPageNumber,'').subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.supplierLocationListPageNumber , this.supplierLocationCombo , data.responseData.comboList)
        this.supplierLocationListPageNumber = this.getData.pageNumber;
        this.supplierLocationCombo = this.getData.dataList;
        this.scrollSupplierLocationSync = false;
      }
    );
  }

  listOfLocationName1(data){
    if (this.locationNamePageNumber === 1) {
      this.locationCombo = data.responseData.comboList;
    } else {
      this.locationCombo = this.locationCombo.concat(data.responseData.comboList);
    }
  }

  listOfLocationName(searchValue,event) {
    if (event) {
      this.scrollLocationNameSync = true;
    }else if(!event){
      this.scrollLocationNameSync1 = true;
    }
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllUserLocForCombo, searchValue.term, '', '', this.limitCount, this.locationNamePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.locationNamePageNumber , this.locationCombo , data.responseData.comboList)
        this.locationNamePageNumber = this.getData.pageNumber;
        this.locationCombo = this.getData.dataList;
        this.scrollLocationNameSync = false;
        this.scrollLocationNameSync1 = false;
      }
    );
  }

  setDeliveryMode(event) {
    if(event === undefined) {
      this.gatePassHdrForm.controls.deliveryMode.setValue(null);
    } else {
      this.gatePassHdrForm.controls.deliveryMode.setValue(event.name);
    }
    // this.validateAndEnableDtlForm();
  }

  listOfModelModuleName1(data){
    if (this.modelModulePageNumber === 1) {
      this.modelModuleCombo = data.responseData.comboList;
    } else {
      this.modelModuleCombo = this.modelModuleCombo.concat(data.responseData.comboList);
    }
  }

  listOfModelModuleName(searchValue) {
    this.scrollModelModuleSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfModelModuleCombo, searchValue.term, this.modelId, '', this.limitCount, this.modelModulePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.modelModulePageNumber , this.modelModuleCombo , data.responseData.comboList)
        this.modelModulePageNumber = this.getData.pageNumber;
        this.modelModuleCombo = this.getData.dataList;
        this.scrollModelModuleSync = false;
      }
    );
  }

  listOfItem(searchValue) {
    this.scrollItemNameSync = true;
    const itemTypeName = this.gatePassDtlForm.controls.gatePassFor.value;
    if (itemTypeName === this.Spare_Parts || itemTypeName === 'Accessories' || itemTypeName === 'Consumables') {
      let itemTypeNameTemp = '';
      if (itemTypeName === this.Spare_Parts) {
        itemTypeNameTemp = "Spare Parts";
      } else if (itemTypeName === 'Accessories') {
        itemTypeNameTemp = "ACCESSORIES";
      } else if (itemTypeName === 'Consumables') {
        itemTypeNameTemp = "CONSUMABLES";
      }

      const listOfModelItemsCombo = this.assetOptimaServices.listOfModelItemsCombo
      this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
      this.commonService.getComboResults(listOfModelItemsCombo, searchValue.term, this.modelId, '', this.limitCount, this.itemNamePageNumber, itemTypeNameTemp).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.itemNamePageNumber , this.itemList , data.responseData.comboList)
          this.itemNamePageNumber = this.getData.pageNumber;
          this.itemList = this.getData.dataList;
          this.scrollItemNameSync = false;
        }
      );
    }
  }

  selectedModuleData(event) {
    this.commonService.getComboResults(this.assetOptimaServices.listOfModuleItems, event.itemModuleName, this.modelId, '', this.limitCount, this.modelModulePageNumber).subscribe(
      (data) => {
        data.responseData.map(entry => {
          const Group = this.formBuilder.group({
            gatePassDtlId: new FormControl(0),
            gatePassHdrId: new FormControl(0),
            assetId: new FormControl(this.assetHdrIdTemp),
            transactionId: new FormControl(entry.modelItemId),
            transactionName: new FormControl(entry.itemName),
            itemName: new FormControl(entry.itemName),
            itemDesc: new FormControl(entry.itemDesc),
            assetCode: new FormControl(this.assetCodeTemp),
            modelName: new FormControl(''),
            manufacturerName: new FormControl(''),
            assetGroupName: new FormControl(''),
            returnType: new FormControl(null),
            assetRemarks: new FormControl(''),
            quantity: new FormControl(1,[Validators.min(1)])
          });
          this.gatePassDtlForm.patchValue(Group.value);
          this.gatePassDtlFormList.data.push(this.gatePassDtlForm.value);
          this.changeDetectorRefs.detectChanges();
          this.matGatePassDtlModel.renderRows();
        });
      }
    )
  }

  dialogRef;
  updateReturnInfo(gatePassDtlInfo, index, mode) {
    console.log(gatePassDtlInfo);

    const dialogRef = this.dialog.open(GatePassReturnInfoComponent, {
      height: 'auto',
      width: '450px',
      data: {
        'gatePassDtlInfo': gatePassDtlInfo,
        'mode': mode,
        'source': this.gatePassHdrForm.controls.gatePassSource.value
      }
    });
    this.dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        this.commonService.commonGetService('fetchGatePassDtl.sams', this.gatePassHdrForm.controls.gatePassHdrId.value).subscribe(
          data => {
            this.gatePassDtlFormList.data = data.responseData;
          })
      });

  }

  getWorkflowApprovalForGatePass() {
    this.commonService.commonGetService('getWorkflowForId.sams', this.gatePassHdrForm.controls.gatePassHdrId.value,
      this.userSessionService.getUserEmpId(),
      'GATE_PASS', this.userSessionService.getUserOrgId()).subscribe(
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

  closeGatePass() {
    this.router.navigate(['home/asset/gatePassList']);
  }

  formValidation() {
    if (this.gatePassDtlFormList.data.length > 0) {
      this.formOneValid = true;
    } else {
      this.formOneValid = false;
    }
    return this.formOneValid;
  }

  fetchListOfAllAsset(searchValue) {
    this.scrollsyncAssetCode = true;
    this.recordsPerPage = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.asset.recordsPerPage = parseInt(this.recordsPerPage ? this.recordsPerPage:'0');
    this.asset.pageNumber = this.assetCodePageNumber;
    this.asset.direction = 'asc';
    this.asset.columnName = 'assetCode';
    this.asset.locationId = this.gatePassHdrForm.controls.locationId.value;
    this.asset.assetCode = searchValue.term ? searchValue.term : '';
    this.commonService.commonListService('fetchListOfMakeSuppAssets.sams', this.asset).subscribe(
      data => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assetCodePageNumber , this.assetCodeCombo , data.responseData.dataList)
        this.assetCodePageNumber = this.getData.pageNumber;
        this.assetCodeCombo = this.getData.dataList;
        //this.assetCodeCombo = (this.assetCodeCombo).filter(data => {return (data.avilableToProcess === true || data.source === "LOAN/RETURN");});
        this.scrollsyncAssetCode = false;
      }
    );
    this.scrollsyncAssetCode = false;
  }

  validateAndEnableDtlForm() {
    if(this.gatePassHdrForm.controls.deliveryToId.value > 0 ) {
      this.gatePassDtlForm.controls.gatePassFor.enable();
    } else {
      this.gatePassDtlForm.controls.gatePassFor.setValue('');
      this.gatePassDtlForm.controls.gatePassFor.disable();
      this.gatePassDtlForm.controls.assetCode.setValue('');
    }
  }

  gatepassWorkflowApproval(status){

    let result;
    let test = {...this.gatePassHdrForm.value , approvalId: this.approvalId, gatePassDtl: this.gatePassDtlFormList.data}
    let gatepassHdrIdList = [];

    gatepassHdrIdList.push(test);

    if(status){
      result = this.commonService.commonWorkflowService(allWorkflowStatus[allWorkflowStatus.GATE_PASS],gatepassHdrIdList,"");
    }
    else{
      result = this.commonService.rejectApprove(allWorkflowStatus[allWorkflowStatus.GATE_PASS],gatepassHdrIdList,"");
    }

    result.then(data=>{
      if(data){
         this.ngOnInit();
         this.closeGatePass();
      }
    })
  }


  listOfGatePassSourceNo(searchValue) {
    this.scrollGatePassSourceNosync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '50' : '';
    this.commonService.getComboResults(this.assetOptimaServices.fetchListOfAllGatePassSourceNoCombo, searchValue.term, ''
      , this.gatePassHdrForm.controls.locationId.value,this.limitCount, this.gatePassSourceNoPageNumber,this.gatePassHdrForm.controls.gatePassPurpose.value).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.gatePassSourceNoPageNumber , this.gatePassHdrList , data.responseData.comboList)
        this.gatePassSourceNoPageNumber = this.getData.pageNumber;
        this.gatePassHdrList = this.getData.dataList;
        this.scrollGatePassSourceNosync = false;
      }
    );
  }

  setGatePassSourceNoData(event) {
    if(event === undefined){
      this.changeDeliveryTo(undefined);
      this.gatePassHdrForm.controls.gatePassSourceNo.setValue(null);
      this.gatePassHdrForm.controls.gatePassPurpose.enable();
      this.gatePassHdrForm.controls.locationName.enable();
      this.gatePassHdrForm.controls.deliveryTo.enable();
      this.gatePassHdrForm.controls.deliveryToName.enable();
      this.gatePassHdrForm.controls.siteServiceLocationName.enable();
      this.gatePassSourceNoPageNumber = 1;
      this.gatePassHdrList=[];
      this.gatePassDtlFormList.data =[];
      this.gatePassForAssetCombo = false;
      this.ngOnInit();
    }else{
      this.patchValuefromData(event);
      this.gatePassHdrForm.controls['gatePassHdrId'].setValue(0);
      this.gatePassHdrForm.controls['gatePassNo'].setValue('');
      this.gatePassHdrForm.controls['gatePassStatus'].setValue('');
      this.gatePassHdrForm.controls['gatePassStatusId'].setValue(0);
      for (let index = 0; index < this.gatePassDtlFormList.data.length; index++) {
        const element = this.gatePassDtlFormList.data[index];
        element.gatePassHdrId = 0;
        element.gatePassDtlId = 0;
      }
    }
  }

  listOfCustomer(searchValue) {
    this.scrollCustomersync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllCustomerCombo.sams', searchValue.term, '', '',
      this.limitCount, this.customerListPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.customerListPageNumber , this.customerList , data.responseData.comboList)
          this.customerListPageNumber = this.getData.pageNumber;
          this.customerList = this.getData.dataList;
          this.scrollCustomersync = false;
        }
      );
  }

  setCustomerData(event) {
    if (event === undefined) {
      this.gatePassHdrForm.controls.deliveryToId.setValue(0);
      this.gatePassHdrForm.controls.deliveryToName.setValue(null);
      this.customerListPageNumber = 1;
      this.customerList = [];
    } else {
      this.gatePassHdrForm.controls.deliveryToId.setValue(event.businessPartnerId);
      this.gatePassHdrForm.controls.deliveryToName.setValue(event.businessPartnerName);
      this.assetCodeCombo = [];
    }
  this.selectedCustomerLocationData(undefined);
  }

  listOfCustomerLocation(searchValue) {
    this.scrollCustomerLocationSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllCustomerSiteCombo.sams', searchValue.term, this.gatePassHdrForm.controls.deliveryToId.value, '', this.limitCount, this.customerLocationListPageNumber, '').subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.customerLocationListPageNumber , this.customerLocationCombo , data.responseData.comboList)
        this.customerLocationListPageNumber = this.getData.pageNumber;
        this.customerLocationCombo = this.getData.dataList;
        this.scrollCustomerLocationSync = false;
      }
    );
  }

  selectedCustomerLocationData(event) {
    if (event === undefined) {
      this.gatePassHdrForm.controls.siteServiceLocationId.setValue(0);
      this.gatePassHdrForm.controls.siteServiceLocationName.setValue(null);
      this.gatePassHdrForm.controls.deliveryToAddress1.setValue('');
      this.gatePassHdrForm.controls.deliveryToAddress2.setValue('');
      this.gatePassHdrForm.controls.deliveryToCity.setValue('');
      this.gatePassHdrForm.controls.deliveryToState.setValue('');
      this.gatePassHdrForm.controls.deliveryToCountry.setValue('');
      this.gatePassHdrForm.controls.deliveryToZipcode.setValue('');
      this.customerLocationListPageNumber = 1;
      this.customerLocationCombo = [];
      this.assetCodeCombo = [];
    } else {
      this.gatePassHdrForm.controls.deliveryToId.setValue(event.businessPartnerId);
      this.gatePassHdrForm.controls.deliveryToName.setValue(event.businessPartnerName);
      this.gatePassHdrForm.controls.siteServiceLocationId.setValue(event.partnerSiteId);
      this.gatePassHdrForm.controls.siteServiceLocationName.setValue(event.partnerSiteName);
      this.gatePassHdrForm.controls.deliveryToAddress1.setValue(event.partnerSiteAddress1);
      this.gatePassHdrForm.controls.deliveryToAddress2.setValue(event.partnerSiteAddress2);
      this.gatePassHdrForm.controls.deliveryToCity.setValue(event.partnerSiteCity);
      this.gatePassHdrForm.controls.deliveryToState.setValue(event.partnerSiteState);
      this.gatePassHdrForm.controls.deliveryToCountry.setValue(event.partnerSiteCountry);
      this.gatePassHdrForm.controls.deliveryToZipcode.setValue(event.partnerSitePinCode);
    }
  }

  listOfEmployeeName(searchKey) {
      this.scrollsyncEmployee = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults('listAllEmployeeForOrgCombo.sams', searchKey.term, '', '',
      this.limitCount, this.employeePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchKey, this.employeePageNumber , this.employeeCombo , data.responseData.comboList)
          this.employeePageNumber = this.getData.pageNumber;
          this.employeeCombo = this.getData.dataList;
          this.scrollsyncEmployee = false;
        });
  }

  selectedEmployee(event) {
    if (event === undefined) {
      this.gatePassHdrForm.controls.deliveryToId.setValue(0);
      this.gatePassHdrForm.controls.deliveryToName.setValue(null);
      this.employeePageNumber=1;
      this.employeeCombo=[];
    } else {
      this.gatePassHdrForm.controls.deliveryToId.setValue(event.employeeId);
      this.gatePassHdrForm.controls.deliveryToName.setValue(event.displayName);
    }
  }


  changeGatePassPurpose(event){
    if (event === undefined) {
      this.gatePassHdrForm.controls.gatePassPurpose.setValue(null);
    } else {
      this.gatePassHdrForm.controls.gatePassPurpose.setValue(event.purposeName);
    }
    this.gatePassSourceNoPageNumber = 1;
    this.gatePassHdrList=[];
  }

  updateGatePassSourceInfo() {
    this.dialogRef = this.dialog.open(GatePassSourceInfoComponent, {
      height: 'auto',
      width: '600px',
      data: {
        'gatePassHdrInfo': this.gatePassHdrForm.getRawValue()
      }
    });
    this.dialogRef.disableClose = false;
    this.dialogRef.afterClosed().subscribe(
      data => {

      });
  }

  addGPCollectedInfo() {
    this.dialogRef = this.dialog.open(GatePassCollectedInfoComponent, {
      height: 'auto',
      width: '500px',
      data: {
        'gatePassHdrInfo': this.gatePassHdrForm.getRawValue()
      }
    });
    this.dialogRef.disableClose = false;
    this.dialogRef.afterClosed().subscribe(
      data => {
        console.log("response data", data.responseData);

        if (data.exit) {
          this.gatePassHdrForm.controls.deliveryTakenByPerson.setValue(data.form.deliveryTakenByPerson);
          this.gatePassHdrForm.controls.deliveryTakenByContactNo.setValue(data.form.deliveryTakenByContactNo);
          this.gatePassHdrForm.controls.deliveryTakenByEmailId.setValue(data.form.deliveryTakenByEmailId);
        }
      });
  }
}
