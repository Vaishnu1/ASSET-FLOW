import { Component, OnInit, ViewChild, Input, ElementRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceRequestCreateComponent } from '../service-request-create/service-request-create.component';
import { ServiceRequestModel } from 'src/app/Model/serviceRequest/serviceRequest';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { Title } from '@angular/platform-browser';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { SrEmailNotifyComponent } from '../sr-email-notify/sr-email-notify.component';
import { SrPdfConfirmationDialogComponent } from '../../Dialog-Components/serviceRequestPopUp/sr-pdf-confirmation-dialog/sr-pdf-confirmation-dialog.component';
import { getData } from 'src/app/Model/common/fetchListData';
import { SrSubStatusInfoComponent } from '../sr-sub-status-info/sr-sub-status-info.component';
import { ServiceRequestReportComponent } from '../service-request-report/service-request-report.component';
import { SrAssignEngineerComponent } from '../sr-assign-engineer/sr-assign-engineer.component';
import { SrFeedbackComponent } from '../sr-feedback/sr-feedback.component';
import { SrReOpenConfirmationComponent } from '../sr-re-open-confirmation/sr-re-open-confirmation.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TranslateService } from '@ngx-translate/core';
import { UserPrefernce } from 'src/app/Services/user-preference/user-preference';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { ConfirmConfirmationComponent } from '../../Common-components/confirm-confirmation/confirm-confirmation.component';
import { stat } from 'fs';
import * as moment from 'moment';

@Component({
  selector: 'app-service-request-list',
  templateUrl: './service-request-list.component.html',
  styleUrls: ['./service-request-list.component.css']
})
export class ServiceRequestListComponent implements OnInit, OnDestroy {

  //Set Page Title
  title = 'Asset Optima - Break Down';
  // displayedColumnsForBM = ['select','sNo','locationName', 'srNo', 'srType','totalDownHrsStr','assetCode','assetGroupDesc','modelName','departmentName','srStatusName','assignedTo','callerName','subTicketDetails', 'maintenanceStrategy','updatedBy'];
  // displayedColumnsForPM = ['select','sNo','locationName', 'srNo', 'srType','assetCode','assetGroupDesc','modelName','departmentName', 'srStatusName','assignedTo','pmMaintenanceStrategy', 'maintenanceStrategy','updatedBy'];
  // displayedColumnsForPA = ['select','sNo','locationName', 'srNo', 'srType','assetCode','assetGroupDesc','modelName','departmentName', 'srStatusName','assignedTo','paMaintenanceStrategy', 'maintenanceStrategy','updatedBy'];
  // displayedColumnsForQA = ['select','sNo','locationName', 'srNo', 'srType','assetCode','assetGroupDesc','modelName','departmentName', 'srStatusName','assignedTo','qaMaintenanceStrategy', 'maintenanceStrategy','updatedBy'];
  // displayedColumnsForDR = ['select','sNo','locationName', 'srNo', 'srType','assetCode','assetGroupDesc','modelName','departmentName', 'srStatusName','assignedTo', 'maintenanceStrategy','updatedBy'];

  defaultColumns = ['select', 'sNo', 'locationName', 'srNo', 'srType', 'totalDownHrsStr', 'assetCode', 'assetGroupDesc', 'modelName', 'departmentName', 'srStatusName', 'assignedTo', 'callerName', 'subTicketDetails', 'maintenanceStrategy', 'updatedBy'];
  displayedColumns = [...this.defaultColumns];



  //USER PREFERENCE
  public userPreference: UserPrefernce;
  showManageColumns: boolean = false;



  serviceRequestModel: ServiceRequestModel;

  dataSource = [];
  //LOADER
  subloader: boolean = false;

  @ViewChild('searchSrNo') searchSrNoFocus: ElementRef;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchvalue: any = '';
  panelOpenState = false;
  showFiller = false;
  mode = new FormControl('over');
  moduleAccessModel: ModuleAccessModel;

  //COMBO
  locationCombo: any = [];
  assetCategoryName: any = [];
  subCategoryName: any = [];
  assetGroup: any = [];
  modelCombo: any = [];
  assetStatusCombo: any = [];
  assetCodeCombo: any = [];
  srTypeCombo: any = [];

  locationPageNumber: number;
  assetGroupPageNumber: number;
  modelComboPageNumber: number;
  assetCategoryPageNumber: number;
  assetSubCategorPageNumber: number;
  asssetStatusPageNumber: number;
  assetCodePageNumber: number;
  srTypePageNumber: number;

  scrollsyncLocation: boolean = false;
  scrollsyncAssetGroup: boolean = false;
  scrollsyncModel: boolean = false;
  scrollsyncAssetStatus: boolean = false;
  scrollsyncAssetCategory: boolean = false;
  scrollsyncAssetSubCategory: boolean = false;
  scrollsyncAssetCode: boolean = false;
  scrollsyncSrType: boolean = false;

  scrollServiceEngineersync: boolean = false;
  serviceEngineerPageNumber: number;
  serviceEngineerCombo: any = [];

  scrollDepartmentsync: boolean = false;
  departmentPageNumber: number;
  departmentCombo: any = [];

  scrollContractTypeSync: boolean = false;
  contractTypePageNumber: number;
  contractTypeList: any = [];

  scrollSrStatusSync: boolean = false;
  srStatusPageNumber: number;
  srStatusCombo: any = [];

  recordsPerPageForCombo: string;

  individualSubTicket: ServiceRequestModel;

  scrollsyncConsumedSpares: boolean = false;
  consumedSparesPageNumber: number = 0;
  consumedItemsList: any = [];

  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page
  getData: getData;

  selectedItem: any = 0;
  selectedElement: any = '';
  srStatusId: any = '';
  srType: String = '';
  selectedSrNo: any = '';
  selectedLocationId: any = 0;

  srTypeId: Number = 0;
  srTypeName: String = '';
  // 1 = BM, 2 = PM, 3 = PA, 4 = QA, 5 = RFS, 6 = INSTALLATION

  serviceRequestReassignInfo: ServiceRequestModel;
  woReassignModuleAccess: ModuleAccessModel;
  scrollsyncSRFunctionlityPriority: boolean = false;
  functionlityCombo = [];
  funtionlityPageNumber: number;

  EfsStatusList = [
    { id: 1, efsName: 'HARD DOWN' },
    { id: 2, efsName: 'SOFT' },
    { id: 3, efsName: 'UP' }
  ]

  multiSelectFlag: boolean = false;
  selectedSRListLength: number = -1;

  previousSelectedLocations: any[] = [];
  previousAssetCategoryNames: any[] = [];
  previousSubCategoryNames: any[] = [];
  previousAssetGroupNames: any[] = [];
  previousDepartmentNames: any[] = [];
  previousSelectedModels: any[] = [];
  previousAssignedToNames: any[] = [];

