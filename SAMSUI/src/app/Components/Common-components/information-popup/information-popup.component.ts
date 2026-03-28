import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelListComponent } from '../../asset/Asset-Master/Model/model-list/model-list.component';

@Component({
  selector: 'app-information-popup',
  templateUrl: './information-popup.component.html',
  styleUrls: ['./information-popup.component.css']
})
export class InformationPopupComponent implements OnInit {

  title: string;
  infoText: string='';
  commonhint: string='';
  length:number = 0;

  constructor(public dialogRef: MatDialogRef<ModelListComponent>,
    @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.infoText = this.data.infoText;
    this.commonhint = this.data.commonhint;
    this.length = this.data.length;
  }

  Cancel() {
    this.dialogRef.close({'status': false,'infoText':''});
  }
  
  Proceed() {
    this.dialogRef.close({'status': true,'infoText':this.infoText});
  }  

}
