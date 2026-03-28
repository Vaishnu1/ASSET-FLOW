import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {  MAT_DIALOG_DATA,MatDialogRef  } from '@angular/material/dialog';
import { MatDatepicker } from '@angular/material/datepicker';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-repair-service-request-report',
  templateUrl: './repair-service-request-report.component.html',
  styleUrls: ['./repair-service-request-report.component.css']
})
export class RepairServiceRequestReportComponent implements OnInit {

  @ViewChild('FormFirstLoc') locationFocus: NgSelectComponent;
  @ViewChild('picker1') picker1: MatDatepicker<Date>;
  @ViewChild('picker2') picker2: MatDatepicker<Date>;

  public serviceRequestCountReportForm: FormGroup;
  locationName = new FormControl();
  locationId = new FormControl;
  srType = new FormControl;
  srStatus = new FormControl;
  srNo = new FormControl;
  srId = new FormControl;
  assetCategoryName = new FormControl();
  assetCategoryId = new FormControl;
  assetGroupName = new FormControl();
  assetGroupId = new FormControl;
  modelId = new FormControl();
  modelName = new FormControl;
  manufacturerName = new FormControl();
  manufacturerId = new FormControl;
  departmentName = new FormControl();
  departmentId = new FormControl;
  assignedTo = new FormControl();
  assignedToId = new FormControl;
  createdDtDisp = new FormControl;
  updatedDtDisp = new FormControl;

  assetCode = new FormControl;
  assetHdrId = new FormControl;
  assetStatus = new FormControl;
  assetStatusId = new FormControl;
  functionality = new FormControl;
  assetTypeId = new FormControl;
  assetTypeName = new FormControl;

  constructor(public dialogRef: MatDialogRef<RepairServiceRequestReportComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private commonService: CommonService,
    private samsService: AssetOptimaServices) { }

  ngOnInit() {
    this.initiateFormControl();
    this.initiateFormGroup();
  }

  ngAfterViewInit() {
    this.setFormFocus();
    let paramData: any = this.data;
  }

  setFormFocus() {
    setTimeout(() => {
      this.locationFocus.focus();
    }, 500);
  }

  initiateFormControl() {
      this.locationName = new FormControl(''),
      this.locationId = new FormControl(''),
      this.srType = new FormControl(''),
      this.srStatus = new FormControl(''),
      this.srNo = new FormControl(''),
      this.srId = new FormControl(''),
      this.assetCategoryName = new FormControl(''),
      this.assetCategoryId = new FormControl(''),
      this.assetGroupName = new FormControl(''),
      this.assetGroupId = new FormControl(''),
      this.modelId = new FormControl(''),
      this.modelName = new FormControl(''),
      this.manufacturerName = new FormControl(''),
      this.manufacturerId = new FormControl(''),
      this.departmentName = new FormControl(''),
      this.departmentId = new FormControl(''),
      this.assignedTo = new FormControl(''),
      this.assignedToId = new FormControl(''),
      this.createdDtDisp = new FormControl(''),
      this.updatedDtDisp = new FormControl(''),
      this.assetCode = new FormControl(''),
      this.assetHdrId = new FormControl(0),
      this.assetStatus = new FormControl(''),
      this.assetStatusId = new FormControl(0),
      this.functionality = new FormControl(''),
      this.assetTypeId = new FormControl(0),
      this.assetTypeName = new FormControl('')
  }

  initiateFormGroup() {
    this.serviceRequestCountReportForm = new FormGroup({
      locationName: this.locationName,
      locationId: this.locationId,
      srType: this.srType,
      srStatus: this.srStatus,
      srNo: this.srNo,
      srId: this.srId,
      assetCategoryName: this.assetCategoryName,
      assetCategoryId: this.assetCategoryId,
      assetGroupName: this.assetGroupName,
      assetGroupId: this.assetGroupId,
      modelId: this.modelId,
      modelName: this.modelName,
      manufacturerName: this.manufacturerName,
      manufacturerId: this.manufacturerId,
      departmentName: this.departmentName,
      departmentId: this.departmentId,
      assignedTo: this.assignedTo,
      assignedToId: this.assignedToId,
      createdDtDisp: this.createdDtDisp,
      updatedDtDisp: this.updatedDtDisp,
      assetCode: this.assetCode,
      assetHdrId: this.assetHdrId,
      assetStatus: this.assetStatus,
      assetStatusId: this.assetStatusId,
      functionality: this.functionality,
      assetTypeId: this.assetTypeId,
      assetTypeName: this.assetTypeName
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  locationCombo: any = [];
  loadLocationComboData(searchValue) {
    this.commonService.getComboResults(this.samsService.listAllUserLocForCombo, searchValue.term, '', '', 0, 25).subscribe(
      (data) => {
        this.locationCombo = data.responseData.comboList;
      }
    );
  }

  selectedLocationData(event) {
    this.locationId.setValue(event.locationId);
    this.locationName.setValue(event.locDisplayField);
    this.picker1.open();
  }
  setToFocus() {
    this.picker2.open();
  }

  dateValidation1(event) {
    return false;
  }

  dateValidation2(event) {
    return false;
  }

  //To export report
  generateReport() {
    this.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.createdDtDisp.value));
    this.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.updatedDtDisp.value));

    this.commonService.commonListService(this.samsService.exportRepairSR, this.serviceRequestCountReportForm.getRawValue()).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
        this.closeModal();
      }, error => {
        // alert('error');
      }
    );
  }

  clearData(){
    this.serviceRequestCountReportForm.reset();
  }

}
