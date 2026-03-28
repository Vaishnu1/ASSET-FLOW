import { Component, OnInit,  Inject, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../../Services/common-service/common.service';
import { AssetOptimaConstants } from '../../../Constants/AssetOptimaConstants';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssetOptimaServices } from '../../../Constants/AssetOptimaServices';
import { getData } from '../../../Model/common/fetchListData';

@Component({
  selector: 'app-service-center-create',
  templateUrl: './service-center-create.component.html',
  styleUrls: ['./service-center-create.component.css']
})
export class ServiceCenterCreateComponent implements OnInit {

  @ViewChild('serviceCenterName') serviceCenterNameFocus : ElementRef;

  headingDisplay : string;
  displayButton: string;
  ErrorMsg: String;
  tempValue: String = '';
  mode: string;

  statecrollSync: boolean = false;
  uploadFlag: boolean = false;
  disableClearButton: boolean = false;

  countries: any = [];
  states: any = [];
  cities: any = [];

  limitCount: any;

  statePageNumber: number;
  cityPageNumber : number;

  serviceCentreFormGroup: FormGroup;

  countryScrollsync: boolean = false;
  cityscrollsync: boolean = false;
  countryPageNumber: number;
  getData: getData;
  timer;
  inputModel: String='';

  constructor(
    private readonly dialogRef: MatDialogRef<ServiceCenterCreateComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private readonly commonServices: CommonService,
    private readonly assetOptimaConstants: AssetOptimaConstants,
    private readonly cdr: ChangeDetectorRef,
    private readonly samsService: AssetOptimaServices) {
      this.countryPageNumber =1;
      this.statePageNumber = 1;
      this.cityPageNumber = 1;
      this.getData = new getData();
     }

  ngOnInit() {

    this.serviceCentreFormGroup = new FormGroup({
      manufacturerServiceLocId: new FormControl(0),
      serviceLocationName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      manufacturerId: new FormControl(0),
      address1: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      address2: new FormControl('',  [Validators.maxLength(100)]),
      city: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      cityId: new FormControl(0),
      state: new FormControl('', [Validators.required]),
      stateId: new FormControl(0),
      country: new FormControl('', [Validators.required]),
      countryId: new FormControl(0),
      active: new FormControl(true),
      postalCode: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      contactPersonName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      contactPersonLandLineNo: new FormControl('', [Validators.pattern(this.assetOptimaConstants.phoneNumberValidation), Validators.maxLength(15),Validators.minLength(10)]),
      contactPersonPhoneNo: new FormControl('', [Validators.required, Validators.pattern(this.assetOptimaConstants.phoneNumberValidation), Validators.maxLength(15),Validators.minLength(10)]),
      contactPersonEmailId: new FormControl('', [Validators.required,Validators.maxLength(50), Validators.pattern(this.assetOptimaConstants.emailValidation)]),
      index: new FormControl(-1)
    });

    this.serviceCentreFormGroup.controls.state.disable();
    this.serviceCentreFormGroup.controls.city.disable();
  }

  ngAfterViewInit() {

    this.serviceCenterNameFocus.nativeElement.focus();

    this.mode = this.data.mode;
    if(this.data.assetManufacturerServiceCenter !== 0){
      this.disableClearButton = true;
      this.serviceCentreFormGroup.patchValue(this.data.assetManufacturerServiceCenter);
      if(this.data.mode === 'edit') {
      this.headingDisplay = "Edit";
      this.displayButton = "Update";
      this.serviceCentreFormGroup.controls.index.setValue(this.data.index);
      this.serviceCentreFormGroup.controls.serviceLocationName.disable();
      }
      else {
      this.headingDisplay = "View";
      this.serviceCentreFormGroup.disable();
      this.serviceCentreFormGroup.controls.state.disable();
      this.serviceCentreFormGroup.controls.country.disable();
      }
    }else{

      this.headingDisplay = "Create";
      this.displayButton = "Submit";
    }
    this.cdr.detectChanges();

  }

  closeModal() {
    this.serviceCentreFormGroup.controls.serviceLocationName.setValue(null)
    this.dialogRef.close({ assetManufacturerServiceCenter: this.serviceCentreFormGroup.value});
  }

