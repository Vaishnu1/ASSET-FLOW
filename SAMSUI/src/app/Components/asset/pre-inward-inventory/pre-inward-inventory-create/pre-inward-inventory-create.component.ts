import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PreInwardInventoryAddModelDialogComponent } from '../pre-inward-inventory-add-model-dialog/pre-inward-inventory-add-model-dialog.component';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { allWorkflowStatus } from 'src/app/Constants/AllStatusConstants';
import { TranslateService } from '@ngx-translate/core';
import { getData } from 'src/app/Model/common/fetchListData';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { allBusinessPartnerRoles } from 'src/app/Constants/AllStatusConstants';
import { CommonHint } from 'src/app/Constants/CommonHint';

@Component({
  selector: 'app-pre-inward-inventory-create',
  templateUrl: './pre-inward-inventory-create.component.html',
  styleUrls: ['./pre-inward-inventory-create.component.css']
})
export class PreInwardInventoryCreateComponent implements OnInit {

  displayedColumns = ['sno', 'modelName', 'businessPartnerName', 'assetCategory', 'description', 'qty', 'unitPrice', 'taxAmount', 'totalAmount', 'edit'];
  inwardInventoryDtlList = new MatTableDataSource<any>();
  newlyAddedInwardListItem: any[] = [];

  statutoryRequirementList = new MatTableDataSource<any>();

  piInventoryForm: FormGroup;
  sourceScreenOfSupplier = '';

  locationId = new FormControl('');
  locationName = new FormControl(null);
  orgId: FormControl = new FormControl(0);

  //For Pagination
  length: Number = 0;     //set total record count here
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  scrollApprovedSuppliersync: boolean = false;
  scrollSupplierNamesync: boolean = false;
  subloaderModel: boolean = false;
  scrollsync: boolean = false;
  uploadFlag: boolean = false;
  buttonDisableInEdit: boolean = false;
  modeDisplay: boolean = false;

  recordsPerPageForCombo: string;
  mode: String;
  buttonSubmit: String;
  headingDisplay: String;
  tempValue: String = '';
  ErrorMsg : String;
  tempValuePoNumber: String = '';
  approve: string;
  approvedSupplierPageNumber: number = 0;
  supplierPageNumber: number;
  locationPageNumber: number;

  limitCount: any;
  supplierLocationList: any;
  supplierList: any = [];
  locationCombo: any = [];

  scrollServiceProviderNamesync: boolean = false;
  ServiceProviderPageNumber: number;
  ServiceProviderList: any = [];

  scrollApprovedServiceProvidersync: boolean = false;
  approvedServiceProviderPageNumber: number;
  ServiceProviderLocationList: any = [];

  docFilePath: String = '';
  docUploadRequired: boolean = true;
  showPoDocView: boolean = false;
  disableSubmitBtn: boolean = true;
  poDocFileType: string = '';
  fileUploadFlag: boolean;
  public fileToUpload: File;
  //auto foucs
  @ViewChild('locationNameFocus') locationNameFocusSet: NgSelectComponent;

  //APPROVALS
  public preInwardId: any;
  public transactionSource: any;

  employeeId: string = '0';
  approvalId: string = '0';
  approvebuttonEnable: boolean = false;
  scrollshiptosync: boolean;
  getData: getData;
  formOneValid: boolean = false;
  formTwoValid: boolean = false;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  constructor(
    private location: Location,
    private assetOptimaServices: AssetOptimaServices,
    private commonService: CommonService,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private translateService: TranslateService,
    private assetOptimaConstants: AssetOptimaConstants,
    private userSession: UserSessionService
  ) {
    this.approvedSupplierPageNumber = 1
    this.supplierPageNumber = 1;
    this.locationPageNumber = 1;
    this.ServiceProviderPageNumber = 1;
    this.approvedServiceProviderPageNumber = 1;
    this.pageSize = '100';
    this.pageIndex = '0';
    this.approve = 'APPROVED';
  }

