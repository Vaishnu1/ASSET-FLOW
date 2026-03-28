import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonHint } from '../../../../Constants/CommonHint';
import { ParameterGroupModel } from 'src/app/Model/master/parameterGroup';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../../../Services/common-service/common.service';
import { AssetOptimaServices } from '../../../../Constants/AssetOptimaServices';
import { UserSessionService } from '../../../../Services/user-session-service/user-session.service';
import { UniqueValidationModel } from '../../../../Model/base/uniqueValidation';
import { ParameterGroupListComponent } from '../parameter-group-list/parameter-group-list.component';


@Component({
  selector: 'app-parameter-group-create',
  templateUrl: './parameter-group-create.component.html',
  styleUrls: ['./parameter-group-create.component.css']
})
export class ParameterGroupCreateComponent implements OnInit {
  parameterGroupForm: FormGroup;
  uploadParameterGroupFlag: boolean = false;
  @ViewChild('parameterGroupFocus') parameterGroupFocusSet : ElementRef;

    //COMMON HINT MESSAGE
    CommonhintMsg = new CommonHint();

  //Create, Edit, Save and Update button name change based on the place
  headingDisplay : string;
  displayButton: string;

  //MODEL
  public ParameterGroupModel : ParameterGroupModel;

  //UNIQUE VALIDATION
  ErrorMsgParameterGroup :string;
  tempValueParameter: String = '';

  constructor(public assetDialog: MatDialogRef<ParameterGroupListComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data,
    public commonService: CommonService,
    public assetOptimeMthnd: AssetOptimaServices,
    public changeDetector: ChangeDetectorRef,
    public userSession: UserSessionService) { }

  ngOnInit() {
    
    this.parameterGroupForm = new FormGroup({
      parameterGroupId    : new FormControl(''),
      parameterGroupName  : new FormControl('',[Validators.required,Validators.maxLength(100)]),
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
    this.commonService.setFormFocus(this.parameterGroupFocusSet);
    if(this.data.ParameterGroupModel!==0){
      if (this.data.mode === 'edit') {
      this.parameterGroupForm.patchValue(this.data.ParameterGroupModel);
      this.parameterGroupForm.invalid;
      this.headingDisplay = "Edit";
      this.displayButton = "Update";
      this.tempValueParameter = this.data.ParameterGroupModel.parameterGroupName!= null ? this.data.ParameterGroupModel.parameterGroupName : '';
      } else if (this.data.mode === 'view') {
        this.parameterGroupForm.patchValue(this.data.ParameterGroupModel);
        this.headingDisplay = "View";
        this.displayButton = "Back";
        this.parameterGroupForm.disable();
      }
    }else{
      this.headingDisplay = "Create";
      this.displayButton = "Submit";
      this.tempValueParameter = (this.data.ParameterGroupModel.parameterGroupName!= null) ? this.data.ParameterGroupModel.parameterGroupName : '';
    }
    this.changeDetector.detectChanges();
  }

  closeParameterGroupModal() {
    this.assetDialog.close();
  }

  submitParameterGroup(){
    console.log('Submit button clicked');
    console.log('Entering submitParameterGroup method');
    this.uploadParameterGroupFlag = true;
    this.ParameterGroupModel = this.parameterGroupForm.value;
    const ParameterGroupModel = this.ParameterGroupModel.parameterGroupName.trim();
    if(ParameterGroupModel===""){
      this.uploadParameterGroupFlag = false;
      this.commonService.openToastWarningMessage("Kindly Enter the Valid Parameter Group Name");
    }else{
      this.ParameterGroupModel.parameterGroupName=ParameterGroupModel;
      this.commonService.commonInsertService(this.assetOptimeMthnd.saveOrUpdateParameterGroup,this.ParameterGroupModel).subscribe(
        data => {
          if(data.success){
            this.uploadParameterGroupFlag = false;
            this.commonService.openToastSuccessMessage(data.message);
            this.assetDialog.close();
          } else {
            this.uploadParameterGroupFlag = false;
            this.commonService.openToastErrorMessage(data.message);
          }
        }
      );
    }
  }
  checkUniqueConstrainForParameterGroup(){
    if(((this.tempValueParameter!= null || this.tempValueParameter!=undefined || this.tempValueParameter!= '') ? this.tempValueParameter.toUpperCase() : '') === ((this.parameterGroupForm.controls.parameterGroupName.value!= null || this.parameterGroupForm.controls.parameterGroupName.value!= '') ? this.parameterGroupForm.controls.parameterGroupName.value.toUpperCase():'')) {

    }else if(this.parameterGroupForm.controls.parameterGroupName.value.replace (/s+/g, ' ').trim () === ''){
      this.parameterGroupForm.controls['parameterGroupName'].setValue('');
    }else{
    const constraintData: UniqueValidationModel = new UniqueValidationModel();
    constraintData.className = "com.sams.to.master.ParameterGroupTO";
    constraintData.constraints = {
      'parameterGroupName': this.parameterGroupForm.controls.parameterGroupName.value.toUpperCase().trim(),
      'orgId':this.userSession.getUserOrgId()
    };
    this.commonService.checkUniqueValidation(constraintData).subscribe(
      data => {
        if(!data.success){
          //show the warning invalidate the form group
          this.ErrorMsgParameterGroup = data.message;
          this.parameterGroupForm.controls.parameterGroupName.setErrors(Validators.minLength);
          this.parameterGroupForm.controls.parameterGroupName.setErrors({"notUnique": true});
          } else {
          this.ErrorMsgParameterGroup = '';
          this.parameterGroupForm.controls.parameterGroupName.setErrors(null);

          }
      }
    );
    }
  }

}



