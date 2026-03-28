import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';

import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { BASE_FORM_GROUP_CONST } from 'src/app/Model/base/baseFormGroup';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { DeleteConfirmationComponent } from 'src/app/Components/Common-components/delete-confirmation/delete-confirmation.component';
import { getData } from 'src/app/Model/common/fetchListData';
import { RegistrationPopupComponent } from 'src/app/Components/settings/Organization/location/location-create/modal/registration-popup/registration-popup.component';

@Component({
  selector: 'app-legal-entity-create',
  templateUrl: './legal-entity-create.component.html',
  styleUrls: ['./legal-entity-create.component.css']
})
export class LegalEntityCreateComponent implements OnInit {

  displayedColumns = ['sno', 'name', 'info', 'action'];
  headingDisplay: string = "Create";
  displayButton: string = 'Submit';
  searchvalue: any = '';
  legalRegistrationList = new MatTableDataSource<any>();
  disableClear: boolean = false;
  uploadLegalEntityFlag: boolean = false;
  uploadLegalEntity: boolean = false;
  public cities: any = [{ orgCity: 'Coimbatore' }, { orgCity: 'Salem' }, { orgCity: 'Chennai' }];

  countries: any = [];
  states: any = [];
  currencycdList: any = [];

  legalEntityFormGroup: FormGroup;
  @ViewChild('legalEntityName') legalEntityName: ElementRef;

  formOneValid: boolean = false;  // valid if form one
  formOneDirty: boolean = false;  // make dirty form one touched

  ErrorMsg: String='';
  ErrorMsgCode:string='';
  tempValue: String = '';
  tempValue1: String = '';

  selectedIndex: number = 0;
  maxNumberOfTabs: number = 2;

  //FOR LAZY LOADING
  limitCount: any;
  statePageNumber: number;
  cityPageNumber: number;
  currencyCdPageNumber: number;
  countryPageNumber: number;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  scrollsync: boolean = false;
  entityScrollsync: boolean = false;
  stateScrollsync: boolean = false;
  cityScrollsync: boolean = false;
  currencyScrollsync: boolean = false;
  countryScroll: boolean = false;
  legalRegistrationTempPush: any = [];

  modeDisplay: boolean = false;
  searchKey: any = '';
  getData: getData;

  constructor(
    private router: Router,
    public commonService: CommonService,
    public assetOptimeMthnd: AssetOptimaServices,
    private assetOptimaConstants: AssetOptimaConstants,
    private dialog: MatDialog,
    private detectorRefs: ChangeDetectorRef, private activatedRoute: ActivatedRoute,
    private location: Location,
    private userSessionService: UserSessionService
  ) {
    this.statePageNumber = 1;
    this.cityPageNumber = 1;
    this.currencyCdPageNumber = 1;
    this.countryPageNumber = 1;
  }

  ngOnInit() {
   // document.getElementById('commonFooter').style.display = 'none';
    this.legalRegistrationList.data = [];
    this.legalEntityFormGroup = new FormGroup({
      legalEntityName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      legalEntityId: new FormControl(''),
      legalEntityDesc: new FormControl('', [Validators.maxLength(300)]),
      legalEntityAddress1: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      legalEntityAddress2: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      legalEntityCity: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      legalEntityState: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      legalEntityCountry: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      legalEntityPostalCode: new FormControl('', [Validators.required,Validators.maxLength(10)]),
      legalEntityEmailId: new FormControl('', [Validators.pattern(this.assetOptimaConstants.emailValidation), Validators.maxLength(50)]),
      legalEntityPhoneNumber: new FormControl('', [Validators.pattern(this.assetOptimaConstants.phoneNumberValidation), Validators.maxLength(15), Validators.minLength(10)]),
      legalEntityCurrencyCode: new FormControl(null, [Validators.maxLength(20)]),
      legalRegistrationList: new FormControl([]),
      legalEntityCityId: new FormControl(0),
      legalEntityStateId: new FormControl(0),
      legalEntityCountryId: new FormControl(0),
      legalEntityCode: new FormControl('', [Validators.maxLength(5)]),
      createdDt: new FormControl(''),
      createdBy: new FormControl(''),
      updatedDt: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      active: new FormControl(true),

    });
    this.legalEntityFormGroup.controls.legalEntityState.disable();
    this.legalEntityFormGroup.controls.legalEntityCity.disable();
    //dynamicly add all base from controls to the form Group
    let formControlCount: number = 0;
    Object.keys(BASE_FORM_GROUP_CONST.controls).forEach(key => {
      this.legalEntityFormGroup.addControl(key, BASE_FORM_GROUP_CONST.get(key));
      formControlCount++;
      if (formControlCount === (Object.keys(BASE_FORM_GROUP_CONST.controls).length)) {
        //call the list method after adding all form controls
        this.commonService.setFormFocus(this.legalEntityName);
        this.validateEditMode();
      }
    });
  }

