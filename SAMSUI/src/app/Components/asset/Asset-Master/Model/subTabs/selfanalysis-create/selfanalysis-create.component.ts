import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-selfanalysis-create',
  templateUrl: './selfanalysis-create.component.html',
  styleUrls: ['./selfanalysis-create.component.css']
})
export class SelfanalysisCreateComponent implements OnInit {

  @ViewChild('defectType') defectTypeFocus: ElementRef;

  modelSelfAnalysisForm: FormGroup;

  buttonShowOnEdit: boolean=true;
  buttonDisplay: string;

  constructor(
              public dialogRef: MatDialogRef<SelfanalysisCreateComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private change: ChangeDetectorRef) { }

  ngOnInit() {
    this.modelSelfAnalysisForm = new FormGroup({
      modelSelfCheckId: new FormControl(''),
      defectType: new FormControl(''),
      defectTag: new FormControl(''),
      defectQuestion: new FormControl(''),
      orgId: new FormControl(''),
      createdBy: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      pageNumber: new FormControl(''),
      recordsPerPage: new FormControl(''),
      orgName: new FormControl(''),
      active: new FormControl('')
    });
    this.defectTypeFocus.nativeElement.focus();
  }

  ngAfterViewInit() {
    this.defectTypeFocus.nativeElement.focus();
    if(this.data.selfAnalysis!=0){
      this.modelSelfAnalysisForm.patchValue(this.data.selfAnalysis);
      if(this.data.mode=='view'){
        this.buttonShowOnEdit=false;
        this.modelSelfAnalysisForm.disable();
      }else{
        this.buttonDisplay='Update';
      }
    }else{
      this.modelSelfAnalysisForm.controls.active.setValue(true);
      this.buttonDisplay='Submit';
    }
    this.change.detectChanges();
  }

  closeModal(){
    this.dialogRef.close();
  }

  addSelfAnalysisModel() {
    this.dialogRef.close(this.modelSelfAnalysisForm.getRawValue());
  }
}