  ngOnInit() {
    this.inwardInventoryDtlList.data = [];
    this.piInventoryForm = new FormGroup({
      inwardInventoryHdrId: new FormControl(0),
      poNumber: new FormControl('', [Validators.required]),
      poDate: new FormControl(Date),
      businessPartnerId: new FormControl(0),
      businessPartnerSiteId: new FormControl(0),
      orgId: new FormControl(0),
      businessPartnerSiteName: new FormControl(''),
      businessPartnerName: new FormControl(null, [Validators.required]),
      sourceScreen: new FormControl(''),
      expectedArrivalDt: new FormControl(''),
      totalUnitPrice: new FormControl('', [Validators.required]),
      totalQty: new FormControl('', [Validators.required]),
      totalTaxAmount: new FormControl('', [Validators.required]),
      totalAmt: new FormControl('', [Validators.required]),
      locationId: new FormControl(0),
      locationName: new FormControl('', [Validators.required]),
      expectedArrivalDtDisp: new FormControl('', [Validators.required]),
      poDateDisp: new FormControl('', [Validators.required]),
      active: new FormControl(''),
      currentDate: new FormControl(new Date),
      capexNumber: new FormControl('', [Validators.maxLength(500)]),
      requestRaisedByPhoneNumber: new FormControl(0),
      shipToId: new FormControl(0),
      shipTo: new FormControl('', [Validators.required]),
      preInwStatusId: new FormControl(0),
      preInwStatusName: new FormControl(''),
      inwardInventoryDtlList: new FormControl('', []),
      createdBy: new FormControl(this.userSession.getUserName()),
      updatedBy: new FormControl(''),
      createdDt: new FormControl(new Date()),
      updatedDt: new FormControl(Date),
      createdDtDisp: new FormControl(this.commonService.convertToDateStringdd_mm_yyyy(new Date())),
      UpdatedDtDisp: new FormControl(''),
      formDirty: new FormControl(''),
      approvalStatusPreInward: new FormControl(''),
      serviceProviderId: new FormControl(0),
      serviceProviderSiteId: new FormControl(0),
      serviceProviderSiteName: new FormControl(''),
      internalPoNumber: new FormControl(false),
      serviceProviderName: new FormControl(null),
      filePath: new FormControl(''),
      preInwardNumber: new FormControl(''),
      partnerSiteAddress: new FormControl(''),
      serviceProviderSiteAddress: new FormControl('')
    });
    this.piInventoryForm.controls.preInwardNumber.disable();
    this.piInventoryForm.controls.totalUnitPrice.disable();
    this.piInventoryForm.controls.totalQty.disable();
    this.piInventoryForm.controls.totalTaxAmount.disable();
    this.piInventoryForm.controls.totalAmt.disable();
    this.piInventoryForm.controls.preInwStatusName.disable();
    this.piInventoryForm.controls.locationId.setValue(this.userSession.getUserLocationId());
    this.piInventoryForm.controls.locationName.setValue(this.userSession.getUserLocationName());
    this.piInventoryForm.controls.shipToId.setValue(this.userSession.getUserLocationId());
    this.piInventoryForm.controls.shipTo.setValue(this.userSession.getUserLocationName());
    this.piInventoryForm.controls.requestRaisedByPhoneNumber.setValue(this.assetOptimaConstants.loginUserPhoneNumber);
    this.formOneValid =false;
    this.validateEditMode();
    this.piInventoryForm.controls.businessPartnerSiteName.disable();
    this.piInventoryForm.controls.serviceProviderSiteName.disable();
    this.piInventoryForm.controls.partnerSiteAddress.disable();
    this.piInventoryForm.controls.serviceProviderSiteAddress.disable();
  }

  ngAfterViewInit() {
    this.commonService.setComboFocus(this.locationNameFocusSet);
  }

  exit() {
    this.location.back();
  }

