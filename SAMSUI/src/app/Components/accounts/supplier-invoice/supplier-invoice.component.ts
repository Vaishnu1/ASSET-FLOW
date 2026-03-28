import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { SupplierInvoiceHdr } from 'src/app/Model/accounts/supplierInvoiceHdr';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { getData } from 'src/app/Model/common/fetchListData';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { SuppInvMatchDataComponent } from '../../Dialog-Components/accounts/supp-inv-match-data/supp-inv-match-data.component';
import { CancelConfirmationComponent } from '../../Common-components/cancel-confirmation/cancel-confirmation/cancel-confirmation.component';
import { allBusinessPartnerRoles } from 'src/app/Constants/AllStatusConstants';
import { UserPrefernce } from 'src/app/Services/user-preference/user-preference';

@Component({
  selector: 'app-supplier-invoice',
  templateUrl: './supplier-invoice.component.html',
  styleUrls: ['./supplier-invoice.component.css']
})
export class SupplierInvoiceComponent implements OnInit {

  defaultColumns = ['select', 'sNo','erpInterfacedFlag','erpPushFlag', 'locationName', 'supplierName', 'supplierInvoiceNo', 'invoiceRegDtDisp', 'invoiceDtDisp', 'localTotalAmt', 'invoiceStatus','approvalStatus', 'updatedBy'];
  displayedColumns = [...this.defaultColumns];

  supplierInvoiceMainDataSource = new MatTableDataSource<SupplierInvoiceComponent>();
  limitCount: any;

  moduleAccessSupplierInvoice: ModuleAccessModel;

  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  scrollSuppliersync: boolean = false;
  supplierPageNumber: number;
  supplierCombo: any = [];

  matchActionReasonList: any = [];
  scrollMatchActionsync: boolean = false;
  matchActionPageNumber: number;

  scrollLocationNamesync: boolean = false;
  locationNamePageNumber: number;
  locationCombo: any = [];

  scrollInvoiceStatussync: boolean = false;
  invoiceStatusPageNumber: number;
  invoiceStatusReasonList: any = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('supplierInvoiceSearch') focusSupplierInvoiceSearch: ElementRef;
  searchvalue: any = '';
  panelOpenState = false;
  showFiller = false;
  mode = new FormControl('over');

  //LOADER
  getData: getData;
  subloaderSupplierInvoice: boolean = false;

  title = 'Asset Optima - Supplier Invoice';

  public supplierInvoiceHdr: SupplierInvoiceHdr;
  selectedSupplierInvoiceList = [];
  selectedItem: any = 0;
  selectedSupplierInvoiceStatus: any = '';
  enableActionBtn: boolean = true;
  selectAllSupplierInvoice: boolean = false;

  enableActionBtnForCancel: boolean = true;
  SupplierhdrIdCancel: number;
  supplierInvoiceNumberCancel: string;

  //USER PREFERENCE
  public userPreference: UserPrefernce;
  showManageColumns: boolean = false;

  constructor(private titleService: Title,
    private readonly userSessionService: UserSessionService,
    private commonService: CommonService,
    private assetOptimaConstants: AssetOptimaConstants,
    private assetOptimaServices: AssetOptimaServices,
    private router: Router, private dialog: MatDialog) {
    this.moduleAccessSupplierInvoice = new ModuleAccessModel();
    this.pageSize = '100';
    this.pageIndex = '0';
    this.supplierPageNumber = 1;
    this.matchActionPageNumber = 1;
    this.locationNamePageNumber = 1;
    this.invoiceStatusPageNumber = 1;
    this.supplierInvoiceHdr = new SupplierInvoiceHdr();
    this.getData = new getData();

    this.showManageColumns = false;
    this.userPreference = new UserPrefernce();
  }

  ngOnInit(): void {
    this.moduleAccessSupplierInvoice = this.userSessionService.getUserGroupAccess()['GROUPACCESS_SUPPLIER_INVOICE'];
    this.titleService.setTitle(this.title);
    // this.supplierInvoiceHdr.direction = 'desc';
    // this.supplierInvoiceHdr.columnName = 'updatedDt';
    this.supplierInvoiceHdr.locationName = this.userSessionService.getUserLocationName();
    this.supplierInvoiceHdr.locationId = this.userSessionService.getUserLocationId();
    this.selectedSupplierInvoiceList = [];
    this.enableActionBtn = true;
    // this.fetchListofSupplierInvoice();
    localStorage.removeItem('previousRoute');

    this.supplierInvoiceHdr.direction = 'desc';
    this.supplierInvoiceHdr.columnName = 'updatedDt';

    this.userPreference.moduleKey = 'GROUPACCESS_SUPPLIER_INVOICE';
    // this.getUserPreferenceInfo();

    let userPreferenceData = this.getUserPreferenceInfo();
    userPreferenceData.then((response) => {
      this.fetchListofSupplierInvoice();

    })
  }