  constructor(private router: Router, private dialog: MatDialog,
    private commonService: CommonService,
    private readonly userSession: UserSessionService,
    private titleService: Title,
    private assetConstants: AssetOptimaConstants,
    private userSessionService: UserSessionService,
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute,
    public assetOptimeMthnd: AssetOptimaServices,
    private assetOptimaConstants: AssetOptimaConstants,
    private samsService: AssetOptimaServices) {
    this.serviceRequestModel = new ServiceRequestModel();
    this.moduleAccessModel = new ModuleAccessModel();
    this.pageSize = '100';
    this.pageIndex = '0';
    this.locationPageNumber = 1;
    this.assetGroupPageNumber = 1;
    this.modelComboPageNumber = 1;
    this.assetCategoryPageNumber = 1;
    this.assetSubCategorPageNumber = 1;
    this.asssetStatusPageNumber = 1;
    this.assetCodePageNumber = 1;
    this.srTypePageNumber = 1;
    this.serviceEngineerPageNumber = 1;
    this.departmentPageNumber = 1;
    this.contractTypePageNumber = 1;
    this.srStatusPageNumber = 1;
    this.consumedSparesPageNumber = 1;
    this.serviceRequestReassignInfo = new ServiceRequestModel();
    this.woReassignModuleAccess = new ModuleAccessModel();

  }

  ngOnInit() {

    this.moduleAccessModel = this.userSessionService.getUserGroupAccess()['GROUPACCESS_WORK_ORDER'];

    this.woReassignModuleAccess = this.userSessionService.getUserGroupAccess()['GROUPACCESS_WO_REASSIGN'];
    this.srTypeId = 1;
    this.srType = 'BM';
    this.titleService.setTitle(this.title);
    this.selectedSrList = [];
    this.disableActionBtn = true;

    if (localStorage.getItem('locationId') !== null && localStorage.getItem('locationName') !== null) {
      //this.serviceRequestModel.locationId = parseInt(localStorage.getItem('locationId'));
      //this.serviceRequestModel.locationName = localStorage.getItem('locationName');

      if (localStorage.getItem('startDt') !== null) {
        this.serviceRequestModel.fromDt = localStorage.getItem('startDt');
        if (localStorage.getItem('endDt') !== null) {
          this.serviceRequestModel.endDt = localStorage.getItem('endDt');
        }
      }
    } else {
      // this.serviceRequestModel.locationName = this.userSessionService.getUserLocationName();
      // this.serviceRequestModel.locationId = this.userSessionService.getUserLocationId();
    }
    localStorage.removeItem('locationId');
    localStorage.removeItem('locationName');
    localStorage.removeItem('startDt');
    localStorage.removeItem('endDt');
    this.serviceRequestModel.direction = 'desc';
    this.serviceRequestModel.columnName = 'updatedDt';
    if (localStorage.getItem('updateInstallationWOByBatch') === 'true') {
      this.serviceRequestModel.srStatus = '';
      this.serviceRequestModel.srStatusId = 0;
      this.serviceRequestModel.srType = 'INSTALLATION';
      localStorage.setItem('updateInstallationWOByBatch', 'false');
    } else {
      this.serviceRequestModel.srType = 'BM';
    }

    // if(localStorage.getItem('SERVICE_REQUEST_SEARCH_PARAMATER') == null) {
    //   this.serviceRequestModel.direction = 'desc';
    //   this.serviceRequestModel.locationName = this.userSession.getUserLocationName();
    //   this.serviceRequestModel.locationId = this.userSession.getUserLocationId();
    // } else {
    //   this.serviceRequestModel = JSON.parse(localStorage.getItem('SERVICE_REQUEST_SEARCH_PARAMATER'));
    // }
    this.serviceRequestModel.reOpenBtn = false;

    // NO DEFAULT LOADING
    // this.fetchList();

    this.serviceRequestModel.direction = 'desc';
    this.serviceRequestModel.columnName = 'updatedDt';

    // this.serviceRequestModel.locationName = this.userSession.getUserLocationName();
    // this.serviceRequestModel.locationId = this.userSession.getUserLocationId();

    this.userPreference = new UserPrefernce();
    this.userPreference.moduleKey = 'GROUPACCESS_WORK_ORDER';
    // this.getUserPreferenceInfo();

    let userPreferenceData = this.getUserPreferenceInfo();
    userPreferenceData.then((response) => {
      this.ngAfterContentInit();

      setTimeout(() => { this.fetchList(); }, 500);
      localStorage.setItem('previousRoute', this.router.url);
    })

  }


