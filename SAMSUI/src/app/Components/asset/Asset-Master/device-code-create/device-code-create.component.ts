import { Component, OnInit, Inject, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeviceCodeModel } from 'src/app/Model/master/DeviceCode';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-device-code-create',
  templateUrl: './device-code-create.component.html',
  styleUrls: ['./device-code-create.component.css']
})
export class DeviceCodeDialogComponent implements OnInit {

  @ViewChild('assetTypeFocus') assetTypeFocusSet : ElementRef;

  deviceCodeForm : FormGroup;
  responseData: any;
  scrollItemDescriptionsync:boolean=false;
  limitCount: any;
  itemDescPageNumber:number;
  itemDescCombo:any=[];

  submitOrCreateButtonStatus: boolean = true;

  //Create, Edit, Save and Update button name change based on the place
  headingDisplay : string;
  displayButton: string;
  uploadFlag: boolean = false;
  ErrorMsg: String;
  tempValue: String = '';
  tempValue1: String = '';
  ErrorMsgDeviceCode: String='';


  deviceCodeModel: DeviceCodeModel;

  deviceCode;

  constructor(private location: Location,
    public dialogRef: MatDialogRef<DeviceCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data, 
    private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private userSession: UserSessionService,
    private cdr: ChangeDetectorRef) { 
      
    }

  ngOnInit() {
    this.deviceCodeForm = new FormGroup({
      orgId: new FormControl(0),
      deviceCode : new FormControl ('', [Validators.required, Validators.maxLength(100)]),
      deviceConcept: new FormControl('', [Validators.required, Validators.maxLength(10000)]),
      active: new FormControl(''),
      deviceCodeId: new FormControl(''),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl('')

    });
    this.itemDescPageNumber = 1;

    this.headingDisplay = "Create";
    this.displayButton = "Submit";
    this.deviceCodeForm.controls.active.setValue(true);
  }

   ngAfterViewInit() {
    this.commonService.setFormFocus(this.assetTypeFocusSet);
    if(this.data.deviceCodeModel!=0){
      this.deviceCodeForm.patchValue(this.data.deviceCodeModel);
      if(this.data.mode == 'view') {
        this.headingDisplay = "View";
        this.deviceCodeForm.disable();
      } else if(this.data.mode == 'edit') {
        this.headingDisplay = "Edit";
        this.displayButton = "Update";
        this.tempValue = this.data.deviceCodeModel.assetTypeName!= null ? this.data.deviceCodeModel.assetTypeName : '';
        this.tempValue1 = this.data.deviceCodeModel.deviceCode!= null ? this.data.deviceCodeModel.deviceCode : '';

      }
    }else{
      this.headingDisplay = "Create";
      this.displayButton = "Submit";
      this.tempValue = this.data.deviceCodeModel.assetTypeName!= null ? this.data.deviceCodeModel.assetTypeName : '';
      this.tempValue1 = this.data.deviceCodeModel.deviceCode!= null ? this.data.deviceCodeModel.deviceCode : '';

    }
    this.cdr.detectChanges();
    
  }

  closeModal() {
    this.dialogRef.close();
  }

  submit() {
    this.deviceCodeForm.controls.deviceCode.setValue((this.deviceCodeForm.controls.deviceCode.value).trim());
    this.deviceCodeForm.controls.deviceConcept.setValue((this.deviceCodeForm.controls.deviceConcept.value).trim());
    this.commonService.commonInsertService('saveOrUpdateDeviceCode.sams', this.deviceCodeForm.getRawValue())
    .subscribe( data => {
      this.responseData = data;
     if(this.responseData.success === true) {
      this.commonService.openToastSuccessMessage(this.responseData.message);
      this.dialogRef.close();
     }else
     this.commonService.openToastWarningMessage(this.responseData.message);
    })
  }

  getSubmitOrCreateButtonStatus() {
    if(this.deviceCodeForm.controls.deviceCode.value != null && this.deviceCodeForm.controls.deviceCode.value != ""){
      if(this.deviceCodeForm.controls.deviceConcept.value != null && this.deviceCodeForm.controls.deviceConcept.value != ""){
        if(this.deviceCodeForm.controls.deviceConcept.value.length != 0) {
          this.submitOrCreateButtonStatus = false;
        }
      } else {
        this.submitOrCreateButtonStatus = true;
      }
    }else
    this.submitOrCreateButtonStatus = true;

    return this.submitOrCreateButtonStatus;
  }

  lengthMaximumCharacterForDeviceCode(){
    if(this.deviceCodeForm.controls.deviceCode.value.length < 100) {
      return true;
    } else {
      return false;
    }
  }

  lengthMaximumCharacterForDeviceConcept() {
    if(this.deviceCodeForm.controls.deviceConcept.value.length < 10000) {
      return true;
    } else {
      return false;
    }
  }

      //Check Asset Category Name existence
checkForDeviceCodeExistence() {
  if(this.deviceCodeForm.controls.deviceCode.value != '' && this.deviceCodeForm.controls.deviceCode.value != null){
    this.deviceCodeForm.controls.deviceCode.setValue(this.deviceCodeForm.controls.deviceCode.value.trim())
  }
  if(((this.tempValue1!= null || this.tempValue1!= '') ? this.tempValue1.toLowerCase() : '') === ((this.deviceCodeForm.controls.deviceCode.value!= null) ? this.deviceCodeForm.controls.deviceCode.value.toLowerCase():'')) {

  }else{
    let constraintData: UniqueValidationModel = new UniqueValidationModel();
    constraintData.className = "com.sams.to.master.DeviceCodeTo";
    constraintData.constraints = {
    'deviceCode': this.deviceCodeForm.controls.deviceCode.value.toLowerCase().trim(),
    'orgId':this.userSession.getUserOrgId()

    };
    this.commonService.checkUniqueValidation(constraintData).subscribe(
    data => {
    if(!data.success){
      this.ErrorMsgDeviceCode = data.message;
      this.deviceCodeForm.controls.deviceCode.setErrors(Validators.minLength);
      this.deviceCodeForm.controls.deviceCode.setErrors({"notUnique": true});
    }else{
      this.ErrorMsgDeviceCode = '';
      this.deviceCodeForm.controls.deviceCode.setErrors(null);
    }

    }
    );
  }
}

}
