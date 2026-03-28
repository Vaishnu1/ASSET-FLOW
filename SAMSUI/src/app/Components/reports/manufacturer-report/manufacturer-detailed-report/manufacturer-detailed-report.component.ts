import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { getData } from 'src/app/Model/common/fetchListData';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-manufacturer-detailed-report',
  templateUrl: './manufacturer-detailed-report.component.html',
  styleUrls: ['./manufacturer-detailed-report.component.css']
})
export class ManufacturerDetailedReportComponent implements OnInit {

  manufacturerFormGroup: FormGroup;

  manufacturerReportsList = ['Manufacturer Detailed Report'];

  manufacturerNameScrollSync: boolean = false;
  limitCount: any;
  manufacturerNamePageNumber: number;
  manufacturerNameList: any = [];

  manufacturerTypeScrollSync: boolean = false;
  manufacturerTypePageNumber: number;
  manufacturerTypeList: any = [];

  manufacturerCodeScrollSync: boolean = false;
  manufacturerCodePageNumber: number;
  manufacturerCodeList: any = [];

  countryScrollsync: boolean = false;
  countryPageNumber: number;
  countries: any = [];

  stateScrollsync: boolean = false;
  statePageNumber: number;
  statesList: any = [];

  mandatoryString  :string = '*';

  isSubmitButtonDisabled: boolean = false;

  searchKey: any = '';
  recordsPerPageForCombo: string;
  getData: getData;

  constructor(public dialogRef: MatDialogRef<ManufacturerDetailedReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private assetOptimaConstants: AssetOptimaConstants,
    private commonService: CommonService,
    private userSession: UserSessionService,
    private assetOptimaServices: AssetOptimaServices) {
      this.getData = new getData();
      this.manufacturerNamePageNumber = 1;
      this.countryPageNumber = 1;
      this.manufacturerCodePageNumber = 1;
      this.statePageNumber = 1;
     }

  ngOnInit() {
    this.initializeFormGroup();
    this.setValueToFormGroup();
    this.manufacturerFormGroup.controls.reportType.setValue("Manufacturer Detailed Report");
  }

  initializeFormGroup() {
    this.manufacturerFormGroup = new FormGroup({
      reportType: new FormControl(''),
      manufacturerId: new FormControl(0),
      manufacturerName: new FormControl(''),
      address: new FormControl(''),
      locCountry: new FormControl(''),
      locCountryId: new FormControl(0),
      locState: new FormControl(''),
      locStateId: new FormControl(0),
      manufacturerCode: new FormControl(''),
      source: new FormControl(''),
      manufacturerChangeOccurred: new FormControl(''),
      manufacturerStatus: new FormControl(''),
      searchValue: new FormControl(''),
      searchValue1: new FormControl(''),
      locationName: new FormControl(''),
      locationId: new FormControl(0),
      direction: new FormControl(''),
      recordsPerPage: new FormControl(0),
      columnName: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedDtDisp: new FormControl(''),
    });
  }


  setValueToFormGroup() {

    this.manufacturerFormGroup.controls.searchValue.setValue(this.data.screenName);
    this.manufacturerFormGroup.controls.searchValue1.setValue(this.data.title);
    this.manufacturerFormGroup.controls.locationName.setValue(this.userSession.getUserLocationName());
    this.manufacturerFormGroup.controls.locationId.setValue(this.userSession.getUserLocationId());
    this.manufacturerFormGroup.controls.recordsPerPage.setValue(100);
    this.manufacturerFormGroup.controls.columnName.setValue('updatedDt');
    this.manufacturerFormGroup.controls.direction.setValue('desc');

  }

