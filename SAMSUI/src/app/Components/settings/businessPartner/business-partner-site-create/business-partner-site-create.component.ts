import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteConfirmationComponent } from 'src/app/Components/Common-components/delete-confirmation/delete-confirmation.component';
import { SupplierSiteContactCreateComponent } from 'src/app/Components/Master/supplier/supplier-site-contact-create/supplier-site-contact-create.component';
import { SupplierSiteRegistrationComponent } from 'src/app/Components/Master/supplier/supplier-site-registration/supplier-site-registration.component';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { getData } from 'src/app/Model/common/fetchListData';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { BusinessPartnerContactCreateComponent } from '../business-partner-contact-create/business-partner-contact-create.component';
import { BusinessPartnerRegCreateComponent } from '../business-partner-reg-create/business-partner-reg-create.component';

@Component({
  selector: 'app-business-partner-site-create',
  templateUrl: './business-partner-site-create.component.html',
  styleUrls: ['./business-partner-site-create.component.css']
})
export class BusinessPartnerSiteCreateComponent implements OnInit {

  countryPageNumber: number;
  statePageNumber: number;
  cityPageNumber: number;
  currencyCodePageNumber: number;

  scrollCountrysync: boolean = false;
  scrollStatesync: boolean = false;
  scrollCurrencyCodesync: boolean = false;
  scrollCitysync: boolean = false;

  modeDisplay: boolean = false;

  currencycdList: any = [];
  states: any = [];
  countries: any = [];
  cities: any = [];

  businessPartnerSiteForm: FormGroup;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();
  modelPartnerSite: boolean = false;
  modelBusinessPartnerSite : boolean = false;

  formOneValid: boolean = false;

  getData: getData;
  limitCount: any;

  selectedIndex:number;

  paymentMethod = [
    { id: 1, name: 'CASH' },
    { id: 2, name: 'CARD' },
    { id: 3, name: 'CHEQUE' },
    { id: 4, name: 'RTGS/NEFT' },
  ];

  partnerRegistrationDataSourceTempPush: any = [];
  partnerRegistrationDataSource = new MatTableDataSource<any>();
  partnerSiteDispCol = ['sno', 'registrationName', 'registrationNo', 'action'];

  displayButton: string = 'Add';

  formOneDirty: boolean = false;
  formThreeDirty: boolean = false;

  disableClearButton: boolean = false;

  partnerSiteContactInfoDataSourceTempPush: any = [];
  partnerSiteContactInfoDataSource = new MatTableDataSource<any>();
  partnerSiteContactInfoDispCol = ['sno', 'partnerSiteContactPerson', 'partnerSitePersonPhoneNo', 'partnerSiteContactEmailId',
    'partnerSitePersonDesignation', 'action'];

