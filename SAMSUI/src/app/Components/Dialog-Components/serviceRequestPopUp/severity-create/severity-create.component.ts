import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { SeverityModel } from 'src/app/Model/master/severity';
import { SeverityListComponent } from 'src/app/Components/Master/serviceRequestMain/severity-list/severity-list.component';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { CommonHint } from 'src/app/Constants/CommonHint';

@Component({
  selector: 'app-severity-create',
  templateUrl: './severity-create.component.html',
  styleUrls: ['./severity-create.component.css']
})
export class SeverityCreateComponent implements OnInit {

  severityForm: FormGroup;
  uploadSeverityFlag: boolean = false;
  @ViewChild('severityFocus') severityFocusSet : ElementRef;

    //COMMON HINT MESSAGE
    CommonhintMsg = new CommonHint();

  //Create, Edit, Save and Update button name change based on the place
  headingDisplay : string;
  displayButton: string;

  //MODEL
  public SeverityModel : SeverityModel;

  //UNIQUE VALIDATION
  ErrorMsgSeverity :string;
  tempValueSeverity: String = '';
 
  constructor(public assetDialog: MatDialogRef<SeverityListComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    public commonService: CommonService,
    public assetOptimeMthnd: AssetOptimaServices,
    public changeDetector: ChangeDetectorRef,
    public userSession: UserSessionService ) { }

  ngOnInit() {
    this.severityForm = new FormGroup({
      severityId    : new FormControl(''),
      severityName  : new FormControl('',[Validators.required,Validators.maxLength(100)]),
      orgId            : new FormControl(''),
       //COMMON OBJECTS
      createdBy        : new FormControl(''),
      updatedDt        : new FormControl(''),
      createdDtDisp    : new FormControl(''),
      updatedBy        : new FormControl(''),
      updatedDtDisp    : new FormControl(''),
      pageNumber       : new FormControl(''),
      recordsPerPage   : new FormControl(''),
      orgName          : new FormControl(''),
      active           : new FormControl(true),
      createdDt        : new FormControl('')
    });
    
  }
  ngAfterViewInit() {
    this.commonService.setFormFocus(this.severityFocusSet);
    if(this.data.SeverityModel!=0){
      this.severityForm.patchValue(this.data.SeverityModel);
      this.headingDisplay = "Edit";
      this.displayButton = "Update";
      this.tempValueSeverity = this.data.SeverityModel.severityName!= null ? this.data.SeverityModel.severityName : '';
    }else{
      this.headingDisplay = "Create";
      this.displayButton = "Submit";
      this.tempValueSeverity = this.data.SeverityModel.severityName!= null ? this.data.SeverityModel.severityName : '';

    }
    this.changeDetector.detectChanges();
  }

  closeSeverityModal() {
    this.assetDialog.close();
  }

  submitSeverity(){
    this.uploadSeverityFlag = true;
    this.SeverityModel = this.severityForm.value;
    var SeverityModel = this.SeverityModel.severityName.trim();
    if(SeverityModel==""){
      this.uploadSeverityFlag = false;
      this.commonService.openToastWarningMessage("Kindly Enter the Valid Severity Name");
    }else{
      this.SeverityModel.severityName=SeverityModel;
      this.commonService.commonInsertService(this.assetOptimeMthnd.saveOrUpdateSeverity,this.SeverityModel).subscribe(
        data => {
          if(data.success){
            this.uploadSeverityFlag = false;
            this.commonService.openToastSuccessMessage(data.message);
            this.assetDialog.close();
          } else {
            this.uploadSeverityFlag = false;
            this.commonService.openToastErrorMessage(data.message);
          }
        }
      );
    }
  }

  checkUniqueConstrainForSeverity(){
    if(((this.tempValueSeverity!= null || this.tempValueSeverity!= '') ? this.tempValueSeverity.toLowerCase() : '') === 
       ((this.severityForm.controls.severityName.value!= null) ? this.severityForm.controls.severityName.value.toLowerCase():'')) {
    
    }else  if(this.severityForm.controls.severityName.value === ''){
      this.severityForm.controls.severityName.setErrors(Validators.required);
    }else{
    let constraintData: UniqueValidationModel = new UniqueValidationModel();
    constraintData.className = "com.sams.to.master.SeverityTO"; 
    constraintData.constraints = { 
      'severityName': this.severityForm.controls.severityName.value.toLowerCase(),
      'orgId':this.userSession.getUserOrgId() 
    };
    this.commonService.checkUniqueValidation(constraintData).subscribe(
      data => {
        if(!data.success){ 
          //show the warning invalidate the form group 
          this.ErrorMsgSeverity = data.message;
          this.severityForm.controls.severityName.setErrors(Validators.minLength);
          this.severityForm.controls.severityName.setErrors({"notUnique": true});
          } else {
          this.ErrorMsgSeverity = '';
          this.severityForm.controls.severityName.setErrors(null);
          }
      }            
    );
    }
  }

}
