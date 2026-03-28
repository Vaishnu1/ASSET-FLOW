import { Component, OnInit } from '@angular/core';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { RetirementDisposal } from 'src/app/Model/asset/retirementDisposal';
import { Title } from '@angular/platform-browser';
import { AssetModel } from 'src/app/Model/master/asset';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { getData } from 'src/app/Model/common/fetchListData';
import { allAssetRetirmentStatus, allWorkflowStatus } from 'src/app/Constants/AllStatusConstants';
import { processList } from 'src/app/Constants/ProcessList';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { PdfConfirmationComponent } from '../../Common-components/pdf-confirmation/pdf-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { UserPrefernce } from 'src/app/Services/user-preference/user-preference';
import { RejectConfirmationComponent } from '../../Common-components/reject-confirmation/reject-confirmation.component';
import { RejectReasonViewComponent } from '../Asset/reject-reason-view/reject-reason-view.component';

@Component({
  selector: 'app-service-request-asset-retirement-list',
  templateUrl: './service-request-asset-retirement-list.component.html',
  styleUrls: ['./service-request-asset-retirement-list.component.css']
})
export class ServiceRequestAssetRetirementListComponent implements OnInit {

  defaultColumns=['select','sNo','locationName', 'retirementNo','requestedBy','assetCode','model','group','departmentName','assetStatusCondition','approvalStatus','requestReason','updatedDt'];
  displayedColumns = [...this.defaultColumns];

  dataSourceAssetRetirement = [];
  modelAccessModule:ModuleAccessModel;
  //For Pagination
  length: String = '0';     //set total record count here
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  subloader:boolean= false;
  assetGroup: any = [];
  assetGroupPageNumber: number;
  scrollsyncAssetGroup: boolean;
  public retirementDisposal : RetirementDisposal;

  assetCodeCombo: any=[];
  assetCodePageNumber: number;
  scrollsyncAssetCode:boolean=false;
  recordsPerPageForCombo: string;

    //Set Page Title
    title = 'Asset Optima - Disposal';

    public asset: AssetModel;

    locationPageNumber: number;
    scrollsyncLocation: boolean = false;
    locationCombo: any = [];

    scrollServiceEngineersync: boolean = false;
    serviceEngineerPageNumber: number;
    serviceEngineerCombo: any = [];
  getData: getData;

  generateGatePass: boolean = false;


  selectedItem: any = 0;
  retirementStatus: any = null;
  approvalStatusRetirement : any = '';
  assetHdrId: any = 0;
  enableActionBtn: boolean = true;
  selectedAllAssest: boolean = false;
  employeeId: string = '0';

scrollsyncRetireStatus:boolean=false;
assetRetireStatusPageNumber: number;
assetRetireStatusStatusCombo: any = [];

//USER PREFERENCE
public userPreference: UserPrefernce;
showManageColumns: boolean = false;

scrollsyncAssetCategory: boolean = false;
assetCategoryPageNumber: number;
assetCategoryName: any = [];

scrollsyncMode: boolean = false;
modeofDisposalPageNumber: number;
modeofDisposalCombo: any = [];

  constructor(private userSessionService: UserSessionService,
              private router: Router,private commonService: CommonService,
              private titleService: Title,
              private assetOptimaConstants: AssetOptimaConstants,
              private translateService: TranslateService,
              private readonly assetOptimaServices: AssetOptimaServices,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private samsService: AssetOptimaServices,) {
                this.assetGroupPageNumber = 1;
    this.modelAccessModule=new ModuleAccessModel();
    this.retirementDisposal = new RetirementDisposal();
    this.pageSize = '100';
    this.pageIndex = '0';
    this.assetCodePageNumber = 1;
    this.locationPageNumber=1;
    this.assetRetireStatusPageNumber=1;
    this.serviceEngineerPageNumber=1;
    this.assetCategoryPageNumber = 1;
    this.modeofDisposalPageNumber = 1;
    this.asset = new AssetModel();
    this.scrollsyncAssetGroup = false;

    this.showManageColumns = false;
    this.userPreference = new UserPrefernce();
  }

