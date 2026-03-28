import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-additionalinfo-create',
  templateUrl: './additionalinfo-create.component.html',
  styleUrls: ['./additionalinfo-create.component.css']
})
export class AdditionalinfoCreateComponent implements OnInit {

  @ViewChild('additionalInfoName') additionalInfoNameFocus: ElementRef;

  additionalInfoForm: FormGroup;
  buttonShowOnEdit: boolean=true;
  buttonDisplay: string;

  constructor(
              public dialogRef: MatDialogRef<AdditionalinfoCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private change: ChangeDetectorRef) { }

  ngOnInit() {
    this.additionalInfoForm = new FormGroup({
      modelOtherInfoId: new FormControl(''),
      infoName: new FormControl(''),
      infoLabel: new FormControl(''),
      infoTitle: new FormControl(''),
      intoType: new FormControl(''),
      infoDetails: new FormControl(''),
      orgId: new FormControl(''),
      createdBy: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      pageNumber: new FormControl(''),
      recordsPerPage: new FormControl(''),
      orgName: new FormControl(''),
      active : new FormControl('')
    });
    this.additionalInfoNameFocus.nativeElement.focus();
  }

  ngAfterViewInit() {
    this.additionalInfoNameFocus.nativeElement.focus();
    if(this.data.additionalInfo!=0){
      this.additionalInfoForm.patchValue(this.data.additionalInfo);
      if(this.data.mode=='view'){
      this.buttonShowOnEdit=false;
        this.additionalInfoForm.disable();
      }else{
        this.buttonDisplay='Update';
      }
    }else{
        this.additionalInfoForm.controls.active.setValue(true);
        this.buttonDisplay='Submit';
    }
    this.change.detectChanges();
  }

  addAdditionalInfoModel() {
    this.dialogRef.close(this.additionalInfoForm.getRawValue());
  }

  closeModal(){
    this.dialogRef.close();
  }

}
