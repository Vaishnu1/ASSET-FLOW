import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { getData } from 'src/app/Model/common/fetchListData';
import { CommonService } from 'src/app/Services/common-service/common.service';

@Component({
  selector: 'app-grn-store-info',
  templateUrl: './grn-store-info.component.html',
  styleUrls: ['./grn-store-info.component.css']
})
export class GrnStoreInfoComponent implements OnInit {

  scrollStoreNamesync: boolean = false;
  storeComboPageNumber : Number;
  storeList = [];

  limitCount: any;

  scrollManufacturerPartNosync: boolean = false;
  manufacturePartComboPageNumber : Number;
  manufacturerPartNoList = [];

  getData: getData;

  grnAdditionalInfoFormGroup: FormGroup;

  itemId : Number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) private data,
             public dialogRef: MatDialogRef<GrnStoreInfoComponent>,
             private commonService: CommonService) { 
      this.manufacturePartComboPageNumber = 1;
      this.storeComboPageNumber = 1;
  }

  ngOnInit(): void {
    this.grnAdditionalInfoFormGroup = new FormGroup({
      storeId: new FormControl('0'),
      storeName: new FormControl('',[Validators.required]),
      manufacturerName: new FormControl(''),
      manufacturerPartNo: new FormControl(''),
      itemMakeId: new FormControl('0'),
      rowIndex: new FormControl(this.data.rowIndex)
    });
    if(this.data.storeId > 0){
        this.grnAdditionalInfoFormGroup.controls.storeName.setValue(this.data.storeName);
        this.grnAdditionalInfoFormGroup.controls.storeId.setValue(this.data.storeId);
    }
    this.grnAdditionalInfoFormGroup.controls.manufacturerName.setValue(this.data.manufacturerName);
    this.grnAdditionalInfoFormGroup.controls.manufacturerPartNo.setValue(this.data.manufacturerPartNo);
    this.itemId = this.data.itemId;
  }


  listOfStore(searchTerms) {
    this.scrollStoreNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults('listOfAllStoreCombo.sams', searchTerms.term, '', '', this.limitCount, this.storeComboPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.storeComboPageNumber , this.storeList , data.responseData.comboList)
        this.storeComboPageNumber = this.getData.pageNumber;
        this.storeList = this.getData.dataList;
        this.scrollStoreNamesync = false;
      }
    );
  }

  getStoreValue(event) {
    if (event === undefined) {
      this.grnAdditionalInfoFormGroup.get('storeId').setValue(0);
      this.storeList = [];
      this.storeComboPageNumber = 1;
    } else {
      this.grnAdditionalInfoFormGroup.get('storeId').setValue(event.storeId);
      this.grnAdditionalInfoFormGroup.get('storeName').setValue(event.storeName);
    }
  }

  listOfManufacturerPartNo(searchTerms) {
    this.scrollManufacturerPartNosync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults('listAllManufacturerPartNoCombo.sams', searchTerms.term, this.itemId, '', this.limitCount, this.manufacturePartComboPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.manufacturePartComboPageNumber , this.manufacturerPartNoList , data.responseData.comboList)
        this.manufacturePartComboPageNumber = this.getData.pageNumber;
        this.manufacturerPartNoList = this.getData.dataList;
        this.scrollManufacturerPartNosync = false;
      }
    );
  }

  getManufacturerPartNoValue(event) {
    if (event === undefined) {
      this.grnAdditionalInfoFormGroup.get('manufacturerName').setValue('');
      this.grnAdditionalInfoFormGroup.get('manufacturerPartNo').setValue('');
      this.manufacturerPartNoList = [];
      this.manufacturePartComboPageNumber = 1;
    } else {
      this.grnAdditionalInfoFormGroup.get('manufacturerName').setValue(event.itemManufacturerName);
      this.grnAdditionalInfoFormGroup.get('manufacturerPartNo').setValue(event.itemManufacturerPartno);
    }
  }

  closeGRNAdditionalInfoPopUp(){
    this.dialogRef.close({ 'exit': false, 'form': '' });
  }

  submitGRNAdditionalInfo(){   
    this.dialogRef.close({ 'exit': true, 'form': this.grnAdditionalInfoFormGroup.getRawValue() });
  }
}