  createSupplierInvoice(supplierInvoiceHdrId?: number, mode?: string) {
    this.router.navigate(['home/accounts/supplierInvoiceCreate/' + supplierInvoiceHdrId + '/' + mode]);
  }

  fetchListofSupplierInvoice() {
    this.supplierInvoiceHdr.pageNumber = Number(this.pageIndex);
    this.supplierInvoiceHdr.recordsPerPage = Number(this.pageSize);
    this.subloaderSupplierInvoice = true;
    this.supplierInvoiceMainDataSource = null;
    this.commonService.commonListService(this.assetOptimaServices.listOfSupplierInvoice, this.supplierInvoiceHdr).subscribe(
      data => {
        if (data.success) {
          this.subloaderSupplierInvoice = false;
          this.length = data.responseData.dataTotalRecCount;
          this.supplierInvoiceMainDataSource = data.responseData.dataList;
        } else {
          this.subloaderSupplierInvoice = false;
        }
      }, error => {
        this.subloaderSupplierInvoice = false;
      }
    );
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchListofSupplierInvoice();
  }
  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  customSort(event) {
    this.supplierInvoiceHdr.pageNumber = 0;
    this.supplierInvoiceHdr.columnName = event.active;
    this.supplierInvoiceHdr.direction = event.direction;
    this.fetchListofSupplierInvoice();
  }

  selectSupplierInvoice(element) {
    this.supplierInvoiceNumberCancel = element.invoiceStatus;
    this.SupplierhdrIdCancel = element.supplierInvoiceHdrId ;
    const selectPRIndex = this.selectedSupplierInvoiceList.findIndex(x => x === element);
    this.enableActionBtn = false;
    this.enableActionBtnForCancel = true;
    if (selectPRIndex === -1) {
      this.selectedSupplierInvoiceList = [element];
    }
    else {
      this.selectedSupplierInvoiceList.splice(selectPRIndex, 1)
      this.selectedItem = 0;
      this.selectedSupplierInvoiceStatus = '';
    }

    if(element.invoiceStatus == 'MATCHED' || 	element.invoiceStatus == 'UNMATCHED'){
      this.enableActionBtnForCancel = false;
    }

    if (this.selectedSupplierInvoiceList.length === 1) {
      this.enableActionBtn = false;
      this.selectedItem = this.selectedSupplierInvoiceList[0].supplierInvoiceHdrId;
      this.selectedSupplierInvoiceStatus = this.selectedSupplierInvoiceList[0].invoiceStatus;
    }
    else {
      this.enableActionBtn = true;
      this.enableActionBtnForCancel = true;
      for (let i = 0; i < this.selectedSupplierInvoiceList.length; i++) {
        this.selectedItem = this.selectedSupplierInvoiceList[i].supplierInvoiceHdrId;
        this.selectedSupplierInvoiceStatus = this.selectedSupplierInvoiceList[i].invoiceStatus;
      }

    }
  }

  compareValue(element: any): boolean {
    return this.selectedSupplierInvoiceList.findIndex(data => data.supplierInvoiceHdrId === element.supplierInvoiceHdrId) !== -1;
  }
  
