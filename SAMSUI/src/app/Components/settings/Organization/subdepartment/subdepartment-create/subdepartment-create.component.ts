import { Component, OnInit, Inject, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { subDepartmentModel } from 'src/app/Model/master/subDepartment';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { getData } from 'src/app/Model/common/fetchListData';

@Component({
  selector: 'app-subdepartment-create',
  templateUrl: './subdepartment-create.component.html',
  styleUrls: ['./subdepartment-create.component.css']
})
export class SubdepartmentCreateComponent implements OnInit {

  departmentList : any =[];
  uploadSubDepartmentFlag: boolean = false;
  subdepartmentForm: FormGroup;
  //HEADING
  headingDisplay : string;
  buttonDisplay : string;
  tempValue : String = '';
  tempValue1 : String = '';
  ErrorMsg : String = '';
  ErrorMsgCode :string ='';
  departmentPageNumber :number;
  scrollsync :boolean = false;
  limitCount: any;


  //MODEL
  public subdepartment : subDepartmentModel;

   //COMMON HINT MESSAGE
   CommonhintMsg = new CommonHint();

   @ViewChild('subDepartmentName') subDepartmentNameFocus: ElementRef;
   getData: getData;

  constructor(private commonService:CommonService,
              public dialogRef: MatDialogRef<SubdepartmentCreateComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private assetOptimaServices: AssetOptimaServices,
              private userSessionService: UserSessionService,
              private cdr: ChangeDetectorRef
              ) {
                this.departmentPageNumber = 1;
              }

  ngOnInit() {
    this.subdepartmentForm = new FormGroup({
      subDepartmentId: new FormControl(''),
      subDepartmentName: new FormControl('',[Validators.required,Validators.maxLength(100)]),
      subDepartmentCode: new FormControl('',[Validators.maxLength(5)]),
      departmentId: new FormControl(''),
      departmentName: new FormControl(null,[Validators.required]),

      //COMMON OBJECTS
       createdBy: new FormControl(''),
       createdDtDisp: new FormControl(''),
       updatedBy: new FormControl(''),
       updatedDtDisp: new FormControl(''),
       pageNumber: new FormControl(''),
       recordsPerPage: new FormControl(''),
       active: new FormControl(true),
       orgId: new FormControl(''),
       orgName: new FormControl(''),
       createdDt: new FormControl(''),
       updatedDt: new FormControl(''),

})
        this.headingDisplay = "Create Sub Department";
        this.buttonDisplay = "Submit";
        this.departmentPageNumber = 1;

  }

  ngAfterViewInit() {
    this.setClick;
    if(this.data.subDepartment != 0  && this.data.mode=='edit'){
      this.subdepartmentForm.patchValue(this.data.subDepartment);
      this.headingDisplay = "Edit Sub Department";
      this.buttonDisplay = "Update";
      this.tempValue = this.data.subDepartment.subDepartmentName!= null ? this.data.subDepartment.subDepartmentName : '';
      this.tempValue1 = this.data.subDepartment.subDepartmentCode!= null ? this.data.subDepartment.subDepartmentCode : '';
    }else if(this.data.mode=='view'){
      this.headingDisplay="View Sub Department";
      this.buttonDisplay='Update';
      this.subdepartmentForm.disable();
      this.subdepartmentForm.patchValue(this.data.subDepartment);


    }else{
      this.tempValue = this.data.subDepartment.subDepartmentName!= null ? this.data.subDepartment.subDepartmentName : '';
      this.tempValue1 = this.data.subDepartment.subDepartmentCode!= null ? this.data.subDepartment.subDepartmentCode : '';

    }
    this.cdr.detectChanges();

  }

  closeSubDeptModal(){
    this.dialogRef.close();
  }

  listOfDepartment(searchValue){
    this.scrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '5' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllDeparment,searchValue.term,'', '', this.limitCount, this.departmentPageNumber).subscribe(
      (data) =>{
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.departmentPageNumber , this.departmentList , data.responseData.comboList)
        this.departmentPageNumber = this.getData.pageNumber;
        this.departmentList = this.getData.dataList;
        this.scrollsync = false;
      }
    );
  }

  getDepartmentValue(event){
    if(event === undefined){
      this.departmentPageNumber = 1;
      this.departmentList = [];
      this.subdepartmentForm.get('departmentId').setValue(0);
    }
    else{
      this.subdepartmentForm.get('departmentId').setValue(event.departmentId);

    }
  }

  submitSubDepartment(){
    this.uploadSubDepartmentFlag = false;
    if(this.subdepartmentForm.controls.subDepartmentCode.value.trim() == ""){
      this.subdepartmentForm.controls.subDepartmentCode.setValue(null);
    }
    this.subdepartment =this.subdepartmentForm.value;
    var v_subdepartment = this.subdepartment.subDepartmentName.trim();
    if(v_subdepartment==""){
      this.uploadSubDepartmentFlag = false;
      this.commonService.openToastWarningMessage("Kindly Enter the valid Sub Department");
    }else{
      this.subdepartment.subDepartmentName = v_subdepartment;
      this.commonService.commonInsertService('saveOrUpdateSubDepartment.sams',this.subdepartment).subscribe(
        data => {
          if(data.success){
            this.uploadSubDepartmentFlag = false;
            this.commonService.openToastSuccessMessage(data.message);
            this.ngOnInit();
            this.setClick();
          }else{
            this.commonService.openToastErrorMessage(data.message);
            this.uploadSubDepartmentFlag = false;
          }
        }
      );
    }

  }

  setClick(): void {
    this.subDepartmentNameFocus.nativeElement.click();
  }

