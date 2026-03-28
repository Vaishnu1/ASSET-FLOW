import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-show-mttr-mtbf-formula',
  templateUrl: './show-mttr-mtbf-formula.component.html',
  styleUrls: ['./show-mttr-mtbf-formula.component.css']
})
export class ShowMttrMtbfFormulaComponent implements OnInit {

  formulaFor : String = null;
  imgSrc : String = null;

  constructor(public dialogRef: MatDialogRef<ShowMttrMtbfFormulaComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
  ) { }

  ngOnInit(): void {

    this.formulaFor = this.data.formulaFor;

    if(this.formulaFor == "MTTR"){
      this.imgSrc =  "assets/images/mttr_formula.png";
    }else if(this.formulaFor == "MTBF"){
      this.imgSrc =  "assets/images/mtbf_formula.png";
    }
  }

   Cancel() {
    this.dialogRef.close({status: false});
 }

}
