import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetStatusModel } from 'src/app/Model/master/asset-status';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { AssetStatusListComponent } from '../asset-status-list/asset-status-list.component';

@Component({
  selector: 'app-assetstatus-create',
  templateUrl: './assetstatus-create.component.html',
  styleUrls: ['./assetstatus-create.component.css']
})
export class AssetstatusCreateComponent implements OnInit {

  assetStatusForm : FormGroup;

  @ViewChild('assetStatusFocus') assetStatusFocusSet : ElementRef;

  //Create, Edit, Save and Update button name change based on the place
  headingDisplay : string;
  displayButton: string;
  uploadFlagAssetStatus : boolean =false;

  //MODEL
  public AssetStatusModel : AssetStatusModel;
  ErrorMsg :String;
  tempValue : String = '';

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  constructor(public dialogRef: MatDialogRef<AssetStatusListComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    public commonService: CommonService,
    public assetOptimeMthnd: AssetOptimaServices,
    private userSession: UserSessionService,
    private cdr: ChangeDetectorRef
    ) { }


  ngOnInit() {
    this.assetStatusForm = new FormGroup({
      assetStatusId    : new FormControl(0),
      assetStatusName  : new FormControl('',[Validators.required,Validators.maxLength(100)]),
      orgId            : new FormControl(''),
       //COMMON OBJECTS
      createdBy        : new FormControl(''),
      createdDt        : new FormControl(''),
      createdDtDisp    : new FormControl(''),
      updatedBy        : new FormControl(''),
      updatedDt        : new FormControl(''),
      updatedDtDisp    : new FormControl(''),
      pageNumber       : new FormControl(''),
      recordsPerPage   : new FormControl(''),
      orgName          : new FormControl(''),
      active           : new FormControl(true)

    })
    this.headingDisplay = "Create";
    this.displayButton = "Submit";
  }

  ngAfterViewInit() {
    this.commonService.setFormFocus(this.assetStatusFocusSet);
    if(this.data.AssetStatusModel!=0){
      this.assetStatusForm.patchValue(this.data.AssetStatusModel);
      this.assetStatusForm.invalid;
      this.headingDisplay = "Edit";
      this.displayButton = "Update";
      this.tempValue = this.data.AssetStatusModel.assetStatusName!= null ? this.data.AssetStatusModel.assetStatusName : '';
    }else{
      this.tempValue = this.data.AssetStatusModel.assetStatusName!= null ? this.data.AssetStatusModel.assetStatusName : '';
    }
    this.cdr.detectChanges();
  }

  closeModal() {
    this.dialogRef.close();
  }

  submit(){
    this.uploadFlagAssetStatus = true;
    this.AssetStatusModel = this.assetStatusForm.value;
    var AssetStatusModel = this.AssetStatusModel.assetStatusName.trim();
    if(AssetStatusModel==""){
            this.commonService.openToastWarningMessage("Kindly Enter the Valid Asset Status");
    }else{
      this.AssetStatusModel.assetStatusName=AssetStatusModel;
      this.commonService.commonInsertService(this.assetOptimeMthnd.saveOrUpdateAssetStatus,this.AssetStatusModel).subscribe(
        data => {
          if(data.success){
            this.commonService.openToastSuccessMessage(data.message);
            this.dialogRef.close();
            this.uploadFlagAssetStatus = false;
          } else {
            this.commonService.openToastErrorMessage(data.message);
            this.uploadFlagAssetStatus = false;

          }
        }
      );
    }

  }
  //Check Asset Status Name existence
  checkForAssetStatusNameExistence() {
    if(((this.tempValue!= null || this.tempValue!= '') ? this.tempValue.toLowerCase() : '') === ((this.assetStatusForm.controls.assetStatusName.value!= null) ? this.assetStatusForm.controls.assetStatusName.value.toLowerCase():'')) {
    }else{
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.master.AssetStatusTO";
      constraintData.constraints = {
        'assetStatusName': this.assetStatusForm.controls.assetStatusName.value.toLowerCase(),
        'orgId': this.userSession.getUserOrgId()

      };
      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if (!data.success) {
            this.ErrorMsg = data.message;
            this.assetStatusForm.controls.assetStatusName.setErrors(Validators.minLength);
            this.assetStatusForm.controls.assetStatusName.setErrors({"notUnique": true});
          } else {
            this.ErrorMsg = '';
            this.assetStatusForm.controls.assetStatusName.setErrors(null);
          }
        }
      );
    }
  }

}