//Check Sub Department Name existence
checkForSubDepartmentNameExistence() {
  if(this.subdepartmentForm.controls.subDepartmentName.value != ''){
    this.subdepartmentForm.controls.subDepartmentName.setValue(this.subdepartmentForm.controls.subDepartmentName.value.trim())
  }
  if(((this.tempValue!= null || this.tempValue!= '') ? this.tempValue.toLowerCase() : '') === ((this.subdepartmentForm.controls.subDepartmentName.value!= null) ? this.subdepartmentForm.controls.subDepartmentName.value.toLowerCase():'')) {

  }else{
    let constraintData: UniqueValidationModel = new UniqueValidationModel();
    constraintData.className = "com.sams.to.master.SubDepartmentTO";
    constraintData.constraints = {
      'subDepartmentName': this.subdepartmentForm.controls.subDepartmentName.value,
      'orgId':this.userSessionService.getUserOrgId(),
      'departmentId':this.subdepartmentForm.controls.departmentId.value
    };
    this.commonService.checkUniqueValidation(constraintData).subscribe(
      data => {
        if(!data.success){
          //show the warning invalidate the form group
          this.ErrorMsg = data.message;
          this.subdepartmentForm.controls.subDepartmentName.setErrors(Validators.minLength);
          this.subdepartmentForm.controls.subDepartmentName.setErrors({"notUnique": true});
        }else{
          this.ErrorMsg = '';
         // this.subdepartmentForm.controls.subDepartmentName.setErrors(null);
        }
      }
    );
  }

}


checkForSubDepartmentCodeExistence() {
  if(this.subdepartmentForm.controls.subDepartmentCode.value != ''){
    this.subdepartmentForm.controls.subDepartmentCode.setValue(this.subdepartmentForm.controls.subDepartmentCode.value.trim())
  }
  if(((this.tempValue1!= null || this.tempValue1!= '') ? this.tempValue1.toLowerCase() : '') === ((this.subdepartmentForm.controls.subDepartmentCode.value!= null) ? this.subdepartmentForm.controls.subDepartmentCode.value.toLowerCase():'')) {

  }else{
    let constraintData: UniqueValidationModel = new UniqueValidationModel();
    constraintData.className = "com.sams.to.master.SubDepartmentTO";
    constraintData.constraints = {
      'subDepartmentCode': this.subdepartmentForm.controls.subDepartmentCode.value,
      'orgId':this.userSessionService.getUserOrgId(),
      'departmentId':this.subdepartmentForm.controls.departmentId.value
    };
    this.commonService.checkUniqueValidation(constraintData).subscribe(
      data => {
        if(!data.success){
          //show the warning invalidate the form group
          this.ErrorMsgCode = data.message;
          this.subdepartmentForm.controls.subDepartmentCode.setErrors(Validators.minLength);
          this.subdepartmentForm.controls.subDepartmentCode.setErrors({"notUnique": true});
        }else{
          this.ErrorMsgCode = '';
         this.subdepartmentForm.controls.subDepartmentCode.setErrors(null);
        }
      }
    );
  }

}

}