  constructor(public dialogRef: MatDialogRef<BusinessPartnerSiteCreateComponent>,
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

  ngOnInit(): void {
    this.businessPartnerSiteForm = new FormGroup({
      partnerSiteId : new FormControl(''),
      businessPartnerId : new FormControl(''),
      partnerSiteName: new FormControl(this.data.businessPartnerName, [Validators.required, Validators.maxLength(100)]),
      
      partnerSiteAddress1: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      partnerSiteAddress2: new FormControl(''),
      partnerSiteArea: new FormControl('',[Validators.maxLength(100)]),
      partnerSiteCity: new FormControl('', [Validators.required]),
      partnerSiteCityId: new FormControl('0'),
      partnerSiteState: new FormControl('', [Validators.required]),
      partnerSiteStateId: new FormControl('0'),
      partnerSiteCountry: new FormControl('', [Validators.required]),
      partnerSiteCountryId: new FormControl('0'),
      partnerSitePinCode: new FormControl('', [Validators.required,Validators.maxLength(10)]),  

      contactPersonName: new FormControl('', [Validators.maxLength(100)]),  
      partnerSiteContactEmailId: new FormControl('', [Validators.maxLength(50), Validators.pattern(this.validationService.emailValidation)]),
      partnerSitePersonPhoneNo: new FormControl('', [Validators.maxLength(15), Validators.minLength(10), Validators.pattern(this.validationService.phoneNumberValidation)]),  //same
      partnerSiteCurCd: new FormControl(null, [Validators.required]),
      partnerSiteWebSite: new FormControl(''),
      paymentTerms: new FormControl(''),
      paymentMethod: new FormControl(''),

      partnerSiteMobileNumber: new FormControl('', [Validators.maxLength(15), Validators.minLength(10), Validators.pattern(this.validationService.phoneNumberValidation)]),
      partnerSiteLandLineNumber: new FormControl('', [Validators.maxLength(15), Validators.minLength(10), Validators.pattern(this.validationService.phoneNumberValidation)]),
      partnerSiteEmailId: new FormControl('', [Validators.maxLength(50), Validators.pattern(this.validationService.emailValidation)]),

      active: new FormControl(true),
      isServiceCenterSite: new FormControl(false),
      isSupplierSite: new FormControl(false),
      isManufacturerSite: new FormControl(false),

      businessPartnerSiteRegList: new FormControl([]),
      businessPartnerSiteContactList: new FormControl([]),
      createdBy: new FormControl(''),
      createdDtDisp: new FormControl(''),
      createdDt: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      updatedDtDisp: new FormControl(''),
    });

    this.countryPageNumber = 1;
    this.statePageNumber = 1;
    this.currencyCodePageNumber = 1;
    this.cityPageNumber = 1;

    this.businessPartnerSiteForm.controls['partnerSiteState'].disable();
    this.businessPartnerSiteForm.controls['partnerSiteCity'].disable();

    if (this.data.mode === 'view') {
      this.businessPartnerSiteForm.disable();
      this.modelPartnerSite = true;
    } else if (this.data.mode === 'edit') {
      this.displayButton = "Update";
      this.businessPartnerSiteForm.controls['partnerSiteState'].enable();
      this.businessPartnerSiteForm.controls['partnerSiteCity'].enable();
    }
  }

  @ViewChild('partnerSiteNameFocus') partnerSiteNameFocus: ElementRef;

  ngAfterViewInit() {
    this.commonService.setFormFocus(this.partnerSiteNameFocus);
    if (this.data.businessPartnerSite != 0) {
      this.businessPartnerSiteForm.patchValue(this.data.businessPartnerSite);

      this.partnerRegistrationDataSource.data = this.data.businessPartnerSite.businessPartnerSiteRegList;
      this.partnerSiteContactInfoDataSource.data = this.data.businessPartnerSite.businessPartnerSiteContactList;

      this.formOneValidation();
      this.formThreeValidation();
      this.disableClearButton = true;
    } else {

    }
    this.cdr.detectChanges();
  }

  onPartnerEmailInput(event: any) {
    const inputValue = event.target.value.toLowerCase();
    event.target.value = inputValue;
    this.businessPartnerSiteForm.get('partnerSiteContactEmailId')?.setValue(inputValue, { emitEvent: false });
  }

  onPartnerSiteEmailInput(event: any) {
    const inputValue = event.target.value.toLowerCase();
    event.target.value = inputValue;
    this.businessPartnerSiteForm.get('partnerSiteEmailId')?.setValue(inputValue, { emitEvent: false });
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

  setCountryData(event) {
    if (event === undefined) {
      this.businessPartnerSiteForm.controls['partnerSiteCity'].setValue('');
      this.businessPartnerSiteForm.controls['partnerSiteCityId'].setValue(0);
      this.businessPartnerSiteForm.controls['partnerSiteCity'].disable();
      this.businessPartnerSiteForm.controls['partnerSiteState'].setValue('');
      this.businessPartnerSiteForm.controls['partnerSiteStateId'].setValue(0);
      this.businessPartnerSiteForm.controls['partnerSiteState'].disable();
      this.businessPartnerSiteForm.controls['partnerSiteCountry'].setValue('');
      this.businessPartnerSiteForm.controls['partnerSiteCountryId'].setValue(0);
      this.states = [];
      this.cities = [];
      this.cityPageNumber = 1;
      this.statePageNumber = 1;
      this.countryPageNumber = 1;
      this.currencyCodePageNumber=1;
    } else {
      this.businessPartnerSiteForm.controls['partnerSiteCountry'].setValue(event.countryName);
      this.businessPartnerSiteForm.controls['partnerSiteCountryId'].setValue(event.countryId);
      this.businessPartnerSiteForm.controls['partnerSiteState'].enable();
      this.states = [];
      this.statePageNumber = 1;
    }
  }

  getStateData(searchValue) {
    this.scrollStatesync = true;
    const partnerSiteCountryId = this.businessPartnerSiteForm.controls.partnerSiteCountryId.value;
    if( partnerSiteCountryId > 0){
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '50' : '';
    this.commonService.getComboResults(this.serviceName.listOfStateCombo, searchValue.term, partnerSiteCountryId, '',
    this.limitCount,this.statePageNumber,
    this.businessPartnerSiteForm.controls['partnerSiteCountry'].value !== 0 ? this.businessPartnerSiteForm.controls['partnerSiteCountry'].value : '').subscribe(
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

  setStateData(event) {
    if (event === undefined) {
      this.businessPartnerSiteForm.controls['partnerSiteState'].setValue('');
      this.businessPartnerSiteForm.controls['partnerSiteStateId'].setValue(0);
      this.businessPartnerSiteForm.controls['partnerSiteCity'].setValue('');
      this.businessPartnerSiteForm.controls['partnerSiteCityId'].setValue(0);
      this.businessPartnerSiteForm.controls['partnerSiteCity'].disable();
      this.statePageNumber = 1;
      this.cityPageNumber = 1;
      this.currencyCodePageNumber=1;
      this.cities = [];
    } else {
      this.businessPartnerSiteForm.controls['partnerSiteState'].setValue(event.stateName);
      this.businessPartnerSiteForm.controls['partnerSiteStateId'].setValue(event.stateId);
      this.businessPartnerSiteForm.controls['partnerSiteCity'].setValue('');
      this.businessPartnerSiteForm.controls['partnerSiteCityId'].setValue(0);
      this.businessPartnerSiteForm.controls['partnerSiteCity'].enable();
      this.cityPageNumber = 1;
      this.cities = [];
    }
  }

  partnerSiteCityMethod(searchValue) {
    const partnerSiteStateId = this.businessPartnerSiteForm.controls.partnerSiteStateId.value;
    this.scrollCitysync = true;
    if (partnerSiteStateId > 0) {
      this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '50' : '';
      this.commonService.getComboResults(this.serviceName.listOfCityCombo, searchValue.term, '', '', this.limitCount, this.cityPageNumber, this.businessPartnerSiteForm.controls['partnerSiteState'].value !== null ? this.businessPartnerSiteForm.controls['partnerSiteState'].value : '', this.businessPartnerSiteForm.controls['partnerSiteCountry'].value !== null ? this.businessPartnerSiteForm.controls['partnerSiteCountry'].value : '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.cityPageNumber, this.cities, data.responseData.comboList)
          this.cityPageNumber = this.getData.pageNumber;
          this.cities = this.getData.dataList;
          this.scrollCitysync = false;
        }
      );
    } else {
      this.cities = [];
      this.cityPageNumber = 1;
      this.scrollCitysync = false;
      if (this.businessPartnerSiteForm.controls['partnerSiteStateId'].value > 0 && partnerSiteStateId === 0) {
        this.commonService.openToastWarningMessage(`Kindly Select The "State".`);

      } else if (this.businessPartnerSiteForm.controls['partnerSiteCountryId'].value === 0 && partnerSiteStateId === 0) {
        this.commonService.openToastWarningMessage(`Kindly Select The "Country" And The "State".`);

      }
    }
  }

  setCityData(event) {
    if (event === undefined) {
      this.businessPartnerSiteForm.controls['partnerSiteCity'].setValue('');
      this.businessPartnerSiteForm.controls['partnerSiteCityId'].setValue(0);
      this.countries = [];
      this.states = [];
      this.statePageNumber = 1;
      this.countryPageNumber = 1;
      this.cityPageNumber = 1;
      this.currencyCodePageNumber=1;
    } else {
      this.businessPartnerSiteForm.controls['partnerSiteCity'].setValue(event.cityName);
      this.businessPartnerSiteForm.controls['partnerSiteCityId'].setValue(event.cityId);
      this.businessPartnerSiteForm.controls['partnerSiteState'].setValue(event.stateName);
      this.businessPartnerSiteForm.controls['partnerSiteStateId'].setValue(event.stateId);
      this.cityPageNumber = 1;
      this.cities = [];
    }
  }

  listOfCurrencyCd(searchValue) {
    this.scrollCurrencyCodesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.serviceName.listOfCurCdCombo, searchValue.term, '', '', this.limitCount, this.currencyCodePageNumber,'','').subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.currencyCodePageNumber , this.currencycdList , data.responseData.comboList)
        this.currencyCodePageNumber = this.getData.pageNumber;
        this.currencycdList = this.getData.dataList;
        this.scrollCurrencyCodesync = false;
      }
    );
  }

