import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-gate-pass-source-info',
  templateUrl: './gate-pass-source-info.component.html',
  styleUrls: ['./gate-pass-source-info.component.css']
})
export class GatePassSourceInfoComponent implements OnInit {

  title = 'Gate Pass Source Information';

  gatePassMainInfoForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<GatePassSourceInfoComponent>,
                private router: Router,
                @Inject(MAT_DIALOG_DATA) private data,
                private commonService: CommonService,
                public assetOptimaServices: AssetOptimaServices,
                private titleService: Title,
                private readonly dialog: MatDialog,
                private userSession: UserSessionService) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
        this.gatePassMainInfoForm = new FormGroup({
          gatePassSource: new FormControl(this.data.gatePassHdrInfo.gatePassSource),
          gatePassSourceId: new FormControl(this.data.gatePassHdrInfo.gatePassSourceId),
          gatePassSourceNo: new FormControl(this.data.gatePassHdrInfo.gatePassSourceNo)
        });

    this.gatePassMainInfoForm.controls.gatePassSource.disable();
    this.gatePassMainInfoForm.controls.gatePassSourceNo.disable();
  }

  closeModal() {
    this.dialogRef.close();
  }

}
