import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table'
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { DeleteConfirmationComponent } from 'src/app/Components/Common-components/delete-confirmation/delete-confirmation.component';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { CustomerCreateComponent } from '../customer-create/customer-create.component';
import { CustomerSiteModel } from 'src/app/Model/master/customer-site-model';
import { getData } from 'src/app/Model/common/fetchListData';
import { SupplierSiteRegistrationComponent } from 'src/app/Components/Master/supplier/supplier-site-registration/supplier-site-registration.component';

@Component({
  selector: 'app-customer-site-create',
  templateUrl: './customer-site-create.component.html',
  styleUrls: ['./customer-site-create.component.css']
})
export class CustomerSiteCreateComponent implements OnInit {
  step = 0;

  customerSiteRegDispCol = ['sno', 'registrationName', 'registrationNo', 'action'];
  customerName: string;

  customerRegistrationDataSourceTempPush: any = [];
  disableClearButton: boolean = false;
  headingDisplay :string ='';

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  @ViewChild('customerSite') customerSiteFocus: ElementRef;
  @ViewChild('streetFocus') streetFocusRef: ElementRef;
  @ViewChild('contactPerson') contactPersonFocus: ElementRef;

  public customerSite: CustomerSiteModel;

  customerSiteForm: FormGroup;

  customerRegistrationDataSource = new MatTableDataSource<any>();

  paymentMethod = [
    { id: 1, name: 'CASH' },
    { id: 2, name: 'CARD' },
    { id: 3, name: 'CHEQUE' },
    { id: 4, name: 'RTGS/NEFT' },
  ];

  scrollCountrysync: boolean = false;
  scrollStatesync: boolean = false;
  scrollCurrencyCodesync: boolean = false;

  formOneValid: boolean = false;  // valid if form one
  formOneDirty: boolean = false;  // make dirty form one touched
  formTwoValid: boolean = false;  // valid if form two
  formTwoDirty: boolean = false;  // make dirty form two touched
  formThreeValid: boolean = false;
  formThreeDirty: boolean = false;

  countryPageNumber: number;
  statePageNumber: number;
  currencyCodePageNumber: number;
  modeDisplay: boolean = false;

  currencycdList: any = [];
  states: any = [];
  countries: any = [];

  card1: boolean = true;
  card2: boolean = false;
  card3: boolean = false;
  tempValue: String = '';
  ErrorMsg: String = '';
  limitCount: any;
  modelCustomerSite: boolean = false;

  selectedIndex: number = 0;
  maxNumberOfTabs: number = 4;

  registationValidation: boolean = false;

  sourceHeadingDisplay: string = '';
  getData: getData;

  constructor(public dialogRef: MatDialogRef<CustomerCreateComponent>,
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
  }