  listOfSupplierApproved(searchValue) {
    this.scrollApprovedSuppliersync = true;
    this.piInventoryForm.controls.sourceScreen.setValue(this.sourceScreenOfSupplier);
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerSiteCombo, searchValue.term, this.piInventoryForm.controls.businessPartnerId.value, '', this.limitCount, this.approvedSupplierPageNumber, '',this.piInventoryForm.controls.sourceScreen.value).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.approvedSupplierPageNumber , this.supplierLocationList , data.responseData.comboList)
        this.approvedSupplierPageNumber = this.getData.pageNumber;
        this.supplierLocationList = this.getData.dataList;
        this.scrollApprovedSuppliersync = false;
      }
    );
  }

  fetchIdOfSupplierApproved(event) {
    if (event === undefined) {
      this.piInventoryForm.get('businessPartnerSiteId').setValue(0);
      this.supplierLocationList = [];
      this.approvedSupplierPageNumber = 1;
      this.piInventoryForm.controls.partnerSiteAddress.setValue('');
    } else {
      this.piInventoryForm.controls.businessPartnerSiteId.setValue(event.partnerSiteId);
      this.piInventoryForm.controls.businessPartnerSiteName.setValue(event.partnerSiteName);
      this.piInventoryForm.controls.partnerSiteAddress.setValue(event.partnerSiteAddress1 + "," + event.partnerSiteAddress2 + " , " + event.partnerSiteArea
      + "," + event.partnerSiteCity + "," + event.partnerSiteState + "," + event.partnerSiteCountry
      + "," + event.partnerSitePinCode);
    }
  }

  listOfSupplier(searchTerms) {
    this.scrollSupplierNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.SUPPLIER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchTerms.term, '', '', this.limitCount, this.supplierPageNumber, '', partnerRoles).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.supplierPageNumber , this.supplierList , data.responseData.comboList)
        this.supplierPageNumber = this.getData.pageNumber;
        this.supplierList = this.getData.dataList;
        this.scrollSupplierNamesync = false;
      }
    );
  }

  fetchIdOfSupplier(event) {
    if (event === undefined) {
      this.piInventoryForm.controls['businessPartnerId'].setValue(0);
      this.piInventoryForm.controls['businessPartnerName'].setValue(null);
      this.supplierList = [];
      this.supplierPageNumber = 1;
      this.piInventoryForm.controls['businessPartnerSiteId'].setValue(0);
      this.piInventoryForm.controls['businessPartnerSiteName'].setValue(null);
      this.supplierLocationList = [];
      this.approvedSupplierPageNumber = 1;
      this.piInventoryForm.controls.businessPartnerSiteName.disable();
      this.piInventoryForm.controls.partnerSiteAddress.disable();
    } else {
      this.piInventoryForm.controls.businessPartnerId.setValue(event.businessPartnerId);
      this.piInventoryForm.controls.businessPartnerName.setValue(event.businessPartnerName);
      this.piInventoryForm.controls['businessPartnerSiteId'].setValue(0);
      this.piInventoryForm.controls['businessPartnerSiteName'].setValue(null);
      this.supplierLocationList = [];
      this.approvedSupplierPageNumber = 1;
      this.piInventoryForm.controls.businessPartnerSiteName.enable();
      this.piInventoryForm.controls.partnerSiteAddress.enable();
    }
    this.piInventoryForm.controls.partnerSiteAddress.setValue('');
  }

  addModel(modelInfo, index, mode) {
    localStorage.setItem('indexOfModelToBeAdded', ((index===null)? -1 : index));
    let dialogRef = this.dialog.open(PreInwardInventoryAddModelDialogComponent, {
      data: {
        'mode': mode,
        'modelInfo': modelInfo,
        'hdrId': this.piInventoryForm.controls.inwardInventoryHdrId.value,
        'businessPartnerId': this.piInventoryForm.controls.businessPartnerId.value
      },
      width: "95%", height: "auto"
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.subloaderModel = false;
          if (index === null) {
            if(this.inwardInventoryDtlList.data.length === 0) {
              this.inwardInventoryDtlList.data = [];
            }
            this.inwardInventoryDtlList.data = this.inwardInventoryDtlList.data.concat([data]);
            this.piInventoryForm.controls.inwardInventoryDtlList.setValue(this.inwardInventoryDtlList.data);
            this.length = this.piInventoryForm.controls.inwardInventoryDtlList.get.length;
            this.commonService.openToastSuccessMessage('Record Added Successfully.');
            this.calculateTotals();
            this.formValidation();
            this.disableSupplier();
          } else if (index !== null && index !== undefined && index !== '') {
            this.inwardInventoryDtlList.data.splice(index, 1);
            this.inwardInventoryDtlList.data = this.inwardInventoryDtlList.data.concat([data]);
            this.piInventoryForm.controls.inwardInventoryDtlList.setValue(this.inwardInventoryDtlList.data);
            this.commonService.openToastSuccessMessage('Record Updated Successfully.');
            this.calculateTotals();
            this.formValidation();
            this.disableSupplier();
          }
        }
      });
      localStorage.setItem('preInwardFormGroup', JSON.stringify(this.piInventoryForm.getRawValue()));
  }


  calculateTotals() {
    let obj = {
      'inwardInventoryDtlList': this.piInventoryForm.controls.inwardInventoryDtlList.value
    }
    this.commonService.commonInsertService(this.assetOptimaServices.calculateInwardInventoryTotals, obj).subscribe(
      data => {
        if (data.success) {

          this.piInventoryForm.controls.totalTaxAmount.setValue(data.responseData.totalTaxAmount);
          this.piInventoryForm.controls.totalUnitPrice.setValue(data.responseData.totalUnitPrice);
          this.piInventoryForm.controls.totalQty.setValue(data.responseData.totalQty);
          this.piInventoryForm.controls.totalAmt.setValue(data.responseData.totalAmt);

        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }
    );
  }

  clear() {
    this.length = 0;
    this.piInventoryForm.controls.businessPartnerName.enable();
    this.ngOnInit();
  }

  generateGrn(grnId?: number, mode?: string) {
    this.router.navigate(['home/inventory/grnCreate/' + grnId + '/' + mode]);

  }

  customSort(event) {

  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  loadLocationComboData(searchValue, event) {
    if(event){
      this.scrollsync = true;
    }else if(!event){
      this.scrollshiptosync = true;
    }
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllUserLocForCombo, searchValue.term, '', '',
      this.recordsPerPageForCombo, this.locationPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.locationPageNumber , this.locationCombo , data.responseData.comboList)
          this.locationPageNumber = this.getData.pageNumber;
          this.locationCombo = this.getData.dataList;
          this.scrollsync = false;
          this.scrollshiptosync = false;
        }
      );
  }

  selectedLocationData(event) {
    if (event === undefined) {
      this.locationId.setValue(0);
      this.locationName.setValue(null);
      //this.orgId.setValue(0);
      this.locationPageNumber = 1;
      this.locationCombo = [];
    } else {
      this.locationId.setValue(event.locationId);
      this.locationName.setValue(event.locDisplayField);
      this.piInventoryForm.controls.locationId.setValue(event.locationId);
      this.piInventoryForm.controls.locationName.setValue(event.locationName);
      this.piInventoryForm.controls.orgId.setValue(event.orgId);
      this.orgId = event.orgId;
    }
  }

  selectedLocationDataVal(event) {
    if (event == undefined) {
      //this.orgId.setValue(0);
      this.locationPageNumber = 1;
      this.locationCombo = [];
      this.piInventoryForm.controls.shipToId.setValue(0);
      this.piInventoryForm.controls.shipTo.setValue(null);
    } else {
      this.piInventoryForm.controls.shipToId.setValue(event.locationId);
      this.piInventoryForm.controls.shipTo.setValue(event.locationName);
    }
  }

  saveInwardInventory(mode) {

    this.piInventoryForm.controls.poNumber.setValue(this.piInventoryForm.controls.poNumber.value.trim());
    this.piInventoryForm.controls.formDirty.setValue(mode);
    if (this.piInventoryForm.controls.expectedArrivalDtDisp.value != null && this.piInventoryForm.controls.expectedArrivalDtDisp.value)
      this.piInventoryForm.controls.expectedArrivalDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.piInventoryForm.controls.expectedArrivalDtDisp.value));

    if (this.piInventoryForm.controls.poDateDisp.value != null && this.piInventoryForm.controls.poDateDisp.value) {
      this.piInventoryForm.controls.poDateDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.piInventoryForm.controls.poDateDisp.value));
    }

      this.piInventoryForm.controls.inwardInventoryDtlList.setValue(this.inwardInventoryDtlList.data);
      this.uploadFlag = true;
      this.piInventoryForm.controls.filePath.setValue(this.docFilePath);
      this.commonService.commonInsertService(this.assetOptimaServices.saveOrUpdateInwardInventory, this.piInventoryForm.getRawValue()).subscribe(
        data => {
          if (data.success) {
            this.uploadFile(data.responseData.inwardInventoryHdrId,data.responseData.orgId);
            this.commonService.openToastSuccessMessage(data.message);
            this.location.back();
            this.uploadFlag = false;
          } else {
            this.commonService.openToastErrorMessage(data.message);
            this.uploadFlag = false;
          }
        }
      );

  }

  validateEditMode() {
    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        var mode = params.mode;
        primaryId = Number(primaryId);
        this.preInwardId = Number(primaryId);
        this.transactionSource = allWorkflowStatus[allWorkflowStatus.PRE_INWARD];
        if (primaryId <= 0) {
          this.buttonSubmit = 'Submit';
          this.headingDisplay = 'Create';
          this.buttonDisableInEdit = false;
          this.piInventoryForm.get('active').setValue(true);
          this.piInventoryForm.controls.preInwStatusId.setValue(0);
          if(localStorage.getItem('navigateToOtherScreenFromPreInwardAdd') === 'true') {
            this.restorePIFormGroupValues();
          }
        } else {
          if (mode == 'view') {
            this.headingDisplay = "View";
            this.modeDisplay = true;
            this.piInventoryForm.disable();
          } else {
            //button and heading names for edit
            this.buttonSubmit = 'Update';
            this.headingDisplay = 'Edit';
            // this.piInventoryForm.get('poNumber').disable();
            this.buttonDisableInEdit = true;
            this.disableSubmitBtn = false;
          }
          this.subloaderModel = true;
          if(localStorage.getItem('navigateToOtherScreenFromPreInwardAdd') === 'true') {
            this.restorePIFormGroupValues();
            this.subloaderModel = false;
          } else {
            this.commonService.commonGetService(this.assetOptimaServices.fetchInwardInventoryHdrInfo, primaryId).subscribe(
              data => {
                if (data.success) {
                  this.docFilePath = data.responseData.filePath;
                  this.translateService.get(data.responseData.preInwStatusName)
                  .subscribe(val => {
                    this.piInventoryForm.patchValue(data.responseData);
                    this.piInventoryForm.controls.preInwStatusName.setValue(val);
                  });

                  if(this.docFilePath == undefined || this.docFilePath == '' || this.docFilePath == null) {
                    this.showPoDocView = false;
                  } else {
                    this.poDocFileType = this.commonService.getFileType(this.docFilePath).toLowerCase();
                    if(this.poDocFileType == 'pdf' || this.poDocFileType == 'jpg' || this.poDocFileType == 'png' || this.poDocFileType == 'jpeg') {
                      this.showPoDocView = true;
                    } else {
                      this.showPoDocView = false;
                    }
                  }

                  if(this.piInventoryForm.controls.internalPoNumber.value === true) {
                    this.docUploadRequired = false;
                  } else {
                    this.docUploadRequired = true;
                  }
                  this.docFileName = data.responseData.docName != null ? data.responseData.docName : '';
                  this.tempValuePoNumber = data.responseData.poNumber != null ? data.responseData.poNumber : '';
                  this.length = data.responseData.inwardInventoryDtlList.length;
                  this.inwardInventoryDtlList.data = data.responseData.inwardInventoryDtlList;
                  this.formValidation();
                  // this.disableSupplier();
                  this.statutoryRequirementList.data = data.responseData.statutoryRequirementList;
                  this.tempValue = data.responseData.supplierCode != null ? data.responseData.supplierCode : '';
                  this.piInventoryForm.controls.expectedArrivalDtDisp.setValue(new Date(this.piInventoryForm.controls.expectedArrivalDtDisp.value));
                  this.piInventoryForm.controls.poDateDisp.setValue(new Date(this.piInventoryForm.controls.poDateDisp.value));
                  this.subloaderModel = false;
                  this.getWorkflowApprovalForInward();
                }
                else
                  this.subloaderModel = false;
              }
            )
            }
        }
      }
    );

  }

  getWorkflowApprovalForInward() {
    this.commonService.commonGetService(this.assetOptimaServices.getWorkflowForId, this.piInventoryForm.controls.inwardInventoryHdrId.value,
      this.userSession.getUserEmpId(),
      allWorkflowStatus[allWorkflowStatus.PRE_INWARD], this.userSession.getUserOrgId()).subscribe(
        data => {
          if (data.success) {
            this.employeeId = this.userSession.getUserEmpId();
            this.approvebuttonEnable = data.responseData.approvalFlag;
            this.approvalId = data.responseData.workflowApprovalId;
          } else {
            this.commonService.openToastWarningMessage(data.message);
          }
        }, error => {
        }
      );
  }

  deleteModelInfo(indexOfItemToBeRemovedFromList: number) {
    this.newlyAddedInwardListItem = this.inwardInventoryDtlList.data;
    this.newlyAddedInwardListItem.splice(indexOfItemToBeRemovedFromList, 1);
    this.inwardInventoryDtlList.data = this.newlyAddedInwardListItem;
    this.commonService.openToastSuccessMessage("Record Deleted Successfully.");
    this.changeDetectorRefs.detectChanges();
    this.calculateTotals();
    this.formValidation();
    this.disableSupplier();
  }

  checkDifferenceOfDates() {
    if(this.piInventoryForm.controls.expectedArrivalDtDisp.value != null && this.piInventoryForm.controls.expectedArrivalDtDisp.value != '') {
      if((new Date(this.piInventoryForm.controls.poDateDisp.value).valueOf() > new Date(this.piInventoryForm.controls.expectedArrivalDtDisp.value).valueOf()))
        this.piInventoryForm.controls.expectedArrivalDtDisp.setValue('');
    }
  }

  restorePIFormGroupValues() {
    const tempPIFormGroup = JSON.parse(localStorage.getItem('preInwardFormGroup'));
    this.inwardInventoryDtlList.data = tempPIFormGroup.inwardInventoryDtlList;
    this.piInventoryForm.controls.inwardInventoryDtlList.setValue(tempPIFormGroup.inwardInventoryDtlList);
    this.length = tempPIFormGroup.inwardInventoryDtlList.length;
    this.piInventoryForm.patchValue(JSON.parse(localStorage.getItem('preInwardFormGroup')));
    const indexOfModelToBeAdded = Number (localStorage.getItem('indexOfModelToBeAdded'));
    this.addModel(JSON.parse(localStorage.getItem('preInwardInfoIfModelNeedToBeAdded')), (indexOfModelToBeAdded === -1) ? null : indexOfModelToBeAdded,
     ((indexOfModelToBeAdded === -1) ? 'add' : 'edit'));
  }

  preWorkflowApproval(status){
    let asd;
    let selectedAssetList = [];
    selectedAssetList.push({...this.piInventoryForm.value,approvalId: this.approvalId});

    if(status){
      asd = this.commonService.commonWorkflowService(allWorkflowStatus[allWorkflowStatus.PRE_INWARD], selectedAssetList," PO Registration");
    }
    else{
      asd = this.commonService.rejectApprove(allWorkflowStatus[allWorkflowStatus.PRE_INWARD],selectedAssetList," PO Registration");
    }

    asd.then(data=>{
      if(data){
         this.ngOnInit();
      }
    })
  }

  formValidation() {
    if (this.inwardInventoryDtlList.data.length > 0  ) {
      for (let index = 0; index < this.inwardInventoryDtlList.data.length; index++) {
        const element = this.inwardInventoryDtlList.data[index].statutoryRequirementList;
        if(element.length > 0){
          this.formTwoValid = true;
          for (let index = 0; index < element.length; index++) {
            const element1 = element[index];
            if (element1.documentNo == '') {
              this.formOneValid = false;
              return this.formOneValid;
            }else{
              this.formOneValid = true;
            }
          }
        }else{
          this.formOneValid = true;
          this.formTwoValid = false;
        }
      }
    } else {
      this.formOneValid = false;
    }
    return this.formOneValid;
  }

      //Check PO number Name existence