  validateEditMode() {
    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        var mode = params.mode;
        primaryId = Number(primaryId);
        if (primaryId <= 0) {
          this.headingDisplay = "Create";
          this.displayButton = "Submit";
          this.tempValue = '';
          this.tempValue1 = '';
        } else {
          if(mode==='view'){
            this.headingDisplay = "View";
            this.modeDisplay=true;
            this.legalEntityFormGroup.disable();
            this.displayedColumns = ['sno', 'name', 'info'];
          }else{
          //button and heading names for edit
          this.headingDisplay = "Edit";
          this.displayButton = "Update";
          this.disableClear = true;
          this.legalEntityFormGroup.controls.legalEntityState.enable();
          this.legalEntityFormGroup.controls.legalEntityCity.enable();
          }
          this.commonService.commonGetService('loadLegalEntityInfo.sams', primaryId).subscribe(
            data => {
              this.legalEntityFormGroup.patchValue(data.responseData);
              this.legalRegistrationList.data = data.responseData.legalRegistrationList;
              this.tempValue = data.responseData.legalEntityName !== null ? data.responseData.legalEntityName : '';
              this.tempValue1 = data.responseData.legalEntityCode !== null ? data.responseData.legalEntityCode : '';

              this.formOneValidation();
            }
          );
        }
      }
    );
  }

  dialogRef;
  dialogRefDelete;

  addRegistrationInfo() {
     this.dialogRef = this.dialog.open(RegistrationPopupComponent, {
      height: 'auto',
      width: '350px',
      data: {'locRegistrationId':'0'}
    });
    this.dialogRef.disableClose = true;
    this.dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.legalRegistrationTempPush = this.legalRegistrationList.data;
         let duplicatePresent = this.legalRegistrationTempPush.findIndex(obj=> ((((obj.registrationName).trim()).toLowerCase()) == (((data.registrationName).trim()).toLowerCase()))) === -1;

          if (this.legalRegistrationList.data.length === 0 || duplicatePresent) {
            this.checkIsEmpty((((data.registrationName).trim()).toLowerCase()) , data);
          }
          else{
            this.commonService.openToastWarningMessage("Registration Name already exists");
          }
        }
      });
  }
  
  checkIsEmpty(regName , data){
    if(regName !== ""){
      this.legalRegistrationTempPush.push(data);
      this.uploadLegalEntity = true;
      this.legalRegistrationList.data = this.legalRegistrationTempPush; 
    }else{
      this.commonService.openToastWarningMessage("Registration Name is Invalid");
    } 
  }
  
  ngOnDestroy() {
    if(this.dialogRef!=null){
      this.dialogRef.close();
    }
    if(this.dialogRefDelete!=null){
      this.dialogRefDelete.close();
    }
  }

  deleteRegistration(value, index) {
    this.dialogRefDelete = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Registration Info'
      }
    });
    this.dialogRefDelete.disableClose = true;
    this.dialogRefDelete.afterClosed().subscribe(
      data => {
        if (data.status) {
            this.legalRegistrationTempPush = this.legalRegistrationList.data;
            this.legalRegistrationList.data.splice(index, 1);
            this.legalRegistrationList.data = this.legalRegistrationTempPush;
            this.uploadLegalEntity = true;
            this.detectorRefs.detectChanges();
            this.commonService.openToastSuccessMessage("Record Deleted Successfully.");
        }
      });
  }
  save() {
    this.uploadLegalEntityFlag=true;
    this.legalEntityFormGroup.controls.legalRegistrationList.setValue(this.legalRegistrationList.data);
    if(this.legalEntityFormGroup.controls.legalEntityCode.value.trim() == ""){
      this.legalEntityFormGroup.controls.legalEntityCode.setValue(null);
    }
    this.commonService.commonInsertService('saveOrUpdateLegalEntity.sams', this.legalEntityFormGroup.value).subscribe(
      data => {
        if (data.success) {
          this.uploadLegalEntityFlag=false;
          this.commonService.openToastSuccessMessage(data.message);
          this.location.back();
        } else {
          this.uploadLegalEntityFlag=false;
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
        this.uploadLegalEntityFlag=false;
        this.commonService.openToastErrorMessage(this.assetOptimaConstants.serverError);
      }
    );
    localStorage.setItem('previousRoute', this.router.url);
  }

  exit() {
    localStorage.setItem('previousRoute', this.router.url);
    this.location.back();
  }

  legalEntityCityMethod(searchValue) {
    const suppLocStateId = this.legalEntityFormGroup.controls.legalEntityStateId.value;
    const locCountryId =  this.legalEntityFormGroup.controls.legalEntityCountryId.value;

    this.cityScrollsync = true;
    if( suppLocStateId > 0){
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '50' : '';
    this.commonService.getComboResults(this.assetOptimeMthnd.listOfCityCombo, searchValue.term, '', '', this.limitCount, this.cityPageNumber, this.legalEntityFormGroup.controls['legalEntityState'].value !== null ? this.legalEntityFormGroup.controls['legalEntityState'].value : '', this.legalEntityFormGroup.controls['legalEntityCountry'].value !== null ? this.legalEntityFormGroup.controls['legalEntityCountry'].value : '').subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.cityPageNumber , this.cities , data.responseData.comboList)
        this.cityPageNumber = this.getData.pageNumber;
        this.cities = this.getData.dataList;
        this.cityScrollsync = false;
      }
    );
  }else {
    this.cities = [];
    this.cityPageNumber = 1;
    this.cityScrollsync = false;
    if(locCountryId===0&&suppLocStateId===0){
      this.commonService.openToastWarningMessage(`Kindly Select The "Country" And The "State".`);
    }else if(locCountryId>0 && suppLocStateId===0){
      this.commonService.openToastWarningMessage(`Kindly Select The "State".`);
    }
  }
}



  getCityListData(event) {
    if (event === undefined) {
      this.legalEntityFormGroup.controls['legalEntityCity'].setValue('');
      this.legalEntityFormGroup.controls['legalEntityCityId'].setValue(0);
      this.cityPageNumber = 1;
      this.cities = [];
    } else {
      this.legalEntityFormGroup.controls['legalEntityCity'].setValue(event.cityName !== null ? event.cityName : '');
      this.legalEntityFormGroup.controls['legalEntityCityId'].setValue(event.cityId !== 0 ? event.cityId : 0);
      this.legalEntityFormGroup.controls['legalEntityState'].setValue(event.stateName !== null ? event.stateName : '');
      this.legalEntityFormGroup.controls['legalEntityStateId'].setValue(event.stateId !== 0 ? event.stateId : 0);
      this.legalEntityFormGroup.controls['legalEntityCountry'].setValue(event.countryName !== null ? event.countryName : '');
      this.legalEntityFormGroup.controls['legalEntityCountryId'].setValue(event.countryId !== 0 ? event.countryId : 0);
    }
  }

  getCountryList(event) {
    if (event === null || event === undefined) {
      this.legalEntityFormGroup.controls['legalEntityCity'].setValue('');
      this.legalEntityFormGroup.controls['legalEntityCityId'].setValue(0);
      this.legalEntityFormGroup.controls.legalEntityCity.disable();
      this.legalEntityFormGroup.controls['legalEntityState'].setValue('');
      this.legalEntityFormGroup.controls['legalEntityStateId'].setValue(0); 
      this.legalEntityFormGroup.controls.legalEntityState.disable();
      this.legalEntityFormGroup.controls['legalEntityCountry'].setValue('');
      this.legalEntityFormGroup.controls['legalEntityCountryId'].setValue(0);
      this.countryPageNumber = 1;
      this.statePageNumber = 1;
      this.cityPageNumber=1;
      this.states = [];
      this.cities = [];
      this.countries = [];
    } else {
      this.legalEntityFormGroup.controls['legalEntityCountry'].setValue(event.countryName);
      this.legalEntityFormGroup.controls['legalEntityCountryId'].setValue(event.countryId);
      this.legalEntityFormGroup.controls.legalEntityState.enable();
      this.statePageNumber = 1;
      this.cityPageNumber=1;
      this.states = [];
      this.cities = [];
    }
  }


  getCountryData(searchValue) {
    this.countryScroll = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '50' : '';
    this.commonService.getComboResults(this.assetOptimeMthnd.listOfAllCountryForCombo, searchValue.term, '', '', this.limitCount, this.countryPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.countryPageNumber , this.countries , data.responseData.comboList)
        this.countryPageNumber = this.getData.pageNumber;
        this.countries = this.getData.dataList;
        this.countryScroll = false;
      });
  }


  getStateData(searchValue) {
    const locCountryId =  this.legalEntityFormGroup.controls.legalEntityCountryId.value;
    this.stateScrollsync = true;
      if(locCountryId > 0 ){
      this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '50' : '';
      this.commonService.getComboResults(this.assetOptimeMthnd.listOfStateCombo, searchValue.term, locCountryId,'', this.limitCount, this.statePageNumber,this.legalEntityFormGroup.controls['legalEntityCountry'].value !== 0 ? this.legalEntityFormGroup.controls['legalEntityCountry'].value : '').subscribe(
          (data) => {
            this.getData = new getData();
            this.getData = this.commonService.fetchDataList(searchValue, this.statePageNumber , this.states , data.responseData.comboList)
            this.statePageNumber = this.getData.pageNumber;
            this.states = this.getData.dataList;
            this.stateScrollsync = false;
          }
        );
      }else{
        this.states = [];
        this.statePageNumber = 1;
        this.stateScrollsync = false;
        this.commonService.openToastWarningMessage(`Kindly Select The "Country".`);
      }
    }

  getStateList(event) {
    if (event === undefined) {
      this.legalEntityFormGroup.controls['legalEntityState'].setValue('');
      this.legalEntityFormGroup.controls['legalEntityStateId'].setValue(0);
      this.legalEntityFormGroup.controls['legalEntityCity'].setValue('');
      this.legalEntityFormGroup.controls['legalEntityCityId'].setValue(0);
      this.legalEntityFormGroup.controls.legalEntityCity.disable();
      this.statePageNumber = 1;
      this.cityPageNumber=1;
      this.cities = [];
      this.states = [];
    } else {
      this.legalEntityFormGroup.controls['legalEntityState'].setValue(event.stateName);
      this.legalEntityFormGroup.controls['legalEntityStateId'].setValue(event.stateId);
      this.legalEntityFormGroup.controls['legalEntityCity'].setValue('');
      this.legalEntityFormGroup.controls['legalEntityCityId'].setValue(0);
      this.legalEntityFormGroup.controls.legalEntityCity.enable();
      this.cityPageNumber=1;
      this.cities = [];
    }
  }

  listOfCurrencyCd(searchValue) {
    this.currencyScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '5' : '';
    this.commonService.getComboResults(this.assetOptimeMthnd.listOfCurCdCombo, searchValue.term, '', '', this.limitCount, this.currencyCdPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.currencyCdPageNumber , this.currencycdList , data.responseData.comboList)
        this.currencyCdPageNumber = this.getData.pageNumber;
        this.currencycdList = this.getData.dataList;
        this.currencyScrollsync = false;
      }
    );
  }

  setCurrencyCd(event) {
    if (event === undefined) {
      this.currencycdList = [];
      this.currencyCdPageNumber = 1;
    }
  }

  clear() {
    this.legalEntityFormGroup.reset();
    this.legalEntityFormGroup.updateValueAndValidity();
    this.legalEntityName.nativeElement.focus();
    this.formOneValid = false;
  }

  //Check Legal Entity Name existence
  checkForLegalEntityExistence() {
    if(this.legalEntityFormGroup.controls.legalEntityName.value != ''){
      this.legalEntityFormGroup.controls.legalEntityName.setValue(this.legalEntityFormGroup.controls.legalEntityName.value.trim())
    }
    if (((this.tempValue !== null || this.tempValue !== '') ? this.tempValue.toLowerCase() : '') ===
      ((this.legalEntityFormGroup.controls.legalEntityName.value !== null) ? this.legalEntityFormGroup.controls.legalEntityName.value.toLowerCase() : '')) {

    } else {
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.base.LegalEntityTO";
      constraintData.constraints = {
        'legalEntityName': this.legalEntityFormGroup.controls.legalEntityName.value,
        'orgId': this.userSessionService.getUserOrgId()
      };
      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if (!data.success) {
            this.ErrorMsg = data.message;
            this.legalEntityFormGroup.controls.legalEntityName.setErrors(Validators.minLength);
            this.legalEntityFormGroup.controls.legalEntityName.setErrors({ "notUnique": true });
          } else {
            this.ErrorMsg = '';
          }
        }
      );
    }
  }

  checkForLegalEntityCodeExistence() {
    if(this.legalEntityFormGroup.controls.legalEntityCode.value != ''){
      this.legalEntityFormGroup.controls.legalEntityCode.setValue(this.legalEntityFormGroup.controls.legalEntityCode.value.trim())
    }
    if (((this.tempValue1 !== null || this.tempValue1 !== '') ? this.tempValue1.toLowerCase() : '') ===
      ((this.legalEntityFormGroup.controls.legalEntityCode.value !== null) ? this.legalEntityFormGroup.controls.legalEntityCode.value.toLowerCase() : '')) {

    } else {
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.base.LegalEntityTO";
      constraintData.constraints = {
        'legalEntityCode': this.legalEntityFormGroup.controls.legalEntityCode.value,
        'orgId': this.userSessionService.getUserOrgId()
      };
      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if (!data.success) {
            this.ErrorMsgCode = data.message;
            this.legalEntityFormGroup.controls.legalEntityCode.setErrors(Validators.minLength);
            this.legalEntityFormGroup.controls.legalEntityCode.setErrors({ "notUnique": true });
          } else {
            this.ErrorMsgCode = '';
            this.legalEntityFormGroup.controls.legalEntityCode.setErrors(null);
          }
        }
      );
    }
  }

  // Move to Next Tab
  nextStep() {
    if (this.selectedIndex !== this.maxNumberOfTabs) {
      this.selectedIndex = this.selectedIndex + 1;
    }
  }

  previousStep() {
    if (this.selectedIndex !== 0) {
      this.selectedIndex = this.selectedIndex - 1;
    }
  }

  //VALIDATION ICON FUNCTION
  formOneValidation() {
    this.formOneDirty = true;
    if (this.legalEntityFormGroup.get('legalEntityAddress1').valid && this.legalEntityFormGroup.get('legalEntityAddress2').valid &&
      this.legalEntityFormGroup.get('legalEntityCity').valid && this.legalEntityFormGroup.get('legalEntityState').valid &&
      this.legalEntityFormGroup.get('legalEntityCountry').valid && this.legalEntityFormGroup.get('legalEntityPostalCode').valid) {
      this.formOneValid = true;
    } else {
      this.formOneValid = false;
    }
  }

  changeTab1(tabValue) {
    this.formOneValidation();
  }

  backToLegalEntity(){
    this.location.back();
  }

}

