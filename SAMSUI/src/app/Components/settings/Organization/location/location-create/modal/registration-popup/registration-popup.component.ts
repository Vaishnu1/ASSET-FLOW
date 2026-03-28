import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonHint } from 'src/app/Constants/CommonHint';

@Component({
  selector: 'app-registration-popup',
  templateUrl: './registration-popup.component.html',
  styleUrls: ['./registration-popup.component.css']
})
export class RegistrationPopupComponent implements OnInit {

  CommonhintMsg = new CommonHint();

  
  @ViewChild('currencyFocus') currencyFocus: ElementRef;    

  constructor(public dialogRef: MatDialogRef<RegistrationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private assetOptimaConstants: AssetOptimaConstants) { }

  locationRegistratiomFormGroup: FormGroup;
  ngOnInit() {
    this.locationRegistratiomFormGroup = new FormGroup({
      locRegistrationId: new FormControl(0),
      registrationName: new FormControl('',[Validators.required,Validators.maxLength(50)]),
      registrationNo: new FormControl('',[Validators.required,Validators.maxLength(50)]), 
      locationId: new FormControl(''),
      orgId: new FormControl(''),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      active:new FormControl(true) 
    });
    if (this.data.locRegistrationId > 0) {
      this.locationRegistratiomFormGroup.patchValue(this.data);
    }
    this.commonService.setFormFocus(this.currencyFocus);    

  }

  close(){
    this.dialogRef.close( ); 
  }
  save(){
    this.dialogRef.close(this.locationRegistratiomFormGroup.value);  
  }

}
