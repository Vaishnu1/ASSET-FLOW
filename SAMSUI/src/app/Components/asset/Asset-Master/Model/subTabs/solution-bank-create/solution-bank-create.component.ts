import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-solution-bank-create',
  templateUrl: './solution-bank-create.component.html',
  styleUrls: ['./solution-bank-create.component.css']
})
export class SolutionBankCreateComponent implements OnInit {

  @ViewChild('solBankDefectType') solBankDefectTypeFocus: ElementRef;

  modelSolutionBankForm: FormGroup;

  buttonShowOnEdit: boolean=true;
  buttonDisplay: string;

  constructor(public dialogRef: MatDialogRef<SolutionBankCreateComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private change: ChangeDetectorRef) { }

  ngOnInit() {
    this.modelSolutionBankForm = new FormGroup({
        modelDefectId: new FormControl(''),
        defectName: new FormControl(''),
        defectTag: new FormControl(''),
        defectCause: new FormControl(''),
        defectSolution: new FormControl(''),
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
    this.solBankDefectTypeFocus.nativeElement.focus();
  }

  ngAfterViewInit() {
    this.solBankDefectTypeFocus.nativeElement.focus();
    if(this.data.solutionBank!=0){
      this.modelSolutionBankForm.patchValue(this.data.solutionBank)
      if(this.data.mode=="view"){
        this.buttonShowOnEdit=false;
        this.modelSolutionBankForm.disable();
      }else{
        this.buttonDisplay='Update';
      }
    }else{
      this.modelSolutionBankForm.controls.active.setValue(true);
      this.buttonDisplay='Submit';
    }
  this.change.detectChanges();
  }

  closeModal(){
    this.dialogRef.close();
  }

  addSolutionBankModel() {
    this.dialogRef.close(this.modelSolutionBankForm.getRawValue());
  }

}
