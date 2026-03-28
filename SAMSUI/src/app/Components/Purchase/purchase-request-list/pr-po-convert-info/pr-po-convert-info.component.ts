import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-pr-po-convert-info',
  templateUrl: './pr-po-convert-info.component.html',
  styleUrls: ['./pr-po-convert-info.component.css']
})
export class PrPoConvertInfoComponent implements OnInit {

  tempPRConvertPOData: any;
  locValidMsg : string;

  constructor(public dialogRef: MatDialogRef<PrPoConvertInfoComponent>,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) private data,
              private commonService: CommonService,
              private assetOptimaServices: AssetOptimaServices,
              private userSession: UserSessionService) { }

  ngOnInit(): void {
    this.tempPRConvertPOData = this.data.tempPRConvertPOList;
    this.locValidMsg = this.data.locValidMsg;
  }

  close(){
    this.dialogRef.close({ status: true });
  }

}
