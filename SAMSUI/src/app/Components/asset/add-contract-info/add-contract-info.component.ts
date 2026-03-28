import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { allBusinessPartnerRoles } from 'src/app/Constants/AllStatusConstants';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { getData } from 'src/app/Model/common/fetchListData';
import { CommonService } from 'src/app/Services/common-service/common.service';

@Component({
  selector: 'app-add-contract-info',
  templateUrl: './add-contract-info.component.html',
  styleUrls: ['./add-contract-info.component.css']
})
export class AddContractInfoComponent implements OnInit {

  contractCreateFormGroup: FormGroup;

  contractingPartyType = [
    { id: 1, name: 'SUPPLIER' },
    { id: 2, name: 'MANUFACTURER' },
    { id: 3, name: 'CUSTOMER' }
  ];

  limitCount: any;
  getData: getData;

  scrollSuppliersync: boolean = false;
  supplierListPageNumber: number;
  supplierList: any =[];

  scrollSupplierLocationSync: boolean = false;
  supplierLocationListPageNumber: number;
  supplierLocationCombo: any = [];

  ownershipOptions = [
    { id: 1, name: 'OWN' },
    { id: 2, name: 'OWNED BY CUSTOMER' },
    { id: 3, name: 'RENTAL' },
    { id: 4, name: 'LEASE' },
    { id: 5, name: 'LOAN' }
  ];

  ownership: any[] = [
    { id: 1, name: 'RENTAL' },
    { id: 2, name: 'LEASE' },
    { id: 3, name: 'LOAN' }

  ]; 

  fromDate:string='Today';
  daysElapsed: number=0;

  displayButton: string = 'Add';

  businessPartnerName : String = '';

  contractLength = '0';
  contractDataSource: any = [];
  contractDisplayCol = ['sno', 'contractNo', 'coverageType', 'contractStartDtDisp', 'contractingPartyType','contractingPartyInfo',
    'contractStatus', 'netContractValue']

  isContractInfoPanelExpanded : boolean = false;

  disableAddBtn : boolean = false;

  constructor(public dialogRef: MatDialogRef<AddContractInfoComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private cdr: ChangeDetectorRef,
    private validationService: AssetOptimaConstants,
    private commonService: CommonService,
    public assetOptimaServices: AssetOptimaServices) { 
      this.supplierListPageNumber = 1;
      this.supplierLocationListPageNumber = 1;
      
    }

  ngOnInit(): void {

    this.contractCreateFormGroup = new FormGroup({
      contractHdrId: new FormControl(0),
      locationId: new FormControl(''),
      locationName: new FormControl('', ),
      contractingPartyType: new FormControl('SUPPLIER'),
      contractPartyId: new FormControl(0),
      contractPartyName: new FormControl(''),
      contractPartyLocationId : new FormControl(0),
      contractPartyLocationName: new FormControl(''),
      contractNo: new FormControl('',),
      contractName: new FormControl(''),
      coverageType: new FormControl(''),
      contractType: new FormControl(''),
      active: new FormControl('true'),
      contractStatus: new FormControl(''),
      contractStatusId: new FormControl(''),
      orgId: new FormControl(''),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      rejectReason : new FormControl(''),
      cancelReason : new FormControl(''),

      contactPerson: new FormControl(''),
      phoneNumber: new FormControl(''),
      emailId : new FormControl(''),
      addressInfo : new FormControl(''),
      curCd: new FormControl(''),
      contractPartyServiceType: new FormControl(''),

      contractStartDt: new FormControl(''),
      contractStartDtDisp: new FormControl(''),
      contractEndDt: new FormControl(''),
      contractEndDtDisp: new FormControl(''),
      expiryPriorNotifyDays: new FormControl(''),
      contractPONo : new FormControl(''),
      contractPODt : new FormControl(''),
      contractPODtDisp: new FormControl(''),

      contractBasicValue: new FormControl('0'),//Validation If combo changes
      discountRate: new FormControl(0),
      discountAmt : new FormControl(0),
      contractGrossValue : new FormControl(0),
      netContractValue: new FormControl(''),
      exchRate : new FormControl('1'),
      localNetContractValue: new FormControl(''),
      taxCode1 : new FormControl(''),
      taxCode2 :  new FormControl(''),
      taxRate1 : new FormControl(0),
      taxRate2 : new FormControl(0),
      taxValue1 : new FormControl(0),
      taxValue2 : new FormControl(0),

      includedService: new FormControl(''),
      excludedService: new FormControl(''),
      autoRenewal: new FormControl(''),
      excalationPercent: new FormControl(0),

      termsCondition : new FormControl(''),

      paymentTenureFrequency : new FormControl('MONTHLY'),
      paymentTenureOccurances : new FormControl(0),

      //Used on creating new contract for checking previous available validation in backend
      assetHdrId:new  FormControl(0),

      assetList: new FormControl([]),

      contractTenurePaymentList: new FormControl([]),

      totalAssetPoAmount: new FormControl(0),

      //For Enable Normal Approve button if workflow approval does not for contract
      woApprovalStatus: new FormControl(''),
      expiryNotifyId: new FormControl(0),
      contractTempDtlList: new FormControl([]),

      approvalId : new FormControl(0),
      contractWithoutPrice : new FormControl(false),
      contractWithoutSupplier : new FormControl(false),

      ownershipType: new FormControl(''),

    });

    this.disableAddBtn = true;
  }

