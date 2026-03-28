import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { getData } from 'src/app/Model/common/fetchListData';

@Component({
  selector: 'app-organization-create',
  templateUrl: './organization-create.component.html',
  styleUrls: ['./organization-create.component.css']
})
export class OrganizationCreateComponent implements OnInit {

  @ViewChild('focusSet') orgNameFocusElement: ElementRef;
  @ViewChild('imageUpload') imageUpload: ElementRef<HTMLElement>;

  headingDisplay: string;
  displayButton: string;
  organisationForm: FormGroup;
  public orgName: FormControl;
  public orgCode: FormControl;
  public orgAddress1: FormControl;
  public orgAddress2: FormControl;
  public orgCity: FormControl;
  public orgCityId: FormControl;
  public orgState: FormControl;
  public stateId: FormControl;
  public orgCountry: FormControl;
  public countryId: FormControl;
  public orgPinCode: FormControl;
  public orgEmailId: FormControl;
  public phoneNo: FormControl;
  public altPhoneNo: FormControl;
  public orgWebURL: FormControl;
  public orgCurCd: FormControl;
  public countryCode: FormControl;
  public languageCode: FormControl;
  public active: FormControl;
  public organizFile: FormControl;
  public organizationId: FormControl;
  public logoPath: FormControl;
  public orgId: FormControl;
  public locationId: FormControl;
  public locationName: FormControl;
  public createdBy: FormControl;
  public createdDt: FormControl;
  public updatedBy: FormControl;
  public updatedDt: FormControl;
  public orgOldActiveValue: FormControl;
  public dateFormat: FormControl;

  public countries: any = [];
  public states: any = [];
  public cities: any = [];
  public currencycdList: any = [];
  orgFocus: boolean = true;
  disableClear: boolean = false;
  serverUrl: string;
  public fileToUpload: File;
  logoUploadFlag: boolean = false;
  public imagePath;
  imgURL: any;

  //FOR LAZY LOADING
  limitCount: any;
  statePageNumber: number;
  cityPageNumber: number;
  currencyCodePageNumber: number;
  countryPageNumber: number;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();
  uploadOrganizationFlag: boolean = false;

  scrollsync: boolean = false; 
  Cityscrollsync: boolean;
  stateScrollsync: boolean;
  currencyCdScrollsync: boolean = false;
  getData: getData;
  formatList =[];

  constructor(private samsConstants: AssetOptimaConstants,
    private commonService: CommonService,
    private samsService: AssetOptimaServices,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private locationNavigate: Location,
    private detachChange: ChangeDetectorRef
  ) {
    this.statePageNumber = 1;
    this.cityPageNumber = 1;
    this.currencyCodePageNumber = 1;
    this.countryPageNumber = 1;
    
    this.formatList = this.samsConstants.formatList;
  }

