import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { Attribute3Model } from 'src/app/Model/master/attribute3';
import { CausecodeListComponent } from 'src/app/Components/Master/serviceRequestMain/causecode-list/causecode-list.component';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { CommonHint } from 'src/app/Constants/CommonHint';

@Component({
  selector: 'app-causecode-create',
  templateUrl: './causecode-create.component.html',
  styleUrls: ['./causecode-create.component.css']
})
export class CausecodeCreateComponent implements OnInit {

  causecodeForm: FormGroup;
  uploadCauseCodeFlag: boolean = false;

  @ViewChild('causecodeFocus') causecodeFocusSet : ElementRef;

  
    //COMMON HINT MESSAGE
    CommonhintMsg = new CommonHint();

  //Create, Edit, Save and Update button name change based on the place
  headingDisplay : string;
  displayButton: string;

  ErrorMsg :string;

  tempValue: String = '';

  //MODEL
  public attribute3Model : Attribute3Model;
 
  constructor(public causeCodeDialog: MatDialogRef<CausecodeListComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    public commonService: CommonService,
    public assetOptimeMthnd: AssetOptimaServices,
    private userSession: UserSessionService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.causecodeForm = new FormGroup({
      srAttributeId3    : new FormControl(''),
      attribute3Name  : new FormControl('',[Validators.required,Validators.maxLength(100)]),
      orgId            : new FormControl(''),
       //COMMON OBJECTS
      createdBy        : new FormControl(''),
      createdDt        : new FormControl(''),
      updatedDt        : new FormControl(''),
      createdDtDisp    : new FormControl(''),
      updatedBy        : new FormControl(''),
      updatedDtDisp    : new FormControl(''),
      pageNumber       : new FormControl(''),
      recordsPerPage   : new FormControl(''),
      orgName          : new FormControl(''),
      active           : new FormControl(true)

    })
  }

  ngAfterViewInit() {
    this.commonService.setFormFocus(this.causecodeFocusSet);
    if(this.data.attribute3Model!=0){
      this.causecodeForm.patchValue(this.data.attribute3Model);
      this.headingDisplay = "Edit";
      this.displayButton = "Update";
      this.tempValue = this.data.attribute3Model.attribute3Name!= null ? this.data.attribute3Model.attribute3Name : '';
    }else{
      this.displayButton = "Submit";
      this.headingDisplay = "Create";
      this.tempValue = this.data.attribute3Model.attribute3Name!= null ? this.data.attribute3Model.attribute3Name : '';
    }
    this.cdr.detectChanges();
  }

  closeCauseCodeModal() {
    this.causeCodeDialog.close();
  }

  submitCauseCode(){
    this.uploadCauseCodeFlag = true;
    this.attribute3Model = this.causecodeForm.value;
    var v_attribute3Model = this.attribute3Model.attribute3Name.trim();   
    if(v_attribute3Model==""){
      this.uploadCauseCodeFlag = false;
      this.commonService.openToastWarningMessage("Kindly Enter the Valid cause code");
    }else{
      this.attribute3Model.attribute3Name=v_attribute3Model;
      this.commonService.commonInsertService(this.assetOptimeMthnd.saveOrUpdateSRAttribute3,this.attribute3Model).subscribe(
        data => {
          if(data.success){
            this.uploadCauseCodeFlag = false;
            this.commonService.openToastSuccessMessage(data.message);
            this.causeCodeDialog.close();
          } else {
            this.uploadCauseCodeFlag = false;
            this.commonService.openToastErrorMessage(data.message);
          }
        }
      );
    }

  }
      
  checkUniqueConstrainForCauseCodeType(){
    if(((this.tempValue!= null || this.tempValue!= '') ? this.tempValue.toLowerCase() : '') === 
       ((this.causecodeForm.controls.attribute3Name.value!= null) ? this.causecodeForm.controls.attribute3Name.value.toLowerCase():'')) {
           
    }else  if(this.causecodeForm.controls.attribute3Name.value === ''){
      this.causecodeForm.controls.attribute3Name.setErrors(Validators.required);
    }else{
    let constraintData: UniqueValidationModel = new UniqueValidationModel();
    constraintData.className = "com.sams.to.master.SRAttribute3TO"; 
    constraintData.constraints = { 
      'attribute3Name': this.causecodeForm.controls.attribute3Name.value.toLowerCase(),   
      'orgId':this.userSession.getUserOrgId() 
    };
    this.commonService.checkUniqueValidation(constraintData).subscribe(
      data => {
        if(!data.success){ 
          //show the warning invalidate the form group 
          this.ErrorMsg = data.message;
          this.causecodeForm.controls.attribute3Name.setErrors(Validators.minLength);
          this.causecodeForm.controls.attribute3Name.setErrors({"notUnique": true});
          } else {
          this.ErrorMsg = '';
          this.causecodeForm.controls.attribute3Name.setErrors(null);
          }
      }            
    );
    }
  }

}

