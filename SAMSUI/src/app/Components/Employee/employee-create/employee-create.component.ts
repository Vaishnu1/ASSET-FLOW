import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { MatDialog } from '@angular/material/dialog';
import {  MatTableDataSource } from '@angular/material/table';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeDesignationCreateComponent } from '../subComponents/employee-designation-create/employee-designation-create.component';
import { DeleteConfirmationComponent } from 'src/app/Components/Common-components/delete-confirmation/delete-confirmation.component';
import { SkillsCreateComponent } from '../subComponents/skills-create/skills-create.component';
import { ExperienceCreateComponent } from '../subComponents/experience-create/experience-create.component';
import { QualificationCreateComponent } from '../subComponents/qualification-create/qualification-create.component';
import { EmployeeModel } from 'src/app/Model/master/employee';
import { Location } from '@angular/common';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { Title } from '@angular/platform-browser';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { getData } from 'src/app/Model/common/fetchListData';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit,OnDestroy {
  step = 0;
  tempValue: string = '';
  ErrorMsg: string;
  tempImage: string = '';
  public fileToUpload: File;
  public uploadEmpFlag:boolean=false;
  public serverUrl: string;
  uploadFlag: boolean = false;
  editEmp: boolean = false;
  formOneValid: boolean = false;  // valid if form one
  formTwoValid: boolean = false;  // valid if form two
  formTwoDirty: boolean = false;  // make dirty form two touched
  formThreeValid: boolean = false;
  public signFileToUpload: File;
  uploadEmpSignatureFlag: boolean = false;

  // Set Page Title
  title = 'Asset Optima - Employee';
  // FormGrup
  employeeForm: FormGroup; 
  @ViewChild('fileInput_1') fileInput_1: ElementRef;
  @ViewChild('employeeCodeFocus') employeeCodeFocusSet : ElementRef;
  public employeeModel: EmployeeModel;
  formData: FormData = new FormData;
  hide:boolean = true;
  empData: any;
  empImg: boolean = false;
  showCTC: boolean = false;
  //Variables
  departmentList: any[] =[];
  designationList: any[] =[];
  employeeList: any[] =[];
  reportingList: any[] =[];
  ResstatesList: any[] = [];
  RescountriesList: any[] = [];
  PmtcountriesList: any[] = [];
  PmtstatesList: any[] = [];
  limitCount:any;
  skipCount:any;
  searchKey:any = '';
  imgPath: any;
  empUrl: any;
  locChecked: boolean = false;

  //Heading static
  displayButton: string;
  headingDisplay: string;
  disableClear: boolean =false;
  currentPageNumber: number;
  recordsPerPageForCombo: number;
  showRelieving: boolean = false;
  listOfempLoc=[];
  replaceEmployeeList: any[] =[];
  locationList: any[] =[];
  showReplaceEmp: boolean = false;
  minDate: Date;
  selectedIndex: number = 0;
  maxNumberOfTabs: number = 6;
  employeeRelievingStatus:boolean=false;
  selectedItem: any = 0;

  // Table display columns
  designationDispCol = ['sno','designationName','fromDateDisp','tillDateDisp','reportingPersonName','reportingHodName','action'];
  skillTrainingDispCol=['sno','skillName','noOfYears','level','remarks','action'];
  experienceDispCol=['sno','companyName','startDateDisp','endDateDisp','designation','address','action'];
  qualificationDispCol=['sno','qualificationName','startDateDisp','completedDateDisp','university','percentage','yearOfPassing','action']
  locationAccessDispCol=['sno','locName','assign', 'DefaultLoc'];

  //Cities list combo
  resCitiesList: any[] =[];
  pmtCitiesList: any[] = [];
  

  //Datasources
  designationDataSource = new MatTableDataSource<any>();
  skillTraingDataSource = new MatTableDataSource<any>();
  experienceDataSource = new MatTableDataSource<any>();
  qualificationDataSource = new MatTableDataSource<any>();
  locationAccessDataSource: any[] =[];

 //Employee Title
 employeeTitle = [
  {id: 1, name: 'Mr.'},
  {id: 2, name: 'Ms.'},
  {id: 3, name: 'Mrs.'},
  {id: 4, name:'Dr.'}
];

  //Gender combo
  gender = [
    {id: 1, name: 'MALE'},
    {id: 2, name: 'FEMALE'},
    {id: 3, name: 'TRANSGENDER'}
  ];

// Blood Group List
bloodGroupList = [
  {id:1, name:'A+'},
  {id:2, name:'O+'},
  {id:3, name:'B+'},
  {id:4, name:'AB+'},
  {id:5, name:'A-'},
  {id:6, name:'O-'},
  {id:7, name:'B-'},
  {id:8, name:'AB-'},
]

dialogRef;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  scrollDepartmentNamesync : boolean = false;
  scrollLocationNamesync : boolean = false;
  scrollEmployeeReplaceNamesync : boolean = false;
  scrollCountryForm1sync : boolean = false;
  scrollStateForm1sync : boolean = false;
  scrollCityForm1sync : boolean = false;
  scrollCountryForm2sync : boolean = false;
  scrollStateForm2sync : boolean = false;
  scrollCityForm2sync : boolean = false;
  scrollDesignationsync : boolean = false;
  departmentPageNumber : number;
  locationPageNumber : number;
  employeeReplaceForComboPageNumber : number;
  countryForm1PageNumber : number;
  stateForm1PageNumber : number;
  cityForm1PageNumber : number;
  countryForm2PageNumber : number;
  stateForm2PageNumber : number;
  cityForm2PageNumber : number;
  designationPageNumber : number;

  designationDataSourceTempPush: any = [];
  skillTraingDataSourceTempPush: any = [];
  experienceDataSourceTempPush: any = [];
  qualificationDataSourceTempPush: any = [];
  getData: getData;




  constructor(private commonService:CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private assetOptimaConstants: AssetOptimaConstants,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private detectorRefs: ChangeDetectorRef,
    private locationNavigation: Location,
    private userSession: UserSessionService,
    private titleService: Title) { 
      this.recordsPerPageForCombo = 10;
      this.currentPageNumber = 1;
      this.employeeModel=new EmployeeModel(); 
      this.departmentPageNumber = 1;
      this.locationPageNumber = 1;
      this.employeeReplaceForComboPageNumber= 1; 
      this.countryForm1PageNumber =1;
      this.stateForm1PageNumber =1;
      this.cityForm1PageNumber =1;
      this.countryForm2PageNumber =1;
      this.stateForm2PageNumber =1;
      this.cityForm2PageNumber =1;    
      this.designationPageNumber =1;
      this.getData = new getData();
    }

  ngOnInit() {
    this.designationDataSource.data=[];
    this.skillTraingDataSource.data=[];
    this.titleService.setTitle(this.title);
    this.employeeForm = new FormGroup({
      employeeCode: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern(/^[^-\s][a-zA-Z0-9_\s-]+$/)]),
      employeeTitle: new FormControl('',Validators.required),
      employeeFirstName: new FormControl('',[Validators.required, Validators.maxLength(100)]),
      employeeLastName: new FormControl('',Validators.maxLength(100)),
      employeeId: new FormControl(''),
      officeContactNo: new FormControl('',[Validators.minLength(10),Validators.maxLength(15),Validators.pattern(this.assetOptimaConstants.phoneNumberValidation)]),
      officeEmailId: new FormControl(''),
      dateofRelieving: new FormControl(''),
      dateOfRelievingDisp: new FormControl(''),
      employeeStatus: new FormControl('WORKING', Validators.required),
      dateOfJoining: new FormControl(null),
      dateOfJoiningDisp: new FormControl(''),
      personalContactNo: new FormControl('',[Validators.minLength(10),Validators.maxLength(15),Validators.pattern(this.assetOptimaConstants.phoneNumberValidation)]),
      personalEmailId: new FormControl('',[Validators.maxLength(50),Validators.pattern(this.assetOptimaConstants.emailValidation)]),
      departmentId: new FormControl(''),
      departmentName: new FormControl(null, Validators.required),
      designationId: new FormControl(''),
      designationName:new FormControl(null, Validators.required),
      gender: new FormControl(''),
      imagePath: new FormControl(''),
      resAddress1: new FormControl('', [Validators.maxLength(100)]),
      resAddress2: new FormControl('', [Validators.maxLength(100)]),
      resCity: new FormControl(''),
      resCityId: new FormControl(0),
      resState: new FormControl(''),
      resStateId: new FormControl(0),
      resCountry:new FormControl(''),
      resCountryId: new FormControl(0),
      resPostalCd:new FormControl('', [Validators.maxLength(10)]),   
      stateId: new FormControl(''),
      bloodGroup: new FormControl(''),
      sameAdd: new FormControl(false),
      dob: new FormControl(null),
      dobDisp: new FormControl(''),
      fatherName: new FormControl('',Validators.maxLength(100)),
      panNo: new FormControl('',Validators.maxLength(50)),
      adhaarNo: new FormControl('', [Validators.maxLength(12),Validators.pattern(this.assetOptimaConstants.numericValidation)]),
      pmtAddress1: new FormControl('', [Validators.maxLength(100)]),
      pmtAddress2: new FormControl('', [Validators.maxLength(100)]),
      pmtCity: new FormControl(''),
      pmtCityId: new FormControl(0),
      pmtState: new FormControl(''),
      pmtStateId: new FormControl(0),
      pmtCountry: new FormControl(''),
      pmtCountryId: new FormControl(0),
      empLocation: new FormControl(''),
      pmtPostalCode: new FormControl('', [Validators.maxLength(10)]),
      accessLocId: new FormControl(''),
      accessLocName: new FormControl(''),
      defaultLocation: new FormControl(''),
      locationCode: new FormControl(''),
      replaceEmployee:  new FormControl('',Validators.required),
      replaceEmpStatus: new FormControl(''),
     
      //Location Access LIst
      empLocSelected: new FormControl(''),
      //Array list
      empDesignationList: new FormControl([]),
      qualificationList: new FormControl([]),
      skillList: new FormControl([]),
      experienceList: new FormControl([]),
      //COMMON OBJECTS
      createdBy: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy : new FormControl(''),
      updatedDtDisp: new FormControl(''),
      pageNumber: new FormControl(''),
      recordsPerPage: new FormControl(''),
      orgName: new FormControl(''),
      orgId: new FormControl(''),
      active: new FormControl(true),
      createdDt: new FormControl(''),
      updatedDt: new FormControl(''),
      serviceEngineer : new FormControl(''),

      locationAccessList: new FormControl([]),


      
    });

    this.employeeForm.controls.pmtState.disable();
    this.employeeForm.controls.pmtCity.disable();
    this.employeeForm.controls.resState.disable();
    this.employeeForm.controls.resCity.disable();
    this.employeeForm.controls.empLocation.disable();
    this.employeeForm.controls.replaceEmployee.disable();
    this.commonService.setFormFocus(this.employeeCodeFocusSet);
    //Edit Method
    this.validateEditMode();
    this.departmentPageNumber = 1;  
    this.locationPageNumber = 1;   
    this.employeeReplaceForComboPageNumber =1;
    this.countryForm1PageNumber =1;
    this.stateForm1PageNumber =1;
    this.cityForm1PageNumber =1;
    this.countryForm2PageNumber =1;
    this.stateForm2PageNumber =1;
    this.cityForm2PageNumber =1;   
  }
  ngOnDestroy(){ 
    if(this.dialogRef!=null){
     this.dialogRef.close();
    }
  }

