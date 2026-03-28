import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SupplierLocationModel } from 'src/app/Model/master/supplier-location';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SupplierSiteRegistrationComponent } from '../supplier-site-registration/supplier-site-registration.component';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { DeleteConfirmationComponent } from 'src/app/Components/Common-components/delete-confirmation/delete-confirmation.component';
import { SupplierCreateComponent } from '../supplier-create/supplier-create.component';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { SupplierSiteContactCreateComponent } from '../supplier-site-contact-create/supplier-site-contact-create.component';
import { getData } from 'src/app/Model/common/fetchListData';

@Component({
  selector: 'app-supplier-site-create',
  templateUrl: './supplier-site-create.component.html',
  styleUrls: ['./supplier-site-create.component.css']
})
export class SupplierSiteCreateComponent implements OnInit {

  step = 0;

  supplierSiteDispCol = ['sno', 'registrationName', 'registrationNo', 'action'];
  supplierName: string;

  supplierRegistrationDataSourceTempPush: any = [];
  disableClearButton: boolean = false;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  @ViewChild('supplierSite') supplierSiteFocus: ElementRef;
  @ViewChild('streetFocus') streetFocusRef: ElementRef;
  @ViewChild('website') websiteFocus: ElementRef;
  @ViewChild('contactPerson') contactPersonFocus: ElementRef;

  public supplierSite: SupplierLocationModel;

  supplierSiteForm: FormGroup;

  supplierRegistrationDataSource = new MatTableDataSource<any>();

  paymentMethod = [
    { id: 1, name: 'CASH' },
    { id: 2, name: 'CARD' },
    { id: 3, name: 'CHEQUE' },
    { id: 4, name: 'RTGS/NEFT' },
  ];

  scrollCountrysync: boolean = false;
  scrollStatesync: boolean = false;
  scrollCurrencyCodesync: boolean = false;
  scrollCitysync: boolean = false;

  formOneValid: boolean = false;  // valid if form one
  formOneDirty: boolean = false;  // make dirty form one touched
  formTwoValid: boolean = false;  // valid if form two
  formTwoDirty: boolean = false;  // make dirty form two touched
  formThreeValid: boolean = false;
  formThreeDirty: boolean = false;

  countryPageNumber: number;
  statePageNumber: number;
  cityPageNumber: number;
  currencyCodePageNumber: number;
  modeDisplay: boolean = false;

  currencycdList: any = [];
  states: any = [];
  countries: any = [];
  cities: any = [];

  card1: boolean = true;
  card2: boolean = false;
  card3: boolean = false;
  tempValue: String = '';
  ErrorMsg: String = '';
  limitCount: any;
  modelSupplierSite: boolean = false;

  selectedIndex: number = 0;
  maxNumberOfTabs: number = 4;


  sourceHeadingDisplay: string = '';
  searchKey: any = '';

  supplierSiteContactInfoDataSourceTempPush: any = [];
  supplierSiteContactInfoDataSource = new MatTableDataSource<any>();
  supplierSiteContactInfoDispCol = ['sno', 'supplierSiteContactPerson', 'supplierSitePersonPhoneNo', 'supplierSiteContactEmailId',
    'supplierSitePersonDesignation', 'action'];
  getData: getData;
  displayButton: string = 'Add';


  constructor(public dialogRef: MatDialogRef<SupplierCreateComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private dialog: MatDialog,
    private commonService: CommonService,
    private serviceName: AssetOptimaServices,
    private validationService: AssetOptimaConstants,
    private detectorRefs: ChangeDetectorRef,
    private cdr: ChangeDetectorRef,
  ) {
    this.countryPageNumber = 1;
    this.statePageNumber = 1;
    this.currencyCodePageNumber = 1;
    this.cityPageNumber = 1;
  }

