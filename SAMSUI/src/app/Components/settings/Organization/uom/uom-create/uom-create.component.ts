import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UOMModel } from 'src/app/Model/base/uom';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { UomListComponent } from '../uom-list/uom-list.component';

@Component({
  selector: 'app-uom-create',
  templateUrl: './uom-create.component.html',
  styleUrls: ['./uom-create.component.css']
})
export class UomCreateComponent implements OnInit {

  uomForm: FormGroup;
  @ViewChild('uomCode') uomCodeFocus : ElementRef;
  //HEADING
  headingDisplay : string;
  buttonHeading : string;
  uploadUOMFlag: boolean = false;
  tempValue: String = '';
  ErrorMsg: String = '';

  //MODEL
  public uom: UOMModel;
     //COMMON HINT MESSAGE
     CommonhintMsg = new CommonHint();

  constructor(public deptDialog: MatDialogRef<UomListComponent>,
              public commonService: CommonService,
              public assetOptimeMthnd: AssetOptimaServices,
              private userSessionService: UserSessionService,
              @Inject(MAT_DIALOG_DATA) private data,
              private cdr: ChangeDetectorRef
              ) { }

  ngOnInit() {
    this.uomForm = new FormGroup({
      uomCode : new FormControl('',[Validators.required,Validators.maxLength(20)]),
      uomDesc: new FormControl('',[Validators.maxLength(100)]),
      uomId : new FormControl(''),
      orgId: new FormControl(''),
       //COMMON OBJECTS
      createdBy: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      pageNumber: new FormControl(''),
      recordsPerPage: new FormControl(''),
      orgName: new FormControl(''),
      active: new FormControl(true),
      createdDt      : new FormControl(''),
      updatedDt    : new FormControl(''),
    });
    this.headingDisplay = "Create UOM";
    this.buttonHeading = "Submit";
  }

  ngAfterViewInit() {
    this.setClick();
    if(this.data.uom != 0 && this.data.mode=='edit'){
      this.headingDisplay = "Edit UOM";
      this.buttonHeading = "Update";
      this.uomForm.patchValue(this.data.uom)
      this.tempValue = this.data.uom.uomCode!= null ? this.data.uom.uomCode : '';
    }else if(this.data.mode=='view'){
      this.headingDisplay="View UOM";
      this.buttonHeading="Update";
      this.uomForm.disable();
      this.uomForm.patchValue(this.data.uom)

    }else{
      this.tempValue = this.data.uom.uomCode!= null ? this.data.uom.uomCode : '';
    }
    this.cdr.detectChanges();
  }

  closeUOMModal() {
    this.deptDialog.close();
  }

  submitUOM(){
    this.uploadUOMFlag = true;
    this.uom = this.uomForm.value;
    var v_uom = this.uom.uomCode.trim();
    if(v_uom==""){
      this.uploadUOMFlag = false;
      this.commonService.openToastWarningMessage("Kindly Enter the Valid UOM");
    }else{
      this.uom.uomCode = v_uom;
      this.commonService.commonInsertService(this.assetOptimeMthnd.saveOrUpdateUOM,this.uom).subscribe(
        data => {
          if(data.success){
            this.uploadUOMFlag = false;
            this.commonService.openToastSuccessMessage(data.message);
            this.ngOnInit();
            this.setClick();
          } else {
            this.commonService.openToastErrorMessage(data.message);
            this.uploadUOMFlag = false;
          }
        }
      );
    }

  }
  setClick(): void {
    this.uomCodeFocus.nativeElement.click();
  }
   //Check UOM Name existence
   checkForUOMtNameExistence() {
    if(this.uomForm.controls.uomCode.value != ''){
      this.uomForm.controls.uomCode.setValue(this.uomForm.controls.uomCode.value.trim())
    }
    if(((this.tempValue!= null || this.tempValue!= '') ? this.tempValue.toLowerCase() : '') === ((this.uomForm.controls.uomCode.value!= null) ? this.uomForm.controls.uomCode.value.toLowerCase():'')) {

    }else{
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.master.UomTO";
      constraintData.constraints = {
        'uomCode': this.uomForm.controls.uomCode.value,
        'orgId':this.userSessionService.getUserOrgId()
      };
      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if(!data.success){
            //show the warning invalidate the form group
            this.ErrorMsg = data.message;
            this.uomForm.controls.uomCode.setErrors(Validators.minLength);
            this.uomForm.controls.uomCode.setErrors({"notUnique": true});
          }else{
            this.ErrorMsg = '';
            //this.uomForm.controls.manufacturerName.setErrors(null);
          }
        }
      );

    }
      }

}
