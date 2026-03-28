import { Component, OnInit, Inject } from '@angular/core';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tax-calcfor-purchase',
  templateUrl: './tax-calcfor-purchase.component.html',
  styleUrls: ['./tax-calcfor-purchase.component.css']
})
export class TaxCalcforPurchaseComponent implements OnInit {

  taxCalculation: FormGroup;
  taxCD3List: any[] = [];
  temp: number=0;

  displayedtaxColumns = ['sno','select', 'taxCode','taxRate','taxAmount'];

  constructor(@Inject(MAT_DIALOG_DATA) private data,
  public dialogRef: MatDialogRef<TaxCalcforPurchaseComponent>,
  private commonService: CommonService) { }

  ngOnInit() {
    console.log(this.data);
    this.taxCalculation = new FormGroup({
        basicAmount: new FormControl(this.data.basicAmount),
        totalTaxAmount: new FormControl(0)
    })
    this.listOfTaxCd3('');
  }

  closeTaxCalculationPopUp(){
    this.dialogRef.close({'exit':false});
  }

  listOfTaxCd3(searchValue){
    this.commonService.getComboResults('listOfTaxCombo.sams',searchValue.term,'','').subscribe(
      (data) =>{
        if (data.success) {
            this.taxCD3List = data.responseData.comboList;
            for(let i=0; i<this.taxCD3List.length; i++){
              if(this.data.taxCd1==this.taxCD3List[i].taxCode){
                this.taxCD3List[i].taxRate=this.data.taxRate1;
                this.taxCD3List[i].taxAmount=this.data.taxAmt1;
                this.taxCD3List[i].active=true;
              }else if(this.data.taxCd2==this.taxCD3List[i].taxCode){
                this.taxCD3List[i].taxRate=this.data.taxRate2;
                this.taxCD3List[i].taxAmount=this.data.taxAmt1;
                this.taxCD3List[i].active=true;
              }
            }
            this.taxCalculation.controls.totalTaxAmount.setValue(this.data.taxAmt1+this.data.taxAmt2);
          }
        }
    );
  }

  selectAllTax(value: boolean){
    for (var i = 0; this.taxCD3List.length > i; i++) this.taxCD3List[i].active = value;
  }

  calculateTaxAmountLineLevel(index,taxRate,addRemove){
    if(!addRemove){
      var taxLineLevel = (this.data.basicAmount * taxRate) / 100;
      this.taxCD3List[index].taxAmount=taxLineLevel;
      //FOR CALCULATING GRAND TOTAL
      this.temp=this.temp+taxLineLevel;
      this.taxCalculation.controls.totalTaxAmount.setValue(this.temp);
    }else{
      var taxLineRemove = (this.data.basicAmount * taxRate) / 100;
      this.taxCD3List[index].taxAmount=0;
      //FOR CALCULATING GRAND TOTAL
      this.temp=this.temp-taxLineRemove;
      this.taxCalculation.controls.totalTaxAmount.setValue(this.temp);
    }
  }

  submitTaxCalculation(){
    this.dialogRef.close({ 'exit': true, 'listForm': this.taxCD3List, 'basicInfo':this.taxCalculation.getRawValue()});
  }
}
