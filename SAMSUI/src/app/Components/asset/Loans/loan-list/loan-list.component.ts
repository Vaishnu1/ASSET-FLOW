import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanReturnsModel } from 'src/app/Model/asset/loanReturns';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { allloanStatus } from 'src/app/Constants/AllStatusConstants';
import { getData } from 'src/app/Model/common/fetchListData';
import { ReturnRequestPopupComponent } from '../return-request-popup/return-request-popup.component';
import { ConfirmConfirmationComponent } from 'src/app/Components/Common-components/confirm-confirmation/confirm-confirmation.component';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { processList } from 'src/app/Constants/ProcessList';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { UserPrefernce } from 'src/app/Services/user-preference/user-preference';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {

  //Set Page Title
  title = 'Asset Optima - Loan/Return';

  defaultColumns = ['select', 'sno','locationName','loanNo','loanedTo','assetCode','fromDt','loanStatus','approvalStatus'];
  displayedColumns = [...this.defaultColumns];


  loanDataSource = [];

  subLoader: boolean = false;

   //For Pagination
   length: String = '0';     //set total record count here
   pageIndex: String;  //set page number starts with zeroo
   pageSize: String;   // records per page
   recordsPerPageForCombo: string;

  //COMBO
  loanComboList: any = [];
  loanPageNumber: number;
  scrollsyncLoan: boolean = false;
  scrollsyncLoanstatus: boolean = false;

  loanStatusList: any=[];
  loanStatusPageNumber: number;

  assetCodeCombo: any=[];
  assetCodePageNumber: number;
  scrollsyncAssetCode:boolean=false;

  modelCombo: any=[];
  modelComboPageNumber: number;
  scrollsyncModel:boolean=false;

  locationPageNumber: number;
  scrollsyncLocation: boolean = false;
  locationCombo: any = [];

  scrollSuppliersync: boolean = false;
  supplierListPageNumber: number;
  supplierList: any = [];

  scrollManufacturersync: boolean = false;
  manufacturerListPageNumber: number;
  manufacturerList: any = [];

  scrollCustomersync: boolean = false;
  customerListPageNumber: number;
  customerList: any =[];

  scrollsyncEmployee: boolean = false;
  employeePageNumber: number;
  employeeCombo: any = [];

  scrollCustomerLocationSync: boolean = false;
  customerLocationListPageNumber: number;
  customerLocationCombo: any = [];
  modelAccessModule: ModuleAccessModel;

   public loanReturns: LoanReturnsModel;

   loanReject: any;
   loanReturn: any;

   enableActionBtn: boolean=true;

   loanTypeList = [
    { id: 1, name: 'RENTAL' },
    { id: 2, name: 'LEASE' },
    { id: 3, name: 'LOAN' }
  ];
  getData: getData;
  selectedItem: any=0;
  selectAllLoan: any;
  approve: any;
  employeeId: any;
  status: string;

  //USER PREFERENCE
  public userPreference: UserPrefernce;
  showManageColumns: boolean = false;

  constructor(private router: Router,
              private commonService: CommonService,
              private readonly userSession: UserSessionService,
              private titleService: Title,
              private dialog: MatDialog,
              private assetOptimaConstants: AssetOptimaConstants,
              private assetOptimaServices:AssetOptimaServices,
              private translateService: TranslateService) {
                this.loanReject= allloanStatus.LOAN_REJECTED;
                this.loanReturn= allloanStatus.RETURNED;
    this.loanPageNumber=1;
    this.loanStatusPageNumber=1;
    this.assetCodePageNumber=1;
    this.modelComboPageNumber=1;
    this.locationPageNumber=1;
    this.supplierListPageNumber=1;
    this.manufacturerListPageNumber=1;
    this.customerListPageNumber=1;
    this.employeePageNumber=1;
    this.customerLocationListPageNumber=1;
    this.loanReturns = new LoanReturnsModel();
    this.modelAccessModule = new ModuleAccessModel();

    
    this.showManageColumns = false;
    this.userPreference = new UserPrefernce();
  }

  ngOnInit() {
    this.employeeId = this.userSession.getUserEmpId();
    this.enableActionBtn = true;
    this.selectedLoanList=[];
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_EXTERNAL_LOANS'];
    this.titleService.setTitle(this.title);
    this.pageSize = '100';
    this.pageIndex = '0';

    this.loanReturns.locationId=this.userSession.getUserLocationId();
    this.loanReturns.locationName=this.userSession.getUserLocationName();
    this.loanReturns.sourceScreen='EXTERNAL';
    this.loanReturns.loanStatusId=0;
    this.loanReturns.loanStatus = '';
    // this.fetchList();

    this.loanReturns.direction = 'desc';
    this.loanReturns.columnName = 'updatedDt';

    this.userPreference.moduleKey = 'GROUPACCESS_EXTERNAL_LOANS';
    // this.getUserPreferenceInfo();

    let userPreferenceData = this.getUserPreferenceInfo();
    userPreferenceData.then((response) => {
      this.fetchList();
      this.adjustTableWidth();
    })
  }

  createAssetLoan(mode){
    if (mode !== 'create') {
      this.router.navigate(['home/asset/loanReturnRequesCreate/'+ this.selectedLoanList[0].loanId +'/'+mode]);
    }else{
      this.router.navigate(['home/asset/loanReturnRequesCreate/'+ 0 + '/' + mode]);
    }
  }

  searchLoans(){
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
    this.selectedItem=0;
  }

  clear(){
    console.log("abc");
    this.loanReturns = new LoanReturnsModel();
    this.ngOnInit();
    this.selectedItem=0;
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

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  loanToOptions = [
    { id: 2, name: 'CUSTOMER' },
    { id: 1, name: 'EMPLOYEE' },
    { id: 3, name: 'SUPPLIER' },
    { id: 4, name: 'OTHERS' },
    { id: 5, name: 'BRANCH' },
    { id: 6, name: 'MANUFACTURER' },
  ];

  fetchList(){
    this.subLoader =true;
    this.loanReturns.pageNumber = Number(this.pageIndex);
    this.loanReturns.recordsPerPage = Number(this.pageSize);
    if(this.loanReturns.createdDtDisp !== '' || this.loanReturns.createdDtDisp !== null){
      this.loanReturns.createdDtDisp = this.commonService.convertToDateStringyyyy_mm_dd(this.loanReturns.createdDtDisp);
    }

    this.commonService.commonListService('fetchListOfAllLoanReturns.sams', this.loanReturns).subscribe(
      data => {
        if (data.success) {

          this.length = data.responseData.dataTotalRecCount;
          this.loanDataSource = data.responseData.dataList;

          this.subLoader =false;
        } else {
          this.subLoader =false;
        }
      }

    );
  }

  //SEARCH
  loadLoanCodeComboData(searchValue){
    if(searchValue == 'clear'){
      this.loanReturns.loanNo = '';
      this.loanPageNumber = 1;
    }
    this.scrollsyncLoan = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllLoanCodeForCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.loanPageNumber,'EXTERNAL').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.loanPageNumber , this.loanComboList , data.responseData.comboList)
          this.loanPageNumber = this.getData.pageNumber;
          this.loanComboList = this.getData.dataList;
          this.scrollsyncLoan = false;
        }
      );
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
        this.scrollsyncAssetCode = false;
     }
    );
  }

  selectedAssetCodeData(event) {
    if(event===undefined){
      this.loanReturns.assetId=0;
      this.loanReturns.assetCode='';
      this.assetCodePageNumber=1;
      this.assetCodeCombo=[];
    }else{
      this.loanReturns.assetId=event.assetHdrId;
      this.loanReturns.assetCode=event.assetCode;;
    }
  }

  listOfAllModel(searchKey) {
    this.scrollsyncModel=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults('listOfAllModelCombo.sams', searchKey.term, '', '',this.recordsPerPageForCombo, this.modelComboPageNumber).subscribe(
    (data) => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchKey, this.modelComboPageNumber , this.modelCombo , data.responseData.comboList)
      this.modelComboPageNumber = this.getData.pageNumber;
      this.modelCombo = this.getData.dataList;
      this.scrollsyncModel = false;
    });
  }

  getModelComboValue(event) {
    if (event != null) {
      this.loanReturns.modelId=event.modelId;
      this.loanReturns.modelName=event.modelName;
    }else{
      this.loanReturns.modelId=0;
      this.loanReturns.modelName='';
      this.modelCombo=[];
      this.modelComboPageNumber=1;
    }
  }

  fromDateValidation(event){
    if(event.value){
      this.loanReturns.fromDtDisp = moment(event.value).format(this.assetOptimaConstants.ISODate);
    }
    else{
      this.loanReturns.fromDtDisp = "";
    }
    return false;
  }
  toDateValidation(event){
    if(event.value){
      this.loanReturns.toDtDisp = moment(event.value).format(this.assetOptimaConstants.ISODate);
    }
    else{
      this.loanReturns.toDtDisp = "";
    }
    return false;
  }
  loanRequestedDateValidation(event){
    if(event.value){
      this.loanReturns.createdDtDisp = moment(event.value).format(this.assetOptimaConstants.ISODate);
    }
    else{
      this.loanReturns.createdDtDisp = "";
    }
    return false;
  }

  generateReportForLoan(){
    this.commonService.commonListService('generateLoanReport.sams', this.loanReturns).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      }, error => {
      }
    );
  }

  raiseReturnRequestPopUp;
  openPopUpForReturnRequest(id,sourceScreen){
    this.raiseReturnRequestPopUp = this.dialog.open(ReturnRequestPopupComponent, {
      height: '500px',
      width: '500px',
      data: { 'loanId' : id,
              'assetId': this.loanReturns.assetId,
              'accessoriesList' : [],
              'childAssetList': [],
              'sourceScreen': sourceScreen
               }
    });
    this.raiseReturnRequestPopUp.disableClose = true;
    this.raiseReturnRequestPopUp.afterClosed().subscribe(
      data => {
        this.ngOnInit();
      });
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

  listOfSupplier(searchValue) {
    this.scrollSuppliersync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllSupplierNameCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.supplierListPageNumber, '', '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.supplierListPageNumber , this.supplierList , data.responseData.comboList)
          this.supplierListPageNumber = this.getData.pageNumber;
          this.supplierList = this.getData.dataList;
          this.scrollSuppliersync = false;
        }
      );
  }

  setSupplierData(event) {
    if (event === undefined) {
      this.loanReturns.loanedToId=0;
      this.supplierListPageNumber = 1;
      this.supplierList = [];
    } else {
      this.loanReturns.loanedToId=event.supplierId;
    }
  }

  listOfManufacturer(searchValue) {
    this.scrollManufacturersync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllManufacturerCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.manufacturerListPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.manufacturerListPageNumber , this.manufacturerList , data.responseData.comboList)
          this.manufacturerListPageNumber = this.getData.pageNumber;
          this.manufacturerList = this.getData.dataList;
          this.scrollManufacturersync = false;
        }
      );
  }

  setManufacturerData(event) {
    if (event === undefined) {
      this.loanReturns.loanedToId=0;
      this.supplierListPageNumber = 1;
      this.supplierList = [];
    } else {
      this.loanReturns.loanedToId=event.manufacturerId;
    }
  }

  listOfCustomer(searchValue) {
    this.scrollCustomersync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllCustomerCombo.sams', searchValue.term, '', '',
     this.recordsPerPageForCombo, this.customerListPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.customerListPageNumber , this.customerList , data.responseData.comboList)
        this.customerListPageNumber = this.getData.pageNumber;
        this.customerList = this.getData.dataList;
        this.scrollCustomersync = false;
      }
    );
  }

  setCustomerData(event) {
    if (event === undefined) {
      this.loanReturns.loanedToId=0;
      this.customerListPageNumber = 1;
      this.customerList = [];
    } else {
      this.loanReturns.loanedToId=event.customerId;
    }
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

  selectedLocationLoanData(event) {
    if (event === undefined) {
      this.loanReturns.loanedToId=0;
      this.locationCombo = [];
      this.locationPageNumber = 1;
    } else {
      this.loanReturns.loanedToId=event.locationId;
    }
  }

  listOfEmployeeName(searchKey) {
    this.scrollsyncEmployee = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults('listAllEmployeeForOrgCombo.sams', searchKey.term, '', '',
      this.recordsPerPageForCombo, this.employeePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchKey, this.employeePageNumber , this.employeeCombo , data.responseData.comboList)
          this.employeePageNumber = this.getData.pageNumber;
          this.employeeCombo = this.getData.dataList;
          this.scrollsyncEmployee = false;
        });
  }


  selectedEmployee(event) {
    if (event === undefined) {
      this.loanReturns.loanedToId=0;
      this.employeeCombo=[];
      this.employeePageNumber=1;
    } else {
      this.loanReturns.loanedToId=event.employeeId;
    }
  }

  listOfCustomerLocation(searchValue) {
    this.scrollCustomerLocationSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllCustomerSiteCombo.sams', searchValue.term, 0, '', this.recordsPerPageForCombo, this.customerLocationListPageNumber,'').subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.customerLocationListPageNumber , this.customerLocationCombo , data.responseData.comboList)
        this.customerLocationListPageNumber = this.getData.pageNumber;
        this.customerLocationCombo = this.getData.dataList;
        this.scrollCustomerLocationSync = false;
      }
    );
  }

  selectedCustomerLocationData(event) {
    if (event === undefined) {
      this.loanReturns.loanedToSiteId=0;
      this.loanReturns.loanedToSiteName='';
      this.customerLocationListPageNumber = 1;
      this.customerLocationCombo = [];
    } else {
      this.loanReturns.loanedToSiteId=event.customerSiteId;
      this.loanReturns.loanedToSiteName=event.custNameDispVal;
    }
  }

  clearAllFields(){
    this.loanReturns.loanedToSiteId=0;
    this.loanReturns.loanedToSiteName='';
    this.loanReturns.loanedToId=0;
  }

  selectedLoanList=[];
  selectLoan(element){

    const loanId = this.selectedLoanList.findIndex(data => data.loanId === element.loanId);

    this.enableActionBtn = false;
    if(loanId === -1){
      this.selectedLoanList.push(element);
    }else{
      this.selectedLoanList.splice(loanId,1);
    }

    if(this.selectedLoanList.length === 1){
      this.enableActionBtn = false;
    }
    else{
      this.enableActionBtn = true;
    }
  }

  selectAllLoans(event){
    this.selectAllLoan = event.checked;
    this.enableActionBtn = false;

    if(event.checked){
      this.selectedLoanList = this.loanDataSource;
    }
    else{
      this.selectedLoanList = [];
    }

    if(this.selectedLoanList.length === 1){
      this.enableActionBtn = false;
    }
    else{
      this.enableActionBtn = true;
    }
  }

  checkApprovalValid(){
    let checkApprovalVal = true;
    let status = 0;
    if(this.selectedLoanList.length>0){

      status = this.selectedLoanList[0].loanStatusId;
      for(let i=0;i<this.selectedLoanList.length;i++){
        if((this.selectedLoanList[i].loanStatusId === allloanStatus.REQUESTED_FOR_LOAN || this.selectedLoanList[i].loanStatusId === allloanStatus.REQUEST_FOR_RETURN) && status == this.selectedLoanList[i].loanStatusId && this.selectedLoanList[i].approvalId > 0){
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

  checkEditValid(){
    if(this.selectedLoanList.length === 1){
      if(this.selectedLoanList[0].loanStatusId == allloanStatus.LOAN_REJECTED || this.selectedLoanList[0].loanStatusId == allloanStatus.RETURNED){
        return true;
      }else{
        return false;
      }
    }
    else
      return true;
  }

  compareValue(element: any): boolean{
    return this.selectedLoanList.findIndex(data => data.loanId === element.loanId) !== -1;
  }

  confirmLoanApprove() {
    const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'confirmHeading': 'Confirmation',
        'confirmMsg': 'Are You Sure To Approve This Record?'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status === true) {
          this.status = "APPROVED";
          this.updateLoanOrReturnStatus(this.status);
        }
      });
  }

  updateLoanOrReturnStatus(status) {
    let loanIdList = {selectedLoanList: [],status: status,selectedApprovalList : [],loanStatusId : this.selectedLoanList[0].loanStatusId};
    for(let i=0; i<= this.selectedLoanList.length-1 ; i++){
      loanIdList.selectedLoanList.push(this.selectedLoanList[i].loanId);
      loanIdList.selectedApprovalList.push(this.selectedLoanList[i].approvalId);
    }
    this.commonService.commonInsertService(this.assetOptimaServices.updateLoanOrReturnStatus,loanIdList).subscribe(
      data=>{
        if(data.success){
            this.commonService.openToastSuccessMessage(data.message);
            this.ngOnInit();
        }
      },error =>{
      }
    );
  }

  rejectLoanApprove() {
    const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'confirmHeading': 'Confirmation',
        'confirmMsg':'Are You Sure To Reject This Record?'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status === true) {
          this.status = "REJECT PERMANENTLY";
          this.updateLoanOrReturnStatus(this.status);
        }
      });
  }


  listOfLoanStatus(searchValue){
    this.scrollsyncLoanstatus=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '5' : '';
    this.commonService.getComboResults('listOfAllLoanStatusCombo.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.loanStatusPageNumber).subscribe(
      (data) => {
        if (data.success) {
          this.loanStatusList = data.responseData.comboList;
          this.loanStatusList.length !== 0 ? this.loanStatusPageNumber += 1 : this.loanStatusPageNumber = 1;
        }
        this.scrollsyncLoanstatus=false;
      }
    );
  }

  loadStatusComboData(searchValue) {
    this.scrollsyncLoanstatus = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllMasterStatusCombo.sams', searchValue.term, processList.ASSET_LOAN_AND_RETURN, '',
      this.recordsPerPageForCombo, this.loanStatusPageNumber).subscribe(
        (data) => {
          console.log(data.responseData.comboList);

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
      this.translateService.get([event.processStatusName])
      .subscribe((val) => {
        const status = Object.values(val)
        if(status.length > 0){
          this.loanReturns.loanStatus = status[0].toString();
        }
      });
      this.loanReturns.loanStatusId=event.processStatusId;
    }
  }

  toggleColumn(column: string): void {
    const index = this.displayedColumns.indexOf(column);
    if (index >= 0) {
      this.displayedColumns.splice(index, 1); // Column is selected, remove it
    } else {
      this.displayedColumns.push(column); // Column is not selected, add it
    }

    this.adjustTableWidth();
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

    this.adjustTableWidth();
  }
  
  getUserPreferenceInfo() {
    let userPreferenceInfo = new Promise((resolve) => {
      this.commonService.commonInsertService(this.assetOptimaServices.fetchUserPreferenceInfo, this.userPreference).subscribe(
        data => {
          if(data.responseData !== undefined) {
            this.userPreference = data.responseData;
            if(this.userPreference.customColumnsList.length>0) {
              this.displayedColumns = this.userPreference.customColumnsList;
            }
            this.loanReturns = JSON.parse(this.userPreference.customFilters);
          }
          resolve(true);
        }
      )
    });
    return userPreferenceInfo;
    
  }
  
  applyPreferredFilters() {
    //SAVE TO USER PREFERENCE TABLE
    this.userPreference.customFilters = JSON.stringify(this.loanReturns);
    this.commonService.commonInsertService(this.assetOptimaServices.saveOrUpdateUserPreference, this.userPreference).subscribe(
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
  
  // for dynamica table alignment
  adjustTableWidth() {

    if(this.displayedColumns.length > 12){
      document.getElementById("loanListTable").style.minWidth = "150%";
    }else{
      document.getElementById("loanListTable").style.minWidth = "100%";
    }

  }

}