  ngOnInit() {
    this.initiateFormControl();
    this.initiateFormGroup();
    this.validateEditMode();
  }
  ngAfterViewInit() {
    this.commonService.setFormFocus(this.orgNameFocusElement);
  }
  initiateFormControl() {
    this.orgName = new FormControl('', [Validators.required, Validators.maxLength(100)]);
    this.orgCode = new FormControl('', [Validators.maxLength(5)]);
    this.orgCountry = new FormControl('', Validators.required);
    this.countryId = new FormControl('');
    this.logoPath = new FormControl('');
    this.orgAddress1 = new FormControl('', [Validators.required, Validators.maxLength(100)]);
    this.orgAddress2 = new FormControl('', [Validators.maxLength(100)]);
    this.orgCity = new FormControl('', [Validators.maxLength(100), Validators.required]);
    this.orgCityId = new FormControl('');
    this.orgState = new FormControl('', [Validators.maxLength(30), Validators.required]);
    this.stateId = new FormControl('');
    this.orgPinCode = new FormControl('', [Validators.required]);
    this.orgEmailId = new FormControl('', [Validators.maxLength(50), Validators.pattern(this.samsConstants.emailValidation)]);
    this.phoneNo = new FormControl('', [Validators.pattern(this.samsConstants.phoneNumberValidation), Validators.maxLength(15), Validators.required, Validators.minLength(10)]);
    this.orgWebURL = new FormControl('', [Validators.maxLength(30)]);
    this.orgCurCd = new FormControl('', [Validators.maxLength(10),Validators.required]);
    this.countryCode = new FormControl('', [Validators.maxLength(20), Validators.required]);
    this.languageCode = new FormControl('', [Validators.maxLength(20)]);
    this.active = new FormControl('');
    this.altPhoneNo = new FormControl('', [Validators.maxLength(15), Validators.pattern(this.samsConstants.phoneNumberValidation), Validators.minLength(10)]);
    this.organizFile = new FormControl('', []);
    this.organizationId = new FormControl('');
    this.locationId = new FormControl('');
    this.locationName = new FormControl('');
    this.createdBy = new FormControl('');
    this.createdDt = new FormControl('');
    this.updatedBy = new FormControl('');
    this.updatedDt = new FormControl('');
    this.orgOldActiveValue = new FormControl('');
    this.dateFormat = new FormControl('',[Validators.required])
  }
  initiateFormGroup() {
    this.organisationForm = new FormGroup({
      orgName: this.orgName,
      orgCode: this.orgCode,
      logoPath: this.logoPath,
      orgCountry: this.orgCountry,
      countryId: this.countryId,
      orgAddress1: this.orgAddress1,
      orgAddress2: this.orgAddress2,
      orgCity: this.orgCity,
      orgCityId: this.orgCityId,
      orgState: this.orgState,
      stateId: this.stateId,
      orgPinCode: this.orgPinCode,
      orgEmailId: this.orgEmailId,
      orgWebURL: this.orgWebURL,
      orgCurCd: this.orgCurCd,
      countryCode: this.countryCode,
      languageCode: this.languageCode,
      active: this.active,
      altPhoneNo: this.altPhoneNo,
      organizFile: this.organizFile,
      phoneNo: this.phoneNo,
      organizationId: this.organizationId,
      locationId: this.locationId,
      locationName: this.locationName,
      createdBy: this.createdBy,
      createdDt: this.createdDt,
      updatedBy: this.updatedBy,
      updatedDt: this.updatedDt,
      orgOldActiveValue: this.orgOldActiveValue,
      dateFormat: this.dateFormat
    });

    this.organisationForm.controls['orgState'].disable();
    this.organisationForm.controls['orgCity'].disable();
  }
  onOrgEmailInput(event: any) {
    event.target.value = event.target.value.toLowerCase();
    this.organisationForm.get('orgEmailId')?.setValue(event.target.value, { emitEvent: false });
  }
  submitOrgData() {
    this.uploadOrganizationFlag=true;
    this.commonService.commonInsertService(this.samsService.saveOrganisation, this.organisationForm.getRawValue()).subscribe((data) => {
      if (data.success) {
        this.commonService.openToastSuccessMessage(data.message);
          this.uploadFile();
      } else {
        this.uploadOrganizationFlag=false;
        this.commonService.openToastErrorMessage(data.message);
      }
    });
  }
  clearForm() {
    this.organisationForm.reset();
  }
  setFormFocus() {
    setTimeout(() => {
      this.orgNameFocusElement.nativeElement.focus();
    }, 500);

  }
  //COMBO METHOD
  getCountryData(searchValue) {
    this.scrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.samsService.listOfAllCountryForCombo, searchValue.term, '', '', this.limitCount, this.countryPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.countryPageNumber , this.countries , data.responseData.comboList)
        this.countryPageNumber = this.getData.pageNumber;
        this.countries = this.getData.dataList;
        this.scrollsync = false;
      });
  }

  getStateData(searchValue) {    
    const CountryId =  this.organisationForm.controls.countryId.value;
    this.stateScrollsync = true;
      if(CountryId > 0 ){
      this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '50' : '';
      this.commonService.getComboResults(this.samsService.listOfStateCombo, searchValue.term, CountryId,'', this.limitCount, this.statePageNumber,this.organisationForm.controls['orgCountry'].value !== 0 ? this.organisationForm.controls['orgCountry'].value : '').subscribe(
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
        this.commonService.openToastWarningMessage("Kindly select country");
      }
  }

  getCityData(searchValue) {
    const StateId = this.organisationForm.controls.stateId.value;
    this.Cityscrollsync = true;
    if( StateId > 0){
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '50' : '';
    this.commonService.getComboResults(this.samsService.listOfCityCombo, searchValue.term, '', '', this.limitCount, this.cityPageNumber, this.organisationForm.controls['orgState'].value !== null ? this.organisationForm.controls['orgState'].value : '', this.organisationForm.controls['orgCountry'].value !== null ? this.organisationForm.controls['orgCountry'].value : '').subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.cityPageNumber , this.cities , data.responseData.comboList)
        this.cityPageNumber = this.getData.pageNumber;
        this.cities = this.getData.dataList;
        this.Cityscrollsync = false;
      }
    );
  }else {
    this.cities = [];
    this.cityPageNumber = 1;
    this.Cityscrollsync = false;
    this.commonService.openToastWarningMessage("Kindly select country and state");
    }
  }

  listOfCurrencyCd(searchValue) {
    this.currencyCdScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.samsService.listOfCurCdCombo, searchValue.term, '', '', this.limitCount, this.currencyCodePageNumber,this.organisationForm.controls.orgCountry.value).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.currencyCodePageNumber , this.currencycdList , data.responseData.comboList)
        this.currencyCodePageNumber = this.getData.pageNumber;
        this.currencycdList = this.getData.dataList;
        this.currencyCdScrollsync = false;
      }
    );
  }
  getCurrencyCodeList(event){
    if(event===undefined){
      this.currencyCodePageNumber=1;
      this.currencycdList = [];
    }
  }
  //TO MAKE CITY AS EMPTY WHEN STATE FIELD IS CLEARED
  getStateList(event) {
    if (event == undefined) {
      this.organisationForm.controls['orgCity'].setValue('');
      this.organisationForm.controls['orgCityId'].setValue(0);
      this.organisationForm.controls['orgState'].setValue('');
      this.organisationForm.controls['stateId'].setValue(0);
      this.organisationForm.controls['orgCity'].markAsTouched();
      this.organisationForm.controls['orgState'].markAsTouched();
      this.cities =[];
      this.states = [];
      this.cityPageNumber=1;
      this.statePageNumber = 1;
      this.organisationForm.controls['orgCity'].disable();
    } else {
      this.organisationForm.controls['orgState'].setValue(event.stateName);
      this.organisationForm.controls['stateId'].setValue(event.stateId);
      this.organisationForm.controls['orgCity'].setValue('');
      this.organisationForm.controls['orgCityId'].setValue(0);
      this.cities =[];
      this.cityPageNumber=1;
      this.organisationForm.controls['orgCity'].enable();
    }
  }

  getCityList(event) {
    if (event != null) {
      this.organisationForm.controls['orgCity'].setValue(event.cityName != null ? event.cityName : '');
      this.organisationForm.controls['orgCityId'].setValue(event.cityId != 0 ? event.cityId : 0);
      this.organisationForm.controls['orgState'].setValue(event.stateName != null ? event.stateName : '');
      this.organisationForm.controls['stateId'].setValue(event.stateId != 0 ? event.stateId : 0);
      this.organisationForm.controls['orgCountry'].setValue(event.countryName != null ? event.countryName : '');
      this.organisationForm.controls['countryId'].setValue(event.countryId != 0 ? event.countryId : 0);
      this.cities=[];
      this.cityPageNumber=1;
    } else {
      this.organisationForm.controls['orgCity'].setValue('');
      this.organisationForm.controls['orgCityId'].setValue(0);
      this.cities=[];
      this.cityPageNumber=1;
    }
  }

  getCountryList(event) {
    if (event == null || event == undefined) {
      this.organisationForm.controls['orgCity'].setValue('');
      this.organisationForm.controls['orgCityId'].setValue(0);
      this.organisationForm.controls['orgState'].setValue('');
      this.organisationForm.controls['stateId'].setValue(0);
      this.organisationForm.controls['phoneNo'].setValue(0);
      this.organisationForm.controls['altPhoneNo'].setValue(0);
      this.organisationForm.controls['altPhoneNo'].setValue(0);
      this.organisationForm.controls['orgCity'].markAsTouched();
      this.organisationForm.controls['orgState'].markAsTouched();
      this.organisationForm.controls['orgCountry'].markAsTouched();
      this.countryPageNumber = 1;
      this.statePageNumber = 1;
      this.cityPageNumber = 1;
      this.states = [];
      this.cities = [];
      this.countries =[];
      this.organisationForm.controls['orgState'].disable();
      this.organisationForm.controls['orgCity'].disable();
    } else {
      console.log(event);
      
      this.organisationForm.controls['orgCountry'].setValue(event.countryName);
      this.organisationForm.controls['countryId'].setValue(event.countryId);
      this.organisationForm.controls['phoneNo'].setValue(event.phoneCode);
      this.organisationForm.controls['altPhoneNo'].setValue(event.phoneCode);
      this.statePageNumber = 1;
      this.cityPageNumber = 1;
      this.states = [];
      this.cities = [];
      this.organisationForm.controls['orgState'].enable();
    }
  }

  editMode: boolean = false;

  validateEditMode() {
    //validate url params start  
    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.orgId;
        primaryId = Number(primaryId);
        if (primaryId == 0) {
          this.orgFocus = true;
          this.active.setValue(true);
          this.orgName.enable();
          this.headingDisplay = "Create";
          this.displayButton = "Submit";
        } else {
          this.editMode = true;
          this.orgFocus = true;
          this.disableClear = true;
          this.orgName.disable();
          this.organisationForm.controls['orgCity'].enable();
          this.organisationForm.controls['orgState'].enable();
          this.headingDisplay = "Edit";
          this.displayButton = "Update";
          this.commonService.commonGetService(this.samsService.loadOrganisationDtl, primaryId).subscribe(
            data => {          
              this.organisationForm.patchValue(data.responseData);
              this.serverUrl = this.samsConstants.connectionUrl + "getImage.sams?resourceName=" + this.logoPath.value;
            }, error => {
              this.commonService.openToastWarningMessage(this.samsConstants.serverError);
              // To end loading
            }
          );
        }
      }
    );
    //validate url params end
    
  }

  fileName: string;
  handleFileInput(files: FileList) {
    this.fileToUpload = files[0];
    if (this.fileToUpload.type.split('/')[0] == 'image') {
      if (((this.fileToUpload.size / 1024) / 1024) < 2) {
        this.fileName = this.fileToUpload.name;
        this.logoUploadFlag = true;
      } else {
        this.commonService.openToastWarningMessage('IMAGE_SIZE_2_MB');
        this.logoUploadFlag = false;
      }
    } else {
      this.commonService.openToastWarningMessage('CHOOSE_VALID_FILE');
      this.fileToUpload = null;
    }
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  uploadFile() { 
    if(this.fileToUpload != null){
      let formData: FormData = new FormData();
      formData.append('logo', this.fileToUpload);
      formData.append('orgId', this.organizationId.value);
      this.commonService.commonFileUpload(this.samsService.uploadLogo, formData).subscribe(
        data => {
          if (data.success) {
            this.uploadOrganizationFlag=false;
            this.router.navigate(['home/settingsmaster/organization']);
          } else {
            this.commonService.openToastErrorMessage(data.message);
          }
        }, error => {
          this.commonService.openToastErrorMessage(this.samsConstants.serverError);
        }
      );
    }else{
      this.uploadOrganizationFlag=false;
        this.router.navigate(['home/settingsmaster/organization']);
    
    }
    
  }

  triggerClickEvent() {
    this.imageUpload.nativeElement.click();
  }

  exit() {
    this.locationNavigate.back();
  }

  backToOrganization(){
     this.locationNavigate.back();
   }

}
