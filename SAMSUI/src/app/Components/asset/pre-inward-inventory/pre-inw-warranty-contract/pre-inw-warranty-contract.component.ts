import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { getData } from 'src/app/Model/common/fetchListData';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';


@Component({
  selector: 'app-pre-inw-warranty-contract',
  templateUrl: './pre-inw-warranty-contract.component.html',
  styleUrls: ['./pre-inw-warranty-contract.component.css']
})
export class PreInwWarrantyContractComponent implements OnInit {

  warrantyContractFormGroup: FormGroup;

  limitCount: any;

  ownershipTypeTemp: any;

  coverageStartingFrom = [
    { id: 1, name: 'INSTALLATION DATE' },
    { id: 2, name: 'PO DATE' },
    { id: 3, name: 'INVOICE DATE' }
  ];

  scrollCoverageTypeSync: boolean = false;
  coverageTypePageNumber: number;
  coverageTypeList: any = [];

  scrollContractTypeSync: boolean = false;
  contractTypePageNumber: number;
  contractTypeList: any = [];

  isViewMode:boolean=false;

  size: number=0;
  getData: getData;

  constructor(private matDialogRef: MatDialogRef<PreInwWarrantyContractComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private assetOptimaServices: AssetOptimaServices,
              private commonService: CommonService) {
      this.coverageTypePageNumber =1;
      this.contractTypePageNumber =1;
              }

  ngOnInit() {
    this.warrantyContractFormGroup = new  FormGroup({
      preInwContractWarrantyId : new FormControl(0),
      inwardInventoryDtlId: new FormControl(0),
      coverageTypeId: new FormControl(0),
      contractTypeId: new FormControl(0),
      coverageStartingFrom: new FormControl('PO DATE'),
      periodInYears: new FormControl(0,[Validators.required]),
      periodInMonths: new FormControl(0),
      includedService: new FormControl(''),
      excludedService: new FormControl(''),
      amcCmcValue: new FormControl(0),
      amcCmcPercentage: new FormControl(0),
      nextAmcCmcEscalationPer: new FormControl(0),
      coverageType: new FormControl(null,[Validators.required]),
      contractType: new FormControl(null),
      originalUnitPrice: new FormControl(0),
      createdBy: new FormControl(''),
      updatedBy: new FormControl(''),
      createdDt: new FormControl(''),
      updatedDt: new FormControl(''),
      seqNo: new FormControl(0)
    });

    // this.warrantyContractFormGroup.controls.coverageStartingFrom.setValidators([Validators.required]);
  }

  ngAfterViewInit(){
    this.size=this.data.size;
    if(this.size>0){
      this.warrantyContractFormGroup.controls.coverageType.setValue(null);
      this.warrantyContractFormGroup.controls.coverageTypeId.setValue(0);
    }
    if(this.data.warrantyContract != null){
      this.warrantyContractFormGroup.patchValue(this.data.warrantyContract);
      this.warrantyContractFormGroup.controls.originalUnitPrice.setValue(this.data.unitPrice);
      if(this.data.type == 'view'){
        this.warrantyContractFormGroup.disable();
        this.isViewMode=true;
      }
    }else{
      this.warrantyContractFormGroup.controls.originalUnitPrice.setValue(this.data.unitPrice);
    }
    this.totCallAmnt();
  }

  exit(){
    this.matDialogRef.close();
  }

  listOfCoverageType(searchValue) {
    this.scrollCoverageTypeSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllCoverageTypeCombo, searchValue.term, '', '', this.limitCount, this.coverageTypePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.coverageTypePageNumber , this.coverageTypeList , data.responseData.comboList)
        this.coverageTypePageNumber = this.getData.pageNumber;
        this.coverageTypeList = this.getData.dataList;
        this.scrollCoverageTypeSync = false;
      }
    );
  }

  setCoverageType(event) {
    if (event === undefined) {
      this.warrantyContractFormGroup.controls.coverageType.setValue(null);
      this.warrantyContractFormGroup.controls.coverageTypeId.setValue(0);
      this.coverageTypePageNumber = 1;
      this.coverageTypeList = [];
    } else{
      this.warrantyContractFormGroup.controls.coverageType.setValue(event.coverageTypeName);
      this.warrantyContractFormGroup.controls.coverageTypeId.setValue(event.coverageTypeId);
      if(event.coverageTypeName === 'CONTRACT'){
        this.warrantyContractFormGroup.controls.contractType.setValidators([Validators.required]);
        this.warrantyContractFormGroup.controls.coverageStartingFrom.setValue(null);
        this.warrantyContractFormGroup.controls.coverageStartingFrom.setValidators([]);
      }else{
        this.warrantyContractFormGroup.controls.contractType.setValidators([])
        this.setContractType(undefined);
        this.warrantyContractFormGroup.controls.nextAmcCmcEscalationPer.setValue(0);
        this.warrantyContractFormGroup.controls.amcCmcValue.setValue(0)
        this.warrantyContractFormGroup.controls.amcCmcPercentage.setValue(0)
        this.warrantyContractFormGroup.controls.coverageStartingFrom.setValidators([Validators.required]);
        this.warrantyContractFormGroup.controls.coverageStartingFrom.setValue('PO DATE');
      }
    }
  }

  listOfContractType(searchValue) {
    this.scrollContractTypeSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllContractTypeCombo, searchValue.term, '', '', this.limitCount, this.contractTypePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.contractTypePageNumber , this.contractTypeList , data.responseData.comboList)
        this.contractTypePageNumber = this.getData.pageNumber;
        this.contractTypeList = this.getData.dataList;
        this.scrollContractTypeSync = false;
      }
    );
  }

  setContractType(event) {
    if (event === undefined) {
      this.warrantyContractFormGroup.controls.contractType.setValue(null);
      this.warrantyContractFormGroup.controls.contractTypeId.setValue(0);
      this.contractTypePageNumber = 1;
      this.contractTypeList = [];
    } else{
      this.warrantyContractFormGroup.controls.contractType.setValue(event.contractTypeName);
      this.warrantyContractFormGroup.controls.contractTypeId.setValue(event.contractTypeId);

    }
  }

  totCallAmnt(){
    this.warrantyContractFormGroup.controls.amcCmcValue.setValue(Math.round(Number(this.warrantyContractFormGroup.controls.originalUnitPrice.value) *
    (Number(this.warrantyContractFormGroup.controls.amcCmcPercentage.value) / 100)));
  }

  addWarrantyContractInfo(){
    if(this.warrantyContractFormGroup.controls.periodInYears.value > 0 || this.warrantyContractFormGroup.controls.periodInMonths.value > 0){
      this.matDialogRef.close(this.warrantyContractFormGroup.value);
    }else{
      this.commonService.openToastWarningMessage(`Kindly Input The ${this.toProperCase(this.warrantyContractFormGroup.controls.coverageType.value)} Period.`);
    }
  }

  toProperCase(text: string): string {
    const words = text.split(' ');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    return capitalizedWords.join(' ');
  }

}