  ngOnInit() {
    this.supplierRegistrationDataSource.data = [];
    this.supplierSiteContactInfoDataSource.data = [];
    this.supplierSiteForm = new FormGroup({
      supplierLocationId: new FormControl(''),
      supplierId: new FormControl(''),
      supplierSiteName: new FormControl(this.data.supplierName, [Validators.required, Validators.maxLength(100)]),
      suppLocAddress1: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      suppLocAddress2: new FormControl(''),
      suppLocArea: new FormControl('',[Validators.maxLength(100)]),
      suppLocCity: new FormControl('', [Validators.required]),
      suppLocState: new FormControl('', [Validators.required]),
      suppLocCountry: new FormControl('', [Validators.required]),
      suppLocPinCode: new FormControl('', [Validators.maxLength(10)]),  //same
      companyRegistrationNumber: new FormControl(''),
      taxRegistrationName1: new FormControl(''),
      taxRegistrationName2: new FormControl(''),
      taxRegistrationName3: new FormControl(''),
      mobileNumber: new FormControl('', [Validators.maxLength(15), Validators.minLength(10), Validators.pattern(this.validationService.phoneNumberValidation)]),  //same
      suppLocEmail: new FormControl('', [Validators.maxLength(50), Validators.pattern(this.validationService.emailValidation)]),
      suppLocCurCd: new FormControl(null, [Validators.required]),
      suppLocAttribute1: new FormControl(''),
      suppLocAttribute2: new FormControl(''),
      suppLocAttribute3: new FormControl(''),
      suppLocAttribute4: new FormControl(''),
      suppLocAttribute5: new FormControl(''),
      active: new FormControl(true),
      createdBy: new FormControl(''),
      createdDtDisp: new FormControl(''),
      createdDt: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      pageNumber: new FormControl(''),
      recordsPerPage: new FormControl(''),
      supplierSiteWebSite: new FormControl(''),

      contactPerson: new FormControl('',[Validators.maxLength(15)]),
      landLineNumber: new FormControl(''),
      supplierSiteContactEmailId: new FormControl('', [Validators.pattern(this.validationService.emailValidation), Validators.maxLength(50)]),
      supplierSitePersonPhoneNo: new FormControl('', [Validators.maxLength(15), Validators.minLength(10), Validators.pattern(this.validationService.phoneNumberValidation)]),

      supplierRegList: new FormControl([]),
      supplierSiteContactList: new FormControl([]),
      suppLocCityId: new FormControl(0),
      suppLocStateId: new FormControl(0),
      suppLocCountryId: new FormControl(0),
      sourceScreen: new FormControl(''),
      paymentTerms: new FormControl(''),
      paymentMethod: new FormControl(''),
      isServiceCenter: new FormControl(false),

    })
    this.supplierSiteForm.controls['suppLocState'].disable();
    this.supplierSiteForm.controls['suppLocCity'].disable();

    if (this.data.mode === 'view') {
      this.supplierSiteForm.disable();
      this.modelSupplierSite = true;
    } else if (this.data.mode === 'edit') {
      this.displayButton = "Update";
      this.supplierSiteForm.controls['suppLocState'].enable();
      this.supplierSiteForm.controls['suppLocCity'].enable();
    }
    this.countryPageNumber = 1;
    this.statePageNumber = 1;
    this.currencyCodePageNumber = 1;
    if (this.data.sourceScreen === 'supplier') {
      this.sourceHeadingDisplay = 'Supplier Site Name';
    } else {
      this.sourceHeadingDisplay = 'Customer Site Name';
    }

  }

  ngAfterViewInit() {
    this.commonService.setFormFocus(this.supplierSiteFocus);
    if (this.data.supplierSite != 0) {
      this.supplierSiteForm.patchValue(this.data.supplierSite);
      this.supplierRegistrationDataSource.data = this.data.supplierSite.supplierRegList;
      this.supplierSiteContactInfoDataSource.data = this.data.supplierSite.supplierSiteContactList;
      this.tempValue = this.data.supplierSite.suppLocArea != null ? this.data.supplierSite.suppLocArea : '';
      this.formOneValidation();
      this.formThreeValidation();
      this.disableClearButton = true;
    } else {
      this.tempValue = this.data.supplierSite.suppLocArea != null ? this.data.supplierSite.suppLocArea : '';
    }
    this.cdr.detectChanges();
  }


