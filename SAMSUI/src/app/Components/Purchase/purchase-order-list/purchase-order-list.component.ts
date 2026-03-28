import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { PurchaseOrderHdr } from 'src/app/Model/purchase/poHdr';
import { Title } from '@angular/platform-browser';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseOrderHistoryAuditComponent } from '../purchase-order-history-audit/purchase-order-history-audit.component';
import { getData } from 'src/app/Model/common/fetchListData';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { ConfirmConfirmationComponent } from '../../Common-components/confirm-confirmation/confirm-confirmation.component';
import { allBusinessPartnerRoles, allWorkflowStatus } from 'src/app/Constants/AllStatusConstants';
import * as moment from 'moment';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { CancelConfirmationComponent } from '../../Common-components/cancel-confirmation/cancel-confirmation/cancel-confirmation.component';
import { RejectConfirmationComponent } from '../../Common-components/reject-confirmation/reject-confirmation.component';
import { PrPoViewInfoComponent } from '../pr-po-view-info/pr-po-view-info.component';
import { PrViewInfoComponent } from '../pr-view-info/pr-view-info.component';
import { PoPdfPreviewComponent } from '../../Common-components/po-pdf-preview/po-pdf-preview/po-pdf-preview.component';
import { UserPrefernce } from 'src/app/Services/user-preference/user-preference';

@Component({
  selector: 'app-purchase-order-list',
  templateUrl: './purchase-order-list.component.html',
  styleUrls: ['./purchase-order-list.component.css']
})
export class PurchaseOrderListComponent implements OnInit {

  defaultColumns = ['select', 'sNo', 'locationName', 'poNO', 'prDetails', 'poRevNo', 'poDtDisp', 'businessPartnerName', 'poType', 'poStatus', 'poApprovalStatus', 'totalPoQty', 'grandTotal', 'updatedDt'];
  displayedColumns = [...this.defaultColumns];


  // displayedColumns = ['select','sNo', 'locationName', 'poNO','prDetails', 'poRevNo', 'poDtDisp','businessPartnerName','poType', 'poStatus','poApprovalStatus','totalPoQty','amtInfo', 'updatedInfo'];
  poMainDataSource = [];

  //USER PREFERENCE
  public userPreference: UserPrefernce;
  showManageColumns: boolean = false;

  scrollSuppliersync: boolean = false;
  supplierPageNumber: number;
  supplierList: any = [];

  scrollsyncSupplier: boolean = false;
  recordsPerPageForCombo: string;
  supplierCombo: any = [];

  enableActionBtn: boolean = true;
  enableActionBtnForCancel: boolean = true;
  selectAllPO: boolean = false;
  enableEditAction: boolean = false;

  scrollLocationNamesync: boolean = false;
  limitCount: any = '';
  locationNamePageNumber: number;
  locationCombo: any = [];

  scrollPurchaseTypesync: boolean = false;
  purchaseTypePageNumber: number;
  purchaseTypeCombo: any = [];

  scrollPurchaseUsagesync: boolean = false;
  purchaseUsagePageNumber: number;
  purchaseUsageCombo: any = [];

  scrollPORevNosync: boolean = false;
  poRevNoPageNumber: number;
  poRevNoList: any = [];

  scrollPONosync: boolean = false;
  poNoPageNumber: number;
  poNoList: any = [];

  poCancelList: any = [];
  //Set Page Title
  title = 'Asset Optima - Purchase Order';

  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  //LOADER
  subloaderPO: boolean = false;

  moduleAccessPR: ModuleAccessModel;

  poHdr: PurchaseOrderHdr;
  poId: number = 1;
  getData: getData;

  selectedItem: any = 0;
  poCancelhdrId: number;
  poCancelNumber: string;

  selectedPOList = [];

  multiSelectFlag: boolean = false;
  selectedPOListLength: number = -1;
  selectedPoStatus: string = '';

  processStatusCombo1: any = [];
  scrollSyncProcessStatus: boolean = false;
  processStatusPageNumber1: number;

