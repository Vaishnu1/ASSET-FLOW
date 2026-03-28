import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { ManufacturerModel } from 'src/app/Model/master/manufacturer';
import { ManufacturerListComponent } from 'src/app/Components/Master/assetMain/manufacturer-list/manufacturer-list.component';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';

@Component({
  selector: 'app-manufacturer-create',
  templateUrl: './manufacturer-create.component.html',
  styleUrls: ['./manufacturer-create.component.css']
})
export class ManufacturerCreateComponent implements OnInit {

  manufacturerForm: FormGroup;
  @ViewChild('manufactrerFocus') manufactrerFocusSet: ElementRef;

  //Create, Edit, Save and Update button name change based on the place
  headingDisplay: string;
  displayButton: string = "Submit";
  uploadFlagManufacturer: boolean = false;
  ErrorMsg: String;
  tempValue: String = '';
  countries: any = [];
  stateScrollsync: boolean = false;
  cityscrollsync: boolean = false;
  limitCount: any;
  statePageNumber: number;
  cityPageNumber: number;
  states: any = [];
  cities: any = [];
  searchKey: any = '';
  isView: boolean = false;
  buttonDisplay: string;
  locationCreateFormGroup: FormGroup;
  formOneValid: boolean = false;
  formOneDirty: boolean = false;
  //MODEL
  public ManufacturerModel: ManufacturerModel;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();


  constructor(public dialogRef: MatDialogRef<ManufacturerListComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private samsService: AssetOptimaServices,
    public commonService: CommonService,
    public assetOptimeMthnd: AssetOptimaServices,
    private assetOptimaConstants: AssetOptimaConstants,
    private userSession: UserSessionService,
    private cdr: ChangeDetectorRef
  ) {
    this.statePageNumber = 1;
    this.cityPageNumber = 1;
  }


