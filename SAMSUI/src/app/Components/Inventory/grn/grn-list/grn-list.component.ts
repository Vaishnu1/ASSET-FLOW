import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { GRNHdrModel } from 'src/app/Model/inventory/grnHdr';
import { Title } from '@angular/platform-browser';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { getData } from 'src/app/Model/common/fetchListData';
import { MatDialog } from '@angular/material/dialog';
import { allBusinessPartnerRoles, allWorkflowStatus } from 'src/app/Constants/AllStatusConstants';
import { CancelConfirmationComponent } from 'src/app/Components/Common-components/cancel-confirmation/cancel-confirmation/cancel-confirmation.component';
import { RejectConfirmationComponent } from 'src/app/Components/Common-components/reject-confirmation/reject-confirmation.component';
import { UserPrefernce } from 'src/app/Services/user-preference/user-preference';

@Component({
  selector: 'app-grn-list',
  templateUrl: './grn-list.component.html',
  styleUrls: ['./grn-list.component.css']
})
export class GrnListComponent implements OnInit {
  defaultColumns = ['select','sno','locationName','grnNo','grnFor','supplierName','supplierSiteName','doNo', 'grnStatus','grnApprovalStatus', 'updatedDt'];
  displayedColumns = [...this.defaultColumns];

  grnDataSource = [];
  
  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  subLoaderGrn:boolean = false;
  scrollSupplierNamesync:boolean = false;
  scrollApprovedSupplierNamesync:boolean = false;
  limitCount :any='';
  supplierPageNumber : number;
  approvedSupplierPageNumber: number;
  supplierList=[];
  supplierLocationList=[];

  scrollLocationNamesync: boolean = false;
  locationNamePageNumber: number;
  locationCombo: any = [];

  @ViewChild('searchField') searchFieldSet: ElementRef;

  //Set Page Title
  title = 'Asset Optima - GRN';
  public grnHdrModel: GRNHdrModel;

  //PERMISSIONS 
  modelAccessModule: ModuleAccessModel;
  getData: getData;

  enableActionBtn: boolean=true;
  enableActionBtnForCancel: boolean=true;
  selectAllGRN: boolean = false;

  scrollStatussync: boolean = false;
  statusPageNumber: number;
  statusList: any = [];

  grnCancelhdrId: number;
  grnNumberCancel: string;

  selectedGrnStatus: any = '';
  grnCancelList: any =[];

  //USER PREFERENCE
  public userPreference: UserPrefernce;
  showManageColumns: boolean = false;

  previousSelectedLocations: any[] = [];
  previousSelectedBusinessPartners : any[] = []; 
  previousSelectedBusinessPartnerSites : any[] = [];

  constructor(private router: Router,
              private commonService: CommonService,
              public assetOptimaServices: AssetOptimaServices,
              private titleService: Title,
              private readonly dialog: MatDialog,
              private userSession: UserSessionService,
              private samsService: AssetOptimaServices,) { 
                this.pageSize = '100';
                this.pageIndex = '0';
                this.grnHdrModel = new GRNHdrModel();
                this.modelAccessModule = new ModuleAccessModel();
                this.supplierPageNumber = 1;
                this.approvedSupplierPageNumber = 1;
                this.statusPageNumber = 1;
                this.locationNamePageNumber =1;
                this.getData = new getData();

                this.showManageColumns = false;
                this.userPreference = new UserPrefernce();
              }

  ngOnInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_GRN'];
    this.titleService.setTitle(this.title);
    this.grnHdrModel.direction = 'desc';
    this.grnHdrModel.columnName = 'updatedDt';
    this.grnHdrModel.locationId = this.userSession.getUserLocationId();
    this.grnHdrModel.locationName = this.userSession.getUserLocationName();
    this.grnHdrModel.grnStatus = '';

    this.supplierPageNumber= 1;
    this.approvedSupplierPageNumber = 1;
    this.statusPageNumber = 1;
    // this.fetchListOfGRN();
    // this.selectedGRNList = [];
    // this.enableActionBtn = true;
    // this.enableActionBtnForCancel = true;

    this.grnHdrModel.direction = 'desc';
    this.grnHdrModel.columnName = 'updatedDt';

