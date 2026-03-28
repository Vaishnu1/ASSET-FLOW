import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { DesignationModel } from 'src/app/Model/master/designation';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { DesignationListComponent } from '../designation-list/designation-list.component';

@Component({
  selector: 'app-designation-create',
  templateUrl: './designation-create.component.html',
  styleUrls: ['./designation-create.component.css']
})
export class DesignationCreateComponent implements OnInit {

  designationForm: FormGroup;
  @ViewChild('designationName') designationNameFocus : ElementRef;
  //HEADING CHANGE
  headingDisplay : string;
  buttonDisplay : string;
  uploadDesignationFlag: boolean = false;
  // MODEL
  public designation : DesignationModel;
  ErrorMsg : String = '';
  tempValue: String = '';


    //COMMON HINT MESSAGE
    CommonhintMsg = new CommonHint();


  constructor(public matDialog: MatDialogRef<DesignationListComponent>,
              @Inject(MAT_DIALOG_DATA) private designationData,
              public commonService: CommonService,
              public assetOptimaMethod: AssetOptimaServices,
              private userSessionService: UserSessionService,
              private cdr: ChangeDetectorRef
              ) { }

  ngOnInit() {
    this.designationForm = new FormGroup({
      designationName: new FormControl('',[Validators.required,Validators.maxLength(50)]),
      designationDesc: new FormControl('',[Validators.maxLength(500)]),
      designationId: new FormControl(''),

      //COMMON OBJECTS
       createdBy: new FormControl(''),
       createdDtDisp: new FormControl(''),
       updatedBy: new FormControl(''),
       updatedDtDisp: new FormControl(''),
       pageNumber: new FormControl(''),
       recordsPerPage: new FormControl(''),
       orgId: new FormControl(''),
       orgName: new FormControl(''),
       active: new FormControl(true),
       createdDt: new FormControl(''),
       updatedDt: new FormControl(''),
    })
    this.headingDisplay = "Create Designation";
    this.buttonDisplay = "Submit";
  }

  ngAfterViewInit() {
    this.setClick();
    if(this.designationData.designation!= 0 && this.designationData.mode=='edit'){
      this.headingDisplay = "Edit Designation";
      this.buttonDisplay = "Update";
       this.designationForm.patchValue(this.designationData.designation);
       this.tempValue = this.designationData.designation.designationName!= null ? this.designationData.designation.designationName : '';
    }else if(this.designationData.mode=='view'){
      this.headingDisplay='View Designation';
      this.buttonDisplay='Update';
      this.designationForm.disable();
      this.designationForm.patchValue(this.designationData.designation);

    }else {
      this.tempValue = this.designationData.designation.designationName!= null ? this.designationData.designation.designationName : '';
    }
    this.cdr.detectChanges();

  }


  closeDesignationModal() {
    this.matDialog.close();
  }


  submitDesignation(){
    this.uploadDesignationFlag = true;
    this.designation = this.designationForm.value;
    var v_designation = this.designation.designationName.trim();
    if(v_designation == ""){
      this.uploadDesignationFlag = false;
      this.commonService.openToastWarningMessage("Kindly Enter the Valid Designation");
    }else{
      this.designation.designationName = v_designation;
      this.commonService.commonInsertService(this.assetOptimaMethod.saveOrUpdateDesignation,this.designation).subscribe(
        data => {
          if(data.success){
            this.uploadDesignationFlag = false;
            this.commonService.openToastSuccessMessage(data.message);
            this.ngOnInit();
            this.setClick();
          } else {
            this.commonService.openToastErrorMessage(data.message);
            this.uploadDesignationFlag = false;
          }
        }
      );
    }

  }
  setClick(): void {
    this.designationNameFocus.nativeElement.click();
  }
   //Check Designation Name existence
   checkForDesignationExistence() {
    if(this.designationForm.controls.designationName.value != ''){
      this.designationForm.controls.designationName.setValue(this.designationForm.controls.designationName.value.trim())
    }
    if(((this.tempValue!= null || this.tempValue!= '') ? this.tempValue.toLowerCase() : '') === ((this.designationForm.controls.designationName.value!= null) ? this.designationForm.controls.designationName.value.toLowerCase():'')) {

    }else{
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.master.DesignationTO";
      constraintData.constraints = {
        'designationName': this.designationForm.controls.designationName.value,
        'orgId':this.userSessionService.getUserOrgId()
      };
      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if(!data.success){
            this.ErrorMsg = data.message;
            this.designationForm.controls.designationName.setErrors(Validators.minLength);
            this.designationForm.controls.designationName.setErrors({"notUnique": true});
          }else{
            this.ErrorMsg = '';
           // this.designationForm.controls.designationName.setErrors(null);
          }
        }
      );
    }

  }

}