  ngOnInit() {

    this.selectedAssetList = [];
    this.enableActionBtn = true;
    this.dataSourceAssetRetirement = [];

    this.employeeId = this.userSessionService.getUserEmpId();
    this.titleService.setTitle(this.title);
    this.modelAccessModule = this.userSessionService.getUserGroupAccess()['GROUPACCESS_ASSET_RETIREMENT'];
    this.retirementDisposal.direction = 'desc';
    this.retirementDisposal.columnName = 'updatedDt';
    this.retirementDisposal.retirementStatusId=0;
    this.retirementDisposal.retirementStatus = null;

    if(localStorage.getItem('locationId') !== null && localStorage.getItem('locationName') !== null){

      this.asset.locationId = parseInt(localStorage.getItem('locationId'));
      this.asset.locationName = localStorage.getItem('locationName');
      this.retirementDisposal.locationId = parseInt(localStorage.getItem('locationId'));
      this.retirementDisposal.locationName = localStorage.getItem('locationName');

    }else{

    this.asset.locationId=this.userSessionService.getUserLocationId();
    this.asset.locationName=this.userSessionService.getUserLocationName();
    this.retirementDisposal.locationId = this.userSessionService.getUserLocationId();
    this.retirementDisposal.locationName = this.userSessionService.getUserLocationName();
    }

    localStorage.removeItem('locationId');
    localStorage.removeItem('locationName');

    this.pageIndex='0';
    // this.fetchList();

    this.retirementDisposal.direction = 'desc';
    this.retirementDisposal.columnName = 'updatedDt';

    this.userPreference.moduleKey = 'GROUPACCESS_ASSET_RETIREMENT';
    // this.getUserPreferenceInfo();

    let userPreferenceData = this.getUserPreferenceInfo();
    userPreferenceData.then((response) => {

      this.ngAfterContentInit();
          
      this.fetchList();
    })
  }

  createAssetRetirement(mode) {
    if(mode !== 'add'){
      this.router.navigate(['home/asset/assetRetirementCreate/'+ this.selectedAssetList[0].assetRetireId + '/' + mode]);
    }
    else{
      this.router.navigate(['home/asset/assetRetirementCreate/'+ 0 + '/' + mode]);
    }
  }

