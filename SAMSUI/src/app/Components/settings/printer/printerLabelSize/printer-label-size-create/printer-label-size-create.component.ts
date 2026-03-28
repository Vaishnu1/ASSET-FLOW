import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { getData } from 'src/app/Model/common/fetchListData';
import { CommonService } from 'src/app/Services/common-service/common.service';

@Component({
  selector: 'app-printer-label-size-create',
  templateUrl: './printer-label-size-create.component.html',
  styleUrls: ['./printer-label-size-create.component.css']
})
export class PrinterLabelSizeCreateComponent implements OnInit {

  printerLabelSizeForm: FormGroup;

  isAddMode: boolean = false;
  isEditMode: boolean = false;
  isViewMode: boolean = false;

  displayButton: string;

  recordsPerPageForCombo: string;

  printerModelCombo: any = [];
  scrollPrinterModelSync: boolean = false;
  printerModelPageNumber: number;
  getData: getData;

  ErrorMsg: String;
  tempValue: String = '';
  updateFlag = false;

  constructor(private matDialogRef: MatDialogRef<PrinterLabelSizeCreateComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private validationService: AssetOptimaConstants,
              private commonService: CommonService) {

      this.printerModelPageNumber = 1;
  }

  ngOnInit(): void {
    this.printerLabelSizeForm = new FormGroup({
      printerLabelId: new FormControl(''),
      printerModelId: new FormControl(''),
      printerModel  : new FormControl('',[Validators.required]),
      labelSize     : new FormControl('',[Validators.required,Validators.maxLength(3),Validators.pattern(this.validationService.numericValidation)]),

      active: new FormControl('true'),
      createdBy: new FormControl(''),
      updatedBy: new FormControl(''),
      createdDt: new FormControl(Date),
      updatedDt: new FormControl(Date),
      createdDtDisp: new FormControl(''),
      UpdatedDtDisp: new FormControl(''),
    });
  }

  ngAfterViewInit() {
    if(this.data.printerLabelSizeInfo != 0){
      if(this.data.mode == 'view'){
        this.isViewMode = true;
        this.printerLabelSizeForm.disable();
      }else{
        this.displayButton="Update";
        this.isEditMode = true;
      }
      this.printerLabelSizeForm.patchValue(this.data.printerLabelSizeInfo);
      this.printerLabelSizeForm.controls.printerModel.disable();
    }else{
      if(this.data.mode == 'add'){
        this.displayButton="Submit";
        this.isAddMode = true;
      }
    }
  }

  exit() {
    this.matDialogRef.close();
  }

  listOfPrinterModel(searchValue) {
    this.scrollPrinterModelSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('fetchListOfAllPrinterModelCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.printerModelPageNumber,'','').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.printerModelPageNumber , this.printerModelCombo , data.responseData.comboList)
          this.printerModelPageNumber = this.getData.pageNumber;
          this.printerModelCombo = this.getData.dataList;
          this.scrollPrinterModelSync = false;
        }
      );
  }

  setPrinterModel(event) {
    if (event === undefined) {
      this.printerLabelSizeForm.controls.printerModelId.setValue(0);
      this.printerLabelSizeForm.controls.printerModel.setValue('');
      this.printerModelPageNumber = 1;
      this.printerModelCombo = [];
    } else {
      this.printerLabelSizeForm.controls.printerModelId.setValue(event.printerModelId);
      this.printerLabelSizeForm.controls.printerModel.setValue(event.printerModel);
    }
  }

  savePrinterlabelSize(){
    this.commonService.showSpinner();
    this.commonService.commonInsertService('saveOrUpdatePrinterLabel.sams',this.printerLabelSizeForm.getRawValue()).subscribe(
    data => {
      if(data.success){
        this.commonService.openToastSuccessMessage(data.message);
        this.commonService.hideSpinner();
        this.matDialogRef.close();
      } else {
        this.commonService.openToastErrorMessage(data.message);
        this.commonService.hideSpinner();
      } });
  }

  uniqueValidation() {
    if (((this.tempValue != null || this.tempValue != '') ? this.tempValue.toLowerCase() : '') === ((this.printerLabelSizeForm.controls.labelSize.value != null) ? this.printerLabelSizeForm.controls.labelSize.value.toLowerCase() : '')) {

    } else if(this.printerLabelSizeForm.controls.labelSize.value === ''){
     this.printerLabelSizeForm.controls.labelSize.setErrors(Validators.required);
    }else{
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.base.PrinterLabelSizeTO";
      constraintData.constraints = {
        'labelSize': this.printerLabelSizeForm.controls.labelSize.value.trim(),
        'printerModelId': this.printerLabelSizeForm.controls.printerModelId.value,
      };

      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if (!data.success) {
            this.ErrorMsg = data.message;
            this.printerLabelSizeForm.controls.labelSize.setErrors({ "notUnique": true });
            this.updateFlag = true;
          } else {
            this.ErrorMsg = '';
            this.printerLabelSizeForm.controls.labelSize.setErrors(null);
            this.updateFlag = false;
          }
        }
      );
    }
  }

}
