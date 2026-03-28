import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AssetModel } from 'src/app/Model/master/asset';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { Title } from '@angular/platform-browser';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { AssetHistoryComponent } from '../asset-history/asset-history.component';
import { AssetLabelPrintComponent } from '../asset-label-print/asset-label-print.component';
import { getData } from 'src/app/Model/common/fetchListData';
import { allassetStatus, allWorkflowStatus } from 'src/app/Constants/AllStatusConstants';
import * as moment from 'moment';
import { CustomFieldSearchComponent } from '../custom-field-search/custom-field-search.component';
import { TranslateService } from '@ngx-translate/core';
import { DeleteConfirmationComponent } from 'src/app/Components/Common-components/delete-confirmation/delete-confirmation.component';
import { allBusinessPartnerRoles } from 'src/app/Constants/AllStatusConstants';
import { CommonWorkflowApprovalDialogComponent } from 'src/app/Components/workflow/workflowApproval/common-workflow-approval-dialog/common-workflow-approval-dialog.component';
import { UserPrefernce } from 'src/app/Services/user-preference/user-preference';
import { BulkAssetReassignComponent } from '../bulk-asset-reassign/bulk-asset-reassign.component';
import { AssetReportComponent } from '../asset-report/asset-report.component';
import { AssetLabelPrintV1Component } from '../asset-label-print-v1/asset-label-print-v1.component';
import { ConfirmConfirmationComponent } from 'src/app/Components/Common-components/confirm-confirmation/confirm-confirmation.component';
import { RejectReasonViewComponent } from '../reject-reason-view/reject-reason-view.component';
import { RejectConfirmationComponent } from 'src/app/Components/Common-components/reject-confirmation/reject-confirmation.component';
import { PdfConfirmationComponent } from 'src/app/Components/Common-components/pdf-confirmation/pdf-confirmation.component';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit, OnDestroy {

  // displayedColumns = ['select', 'sno', 'locationName', 'assetCode', 'modelName','assetGroupName','departmentName',
  // 'assetCategoryName', 'statusTypeId', 'assetStatusId',
  // 'approvalStatusAsset','ageOfTheYear', 'ownershipType','businessPartnerName',
  // 'functionalStatus','createdBy','updatedBy'];

  defaultColumns = ['select', 'sno', 'locationName', 'assetCode', 'modelName', 'departmentName',
    'assetCategoryName', 'assetStatusId',
   'ageOfTheYear'];
  displayedColumns = [...this.defaultColumns];

  //USER PREFERENCE
  public userPreference: UserPrefernce;
  showManageColumns: boolean = false;

  dataSource = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('assetSearch') focusAssetSearch: ElementRef;
  searchvalue: any = '';
  panelOpenState = false;
  showFiller = false;
  mode = new FormControl('over');

  subLoader: boolean = false;

  dashboardRoute: boolean;

  //Set Page Title
  title = 'Asset Optima - Asset';

  public asset: AssetModel;
  moduleAccessModel: ModuleAccessModel;

  //COMBO
  locationCombo: any = [];
  assetCategoryName: any = [];
  subCategoryName: any = [];
  assetGroup: any = [];
  modelCombo: any = [];
  assetStatusCombo: any = [];
  certificateNameList: any = [];

  locationPageNumber: number;
  assetGroupPageNumber: number;
  modelComboPageNumber: number;
  assetCategoryPageNumber: number;
  assetSubCategorPageNumber: number;
  asssetStatusPageNumber: number;
  certificatePageNumber: number;

  scrollsyncLocation: boolean = false;
  scrollsyncAssetGroup: boolean = false;
  scrollsyncModel: boolean = false;
  scrollsyncAssetStatus: boolean = false;
  scrollsyncAssetCategory: boolean = false;
  scrollsyncAssetSubCategory: boolean = false;
  scrollsyncCertificateCombo: boolean = false;
  scrollsyncmanufactuer: boolean = false;
  recordsPerPageForCombo: string;
  selectedAllAssest: boolean = false;
  scrollsyncAssignToPerson: boolean = false;
  assignToPersonCombo: any = [];
  assignToPersonPageNumber: number = 0;
  scrollsyncPersonInCharge: boolean = false;
  personInchargeCombo: any = [];
  personInchargePageNumber: number = 0;

  //For Pagination
  length: string = '0';     //set total record count here
  pageIndex: string;  //set page number starts with zeroo
  pageSize: string;   // records per page
  defaultLocId: number;

  //PERMISSIONS
  modelAccessModule: ModuleAccessModel;

  limitCount: any;
  manufacturerPageNumber: number;
  manufactuer: any[] = [];

  supplierList: any = [];
  scrollSupplierNamesync: boolean = false;
  supplierPageNumber: number = 0;

  scrollsyncServiceEngineer1: boolean = false;
  serviceEngineer1PageNumber: number;
  serviceEngineer1Combo: any = [];

  scrollsyncPriority: boolean = false;
  priorityPageNumber: number;
  priorityCombo: any = [];

  scrollsyncAssigneeDepartment: boolean = false;
  assigneeDepartmentPageNumber: number;
  assigneeDepartmentCombo: any = [];

  scrollCustomersync: boolean = false;
  customerListPageNumber: number;
  customerList: any = [];

  scrollsyncAssetStatusType: boolean = false;
  assetStatusTypePageNumber: number;
  assetStatusTypeCombo: any = [];

  scrollsyncAssetCondition: boolean = false;
  assetConditionPageNumber: number;
  assetConditionCombo: any = [];

  enableCustomer: boolean = false;

  handoverOptions = [
    { id: 1, status: 'YES' },
    { id: 2, status: 'NO' },
  ]
  getData: getData;

  enableActionBtn: boolean = true;

  customFields: any = [];

  assetCodeChange = [
    { id: 1, name: 'YES' },
    { id: 2, name: 'NO' }
  ];

  technicianList = [
    { id: 1, name: 'Primary Technician' },
    { id: 2, name: 'Secondary Technician' },
    { id: 3, name: 'PMPA Technician' },
    { id: 4, name: 'QA Technician' }
  ];

  technicianValidate: boolean = true;
  assetReassignModuleAccess: ModuleAccessModel;

  isAssetInfoPanelExpanded: boolean = false;

  previousSelectedLocations: any[] = [];
  previousSelectedModels: any[] = [];
  previousSelectedBusinessPartners: any[] = [];
  previousSelectedStatusTypes: any[] = [];
  previousAssetStatusNames: any[] = [];
  previousAssetCategoryNames: any[] = [];
  previousSubCategoryNames: any[] = [];
  previousAssetGroupNames: any[] = [];
  previousDepartmentNames: any[] = [];
  previousAssignedToNames: any[] = [];
  previousSelectedManufacturers: any[] = [];

  scrollsyncAssetCode: boolean = false;
  assetCodePageNumber: number;
  assetCodeCombo: any = [];

  processStatusCombo1: any = [];
  scrollSyncProcessStatus: boolean = false;
  processStatusPageNumber1: number;

  constructor(private commonService: CommonService,
    private router: Router,
    public route: ActivatedRoute,
    private assetOptimaServices: AssetOptimaServices,
    private assetOptimaConstants: AssetOptimaConstants,
    private titleService: Title,
    private dialog: MatDialog,
    private userSessionService: UserSessionService,
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute,
    public assetOptimeMthnd: AssetOptimaServices,
    private samsService: AssetOptimaServices) {
    this.moduleAccessModel = new ModuleAccessModel();
    this.assetReassignModuleAccess = new ModuleAccessModel();
    this.asset = new AssetModel();
    this.pageSize = '100';
    this.pageIndex = '0';
    this.locationPageNumber = 1;
    this.assetGroupPageNumber = 1;
    this.modelComboPageNumber = 1;
    this.assetCategoryPageNumber = 1;
    this.assetSubCategorPageNumber = 1;
    this.asssetStatusPageNumber = 1;
    this.manufacturerPageNumber = 1;
    this.supplierPageNumber = 1;
    this.serviceEngineer1PageNumber = 1;
    this.customerListPageNumber = 1;
    this.certificatePageNumber = 1;
    this.assigneeDepartmentPageNumber = 1;
    this.priorityPageNumber = 1;
    this.assetConditionPageNumber = 1;
    this.assetStatusTypePageNumber = 1;
    this.assignToPersonPageNumber = 1;
    this.dashboardRoute = true;
    this.personInchargePageNumber = 1;
    this.assetCodePageNumber = 1;
    this.processStatusPageNumber1 = 1;

    this.userPreference = new UserPrefernce();
  }

  ngOnInit() {
    this.modelAccessModule = this.userSessionService.getUserGroupAccess()['GROUPACCESS_ASSET_REGISTER'];
    this.assetReassignModuleAccess = this.userSessionService.getUserGroupAccess()['GROUPACCESS_ASSET_REASSIGN'];
    this.titleService.setTitle(this.title);

    // if(localStorage.getItem('locationId') !== null && localStorage.getItem('locationName') !== null){

    //   this.asset.locationId = parseInt(localStorage.getItem('locationId'));
    //   this.asset.locationName = localStorage.getItem('locationName');
    // }else{

    // this.asset.locationName = this.userSessionService.getUserLocationName();
    // this.asset.locationId = this.userSessionService.getUserLocationId();
    // }

    // if(localStorage.getItem('ASSET_REGISTER_SEARCH_PARAMETER') == null) {
    //   this.asset.locationName = this.userSessionService.getUserLocationName();
    //   this.asset.locationId = this.userSessionService.getUserLocationId();
    //   this.asset.direction = 'desc';
    //   this.asset.columnName = 'updatedDt';
    // } else {
    //   this.asset = JSON.parse(localStorage.getItem('ASSET_REGISTER_SEARCH_PARAMETER'));
    // }

    // localStorage.removeItem('locationId');
    // localStorage.removeItem('locationName');
    this.asset.locationType = this.assetOptimaConstants.locationType;
    if (this.asset.locationType == 'SERVICE PROVIDER') {
      this.enableCustomer = true;
    }

    this.dataSource = [];
    this.length = '0';
    // if(localStorage.getItem('ASSET_REGISTER_SEARCH_PARAMETER') != null) {
    //   this.fetchList();
    // }

    localStorage.setItem('previousRoute', this.router.url);
    this.asset.riskNature = '';

    this.selectedAssetList = [];
    this.enableActionBtn = true;

    this.asset.locationName = this.userSessionService.getUserLocationName();
    this.asset.locationId = this.userSessionService.getUserLocationId();
    this.asset.direction = 'desc';
    this.asset.columnName = 'updatedDt';

    this.userPreference = new UserPrefernce();
    this.userPreference.moduleKey = 'GROUPACCESS_ASSET_REGISTER';


    let userPreferenceData = this.getUserPreferenceInfo();
    userPreferenceData.then((response) => {
      this.ngAfterContentInit();

      this.fetchList();
      this.adjustTableWidth();
      localStorage.setItem('previousRoute', this.router.url);
    })

  }

  ngAfterViewInit() {
    //this.focusAssetSearch.nativeElement.focus();

  }

  ngOnDestroy() {
    if (this.assetHistroryPopUp != null) {
      this.assetHistroryPopUp.close();
    }
  }

  handleLocation(location) {
    this.defaultLocId = location; //this operator is creating the problem
    //To get Active URL;
    var snapshot = this.route.snapshot;
    // To get Active Component
    if (snapshot.routeConfig.component.name === 'AssetListComponent') {
      this.fetchList();
    }

  }

  // createAsset(mode) {
  //   this.commonService.showSpinner();
  //   if(mode !== 'add'){      
  //     // localStorage.setItem('searchParameters', JSON.stringify(this.asset));
  //     this.router.navigate(['home/asset/assetCreate/', this.selectedAssetList[0].assetHdrId,mode, 'asset_info' ]);
  //   }else{
  //     this.router.navigate(['home/asset/assetCreate/', 0,mode, 'asset_info' ]);
  //   }
  //   this.commonService.hideSpinner();
  // }

  createAsset(mode) {
    this.commonService.showSpinner();
    if (mode !== 'add') {
      // localStorage.setItem('searchParameters', JSON.stringify(this.asset));

      if (mode === 'edit') {
        var obj = {
          'recordId': this.selectedAssetList[0].assetHdrId,
          'moduleName': 'GROUPACCESS_ASSET_REGISTER'
        }
        this.commonService.showSpinner();
        this.commonService.commonInsertService('validateRecordForEdit.sams', obj).subscribe(
          data => {
            if (data.success) {
              //this.commonService.openToastSuccessMessage(data.message);
              this.commonService.hideSpinner();
              this.router.navigate(['home/asset/assetCreateV1/', this.selectedAssetList[0].assetHdrId, mode, 'asset_info']);
            } else {
              this.commonService.openToastWarningMessage(data.message);
              this.commonService.hideSpinner();
            }
          }
        );
      } else if (mode === 'view') {
        this.router.navigate(['home/asset/assetCreateV1/', this.selectedAssetList[0].assetHdrId, mode, 'asset_info']);
      }
    } else {
      this.router.navigate(['home/asset/assetCreateV1/', 0, mode, 'asset_info']);
    }
    this.commonService.hideSpinner();
  }

  viewAsset(assetHdrId) {
    this.router.navigate(['/assetView/' + assetHdrId]);
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchList();
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  customSort(event) {
    this.asset.pageNumber = 0;
    this.asset.columnName = event.active;
    this.asset.direction = event.direction;
    this.fetchList();
  }

  searchAsset() {
    this.selectedAllAssest = false;
    this.selectedAssetList = [];
    this.pageSize = '100';
    this.pageIndex = '0';
    // localStorage.removeItem('searchParameters');
    this.fetchList();
    this.applyPreferredFilters();
  }

  functionalStatus = [
    { id: 1, name: 'CRITICAL' },
    { id: 2, name: 'NON CRITICAL' }
  ];

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
  //     this.asset.locationName = '';
  //     this.asset.locationId = 0;
  //     this.asset.locationType='';
  //     this.locationPageNumber = 1;
  //     this.locationCombo = [];
  //     this.enableCustomer=false;
  //   } else {
  //     this.asset.locationName = event.locDisplayField;
  //     this.asset.locationId = event.locationId;
  //     this.asset.locationType=event.locationType;
  //     if(event.locationType=='SERVICE PROVIDER'){
  //       this.enableCustomer=true;
  //     }
  //     this.searchAsset();
  //   }
  // }

  selectedLocationData(event) {
    const length = event.length;
    const index = event.length - 1;
    console.log(event)

    if (event === undefined || event.length <= 0) {
      this.asset.locationName = '';
      this.asset.locationId = 0;
      this.asset.locationType = '';
      this.locationPageNumber = 1;
      this.locationCombo = [];
      this.enableCustomer = false;
      this.assignToPersonPageNumber = 1;
      this.assignToPersonCombo = [];

      this.assigneeDepartmentPageNumber = 1;
      this.assigneeDepartmentCombo = [];

      this.asset.assetCode = '';
      // this.assetCodePageNumber = 1;
      // this.assetCodeCombo = [];

      this.asset.selectedLocationIds = [];
      this.previousSelectedLocations = [];

    } else {
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
          this.asset.selectedLocationIds.splice(removedIndex, 1);
        }
        // Update the previous selection list
        this.previousSelectedLocations = currentLocationNames;
      } else {
        this.asset.selectedLocationIds = event.map(location => location.locationId);
      }

      // Update the previous selection list
      this.previousSelectedLocations = event.map(location => location.locDisplayField);

      if (event.locationType == 'SERVICE PROVIDER') {
        this.enableCustomer = true;
      }

      this.searchAsset();
      this.assignToPersonPageNumber = 1;
      this.assignToPersonCombo = [];

      this.assigneeDepartmentPageNumber = 1;
      this.assigneeDepartmentCombo = [];

      this.asset.assetCode = '';
      // this.assetCodePageNumber = 1;
      // this.assetCodeCombo = [];

      // this.previousSelectedLocations = [...event];
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
  //     this.asset.assetCategoryId = 0;
  //     this.asset.assetCategoryName = '';
  //     this.assetCategoryPageNumber = 1;
  //     this.assetCategoryName = [];
  //   } else {
  //     this.asset.assetCategoryId = event.assetCategoryId;
  //     this.asset.assetCategoryName = event.assetCategoryName;
  //   }
  // }

  getCategoryComboValue(event) {
    if (event === undefined || event.length <= 0) {
      this.asset.assetCategoryId = 0;
      this.asset.assetCategoryName = '';
      this.assetCategoryPageNumber = 1;
      this.assetCategoryName = [];

      this.asset.selectedAssetCategoryIds = [];
      this.previousAssetCategoryNames = [];
    } else {
      this.asset.assetCategoryId = event.assetCategoryId;
      this.asset.assetCategoryName = event.assetCategoryName;


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
          this.asset.selectedAssetCategoryIds.splice(removedIndex, 1);
        }
        // Update the previous selection list
        this.previousAssetCategoryNames = currentAssetCategoryNames;
      } else {
        this.asset.selectedAssetCategoryIds = event.map(category => category.assetCategoryId);
      }

      // Update the previous selection list
      this.previousAssetCategoryNames = event.map(category => category.assetCategoryName);
    }
  }

  listOfSubCategory(searchValue) {
    this.scrollsyncAssetSubCategory = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetSubCategoryCombo.sams', searchValue.term, this.asset.assetCategoryId,
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
  //     this.asset.subCategoryId = 0;
  //     this.asset.subCategoryName = '';
  //     this.assetSubCategorPageNumber = 1;
  //     this.subCategoryName = [];
  //   } else {
  //     this.asset.subCategoryId = event.subCategoryId;
  //     this.asset.subCategoryName = event.subCategoryName;
  //   }

  //   this.asset.cusFieldList = [];

  // }
  getSubCategoryComboValue(event) {
    if (event === undefined || event.length <= 0) {
      this.asset.subCategoryId = 0;
      this.asset.subCategoryName = '';
      this.assetSubCategorPageNumber = 1;
      this.subCategoryName = [];

      this.asset.selectedSubCategoryIds = [];
      this.previousSubCategoryNames = [];
    } else {
      this.asset.subCategoryId = event.subCategoryId;
      this.asset.subCategoryName = event.subCategoryName;

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
          this.asset.selectedSubCategoryIds.splice(removedIndex, 1);
        }
        // Update the previous selection list
        this.previousSubCategoryNames = currentSubCategoryNames;
      } else {
        this.asset.selectedSubCategoryIds = event.map(subCategory => subCategory.subCategoryId);
      }

      // Update the previous selection list
      this.previousSubCategoryNames = event.map(subCategory => subCategory.subCategoryName);
    }

    this.asset.cusFieldList = [];

  }

  listOfAllAssetGroup(searchKey) {
    this.scrollsyncAssetGroup = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllAssetGroupCombo, searchKey.term, this.asset.subCategoryId, '',
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
  //     this.asset.assetGroupName = event.assetGroupName;
  //     this.asset.assetGroupId = event.assetGroupId;

  //   } else {
  //     this.asset.assetGroupName = "";
  //     this.asset.assetGroupId = 0;
  //     this.assetGroup = [];
  //     this.assetGroupPageNumber = 1;
  //   }
  // }
  getAssetGroupComboValue(event) {

    if (event === undefined || event.length <= 0) {
      this.asset.assetGroupName = "";
      this.asset.assetGroupId = 0;
      this.assetGroup = [];
      this.assetGroupPageNumber = 1;

      this.asset.selectedAssetGroupIds = [];
      this.previousAssetGroupNames = [];
    } else {
      this.asset.assetGroupName = event.assetGroupName;
      this.asset.assetGroupId = event.assetGroupId;

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
          this.asset.selectedAssetGroupIds.splice(removedIndex, 1);
        }
        // Update the previous selection list
        this.previousAssetGroupNames = currentAssetGroupNames;
      } else {
        this.asset.selectedAssetGroupIds = event.map(assetGroup => assetGroup.assetGroupId);
      }

      // Update the previous selection list
      this.previousAssetGroupNames = event.map(assetGroup => assetGroup.assetGroupName);

    }
  }


  listOfAllModel(searchKey) {
    this.scrollsyncModel = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults('listOfAllModelCombo.sams', searchKey.term, this.asset.manufacturerId > 0 ? this.asset.manufacturerId : 0,
      this.asset.assetGroupId > 0 ? this.asset.assetGroupId : '',
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
  //     this.asset.modelId = event.modelId;
  //     this.asset.modelName = event.modelName;
  //     this.asset.manufacturerId=event.manufacturerId;
  //     this.asset.manufacturerName=event.manufacturerName;
  //   } else {
  //     this.asset.modelId = 0;
  //     this.asset.modelName = '';
  //     this.asset.manufacturerId=0;
  //     this.asset.manufacturerName='';
  //     this.modelCombo = [];
  //     this.modelComboPageNumber = 1;
  //   }
  // }
  getModelComboValue(event) {

    if (event === undefined || event.length <= 0) {

      this.asset.modelId = 0;
      this.asset.modelName = '';
      this.asset.manufacturerId = 0;
      this.asset.manufacturerName = '';
      this.modelCombo = [];
      this.modelComboPageNumber = 1;

      this.asset.selectedModelIds = [];
      this.previousSelectedModels = [];

    } else {
      this.asset.modelId = event.modelId;
      this.asset.modelName = event.modelName;
      this.asset.manufacturerId = event.manufacturerId;
      this.asset.manufacturerName = event.manufacturerName;

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
          this.asset.selectedModelIds.splice(removedIndex, 1);
        }
        // Update the previous selection list
        this.previousSelectedModels = currentModelNames;
      } else {
        console.log("event : ", event)
        this.asset.selectedModelIds = event.map(model => model.modelId);
      }

      // Update the previous selection list
      this.previousSelectedModels = event.map(model => model.modelName);

    }


  }


  loadAssetStatusComboData(searchValue) {
    this.scrollsyncAssetStatus = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetStatusCombo.sams', searchValue.term, this.asset.statusTypeId, '',
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

  // selectedAssetStatusList(event) {
  //   if (event === undefined) {
  //     this.asset.assetStatusId = 0;
  //     this.asset.assetStatus = '';
  //     this.asssetStatusPageNumber = 1;
  //     this.assetStatusCombo = [];
  //   } else {
  //     this.asset.assetStatusId = event.assetStatusId;
  //     this.asset.assetStatus = event.assetStatusName;
  //     this.translateService.get([event.assetStatusName])
  //     .subscribe((val) => {
  //       const status = Object.values(val)
  //       this.asset.assetStatus = status[0].toString();
  //     });
  //   }
  // }

  selectedAssetStatusList(event) {
    if (event === undefined || event.length <= 0) {
      this.asset.assetStatusId = 0;
      this.asset.assetStatus = '';
      this.asssetStatusPageNumber = 1;
      this.assetStatusCombo = [];

      this.asset.selectedAssetStatusIds = [];
      this.previousAssetStatusNames = [];
    } else {
      this.asset.assetStatusId = event.assetStatusId;
      this.asset.assetStatus = event.assetStatusName;
      this.translateService.get([event.assetStatusName])
        .subscribe((val) => {
          const status = Object.values(val)
          this.asset.assetStatus = status[0].toString();
        });

      // Find removed item
      if (this.previousAssetStatusNames.length > event.length) {
        // Convert event array to a list of display names
        const currentAssetStatusNames = event.map(assetStatus => assetStatus.assetStatusName);
        // Find the removed item
        const removedItem = this.previousAssetStatusNames.find(
          prevItem => !currentAssetStatusNames.includes(prevItem)
        );

        if (removedItem) {
          const removedIndex = this.previousAssetStatusNames.indexOf(removedItem);
          this.asset.selectedAssetStatusIds.splice(removedIndex, 1);
        }
        // Update the previous selection list
        this.previousAssetStatusNames = currentAssetStatusNames;
      } else {
        this.asset.selectedAssetStatusIds = event.map(assetStatus => assetStatus.assetStatusId);
      }

      // Update the previous selection list
      this.previousAssetStatusNames = event.map(assetStatus => assetStatus.assetStatusName);
    }
  }

  fetchList() {
    this.asset.pageNumber = Number(this.pageIndex);
    this.asset.recordsPerPage = Number(this.pageSize);

    this.activatedRoute.params.subscribe(
      params => {

        if (params.routeId === "1") {
          this.displayedColumns = ['select', 'locationName', 'assetCode', 'assetCategoryName', 'modelName', 'departmentName', 'assetStatusId', 'ownershipType'];

          this.asset.purchaseDtDisp = params.year;

          this.dashboardRoute = false;
        }

        var subCategoryName = params.subCategoryId;
        if (subCategoryName != '' && subCategoryName != undefined) {
          this.asset.assetStatusId = params.statusId;
          this.asset.subCategoryName = subCategoryName;
          this.asset.ownershipType = params.ownershipType;
          this.asset.assetCategoryId = params.categoryId;
        }

        if (params.statusConditionId) {
          this.asset.assetConditionId = params.statusConditionId;
          if (params.statusId) {
            this.asset.assetStatusId = params.statusId;
          }
        }
        // console.log("params.statusConditionId", params.statusConditionId)
        // console.log("params.statusId", params.statusId)


      }
    );



    this.subLoader = true;
    this.dataSource = [];
    this.asset.screenType = 'Asset Register List';

    // if (this.commonService.getPreviousUrl().includes('/home/asset/assetCreate/')) {
    //   if(localStorage.getItem('searchParameters') != '' && localStorage.getItem('searchParameters') != null){
    //     this.asset = JSON.parse(localStorage.getItem('searchParameters'));
    //     this.pageIndex = String(this.asset.pageNumber);
    //     this.pageSize = String(this.asset.recordsPerPage);
    //   }    
    // }else{
    //   localStorage.removeItem('searchParameters');
    // }   

    this.commonService.commonListService('fetchListOfAllAsset.sams', this.asset).subscribe(
      data => {

        if (data.success) {
          this.subLoader = false;
          this.length = data.responseData.dataTotalRecCount;
          this.dataSource = data.responseData.dataList;
          localStorage.setItem('ASSET_REGISTER_SEARCH_PARAMETER', JSON.stringify(this.asset));
        } else {
          this.subLoader = false;
        }
      }, error => {
        this.subLoader = false;
      }
    );
  }

  qrCodeAsset(element) {
    if (element.assetHdrId > 0) {
      this.commonService.commonGetService('generateAssetQRPDF.sams', element.assetHdrId).subscribe(
        data => {
          this.downloadDocument(data.responseData, 'image/png');
        }, error => {
        }
      );
    }

  }

  downloadDocument(filePath: string, contentType) {
    var fileName = filePath.split('.')[0];
    this.commonService.downloadFileFromServer(filePath, contentType).subscribe(
      data => {
        let file = filePath.split('.');
        this.commonService.showDownloadPopUp(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
        this.commonService.openToastSuccessMessage("PDF Downloaded Successfully.");
      }
    );
  }

  assetHistroryPopUp;
  addHistory() {

    let assetData = {
      assetHdrId: this.selectedAssetList[0].assetHdrId,
      modelName: this.selectedAssetList[0].modelName,
      assetCode: this.selectedAssetList[0].assetCode,
      assetCategoryName: this.selectedAssetList[0].assetCategoryName,
      subCategoryName: this.selectedAssetList[0].subCategoryName,
      serialNo: this.selectedAssetList[0].serialNo,
      assetGroupName: this.selectedAssetList[0].assetGroupName,
      createdBy: this.selectedAssetList[0].createdBy,
      createdDtDisp: this.selectedAssetList[0].createdDtDisp
    }


    //open model add popup
    this.assetHistroryPopUp = this.dialog.open(AssetHistoryComponent, {
      height: '630px',
      width: '90%',
      data: { assetData }
    });
    this.assetHistroryPopUp.disableClose = true;
    this.assetHistroryPopUp.afterClosed().subscribe(
      data => {
        this.ngOnInit();
      });
  }

  clear() {
    localStorage.removeItem('ASSET_REGISTER_SEARCH_PARAMETER');
    this.asset = new AssetModel;
    this.assetPrintList = [];
    this.selectedAssetList = [];

    this.asset.direction = 'desc';
    this.asset.columnName = 'updatedDt';
    this.applyPreferredFilters();

    this.ngOnInit();
  }

  generatePDF() {
    this.commonService.commonGetService('generateAssetInfoPdf.sams', this.selectedAssetList[0].assetHdrId).subscribe(
      data => {
        if (data.success) {
          this.downloadDocument(data.responseData, 'application/pdf');
        } else {
          this.commonService.openToastErrorMessage("Error occurred while downloading file.")
        }
      }, error => {
      }
    );
  }

  generateReportForAsset() {
    this.asset.recordsPerPage = 0;
    this.commonService.commonListService('generateAssetReport.sams', this.asset).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      }, error => {
      }
    );
  }

  listOfManufacturer(searchValue) {
    this.scrollsyncmanufactuer = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.MANUFACTURER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchValue.term, '', '', this.limitCount, this.manufacturerPageNumber, '', partnerRoles).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.manufacturerPageNumber, this.manufactuer, data.responseData.comboList)
        this.manufacturerPageNumber = this.getData.pageNumber;
        this.manufactuer = this.getData.dataList;
        this.scrollsyncmanufactuer = false;
      }
    );
  }

  // getManfacturerComboValue(event) {
  //   if (event === undefined) {
  //     this.asset.manufacturerId=0;
  //     this.manufacturerPageNumber = 1;
  //     this.manufactuer = [];
  //   } else {
  //     this.asset.manufacturerId=event.businessPartnerId;
  //   }
  // }
  getManfacturerComboValue(event) {
    if (event === undefined || event.length <= 0) {
      this.asset.manufacturerId = 0;
      this.manufacturerPageNumber = 1;
      this.manufactuer = [];

      this.asset.selectedManufacturerIds = [];
      this.previousSelectedManufacturers = [];

    } else {
      this.asset.manufacturerId = event.businessPartnerId;

      // Find removed item
      if (this.previousSelectedManufacturers.length > event.length) {
        // Convert event array to a list of display names
        const currentManufacturerNames = event.map(businessPartner => businessPartner.businessPartnerName);
        // Find the removed item
        const removedItem = this.previousSelectedManufacturers.find(
          prevItem => !currentManufacturerNames.includes(prevItem)
        );

        if (removedItem) {
          const removedIndex = this.previousSelectedManufacturers.indexOf(removedItem);
          this.asset.selectedManufacturerIds.splice(removedIndex, 1);
        }
        // Update the previous selection list
        this.previousSelectedManufacturers = currentManufacturerNames;
      } else {
        this.asset.selectedManufacturerIds = event.map(businessPartner => businessPartner.businessPartnerId);
      }

      // Update the previous selection list
      this.previousSelectedManufacturers = event.map(businessPartner => businessPartner.businessPartnerName);
    }
  }

  listOfSupplier(searchTerms) {
    this.scrollSupplierNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.SUPPLIER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchTerms.term, '', '', this.limitCount, this.supplierPageNumber, '', partnerRoles).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.supplierPageNumber, this.supplierList, data.responseData.comboList)
        this.supplierPageNumber = this.getData.pageNumber;
        this.supplierList = this.getData.dataList;
        this.scrollSupplierNamesync = false;
      }
    );
  }

  // fetchIdOfSupplier(event) {
  //   if (event === undefined) {
  //     this.asset.businessPartnerId=0;
  //     this.asset.businessPartnerName='';
  //     this.supplierList = [];
  //     this.supplierPageNumber = 1;
  //   } else {
  //     this.asset.businessPartnerId=event.businessPartnerId;
  //     this.asset.businessPartnerName=event.businessPartnerName;
  //     this.supplierList = [];
  //     this.supplierPageNumber = 1;
  //   }
  // }

  fetchIdOfSupplier(event) {
    if (event === undefined || event.length <= 0) {
      this.asset.businessPartnerId = 0;
      this.asset.businessPartnerName = '';
      this.supplierList = [];
      this.supplierPageNumber = 1;

      this.asset.selectedBusinessPartnerIds = [];
      this.previousSelectedBusinessPartners = [];
    } else {
      this.asset.businessPartnerId = event.businessPartnerId;
      this.asset.businessPartnerName = event.businessPartnerName;
      this.supplierList = [];
      this.supplierPageNumber = 1;


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
          this.asset.selectedBusinessPartnerIds.splice(removedIndex, 1);
        }
        // Update the previous selection list
        this.previousSelectedBusinessPartners = currentBusinessPartnerNames;
      } else {
        this.asset.selectedBusinessPartnerIds = event.map(businessPartner => businessPartner.businessPartnerId);
      }

      // Update the previous selection list
      this.previousSelectedBusinessPartners = event.map(businessPartner => businessPartner.businessPartnerName);
    }
  }

  installationDateValidation(event) {

    if (event.value) {
      this.asset.installationDtDisp = moment(event.value).format(this.assetOptimaConstants.ISODate);
    }
    else {
      this.asset.installationDtDisp = "";
    }

    return false;
  }

  handoverDateValidation(event) {
    if (event.value) {
      this.asset.handoverDtDisp = moment(event.value).format(this.assetOptimaConstants.ISODate);
    }
    else {
      this.asset.handoverDtDisp = "";
    }
    return false;
  }

  loadPriorityComboData(searchValue) {
    this.scrollsyncPriority = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllPriorityForCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.priorityPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.priorityPageNumber, this.priorityCombo, data.responseData.comboList)
          this.priorityPageNumber = this.getData.pageNumber;
          this.priorityCombo = this.getData.dataList;
          this.scrollsyncPriority = false;
        }
      );
  }
  selectedPriorityData(event) {
    if (event === undefined) {
      this.priorityPageNumber = 1;
      this.priorityCombo = [];
    }
  }
  riskNatureCombo = [
    { id: 1, name: 'HIGH' },
    { id: 2, name: 'LOW' }
  ];

  ownership = [
    { id: 1, name: 'OWNED' },
    // { id: 2, name: 'OWNED BY CUSTOMER' },
    { id: 3, name: 'RENTAL' },
    { id: 4, name: 'LEASE' },
    { id: 5, name: 'LOAN' }
  ];

  loadAssigneeDepartmentComboData(searchValue) {

    this.scrollsyncAssigneeDepartment = true;

    const locIds = this.asset.selectedLocationIds;

    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfDepartmentInBranchCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.assigneeDepartmentPageNumber, '', '', '', '', locIds).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assigneeDepartmentPageNumber, this.assigneeDepartmentCombo, data.responseData.comboList)
          this.assigneeDepartmentPageNumber = this.getData.pageNumber;
          this.assigneeDepartmentCombo = this.getData.dataList;
          this.scrollsyncAssigneeDepartment = false;
        }
      );
  }

  // selectedDepartmentData(event) {
  //   if (event === undefined) {
  //     this.asset.departmentId=0;
  //     this.assigneeDepartmentPageNumber = 1;
  //     this.assigneeDepartmentCombo = [];
  //   } else {
  //     this.asset.departmentId=event.departmentId;
  //     this.assigneeDepartmentPageNumber = 1;
  //     this.assigneeDepartmentCombo = [];
  //   }
  // }

  selectedDepartmentData(event) {
    if (event === undefined || event.length <= 0) {
      this.asset.departmentId = 0;
      this.assigneeDepartmentPageNumber = 1;
      this.assigneeDepartmentCombo = [];

      this.asset.selectedDepartmentIds = [];
      this.previousDepartmentNames = [];
    } else {
      this.asset.departmentId = event.departmentId;
      this.assigneeDepartmentPageNumber = 1;
      this.assigneeDepartmentCombo = [];

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
          this.asset.selectedDepartmentIds.splice(removedIndex, 1);
        }
        // Update the previous selection list
        this.previousDepartmentNames = currentDepartmentNames;
      } else {
        this.asset.selectedDepartmentIds = event.map(department => department.departmentId);
      }

      // Update the previous selection list
      this.previousDepartmentNames = event.map(department => department.departmentName);
    }
  }

  listOfCustomer(searchValue) {
    this.scrollCustomersync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllCustomerCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.customerListPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.customerListPageNumber, this.customerList, data.responseData.comboList)
          this.customerListPageNumber = this.getData.pageNumber;
          this.customerList = this.getData.dataList;
          this.scrollCustomersync = false;
        }
      );
  }

  setCustomerData(event) {
    if (event === undefined) {
      this.asset.customerId = 0;
      this.asset.customerName = '';
      this.customerListPageNumber = 1;
      this.customerList = [];
    } else {
      this.asset.customerId = event.customerId;
      this.asset.customerName = event.customerName;
    }
  }

  loadCertificateComboData(searchValue) {
    this.scrollsyncCertificateCombo = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllCertificateCombo.sams', searchValue.term, '', '',
      this.limitCount, this.certificatePageNumber, '', '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.certificatePageNumber, this.certificateNameList, data.responseData.comboList)
          this.certificatePageNumber = this.getData.pageNumber;
          this.certificateNameList = this.getData.dataList;
          this.scrollsyncCertificateCombo = false;
        }
      );
  }

  selectedCertificateAuthorityData(event) {
    if (event != undefined) {
      this.asset.certificateId = event.certificateId;
      this.asset.certificateName = event.certificateName;
    } else {
      this.asset.certificateId = 0;
      this.asset.certificateName = '';
      this.certificatePageNumber = 1;
      this.certificateNameList = [];
    }
  }

  setHandoverStatus(event) {
    if (event !== undefined) {
      if (event.id === 1) {
        this.asset.handoverCompletedStatus = true;
      } else {
        this.asset.handoverCompletedStatus = false;
      }
      this.asset.handoverStatusDisplay = event.status
    } else {
      this.asset.handoverStatusDisplay = '';
    }
  }

  compareValue(element: any): boolean {
    return this.selectedAssetList.findIndex(data => data.assetHdrId === element.assetHdrId) !== -1;
  }

  selectedAssetList = [];
  selectAssets(element) {

    const assetId = this.selectedAssetList.findIndex(data => data.assetHdrId === element.assetHdrId);

    this.enableActionBtn = false;
    if (assetId === -1) {
      this.selectedAssetList.push(element);
    } else {
      this.selectedAssetList.splice(assetId, 1);
    }

    if (this.selectedAssetList.length === 1) {
      this.enableActionBtn = false;
    }
    else {
      this.enableActionBtn = true;
    }
  }

  selectAllAssets(event) {
    this.selectedAllAssest = event.checked;
    this.enableActionBtn = false;

    if (event.checked) {
      this.selectedAssetList = this.dataSource;
    }
    else {
      this.selectedAssetList = [];
    }

    if (this.selectedAssetList.length === 1) {
      this.enableActionBtn = false;
    }
    else {
      this.enableActionBtn = true;
    }
  }

  bulkAssetPrint() {
    if (this.selectedAssetList.length > 0) {
      this.generateAssetLabelPrint(this.selectedAssetList);
    } else {
      this.commonService.openToastWarningMessage("Kindly Select At least One Asset.");
    }
  }

  assetPrintList = [];
  singleAssetPrint() {
    this.assetPrintList = [];
    this.assetPrintList.push(this.selectedAssetList[0]);
    this.generateAssetLabelPrint(this.assetPrintList);
  }

  generateAssetLabelPrint(assetPrintList?: any) {
    let dialogRef = this.dialog.open(AssetLabelPrintV1Component, {
      data: {
        'assetList': assetPrintList,
      },
      width: '400px', height: 'auto'
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        this.ngOnInit();
        this.assetPrintList = [];
        this.selectedAssetList = [];
      });
  }


  loadAssetStatusTypeComboData(searchValue) {
    this.scrollsyncAssetStatusType = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllStatusTypeCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.assetStatusTypePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetStatusTypePageNumber, this.assetStatusTypeCombo, data.responseData.comboList)
          this.assetStatusTypePageNumber = this.getData.pageNumber;
          this.assetStatusTypeCombo = this.getData.dataList;
          this.scrollsyncAssetStatusType = false;
        }
      );
  }


  selectedAssetStatusType(event) {
    if (event === undefined) {
      this.asset.statusType = '';
      this.asset.statusTypeId = 0;
      this.assetStatusTypePageNumber = 1;
      this.assetStatusTypeCombo = [];
    } else {
      this.asset.statusType = event.statusType;
      this.asset.statusTypeId = event.statusTypeId;
      this.asset.assetStatus = '';
      this.asset.assetStatusId = 0;
      this.assetStatusCombo = [];
      this.asssetStatusPageNumber = 1;

      this.translateService.get([event.statusType])
        .subscribe((val) => {
          const status = Object.values(val)
          this.asset.statusType = status[0].toString();
        });
    }
  }

  loadAssetConditionComboData(searchValue) {
    this.scrollsyncAssetCondition = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetConditionCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.assetConditionPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetConditionPageNumber, this.assetConditionCombo, data.responseData.comboList)
          this.assetConditionPageNumber = this.getData.pageNumber;
          this.assetConditionCombo = this.getData.dataList;
          this.scrollsyncAssetCondition = false;
        }
      );
  }


  selectedAssetCondition(event) {
    if (event === undefined) {
      this.asset.assetCondition = '';
      this.asset.assetConditionId = 0;
      this.assetConditionPageNumber = 1;
      this.assetConditionCombo = [];
    } else {
      this.asset.assetCondition = event.assetCondition;
      this.asset.assetConditionId = event.assetConditionId;

      this.translateService.get([event.assetCondition])
        .subscribe((val) => {
          const status = Object.values(val)
          this.asset.assetCondition = status[0].toString();
        });
    }
  }

  checkApprovalValid() {
    if (this.selectedAssetList.length > 0) {
      return !(this.selectedAssetList.findIndex(data => (data.approvalStatusAsset === "APPROVED"
        || data.approvalStatusAsset === "REJECTED" || data.approvalStatusAsset === "-" || data.approvalId == 0)) === -1);
    }
    else
      return true;
  }

  disableEdit() {
    if (this.selectedAssetList.length > 0) {
      return !(this.selectedAssetList.findIndex(data => data.assetStatusId == allassetStatus.MISSING) === -1);
    }
    else
      return true;
  }

  assetWorkflowApproval(status) {
    let result;
    if (status) {
      result = this.commonService.commonWorkflowService(allWorkflowStatus[allWorkflowStatus.ASSET_CREATE], this.selectedAssetList, " Selected Asset ");
    }
    else {
      result = this.commonService.rejectApprove(allWorkflowStatus[allWorkflowStatus.ASSET_CREATE], this.selectedAssetList, " Selected Asset ");
    }

    result.then(data => {
      if (data) {
        this.dataSource = [];
        this.ngOnInit();
      }
    })
  }

  customFieldSearch() {

    let dialogRef = this.dialog.open(CustomFieldSearchComponent, {
      data: {
        'subCategoryName': this.asset.subCategoryName,
        'subCategoryId': this.asset.subCategoryId,
        'customFields': this.asset.cusFieldList,
        'selectedSubCategoryIds': this.asset.selectedSubCategoryIds,
      },
      width: '800px', height: '600px'
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status == true) {
          this.asset.cusFieldList = data.response;
        }
      });
  }

  checkDeleteValid() {
    if (this.selectedAssetList.length > 0) {
      return !(this.selectedAssetList.findIndex(data => (data.approvalStatusAsset === "APPROVED"
        || data.approvalStatusAsset === "REJECTED" || data.approvalStatusAsset === "-")) === -1);
    }
    else
      return true;
  }

  deleteAsset() {
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Asset'
      }
    });
    dialogRef.disableClose = true;
    const assetHdrIds: number[] = this.selectedAssetList.map(asset => asset.assetHdrId)
    let assetHdrId = { assetHdrIds: assetHdrIds }
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          this.commonService.commonInsertService(this.assetOptimaServices.deleteApprovalPendingAssetRecord, assetHdrId).subscribe(
            data => {
              if (data.success) {
                this.commonService.openToastSuccessMessage(data.message);
                this.selectedAssetList = [];
                this.enableActionBtn = true;
                this.fetchList();
              } else {
                this.commonService.openToastErrorMessage(data.message);
              }
            }
          );
        }
      });
  }

  loadAssignToComboData(searchValue) {
    this.scrollsyncAssignToPerson = true;
    const departmentId = this.asset.departmentId;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllEmployeeForOrgCombo.sams', searchValue.term, departmentId > 0 ? departmentId : '', '', this.recordsPerPageForCombo, this.assignToPersonPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assignToPersonPageNumber, this.assignToPersonCombo, data.responseData.comboList)
        this.assignToPersonPageNumber = this.getData.pageNumber;
        this.assignToPersonCombo = this.getData.dataList;
        this.scrollsyncAssignToPerson = false;
      }
    );
  }

  // selectedAssignToPerson(event) {
  //   if (event === undefined) {
  //     this.asset.assignToPersonId = 0;
  //   } else {
  //     this.asset.assignToPersonId = event.employeeId;
  //   }
  //   this.assignToPersonPageNumber = 1;
  //   this.assignToPersonCombo = [];   
  // }

  selectedAssignToPerson(event) {
    if (event === undefined || event.length <= 0) {
      this.asset.assignToPersonId = 0;

      this.asset.selectedAssignedToIds = [];
      this.previousAssignedToNames = [];
    } else {
      this.asset.assignToPersonId = event.employeeId;
    }
    this.assignToPersonPageNumber = 1;
    this.assignToPersonCombo = [];

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
        this.asset.selectedAssignedToIds.splice(removedIndex, 1);
      }
      // Update the previous selection list
      this.previousAssignedToNames = currentAssignedToNames;
    } else {
      this.asset.selectedAssignedToIds = event.map(assignedTO => assignedTO.employeeId);
    }

    // Update the previous selection list
    this.previousAssignedToNames = event.map(assignedTO => assignedTO.displayName);
  }

  loadPersonInchargeComboData(searchValue) {
    this.scrollsyncPersonInCharge = true;
    const departmentId = this.asset.departmentId;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllEmployeeForOrgCombo.sams', searchValue.term, departmentId > 0 ? departmentId : '', '', this.recordsPerPageForCombo, this.personInchargePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.personInchargePageNumber, this.personInchargeCombo, data.responseData.comboList)
        this.personInchargePageNumber = this.getData.pageNumber;
        this.personInchargeCombo = this.getData.dataList;
        this.scrollsyncPersonInCharge = false;
      }
    );
  }

  selectedPersonIncharge(event) {
    if (event === undefined) {
      this.asset.personInChargeId = 0;
    } else {
      this.asset.personInChargeId = event.employeeId;
    }
    this.personInchargePageNumber = 1;
    this.personInchargeCombo = [];
  }

  openChangeAssetCodeReqWFApproval(element) {
    let dialogRef = this.dialog.open(CommonWorkflowApprovalDialogComponent, {
      height: '350px',
      width: '85%',
      data: {
        'assetCodeChangeReqInfo': element
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        setTimeout(() => {
          if (data === 'close') {

          } else if (data === 'approveOrReject') {
            this.ngOnInit();
          }
        }, 1000);
      });
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

    this.adjustTableWidth();
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
            this.asset = JSON.parse(this.userPreference.customFilters);

            if (this.asset.selectedLocationNames != null && this.asset.selectedLocationNames.length > 0) {
              this.previousSelectedLocations = this.asset.selectedLocationNames;
            }
            if (this.asset.selectedModelNames != null && this.asset.selectedModelNames.length > 0) {
              this.previousSelectedModels = this.asset.selectedModelNames;
            }
            if (this.asset.selectedBusinessPartnerNames != null && this.asset.selectedBusinessPartnerNames.length > 0) {
              this.previousSelectedBusinessPartners = this.asset.selectedBusinessPartnerNames;
            }
            if (this.asset.selectedAssetStatusNames != null && this.asset.selectedAssetStatusNames.length > 0) {
              this.previousAssetStatusNames = this.asset.selectedAssetStatusNames;
            }
            if (this.asset.selectedAssetCategoryNames != null && this.asset.selectedAssetCategoryNames.length > 0) {
              this.previousAssetCategoryNames = this.asset.selectedAssetCategoryNames;
            }
            if (this.asset.selectedSubCategoryNames != null && this.asset.selectedSubCategoryNames.length > 0) {
              this.previousSubCategoryNames = this.asset.selectedSubCategoryNames;
            }
            if (this.asset.selectedAssetGroupNames != null && this.asset.selectedAssetGroupNames.length > 0) {
              this.previousAssetGroupNames = this.asset.selectedAssetGroupNames;
            }
            if (this.asset.selectedDepartmentNames != null && this.asset.selectedDepartmentNames.length > 0) {
              this.previousDepartmentNames = this.asset.selectedDepartmentNames;
            }
            if (this.asset.selectedAssignedToNames != null && this.asset.selectedAssignedToNames.length > 0) {
              this.previousAssignedToNames = this.asset.selectedAssignedToNames;
            }
            if (this.asset.selectedManufacturerNames != null && this.asset.selectedManufacturerNames.length > 0) {
              this.previousSelectedManufacturers = this.asset.selectedManufacturerNames;
            }
            // for technician type validation
            if (this.asset.technicianType) {
              this.technicianValidate = false;
              this.asset.assignToPersonId = 0;
              this.asset.assignTo = '';
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
    this.userPreference.customFilters = JSON.stringify(this.asset);
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

  // bulkAssetReassign(){
  //   let assetIds = [];
  //   if(this.asset.locationId == 0){
  //     this.commonService.openToastWarningMessage("Please kindly filter the location to proceed");
  //   } else if(this.selectedAssetList.length == 0){
  //     this.commonService.openToastWarningMessage("Please select at least one asset to proceed");
  //   } else if(this.asset.locationId > 0){
  //     for(let i=0; i<this.selectedAssetList.length; i++){
  //       assetIds.push(this.selectedAssetList[i].assetHdrId);
  //     }
  //     let dialogRef = this.dialog.open(BulkAssetReassignComponent, {
  //       height: '500px',
  //       width: '1100px',
  //       data: {
  //         'locId': this.asset.locationId,
  //         'assetIds': assetIds
  //       }
  //     });
  //     dialogRef.disableClose = true;
  //     dialogRef.afterClosed().subscribe(
  //       data => {
  //       });
  //   }

  // }

  bulkAssetReassign() {
    let assetIds = [];
    if ((this.asset.selectedLocationIds == undefined) || (this.asset.selectedLocationIds.length !== 1)) {
      this.commonService.openToastWarningMessage("Kindly select one branch to proceed with 'Asset Reassign'");
    } else if (this.selectedAssetList.length == 0) {
      this.commonService.openToastWarningMessage("Please select at least one asset to proceed");
    } else if (this.asset.selectedLocationIds != undefined && this.asset.selectedLocationIds.length === 1) {
      for (let i = 0; i < this.selectedAssetList.length; i++) {
        assetIds.push(this.selectedAssetList[i].assetHdrId);
      }
      let dialogRef = this.dialog.open(BulkAssetReassignComponent, {
        height: '500px',
        width: '1100px',
        data: {
          'locId': this.asset.selectedLocationIds[0],
          'assetIds': assetIds
        }
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(
        data => {
        });
    }

  }

  changeTechnicianType(event) {
    if (event === undefined) {
      this.asset.technicianType = '';
      this.technicianValidate = true;
      this.asset.assignToPersonId = 0;
      this.asset.assignTo = '';
    } else {
      this.asset.technicianType = event.name;
      this.technicianValidate = false;
      this.asset.assignToPersonId = 0;
      this.asset.assignTo = '';
    }
  }

  viewAssetCreateScreen(id?: number, mode?: string) {
    this.router.navigate(['home/asset/assetCreate/' + id + '/' + mode + '/asset_code_change_req']);
  }

  // for dynamica table alignment
  adjustTableWidth() {

    if (this.displayedColumns.length > 12) {
      document.getElementById("assetTable").style.minWidth = "150%";
    } else {
      document.getElementById("assetTable").style.minWidth = "100%";
    }

  }


  // Expansion Panel icon
  togglePanel(panelName, state): void {

    if (panelName == 'Asset Info') {
      state == 'opened' ? this.isAssetInfoPanelExpanded = true : this.isAssetInfoPanelExpanded = false;
    }
  }


  openAssetReport() {
    this.asset.recordsPerPage = 0;
    let dialogRef = this.dialog.open(AssetReportComponent, {
      height: 'auto',
      width: '35%',
      data: {
        'assetHdr': this.asset
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
      });
  }



  // generateReportForAsset() {
  //   this.asset.recordsPerPage = 0;
  //   this.commonService.commonListService('generateAssetReport.sams', this.asset).subscribe(
  //     (data) => {
  //       this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
  //     }, error => {
  //     }
  //   );
  // }

  loadAssetCodeComboData(searchValue) {
    this.scrollsyncAssetCode = true;
    const locIds = this.asset.selectedLocationIds;
    const departmentIds = this.asset.selectedDepartmentIds;

    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetCodeCombo.sams', searchValue.term, '',
      '', this.recordsPerPageForCombo, this.assetCodePageNumber, '', '', '', '', locIds, departmentIds).subscribe(
        (data) => {
          if (data.success) {
            this.getData = new getData();
            this.getData = this.commonService.fetchDataList(searchValue, this.assetCodePageNumber, this.assetCodeCombo, data.responseData.comboList)
            this.assetCodePageNumber = this.getData.pageNumber;
            this.assetCodeCombo = this.getData.dataList;
          }

          this.scrollsyncAssetCode = false;
        }
      );
  }

  selectedAssetCodeData(event, check: boolean) {

    if (event === undefined || event.length <= 0) {
      this.asset.assetCode = '';
      this.assetCodePageNumber = 1;
      this.assetCodeCombo = [];

    } else {
      this.asset.assetCode = event.assetCode;
    }
  }

 checkRequestApprovalValid(): boolean {

    const userName = this.userSessionService.getUserName();
    return this.selectedAssetList.length === 0 ||
      this.selectedAssetList.some(asset =>
        asset.approvalId || asset.approvalStatusAsset === 'APPROVED' 
      );
  }

  requestForApproval() {

    const dialogRef = this.dialog.open(ConfirmConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        confirmHeading: 'Confirmation',
        confirmMsg: `Are you sure to create workflow approval?`
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(data => {
      if (data.status === true) {


        let assetHdrIds = [];
        let isRejected = false;

        for (let i = 0; i < this.selectedAssetList.length; i++) {
          const asset = this.selectedAssetList[i];
          assetHdrIds.push(asset.assetHdrId);
        }

        var obj = {
          'selectedHdrIds': assetHdrIds,
        }
        this.commonService.showSpinner();
        this.commonService.commonInsertService('createWorkflowForAsset.sams', obj).subscribe(
          data => {
            if (data.success) {
              this.commonService.openToastSuccessMessage(data.message);
              this.commonService.hideSpinner();
              this.ngOnInit();
            } else {
              this.commonService.openToastErrorMessage(data.message);
              this.commonService.hideSpinner();
            }
          }
        );


      } else {

      }
    });

  }

 navigateToSourceScreen(id?: number, sourceModule?: string, mode?: string) {
    if(sourceModule == 'GATE PASS') {
      this.router.navigate(['home/asset/gatePassCreate/' + id + '/' + mode]);
    }
    if(sourceModule == 'INTERNAL LOAN') {
      this.router.navigate(['home/asset/internalLoanCreate/'+id+ '/' +mode]);
    }
    if(sourceModule == 'EXTERNAL LOAN') {
      this.router.navigate(['home/asset/loanReturnRequesCreate/'+id+ '/' +mode]);
    }
    if(sourceModule == 'ASSET RELOCATE') {
      this.router.navigate(['home/asset/assetRelocationList']);
    }
  }


  assetWorkflowReject() {

    let selectedAssetListLength = 0;
    let status = 'REJECTED';

    this.selectedAssetList = this.selectedAssetList.filter(function (element) {
      return element.approvalId !== 0 && element.poReqStatus != 'APPROVED';
    });

    selectedAssetListLength = this.selectedAssetList.length;

    let selectdList = this.selectedAssetList;
    const dialogRef = this.dialog.open(RejectConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        confirmHeading: 'Confirmation',
        confirmMsg: 'Are you sure to Reject selected Asset ?',
        note: 'Note : Only Asset under your queue will be Rejected',
        selectedElementListLength: selectedAssetListLength
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status === true) {
          let rejectReason = data.reason

          let approvalPromise = new Promise((resolve) => {
            let assetIdList = { selectedAssetList: [], status: status, selectedApprovalList: [], rejectReason: rejectReason };
            for (let i = 0; i <= selectdList.length - 1; i++) {
              assetIdList.selectedAssetList.push(selectdList[i].assetHdrId);
              assetIdList.selectedApprovalList.push(selectdList[i].approvalId);
            }
             this.commonService.showSpinner();
            this.commonService.commonInsertService('approveRejectAsset.sams', assetIdList).subscribe(
              data => {
                if (data.success) {
                  this.commonService.openToastSuccessMessage(data.message);
                  this.commonService.hideSpinner();

                  this.ngOnInit();
                } else {
                  this.commonService.openToastErrorMessage(data.message);
                  this.commonService.hideSpinner();

                }
                resolve(true)
              }
            );

          })

          return approvalPromise;

        } else {

        }
      });
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

  generateDisposalPDF() {
    // let assetHdrId;
    // let dialogRef = this.dialog.open(PdfConfirmationComponent, {
    //   height: '230px',
    //   width: '400px',
    //   data: {
    //     'confirmHeading': 'Asset History Report Confirmation',
    //     'confirmMsg': 'Select report type to download',
    //     'radioButtonName1': 'Asset History Summary PDF Report',
    //     'radioButtonName2': 'Asset History Detail PDF Report'
    //   }
    // });
    // dialogRef.disableClose = true;
    // assetHdrId = this.selectedAssetList[0].assetHdrId;
    // dialogRef.afterClosed().subscribe(
    //   data => {
    //     if (data.reportType === 'radioButton1') {
    //       this.downloadAssetPdfReport(assetHdrId, 'summary');
    //     } else if (data.reportType === 'radioButton2') {
    //       this.downloadAssetPdfReport(assetHdrId, 'detail');
    //     }
    //   });

    let assetHdrId;
    assetHdrId = this.selectedAssetList[0].assetHdrId;
    this.downloadAssetPdfReport(assetHdrId, 'detail');

  }

  downloadDocumentAssetPDF(filePath: string, contentType) {
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
          this.downloadDocumentAssetPDF(data.responseData, 'application/pdf');
          this.commonService.openToastSuccessMessage("Report is Generated Successfully");
        } else {
        }
      }, error => {
        this.commonService.openToastErrorMessage("Failed to generate report.");
      }
    );
  }


  listOfProcessStatus(searchValue) {
    this.scrollSyncProcessStatus = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    let workflowProcessId = allWorkflowStatus.ASSET_CREATE;
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
      this.asset.processStatus = '';
      this.asset.workflowProcessStatusId = 0;
      this.processStatusPageNumber1 = 1;
      this.processStatusCombo1 = [];
    } else {
      this.asset.processStatus = event.processName;
      this.asset.workflowProcessStatusId = event.workflowProcessId;
    }
  }

  onThresholdChange(event: any) {
  if (event.checked) {
    this.asset.searchFor = 'Exceeding Maintenance Threshold';
  } else {
    this.asset.searchFor = '';
  }
}

  onLoanedOutInternalChange(event: any) {
  if (event.checked) {
    this.asset.searchFor = 'Loaned-out Internal';
  } else {
    this.asset.searchFor = '';
  }
}

  onLoanedOutExternalChange(event: any) {
  if (event.checked) {
    this.asset.searchFor = 'Loaned-out External';
  } else {
    this.asset.searchFor = '';
  }
}

 onUnCoveredAssetsChange(event: any) {
  if (event.checked) {
    this.asset.searchFor = 'Un Covered Assets';
  } else {
    this.asset.searchFor = '';
  }
}

ngAfterContentInit(){

    this.asset = new AssetModel;
    this.assetPrintList = [];
    this.selectedAssetList = [];

    this.asset.direction = 'desc';
    this.asset.columnName = 'updatedDt';

    // From dashboard
     this.activatedRoute.queryParams.subscribe(query => {
      
      if(query?.functionalStatus || query?.locationId){
        this.asset = new AssetModel;
       }

       if (query?.functionalStatus) {
        //  this.asset.selectedFunctionalStatus.push(query.functionalStatus);
          this.asset.selectedFunctionalStatus = [];
          this.asset.selectedFunctionalStatus = [query.functionalStatus];

       }
       if(query?.locationId){
        this.asset.selectedLocationIds = []; 
        this.asset.selectedLocationIds.push(Number(query.locationId));
        this.asset.selectedLocationNames = [query.locationName];
       }
        if(query?.searchFor){
         this.asset.searchFor = query.searchFor;
         if (this.asset.searchFor === 'Exceeding Maintenance Threshold') {
           this.asset.maintenanceThresholdExceeded = true;
         } else {
           this.asset.maintenanceThresholdExceeded = false;
         }

         if(this.asset.searchFor === 'Loaned-out External'){
            this.asset.loanedOutExternal = true;
         } else{
          this.asset.loanedOutExternal = false;
         }

         if(this.asset.searchFor === 'Loaned-out Internal'){
            this.asset.loanedOutInternal = true;
         } else{
          this.asset.loanedOutInternal = false;
         }

         if(this.asset.searchFor == 'Uncovered Assets'){
            this.asset.unCoveredAssets = true;
         }else{
          this.asset.unCoveredAssets = false;
         }

       }

       if(query?.categoryName){
        this.asset.selectedAssetCategoryIds = [];
        this.asset.selectedAssetCategoryNames = [];
        this.asset.selectedAssetCategoryIds.push(Number(query.categoryId));
        this.asset.selectedAssetCategoryNames = [query.categoryName];
       }

       if(query?.ownershipType){
        this.asset.selectedOwnershipTypes = [];
        this.asset.selectedOwnershipTypes = [query?.ownershipType];

        this.asset.selectedAssetStatusIds = [];
        this.asset.selectedAssetStatusIds.push(1,2,5);

        this.asset.selectedAssetStatusNames = [];
        this.asset.selectedAssetStatusNames.push('IN USE','NOT IN USE','NEW');

       }

       if (query?.assetStatus) {
         // Example: "IN USE" → "IN_USE"
         const assetStatusName = query.assetStatus.replace(/\s+/g, '_').toUpperCase();

         // Fetch ID from enum
         const assetStatusId = allassetStatus[assetStatusName as keyof typeof allassetStatus];

         // Initialize arrays if needed
         this.asset.selectedAssetStatusIds ??= [];
         this.asset.selectedAssetStatusNames ??= [];

         if (assetStatusId) {
           this.asset.selectedAssetStatusIds.push(Number(assetStatusId));
           this.asset.selectedAssetStatusNames = [query.assetStatus]; // keep original (with spaces)
         }

        console.log("Asset Status Name:", assetStatusName, "\nStatus Id:", assetStatusId);
      }


     });
}


}