  listOfCurrencyCd(searchValue) {
    this.scrollCurrencyCodesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.serviceName.listOfCurCdCombo, searchValue.term, '', '', this.limitCount, this.currencyCodePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.currencyCodePageNumber , this.currencycdList , data.responseData.comboList)
        this.currencyCodePageNumber = this.getData.pageNumber;
        this.currencycdList = this.getData.dataList;
        this.scrollCurrencyCodesync = false;
      }
    );
  }

  getStateData(searchValue) {
    this.scrollStatesync = true;
    const suppLocCountryId = this.supplierSiteForm.controls.suppLocCountryId.value;
    if( suppLocCountryId > 0){
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '50' : '';
    this.commonService.getComboResults(this.serviceName.listOfStateCombo, searchValue.term, suppLocCountryId, '',
    this.limitCount,this.statePageNumber,
    this.supplierSiteForm.controls['suppLocCountry'].value !== 0 ? this.supplierSiteForm.controls['suppLocCountry'].value : '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.statePageNumber , this.states , data.responseData.comboList)
          this.statePageNumber = this.getData.pageNumber;
          this.states = this.getData.dataList;
          this.scrollStatesync = false;
        }
      );
    }else {
      this.states = [];
      this.statePageNumber = 1;
      this.scrollStatesync = false;
      this.commonService.openToastWarningMessage(`Kindly Select The "Country".`);
    }
  }

  getCountryData(searchValue) {
    this.scrollCountrysync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '50' : '';
    this.commonService.getComboResults(this.serviceName.listOfAllCountryForCombo, searchValue.term, '', '', this.limitCount, this.countryPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.countryPageNumber , this.countries , data.responseData.comboList)
        this.countryPageNumber = this.getData.pageNumber;
        this.countries = this.getData.dataList;
        this.scrollCountrysync = false;
      });
  }

  exit() {
    this.dialogRef.close();
  }

  setStep(index: number) {
    this.step = index;
  }

  // Move to Next Tab
  nextStep() {
    if (this.selectedIndex == 0) {
      this.disableError();
    }
    if (this.selectedIndex != this.maxNumberOfTabs) {
      this.selectedIndex = this.selectedIndex + 1;
    }
  }

  previousStep() {
    if (this.selectedIndex != 0) {
      this.selectedIndex = this.selectedIndex - 1;
    }
  }

  addSupplierSite() {
    this.supplierSiteForm.controls.supplierRegList.setValue(this.supplierRegistrationDataSource.data);
    this.supplierSiteForm.controls.supplierSiteContactList.setValue(this.supplierSiteContactInfoDataSource.data);
    this.dialogRef.close(this.supplierSiteForm.value);
  }

  saveUpdateRegistration(registration, index) {
    let dialogRef = this.dialog.open(SupplierSiteRegistrationComponent, {
      height: 'auto',
      width: '350px',
      data: {
        'registration': registration
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.supplierRegistrationDataSourceTempPush = this.supplierRegistrationDataSource.data;
         let duplicatePresent = this.supplierRegistrationDataSourceTempPush.findIndex(obj=> ((((obj.registrationName).trim()).toLowerCase()) == (((data.registrationName).trim()).toLowerCase()))) === -1;

          if (this.supplierRegistrationDataSource.data.length === 0 || duplicatePresent) {
            this.checkIsEmpty((((data.registrationName).trim()).toLowerCase()) , data);
          }
          else{
            this.commonService.openToastWarningMessage("Registration Name already exists.");
          }
        }
      });
  }

  checkIsEmpty(regName , data){
    if(regName !== ""){
      this.supplierRegistrationDataSourceTempPush.push(data);
      this.supplierRegistrationDataSource.data = this.supplierRegistrationDataSourceTempPush;
    }else{
      this.commonService.openToastWarningMessage("Registration Name is Invalid.");
    }
  }

  disableError() {
    this.supplierSiteForm.controls.suppLocAddress1.setErrors(null);
    this.supplierSiteForm.controls.suppLocAddress1.markAsUntouched();

    this.supplierSiteForm.controls.suppLocArea.setErrors(null);
    this.supplierSiteForm.controls.suppLocArea.markAsUntouched();

    this.supplierSiteForm.controls.suppLocCity.setErrors(null);
    this.supplierSiteForm.controls.suppLocCity.markAsUntouched();

    this.supplierSiteForm.controls.suppLocPinCode.setErrors(null);
    this.supplierSiteForm.controls.suppLocPinCode.markAsUntouched();

    this.supplierSiteForm.controls.suppLocEmail.setErrors(null);
    this.supplierSiteForm.controls.suppLocEmail.markAsUntouched();

    this.supplierSiteForm.controls.mobileNumber.setErrors(null);
    this.supplierSiteForm.controls.mobileNumber.markAsUntouched();

    this.supplierSiteForm.controls.contactPerson.setErrors(null);
    this.supplierSiteForm.controls.contactPerson.markAsUntouched();

    this.supplierSiteForm.controls.supplierSiteContactEmailId.setErrors(null);
    this.supplierSiteForm.controls.supplierSiteContactEmailId.markAsUntouched();

    this.supplierSiteForm.controls.supplierSitePersonPhoneNo.setErrors(null);
    this.supplierSiteForm.controls.supplierSitePersonPhoneNo.markAsUntouched();

  }


  deleteRegistration(deleteid, index) {
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Registration Info'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          if (deleteid <= 0 || deleteid === undefined) {
            this.supplierRegistrationDataSourceTempPush = this.supplierRegistrationDataSource.data;
            this.supplierRegistrationDataSourceTempPush.splice(index, 1);
            this.supplierRegistrationDataSource.data = this.supplierRegistrationDataSourceTempPush;
            this.detectorRefs.detectChanges();
            this.refreshRegistrationTable();
          } else {
            this.commonService.commonGetService('deleteSupplerSiteReg.sams', deleteid).subscribe(
              data => {
                if (data.success) {
                  // this.commonService.openToastSuccessMessage(data.message);
                  this.supplierRegistrationDataSourceTempPush = this.supplierRegistrationDataSource.data;
                  this.supplierRegistrationDataSourceTempPush.splice(index, 1);
                  this.supplierRegistrationDataSource.data = this.supplierRegistrationDataSourceTempPush;
                  this.detectorRefs.detectChanges();
                  this.refreshRegistrationTable();
                } else {
                  this.commonService.openToastErrorMessage(data.message);
                }
              }
            );
          }
        }
      });
  }




  refreshRegistrationTable() {
    let tempArray = this.supplierRegistrationDataSource;
    this.supplierRegistrationDataSource.data = [];
    for (var i = 0; i < tempArray.data.length; i++) {
      this.supplierRegistrationDataSource.data.push(tempArray[i]);
      this.detectorRefs.detach();
    }
    this.detectorRefs.detectChanges();
  }

  //Check Supplier Site existence
  checkForSupplierSiteAreaExistence() {
    if (((this.tempValue != null || this.tempValue != '') ? this.tempValue.toLowerCase() : '') === ((this.supplierSiteForm.controls.suppLocArea.value != null) ? this.supplierSiteForm.controls.suppLocArea.value.toLowerCase() : '')) {

    } else {
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.master.SupplierLocationInfoTO";
      constraintData.constraints = {
        'suppLocArea': this.supplierSiteForm.controls.suppLocArea.value.toLowerCase(),
        'supplierId': this.supplierSiteForm.controls.supplierId.value

      };
      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if (!data.success) {
            //show the warning invalidate the form group
            this.ErrorMsg = data.message;
            this.supplierSiteForm.controls.suppLocArea.setErrors(Validators.minLength);
            this.supplierSiteForm.controls.suppLocArea.setErrors({ "notUnique": true });
          } else {
            this.ErrorMsg = '';
            this.supplierSiteForm.controls.suppLocArea.setErrors(null);
          }

        });
    }

  }

  getCurrencyCodeData(event) {
    if (event === undefined) {
      this.supplierSiteForm.controls['suppLocCurCd'].setValue('');
      this.currencyCodePageNumber = 1;
    } else {
      this.supplierSiteForm.controls['suppLocCurCd'].setValue(event.curCd);
    }
  }

  setStateData(event) {
    if (event === undefined) {
      this.supplierSiteForm.controls['suppLocState'].setValue('');
      this.supplierSiteForm.controls['suppLocStateId'].setValue(0);
      this.supplierSiteForm.controls['suppLocCity'].setValue('');
      this.supplierSiteForm.controls['suppLocCityId'].setValue(0);
      this.supplierSiteForm.controls['suppLocCity'].disable();
      this.statePageNumber = 1;
      this.cityPageNumber = 1;
      this.cities = [];
    } else {
      this.supplierSiteForm.controls['suppLocState'].setValue(event.stateName);
      this.supplierSiteForm.controls['suppLocStateId'].setValue(event.stateId);
      this.supplierSiteForm.controls['suppLocCity'].setValue('');
      this.supplierSiteForm.controls['suppLocCityId'].setValue(0);
      this.supplierSiteForm.controls['suppLocCity'].enable();
      this.cityPageNumber = 1;
      this.cities = [];
    }
  }

  setCountryData(event) {
    if (event === undefined) {
      this.supplierSiteForm.controls['suppLocCity'].setValue('');
      this.supplierSiteForm.controls['suppLocCityId'].setValue(0);
      this.supplierSiteForm.controls['suppLocCity'].disable();
      this.supplierSiteForm.controls['suppLocState'].setValue('');
      this.supplierSiteForm.controls['suppLocStateId'].setValue(0);
      this.supplierSiteForm.controls['suppLocState'].disable();
      this.supplierSiteForm.controls['suppLocCountry'].setValue('');
      this.supplierSiteForm.controls['suppLocCountryId'].setValue(0);
      this.states = [];
      this.cities = [];
      this.cityPageNumber = 1;
      this.statePageNumber = 1;
      this.countryPageNumber = 1;
    } else {
      this.supplierSiteForm.controls['suppLocCountry'].setValue(event.countryName);
      this.supplierSiteForm.controls['suppLocCountryId'].setValue(event.countryId);
      this.supplierSiteForm.controls['suppLocState'].enable();
      this.states = [];
      this.statePageNumber = 1;
    }
  }

  changeTabValidation(event) {
    if (event.index == 0) {
      this.formOneValidation();
      this.websiteFocus.nativeElement.focus();
    }
    if (event.index == 1) {
      this.formOneValidation();
      this.streetFocusRef.nativeElement.focus();

    }
    if (event.index == 2) {
      this.formOneValidation();
      this.formThreeValidation();
      this.contactPersonFocus.nativeElement.focus();
    }
    if (event.index == 3) {
      this.formOneValidation();
      this.formThreeValidation();
    }
    this.cdr.detectChanges();
  }

  // Check validation based on form
  // form one validation (* in-order to check individual form dirty)
  formOneValidation() {
    this.formOneDirty = true;
    if ( // Form One Validation
      (this.supplierSiteForm.get('supplierSiteName').value != '') &&
      (this.supplierSiteForm.get('suppLocEmail').valid) &&
      (this.supplierSiteForm.get('mobileNumber').valid) &&
      this.supplierSiteForm.get('suppLocAddress1').valid &&
      this.supplierSiteForm.get('suppLocState').valid &&

      this.supplierSiteForm.get('suppLocArea').valid &&
      this.supplierSiteForm.get('suppLocCity').valid &&

      this.supplierSiteForm.get('suppLocCountry').valid &&
      this.supplierSiteForm.get('suppLocPinCode').valid &&
      this.supplierSiteForm.get('suppLocCurCd').valid
    ) {
      this.formOneValid = true;
    } else {
      this.formOneValid = false;
    }
  }


  // Check validation based on form
  // form one validation (* in-order to check individual form dirty)
  formThreeValidation() {
    this.formThreeDirty = true;
    // if ( // Form One Validation
    //   this.supplierSiteForm.get('contactPerson').valid &&
    //   this.supplierSiteForm.get('supplierSiteContactEmailId').valid &&
    //   this.supplierSiteForm.get('supplierSitePersonPhoneNo').valid

    // ) {
    //   this.formThreeValid = true;
    // } else {
    //   this.formThreeValid = false;
    // }
  }

  clear() {
    this.supplierSiteForm.reset();
    this.supplierSiteForm.updateValueAndValidity();
    this.supplierRegistrationDataSource.data = [];
    this.supplierSiteContactInfoDataSource.data = [];
  }

  saveUpdateContactInfo(contactInfo, index) {
    let dialogRef = this.dialog.open(SupplierSiteContactCreateComponent, {
      height: 'auto',
      width: '350px',
      data: {
        'contactInfo': contactInfo
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          if (data !== null && data !== undefined && data !== '') {
            if (this.supplierSiteContactInfoDataSource.data.length != 0) {
              this.supplierSiteContactInfoDataSourceTempPush = this.supplierSiteContactInfoDataSource.data;
            }
            this.supplierSiteContactInfoDataSourceTempPush.push(data);
            this.supplierSiteContactInfoDataSource.data = this.supplierSiteContactInfoDataSourceTempPush;
          }
        }
      });
  }

  deleteContactInfo(deleteid, index) {
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Contact Info'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          if (deleteid <= 0 || deleteid === undefined) {
            this.supplierSiteContactInfoDataSourceTempPush = this.supplierSiteContactInfoDataSource.data;
            this.supplierSiteContactInfoDataSourceTempPush.splice(index, 1);
            this.supplierSiteContactInfoDataSource.data = this.supplierSiteContactInfoDataSourceTempPush;
            this.detectorRefs.detectChanges();
          } else {
            this.commonService.commonGetService('deleteSupplerSiteContact.sams', deleteid).subscribe(
              data => {
                if (data.success) {
                  this.supplierSiteContactInfoDataSourceTempPush = this.supplierSiteContactInfoDataSource.data;
                  this.supplierSiteContactInfoDataSourceTempPush.splice(index, 1);
                  this.supplierSiteContactInfoDataSource.data = this.supplierSiteContactInfoDataSourceTempPush;
                  this.detectorRefs.detectChanges();
                } else {
                  this.commonService.openToastErrorMessage(data.message);
                }
              }
            );
          }
        }
      });
  }

  supplierSiteCityMethod(searchValue) {
    const suppLocStateId = this.supplierSiteForm.controls.suppLocStateId.value;
    this.scrollCitysync = true;
    if( suppLocStateId > 0){
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '50' : '';
    this.commonService.getComboResults(this.serviceName.listOfCityCombo, searchValue.term, '', '', this.limitCount, this.cityPageNumber, this.supplierSiteForm.controls['suppLocState'].value !== null ? this.supplierSiteForm.controls['suppLocState'].value : '', this.supplierSiteForm.controls['suppLocCountry'].value !== null ? this.supplierSiteForm.controls['suppLocCountry'].value : '').subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.cityPageNumber , this.cities , data.responseData.comboList)
        this.cityPageNumber = this.getData.pageNumber;
        this.cities = this.getData.dataList;
        this.scrollCitysync = false;
      }
    );
  }else {
    this.cities = [];
    this.cityPageNumber = 1;
    this.scrollCitysync = false;
    if(this.supplierSiteForm.controls['suppLocCountryId'].value>0 && suppLocStateId===0){
      this.commonService.openToastWarningMessage(`Kindly Select The "State".`);

    }else if(this.supplierSiteForm.controls['suppLocCountryId'].value===0 && suppLocStateId===0){
      this.commonService.openToastWarningMessage(`Kindly Select The "Country" And The "State".`);

    }
  }
}

  setCityData(event) {
    if (event === undefined) {
      this.supplierSiteForm.controls['suppLocCity'].setValue('');
      this.supplierSiteForm.controls['suppLocCityId'].setValue(0);
      this.countries = [];
      this.states = [];
      this.statePageNumber = 1;
      this.countryPageNumber = 1;
      this.cityPageNumber = 1;
    } else {
      this.supplierSiteForm.controls['suppLocCity'].setValue(event.cityName);
      this.supplierSiteForm.controls['suppLocCityId'].setValue(event.cityId);
      this.supplierSiteForm.controls['suppLocState'].setValue(event.stateName);
      this.supplierSiteForm.controls['suppLocStateId'].setValue(event.stateId);
      this.cityPageNumber = 1;
      this.cities = [];
    }
  }

}