    this.userPreference.moduleKey = 'GROUPACCESS_GRN';
    // this.getUserPreferenceInfo();

    let userPreferenceData = this.getUserPreferenceInfo();
    userPreferenceData.then((response) => {
      this.fetchListOfGRN();
      this.selectedGRNList = [];
      this.enableActionBtn = true;
      this.enableActionBtnForCancel = true;
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.ngOnInit();
      this.commonService.setFormFocus(this.searchFieldSet);
    },1000);
  }

  createGrn(mode ?: string){
    if (mode !== 'add') {
      this.router.navigate(['home/inventory/grnCreate/'+ this.selectedGRNList[0].grnId +'/'+mode]);
    }else{
      this.router.navigate(['home/inventory/grnCreate/'+ 0 + '/' + mode]);
    } 
  }

  onSearchChange(searchValue : string ) { 
    this.grnHdrModel.grnNo=searchValue;
    this.pageSize='100';
    this.pageIndex='0';
    this.fetchListOfGRN();
  }

  fetchListOfGRN(){
    this.subLoaderGrn = true;
    this.grnHdrModel.pageNumber = Number(this.pageIndex);
    this.grnHdrModel.recordsPerPage = Number(this.pageSize);
    this.commonService.commonListService('fetchListOfAllGrn.sams',this.grnHdrModel).subscribe(
      data => {
        if(data.success){
           this.length = data.responseData.dataTotalRecCount;
           this.grnDataSource = data.responseData.dataList;

        }
      }
    );
    this.subLoaderGrn = false;
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchListOfGRN();
  }
  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  customSort(event) {
    this.grnHdrModel.pageNumber = 0;
    this.grnHdrModel.columnName = event.active;
    this.grnHdrModel.direction = event.direction;
    this.fetchListOfGRN();
  }

  listOfSupplier(searchTerms){
    this.scrollSupplierNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.SUPPLIER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchTerms.term, '', '', this.limitCount, this.supplierPageNumber,'',partnerRoles).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.supplierPageNumber , this.supplierList , data.responseData.comboList)
        this.supplierPageNumber = this.getData.pageNumber;
        this.supplierList = this.getData.dataList;
        this.scrollSupplierNamesync = false; 
      }
    );  
  }
  // fetchIdOfSupplier(event){
  //   if (event === undefined) {
  //     this.grnHdrModel.supplierId=0;
  //     this.grnHdrModel.supplierName='';      
  //     this.supplierPageNumber = 1;
  //   } else {
  //     this.grnHdrModel.supplierId=event.businessPartnerId;
  //     this.grnHdrModel.supplierName=event.businessPartnerName;
  //   }
  // }

  fetchIdOfSupplier(event){
    if (event === undefined || event.length <=0) {
      this.grnHdrModel.supplierId=0;
      this.grnHdrModel.supplierName='';      
      this.supplierPageNumber = 1;

      this.grnHdrModel.selectedBusinessPartnerIds = [];
      this.previousSelectedBusinessPartners = [];
    } else {
      this.grnHdrModel.supplierId=event.businessPartnerId;
      this.grnHdrModel.supplierName=event.businessPartnerName;

      // Find removed item
      if (this.previousSelectedBusinessPartners.length > event.length) {
        // Convert event array to a list of display names
         const currentBusinessPartnerNames = event.map(businessPartner => businessPartner.businessPartnerName);
         // Find the removed item
         const removedItem = this.previousSelectedBusinessPartners.find(
           prevItem => !currentBusinessPartnerNames.includes(prevItem)
         );
       
         if (removedItem) {
           const removedIndex = this.previousSelectedBusinessPartners.indexOf(removedItem);
           this.grnHdrModel.selectedBusinessPartnerIds.splice(removedIndex,1);
         }
         // Update the previous selection list
         this.previousSelectedBusinessPartners = currentBusinessPartnerNames;
      }else{
       this.grnHdrModel.selectedBusinessPartnerIds = event.map(businessPartner => businessPartner.businessPartnerId);
      }
    
      // Update the previous selection list
      this.previousSelectedBusinessPartners = event.map(businessPartner => businessPartner.businessPartnerName);
    }
  }


  listOfSupplierApproved(searchTerms){
    this.scrollApprovedSupplierNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerSiteCombo, searchTerms.term, this.grnHdrModel.supplierId, '', this.limitCount, this.approvedSupplierPageNumber,'').subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.approvedSupplierPageNumber , this.supplierLocationList , data.responseData.comboList)
        this.approvedSupplierPageNumber = this.getData.pageNumber;
        this.supplierLocationList = this.getData.dataList;
        this.scrollApprovedSupplierNamesync = false;  
      }
    );    
  }

  // fetchIdOfSupplierApproved(event){
  //   if (event === undefined) {
  //     this.grnHdrModel.supplierSiteId=0;
  //     this.approvedSupplierPageNumber = 1;
  //   } else {
  //     this.grnHdrModel.supplierSiteId=event.partnerSiteId;     
  //   }
  // }

  fetchIdOfSupplierApproved(event){
    if (event === undefined || event.length <=0) {
      this.grnHdrModel.supplierSiteId=0;
      this.approvedSupplierPageNumber = 1;

      this.grnHdrModel.selectedBusinessPartnerSiteIds = [];
      this.previousSelectedBusinessPartnerSites = [];
    } else {
      this.grnHdrModel.supplierSiteId=event.partnerSiteId;  
      
      // Find removed item
      if (this.previousSelectedBusinessPartnerSites.length > event.length) {
        // Convert event array to a list of display names
         const currentBusinessPartnerSiteNames = event.map(businessPartnerSite => businessPartnerSite.comboDisp);
         // Find the removed item
         const removedItem = this.previousSelectedBusinessPartnerSites.find(
           prevItem => !currentBusinessPartnerSiteNames.includes(prevItem)
         );
       
         if (removedItem) {
           const removedIndex = this.previousSelectedBusinessPartnerSites.indexOf(removedItem);
           this.grnHdrModel.selectedBusinessPartnerSiteIds.splice(removedIndex,1);
         }
         // Update the previous selection list
         this.previousSelectedBusinessPartnerSites = currentBusinessPartnerSiteNames;
      }else{
       this.grnHdrModel.selectedBusinessPartnerSiteIds = event.map(businessPartnerSite => businessPartnerSite.partnerSiteId);
      }
    
      // Update the previous selection list
      this.previousSelectedBusinessPartnerSites = event.map(businessPartnerSite => businessPartnerSite.comboDisp);
    }
  }

  clear(){
    this.grnHdrModel=new GRNHdrModel;
    this.ngOnInit();
  }

  searchGrn() {
    if(this.grnHdrModel.doDateDisp != null){
      this.grnHdrModel.doDateDisp=this.commonService.convertToDateStringyyyy_mm_dd(this.grnHdrModel.doDateDisp);
    }
    if(this.grnHdrModel.grnDateDisp != null){
      this.grnHdrModel.grnDateDisp=this.commonService.convertToDateStringyyyy_mm_dd(this.grnHdrModel.grnDateDisp);
    }
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchListOfGRN();

    this.applyPreferredFilters();
  }

  //To export report
  generateReport() {
    this.grnHdrModel.recordsPerPage = 0;
    this.commonService.showSpinner();
    this.commonService.commonListService('reports/assets/generateGrnReport.sams', this.grnHdrModel).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      }, error => {
        // alert('error');
      }
    );
    this.commonService.hideSpinner();
  }

  generateGrnPDF() {
    this.commonService.showSpinner();
    this.commonService.commonGetService('generateGrnPdf.sams',this.selectedGRNList[0].grnId).subscribe(
      data => {        
        if(data.success){
           this.downloadDocument(data.responseData,'application/pdf'); 
        }else{
        }
      }, error =>{
      }
    );
    this.commonService.hideSpinner();
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

  selectedGRNList=[];
  selectGRN(element){
    this.grnCancelhdrId = element.grnId;
    this.grnNumberCancel = element.grnNo;
    const indentId = this.selectedGRNList.findIndex(data => data.grnId === element.grnId);

    const index = this.selectedGRNList.findIndex(data => data.grnId === element.grnId);
    this.enableActionBtn = false;
    this.enableActionBtnForCancel = true;
    // Toggle selection status
    if (index === -1) {
      this.selectedGRNList.push(element);
  } else {
      this.selectedGRNList.splice(index, 1);
      this.selectedGrnStatus = '';
  }



    if(element.grnStatus == 'WAITING FOR APPROVAL'){
      this.enableActionBtnForCancel = false;
    }
    if(element.grnStatus == 'REJECTED'){
      this.enableActionBtnForCancel = true;
    }
    if(this.selectedGRNList.length === 1){
      this.enableActionBtn = false;
      this.selectedGrnStatus = this.selectedGRNList[0].grnStatus;
    }
    else{
      this.enableActionBtn = true;
      this.enableActionBtnForCancel = true;
    }
    if(this.selectedGRNList.length > 1){
      this.enableActionBtn = true;
      for (let i = 0; i < this.selectedGRNList.length; i++) {
        this.selectedGrnStatus = this.selectedGRNList[i].grnStatus;
      }
    }
    
  }

  selectAllGRNLists(event){
    this.selectAllGRN = event.checked;
      this.enableActionBtn = false;
  
      if(event.checked){
        this.selectedGRNList = this.grnDataSource;
      }
      else{
        this.selectedGRNList = [];
      }
  
      if(this.selectedGRNList.length === 1){
        this.enableActionBtn = false;
      }
      else{
        this.enableActionBtn = true;
      }
  }

  compareValue(element: any): boolean{
    return this.selectedGRNList.findIndex(data => data.grnId === element.grnId) !== -1;
  }

  checkApprovalValid(){    
    if(this.selectedGRNList.length>0){
      return !(this.selectedGRNList.findIndex(data => data.grnStatus !== "WAITING FOR APPROVAL") === -1);
    }
    else
      return true;
  }

  grnWorkflowApproval(status){
    let result;
    
    if(status){
      result = this.commonService.commonWorkflowService(allWorkflowStatus[allWorkflowStatus.GRN_APPROVAL], this.selectedGRNList," GRN ");
    }
    else{ 
      result = this.commonService.rejectApprove(allWorkflowStatus[allWorkflowStatus.GRN_APPROVAL],this.selectedGRNList," GRN ");
    }

    result.then(data=>{
      if(data){        
         setTimeout(() => {
          this.ngOnInit();
        },1000);
      }
    })
  }

  listofLocationName(searchValue) {
    this.scrollLocationNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllUserLocForCombo, searchValue.term, '', '', this.limitCount, this.locationNamePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.locationNamePageNumber, this.locationCombo, data.responseData.comboList)
        this.locationNamePageNumber = this.getData.pageNumber;
        this.locationCombo = this.getData.dataList;
        this.scrollLocationNamesync = false;
      }
    );
  }

  // setLocationNameComboValue(event) {
  //   if (event === undefined) {
  //     this.grnHdrModel.locationId = 0;
  //     this.locationNamePageNumber = 1;
  //   } else {
  //     this.grnHdrModel.locationId = event.locationId;
  //   }
  // }

  setLocationNameComboValue(event) {
    if (event === undefined || event.length <=0) {
      this.grnHdrModel.locationName = "";
      this.grnHdrModel.locationId = 0;
      this.locationNamePageNumber = 1;


      this.grnHdrModel.selectedLocationIds = [];
      this.previousSelectedLocations = [];
    } else {
      this.grnHdrModel.locationId = event.locationId;
      this.grnHdrModel.locationName = event.locDisplayField;

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
           this.grnHdrModel.selectedLocationIds.splice(removedIndex,1);
         }
         // Update the previous selection list
         this.previousSelectedLocations = currentLocationNames;
      }else{
       this.grnHdrModel.selectedLocationIds = event.map(location => location.locationId);
      }
    
      // Update the previous selection list
      this.previousSelectedLocations = event.map(location => location.locDisplayField);
    }
  }

  fetchCommonStatusList(searchValue) {
    if (this.statusList.length == 0) {
      this.scrollStatussync = true;
      this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
      this.commonService.getComboResults('commonStatusList.sams', searchValue.term,
        (this.userSession.getUserLocationId()) > 0 ? (this.userSession.getUserLocationId()) : 0, 0, this.limitCount, this.statusPageNumber).subscribe(
          (data) => {
            this.getData = new getData();
            this.getData = this.commonService.fetchDataList(searchValue, this.statusPageNumber, this.statusList, data.responseData.comboList)
            this.statusPageNumber = this.getData.pageNumber;
            this.statusList = this.getData.dataList;
            this.scrollStatussync = false;
          }
        );
    }
  }

  selectedStatus(event) {
    if (event === undefined) {
      this.grnHdrModel.grnStatus = '';
      this.statusPageNumber = 1;
    } else {
      this.grnHdrModel.grnStatus = event.displayValue;
    }
  }

  checkgrnCancel(){    
    if(this.selectedGRNList.length>0){
      return (this.selectedGRNList.findIndex(data => data.grnStatus === "WAITING FOR APPROVAL") === -1);
    }
    else
      return true;
  }

  grnCancel() {
    let dialogRef = this.dialog.open(CancelConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'GRN : '+this.grnNumberCancel
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {

          let cancelReason = data.cancelReason;

          this.grnCancelList = []; 

          for (let i = 0; i < this.selectedGRNList.length; i++) {      
            if (this.selectedGRNList[i].grnStatus === 'WAITING FOR APPROVAL') {
              this.grnCancelList.push(this.selectedGRNList[i].grnId);
            }
          } 

          let grnIdList = {grnCancelList: [],cancelReason: cancelReason};
          grnIdList.grnCancelList = this.grnCancelList;
          grnIdList.cancelReason = cancelReason;
          this.commonService.showSpinner();

          this.commonService.commonInsertService('cancelMultipleGRN.sams', grnIdList).subscribe(
            data => {
              if (data.success) {          
                this.commonService.openToastSuccessMessage(data.message);
                this.fetchListOfGRN();
                this.commonService.hideSpinner();
                this.selectedGRNList = [];
              } else {
                this.commonService.hideSpinner();
                this.commonService.openToastErrorMessage(data.message);
                this.selectedGRNList = [];
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
        }
      });
  }

  grnWorkflowReject() {

    let selectdList = this.selectedGRNList;
    const dialogRef = this.dialog.open(RejectConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'confirmHeading': 'Confirmation',
        'confirmMsg': 'Are you sure to Reject selected GRN ?'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status === true) {
          let rejectReason = data.reason

          let grnIdList = {selectedGrnList: [],status: 'REJECTED',selectedApprovalList : [], rejectReason : rejectReason};
          for(let i=0; i<= selectdList.length-1 ; i++){
            grnIdList.selectedGrnList.push(selectdList[i].grnId);
            grnIdList.selectedApprovalList.push(selectdList[i].approvalId);
          }
          this.commonService.showSpinner();
          this.commonService.commonInsertService('approveRejectGRN.sams', grnIdList).subscribe(
            data => {
              if (data.success) {
                this.commonService.hideSpinner();
                this.commonService.openToastSuccessMessage(data.message);
                this.ngOnInit();
              } else {
                this.commonService.hideSpinner();
                this.commonService.openToastWarningMessage(data.message);
              }
            }, error => {
              
            }
          );
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
            this.grnHdrModel = JSON.parse(this.userPreference.customFilters);

            if(this.grnHdrModel.selectedLocationNames != null && this.grnHdrModel.selectedLocationNames.length > 0){
              this.previousSelectedLocations = this.grnHdrModel.selectedLocationNames;
            }
            if(this.grnHdrModel.selectedBusinessPartnerNames != null && this.grnHdrModel.selectedBusinessPartnerNames.length > 0){
              this.previousSelectedBusinessPartners = this.grnHdrModel.selectedBusinessPartnerNames;
            }
            if(this.grnHdrModel.selectedBusinessPartnerSiteNames != null && this.grnHdrModel.selectedBusinessPartnerSiteNames.length > 0){
              this.previousSelectedBusinessPartnerSites = this.grnHdrModel.selectedBusinessPartnerSiteNames;
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
    this.userPreference.customFilters = JSON.stringify(this.grnHdrModel);
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

}
