import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-purchase-order-history-audit',
  templateUrl: './purchase-order-history-audit.component.html',
  styleUrls: ['./purchase-order-history-audit.component.css']
})
export class PurchaseOrderHistoryAuditComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<PurchaseOrderHistoryAuditComponent>, 
              @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
    console.log(this.data.poHdrId);
    
  } 

  generateReport(){

  }

  exit(){
    this.dialogRef.close();
  }
}
