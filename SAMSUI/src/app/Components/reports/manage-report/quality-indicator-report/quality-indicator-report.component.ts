import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';

@Component({
  selector: 'app-quality-indicator-report',
  templateUrl: './quality-indicator-report.component.html',
  styleUrls: ['./quality-indicator-report.component.css']
})
export class QualityIndicatorReportComponent implements OnInit {

  qualityIndicatorFormGroup: FormGroup;
  qualityIndicatorReportsList = ['Schedule Report'];

  locationCombo: any = [];
  locationsync : boolean = false;
  locationPageNumber:number;

  searchKey: any = '';
  recordsPerPageForCombo: string;

  srTypeCombo: any = [];
  scrollsyncSrType: boolean = false;
  srTypePageNumber: number;

  partValue :number;
  
  constructor(public dialogRef: MatDialogRef<QualityIndicatorReportComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private assetOptimaConstants: AssetOptimaConstants,
              private commonService: CommonService,
              private assetOptimaServices: AssetOptimaServices) { 
        this.locationPageNumber=1;
        this.srTypePageNumber=1;
              }

  ngOnInit() {
    this.qualityIndicatorFormGroup = new FormGroup({
      reportType: new FormControl(''),
      locationName: new FormControl('',[Validators.required]),
      locationId: new FormControl(''),
      fromDtDisp: new FormControl(''),
      toDtDisp: new FormControl(''),
      srType: new FormControl('',[Validators.required]),
      createdDtDisp: new FormControl(''),
      updatedDtDisp: new FormControl(new Date()),
      createdDt: new FormControl(''),
      updatedDt: new FormControl(''),
    });
    this.getInitialFromDate(3);
    this.qualityIndicatorFormGroup.controls.reportType.setValue("Schedule Report");
  }

  getInitialFromDate(monthDuration) { 
    this.partValue=monthDuration;
    var tempEndDate = this.qualityIndicatorFormGroup.controls.updatedDtDisp.value;
    var endDate = new Date(tempEndDate);
    var getEndMonth = endDate.getMonth() - this.partValue;
    var startDate = endDate.setMonth(getEndMonth);
    var fromDate = new Date(startDate);
    this.qualityIndicatorFormGroup.controls.createdDtDisp.setValue(fromDate);
}

  close(){
    this.dialogRef.close();
  }

  submit(){
    this.qualityIndicatorFormGroup.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.qualityIndicatorFormGroup.controls.createdDtDisp.value));
    this.qualityIndicatorFormGroup.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.qualityIndicatorFormGroup.controls.updatedDtDisp.value));
    this.dialogRef.close(this.qualityIndicatorFormGroup.getRawValue());
  }

  clear(){
    this.qualityIndicatorFormGroup.reset();
    this.qualityIndicatorFormGroup.updateValueAndValidity();
  }

  loadLocationComboData(searchValue) {
    this.locationsync =  true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';   
    this.commonService.getComboResults(this.assetOptimaServices.listAllUserLocForCombo, searchValue.term, '', '', this.recordsPerPageForCombo, this.locationPageNumber).subscribe(
      (data) => {
        
        if (data.success) {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.locationPageNumber === 1) {
              this.locationCombo = data.responseData.comboList;
            } else {
              this.locationCombo = this.locationCombo.concat(data.responseData.comboList);
            }
          } else {
            this.locationCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length != 0 ? this.locationPageNumber += 1 : this.locationPageNumber = 1;
        }
      
      }
    );
    this.locationsync =  false;

  }

  selectedLocationData(event) {
    if (event === undefined) {
      this.qualityIndicatorFormGroup.controls.locationId.setValue(0);
      this.qualityIndicatorFormGroup.controls.locationName.setValue('');
      this.locationCombo = [];
      this.locationPageNumber = 1;
    }else{
      this.qualityIndicatorFormGroup.controls.locationId.setValue(event.locationId);
      this.qualityIndicatorFormGroup.controls.locationName.setValue(event.locDisplayField);
    }
  } 


  loadSrTypeComboData(searchValue) {
    this.scrollsyncSrType=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllSrTypeCombo.sams',searchValue.term,'','',
            this.recordsPerPageForCombo,this.srTypePageNumber,'qualityReport').subscribe(
      (data)=>{
        if (!(this.commonService.fetchSearchValue(searchValue))) {
          if(this.srTypePageNumber=== 1){
            this.srTypeCombo = data.responseData.comboList;
          }else{
            this.srTypeCombo = this.srTypeCombo.concat(data.responseData.comboList);
          }
        } else {
          this.srTypeCombo = data.responseData.comboList;
        }
        data.responseData.comboList.length != 0 ? this.srTypePageNumber += 1 : this.srTypePageNumber = 1;  
     }
    );
    this.scrollsyncSrType=false;
  }

  getToDate(event){
    return false;
  }

  getFromDate(event){
    return false;
  }

  dateValidation2(event){
    return false;
  }

  dateValidation1(event){
    return false;
  }

}