validateEditMode() {
  this.activatedRoute.params.subscribe(
    params => {
      var primaryId = params.pId;
      primaryId = Number(primaryId);
      if (primaryId <= 0) {
        //button and heading names for add
        this.headingDisplay = "Create";
        this.displayButton = "Submit";        
        this.fetchListOfEmployeeLoc(primaryId);
      } else {
        //button and heading names for edit
        this.headingDisplay = "Edit";
        this.displayButton = "Update";
        this.disableClear = true;
        this.employeeForm.controls['resState'].enable();
        this.employeeForm.controls['resCity'].enable();
        this.employeeForm.controls['pmtState'].enable();
        this.employeeForm.controls['pmtCity'].enable();
        this.commonService.commonGetService(this.assetOptimaServices.loadEmployeeDtl, primaryId).subscribe(
          data => {
            this.employeeForm.patchValue(data.responseData);
            if(data.responseData.imagePath!='') {
              this.empImg = true;
              this.imgPath = data.responseData.imagePath;
              this.empUrl = this.assetOptimaConstants.connectionUrl + "getImage.sams?resourceName=";
            } else {
              this.empImg = false;
            }
            this.formOneValidation();
            this.editEmp = true;
            this.tempValue = data.responseData.employeeCode!= null ? data.responseData.employeeCode : '';
            if(data.responseData.replaceEmpStatus == true) {
              this.showReplaceEmp = true;
            } else {
              this.showReplaceEmp = false;
            }
            this.designationDataSource.data = this.employeeForm.get('empDesignationList').value;
            this.employeeForm.controls.empDesignationList.setValue(this.designationDataSource.data);
            this.skillTraingDataSource.data = this.employeeForm.get('skillList').value;
            this.employeeForm.controls.skillList.setValue(this.skillTraingDataSource.data);

            this.experienceDataSource.data = this.employeeForm.get('experienceList').value;
            this.employeeForm.controls.experienceList.setValue(this.experienceDataSource.data);
            this.qualificationDataSource.data = this.employeeForm.get('qualificationList').value;
            this.employeeForm.controls.qualificationList.setValue(this.qualificationDataSource.data);
            this.employeeForm.controls.imagePath.setValue(data.responseData.imagePath);

            this.fetchListOfEmployeeLoc(primaryId);
          }
        )
      }
     
    }
  );
}