  getCountryData(searchValue) {
      this.countryScrollsync = true;
      this.limitCount = !(this.commonServices.fetchSearchValue(searchValue)) ? '50' : '';
      this.commonServices.getComboResults(this.samsService.listOfAllCountryForCombo, searchValue.term, '', '', this.limitCount, this.countryPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonServices.fetchDataList(searchValue, this.countryPageNumber , this.countries , data.responseData.comboList)
          this.countryPageNumber = this.getData.pageNumber;
          this.countries = this.getData.dataList;
          this.countryScrollsync = false;
        });
  }

  getCountryList(event) {

    if (event === null || event === undefined) {
      this.serviceCentreFormGroup.controls['city'].setValue('');
      this.serviceCentreFormGroup.controls['cityId'].setValue(0);
      this.serviceCentreFormGroup.controls.city.disable();
      this.serviceCentreFormGroup.controls['state'].setValue('');
      this.serviceCentreFormGroup.controls['stateId'].setValue(0);
      this.serviceCentreFormGroup.controls['country'].setValue('');
      this.serviceCentreFormGroup.controls['countryId'].setValue(0);
      this.serviceCentreFormGroup.controls.state.disable();
      this.countryPageNumber =1;
      this.cityPageNumber = 1;
      this.statePageNumber = 1;
      this.states = [];
      this.cities = [];
    } else {
      this.serviceCentreFormGroup.controls['country'].setValue(event.countryName);
      this.serviceCentreFormGroup.controls['countryId'].setValue(event.countryId);
      this.serviceCentreFormGroup.controls.state.enable();
      this.statePageNumber = 1;
      this.states = [];
    }
  }

  getStateData(searchValue) {
   const countryId = this.serviceCentreFormGroup.controls.countryId.value;
   this.statecrollSync = true;
    if( countryId > 0 ){
    this.limitCount = !(this.commonServices.fetchSearchValue(searchValue)) ? '50' : '';
    this.commonServices.getComboResults(this.samsService.listOfStateCombo, searchValue.term, this.serviceCentreFormGroup.controls.countryId.value, '', this.limitCount, this.statePageNumber,
    this.serviceCentreFormGroup.controls['country'].value != 0 ? this.serviceCentreFormGroup.controls['country'].value : '').subscribe(
      data => {
        this.getData = new getData();
        this.getData = this.commonServices.fetchDataList(searchValue, this.statePageNumber , this.states , data.responseData.comboList)
        this.statePageNumber = this.getData.pageNumber;
        this.states = this.getData.dataList;
        this.statecrollSync = false;
      }
    );
  }else{
      this.states = [];
      this.statePageNumber = 1;
      this.statecrollSync = false;
      this.commonServices.openToastWarningMessage(`Kindly Select The "Country".`);

    }
  }

  getStateList(event) {
    if (event === undefined) {
      this.serviceCentreFormGroup.controls['city'].setValue('');
      this.serviceCentreFormGroup.controls['cityId'].setValue(0);
      this.serviceCentreFormGroup.controls['state'].setValue('');
      this.serviceCentreFormGroup.controls['stateId'].setValue(0);
      this.serviceCentreFormGroup.controls.city.disable();
      this.cityPageNumber = 1;
      this.statePageNumber = 1;
      this.cities = [];
    } else {
      this.serviceCentreFormGroup.controls['state'].setValue(event.stateName);
      this.serviceCentreFormGroup.controls['stateId'].setValue(event.stateId);
      this.serviceCentreFormGroup.controls['city'].setValue('');
      this.serviceCentreFormGroup.controls['cityId'].setValue(0);
      this.serviceCentreFormGroup.controls.city.enable();
      this.cityPageNumber = 1;
      this.cities = [];
    }
  }

  submit() {

    this.serviceCentreFormGroup.enable();
    this.dialogRef.close({ assetManufacturerServiceCenter: this.serviceCentreFormGroup.value});

  }

  clear() {
    this.serviceCentreFormGroup.reset();
    this.ngOnInit();
    this.serviceCenterNameFocus.nativeElement.focus();
  }

  getCityData(searchValue) {
    const stateId = this.serviceCentreFormGroup.controls.stateId.value;
    if( stateId > 0){
    this.cityscrollsync = true;
    this.limitCount = !(this.commonServices.fetchSearchValue(searchValue)) ? '50' : '';
    this.commonServices.getComboResults(this.samsService.listOfCityCombo, searchValue.term, '', '',
      this.limitCount, this.cityPageNumber,
      this.serviceCentreFormGroup.controls['state'].value !== 0 ? this.serviceCentreFormGroup.controls['state'].value : '',
      this.serviceCentreFormGroup.controls['country'].value !== 0 ? this.serviceCentreFormGroup.controls['country'].value : '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonServices.fetchDataList(searchValue, this.cityPageNumber , this.cities , data.responseData.comboList)
          this.cityPageNumber = this.getData.pageNumber;
          this.cities = this.getData.dataList;
          this.cityscrollsync = false;
        });
      }else{
        this.cities = [];
        this.cityPageNumber = 1;
        this.cityscrollsync = false;
        if(this.serviceCentreFormGroup.controls['countryId'].value>0 && stateId===0){
          this.commonServices.openToastWarningMessage(`Kindly Select The "State".`);
    
        }else if(this.serviceCentreFormGroup.controls['countryId'].value===0 && stateId===0){
          this.commonServices.openToastWarningMessage(`Kindly Select The "Country" And The "State".`);
    
        }
      }
  }

  getCityList(event) {
    if (event !== null) {
      this.serviceCentreFormGroup.controls['city'].setValue(event !== null ? event.cityName : '');
      this.serviceCentreFormGroup.controls['cityId'].setValue(event !== 0 ? event.cityId : 0);
      this.serviceCentreFormGroup.controls['state'].setValue(event !== null ? event.stateName : '');
      this.serviceCentreFormGroup.controls['stateId'].setValue(event !== 0 ? event.stateId : 0);
      this.serviceCentreFormGroup.controls['country'].setValue(event !== null ? event.countryName : '');
      this.serviceCentreFormGroup.controls['countryId'].setValue(event !== 0 ? event.countryId : 0);
      this.cityPageNumber = 1;
    } else {
      this.serviceCentreFormGroup.controls['city'].setValue(event.cityName);
      this.serviceCentreFormGroup.controls['cityId'].setValue(event.cityId);
    }
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  checkFormFields(value:String) {
    if(value === 'serviceCenterName'){
      if(this.serviceCentreFormGroup.controls.serviceLocationName.value.replace (/s+/g, ' ').trim () === ''){
        this.serviceCentreFormGroup.controls['serviceLocationName'].setValue('');
      }
    }
    else if(value === 'address1'){
      if(this.serviceCentreFormGroup.controls.address1.value.replace (/s+/g, ' ').trim () === ''){
        this.serviceCentreFormGroup.controls.address1.setErrors(Validators.required);
        this.serviceCentreFormGroup.controls['address1'].setValue('');
      }
    }
    else if(value==='address2'){
      if(this.serviceCentreFormGroup.controls.address2.value.replace (/s+/g, ' ').trim () === ''){
        this.serviceCentreFormGroup.controls.address2.setErrors(Validators.required);
        this.serviceCentreFormGroup.controls['address2'].setValue('');
      }
    }
    else if(value==='contactPersonName'){
      if(this.serviceCentreFormGroup.controls.contactPersonName.value.replace (/s+/g, ' ').trim () === ''){
        this.serviceCentreFormGroup.controls.contactPersonName.setErrors(Validators.required);
        this.serviceCentreFormGroup.controls['contactPersonName'].setValue('');
      }
    }
    else if(value==='contactPersonLandLineNo'){
      if(this.serviceCentreFormGroup.controls.contactPersonLandLineNo.value.replace (/s+/g, ' ').trim () === ''){
        this.serviceCentreFormGroup.controls['contactPersonLandLineNo'].setValue('');
      }
    }
    else if(value==='contactPersonPhoneNo'){
      if(this.serviceCentreFormGroup.controls.contactPersonPhoneNo.value.replace (/s+/g, ' ').trim () === ''){
        this.serviceCentreFormGroup.controls['contactPersonPhoneNo'].setValue('');
      }
    }
    else if(value==='contactPersonEmailId'){
      if(this.serviceCentreFormGroup.controls.contactPersonEmailId.value.replace (/s+/g, ' ').trim () === ''){
        this.serviceCentreFormGroup.controls.contactPersonEmailId.setErrors(Validators.required);
        this.serviceCentreFormGroup.controls['contactPersonEmailId'].setValue('');
      }
    }
    }

    checkFormFieldSpecialCharValidation(value:String){

      clearTimeout(this.timer);

    this.timer = setTimeout(() => {
        if(value==='serviceCenterName'){
          this.inputModel = this.serviceCentreFormGroup.controls.serviceLocationName.value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').toUpperCase();
          if(this.inputModel.length===0 && this.serviceCentreFormGroup.controls.serviceLocationName.value!=='')
          {
            this.serviceCentreFormGroup.controls['serviceLocationName'].setValue('');
        this.commonServices.openToastWarningMessage("Please Enter the Valid Service Center Name.");
            this.serviceCentreFormGroup.controls.serviceLocationName.setErrors(Validators.required);

          }
        }
        else if(value === 'address1'){
          this.inputModel = this.serviceCentreFormGroup.controls.address1.value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').toUpperCase();
          if(this.inputModel.length===0 && this.serviceCentreFormGroup.controls.address1.value!=='')
          {
            this.commonServices.openToastWarningMessage("Please Enter the Valid Address1.");
            this.serviceCentreFormGroup.controls['address1'].setValue('');

          }
        }
        else if(value==='address2'){
          this.inputModel = this.serviceCentreFormGroup.controls.address2.value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').toUpperCase();
          if(this.inputModel.length===0 && this.serviceCentreFormGroup.controls.address2.value!=='')
          {
            this.commonServices.openToastWarningMessage("Please Enter the Valid address2.");
            this.serviceCentreFormGroup.controls['address2'].setValue('');

          }
        }
        else if(value==='contactPersonName'){
          this.inputModel = this.serviceCentreFormGroup.controls.contactPersonName.value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').toUpperCase();
          if(this.inputModel.length===0 && this.serviceCentreFormGroup.controls.contactPersonName.value!=='')
          {
            this.commonServices.openToastWarningMessage("Please Enter the Valid Contact Person Name.");
            this.serviceCentreFormGroup.controls['contactPersonName'].setValue('');

          }
        }
        else if(value==='contactPersonLandLineNo'){
          this.inputModel = this.serviceCentreFormGroup.controls.contactPersonLandLineNo.value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').toUpperCase();
          if(this.inputModel.length===0 && this.serviceCentreFormGroup.controls.contactPersonLandLineNo.value!=='')
          {
            this.commonServices.openToastWarningMessage("Please Enter the Valid Land Line No.");
            this.serviceCentreFormGroup.controls['contactPersonLandLineNo'].setValue('');

          }
        }
        else if(value==='contactPersonPhoneNo'){
          this.inputModel = this.serviceCentreFormGroup.controls.contactPersonPhoneNo.value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').toUpperCase();
          if(this.inputModel.length===0 && this.serviceCentreFormGroup.controls.contactPersonPhoneNo.value!=='')
          {
            this.commonServices.openToastWarningMessage("Please Enter the Valid Phone No.");
            this.serviceCentreFormGroup.controls['contactPersonPhoneNo'].setValue('');

          }
        }
        else if(value==='contactPersonEmailId'){
          this.inputModel = this.serviceCentreFormGroup.controls.contactPersonEmailId.value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').toUpperCase();
          if(this.inputModel.length===0 && this.serviceCentreFormGroup.controls.contactPersonEmailId.value!=='')
          {
            this.commonServices.openToastWarningMessage("Please Enter the Valid Email Id.");
            this.serviceCentreFormGroup.controls['contactPersonEmailId'].setValue('');

          }
        }

    }, 900);
    }

}
