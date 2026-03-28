import { Component, Inject, OnInit } from '@angular/core';
import { AssetModel } from 'src/app/Model/master/asset';
import { AssetListComponent } from '../asset-list/asset-list.component';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-asset-report',
  templateUrl: './asset-report.component.html',
  styleUrls: ['./asset-report.component.css']
})
export class AssetReportComponent implements OnInit {

  sCheckedChildAsset: boolean = false;
  isCheckedContractInfo: boolean = false;
  isCheckedSrInfo: boolean = false;
  public asset: AssetModel;

  constructor(public dialogRef: MatDialogRef<AssetListComponent>,
      @Inject(MAT_DIALOG_DATA) private data,
      private commonService: CommonService) { 
        this.asset = new AssetModel();
      }

  ngOnInit(): void {
    this.asset = this.data.assetHdr;

    this.asset.printAssetAssigneeInfo = 'NO';
    this.asset.printChildAssetInfo = 'NO';
    this.asset.printContractInfo = 'NO';
    this.asset.printMaintenanceScheduleInfo = 'NO';
    this.asset.printCertificatesInfo = 'NO';
    this.asset.printSRInfo = 'NO';
  }

  generateAssetReport() {

    this.asset.recordsPerPage = 0;
    this.commonService.commonListService('generateAssetReport.sams', this.asset).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
        this.closeModal();
      }, error => {
        this.closeModal();
      }
    );

  }

  closeModal(){
    this.dialogRef.close();
  }

  changeAssetAssigneeInfo(event : MatCheckboxChange){
    if(event.checked){
      this.asset.printAssetAssigneeInfo = 'YES';
    }else{
      this.asset.printAssetAssigneeInfo = 'NO';
    }
  }

  changeChildAssetInfo(event : MatCheckboxChange){
    if(event.checked){
      this.asset.printChildAssetInfo = 'YES';
    }else{
      this.asset.printChildAssetInfo = 'NO';
    }
  }

  changeContractInfo(event : MatCheckboxChange){
    if(event.checked){
      this.asset.printContractInfo = 'YES';
    }else{
      this.asset.printContractInfo = 'NO';
    }
  }

  changeMaintenanceScheduleInfo(event : MatCheckboxChange){
    if(event.checked){
      this.asset.printMaintenanceScheduleInfo = 'YES';
    }else{
      this.asset.printMaintenanceScheduleInfo = 'NO';
    }
  }

  
  changeCertificatesInfo(event : MatCheckboxChange){
    if(event.checked){
      this.asset.printCertificatesInfo = 'YES';
    }else{
      this.asset.printCertificatesInfo = 'NO';
    }
  }

  changeSRInfo(event : MatCheckboxChange){
    if(event.checked){
      this.asset.printSRInfo = 'YES';
    }else{
      this.asset.printSRInfo = 'NO';
    }
  }

    changeCustomFieldsInfo(event : MatCheckboxChange){
    if(event.checked){
      this.asset.printCustomFieldsInfo = 'YES';
    }else{
      this.asset.printCustomFieldsInfo = 'NO';
    }
  }

  

}
