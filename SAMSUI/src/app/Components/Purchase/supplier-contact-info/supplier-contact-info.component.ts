import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { PurchaseOrderCreateComponent } from '../purchase-order-create/purchase-order-create.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-supplier-contact-info',
  templateUrl: './supplier-contact-info.component.html',
  styleUrls: ['./supplier-contact-info.component.css']
})
export class SupplierContactInfoComponent implements OnInit {

  poMainForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<PurchaseOrderCreateComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private commonService: CommonService) { }

  ngOnInit() {

    this.poMainForm = this.data.poMainForm;
  }


  closeModal() {
    this.dialogRef.close({ status: false });
  }

}
