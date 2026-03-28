import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { NgSelectComponent } from '@ng-select/ng-select';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { BASE_FORM_GROUP_CONST } from 'src/app/Model/base/baseFormGroup';
import { DataService } from 'src/app/Services/dataService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sr-nopr-report',
  templateUrl: './sr-nopr-report.component.html',
  styleUrls: ['./sr-nopr-report.component.css']
})
export class SrNoprReportComponent implements OnInit {
  @ViewChild('FormFirstLoc') locationFocus: NgSelectComponent;
  @ViewChild('picker1') picker1: MatDatepicker<Date>;
  @ViewChild('picker2') picker2: MatDatepicker<Date>;

  listOfSRtoPR = [];
  displayedColumns = ['sno', 'location', 'srNo', 'status', 'prDay', 'assetCd'];

  public srReportForm: FormGroup;

  pageSize = 100;
  length = 0;
  pageIndex = 0;

  constructor(private commonService: CommonService, private samsService: AssetOptimaServices, private data: DataService, private router: Router) { }

  a: any = '';

  ngOnInit() {
    this.initiateFormGroup();
    //dynamicly add all base from controls to the form Group
    Object.keys(BASE_FORM_GROUP_CONST.controls).forEach(key => {
      this.srReportForm.addControl(key, BASE_FORM_GROUP_CONST.get(key));
    });

    this.data.currentMessage1.subscribe(message => this.a = message)
    this.srReportForm.controls.searchValue.setValue(this.a.screenName);
    this.srReportForm.controls.searchValue1.setValue(this.a.title);
  }

  pageChanges(event) {
    this.srReportForm.controls.pageNumber.setValue(event.pageIndex);
    this.srReportForm.controls.recordsPerPage.setValue(event.pageSize);
    this.pageIndex = event.pageIndex;
    this.pageIndex = event.pageIndex;
    this.getReportList();
  }

  ngAfterViewInit() {
    this.setFormFocus();
  }

  setFormFocus() {
    setTimeout(() => {
      this.locationFocus.focus();
    }, 500);
  }

  initiateFormGroup() {
    this.srReportForm = new FormGroup({
      locationName: new FormControl(''),
      locationId: new FormControl(0),
      srType: new FormControl(''),
      srStatus: new FormControl(''),
      srNo: new FormControl(''),
      srId: new FormControl(0),
      assetCategoryName: new FormControl(''),
      assetCategoryId: new FormControl(0),
      assetGroupName: new FormControl(''),
      assetGroupId: new FormControl(0),
      modelId: new FormControl(0),
      modelName: new FormControl(''),
      manufacturerName: new FormControl(''),
      manufacturerId: new FormControl(0),
      departmentName: new FormControl(''),
      departmentId: new FormControl(0),
      assignedTo: new FormControl(''),
      assignedToId: new FormControl(0),
      createdDtDisp: new FormControl(''),
      updatedDtDisp: new FormControl(''),
      assetCode: new FormControl(''),
      assetHdrId: new FormControl(0),
      assetStatus: new FormControl(''),
      assetStatusId: new FormControl(0),
      functionality: new FormControl(''),
      assetTypeId: new FormControl(0),
      assetTypeName: new FormControl(''),
    })
  }

  locationCombo: any = [];
  loadLocationComboData(searchValue) {
    this.commonService.getComboResults(this.samsService.listAllUserLocForCombo, searchValue.term, '', '', 0, 25).subscribe(
      (data) => {
        this.locationCombo = data.responseData.comboList;
      }
    );
  }

  closeModal(): void { }

  selectedLocationData(event) {
    this.srReportForm.controls.locationId.setValue(event.locationId);
    this.srReportForm.controls.locationName.setValue(event.locDisplayField);
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
    this.srReportForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.srReportForm.controls.createdDtDisp.value));
    this.srReportForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.srReportForm.controls.updatedDtDisp.value));

    this.commonService.commonListService(this.samsService.exportRepairSR, this.srReportForm.getRawValue()).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
        this.closeModal();
      }, error => {
        // alert('error');
      }
    );
  }

  getReportList() {
    this.srReportForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.srReportForm.controls.createdDtDisp.value));
    this.srReportForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.srReportForm.controls.updatedDtDisp.value));

    this.commonService.commonListService(this.samsService.listOfSRtoPR, this.srReportForm.getRawValue()).subscribe(
      (data) => {
        if (data.success) {
          this.listOfSRtoPR = data.responseData.dataList;
          this.length = data.responseData.dataTotalRecCount;
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
        // alert('error');
      }
    );
  }

  clearData() {
    this.ngOnInit();
  }

  search() {
    this.srReportForm.controls.createdDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.srReportForm.controls.createdDtDisp.value));
    this.srReportForm.controls.updatedDtDisp.setValue(this.commonService.convertToDateStringyyyy_mm_dd(this.srReportForm.controls.updatedDtDisp.value));
    this.data.changeMessage(this.srReportForm.getRawValue());
    this.router.navigate(['/srPrReportResult']);
  }

  modelCombo: any = [];
  loadModelComboData(searchValue) {
    this.commonService.getComboResults(this.samsService.listOfAllModelCombo, searchValue.term, '', '', 0, 25).subscribe(
      (data) => {
        this.modelCombo = data.responseData.comboList;
      }
    );
  }

  selectedModelData(event) {
    this.srReportForm.controls.modelId.setValue(event.modelId);
    this.srReportForm.controls.modelName.setValue(event.modelName);
  }

  assetGroupCombo: any = [];
  loadGroupComboData(searchValue) {
    this.commonService.getComboResults(this.samsService.listAllAssetGroupCombo, searchValue.term, '', '', 0, 25).subscribe(
      (data) => {
        this.assetGroupCombo = data.responseData.comboList;
      }
    );
  }

  selectedGroupData(event) {
    this.srReportForm.controls.assetGroupId.setValue(event.assetGroupId);
    this.srReportForm.controls.assetGroupName.setValue(event.assetGroupName);
  }

  srTypeList = [{ srType: "BM" }, { srType: "PA" }, { srType: "PM" }]
  selectedSrTypeData(event) {
    this.srReportForm.controls.srType.setValue(event.srType);
  }

  departmentCombo: any = [];
  loadDepartmentComboData(searchValue) {
    this.commonService.getComboResults(this.samsService.listOfAllDeparment, searchValue.term, '', '', 0, 25).subscribe(
      (data) => {
        this.departmentCombo = data.responseData.comboList;
      }
    );
  }

  selectedDepartmentData(event) {
    this.srReportForm.controls.departmentId.setValue(event.departmentId);
    this.srReportForm.controls.departmentName.setValue(event.departmentName);
  }

  userCombo: any = [];
  loadUserComboData(searchValue) {
    this.commonService.getComboResults(this.samsService.listOfAllUserNameCombo, searchValue.term, '', '', 0, 25).subscribe(
      (data) => {
        this.userCombo = data.responseData.comboList;
      }
    );
  }

  selectedUserData(event) {
    this.srReportForm.controls.assignedToId.setValue(event.userId);
    this.srReportForm.controls.assignedTo.setValue(event.userName);
  }

  woStatusCombo: any = [];
  loadWoStatusComboData(searchValue) {
    this.commonService.getComboResults(this.samsService.listAllServiceRequestStatusForCombo, searchValue.term, '', '', 0, 25).subscribe(
      (data) => {
        this.woStatusCombo = data.responseData.comboList;
      }
    );
  }

  selectedWoStatusData(event) {
    this.srReportForm.controls.srStatus.setValue(event.displayValue);
  }
}
