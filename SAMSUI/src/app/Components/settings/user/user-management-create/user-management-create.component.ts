import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { getData } from 'src/app/Model/common/fetchListData';

@Component({
  selector: 'app-user-management-create',
  templateUrl: './user-management-create.component.html',
  styleUrls: ['./user-management-create.component.css']
})
export class UserManagementCreateComponent implements OnInit {

  userAddEditFormGroup: FormGroup;
  employeeAddEditFormGroup : FormGroup;

  userTypeCombo: any = [{id:2,userTypeName:'CUSTOMER'},{id:1,userTypeName:'EMPLOYEE'},{id:3,userTypeName:'SUPPLIER'}];

  scrollsync:boolean=false;
  recordsPerPageForCombo:string;
  locationPageNumber:number;
  userTypeName: string;
  locationCombo: any = [];
  userTypeId: number;
  userName: string;

  userPageNumber:number;
  custScrollsync:boolean=false;

  customerEmployeeSupplierComboData: any =[];

  headingDisplay: string = "Create";
  buttonDisplay: String = 'Submit';

  selectedIndex: number = 0;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  uploadFlagUser: boolean = false;

  ErrorMsg :string;
  tempValue: String = '';
  editable_msg: String = '';
  editable_msg1: String = '';

  //TABS 
  skillTrainingDispCol=['sno','skillName','noOfYears','level','remarks'];
  designationDispCol = ['sno','designationName','fromDateDisp','tillDateDisp','reportingPersonName','reportingHodName'];
  experienceDispCol=['sno','companyName','startDateDisp','endDateDisp','designation','address' ];
  qualificationDispCol=['sno','qualificationName','startDateDisp','completedDateDisp','university','percentage','yearOfPassing' ]

  //Datasources
  designationDataSource = new MatTableDataSource<any>();
  skillTraingDataSource = new MatTableDataSource<any>();
  experienceDataSource = new MatTableDataSource<any>();
  qualificationDataSource = new MatTableDataSource<any>();

  modeDisplay: boolean = false;
  getData: getData;
  EmpErrorMsg :string = '';

  disbleClear: boolean = false;

  constructor(private samsConstants: AssetOptimaConstants,
    private commonService: CommonService,
    private samsServices: AssetOptimaServices,
    private router: Router,
    private location: Location, private activatedRoute: ActivatedRoute) { 
      this.userTypeName='Employee/Supplier/Customer';
      this.locationPageNumber=1;
      this.userPageNumber=1;
    }

  ngOnInit() {
    this.userAddEditFormGroup = new FormGroup({
      loginId : new FormControl('', [Validators.required, Validators.maxLength(50)]),
      userName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      emailId: new FormControl('', [Validators.required,Validators.maxLength(50), Validators.pattern(this.samsConstants.emailValidation)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(10), Validators.pattern(this.samsConstants.phoneNumberValidation)]),
      userType: new FormControl(''),
      userTypeSrcId: new FormControl(0),
      validFromDtDisp: new FormControl(new Date(),[Validators.required]),
      validToDtDisp: new FormControl(''),
      userId: new FormControl(''),
      orgId: new FormControl(''),
      custEmpName: new FormControl(''),
      locationName: new FormControl(this.samsConstants.defaultuserLocName),
      locationId: new FormControl(this.samsConstants.defaultuserLocId),
      emailValidityStatus: new FormControl(''),
      token: new FormControl(''),
      createdBy: new  FormControl(''),
      createdDt       : new  FormControl(''),
      updatedDt       : new  FormControl(''),
      createdDtDisp   : new  FormControl(''),
      updatedBy       : new  FormControl(''),
      updatedDtDisp   : new  FormControl(''),
      defaultRegionWiseDashboard: new FormControl(''),
      purchaseRequestApproval: new FormControl(''),
      receiveAutomatedAssetReport : new  FormControl(false),
      tlApproved: new FormControl(''),
      sourcingApproved: new FormControl(''),
      rmApproved: new FormControl(''),
      empId: new FormControl(''),   
      assetPhysicalAuditApproval: new FormControl(''),
      pwdChangeCount: new FormControl(0),
      active : new  FormControl(true),
    });

    this.employeeAddEditFormGroup = new FormGroup({
      adhaarNo: new FormControl(''),
      bloodGroup: new FormControl(''),
      personalContactNo: new FormControl(''),
      personalEmailId: new FormControl(''),
      panNo: new FormControl(''),
      gender: new FormControl(''),
      dobDisp: new FormControl(''),
    });
    this.validateEditMode();
 }

