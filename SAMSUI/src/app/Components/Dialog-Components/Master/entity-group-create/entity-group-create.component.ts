import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntityGroupListComponent } from 'src/app/Components/Master/orgMain/subComponents/entity-group-list/entity-group-list.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { EntityGroup } from 'src/app/Model/base/entity-group';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
@Component({
  selector: 'app-entity-group-create',
  templateUrl: './entity-group-create.component.html',
  styleUrls: ['./entity-group-create.component.css']
})
export class EntityGroupCreateComponent implements OnInit,OnDestroy {

  entityGroupForm : FormGroup;
  @ViewChild('entityfocus') entityFocusSet : ElementRef;
  uploadEntityGroupFlag: boolean = false;
  //Create, Edit, Save and Update button name change based on the place
  headingDisplay : string;
  buttonDisplay: string;

  //MODEL
  public entityGroup : EntityGroup;
  ErrorMsg :String;
  tempValue:String = '';
  isView: boolean = false;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  constructor(public dialogRef: MatDialogRef<EntityGroupListComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              public commonService: CommonService,
              public assetOptimeMthnd: AssetOptimaServices,
              private userSessionService: UserSessionService,
              private userSession: UserSessionService,
              private cdr: ChangeDetectorRef
              ) {
               }

  ngOnInit() {
    this.entityGroupForm = new FormGroup({
      entityGroupId    : new FormControl(''),
      entityGroupName  : new FormControl(null,[Validators.required,Validators.maxLength(100)]),
      entityGroupDesc  : new FormControl('',[Validators.maxLength(300)]),
       //COMMON OBJECTS
      createdBy        : new FormControl(''),
      createdDt        : new FormControl(''),
      updatedDt        : new FormControl(''),
      createdDtDisp    : new FormControl(''),
      updatedBy        : new FormControl(''),
      updatedDtDisp    : new FormControl(''),
      pageNumber       : new FormControl(''),
      recordsPerPage   : new FormControl(''),
      orgId            : new FormControl(''),
      orgName          : new FormControl(''),
      active           : new FormControl(true)
    });
    
  }

  ngAfterViewInit() {
    this.commonService.setFormFocus(this.entityFocusSet);
    if(this.data.entityGroup!=0  && this.data.mode == 'edit'){
      this.entityGroupForm.patchValue(this.data.entityGroup);
      this.headingDisplay = "Edit";
      this.buttonDisplay = "Update";
      this.tempValue = this.data.entityGroup.entityGroupName!= null ? this.data.entityGroup.entityGroupName : '';
    }else if (this.data.mode == 'view') {
      this.isView = true;
      this.headingDisplay = "View";
      this.buttonDisplay = "Back";
      this.entityGroupForm.disable();
      this.entityGroupForm.patchValue(this.data.entityGroup);
    }
    else{
      this.headingDisplay = "Create";
      this.buttonDisplay = "Submit";
      this.tempValue = this.data.entityGroup.entityGroupName!= null ? this.data.entityGroup.entityGroupName : '';
    }
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    // this.closeEntityGroupModal();
  }

  closeEntityGroupModal() {
    this.dialogRef.close();
  }

  submitEntityGroup(){
    this.uploadEntityGroupFlag = true;
    this.entityGroup = this.entityGroupForm.value;
    var entityGroup = this.entityGroup.entityGroupName.trim();
    if(entityGroup==""){
            this.commonService.openToastWarningMessage("Kindly Enter the Valid Entity Group");
    }else{
      this.entityGroup.entityGroupName=entityGroup;
      this.commonService.commonInsertService(this.assetOptimeMthnd.saveOrUpdateEntityGroup,this.entityGroup).subscribe(
        data => {
          if(data.success){
            this.uploadEntityGroupFlag = false;
            this.commonService.openToastSuccessMessage(data.message);
            this.dialogRef.close();
          } else {
            this.commonService.openToastErrorMessage(data.message);
            this.uploadEntityGroupFlag = false;
          }
        }
      );
    }

  }


  //Check Entity Group Name existence
  checkForEntityGroupExistence() { 
    if(((this.tempValue!= null || this.tempValue!= '') ? this.tempValue.toLowerCase() : '') === 
    ((this.entityGroupForm.controls.entityGroupName.value!= null) ? this.entityGroupForm.controls.entityGroupName.value.toLowerCase():'')) {
      
    } else if(this.entityGroupForm.controls.entityGroupName.value === ''){ 
      this.entityGroupForm.controls.entityGroupName.setErrors(Validators.required);
    }else{
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.base.EntityGroupTO"; 
      constraintData.constraints = { 
        'entityGroupName': this.entityGroupForm.controls.entityGroupName.value,
        'orgId':this.userSessionService.getUserOrgId() 
      };
     
      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if(!data.success){  
            this.ErrorMsg = data.message;
            this.entityGroupForm.controls.entityGroupName.setErrors(Validators.maxLength);
            this.entityGroupForm.controls.entityGroupName.setErrors({"notUnique": true});
          }else{
            this.ErrorMsg = '';
            this.entityGroupForm.controls.entityGroupName.setErrors(null);
          }
        }
      );
    }
  
}

}