  loadMatchActionData(searchValue) {
    console.log("match action reason list ", this.matchActionReasonList.length);
    if (this.matchActionReasonList.length == 0) {
      this.scrollMatchActionsync = true;
      this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
      this.commonService.getComboResults('listMatchAction.sams', searchValue.term, (this.userSessionService.getUserLocationId()) > 0 ? (this.userSessionService.getUserLocationId()) : 0,
        0, this.limitCount, this.matchActionPageNumber).subscribe(
          (data) => {
            this.getData = new getData();
            this.getData = this.commonService.fetchDataList(searchValue, this.matchActionPageNumber, this.matchActionReasonList, data.responseData.comboList)
            this.matchActionPageNumber = this.getData.pageNumber;
            this.matchActionReasonList = this.getData.dataList;
            this.scrollMatchActionsync = false;
          }
        );
    }
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

  setLocationNameComboValue(event) {
    if (event === undefined) {
      this.supplierInvoiceHdr.locationId = 0;
      this.locationNamePageNumber = 1;
    } else {
      this.supplierInvoiceHdr.locationId = event.locationId;
    }
  }

  

  loadSupplierComboData(searchValue) {
    this.scrollSuppliersync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.SUPPLIER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchValue.term, '', '',
      this.limitCount, this.supplierPageNumber, '', partnerRoles).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.supplierPageNumber, this.supplierCombo, data.responseData.comboList)
          this.supplierPageNumber = this.getData.pageNumber;
          this.supplierCombo = this.getData.dataList;
          this.scrollSuppliersync = false;
        }
      );
  }

  setSupplierNameComboValue(event) {
    if (event === undefined) {
      this.supplierInvoiceHdr.supplierId = 0;
      this.supplierPageNumber = 1;
    } else {
      this.supplierInvoiceHdr.supplierId = event.businessPartnerId;
    }
  }

  

  supplierInvoiceStatusData(searchValue) {
    console.log("match action reason list ", this.invoiceStatusReasonList.length);
    if (this.invoiceStatusReasonList.length == 0) {
      this.scrollInvoiceStatussync = true;
      this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
      this.commonService.getComboResults('listOfSupplierInvoiceStatus.sams', searchValue.term, (this.userSessionService.getUserLocationId()) > 0 ? (this.userSessionService.getUserLocationId()) : 0,
        0, this.limitCount, this.invoiceStatusPageNumber).subscribe(
          (data) => {
            this.getData = new getData();
            this.getData = this.commonService.fetchDataList(searchValue, this.invoiceStatusPageNumber, this.invoiceStatusReasonList, data.responseData.comboList)
            this.invoiceStatusPageNumber = this.getData.pageNumber;
            this.invoiceStatusReasonList = this.getData.dataList;
            this.scrollInvoiceStatussync = false;
          }
        );
    }
  }

  selectedMatchAction(event) {
    if (event === undefined) {
      this.supplierInvoiceHdr.matchAction = '';
      this.matchActionPageNumber = 1;
    } else {
      this.supplierInvoiceHdr.matchAction = event.matchActionName;
    }
  }

  selectedInvoiceStatus(event) {
    if (event === undefined) {
      this.supplierInvoiceHdr.invoiceStatus = '';
      this.invoiceStatusPageNumber = 1;
    } else {
      this.supplierInvoiceHdr.invoiceStatus = event.supplierInvoiceStatusName;
    }
  }

  searchSupplierInvoice() {
    if (this.supplierInvoiceHdr.fromDt != null) {
      this.supplierInvoiceHdr.fromDt = this.commonService.convertToDateStringyyyy_mm_dd(this.supplierInvoiceHdr.fromDt);
    }
    if (this.supplierInvoiceHdr.endDt != null) {
      this.supplierInvoiceHdr.endDt = this.commonService.convertToDateStringyyyy_mm_dd(this.supplierInvoiceHdr.endDt);
    }
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchListofSupplierInvoice();
    this.applyPreferredFilters();
    this.selectedSupplierInvoiceList = [];
  }

  clear() {
    this.supplierInvoiceHdr = new SupplierInvoiceHdr;
    this.ngOnInit();
    this.selectedSupplierInvoiceList = [];
  }

  validateSupplierInvoiceList: any =[];

  validateSupplierInvoiceStatus(){
    this.validateSupplierInvoiceList = []; 

    for (let i = 0; i < this.selectedSupplierInvoiceList.length; i++) {      
      if (this.selectedSupplierInvoiceList[i].invoiceStatus === 'BOOKED') {
        this.validateSupplierInvoiceList.push(this.selectedSupplierInvoiceList[i].supplierInvoiceHdrId);
      }
    } 
 
    this.commonService.commonInsertService('validateSupplierInvoiceStatus.sams', this.validateSupplierInvoiceList).subscribe(
      data => {
        if (data.success) {          
          this.commonService.openToastSuccessMessage(data.message);
          this.fetchListofSupplierInvoice();
          this.selectedSupplierInvoiceList = [];
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.selectedSupplierInvoiceList = [];
        }
      }
    );
  }

  approveSupplierInvoiceList: any =[];

  apporoveSupplierInvoiceStatus(){
    this.approveSupplierInvoiceList = []; 

    for (let i = 0; i < this.selectedSupplierInvoiceList.length; i++) {      
      if (this.selectedSupplierInvoiceList[i].invoiceStatus === 'VALIDATED') {
        this.approveSupplierInvoiceList.push(this.selectedSupplierInvoiceList[i].supplierInvoiceHdrId);
      }
    } 
 
    this.commonService.commonInsertService('approveSupplierInvoiceStatus.sams', this.approveSupplierInvoiceList).subscribe(
      data => {
        if (data.success) {          
          this.commonService.openToastSuccessMessage(data.message);
          this.fetchListofSupplierInvoice();
          this.selectedSupplierInvoiceList = [];
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.selectedSupplierInvoiceList = [];
        }
      }
    );
  }

  cancelSupplierInvoiceList: any =[];

  cancelSupplierInvoiceStatus(){
    this.cancelSupplierInvoiceList = []; 

    for (let i = 0; i < this.selectedSupplierInvoiceList.length; i++) {      
      if (this.selectedSupplierInvoiceList[i].invoiceStatus === 'BOOKED' || this.selectedSupplierInvoiceList[i].invoiceStatus === 'VALIDATED') {
        this.cancelSupplierInvoiceList.push(this.selectedSupplierInvoiceList[i].supplierInvoiceHdrId);
      }
    } 
 
    this.commonService.commonInsertService('cancelSupplierInvoiceStatus.sams', this.cancelSupplierInvoiceList).subscribe(
      data => {
        if (data.success) {          
          this.commonService.openToastSuccessMessage(data.message);
          this.fetchListofSupplierInvoice();
          this.selectedSupplierInvoiceList = [];
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.selectedSupplierInvoiceList = [];
        }
      }
    );
  }

  rejectSupplierInvoiceList: any =[];

  rejectSupplierInvoiceStatus(){
    this.rejectSupplierInvoiceList = []; 

    for (let i = 0; i < this.selectedSupplierInvoiceList.length; i++) {      
      if (this.selectedSupplierInvoiceList[i].invoiceStatus === 'APPROVED') {
        this.rejectSupplierInvoiceList.push(this.selectedSupplierInvoiceList[i].supplierInvoiceHdrId);
      }
    } 
 
    this.commonService.commonInsertService('rejectSupplierInvoiceStatus.sams', this.rejectSupplierInvoiceList).subscribe(
      data => {
        if (data.success) {          
          this.commonService.openToastSuccessMessage(data.message);
          this.fetchListofSupplierInvoice();
          this.selectedSupplierInvoiceList = [];
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.selectedSupplierInvoiceList = [];
        }
      }
    );
  }

  dialogRef;

  openMatchDataTable() {
    let supplierInvoiceHdrId : Number = 0;
    for (let i = 0; i < this.selectedSupplierInvoiceList.length; i++) {      
      supplierInvoiceHdrId = this.selectedSupplierInvoiceList[i].supplierInvoiceHdrId;
    } 
    console.log("supplierInvoiceHdrId" , supplierInvoiceHdrId);
    this.dialogRef = this.dialog.open(SuppInvMatchDataComponent, {
      height: 'auto',
      width: '1100px',
      data: {
        'supplierInvoiceHdrId': supplierInvoiceHdrId
      }
    });
    this.dialogRef.disableClose = false;
    this.dialogRef.afterClosed().subscribe(
      data => {
        if(data == 'proceed') {
          this.validateSupplierInvoiceStatus();
        } 
      });
  }

  generateSupplierInvoicePDF() {

  }


  supplierInvoiceCancel() {
    let dialogRef = this.dialog.open(CancelConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Invoice : '+this.supplierInvoiceNumberCancel
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          this.commonService.commonGetService('updateSupplierInvoiceHdrStatus.sams', this.SupplierhdrIdCancel, 'CANCELLED').subscribe(
            data => {
              if (data.success) {
                this.commonService.openToastSuccessMessage(data.message);
                this.fetchListofSupplierInvoice();
              } else {
                this.commonService.openToastErrorMessage(data.message);
              }
            }
          );
          // }
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
      this.commonService.commonInsertService(this.assetOptimaServices.fetchUserPreferenceInfo, this.userPreference).subscribe(
        data => {
          if(data.responseData !== undefined) {
            this.userPreference = data.responseData;
            if(this.userPreference.customColumnsList.length>0) {
              this.displayedColumns = this.userPreference.customColumnsList;
            }
            this.supplierInvoiceHdr = JSON.parse(this.userPreference.customFilters);
          }
          resolve(true);
        }
      )
    });
    return userPreferenceInfo;
    
  }
  
  applyPreferredFilters() {
    //SAVE TO USER PREFERENCE TABLE
    this.userPreference.customFilters = JSON.stringify(this.supplierInvoiceHdr);
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

}
