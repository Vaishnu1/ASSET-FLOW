import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { getData } from 'src/app/Model/common/fetchListData';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-mttr-and-mtbf-report',
  templateUrl: './mttr-and-mtbf-report.component.html',
  styleUrls: ['./mttr-and-mtbf-report.component.css']
})
export class MttrAndMtbfReportComponent implements OnInit {

  mttrAndMtbfForm: FormGroup;

  assetLocationPageNumber: number;
  scrollLocationsync: boolean = false;
  limitCount: any;
  getData: getData;

  reportsList = ['MTTR Report', 'MTBF Report'];

  headingDisplay: string = 'MTTR and MTBF Report';
    mandatoryString : string = '*';
    disabled: boolean = false;
    
    scrollsyncRegion: boolean = false;
    scrollCategorysync : boolean = false;
    scrollDepartmentsync : boolean = false;
    scrollModelsync : boolean = false;
    scrollAssetStatussync : boolean = false;
    scrollAssetCodesync : boolean = false;
    scrollsyncAssetSubCategory : boolean = false;
    scrollGroupsync : boolean = false;
  
    currentDate  : Date = new Date();
  
    regionPageNumber: number;
    assetGroupPageNumber: number;
    assetCategoryPageNumber:number;
    assetDepartmentPageNumber:number;
    assetModelPageNumber:number;
    assetStatusPageNumber : number;
    partValue : number;
    assetCodePageNumber : number;
    assetSubCategorPageNumber : number;
  
    assetCodeCombo: any = [];
    subCategoryName: any = [];
  
    scrollsyncAssignToPerson: boolean = false;
    assignToPersonCombo: any = [];
    assignToPersonPageNumber: number = 0;
  
    //Loan Return
    scrollsyncLoan: boolean = false;
    recordsPerPageForLoan: string;
    loanComboList: any = [];
    loanPageNumber: number;
    updateFieldsForLoan: boolean = false;

  constructor(public dialogRef: MatDialogRef<MttrAndMtbfReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private assetOptimaConstants: AssetOptimaConstants,
    private userSessionService: UserSessionService,
    private cdr: ChangeDetectorRef) {
      this.regionPageNumber = 1;
      this.assetGroupPageNumber = 1;
      this.assetCategoryPageNumber = 1;
      this.assetLocationPageNumber = 1;
      this.assetDepartmentPageNumber = 1;
      this.assetModelPageNumber = 1;
      this.assetStatusPageNumber = 1;
      this.assetCodePageNumber = 1;
      this.assetSubCategorPageNumber = 1;
      this.assignToPersonPageNumber = 1;

      this.getData = new getData();
      this.loanPageNumber = 1;
  }

