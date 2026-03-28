import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-pr-new-item-msg',
  templateUrl: './pr-new-item-msg.component.html',
  styleUrls: ['./pr-new-item-msg.component.css']
})
export class PrNewItemMsgComponent implements OnInit {

  tempLocNameData: any;
  locValidMsg : string;

  constructor(public dialogRef: MatDialogRef<PrNewItemMsgComponent>,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) private data,
              private commonService: CommonService,
              private assetOptimaServices: AssetOptimaServices,
              private userSession: UserSessionService) { }

  ngOnInit(): void {
    this.tempLocNameData = this.data.locNameList;
    this.locValidMsg = this.data.locValidMsg;
  }

  close(){
    this.dialogRef.close();
  }

}
