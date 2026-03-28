import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { getData } from 'src/app/Model/common/fetchListData';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-contract-detailed-report',
  templateUrl: './contract-detailed-report.component.html',
  styleUrls: ['./contract-detailed-report.component.css']
})
export class ContractDetailedReportComponent implements OnInit {
  contractFormGroup: FormGroup;

  contractReportsList = ['Contract Detailed Report'];

  locationCombo: any = [];
  locationsync : boolean = false;
  locationPageNumber:number;

  scrollSuppliersync: boolean = false;
  supplierListPageNumber: number;
  supplierList: any;
  
  scrollCustomersync: boolean = false;
  customerListPageNumber: number;
  customerList: any =[];  

  scrollManufacturersync: boolean = false;
  manufacturerListPageNumber: number;
  manufacturerList: any =[];

  scrollCoverageTypeSync: boolean = false;
  coverageTypePageNumber: number;
  coverageTypeList: any = [];

  scrollContractTypeSync: boolean = false;
  contractTypePageNumber: number;
  contractTypeList: any = [];

  mandatoryString  :string = '*';

  searchKey: any = '';
  recordsPerPageForCombo: string;

  isSubmitButtonDisabled = false;

  intervalBasedContract = [
    { id: 1, name: '0-30 DAYS' },
    { id: 2, name: '31-60 DAYS' },
    { id: 3, name: '>60 DAYS' }
  ];

  contractingPartyType = [
    { id: 1, name: 'MANUFACTURER' },
    { id: 2, name: 'SUPPLIER' },
    { id: 3, name: 'CUSTOMER' }
  ];
  getData: getData;

  constructor(public dialogRef: MatDialogRef<ContractDetailedReportComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private assetOptimaConstants: AssetOptimaConstants,
              private userSession: UserSessionService,
              private commonService: CommonService,
              private assetOptimaServices: AssetOptimaServices) {

      this.locationPageNumber = 1;
      this.supplierListPageNumber = 1;
      this.customerListPageNumber = 1;
      this.manufacturerListPageNumber = 1;
      this.coverageTypePageNumber = 1;
      this.contractTypePageNumber = 1;
      this.getData = new getData();
     }

  ngOnInit() {
    this.initializeFormGroup();
    this.setValueToFormGroup();
    this.contractFormGroup.controls.reportType.setValue("Contract Detailed Report");
  }

  initializeFormGroup() {
    this.contractFormGroup = new FormGroup({
      reportType: new FormControl(''),
      contractHdrId: new FormControl(0),
      contractName: new FormControl(''),
      contractNo: new FormControl(''),
      contractingPartyType: new FormControl('SUPPLIER'),
      contractPartyId: new FormControl(0),
      contractPartyName: new FormControl(''),
      contractType: new FormControl(''),
      coverageType: new FormControl(''),
      contractStartDt: new FormControl(''),
      contractStartDtDisp: new FormControl(''),
      contractEndDt: new FormControl(''),
      contractEndDtDisp: new FormControl(''),
      expiryPriorNotifyDays: new FormControl(0),
      expiredContracts: new FormControl(''),
      intervalBasedContract: new FormControl(''),

      searchValue: new FormControl(''),
      searchValue1: new FormControl(''),
      locationName: new FormControl(''),
      locationId: new FormControl(0),
      direction: new FormControl(''),
      recordsPerPage: new FormControl(0),
      columnName: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      createdDt: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedDtDisp: new FormControl(''),
    });
  }


