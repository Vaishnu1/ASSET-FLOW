import { Component, OnInit, Inject, ElementRef, ViewChild, Renderer2, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { CommonHint } from 'src/app/Constants/CommonHint';

@Component({
  selector: 'app-user-create-edit',
  templateUrl: './user-create-edit.component.html',
  styleUrls: ['./user-create-edit.component.css']
})
export class UserCreateEditComponent implements OnInit {

  userAddEditFormGroup: FormGroup; 
  @ViewChild('FormFirstItemUser') FormFirstItemUser: NgSelectComponent;
  @ViewChild('empCustNameCombo') empCustNameCombo: NgSelectComponent;
  loginId: FormControl;
  userName: FormControl;
  password: FormControl;
  emailId: FormControl;
  phoneNumber: FormControl;
  userType: FormControl;
  userTypeSrcId: FormControl;
  validFromDtDisp: FormControl;
  validToDtDisp: FormControl;
  locationName = new FormControl(null);
  locationId = new FormControl('');
  groupName = new FormControl(null);
  groupId = new FormControl('');
  userId:FormControl;
  orgId:FormControl;
  custEmpName : FormControl;
  emailValidityStatus : FormControl;
  token  : FormControl;
  createdBy :  FormControl;
  createdDt        :  FormControl;
  updatedDt        :  FormControl;
  createdDtDisp    :  FormControl;
  updatedBy        :  FormControl;
  updatedDtDisp    :  FormControl;
  defaultRegionWiseDashboard : FormControl;
  assetRelocationApproval: FormControl;
  purchaseRequestApproval: FormControl;
  tlApproved: FormControl;
  sourcingApproved: FormControl;
  rmApproved: FormControl;

  submitted = false;
  emailIdFocus:Boolean=false; 
  locationCombo: any = [];
  userTypeCombo: any = [{id:2,userTypeName:'Customer'},{id:1,userTypeName:'Employee'},{id:3,userTypeName:'Supplier'}];
  customerComboData: any =[];
  employeeCombodata: any = [];
  supplierComboData: any = [];
  customerEmployeeSupplierComboData: any =[];
  dynamicBindValue : string;
  userTypeId: number;
  userTypeName: string;
  mode: String = '';
  editMode: boolean = false;
  buttonDisplay: String = '';
  
  uploadFlagUser: boolean = false;
  ErrorMsg :string;
  tempValue: String = '';
  viewPage:boolean=false;
  recordsPerPageForCombo:string;
  locationPageNumber:number;
  userPageNumber:number;
  scrollsync:boolean=false;

  showPwd: boolean = false;
  hide: boolean = true;
  
  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();
  
  constructor(public dialogRef: MatDialogRef<UserCreateEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private samsConstants: AssetOptimaConstants,
              private samsServices: AssetOptimaServices,
              private commonService: CommonService,
              private renderer: Renderer2,
              private changeDetectorRef: ChangeDetectorRef,
              private userSession: UserSessionService) { 
                this.userTypeName='Employee/Supplier/Customer';
                this.locationPageNumber=1;
                this.userPageNumber=1;    
              }

  ngOnInit() {
    document.getElementById('commonLocationSearch').style.display='none';
    this.initiateFormControl();
    this.initiateFormGroup();
   
  }

  ngAfterViewInit(){
     this.commonService.setComboFocus(this.FormFirstItemUser);
    if(this.data!=null) {
      if(this.data.mode=='COMMON_VIEW'){
        this.viewPage=true;
        this.mode = 'View';
        this.userAddEditFormGroup.disable();
      }else{
        this.viewPage=false;
        this.mode = 'Edit';
        this.password.disable();      
      }
      this.loadData(this.data);
      this.custEmpName.setValue(this.data.value.userName);
      this.editMode =true;
      this.buttonDisplay = 'Update';
      this.tempValue = this.data.value.userId != null ? this.data.value.userId : '';
    } else{
      this.mode = 'Create';
      this.buttonDisplay = 'Submit';
      this.tempValue = this.data.value.userId != null ? this.data.value.userId : '';
    }
    this.changeDetectorRef.detectChanges();
  }

  initiateFormControl() {
    this.loginId = new FormControl('', [Validators.required, Validators.maxLength(50)]),
    this.userName = new FormControl('', [Validators.required, Validators.maxLength(50)]),
    this.password = new FormControl('', [Validators.required, Validators.maxLength(100)]),
    this.emailId = new FormControl('', [Validators.required, Validators.pattern(this.samsConstants.emailValidation)]),
    this.phoneNumber = new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern(this.samsConstants.phoneNumberValidation)]),
    this.userType = new FormControl('');
    this.userTypeSrcId = new FormControl(0);
    this.validFromDtDisp = new FormControl(new Date());
    this.validToDtDisp = new FormControl('');
    this.userId = new FormControl('');
    this.orgId = new FormControl('');
    this.custEmpName = new FormControl('');
    this.locationName = new FormControl(this.samsConstants.defaultuserLocName);
    this.locationId = new FormControl(this.samsConstants.defaultuserLocId);
    this.emailValidityStatus = new FormControl('');
    this.token = new FormControl('');
    this.createdBy = new  FormControl('');
    this.createdDt        = new  FormControl('');
    this.updatedDt        = new  FormControl('');
    this.createdDtDisp    = new  FormControl('');
    this.updatedBy        = new  FormControl('');
    this.updatedDtDisp    = new  FormControl('');
    this.defaultRegionWiseDashboard = new FormControl('');
    this.assetRelocationApproval = new FormControl(''),
    this.purchaseRequestApproval = new FormControl(''),
    this.tlApproved = new FormControl(''),
    this.sourcingApproved = new FormControl(''),
    this.rmApproved = new FormControl('')
  }

  initiateFormGroup() {
    this.userAddEditFormGroup = new FormGroup({
      loginId: this.loginId,
      userName: this.userName,
      password: this.password,
      emailId: this.emailId,
      phoneNumber: this.phoneNumber,
      userType: this.userType,
      userTypeSrcId:this.userTypeSrcId,
      validFromDtDisp: this.validFromDtDisp,
      validToDtDisp: this.validToDtDisp,
      userId: this.userId,
      orgId: this.orgId,
      locationName: this.locationName,
      locationId : this.locationId,
      groupId : this.groupId,
      groupName : this.groupName,
      emailValidityStatus : this.emailValidityStatus,
      token : this.token,
      createdBy : this.createdBy,
      createdDt : this.createdDt,
      updatedDt : this.updatedDt,
      createdDtDisp : this.createdDtDisp,
      updatedBy : this.updatedBy,
      updatedDtDisp : this.updatedDtDisp,
      defaultRegionWiseDashboard: this.defaultRegionWiseDashboard,
      assetRelocationApproval: this.assetRelocationApproval,
      purchaseRequestApproval: this.purchaseRequestApproval,
      tlApproved:  this.tlApproved,
      sourcingApproved:  this.sourcingApproved,
      rmApproved:  this.rmApproved 
    });
  }

  loadLocationComboData(searchValue) {
    this.scrollsync=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.samsServices.listAllUserLocForCombo,searchValue.term,'','',
            this.recordsPerPageForCombo,this.locationPageNumber).subscribe(
      (data)=>{
        if (!(this.commonService.fetchSearchValue(searchValue))) {
          if(this.locationPageNumber=== 1){
            this.locationCombo = data.responseData.comboList;
          }else{
            this.locationCombo = this.locationCombo.concat(data.responseData.comboList);
          }
        } else {
          this.locationCombo = data.responseData.comboList;
        }
        data.responseData.comboList.length != 0 ? this.locationPageNumber += 1 : this.locationPageNumber = 1;  
     }
    );
    this.scrollsync=false;
  }

  viewPwd() {
    this.showPwd = !this.showPwd;
    this.hide = !this.hide;
  }

  selectedLocationData(event) {
    if(event===undefined){
      this.locationId.setValue(0);
      this.locationName.setValue('');
      this.orgId.setValue(0);
      this.locationPageNumber=1;
      this.locationCombo=[];
    }else{
      this.locationId.setValue(event.locationId);
      this.locationName.setValue(event.locDisplayField);
      this.orgId.setValue(event.orgId);
    }
  }

  saveOrUpdateUser() {
    this.uploadFlagUser=true;
    this.validFromDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.validFromDtDisp.value));
    this.validToDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.validToDtDisp.value));
    this.commonService.commonInsertService(this.samsServices.saveOrUpdateUser,this.userAddEditFormGroup.getRawValue()).subscribe(
      (data) => {
          if(data.success) {
              this.commonService.openToastSuccessMessage(data.message);
              this.uploadFlagUser=false;
              this.closeModal();
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

  dateValidation1(event){
    return false;
  }

  dateValidation2(event) {
    return false;
  }

  selectUserType(event) {
    if(event == undefined){
      this.userTypeName='';
      this.userType.setValue('');
      this.userTypeId=0;
    }else{
      this.userTypeName = event.userTypeName;
      this.userType = event.userType;
      this.userTypeId = event.id;
    }
    this.customerEmployeeSupplierComboData=[];
    this.userPageNumber=1;  
  }

  getCustomerComboData(searchValue) {
    this.scrollsync=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.samsServices.listOfAllCustSuppEmpCombo,searchValue.term,
      Number(this.userTypeId),'',this.recordsPerPageForCombo,this.userPageNumber).subscribe(
      (data) => {
        if (!(this.commonService.fetchSearchValue(searchValue))) {
          if(this.userPageNumber=== 1){
            this.customerEmployeeSupplierComboData = data.responseData.comboList;
          }else{
            this.customerEmployeeSupplierComboData = this.customerEmployeeSupplierComboData.concat(data.responseData.comboList);
          }
        } else {
          this.customerEmployeeSupplierComboData = data.responseData.comboList;
        }
        data.responseData.comboList.length != 0 ? this.userPageNumber += 1 : this.userPageNumber = 1;  
      }
    );
    this.scrollsync=false;
  }

  getEmpCustSuppData(event) {
    if(event===undefined){
      this.userName.setValue('');
      this.emailId.setValue('');
      this.phoneNumber.setValue('');
      this.userTypeSrcId.setValue('');
      this.userPageNumber=1;
      this.customerEmployeeSupplierComboData=[];
    }else{
      this.userName.setValue(event.custSuppEmpName);
      this.emailId.setValue(event.custSuppEmpEmailId);
      this.phoneNumber.setValue(event.custSuppEmpContactNo);
      this.userTypeSrcId.setValue(event.custSuppEmpId);
    }
  }

  closeModal() {
    document.getElementById('commonLocationSearch').style.display='block';
    this.dialogRef.close();
  }

  loadData(data) {
    this.userAddEditFormGroup.patchValue(data.value);
    if(data.value.validFromDt !=null) {
      this.validFromDtDisp.setValue(new Date(data.value.validFromDt.time));
    }
    if(data.value.validToDt!=null){
      this.validToDtDisp.setValue(new Date(data.value.validToDt.time));
    }
    this.custEmpName.setValue(data.value.userName);
    this.locationName.disable();
    this.custEmpName.disable();
    this.userName.disable();
    this.loginId.disable();
    // if(data.mode=='COMMON_VIEW'){
    //   this.userAddEditFormGroup.disable();
    //   this.viewPage=true;
    // }else{
    //   this.viewPage=false;
    // }
    this.changeDetectorRef.detectChanges();
  }

  clearData() {
    this.userAddEditFormGroup.reset();
    this.empCustNameCombo.clearModel();
  }

  //UNIQUE CONSTRAIN
  checkUniqueConstrainForUser(){
    if(((this.tempValue!= null || this.tempValue!= '') ? this.tempValue.toLowerCase() : '') === 
       ((this.userAddEditFormGroup.controls.loginId.value!= null) ? this.userAddEditFormGroup.controls.loginId.value.toLowerCase():'')) {

    }else{
    let constraintData: UniqueValidationModel = new UniqueValidationModel();
    constraintData.className = "com.sams.to.base.UserTO"; 
    constraintData.constraints = { 
      'loginId': this.loginId.value.toLowerCase()
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