  previousSelectedLocations: any[] = [];
  previousSelectedBusinessPartners: any[] = [];
  maxStartDate: any;
  maxEndDate: null;

  constructor(private titleService: Title,
    private readonly userSession: UserSessionService,
    private commonService: CommonService,
    private assetOptimaConstants: AssetOptimaConstants,
    private assetOptimaServices: AssetOptimaServices,
    private router: Router, private dialog: MatDialog,
    public assetOptimeMthnd: AssetOptimaServices,
    private samsService: AssetOptimaServices,
    private activatedRoute: ActivatedRoute) {
    this.moduleAccessPR = new ModuleAccessModel();
    this.pageSize = '100';
    this.pageIndex = '0';
    this.poHdr = new PurchaseOrderHdr();
    this.supplierPageNumber = 1;
    this.getData = new getData();
    this.locationNamePageNumber = 1;
    this.purchaseTypePageNumber = 1;
    this.purchaseUsagePageNumber = 1;
    this.poRevNoPageNumber = 1;
    this.poNoPageNumber = 1;
    this.processStatusPageNumber1 = 1;
  }

  ngOnInit() {

    this.moduleAccessPR = this.userSession.getUserGroupAccess()['GROUPACCESS_PURCHASE_ORDER'];
    this.titleService.setTitle(this.title);

    this.poHdr.columnName = 'updatedDt';
    this.poHdr.completionFlg = -1;

    // if(localStorage.getItem('PURCHASE_ORDER_SEARCH_PARAMATER') == null) {
    //   this.poHdr.direction = 'desc';
    //   this.poHdr.locationName = this.userSession.getUserLocationName();
    //   this.poHdr.locationId = this.userSession.getUserLocationId();
    //   this.poHdr.columnName = 'updatedDt';
    // } else {
    //   this.poHdr = JSON.parse(localStorage.getItem('PURCHASE_ORDER_SEARCH_PARAMATER'));
    // }

    this.poHdr.direction = 'desc';
    this.poHdr.locationName = this.userSession.getUserLocationName();
    this.poHdr.locationId = this.userSession.getUserLocationId();
    this.poHdr.columnName = 'updatedDt';

    this.userPreference = new UserPrefernce();
    this.userPreference.moduleKey = 'GROUPACCESS_PURCHASE_ORDER';
    // this.getUserPreferenceInfo();

    let userPreferenceData = this.getUserPreferenceInfo();
    userPreferenceData.then((response) => {
      this.fetchListofPO();
    })


    this.selectedPOList = [];
    this.enableActionBtn = true;
    this.enableActionBtnForCancel = true;

    this.poRevNoList = [];
    this.poNoList = [];
    this.supplierCombo = [];

    this.locationNamePageNumber = 1;
    this.purchaseTypePageNumber = 1;
    this.purchaseUsagePageNumber = 1;
    this.poRevNoPageNumber = 1;
    this.poNoPageNumber = 1;
  }

  searchPO() {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchListofPO();
    this.selectedItem = 0;

    this.applyPreferredFilters();
  }