  ngOnInit() {
    this.customerRegistrationDataSource.data = [];

    this.customerSiteForm = new FormGroup({
      customerSiteId: new FormControl(0),
      customerId: new FormControl(0),
      customerSiteName: new FormControl(this.data.customerName, [Validators.required, Validators.maxLength(100)]),
      custContactPerson: new FormControl('', [Validators.required]),

      custSiteAddress1: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      custSiteAddress2: new FormControl(''),
      customerArea: new FormControl('', [Validators.required]),
      customerCity: new FormControl('', [Validators.required]),
      customerState: new FormControl('', [Validators.required]),
      customerCountry: new FormControl('INDIA', [Validators.required]),
      custSitePinCode: new FormControl('', [Validators.required, Validators.maxLength(10)]),  //same
      custSiteCompanyPhoneNo: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(10), Validators.pattern(this.validationService.phoneNumberValidation)]),  //same
      custSiteCompanyLandLineNo: new FormControl('',[Validators.maxLength(15), Validators.minLength(10), Validators.pattern(this.validationService.phoneNumberValidation)]),
      custSiteCurrencyCode: new FormControl(''),
      active: new FormControl(true),
      createdBy: new FormControl(''),
      createdDtDisp: new FormControl(''),
      createdDt: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      pageNumber: new FormControl(''),
      custSiteWebsite: new FormControl('', [Validators.maxLength(100)]),
      custContactPersonContactNo: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(10), Validators.pattern(this.validationService.phoneNumberValidation)]),
      customerSiteRegList: new FormControl([]),
      customerCityId: new FormControl(0),
      customerStateId: new FormControl(0),
      customerCountryId: new FormControl(1),
      custSitePaymentTerms: new FormControl(''),
      custSitePaymentMethod: new FormControl(''),
      custContactPersonEmailId: new FormControl('', [Validators.maxLength(50),Validators.required,Validators.pattern(this.validationService.emailValidation)]),
      custSiteCompanyEmailId: new FormControl('', [Validators.maxLength(50),Validators.required, Validators.pattern(this.validationService.emailValidation)])

    })

    this.headingDisplay='Create';
    if (this.data.mode === 'view') {
      this.customerSiteForm.disable();
      this.modelCustomerSite = true;
    }
    this.countryPageNumber = 1;
    this.statePageNumber = 1;
    this.currencyCodePageNumber = 1;
  }

  ngAfterViewInit() {
    this.commonService.setFormFocus(this.customerSiteFocus);
    if (this.data.customerSite != 0) {
      this.headingDisplay ='Edit';
      this.customerSiteForm.patchValue(this.data.customerSite);
      this.customerRegistrationDataSource.data = this.data.customerSite.customerSiteRegList;
      this.tempValue = this.data.customerSite.customerArea != null ? this.data.customerSite.customerArea : '';
      this.formOneValidation();
      this.formThreeValidation();
      this.disableClearButton = true;
    } else {
      this.tempValue = this.data.customerSite.customerArea != null ? this.data.customerSite.customerArea : '';
    }
    this.cdr.detectChanges();
    this.registrationValidation()
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
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.serviceName.listOfStateCombo, searchValue.term, this.customerSiteForm.controls.customerCountryId.value, '', this.limitCount,
      this.statePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.statePageNumber , this.states , data.responseData.comboList)
          this.statePageNumber = this.getData.pageNumber;
          this.states = this.getData.dataList;
          this.scrollStatesync = false;
        }
      );
  }

  getCountryData(searchValue) {
    this.scrollCountrysync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
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

  addCustomerSite() {
    this.customerSiteForm.controls.customerSiteRegList.setValue(this.customerRegistrationDataSource.data);
    this.dialogRef.close(this.customerSiteForm.value);
  }

  saveUpdateRegistration(registration, index) {
    let dialogRef = this.dialog.open(SupplierSiteRegistrationComponent
      , {
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
          if (data !== null && data !== undefined && data !== '') {
            if (this.customerRegistrationDataSource.data.length != 0) {
              this.customerRegistrationDataSourceTempPush = this.customerRegistrationDataSource.data;
              this.registrationValidation()
            }
            this.customerRegistrationDataSourceTempPush.push(data);
            this.customerRegistrationDataSource.data = this.customerRegistrationDataSourceTempPush;
            this.registrationValidation();
          }
        }
      });
  }

  disableError() {
    this.customerSiteForm.controls.custSiteAddress1.setErrors(null);
    this.customerSiteForm.controls.custSiteAddress1.markAsUntouched();

    this.customerSiteForm.controls.customerArea.setErrors(null);
    this.customerSiteForm.controls.customerArea.markAsUntouched();

    this.customerSiteForm.controls.customerCity.setErrors(null);
    this.customerSiteForm.controls.customerCity.markAsUntouched();

    this.customerSiteForm.controls.custSitePinCode.setErrors(null);
    this.customerSiteForm.controls.custSitePinCode.markAsUntouched();

    this.customerSiteForm.controls.custSiteCompanyPhoneNo.setErrors(null);
    this.customerSiteForm.controls.custSiteCompanyPhoneNo.markAsUntouched();

    this.customerSiteForm.controls.custContactPerson.setErrors(null);
    this.customerSiteForm.controls.custContactPerson.markAsUntouched();

    this.customerSiteForm.controls.custContactPersonContactNo.setErrors(null);
    this.customerSiteForm.controls.custContactPersonContactNo.markAsUntouched();
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
            this.customerRegistrationDataSourceTempPush = this.customerRegistrationDataSource.data;
            this.customerRegistrationDataSourceTempPush.splice(index, 1);
            this.customerRegistrationDataSource.data = this.customerRegistrationDataSourceTempPush;
            this.detectorRefs.detectChanges();
            // this.refreshRegistrationTable();
            this.registrationValidation();
          } else {
            this.commonService.commonGetService(this.serviceName.deleteCustomerSiteReg, deleteid).subscribe(
              data => {
                if (data.success) {
                  // this.commonService.openToastSuccessMessage(data.message);
                  this.customerRegistrationDataSourceTempPush = this.customerRegistrationDataSource.data;
                  this.customerRegistrationDataSourceTempPush.splice(index, 1);
                  this.customerRegistrationDataSource.data = this.customerRegistrationDataSourceTempPush;
                  this.detectorRefs.detectChanges();
                  this.registrationValidation();
                  // this.refreshRegistrationTable();
                } else {
                  this.commonService.openToastErrorMessage(data.message);
                }
              }
            );
          }
        }
      });
    this.registrationValidation();
  }




  refreshRegistrationTable() {
    // let tempArray = this.supplierRegistrationDataSource;
    // this.supplierRegistrationDataSource = [];
    // for (var i = 0; i < tempArray.length; i++) {
    //   this.supplierRegistrationDataSource.push(tempArray[i]);
    //   this.detectorRefs.detach();
    // }
    // this.detectorRefs.detectChanges();
  }

  //Check Supplier Site existence
  checkForSupplierSiteAreaExistence() {
    if (((this.tempValue != null || this.tempValue != '') ? this.tempValue.toLowerCase() : '') === ((this.customerSiteForm.controls.customerArea.value != null) ? this.customerSiteForm.controls.customerArea.value.toLowerCase() : '')) {

    } else {
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.master.SupplierLocationInfoTO";
      constraintData.constraints = {
        ' customerArea': this.customerSiteForm.controls.customerArea.value.toLowerCase(),
        'supplierId': this.customerSiteForm.controls.supplierId.value

      };
      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if (!data.success) {
            //show the warning invalidate the form group
            this.ErrorMsg = data.message;
            this.customerSiteForm.controls.customerArea.setErrors(Validators.minLength);
            this.customerSiteForm.controls.customerArea.setErrors({ "notUnique": true });
          } else {
            this.ErrorMsg = '';
            this.customerSiteForm.controls.customerArea.setErrors(null);
          }

        });
    }

  }

  getCurrencyCodeData(event) {
    if (event === undefined) {
      this.customerSiteForm.controls['custSiteCurrencyCode'].setValue('');
      this.currencycdList = [];
      this.currencyCodePageNumber = 1;
    } else {
      this.customerSiteForm.controls['custSiteCurrencyCode'].setValue(event.curCd);
    }
  }

  setStateData(event) {
    if (event === undefined) {
      this.customerSiteForm.controls['customerState'].setValue('');
      this.customerSiteForm.controls['customerStateId'].setValue(0);
      this.states = [];
      this.statePageNumber = 1;

    } else {
      this.customerSiteForm.controls['customerState'].setValue(event.stateName);
      this.customerSiteForm.controls['customerStateId'].setValue(event.stateId);
    }
  }

  setCountryData(event) {
    if (event === undefined) {
      this.customerSiteForm.controls['customerCountry'].setValue('');
      this.customerSiteForm.controls['customerCountryId'].setValue(0);
      this.countries = [];
      this.states = [];
      this.statePageNumber = 1;
      this.countryPageNumber = 1;
    } else {
      this.customerSiteForm.controls['customerCountry'].setValue(event.countryName);
      this.customerSiteForm.controls['customerCountryId'].setValue(event.countryId);
    }
  }

  changeTabValidation(event) {
    if (event.index == 0) {
      this.formOneValidation();
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
      (this.customerSiteForm.get('customerSiteName').value != '') &&
      (this.customerSiteForm.get('custSiteCompanyEmailId').valid) &&
      (this.customerSiteForm.get('custSiteCompanyPhoneNo').valid) &&
      this.customerSiteForm.get('custSiteAddress1').valid &&
      this.customerSiteForm.get('customerState').valid &&
      this.customerSiteForm.get('customerArea').valid &&
      this.customerSiteForm.get('customerCity').valid &&
      this.customerSiteForm.get('customerCountry').valid &&
      this.customerSiteForm.get('custSitePinCode').valid
    ) {
      this.formOneValid = true;
    } else {
      this.formOneValid = false;
    }
  }


  // Check validation based on form
  // form one validation (* in-order to check individual form dirty)
  formThreeValidation() {
    if ( // Form One Validation
      this.customerSiteForm.controls.custContactPerson.valid &&
      this.customerSiteForm.controls.custContactPersonEmailId.valid &&
      this.customerSiteForm.controls.custContactPersonContactNo.valid
    ) {
      this.formThreeValid = true;
    } else {
      this.formThreeValid = false;
    }
    return this.formThreeValid;
  }

  clear() {
    this.customerSiteForm.reset();
    this.customerSiteForm.updateValueAndValidity();
    this.customerRegistrationDataSource.data = [];
    this.formOneValid = false;
    this.formThreeValid = false;
    this.formThreeValidation();
    this.formOneValidation();
  }

  //site should have only one registration no
  registrationValidation() {
    if (this.customerRegistrationDataSource.data.length > 0) {
      this.registationValidation = true;
    } else {
      this.registationValidation = false;
    }
    return this.registationValidation;
  }


}
