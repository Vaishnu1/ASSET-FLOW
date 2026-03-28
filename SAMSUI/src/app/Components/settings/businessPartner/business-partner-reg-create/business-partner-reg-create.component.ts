import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonHint } from 'src/app/Constants/CommonHint';

@Component({
  selector: 'app-business-partner-reg-create',
  templateUrl: './business-partner-reg-create.component.html',
  styleUrls: ['./business-partner-reg-create.component.css']
})
export class BusinessPartnerRegCreateComponent implements OnInit {

  partnerSiteRegForm: FormGroup;

  headingDisplay: string;
  buttonDisplay: string;

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  constructor(public dialogRef: MatDialogRef<BusinessPartnerRegCreateComponent>,
             @Inject(MAT_DIALOG_DATA) private data,
             private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.partnerSiteRegForm = new FormGroup({
      registrationName: new FormControl('',[Validators.required]),
      registrationNo: new FormControl('',[Validators.required]),
      businessPartnerRegId: new FormControl(''),
      businessPartnerSiteId: new FormControl(''),
      businessPartnerId: new FormControl('')
    })
  }

  ngAfterViewInit() {
    if(this.data.registration != 0){
      this.headingDisplay = 'Edit';
      this.buttonDisplay = 'Update';
      this.partnerSiteRegForm.patchValue(this.data.registration);
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
    this.dialogRef.close(this.partnerSiteRegForm.getRawValue());
  }

}