submit() {
  this.uploadFlag = true;
  this.employeeForm.controls.dateOfJoiningDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.employeeForm.controls.dateOfJoiningDisp.value));
  this.employeeForm.controls.dobDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.employeeForm.controls.dobDisp.value));
  this.employeeForm.controls.empDesignationList.setValue(this.designationDataSource.data);
  this.employeeForm.controls.skillList.setValue(this.skillTraingDataSource.data);  
  this.employeeForm.controls.qualificationList.setValue(this.qualificationDataSource.data);
  this.employeeForm.controls.experienceList.setValue(this.experienceDataSource.data);
  this.employeeForm.controls.locationAccessList.setValue(this.locationAccessDataSource);
  if(this.employeeForm.controls.employeeStatus.value === 'RELIEVED')
  {
    this.employeeForm.controls.dateOfRelievingDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.employeeForm.controls.dateOfRelievingDisp.value));
  }
  //save or update employee service
    this.commonService.commonInsertService('saveOrUpdateEmployee.sams', this.employeeForm.getRawValue()).subscribe(
    data => {
      if (data.success) {
        if(data.responseData) {
          if(this.uploadEmpSignatureFlag) {
            this.uploadSignature(data.responseData);
          }else {
            this.commonService.openToastSuccessMessage(data.message);
            // this.locationNavigation.back();
          }
          if(this.uploadEmpFlag) {
            this.uploadFile(data.responseData);
          }
          else {
            this.commonService.openToastSuccessMessage(data.message);
            // this.locationNavigation.back();
          }
          this.uploadFlag = false;
        }
        
      } else {
        this.commonService.openToastErrorMessage(data.message);
        this.uploadFlag = false;
      }
    }, error =>{
      this.uploadFlag = false;
    }
  )
}

employeeStatus = [
  {id: 1, name: 'WORKING'},
  {id: 2, name: 'RETIRED'},
  {id: 3, name: 'LONG-LEAVE'},
  {id: 4, name: 'MEDICAL LEAVE'},
  {id: 5, name: 'RELIEVED'}
];

level = [
  {id: 1, name: '1'},
  {id: 2, name: '2'},
  {id: 3, name: '3'},
  {id: 4, name: '4'},
  {id: 5, name: '5'},
  {id: 6, name: '6'},
  {id: 7, name: '7'},
  {id: 8, name: '8'},
  {id: 9, name: '9'},
  {id: 10, name: '10'}

];

dateValidation(event){
  return false;
}

dateValidation1(event){
  return false;
}

dateValidationdob(event){
  return false;
}

getStatus(statusvalue) { 
  if(statusvalue =='RELIEVED') {
    this.showRelieving=true;
  } else {
    this.showRelieving=false;
  }
}

setStep(index: number) {
  this.step = index;
}


//List All items
listOfDepartment(searchTerms){
  this.scrollDepartmentNamesync = true;
  this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
  this.commonService.getComboResults(this.assetOptimaServices.listOfAllDeparment, searchTerms.term, '', '', this.limitCount, this.departmentPageNumber).subscribe(
    (data) =>{
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchTerms, this.departmentPageNumber , this.departmentList , data.responseData.comboList)
      this.departmentPageNumber = this.getData.pageNumber;
      this.departmentList = this.getData.dataList;
      this.scrollDepartmentNamesync = false;
   }
  );
}

getDepartmentValue(event){
  if (event === undefined) {
    this.employeeForm.get('departmentId').setValue(0);
    this.departmentList = [];
    this.departmentPageNumber = 1;
  } else {
    this.employeeForm.get('departmentId').setValue(event.departmentId);
  }
}

//List of designation
listOfDesignation(searchValue){
  this.scrollDesignationsync = true;
  this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
  this.commonService.getComboResults(this.assetOptimaServices.listOfAllDesignationCombo,searchValue.term,'','',this.limitCount, this.designationPageNumber).subscribe(
    (data) =>{
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchValue, this.designationPageNumber , this.designationList , data.responseData.comboList)
      this.designationPageNumber = this.getData.pageNumber;
      this.designationList = this.getData.dataList;
      this.scrollDesignationsync =false;
    }
  );
}

getDesignationValue(event){
  if (event === undefined) {
    this.employeeForm.get('designationId').setValue(0);
    this.designationList = [];
    this.designationPageNumber = 1;
  } else {
    this.employeeForm.get('designationId').setValue(event.designationId);
  }
}

//List All Employees

listOfEmployees(searchValue){
  this.commonService.getComboResults(this.assetOptimaServices.listAllEmployeeForOrgCombo,searchValue.term).subscribe(
    (data) =>{
      this.employeeList = data.responseData.comboList;
    }
  );
}

getReportingManagerValue(event){
  this.employeeForm.get('reportingManagerId').setValue(event.employeeId);
}

listOfReportingHOD(searchValue) {
  this.commonService.getComboResults(this.assetOptimaServices.listAllEmployeeForOrgCombo,searchValue.term).subscribe(
    (data) =>{
      this.reportingList = data.responseData.comboList;
    }
  );
}