  setValueToFormGroup() {
    this.contractFormGroup.controls.searchValue.setValue(this.data.screenName);
    this.contractFormGroup.controls.searchValue1.setValue(this.data.title);
    this.contractFormGroup.controls.locationName.setValue(this.userSession.getUserLocationName());
    this.contractFormGroup.controls.locationId.setValue(this.userSession.getUserLocationId());
    this.contractFormGroup.controls.recordsPerPage.setValue(100);
    this.contractFormGroup.controls.columnName.setValue('updatedDt');
    this.contractFormGroup.controls.direction.setValue('desc');

  }

  
  loadLocationComboData(searchValue) {
    this.locationsync =  true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';   
    this.commonService.getComboResults(this.assetOptimaServices.listAllUserLocForCombo, searchValue.term, '', '', this.recordsPerPageForCombo, this.locationPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.locationPageNumber , this.locationCombo , data.responseData.comboList)
        this.locationPageNumber = this.getData.pageNumber;
        this.locationCombo = this.getData.dataList;
        this.locationsync = false;     
      }
    );
  }

  selectedLocationData(event) {
    if (event === undefined) {
      this.contractFormGroup.controls.locationId.setValue(0);
      this.contractFormGroup.controls.locationName.setValue('');
      this.locationPageNumber = 1;
    }else{
      this.contractFormGroup.controls.locationId.setValue(event.locationId);
      this.contractFormGroup.controls.locationName.setValue(event.locDisplayField);
    }
  } 

  changePartyValidation(){    
    this.contractFormGroup.controls["contractPartyId"].setValue(0); 
    this.contractFormGroup.controls["contractPartyName"].setValue(''); 
  }

  listOfSupplier(searchValue) {
    this.scrollSuppliersync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllSupplierNameCombo, searchValue.term, '', '', this.recordsPerPageForCombo, this.supplierListPageNumber,'').subscribe(
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
      this.contractFormGroup.controls.supplierId.setValue(0);
      this.contractFormGroup.controls.supplierName.setValue('');
      this.supplierListPageNumber = 1;
    } else {
      this.contractFormGroup.controls.supplierId.setValue(event.supplierId);
      this.contractFormGroup.controls.supplierName.setValue(event.supplierName);
    }
  }

  listOfCustomer(searchValue) {
    this.scrollCustomersync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllCustomerCombo.sams', searchValue.term, '', '', 
     this.recordsPerPageForCombo, this.customerListPageNumber,'','CUSTOMER').subscribe(
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
      this.contractFormGroup.controls.contractPartyId.setValue(0);
      this.contractFormGroup.controls.contractPartyName.setValue('');
      this.customerListPageNumber = 1;
    } else {
      this.contractFormGroup.controls.contractPartyId.setValue(event.customerId);
      this.contractFormGroup.controls.contractPartyName.setValue(event.customerName);
    }
  }

  listOfManufacturer(searchValue) {
    this.scrollManufacturersync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfManufacturerCombo, searchValue.term, '', '', this.recordsPerPageForCombo, this.manufacturerListPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.manufacturerListPageNumber , this.manufacturerList , data.responseData.comboList)
        this.manufacturerListPageNumber = this.getData.pageNumber;
        this.manufacturerList = this.getData.dataList;
        this.scrollManufacturersync = false; 
      }
    );                              
  }

  setManufacturerData(event) {
    if (event === undefined) {
      this.contractFormGroup.controls.contractPartyId.setValue(0);
      this.contractFormGroup.controls.contractPartyName.setValue('');
      this.manufacturerListPageNumber = 1;
    } else {
      this.contractFormGroup.controls.contractPartyId.setValue(event.manufacturerId);
      this.contractFormGroup.controls.contractPartyName.setValue(event.manufacturerName);
    }
  }

  listOfCoverageType(searchValue) {
    this.scrollCoverageTypeSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllCoverageTypeCombo.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.coverageTypePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.coverageTypePageNumber , this.coverageTypeList , data.responseData.comboList)
        this.coverageTypePageNumber = this.getData.pageNumber;
        this.coverageTypeList = this.getData.dataList;
        this.scrollCoverageTypeSync = false; 
      }
    );
  }

  setCoverageType(event) {
    if (event === undefined) {
      this.contractFormGroup.controls.coverageType.setValue('');
      this.coverageTypePageNumber = 1;
    } else{
      this.contractFormGroup.controls.coverageType.setValue(event.coverageTypeName); 
    }
  }

  listOfContractType(searchValue) {
    this.scrollContractTypeSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllContractTypeCombo.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.contractTypePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.contractTypePageNumber , this.contractTypeList , data.responseData.comboList)
        this.contractTypePageNumber = this.getData.pageNumber;
        this.contractTypeList = this.getData.dataList;
        this.scrollContractTypeSync = false; 
      }
    );
  }

  setContractType(event) {
    if (event === undefined) {   
      this.contractFormGroup.controls.contractType.setValue('');     
      this.contractTypePageNumber = 1;
    } else{
      this.contractFormGroup.controls.contractType.setValue(event.contractTypeName);
    }
  }

  dateValidationinstall(event) {
    return false;
  }

  submit() {
    this.dialogRef.close(this.contractFormGroup.getRawValue());
  }

  clear() {
    this.initializeFormGroup();
    this.setValueToFormGroup();
  }

  close() {
    this.dialogRef.close();
  }

  hideOptions(event){
    if(event.checked === true){
      this.contractFormGroup.controls.supplierId.setValue(0);
      this.contractFormGroup.controls.supplierName.setValue('');
      this.contractFormGroup.controls.contractName.setValue('');
      this.contractFormGroup.controls.contractType.setValue('');
      this.contractFormGroup.controls.coverageType.setValue('');
      this.contractFormGroup.controls.contractStartDtDisp.setValue('');
      this.contractFormGroup.controls.contractEndDtDisp.setValue('');
      this.contractFormGroup.controls.expiryPriorNotifyDays.setValue(0);
      this.contractFormGroup.controls.contractingPartyType.setValue('');
      this.contractFormGroup.controls.contractPartyId.setValue(0);
      this.contractFormGroup.controls.contractPartyName.setValue('');
      this.contractFormGroup.controls.contractNo.setValue('');
      this.contractFormGroup.controls.supplierName.disable();
      this.contractFormGroup.controls.contractNo.disable();
      this.contractFormGroup.controls.contractName.disable();
      this.contractFormGroup.controls.contractType.disable();
      this.contractFormGroup.controls.coverageType.disable();
      this.contractFormGroup.controls.contractStartDtDisp.disable();
      this.contractFormGroup.controls.contractEndDtDisp.disable();
      this.contractFormGroup.controls.expiryPriorNotifyDays.disable();
      this.contractFormGroup.controls.contractingPartyType.disable();
      this.contractFormGroup.controls.contractPartyName.disable();
    }else if(event.checked === false){
      this.contractFormGroup.controls.supplierName.enable();
      this.contractFormGroup.controls.contractName.enable();   
      this.contractFormGroup.controls.contractType.enable();
      this.contractFormGroup.controls.coverageType.enable();
      this.contractFormGroup.controls.contractNo.enable();  
      this.contractFormGroup.controls.contractStartDtDisp.enable();
      this.contractFormGroup.controls.contractEndDtDisp.enable();
      this.contractFormGroup.controls.expiryPriorNotifyDays.enable();
      this.contractFormGroup.controls.contractingPartyType.enable();
      this.contractFormGroup.controls.contractPartyName.enable();
    }
  }

  getSubmitButtonStatus() {
    if((this.contractFormGroup.controls.reportType.value != null && this.contractFormGroup.controls.reportType.value != ""))
       this.isSubmitButtonDisabled = false;
     else 
       this.isSubmitButtonDisabled = true;
 
    return this.isSubmitButtonDisabled;
  }

}

