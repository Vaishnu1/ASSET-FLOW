import { Component, OnInit, ViewChild, OnDestroy, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RepairServiceRequestReportComponent } from '../repair-service-request-report/repair-service-request-report.component';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/dataService';
import { AssetCountValueReportComponent } from '../asset-count-value-report/asset-count-value-report.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { SrPrSearchComponent } from './sr/sr-pr-search/sr-pr-search.component';
import { SrPrTotalCountComponent } from './sr/sr-pr-total-count/sr-pr-total-count.component';
import { SrWithPrCountComponent } from './sr/sr-with-pr-count/sr-with-pr-count.component';
import { SrWithOutPrCountComponent } from './sr/sr-with-out-pr-count/sr-with-out-pr-count.component';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { Title } from '@angular/platform-browser';
import { ModelDetailedReportComponent } from '../model-report/model-detailed-report/model-detailed-report.component';
import { ManufacturerDetailedReportComponent } from '../manufacturer-report/manufacturer-detailed-report/manufacturer-detailed-report.component';
import { ContractDetailedReportComponent } from './contract-detailed-report/contract-detailed-report.component';
import { QualityIndicatorReportComponent } from './quality-indicator-report/quality-indicator-report.component';
import { ViewRequest } from 'src/app/Model/base/view-request';
import { Observable } from 'rxjs';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { MttrAndMtbfReportComponent } from '../mttr-and-mtbf-report/mttr-and-mtbf-report.component';
import { AiAutomatedReportsComponent } from './ai-automated-reports/ai-automated-reports.component';


@Component({ 
  selector: 'app-manage-report',
  templateUrl: './manage-report.component.html',
  styleUrls: ['./manage-report.component.css']
}) 
export class ManageReportComponent implements OnInit,OnDestroy {
  //Set page title
  title = 'Asset Optima - Reports';
  @ViewChild(SrPrTotalCountComponent) srPrTotalCountComponent: SrPrTotalCountComponent;
  @ViewChild(SrWithPrCountComponent) srWithPrCountComponent: SrWithPrCountComponent;
  @ViewChild(SrWithOutPrCountComponent) srWithOutPrCountComponent: SrWithOutPrCountComponent;


  subLoaderManageResportList : boolean = false;
  groupModuleAccessModelList;
  menus: any[];
  asset = true;
  service = true;
  purchase = true;
  item = true;
  employee = true;
  budget = true;
  maintenance = true;
  repairservice = true;
  contract = true;
  range = true;
  showtab: any;
  chart = false;
  Active_Tab :string ='';
  
  reportFormGroup: FormGroup;
  assetSearchParams: FormGroup;
  srPrSearchParams: FormGroup;
  modelFormGroup: FormGroup;
  manufacturerFormGroup: FormGroup;
  contractFormGroup: FormGroup;
  qualityIndicatorFormGroup: FormGroup;
  bmPeformanceReportForm: FormGroup;
  mttrAndMtbfForm: FormGroup;

  dialogRef;

  //PERMISSIONS
  assetAccessModule: ModuleAccessModel;
  woAccessModule: ModuleAccessModel;
  modelAccessModule: ModuleAccessModel;
  manufacturerAccessModule: ModuleAccessModel;
  contractAccessModule: ModuleAccessModel;
  aiAutomatedReportAccessModule: ModuleAccessModel;

  viewRequestMain;
  // model;

  displayedColumns=['select','no','name','startDate','completedDate','requestedBy','status'];
  subLoaderViewRequest : boolean = false;
  //for pagination
  length: String='0';//set total record count here 
  pageIndex: String;//set page number starts with zeroo
  pageSize: String;// records per page

  public viewRequest:  ViewRequest;
  subLoaderAssetSummary: boolean = false;
  searchParams: any={};
  exportToexcelApi: string;

  selectedItem:any = 0;
  
  constructor(private matDaialog: MatDialog, 
    private router: Router, 
    private dataShare: DataService, 
    private commonService: CommonService,
    private userSessionService:UserSessionService,
    private titleService: Title) { 
      this.viewRequestMain=[];
      this.viewRequest = new ViewRequest();
  }