  ngOnInit() {
    this.manufacturerForm = new FormGroup({
      manufacturerId: new FormControl(''),
      manufacturerName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      area: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      locCountry: new FormControl(this.assetOptimaConstants.defaultCountryName, [Validators.required, Validators.maxLength(100)]),
      locCountryId: new FormControl(0),

      locCity: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      locCityId: new FormControl(0),
      locState: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      locStateId: new FormControl(0),

      zipCode: new FormControl('', [Validators.pattern(this.assetOptimaConstants.numericValidation)]),
      // phoneNo: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(15), Validators.pattern(this.assetOptimaConstants.phoneNumberValidation)]),

      contactPhoneNo: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(15), Validators.pattern(this.assetOptimaConstants.phoneNumberValidation)]),

      contactPerson: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      emailId: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.pattern(this.assetOptimaConstants.emailValidation)]),
      altPhoneNo: new FormControl('', [Validators.maxLength(15), Validators.minLength(10), Validators.pattern(this.assetOptimaConstants.phoneNumberValidation)]),
      orgId: new FormControl(''),
      //COMMON OBJECTS
      createdBy: new FormControl(''),
      updatedDt: new FormControl(''),
      createdDt: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      pageNumber: new FormControl(''),
      recordsPerPage: new FormControl(''),
      orgName: new FormControl(''),
      active: new FormControl(true),
      manufacturerCode: new FormControl('')

    })
    this.headingDisplay = "Create";
    this.displayButton = "Submit";
    this.manufacturerForm.controls.manufacturerCode.disable();
  }

  ngAfterViewInit() {
    this.commonService.setFormFocus(this.manufactrerFocusSet);
    if (this.data.ManufacturerModel != 0 && this.data.mode == 'edit') {
      this.manufacturerForm.patchValue(this.data.ManufacturerModel);
      this.manufacturerForm.invalid;
      this.headingDisplay = "Edit";
      this.displayButton = "Update";
      this.tempValue = this.data.ManufacturerModel.manufacturerName != null ? this.data.ManufacturerModel.manufacturerName : '';
    } else if (this.data.mode == 'view') {
      this.isView = true;
      this.headingDisplay = "View";
      this.buttonDisplay = "Back";
      this.manufacturerForm.disable();
      this.manufacturerForm.patchValue(this.data.ManufacturerModel);
    } else {
      this.headingDisplay = "Create";
      this.displayButton = "Submit";
      this.tempValue = this.data.ManufacturerModel.manufacturerName != null ? this.data.ManufacturerModel.manufacturerName : '';
    }
    this.cdr.detectChanges();
  }

  closeModal() {
    this.dialogRef.close();
  }


  getCountryData(searchValue) {
    this.commonService.getComboResults(this.samsService.listOfAllCountryForCombo, searchValue.term).subscribe(
      (data) => {
        this.countries = data.responseData.comboList;
      });
  }

  getStateData(searchValue) {
    this.stateScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.samsService.listOfStateCombo, searchValue.term, '', '', this.limitCount, this.statePageNumber,
      this.manufacturerForm.controls['locCountry'].value != 0 ? this.manufacturerForm.controls['locCountry'].value : '').subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.statePageNumber === 1) {
              this.states = data.responseData.comboList;
            } else {
              this.states = this.states.concat(data.responseData.comboList);
            }
          } else {
            this.states = data.responseData.comboList;
          }
          data.responseData.comboList.length != 0 ? this.statePageNumber += 1 : this.statePageNumber = 1;
        }
      );
    this.stateScrollsync = false;
  }

  getCityData(searchValue) {
    this.cityscrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.samsService.listOfCityCombo, searchValue.term, '', '',
      this.limitCount, this.cityPageNumber,
      this.manufacturerForm.controls['locState'].value != 0 ? this.manufacturerForm.controls['locState'].value : '',
      this.manufacturerForm.controls['locCountry'].value != 0 ? this.manufacturerForm.controls['locCountry'].value : '').subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.cityPageNumber === 1) {
              this.cities = data.responseData.comboList;
            } else {
              this.cities = this.cities.concat(data.responseData.comboList);
            }
          } else {
            this.cities = data.responseData.comboList;
          }
          data.responseData.comboList.length != 0 ? this.cityPageNumber += 1 : this.cityPageNumber = 1;
        }
      );
    this.cityscrollsync = false;

  }
  getStateList(event) {
    if (event === undefined) {
      this.manufacturerForm.controls['locCity'].setValue('');
      this.manufacturerForm.controls['locCityId'].setValue(0);
      this.manufacturerForm.controls['locState'].setValue('');
      this.manufacturerForm.controls['locStateId'].setValue(0);
      this.cityPageNumber = 1;
      this.statePageNumber = 1;
      this.states = [];
      this.cities = [];
    } else {
      this.manufacturerForm.controls['locState'].setValue(event.stateName);
      this.manufacturerForm.controls['locStateId'].setValue(event.stateId);
      this.manufacturerForm.controls['locCity'].setValue('');
      this.manufacturerForm.controls['locCityId'].setValue(0);
      this.cityPageNumber = 1;
      this.cities = [];
    }

  }

  getCityList(event) {
    if (event != null) {
      this.manufacturerForm.controls['locCity'].setValue(event.cityName != null ? event.cityName : '');
      this.manufacturerForm.controls['locCityId'].setValue(event.cityId != 0 ? event.cityId : 0);
      this.manufacturerForm.controls['locState'].setValue(event.stateName != null ? event.stateName : '');
      this.manufacturerForm.controls['locStateId'].setValue(event.stateId != 0 ? event.stateId : 0);
      this.manufacturerForm.controls['locCountry'].setValue(event.countryName != null ? event.countryName : '');
      this.manufacturerForm.controls['locCountryId'].setValue(event.countryId != 0 ? event.countryId : 0);
      this.cityPageNumber = 1;
      this.cities = [];
    } else {
      this.manufacturerForm.controls['locCity'].setValue('');
      this.manufacturerForm.controls['locCityId'].setValue(0);

    }
  }

  getCountryList(event) {
    if (event == null || event == undefined) {
      this.manufacturerForm.controls['locCity'].setValue('');
      this.manufacturerForm.controls['locCityId'].setValue(0);
      this.manufacturerForm.controls['locState'].setValue('');
      this.manufacturerForm.controls['locStateId'].setValue(0);
      this.manufacturerForm.controls['locCountry'].setValue('');
      this.manufacturerForm.controls['locCountryId'].setValue(0)
    } else {
      this.manufacturerForm.controls['locCountry'].setValue(event.countryName);
      this.manufacturerForm.controls['locCountryId'].setValue(event.countryId);
    }
  }


  submit() {
    this.uploadFlagManufacturer = true;
    this.ManufacturerModel = this.manufacturerForm.value;
    var ManufacturerModel = this.ManufacturerModel;
    if (ManufacturerModel == "") {
      this.commonService.openToastWarningMessage("Kindly Enter the Valid Manufacturer");
    } else {
      this.ManufacturerModel = ManufacturerModel;
      this.commonService.commonInsertService(this.assetOptimeMthnd.saveOrUpdateManufacturer, this.ManufacturerModel).subscribe(
        data => {
          if (data.success) {
            this.commonService.openToastSuccessMessage(data.message);
            this.dialogRef.close();
            this.uploadFlagManufacturer = false;

          } else {
            this.commonService.openToastErrorMessage(data.message);
            this.uploadFlagManufacturer = false;

          }
        }
      );
    }

  }


  //Check Asset Type Name existence
  checkForManufacturerExistence() {
    // alert( "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(this.manufacturerForm.controls.manufacturerName.value) / 3 + 1 );
    if (((this.tempValue != null || this.tempValue != '') ? this.tempValue.toLowerCase() : '') === ((this.manufacturerForm.controls.manufacturerName.value != null) ? this.manufacturerForm.controls.manufacturerName.value.toLowerCase() : '')) {

    } else if(this.manufacturerForm.controls.manufacturerName.value === ''){ 
      this.manufacturerForm.controls.manufacturerName.setErrors(Validators.required);
    } else {
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.master.ManufacturerTO";
      constraintData.constraints = {
        'manufacturerName': this.manufacturerForm.controls.manufacturerName.value.toLowerCase(),
        'orgId': this.userSession.getUserOrgId()

      };
      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if (!data.success) {
            //show the warning invalidate the form group 
            this.ErrorMsg = data.message;
            this.manufacturerForm.controls.manufacturerName.setErrors(Validators.minLength);
            this.manufacturerForm.controls.manufacturerName.setErrors({ "notUnique": true });
          } else {
            this.ErrorMsg = '';
            this.manufacturerForm.controls.manufacturerName.setErrors(null);
          }
        });
    }

  }

  clear() {
    this.manufacturerForm.reset();
    this.manufacturerForm.updateValueAndValidity();
    this.ngOnInit();
  }

  formOneValidation() {
    this.formOneDirty = true;
    if ( 
      this.manufacturerForm.get('zipCode').valid
    ) {
      this.formOneValid = true;
    } else {
      this.formOneValid = false;
    }
  }




}
