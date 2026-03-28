import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { Title } from '@angular/platform-browser';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { PurchaseRequestHdr } from 'src/app/Model/purchase/prReqHdr';
import { Router } from '@angular/router';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { PurchaseRequestDtl } from 'src/app/Model/purchase/prReqDtl';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { getData } from 'src/app/Model/common/fetchListData';
import * as moment from 'moment';
import { allBusinessPartnerRoles, allWorkflowStatus } from 'src/app/Constants/AllStatusConstants';
import { ConfirmConfirmationComponent } from '../../Common-components/confirm-confirmation/confirm-confirmation.component';
import { PrPoConvertInfoComponent } from './pr-po-convert-info/pr-po-convert-info.component';
import { CancelConfirmationComponent } from '../../Common-components/cancel-confirmation/cancel-confirmation/cancel-confirmation.component';
import { RejectConfirmationComponent } from '../../Common-components/reject-confirmation/reject-confirmation.component';
import { PrPoViewInfoComponent } from '../pr-po-view-info/pr-po-view-info.component';
import { UserPrefernce } from 'src/app/Services/user-preference/user-preference';
import { resolve } from 'path';


@Component({
  selector: 'app-purchase-request-list',
  templateUrl: './purchase-request-list.component.html',
  styleUrls: ['./purchase-request-list.component.css']
})
export class PurchaseRequestListComponent implements OnInit {
  defaultColumns = ['select', 'sNo', 'locationName', 'assetCode', 'pr_po_details', 'poReqNo', 'supplierName', 'itemDesc', 'createdBy', 'poReqStatus', 'prApprovalStatus', 'grandTotal', 'updatedDt'];

  // defaultColumns = ['select', 'sno', 'legalEntityCode', 'legalEntityName', 'updatedBy', 'updatedDt'];
  displayedColumns = [...this.defaultColumns];
  prMainDataSource = new MatTableDataSource<PurchaseRequestListComponent>();
  limitCount: any;

  //Set Page Title
  title = 'Asset Optima - Purchase Request';

  //COMBO
  locationCombo: any = [];
  locationPageNumber: number;
  scrollsyncLocation: boolean = false;
  recordsPerPageForCombo: string;

  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('prSearch') focusPRSearch: ElementRef;
  public prHdr: PurchaseRequestHdr;
  public purchaseRequestDtl: PurchaseRequestDtl;
  searchvalue: any = '';
  panelOpenState = false;
  showFiller = false;
  mode = new FormControl('over');

  //LOADER
  subloaderPR: boolean = false;
  subScrollsync: boolean = false;
  scrollSRNosync: boolean = false;
  srNoCombo: any = [];
  srNoPageNumber: number;

  assetCodePageNumber: number;
  assetCodeCombo: any = [];
  scrollsyncAssetCode: boolean = false;

  purchaseRequestPageNumber: number;
  purchaseStatusCombo: any = [];
  scrollsyncPurchaseRequest: boolean = false;

  //FOR VIEW
  viewData: any;

  //PERMISSIONS 
  poModelAccessModule: ModuleAccessModel;
  prModelAccessModule: ModuleAccessModel;

  scrollsyncModel: boolean = false;
  categoryScrollsync: boolean = false;
  getData: getData;
  selectedPRList: any = [];
  prCancelList: any = [];
  poDtlList: any = { poDtlList: [], LocId: 0 };

  selectedItem: any = 0;
  selectedPoReqStatus: any = '';
  enableActionBtn: boolean = true;

  multiSelectFlag: boolean = false;
  selectedPRListLength: number = -1;

  processStatusCombo1: any = [];
  scrollSyncProcessStatus: boolean = false;
  processStatusPageNumber1: number;

  scrollsyncAssetGroup: boolean = false;
  assetGroupPageNumber: number;
  assetGroup: any = [];

  modelComboPageNumber: number;
  modelCombo: any = [];
  //USER PREFERENCE
  public userPreference: UserPrefernce;
  showManageColumns: boolean = false;

  previousSelectedLocations: any[] = [];
  previousSelectedAssetCodes: any[] = [];
  previousAssetGroupNames: any[] = [];
  previousSelectedModels: any[] = [];
  previousSelectedBusinessPartners: any[] = [];
  previousSrNos: any[] = [];
  previousSelectedRegions: any[] = [];

  constructor(private dialog: MatDialog,
    private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private readonly userSessionService: UserSessionService,
    private titleService: Title,
    private router: Router,
    private samsService: AssetOptimaServices,
    private assetOptimaConstants: AssetOptimaConstants) {
    this.purchaseRequestPageNumber = 1;
    this.locationPageNumber = 1;
    this.pageSize = '100';
    this.pageIndex = '0';
    this.srNoPageNumber = 1;
    this.assetCodePageNumber = 1;
    this.processStatusPageNumber1 = 1;
    this.modelComboPageNumber = 1;
    this.assetGroupPageNumber = 1;
    this.prHdr = new PurchaseRequestHdr();
    this.getData = new getData();
    this.showManageColumns = false;

    this.userPreference = new UserPrefernce();
  }

