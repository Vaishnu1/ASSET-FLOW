import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-gate-pass-collected-info',
  templateUrl: './gate-pass-collected-info.component.html',
  styleUrls: ['./gate-pass-collected-info.component.css']
})
export class GatePassCollectedInfoComponent implements OnInit {

  title = 'Material Collected Information';
  
  gatePassCollectedMainInfoForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<GatePassCollectedInfoComponent>,
     private readonly assetOptimaConstants: AssetOptimaConstants,
                  private router: Router,
                  @Inject(MAT_DIALOG_DATA) private data,
                  private commonService: CommonService,
                  public assetOptimaServices: AssetOptimaServices,
                  private titleService: Title,
                  private readonly dialog: MatDialog,
                  private userSession: UserSessionService,
                  private readonly appGlobals: AssetOptimaConstants,) { }

  ngOnInit(): void {

    this.titleService.setTitle(this.title);
    this.gatePassCollectedMainInfoForm = new FormGroup({
      deliveryTakenByPerson: new FormControl(''),
      deliveryTakenByContactNo: new FormControl('',[Validators.pattern(this.appGlobals.phoneNumberValidation), Validators.maxLength(15), Validators.minLength(10)]),
      deliveryTakenByEmailId: new FormControl('',[Validators.maxLength(50),Validators.pattern(this.assetOptimaConstants.emailValidation)]),
    });

    this.gatePassCollectedMainInfoForm.controls.deliveryTakenByPerson.setValue(this.data.gatePassHdrInfo.deliveryTakenByPerson);
    this.gatePassCollectedMainInfoForm.controls.deliveryTakenByContactNo.setValue(this.data.gatePassHdrInfo.deliveryTakenByContactNo);
    this.gatePassCollectedMainInfoForm.controls.deliveryTakenByEmailId.setValue(this.data.gatePassHdrInfo.deliveryTakenByEmailId);
  }

  closeModal() {
    this.dialogRef.close();
  }

  updateGPCollectedInfo () {
    this.dialogRef.close({ 'exit': true, 'form': this.gatePassCollectedMainInfoForm.getRawValue() });
  }

}
