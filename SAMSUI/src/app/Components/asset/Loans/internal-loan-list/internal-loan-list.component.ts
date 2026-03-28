import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LoanReturnsModel } from '../../../../Model/asset/loanReturns';
import { CommonService } from '../../../../Services/common-service/common.service';
import { AssetOptimaConstants } from '../../../../Constants/AssetOptimaConstants';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { getData } from 'src/app/Model/common/fetchListData';
import { processList } from 'src/app/Constants/ProcessList';
import { allassetStatus, allloanStatus } from 'src/app/Constants/AllStatusConstants';

@Component({
  selector: 'app-internal-loan-list',
  templateUrl: './internal-loan-list.component.html',
  styleUrls: ['./internal-loan-list.component.css']
})
export class InternalLoanListComponent implements OnInit {

  //Set Page Title
  title = 'Asset Optima - Internal Loans';

  loanDisplayedColumns = ['select','sno','locationNameFrom', 'departmentNameFrom','loanedToDepartment','loanNo','loanPersonName','assetCode','model','loanStatus','fromDt','updatedBy'];

  loanDataSource = [];

  subLoader: boolean = false;

  public loanReturns: LoanReturnsModel;

  locationPageNumber: number;
  scrollsyncLocation: boolean = false;
  locationCombo: any = [];

  loanComboList: any = [];
  loanPageNumber: number;
  scrollsyncLoan: boolean = false;
  scrollsyncLoanstatus: boolean = false;

  loanStatusList: any=[];
  loanStatusPageNumber: number;

    //drop down
  scrollsyncAssetGroup: boolean = false;
  assetGroupPageNumber: number;
  assetGroupCombo: any = [];


  scrollsyncModel: boolean = false;
  modelComboPageNumber: number;
  modelCombo: any = [];
  modelAccessModule: ModuleAccessModel;

  //For Pagination
  length: String = '0';     //set total record count here
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page
  recordsPerPageForCombo: string;
  getData: getData;

  selectedItem: any = 0;
  selectedLoanStatusId: any ='';
  enableBtn: boolean = true;

  multiSelectFlag : boolean = false;

  constructor(private router: Router,
              private titleService: Title,
              private commonService: CommonService,
              private readonly userSession: UserSessionService,
              private assetOptimaConstants: AssetOptimaConstants) {
        this.loanReturns = new LoanReturnsModel();
        this.locationPageNumber=1;
        this.loanPageNumber=1;
        this.assetGroupPageNumber=1;
        this.modelComboPageNumber=1;
        this.loanStatusPageNumber=1;
        this.modelAccessModule = new ModuleAccessModel();
               }

  ngOnInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_INTERNAL_LOANS'];
    this.titleService.setTitle(this.title);
    this.pageSize = '100';
    this.pageIndex = '0';
    this.loanReturns.direction = 'desc';
    this.loanReturns.columnName = 'updatedDt';
    this.loanReturns.locationId=this.userSession.getUserLocationId();
    this.loanReturns.locationName=this.userSession.getUserLocationName();
    this.fetchList();
  }

  searchLoans(){
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
  }

  clear(){
    this.loanReturns = new LoanReturnsModel();
    this.ngOnInit();
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  createInternalLoan(loanId,mode){
    this.router.navigate(['home/asset/internalLoanCreate/'+loanId+ '/' +mode]);
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchList();
  }

  customSort(event) {
    this.loanReturns.pageNumber = 0;
    this.loanReturns.columnName = event.active;
    this.loanReturns.direction = event.direction;
    this.fetchList();
  }

  dateValidationinstall(event) {
    return false;
  }

  fetchList(){
    this.loanReturns.pageNumber = Number(this.pageIndex);
    this.loanReturns.recordsPerPage = Number(this.pageSize);
    this.loanReturns.sourceScreen='INTERNAL';
    this.subLoader = true;
    this.commonService.commonListService('fetchListOfAllLoanReturns.sams', this.loanReturns).subscribe(
      data => {
        if (data.success) {
          this.subLoader = false;
          this.length = data.responseData.dataTotalRecCount;
          this.loanDataSource = data.responseData.dataList;
        } else {
          this.subLoader = false;
        }
      }, error => {
        this.subLoader = false;
      }

    );
  }

  exportLoan(){
    this.commonService.commonListService('generateLoanReport.sams', this.loanReturns).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      }, error => {
      }
    );
  }

  loadLocationComboData(searchValue) {
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
      this.loanReturns.locationId=0;
      this.loanReturns.locationName='';
      this.locationPageNumber = 1;
      this.locationCombo = [];
    } else {
      this.loanReturns.locationId=event.locationId;
      this.loanReturns.locationName=event.locationName;
    }
  }

  listOfAllAssetGroup(searchKey) {
    this.scrollsyncAssetGroup = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetGroupCombo.sams', searchKey.term, '', '',
      this.recordsPerPageForCombo, this.assetGroupPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchKey, this.assetGroupPageNumber , this.assetGroupCombo , data.responseData.comboList)
          this.assetGroupPageNumber = this.getData.pageNumber;
          this.assetGroupCombo = this.getData.dataList;
          this.scrollsyncAssetGroup = false;
        }
      );
  }

  getAssetGroupComboValue(event) {
    if (event != null) {
      this.loanReturns.assetGroupId = event.assetGroupId;
    } else {
      this.loanReturns.assetGroupId = 0;
      this.assetGroupCombo = [];
      this.assetGroupPageNumber = 1;
    }
  }

  listOfAllModel(searchKey) {
    this.scrollsyncModel = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults('listOfAllModelCombo.sams', searchKey.term, '', '',
      this.recordsPerPageForCombo, this.modelComboPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchKey, this.modelComboPageNumber , this.modelCombo , data.responseData.comboList)
          this.modelComboPageNumber = this.getData.pageNumber;
          this.modelCombo = this.getData.dataList;
          this.scrollsyncModel = false;
        }
      );
  }

  getModelComboValue(event) {
    if (event != null) {
      this.loanReturns.modelId = event.modelId;
    } else {
      this.loanReturns.modelId = 0;
      this.modelCombo = [];
      this.modelComboPageNumber = 1;
    }
  }

    //SEARCH
    loadLoanCodeComboData(searchValue){
      this.scrollsyncLoan = true;
      this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
      this.commonService.getComboResults('listOfAllLoanCodeForCombo.sams', searchValue.term, '', '',
        this.recordsPerPageForCombo, this.loanPageNumber,'INTERNAL').subscribe(
          (data) => {
            this.getData = new getData();
            this.getData = this.commonService.fetchDataList(searchValue, this.loanPageNumber , this.loanComboList , data.responseData.comboList)
            this.loanPageNumber = this.getData.pageNumber;
            this.loanComboList = this.getData.dataList;
            this.scrollsyncLoan = false;
          }
        );
    }

    loanIdList =[];
    pushLoanId(loanId,fromLocationId,toLocationId,assetId){
      let indexValue = this.commonService.getIndexOfTheItem(this.loanIdList, true, 'loanId', loanId);
      if(fromLocationId!=toLocationId){
        if(indexValue==-1){
          this.loanIdList.push({'loanId':loanId,'generateGatePass':true,'assetId':assetId});
        }else{
          this.loanIdList.splice(indexValue,1);
        }
      }else{
        if(indexValue==-1){
          this.loanIdList.push({'loanId':loanId,'generateGatePass':false,'assetId':assetId});
        }else{
          this.loanIdList.splice(indexValue,1);
        }
      }

      if (this.loanIdList.length != 0) {
        this.enableBtn = false;
      }else{
        this.enableBtn = true;
      }
    }

    approveOrRejectLoan(mode){
        if(mode=='APPROVED'){
          this.loanReturns.loanStatusUpdateId=allloanStatus.LOAN_APPROVED;
          this.loanReturns.assetStatusPreviousId=allassetStatus.IN_STOCK;
        }else if(mode=='REJECTED'){
          this.loanReturns.loanStatusUpdateId=allloanStatus.LOAN_REJECTED;
          this.loanReturns.assetStatusPreviousId=allassetStatus.IN_USE;
          this.loanReturns.generateGatePass=false;
        }
      this.loanReturns.loanIdList=this.loanIdList;

      this.commonService.commonInsertService('updateApprovalStatusForInternalLoans.sams', this.loanReturns).subscribe(
        data => {
          if (data.success) {
            this.commonService.openToastSuccessMessage(data.message);
            this.ngOnInit();
          }else{
            this.commonService.openToastErrorMessage(data.message);
          }
        }, error => {
        }
      );

    }

    generatePDFForLoan(loanId: number) {
      this.commonService.commonGetService('generateLoanPDF.sams', loanId).subscribe(
        data => {
          if (data.success) {
            this.downloadDocument(data.responseData, 'application/pdf');
            this.commonService.openToastSuccessMessage('Internal Loan Pdf report downloaded successfully.');
          } else {
            this.commonService.openToastWarningMessage('Failed to download Internal Loan Pdf.');
          }
        }, error => {
        }
      );
    }

    downloadDocument(filePath: string, contentType: string) {
      const fileName = filePath.split('.')[0];
      this.commonService.downloadFile(filePath, contentType).subscribe(
        data => {
          this.commonService.showDownloadPopUp(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
        }
      );
    }

    selectInternalLoanAsset(element){
        if(this.selectedItem == element.loanId){
          this.selectedItem = 0;
          this.selectedLoanStatusId = '';
        }else{
          this.selectedItem = element.loanId;
          this.selectedLoanStatusId = element.loanStatusId;
        }
    }

    loadStatusComboData(searchValue) {
      this.scrollsyncLoanstatus = true;
      this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
      this.commonService.getComboResults('listAllMasterStatusCombo.sams', searchValue.term, processList.ASSET_LOAN_AND_RETURN, '',
        this.recordsPerPageForCombo, this.loanStatusPageNumber).subscribe(
          (data) => {
            this.getData = new getData();
            this.getData = this.commonService.fetchDataList(searchValue, this.loanStatusPageNumber , this.loanStatusList , data.responseData.comboList)
            this.loanStatusPageNumber = this.getData.pageNumber;
            this.loanStatusList = this.getData.dataList;
            this.scrollsyncLoanstatus = false;
          }
        );
    }

    getLoanStatusValue(event){
      if(event === undefined){
        this.loanReturns.loanStatusId=0;
        this.loanReturns.loanStatus = '';
        this.loanStatusPageNumber = 1;
        this.loanStatusList = [];
      }else{
        this.loanReturns.loanStatus = event.processStatusName;
        this.loanReturns.loanStatusId=event.processStatusId;
      }
    }

    selectedAllLoans: boolean = false;

    selectAllLoans(event){
      this.selectedAllLoans = event.checked;
      //this.enableActionBtn = false;
  
      if(event.checked){
        this.selectedItem = this.loanDataSource;
      }
      else{
        this.selectedItem = [];
      }
  
      if(this.selectedItem.length === 1){
        //this.enableActionBtn = false;
      }
      else{
        //this.enableActionBtn = true;
      }
    }

    

    transformStatus(status: string | undefined): string {
      return status ? status.trim().replace(/ /g, '-') : '';
    }
}