  ngOnInit() {
    this.poModelAccessModule = this.userSessionService.getUserGroupAccess()['GROUPACCESS_PURCHASE_ORDER'];
    this.prModelAccessModule = this.userSessionService.getUserGroupAccess()['GROUPACCESS_PURCHASE_REQUEST'];

    //document.getElementById('commonFooter').style.display='block';
    this.titleService.setTitle(this.title);


    // if(localStorage.getItem('PURCHASE_REQUEST_SEARCH_PARAMETER') == null) {
    //   // this.prHdr.locationName = this.userSessionService.getUserLocationName();
    //   // this.prHdr.locationId = this.userSessionService.getUserLocationId();
    //   this.prHdr.direction = 'desc';
    //   this.prHdr.columnName = 'updatedDt';
    // } else {
    //   this.prHdr = JSON.parse(localStorage.getItem('PURCHASE_REQUEST_SEARCH_PARAMETER'));
    // }

    this.prHdr.direction = 'desc';
    this.prHdr.columnName = 'updatedDt';

    localStorage.removeItem('previousRoute');


    this.userPreference.moduleKey = 'GROUPACCESS_PURCHASE_REQUEST';
    // this.getUserPreferenceInfo();

    let userPreferenceData = this.getUserPreferenceInfo();
    userPreferenceData.then((response) => {
      this.fetchListofPR();
    })
  }

  createPR(poReqId?: number, mode?: string) {
    console.log('poHdrId', poReqId);
    console.log('selected data', this.selectedPRList)
    this.router.navigate(['home/purchase/purchaseRequestCreate/' + poReqId + '/' + mode]);
  }

  onSearchChange(searchValue: string) {
    this.searchvalue = searchValue;
    this.prHdr.poReqNo = searchValue;
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchListofPR();
  }

  fetchListofPR() {
    this.prHdr.pageNumber = Number(this.pageIndex);
    this.prHdr.recordsPerPage = Number(this.pageSize);
    this.subloaderPR = true;
    this.prMainDataSource = null;
    this.commonService.commonListService(this.assetOptimaServices.listOfPurchaseRequest, this.prHdr).subscribe(
      data => {
        if (data.success) {
          this.subloaderPR = false;
          this.length = data.responseData.dataTotalRecCount;
          // this.prMainDataSource = data.responseData.dataList;

          console.log("purchase request data list", data.responseData.dataList);
          this.prMainDataSource = new MatTableDataSource(data.responseData.dataList);
          localStorage.setItem('PURCHASE_REQUEST_SEARCH_PARAMETER', JSON.stringify(this.prHdr));
        } else {
          this.subloaderPR = false;
        }
      }, error => {
        this.subloaderPR = false;
      }
    );

  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchListofPR();
  }
  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  customSort(event) {
    this.prHdr.pageNumber = 0;
    this.prHdr.columnName = event.active;
    this.prHdr.direction = event.direction;
    this.fetchListofPR();
  }

  //VIEW Page
  openViewdialog(dialogView, element) {
    this.viewData = element;
    this.dialog.open(dialogView);
  }

  searchPR() {
    if (this.prHdr.fromDt != null) {
      this.prHdr.fromDt = this.commonService.convertToDateStringyyyy_mm_dd(this.prHdr.fromDt);
    }
    if (this.prHdr.endDt != null) {
      this.prHdr.endDt = this.commonService.convertToDateStringyyyy_mm_dd(this.prHdr.endDt);
    }
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchListofPR();
    this.selectedPRList = [];

    this.applyPreferredFilters();
  }

  clear() {
    this.prHdr = new PurchaseRequestHdr;
    localStorage.removeItem('PURCHASE_REQUEST_SEARCH_PARAMETER');

    this.prHdr.direction = 'desc';
    this.prHdr.columnName = 'updatedDt';
    this.applyPreferredFilters();

    this.ngOnInit();
    this.selectedPRList = [];
    this.prCancelList = [];
  }

