import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';

@Component({
  selector: 'app-sr-damage-info',
  templateUrl: './sr-damage-info.component.html',
  styleUrls: ['./sr-damage-info.component.css']
})
export class SrDamageInfoComponent implements OnInit {

  srBreakDownDamageForm: FormGroup;
  stId : Number = 0;

  physicalDamageList = [
    { name: 'YES' },
    { name: 'NO' }
  ];

  patientIncidentList = [
    { name: 'YES' },
    { name: 'NO' }
  ];

  constructor(private activatedRoute: ActivatedRoute,
              private commonService: CommonService,
              private assetOptimaServices: AssetOptimaServices,
              private assetOptimaConstants: AssetOptimaConstants,
              private router: Router,
              public dialogRef: MatDialogRef<SrDamageInfoComponent>,
              @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit(): void {
    this.srBreakDownDamageForm = new FormGroup({
      srId : new FormControl(0),
      physicalDamageDisp : new FormControl('', [Validators.required]),
      physicalDamageDescription  : new FormControl(''),
      patientIncidentDisp : new FormControl('', [Validators.required]),
      incidentDescription  : new FormControl('')
    });
    this.srBreakDownDamageForm.controls.srId.setValue(this.data.srId);
    this.srBreakDownDamageForm.controls.physicalDamageDisp.setValue(this.data.physicalDamageDisp);
    this.srBreakDownDamageForm.controls.physicalDamageDescription.setValue(this.data.physicalDamageDescription);
    this.srBreakDownDamageForm.controls.patientIncidentDisp.setValue(this.data.patientIncidentDisp);
    this.srBreakDownDamageForm.controls.incidentDescription.setValue(this.data.incidentDescription);

    this.srBreakDownDamageForm.controls.physicalDamageDisp.disable();
    this.srBreakDownDamageForm.controls.physicalDamageDescription.disable();
    this.srBreakDownDamageForm.controls.patientIncidentDisp.disable();
    this.srBreakDownDamageForm.controls.incidentDescription.disable();
  }

  close() {
    this.dialogRef.close();
  }

  changeActionPhysicalDamage (event) {
    console.log("event.name" , event.name);
    if (event === undefined) {

    } else {
      if(event.name == 'YES') {
        this.srBreakDownDamageForm.controls.physicalDamageDescription.enable();
      } else {
        this.srBreakDownDamageForm.controls.physicalDamageDescription.disable();
      }
    }
  }

  changeActionPatientIncident (event) {
    console.log("event.name" , event.name);
    if (event === undefined) {
      
    } else {
      if(event.name == 'YES') {
        this.srBreakDownDamageForm.controls.incidentDescription.enable();
      } else {
        this.srBreakDownDamageForm.controls.incidentDescription.disable();
      }
    }
  }

  updateSrDamageInfo () {
    this.commonService.showSpinner();
    this.commonService.commonInsertService('saveUpdateBMDamageInfo.sams', this.srBreakDownDamageForm.getRawValue()).subscribe(
      data => {
        if (data.success) {
          this.dialogRef.close(true);
          this.commonService.openToastSuccessMessage("Damage Information Updated to Service Request Successfully!");
          this.commonService.hideSpinner();
        }
      }
    );
  }

}
