import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetEquipmentUtilization } from 'src/app/Model/asset/equipmentUtilization';

@Component({
  selector: 'app-equipment-utilization',
  templateUrl: './equipment-utilization.component.html',
  styleUrls: ['./equipment-utilization.component.css']
})
export class EquipmentUtilizationComponent implements OnInit {

  displayedColumns = ['sno', 'CEID', 'model', 'manufacturer', 'description', 'dept', 'start Dt and Time', 'end Dt and Time', 'utilized Hours'];
 
  dataSource = [];
  index: number = 0;
  isRecordsNotPresent: boolean = true;
  isAddButtonNotDisabled: boolean = true;
  equipmentUtilization: AssetEquipmentUtilization;
  totalUtilizationHours: number;
  subloader: boolean = false;

  
  scrollsyncAssetCode: boolean = false;
  assetCodePageNumber: number = 0;
  assetCodeCombo: any = [];
  recordsPerPageForCombo: string;

  saveEquipmentUtilityTimeValid: boolean = true;
 
  equipmentUtility: FormGroup;
  responseData;

  constructor(private commonService:CommonService) { 
    
  }

  ngOnInit() {
    this.equipmentUtilization = new AssetEquipmentUtilization();
    this.equipmentUtility = new FormGroup ({
      assetCode: new FormControl('', [Validators.required]),
      assetId:new FormControl(0),
      activityStartDt: new FormControl(''),
      activityStartDtDisp: new FormControl(''),
      assetStartTime: new FormControl('', [Validators.required]),
      activityEndDt: new FormControl('', [Validators.required]),
      activityEndDtDisp: new FormControl(''),
      assetEndTime: new FormControl('', [Validators.required])
    });
  }

  loadAssetCodeComboData(searchValue) {
    this.scrollsyncAssetCode = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetCodeCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.assetCodePageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.assetCodePageNumber === 1) {
              this.assetCodeCombo = data.responseData.comboList;
            } else {
              this.assetCodeCombo = this.assetCodeCombo.concat(data.responseData.comboList); 
            }
          } else {
            this.assetCodeCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length != 0 ? this.assetCodePageNumber += 1 : this.assetCodePageNumber = 1;
        }
      );
    this.scrollsyncAssetCode = false;
  }

  selectedAssetCodeData(event) {
    this.equipmentUtility.controls.assetId.setValue(event.assetHdrId);
    this.equipmentUtility.controls.assetCode.setValue(event.assetCode);
    this.searchEquipmentUtilityOfAsset();
  }

  saveUpdateEquipmentUtility() {
    if(this.equipmentUtility.controls.activityStartDtDisp.value != null && this.equipmentUtility.controls.activityStartDtDisp.value) {
      this.equipmentUtility.controls.activityStartDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.equipmentUtility.controls.activityStartDtDisp.value));
    }

    if(this.equipmentUtility.controls.activityEndDtDisp.value != null && this.equipmentUtility.controls.activityEndDtDisp.value) {
      this.equipmentUtility.controls.activityEndDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.equipmentUtility.controls.activityEndDtDisp.value));
    }

    if (this.equipmentUtility.controls.activityEndDtDisp.value != null && this.equipmentUtility.controls.activityEndDtDisp.value != '') {  
      if (this.equipmentUtility.controls.activityStartDtDisp.value === this.equipmentUtility.controls.activityEndDtDisp.value) {  
        if (this.equipmentUtility.controls.assetEndTime.value > this.equipmentUtility.controls.assetStartTime.value) {
          this.saveEquipmentUtilityTimeValid = true;     
        } else { 
          this.saveEquipmentUtilityTimeValid = false;    
          this.commonService.openToastWarningMessage('The End Time Must be Greater than Start Time.');                 
        }
      } else {
        this.saveEquipmentUtilityTimeValid = true;
      }
    } else {
      this.saveEquipmentUtilityTimeValid = true;
  }
    if(this.saveEquipmentUtilityTimeValid){

      this.equipmentUtility.controls.activityStartDtDisp.setValue(this.equipmentUtility.controls.activityStartDtDisp.value + ' ' + this.equipmentUtility.controls.assetStartTime.value);
      if (this.equipmentUtility.controls.activityEndDtDisp.value && this.equipmentUtility.controls.assetEndTime.value) {
        this.equipmentUtility.controls.activityEndDtDisp.setValue(this.equipmentUtility.controls.activityEndDtDisp.value + ' ' + this.equipmentUtility.controls.assetEndTime.value);
      }   
      this.saveAssetEquipmentUtilization();
    }
  }

  saveAssetEquipmentUtilization() {

    this.commonService.commonInsertService('saveOrUpdateAssetEquipmentUtilization.sams', this.equipmentUtility.getRawValue())
    .subscribe( data => {
      this.responseData = data;
     if(this.responseData.success === true) {
      this.commonService.openToastSuccessMessage(this.responseData.message);
      this.searchEquipmentUtilityOfAsset();
      this.equipmentUtility.reset();
      this.ngOnInit();
     }else
     this.commonService.openToastWarningMessage(this.responseData.message);
    })

  }

  searchEquipmentUtilityOfAsset() {
    this.subloader = true;
    this.commonService.commonInsertService('fetchListOfEquipmentUtilizationAsset.sams',this.equipmentUtility.getRawValue())
    .subscribe(data => {
      this.dataSource = data.responseData.dataList;
      if(data.responseData.dataTotalRecCount != 0) {
        this.isRecordsNotPresent = false;
        this.subloader = false;
        this.totalUtilizationHours = data.responseData.dataList[0].totalUtilizationHours;
      }else {
      this.isRecordsNotPresent = true;
      this.totalUtilizationHours = 0;
      this.subloader = false;
      }
    });
  }

  generateReportOfEquipmentUtilityOfAsset() {
    this.commonService.commonListService('generateEquipmentUtilizationRequestReport.sams', this.equipmentUtility.getRawValue()).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      }, error => {
  
      }
    );
    
  }

  getIndexValue(lastIndexUsed:number) {
    return this.index = lastIndexUsed + 1;
  
  }

  getAddButtonStatus() {
    if(this.equipmentUtility.controls.assetCode.value != null && this.equipmentUtility.controls.assetCode.value != ''){
      if((this.equipmentUtility.controls.activityStartDtDisp.value != null && this.equipmentUtility.controls.activityStartDtDisp.value != '') &&
      (this.equipmentUtility.controls.activityEndDtDisp.value != null && this.equipmentUtility.controls.activityEndDtDisp.value != '') && 
      (this.equipmentUtility.controls.assetStartTime.value != null && this.equipmentUtility.controls.assetStartTime.value != '') && 
      (this.equipmentUtility.controls.assetEndTime.value != null && this.equipmentUtility.controls.assetEndTime.value != '')){ 
        this.isAddButtonNotDisabled = false; 
    }
  }else 
  this.isAddButtonNotDisabled = true;

  return this.isAddButtonNotDisabled;
}

}