  loadLocationComboData(searchValue) {
    this.scrollsyncLocation = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllUserLocForCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.locationPageNumber).subscribe(
        (data) => {
          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.locationPageNumber === 1) {
              this.locationCombo = data.responseData.comboList;
            } else {
              this.locationCombo = this.locationCombo.concat(data.responseData.comboList);
            } data.responseData.comboList.length != 0 ? this.locationPageNumber += 1 : this.locationPageNumber = 1;
          } else {
            this.locationCombo = data.responseData.comboList;
            this.locationPageNumber = 1;
          }
          this.scrollsyncLocation = false;
        }
      );
  }

  // selectedLocationData(event) {

  //   if (event === undefined) {
  //     this.prHdr.locationName = '';
  //     this.prHdr.locationId = 0; 
  //     this.locationPageNumber = 1;
  //     this.locationCombo = []; 
  //   } else {
  //     this.prHdr.locationName = event.locDisplayField;
  //     this.prHdr.locationId = event.locationId; 
  //   }

  // }

  selectedLocationData(event) {

    if (event === undefined || event.length <= 0) {
      this.prHdr.locationName = '';
      this.prHdr.locationId = 0;
      this.locationPageNumber = 1;
      this.locationCombo = [];

      this.assetCodeCombo = [];

      this.prHdr.selectedLocationIds = [];
      this.previousSelectedLocations = [];
    } else {
      this.prHdr.locationName = event.locDisplayField;
      this.prHdr.locationId = event.locationId;

      this.assetCodeCombo = [];
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
          this.prHdr.selectedLocationIds.splice(removedIndex, 1);
        }
        // Update the previous selection list
        this.previousSelectedLocations = currentLocationNames;
      } else {
        this.prHdr.selectedLocationIds = event.map(location => location.locationId);
      }

      // Update the previous selection list
      this.previousSelectedLocations = event.map(location => location.locDisplayField);

    }

  }

  generatePRPDF(poReqId?: number) {
    this.commonService.commonGetService(this.assetOptimaServices.generatePRPdf, poReqId).subscribe(
      data => {
        if (data.success) {
          this.downloadDocument(data.responseData, 'application/pdf');
        } else {
          this.subloaderPR = false;
        }
      }, error => {
        this.subloaderPR = false;
      }
    );
  }

  downloadDocument(filePath: string, contentType) {
    var fileName = filePath.split('.')[0];
    this.commonService.downloadFile(filePath, contentType).subscribe(
      data => {
        this.commonService.showDownloadPopUpPDF(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
      }
    );
  }

  loadServiceRequestNumbers(searchValue) {
    this.scrollSRNosync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllSRNoForCombo, searchValue.term, '', '', this.limitCount, this.srNoPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.srNoPageNumber, this.srNoCombo, data.responseData.comboList)
        this.srNoPageNumber = this.getData.pageNumber;
        this.srNoCombo = this.getData.dataList;
        this.scrollSRNosync = false;
      }
    );
  }

  // selectedSRNo(event) {
  //   if (event != undefined) {
  //     this.prHdr.srId = event.srId;
  //   } else {
  //     this.prHdr.srId = 0;
  //   }
  // }
  selectedSRNo(event) {
    if (event === undefined || event.length <= 0) {
      this.prHdr.srId = 0;

      this.prHdr.selectedSrIds = [];
      this.previousSrNos = [];

    } else {
      this.prHdr.srId = event.srId;

      // Find removed item
      if (this.previousSrNos.length > event.length) {
        // Convert event array to a list of display names
        const currentSrNos = event.map(serviceRequest => serviceRequest.srNo);
        // Find the removed item
        const removedItem = this.previousSrNos.find(
          prevItem => !currentSrNos.includes(prevItem)
        );

        if (removedItem) {
          const removedIndex = this.previousSrNos.indexOf(removedItem);
          this.prHdr.selectedSrIds.splice(removedIndex, 1);
        }
        // Update the previous selection list
        this.previousSrNos = currentSrNos;
      } else {
        this.prHdr.selectedSrIds = event.map(serviceRequest => serviceRequest.srId);
      }

      // Update the previous selection list
      this.previousSrNos = event.map(serviceRequest => serviceRequest.srNo);
    }
  }

  loadAssetCodeComboData(searchValue) {
    this.scrollsyncAssetCode = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetCodeCombo.sams', searchValue.term, (this.userSessionService.getUserLocationId()) > 0 ? (this.userSessionService.getUserLocationId()) : 0,
      0, this.limitCount, this.assetCodePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetCodePageNumber, this.assetCodeCombo, data.responseData.comboList)
          this.assetCodePageNumber = this.getData.pageNumber;
          this.assetCodeCombo = this.getData.dataList;
          this.scrollsyncAssetCode = false;
        }
      );
  }

  // selectedAssetCodeData(event) {
  //   if (event != undefined) {
  //     this.prHdr.assetHdrId = event.assetHdrId;
  //   } else {
  //     this.prHdr.assetHdrId = 0;
  //   }
  // }
  selectedAssetCodeData(event) {

    if (event === undefined || event.length <= 0) {
      this.prHdr.assetHdrId = 0;

      this.prHdr.selectedAssetHdrIds = [];
      this.previousSelectedAssetCodes = [];
    } else {
      this.prHdr.assetHdrId = event.assetHdrId;

      // Find removed item
      if (this.previousSelectedAssetCodes.length > event.length) {
        // Convert event array to a list of display names
        const currentAssetCodes = event.map(asset => asset.assetCode);
        // Find the removed item
        const removedItem = this.previousSelectedAssetCodes.find(
          prevItem => !currentAssetCodes.includes(prevItem)
        );

        if (removedItem) {
          const removedIndex = this.previousSelectedAssetCodes.indexOf(removedItem);
          this.prHdr.selectedAssetHdrIds.splice(removedIndex, 1);
        }
        // Update the previous selection list
        this.previousSelectedAssetCodes = currentAssetCodes;
      } else {
        this.prHdr.selectedAssetHdrIds = event.map(asset => asset.assetHdrId);
      }

      // Update the previous selection list
      this.previousSelectedAssetCodes = event.map(asset => asset.assetCode);

    }
  }

  loadPRStatusData(searchValue) {
    this.scrollsyncPurchaseRequest = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfPurchaseStatus.sams', searchValue.term, (this.userSessionService.getUserLocationId()) > 0 ? (this.userSessionService.getUserLocationId()) : 0,
      0, this.limitCount, this.purchaseRequestPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.purchaseRequestPageNumber, this.purchaseStatusCombo, data.responseData.comboList)
          this.purchaseRequestPageNumber = this.getData.pageNumber;
          this.purchaseStatusCombo = this.getData.dataList;
          this.scrollsyncPurchaseRequest = false;
        }
      );
  }

  selectedPRStatusData(event) {
    if (event != undefined) {
      this.prHdr.poReqStatus = event.purchaseStatusName;
    } else {
      this.prHdr.poReqStatus = '';
    }

  }

  // purchaseStartDateValidation(event) {
  //     const selectedDate: Date = event.value;
  // console.log("Start Date Selected:", selectedDate);
  //   if(event.value){
  //     this.prHdr.fromDt = moment(event.value).format(this.assetOptimaConstants.ISODate);
  //   }
  //   else{
  //     this.prHdr.fromDt = "";
  //   } 
  //   return null;
  // }

  // purchaseEndDateValidation(event) {
  //   if(event.value){
  //     this.prHdr.endDt = moment(event.value).format(this.assetOptimaConstants.ISODate);
  //   }
  //   else{
  //     this.prHdr.endDt = "";
  //   } 
  //   return null;
  // }


  purchaseStartDateValidation(event: any) {
    const selectedStartDate: Date = event.value;
    const selectedEndDate: Date = this.prHdr.endDt ? new Date(this.prHdr.endDt) : null;

    if (selectedStartDate) {
      if (selectedEndDate && selectedStartDate > selectedEndDate) {
        this.commonService.openToastWarningMessage("Start Date cannot be after End Date.");
        this.prHdr.fromDt = "";  // reset invalid
        return;
      }
      this.prHdr.fromDt = moment(selectedStartDate).format(this.assetOptimaConstants.ISODate);
    } else {
      this.prHdr.fromDt = "";
    }
  }

  purchaseEndDateValidation(event: any) {
    const selectedEndDate: Date = event.value;
    const selectedStartDate: Date = this.prHdr.fromDt ? new Date(this.prHdr.fromDt) : null;

    if (selectedEndDate) {
      if (selectedStartDate && selectedEndDate < selectedStartDate) {
        this.commonService.openToastWarningMessage("End Date cannot be before Start Date.");
        this.prHdr.endDt = "";  // reset invalid
        return;
      }
      this.prHdr.endDt = moment(selectedEndDate).format(this.assetOptimaConstants.ISODate);
    } else {
      this.prHdr.endDt = "";
    }
  }

  filterStartDate = (date: Date | null): boolean => {
    if (!date) return false;
    if (this.prHdr.endDt) {
      const endDate = new Date(this.prHdr.endDt);
      return date <= endDate;
    }
    return true;
  }

  filterEndDate = (date: Date | null): boolean => {
    if (!date) return false;
    if (this.prHdr.fromDt) {
      const startDate = new Date(this.prHdr.fromDt);
      return date >= startDate;
    }
    return true;
  }


  generateReport() {

    this.commonService.commonListService('reports/purchaseRequest/generatePurchaseRequestReport.sams', this.prHdr).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      }, error => {
        // alert('error');
      }
    );
  }

  checkCondition(element) {
    let status = "";

    if (element.findIndex(x => x.unmatchedFlag === true) === -1) {
      status = "Matched"
    }
    else {
      status = "Unmatched"
    }

    return status;
  }

  raisePO() {

    let locationId = 0;
    const supplierIdArray = [];
    const supplierSiteIdArray = [];
    let locationFlag = true;
    let supplierFlag = true;
    let supplierSiteFlag = true;
    let matchedItemFlag = true;
    const poDtlList = { poDtlList: [], LocId: 0 };

    for (let i = 0; i < this.selectedPRList.length; i++) {

      let poItemList = this.selectedPRList[i].poItemList;

      if (this.selectedPRList[i].locationId != locationId && i > 0) {
        const message = 'Location Should be identical..';
        this.commonService.openToastWarningMessage(message);
        locationFlag = false;
        break;
      }
      else {
        locationId = this.selectedPRList[i].locationId;
      }

      const indexValueUnmatchedItem = poItemList.findIndex(x => x.unmatchedFlag === true);

      if (indexValueUnmatchedItem !== -1) {
        matchedItemFlag = false;
        const message = 'Entered unmatched item. Please match the item';
        this.commonService.openToastWarningMessage(message);
        break;
      }

      for (let j = 0; j < poItemList.length; j++) {
        if (i === 0) {
          supplierIdArray.push(poItemList[j].supplierId);
          supplierSiteIdArray.push(poItemList[j].supplierSiteId);
        }
        else {
          const indexValueSupplierName = this.commonService.getIndexOfTheItem(supplierIdArray, false, 'supplierId', poItemList[j].supplierId);

          const indexValueSupplierSiteName = this.commonService.getIndexOfTheItem(supplierSiteIdArray, false, 'supplierSiteId', poItemList[j].supplierSiteId);

          if (indexValueSupplierName == -1) {
            const message = 'Supplier Name Should be identical..';
            this.commonService.openToastWarningMessage(message);
            supplierFlag = false;
            break;
          }

          if (indexValueSupplierSiteName == -1) {
            const message = 'Supplier Site Name Should be identical..';
            this.commonService.openToastWarningMessage(message);
            supplierSiteFlag = false;
            break;
          }
        }
      }

      if (this.selectedPRList[i].poReqStatus === 'REQUEST RAISED') {
        poDtlList.poDtlList.push(this.selectedPRList[i].poReqId);
        poDtlList.LocId = locationId;
      }

    }

    if (locationFlag && supplierFlag && supplierSiteFlag && matchedItemFlag) {

      this.commonService.commonInsertService('convertMultiplePRIntoPO.sams', poDtlList).subscribe(
        data => {
          if (data.success) {
            this.fetchListofPR();
            this.commonService.openToastSuccessMessage(data.message);
            this.selectedPRList = [];
          } else {
            this.commonService.openToastErrorMessage(data.message);
            this.selectedPRList = [];
          }
        }
      );
    }


  }

  cancelPR() {

    this.selectedPRList = this.selectedPRList.filter(function (element) {
      // return element.approvalId !== 0 && element.poReqStatus != 'CANCELLED';
      return element.poReqStatus != 'CANCELLED' && element.poReqStatus != 'PO CONVERTED';
    });

    this.selectedPRListLength = this.selectedPRList.length;

    let dialogRef = this.dialog.open(CancelConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        Text: ' selected Purchase Request',
        // note : 'Note : Only PR under your queue will be Cancelled',
        selectedElementListLength: this.selectedPRListLength
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {

          let cancelReason = data.cancelReason;

          this.prCancelList = [];

          for (let i = 0; i < this.selectedPRList.length; i++) {
            if (this.selectedPRList[i].poReqStatus === 'REQUEST RAISED' || this.selectedPRList[i].poReqStatus === 'REJECTED' || this.selectedPRList[i].poReqStatus === 'CONVERT PO') {
              this.prCancelList.push(this.selectedPRList[i].poReqId);
            }
          }
          let prIdList = { prCancelList: [], cancelReason: cancelReason };
          prIdList.prCancelList = this.prCancelList;
          prIdList.cancelReason = cancelReason;
          this.commonService.showSpinner();
          this.commonService.commonInsertService('cancelMultiplePR.sams', prIdList).subscribe(
            data => {
              if (data.success) {
                this.commonService.openToastSuccessMessage(data.message);
                this.fetchListofPR();
                this.commonService.hideSpinner();
                this.selectedPRList = [];
              } else {
                this.commonService.hideSpinner();
                this.commonService.openToastErrorMessage(data.message);
                this.selectedPRList = [];
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
        } else {
          this.multiSelectFlag = false;
          this.selectedPRList = [];
        }
      });


  }


  selectPR(element) {
    const selectPRIndex = this.selectedPRList.findIndex(x => x === element);
    this.enableActionBtn = false;

    if (selectPRIndex === -1) {
      this.selectedPRList.push(element);
    } else {
      this.selectedPRList.splice(selectPRIndex, 1)
      this.selectedItem = 0;
      this.selectedPoReqStatus = '';
    }

    if (this.selectedPRList.length === 1) {

      this.enableActionBtn = false;

      this.selectedItem = this.selectedPRList[0].poReqId;
      this.selectedPoReqStatus = this.selectedPRList[0].poReqStatus;
    } else {
      this.enableActionBtn = true;
      for (let i = 0; i < this.selectedPRList.length; i++) {
        this.selectedItem = this.selectedPRList[i].poReqId;
        this.selectedPoReqStatus = this.selectedPRList[i].poReqStatus;
      }
    }

  }

  compareValue(element: any): boolean {
    return this.selectedPRList.findIndex(data => data.poReqId === element.poReqId) !== -1;
  }

  checkApprovalValid() {
    if (this.selectedPRList.length > 0) {
      // return !(this.selectedPRList.findIndex(data => data.poReqStatus !== "REQUEST RAISED" || data.approvalId <= 0) === -1);
      return false;
    } else {
      return true;
    }
  }


  validatePrPoConversion() {
    let locationId = 0;
    let locationFlag = true;

    let prType = '';
    let prTypeFlag = true;
    for (let i = 0; i < this.selectedPRList.length; i++) {
      if (this.selectedPRList[i].locationId != locationId && i > 0) {
        const message = 'Location Should be identical !';
        this.commonService.openToastWarningMessage(message);
        locationFlag = false;
        break;
      } else {
        locationId = this.selectedPRList[i].locationId;
      }
    }

    // for (let i = 0; i < this.selectedPRList.length; i++) {
    //   if (this.selectedPRList[i].prType != prType && i > 0) {
    //     const message = 'Purchase Type Should be identical !';
    //     this.commonService.openToastWarningMessage(message);
    //     prTypeFlag = false;
    //     break;
    //   } else {
    //     prType = this.selectedPRList[i].prType;
    //   }
    // }

    console.log("distinct location id and pr type ", locationId, prType);
    if (locationFlag && prTypeFlag) {
      this.convertPO(locationId, prType);
    }

  }

  prApproval(selectedItem,status) {
    this.commonService.commonGetService('fetchPurchaseRequestInfo.sams', selectedItem).subscribe(
      data => {
        const poItemList = data.responseData.poItemList;

        const hasInvalidItem = poItemList.some(item =>
          !item.supplierId ||
          !item.supplierName ||
          item.unitPrice === 0 ||
          item.unitPrice == null
        );

        if (hasInvalidItem) {
          this.commonService.openToastWarningMessage("Unit price/Supplier information is missing. Kindly input the mandatory fields.");
          return;
        }

        if (this.selectedPRList.length === 1) {
          // if(this.selectedPRList[0].prWithoutUnitPrice ){
          if (this.selectedPRList[0].grandTotal == 0 || this.selectedPRList[0].supplierName == null) {
            this.commonService.openToastWarningMessage("Unit price/Supplier information is missing. Kindly input the mandatory fields.");
          } else {
            this.prWorkflowApproval(status)
          }

        } else {
          this.selectedPRList = this.selectedPRList.filter(function (element) {
            return !element.prWithoutUnitPrice || (element.prWithoutUnitPrice && element.grandTotal > 0);
          });

          this.prWorkflowApproval(status)

        }
      });
  }

  prWorkflowApproval(status) {

    let processName = "";
    if (status) {
      processName = 'approve ';

      this.selectedPRList = this.selectedPRList.filter(function (element) {
        return element.approvalId !== 0 && element.poReqStatus != 'CANCELLED' && element.poReqStatus != 'REJECTED';
      });

      this.selectedPRListLength = this.selectedPRList.length;
    } else {
      processName = 'convert to PO for';
    }

    let selectedList = this.selectedPRList;
    const dialogData = {
      confirmHeading: 'Confirmation',
      confirmMsg: `Are you sure to ${processName} selected Purchase Request?`
    };

    if (status) {
      dialogData['note'] = 'Note : Only PR under your queue will be Approved';
      dialogData['selectedElementListLength'] = this.selectedPRListLength;
    }

    const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: dialogData
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(data => {
      if (data.status === true) {

        let prIdList = { selectedPRList: [], status: status, selectedApprovalList: [] };
        for (let i = 0; i <= selectedList.length - 1; i++) {
          prIdList.selectedPRList.push(selectedList[i].poReqId);
          prIdList.selectedApprovalList.push(selectedList[i].approvalId);
        }
        this.commonService.showSpinner();
        this.commonService.commonInsertService('approveRejectPR.sams', prIdList).subscribe(
          data => {
            if (data.success) {
              prIdList = data.responseData;
              this.selectedPRList = [];
              this.commonService.hideSpinner();
              this.commonService.openToastSuccessMessage(data.message);

              // if(prIdList != null) {
              //   this.prConvertedPOInfo(prIdList, data.message);
              // } 

              this.fetchListofPR();

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
        this.selectedPRList = [];
      }
    });
  }
  convertPO(locationId, prType) {
    let processName = "";

    processName = 'convert to PO for';

    let selectdList = this.selectedPRList;
    const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'confirmHeading': 'Confirmation',
        'confirmMsg': `Are you sure to ${processName} selected Purchase Request ?`
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(data => {
      if (data.status === true) {
        let prIdList = { selectedPRList: [], selectedApprovalList: [], locationId: locationId, prType: prType };
        for (let i = 0; i <= selectdList.length - 1; i++) {
          prIdList.selectedPRList.push(selectdList[i].poReqId);
          prIdList.selectedApprovalList.push(selectdList[i].approvalId);
        }
        this.commonService.showSpinner();
        this.commonService.commonInsertService('convertPO.sams', prIdList).subscribe(
          data => {
            if (data.success) {
              prIdList = data.responseData;
              this.commonService.hideSpinner();
              this.commonService.openToastSuccessMessage(data.message);

              if (prIdList != null) {
                this.prConvertedPOInfo(prIdList, data.message);
              }

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

  prConvertedPOInfo(event, message) {
    let dialogRef = this.dialog.open(PrPoConvertInfoComponent, {
      width: '35%',
      height: 'auto',
      data: {
        'tempPRConvertPOList': event,
        'locValidMsg': message
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status === true) {
          console.log("Success")
          this.enableActionBtn = true;
          this.selectedPRList = [];
          this.selectedItem = 0;
          this.selectedPoReqStatus = '';
          this.ngOnInit();
          this.fetchListofPR();
        } else {
          console.log("Error")
          this.enableActionBtn = true;
          this.selectedPRList = [];
          this.selectedItem = 0;
          this.selectedPoReqStatus = '';
          this.ngOnInit();
          this.fetchListofPR();
        }
      });
  }

  // prConfirm(status,selectdList) {
  //   let prIdList : any;
  //   let approvalPromise = new Promise((resolve) => {
  //     let prIdList = {selectedPRList: [],status: status,selectedApprovalList : []};
  //       for(let i=0; i<= selectdList.length-1 ; i++){
  //         prIdList.selectedPRList.push(selectdList[i].poReqId);
  //         prIdList.selectedApprovalList.push(selectdList[i].approvalId);
  //       }
  //     this.showSpinner();
  //     this.commonInsertService('approveRejectPR.sams', prIdList).subscribe(
  //       data => {
  //         if (data.success) {
  //           console.log("pr details " , data.responseData);
  //           prIdList = data.responseData.prIdList;
  //           this.openToastSuccessMessage(data.message);
  //         } else {
  //           this.openToastWarningMessage(data.message);
  //         }
  //       }, error => {

  //       }
  //     );
  //   })
  //   console.log(" approvalPromise " , approvalPromise);
  //   return prIdList;
  // }

  // prWorkflowCancel(){
  //   let result;
  //   result = this.commonService.rejectApprove(allWorkflowStatus[allWorkflowStatus.PR],this.selectedPRList," Selected Purchase Request");
  //   result.then(data=>{
  //     if(data){        
  //       console.log(" data ", data);
  //       this.ngOnInit();
  //       this.commonService.hideSpinner();
  //     }
  //   })
  // }

  prWorkflowCancel() {

    this.selectedPRList = this.selectedPRList.filter(function (element) {
      return element.approvalId !== 0 && element.poReqStatus != 'CANCELLED';
    });

    this.selectedPRListLength = this.selectedPRList.length;

    let selectdList = this.selectedPRList;
    const dialogRef = this.dialog.open(RejectConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        confirmHeading: 'Confirmation',
        confirmMsg: 'Are you sure to Reject selected Purchase Request ?',
        note: 'Note : Only PR under your queue will be Rejected',
        selectedElementListLength: this.selectedPRListLength
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status === true) {
          let rejectReason = data.reason

          let prIdList = { selectedPRList: [], status: 'false', selectedApprovalList: [], locationId: 0, prType: '', rejectReason: rejectReason };
          for (let i = 0; i <= selectdList.length - 1; i++) {
            prIdList.selectedPRList.push(selectdList[i].poReqId);
            prIdList.selectedApprovalList.push(selectdList[i].approvalId);
          }
          this.commonService.showSpinner();
          this.commonService.commonInsertService('approveRejectPR.sams', prIdList).subscribe(
            data => {
              if (data.success) {
                prIdList = data.responseData;
                this.commonService.hideSpinner();
                this.commonService.openToastSuccessMessage(data.message);
                this.fetchListofPR();
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
          this.selectedPRList = [];
        }
      });
  }


  viewPrPoDetails(selectedItem) {

    let dialogRef = this.dialog.open(PrPoViewInfoComponent, {
      width: '95%',
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

      this.prMainDataSource.data.forEach(prData => {
        this.selectedPRList.push(prData);
      });

    } else {
      this.selectedPRList = [];
    }

    this.enableActionBtn = true;

    this.selectedPRList = this.selectedPRList.filter(element => {
      const jsonElement = JSON.stringify(element);
      const isDuplicate = seen.has(jsonElement);
      seen.add(jsonElement);
      return !isDuplicate;
    });
  }

  listOfProcessStatus(searchValue) {
    this.scrollSyncProcessStatus = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    let workflowProcessId = allWorkflowStatus.PR;
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
      this.prHdr.processStatus = '';
      this.prHdr.workflowProcessStatusId = 0;
      this.processStatusPageNumber1 = 1;
      this.processStatusCombo1 = [];
    } else {
      this.prHdr.processStatus = event.processName;
      this.prHdr.workflowProcessStatusId = event.workflowProcessId;
    }
  }

  listOfAllAssetGroup(searchKey) {
    this.scrollsyncAssetGroup = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllAssetGroupCombo, searchKey.term, '', '',
      this.recordsPerPageForCombo, this.assetGroupPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchKey, this.assetGroupPageNumber, this.assetGroup, data.responseData.comboList)
          this.assetGroupPageNumber = this.getData.pageNumber;
          this.assetGroup = this.getData.dataList;
          this.scrollsyncAssetGroup = false;
        });
  }

  // getAssetGroupComboValue(event) {
  //   if (event != null) {
  //     this.prHdr.assetGroupName = event.assetGroupName;
  //     this.prHdr.assetGroupId = event.assetGroupId;

  //   } else {
  //     this.prHdr.assetGroupName = "";
  //     this.prHdr.assetGroupId = 0;
  //     this.assetGroup = [];
  //     this.assetGroupPageNumber = 1;
  //   }

  getAssetGroupComboValue(event) {
    if (event === undefined || event.length <= 0) {

      this.prHdr.assetGroupName = "";
      this.prHdr.assetGroupId = 0;
      this.assetGroup = [];
      this.assetGroupPageNumber = 1;

      this.prHdr.selectedAssetGroupIds = [];
      this.previousAssetGroupNames = [];

    } else {
      this.prHdr.assetGroupName = event.assetGroupName;
      this.prHdr.assetGroupId = event.assetGroupId;

      // Find removed item
      if (this.previousAssetGroupNames.length > event.length) {
        // Convert event array to a list of display names
        const currentAssetGroupNames = event.map(assetGroup => assetGroup.assetGroupName);
        // Find the removed item
        const removedItem = this.previousAssetGroupNames.find(
          prevItem => !currentAssetGroupNames.includes(prevItem)
        );

        if (removedItem) {
          const removedIndex = this.previousAssetGroupNames.indexOf(removedItem);
          this.prHdr.selectedAssetGroupIds.splice(removedIndex, 1);
        }
        // Update the previous selection list
        this.previousAssetGroupNames = currentAssetGroupNames;
      } else {
        this.prHdr.selectedAssetGroupIds = event.map(assetGroup => assetGroup.assetGroupId);
      }

      // Update the previous selection list
      this.previousAssetGroupNames = event.map(assetGroup => assetGroup.assetGroupName);

    }
  }

  listOfAllModel(searchKey) {
    this.scrollsyncModel = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults('listOfAllModelCombo.sams', searchKey.term, 0,
      this.prHdr.assetGroupId > 0 ? this.prHdr.assetGroupId : '',
      this.recordsPerPageForCombo, this.modelComboPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchKey, this.modelComboPageNumber, this.modelCombo, data.responseData.comboList)
          this.modelComboPageNumber = this.getData.pageNumber;
          this.modelCombo = this.getData.dataList;
          this.scrollsyncModel = false;
        });
  }

  // getModelComboValue(event) {
  //   if (event != null) {
  //     this.prHdr.modelId = event.modelId;
  //     this.prHdr.modelName = event.modelName;
  //   } else {
  //     this.prHdr.modelId = 0;
  //     this.prHdr.modelName = '';
  //     this.modelCombo = [];
  //     this.modelComboPageNumber = 1;
  //   }
  // }
  getModelComboValue(event) {
    if (event === undefined || event.length <= 0) {
      this.prHdr.modelId = 0;
      this.prHdr.modelName = '';
      this.modelCombo = [];
      this.modelComboPageNumber = 1;

      this.prHdr.selectedModelIds = [];
      this.previousSelectedModels = [];
    } else {
      this.prHdr.modelId = event.modelId;
      this.prHdr.modelName = event.modelName;

      // Find removed item
      if (this.previousSelectedModels.length > event.length) {
        // Convert event array to a list of display names
        const currentModelNames = event.map(model => model.modelName);
        // Find the removed item
        const removedItem = this.previousSelectedModels.find(
          prevItem => !currentModelNames.includes(prevItem)
        );

        if (removedItem) {
          const removedIndex = this.previousSelectedModels.indexOf(removedItem);
          this.prHdr.selectedModelIds.splice(removedIndex, 1);
        }
        // Update the previous selection list
        this.previousSelectedModels = currentModelNames;
      } else {
        console.log("event : ", event)
        this.prHdr.selectedModelIds = event.map(model => model.modelId);

      }

      // Update the previous selection list
      this.previousSelectedModels = event.map(model => model.modelName);

    }
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
            this.prHdr = JSON.parse(this.userPreference.customFilters);

            if (this.prHdr.selectedLocationNames != null && this.prHdr.selectedLocationNames.length > 0) {
              this.previousSelectedLocations = this.prHdr.selectedLocationNames;
            }
            if (this.prHdr.selectedAssetCodes != null && this.prHdr.selectedAssetCodes.length > 0) {
              this.previousSelectedAssetCodes = this.prHdr.selectedAssetCodes;
            }
            if (this.prHdr.selectedAssetGroupNames != null && this.prHdr.selectedAssetGroupNames.length > 0) {
              this.previousAssetGroupNames = this.prHdr.selectedAssetGroupNames;
            }
            if (this.prHdr.selectedModelNames != null && this.prHdr.selectedModelNames.length > 0) {
              this.previousSelectedModels = this.prHdr.selectedModelNames;
            }
            if (this.prHdr.selectedBusinessPartnerNames != null && this.prHdr.selectedBusinessPartnerNames.length > 0) {
              this.previousSelectedBusinessPartners = this.prHdr.selectedBusinessPartnerNames;
            }
            if (this.prHdr.selectedSrNos != null && this.prHdr.selectedSrNos.length > 0) {
              this.previousSrNos = this.prHdr.selectedSrNos;
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
    this.userPreference.customFilters = JSON.stringify(this.prHdr);
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


}
