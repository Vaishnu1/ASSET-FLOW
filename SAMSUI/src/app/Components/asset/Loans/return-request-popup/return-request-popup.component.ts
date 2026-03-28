import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { CommonService } from 'src/app/Services/common-service/common.service';

@Component({
  selector: 'app-return-request-popup',
  templateUrl: './return-request-popup.component.html',
  styleUrls: ['./return-request-popup.component.css']
})
export class ReturnRequestPopupComponent implements OnInit {

  loanCreateForm: FormGroup;
  @ViewChild('returnCondition') returnConditionFocus: ElementRef;

  sourceScreenTemp: string=this.data.sourceScreen;

  //COMBO
  assetStatusCombo: any=[];
  asssetStatusPageNumber: number;
  scrollsyncAssetStatus: boolean = false;
  recordsPerPageForCombo: string;

  CommonhintMsg = new CommonHint();

  constructor(public dialogRef: MatDialogRef<ReturnRequestPopupComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private commonService: CommonService) { 
          this.asssetStatusPageNumber =1;
              }

  ngOnInit() {
    this.loanCreateForm = new FormGroup({
      returnCondition :  new FormControl('', [Validators.required, Validators.maxLength(500)]),
      returnRequestRaisedBy: new FormControl('',[Validators.required]),
      returnRequestRaisedDtDisp: new FormControl(new Date(),[Validators.required]),
      returnRequestRaisedDt: new FormControl(''),
      loanId: new FormControl(this.data.loanId),
      assetId: new FormControl(this.data.assetId),
      loanStatusId: new FormControl(0),
      loanRaisedBy: new FormControl(''),
      loanRaisedDt: new FormControl(''),
      loanRaisedDtDisp: new FormControl(new Date(),Validators.required),
      assetCondition: new FormControl(''),
      loanApprovedBy: new FormControl(''),
      loanApprovedDtDisp: new FormControl(''),
      loanChildAsset: new FormControl([]),
      loanAssetAccessories: new FormControl([])
    });
    this.loanCreateForm.controls.loanAssetAccessories.setValue(this.data.accessoriesList);
    this.loanCreateForm.controls.loanChildAsset.setValue(this.data.childAssetList);
    if(this.sourceScreenTemp=='listScreen'){
      this.commonService.commonGetService('fetchLoanDtlByLoanId.sams', this.loanCreateForm.controls.loanId.value).subscribe(
        data => {
          this.loanCreateForm.patchValue(data.responseData);
          this.loanCreateForm.disable();
        }
      );
    }
  }

  ngAfterViewInit() {
    this.commonService.setFormFocus(this.returnConditionFocus);
  }

  closeModal(){
    this.dialogRef.close();
  }

  loadAssetStatusComboData(searchValue) {
    this.scrollsyncAssetStatus = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetStatusCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.asssetStatusPageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.asssetStatusPageNumber === 1) {
              this.assetStatusCombo = data.responseData.comboList;
            } else {
              this.assetStatusCombo = this.assetStatusCombo.concat(data.responseData.comboList);
            }
          } else {
            this.assetStatusCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length != 0 ? this.asssetStatusPageNumber += 1 : this.asssetStatusPageNumber = 1;
        }
      );
    this.scrollsyncAssetStatus = false;
  }

  selectedAssetStatusList(event) {
    if (event === undefined) {
      this.loanCreateForm.controls.assetStatusId.setValue(0);
      this.loanCreateForm.controls.assetStatus.setValue('');
      this.asssetStatusPageNumber = 1;
      this.assetStatusCombo = [];
    } else {
      this.loanCreateForm.controls.assetStatusId.setValue(event.assetStatusId);
      this.loanCreateForm.controls.assetStatus.setValue(event.assetStatusName);
    }
  }

  submit(){
    this.commonService.commonGetService('updateLoanStatus.sams', this.loanCreateForm.controls.loanId.value, this.data.statusId, this.loanCreateForm.controls.assetId.value, this.loanCreateForm.controls.returnRequestRaisedBy.value,this.loanCreateForm.controls.returnCondition.value).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
          this.ngOnInit();
          this.dialogRef.close();
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      });
    
  }
  
}