  ngAfterContentInit() {
    setTimeout(() => {
      this.serviceRequestModel = new ServiceRequestModel();
      this.serviceRequestModel.direction = 'desc';
      this.serviceRequestModel.columnName = 'updatedDt';
      this.activatedRoute.queryParams.subscribe(async query => {
        this.serviceRequestModel.srStatusId = 1;
        this.serviceRequestModel.srStatus = query?.srStatus || '';

        if(query?.locationId){
        this.serviceRequestModel.selectedLocationIds = []; 
        this.serviceRequestModel.selectedLocationIds.push(Number(query.locationId));
        this.serviceRequestModel.selectedLocationNames = [query.locationName];
       }

        if (query?.functionality) {
          console.log('functionality name', query?.functionality);
          this.serviceRequestModel.functionality = query?.functionality;
        }
        this.serviceRequestModel.srType = '';
        this.serviceRequestModel.srTypeName = '';
        this.srType = '';
        this.srTypeName = '';
        if (query?.srType) {
          let passedSrType = query.srType;
          const today = new Date();
          const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
          const firstMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() - 2, 1);
          const formatDate = (date: Date): string => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          };
          if (passedSrType.toUpperCase() === 'MISSEDPA') {
            passedSrType = 'PA';
            this.serviceRequestModel.fromDt = formatDate(firstMonth);
            this.serviceRequestModel.endDt = formatDate(lastMonth);
            this.serviceRequestModel.fromDashboard = true;
          } else if (passedSrType.toUpperCase() === 'MISSEDPM') {
            passedSrType = 'PM';
            this.serviceRequestModel.fromDt = formatDate(firstMonth);
            this.serviceRequestModel.endDt = formatDate(lastMonth);
            this.serviceRequestModel.fromDashboard = true;
          }
          await this.loadSrTypeComboDataAsync(passedSrType);
          const srObject = this.srTypeCombo.find(
            item => item.srId.toUpperCase() === passedSrType.toUpperCase()
          );
          setTimeout(() => {
            if (srObject) {
              this.serviceRequestModel.srType = srObject.srId;
              this.serviceRequestModel.srTypeName = srObject.srTypeName;
              this.srType = srObject.srId;
              this.srTypeName = srObject.srTypeName
              this.setSrTypeValue(srObject);
            } else {
              this.serviceRequestModel.srType = passedSrType;
              this.serviceRequestModel.srTypeName = '';
            }
          }, 500);
        }
      });
    }, 500);
  }

  dialogRef;

  createService() {
    this.router.navigate(['home/serviceRequest/serviceRequestCreate/' + 0]);
  }

  ngOnDestroy() {
    if (this.dialogRef != null) {
      this.dialogRef.close();
    }
  }

  searchSR() {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.applyPreferredFilters();
    this.fetchList();
    this.selectedItem = 0;
    // this.applyPreferredFilters();
  }

  disableSrReassign = false;

  async fetchList() {
    this.activatedRoute.params.subscribe(
      params => {
        var srType = params.type;
        if (srType != undefined && srType != '') {
          if (params.status === "OPEN") {
            this.serviceRequestModel.srStatusId = 1;
          } else {
            this.serviceRequestModel.srStatusId = 2;
          }
          this.serviceRequestModel.srType = srType;
          this.serviceRequestModel.srStatus = params.status;
          this.serviceRequestModel.functionality = params.functionality;
        }
      }
    );
    this.serviceRequestModel.pageNumber = Number(this.pageIndex);
    this.serviceRequestModel.recordsPerPage = Number(this.pageSize);
    this.dataSource = [];
    this.subloader = true;
    this.selectedSrList = [];
    this.disableActionBtn = true;
    setTimeout(() => {
      this.commonService.commonListService('fetchListOfServiceRequest.sams', this.serviceRequestModel).subscribe(
        data => {
          if (data.success) {
            this.dataSource = data.responseData.dataList;
            this.length = data.responseData.dataTotalRecCount;

            localStorage.setItem('SERVICE_REQUEST_SEARCH_PARAMATER', JSON.stringify(this.serviceRequestModel));
            for (let ticket of this.dataSource) {
              ticket.subTicketCount = ticket.subTicketCount > 0 ? (ticket.closedSubticketCount + '/' + ticket.subTicketCount + ' Closed') : '-'
            }
            this.subloader = false;
            if (this.dataSource.length == 0 && !this.disableSrReassign) {
              this.disableSrReassign = true;
            } else {
              this.disableSrReassign = false;
            }
          } else {
            this.subloader = false;
          }
        }

      );
    }, 1000);

  }

  viewServiceRequestDtl(srType, srId, mode) {
    if (srType != 'RFS') {
      this.router.navigate(['home/serviceRequest/serviceViewV1/', srId, mode, 'wo_info']);
      // this.router.navigate(['home/serviceView/' + element.srId + '/' + mode + '/' +'asset_info']);
    } else if (srType === 'RFS') {
      this.router.navigate(['home/requestForStock/' + srId + '/' + mode]);
    }
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchList();
  }

  customSort(event) {
    this.serviceRequestModel.pageNumber = 0;
    if (event.active === 'srStatusName') {
      this.serviceRequestModel.columnName = 'srStatusId';
    } else {
      this.serviceRequestModel.columnName = event.active;
    }

    this.serviceRequestModel.direction = event.direction;
    this.fetchList();
  }

  loadLocationComboData(searchValue) {
    this.scrollsyncLocation = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllUserLocForCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.locationPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.locationPageNumber, this.locationCombo, data.responseData.comboList)
          this.locationPageNumber = this.getData.pageNumber;
          this.locationCombo = this.getData.dataList;
          this.scrollsyncLocation = false;
        }
      );
  }

  // selectedLocationData(event) {
  //   if (event === undefined) {
  //     this.serviceRequestModel.locationName = null;
  //     this.serviceRequestModel.locationId = 0;
  //     this.locationPageNumber = 1;
  //     this.locationCombo = [];
  //   } else {
  //     this.serviceRequestModel.locationName = event.locDisplayField;
  //     this.serviceRequestModel.locationId = event.locationId;
  //   }
  // }

  selectedLocationData(event) {
    if (event === undefined || event.length <= 0) {
      this.serviceRequestModel.locationName = null;
      this.serviceRequestModel.locationId = 0;
      this.locationPageNumber = 1;
      this.locationCombo = [];
      this.serviceEngineerPageNumber = 1;
      this.serviceEngineerCombo = [];

      this.serviceRequestModel.assetHdrId = 0;
      this.serviceRequestModel.assetCode = '';
      this.assetCodePageNumber = 1;
      this.assetCodeCombo = [];

      this.serviceRequestModel.departmentName = null;
      this.serviceRequestModel.departmentId = 0;
      this.departmentPageNumber = 1;
      this.departmentCombo = [];

      this.serviceRequestModel.selectedLocationIds = [];
      this.previousSelectedLocations = [];
    } else {
      this.serviceRequestModel.locationName = event.locDisplayField;
      this.serviceRequestModel.locationId = event.locationId;
      this.serviceEngineerPageNumber = 1;
      this.serviceEngineerCombo = [];

      this.serviceRequestModel.assetHdrId = 0;
      this.serviceRequestModel.assetCode = '';
      this.assetCodePageNumber = 1;
      this.assetCodeCombo = [];

      this.serviceRequestModel.departmentName = null;
      this.serviceRequestModel.departmentId = 0;
      this.departmentPageNumber = 1;
      this.departmentCombo = [];

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
          this.serviceRequestModel.selectedLocationIds.splice(removedIndex, 1);
        }
        // Update the previous selection list
        this.previousSelectedLocations = currentLocationNames;
      } else {
        this.serviceRequestModel.selectedLocationIds = event.map(location => location.locationId);
      }

      // Update the previous selection list
      this.previousSelectedLocations = event.map(location => location.locDisplayField);
    }
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

  // getCategoryComboValue(event) {
  //   if (event === undefined) {
  //     this.serviceRequestModel.assetCategoryId = 0;
  //     this.serviceRequestModel.assetCategoryName = null;
  //     this.assetCategoryPageNumber = 1;
  //     this.assetCategoryName = [];
  //   } else {
  //     this.serviceRequestModel.assetCategoryId = event.assetCategoryId;
  //     this.serviceRequestModel.assetCategoryName = event.assetCategoryName;
  //   }
  // }
  getCategoryComboValue(event) {
    if (event === undefined || event.length <= 0) {
      this.serviceRequestModel.assetCategoryId = 0;
      this.serviceRequestModel.assetCategoryName = null;
      this.assetCategoryPageNumber = 1;
      this.assetCategoryName = [];

      this.serviceRequestModel.selectedAssetCategoryIds = [];
      this.previousAssetCategoryNames = [];
    } else {
      this.serviceRequestModel.assetCategoryId = event.assetCategoryId;
      this.serviceRequestModel.assetCategoryName = event.assetCategoryName;

      // Find removed item
      if (this.previousAssetCategoryNames.length > event.length) {
        // Convert event array to a list of display names
        const currentAssetCategoryNames = event.map(category => category.assetCategoryName);
        // Find the removed item
        const removedItem = this.previousAssetCategoryNames.find(
          prevItem => !currentAssetCategoryNames.includes(prevItem)
        );

        if (removedItem) {
          const removedIndex = this.previousAssetCategoryNames.indexOf(removedItem);
          this.serviceRequestModel.selectedAssetCategoryIds.splice(removedIndex, 1);
        }
        // Update the previous selection list
        this.previousAssetCategoryNames = currentAssetCategoryNames;
      } else {
        this.serviceRequestModel.selectedAssetCategoryIds = event.map(category => category.assetCategoryId);
      }

      // Update the previous selection list
      this.previousAssetCategoryNames = event.map(category => category.assetCategoryName);
    }
  }

  listOfSubCategory(searchValue) {
    this.scrollsyncAssetSubCategory = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetSubCategoryCombo.sams', searchValue.term, this.serviceRequestModel.assetCategoryId,
      '', this.recordsPerPageForCombo, this.assetSubCategorPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetSubCategorPageNumber, this.subCategoryName, data.responseData.comboList)
          this.assetSubCategorPageNumber = this.getData.pageNumber;
          this.subCategoryName = this.getData.dataList;
          this.scrollsyncAssetSubCategory = false;
        }
      );
  }
  // getSubCategoryComboValue(event) {
  //   if (event === undefined) {
  //     this.serviceRequestModel.subCategoryId = 0;
  //     this.serviceRequestModel.subCategoryName = null;
  //     this.assetSubCategorPageNumber = 1;
  //     this.subCategoryName = [];
  //   } else {
  //     this.serviceRequestModel.subCategoryId = event.subCategoryId;
  //     this.serviceRequestModel.subCategoryName = event.subCategoryName;
  //   }

  // }

  getSubCategoryComboValue(event) {
    if (event === undefined || event.length <= 0) {
      this.serviceRequestModel.subCategoryId = 0;
      this.serviceRequestModel.subCategoryName = null;
      this.assetSubCategorPageNumber = 1;
      this.subCategoryName = [];

      this.serviceRequestModel.selectedSubCategoryIds = [];
      this.previousSubCategoryNames = [];
    } else {
      this.serviceRequestModel.subCategoryId = event.subCategoryId;
      this.serviceRequestModel.subCategoryName = event.subCategoryName;

      // Find removed item
      if (this.previousSubCategoryNames.length > event.length) {
        // Convert event array to a list of display names
        const currentSubCategoryNames = event.map(subCategory => subCategory.subCategoryName);
        // Find the removed item
        const removedItem = this.previousSubCategoryNames.find(
          prevItem => !currentSubCategoryNames.includes(prevItem)
        );

        if (removedItem) {
          const removedIndex = this.previousSubCategoryNames.indexOf(removedItem);
          this.serviceRequestModel.selectedSubCategoryIds.splice(removedIndex, 1);
        }
        // Update the previous selection list
        this.previousSubCategoryNames = currentSubCategoryNames;
      } else {
        this.serviceRequestModel.selectedSubCategoryIds = event.map(subCategory => subCategory.subCategoryId);
      }

      // Update the previous selection list
      this.previousSubCategoryNames = event.map(subCategory => subCategory.subCategoryName);
    }

  }

  listOfAllAssetGroup(searchKey) {
    this.scrollsyncAssetGroup = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetGroupCombo.sams', searchKey.term, this.serviceRequestModel.subCategoryId, '',
      this.recordsPerPageForCombo, this.assetGroupPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchKey, this.assetGroupPageNumber, this.assetGroup, data.responseData.comboList)
          this.assetGroupPageNumber = this.getData.pageNumber;
          this.assetGroup = this.getData.dataList;
          this.scrollsyncAssetGroup = false;
        }
      );
  }

  // getAssetGroupComboValue(event) {
  //   if (event != null) {
  //     this.serviceRequestModel.assetGroupName = event.assetGroupName;
  //     this.serviceRequestModel.assetGroupId = event.assetGroupId;

  //   } else {
  //     this.serviceRequestModel.assetGroupName = null;
  //     this.serviceRequestModel.assetGroupId = 0;
  //     this.assetGroup = [];
  //     this.assetGroupPageNumber = 1;
  //   }
  // }
  getAssetGroupComboValue(event) {
    if (event === undefined || event.length <= 0) {
      this.serviceRequestModel.assetGroupName = null;
      this.serviceRequestModel.assetGroupId = 0;
      this.assetGroup = [];
      this.assetGroupPageNumber = 1;

      this.serviceRequestModel.selectedAssetGroupIds = [];
      this.previousAssetGroupNames = [];
    } else {
      this.serviceRequestModel.assetGroupName = event.assetGroupName;
      this.serviceRequestModel.assetGroupId = event.assetGroupId;

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
          this.serviceRequestModel.selectedAssetGroupIds.splice(removedIndex, 1);
        }
        // Update the previous selection list
        this.previousAssetGroupNames = currentAssetGroupNames;
      } else {
        this.serviceRequestModel.selectedAssetGroupIds = event.map(assetGroup => assetGroup.assetGroupId);
      }

      // Update the previous selection list
      this.previousAssetGroupNames = event.map(assetGroup => assetGroup.assetGroupName);
    }
  }

  listOfAllModel(searchKey) {
    this.scrollsyncModel = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults('listOfAllModelCombo.sams', searchKey.term, '',
      this.serviceRequestModel.assetGroupId > 0 ? this.serviceRequestModel.assetGroupId : '',
      this.recordsPerPageForCombo, this.modelComboPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchKey, this.modelComboPageNumber, this.modelCombo, data.responseData.comboList)
          this.modelComboPageNumber = this.getData.pageNumber;
          this.modelCombo = this.getData.dataList;
          this.scrollsyncModel = false;
        }
      );
  }

  // getModelComboValue(event) {
  //   if (event != null) {
  //     this.serviceRequestModel.modelId = event.modelId;
  //     this.serviceRequestModel.modelName = event.modelName;
  //   } else {
  //     this.serviceRequestModel.modelId = 0;
  //     this.serviceRequestModel.modelName = null;
  //     this.modelCombo = [];
  //     this.modelComboPageNumber = 1;
  //   }
  // }

  getModelComboValue(event) {
    if (event === undefined || event.length <= 0) {
      this.serviceRequestModel.modelId = 0;
      this.serviceRequestModel.modelName = null;
      this.modelCombo = [];
      this.modelComboPageNumber = 1;

      this.serviceRequestModel.selectedModelIds = [];
      this.previousSelectedModels = [];
    } else {
      this.serviceRequestModel.modelId = event.modelId;
      this.serviceRequestModel.modelName = event.modelName;

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
          this.serviceRequestModel.selectedModelIds.splice(removedIndex, 1);
        }
        // Update the previous selection list
        this.previousSelectedModels = currentModelNames;
      } else {
        console.log("event : ", event)
        this.serviceRequestModel.selectedModelIds = event.map(model => model.modelId);
      }

      // Update the previous selection list
      this.previousSelectedModels = event.map(model => model.modelName);
    }

  }

  loadAssetStatusComboData(searchValue) {
    this.scrollsyncAssetStatus = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetStatusCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.asssetStatusPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.asssetStatusPageNumber, this.assetStatusCombo, data.responseData.comboList)
          this.asssetStatusPageNumber = this.getData.pageNumber;
          this.assetStatusCombo = this.getData.dataList;
          this.scrollsyncAssetStatus = false;
        }
      );
  }

  selectedAssetStatusList(event) {
    if (event === undefined) {
      this.serviceRequestModel.assetStatusId = 0;
      this.serviceRequestModel.assetStatus = '';
      this.asssetStatusPageNumber = 1;
      this.assetStatusCombo = [];
    } else {
      this.serviceRequestModel.assetStatusId = event.assetStatusId;
      this.serviceRequestModel.assetStatus = event.assetStatusName;
    }
  }

  loadAssetCodeComboData(searchValue) {
    this.scrollsyncAssetCode = true;

    const locIds = this.serviceRequestModel.selectedLocationIds;
    const departmentIds = this.serviceRequestModel.selectedDepartmentIds;

    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetCodeCombo.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.assetCodePageNumber
      , '', '', '', '', locIds, departmentIds).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetCodePageNumber, this.assetCodeCombo, data.responseData.comboList)
          this.assetCodePageNumber = this.getData.pageNumber;
          this.assetCodeCombo = this.getData.dataList;
          this.scrollsyncAssetCode = false;
        }
      );
  }

  loadSrStatusComboData(searchValue) {
    this.scrollSrStatusSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '50' : '';
    this.commonService.getComboResults('fetchSRStatusList.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.srStatusPageNumber
      , '0', '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.srStatusPageNumber, this.srStatusCombo, data.responseData.comboList)
          this.srStatusPageNumber = this.getData.pageNumber;
          this.srStatusCombo = this.getData.dataList;
          this.scrollSrStatusSync = false;
        }
      );
  }

  getsrStausComboValue(event) {
    console.log('sestatus', event)
    if (event != null) {
      this.serviceRequestModel.srStatusId = event.srStatusId;
      this.serviceRequestModel.srStatus = event.srStatusName;
    } else {
      this.serviceRequestModel.srStatusId = 0;
      this.serviceRequestModel.srStatus = '';
      this.srStatusCombo = [];
      this.srStatusPageNumber = 1;
    }
  }

  selectedAssetCodeData(event) {
    if (event === undefined) {
      this.serviceRequestModel.assetHdrId = 0;
      this.serviceRequestModel.assetCode = null;
      this.assetCodePageNumber = 1;
      this.assetCodeCombo = [];
    } else {
      this.serviceRequestModel.assetHdrId = event.assetHdrId;
      this.serviceRequestModel.assetCode = event.assetCode;;
    }
  }

  // selectedAssignedToData(event) {
  //   if (event === undefined) {
  //     this.serviceRequestModel.assignedTo = null;
  //     this.serviceRequestModel.assignedToId = 0;
  //     this.serviceEngineerPageNumber = 1;
  //     this.serviceEngineerCombo = [];
  //   } else {
  //     this.serviceRequestModel.assignedTo = event.displayName;
  //     this.serviceRequestModel.assignedToId = event.employeeId;
  //   }
  // }
  selectedAssignedToData(event) {
    if (event === undefined || event.length <= 0) {
      this.serviceRequestModel.assignedTo = null;
      this.serviceRequestModel.assignedToId = 0;
      this.serviceEngineerPageNumber = 1;
      this.serviceEngineerCombo = [];

      this.serviceRequestModel.selectedAssignedToIds = [];
      this.previousAssignedToNames = [];

    } else {
      this.serviceRequestModel.assignedTo = event.displayName;
      this.serviceRequestModel.assignedToId = event.employeeId;

      // Find removed item
      if (this.previousAssignedToNames.length > event.length) {
        // Convert event array to a list of display names
        const currentAssignedToNames = event.map(assignedTO => assignedTO.displayName);
        // Find the removed item
        const removedItem = this.previousAssignedToNames.find(
          prevItem => !currentAssignedToNames.includes(prevItem)
        );

        if (removedItem) {
          const removedIndex = this.previousAssignedToNames.indexOf(removedItem);
          this.serviceRequestModel.selectedAssignedToIds.splice(removedIndex, 1);
        }
        // Update the previous selection list
        this.previousAssignedToNames = currentAssignedToNames;
      } else {
        this.serviceRequestModel.selectedAssignedToIds = event.map(assignedTO => assignedTO.employeeId);
      }

      // Update the previous selection list
      this.previousAssignedToNames = event.map(assignedTO => assignedTO.displayName);
    }
  }

  functionalStatus = [
    { id: 1, name: 'CRITICAL' },
    { id: 2, name: 'NON CRITICAL' }
  ];

  // srStatus = [
  //   { id: 1, name: 'OPEN' },
  //   { id: 2, name: 'BOOKED' },
  //   { id: 3, name: 'ACKNOWLEDGED' },
  //   { id: 4, name: 'IN-PROGRESS' },
  //   { id: 5, name: 'HOLD' },
  //   { id: 6, name: 'IN-PROGRESS SPARE REQUESTED' },
  //   { id: 7, name: 'IN-PROGRESS STANDBY PROVIDED' },
  //   { id: 8, name: 'IN-PROGRESS WAITING FOR QUOTATION' },
  //   { id: 9, name: 'IN-PROGRESS INDENT PROCESSING' },
  //   { id: 10, name: 'IN-PROGRESS AWAITING FOR PO' },
  //   { id: 11, name: 'IN-PROGRESS PO RELEASED' },
  //   { id: 12, name: 'IN-PROGRESS WAITING FOR SPARE' },
  //   { id: 13, name: 'COMPLETED' },
  //   { id: 14, name: 'APPROVAL PENDING' },
  //   { id: 15, name: 'CLOSED' },
  // ];

  dateValidationinstall(event) {
    console.log('event', event)
    return false;
  }

  clear() {
    this.serviceRequestModel = new ServiceRequestModel();
    // localStorage.removeItem('SERVICE_REQUEST_SEARCH_PARAMATER');
    this.serviceRequestModel.direction = 'desc';
    this.serviceRequestModel.columnName = 'updatedDt';
    this.serviceRequestModel.fromDashboard = false;
    this.applyPreferredFilters();

    // this.ngOnInit()
    this.fetchList();
    this.selectedItem = 0;
  }

  generateSRPDF(srId?: number) {
    let dialogRef = this.dialog.open(SrPdfConfirmationDialogComponent, {
      height: 'auto',
      width: '500px',
      data: { 'srId': srId }
    });
    dialogRef.disableClose = true;

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

  loadSrTypeComboData(searchValue) {
    this.scrollsyncSrType = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllSrTypeCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.srTypePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.srTypePageNumber, this.srTypeCombo, data.responseData.comboList)
          this.srTypePageNumber = this.getData.pageNumber;
          this.srTypeCombo = this.getData.dataList;
          this.scrollsyncSrType = false;
        }
      );

  }

  loadServiceEngineerData(searchValue) {
    this.scrollServiceEngineersync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllServiceEngineerCombo.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.serviceEngineerPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.serviceEngineerPageNumber, this.serviceEngineerCombo, data.responseData.comboList)
        this.serviceEngineerPageNumber = this.getData.pageNumber;
        this.serviceEngineerCombo = this.getData.dataList;
        this.scrollServiceEngineersync = false;
      }
    );
  }


  loadDepartmentComboData(searchValue) {
    this.scrollDepartmentsync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllDeparment.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.departmentPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.departmentPageNumber, this.departmentCombo, data.responseData.comboList)
        this.departmentPageNumber = this.getData.pageNumber;
        this.departmentCombo = this.getData.dataList;
        this.scrollDepartmentsync = false;
      }
    );
  }

  // selectedDepartmentData(event) {
  //   if (event === undefined) {
  //     this.serviceRequestModel.departmentName = null;
  //     this.serviceRequestModel.departmentId = 0;
  //     this.departmentPageNumber = 1;
  //     this.departmentCombo = [];
  //   } else {
  //     this.serviceRequestModel.departmentName = event.departmentName;
  //     this.serviceRequestModel.departmentId = event.departmentId;
  //   }
  // }
  selectedDepartmentData(event) {
    if (event === undefined || event.length <= 0) {
      this.serviceRequestModel.departmentName = null;
      this.serviceRequestModel.departmentId = 0;
      this.departmentPageNumber = 1;
      this.departmentCombo = [];

      this.serviceRequestModel.selectedDepartmentIds = [];
      this.previousDepartmentNames = [];
    } else {
      this.serviceRequestModel.departmentName = event.departmentName;
      this.serviceRequestModel.departmentId = event.departmentId;

      // Find removed item
      if (this.previousDepartmentNames.length > event.length) {
        // Convert event array to a list of display names
        const currentDepartmentNames = event.map(department => department.departmentName);
        // Find the removed item
        const removedItem = this.previousDepartmentNames.find(
          prevItem => !currentDepartmentNames.includes(prevItem)
        );

        if (removedItem) {
          const removedIndex = this.previousDepartmentNames.indexOf(removedItem);
          this.serviceRequestModel.selectedDepartmentIds.splice(removedIndex, 1);
        }
        // Update the previous selection list
        this.previousDepartmentNames = currentDepartmentNames;
      } else {
        this.serviceRequestModel.selectedDepartmentIds = event.map(department => department.departmentId);
      }

      // Update the previous selection list
      this.previousDepartmentNames = event.map(department => department.departmentName);
    }
  }


  listOfContractType(searchValue) {
    this.scrollContractTypeSync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllContractTypeCombo.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.contractTypePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.contractTypePageNumber, this.contractTypeList, data.responseData.comboList)
        this.contractTypePageNumber = this.getData.pageNumber;
        this.contractTypeList = this.getData.dataList;
        this.scrollContractTypeSync = false;
      }
    );
  }

  setContractType(event) {
    if (event === undefined) {
      this.serviceRequestModel.contractType = null;
      this.contractTypePageNumber = 1;
      this.contractTypeList = [];
    } else {
      this.serviceRequestModel.contractType = event.contractTypeName;
    }
  }

  setSrTypeValue(event) {
    if (event === undefined) {
      this.srTypePageNumber = 1;
      this.srTypeId = 1;
      this.srType = 'BM';
    } else {
      this.serviceRequestModel.srType = event.srId;
      this.srTypeId = event.srTypeId;

      this.srType = event.srId;

      // this.defaultColumns = [];
      // this.displayedColumns = [];
      // if(this.srTypeId == 1 || this.srTypeId == 9){
      //   this.defaultColumns = ['select','sNo','locationName', 'srNo', 'srType','totalDownHrsStr','assetCode','assetGroupDesc','modelName','departmentName','srStatusName','assignedTo','callerName','subTicketDetails', 'maintenanceStrategy','updatedBy'];
      //   this.displayedColumns = [...this.defaultColumns];
      // }else if((this.srTypeId == 6 || this.srTypeId == 3 || this.srTypeId == 5) || (this.srTypeId == 13 || this.srTypeId == 11)){
      //   this.defaultColumns = ['select','sNo','locationName', 'srNo', 'srType','assetCode','assetGroupDesc','modelName','departmentName', 'srStatusName','assignedTo','paMaintenanceStrategy', 'maintenanceStrategy','updatedBy'];
      //   this.displayedColumns = [...this.defaultColumns];
      // }else if(this.srTypeId == 7){
      //   this.defaultColumns = ['select','sNo','locationName', 'srNo', 'srType','assetCode','assetGroupDesc','modelName','departmentName', 'srStatusName','assignedTo', 'maintenanceStrategy','updatedBy'];
      //   this.displayedColumns = [...this.defaultColumns];
      // }else if(this.srTypeId == 2 || this.srTypeId == 10){
      //   this.defaultColumns = ['select','sNo','locationName', 'srNo', 'srType','assetCode','assetGroupDesc','modelName','departmentName', 'srStatusName','assignedTo','pmMaintenanceStrategy', 'maintenanceStrategy','updatedBy'];
      //   this.displayedColumns = [...this.defaultColumns];
      // }else if(this.srTypeId == 4 || this.srTypeId == 12){
      //   this.defaultColumns = ['select','sNo','locationName', 'srNo', 'srType','assetCode','assetGroupDesc','modelName','departmentName', 'srStatusName','assignedTo','qaMaintenanceStrategy', 'maintenanceStrategy','updatedBy'];
      //   this.displayedColumns = [...this.defaultColumns];
      // }else if(this.srTypeId == 8){
      //   this.defaultColumns = ['select','sNo','locationName', 'srNo', 'srType','assetCode','assetGroupDesc','modelName','departmentName', 'srStatusName','assignedTo','paMaintenanceStrategy','pmMaintenanceStrategy', 'maintenanceStrategy','updatedBy'];
      //   this.displayedColumns = [...this.defaultColumns];
      // }

      // if(this.srType == 'BM'){
      //   this.defaultColumns = ['select','sNo','locationName', 'srNo', 'srType','totalDownHrsStr','assetCode','assetGroupDesc','modelName','departmentName','srStatusName','assignedTo','callerName','subTicketDetails', 'maintenanceStrategy','updatedBy'];
      //   this.displayedColumns = [...this.defaultColumns];
      // }else if((this.srType == 'PA' || this.srType == 'RFS' || this.srType == 'INSTALLATION')){
      //   this.defaultColumns = ['select','sNo','locationName', 'srNo', 'srType','assetCode','assetGroupDesc','modelName','departmentName', 'srStatusName','assignedTo','paMaintenanceStrategy', 'maintenanceStrategy','updatedBy'];
      //   this.displayedColumns = [...this.defaultColumns];
      // }else if(this.srType == 'DR'){
      //   this.defaultColumns = ['select','sNo','locationName', 'srNo', 'srType','assetCode','assetGroupDesc','modelName','departmentName', 'srStatusName','assignedTo', 'maintenanceStrategy','updatedBy'];
      //   this.displayedColumns = [...this.defaultColumns];
      // }else if(this.srType == 'PM'){
      //   this.defaultColumns = ['select','sNo','locationName', 'srNo', 'srType','assetCode','assetGroupDesc','modelName','departmentName', 'srStatusName','assignedTo','pmMaintenanceStrategy', 'maintenanceStrategy','updatedBy'];
      //   this.displayedColumns = [...this.defaultColumns];
      // }else if(this.srType == 'QA'){
      //   this.defaultColumns = ['select','sNo','locationName', 'srNo', 'srType','assetCode','assetGroupDesc','modelName','departmentName', 'srStatusName','assignedTo','qaMaintenanceStrategy', 'maintenanceStrategy','updatedBy'];
      //   this.displayedColumns = [...this.defaultColumns];
      // }else if(this.srType == 'PM/PA'){
      //   this.defaultColumns = ['select','sNo','locationName', 'srNo', 'srType','assetCode','assetGroupDesc','modelName','departmentName', 'srStatusName','assignedTo','paMaintenanceStrategy','pmMaintenanceStrategy', 'maintenanceStrategy','updatedBy'];
      //   this.displayedColumns = [...this.defaultColumns];
      // }

    }
  }

  sendEmailSR(srId, srNo, locationId) {
    let dialogRef = this.dialog.open(SrEmailNotifyComponent, {
      height: '610px',
      width: '570px',
      data: {
        'srId': srId,
        'srNo': srNo,
        'locationId': locationId
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        //this.validateEditMode();
      });
  }

  // generateWOReport() {
  //   this.serviceRequestModel.recordsPerPage = 0;
  //   this.commonService.commonListService('generateWorkOrderReport.sams', this.serviceRequestModel).subscribe(
  //     (data) => {
  //       this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
  //     }, error => {
  //     }
  //   );
  // }

  consumedItemsCombo(searchValue) {

    this.scrollsyncConsumedSpares = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('fetchListOfAllConsumedSparesCombo.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.consumedSparesPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.consumedSparesPageNumber, this.consumedItemsList, data.responseData.comboList)
        this.consumedSparesPageNumber = this.getData.pageNumber;
        this.consumedItemsList = this.getData.dataList;
        this.scrollsyncConsumedSpares = false;
      }
    );
  }

  selectedConsumedItemName(event) {
    if (event != undefined) {
      this.serviceRequestModel.srId = event.srId;
      this.serviceRequestModel.itemName = event.itemName;
    } else {
      this.serviceRequestModel.srId = 0;
      this.serviceRequestModel.itemName = null;
    }
  }

  generateSRPDFInstallationReport(srId?: number) {
    this.commonService.commonGetService('generateSRHandOverFormPdf.sams', srId, "Installation Report").subscribe(
      data => {
        if (data.success) {
          this.downloadDocument(data.responseData, 'application/pdf');
          this.commonService.openToastSuccessMessage("Installation report generated successfully.");
        } else {
          this.commonService.openToastWarningMessage("Failed to generate Installation Pdf report.");
        }
      }, error => {
      }
    );
  }

  selectSR(element) {
    if (this.selectedItem == element.srId) {
      this.srStatusId = '0';
      this.srType = '';
      this.selectedItem = 0;
      this.selectedSrNo = '';
      this.selectedLocationId = 0;
    }
    else {
      this.srStatusId = element.srStatusId;
      this.srType = element.srType;
      this.selectedItem = element.srId;
      this.selectedSrNo = element.srNo;
      this.selectedLocationId = element.locationId;
    }
  }


  handleStatusClick(status, element) {
    let srId = element.srId;
    let dialogRef = this.dialog.open(SrSubStatusInfoComponent, {
      width: '85%',
      height: 'auto',
      data: {
        'status': status,
        'srId': srId
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {

      });
  }

  openSRReport() {
    this.serviceRequestModel.recordsPerPage = 0;
    let dialogRef = this.dialog.open(ServiceRequestReportComponent, {
      height: 'auto',
      width: '300px',
      data: {
        'serviceRequestModel': this.serviceRequestModel
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
      });
  }

  selectedSrList = [];
  disableActionBtn = true;
  selectSrs(element) {
    const srId = this.selectedSrList.findIndex(data => data.srId === element.srId);
    if (srId === -1) {
      this.selectedSrList.push(element);
    } else {
      this.selectedSrList.splice(srId, 1);
    }

    if (this.selectedSrList.length === 0) {
      this.disableActionBtn = true;
      this.selectedElement = '';
      this.srStatusId = '0';
      this.srType = '';
      this.selectedItem = 0;
      this.selectedSrNo = '';
      this.selectedLocationId = 0;
    } else if (this.selectedSrList.length === 1) {
      this.disableActionBtn = false;
      this.selectedSrList.forEach(data => {
        this.selectedElement = data;
        this.srStatusId = data.srStatusId;
        this.srType = data.srType;
        this.selectedItem = data.srId;
        this.selectedSrNo = data.srNo;
        this.selectedLocationId = data.locationId;
      });
    } else {
      this.disableActionBtn = true;
      this.selectedElement = '';
      this.srStatusId = '0';
      this.srType = '';
      this.selectedItem = 0;
      this.selectedSrNo = '';
      this.selectedLocationId = 0;
    }
  }

  compareValue(element: any): boolean {
    if (this.selectedSrList.length > 0) {
      return this.selectedSrList.findIndex(data => data.srId === element.srId) !== -1;
    }
    else {
      return false;
    }
  }

  bulkSrReassign() {
    if (this.serviceRequestModel.srStatusId == 1 || this.serviceRequestModel.srStatusId == 2
      || this.serviceRequestModel.srStatusId == 3 || this.serviceRequestModel.srStatusId == 4) {
      if (this.selectedSrList.length > 0) {

        let dialogRef = this.dialog.open(SrAssignEngineerComponent, {
          height: 'auto',
          width: '1200px',
          data: {
            'modelId': 0,
            'locationId': this.serviceRequestModel.locationId,
            'assignedToId': this.serviceRequestModel.assignedToId,
            'assignedDate': new Date(),
          }
        });
        dialogRef.disableClose = true;
        dialogRef.afterClosed().subscribe(
          data => {
            if (data.exit) {
              this.serviceRequestReassignInfo.reAssignedTo = data.assignEmpName;
              this.serviceRequestReassignInfo.reAssignedToId = data.assignEmpId;
              this.serviceRequestReassignInfo.assignedToContactNo = data.officeContactNo;
              this.serviceRequestReassignInfo.assignedDtDisp = data.assignedDtDisp;
              let srReassignObj = {
                'srReassignInfo': this.serviceRequestReassignInfo,
                'selectedSrList': this.selectedSrList
              }
              this.commonService.commonInsertService('bulkServiceRequestReassign.sams', srReassignObj).subscribe(
                (data) => {
                  if (data.success) {
                    this.commonService.openToastSuccessMessage('Reassigned Successfully.');
                    this.ngOnInit();
                  } else {
                    this.commonService.openToastErrorMessage(data.message);
                  }
                }
              );
            }
          });

      } else {
        this.commonService.openToastWarningMessage("Kindly select SR(s) to 'Reassign'");
      }
    } else {
      this.commonService.openToastWarningMessage("Kindly search with SR Status as 'OPEN' to proceed with 'Reassign'");
    }

  }

  selectedAllSr: boolean = false;
  selectedAllSrs(event) {
    this.selectedAllSr = event.checked;
    this.disableActionBtn = true;

    if (event.checked) {
      this.selectedSrList = this.dataSource;
    } else {
      this.selectedSrList = [];
    }

    if (this.selectedSrList.length === 1) {
      this.disableActionBtn = false;
      this.selectedSrList.forEach(data => {
        this.srStatusId = data.srStatusId;
        this.srType = data.srType;
        this.selectedItem = data.srId;
        this.selectedSrNo = data.srNo;
        this.selectedLocationId = data.locationId;
      });
    } else {
      this.disableActionBtn = true;
      this.srStatusId = '0';
      this.srType = '';
      this.selectedItem = 0;
      this.selectedSrNo = '';
      this.selectedLocationId = 0;
    }

  }

  openFeedback(element) {
    const srId = element.srId;
    let dialogRef = this.dialog.open(SrFeedbackComponent, {
      height: 'auto',
      width: '400px',
      data: {
        srScreen: "List"
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(data => {
      if (data) {

        element.srFeedback = data.feedback;
        element.srFeedbackCallerRemarks = data.remarks;

        if (data.feedback == 'UNSATISFACTORY') {
          element.srEFSValueId = 1;
          element.srStatusId = 5;
        } else {
          element.srStatusId = 7;
        }

        this.srClose(element);


      }
    });
  }

  srClose(element) {

    if (element.srFeedback == 'UNSATISFACTORY') {
      let dialogRef = this.dialog.open(SrReOpenConfirmationComponent, {
        height: 'auto',
        width: '400px',
        data: {

        }
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(
        data => {
          if (data.status) {
            this.saveOrUpdateSR(element);
          }
        });
    } else if (element.srFeedback == 'GOOD' || element.srFeedback == 'SATISFACTORY') {
      this.saveOrUpdateSR(element);
    }
  }

  saveOrUpdateSR(element) {

    this.commonService.commonInsertService('saveUpdateApprovalsServiceRequest.sams', element).subscribe(
      data => {
        if (data.success) {
          this.commonService.openToastSuccessMessage('Work Order ' + data.responseData + ' successfully.');
          setTimeout(() => {
            this.ngOnInit();
          }, 1000);
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
        console.error('Error:', error);
      }
    );
  }

  onCheckboxChange(event: MatCheckboxChange) {
    this.serviceRequestModel.reOpenBtn = event.checked;
  }

  srFunctionalityStatusComboData(searchValue) {
    this.functionlityCombo = [];
    this.scrollsyncSRFunctionlityPriority = true;
    this.funtionlityPageNumber = 1;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllSRFuntionalityCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.funtionlityPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.funtionlityPageNumber, this.functionlityCombo, data.responseData.comboList)
          this.funtionlityPageNumber = this.getData.pageNumber;
          this.functionlityCombo = this.getData.dataList;
          this.scrollsyncSRFunctionlityPriority = false;
        }
      );
  }

  selectedSRFunctionalityStatusComboData(event) {
    if (event === undefined) {
      this.funtionlityPageNumber = 1;
      this.functionlityCombo = [];
      this.serviceRequestModel.functionality = '';
    } else {

      this.translateService.get([event.functionalityName])
        .subscribe((val) => {
          const status = Object.values(val)
          this.serviceRequestModel.functionality = status.toString();
        });

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
            this.serviceRequestModel = JSON.parse(this.userPreference.customFilters);

            if (this.serviceRequestModel.selectedLocationNames != null && this.serviceRequestModel.selectedLocationNames.length > 0) {
              this.previousSelectedLocations = this.serviceRequestModel.selectedLocationNames;
            }
            if (this.serviceRequestModel.selectedAssetCategoryNames != null && this.serviceRequestModel.selectedAssetCategoryNames.length > 0) {
              this.previousAssetCategoryNames = this.serviceRequestModel.selectedAssetCategoryNames;
            }
            if (this.serviceRequestModel.selectedSubCategoryNames != null && this.serviceRequestModel.selectedSubCategoryNames.length > 0) {
              this.previousSubCategoryNames = this.serviceRequestModel.selectedSubCategoryNames;
            }
            if (this.serviceRequestModel.selectedAssetGroupNames != null && this.serviceRequestModel.selectedAssetGroupNames.length > 0) {
              this.previousAssetGroupNames = this.serviceRequestModel.selectedAssetGroupNames;
            }
            if (this.serviceRequestModel.selectedDepartmentNames != null && this.serviceRequestModel.selectedDepartmentNames.length > 0) {
              this.previousDepartmentNames = this.serviceRequestModel.selectedDepartmentNames;
            }
            if (this.serviceRequestModel.selectedModelNames != null && this.serviceRequestModel.selectedModelNames.length > 0) {
              this.previousSelectedModels = this.serviceRequestModel.selectedModelNames;
            }
            if (this.serviceRequestModel.selectedAssignedToNames != null && this.serviceRequestModel.selectedAssignedToNames.length > 0) {
              this.previousAssignedToNames = this.serviceRequestModel.selectedAssignedToNames;
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
    this.userPreference.customColumns = JSON.stringify(this.displayedColumns);
    this.userPreference.customFilters = JSON.stringify(this.serviceRequestModel);
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

  selectedEfsStatus(event) {
    if (event == undefined) {
      this.serviceRequestModel.srEFSValue = '';
    } else {
      this.serviceRequestModel.srEFSValue = event.efsName;
    }
  }

  updateSrStatus() {

    let processName = "";

    processName = 'Acknowledge ';

    this.selectedSrList = this.selectedSrList.filter(function (element) {
      return element.srStatusId == 2;
    });

    this.selectedSRListLength = this.selectedSrList.length;


    let selectedList = this.selectedSrList;
    const dialogData = {
      confirmHeading: 'Confirmation',
      confirmMsg: `Are you sure to ${processName} the selected Service Request?`
    };

    dialogData['selectedElementListLength'] = this.selectedSRListLength;

    const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: dialogData
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(data => {
      if (data.status === true) {

        let srIdList = { selectedSRList: [] };
        for (let i = 0; i <= selectedList.length - 1; i++) {
          srIdList.selectedSRList.push(selectedList[i].srId);

        }
        this.commonService.showSpinner();
        this.commonService.commonInsertService('updateSRStatus.sams', srIdList).subscribe(
          data => {
            if (data.success) {

              this.selectedSrList = [];
              this.commonService.hideSpinner();
              this.commonService.openToastSuccessMessage(data.message);
              this.fetchList();
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
        this.selectedSrList = [];
      }
    });
  }
  loadSrTypeComboDataAsync(searchValue): Promise<void> {
    return new Promise((resolve) => {
      this.loadSrTypeComboData(searchValue);
      const checkInterval = setInterval(() => {
        if (this.srTypeCombo && this.srTypeCombo.length > 0) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 50);
    });
  }

  fromDateValidation(event) {
    if (event.value) {
      this.serviceRequestModel.fromDt = moment(event.value).format(this.assetOptimaConstants.ISODate);
    }
    else {
      this.serviceRequestModel.fromDt = "";
    }

    return false;
  }
  endDateValidation(event) {
    if (event.value) {
      this.serviceRequestModel.endDt = moment(event.value).format(this.assetOptimaConstants.ISODate);
    }
    else {
      this.serviceRequestModel.endDt = "";
    }

    return false;
  }
}