getReportingHodValue(event){
  this.employeeForm.get('reportingHodId').setValue(event.employeeId);
}

getResCountryData(searchValue){
  this.scrollCountryForm1sync = true;
  this.limitCount = (searchValue.term === '' || searchValue.term  === undefined || searchValue.term  === null) ? '50' : '';
  this.commonService.getComboResults(this.assetOptimaServices.listOfAllCountryForCombo, searchValue.term,'','',this.limitCount, this.countryForm1PageNumber).subscribe(
    (data) => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchValue, this.countryForm1PageNumber , this.RescountriesList , data.responseData.comboList)
      this.countryForm1PageNumber = this.getData.pageNumber;
      this.RescountriesList = this.getData.dataList;
      this.scrollCountryForm1sync = false;
  });
}

getResCountryValue(event){
  
  this.employeeForm.controls.resState.disable();
  this.employeeForm.controls.resCity.disable();
  
  
  this.employeeForm.get('resCity').setValue('');
  this.employeeForm.get('resCityId').setValue(0);   
  this.employeeForm.get('resCity').disable();
  this.employeeForm.get('resState').setValue('');
  this.employeeForm.get('resStateId').setValue(0);   
  this.employeeForm.get('resState').disable();
  
  if (event === undefined) {
    this.employeeForm.get('resCountryId').setValue(0);
    this.RescountriesList = [];
    this.countryForm1PageNumber = 1;
    this.stateForm1PageNumber = 1;
    this.ResstatesList = [];
  } else {

    this.employeeForm.controls.resState.enable();

    this.employeeForm.get('resCountryId').setValue(event.countryId);
    this.stateForm1PageNumber = 1;
    this.ResstatesList = [];
  }
}

getResStateData(searchTerms){
  const resconId = this.employeeForm.controls.resCountryId.value;
  this.scrollStateForm1sync = true;
  if(resconId  > 0 ){
  this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '50' : '';
  this.commonService.getComboResults(this.assetOptimaServices.listOfStateCombo, searchTerms.term, resconId, '', this.limitCount, this.stateForm1PageNumber).subscribe(
    (data) => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchTerms, this.stateForm1PageNumber , this.ResstatesList , data.responseData.comboList)
      this.stateForm1PageNumber = this.getData.pageNumber;
      this.ResstatesList = this.getData.dataList;
      this.scrollStateForm1sync = false;
   }
  );
  }else {
    this.ResstatesList = [];
    this.stateForm1PageNumber = 1;
    this.scrollStateForm1sync = false;
    this.commonService.openToastWarningMessage("Kindly select country");
  }
}

getResStateValue(event){
  
  this.employeeForm.get('resCity').setValue('');
  this.employeeForm.get('resCityId').setValue(0);   
  this.employeeForm.get('resCity').disable();

  if (event === undefined) {
    this.employeeForm.get('resState').setValue('');
    this.employeeForm.get('resStateId').setValue(0);    
    this.ResstatesList = [];
    this.stateForm1PageNumber = 1;
    this.resCitiesList =[];
    this.cityForm1PageNumber=1;
  } else {
    this.employeeForm.get('resCity').enable();
    this.employeeForm.get('resState').setValue(event.stateName);
    this.employeeForm.get('resStateId').setValue(event.stateId); 
    this.resCitiesList =[];
    this.cityForm1PageNumber=1;
  }

}

getResCityData(searchTerms){
  const resStateId = this.employeeForm.controls.resStateId.value;
  const resCountryId = this.employeeForm.controls.resCountryId.value;
  this.scrollCityForm1sync = true;
  if(resStateId  > 0){
  this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '50' : '';
  this.commonService.getComboResults(this.assetOptimaServices.listOfCityCombo, searchTerms.term,
    resStateId != 0 ? resStateId : '',resCountryId != 0 ? resCountryId : '', this.limitCount, this.cityForm1PageNumber).subscribe(
    (data) => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchTerms, this.cityForm1PageNumber , this.resCitiesList , data.responseData.comboList)
      this.cityForm1PageNumber = this.getData.pageNumber;
      this.resCitiesList = this.getData.dataList;
      this.scrollCityForm1sync = false;
     }
  );
  }else{
    this.resCitiesList = [];
    this.cityForm1PageNumber = 1;
    this.scrollCityForm1sync = false;
    this.commonService.openToastWarningMessage("Kindly select Country and State");
    }
}

getResCityList(event){
  if (event === undefined || event === null) {
    this.employeeForm.controls['resCity'].setValue('');
    this.employeeForm.controls['resCityId'].setValue(0);
    this.resCitiesList = [];
    this.cityForm1PageNumber = 1;
  } else {
    this.employeeForm.controls['resCity'].setValue(event.cityName!= null ?event.cityName : '');
   this.employeeForm.controls['resCityId'].setValue(event.cityId != 0 ? event.cityId : 0);
    this.employeeForm.controls['resState'].setValue(event.stateName!= null ?event.stateName : '');
    this.employeeForm.controls['resStateId'].setValue(event.stateId!= 0 ? event.stateId : 0);
    this.employeeForm.controls['resCountry'].setValue(event.countryName!= null ? event.countryName : '');
    this.employeeForm.controls['resCountryId'].setValue(event.countryId!= 0 ? event.countryId : 0);
  }
  }


getPmtCountryData(searchValue){
  this.scrollCountryForm2sync = true;
  this.limitCount = (searchValue.term  === '' || searchValue.term === undefined || searchValue.term === null) ? '50' : '';
  this.commonService.getComboResults(this.assetOptimaServices.listOfAllCountryForCombo, searchValue.term,'', '', this.limitCount, this.countryForm2PageNumber).subscribe(
    (data) => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchValue, this.countryForm2PageNumber , this.PmtcountriesList , data.responseData.comboList)
      this.countryForm2PageNumber = this.getData.pageNumber;
      this.PmtcountriesList = this.getData.dataList;
      this.scrollCountryForm2sync = false;
  });
}

