import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonHint } from 'src/app/Constants/CommonHint';

@Component({
  selector: 'app-supplier-site-registration',
  templateUrl: './supplier-site-registration.component.html',
  styleUrls: ['./supplier-site-registration.component.css']
})
export class SupplierSiteRegistrationComponent implements OnInit {

  supplierRegForm : FormGroup;

  headingDisplay: string;
  buttonDisplay: string;

    //COMMON HINT MESSAGE
    CommonhintMsg = new CommonHint();

  constructor(public dialogRef: MatDialogRef<SupplierSiteRegistrationComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private cdr: ChangeDetectorRef
              ) { }

  ngOnInit() {
    this.supplierRegForm = new FormGroup({
      registrationName: new FormControl('',[Validators.required]),
      registrationNo: new FormControl('',[Validators.required]),
      supplierSiteRegId: new FormControl(''),
      supplierSiteId: new FormControl('')
    })
  }

  ngAfterViewInit() {
    if(this.data.registration != 0){
      this.headingDisplay = 'Edit';
      this.buttonDisplay = 'Update';
      this.supplierRegForm.patchValue(this.data.registration);
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
    this.dialogRef.close(this.supplierRegForm.getRawValue());
  }

}
