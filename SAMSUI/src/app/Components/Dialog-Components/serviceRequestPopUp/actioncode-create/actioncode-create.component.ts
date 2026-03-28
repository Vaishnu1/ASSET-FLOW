import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { Attribute4Model } from 'src/app/Model/master/attribute4';
import { ActioncodeListComponent } from 'src/app/Components/Master/serviceRequestMain/actioncode-list/actioncode-list.component';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { CommonHint } from 'src/app/Constants/CommonHint';

@Component({
  selector: 'app-actioncode-create',
  templateUrl: './actioncode-create.component.html',
  styleUrls: ['./actioncode-create.component.css']
})
export class ActioncodeCreateComponent implements OnInit {

  actionCodeForm: FormGroup;
  uploadActionCodeFlag: boolean = false;

  
    //COMMON HINT MESSAGE
    CommonhintMsg = new CommonHint();

  @ViewChild('actioncodeFocus') actioncodeFocusSet : ElementRef;

  //Create, Edit, Save and Update button name change based on the place
  headingDisplay : string;
  displayButton: string;

  ErrorMsg :string;

  tempValue: String = '';

  //MODEL
  public attribute4Model : Attribute4Model;
 
  constructor(public assetDialog: MatDialogRef<ActioncodeListComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    public commonService: CommonService,
    public assetOptimeMthnd: AssetOptimaServices,
    private userSession: UserSessionService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.actionCodeForm = new FormGroup({
      srAttributeId4: new FormControl(''),
      attribute4Name: new FormControl('',[Validators.required,Validators.maxLength(100)]),
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
      orgName : new FormControl(''),
      active: new FormControl(true)

    })
  }

  ngAfterViewInit() {
    this.actioncodeFocusSet.nativeElement.focus();
    if(this.data.attribute4Model!=0){
      this.actionCodeForm.patchValue(this.data.attribute4Model);
      this.headingDisplay = "Edit";
      this.displayButton = "Update";
      this.tempValue = this.data.attribute4Model.attribute4Name!= null ? this.data.attribute4Model.attribute4Name : '';
    }else{
      this.displayButton = "Submit";
      this.headingDisplay = "Create";
      this.tempValue = this.data.attribute4Model.attribute4Name!= null ? this.data.attribute4Model.attribute4Name : '';
    }
    this.cdr.detectChanges();
  }

  closeModalActionCode() {
    this.assetDialog.close();
  }

  submitActionCode(){
    this.uploadActionCodeFlag = true;
    this.attribute4Model = this.actionCodeForm.value;
    var v_attribute4Model = this.attribute4Model.attribute4Name.trim();
    if(v_attribute4Model==""){
      this.uploadActionCodeFlag = false;
      this.commonService.openToastWarningMessage("Kindly Enter the Valid action code");
    }else{
      this.attribute4Model.attribute4Name=v_attribute4Model;
      this.commonService.commonInsertService(this.assetOptimeMthnd.saveOrUpdateSRAttribute4,this.attribute4Model).subscribe(
        data => {
          if(data.success){
            this.uploadActionCodeFlag = false;
            this.commonService.openToastSuccessMessage(data.message);
            this.assetDialog.close();
          } else {
            this.uploadActionCodeFlag = false;
            this.commonService.openToastErrorMessage(data.message);
          }
        }
      );
    }
  }

  checkUniqueConstrainForActionCodeType(){
    if(((this.tempValue!= null || this.tempValue!= '') ? this.tempValue.toLowerCase() : '') === 
       ((this.actionCodeForm.controls.attribute4Name.value!= null) ? this.actionCodeForm.controls.attribute4Name.value.toLowerCase():'')) {
           
    }else  if(this.actionCodeForm.controls.attribute4Name.value === ''){
      this.actionCodeForm.controls.attribute4Name.setErrors(Validators.required);
    }else{
    let constraintData: UniqueValidationModel = new UniqueValidationModel();
    constraintData.className = "com.sams.to.master.SRAttribute4TO"; 
    constraintData.constraints = { 
      'attribute4Name': this.actionCodeForm.controls.attribute4Name.value.toLowerCase(),   
      'orgId':this.userSession.getUserOrgId() 
    };
    this.commonService.checkUniqueValidation(constraintData).subscribe(
      data => {
        if(!data.success){ 
          //show the warning invalidate the form group 
          this.ErrorMsg = data.message;
          this.actionCodeForm.controls.attribute4Name.setErrors(Validators.minLength);     
          this.actionCodeForm.controls.attribute4Name.setErrors({"notUnique": true});
          } else {
          this.ErrorMsg = '';
          this.actionCodeForm.controls.attribute4Name.setErrors(null);
          }
      }            
    );
    }
  }

}