getPmtCountryValue(event){

  this.employeeForm.get('pmtCity').setValue('');
  this.employeeForm.get('pmtCityId').setValue(0);   
  this.employeeForm.get('pmtCity').disable();
  this.employeeForm.get('pmtState').setValue('');
  this.employeeForm.get('pmtStateId').setValue(0);   
  this.employeeForm.get('pmtState').disable();

  if (event === undefined) {
    this.employeeForm.get('pmtCountryId').setValue(0);
    this.PmtcountriesList = [];
    this.countryForm2PageNumber = 1;
    this.stateForm2PageNumber = 1;
    this.PmtstatesList = [];
  } else {
    this.employeeForm.controls.pmtState.enable(); 
    this.employeeForm.get('pmtCountryId').setValue(event.countryId);
    this.stateForm2PageNumber = 1;
    this.PmtstatesList = [];
  }
}

getPmtStateData(searchValue){
  const pmtCountryId = this.employeeForm.controls.pmtCountryId.value;
  this.scrollStateForm2sync = true;
  if(pmtCountryId > 0 ){
  this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '50' : '';
  this.commonService.getComboResults(this.assetOptimaServices.listOfStateCombo, searchValue.term, this.employeeForm.controls.pmtCountryId.value, '', this.limitCount, this.stateForm2PageNumber,pmtCountryId !== 0 ? pmtCountryId : '').subscribe(
    (data) => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchValue, this.stateForm2PageNumber , this.PmtstatesList , data.responseData.comboList)
      this.stateForm2PageNumber = this.getData.pageNumber;
      this.PmtstatesList = this.getData.dataList;
      this.scrollStateForm2sync = false;   
  }
  );
}else{
    this.PmtstatesList = [];
    this.stateForm2PageNumber = 1;
    this.scrollStateForm2sync = false;
    this.commonService.openToastWarningMessage("Kindly select country");
  }
}
getPmtStateValue(event){

  this.employeeForm.get('pmtCity').setValue('');
  this.employeeForm.get('pmtCityId').setValue(0);   
  this.employeeForm.get('pmtCity').disable();

  if (event === undefined) {
    this.employeeForm.get('pmtState').setValue(event.stateName);
    this.employeeForm.get('pmtStateId').setValue(event.stateId);
    this.PmtstatesList = [];
    this.stateForm2PageNumber = 1;
    this.pmtCitiesList =[];
    this.cityForm2PageNumber=1;
  } else {
  this.employeeForm.get('pmtCity').enable();
    this.employeeForm.get('pmtState').setValue(event.stateName);
    this.employeeForm.get('pmtStateId').setValue(event.stateId);
    this.employeeForm.controls['pmtCity'].setValue('');
    this.employeeForm.controls['pmtCityId'].setValue(0);
    this.pmtCitiesList =[];
    this.cityForm2PageNumber=1;
  }

}

getPmtCityData(searchValue){
 const pmtStateId = this.employeeForm.controls.pmtStateId.value;
 const pmtCountryId= this.employeeForm.controls.pmtCountryId.value;
 this.scrollCityForm2sync = true;
  if(pmtStateId  > 0){
  this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '50' : '';
  this.commonService.getComboResults(this.assetOptimaServices.listOfCityCombo, searchValue.term,
    pmtStateId != 0 ? pmtStateId : '',pmtCountryId != 0 ? pmtCountryId : '', this.limitCount, this.cityForm2PageNumber).subscribe(
    (data) => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchValue, this.cityForm2PageNumber , this.pmtCitiesList , data.responseData.comboList)
      this.cityForm2PageNumber = this.getData.pageNumber;
      this.pmtCitiesList = this.getData.dataList;
      this.scrollCityForm2sync = false;
    }
  );
  }else {
    this.pmtCitiesList = [];
    this.cityForm2PageNumber = 1;
    this.scrollCityForm2sync = false;
    this.commonService.openToastWarningMessage("Kindly select country and state");
  }
}

getPmtCityList(event){
  
  if (event === undefined || event=== null) {
    this.employeeForm.controls['pmtCity'].setValue('');
    this.employeeForm.controls['pmtCityId'].setValue(0);
    this.pmtCitiesList = [];
    this.cityForm2PageNumber = 1;
  } else {
    this.employeeForm.controls['pmtCity'].setValue(event.cityName!= null ?event.cityName : '');
    this.employeeForm.controls['pmtCityId'].setValue(event.cityId != 0 ? event.cityId : 0);
    this.employeeForm.controls['pmtState'].setValue(event.stateName!= null ?event.stateName : '');
    this.employeeForm.controls['pmtStateId'].setValue(event.stateId!= 0 ? event.stateId : 0);
    this.employeeForm.controls['pmtCountry'].setValue(event.countryName!= null ? event.countryName : '');
    this.employeeForm.controls['pmtCountryId'].setValue(event.countryId!= 0 ? event.countryId : 0);
    }
  }