checkForPoNumberExistence() {
  if(((this.tempValuePoNumber!= null || this.tempValuePoNumber!= '') ? this.tempValuePoNumber.toLowerCase() : '') === ((this.piInventoryForm.controls.poNumber.value!= null) ? this.piInventoryForm.controls.poNumber.value.toLowerCase():'')) {

  }else if(this.piInventoryForm.controls.poNumber.value.replace (/s+/g, ' ').trim () === ''){
    this.piInventoryForm.controls['poNumber'].setValue('');
  }else{
    let constraintData: UniqueValidationModel = new UniqueValidationModel();
    constraintData.className = "com.sams.to.asset.InwardInventoryHdrTO";
    constraintData.constraints = {
    'poNumber': this.piInventoryForm.controls.poNumber.value.toLowerCase().trim(),
    'orgId':this.userSession.getUserOrgId(),
    'shipToId':this.piInventoryForm.controls.shipToId.value,
    'locationId':this.piInventoryForm.controls.locationId.value
    };
    this.commonService.checkUniqueValidation(constraintData).subscribe(
    data => {
    if(!data.success){
      this.ErrorMsg = data.message;
      this.piInventoryForm.controls.poNumber.setErrors(Validators.minLength);
      this.piInventoryForm.controls.poNumber.setErrors({"notUnique": true});
    }else{
      this.ErrorMsg = '';
      this.piInventoryForm.controls.poNumber.setErrors(null);
    }

    }
    );
  }
}

