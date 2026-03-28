import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { CommonService } from 'src/app/Services/common-service/common.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';

@Component({
  selector: 'app-view-asset-info-details',
  templateUrl: './view-asset-info-details.component.html',
  styleUrls: ['./view-asset-info-details.component.css']
})
export class ViewAssetInfoDetailsComponent implements OnInit {

  assetMainForm:FormGroup;

  contractLength: String = '0';
  contractDataSource: any = [];
  contractDisplayCol = ['sno', 'contractNo','contractName','coverageType','contractType','contractingPartyType','contractPartyName',   
                        'contractStartDtDisp','contractEndDtDisp','active','netContractValue']            

  constructor(@Inject(MAT_DIALOG_DATA) private data,
              public dialogRef: MatDialogRef<ViewAssetInfoDetailsComponent>,
              private commonService: CommonService) {


  }

  ngOnInit() {
    this.assetMainForm = new FormGroup({
      assetCode : new FormControl(''),
      serialNo : new FormControl(''),   
      assetGroupName : new FormControl(''),
      modelName : new FormControl(''),
      manufacturerName : new FormControl(),
      
      assetCategoryName : new FormControl(''),
      assetTypeName : new FormControl(),
      subCategoryName : new FormControl(''),
      
      supplierName : new FormControl(),
      purchaseOrderNo : new FormControl(''),
      purchaseDtDisp : new FormControl(''),
      totalPurchaseAmt : new FormControl(''),
      
      assetStatus : new FormControl(''),
      functionalStatus : new FormControl(''),
      })
    this.getAssetInfoByIndividual();
  }

  closeAssetInfoDetails(){
    this.dialogRef.close();
  }

  getAssetInfoByIndividual(){
    this.commonService.commonGetService('fetchAssetDtlByAssetId.sams',this.data.assetHdrId).subscribe(
      data => {
          this.assetMainForm.patchValue(data.responseData);
          this.assetMainForm.controls['manufacturerName'].setValue(data.responseData.modelTO.manufacturerName);

          this.loadContractDetailsForAssetList();
      });
  }

  loadContractDetailsForAssetList(){
    this.contractDataSource=[];
    this.commonService.commonGetService('loadAssetContract.sams', this.data.assetHdrId).subscribe(
      data => {
        if (data.success) {
          this.contractDataSource = data.responseData; 
          this.contractLength = this.contractDataSource.length;
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
      }
    );
  }



}
