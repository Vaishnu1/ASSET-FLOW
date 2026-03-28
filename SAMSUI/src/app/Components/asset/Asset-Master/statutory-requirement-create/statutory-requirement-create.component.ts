import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { CertificationAuthorityModel } from 'src/app/Model/master/certification-authority';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-statutory-requirement-create',
  templateUrl: './statutory-requirement-create.component.html',
  styleUrls: ['./statutory-requirement-create.component.css']
})
export class StatutoryRequirementCreateComponent implements OnInit {

  @ViewChild('nameFocus') nameFocusSet : ElementRef;

  // statutoryRequirementForm : FormGroup;
  certificationAuthorityForm: FormGroup;
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
  mode: string;

  certificationAuthorityModel: CertificationAuthorityModel;

  deviceCode;

  constructor(
    public dialogRef: MatDialogRef<StatutoryRequirementCreateComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private cdr: ChangeDetectorRef,
    private userSession:UserSessionService) {
    }

  ngOnInit() {


    this.certificationAuthorityForm = new FormGroup({
      certificationAuthorityId : new FormControl(0),
      orgId: new FormControl(0),
      certificationAuthorityName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      issuingAuthority: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedDtDisp :new FormControl(''),
      active: new FormControl('')
    });


    this.headingDisplay = "Create";
    this.displayButton = "Submit";
    this.certificationAuthorityForm.controls.active.setValue(true);
  }

   ngAfterViewInit() {
    this.mode = this.data.mode;
    if(this.data.certificationAuthorityModel != 0){
      this.certificationAuthorityForm.patchValue(this.data.certificationAuthorityModel);
      if(this.data.mode === 'edit') {
      this.headingDisplay = "Edit";
      this.displayButton = "Update";
      this.certificationAuthorityForm.controls.certificationAuthorityName.disable();
      this.tempValue = this.data.certificationAuthorityModel.certificationAuthorityName!= null ? this.data.certificationAuthorityModel.certificationAuthorityName : '';
      }
      else {
      this.headingDisplay = "View";
      this.certificationAuthorityForm.disable();
      }
    }else{

      this.headingDisplay = "Create";
      this.displayButton = "Submit";
      this.tempValue = this.data.certificationAuthorityModel.certificationAuthorityName!= null ? this.data.certificationAuthorityModel.certificationAuthorityName : '';
    }
    this.cdr.detectChanges();

  }

  closeModal() {
    this.dialogRef.close();
  }

  submit() {
    this.commonService.commonInsertService(this.assetOptimaServices.saveOrUpdateCertificationAuthority, this.certificationAuthorityForm.getRawValue())
    .subscribe( data => {
      this.responseData = data;
     if(this.responseData.success === true) {
      this.commonService.openToastSuccessMessage(this.responseData.message);
      this.dialogRef.close();
     }else
     this.commonService.openToastWarningMessage(this.responseData.message);
    });
  }

  checkUniqueConstrainForCertificationAuthorityName(){
    if(((this.tempValue!= null || this.tempValue!= '') ? this.tempValue.toUpperCase() : '') === ((this.certificationAuthorityForm.controls.certificationAuthorityName.value!= null || this.certificationAuthorityForm.controls.certificationAuthorityName.value!= '') ? this.certificationAuthorityForm.controls.certificationAuthorityName.value.toUpperCase():'')) {

    }else if(this.certificationAuthorityForm.controls.certificationAuthorityName.value.replace (/s+/g, ' ').trim () === ''){
      this.certificationAuthorityForm.controls['certificationAuthorityName'].setValue('');
    }else{
    const constraintData: UniqueValidationModel = new UniqueValidationModel();
    constraintData.className = "com.sams.to.asset.CertificationAuthorityTO";
    constraintData.constraints = {
      'certificationAuthorityName': this.certificationAuthorityForm.controls.certificationAuthorityName.value.toUpperCase().trim(),
      'orgId':this.userSession.getUserOrgId(),
    };
    this.commonService.checkUniqueValidation(constraintData).subscribe(
      data => {
        if(!data.success){
          //show the warning invalidate the form group
          this.ErrorMsg = data.message;
          this.certificationAuthorityForm.controls.certificationAuthorityName.setErrors(Validators.minLength);
          this.certificationAuthorityForm.controls.certificationAuthorityName.setErrors({"notUnique": true});
          } else {
          this.ErrorMsg = '';
          this.certificationAuthorityForm.controls.certificationAuthorityName.setErrors(null);
          }
      }
    );
    }
  }

}
