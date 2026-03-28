import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ContractHeaderModel } from 'src/app/Model/master/contract';
import { MatDialog } from '@angular/material/dialog';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { BaseModel } from 'src/app/Model/base/baseModel';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { Title } from '@angular/platform-browser';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { getData } from 'src/app/Model/common/fetchListData';
import { allContractStatus, allPreInwardStatus, allWorkflowStatus } from 'src/app/Constants/AllStatusConstants';
import { ConfirmConfirmationComponent } from 'src/app/Components/Common-components/confirm-confirmation/confirm-confirmation.component';
import * as moment from 'moment';
import { processList } from 'src/app/Constants/ProcessList';
import { TranslateService } from '@ngx-translate/core';
import { RejectConfirmationComponent } from 'src/app/Components/Common-components/reject-confirmation/reject-confirmation.component';
import { CancelConfirmationComponent } from 'src/app/Components/Common-components/cancel-confirmation/cancel-confirmation/cancel-confirmation.component';
import { UserPrefernce } from 'src/app/Services/user-preference/user-preference';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {

  //Set Page Title
  title = 'Asset Optima - Contract';

  contractList : ContractHeaderModel[];
  contractHeaderModel : ContractHeaderModel;

  pageIndex: String;//set page number starts with zero
  pageSize: String;// records per page
  length: String;//set total record count here

  subLoader : boolean = false;

  // contractTable = ['select','sNo','locationName','contractNo','coverageType','contractType','contractStatus','woApprovalStatus','contractingPartyType','contractPartyName', 'daysElapsed','contractStartDt','contractEndDt','active','netContractValue','updatedInfo'];

  defaultColumns = ['select','sNo','locationName','contractNo','coverageType','contractType','contractStatus','woApprovalStatus','contractingPartyType','contractPartyName', 'daysElapsed','contractStartDt','contractEndDt','active','netContractValue','updatedInfo'];
  displayedColumns = [...this.defaultColumns];

  //USER PREFERENCE
  public userPreference: UserPrefernce;
  showManageColumns: boolean = false;

  intervalBasedContract = [
    { id: 1, name: '0-30 DAYS' },
    { id: 2, name: '31-60 DAYS' },
    { id: 3, name: '61-90 DAYS' },
    { id: 4, name: '>90 DAYS' }
  ];

  contractingPartyType = [
    { id: 1, name: 'MANUFACTURER' },
    { id: 2, name: 'SUPPLIER' },
    { id: 3, name: 'CUSTOMER' }
  ];

  //COMBO
  locationCombo: any = [];
  locationPageNumber: number;
  scrollsyncLocation: boolean = false;

  contractStatusPageNumber: number;
  contractStatusCombo: any = [];
  scrollsynccontractStatus: boolean = false;

  supplierList: any = [];
  supplierListPageNumber: number;
  scrollSuppliersync: boolean = false;

  scrollCustomersync: boolean = false;
  customerListPageNumber: number;
  customerList: any =[];

  scrollManufacturersync: boolean = false;
  manufacturerListPageNumber: number;
  manufacturerList: any =[];

  scrollCoverageTypeSync: boolean = false;
  coverageTypePageNumber: number;
  coverageTypeList: any = [];

  scrollContractTypeSync: boolean = false;
  contractTypePageNumber: number;
  contractTypeList: any = [];

  recordsPerPageForCombo: string;

  modelAccessModule: ModuleAccessModel;
  getData: getData;
  selectedItem: any;
  employeeId: any;
  enableEditBtn: boolean;
  enableViewBtn: boolean;

  selectAllContract: any[];
  status: string;

  multiSelectFlag : boolean = false;
  selectedContractListLength : number = -1;
  contractCancelList: any = [];

  processStatusCombo1: any = [];
  scrollSyncProcessStatus: boolean = false;
  processStatusPageNumber1: number;

  previousSelectedLocations : any[] = [];

  constructor( private assetOptimaServices : AssetOptimaServices,
                private commonService:CommonService,
                private router: Router,
                private titleService: Title,
                private dialog: MatDialog,
                private userSessionService: UserSessionService,
                private assetOptimaConstants: AssetOptimaConstants,
                private translateService: TranslateService,
                public assetOptimeMthnd: AssetOptimaServices,
                private samsService: AssetOptimaServices,
                private activatedRoute: ActivatedRoute) {
      this.modelAccessModule = new ModuleAccessModel();
      this.contractHeaderModel = new ContractHeaderModel();
      this.locationPageNumber = 1;
      this.supplierListPageNumber = 1;
      this.customerListPageNumber = 1;
      this.manufacturerListPageNumber = 1;
      this.coverageTypePageNumber = 1;
      this.contractTypePageNumber = 1;
      this.contractStatusPageNumber = 1;

      this.processStatusPageNumber1 = 1;
    }

  ngOnInit() {
    this.employeeId = this.userSessionService.getUserEmpId();
    this.selectAllContract = [];
    this.enableEditBtn = true;
    this.enableViewBtn = true;
    this.modelAccessModule = this.userSessionService.getUserGroupAccess()['GROUPACCESS_CONTRACT'];
    this.titleService.setTitle(this.title);
    this.pageSize = '100';
    this.pageIndex = '0';
    this.selectedItem = {};

    // if(localStorage.getItem('locationId') !== null && localStorage.getItem('locationName') !== null){
    //   this.contractHeaderModel.locationId = parseInt(localStorage.getItem('locationId'));
    //   this.contractHeaderModel.locationName = localStorage.getItem('locationName');
    // }else{
    //   this.contractHeaderModel.locationName = this.userSessionService.getUserLocationName();
    //   this.contractHeaderModel.locationId = this.userSessionService.getUserLocationId();
    // }
    // localStorage.removeItem('locationId');
    // localStorage.removeItem('locationName');
    // if(localStorage.getItem('CONTRACT_SEARCH_PARAMETER') == null) {
      
    //   this.contractHeaderModel.locationName = this.userSessionService.getUserLocationName();
    //   this.contractHeaderModel.locationId = this.userSessionService.getUserLocationId();
    //   this.contractHeaderModel.direction = 'desc';
    //   this.contractHeaderModel.columnName = 'updatedDt';
    //   this.contractHeaderModel.contractStatusId = 1701;
    //   this.contractHeaderModel.contractStatus = 'APPROVAL PENDING';
    // } else {
     
    //   this.contractHeaderModel = JSON.parse(localStorage.getItem('CONTRACT_SEARCH_PARAMETER'));
    // }

    this.contractHeaderModel.locationName = this.userSessionService.getUserLocationName();
      this.contractHeaderModel.locationId = this.userSessionService.getUserLocationId();
      this.contractHeaderModel.direction = 'desc';
      this.contractHeaderModel.columnName = 'updatedDt';
      this.contractHeaderModel.contractStatusId = 1701;
      this.contractHeaderModel.contractStatus = 'APPROVAL PENDING';

    this.userPreference = new UserPrefernce();
    this.userPreference.moduleKey = 'GROUPACCESS_CONTRACT';
    // this.getUserPreferenceInfo();

    let userPreferenceData = this.getUserPreferenceInfo();
    userPreferenceData.then((response) => {

      this.ngAfterContentInit();

      this.loadContractList();
    })
    
    // this.loadContractList();
    this.selectedContractList=[];
  }

  contractAddEdit(mode) {
    if (mode !== 'add') {
      this.router.navigate(['home/asset/contractCreate/'+ this.selectedContractList[0].contractHdrId +'/'+mode+ '/' +'contract']);
    }else{
      this.router.navigate(['home/asset/contractCreate/'+ 0 + '/' + mode+ '/' +'contract']);
    }
  }

  downloadDocument(filePath: string, contentType: string) {
    var fileName = filePath.split('.')[0];
    this.commonService.downloadFile(filePath, contentType).subscribe(
      data => {
        let file = filePath.split('.');
        this.commonService.showDownloadPopUp(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
      }
    );
  }

  generateContractPDF() {
    this.commonService.commonGetService('generateContractPDF.sams', this.selectedContractList[0].contractHdrId).subscribe(
      data => {
        if (data.success) {
          this.downloadDocument(data.responseData, 'application/pdf');
        } else {
        }
      }, error => {
      }
    );
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadContractList();
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  customSort(event) {
    this.contractHeaderModel.pageNumber = 0;
    this.contractHeaderModel.columnName = event.active;
    this.contractHeaderModel.direction = event.direction;
    this.loadContractList();
  }

  searchContract() {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.loadContractList();
    this.selectedItem={};

    this.applyPreferredFilters();
  }

  clear(){
    this.contractHeaderModel = new ContractHeaderModel();
    localStorage.removeItem('CONTRACT_SEARCH_PARAMETER');

    this.contractHeaderModel.direction = 'desc';
    this.contractHeaderModel.columnName = 'updatedDt';
    this.applyPreferredFilters();

    // this.ngOnInit();
    this.loadContractList();
    this.selectedItem={};
  }

  loadContractList() {


    
    this.activatedRoute.params.subscribe(
      params => {
        var coverageType = params.coverage;
        if(coverageType != undefined && coverageType != ''){
          this.contractHeaderModel.coverageType=coverageType;
          this.contractHeaderModel.intervalBasedContract=params.expiringFrom;
          this.contractHeaderModel.contractStatus='APPROVED';
          this.contractHeaderModel.contractStatusId=allContractStatus.CONTRACT_APPROVED;
        }
      }
    );
     this.contractHeaderModel.pageNumber = Number(this.pageIndex);
     this.contractHeaderModel.recordsPerPage = Number(this.pageSize);

     this.subLoader = true;
     this.contractList = [];

      this.commonService.commonListService("fetchListOfAllContract.sams", this.contractHeaderModel).subscribe(
      data => {
          if(data.success){
            this.contractList = data.responseData.dataList;
            this.contractList.forEach((element) => {
              const startDate = new Date();
              const endDate = new Date(this.commonService.convertSstringdd_mm_yyyy_To_yyyy_mm_dd(element.contractEndDtDisp));
              if (!isNaN(endDate.getTime())) {
                const timeDiff = endDate.getTime() - startDate.getTime();
                element.daysElapsed =(Math.ceil(timeDiff / (1000 * 3600 * 24))) >= 0 ? (Math.ceil(timeDiff / (1000 * 3600 * 24))): 0;
              } else {
                element.daysElapsed = 0;
              }
            });
            this.length = data.responseData.dataTotalRecCount;
            this.subLoader =false;
            localStorage.setItem('CONTRACT_SEARCH_PARAMETER', JSON.stringify(this.contractHeaderModel));
          }else{
            this.subLoader =false;
          }
        },error =>{
          this.subLoader =false;
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

  // selectedLocationData(event) {
  //   if (event === undefined) {
  //     this.contractHeaderModel.locationName = '';
  //     this.contractHeaderModel.locationId = 0;
  //     this.locationPageNumber = 1;
  //     this.locationCombo = [];
  //   } else {
  //     this.contractHeaderModel.locationName = event.locDisplayField;
  //     this.contractHeaderModel.locationId = event.locationId;
  //   }
  // }
  selectedLocationData(event) {
    if (event === undefined || event.length <=0) {
      this.contractHeaderModel.locationName = '';
      this.contractHeaderModel.locationId = 0;
      this.locationPageNumber = 1;
      this.locationCombo = [];


      this.contractHeaderModel.selectedLocationIds = []; 
      this.previousSelectedLocations = []; 
    } else {
      this.contractHeaderModel.locationName = event.locDisplayField;
      this.contractHeaderModel.locationId = event.locationId;

      // Find removed item
      if (this.previousSelectedLocations.length > event.length) {
        // Convert event array to a list of display names
         const currentLocationNames = event.map(location => location.locDisplayField);
         // Find the removed item
         const removedItem = this.previousSelectedLocations.find(
           prevItem => !currentLocationNames.includes(prevItem)
         );
       
         if (removedItem) {
           const removedIndex = this.previousSelectedLocations.indexOf(removedItem);
           this.contractHeaderModel.selectedLocationIds.splice(removedIndex,1);
         }
         // Update the previous selection list
         this.previousSelectedLocations = currentLocationNames;
      }else{
       this.contractHeaderModel.selectedLocationIds = event.map(location => location.locationId);
      }
    
      // Update the previous selection list
      this.previousSelectedLocations = event.map(location => location.locDisplayField);
    }
  }

  changePartyValidation(){
    this.contractHeaderModel.contractPartyId=0;
    this.contractHeaderModel.contractPartyName='';
  }


  listOfSupplier(searchValue) {
    this.scrollSuppliersync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllSupplierNameCombo, searchValue.term, '', '',
this.recordsPerPageForCombo, this.supplierListPageNumber,'','SUPPLIER').subscribe(
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
      this.contractHeaderModel.contractPartyId=0;
      this.contractHeaderModel.contractPartyName='';
      this.supplierListPageNumber = 1;
      this.supplierList = [];
    } else {
      this.contractHeaderModel.contractPartyId=event.supplierId;
      this.contractHeaderModel.contractPartyName=event.supplierName;
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
      this.contractHeaderModel.contractPartyId=0;
      this.contractHeaderModel.contractPartyName='';
      this.customerListPageNumber = 1;
      this.customerList = [];
    } else {
      this.contractHeaderModel.contractPartyId=event.customerId;
      this.contractHeaderModel.contractPartyName=event.customerName;
    }
  }

  listOfManufacturer(searchValue) {
    this.scrollManufacturersync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfManufacturerCombo, searchValue.term, '', '',
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
      this.contractHeaderModel.contractPartyId=0;
      this.contractHeaderModel.contractPartyName='';
      this.manufacturerListPageNumber = 1;
      this.manufacturerList = [];
    } else {
      this.contractHeaderModel.contractPartyId=event.manufacturerId;
      this.contractHeaderModel.contractPartyName=event.manufacturerName;
    }
  }

  startDateValidation(event){
    if(event.value){
      this.contractHeaderModel.contractStartDtDisp = moment(event.value).format(this.assetOptimaConstants.ISODate);
    }
    else{
      this.contractHeaderModel.contractStartDtDisp = "";
    }
    return false;
  }

  endDateValidation(event){
    if(event.value){
      this.contractHeaderModel.contractEndDtDisp = moment(event.value).format(this.assetOptimaConstants.ISODate);
    }
    else{
      this.contractHeaderModel.contractEndDtDisp = "";
    }
    return false;
  }

  listOfCoverageType(searchValue) {
    this.scrollCoverageTypeSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllCoverageTypeCombo.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.coverageTypePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.coverageTypePageNumber , this.coverageTypeList , data.responseData.comboList)
        this.coverageTypePageNumber = this.getData.pageNumber;
        this.coverageTypeList = this.getData.dataList;
        this.scrollCoverageTypeSync = false;
      }
    );
  }

  setCoverageType(event) {
    if (event === undefined) {
      this.contractHeaderModel.coverageType='';
      this.coverageTypePageNumber = 1;
      this.coverageTypeList = [];
    } else{
      this.contractHeaderModel.coverageType=event.coverageTypeName;
    }
  }

  listOfContractType(searchValue) {
    this.scrollContractTypeSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllContractTypeCombo.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.contractTypePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.contractTypePageNumber , this.contractTypeList , data.responseData.comboList)
        this.contractTypePageNumber = this.getData.pageNumber;
        this.contractTypeList = this.getData.dataList;
        this.scrollContractTypeSync = false;
      }
    );
  }

  setContractType(event) {
    if (event === undefined) {
      this.contractHeaderModel.contractType='';
      this.contractTypePageNumber = 1;
      this.contractTypeList = [];
    } else{
      this.contractHeaderModel.contractType=event.contractTypeName;
    }
  }

  exportContract(){
    this.commonService.commonListService('generateContractReport.sams', this.contractHeaderModel).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      }
    );
  }

  selectedContractList=[];
  selectContract(element){

    const contractHdrId = this.selectedContractList.findIndex(data => data.contractHdrId === element.contractHdrId);

    this.enableEditBtn = false;
    this.enableViewBtn = false;
    if(contractHdrId === -1){
      this.selectedContractList.push(element);
    }else{
      this.selectedContractList.splice(contractHdrId,1);
    }

    if(this.selectedContractList.length === 1){
      this.enableEditBtn = this.selectedContractList[0].contractStatusId != allContractStatus.CONTRACT_APPROVAL_PENDING && this.selectedContractList[0].contractStatusId != allContractStatus.CONTRACT_REJECTED && this.selectedContractList[0].contractStatusId != allContractStatus.CONTRACT_APPROVED && this.selectedContractList[0].contractStatusId != allContractStatus.CONTRACT_EXPIRED;
      this.enableViewBtn = false;
    }
    else{
      this.enableEditBtn = true;
      this.enableViewBtn = true;
    }
  }

  selectAllContracts(event){
    this.selectAllContract = event.checked;
    this.enableEditBtn = false;
    this.enableViewBtn = false;

    if(event.checked){
      this.selectedContractList = this.contractList;
    }
    else{
      this.selectedContractList = [];
    }

    if(this.selectedContractList.length === 1){
      this.enableEditBtn = this.selectedContractList[0].contractStatusId != allContractStatus.CONTRACT_APPROVAL_PENDING;
      this.enableViewBtn = false;
    }
    else{
      this.enableEditBtn = true;
      this.enableViewBtn = true;
    }
  }

  checkApprovalValid(){
    if(this.selectedContractList.length>0){
      // return !(this.selectedContractList.findIndex(data => data.contractStatusId !== allContractStatus.CONTRACT_APPROVAL_PENDING ) === -1);
      return !(this.selectedContractList.findIndex(data => data.contractStatusId < 0) === -1)
    }
    else
      return true;
  }

  compareValue(element: any): boolean{
    return this.selectedContractList.findIndex(data => data.contractHdrId === element.contractHdrId) !== -1;
  }

  contractApprove(){
    if(this.selectedContractList.length === 1 && this.selectedContractList[0].approvalId > 0){
      if(this.selectedContractList[0].contractWithoutPrice && this.selectedContractList[0].contractWithoutSupplier){
        if(this.selectedContractList[0].netContractValue <= 0 && this.selectedContractList[0].contractPartyName == ''){
          this.commonService.openToastWarningMessage("Contract Price and Supplier Name is Required ! Kindly Update the Contract Price and Supplier Name");
        }else if(this.selectedContractList[0].netContractValue <= 0){
          this.commonService.openToastWarningMessage("Contract Price is Required ! Kindly Update the Contract Price");
        }else if(this.selectedContractList[0].contractPartyName == ''){
          this.commonService.openToastWarningMessage("Supplier Name is Required! Kindly Update the Supplier Name");
        }else{
          this.confirmContractApprove();
          
        }
      }else if(this.selectedContractList[0].contractWithoutPrice && this.selectedContractList[0].netContractValue <= 0){
        this.commonService.openToastWarningMessage("Contract Price is Required ! Kindly Update the Contract Price");
    }else if(this.selectedContractList[0].contractWithoutSupplier && this.selectedContractList[0].contractPartyName == ''){
      this.commonService.openToastWarningMessage("Supplier Name is Required! Kindly Update the Supplier Name");
    }else{
      this.confirmContractApprove();
      
    }
  }else{
    
    this.selectedContractList = this.selectedContractList.filter(function(element) {
      return (!element.contractWithoutPrice && !element.contractWithoutSupplier) || ((element.contractWithoutPrice && element.netContractValue>0) && (element.contractWithoutSupplier && element.contractPartyName != '')) || 
      ((element.contractWithoutPrice && element.netContractValue>0) && (!element.contractWithoutSupplier)) || ((!element.contractWithoutPrice) && (element.contractWithoutSupplier && element.contractPartyName != ''));
  });

  console.log(this.selectedContractList.length)
  this.confirmContractApprove();
  }
}

  confirmContractApprove() {

    this.selectedContractList = this.selectedContractList.filter(function(element) {
      return element.contractStatusId === 1701 && element.approvalId !== 0;
    });
   
    this.selectedContractListLength =  this.selectedContractList.length;
    const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        confirmHeading: 'Confirmation',
        confirmMsg: 'Are you sure to Approve selected Contract?',
        note : 'Note : Only OSPR under your queue will be Approved',
        selectedElementListLength: this.selectedContractListLength 
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(data => {
      if (data.status === true) {
        this.multiSelectFlag = false;
        this.status = 'APPROVED';
        this.updateContractStatus(this.status, '');
       
      }else{
        this.multiSelectFlag = false;
        this.selectedContractList = [];
        
      }
    });
  }

  rejectContractApprove() {
    this.selectedContractList = this.selectedContractList.filter(function(element) {
      // return element.contractStatusId === 1701 && element.approvalId !== 0;
      return element.approvalId !== 0;
    });
    
    this.selectedContractListLength =  this.selectedContractList.length;
    const dialogRef = this.dialog.open(RejectConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        confirmHeading: 'Confirmation',
        confirmMsg: 'Are you sure to Reject selected Contract?',
        note : 'Note : Only OSPR under your queue will be Rejected',
        selectedElementListLength: this.selectedContractListLength
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status === true) {
          this.multiSelectFlag = false;
          this.status = 'REJECT PERMANENTLY';
          let rejectReason = data.reason;
          this.updateContractStatus(this.status, rejectReason);
        }else{
          this.multiSelectFlag = false;
          this.selectedContractList = [];
        }
      }
    );
  }
  

  updateContractStatus(status,rejectReason) {
    this.commonService.showSpinner();
    let contractList = {selectedContractList: [],status: status,selectedApprovalList : [],rejectReason : rejectReason};
    for(let i=0; i<= this.selectedContractList.length-1 ; i++){
      contractList.selectedContractList.push(this.selectedContractList[i].contractHdrId);
      contractList.selectedApprovalList.push(this.selectedContractList[i].approvalId);
    }
    this.commonService.commonInsertService(this.assetOptimaServices.updateContractStatus, contractList).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage(data.message);
          this.ngOnInit();
          this.commonService.hideSpinner();
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.commonService.hideSpinner();
        }
      });
  }


  loadStatusComboData(searchValue) {
    this.scrollsynccontractStatus = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllMasterStatusCombo.sams', searchValue.term, processList.ASSET_CONTRACT, '',
      this.recordsPerPageForCombo, this.contractStatusPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.contractStatusPageNumber , this.contractStatusCombo , data.responseData.comboList)
          this.contractStatusPageNumber = this.getData.pageNumber;
          this.contractStatusCombo = this.getData.dataList;
          this.scrollsynccontractStatus = false;
        }
      );
  }

  selectedContractStatus(event){
    if(event === undefined){
      this.contractHeaderModel.contractStatusId=0;
      this.contractHeaderModel.contractStatus = '';
      this.contractStatusPageNumber = 1;
      this.contractStatusCombo = [];
    }else{
      this.translateService.get([event.processStatusName])
      .subscribe((val) => {
        const status = Object.values(val)
        if(status.length > 0){
          this.contractHeaderModel.contractStatus = status[0].toString();
        }
      });
      this.contractHeaderModel.contractStatusId=event.processStatusId;
    }
  }

  selectMultipleContract() {
    const seen = new Set();

    if(this.multiSelectFlag){
    this.contractList.forEach(contract => {
      
        this.selectedContractList.push(contract);
    });
  }else{
    this.selectedContractList = [];
  }
  
      this.enableEditBtn = true;
      this.enableViewBtn = true;

    
    this.selectedContractList = this.selectedContractList.filter(element => {
    const jsonElement = JSON.stringify(element); 
    const isDuplicate = seen.has(jsonElement);
    seen.add(jsonElement);
    return !isDuplicate;
  });

  }

  cancelContract(){

    this.selectedContractList = this.selectedContractList.filter(function(element) {
      // return element.approvalId !== 0 && element.poReqStatus != 'CANCELLED';
      return  element.contractStatusId != 1704;
      
  });
  
  this.selectedContractListLength = this.selectedContractList.length;

    let dialogRef = this.dialog.open(CancelConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        Text: ' selected OSPR',
        // note : 'Note : Only PR under your queue will be Cancelled',
        selectedElementListLength: this.selectedContractListLength
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {

          let cancelReason = data.cancelReason;

          this.contractCancelList = []; 

          for (let i = 0; i < this.selectedContractList.length; i++) {      
            if (this.selectedContractList[i].contractStatusId === 1701 || this.selectedContractList[i].contractStatusId === 1703 || this.selectedContractList[i].contractStatusId === 1702) {
              this.contractCancelList.push(this.selectedContractList[i].contractHdrId);
            }
          } 
          let contractIdList = {contractCancelList: [],cancelReason: cancelReason};
          contractIdList.contractCancelList = this.contractCancelList;
          contractIdList.cancelReason = cancelReason;
          this.commonService.showSpinner();
          this.commonService.commonInsertService('cancelMultipleContract.sams', contractIdList).subscribe(
            data => {
              if (data.success) {          
                this.commonService.openToastSuccessMessage(data.message);
                // this.fetchListofContract();
                this.ngOnInit();
                this.commonService.hideSpinner();
                this.selectedContractList = [];
              } else {
                this.commonService.hideSpinner();
                this.commonService.openToastErrorMessage(data.message);
                this.selectedContractList = [];
              }
            }
          );


          // this.commonService.commonGetService('updateGRNStatus.sams', this.grnCancelhdrId, 'CANCELLED').subscribe(
          //   data => {
          //     if (data.success) {
          //       this.commonService.openToastSuccessMessage(data.message);
          //       this.fetchListOfGRN();
          //     } else {
          //       this.commonService.openToastErrorMessage(data.message);
          //     }
          //   }
          // );
          // }

          this.multiSelectFlag = false;
        }else{
          this.multiSelectFlag = false;
          this.selectedContractList = [];
        }
      });

    
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
    this.commonService.commonInsertService(this.assetOptimeMthnd.saveOrUpdateUserPreference, this.userPreference).subscribe(
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
            if(this.userPreference.customFilters != null && this.userPreference.customFilters != '') {
              this.contractHeaderModel = JSON.parse(this.userPreference.customFilters);

              if(this.contractHeaderModel.selectedLocationNames != null && this.contractHeaderModel.selectedLocationNames.length > 0){
                this.previousSelectedLocations = this.contractHeaderModel.selectedLocationNames;
              }
            }
           
          }
          resolve(true);
        }
      )
    });
    return userPreferenceInfo;
    
  }
  
  applyPreferredFilters() {
    //SAVE TO USER PREFERENCE TABLE
    
    this.userPreference.customFilters = JSON.stringify(this.contractHeaderModel);
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
  
  listOfProcessStatus(searchValue) {
    this.scrollSyncProcessStatus = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    let workflowProcessId = allWorkflowStatus.CONTRACT;
    this.commonService.getComboResults('listOfAllWorkflowProcessStatusCombo.sams', searchValue.term, workflowProcessId, '',
      this.recordsPerPageForCombo, this.processStatusPageNumber1).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.processStatusPageNumber1 , this.processStatusCombo1 , data.responseData.comboList)
          this.processStatusPageNumber1 = this.getData.pageNumber;
          this.processStatusCombo1 = this.getData.dataList;
          this.scrollSyncProcessStatus = false;
        }
      );
  }
  
  setProcessStatus(event) {
    
    if (event === undefined) {
      this.contractHeaderModel.processStatus = '';
      this.contractHeaderModel.workflowProcessStatusId = 0;
      this.processStatusPageNumber1 = 1;
      this.processStatusCombo1 = [];
    } else {
      this.contractHeaderModel.processStatus = event.processName;
      this.contractHeaderModel.workflowProcessStatusId = event.workflowProcessId;
    }
  }
  
  ngAfterContentInit(){

        this.contractHeaderModel = new ContractHeaderModel;
    
        this.contractHeaderModel.direction = 'desc';
        this.contractHeaderModel.columnName = 'updatedDt';
    
        // From dashboard
         this.activatedRoute.queryParams.subscribe(query => {
    
           if(query?.locationId){
            this.contractHeaderModel.selectedLocationIds = []; 
            this.contractHeaderModel.selectedLocationIds.push(Number(query.locationId));
            this.contractHeaderModel.selectedLocationNames = [query.locationName];
           }

           if (query?.coverageType) {
              this.contractHeaderModel.coverageType = '';
              this.contractHeaderModel.coverageType = query.coverageType;  

              this.contractHeaderModel.contractStatus = "CONTRACT ACTIVE";
              this.contractHeaderModel.contractStatusId = 1702;
           }
            
           if(query?.searchFor){

            // For Expiring Contracts
            if(query.searchFor == 'WARRANTY Expiring'){
              this.contractHeaderModel.intervalBasedContract =  query.name?.toUpperCase();
              this.contractHeaderModel.coverageType = 'WARRANTY'; 
            }

            if(query.searchFor == 'EXTENDED WARRANTY Expiring'){
              this.contractHeaderModel.intervalBasedContract =  query.name?.toUpperCase();
              this.contractHeaderModel.coverageType = 'EXTENDED WARRANTY'; 
            }

            if(query.searchFor == 'CONTRACT Expiring'){
              this.contractHeaderModel.intervalBasedContract =  query.name?.toUpperCase();
              this.contractHeaderModel.coverageType = 'CONTRACT'; 
            }

            if(query.searchFor == 'INSURANCE Expiring'){
              this.contractHeaderModel.intervalBasedContract =  query.name?.toUpperCase();
              this.contractHeaderModel.coverageType = 'INSURANCE'; 
            }

            // For Expired Contracts
            if(query.searchFor == 'WARRANTY Expired'){
              this.contractHeaderModel.intervalBasedContract =  query.name?.toUpperCase();
              this.contractHeaderModel.coverageType = 'WARRANTY'; 

              this.contractHeaderModel.contractStatus = "CONTRACT EXPIRED";
              this.contractHeaderModel.contractStatusId = 1706;
            }

            if(query.searchFor == 'EXTENDED WARRANTY Expired'){
              this.contractHeaderModel.intervalBasedContract =  query.name?.toUpperCase();
              this.contractHeaderModel.coverageType = 'EXTENDED WARRANTY'; 

              this.contractHeaderModel.contractStatus = "CONTRACT EXPIRED";
              this.contractHeaderModel.contractStatusId = 1706;
            }

            if(query.searchFor == 'CONTRACT Expired'){
              this.contractHeaderModel.intervalBasedContract =  query.name?.toUpperCase();
              this.contractHeaderModel.coverageType = 'CONTRACT'; 

              this.contractHeaderModel.contractStatus = "CONTRACT EXPIRED";
              this.contractHeaderModel.contractStatusId = 1706;
            }

            if(query.searchFor == 'INSURANCE Expired'){
              this.contractHeaderModel.intervalBasedContract =  query.name?.toUpperCase();
              this.contractHeaderModel.coverageType = 'INSURANCE'; 

              this.contractHeaderModel.contractStatus = "CONTRACT EXPIRED";
              this.contractHeaderModel.contractStatusId = 1706;
            }

           }
           
         });
  }
  
}