  customSort(event) {
    this.retirementDisposal.pageNumber = 0;
    this.retirementDisposal.columnName = event.active;
    this.retirementDisposal.direction = event.direction;
    this.fetchList();
  }


  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchList();
  }

  searchAsset() {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
    // this.selectedItem = 0;

    this.selectedAssetList = [];

    this.applyPreferredFilters();
  }

  clear(){
    this.retirementDisposal = new RetirementDisposal();
    this.asset = new AssetModel();
    // this.ngOnInit();
    // this.selectedItem = 0;

    this.fetchList();
  }

  fetchList(){
    this.activatedRoute.params.subscribe(
      params => {
        if(params.status != undefined && params.status != ''){
          this.retirementDisposal.retirementStatus=params.status;
          this.retirementDisposal.assetCategoryName=params.category;
          this.retirementDisposal.subCategoryName=params.subcategory;
          this.retirementDisposal.assetGroupId = params.assetGroupId;
          this.retirementDisposal.assetGroupName =params.assetGroupName;
          this.retirementDisposal.retirementStatusId = parseInt(allAssetRetirmentStatus[params.status]);
        }
      }
    );
    this.retirementDisposal.pageNumber = Number(this.pageIndex);
    this.retirementDisposal.recordsPerPage = Number(this.pageSize);
    this.subloader=true;
    this.dataSourceAssetRetirement = [];

    this.commonService.commonListService('fetchListOfAllRetirement.sams',this.retirementDisposal).subscribe(
      data => {
        if(data.success){
          this.subloader=false;
           this.length = data.responseData.dataTotalRecCount;
           this.dataSourceAssetRetirement = data.responseData.dataList;
           }else{
            this.subloader=false;
           }
      }, error =>{
        this.subloader=false;
      }

    );
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  viewassetRetirement(id,mode){
    this.router.navigate(['home/asset/assetRetirementCreate/'+id + '/' +mode]);
  }

  assetTypeList = [
    { id: 1, name: 'RETIRE' },
    { id: 2, name: 'DISPOSAL' }
  ];

  // statusList = [
  //   { id: 1, name: 'REQUESTED FOR RETIREMENT' },
  //   { id: 2, name: 'REQUESTED FOR SALVAGE' },
  //   { id: 3, name: 'REQUESTED FOR DISPOSAL' },
  //   { id: 4, name: 'RETIRED' },
  //   { id: 5, name: 'SALVAGED' },
  //   { id: 6, name: 'DISPOSED' },
  // ];

  generateAssetRetireDisposalReportExport(){
    this.retirementDisposal.recordsPerPage = 0;
    this.commonService.commonListService('generateAssetRetireDisposalReport.sams', this.retirementDisposal).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      }, error => {
      }
    );
  }

  getToDate(event) {
    if(event.value){
      this.retirementDisposal.endDtDisp = moment(event.value).format(this.assetOptimaConstants.ISODate);
    }
    else{
      this.retirementDisposal.endDtDisp = "";
    }
  }

  getFromDate(event) {
    if(event.value){
      this.retirementDisposal.startDtDisp = moment(event.value).format(this.assetOptimaConstants.ISODate);
    }
    else{
      this.retirementDisposal.startDtDisp = "";
    }
   }

  loadAssetCodeComboData(searchValue) {
    this.scrollsyncAssetCode=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetCodeCombo.sams',searchValue.term,'' ,'',this.recordsPerPageForCombo,this.assetCodePageNumber,'0','').subscribe(
      (data)=>{
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assetCodePageNumber , this.assetCodeCombo , data.responseData.comboList)
        this.assetCodePageNumber = this.getData.pageNumber;
        this.assetCodeCombo = this.getData.dataList;
        this.scrollsyncAssetCode=false;
     }
    );
  }

  selectedAssetCodeData(event) {
    if(event===undefined){
      this.retirementDisposal.assetHdrId=0;
      this.retirementDisposal.assetCode=null;
      this.assetCodePageNumber=1;
      this.assetCodeCombo=[];
    }else{
      this.retirementDisposal.assetHdrId=event.assetHdrId;
      this.retirementDisposal.assetCode=event.assetCode;;
    }
  }

  generateReportForAsset() {
    this.asset.recordsPerPage = 0;
    this.asset.assetHdrId= this.selectedAssetList[0].assetId;
    this.commonService.commonListService('generateAssetReport.sams', this.asset).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      }, error => {
      }
    );
  }

  loadLocationComboDataSearch(searchValue) {
    this.scrollsyncLocation = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllUserLocForCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.locationPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.locationPageNumber , this.locationCombo , data.responseData.comboList)
          this.locationPageNumber = this.getData.pageNumber;
          this.locationCombo = this.getData.dataList;
          this.scrollsyncLocation = false;
        }
      );
  }

  selectedLocationData(event) {
    if (event === undefined) {
      this.retirementDisposal.locationId=0;
      this.retirementDisposal.locationName='';
      this.locationCombo = [];
      this.locationPageNumber = 1;
    } else {
      this.retirementDisposal.locationId=event.locationId;
      this.retirementDisposal.locationName=event.locationName;
    }
  }

  loadServiceEngineerData(searchValue) {
    this.scrollServiceEngineersync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllServiceEngineerCombo.sams',searchValue.term,'','',this.recordsPerPageForCombo,this.serviceEngineerPageNumber).subscribe(
      (data)=>{
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.serviceEngineerPageNumber , this.serviceEngineerCombo , data.responseData.comboList)
        this.serviceEngineerPageNumber = this.getData.pageNumber;
        this.serviceEngineerCombo = this.getData.dataList;
        this.scrollServiceEngineersync = false;
     }
    );
  }

  listOfAllAssetGroup(searchKey) {
    this.scrollsyncAssetGroup = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllAssetGroupCombo, searchKey.term, '' ,'',this.recordsPerPageForCombo
     , this.assetGroupPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchKey, this.assetGroupPageNumber , this.assetGroup , data.responseData.comboList)
          this.assetGroupPageNumber = this.getData.pageNumber;
          this.assetGroup = this.getData.dataList;
          this.scrollsyncAssetGroup = false;
        });
  }

  getAssetGroupComboValue(event) {
    if (event != null) {
      this.retirementDisposal.assetGroupName = event.assetGroupName;
      this.retirementDisposal.assetGroupId = event.assetGroupId;

    } else {
      this.retirementDisposal.assetGroupName = "";
      this.retirementDisposal.assetGroupId = 0;
      this.assetGroup = [];
      this.assetGroupPageNumber = 1;
    }
  }


  selectedAssetList=[];
  selectAssets(element){

    const assetRetireId = this.selectedAssetList.findIndex(data => data.assetRetireId === element.assetRetireId);

    this.enableActionBtn = false;
    if(assetRetireId === -1){
      this.selectedAssetList.push(element);
    }else{
      this.selectedAssetList.splice(assetRetireId,1);
    }

    if(this.selectedAssetList.length === 1){
      this.enableActionBtn = false;
    }
    else{
      this.enableActionBtn = true;
    }

    // asset disposal pdf
    if(this.selectedItem == element.assetHdrId){
      this.selectedItem = 0;
    } else{
      this.selectedItem = element.assetHdrId;
    }
    
  }

  selectAllAssets(event){
    this.selectedAllAssest = event.checked;
    this.enableActionBtn = false;

    if(event.checked){
      this.selectedAssetList = this.dataSourceAssetRetirement;
    }
    else{
      this.selectedAssetList = [];
    }

    if(this.selectedAssetList.length === 1){
      this.enableActionBtn = false;
    }
    else{
      this.enableActionBtn = true;
    }
  }

  compareValue(element: any): boolean{
    return this.selectedAssetList.findIndex(data => data.assetRetireId === element.assetRetireId) !== -1;
  }

  checkApprovalValid(){

    let checkApprovalVal = true;
    let status = '';

    if(this.selectedAssetList.length>0){
      status = this.selectedAssetList[0].retirementStatusId;
      for(let i=0;i<this.selectedAssetList.length;i++){
        if((this.selectedAssetList[i].retirementStatusId == allAssetRetirmentStatus.AWAITING_FOR_RETAIR_APPROVAL || this.selectedAssetList[i].retirementStatusId == allAssetRetirmentStatus.AWAITING_FOR_SALVAGE_APPROVAL || this.selectedAssetList[i].retirementStatusId == allAssetRetirmentStatus.AWAITING_FOR_DISPOSAL_APPROVAL || this.selectedAssetList[i].retirementStatusId == allAssetRetirmentStatus.AWAITING_FOR_SCRAP_APPROVAL) && (status == this.selectedAssetList[i].retirementStatusId && this.selectedAssetList[i].approvalId != 0 && this.selectedAssetList[i].retirementStatusId != allAssetRetirmentStatus.RETIREMENT_REJECTED && this.selectedAssetList[i].retirementStatusId != allAssetRetirmentStatus.SALVAGE_REJECTED && this.selectedAssetList[i].retirementStatusId != allAssetRetirmentStatus.DISPOSE_REJECTED && this.selectedAssetList[i].retirementStatusId != allAssetRetirmentStatus.SCRAP_REJECTED)){
          checkApprovalVal = false;
        }
        else{
          checkApprovalVal = true;
          break;
        }
      }
    }
    else{
      return checkApprovalVal;
    }
    return checkApprovalVal;
  }

  retirementWorkflowApproval(status){
    let asd;
    if(status){
      asd = this.commonService.commonWorkflowService(allWorkflowStatus[allWorkflowStatus.RETIREMENT], this.selectedAssetList,"");
    }
    else{
      // asd = this.commonService.rejectRetirement(this.selectedAssetList);
      this.rejectRetirement();
    }

    asd.then(data=>{
      if(data){
        this.dataSourceAssetRetirement = [];
         this.ngOnInit();
      }
    })
  }

  rejectRetirement() {
  
      this.selectedAssetList = this.selectedAssetList.filter(function(element) {
        return element.approvalId !== 0;
    });
    
     const selectedAssetListLength = this.selectedAssetList.length;
  
      let selectdList = this.selectedAssetList;
      const dialogRef = this.dialog.open(RejectConfirmationComponent, {
        height: 'auto',
        width: '400px',
        data: {
          confirmHeading: 'Confirmation',
          confirmMsg: 'Are you sure to Reject selected Record?',
          note : 'Note : Only Record under your queue will be Rejected',
          selectedElementListLength: selectedAssetListLength
        }
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(
        data => {
          if (data.status === true) {
            let rejectReason = data.reason

             let approvalList = {selectedApprovalList: []};
        let assetLists = {selectedAssetList: [], status: "Rejected",transSource : '',rejectReason: rejectReason};
        for(let i=0; i<= this.selectedAssetList.length-1 ; i++){
            approvalList.selectedApprovalList.push(this.selectedAssetList[i].approvalId);
            assetLists.selectedAssetList.push(this.selectedAssetList[i].assetRetireId)
          }
        let assetListData = {...approvalList,...assetLists};
        this.commonService.commonInsertService('updateStatusBasedOnApproval.sams', assetListData).subscribe(
          data => {
            if (data.success) {
                this.commonService.openToastSuccessMessage('Record Rejected Successfully.');
                this.ngOnInit();
            }
            else {
              this.commonService.openToastWarningMessage(data.message);
              this.ngOnInit();
            }
            
          }, error => {
          }
        );
        } else {
          
          }

          this.ngOnInit();
        });
    }

  loadStatusComboData(searchValue){
    this.scrollsyncRetireStatus = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllMasterStatusCombo.sams', searchValue.term, processList.ASSET_RETIREMENT, '',
      this.recordsPerPageForCombo, this.assetRetireStatusPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetRetireStatusPageNumber , this.assetRetireStatusStatusCombo , data.responseData.comboList)
          this.assetRetireStatusPageNumber = this.getData.pageNumber;
          this.assetRetireStatusStatusCombo = this.getData.dataList;
          this.scrollsyncRetireStatus = false;
        }
      );
  }

  selectedRetirementStatusData(event){
    if(event === undefined){
      this.retirementDisposal.retirementStatusId=0;
      this.retirementDisposal.retirementStatus = null;
      this.assetRetireStatusPageNumber = 1;
      this.assetRetireStatusStatusCombo = [];
    }else{
      this.translateService.get([event.processStatusName])
      .subscribe((val) => {
        const status = Object.values(val)
        if(status.length > 0){
          this.retirementDisposal.retirementStatus = status[0].toString();
        }
      });
      this.retirementDisposal.retirementStatusId=event.processStatusId;
    }
  }

  generateDisposalPDF(assetHdrId?: number) {
    let dialogRef = this.dialog.open(PdfConfirmationComponent, {
      height: '230px',
      width: '400px',
      data: { 
              'confirmHeading':'Asset Report Type Confirmation',
              'confirmMsg':'Select Asset pdf report type to download',
              'radioButtonName1':'Asset Summary PDF Report',
              'radioButtonName2':'Asset Detail PDF Report'
            }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.reportType === 'radioButton1') {
         this.downloadAssetPdfReport(assetHdrId,'summary');
        } else if(data.reportType === 'radioButton2'){
          this.downloadAssetPdfReport(assetHdrId,'detail');
        }
      });
    
  }

  downloadDocument(filePath: string, contentType) {
    this.commonService.showSpinner();
    var fileName = filePath.split('.')[0];
    this.commonService.downloadFile(filePath, contentType).subscribe(
      data => {
        this.commonService.showDownloadPopUpPDF(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
      }
    );
    this.commonService.hideSpinner();
  }

  downloadAssetPdfReport(assetId, reportType) {
    this.commonService.commonGetService('generateAssetDisposalPdf.sams', assetId, reportType).subscribe(
      data => {
        if (data.success) {
          this.downloadDocument(data.responseData, 'application/pdf');
          this.commonService.openToastSuccessMessage("Report is Generated Successfully");
        } else {
        }
      }, error => {
        this.commonService.openToastErrorMessage("Failed to generate report.");
      } 
    );
  }

  toggleColumn(column: string): void {
    const index = this.displayedColumns.indexOf(column);
    if (index >= 0) {
      this.displayedColumns.splice(index, 1); // Column is selected, remove it
    } else {
      this.displayedColumns.push(column); // Column is not selected, add it
    }
  }
  
  editManageColumns() {
    this.showManageColumns = !this.showManageColumns;
  }
  
  applyPreferredColumns() {
    //SAVE TO USER PREFERENCE TABLE
    this.showManageColumns = !this.showManageColumns
    this.userPreference.customColumns = JSON.stringify(this.displayedColumns);
    this.commonService.commonInsertService(this.assetOptimaServices.saveOrUpdateUserPreference, this.userPreference).subscribe(
      data => {
        if(data.success) {
          // this.commonService.openToastSuccessMessage(data.message);
          this.getUserPreferenceInfo();
        } else {
          this.commonService.openToastWarningMessage(data.message);
        }
      }
    )
    
  }
  
  resetPreferredColumns() {
    this.displayedColumns = [...this.defaultColumns];
    this.userPreference.customColumns = JSON.stringify(this.displayedColumns);
  }
  
  getUserPreferenceInfo() {
    let userPreferenceInfo = new Promise((resolve) => {
      this.commonService.commonInsertService(this.samsService.fetchUserPreferenceInfo, this.userPreference).subscribe(
        data => {
          if(data.responseData !== undefined) {
            this.userPreference = data.responseData;
            if(this.userPreference.customColumnsList.length>0) {
              this.displayedColumns = this.userPreference.customColumnsList;
            }
            this.retirementDisposal = JSON.parse(this.userPreference.customFilters);
          }
          resolve(true);
        }
      )
    });
    return userPreferenceInfo;
    
  }
  
  applyPreferredFilters() {
    //SAVE TO USER PREFERENCE TABLE
    this.userPreference.customFilters = JSON.stringify(this.retirementDisposal);
    this.commonService.commonInsertService(this.samsService.saveOrUpdateUserPreference, this.userPreference).subscribe(
      data => {
        if(data.success) {
          // this.commonService.openToastSuccessMessage(data.message);
          this.getUserPreferenceInfo()
        } else {
          this.commonService.openToastWarningMessage(data.message);
        }
      }
    )
  }

  checkRetirementStatus(){

    return this.selectedAssetList.length === 0 ||
      this.selectedAssetList.some(asset =>
        asset.assetStatusName == 'RETIRED'
      );
  }


   viewRejectReason(rejectReason){
    
        const dialogRef = this.dialog.open(RejectReasonViewComponent, {
          height: 'auto',
          width: '700px',
          data: {
    
            rejectReason : rejectReason
          }
        });
        dialogRef.disableClose = true;
        dialogRef.afterClosed().subscribe(data => {
          if (data.status === true) {
            
          }else{
            
          }
        });
      }
  

      listOfCategory(searchValue) {
    this.scrollsyncAssetCategory = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetCategoryCombo.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.assetCategoryPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assetCategoryPageNumber, this.assetCategoryName, data.responseData.comboList)
        this.assetCategoryPageNumber = this.getData.pageNumber;
        this.assetCategoryName = this.getData.dataList;
        this.scrollsyncAssetCategory = false;
      }
    );
  }

   getCategoryComboValue(event) {
    if (event === undefined) {
      this.retirementDisposal.assetCategoryId = 0;
      this.retirementDisposal.assetCategoryName = '';
      this.assetCategoryPageNumber = 1;
      this.assetCategoryName = [];
    } else {
      this.retirementDisposal.assetCategoryId = event.assetCategoryId;
      this.retirementDisposal.assetCategoryName = event.assetCategoryName;
    }
  }

   loadRequestReasonComboData(searchValue) {
    this.scrollsyncMode = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllRetirementReasonCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.modeofDisposalPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.modeofDisposalPageNumber , this.modeofDisposalCombo , data.responseData.comboList)
          this.modeofDisposalPageNumber = this.getData.pageNumber;
          this.modeofDisposalCombo = this.getData.dataList;
          this.scrollsyncMode = false;
        }
      );
  }

  getRequestReason(event){
      if(event == undefined){
      } else{
        
      }
    }

  
    ngAfterContentInit(){
      
         this.retirementDisposal = new RetirementDisposal;
     
         this.retirementDisposal.direction = 'desc';
         this.retirementDisposal.columnName = 'updatedDt';
     
         // From dashboard
          this.activatedRoute.queryParams.subscribe(query => {
     
            if(query?.locationId){
             this.retirementDisposal.locationId = Number(query.locationId);
             this.retirementDisposal.locationName = query.locationName;
            }

            if (query?.requestReason) {
               this.retirementDisposal.requestReason = '';
               this.retirementDisposal.requestReason = query.requestReason;  

               this.retirementDisposal.assetCategoryName = '';
               this.retirementDisposal.assetCategoryName = query.assetCategoryName;  
            }
             
   });
    
    }

}