  ngOnInit() {
    this.assetAccessModule = this.userSessionService.getUserGroupAccess()['GROUPACCESS_ASSET_REPORT'];
    this.woAccessModule = this.userSessionService.getUserGroupAccess()['GROUPACCESS_WORK_ORDER_REPORT'];
    this.modelAccessModule = this.userSessionService.getUserGroupAccess()['GROUPACCESS_MODEL_REPORT'];
    this.manufacturerAccessModule = this.userSessionService.getUserGroupAccess()['GROUPACCESS_MANUFACTURER_REPORTS'];
    this.contractAccessModule = this.userSessionService.getUserGroupAccess()['GROUPACCESS_CONTRACT_REQUEST'];
    this.aiAutomatedReportAccessModule = this.userSessionService.getUserGroupAccess()['GROUPACCESS_AI_AUTOMATED_REPORT'];

    this.titleService.setTitle(this.title);
    this.reportFormGroup = new FormGroup({
      fromDtDisp: new FormControl('', [Validators.required]),
      toDtDisp: new FormControl('', [Validators.required])
    });
    this.reportFormGroup.controls.fromDtDisp.errors.required;

    this.assetSearchParams = new FormGroup({
      locationName: new FormControl(''),
      locationId: new FormControl(''),
      fromDtDisp: new FormControl(''),
      toDtDisp: new FormControl(''),
      departmentName: new FormControl(''),
      departmentId: new FormControl(0),
      modelName: new FormControl(''),
      modelId: new FormControl(''),
      reportType: new FormControl(''),
      orgId: new FormControl(''),
      regionName: new FormControl(''),
      regionId: new FormControl(0),
      assetCategoryName: new FormControl(''),
      assetCategoryId: new FormControl(0),
      assetGroupName: new FormControl(''),
      assetGroupId: new FormControl(0),
      functionalStatus: new FormControl(''),
      assetStatus: new FormControl(''), 
      assetStatusId: new FormControl(0),  
      assetDtlReports: new FormControl([]),
      logInUserId:new FormControl(this.userSessionService.getUserId()),
      assetCode: new  FormControl(),
      assetHdrId : new FormControl(0),
      subCategoryName: new FormControl(''),
      subCategoryId: new FormControl(0),
      direction: new FormControl(''),
      columnName: new FormControl(''),

      loanNo: new FormControl(''),
      loanedTo: new FormControl(''),
      assignToPersonId: new FormControl(0),
      assignTo: new FormControl('')
    });
    this.srPrSearchParams = new FormGroup({
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
      assetTypeName: new FormControl('')
    });

    this.modelFormGroup = new FormGroup({
      modelNo: new FormControl(''),
      assetCategoryName: new FormControl(''),
      modelName: new FormControl(''),
      subCategoryName: new FormControl(''),
      manufacturerName: new FormControl(''),
      assetCategoryId: new FormControl(0),
      subCategoryId: new FormControl(0),
      manufacturerId: new FormControl(0),
      assetGroupId: new FormControl(0),
      assetGroupName: new FormControl(''),
      modelId: new FormControl(0),
      modelReportsType: new FormControl(''),
      searchValue1: new FormControl(''),
      locationName: new FormControl(''),
      locationId: new FormControl(0),
      direction: new FormControl(''),
      recordsPerPage: new FormControl(0),
      columnName: new FormControl(''),

    });

    this.manufacturerFormGroup = new FormGroup({
      reportType: new FormControl(''),
      manufacturerId: new FormControl(0),
      manufacturerName: new FormControl(''),
      address: new FormControl(''),
      locCountry: new FormControl(''),
      locState: new FormControl(''),
      manufacturerCode: new FormControl(''),
      source: new FormControl(''),
      manufacturerChangeOccurred: new FormControl(''),
      manufacturerStatus: new FormControl(''),
      searchValue: new FormControl(''),
      searchValue1: new FormControl(''),
      locationName: new FormControl(''),
      locationId: new FormControl(0),
      direction: new FormControl(''),
      recordsPerPage: new FormControl(0),
      columnName: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedDtDisp: new FormControl(''),
    });

    this.contractFormGroup = new FormGroup({
      reportType: new FormControl(''),
      contractHdrId: new FormControl(0),
      contractName: new FormControl(''),
      contractNo: new FormControl(''),
      contractingPartyType: new FormControl(''),
      contractPartyId: new FormControl(0),
      contractPartyName: new FormControl(''),
      coverageType: new FormControl(''),
      contractType: new FormControl(''),
      contractStartDt: new FormControl(''),
      contractStartDtDisp: new FormControl(''),
      contractEndDt: new FormControl(''),
      contractEndDtDisp: new FormControl(''),
      expiryPriorNotifyDays: new FormControl(0),
      expiredContracts: new FormControl(''),
      intervalBasedContract: new FormControl(''),    
      
      logInUserId:new FormControl(this.userSessionService.getUserId()),
      searchValue: new FormControl(''),
      searchValue1: new FormControl(''),
      locationName: new FormControl(''),
      locationId: new FormControl(0),
      direction: new FormControl(''),
      recordsPerPage: new FormControl(0),
      columnName: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      createdBy: new FormControl(this.userSessionService.getUserName()),                     
      createdDt: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedDtDisp: new FormControl(''),
    });

    this.qualityIndicatorFormGroup = new FormGroup({
      reportType: new FormControl(''),
      locationName: new FormControl('',[Validators.required]),
      locationId: new FormControl(''),
      fromDtDisp: new FormControl(''),
      toDtDisp: new FormControl(''),
      srType: new FormControl('',[Validators.required]),
      srStatusId: new FormControl(''),
      srStatusName: new FormControl(''),
      assetGroupName: new FormControl(''),
      assetGroupId: new FormControl(0),
      modelId: new FormControl(0),
      modelName: new FormControl(''),
      assetCode: new FormControl(''),
      assetHdrId: new FormControl(0),
      departmentName: new FormControl(''),
      departmentId: new FormControl(0),
      functionality: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedDtDisp: new FormControl(new Date()),
      createdDt: new FormControl(''),
      updatedDt: new FormControl(''),
      direction: new FormControl(''),
      columnName: new FormControl(''),
    });

    
    this.bmPeformanceReportForm = new FormGroup({
      locationName: new FormControl(''),
      locationId: new FormControl(0),
      createdDtDisp: new FormControl(''),
      updatedDtDisp: new FormControl(new Date()),
      createdDt: new FormControl(''),
      updatedDt: new FormControl(new Date()),
      departmentName: new FormControl(),
      departmentId: new FormControl(0),
      srType: new FormControl(''),
      assignedTo: new FormControl(''),
      assignedToId: new FormControl(0),
      srReportType: new FormControl(''),
      srSubReportType: new FormControl(''),
      srStatusId: new FormControl(''),
      srStatusName: new FormControl(''),
      direction: new FormControl(''),
      columnName: new FormControl(''),
    });

    this.mttrAndMtbfForm = new FormGroup({
      locationName: new FormControl(),
      locationId: new FormControl(0),
      fromDtDisp: new FormControl(''),
      toDtDisp: new FormControl(new Date()),
      departmentName: new FormControl(),
      departmentId: new FormControl(0),
      modelName: new FormControl(), 
      modelId: new FormControl(''),
      reportType: new FormControl(''),
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


    this.pageSize = '100';
    this.pageIndex = '0';
    this.viewRequest.direction = 'desc';
    this.viewRequest.columnName = 'updatedDt';
    this.viewRequest.jobType = 'EXPORT';
    this.getCount().subscribe(
      data => {
        if (data.success) {
          this.length = data.responseData.count;
          this.loadList();
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
        this.commonService.openToastErrorMessage('');
      }
    )

  }

  reportCall(reportName) {   

    if (reportName == 'Repair service request') { 
      this.matDaialog.open(RepairServiceRequestReportComponent, {
        height: '60%',
        width: '30%',
        position: { top: '1%' },
        data: ''
      })
    } else if (reportName == 'Service request') {   
      this.dialogRef =this.matDaialog.open(SrPrSearchComponent, {
        width: '80%',
        height: '485px',
        // position: { top: '1%' },
        data: { screenName: 'Service request Reports', title: '1' , srReportType:'Service request Detail Report'}
      })
      this.dialogRef.afterClosed().subscribe(
        data => {
          if (data) { 
            this.searchParams = data;           
            if(data.srReportType ==='Service request Count Report'){              
              this.exportToexcelApi='generateSrPrCountReport.sams';
              this.exportToexcel(this.exportToexcelApi,this.searchParams); 
            }else if(data.srReportType ==='Service request Detail Report'){
              this.exportToexcelApi='generateServiceRequestReport.sams';
              this.exportToexcel(this.exportToexcelApi,this.searchParams); 
            } else if(data.srReportType === 'Maintenance Performance Report'){
              this.qualityIndicatorFormGroup.patchValue(data);
              this.searchParams = this.qualityIndicatorFormGroup.value;
              this.exportToexcelApi='generateQualityIndicatorReport.sams';
              this.exportToexcel(this.exportToexcelApi,this.searchParams);            
            } else if(data.srReportType === 'Breakdown Performance Report'){
              this.bmPeformanceReportForm.patchValue(data);
              this.searchParams = this.bmPeformanceReportForm.value;
              this.exportToexcelApi='generateBreakDownPerformanceReport.sams';
              this.exportToexcel(this.exportToexcelApi,this.searchParams); 
            }else if(data.srReportType === 'Consumed Spares Report'){
              this.exportToexcelApi='generateConsumedSparesReport.sams';
              this.exportToexcel(this.exportToexcelApi,this.searchParams); 
            }
          }
        }
      );
     } else if (reportName == 'SR to PR (days)') { 
      // this.srPrDataSearch = true;
      let dialogRef = this.matDaialog.open(SrPrSearchComponent, {
        position: { top: '1%' },
        width: '767px',
        height: '485px',
        data: { screenName: 'Service Request to purchase request search', title: '5' }
      });
      dialogRef.afterClosed().subscribe(
        data => {
          if (data) {
            this.srPrTotalCountComponent.setSearchParams(data);
          }
        }
      );

    }else if (reportName == 'Count SR with PR') {

      // this.srWithPrSearch = true;
      let dialogRef = this.matDaialog.open(SrPrSearchComponent, {
        position: { top: '1%' },
        width: '767px',
        height: '485px',
        data: { screenName: 'Service Request with purchase request search', title: '3' }
      });
      dialogRef.afterClosed().subscribe(
        data => {
          if (data) {
            this.srWithPrCountComponent.setSearchParams(data);
          }
        }
      );
    } else if (reportName == 'Count SR without PR') {

      // this.srWithOutPrSearch = true;
      let dialogRef = this.matDaialog.open(SrPrSearchComponent, {
        position: { top: '1%' },
        width: '767px',
        height: '485px',
        data: { screenName: 'Service Request without purchase request search', title: '4' }
      });
      dialogRef.afterClosed().subscribe(
        data => {
          if (data) {
            this.srWithOutPrCountComponent.setSearchParams(data);
          }
        }
      );
    } else if (reportName == 'ASSET') {  
      this.dialogRef = this.matDaialog.open(AssetCountValueReportComponent, {
        position: { top: '20px' }, 
        width: '80%',  
        height: '610px',                
        data: { 'title': 'Asset Report', 'reportType': 'Asset Count' }        
      });
      this.dialogRef.afterClosed().subscribe(
        data => {
          if (data) {             
            this.assetSearchParams.patchValue(data);
            this.searchParams = this.assetSearchParams.value;                 
            if( this.assetSearchParams.controls.reportType.value=='Asset Utilization Report'){
              this.exportToexcelApi='reports/assets/upTimedownTimeReport.sams';
              this.exportToexcel(this.exportToexcelApi,this.searchParams);
            }
            if( this.assetSearchParams.controls.reportType.value=='Asset Summary'){   
              this.exportToexcelApi='reports/assets/summaryReport.sams';
              this.exportToexcel(this.exportToexcelApi,this.searchParams);
            }  
            if(this.assetSearchParams.controls.reportType.value=='Asset Count'){   
              this.exportToexcelApi='reports/assets/countReport.sams';
              this.exportToexcel(this.exportToexcelApi,this.searchParams);
            }
            if(this.assetSearchParams.controls.reportType.value=='Asset Detailed Report'){
              this.exportToexcelApi='reports/assets/summaryReport.sams';
              this.exportToexcel(this.exportToexcelApi,this.searchParams);
            } 
            if( this.assetSearchParams.controls.reportType.value=='Asset Volume License Report'){ 
              this.exportToexcelApi='reports/assets/summaryReport.sams';
              this.exportToexcel(this.exportToexcelApi,this.searchParams);  
              }
            if( this.assetSearchParams.controls.reportType.value==='Asset Loan/Return Report'){
              this.exportToexcelApi='generateLoanReport.sams';
              this.exportToexcel(this.exportToexcelApi,this.searchParams);   
              }
          }
        }
      );
    } else if (reportName == 'Model Report') {   
       this.dialogRef = this.matDaialog.open(ModelDetailedReportComponent, {
        //  position: { top: '1%' }, 
         width: '767px',  
         height: '285px',                
         data: { title: 5, screenName: 'Model Report' }        
       });
       this.dialogRef.afterClosed().subscribe(
         data => {
           if (data) { 
             this.modelFormGroup.patchValue(data);
             this.searchParams = this.modelFormGroup.value;  
             if(this.modelFormGroup.controls.modelReportsType.value=='Model Detailed Report'){
              this.exportToexcelApi='generateAssetModelReport.sams';
              this.exportToexcel(this.exportToexcelApi,this.searchParams); 
             } 
           }
         }
       );
     }else if (reportName === 'Manufacturer Detailed Report') {  
      this.dialogRef = this.matDaialog.open(ManufacturerDetailedReportComponent, {
        // position: { top: '8%' }, 
        width: '767px',  
        height: '240px',    
        maxWidth: '100vw',          
        data: { title: 5, screenName: 'Manufacturer Detailed Report' }        
      });
      this.dialogRef.afterClosed().subscribe(
        data => {
          if (data) { 
            this.manufacturerFormGroup.patchValue(data);
            this.searchParams = this.manufacturerFormGroup.value;              
            if(this.manufacturerFormGroup.controls.reportType.value === "Manufacturer Detailed Report"){
              this.exportToexcelApi='generateManufacturerReport.sams';
              this.exportToexcel(this.exportToexcelApi,this.searchParams); 
            } 
          }
        }
      );
    }else if (reportName === 'Contract Detailed Report') {  
      this.dialogRef = this.matDaialog.open(ContractDetailedReportComponent, {
        // position: { top: '1%' }, 
        width: '767px',  
        height: '500px',                       
        data: { title: 5, screenName: 'Contract Report' }        
      });
      this.dialogRef.afterClosed().subscribe(
        data => {
          if (data) { 
            this.contractFormGroup.patchValue(data);
            this.searchParams = this.contractFormGroup.value;                                      
            if(this.contractFormGroup.controls.reportType.value === "Contract Detailed Report"){
              this.exportToexcelApi='generateContractReport.sams';
              this.exportToexcel(this.exportToexcelApi,this.searchParams); 
            } 
          }
        }
      );
    }   else if (reportName === 'mttr and mtbf') {  
      this.dialogRef = this.matDaialog.open(MttrAndMtbfReportComponent, {
        // position: { top: '1%' }, 
        width: '80%',  
        height: '80%',                       
        data: { title: 5, screenName: 'MTTR and MTBF Report' }        
      });
      this.dialogRef.afterClosed().subscribe(
        data => {
          if (data) { 
            this.mttrAndMtbfForm.patchValue(data);
            this.searchParams = this.mttrAndMtbfForm.value;                                      
            if(this.mttrAndMtbfForm.controls.reportType.value === "MTTR Report"){
              this.exportToexcelApi='reports/assets/generateMTTRReport.sams';
              this.exportToexcel(this.exportToexcelApi,this.searchParams); 
            }else if(this.mttrAndMtbfForm.controls.reportType.value === "MTBF Report"){
              this.exportToexcelApi='reports/assets/generateMTBFReport.sams';
              this.exportToexcel(this.exportToexcelApi,this.searchParams); 
            }
          }
        }
      );
    } else if (reportName === 'AI Automated Reports') {
      this.dialogRef = this.matDaialog.open(AiAutomatedReportsComponent, {
        position: { top: '80px' },
        width: '600px',
        height: '80vh',
        data: { title: 'Automated Reports' }
      });
    }
  }

  ngAfterViewInit() {

  }
 ngOnDestroy(){ 
    if(this.dialogRef!=null){
     this.dialogRef.close();
    }
  }

  showtbl(value) {
    this.showtab = value;
  }
  showchart(value) {
    this.showtab = value;
  }
  dateSearchData: any = { 'fromDtDisp': '', 'toDtDisp': '' };
  enableEndDate = false;

  getDayOfWeek(d) {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }
  getDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }
  getDayOfCurrentYear(date) {
    return new Date(date.getFullYear(), 0, 1);
  }
  formatDateToYY_MM_DD(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  Active_Tab_Change(name) {
    this.Active_Tab = name;
    if(name==='asset_report'){
      this.reportCall('ASSET');
    }else if(name==='service_request_report'){
      this.reportCall('Service request');
    }else if(name==='model_report'){
      this.reportCall('Model Report');
    }else if(name==='manufacturer_detailed_report'){
      this.reportCall('Manufacturer Detailed Report');
    }else if(name==='contract_detailed_report'){
      this.reportCall('Contract Detailed Report');
    }else if(name==='quality_indicator_report'){
      this.reportCall('Quality Indicator Report')
    }else if(name==='mttr_and_mtbf'){
      this.reportCall('mttr and mtbf')
    }else if(name==='ai_automated_reports'){
      this.reportCall('AI Automated Reports')
    }
}


  downloadDocument(filePath: string) {
    var fileName = filePath.split('.')[0];
    this.commonService.downloadExcelFile(filePath).subscribe(
      data => {
        let file = filePath.split('.');
        this.commonService.showDownloadPopUp(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
      }
    );
  }

  onSearchChange(searchValue : string){
    console.log(searchValue);
    this.viewRequest.programName = searchValue;
    this.pageSize = '100';
    this.pageIndex = '0';
    this.loadList();
  }

  loadList() {
    this.subLoaderViewRequest = true;
    this.viewRequestMain = null;
    this.viewRequest.pageNumber = Number(this.pageIndex);
    this.viewRequest.recordsPerPage = Number(this.pageSize);
    this.commonService.commonListService('listOfViewRequet.sams', this.viewRequest).subscribe(
      data => {
        if (data.success) {
          this.viewRequestMain = data.responseData;
          this.subLoaderViewRequest = false;
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.subLoaderViewRequest = false;
        }
      }, error => {
        this.commonService.openToastErrorMessage('');
      }
    );
  }

  getCount(): Observable<any> {
    return this.commonService.commonListService('listOfViewRequetCount.sams', this.viewRequest);
  }

  //Pagination S.NO sequence generation pased on the number of page
  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }


  exportToexcel(exportToexcelApi,searchParams) {  
    this.subLoaderAssetSummary = true;
    this.commonService.commonListService(exportToexcelApi,searchParams).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
        this.ngOnInit();
      }, error => {
        this.commonService.openToastErrorMessage("Failed to generate Report");
      }
    );
    this.subLoaderAssetSummary = false;
  }

    //function to get and set the below values to the pagination tag
    getServerData(event) {
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex;
      this.loadList()
    }

    selectReport(element){
      console.log(element);
      
      if(this.selectedItem.requestId == element.requestId){
        this.selectedItem = 0;
      }else{
        this.selectedItem = element;
      }
    }

} 