//copy residential address and paste to permanent address fields
SameAddresses_Change(updateDetailsFlag) {
  const Status = this.employeeForm.controls['sameAdd'].value;
    if (Status && updateDetailsFlag) {
      this.employeeForm.controls['pmtAddress1'].setValue(this.employeeForm.controls['resAddress1'].value);
      this.employeeForm.controls['pmtAddress2'].setValue(this.employeeForm.controls['resAddress2'].value);
      this.employeeForm.controls['pmtCity'].setValue(this.employeeForm.controls['resCity'].value);
      this.employeeForm.controls['pmtState'].setValue(this.employeeForm.controls['resState'].value);
      this.employeeForm.controls['pmtCountry'].setValue(this.employeeForm.controls['resCountry'].value);
      this.employeeForm.controls['pmtPostalCode'].setValue(this.employeeForm.controls['resPostalCd'].value);
      setTimeout(() => {
        this.employeeForm.controls['pmtAddress1'].disable();
        this.employeeForm.controls['pmtAddress2'].disable();
        this.employeeForm.controls['pmtCity'].disable();
        this.employeeForm.controls['pmtState'].disable();
        this.employeeForm.controls['pmtCountry'].disable();
        this.employeeForm.controls['pmtPostalCode'].disable();
      }, 100);
    } else {
      this.employeeForm.controls['pmtAddress1'].enable();
      this.employeeForm.controls['pmtAddress2'].enable();
      this.employeeForm.controls['pmtCity'].enable();
      this.employeeForm.controls['pmtState'].enable();
      this.employeeForm.controls['pmtCountry'].enable();
      this.employeeForm.controls['pmtPostalCode'].enable();
    }
  }

  //Add Designation
  employeeDesignationAddEdit(element) {
    this.dialogRef = this.dialog.open(EmployeeDesignationCreateComponent, {
      height: 'auto',
      width: '500px',
      data: {
        'designation': element
      }
    });
    this.dialogRef.disableClose = true;
    this.dialogRef.afterClosed().subscribe(
      data => {
        if(data) {
          if(data !== null && data !== undefined && data !== '') {
            if(this.designationDataSource.data.length != 0){
              this.designationDataSourceTempPush = this.designationDataSource.data;
            }
            let index = this.commonService.getIndexOfTheItem(this.designationDataSource.data, true, 'designationName', data.designationName);
            if (index == -1) {
              this.designationDataSourceTempPush.push(data);
              this.designationDataSource.data = this.designationDataSourceTempPush;
            }else{
              this.commonService.openToastWarningMessage('Designation Already Added!');
            }
            }
        }
      });
  }

  //Delete Designation
  DeleteDesignation(deleteid,index) {  
    this.dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Designation'
      }
    });
    this.dialogRef.disableClose = true;
    this.dialogRef.afterClosed().subscribe(
      data => {
          if(data.status){
            if(deleteid === undefined ? deleteid =0 : deleteid )
            if(deleteid <= 0){
              this.designationDataSourceTempPush = this.designationDataSource.data;
              this.designationDataSourceTempPush.splice(index, 1);
              this.designationDataSource.data = this.designationDataSourceTempPush;
              this.detectorRefs.detectChanges();
            } else {
              this.commonService.commonGetService('deleteDesignation.sams',deleteid).subscribe(
                data=>{
                  if(data.success){
                    this.designationDataSourceTempPush = this.designationDataSource.data;
                    this.designationDataSourceTempPush.splice(index, 1);
                    this.designationDataSource.data = this.designationDataSourceTempPush;
                    this.detectorRefs.detectChanges();
                   
                  }else{ 
                    this.commonService.openToastErrorMessage(data.message);
                  }
                }  
              );
            }
          }
      });   
    }

  // Employee Skills Add
  employeeSkillsAddEdit(element) {
    this.dialogRef = this.dialog.open(SkillsCreateComponent, {
      height: 'auto',
      width: '500px',
      data: {
        'skills': element
      }
    });
    this.dialogRef.disableClose = true;
    this.dialogRef.afterClosed().subscribe(
      data => {
        if(data) {
          if(data !== null && data !== undefined && data !== '') {
            if(this.skillTraingDataSource.data.length != 0){
              this.skillTraingDataSourceTempPush = this.skillTraingDataSource.data;
            }
            let index = this.commonService.getIndexOfTheItem(this.skillTraingDataSource.data, true, 'skillName', data.skillName);
            if (index == -1) {
              this.skillTraingDataSourceTempPush.push(data);
            this.skillTraingDataSource.data = this.skillTraingDataSourceTempPush;
            }else{
              this.commonService.openToastWarningMessage('Skill Already Added!');
            }
            }
        }
      });
  }

//Delete Skill
DeleteSkill(deleteid,index) {  
  this.dialogRef = this.dialog.open(DeleteConfirmationComponent, {
  height: 'auto',
  width: '400px',
  data: {
    'Text': 'Skill'
  }
});

this.dialogRef.disableClose = true;
this.dialogRef.afterClosed().subscribe(
  data => {
     
      if(data.status){
        if(deleteid <= 0){
          this.skillTraingDataSourceTempPush = this.skillTraingDataSource.data;
          this.skillTraingDataSourceTempPush.splice(index, 1);
          this.skillTraingDataSource.data = this.skillTraingDataSourceTempPush;
          this.detectorRefs.detectChanges();
        } else {
          this.commonService.commonGetService('deleteSkill.sams',deleteid).subscribe(
            data=>{
              if(data.success){
                this.skillTraingDataSourceTempPush = this.skillTraingDataSource.data;
                this.skillTraingDataSourceTempPush.splice(index, 1);
                this.skillTraingDataSource.data = this.skillTraingDataSourceTempPush;
                this.detectorRefs.detectChanges();    
              }else{ 
                this.commonService.openToastErrorMessage(data.message);
              }
            }  
          );
        }
      }
  });   
}

// Add Experience
employeeExperienceAddEdit(element) {
  this.dialogRef = this.dialog.open(ExperienceCreateComponent, {
    height: 'auto',
    width: '500px',
    data: {
      'experience': element
    }
  });
  this.dialogRef.disableClose = true;
  this.dialogRef.afterClosed().subscribe(
    data => {
      if(data) {
        if(data !== null && data !== undefined && data !== '') {
          if(this.experienceDataSource.data.length != 0){
            this.skillTraingDataSourceTempPush = this.experienceDataSource.data;
          }
          let index = this.commonService.getIndexOfTheItem(this.experienceDataSource, true, 'companyName', data.companyName);
            if (index == -1) {
              this.experienceDataSourceTempPush.push(data);
              this.experienceDataSource.data = this.experienceDataSourceTempPush;
          }else{
              this.commonService.openToastWarningMessage('Experience Already Added!');
            }
          }
      }
    });
}

//Delete Experience
DeleteExperience(deleteid,index) {  
  this.dialogRef = this.dialog.open(DeleteConfirmationComponent, {
    height: 'auto',
    width: '400px',
    data: {
      'Text': 'Experience'
    }
  });
  this.dialogRef.disableClose = true;
  this.dialogRef.afterClosed().subscribe(
    data => {
        if(data.status){
          if(deleteid <= 0){
            this.experienceDataSourceTempPush = this.experienceDataSource.data;
            this.experienceDataSourceTempPush.splice(index, 1);
            this.experienceDataSource.data = this.experienceDataSourceTempPush;
            this.detectorRefs.detectChanges();
          } else {
            this.commonService.commonGetService('deleteExperience.sams',deleteid).subscribe(
              data=>{
                if(data.success){
                  this.experienceDataSourceTempPush = this.experienceDataSource.data;
                  this.experienceDataSourceTempPush.splice(index, 1);
                  this.experienceDataSource.data = this.experienceDataSourceTempPush;
                  this.detectorRefs.detectChanges();     
                }else{ 
                  this.commonService.openToastErrorMessage(data.message);
                }
              }  
            );
          }
        }
    });   
  }


