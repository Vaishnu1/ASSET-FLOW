import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';

@Component({
  selector: 'app-contract-period-create',
  templateUrl: './contract-period-create.component.html',
  styleUrls: ['./contract-period-create.component.css']
})
export class ContractPeriodCreateComponent implements OnInit {

  contractPeriodForm: FormGroup;
  scrollsync: boolean = false;
  headingDisplay : string;
  buttonDisplay: string;
  buttonShowOnEdit: boolean = true;

  scrollTaxCode1Sync: boolean = false;
  taxCode1PageNumber: number;
  taxCode1List: any = [];

  scrollTaxCode2Sync: boolean = false;
  taxCode2PageNumber: number;
  taxCode2List: any = [];

  limitCount: any;
  
  constructor(private commonService: CommonService,
              private assetOptimaServices: AssetOptimaServices,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) private data,
              public dialogRef: MatDialogRef<ContractPeriodCreateComponent>,
              private change: ChangeDetectorRef,
              private assetOptimaConstants: AssetOptimaConstants) { 

                this.taxCode1PageNumber = 1;
                this.taxCode2PageNumber = 1;

              }

  ngOnInit() {
    this.contractPeriodForm = new FormGroup({
      contractPeriodId: new FormControl(0),
      contractId: new FormControl(0),
      periodContractType: new FormControl(''),
      periodStartDt: new FormControl(''),
      periodStartDtDisp: new FormControl('', [Validators.required]),
      periodEndDt: new FormControl(''),
      periodEndDtDisp: new FormControl('', [Validators.required]),
      periodActive: new FormControl(''), 
      periodInactiveOn: new FormControl(''),
      periodInactiveOnDisp: new FormControl(''),
      periodBasicValue: new FormControl('',[Validators.required,Validators.pattern(this.assetOptimaConstants.numericValidation)]),
      discountRate: new FormControl(0,[Validators.maxLength(4),Validators.pattern(this.assetOptimaConstants.percentageValidation)]),
      discountAmt : new FormControl(0,[Validators.pattern(this.assetOptimaConstants.numericValidation)]),
      periodGrossValue : new FormControl(0,[Validators.required,Validators.pattern(this.assetOptimaConstants.numericValidation)]),
      taxCode1 : new FormControl(''),
      taxCode2 :  new FormControl(''),
      taxCode3 : new FormControl(''),
      taxRate1 : new FormControl(0,[Validators.maxLength(4),Validators.pattern(this.assetOptimaConstants.percentageValidation)]),
      taxRate2 : new FormControl(0,[Validators.maxLength(4),Validators.pattern(this.assetOptimaConstants.percentageValidation)]),
      taxRate3 : new FormControl(0,[Validators.maxLength(4),Validators.pattern(this.assetOptimaConstants.percentageValidation)]),
      taxValue1 : new FormControl(0,[Validators.pattern(this.assetOptimaConstants.numericValidation)]),
      taxValue2 : new FormControl(0,[Validators.pattern(this.assetOptimaConstants.numericValidation)]),
      taxValue3 : new FormControl(0,[Validators.pattern(this.assetOptimaConstants.numericValidation)]),
      periodNetValue : new FormControl(0,[Validators.required,Validators.pattern(this.assetOptimaConstants.numericValidation)]),
      remarks : new FormControl('')
    });
    //Read Only
    this.contractPeriodForm.controls['periodGrossValue'].disable();
    this.contractPeriodForm.controls['periodNetValue'].disable();
    this.contractPeriodForm.controls['discountAmt'].disable();  
  }

  ngAfterViewInit() {
    if(this.data.contractPeriod!=0 ){
      this.contractPeriodForm.patchValue(this.data.contractPeriod);
      if(this.data.mode=='view'){
        this.buttonShowOnEdit=false;
        this.contractPeriodForm.disable();
      }else if(this.data.mode=='edit'){
        this.buttonDisplay='Update';
      }
    }else{
      this.buttonDisplay='Submit';
    }
    this.change.detectChanges();
  }

  dateValidationinstall(event) {
    return false;
  }

  exit() {
    this.dialogRef.close();
  }

  contractValChange() {
    //1.Discount update calculate gross val
    this.calcualteDisRate(Number(this.contractPeriodForm.controls.discountRate.value), Number(this.contractPeriodForm.controls.periodBasicValue.value));
  }

  //Calculate discount amount based on discount rate and basic value
  calcualteDisRate(discountRate1:number, contractBasicValue1:number) {
    let discountRate=Number(discountRate1);
    let contractBasicValue=Number(contractBasicValue1);
    //discountRate=discountRate==''?0:discountRate;   
    if (isNaN(Number(discountRate)) || isNaN(Number(contractBasicValue))) {
      this.contractPeriodForm.controls.discountAmt.setValue(0);
    } else {
      this.contractPeriodForm.controls.periodGrossValue.setValue(Math.round(contractBasicValue * (discountRate / 100)));
    }
    this.contractPeriodForm.controls.periodGrossValue.setValue(this.contractPeriodForm.controls.periodBasicValue.value - 
                                                               this.contractPeriodForm.controls.discountAmt.value);
    //2.add tax value + gross value = net value
    this.contractPeriodForm.controls.periodNetValue.setValue(((Number(this.contractPeriodForm.controls.taxRate1.value) + 
                                                               Number(this.contractPeriodForm.controls.taxRate2.value)) + 
                                                               this.contractPeriodForm.controls.periodGrossValue.value).toFixed(2));
    if (isNaN(this.contractPeriodForm.controls.periodNetValue.value)) {
      this.contractPeriodForm.controls.periodNetValue.setValue(0);
    }
  }

  addContractPeriod() {
    if (this.contractPeriodForm.controls.periodStartDtDisp.value && this.contractPeriodForm.controls.periodStartDtDisp.value != "") {
      this.contractPeriodForm.controls.periodStartDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.contractPeriodForm.controls.periodStartDtDisp.value));
    }
    if (this.contractPeriodForm.controls.periodEndDtDisp.value && this.contractPeriodForm.controls.periodEndDtDisp.value != "") {
      this.contractPeriodForm.controls.periodEndDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.contractPeriodForm.controls.periodEndDtDisp.value));
    }
    this.dialogRef.close(this.contractPeriodForm.getRawValue());
  }

  listOfTaxCode1(searchValue) {
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfTaxCombo, searchValue.term, '', '', this.limitCount, this.taxCode1PageNumber).subscribe(
      (data) => {
        if (data.success) {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.taxCode1PageNumber === 1) {
              this.taxCode1List = data.responseData.comboList;
            } else {
              this.taxCode1List = this.taxCode1List.concat(data.responseData.comboList);
            }
          } else {
            this.taxCode1List = data.responseData.comboList;
          }
          this.taxCode1List.length != 0 ? this.taxCode1PageNumber += 1 : this.taxCode1PageNumber = 1;
        }
      }
    );
  
  }

  setTaxCode1Id(event) {
    this.contractPeriodForm.controls.taxRate1.setValue(event.taxRate);
    this.contractPeriodForm.controls.taxCode1.setValue(event.taxCode);
    let tax1 = this.contractPeriodForm.controls.taxCode1.value;
    let tax2 = this.contractPeriodForm.controls.taxCode2.value;
    if (tax1 == tax2) {
      this.commonService.openToastWarningMessage("Tax 1 and Tax 2 should not be same");
      this.contractPeriodForm.controls.taxRate1.setValue(0);
      this.contractPeriodForm.controls.taxCode1.setValue('');
    }

  }

  listOfTaxCode2(searchValue) {
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfTaxCombo, searchValue.term, '', '', this.limitCount, this.taxCode2PageNumber).subscribe(
      (data) => {
        if (data.success) {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.taxCode2PageNumber === 1) {
              this.taxCode2List = data.responseData.comboList;
            } else {
              this.taxCode2List = this.taxCode2List.concat(data.responseData.comboList);
            }
          } else {
            this.taxCode2List = data.responseData.comboList;
          }
          this.taxCode2List.length != 0 ? this.taxCode2PageNumber += 1 : this.taxCode2PageNumber = 1;
        }
      }
    );
  }

  setTaxCode2Id(event) {
    this.contractPeriodForm.controls.taxRate2.setValue(event.taxRate);
    this.contractPeriodForm.controls.taxCode2.setValue(event.taxCode);
    let tax1 = this.contractPeriodForm.controls.taxCode1.value;
    let tax2 = this.contractPeriodForm.controls.taxCode2.value;
    if (tax1 == tax2) {
      this.commonService.openToastWarningMessage("Tax 1 and Tax 2 should not be same");
      this.contractPeriodForm.controls.taxRate2.setValue(0);
      this.contractPeriodForm.controls.taxCode2.setValue('');
    }

  }

}
