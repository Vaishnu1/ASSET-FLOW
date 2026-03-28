import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-confirmation-gatepass',
  templateUrl: './popup-confirmation-gatepass.component.html',
  styleUrls: ['./popup-confirmation-gatepass.component.css']
})
export class PopupConfirmationGatepassComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<PopupConfirmationGatepassComponent>) { }

  ngOnInit() {
  }

  closePopUp(){
    this.dialogRef.close({'exit':false,'generateFlow':false});
  }

  proceed(){
    this.dialogRef.close({'exit':true,'generateFlow':true});
  }

  cancel(){
    this.dialogRef.close({'exit':true,'generateFlow':false});
  }

}
