import { Component, OnInit, Inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  MatTable } from '@angular/material/table';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonHint } from 'src/app/Constants/CommonHint';

@Component({
  selector: 'app-bulk-serial-number-upload',
  templateUrl: './bulk-serial-number-upload.component.html',
  styleUrls: ['./bulk-serial-number-upload.component.css']
})
export class BulkSerialNumberUploadComponent implements OnInit {

  CommonhintMsg = new CommonHint();

  @ViewChild('serialNumber') table1: MatTable<any>;
  bulkSerialNo: any[] = [];
  
  displayColmns = ['sno', 'serialNumber','sequenceNumber', 'action'];


  bulkSerialNumberFormGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<BulkSerialNumberUploadComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.bulkSerialNumberFormGroup= new FormGroup({
      serialNo : new FormControl('',[Validators.required])
    })
  }

  closeModal(){
    this.dialogRef.close();
  }

  addSerialNumber(){
    this.bulkSerialNo.push(this.bulkSerialNumberFormGroup.value);
    this.changeDetectorRefs.detectChanges();
    this.table1.renderRows();
    this.bulkSerialNumberFormGroup.reset();
  }

  deleteSerialNumber(index){
    this.bulkSerialNo.splice(index, 1);
    this.changeDetectorRefs.detectChanges();
    this.table1.renderRows();

  }

}