  ngAfterViewInit() {
    if (this.data.assetInfo != 0) {
      this.contractCreateFormGroup.patchValue(this.data.assetInfo);

      this.contractCreateFormGroup.controls.coverageType.setValue(this.data.assetInfo.ownershipType);
      this.businessPartnerName = this.contractCreateFormGroup.controls.contractPartyName.value;
    } 
    this.cdr.detectChanges();

    this.loadContractDetailsForAssetList();
  }

  clear() {
    this.contractCreateFormGroup.reset();
    this.contractCreateFormGroup.updateValueAndValidity();
  }

  exit() {
    this.dialogRef.close();
  }

  addPRItem() {

      this.dialogRef.close(this.contractCreateFormGroup.getRawValue());
  }

  changePartyValue(event){
    if (event === undefined) {
      this.contractCreateFormGroup.controls.contractingPartyType.setValue('');

      this.contractCreateFormGroup.controls.contractPartyId.setValue(0);
      this.contractCreateFormGroup.controls.contractPartyName.setValue('');

      this.contractCreateFormGroup.controls.contractPartyLocationId.setValue(0);
      this.contractCreateFormGroup.controls.contractPartyLocationName.setValue('');

      this.supplierListPageNumber = 1;
      this.supplierList = [];

      this.supplierLocationListPageNumber = 1;
      this.supplierLocationCombo = [];
      
    } else {
      this.contractCreateFormGroup.controls.contractingPartyType.setValue(event.name);

      this.contractCreateFormGroup.controls.contractPartyId.setValue(0);
      this.contractCreateFormGroup.controls.contractPartyName.setValue('');

      this.contractCreateFormGroup.controls.contractPartyLocationId.setValue(0);
      this.contractCreateFormGroup.controls.contractPartyLocationName.setValue('');

      this.supplierListPageNumber = 1;
      this.supplierList = [];

      this.supplierLocationListPageNumber = 1;
      this.supplierLocationCombo = [];

    }
  }

