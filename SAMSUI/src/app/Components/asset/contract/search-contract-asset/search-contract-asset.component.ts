import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { getData } from 'src/app/Model/common/fetchListData';
import { CommonService } from 'src/app/Services/common-service/common.service';

@Component({
  selector: 'app-search-contract-asset',
  templateUrl: './search-contract-asset.component.html',
  styleUrls: ['./search-contract-asset.component.css']
})

export class SearchContractAssetComponent implements OnInit {

  enableCustomer: boolean=false;
  recordsPerPageForCombo: string='';
  getData: getData;
  limitCount: any;

  scrollsyncModel: boolean=false;
  modelComboPageNumber: number=0;
  modelCombo: any[]=[];

  scrollsyncAssetSubCategory: boolean=false;
  assetSubCategorPageNumber: number=0;
  subCategoryName: any[]=[];

  assetSearchFormGroup:FormGroup;


  constructor(private matDialogRef: MatDialogRef<SearchContractAssetComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices) {
      this.modelComboPageNumber =1;
      this.assetSubCategorPageNumber=1;
     }

  ngOnInit(): void {
    this.assetSearchFormGroup = new FormGroup({
      assetCode : new FormControl(null),
      serialNo : new FormControl(null),
      assetModel  :  new FormControl(null),
      assetSubCat :  new FormControl(null),
    });

    if(this.data.assetCode != null && this.data.assetCode != ''){
      this.assetSearchFormGroup.controls.assetCode.setValue(this.data.assetCode);
    }
    if(this.data.serialNo != null && this.data.serialNo != ''){
      this.assetSearchFormGroup.controls.serialNo.setValue(this.data.serialNo);
    }
    if(this.data.assetModel != null && this.data.assetModel != ''){
      this.assetSearchFormGroup.controls.assetModel.setValue(this.data.assetModel);
    }
    if(this.data.assetSubCat != null && this.data.assetSubCat != ''){
      this.assetSearchFormGroup.controls.assetSubCat.setValue(this.data.assetSubCat);
    }

  }

  searchContractAsset() {
    const data ={ 
      assetCode :this.assetSearchFormGroup.controls.assetCode.value,
      serialNo : this.assetSearchFormGroup.controls.serialNo.value,
      assetModel : this.assetSearchFormGroup.controls.assetModel.value,
      assetSubCat : this.assetSearchFormGroup.controls.assetSubCat.value
    }
    this.matDialogRef.close(data);
  }

  back() {
    this.matDialogRef.close();
  }

  listOfAllModel(searchKey) {
    this.scrollsyncModel = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllModelCombo, searchKey.term, '','',
      this.recordsPerPageForCombo, this.modelComboPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchKey, this.modelComboPageNumber , this.modelCombo , data.responseData.comboList)
          this.modelComboPageNumber = this.getData.pageNumber;
          this.modelCombo = this.getData.dataList;
          this.scrollsyncModel = false;
        });
  }

  getModelComboValue(event) {
    if (event != null) {
      this.assetSearchFormGroup.controls.assetModel.setValue(event.modelName);
    } else {
      this.assetSearchFormGroup.controls.assetModel.setValue(null);
      this.modelCombo = [];
      this.modelComboPageNumber = 1;
    }
  }

  listOfSubCategory(searchValue) {
    this.scrollsyncAssetSubCategory = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllAssetSubCategoryCombo, searchValue.term, '',
      '', this.recordsPerPageForCombo, this.assetSubCategorPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetSubCategorPageNumber , this.subCategoryName , data.responseData.comboList)
          this.assetSubCategorPageNumber = this.getData.pageNumber;
          this.subCategoryName = this.getData.dataList;
          this.scrollsyncAssetSubCategory = false;
        }
      );
  }

  getSubCategoryComboValue(event) {
    if (event === undefined) {
      this.assetSearchFormGroup.controls.assetSubCat.setValue(null);
      this.assetSubCategorPageNumber = 1;
      this.subCategoryName = [];
    } else {
      this.assetSearchFormGroup.controls.assetSubCat.setValue(event.subCategoryName);
    }
  }

  clear() {
    this.assetSearchFormGroup.controls.assetCode.setValue(null);
    this.assetSearchFormGroup.controls.serialNo.setValue(null);
    this.assetSearchFormGroup.controls.assetModel.setValue(null);
    this.assetSearchFormGroup.controls.assetSubCat.setValue(null);
  }
}
