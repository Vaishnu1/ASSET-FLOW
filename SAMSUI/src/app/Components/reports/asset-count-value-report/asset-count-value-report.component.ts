import { Component, OnInit, Inject, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { getData } from 'src/app/Model/common/fetchListData';
import { LoanReturnsModel } from 'src/app/Model/asset/loanReturns';
// import { FindValueSubscriber } from 'rxjs/internal/operators/find';

@Component({
  selector: 'app-asset-count-value-report',
  templateUrl: './asset-count-value-report.component.html',
  styleUrls: ['./asset-count-value-report.component.css']
})
export class AssetCountValueReportComponent implements OnInit {

  assetCountReportFormGroup: FormGroup;
  headingDisplay: string = 'Title';
  enableFieldSet:boolean = false;
  mandatoryString : string = '*';
  disabled: boolean = false;
  reports = ['Asset Summary', 'Asset Count', 'Asset Utilization Report','Asset Detailed Report', 'Asset Volume License Report', 'Asset Loan/Return Report'];
  reportsList = [ { id: 1,name:'Asset Summary'},
   {id : 2, name:'Asset Count'},
    {id: 3,name:'Asset Utilization Report'},
    {id:4,name:'Asset Detailed Report'}];    
  
  scrollsyncRegion: boolean = false;
  scrollCategorysync : boolean = false;
  scrollLocationsync : boolean = false;
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
  assetLocationPageNumber:number;
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
  loanReturns: LoanReturnsModel;
  updateFieldsForLoan: boolean = false;

  loanTypeList = [
    { id: 1, name: 'RENTAL' },
    { id: 2, name: 'LEASE' },
    { id: 3, name: 'LOAN' }
  ];

  loanToOptions = [
    { id: 2, name: 'CUSTOMER' },
    { id: 1, name: 'EMPLOYEE' },
    { id: 3, name: 'SUPPLIER' },
    { id: 4, name: 'OTHERS' },
    { id: 5, name: 'BRANCH' },
    { id: 6, name: 'MANUFACTURER' },
  ];

  limitCount:any;
  assetDtlReports = ['Asset Contracts', 'Asset Break Down', 'Asset Spares/Accessories/Consumables', 'Child Assets','Change CEID Requests'];
  @ViewChild('locationFocus') regionFocusCombo: NgSelectComponent;
  getData: getData;

  constructor(public dialogRef: MatDialogRef<AssetCountValueReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private assetOptimaConstants: AssetOptimaConstants,
    private userSessionService: UserSessionService,
    private cdr: ChangeDetectorRef
  ) { 
    this.regionPageNumber = 1;
    this.assetGroupPageNumber = 1;
    this.assetCategoryPageNumber = 1;
    this.assetLocationPageNumber = 1;
    this.assetDepartmentPageNumber = 1;
    this.assetModelPageNumber =1;
    this.assetStatusPageNumber =1;
    this.assetCodePageNumber = 1;
    this.assetSubCategorPageNumber = 1;
    this.assignToPersonPageNumber = 1;

    this.getData = new getData();

    this.loanReturns = new LoanReturnsModel();
    this.loanPageNumber=1;
  }

  ngOnInit() {
    this.assetCountReportFormGroup = new FormGroup({
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
      assetStatus: new FormControl(), 
      assetStatusId: new FormControl(0),
      assetDtlReports: new FormControl([]),  
      logInUserId:new FormControl(this.userSessionService.getUserId()) ,
      assetCode: new  FormControl(),
      assetHdrId : new FormControl(0),
      subCategoryName: new FormControl(''),
      subCategoryId: new FormControl(0),

      loanNo: new FormControl(''),
      loanType: new FormControl(''),
      loanedTo: new FormControl(''),
      assignToPersonId: new FormControl(0),
      assignTo: new FormControl('')
    });
    this.assetCountReportFormGroup.controls.reportType.setValue(this.data.reportType);
    this.assetCountReportFormGroup.controls.locationName.setValue(this.userSessionService.getUserLocationName());
    this.assetCountReportFormGroup.controls.locationId.setValue(this.userSessionService.getUserLocationId());
    this.assetCountReportFormGroup.controls.regionName.setValue(this.assetOptimaConstants.defaultuserLocRegionName);
    this.headingDisplay = this.data.title; 
    this.assetCountReportFormGroup.controls.subCategoryName.disable();
    this.assetCountReportFormGroup.controls.regionName.disable();

    this.regionPageNumber = 1;
    this.assetGroupPageNumber = 1;
    this.assetCategoryPageNumber = 1;
    this.assetLocationPageNumber = 1;
    this.assetDepartmentPageNumber = 1;
    this.assetModelPageNumber =1;
    this.assetStatusPageNumber =1;
    this.assetCodePageNumber = 1;
    this.assetSubCategorPageNumber = 1;
    this.getInitialFromDate(6);
  }

  ngAfterViewInit(){
    this.commonService.setComboFocus(this.regionFocusCombo);
    this.cdr.detectChanges();
  }
  
  setRegionComboValue(comboValue) {         
        if (event === undefined) {
      this.assetCountReportFormGroup.controls.regionId.setValue(0);
      this.assetCountReportFormGroup.controls.regionName.setValue('');
      this.regionPageNumber = 1;
    }else{
      this.assetCountReportFormGroup.controls.regionId.setValue(comboValue.regionId);
      this.assetCountReportFormGroup.controls.regionName.setValue(comboValue.regionName);
    }
  }
  getCategoryComboValue(event) {
    if (event === undefined) {
      this.assetCountReportFormGroup.controls['assetCategoryId'].setValue(0);
      this.assetCategoryPageNumber = 1;
      this.assetCountReportFormGroup.controls.subCategoryName.setValue('');
      this.assetCountReportFormGroup.controls.subCategoryId.setValue(0);
      this.assetCountReportFormGroup.controls.subCategoryName.disable();

      this.assetCountReportFormGroup.controls.assetCode.enable();
      this.assetCountReportFormGroup.controls.assetGroupName.enable();
    } else {
      this.assetCountReportFormGroup.controls.subCategoryName.enable();
      this.assetCountReportFormGroup.controls['assetCategoryId'].setValue(event.assetCategoryId);
      this.assetCountReportFormGroup.controls.subCategoryName.setValue('');
      this.assetCountReportFormGroup.controls.subCategoryId.setValue(0);
      this.subCategoryName = [];
      this.assetSubCategorPageNumber = 1;

      this.assetCountReportFormGroup.controls.assetHdrId.setValue(0);
      this.assetCountReportFormGroup.controls.assetCode.setValue('');

      this.assetCountReportFormGroup.controls.assetGroupId.setValue(0);
      this.assetCountReportFormGroup.controls.assetGroupName.setValue('');
      this.assetCountReportFormGroup.controls.assetGroupName.disable();
    }
    
  }
  getAssetGroupComboValue(event) {
    if (event === undefined) {
      this.assetCountReportFormGroup.get('assetGroupId').setValue(0);
      this.assetGroupPageNumber = 1;
    }else{
      this.assetCountReportFormGroup.get('assetGroupId').setValue(event.assetGroupId);
      this.assetCodeCombo = [];
      this.assetCodePageNumber = 1;
    }
  }

  getAssetStatusList(event) {
    if (event === undefined) {
      this.assetCountReportFormGroup.controls['assetStatus'].setValue('');
      this.assetCountReportFormGroup.controls['assetStatusId'].setValue(0);  
      this.assetStatusPageNumber = 1;
    }else{
      this.assetCountReportFormGroup.controls['assetStatus'].setValue(event.assetStatusName?event.assetStatusName:'');
      this.assetCountReportFormGroup.controls['assetStatusId'].setValue(event.assetStatusId);  
    }
   }
  //To export report
  submit() {
    this.dialogRef.close(this.assetCountReportFormGroup.value); 
  }

  selectedLocationData(event) {
    if (event === undefined) {
      this.assetCountReportFormGroup.controls.locationId.setValue(0);
      this.assetCountReportFormGroup.controls.locationName.setValue('');
      this.assetLocationPageNumber = 1;
    }else{
      this.assetCountReportFormGroup.controls.locationId.setValue(event.locationId);
      this.assetCountReportFormGroup.controls.locationName.setValue(event.locDisplayField);
      this.assetCountReportFormGroup.controls.regionName.setValue(event.regionName);
      this.assetCountReportFormGroup.controls.regionName.disable();
    }
  } 
  selectedDeapartmentData(event) {
    if (event === undefined) {
      this.assetCountReportFormGroup.controls.departmentId.setValue(0);
      this.assetCountReportFormGroup.controls.departmentName.setValue('');
      this.assetDepartmentPageNumber = 1;
    }else{
      this.assetCodeCombo = [];
      this.assetCodePageNumber = 1;
      this.assetCountReportFormGroup.controls.departmentId.setValue(event.departmentId);
      this.assetCountReportFormGroup.controls.departmentName.setValue(event.departmentName);
    }
  }     
  
  selectedModelData(event) {    
    if (event === undefined) {
      this.assetCountReportFormGroup.controls.modelId.setValue(0);
      this.assetCountReportFormGroup.controls.modelName.setValue('');
      this.assetModelPageNumber =1;
      this.assetCountReportFormGroup.controls.assetCategoryName.enable();
      this.assetCountReportFormGroup.controls.assetGroupName.enable();
    }else{
      this.assetCountReportFormGroup.controls.modelId.setValue(event.modelId);
      this.assetCountReportFormGroup.controls.modelName.setValue(event.modelName);

      this.assetCodeCombo = [];
      this.assetCodePageNumber = 1;

      this.assetCountReportFormGroup.controls.assetCategoryName.setValue('');
      this.assetCountReportFormGroup.controls.assetCategoryId.setValue(0);
      this.assetCountReportFormGroup.controls.assetCategoryName.disable();
      this.assetCountReportFormGroup.controls.subCategoryName.setValue('');
      this.assetCountReportFormGroup.controls.subCategoryId.setValue(0);
      this.assetCountReportFormGroup.controls.subCategoryName.disable();

      this.assetCountReportFormGroup.controls.assetGroupName.setValue('');
      this.assetCountReportFormGroup.controls.assetGroupId.setValue(0);
      this.assetCountReportFormGroup.controls.assetGroupName.disable();
    
    }
  }

  getInitialFromDate(monthDuration) { 
      this.partValue=monthDuration;
      var tempEndDate = this.assetCountReportFormGroup.controls.toDtDisp.value;
      var endDate = new Date(tempEndDate);
      var getEndMonth = endDate.getMonth() - this.partValue;
      var startDate = endDate.setMonth(getEndMonth);
      var fromDate = new Date(startDate);
      this.assetCountReportFormGroup.controls.fromDtDisp.setValue(fromDate);
  }

  public regionlist: any = [];
   
    listOfRegion(searchValue) {
    this.scrollsyncRegion =  true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllRegion, searchValue.term,  '', '', this.limitCount, this.regionPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.regionPageNumber , this.regionlist , data.responseData.comboList)
        this.regionPageNumber = this.getData.pageNumber;
        this.regionlist = this.getData.dataList;
        this.scrollsyncRegion = false;
      }
    );
  }
  assetCategoryName: any =[];
  listOfCategory(searchTerms) {
    this.scrollCategorysync =  true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllAssetCategoryCombo,  searchTerms.term,  '', '', this.limitCount, this.assetCategoryPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.assetCategoryPageNumber , this.assetCategoryName , data.responseData.comboList)
        this.assetCategoryPageNumber = this.getData.pageNumber;
        this.assetCategoryName = this.getData.dataList;
        this.scrollCategorysync = false;
      }
    );
  }
  locationCombo: any = [];
  loadLocationComboData(searchValue) {
    this.scrollLocationsync =  true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';   
    this.commonService.getComboResults(this.assetOptimaServices.listAllUserLocForCombo, searchValue.term, '', '', this.limitCount, this.assetLocationPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assetLocationPageNumber , this.locationCombo , data.responseData.comboList)
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
  currentPageNumber = 0;
  assetStatusList = [];
  listOfAssetStatus(searchTerms) {
    this.scrollAssetStatussync =  true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
     this.commonService.getComboResults('listAllAssetStatusCombo.sams', searchTerms != null ? searchTerms.term : '', '', '',this.limitCount, this.assetStatusPageNumber).subscribe( 
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.assetStatusPageNumber , this.assetStatusList , data.responseData.comboList)
        this.assetStatusPageNumber = this.getData.pageNumber;
        this.assetStatusList = this.getData.dataList;
        this.scrollAssetStatussync = false;
      }
    );
  }

  assetGroup: any  = [];
  listOfAssetGroup(searchTerms) {
    this.scrollGroupsync =  true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllAssetGroupCombo, searchTerms != null ? searchTerms.term : '', '', '', this.limitCount, this.assetGroupPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.assetGroupPageNumber , this.assetGroup , data.responseData.comboList)
        this.assetGroupPageNumber = this.getData.pageNumber;
        this.assetGroup = this.getData.dataList;
        this.scrollGroupsync = false;
      }
    );
  }
  loadDepartmentNameComboData(searchValue) {
    this.scrollDepartmentsync =  true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
        this.commonService.getComboResults(this.assetOptimaServices.listOfAllDeparment, searchValue.term ,'', '', this.limitCount, this.assetDepartmentPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assetDepartmentPageNumber , this.departmentCombo , data.responseData.comboList)
        this.assetDepartmentPageNumber = this.getData.pageNumber;
        this.departmentCombo = this.getData.dataList;
        this.scrollDepartmentsync = false;        
      }
    );
  }
  
  loadModelNameComboData(searchValue) {
    this.scrollModelsync =  true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllModelCombo.sams', searchValue.term,'', '', this.limitCount, this.assetModelPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assetModelPageNumber , this.modelComboData , data.responseData.comboList)
        this.assetModelPageNumber = this.getData.pageNumber;
        this.modelComboData = this.getData.dataList;
        this.scrollModelsync = false; 
      }
    );
  }
  
  onChange(event, index) { 
    if (event.checked) {
      this.assetCountReportFormGroup.controls.assetDtlReports.value.push(event.source.value);
    } else {
      let indexValue = this.commonService.getIndexOfTheItem(this.assetCountReportFormGroup.controls.assetDtlReports.value, false, '', event.source.value);
      if (indexValue >= 0) {
        this.assetCountReportFormGroup.controls.assetDtlReports.value.splice(indexValue, 1);
      }
    }
  }

  updateReportType(value){
    this.assetCountReportFormGroup.controls.reportType.setValue(value);   
  
  }
  clear() {
    this.assetCountReportFormGroup.reset();
    this.assetCountReportFormGroup.updateValueAndValidity();
    this.enableFieldSet =false;
    this.regionPageNumber = 1;
    this.assetGroupPageNumber = 1;
    this.assetLocationPageNumber = 1;
    this.assetCategoryPageNumber = 1;
    this.assetDepartmentPageNumber = 1;
    this.assetModelPageNumber = 1;
    this.assetStatusPageNumber =1;
    this.assetCodePageNumber = 1;
    this.assetSubCategorPageNumber = 1;
    this.assetCountReportFormGroup.enable();
    this.assetCountReportFormGroup.controls.subCategoryName.disable();
  }

  close() {
    this.dialogRef.close();
  }
  departmentCombo = [];

  modelComboData = [];

  setPageNumber(event){
    
  }

  getFromDate(fromDate) {
    this.assetCountReportFormGroup.controls.fromDtDisp.setValue(fromDate.value);
  }
    
  getToDate(toDate) {
    this.assetCountReportFormGroup.controls.toDtDisp.setValue(toDate.value);
    //this.getInitialFromDate(6);
  }

  dateValidation1(event) {
    return false;
  }

  dateValidation2(event) {
    return false;
  }

  enabledReportsCondition(reportName){
    if(reportName!= null && reportName == 'Asset Detailed Report'){
      this.enableFieldSet =true;
    }else{
      this.enableFieldSet =false;
    }

    if(reportName !== null && reportName == 'Asset Loan/Return Report') {
      this.updateFieldsForLoan = true;
    } else {
      this.updateFieldsForLoan = false;
    }
  }
  getDisableProperty(moduleName){
    if(moduleName === 'Asset Contracts'){ 
      this.disabled = true;
      return true;   
    }else{
      this.disabled = false;
      return false;  
    }
  }
  dateValidation(q){

  }

  loadAssetCodeComboData(searchValue) {
    this.scrollAssetCodesync=true;
    let locId = this.assetCountReportFormGroup.controls.locationId.value>0?this.assetCountReportFormGroup.controls.locationId.value : 0;
    let depId = this.assetCountReportFormGroup.controls.departmentId.value>0?this.assetCountReportFormGroup.controls.departmentId.value:0;
    let modelId = this.assetCountReportFormGroup.controls.modelId.value>0?this.assetCountReportFormGroup.controls.modelId.value:0;
    let categoryId = this.assetCountReportFormGroup.controls.assetCategoryId.value>0? this.assetCountReportFormGroup.controls.assetCategoryId.value:0;
    let subCategoryId = this.assetCountReportFormGroup.controls.subCategoryId.value>0?this.assetCountReportFormGroup.controls.subCategoryId.value:0;
    let assetGroupId = this.assetCountReportFormGroup.controls.assetGroupId.value>0?this.assetCountReportFormGroup.controls.assetGroupId.value:0;
    
    
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResultsV1('listAllAssetCodeCombo.sams',searchValue.term, locId,
    depId, modelId, categoryId, subCategoryId, assetGroupId, this.limitCount,this.assetCodePageNumber).subscribe(
      (data)=>{
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assetCodePageNumber , this.assetCodeCombo , data.responseData.comboList)        
        this.assetCodePageNumber = this.getData.pageNumber;
        this.assetCodeCombo = this.getData.dataList;        
        this.scrollAssetCodesync = false; 
     }
    );
  }

  selectedAssetCodeData(event) {
    
    if(event===undefined){
      this.assetCountReportFormGroup.controls['assetCode'].setValue('');
      this.assetCountReportFormGroup.controls['assetHdrId'].setValue(0);
      this.assetCodePageNumber=1;

      this.assetCountReportFormGroup.controls.assetCategoryId.setValue(0);
      this.assetCountReportFormGroup.controls.assetCategoryName.setValue('');
      this.assetCountReportFormGroup.controls.assetCategoryName.enable();
      
      this.assetCountReportFormGroup.controls.subCategoryId.setValue(0);
      this.assetCountReportFormGroup.controls.subCategoryName.setValue('');
      this.assetCountReportFormGroup.controls.subCategoryName.enable();

      this.assetCountReportFormGroup.controls.departmentId.setValue(0);
      this.assetCountReportFormGroup.controls.departmentName.setValue('');
      this.assetCountReportFormGroup.controls.departmentName.enable();

      this.assetCountReportFormGroup.controls.assetGroupId.setValue(0);
      this.assetCountReportFormGroup.controls.assetGroupName.setValue('');
      this.assetCountReportFormGroup.controls.assetGroupName.enable();

      this.assetCountReportFormGroup.controls.assetStatusId.setValue(0);
      this.assetCountReportFormGroup.controls.assetStatus.setValue('');

      this.assetCountReportFormGroup.controls.modelId.setValue(0);
      this.assetCountReportFormGroup.controls.modelName.setValue('');
      this.assetCountReportFormGroup.controls.modelName.enable();

      this.assetCountReportFormGroup.controls.functionalStatus.setValue('');
      this.assetCountReportFormGroup.controls.functionalStatus.enable();
    }else{
      this.assetCountReportFormGroup.controls['assetCode'].setValue(event.assetCode);
      this.assetCountReportFormGroup.controls['assetHdrId'].setValue(event.assetHdrId);
      
      this.assetCountReportFormGroup.controls.assetCategoryId.setValue(event.assetCategoryId);
      this.assetCountReportFormGroup.controls.assetCategoryName.setValue(event.assetCategoryName);
      this.assetCountReportFormGroup.controls.assetCategoryName.disable();
      
      this.assetCountReportFormGroup.controls.subCategoryId.setValue(event.subCategoryId);
      this.assetCountReportFormGroup.controls.subCategoryName.setValue(event.subCategoryName);
      this.assetCountReportFormGroup.controls.subCategoryName.disable();

      this.assetCountReportFormGroup.controls.departmentId.setValue(event.departmentId);
      this.assetCountReportFormGroup.controls.departmentName.setValue(event.departmentName);
      this.assetCountReportFormGroup.controls.departmentName.disable();

      this.assetCountReportFormGroup.controls.assetGroupId.setValue(event.assetGroupId);
      this.assetCountReportFormGroup.controls.assetGroupName.setValue(event.assetGroupName);
      this.assetCountReportFormGroup.controls.assetGroupName.disable();

      this.assetCountReportFormGroup.controls.assetStatusId.setValue(event.assetStatusId);
      this.assetCountReportFormGroup.controls.assetStatus.setValue(event.assetStatus);      

      this.assetCountReportFormGroup.controls.modelId.setValue(event.modelId);
      this.assetCountReportFormGroup.controls.modelName.setValue(event.modelName);
      this.assetCountReportFormGroup.controls.modelName.disable();

      this.assetCountReportFormGroup.controls.functionalStatus.setValue(event.functionalStatus);
      this.assetCountReportFormGroup.controls.functionalStatus.disable();
    }
  }

  
  listOfSubCategory(searchValue) {
    this.scrollsyncAssetSubCategory = true;
    const assetCategoryId = this.assetCountReportFormGroup.controls['assetCategoryId'].value;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetSubCategoryCombo.sams', searchValue.term,assetCategoryId,'', this.limitCount, this.assetSubCategorPageNumber).subscribe(
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
      this.assetCountReportFormGroup.controls['subCategoryId'].setValue(0);
      this.assetCountReportFormGroup.controls['subCategoryName'].setValue('');
      this.subCategoryName = [];
      this.assetSubCategorPageNumber = 1;    
    } else {
      this.assetCountReportFormGroup.controls['subCategoryId'].setValue(event.subCategoryId);
      this.assetCountReportFormGroup.controls['subCategoryName'].setValue(event.subCategoryName);   
    }
  }

  loadLoanCodeComboData(searchValue){
    this.scrollsyncLoan = true;
    this.recordsPerPageForLoan = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    const loanedTo = this.assetCountReportFormGroup.controls.loanedTo.value;
    this.commonService.getComboResults('listOfAllLoanCodeForCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForLoan, this.loanPageNumber,'EXTERNAL', loanedTo).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.loanPageNumber , this.loanComboList , data.responseData.comboList)
          this.loanPageNumber = this.getData.pageNumber;
          this.loanComboList = this.getData.dataList;
          this.scrollsyncLoan = false;          
        }
      );
  }

  getLoanCode(event) {    
    if (event === undefined) {
      this.assetCountReportFormGroup.controls.loanNo.setValue('');
      this.assetCountReportFormGroup.controls.loanType.setValue('');
      this.assetCountReportFormGroup.controls.loanType.enable();

      this.assetCountReportFormGroup.controls.loanedTo.setValue('');
      this.assetCountReportFormGroup.controls.loanedTo.enable();

      this.assetCountReportFormGroup.controls.assetHdrId.setValue(0);
      this.assetCountReportFormGroup.controls.assetCode.setValue('');
      this.assetCountReportFormGroup.controls.assetCode.enable();

      this.assetCountReportFormGroup.controls.modelId.setValue(0);
      this.assetCountReportFormGroup.controls.modelName.setValue('');
      this.assetCountReportFormGroup.controls.modelName.enable()
    } else {
      this.assetCountReportFormGroup.controls.loanNo.setValue(event.loanNo);
      this.assetCountReportFormGroup.controls.loanType.setValue(event.loanType);
      this.assetCountReportFormGroup.controls.loanType.disable();

      this.assetCountReportFormGroup.controls.loanedTo.setValue(event.loanedTo);
      this.assetCountReportFormGroup.controls.loanedTo.disable();

      this.assetCountReportFormGroup.controls.assetHdrId.setValue(event.assetId);
      this.assetCountReportFormGroup.controls.assetCode.setValue(event.assetCode);
      this.assetCountReportFormGroup.controls.assetCode.disable();

      this.assetCountReportFormGroup.controls.modelId.setValue(event.modelId);
      this.assetCountReportFormGroup.controls.modelName.setValue(event.modelName);
      this.assetCountReportFormGroup.controls.modelName.disable();
    }    
  }

  getLoanedTo(event) {
    if (event === undefined) {
      this.assetCountReportFormGroup.controls.loanedTo.setValue('');
      this.assetCountReportFormGroup.controls.assetCode.enable();
      this.assetCountReportFormGroup.controls.modelName.enable();
    } else {
      this.assetCountReportFormGroup.controls.loanedTo.setValue(event.name);

      this.assetCountReportFormGroup.controls.assetHdrId.setValue(0);
      this.assetCountReportFormGroup.controls.assetCode.disable();

      this.assetCountReportFormGroup.controls.modelId.setValue(0);
      this.assetCountReportFormGroup.controls.modelName.disable();
    }
    this.loanComboList = [];
    this.loanPageNumber = 1;
  }

  loadAssignToComboData(searchValue) {
    this.scrollsyncAssignToPerson = true;
    const departmentId = this.assetCountReportFormGroup.controls.departmentId.value;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllEmployeeForOrgCombo.sams', searchValue.term, departmentId > 0 ? departmentId : '', '', this.limitCount, this.assignToPersonPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assignToPersonPageNumber , this.assignToPersonCombo , data.responseData.comboList)
        this.assignToPersonPageNumber = this.getData.pageNumber;
        this.assignToPersonCombo = this.getData.dataList;
        this.scrollsyncAssignToPerson = false;
      }
    );
  }

  selectedAssignToPerson(event) {
    if (event === undefined) {
      this.assetCountReportFormGroup.controls.assignToPersonId.setValue(0);
    } else {
      this.assetCountReportFormGroup.controls.assignToPersonId.setValue(event.employeeId);
    }
    this.assignToPersonPageNumber = 1;
    this.assignToPersonCombo = [];   
  }
  
}