//Add Qualification
employeeQualificationAddEdit(element) {
  this.dialogRef = this.dialog.open(QualificationCreateComponent, {
    height: 'auto',
    width: '500px',
    data: {
      'qualification': element
    }
  });
  this.dialogRef.disableClose = true;
  this.dialogRef.afterClosed().subscribe(
    data => {
      if(data) {
        if(data !== null && data !== undefined && data !== '') {
          if(this.qualificationDataSource.data.length != 0){
            this.qualificationDataSourceTempPush = this.qualificationDataSource.data;
          }
          let index = this.commonService.getIndexOfTheItem(this.qualificationDataSource, true, 'qualificationName', data.qualificationName);
          if (index == -1) {
            this.qualificationDataSourceTempPush.push(data);
            this.qualificationDataSource.data = this.qualificationDataSourceTempPush;
        }else{
            this.commonService.openToastWarningMessage('Qualification Already Added!');
          }
         
          }
      }
    });
}

//Delete Experience
  DeleteQualification(deleteid,index) {  
    
    this.dialogRef = this.dialog.open(DeleteConfirmationComponent, {
    height: 'auto',
    width: '400px',
    data: {
    'Text': 'Qualification'
    }
  });
  this.dialogRef.disableClose = true;
  this.dialogRef.afterClosed().subscribe(
    data => {
    if(data.status){
      if(deleteid <= 0){
        this.qualificationDataSourceTempPush = this.qualificationDataSource.data;
        this.qualificationDataSourceTempPush.splice(index, 1);
        this.qualificationDataSource.data = this.qualificationDataSourceTempPush;
        this.detectorRefs.detectChanges();
      } else {
        this.commonService.commonGetService('deleteQualification.sams',deleteid).subscribe(
          data=>{
            if(data.success){
              this.qualificationDataSourceTempPush = this.qualificationDataSource.data;
              this.qualificationDataSourceTempPush.splice(index, 1);
              this.qualificationDataSource.data = this.qualificationDataSourceTempPush;
              this.detectorRefs.detectChanges();    
            }else{ 
              this.commonService.openToastErrorMessage(data.message);
            }
          }  
        );
      }
    }
});   
}


clear(){
  this.experienceDataSourceTempPush = []
  this.experienceDataSource.data = [];
  this.qualificationDataSourceTempPush = [];
  this.qualificationDataSource.data = [];

  this.employeeForm.reset();
  this.employeeForm.updateValueAndValidity();
  this.employeeCodeFocusSet.nativeElement.focus();

  this.ngOnInit();
}

exit() {
  this.locationNavigation.back();
}

  onChange(event, index, emp){
    this.employeeForm.markAsDirty();                     
    if (emp.empLocSelected) {
      this.listOfempLoc.push(emp);
    } else {
      if(this.selectedItem == emp.accessLocId){
        this.selectedItem = 0;
      }
      let indexValue = this.commonService.getIndexOfTheItem(this.listOfempLoc, true, 'accessLocId', emp.accessLocId);
      if (indexValue != -1) {
        this.listOfempLoc.splice(indexValue, 1);
      }
    }
    this.formThreeValidation();
  }
searchByEmployee(searchTerms) {
  this.searchKey = (searchTerms.term !== '') ? searchTerms : '';
  }
// Employee Combo for replacement
listOfReplacement(searchTerms) {
  this.scrollEmployeeReplaceNamesync = true;
  this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults('listAllRelievedEmployeeForOrgCombo.sams',  searchTerms.term, '', '', this.limitCount, this.employeeReplaceForComboPageNumber).subscribe(
    (data) => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchTerms, this.employeeReplaceForComboPageNumber , this.replaceEmployeeList , data.responseData.comboList)
      this.employeeReplaceForComboPageNumber = this.getData.pageNumber;
      this.replaceEmployeeList = this.getData.dataList;
      this.scrollEmployeeReplaceNamesync = false;
    }
  );
}

listOfAllReplacement() {
  this.commonService.getComboResults('listAllRelievedEmployeeForOrgCombo.sams',  this.searchKey, '', '').subscribe(
    (data) => {
      this.replaceEmployeeList = data.responseData.comboList;
    }
  );
}

//List All location
listOfLocation(){
  this.limitCount = (this.searchKey === '' || this.searchKey === null) ? '10' : '';
  this.skipCount = (this.searchKey === '' || this.searchKey === null) ? this.departmentList.length.toString() : '';
  this.commonService.getComboResults('listAllUserLocForCombo.sams', this.searchKey,'','').subscribe(
    data => {
      if(data.success){
         this.locationList = data.responseData.comboList; 
         }
    });
}


listOfAllLocation(searchTerms) {
  this.scrollLocationNamesync = true;
  this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
  this.commonService.getComboResults('listAllUserLocForCombo.sams', searchTerms.term,'','',this.limitCount, this.locationPageNumber).subscribe(
    data => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchTerms, this.locationPageNumber , this.locationList , data.responseData.comboList)
      this.locationPageNumber = this.getData.pageNumber;
      this.locationList = this.getData.dataList;
      this.scrollCityForm2sync = false;
    });
    this.scrollLocationNamesync = false;
}

getLocationChanges(event){
  if (event === undefined) {
    this.employeeForm.get('empLocation').setValue('');
    this.locationList = [];
    this.locationPageNumber = 1;
  } else {
    this.employeeForm.get('empLocation').setValue(event.locationName);
  }
}

getEmployeeReplaceForChanges(event){
  if (event === undefined) {
    this.employeeForm.get('replaceEmployee').setValue('');
    this.replaceEmployeeList = [];
    this.employeeReplaceForComboPageNumber = 1;
  } else {
    this.employeeForm.get('replaceEmployee').setValue(event.employeeFirstName);
  }
}


// Show Replace Employee Field
replaceEmp() {
  const replaceEmpStatus = this.employeeForm.controls['replaceEmpStatus'].value;
  if(replaceEmpStatus) {
    this.showReplaceEmp = true;
    this.employeeForm.controls.empLocation.enable();
    this.employeeForm.controls.replaceEmployee.enable();
  } else {
    this.employeeForm.controls.empLocation.disable();
    this.employeeForm.controls.replaceEmployee.disable();
    this.showReplaceEmp = false;
  }
}


// Date of Joining onchange event
getJoinDate(dojDate) {
  this.employeeForm.controls.dateofRelieving.setValue(dojDate.value);
  this.minDate = new Date(dojDate.value);
}