  ngOnInit(): void {

    this.mttrAndMtbfForm = new FormGroup({
      locationName: new FormControl(),
      locationId: new FormControl(0),
      fromDtDisp: new FormControl(''),
      toDtDisp: new FormControl(new Date()),
      departmentName: new FormControl(),
      departmentId: new FormControl(0),
      modelName: new FormControl(), 
      modelId: new FormControl(''),
      reportType: new FormControl('', [Validators.required]),
      orgId: new FormControl(this.userSessionService.getUserOrgId()),
      regionName: new FormControl(),
      regionId: new FormControl(0),
      assetCategoryName: new FormControl(),
      assetCategoryId: new FormControl(0),
      assetGroupName: new FormControl(),
      assetGroupId: new FormControl(0),
      functionalStatus: new FormControl(''),
      assetDtlReports: new FormControl([]),  
      logInUserId:new FormControl(this.userSessionService.getUserId()) ,
      assetCode: new  FormControl(),
      assetHdrId : new FormControl(0),
      subCategoryName: new FormControl(''),
      subCategoryId: new FormControl(0),
    });

    this.getInitialFromDate(6);

  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  setRegionComboValue(comboValue) {
    if (event === undefined) {
      this.mttrAndMtbfForm.controls.regionId.setValue(0);
      this.mttrAndMtbfForm.controls.regionName.setValue('');
      this.regionPageNumber = 1;
    } else {
      this.mttrAndMtbfForm.controls.regionId.setValue(comboValue.regionId);
      this.mttrAndMtbfForm.controls.regionName.setValue(comboValue.regionName);
    }
  }
  getCategoryComboValue(event) {
    if (event === undefined) {
      this.mttrAndMtbfForm.controls['assetCategoryId'].setValue(0);
      this.assetCategoryPageNumber = 1;
      this.mttrAndMtbfForm.controls.subCategoryName.setValue('');
      this.mttrAndMtbfForm.controls.subCategoryId.setValue(0);

    } else {
      this.mttrAndMtbfForm.controls['assetCategoryId'].setValue(event.assetCategoryId);
      this.mttrAndMtbfForm.controls.subCategoryName.setValue('');
      this.mttrAndMtbfForm.controls.subCategoryId.setValue(0);
      this.subCategoryName = [];
      this.assetSubCategorPageNumber = 1;

      this.mttrAndMtbfForm.controls.assetHdrId.setValue(0);
      this.mttrAndMtbfForm.controls.assetCode.setValue('');

      this.mttrAndMtbfForm.controls.assetGroupId.setValue(0);
      this.mttrAndMtbfForm.controls.assetGroupName.setValue('');
    }

  }
  getAssetGroupComboValue(event) {
    if (event === undefined) {
      this.mttrAndMtbfForm.get('assetGroupId').setValue(0);
      this.assetGroupPageNumber = 1;
    } else {
      this.mttrAndMtbfForm.get('assetGroupId').setValue(event.assetGroupId);
      this.assetCodeCombo = [];
      this.assetCodePageNumber = 1;
    }
  }


  //To export report
  submit() {
    this.dialogRef.close(this.mttrAndMtbfForm.value);
  }

  selectedLocationData(event) {
    if (event === undefined) {
      this.mttrAndMtbfForm.controls.locationId.setValue(0);
      this.mttrAndMtbfForm.controls.locationName.setValue('');
      this.assetLocationPageNumber = 1;
      this.assetCodePageNumber = 1;
      this.assetCodeCombo = [];
    } else {
      this.mttrAndMtbfForm.controls.locationId.setValue(event.locationId);
      this.mttrAndMtbfForm.controls.locationName.setValue(event.locDisplayField);
      this.mttrAndMtbfForm.controls.regionName.setValue(event.regionName);
      this.assetCodePageNumber = 1;
      this.assetCodeCombo = [];
    }
  }

  selectedDeapartmentData(event) {
    if (event === undefined) {
      this.mttrAndMtbfForm.controls.departmentId.setValue(0);
      this.mttrAndMtbfForm.controls.departmentName.setValue('');
      this.assetDepartmentPageNumber = 1;
    } else {
      this.assetCodeCombo = [];
      this.assetCodePageNumber = 1;
      this.mttrAndMtbfForm.controls.departmentId.setValue(event.departmentId);
      this.mttrAndMtbfForm.controls.departmentName.setValue(event.departmentName);
    }
  }

  selectedModelData(event) {
    if (event === undefined) {
      this.mttrAndMtbfForm.controls.modelId.setValue(0);
      this.mttrAndMtbfForm.controls.modelName.setValue('');
      this.assetModelPageNumber = 1;
    } else {
      this.mttrAndMtbfForm.controls.modelId.setValue(event.modelId);
      this.mttrAndMtbfForm.controls.modelName.setValue(event.modelName);

      this.assetCodeCombo = [];
      this.assetCodePageNumber = 1;

      this.mttrAndMtbfForm.controls.assetCategoryName.setValue('');
      this.mttrAndMtbfForm.controls.assetCategoryId.setValue(0);
      this.mttrAndMtbfForm.controls.subCategoryName.setValue('');
      this.mttrAndMtbfForm.controls.subCategoryId.setValue(0);

      this.mttrAndMtbfForm.controls.assetGroupName.setValue('');
      this.mttrAndMtbfForm.controls.assetGroupId.setValue(0);

    }
  }

  getInitialFromDate(monthDuration) {
    this.partValue = monthDuration;
    var tempEndDate = this.mttrAndMtbfForm.controls.toDtDisp.value;
    var endDate = new Date(tempEndDate);
    var getEndMonth = endDate.getMonth() - this.partValue;
    var startDate = endDate.setMonth(getEndMonth);
    var fromDate = new Date(startDate);
    this.mttrAndMtbfForm.controls.fromDtDisp.setValue(fromDate);
  }

  public regionlist: any = [];

  listOfRegion(searchValue) {
    this.scrollsyncRegion = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllRegion, searchValue.term, '', '', this.limitCount, this.regionPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.regionPageNumber, this.regionlist, data.responseData.comboList)
        this.regionPageNumber = this.getData.pageNumber;
        this.regionlist = this.getData.dataList;
        this.scrollsyncRegion = false;
      }
    );
  }

  assetCategoryName: any = [];
  listOfCategory(searchTerms) {
    this.scrollCategorysync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllAssetCategoryCombo, searchTerms.term, '', '', this.limitCount, this.assetCategoryPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.assetCategoryPageNumber, this.assetCategoryName, data.responseData.comboList)
        this.assetCategoryPageNumber = this.getData.pageNumber;
        this.assetCategoryName = this.getData.dataList;
        this.scrollCategorysync = false;
      }
    );
  }

  locationCombo: any = [];
  loadLocationComboData(searchValue) {
    this.scrollLocationsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllUserLocForCombo, searchValue.term, '', '', this.limitCount, this.assetLocationPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assetLocationPageNumber, this.locationCombo, data.responseData.comboList)
        this.assetLocationPageNumber = this.getData.pageNumber;
        this.locationCombo = this.getData.dataList;
        this.scrollLocationsync = false;
      }
    );
  }

  functionalStatus = [
    { id: 1, name: 'CRITICAL' },
    { id: 2, name: 'NON CRITICAL' }
  ];


  assetGroup: any = [];
  listOfAssetGroup(searchTerms) {
    this.scrollGroupsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllAssetGroupCombo, searchTerms != null ? searchTerms.term : '', '', '', this.limitCount, this.assetGroupPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.assetGroupPageNumber, this.assetGroup, data.responseData.comboList)
        this.assetGroupPageNumber = this.getData.pageNumber;
        this.assetGroup = this.getData.dataList;
        this.scrollGroupsync = false;
      }
    );
  }

  loadDepartmentNameComboData(searchValue) {
    this.scrollDepartmentsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllDeparment, searchValue.term, '', '', this.limitCount, this.assetDepartmentPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assetDepartmentPageNumber, this.departmentCombo, data.responseData.comboList)
        this.assetDepartmentPageNumber = this.getData.pageNumber;
        this.departmentCombo = this.getData.dataList;
        this.scrollDepartmentsync = false;
      }
    );
  }

  loadModelNameComboData(searchValue) {
    this.scrollModelsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllModelCombo.sams', searchValue.term, '', '', this.limitCount, this.assetModelPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assetModelPageNumber, this.modelComboData, data.responseData.comboList)
        this.assetModelPageNumber = this.getData.pageNumber;
        this.modelComboData = this.getData.dataList;
        this.scrollModelsync = false;
      }
    );
  }


  clear() {
    this.mttrAndMtbfForm.reset();
    this.mttrAndMtbfForm.updateValueAndValidity();
    this.regionPageNumber = 1;
    this.assetGroupPageNumber = 1;
    this.assetLocationPageNumber = 1;
    this.assetCategoryPageNumber = 1;
    this.assetDepartmentPageNumber = 1;
    this.assetModelPageNumber = 1;
    this.assetStatusPageNumber = 1;
    this.assetCodePageNumber = 1;
    this.assetSubCategorPageNumber = 1;
  }

  close() {
    this.dialogRef.close();
  }

  departmentCombo = [];

  modelComboData = [];

  setPageNumber(event) {

  }

  getFromDate(fromDate) {
    this.mttrAndMtbfForm.controls.fromDtDisp.setValue(fromDate.value);
  }

  getToDate(toDate) {
    this.mttrAndMtbfForm.controls.toDtDisp.setValue(toDate.value);
  }

  dateValidation1(event) {
    return false;
  }

  dateValidation2(event) {
    return false;
  }

  enabledReportsCondition(reportName) {
    if (reportName != null && reportName == 'MTTR Report') {
      this.mttrAndMtbfForm.controls.reportType.setValue('MTTR Report')
    }else if(reportName != null && reportName == 'MTBF Report'){
      this.mttrAndMtbfForm.controls.reportType.setValue('MTBF Report')
    }

  }

  getDisableProperty(moduleName) {
    if (moduleName === 'Asset Contracts') {
      this.disabled = true;
      return true;
    } else {
      this.disabled = false;
      return false;
    }
  }
  dateValidation(q) {

  }

  loadAssetCodeComboData(searchValue) {
    this.scrollAssetCodesync = true;
    let locId = this.mttrAndMtbfForm.controls.locationId.value > 0 ? this.mttrAndMtbfForm.controls.locationId.value : 0;
    let depId = this.mttrAndMtbfForm.controls.departmentId.value > 0 ? this.mttrAndMtbfForm.controls.departmentId.value : 0;
    let modelId = this.mttrAndMtbfForm.controls.modelId.value > 0 ? this.mttrAndMtbfForm.controls.modelId.value : 0;
    let categoryId = this.mttrAndMtbfForm.controls.assetCategoryId.value > 0 ? this.mttrAndMtbfForm.controls.assetCategoryId.value : 0;
    let assetGroupId = this.mttrAndMtbfForm.controls.assetGroupId.value > 0 ? this.mttrAndMtbfForm.controls.assetGroupId.value : 0;


    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResultsV1('listAllAssetCodeCombo.sams', searchValue.term, locId,
      depId, modelId, categoryId, 0, assetGroupId, this.limitCount, this.assetCodePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetCodePageNumber, this.assetCodeCombo, data.responseData.comboList)
          this.assetCodePageNumber = this.getData.pageNumber;
          this.assetCodeCombo = this.getData.dataList;
          this.scrollAssetCodesync = false;
        }
      );
  }

  selectedAssetCodeData(event) {

    if (event === undefined) {
      this.mttrAndMtbfForm.controls['assetCode'].setValue('');
      this.mttrAndMtbfForm.controls['assetHdrId'].setValue(0);
      this.assetCodePageNumber = 1;
      this.assetCodeCombo = [];

      this.mttrAndMtbfForm.controls.assetCategoryId.setValue(0);
      this.mttrAndMtbfForm.controls.assetCategoryName.setValue('');

      this.mttrAndMtbfForm.controls.departmentId.setValue(0);
      this.mttrAndMtbfForm.controls.departmentName.setValue('');

      this.mttrAndMtbfForm.controls.assetGroupId.setValue(0);
      this.mttrAndMtbfForm.controls.assetGroupName.setValue('');

      this.mttrAndMtbfForm.controls.modelId.setValue(0);
      this.mttrAndMtbfForm.controls.modelName.setValue('');

      this.mttrAndMtbfForm.controls.functionalStatus.setValue('');
    } else {
      this.mttrAndMtbfForm.controls['assetCode'].setValue(event.assetCode);
      this.mttrAndMtbfForm.controls['assetHdrId'].setValue(event.assetHdrId);

      this.mttrAndMtbfForm.controls.assetCategoryId.setValue(event.assetCategoryId);
      this.mttrAndMtbfForm.controls.assetCategoryName.setValue(event.assetCategoryName);

      this.mttrAndMtbfForm.controls.departmentId.setValue(event.departmentId);
      this.mttrAndMtbfForm.controls.departmentName.setValue(event.departmentName);

      this.mttrAndMtbfForm.controls.assetGroupId.setValue(event.assetGroupId);
      this.mttrAndMtbfForm.controls.assetGroupName.setValue(event.assetGroupName);

      this.mttrAndMtbfForm.controls.modelId.setValue(event.modelId);
      this.mttrAndMtbfForm.controls.modelName.setValue(event.modelName);

      this.mttrAndMtbfForm.controls.functionalStatus.setValue(event.functionalStatus);
    }
  }

}
