import { Component, OnInit, Inject, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// servcie
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { taxModel } from 'src/app/Model/base/tax';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { TaxListComponent } from '../tax-list/tax-list.component';

@Component({
  selector: 'app-tax-create',
  templateUrl: './tax-create.component.html',
  styleUrls: ['./tax-create.component.css']
})
export class TaxCreateComponent implements OnInit {
  taxForm: FormGroup;

  public taxModel: taxModel;
  //SAVE, UPDATE, EDIT AND ADD TITLE CHANGE
  headingDisplay: string;
  buttonDisplay: string;
  uploadTaxFlag: boolean = false;
  ErrorMsg: String = '';
  tempValue: String = '';
  // tax method Array { key, value}
  taxcomputation = [
    { id: 1, name: 'PERCENTAGE OF PRICE' },
    { id: 2, name: 'PERCENTAGE OF PRICE INCLUDED WITH TAX' }
  ];

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();
  @ViewChild('taxCode') taxCodeFocus: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<TaxListComponent>,
    private commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) private data,
    private assetOptimaServices: AssetOptimaServices,
    private userSessionService: UserSessionService,
    private cdr: ChangeDetectorRef,
    private assetOptimaConstants: AssetOptimaConstants
  ) { }

  ngOnInit() {
    this.taxForm = new FormGroup({
      taxId: new FormControl(''),
      taxCode: new FormControl('', [Validators.required, Validators.maxLength(50)]),  // tax name & required field
      taxComputation: new FormControl(null, [Validators.required]), // tax method (% of Price or % of Price without Tax) & required filed
      taxRate: new FormControl('', [Validators.maxLength(4),Validators.pattern(this.assetOptimaConstants.percentageValidation), Validators.required]), // tax amount (% or Amount) & non-required, pattern match to x**x.xx or x**x [Validators.pattern('[([0-9])([.]){1})?([0-9]{1,2})]')]
      taxDesc: new FormControl('', [Validators.maxLength(100)]), // tax notes & non-validation
      //COMMON OBJECTS
      createdBy: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      pageNumber: new FormControl(''),
      recordsPerPage: new FormControl(''),
      orgName: new FormControl(''),
      orgId: new FormControl(''),
      locationId: new FormControl(''),
      active: new FormControl(true),
      createdDt: new FormControl(''),
      updatedDt: new FormControl('')
    });
    this.headingDisplay = "Create Tax";
    this.buttonDisplay = "Submit";
  }

  ngAfterViewInit() {
    if (this.data._data != 0 && this.data.mode=='edit') {
      this.headingDisplay = "Edit Tax";
      this.buttonDisplay = "Update";
      this.taxForm.patchValue(this.data._data);
      this.tempValue = this.data._data.taxCode != null ? this.data._data.taxCode : '';
    } else if(this.data.mode=='view'){
        this.headingDisplay='View Tax';
        this.buttonDisplay='Update';
        this.taxForm.disable();
        this.taxForm.patchValue(this.data._data);
    }else {
      this.tempValue = this.data._data.taxCode != null ? this.data._data.taxCode : '';
    }
    this.cdr.detectChanges();
  }
  closeModal() {
    this.dialogRef.close();
  }

  SubmitTax() {  // method to add tax to DB
    //REMOVE EMPTY SPACE IN TAX CODE
    this.uploadTaxFlag = true;
    this.taxModel = this.taxForm.value;
    var taxCode = this.taxModel.taxCode.trim();
    if (taxCode == "") {
      this.uploadTaxFlag = false;
      this.commonService.openToastWarningMessage("Kindly Enter the Valid Tax");
    } else {
      this.taxModel.taxCode = taxCode;
      this.commonService.commonInsertService(this.assetOptimaServices.saveOrUpdateTax, this.taxModel).subscribe(
        data => {
          if (data.success) {
            this.uploadTaxFlag = false;
            this.commonService.openToastSuccessMessage(data.message);
            this.ngOnInit();
            this.setClick();
          } else {
            this.commonService.openToastErrorMessage(data.message);
            this.uploadTaxFlag = false;
          }
        }
      );
    }
  }

  setClick(): void {
    this.taxCodeFocus.nativeElement.click();
  }
  //Check Tax Name existence
  checkForTaxNameExistence() {
    if(this.taxForm.controls.taxCode.value != ''){
      this.taxForm.controls.taxCode.setValue(this.taxForm.controls.taxCode.value.trim())
    }

    if (((this.tempValue != null || this.tempValue != '') ? this.tempValue.toLowerCase() : '') === ((this.taxForm.controls.taxCode.value != null) ? this.taxForm.controls.taxCode.value.toLowerCase() : '')) {

    }else{
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.master.TaxTO";
      constraintData.constraints = {
        'taxCode': this.taxForm.controls.taxCode.value,
        'orgId': this.userSessionService.getUserOrgId()
      };
      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if (!data.success) {
            this.ErrorMsg = data.message;
            this.taxForm.controls.taxCode.setErrors(Validators.minLength);
            this.taxForm.controls.taxCode.setErrors({ "notUnique": true });
          } else {
            this.ErrorMsg = '';
            //this.taxForm.controls.taxCode.setErrors(null);
          }

        }
      );
    }

  }

}