  listOfSupplier(searchValue) {
    this.scrollSuppliersync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    let partnerRoles = '';
     
    if (this.contractCreateFormGroup.controls.contractingPartyType.value === 'SUPPLIER') {
      partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.SUPPLIER];
    } else if (this.contractCreateFormGroup.controls.contractingPartyType.value === 'CUSTOMER') {
      partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.CUSTOMER];
    } else if (this.contractCreateFormGroup.controls.contractingPartyType.value === 'MANUFACTURER') {
      partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.MANUFACTURER];
    }
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchValue.term, '', '',
     this.limitCount, this.supplierListPageNumber,'',partnerRoles).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.supplierListPageNumber , this.supplierList , data.responseData.comboList)
        this.supplierListPageNumber = this.getData.pageNumber;
        this.supplierList = this.getData.dataList;
        this.scrollSuppliersync = false;
      }
    );
  }

  setSupplierData(event) {
    if (event === undefined) {
      this.contractCreateFormGroup.controls.contractPartyId.setValue(0);
      this.contractCreateFormGroup.controls.contractPartyName.setValue('');
      this.contractCreateFormGroup.controls.contractPartyServiceType.setValue('');
      this.supplierListPageNumber = 1;
      this.supplierList = [];
      this.selectedSupplierLocationData(undefined);
    } else {
      this.contractCreateFormGroup.controls.contractPartyId.setValue(event.businessPartnerId);
      this.contractCreateFormGroup.controls.contractPartyName.setValue(event.businessPartnerName);
      //this.contractCreateFormGroup.controls.contractPartyServiceType.setValue(event.serviceType);
      this.supplierLocationListPageNumber = 1;
      this.supplierLocationCombo = [];
      // this.selectedSupplierLocationData(event.supplierLocList[0]);
    }
  }

  listOfSupplierLocation(searchValue) {
    const contractPartyId =  this.contractCreateFormGroup.controls.contractPartyId.value
    this.scrollSupplierLocationSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerSiteCombo, searchValue.term, contractPartyId, '', this.limitCount, this.supplierLocationListPageNumber,'').subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.supplierLocationListPageNumber , this.supplierLocationCombo , data.responseData.comboList)
        this.supplierLocationListPageNumber = this.getData.pageNumber;
        this.supplierLocationCombo = this.getData.dataList;
        this.scrollSupplierLocationSync = false;
      }
    );
  }

  

  selectedSupplierLocationData(event) {
    if (event === undefined) {
      this.contractCreateFormGroup.controls.contractPartyLocationId.setValue(0);
      this.contractCreateFormGroup.controls.contractPartyLocationName.setValue('');
      this.contractCreateFormGroup.controls.contactPerson.setValue('');
      this.contractCreateFormGroup.controls.phoneNumber.setValue('');
      this.contractCreateFormGroup.controls.curCd.setValue('');
      this.supplierLocationListPageNumber = 1;
      this.supplierLocationCombo = [];
    } else {
      this.contractCreateFormGroup.controls.contractPartyLocationId.setValue(event.partnerSiteId);
      this.contractCreateFormGroup.controls.contractPartyLocationName.setValue(event.partnerSiteName);
      this.contractCreateFormGroup.controls.contactPerson.setValue(event.contactPersonName);
      this.contractCreateFormGroup.controls.phoneNumber.setValue(event.partnerSitePersonPhoneNo);
      this.contractCreateFormGroup.controls.emailId.setValue(event.partnerSiteEmailId);
      let addressInfo = event.partnerSiteAddress1 + "," + event.partnerSiteAddress2 + " , " + event.partnerSiteArea
                        + "," + event.partnerSiteCity + "," + event.partnerSiteState + "," + event.partnerSiteCountry
                        + "," + event.partnerSitePinCode;
      this.contractCreateFormGroup.controls.addressInfo.setValue(addressInfo);
      this.contractCreateFormGroup.controls.curCd.setValue(event.partnerSiteCurCd);
    }
  }

  changeCoverageType(event){
    if (event === undefined) {
      this.contractCreateFormGroup.controls.coverageType.setValue('');
    }else{
      this.contractCreateFormGroup.controls.coverageType.setValue(event.name);
    }
  }

  onOwnedByChange(selectedValue: string) {
    // this.assetMainForm.controls.ownershipType.setValue('');
    if (selectedValue === 'SELF OWNED') {
      this.ownership = this.ownershipOptions.filter(option =>
        option.name === 'OWN' || option.name === 'OWNED BY CUSTOMER'
      );
    } else if (selectedValue === 'BUSINESS PARTNER OWNED') {
      this.ownership = this.ownershipOptions.filter(option =>
        option.name === 'RENTAL' || option.name === 'LEASE' || option.name === 'LOAN'
      );
    }
  }

  dateValidationinstall(event) {
    return false;
  }

  formatTimestampToDate(timestamp: number): Date {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();

    return new Date(Number(year), Number(month) - 1, Number(day));
  }
  
  convertStringToDate(dateString: string): Date {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // Months are 0-based in JavaScript
  }

 onChangeValidation() {
    const startDateString = this.contractCreateFormGroup.controls.contractStartDtDisp.value;
    const endDateString = this.contractCreateFormGroup.controls.contractEndDtDisp.value;

  // Parse input start and end dates
    const startDate = this.formatTimestampToDate(startDateString);
    const endDate = this.formatTimestampToDate(endDateString);

    const isOverlap = this.contractDataSource.some((contract: any) => {
    // Assume existing contract dates are in 'DD-MM-YYYY' format
    const existingStartDateString = contract.contractStartDtDisp;
    const existingEndDateString = contract.contractEndDtDisp;

    // Parse existing contract start and end dates
    const existingStartDate = this.convertStringToDate(existingStartDateString);
    const existingEndDate = this.convertStringToDate(existingEndDateString);


    const isStartDateOverlap = startDate >= existingStartDate && startDate <= existingEndDate;
    const isEndDateOverlap = endDate >= existingStartDate && endDate <= existingEndDate;

    return isStartDateOverlap || isEndDateOverlap;
  });

  if (isOverlap) {
    this.commonService.openToastWarningMessage('The contract period overlaps with an existing contract.');
    this.disableAddBtn = true;
  } else {
    this.onChangeValidation1();
    this.disableAddBtn = false;
  }
}

  

  onChangeValidation1() {
    const startDateString = this.contractCreateFormGroup.controls.contractStartDtDisp.value;
    const endDateString = this.contractCreateFormGroup.controls.contractEndDtDisp.value; 
    const startDate = new Date(startDateString);
    this.fromDate = 'Start Date';
    const endDate = new Date(endDateString);
  
    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      const currentDate = new Date();
      if (startDate.getTime() < currentDate.getTime()) {
        this.fromDate = 'Today';
        startDate.setDate(currentDate.getDate());
        startDate.setMonth(currentDate.getMonth());
        startDate.setFullYear(currentDate.getFullYear());
      }
      const timeDiff = endDate.getTime() - startDate.getTime();
      this.daysElapsed = Math.ceil(timeDiff / (1000 * 3600 * 24));
    } else {
      this.daysElapsed = 0;
    }
    if(this.daysElapsed <= 90 && this.daysElapsed >= 0){
      this.commonService.openToastWarningMessage(this.daysElapsed+" Days Left To Expire From "+this.fromDate+".");
    }else if(this.daysElapsed < 0){
      this.commonService.openToastWarningMessage("Contract Expired Aleady.");
    }

  }

  loadContractDetailsForAssetList() {
    this.contractDataSource = [];
    if(this.contractCreateFormGroup.controls.assetHdrId.value > 0){
      this.commonService.commonGetService('loadAssetContract.sams', this.contractCreateFormGroup.controls.assetHdrId.value).subscribe(
        data => {
          if (data.success) {
            this.contractDataSource = data.responseData;
            this.contractLength = this.contractDataSource.length;
          } else {
            this.commonService.openToastErrorMessage(data.message);
          }
        }, error => {
        }
      );
    }
    
  }

  // Expansion Panel icon
  togglePanel(panelName,state): void {

    if(panelName == 'Contract Info'){
      state == 'opened' ?  this.isContractInfoPanelExpanded = true : this.isContractInfoPanelExpanded = false;
    }
    
  }

}
