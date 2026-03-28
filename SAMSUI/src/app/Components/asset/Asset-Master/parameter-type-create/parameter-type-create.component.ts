import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonHint } from '../../../../Constants/CommonHint';
import { ParameterTypeModel } from '../../../../Model/master/parameterType';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../../../Services/common-service/common.service';
import { AssetOptimaServices } from '../../../../Constants/AssetOptimaServices';
import { UserSessionService } from '../../../../Services/user-session-service/user-session.service';
import { UniqueValidationModel } from '../../../../Model/base/uniqueValidation';
import { ParameterTypeListComponent } from '../parameter-type-list/parameter-type-list.component';

@Component({
  selector: 'app-parameter-type-create',
  templateUrl: './parameter-type-create.component.html',
  styleUrls: ['./parameter-type-create.component.css']
})
export class ParameterTypeCreateComponent implements OnInit {

  parameterTypeForm: FormGroup;
  uploadParameterTypeFlag: boolean = false;
  @ViewChild('parameterTypeFocus') parameterTypeFocusSet : ElementRef;

    //COMMON HINT MESSAGE
    CommonhintMsg = new CommonHint();

  //Create, Edit, Save and Update button name change based on the place
  headingDisplay : string;
  displayButton: string;

  //MODEL
  public ParameterTypeModel : ParameterTypeModel;

  //UNIQUE VALIDATION
  ErrorMsgParameterType :string;
  tempValueParameter: String = '';

  constructor(public assetDialog: MatDialogRef<ParameterTypeListComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data,
    public commonService: CommonService,
    public assetOptimeMthnd: AssetOptimaServices,
    public changeDetector: ChangeDetectorRef,
    public userSession: UserSessionService ) { }

  ngOnInit() {
    this.parameterTypeForm = new FormGroup({
      parameterTypeId    : new FormControl(''),
      parameterTypeName  : new FormControl('',[Validators.required,Validators.maxLength(100)]),
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
      parameterTypeNameDisp : new FormControl('')
    });

  }
 ngAfterViewInit() {
    this.commonService.setFormFocus(this.parameterTypeFocusSet);
    if(this.data.ParameterTypeModel!==0){
      if (this.data.mode === 'edit') {
      this.parameterTypeForm.patchValue(this.data.ParameterTypeModel);
      this.parameterTypeForm.invalid;
      this.headingDisplay = "Edit";
      this.displayButton = "Update";
      this.parameterTypeForm.controls.parameterTypeName.setValue(this.data.ParameterTypeModel.parameterTypeNameDisp);
      this.tempValueParameter = this.data.ParameterTypeModel.parameterTypeName!= null ? this.data.ParameterTypeModel.parameterTypeName : '';
      } else if (this.data.mode === 'view') {
        this.parameterTypeForm.patchValue(this.data.ParameterTypeModel);
        this.parameterTypeForm.controls.parameterTypeName.setValue(this.data.ParameterTypeModel.parameterTypeNameDisp);
        this.headingDisplay = "View";
        this.displayButton = "Back";
        this.parameterTypeForm.disable();
      }
    }else{
      this.headingDisplay = "Create";
      this.displayButton = "Submit";
      this.tempValueParameter = (this.data.ParameterTypeModel.parameterTypeName!= null) ? this.data.ParameterTypeModel.parameterTypeName : '';
    }
    this.changeDetector.detectChanges();
  }

  closeParameterTypeModal() {
    this.assetDialog.close();
  }

  submitParameterType(){
    this.uploadParameterTypeFlag = true;
    this.ParameterTypeModel = this.parameterTypeForm.value;
    const ParameterTypeModel = this.ParameterTypeModel.parameterTypeName.trim();
    if(ParameterTypeModel===""){
      this.uploadParameterTypeFlag = false;
      this.commonService.openToastWarningMessage("Kindly Enter the Valid Parameter Type Name");
    }else{
      this.ParameterTypeModel.parameterTypeName=ParameterTypeModel;
      this.commonService.commonInsertService(this.assetOptimeMthnd.saveOrUpdateParameterType,this.ParameterTypeModel).subscribe(
        data => {
          if(data.success){
            this.uploadParameterTypeFlag = false;
            this.commonService.openToastSuccessMessage(data.message);
            this.assetDialog.close();
          } else {
            if(data.message == 'parameter name duplicate'){
              this.uploadParameterTypeFlag = false;
              this.commonService.openToastWarningMessage("Parameter Type Already Exist, Kindly Enter the new Parameter Type");
            }else if(data.message == 'invalid parameter type'){
              this.uploadParameterTypeFlag = false;
              this.commonService.openToastWarningMessage("Invalid Parameter Type, Kindly Enter the valid Parameter Type");
            } else{
              this.uploadParameterTypeFlag = false;
              this.commonService.openToastErrorMessage(data.message);
            }
          }
        }
      );
    }
  }

  checkUniqueConstrainForParameterType(){
    if(((this.tempValueParameter!= null || this.tempValueParameter!=undefined || this.tempValueParameter!= '') ? this.tempValueParameter.toUpperCase() : '') === ((this.parameterTypeForm.controls.parameterTypeName.value!= null || this.parameterTypeForm.controls.parameterTypeName.value!= '') ? this.parameterTypeForm.controls.parameterTypeName.value.toUpperCase():'')) {

    }else if(this.parameterTypeForm.controls.parameterTypeName.value.replace (/s+/g, ' ').trim () === ''){
      this.parameterTypeForm.controls['parameterTypeName'].setValue('');
    }else{
    const constraintData: UniqueValidationModel = new UniqueValidationModel();
    constraintData.className = "com.sams.to.master.ParameterTypeTO";
    constraintData.constraints = {
      'parameterTypeName': this.parameterTypeForm.controls.parameterTypeName.value.toUpperCase().trim(),
      'orgId':this.userSession.getUserOrgId()
    };
    this.commonService.checkUniqueValidation(constraintData).subscribe(
      data => {
        if(!data.success){
          //show the warning invalidate the form group
          this.ErrorMsgParameterType = data.message;
          this.parameterTypeForm.controls.parameterTypeName.setErrors(Validators.minLength);
          this.parameterTypeForm.controls.parameterTypeName.setErrors({"notUnique": true});
          } else {
          this.ErrorMsgParameterType = '';
          this.parameterTypeForm.controls.parameterTypeName.setErrors(null);

          }
      }
    );
    }
  }

}