// Move to Next Tab

nextStep() {
  if (this.selectedIndex != this.maxNumberOfTabs) {
    this.selectedIndex = this.selectedIndex + 1;
  }
}

previousStep() {
  if (this.selectedIndex != 0) {
    this.selectedIndex = this.selectedIndex - 1;
  }
}

// Check unique employee code 
checkUniqueConstrainForEmployee() {
  if(((this.tempValue!= null || this.tempValue!= '') ? this.tempValue.toLowerCase() : '') === 
  ((this.employeeForm.controls.employeeCode.value!= null) ? this.employeeForm.controls.employeeCode.value.toLowerCase():'')) {

}else{
let constraintData: UniqueValidationModel = new UniqueValidationModel();
constraintData.className = "com.sams.to.master.EmployeeTO"; 
constraintData.constraints = { 
 'employeeCode': this.employeeForm.controls.employeeCode.value.toLowerCase(),
 'orgId':this.userSession.getUserOrgId() 
};
this.commonService.checkUniqueValidation(constraintData).subscribe(
 data => {
   if(!data.success){ 
     //show the warning invalidate the form group 
     this.ErrorMsg = data.message;
     this.employeeForm.controls.employeeCode.setErrors(Validators.minLength);
     this.employeeForm.controls.employeeCode.setErrors({"notUnique": true});
     } else {
     this.ErrorMsg = '';
     this.employeeForm.controls.employeeCode.setErrors(null);
     }
 }            
);
}
}
handleFileInput(files: FileList) {
  this.fileToUpload = files[0];
  if (this.fileToUpload.type.split('/')[0] == 'image') {
    if (((this.fileToUpload.size / 1024) / 1024) < 2) {
      this.uploadEmpFlag = true;
    } else {
      this.commonService.openToastWarningMessage('IMAGE_SIZE_2_MB');
      this.uploadEmpFlag = false;
    }

  } else {
    this.commonService.openToastWarningMessage('CHOOSE_VALID_FILE');
    this.fileToUpload = null;
  }

}

uploadFile(empId) {
  let formData: FormData = new FormData();
  formData.append('employeeModel', this.fileToUpload);
  formData.append('employeeId', empId);
  formData.append('orgId', this.employeeForm.controls.orgId.value);
  formData.append('mode',this.headingDisplay);
  this.commonService.commonFileUpload('uploadEmployeeImage.sams', formData).subscribe(
    data => {
      if (data.success) {
        this.commonService.openToastSuccessMessage(data.message);
        this.tempImage = data.responseData;
        this.validateEditMode();
        this.locationNavigation.back();
      } else {
        this.commonService.openToastErrorMessage(data.message);
      }
    }, error => {
      this.commonService.openToastErrorMessage("Error");
    }
  );

}

uploadSignature(empId: string) {

    let formData: FormData = new FormData();
    formData.append('employeeModel', this.signFileToUpload);  // The file to upload (signature image)
    formData.append('employeeId', empId);    // Employee ID
    formData.append('orgId', this.employeeForm.controls.orgId.value);  // Organization ID
    formData.append('mode', this.headingDisplay);  // Mode (whatever it represents in your use case)
  
    this.commonService.commonFileUpload('uploadEmployeeSignature.sams', formData).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
          this.validateEditMode();  // Perform any necessary validation after upload
          this.locationNavigation.back();  // Navigate back after successful upload
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
        this.commonService.openToastErrorMessage("Error uploading signature");
      }
    );
  }
  

 // Check validation based on form
  // form one validation (* in-order to check individual form dirty)
  formOneValidation() {
    
    if ( // Form One Validation
      this.employeeForm.get('officeContactNo').valid && 
      // this.employeeForm.get('officeEmailId').valid && 
      this.employeeForm.get('employeeStatus').valid &&
      this.employeeForm.get('dateOfRelievingDisp').valid &&
      this.employeeForm.get('replaceEmpStatus').valid &&
      this.employeeForm.get('designationName').valid
    ) {
      this.formOneValid = true;
    } else {
      this.formOneValid = false;
    }
  }

    formThreeValidation() {
      const a = this.locationAccessDataSource.filter(element => element.empLocSelected).length;
      this.formThreeValid = (a > 0 && this.selectedItem !== 0);
    }


navigateBackToEmployee() {
  this.locationNavigation.back();
}

//Check Employee Code Code name length
empCodeLengthCal() {
  if(this.employeeForm.controls.employeeCode.value.length <= 15) {
    return true;
  } else {
    return false;
  }
}
getPmtCityValue(event){

}
getResCityValue(event){

}

getRevievingDate(event){
  this.employeeForm.controls.dateOfRelievingDisp.setValue(event.value);

}

getEmployeeStatus(){
 
  if(this.employeeForm.controls.employeeStatus.value === 'RELIEVED')
  return true;
  else
  return false;

}

  empDataInput(event){
    if(this.employeeForm.controls[event].value){
      this.employeeForm.controls[event].setValue((this.employeeForm.controls[event].value).trim());
    }
  }

  fetchListOfEmployeeLoc(empId){    
    this.commonService.commonGetService('loadEmployeeLocAccess.sams',empId).subscribe(
      data => {
        if(data.success){
          this.locationAccessDataSource = data.responseData;
          const defaultLocation = this.locationAccessDataSource.find(element => element.defaultLocation);
            if (defaultLocation) {
              this.selectedItem = defaultLocation.accessLocId;
            }
            this.formThreeValidation();
          }
      });
  }

   selectEmployeeDefaultLocation(element) {
    this.selectedItem = (this.selectedItem === element.accessLocId) ? 0 : element.accessLocId;
    this.formThreeValidation();
  }

  signatureHandleFileInput(files: FileList) {
    console.log('files data',files);
    this.signFileToUpload = files[0];
    if (this.signFileToUpload.type.split('/')[0] == 'image') {
      if (((this.signFileToUpload.size / 1024) / 1024) < 2) {
        this.uploadEmpSignatureFlag = true;
      } else {
        this.commonService.openToastWarningMessage('IMAGE_SIZE_2_MB');
        this.uploadEmpSignatureFlag = false;
      }
  
    } else {
      this.commonService.openToastWarningMessage('CHOOSE_VALID_FILE');
      this.signFileToUpload = null;
    }
  
  }
}