  onEmailIdInput(event: any) {
    const inputValue = event.target.value.toLowerCase();
    event.target.value = inputValue;
    this.userAddEditFormGroup.get('emailId')?.setValue(inputValue, { emitEvent: false });
  }
  validateEditMode(){
    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        primaryId =Number(primaryId);
        var mode = params.mode;
        if(primaryId <= 0){
          this.headingDisplay = "Create";
          this.buttonDisplay = 'Submit';
          this.editable_msg = 'Kindly Provide ';
          this.editable_msg1=' to the User after Creating.'
        }else{
          this.commonService.commonGetService('loadUserInfo.sams',primaryId).subscribe(
            data => { 
              this.userAddEditFormGroup.patchValue(data.responseData);
              
              // this.userAddEditFormGroup.controls.custEmpName.setValue(data.responseData.userName);
              this.userName = data.responseData.userName;
              this.skillTraingDataSource.data=data.responseData.employeeTO.skillList;
              this.designationDataSource.data=data.responseData.employeeTO.empDesignationList;
              this.experienceDataSource.data=data.responseData.employeeTO.experienceList; 
              this.qualificationDataSource.data=data.responseData.employeeTO.qualificationList;
              this.employeeAddEditFormGroup.controls.personalContactNo.setValue(data.responseData.employeeTO.personalContactNo);
              this.employeeAddEditFormGroup.controls.personalEmailId.setValue(data.responseData.employeeTO.personalEmailId);
              this.employeeAddEditFormGroup.controls.adhaarNo.setValue(data.responseData.employeeTO.adhaarNo);
              this.employeeAddEditFormGroup.controls.bloodGroup.setValue(data.responseData.employeeTO.bloodGroup);
              this.employeeAddEditFormGroup.controls.panNo.setValue(data.responseData.employeeTO.panNo);
              this.employeeAddEditFormGroup.controls.gender.setValue(data.responseData.employeeTO.gender);
              this.employeeAddEditFormGroup.controls.dobDisp.setValue(data.responseData.employeeTO.dobDisp);
              this.userTypeId = this.userAddEditFormGroup.value.userTypeSrcId;
              this.userAddEditFormGroup.controls.receiveAutomatedAssetReport.setValue(data.responseData.receiveAutomatedAssetReport);
              if(this.userAddEditFormGroup.value.userTypeSrcId > 0) {
                this.userTypeName = this.userAddEditFormGroup.value.userType;
                this.userTypeName = this.userTypeName[0].toUpperCase() + this.userTypeName.substr(1).toLowerCase();
                this.userAddEditFormGroup.controls.custEmpName.setValue(this.userName);
                this.userAddEditFormGroup.controls.custEmpName.disable();
                this.userAddEditFormGroup.controls.userType.disable();
              }
              
              this.tempValue = data.responseData.loginId;
            });
        }
        if(mode=='edit'){
          this.headingDisplay = "Edit";
          this.buttonDisplay = 'Update';
          this.userAddEditFormGroup.controls.userName.disable();
          this.disbleClear = true;
        }else if(mode=='view'){
          this.modeDisplay=true;
          this.headingDisplay = "View";
          this.buttonDisplay = 'Update';
          this.userAddEditFormGroup.disable();
        }

      }
    );
     } 

     saveReport(checked){
      this.userAddEditFormGroup.controls.receiveAutomatedAssetReport.setValue(checked);
    }

  loadLocationComboData(searchValue) {
    this.scrollsync=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.samsServices.listAllUserLocForCombo,searchValue.term,'','',
            this.recordsPerPageForCombo,this.locationPageNumber).subscribe(
      (data)=>{
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.locationPageNumber , this.locationCombo , data.responseData.comboList)
        this.locationPageNumber = this.getData.pageNumber;
        this.locationCombo = this.getData.dataList;
        this.scrollsync = false;  
     }
    );
  }

  selectedLocationData(event) {
    if(event.locationId != this.userAddEditFormGroup.controls.locationId.value){
      this.getEmpCustSuppData(undefined);
    }
    if(event===undefined){
      this.userAddEditFormGroup.controls.locationId.setValue(0);
      this.userAddEditFormGroup.controls.locationName.setValue('');
      this.userAddEditFormGroup.controls.orgId.setValue(0);
      this.locationPageNumber=1;
      this.locationCombo = [];
    }else{
      this.userAddEditFormGroup.controls.locationId.setValue(event.locationId);
      this.userAddEditFormGroup.controls.locationName.setValue(event.locDisplayField);
      this.userAddEditFormGroup.controls.orgId.setValue(event.orgId);
    }
  }

  getCustomerComboData(searchValue) {
    this.custScrollsync=true;
    const userTypeId =  Number(this.userTypeId);
      if(userTypeId > 0 ){
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.samsServices.listOfAllCustSuppEmpCombo,searchValue.term,
      userTypeId,this.userAddEditFormGroup.controls.locationId.value,this.recordsPerPageForCombo,this.userPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.userPageNumber , this.customerEmployeeSupplierComboData , data.responseData.comboList)
        this.userPageNumber = this.getData.pageNumber;
        this.customerEmployeeSupplierComboData = this.getData.dataList;
        this.custScrollsync = false;
      }
    );
    }else{
      this.customerEmployeeSupplierComboData = [];
      this.userPageNumber = 1;
      this.custScrollsync = false;
      this.commonService.openToastWarningMessage(`Kindly Select The "User Type".`);
    }
  }

  getEmpCustSuppData(event) {
   
    if(event===undefined){
      this.userAddEditFormGroup.controls.custEmpName.setValue('');
      this.userAddEditFormGroup.controls.userName.setValue('');
      this.userAddEditFormGroup.controls.emailId.setValue('');
      this.userAddEditFormGroup.controls.phoneNumber.setValue('');
      this.userAddEditFormGroup.controls.userTypeSrcId.setValue('');
      this.userPageNumber=1;
      //TO SET EMPLOYEE INFORMATION IN DISPLAY MODE
      this.designationDataSource.data = [];
      this.skillTraingDataSource.data = [];
      this.experienceDataSource.data = [];
      this.qualificationDataSource.data = [];
      this.customerEmployeeSupplierComboData = [];
      this.userAddEditFormGroup.controls.custEmpName.setErrors({ "notUnique": true });
    }else{ 
      this.commonService.commonGetService(this.samsServices.checkEmployeeInUser,event.custSuppEmpId,this.userAddEditFormGroup.controls.userType.value,'','','').subscribe(
          (data) => {
      if(data.responseData == false){
      this.userAddEditFormGroup.controls['emailId'].setValue(event.custSuppEmpEmailId);
      this.userAddEditFormGroup.controls['phoneNumber'].setValue(event.custSuppEmpContactNo);
      this.userAddEditFormGroup.controls['userTypeSrcId'].setValue(event.custSuppEmpId);
      this.userAddEditFormGroup.controls['empId'].setValue(event.custSuppEmpId); 
      this.userAddEditFormGroup.controls['userName'].setValue(event.custSuppEmpName); 
      
      //PERSONAL INFO
      this.employeeAddEditFormGroup.controls.personalContactNo.setValue(event.employeeTO.personalContactNo);
      this.employeeAddEditFormGroup.controls.panNo.setValue(event.employeeTO.panNo);
      this.employeeAddEditFormGroup.controls.adhaarNo.setValue(event.employeeTO.adhaarNo);
      this.employeeAddEditFormGroup.controls.bloodGroup.setValue(event.employeeTO.bloodGroup);
      this.employeeAddEditFormGroup.controls.gender.setValue(event.employeeTO.gender);
      this.employeeAddEditFormGroup.controls.dobDisp.setValue(event.employeeTO.dobDisp);
      this.employeeAddEditFormGroup.controls.personalEmailId.setValue(event.employeeTO.personalEmailId);
      //TO SET EMPLOYEE INFORMATION IN DISPLAY MODE
      this.skillTraingDataSource.data=event.employeeTO.skillList;
      this.designationDataSource.data =event.employeeTO.empDesignationList;
      this.experienceDataSource.data = event.employeeTO.experienceList;
      this.qualificationDataSource.data = event.employeeTO.qualificationList;
      this.userAddEditFormGroup.controls.custEmpName.setErrors(null);
      this.EmpErrorMsg = '';
      }
      else{
        this.userAddEditFormGroup.controls.custEmpName.setErrors({ "notUnique": true });
        this.EmpErrorMsg = data.message;
      }
      })

    }
  }

  selectUserType(event) {
    if(event == undefined){
      this.userTypeName='Employee/Supplier/Customer';
      this.userAddEditFormGroup.controls.userType.setValue('');
      this.userTypeId=0;
      this.userAddEditFormGroup.controls.custEmpName.setValue('');
    }else{
      this.userTypeName = event.userTypeName[0].toUpperCase() + event.userTypeName.substr(1).toLowerCase();
      this.userAddEditFormGroup.controls.userType.setValue(event.userTypeName);
      this.userTypeId = event.id;
      this.userAddEditFormGroup.controls.userTypeSrcId.setValue(event.id);
      this.userAddEditFormGroup.controls.custEmpName.setValue('');
    }
    this.customerEmployeeSupplierComboData=[];
    this.userPageNumber=1;  
  }

  dateValidation1(event){
    return false;
  }

  dateValidation2(event) {
    return false;
  }

  exit(){
    localStorage.setItem('previousRoute', this.router.url);
    this.location.back();
  }

  clear(){
    this.userAddEditFormGroup.reset();
    this.userAddEditFormGroup.updateValueAndValidity();
  }

  save(){
    this.uploadFlagUser=true;
    this.userAddEditFormGroup.controls.validFromDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.userAddEditFormGroup.controls.validFromDtDisp.value));
    this.userAddEditFormGroup.controls.validToDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.userAddEditFormGroup.controls.validToDtDisp.value));
    this.userAddEditFormGroup.controls.receiveAutomatedAssetReport.setValue(this.userAddEditFormGroup.controls.receiveAutomatedAssetReport.value);
    this.commonService.commonInsertService(this.samsServices.saveOrUpdateUser,this.userAddEditFormGroup.getRawValue()).subscribe(
      (data) => {
          if(data.success) {
              this.commonService.openToastSuccessMessage(data.message);
              this.uploadFlagUser=false;
              this.exit();
          }
          else{
              this.commonService.openToastErrorMessage(data.message);
              this.uploadFlagUser=false;
          }
      }, error =>{
           this.uploadFlagUser=false;
      }
    );
  }

  navigateToUser(){
    localStorage.setItem('previousRoute', this.router.url);
    this.location.back();
  }

  //UNIQUE CONSTRAIN
  checkUniqueConstrainForUser(){
    if(((this.tempValue!= null || this.tempValue!= '') ? this.tempValue.toLowerCase() : '') === 
       ((this.userAddEditFormGroup.controls.loginId.value!= null) ? this.userAddEditFormGroup.controls.loginId.value.toLowerCase():'')) {

    }else{
    let constraintData: UniqueValidationModel = new UniqueValidationModel();
    constraintData.className = "com.sams.to.base.UserTO"; 
    constraintData.constraints = { 
      'loginId': (this.userAddEditFormGroup.controls.loginId.value.toLowerCase()).trim()
    };
    this.commonService.checkUniqueValidation(constraintData).subscribe(
      data => {
        if(!data.success){ 
          //show the warning invalidate the form group 
          this.ErrorMsg = data.message;
          this.userAddEditFormGroup.controls.loginId.setErrors(Validators.minLength);
          this.userAddEditFormGroup.controls.loginId.setErrors({"notUnique": true});
          } else{
            this.ErrorMsg = '';   
            this.userAddEditFormGroup.controls.loginId.setErrors(null);
          }
      }
    );
  }
 }

}