  getCurrencyCodeData(event) {
    if (event === undefined) {
      this.businessPartnerSiteForm.controls['partnerSiteCurCd'].setValue('');
      this.currencyCodePageNumber = 1;
    } else {
      this.businessPartnerSiteForm.controls['partnerSiteCurCd'].setValue(event.curCd);
      this.currencyCodePageNumber = 1;
      this.currencycdList = [];
    }
  }

  clear() {
    this.businessPartnerSiteForm.reset();
    this.businessPartnerSiteForm.updateValueAndValidity();
    this.partnerRegistrationDataSource.data = [];
    this.partnerSiteContactInfoDataSource.data = [];
  }

  exit() {
    this.dialogRef.close();
  }

  addBusinessPartnerSite () {

    this.businessPartnerSiteForm.controls.businessPartnerSiteRegList.setValue(this.partnerRegistrationDataSource.data);
    this.businessPartnerSiteForm.controls.businessPartnerSiteContactList.setValue(this.partnerSiteContactInfoDataSource.data);
    this.dialogRef.close(this.businessPartnerSiteForm.value);
  }

  formOneValidation() {
    this.formOneDirty = true;
    // if ( // Form One Validation
    //   (this.businessPartnerSiteForm.get('partnerSiteName').value != '') &&
    //   (this.businessPartnerSiteForm.get('partnerSiteContactEmailId').valid) &&
    //   (this.businessPartnerSiteForm.get('partnerSitePersonPhoneNo').valid) &&
    //   this.businessPartnerSiteForm.get('partnerSiteAddress1').valid &&
    //   this.businessPartnerSiteForm.get('partnerSiteState').valid &&

    //   this.businessPartnerSiteForm.get('partnerSiteArea').valid &&
    //   this.businessPartnerSiteForm.get('partnerSiteCity').valid &&

    //   this.businessPartnerSiteForm.get('partnerSiteCountry').valid &&
    //   this.businessPartnerSiteForm.get('partnerSitePinCode').valid &&
    //   this.businessPartnerSiteForm.get('partnerSiteCurCd').valid
    // ) {
    //   this.formOneValid = true;
    // } else {
    //   this.formOneValid = false;
    // }
    this.formOneValid = true;
  }

