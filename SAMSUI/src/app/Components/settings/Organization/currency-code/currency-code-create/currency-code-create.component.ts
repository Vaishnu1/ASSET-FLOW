import { Component, OnInit, Inject, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { CurrencyModel } from 'src/app/Model/base/currency';
import { UniqueValidationModel } from 'src/app/Model/base/uniqueValidation';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { getData } from 'src/app/Model/common/fetchListData';
import { CurrencyCodeListComponent } from '../currency-code-list/currency-code-list.component';
@Component({
  selector: 'app-currency-code-create',
  templateUrl: './currency-code-create.component.html',
  styleUrls: ['./currency-code-create.component.css']
})
export class CurrencyCodeCreateComponent implements OnInit {

  currencyCodeForm: FormGroup;
  countryList: any = [];
  @ViewChild('curName') curNameFocus: ElementRef;
  headingDisplay : string;
  buttonDisplay : string;
  uploadCurrencyCodeFlag: boolean = false;
  public currencyModel : CurrencyModel;
  tempValue: String = '';
  ErrorMsg: String = '';

    //COMMON HINT MESSAGE
    CommonhintMsg = new CommonHint();

    //FOR LAZY LOADING
    limitCount : any;
    countryScroll: boolean = false;
    countryPageNumber: number;
  getData: getData;

  constructor(public dialogRef: MatDialogRef<CurrencyCodeListComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private commonService:CommonService,
              private assetOptimaServices:AssetOptimaServices,
              private assetOptimaConstants: AssetOptimaConstants,
              private userSessionService: UserSessionService,
              private cdr: ChangeDetectorRef
              ) {
                this.countryPageNumber = 1;
              }

  ngOnInit() {
    this.currencyCodeForm = new FormGroup({
      curId: new FormControl(''),
      curCd: new FormControl('',[Validators.required,Validators.maxLength(20)]),
      curName: new FormControl('',[Validators.required,Validators.maxLength(60)]),
      precision: new FormControl(''),
      countryName: new FormControl(this.assetOptimaConstants.defaultCountryName,[Validators.required]),
      remarks: new FormControl('',Validators.maxLength(500)),
      columnName: new FormControl(''),
      direction: new FormControl(''),
      //Common Objects
      orgId: new FormControl(''),
      createdBy: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      pageNumber: new FormControl(''),
      recordsPerPage: new FormControl(''),
      orgName: new FormControl(''),

      active : new FormControl(true),
      createdDt: new FormControl(''),
      updatedDt: new FormControl(''),
    });
    this.headingDisplay = "Create";
    this.buttonDisplay = "Submit";

  }

  ngAfterViewInit() {
    this.setClick();
    if(this.data.currencyCode !== 0 && this.data.mode==='edit'){
      this.headingDisplay = "Edit";
      this.buttonDisplay = "Update";
      this.currencyCodeForm.patchValue(this.data.currencyCode);
      this.tempValue = this.data.currencyCode.curCd!= null ? this.data.currencyCode.curCd : '';

    }else if(this.data.mode==='view'){
      this.headingDisplay="View";
      this.buttonDisplay="Update";
      this.currencyCodeForm.disable();
      this.currencyCodeForm.patchValue(this.data.currencyCode);


    }else{
      this.tempValue = '';
    }
    this.cdr.detectChanges();

  }

  closeCurrencyCodeModal() {
     this.dialogRef.close();
  }

  listOfCountry(searchValue){
    this.countryScroll = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllCountryForCombo,searchValue.term, '', '', this.limitCount, this.countryPageNumber).subscribe(
      (data) =>{
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.countryPageNumber , this.countryList , data.responseData.comboList)
        this.countryPageNumber = this.getData.pageNumber;
        this.countryList = this.getData.dataList;
        this.countryScroll = false;
      }
    );
  }

  saveCurrencyCode(){
    this.uploadCurrencyCodeFlag = true;
    this.currencyModel = this.currencyCodeForm.value;
    var v_currency =this.currencyModel.curCd;
    var v_currencycode =this.currencyModel.curName;
    if(v_currency==="" && v_currencycode===""){
      this.uploadCurrencyCodeFlag = false;
      this.commonService.openToastWarningMessage("Kindly Enter the Valid Currency Code");
    }else{
      this.currencyModel.curCd = v_currency;
      this.commonService.commonInsertService(this.assetOptimaServices.saveOrUpdateCurrency,this.currencyModel).subscribe(
        data => {
          if(data.success){
            this.uploadCurrencyCodeFlag = false;
            this.commonService.openToastSuccessMessage(data.message);
            this.ngOnInit();
            this.setClick();
          } else {
            this.commonService.openToastErrorMessage(data.message);
            this.uploadCurrencyCodeFlag = false;
          }
        }
      );
    }

  }
  setClick(): void {
    this.curNameFocus.nativeElement.click();
  }
  //Check Currency Code Name existence
  checkForCurrencyCodeExistence() {
    if(this.currencyCodeForm.controls.curCd.value != ''){
      this.currencyCodeForm.controls.curCd.setValue(this.currencyCodeForm.controls.curCd.value.trim())
    }
    if(((this.tempValue!== null || this.tempValue!== '') ? this.tempValue.toLowerCase() : '') === ((this.currencyCodeForm.controls.curCd.value!= null) ? this.currencyCodeForm.controls.curCd.value.toLowerCase():'')) {

    }else{
      let constraintData: UniqueValidationModel = new UniqueValidationModel();
      constraintData.className = "com.sams.to.base.CurrencyCodeTO";
      constraintData.constraints = {
        'orgId':this.userSessionService.getUserOrgId(),
        'curCd': this.currencyCodeForm.controls.curCd.value
      };
      this.commonService.checkUniqueValidation(constraintData).subscribe(
        data => {
          if(!data.success){
            //show the warning invalidate the form group
            this.ErrorMsg = data.message;
            this.currencyCodeForm.controls.curCd.setErrors(Validators.minLength);
            this.currencyCodeForm.controls.curCd.setErrors({"notUnique": true});
          }else{
            this.ErrorMsg = '';
            //this.currencyCodeForm.controls.curCd.setErrors(null);
          }
        }
      );
    }

  }

    inputValidation() {
      var num = this.currencyCodeForm.controls.precision.value;
      if(Number(num)){
        var number = Number(num);
        if (number !== Math.floor(number)) {
           this.currencyCodeForm.controls.precision.setErrors({ decimal:"Precision Should Be A Whole Number" });
        }
      }else{
        if(num!==""){
          this.currencyCodeForm.controls.precision.setErrors({ number:"Precision Should Be Number Only" });
        }

      }

   }

}
