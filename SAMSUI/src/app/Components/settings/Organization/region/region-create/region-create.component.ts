import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { Region } from 'src/app/Model/base/region';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { RegionListComponent } from '../region-list/region-list.component';

@Component({
  selector: 'app-region-create',
  templateUrl: './region-create.component.html',
  styleUrls: ['./region-create.component.css']
})

export class RegionCreateComponent implements OnInit {

  regionForm: FormGroup;

  @ViewChild('regionName') regionNameFocus: ElementRef;

  //HEADING CHANGE
  headingDisplay : string;
  buttonDisplay : string;
  uploadRegionFlag: boolean = false;

  //MODEL FOR TRIM
  public region : Region;
  tempValue : String = '';
  ErrorMsg :String = '';
  ErrorMsgCode : string='';

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();


  constructor(public regionDialog: MatDialogRef<RegionListComponent>,
    public commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) private data,
    public assetOptimaMethod: AssetOptimaServices,
    private userSessionService: UserSessionService,
    private cdr: ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.regionForm = new FormGroup({
      regionName: new FormControl('',[Validators.required,Validators.maxLength(50)]),
      regionDesc: new FormControl('',[Validators.maxLength(100)]),
      active: new FormControl(true),

      //COMMON OBJECTS
       createdBy: new FormControl(''),
       createdDtDisp: new FormControl(''),
       updatedBy: new FormControl(''),
       updatedDtDisp: new FormControl(''),
       pageNumber: new FormControl(''),
       recordsPerPage: new FormControl(''),
       orgId: new FormControl(''),
       orgName: new FormControl(''),
       regionId: new FormControl(''),
       createdDt: new FormControl(''),
       updatedDt: new FormControl(''),
       regionCode: new FormControl('',[Validators.maxLength(5)])
    });
    this.headingDisplay = "Create";
    this.buttonDisplay = "Submit";
  }

  ngAfterViewInit() {
    this.setClick();
    if(this.data.region != 0 && this.data.mode == 'edit'){
      this.headingDisplay = "Edit";
      this.buttonDisplay = "Update";
      this.regionForm.patchValue(this.data.region);
      this.tempValue = this.data.region.regionName!= null ? this.data.region.regionName : '';
    }else if (this.data.mode == 'view') {
      this.headingDisplay = "View";
      this.buttonDisplay = "Update";
      this.regionForm.disable();
      this.regionForm.patchValue(this.data.region);
      this.tempValue = this.data.region.regionName!= null ? this.data.region.regionName : '';
    }else{
      this.tempValue = this.data.region.regionName!= null ? this.data.region.regionName : '';
    }
    this.cdr.detectChanges();
  }

  closeRegionModal() {
    this.regionDialog.close();
  }
  setClick(): void {
    this.regionNameFocus.nativeElement.click();
  }
  submitRegion(){
    this.uploadRegionFlag = true;
    if(this.regionForm.controls.regionCode.value.trim() == ""){
      this.regionForm.controls.regionCode.setValue(null);
    }
    this.region = this.regionForm.value;
    var region = this.region.regionName.trim();
    if(region == ""){
      this.commonService.openToastWarningMessage("Kinldy Enter the Valid Region");
    }else{
      this.region.regionName = region;
      this.commonService.commonInsertService(this.assetOptimaMethod.saveOrUpdateRegion,this.region).subscribe(
        data => {
          if(data.success){
            this.uploadRegionFlag = false;
            this.commonService.openToastSuccessMessage(data.message);
            this.ngOnInit();
            this.setClick();
          } else {
            this.commonService.openToastErrorMessage(data.message);
            this.uploadRegionFlag = false;
          }
        }
      );
    }

  }

  //Check Region Name existence
  checkForRegionNameExistence() {
    if(this.regionForm.controls.regionName.value != ''){
      this.regionForm.controls.regionName.setValue(this.regionForm.controls.regionName.value.trim())
    }
    if(((this.tempValue!= null || this.tempValue!= '') ? this.tempValue.toLowerCase() : '') === ((this.regionForm.controls.regionName.value!= null) ? this.regionForm.controls.regionName.value.toLowerCase():'')) {

    }else{
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.master.RegionTO";
      constraintData.constraints = {
        'regionName': this.regionForm.controls.regionName.value,
        'orgId':this.userSessionService.getUserOrgId()
      };
      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if(!data.success){
            this.ErrorMsg = data.message;
            this.regionForm.controls.regionName.setErrors(Validators.minLength);
            this.regionForm.controls.regionName.setErrors({"notUnique": true});
          }else{
            this.ErrorMsg = '';
          }
        }
      );
    }

  }

  checkForRegionCodeExistence() {
    if(this.regionForm.controls.regionCode.value != '' && this.regionForm.controls.regionCode.value != null){
      this.regionForm.controls.regionCode.setValue(this.regionForm.controls.regionCode.value.trim())
    }
    if(((this.tempValue!= null || this.tempValue!= '') ? this.tempValue.toLowerCase() : '') === ((this.regionForm.controls.regionCode.value!= null) ? this.regionForm.controls.regionCode.value.toLowerCase():'')) {

    }else{
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.master.RegionTO";
      constraintData.constraints = {
        'regionCode': this.regionForm.controls.regionCode.value,
        'orgId':this.userSessionService.getUserOrgId()
      };
      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if(!data.success){
            this.ErrorMsgCode = data.message;
            this.regionForm.controls.regionCode.setErrors(Validators.minLength);
            this.regionForm.controls.regionCode.setErrors({"notUnique": true});
          }else{
            this.ErrorMsgCode = '';
            this.regionForm.controls.regionCode.setErrors(null);
          }
        }
      );
    }

  }
}