  saveUpdateRegistration(registration, index) {
    let dialogRef = this.dialog.open(BusinessPartnerRegCreateComponent, {
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
            this.partnerRegistrationDataSourceTempPush = this.partnerRegistrationDataSource.data;
           let duplicatePresent = this.partnerRegistrationDataSourceTempPush.findIndex(obj=> ((((obj.registrationName).trim()).toLowerCase()) == (((data.registrationName).trim()).toLowerCase()))) === -1;

            if (this.partnerRegistrationDataSource.data.length === 0 || duplicatePresent) {
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
      this.partnerRegistrationDataSourceTempPush.push(data);
      this.partnerRegistrationDataSource.data = this.partnerRegistrationDataSourceTempPush;
    }else{
      this.commonService.openToastWarningMessage("Registration Name is Invalid.");
    }
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
            this.partnerRegistrationDataSourceTempPush = this.partnerRegistrationDataSource.data;
            this.partnerRegistrationDataSourceTempPush.splice(index, 1);
            this.partnerRegistrationDataSource.data = this.partnerRegistrationDataSourceTempPush;
            this.detectorRefs.detectChanges();
            this.refreshRegistrationTable();
          } else {
            this.commonService.commonGetService('deleteSupplerSiteReg.sams', deleteid).subscribe(
              data => {
                if (data.success) {
                  // this.commonService.openToastSuccessMessage(data.message);
                  this.partnerRegistrationDataSourceTempPush = this.partnerRegistrationDataSource.data;
                  this.partnerRegistrationDataSourceTempPush.splice(index, 1);
                  this.partnerRegistrationDataSource.data = this.partnerRegistrationDataSourceTempPush;
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
    let tempArray = this.partnerRegistrationDataSource;
    this.partnerRegistrationDataSource.data = [];
    for (var i = 0; i < tempArray.data.length; i++) {
      this.partnerRegistrationDataSource.data.push(tempArray[i]);
      this.detectorRefs.detach();
    }
    this.detectorRefs.detectChanges();
  }

  
  changeTabValidation(event) {
    if (event.index == 0) {
      this.formOneValidation();
      //this.websiteFocus.nativeElement.focus();
    }
    if (event.index == 1) {
      this.formOneValidation();
      //this.streetFocusRef.nativeElement.focus();

    }
    if (event.index == 2) {
      this.formOneValidation();
      this.formThreeValidation();
      //this.contactPersonFocus.nativeElement.focus();
    }
    if (event.index == 3) {
      this.formOneValidation();
      this.formThreeValidation();
    }
    //this.cdr.detectChanges();
  }

  formThreeValidation() {
    this.formThreeDirty = true;
  }

  saveUpdateContactInfo(contactInfo, index) {
    let dialogRef = this.dialog.open(BusinessPartnerContactCreateComponent, {
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
            if (this.partnerSiteContactInfoDataSource.data.length != 0) {
              this.partnerSiteContactInfoDataSourceTempPush = this.partnerSiteContactInfoDataSource.data;
            }
            this.partnerSiteContactInfoDataSourceTempPush.push(data);
            this.partnerSiteContactInfoDataSource.data = this.partnerSiteContactInfoDataSourceTempPush;
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
            this.partnerSiteContactInfoDataSourceTempPush = this.partnerSiteContactInfoDataSource.data;
            this.partnerSiteContactInfoDataSourceTempPush.splice(index, 1);
            this.partnerSiteContactInfoDataSource.data = this.partnerSiteContactInfoDataSourceTempPush;
            this.detectorRefs.detectChanges();
          } else {
            this.commonService.commonGetService('deleteSupplerSiteContact.sams', deleteid).subscribe(
              data => {
                if (data.success) {
                  this.partnerSiteContactInfoDataSourceTempPush = this.partnerSiteContactInfoDataSource.data;
                  this.partnerSiteContactInfoDataSourceTempPush.splice(index, 1);
                  this.partnerSiteContactInfoDataSource.data = this.partnerSiteContactInfoDataSourceTempPush;
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

}
