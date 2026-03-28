import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { CertificateModel } from 'src/app/Model/master/certificates';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { getData } from 'src/app/Model/common/fetchListData';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-certificates-create',
  templateUrl: './certificates-create.component.html',
  styleUrls: ['./certificates-create.component.css']
})
export class CertificatesCreateComponent implements OnInit {

  certificationAuthorityNameList: any = [];
  decisionListForRenewal: any = [];

  certificatesFormGroup: FormGroup;

  scrollsyncCertification: boolean = false;
  responseData: any;

  certificationAuthorityPageNumber: number;

  mode: string
  recordsPerPageForCombo: string;

  certificateModel: CertificateModel;

   //Create, Edit, Save and Update button name change based on the place
   headingDisplay : string;
   displayButton: string;
   uploadFlag: boolean = false;
   ErrorMsg: String;
   tempValue: String = '';
  getData: getData;

  constructor(public dialogRef: MatDialogRef<CertificatesCreateComponent>,
  @Inject(MAT_DIALOG_DATA) private data,
  private commonService: CommonService,
  private userSession:UserSessionService,
  private assetOptimaServices: AssetOptimaServices,
  private cdr: ChangeDetectorRef) {
    this.certificationAuthorityPageNumber = 1;
   }

  ngOnInit() {
    this.certificatesFormGroup = new FormGroup({
      certificateId: new FormControl(0),
      orgId: new FormControl(0),
      certificationAuthorityId: new FormControl(0, [Validators.required]),
      certificateName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      renewalRequired: new FormControl(''),
      certificationAuthorityName: new FormControl(null),
      active: new FormControl(''),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedDtDisp :new FormControl('')
    });

    this.certificatesFormGroup.controls.active.setValue('true');

    this.decisionListForRenewal = [
      {id: 1, value: 'YES'},
      {id: 2, value: 'NO'}
    ];

    this.certificatesFormGroup.controls.renewalRequired.setValue('NO');
  }

  ngAfterViewInit() {
    this.mode = this.data.mode;
    if(this.data.certificateModel != 0){
      this.certificatesFormGroup.patchValue(this.data.certificateModel);
      this.certificatesFormGroup.controls.certificationAuthorityName.setValue(this.data.certificateModel.certificationAuthorityName);
      this.certificatesFormGroup.controls.certificationAuthorityId.setValue(this.data.certificateModel.certificationAuthorityId);

      if(this.data.mode === 'edit') {
      this.headingDisplay = "Edit";
      this.displayButton = "Update";
      this.certificatesFormGroup.controls.certificateName.disable();
      this.tempValue = this.data.certificateModel.certificateName != null ? this.data.certificateModel.certificateName : '';
      }
      else {
      this.headingDisplay = "View";
      this.certificatesFormGroup.disable();
      }
    }else{

      this.headingDisplay = "Create";
      this.displayButton = "Submit";
      this.tempValue = this.data.certificateModel.certificateName != null ? this.data.certificateModel.certificateName : '';
    }
    this.cdr.detectChanges();

  }

  loadCertificationComboData(searchValue) {
    this.scrollsyncCertification = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllCertificationAuthorityCombo, searchValue.term, '', '',
      this.recordsPerPageForCombo, this.certificationAuthorityPageNumber,'','').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.certificationAuthorityPageNumber , this.certificationAuthorityNameList , data.responseData.comboList)
          this.certificationAuthorityPageNumber = this.getData.pageNumber;
          this.certificationAuthorityNameList = this.getData.dataList;
          this.scrollsyncCertification = false;
       }
      );
  }

  selectedCertificationAuthorityData(event) {
    if(event === 'undefined'){
      this.certificatesFormGroup.controls.certificationAuthorityId.setValue('');
    } else
    this.certificatesFormGroup.controls.certificationAuthorityId.setValue(event.certificationAuthorityId);
  }

  closeModal() {
    this.dialogRef.close();
  }

  submit() {
    this.commonService.commonInsertService(this.assetOptimaServices.saveOrUpdateCertificate, this.certificatesFormGroup.getRawValue())
    .subscribe( data => {
      this.responseData = data;
     if(this.responseData.success === true) {
      this.commonService.openToastSuccessMessage(this.responseData.message);
      this.dialogRef.close();
     }else
     this.commonService.openToastWarningMessage(this.responseData.message);
    });
  }

  checkUniqueConstrainForcertificateName(){
    if(((this.tempValue!= null || this.tempValue!= '') ? this.tempValue.toUpperCase() : '') === ((this.certificatesFormGroup.controls.certificateName.value!= null || this.certificatesFormGroup.controls.certificateName.value!= '') ? this.certificatesFormGroup.controls.certificateName.value.toUpperCase():'')) {

    }else if(this.certificatesFormGroup.controls.certificateName.value.replace (/s+/g, ' ').trim () === ''){
      this.certificatesFormGroup.controls['certificateName'].setValue('');
    }else{
    const constraintData: UniqueValidationModel = new UniqueValidationModel();
    constraintData.className = "com.sams.to.asset.CertificateTO";
    constraintData.constraints = {
      'certificateName': this.certificatesFormGroup.controls.certificateName.value.toUpperCase().trim(),
      'orgId':this.userSession.getUserOrgId(),
    };
    this.commonService.checkUniqueValidation(constraintData).subscribe(
      data => {
        if(!data.success){
          //show the warning invalidate the form group
          this.ErrorMsg = data.message;
          this.certificatesFormGroup.controls.certificateName.setErrors(Validators.minLength);
          this.certificatesFormGroup.controls.certificateName.setErrors({"notUnique": true});
          } else {
          this.ErrorMsg = '';
          this.certificatesFormGroup.controls.certificateName.setErrors(null);
          }
      }
    );
    }
  }

}
