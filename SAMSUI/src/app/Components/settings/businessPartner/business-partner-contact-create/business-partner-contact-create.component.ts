import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { CommonHint } from 'src/app/Constants/CommonHint';

@Component({
  selector: 'app-business-partner-contact-create',
  templateUrl: './business-partner-contact-create.component.html',
  styleUrls: ['./business-partner-contact-create.component.css']
})
export class BusinessPartnerContactCreateComponent implements OnInit {

  contactInfoForm: FormGroup;

  headingDisplay: string;
  buttonDisplay: string;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  constructor(public dialogRef: MatDialogRef<BusinessPartnerContactCreateComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private cdr: ChangeDetectorRef,
              private validationService: AssetOptimaConstants) { }

  ngOnInit(): void {
    this.contactInfoForm = new FormGroup({
      partnerSiteContactPerson: new FormControl('',[Validators.required,Validators.required,Validators.maxLength(50)]),
      partnerSiteContactEmailId: new FormControl('',[Validators.pattern(this.validationService.emailValidation),Validators.maxLength(50)]),
      partnerSitePersonPhoneNo: new FormControl('',[Validators.required, Validators.pattern(this.validationService.phoneNumberValidation),Validators.maxLength(15), Validators.minLength(10),]),
      partnerSitePersonDesignation: new FormControl('',[Validators.maxLength(60)]),

      businessSiteContactId: new FormControl(''),
      partnerSiteId: new FormControl(''),
      businessPartnerId: new FormControl('')
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
