import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { PriorityModel } from 'src/app/Model/master/priority';
import { PriorityListComponent } from 'src/app/Components/Master/serviceRequestMain/priority-list/priority-list.component';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { CommonHint } from 'src/app/Constants/CommonHint';

@Component({
  selector: 'app-priority-create',
  templateUrl: './priority-create.component.html',
  styleUrls: ['./priority-create.component.css']
})
export class PriorityCreateComponent implements OnInit {

  priorityForm: FormGroup;
  uploadPriorityFlag: boolean = false;

  @ViewChild('priorityFocus') priorityFocusSet : ElementRef;

    //COMMON HINT MESSAGE
    CommonhintMsg = new CommonHint();

  //Create, Edit, Save and Update button name change based on the place
  headingDisplay : string;
  displayButton: string;

  //MODEL
  public PriorityModel : PriorityModel;

  //UNIQUE CONSTRAINS
  ErrorMsgPriority :string;
  tempValuePriority: String = '';
 
  constructor(public assetDialog: MatDialogRef<PriorityListComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    public commonService: CommonService,
    public assetOptimeMthnd: AssetOptimaServices,
    public changes: ChangeDetectorRef,
    public userSession: UserSessionService ) { }

  ngOnInit() {
    this.priorityForm = new FormGroup({
      priorityId    : new FormControl(''),
      priorityName  : new FormControl('',[Validators.required,Validators.maxLength(100)]),
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
      createdDt        : new FormControl(''),
    });
    
  }
  ngAfterViewInit() {
    this.commonService.setFormFocus(this.priorityFocusSet);
    if(this.data.PriorityModel!=0){
      this.priorityForm.patchValue(this.data.PriorityModel);
      this.headingDisplay = "Edit";
      this.displayButton = "Update";
      this.tempValuePriority = this.data.PriorityModel.priorityName!= null ? this.data.PriorityModel.priorityName : '';
    }else{
      this.headingDisplay = "Create";
      this.displayButton = "Submit";
      this.tempValuePriority = this.data.PriorityModel.priorityName!= null ? this.data.PriorityModel.priorityName : '';
    }
    this.changes.detectChanges();
  }

  closePriorityModal() {
    this.assetDialog.close();
  }

  submitPriority(){
    this.uploadPriorityFlag = true;
    this.PriorityModel = this.priorityForm.value;
    var PriorityModel = this.PriorityModel.priorityName.trim();
    if(PriorityModel==""){
      this.uploadPriorityFlag = false;
      this.commonService.openToastWarningMessage("Kindly Enter the Valid Priority Name");
    }else{
      this.PriorityModel.priorityName=PriorityModel;
      this.commonService.commonInsertService(this.assetOptimeMthnd.saveOrUpdatePriority,this.PriorityModel).subscribe(
        data => {
          if(data.success){
            this.uploadPriorityFlag = false;
            this.commonService.openToastSuccessMessage(data.message);
            this.assetDialog.close();
          } else {
            this.uploadPriorityFlag = false;
            this.commonService.openToastErrorMessage(data.message);
          }
        }
      );
    }
  }

  checkUniqueConstrainForPriority(){
    if(((this.tempValuePriority!= null || this.tempValuePriority!= '') ? this.tempValuePriority.toLowerCase() : '') === 
       ((this.priorityForm.controls.priorityName.value!= null) ? this.priorityForm.controls.priorityName.value.toLowerCase():'')) {

    }else  if(this.priorityForm.controls.priorityName.value === ''){
      this.priorityForm.controls.priorityName.setErrors(Validators.required);
    }else{
    let constraintData: UniqueValidationModel = new UniqueValidationModel();
    constraintData.className = "com.sams.to.master.PriorityTO"; 
    constraintData.constraints = { 
      'priorityName': this.priorityForm.controls.priorityName.value.toLowerCase(),
      'orgId':this.userSession.getUserOrgId() 
    };
    this.commonService.checkUniqueValidation(constraintData).subscribe(
      data => {
        if(!data.success){ 
          //show the warning invalidate the form group 
          this.ErrorMsgPriority = data.message;
          this.priorityForm.controls.priorityName.setErrors(Validators.minLength);
          this.priorityForm.controls.priorityName.setErrors({"notUnique": true});
          } else {
          this.ErrorMsgPriority = '';
          this.priorityForm.controls.priorityName.setErrors(null);
          }
      }            
    );
    }
  }

}
