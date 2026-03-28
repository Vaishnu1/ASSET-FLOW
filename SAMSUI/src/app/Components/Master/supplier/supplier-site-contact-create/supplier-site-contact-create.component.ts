import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';

@Component({
  selector: 'app-supplier-site-contact-create',
  templateUrl: './supplier-site-contact-create.component.html',
  styleUrls: ['./supplier-site-contact-create.component.css']
})
export class SupplierSiteContactCreateComponent implements OnInit {

  contactInfoForm : FormGroup;

  headingDisplay: string;
  buttonDisplay: string;

    //COMMON HINT MESSAGE
    CommonhintMsg = new CommonHint();

  constructor(public dialogRef: MatDialogRef<SupplierSiteContactCreateComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private cdr: ChangeDetectorRef,
              private validationService: AssetOptimaConstants,
              ) { 

              }

  ngOnInit() {
    this.contactInfoForm = new FormGroup({
      supplierSiteContactPerson: new FormControl('',[Validators.required,Validators.required,Validators.maxLength(50)]),
      supplierSiteContactEmailId: new FormControl('',[Validators.pattern(this.validationService.emailValidation),Validators.maxLength(50)]),
      supplierSitePersonPhoneNo: new FormControl('',[Validators.required, Validators.pattern(this.validationService.phoneNumberValidation),Validators.maxLength(15), Validators.minLength(10),]),
      supplierSitePersonDesignation: new FormControl('',[Validators.maxLength(60)]),

      supplierSiteContactId: new FormControl(''),
      supplierSiteId: new FormControl('')
    })
  }

  ngAfterViewInit() {
    if(this.data.contactInfo != 0){
      this.headingDisplay = 'Edit';
      this.buttonDisplay = 'Update';
      this.contactInfoForm.patchValue(this.data.contactInfo);
    }else{
      this.headingDisplay = 'Create';
      this.buttonDisplay = 'Submit';
    }
    this.cdr.detectChanges();

  }

  close(){
      this.dialogRef.close();
  }

  save(){
    this.dialogRef.close(this.contactInfoForm.getRawValue());
  }

}