disableSupplier(){
    if (this.piInventoryForm.controls.inwardInventoryDtlList.value.length != 0) {
      this.piInventoryForm.controls.businessPartnerName.disable();
      this.piInventoryForm.controls.businessPartnerSiteName.disable();
    }else{
      this.piInventoryForm.controls.businessPartnerName.enable();
      this.piInventoryForm.controls.businessPartnerSiteName.enable();
    }
  }

  listOfServiceProviderApproved(searchValue) {
    this.scrollApprovedServiceProvidersync = true;
    this.piInventoryForm.controls.sourceScreen.setValue(this.sourceScreenOfSupplier);
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerSiteCombo, searchValue.term, this.piInventoryForm.controls.serviceProviderId.value, '', this.limitCount, this.approvedServiceProviderPageNumber, '',this.piInventoryForm.controls.sourceScreen.value).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.approvedServiceProviderPageNumber , this.ServiceProviderLocationList , data.responseData.comboList)
        this.approvedServiceProviderPageNumber = this.getData.pageNumber;
        this.ServiceProviderLocationList = this.getData.dataList;
        this.scrollApprovedServiceProvidersync = false;
      }
    );
  }

  fetchIdOfServiceProviderApproved(event) {
    if (event === undefined) {
      this.piInventoryForm.get('serviceProviderSiteId').setValue(0);
      this.ServiceProviderLocationList = [];
      this.approvedServiceProviderPageNumber = 1;
      this.piInventoryForm.controls.serviceProviderSiteAddress.setValue('');
    } else {
      this.piInventoryForm.controls.serviceProviderSiteId.setValue(event.partnerSiteId);
      this.piInventoryForm.controls.serviceProviderSiteName.setValue(event.partnerSiteName);
      this.piInventoryForm.controls.serviceProviderSiteAddress.setValue(event.partnerSiteAddress1 + "," + event.partnerSiteAddress2 + " , " + event.partnerSiteArea
      + "," + event.partnerSiteCity + "," + event.partnerSiteState + "," + event.partnerSiteCountry
      + "," + event.partnerSitePinCode);
    }
  }

  listOfServiceProvider(searchTerms) {
    this.scrollServiceProviderNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.SERVICE_PROVIDER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchTerms.term, '', '', this.limitCount, this.ServiceProviderPageNumber, '', partnerRoles).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.ServiceProviderPageNumber , this.ServiceProviderList , data.responseData.comboList)
        this.ServiceProviderPageNumber = this.getData.pageNumber;
        this.ServiceProviderList = this.getData.dataList;
        this.scrollServiceProviderNamesync = false;
      }
    );
  }

  fetchIdOfServiceProvider(event) {
    if (event === undefined) {
      this.piInventoryForm.controls['serviceProviderId'].setValue(0);
      this.piInventoryForm.controls['serviceProviderName'].setValue(null);
      this.ServiceProviderList = [];
      this.ServiceProviderPageNumber = 1;
      this.piInventoryForm.controls['serviceProviderSiteId'].setValue(0);
      this.piInventoryForm.controls['serviceProviderSiteName'].setValue(null);
      this.ServiceProviderLocationList = [];
      this.approvedServiceProviderPageNumber = 1;
      this.piInventoryForm.controls.serviceProviderSiteName.disable();
      this.piInventoryForm.controls.serviceProviderSiteAddress.disable();
    } else {
      this.piInventoryForm.controls.serviceProviderId.setValue(event.businessPartnerId);
      this.piInventoryForm.controls.serviceProviderName.setValue(event.businessPartnerName);
      this.piInventoryForm.controls['serviceProviderSiteId'].setValue(0);
      this.piInventoryForm.controls['serviceProviderSiteName'].setValue(null);
      this.ServiceProviderLocationList = [];
      this.approvedServiceProviderPageNumber = 1;
      this.piInventoryForm.controls.serviceProviderSiteName.enable();
      this.piInventoryForm.controls.serviceProviderSiteAddress.enable();
    }
    this.piInventoryForm.controls.serviceProviderSiteAddress.setValue('');
  }

  assetWithoutPo(){
    this.disableSubmitBtn = true;
    if(this.piInventoryForm.controls.internalPoNumber.value) {
      this.piInventoryForm.controls.poNumber.setValue(this.tempValuePoNumber);
      this.piInventoryForm.controls.poNumber.disable();

      this.piInventoryForm.controls.capexNumber.clearValidators();
      this.piInventoryForm.controls.capexNumber.updateValueAndValidity();

      this.piInventoryForm.controls.poDateDisp.clearValidators();
      this.piInventoryForm.controls.poDateDisp.updateValueAndValidity();

      this.piInventoryForm.controls.expectedArrivalDtDisp.clearValidators();
      this.piInventoryForm.controls.expectedArrivalDtDisp.updateValueAndValidity();
    } else {
      this.piInventoryForm.controls.poNumber.enable();
      this.piInventoryForm.controls.poNumber.setValue('');
      
      this.piInventoryForm.controls.capexNumber.setValidators(Validators.required);
      this.piInventoryForm.controls.capexNumber.updateValueAndValidity();
      
      this.piInventoryForm.controls.poDateDisp.setValidators(Validators.required);
      this.piInventoryForm.controls.poDateDisp.updateValueAndValidity();

      this.piInventoryForm.controls.expectedArrivalDtDisp.setValidators(Validators.required);
      this.piInventoryForm.controls.expectedArrivalDtDisp.updateValueAndValidity();
      
    }

    if (this.piInventoryForm.controls.internalPoNumber.value === false) {
      this.docUploadRequired = true;
      this.disableSubmitBtn = true;
    }else{
      this.docUploadRequired = false;
      this.disableSubmitBtn = false;
      this.docFileName = '';
      this.fileToUpload = null;
    }
  }

  docFileName: string;
  docTypeName: string;
  formData: FormData = new FormData();
  fileNum: number = 0;

  handleFileInput(files: FileList){
    this.fileToUpload = files[0];
    let tempFileName = this.fileToUpload.name;
    if(tempFileName != this.docFileName) {
      this.docFilePath = ''
    }
      if (((this.fileToUpload.size / 1024) / 1024) < 25) {
        this.docFileName = this.fileToUpload.name;
        this.fileUploadFlag = true;
        this.disableSubmitBtn = false;
      } else {
        this.commonService.openToastWarningMessage(this.fileToUpload.name +' File size > 25 MB');
        this.fileUploadFlag = false;
        this.disableSubmitBtn = true;
      }      
  }

  uploadFile(inwardInventoryHdrId, orgId) {
    let formData: FormData = new FormData();
    formData.append('fileInfo', this.fileToUpload);
    formData.append('inwardInventoryHdrId', inwardInventoryHdrId);
    formData.append('fileName', this.docFileName);
    formData.append('docType', this.docTypeName);
    formData.append('orgId', orgId);
    this.commonService.commonFileUpload('poRegistrationDoc.sams', formData).subscribe(
      data => {
        if (data.success) {
          //this.validateEditMode();
        } else {
        }
      }, error => {
        this.commonService.openToastErrorMessage("Error");
      }
    );
  }

  downloadPODocument() {   
    let filePath = this.docFilePath;
    let contentType = "";
    var fileName = filePath.split('.')[0];
    this.commonService.showSpinner();
    this.commonService.downloadFile(filePath, contentType).subscribe(
      data => {
        let file = filePath.split('.');
        this.commonService.showDownloadPopUp(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
        this.commonService.hideSpinner();
      }, error => {
        this.commonService.hideSpinner();
      }
    );
  }

  viewPODocument() {
    let fileData = this.commonService.downloadFileFromServerToView(this.docFilePath, "");
    this.commonService.pdfViwer(fileData, 'application/pdf');
  }
}