  fetchListofPO() {
    this.poHdr.pageNumber = Number(this.pageIndex);
    this.poHdr.recordsPerPage = Number(this.pageSize);
    this.subloaderPO = true;
    this.poMainDataSource = null;
    this.commonService.commonListService('fetchListOfAllPurchaseOrder.sams', this.poHdr).subscribe(
      data => {
        if (data.success) {
          this.subloaderPO = false;
          this.length = data.responseData.dataTotalRecCount;
          this.poMainDataSource = data.responseData.dataList;
          localStorage.setItem('PURCHASE_ORDER_SEARCH_PARAMATER', JSON.stringify(this.poHdr));
        } else {
          this.subloaderPO = false;
        }
      }, error => {
        this.subloaderPO = false;
      }
    );
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchListofPO();
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  customSort(event) {
    this.poHdr.pageNumber = 0;
    this.poHdr.columnName = event.active;
    this.poHdr.direction = event.direction;
    this.fetchListofPO();
  }

  viewPO(poHdrId?: number, mode?: string) {
    //this.router.navigate(['home/purchase/purchaseOrderCreate/' + this.selectedPOList[0].poId + '/' + mode]);


    this.router.navigate(['home/purchase/purchaseOrderCreate/' + poHdrId + '/' + mode]
    );
  }

  poHistoryPopUp;
  viewPOAudit(poId) {
    this.poHistoryPopUp = this.dialog.open(PurchaseOrderHistoryAuditComponent, {
      height: '600px',
      width: '1200px',
      data: { 'poHdrId': poId }
    });
    this.poHistoryPopUp.disableClose = true;
    this.poHistoryPopUp.afterClosed().subscribe(
      data => {
        this.ngOnInit();
      });
  }

  generatePOPdfReport() {
    this.commonService.commonGetService('generatePurchaseOrderPdf.sams', this.selectedPOList[0].poId).subscribe(
      data => {
        if (data.success) {
          this.downloadDocument(data.responseData, 'application/pdf');
        } else {
        }
      }, error => {
      }
    );

  }

  // downloadDocument(filePath: string, contentType) {
  //   var fileName = filePath.split('.')[0];
  //   this.commonService.downloadFileFromServer(filePath, contentType).subscribe(
  //     data => {
  //       let file = filePath.split('.');
  //       this.commonService.showDownloadPopUp(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
  //       this.commonService.openToastSuccessMessage("Pdf Report Downloaded Successfully.");
  //     }
  //   );
  // }

  poPdfRef;
  downloadDocument(filePath: string, contentType) {
    let pdfSrcFile = this.commonService.downloadFileFromServerToView(filePath, contentType);
    this.poPdfRef = this.dialog.open(PoPdfPreviewComponent, {
      data: {
        "filePath": pdfSrcFile,
        "contentType": contentType
      }
    });

    this.poPdfRef.disableClose = true;
    this.poPdfRef.afterClosed().subscribe(
      data => {

      });
  }

  clear() {
    this.poHdr = new PurchaseOrderHdr();
    localStorage.removeItem('PURCHASE_ORDER_SEARCH_PARAMATER');

    this.poHdr.direction = 'desc';
    this.poHdr.columnName = 'updatedDt';
    this.applyPreferredFilters();

    this.ngOnInit();
    this.selectedItem = 0;
  }

  loadSupplierComboData(searchValue) {
    this.scrollsyncSupplier = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.SUPPLIER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchValue.term, '', '',
      this.recordsPerPageForCombo, this.supplierPageNumber, '', partnerRoles).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.supplierPageNumber, this.supplierCombo, data.responseData.comboList)
          this.supplierPageNumber = this.getData.pageNumber;
          this.supplierCombo = this.getData.dataList;
          this.scrollsyncSupplier = false;
        }
      );
  }

  // selectedSupplierList(event) {
  //   if(event===undefined){
  //     this.poHdr.businessPartnerId=0;
  //     this.poHdr.businessPartnerName='';  
  //     this.supplierPageNumber=1;
  //     this.supplierCombo=[];
  //   }else{
  //     this.poHdr.businessPartnerId=event.businessPartnerId;
  //     this.poHdr.businessPartnerName=event.businessPartnerName;
  //   }
  // }
  selectedSupplierList(event) {
    if (event === undefined || event.length <= 0) {
      this.poHdr.businessPartnerId = 0;
      this.poHdr.businessPartnerName = '';
      this.supplierPageNumber = 1;
      this.supplierCombo = [];

      this.poHdr.selectedBusinessPartnerIds = [];
      this.previousSelectedBusinessPartners = [];
    } else {
      this.poHdr.businessPartnerId = event.businessPartnerId;
      this.poHdr.businessPartnerName = event.businessPartnerName;

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
          this.poHdr.selectedBusinessPartnerIds.splice(removedIndex, 1);
        }
        // Update the previous selection list
        this.previousSelectedBusinessPartners = currentBusinessPartnerNames;
      } else {
        this.poHdr.selectedBusinessPartnerIds = event.map(businessPartner => businessPartner.businessPartnerId);
      }
      // Update the previous selection list
      this.previousSelectedBusinessPartners = event.map(businessPartner => businessPartner.businessPartnerName);
    }
  }

  setReceiptStatus(event) {
    if (event === undefined) {
      this.poHdr.completionFlg = -1;
    } else {
      if (event.name == 'INCOMPLETE') {
        this.poHdr.completionFlg = 0;
      } else if (event.name == 'COMPLETE') {
        this.poHdr.completionFlg = 1;
      } else {
        this.poHdr.completionFlg = -1;
      }
    }
  }

  receiptStatus = [
    { id: 0, name: 'INCOMPLETE' },
    { id: 1, name: 'COMPLETE' }
  ];

  poStatus = [
    { id: 'BOOKED', name: 'BOOKED' },
    { id: 'APPROVED', name: 'APPROVED' },
    { id: 'CANCELLED', name: 'CANCELLED' },
    { id: 'REJECTED', name: 'REJECTED' }
  ];

  srStartDateValidation(event: any): void {
    const selectedStartDate: Date = event.value;
    const selectedEndDate: Date = this.poHdr.endDt ? new Date(this.poHdr.endDt) : null;

    if (selectedStartDate) {
      if (selectedEndDate && selectedStartDate > selectedEndDate) {
        this.commonService.openToastWarningMessage("Start Date cannot be after End Date.");
        this.poHdr.fromDt = null;
        return;
      }
      this.poHdr.fromDt = moment(selectedStartDate).format(this.assetOptimaConstants.ISODate);
    } else {
      this.poHdr.fromDt = null;
    }
  }

  srEndDateValidation(event: any): void {
    const selectedEndDate: Date = event.value;
    const selectedStartDate: Date = this.poHdr.fromDt ? new Date(this.poHdr.fromDt) : null;

    if (selectedEndDate) {
      if (selectedStartDate && selectedEndDate < selectedStartDate) {
        this.commonService.openToastWarningMessage("End Date cannot be before Start Date.");
        this.poHdr.endDt = null;
        return;
      }
      this.poHdr.endDt = moment(selectedEndDate).format(this.assetOptimaConstants.ISODate);
    } else {
      this.poHdr.endDt = null;
    }
  }
  filterStartDate = (date: Date | null): boolean => {
    if (!date) return false;
    if (this.poHdr.endDt) {
      const endDate = new Date(this.poHdr.endDt);
      return date <= endDate;
    }
    return true;
  }

  filterEndDate = (date: Date | null): boolean => {
    if (!date) return false;
    if (this.poHdr.fromDt) {
      const startDate = new Date(this.poHdr.fromDt);
      return date >= startDate;
    }
    return true;
  }


  selectPO(element) {
    console.log('element', element);
    this.poCancelhdrId = element.poId;
    this.poCancelNumber = element.poNO;

    const indentId = this.selectedPOList.findIndex(data => data.poId === element.poId);

    this.enableActionBtn = false;
    this.enableActionBtnForCancel = true;

    const index = this.selectedPOList.findIndex((data) => data.poId === element.poId);

    if (index === -1) {
      this.selectedPOList.push(element);
    } else {
      this.selectedPOList.splice(index, 1);
    }

    if (element.poStatus == 'BOOKED' || element.poStatus == 'REJECTED') {
      this.enableActionBtnForCancel = false;
    }


    if (this.selectedPOList.length === 1) {
      this.enableActionBtn = false;
      this.selectedItem = this.selectedPOList[0].poId;
      this.selectedPoStatus = this.selectedPOList[0].poStatus;
    } else {
      this.enableActionBtn = true;
      this.enableActionBtnForCancel = true;
      this.selectedPoStatus = '';

      for (let i = 0; i < this.selectedPOList.length; i++) {
        this.selectedItem = this.selectedPOList[i].poId;
      }
    }
    if (element.grnCreated) {
      this.enableEditAction = true;
    }
  }

  selectAllPoLists(event) {
    this.selectAllPO = event.checked;
    this.enableActionBtn = false;

    if (event.checked) {
      this.selectedPOList = this.poMainDataSource;
    }
    else {
      this.selectedPOList = [];
    }

    if (this.selectedPOList.length === 1) {
      this.enableActionBtn = false;
    }
    else {
      this.enableActionBtn = true;
    }
  }

  compareValue(element: any): boolean {
    return this.selectedPOList.findIndex(data => data.poId === element.poId) !== -1;
  }

  checkApprovalValid() {
    if (this.selectedPOList.length > 0) {
      // return !(this.selectedPOList.findIndex(data => data.poStatus !== "BOOKED" || data.approvalId <=0 ) === -1);
      return false;
    }
    else
      return true;
  }

  checkPoCancel() {
    if (this.selectedPOList.length > 0) {
      return (this.selectedPOList.findIndex(data => data.poStatus === "BOOKED") === -1);
    }
    else
      return true;
  }

  validateAndApprovePO() {
    if (this.selectedPOList[0].poTempDtlList.length == 0 && this.selectedPOList[0].termsCondition == "") {

      const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
        height: 'auto',
        width: '400px',
        data: {
          confirmHeading: 'Confirmation',
          confirmMsg: `Are you sure to approve without terms and condition?`
        }
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(data => {
        if (data.status === true) {
          this.poApprove();
        } else {

        }
      });

    } else {
      this.poApprove();
    }
  }

  poApprove() {
    if (this.selectedPOList.length === 1 && this.selectedPOList[0].approvalId > 0) {
      if (this.selectedPOList[0].poWithoutPrice && this.selectedPOList[0].poWithoutSupplier) {
        if (this.selectedPOList[0].grandTotal <= 0 && this.selectedPOList[0].businessPartnerName == '') {
          this.commonService.openToastWarningMessage("Unit price/Supplier information is missing. Kindly input the mandatory fields.");
        } else if (this.selectedPOList[0].grandTotal <= 0) {
          this.commonService.openToastWarningMessage("Unit price/Supplier information is missing. Kindly input the mandatory fields.");
        } else if (this.selectedPOList[0].businessPartnerName == '') {
          this.commonService.openToastWarningMessage("Unit price/Supplier information is missing. Kindly input the mandatory fields.");
        } else {
          this.poWorkflowApproval(true);
        }
      } else if (this.selectedPOList[0].poWithoutPrice && this.selectedPOList[0].grandTotal <= 0) {
        this.commonService.openToastWarningMessage("Unit price/Supplier information is missing. Kindly input the mandatory fields.");
      } else if (this.selectedPOList[0].poWithoutSupplier && this.selectedPOList[0].businessPartnerName == '') {
        this.commonService.openToastWarningMessage("Unit price/Supplier information is missing. Kindly input the mandatory fields.");
      } else {
        this.poWorkflowApproval(true);

      }
    } else {

      this.selectedPOList = this.selectedPOList.filter(function (element) {
        return (!element.poWithoutPrice && !element.poWithoutSupplier) || ((element.poWithoutPrice && element.grandTotal > 0) && (element.poWithoutSupplier && element.businessPartnerName != '')) ||
          ((element.poWithoutPrice && element.grandTotal > 0) && (!element.poWithoutSupplier)) || ((!element.poWithoutPrice) && (element.poWithoutSupplier && element.businessPartnerName != ''));
      });

      this.poWorkflowApproval(true);
    }
  }

  poWorkflowApproval(status) {

    this.selectedPOList = this.selectedPOList.filter(function (element) {
      return element.approvalId !== 0 && element.poStatus != "CLOSED" && element.poStatus != "REJECTED" && element.poStatus != "CANCELLED";
    });

    this.selectedPOListLength = this.selectedPOList.length;

    let result;
    if (status) {
      result = this.commonService.commonWorkflowService(allWorkflowStatus[allWorkflowStatus.PO], this.selectedPOList, " Selected Purchase Order ");
    } else {
      // not required for single reject
      //result = this.commonService.rejectApprove(allWorkflowStatus[allWorkflowStatus.PO],this.selectedPOList,"");
    }

    result.then(data => {
      if (data) {

        this.multiSelectFlag = false;
        setTimeout(() => {
          this.ngOnInit();
        }, 600);
      } else {
        this.multiSelectFlag = false;
        this.selectedPOList = [];
      }
    })
  }

  generateReport() {
    this.poHdr.columnName = 'updatedDt';
    this.commonService.commonListService('reports/purchaseOrder/generatePurchaseOrderReport.sams', this.poHdr).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      }, error => {
        // alert('error');
      }
    );
  }

  poCancel() {

    this.selectedPOList = this.selectedPOList.filter(function (element) {
      return element.poStatus != "CLOSED" && element.poStatus != "CANCELLED";
    });

    this.selectedPOListLength = this.selectedPOList.length;

    let dialogRef = this.dialog.open(CancelConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        Text: 'PO : ' + this.poCancelNumber,
        // note : 'Note : Only PO under your queue will be Cancelled',
        selectedElementListLength: this.selectedPOListLength
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {

          let cancelReason = data.cancelReason;

          this.poCancelList = [];

          for (let i = 0; i < this.selectedPOList.length; i++) {
            if (this.selectedPOList[i].poStatus === 'BOOKED' || this.selectedPOList[i].poStatus === 'REJECTED') {
              this.poCancelList.push(this.selectedPOList[i].poId);
            }
          }

          let poIdList = { poCancelList: [], cancelReason: cancelReason };
          poIdList.poCancelList = this.poCancelList;
          poIdList.cancelReason = cancelReason;
          this.commonService.showSpinner();

          this.commonService.commonInsertService('cancelMultiplePO.sams', poIdList).subscribe(
            data => {
              if (data.success) {
                this.commonService.openToastSuccessMessage(data.message);
                this.fetchListofPO();
                this.commonService.hideSpinner();
                this.selectedPOList = [];
              } else {
                this.commonService.hideSpinner();
                this.commonService.openToastErrorMessage(data.message);
                this.selectedPOList = [];
              }
            }
          );

          // this.commonService.commonGetService('updatePOStatus.sams', this.poCancelhdrId, 'CANCELLED').subscribe(
          //   data => {
          //     if (data.success) {
          //       this.commonService.openToastSuccessMessage(data.message);
          //       this.fetchListofPO();
          //     } else {
          //       this.commonService.openToastErrorMessage(data.message);
          //     }
          //   }
          // );
          // }
          this.multiSelectFlag = false;
        } else {
          this.multiSelectFlag = false;
          this.selectedPOList = [];
        }
      });
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
  //     this.poHdr.locationId = 0;
  //     this.locationNamePageNumber = 1;
  //   } else {
  //     this.poHdr.locationId = event.locationId;
  //   }
  // }

  setLocationNameComboValue(event) {
    if (event === undefined || event.length <= 0) {
      this.poHdr.locationId = 0;
      this.locationNamePageNumber = 1;

      this.poNoPageNumber = 1;
      this.poNoList = [];

      this.poHdr.selectedLocationIds = [];
      this.previousSelectedLocations = [];
    } else {
      this.poHdr.locationId = event.locationId;

      this.poNoPageNumber = 1;
      this.poNoList = [];

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
          this.poHdr.selectedLocationIds.splice(removedIndex, 1);
        }
        // Update the previous selection list
        this.previousSelectedLocations = currentLocationNames;
      } else {
        this.poHdr.selectedLocationIds = event.map(location => location.locationId);
      }
      // Update the previous selection list
      this.previousSelectedLocations = event.map(location => location.locDisplayField);
    }
  }

  listofPurchaseType(searchValue) {
    this.scrollPurchaseTypesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfPurchasingTypeCombo, searchValue.term, '', '', this.limitCount, this.purchaseTypePageNumber, 'PO').subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.purchaseTypePageNumber, this.purchaseTypeCombo, data.responseData.comboList)
        this.purchaseTypePageNumber = this.getData.pageNumber;
        this.purchaseTypeCombo = this.getData.dataList;
        this.scrollPurchaseTypesync = false;
      }
    );
  }

  setPurchaseType(event) {
    if (event === undefined) {
      this.poHdr.poType = '';
      this.purchaseTypePageNumber = 1;
    } else {
      this.poHdr.poType = event.purchasingTypeName;
    }
  }

  listofPurchaseUsage(searchValue) {
    this.scrollPurchaseUsagesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfPurchasingUsageCombo, searchValue.term, '', '', this.limitCount, this.purchaseUsagePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.purchaseUsagePageNumber, this.purchaseUsageCombo, data.responseData.comboList)
        this.purchaseUsagePageNumber = this.getData.pageNumber;
        this.purchaseUsageCombo = this.getData.dataList;
        this.scrollPurchaseUsagesync = false;
      }
    );
  }

  setPurchaseUsage(event) {
    if (event === undefined) {
      this.poHdr.poUsage = '';
      this.purchaseUsagePageNumber = 1;
    } else {
      this.poHdr.poUsage = event.purchasingUsageName;
    }
  }

  listofPoRevNo(searchValue) {
    this.scrollPORevNosync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllPORevNoforCombo, searchValue.term, '', '', this.limitCount, this.poRevNoPageNumber, this.poHdr.poNO).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.poRevNoPageNumber, this.poRevNoList, data.responseData.comboList)
        this.poRevNoPageNumber = this.getData.pageNumber;
        this.poRevNoList = this.getData.dataList;
        this.scrollPORevNosync = false;
      }
    );
  }

  setRevNo(event) {
    if (event === undefined) {
      this.poHdr.poRevNo = '';
      this.poRevNoPageNumber = 1;
    } else {
      this.poHdr.poRevNo = event.poRevNo;
    }
  }



  listofPoNo(searchValue) {
    this.scrollPONosync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllPurchaseNoCombo, searchValue.term, this.poHdr.locationId, '', this.limitCount, this.poNoPageNumber, '', '', '', '', this.poHdr.selectedLocationIds).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.poNoPageNumber, this.poNoList, data.responseData.comboList)
        this.poNoPageNumber = this.getData.pageNumber;
        this.poNoList = this.getData.dataList;
        this.scrollPONosync = false;
      }
    );
  }

  // setPONo(event) {
  //   if (event === undefined) {
  //     this.poHdr.poNO = '';
  //     this.poNoPageNumber = 1;
  //   } else {
  //     this.poHdr.poNO = event.poNO;
  //   }
  // }

  setPONo(event) {
    if (event === undefined || event.length <= 0) {
      this.poHdr.poNO = '';
      this.poNoPageNumber = 1;
    } else {
      this.poHdr.poNO = event.poNO;
    }
  }

  poWorkflowReject() {


    this.selectedPOList = this.selectedPOList.filter(function (element) {
      return element.approvalId !== 0 && element.poStatus != "CLOSED" && element.poStatus != "CANCELLED";
    });

    this.selectedPOListLength = this.selectedPOList.length;

    let selectdList = this.selectedPOList;
    const dialogRef = this.dialog.open(RejectConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        confirmHeading: 'Confirmation',
        confirmMsg: 'Are you sure to Reject selected Purchase Order ?',
        note: 'Note : Only PO under your queue will be Rejected',
        selectedElementListLength: this.selectedPOListLength
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status === true) {
          let rejectReason = data.reason

          let poIdList = { selectedPoList: [], status: 'REJECTED', selectedApprovalList: [], selectedPoType: "", rejectReason: rejectReason };
          for (let i = 0; i <= selectdList.length - 1; i++) {
            poIdList.selectedPoList.push(selectdList[i].poId);
            poIdList.selectedPoType = selectdList[i].poType;
            poIdList.selectedApprovalList.push(selectdList[i].approvalId);
          }
          this.commonService.showSpinner();
          this.commonService.commonInsertService('approveRejectPO.sams', poIdList).subscribe(
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
          this.multiSelectFlag = false;
        } else {
          this.multiSelectFlag = false;
          this.selectedPOList = [];
        }
      });
  }

  viewPrDetails(selectedItem) {

    let dialogRef = this.dialog.open(PrViewInfoComponent, {
      width: '85%',
      height: 'auto',
      data: {
        'selectedItem': selectedItem
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {

      });
  }

  selectMultiplePR() {
    const seen = new Set();

    if (this.multiSelectFlag) {

      this.poMainDataSource.forEach(poData => {
        this.selectedPOList.push(poData);
      });

    } else {
      this.selectedPOList = [];
    }

    this.enableActionBtn = true;

    this.selectedPOList = this.selectedPOList.filter(element => {
      const jsonElement = JSON.stringify(element);
      const isDuplicate = seen.has(jsonElement);
      seen.add(jsonElement);
      return !isDuplicate;
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
        if (data.success) {
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
          if (data.responseData !== undefined) {
            this.userPreference = data.responseData;
            if (this.userPreference.customColumnsList.length > 0) {
              this.displayedColumns = this.userPreference.customColumnsList;
            }
            this.poHdr = JSON.parse(this.userPreference.customFilters);

            if (this.poHdr.selectedLocationNames != null && this.poHdr.selectedLocationNames.length > 0) {
              this.previousSelectedLocations = this.poHdr.selectedLocationNames;
            }
            if (this.poHdr.selectedBusinessPartnerNames != null && this.poHdr.selectedBusinessPartnerNames.length > 0) {
              this.previousSelectedBusinessPartners = this.poHdr.selectedBusinessPartnerNames;
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
    this.userPreference.customFilters = JSON.stringify(this.poHdr);
    this.commonService.commonInsertService(this.samsService.saveOrUpdateUserPreference, this.userPreference).subscribe(
      data => {
        if (data.success) {
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
    let workflowProcessId = allWorkflowStatus.PO;
    this.commonService.getComboResults('listOfAllWorkflowProcessStatusCombo.sams', searchValue.term, workflowProcessId, '',
      this.recordsPerPageForCombo, this.processStatusPageNumber1).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.processStatusPageNumber1, this.processStatusCombo1, data.responseData.comboList)
          this.processStatusPageNumber1 = this.getData.pageNumber;
          this.processStatusCombo1 = this.getData.dataList;
          this.scrollSyncProcessStatus = false;
        }
      );
  }

  setProcessStatus(event) {

    if (event === undefined) {
      this.poHdr.processStatus = '';
      this.poHdr.workflowProcessStatusId = 0;
      this.processStatusPageNumber1 = 1;
      this.processStatusCombo1 = [];
    } else {
      this.poHdr.processStatus = event.processName;
      this.poHdr.workflowProcessStatusId = event.workflowProcessId;
    }
  }


   ngAfterContentInit(){
  
          this.poHdr = new PurchaseOrderHdr;
      
          this.poHdr.direction = 'desc';
          this.poHdr.columnName = 'updatedDt';
      
          // From dashboard
           this.activatedRoute.queryParams.subscribe(query => {
      
             if(query?.locationId){
              this.poHdr.selectedLocationIds = []; 
              this.poHdr.selectedLocationIds.push(Number(query.locationId));
              this.poHdr.selectedLocationNames = [query.locationName];
             }
  
             if (query?.poStatus) {
                this.poHdr.poStatus = '';
                this.poHdr.poStatus = query.poStatus;  
  
             }
              

    });

}

}