  listOfManufacturerName(searchValue) {
    this.manufacturerNameScrollSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllManufacturerCombo.sams', searchValue.term, '', '', this.limitCount, this.manufacturerNamePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.manufacturerNamePageNumber , this.manufacturerNameList , data.responseData.comboList)
        this.manufacturerNamePageNumber = this.getData.pageNumber;
        this.manufacturerNameList = this.getData.dataList;
        this.manufacturerNameScrollSync = false; 
      }
    );
  }

  getManufacturerNameComboValue(event) {
    console.log(event);
    
    if (event === undefined) {
      this.manufacturerNamePageNumber = 1;

      this.manufacturerFormGroup.controls.manufacturerCode.setValue('');
      this.manufacturerFormGroup.controls.manufacturerCode.enable();

      this.manufacturerFormGroup.controls.locCountry.setValue('');
      this.manufacturerFormGroup.controls.locCountry.enable();

      this.manufacturerFormGroup.controls.locState.setValue('');
      this.manufacturerFormGroup.controls.locState.enable();
    } else {
      this.manufacturerFormGroup.controls.manufacturerId.setValue(event.manufacturerId);

      this.manufacturerFormGroup.controls.manufacturerCode.setValue(event.manufacturerCode);
      this.manufacturerFormGroup.controls.manufacturerCode.disable();

      this.manufacturerFormGroup.controls.locCountry.setValue(event.locCountry);
      this.manufacturerFormGroup.controls.locCountry.disable();

      this.manufacturerFormGroup.controls.locState.setValue(event.locState);
      this.manufacturerFormGroup.controls.locState.disable();
    }
  }

  getCountryList(searchValue){
    this.countryScrollsync = true;
    this.limitCount = (searchValue.term  === '' || searchValue.term === undefined || searchValue.term === null) ? '50' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllCountryForCombo, searchValue.term,'', '', this.limitCount, this.countryPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.countryPageNumber , this.countries , data.responseData.comboList)
        this.countryPageNumber = this.getData.pageNumber;
        this.countries = this.getData.dataList;
        this.countryScrollsync = false;
    });
  }

  getCountryData(event) {
    if (event == null || event == undefined) {
      this.manufacturerFormGroup.controls.locCountry.setValue('');
    } else {
      this.manufacturerFormGroup.controls.locCountry.setValue(event.countryName);
      this.manufacturerFormGroup.controls.locCountryId.setValue(event.countryId);
    }
  }

  listOfManufacturerCode(searchValue) {
    this.manufacturerCodeScrollSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllManufacturerCodeCombo.sams', searchValue.term, '', '', this.limitCount, this.manufacturerCodePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.manufacturerCodePageNumber , this.manufacturerCodeList , data.responseData.comboList)
        this.manufacturerCodePageNumber = this.getData.pageNumber;
        this.manufacturerCodeList = this.getData.dataList;
        this.manufacturerCodeScrollSync = false; 
      }
    );
  }

  getManufacturerCodeComboValue(event) {
    if (event === undefined) {
      this.manufacturerCodePageNumber = 1;
    } else {
      this.manufacturerFormGroup.controls.manufacturerId.setValue(event.manufacturerId);
    }
  }


  getStateData(searchValue){
    const pmtCountryId = this.manufacturerFormGroup.controls.locCountryId.value;
    this.stateScrollsync = true;
    if(pmtCountryId > 0 ){
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '50' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfStateCombo, searchValue.term, pmtCountryId, '', this.limitCount, this.statePageNumber,pmtCountryId !== 0 ? pmtCountryId : '').subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.statePageNumber , this.statesList , data.responseData.comboList)
        this.statePageNumber = this.getData.pageNumber;
        this.statesList = this.getData.dataList;
        this.stateScrollsync = false;   
    }
    );
  }else{
      this.statesList = [];
      this.statePageNumber = 1;
      this.stateScrollsync = false;
      this.commonService.openToastWarningMessage("Kindly select country");
    }
  }

  selectedManufacturerStateComboValue(event) {
    if (event === undefined) {
      this.manufacturerFormGroup.controls.locState.setValue('');
      this.manufacturerFormGroup.controls.locStateId.setValue(0);
      this.statePageNumber = 1;
    } else {
      this.manufacturerFormGroup.controls.locState.setValue(event.stateName);
      this.manufacturerFormGroup.controls.locStateId.setValue(event.stateId);
    }

  }

  submit() {
    this.dialogRef.close(this.manufacturerFormGroup.getRawValue());
  }

  clear() {
    this.manufacturerFormGroup.enable();
    this.initializeFormGroup();
    this.setValueToFormGroup();
  }

  close() {
    this.dialogRef.close();
  }

  getSubmitButtonStatus() {
    if((this.manufacturerFormGroup.controls.reportType.value != null && this.manufacturerFormGroup.controls.reportType.value != ""))
       this.isSubmitButtonDisabled = false;
     else 
       this.isSubmitButtonDisabled = true;
 
    return this.isSubmitButtonDisabled;
  }

}
