import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-supp-inv-add-info',
  templateUrl: './supp-inv-add-info.component.html',
  styleUrls: ['./supp-inv-add-info.component.css']
})
export class SuppInvAddInfoComponent implements OnInit {

  title = 'Supplier Invoice Additional Info';

  supplierInvoiceMainInfoForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<SuppInvAddInfoComponent>,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) private data,
              private commonService: CommonService,
              public assetOptimaServices: AssetOptimaServices,
              private titleService: Title,
              private readonly dialog: MatDialog,
              private userSession: UserSessionService) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.supplierInvoiceMainInfoForm = new FormGroup({
      advancePayments: new FormControl('0'),
      tranCharges: new FormControl('0'),
      miscCharges: new FormControl('0')
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  addGRNAddInfo () {
    this.dialogRef.close();
  }

}
