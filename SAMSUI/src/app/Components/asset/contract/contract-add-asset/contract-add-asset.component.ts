import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AssetModel } from 'src/app/Model/master/asset';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CustomFieldSearchComponent } from '../../Asset/custom-field-search/custom-field-search.component';
import { getData } from 'src/app/Model/common/fetchListData';
import { AssetHistoryComponent } from '../../Asset/asset-history/asset-history.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { allBusinessPartnerRoles } from 'src/app/Constants/AllStatusConstants';
import { AssetViewNhComponent } from 'src/app/Components/Dialog-Components/asset-view-nh/asset-view-nh.component';


@Component({
    selector: 'app-contract-add-asset',
    templateUrl: './contract-add-asset.component.html',
    styleUrls: ['./contract-add-asset.component.css']
  })
export class ContractAddAssetComponent implements OnInit {
  
  displayedColumns = ['select', 'assetCode','modelName','assetGroupName','departmentName','assetCategoryName',
                      'ownershipType','ageOfTheYear','functionalStatus','warrantyExist','contractExist','assetInfo', 'personInCharge',
                      'supplierName','createdBy','createdDt','updatedDt'];

  // displayedColumns = [
  // ,
  // 'statusTypeId', 'assetStatusId',
  // 'assetConditionId','approvalStatusAsset',
  // ,'priorityName','riskNature'];

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

  //COMBO
  locationCombo: any = [];
  assetCategoryName: any = [];
  subCategoryName: any = [];
  assetGroup: any = [];
  modelCombo: any = [];
  assetStatusCombo: any = [];

  locationPageNumber: number;
  assetGroupPageNumber: number;
  modelComboPageNumber: number;
  assetCategoryPageNumber: number;
  assetSubCategorPageNumber: number;
  asssetStatusPageNumber: number;

  scrollsyncLocation: boolean = false;
  scrollsyncAssetGroup: boolean = false;
  scrollsyncModel: boolean = false;
  scrollsyncAssetStatus: boolean = false;
  scrollsyncAssetCategory: boolean = false;
  scrollsyncAssetSubCategory: boolean = false;
  scrollsyncmanufactuer : boolean = false;
  recordsPerPageForCombo: string;
  selectedAllAssest: boolean = false;

  //For Pagination
  length: string = '0';     //set total record count here
  pageIndex: string;  //set page number starts with zeroo
  pageSize: string;   // records per page
  defaultLocId: number;

  limitCount: any;
  manufacturerPageNumber: number;
  manufactuer: any[] = [];

  supplierList: any = [];
  scrollSupplierNamesync: boolean = false;
  supplierPageNumber: number = 0;

  scrollsyncServiceEngineer1: boolean = false;
  serviceEngineer1PageNumber: number;
  serviceEngineer1Combo: any = [];

  scrollsyncAssigneeDepartment: boolean = false;
  assigneeDepartmentPageNumber: number;
  assigneeDepartmentCombo: any = [];

  scrollCustomersync: boolean = false;
  customerListPageNumber: number;
  customerList: any =[];

  scrollsyncAssetStatusType: boolean = false;
  assetStatusTypePageNumber: number;
  assetStatusTypeCombo: any = [];

  scrollsyncAssetCondition: boolean = false;
  assetConditionPageNumber: number;
  assetConditionCombo: any = [];

  enableCustomer: boolean=false;

  getData: getData;

  enableActionBtn: boolean=true;

  customFields: any = [];
  assetIds: number[] = [];
  
  error_msg:string='Kindly Select At Least One Highlighted Field';

  constructor(private matDialogRef: MatDialogRef<ContractAddAssetComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
	private commonService: CommonService,
    private router: Router,
    private assetOptimaServices: AssetOptimaServices,
    private assetOptimaConstants: AssetOptimaConstants,
    private titleService: Title,
    private dialog: MatDialog,
    private userSessionService: UserSessionService,
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute) {
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
    this.supplierPageNumber=1;
    this.serviceEngineer1PageNumber=1;
    this.customerListPageNumber=1;
    this.assigneeDepartmentPageNumber =1;
    this.assetConditionPageNumber=1;
    this.assetStatusTypePageNumber=1;
    this.dashboardRoute =true;
  }

  ngOnInit() {
    this.assetIds = this.data.assetIds;    
    this.titleService.setTitle(this.title);

    if(localStorage.getItem('locationId') !== null && localStorage.getItem('locationName') !== null){

      this.asset.locationId = parseInt(localStorage.getItem('locationId'));
      this.asset.locationName = localStorage.getItem('locationName');
    }else{

    this.asset.locationName = this.userSessionService.getUserLocationName();
    this.asset.locationId = this.userSessionService.getUserLocationId();
    }

    localStorage.removeItem('locationId');
    localStorage.removeItem('locationName');
    this.asset.locationType=this.assetOptimaConstants.locationType;
    if(this.asset.locationType=='SERVICE PROVIDER'){
      this.enableCustomer=true;
    }

    this.asset.direction = 'desc';
    this.asset.columnName = 'updatedDt';
    this.selectedAssetList = [];
    // this.fetchList();
    localStorage.setItem('previousRoute', this.router.url);
    this.asset.riskNature = '';
    this.enableActionBtn = true;
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
    var snapshot = this.activatedRoute.snapshot;
    // To get Active Component
    if (snapshot.routeConfig.component.name === 'AssetListComponent') {
      this.fetchList();
    }

  }

  createAsset() {
    this.commonService.showSpinner();
    localStorage.setItem('previousRoute', this.router.url);
    const url = 'home/asset/assetCreate/'+ this.selectedAssetList[0].assetHdrId+'/view/asset_info'; 
    window.open(url, '_blank');
    this.commonService.hideSpinner();
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
    // this.selectedAssetList = [];
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
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
      this.asset.locationName = '';
      this.asset.locationId = 0;
      this.asset.locationType='';
      this.locationPageNumber = 1;
      this.locationCombo = [];
      this.enableCustomer=false;
    } else {
      this.asset.locationName = event.locDisplayField;
      this.asset.locationId = event.locationId;
      this.asset.locationType=event.locationType;
      if(event.locationType=='SERVICE PROVIDER'){
        this.enableCustomer=true;
      }
    }
  }

  listOfCategory(searchValue) {
    this.scrollsyncAssetCategory = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetCategoryCombo.sams', searchValue.term, '', '', this.recordsPerPageForCombo, this.assetCategoryPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assetCategoryPageNumber , this.assetCategoryName , data.responseData.comboList)
        this.assetCategoryPageNumber = this.getData.pageNumber;
        this.assetCategoryName = this.getData.dataList;
        this.scrollsyncAssetCategory = false;
      }
    );
  }
  getCategoryComboValue(event) {
    if (event === undefined) {
      this.asset.assetCategoryId = 0;
      this.asset.assetCategoryName = '';
      this.assetCategoryPageNumber = 1;
      this.assetCategoryName = [];
    } else {
      this.asset.assetCategoryId = event.assetCategoryId;
      this.asset.assetCategoryName = event.assetCategoryName;
    }
  }

  listOfSubCategory(searchValue) {
    this.scrollsyncAssetSubCategory = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetSubCategoryCombo.sams', searchValue.term, this.asset.assetCategoryId,
      '', this.recordsPerPageForCombo, this.assetSubCategorPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetSubCategorPageNumber , this.subCategoryName , data.responseData.comboList)
          this.assetSubCategorPageNumber = this.getData.pageNumber;
          this.subCategoryName = this.getData.dataList;
          this.scrollsyncAssetSubCategory = false;
        }
      );
  }
  getSubCategoryComboValue(event) {
    if (event === undefined) {
      this.asset.subCategoryId = 0;
      this.asset.subCategoryName = '';
      this.assetSubCategorPageNumber = 1;
      this.subCategoryName = [];
    } else {
      this.asset.subCategoryId = event.subCategoryId;
      this.asset.subCategoryName = event.subCategoryName;
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
          this.getData = this.commonService.fetchDataList(searchKey, this.assetGroupPageNumber , this.assetGroup , data.responseData.comboList)
          this.assetGroupPageNumber = this.getData.pageNumber;
          this.assetGroup = this.getData.dataList;
          this.scrollsyncAssetGroup = false;
        });
  }

  getAssetGroupComboValue(event) {
    if (event != null) {
      this.asset.assetGroupName = event.assetGroupName;
      this.asset.assetGroupId = event.assetGroupId;

    } else {
      this.asset.assetGroupName = "";
      this.asset.assetGroupId = 0;
      this.assetGroup = [];
      this.assetGroupPageNumber = 1;
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
          this.getData = this.commonService.fetchDataList(searchKey, this.modelComboPageNumber , this.modelCombo , data.responseData.comboList)
          this.modelComboPageNumber = this.getData.pageNumber;
          this.modelCombo = this.getData.dataList;
          this.scrollsyncModel = false;
        });
  }

  getModelComboValue(event) {
    if (event != null) {
      this.asset.modelId = event.modelId;
      this.asset.modelName = event.modelName;
      this.asset.manufacturerId=event.manufacturerId;
      this.asset.manufacturerName=event.manufacturerName;
    } else {
      this.asset.modelId = 0;
      this.asset.modelName = '';
      this.asset.manufacturerId=0;
      this.asset.manufacturerName='';
      this.modelCombo = [];
      this.modelComboPageNumber = 1;
    }
  }

  loadAssetStatusComboData(searchValue) {
    this.scrollsyncAssetStatus = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllAssetStatusCombo.sams', searchValue.term, this.asset.statusTypeId, '',
      this.recordsPerPageForCombo, this.asssetStatusPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.asssetStatusPageNumber , this.assetStatusCombo , data.responseData.comboList)
          this.asssetStatusPageNumber = this.getData.pageNumber;
          this.assetStatusCombo = this.getData.dataList;
          this.scrollsyncAssetStatus = false;
        }
      );
  }

  selectedAssetStatusList(event) {
    if (event === undefined) {
      this.asset.assetStatusId = 0;
      this.asset.assetStatus = '';
      this.asssetStatusPageNumber = 1;
      this.assetStatusCombo = [];
    } else {
      this.asset.assetStatusId = event.assetStatusId;
      this.asset.assetStatus = event.assetStatusName;
      this.translateService.get([event.assetStatusName])
      .subscribe((val) => {
        const status = Object.values(val)
        this.asset.assetStatus = status[0].toString();
      });
    }
  }

  fetchList() {
    this.asset.pageNumber = Number(this.pageIndex);
    this.asset.recordsPerPage = Number(this.pageSize);

    this.activatedRoute.params.subscribe(
      params => {

        if(params.routeId === "1"){
          this.displayedColumns = ['select', 'locationName', 'assetCode', 'assetCategoryName', 'modelName', 'departmentName','assetStatusId', 'ownershipType'];

          this.asset.purchaseDtDisp = params.year;

          this.dashboardRoute =false;
        }

        var subCategoryName = params.subCategoryId;
        if (subCategoryName != '' && subCategoryName != undefined) {
          this.asset.assetStatusId = params.statusId;
          this.asset.subCategoryName = subCategoryName;
          this.asset.ownershipType = params.ownershipType;
          this.asset.assetCategoryId = params.categoryId;
        }
      }
    );

    this.subLoader = true;
    this.dataSource = [];
    this.asset.screenType = 'Contract Asset';
    this.asset.source ='CONTRACT';

    this.commonService.commonListService('fetchListOfAllAsset.sams', this.asset).subscribe(
      data => {

        if (data.success) {
         this.subLoader = false;
          this.length = data.responseData.dataTotalRecCount;
          this.dataSource = data.responseData.dataList;
          this.filterAssetsById(this.dataSource,this.assetIds);
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
    this.asset = new AssetModel;
    this.selectedAssetList=[];
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

  listOfManufacturer(searchValue) {
    this.scrollsyncmanufactuer = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.MANUFACTURER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchValue.term, '', '', this.limitCount, this.manufacturerPageNumber,'',partnerRoles).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.manufacturerPageNumber , this.manufactuer , data.responseData.comboList)
        this.manufacturerPageNumber = this.getData.pageNumber;
        this.manufactuer = this.getData.dataList;
        this.scrollsyncmanufactuer = false;
      }
    );
  }

  getManfacturerComboValue(event) {
    if (event === undefined) {
      this.asset.manufacturerId=0;
      this.manufacturerPageNumber = 1;
      this.manufactuer = [];
    } else {
      this.asset.manufacturerId = event.businessPartnerId;
    }
  }

  listOfSupplier(searchTerms) {
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

  fetchIdOfSupplier(event) {
    if (event === undefined) {
      this.asset.businessPartnerId=0;
      this.asset.businessPartnerName='';
      this.supplierList = [];
      this.supplierPageNumber = 1;
    } else {
      this.asset.businessPartnerId=event.businessPartnerId;
      this.asset.businessPartnerName=event.businessPartnerName;
      this.supplierList = [];
      this.supplierPageNumber = 1;
    }
  }


  ownership = [
    { id: 1, name: 'OWN' },
    { id: 2, name: 'OWNED BY CUSTOMER' },
    { id: 3, name: 'RENTAL' },
    { id: 4, name: 'LEASE' },
    { id: 5, name: 'LOAN' }
  ];

  loadAssigneeDepartmentComboData(searchValue) {
    this.scrollsyncAssigneeDepartment = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllDeparment.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.assigneeDepartmentPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assigneeDepartmentPageNumber , this.assigneeDepartmentCombo , data.responseData.comboList)
          this.assigneeDepartmentPageNumber = this.getData.pageNumber;
          this.assigneeDepartmentCombo = this.getData.dataList;
          this.scrollsyncAssigneeDepartment = false;
        }
      );
  }

  selectedDepartmentData(event) {
    if (event === undefined) {
      this.asset.departmentId=0;
      this.assigneeDepartmentPageNumber = 1;
      this.assigneeDepartmentCombo = [];
    } else {
      this.asset.departmentId=event.departmentId;
      this.assigneeDepartmentPageNumber = 1;
      this.assigneeDepartmentCombo = [];
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
      this.asset.customerId=0;
      this.asset.customerName='';
      this.customerListPageNumber = 1;
      this.customerList = [];
    } else {
      this.asset.customerId=event.customerId;
      this.asset.customerName=event.customerName;
    }
  }


  compareValue(element: any): boolean{
    return this.selectedAssetList.findIndex(data => data.assetHdrId === element.assetHdrId) !== -1;
  }

  selectedAssetList=[];
  selectAssets(element){

    const assetId = this.selectedAssetList.findIndex(data => data.assetHdrId === element.assetHdrId);

    this.enableActionBtn = false;
    if(assetId === -1){
      this.selectedAssetList.push(element);
      this.assetIds.push(element.assetHdrId);
    }else{
      this.selectedAssetList.splice(assetId,1);
      this.assetIds.splice(assetId,1);
    }

    if(this.selectedAssetList.length === 1){
      this.enableActionBtn = false;
    }
    else{
      this.enableActionBtn = true;
    }
  }

  selectAllAssets(event){
    this.selectedAllAssest = event.checked;
    this.enableActionBtn = false;

    if(event.checked){
      this.selectedAssetList = this.dataSource;
      this.assetIds=this.dataSource.map(asset => asset.assetHdrId);
    }
    else{
      this.selectedAssetList = [];
      this.assetIds = [];
    }

    if(this.selectedAssetList.length === 1){
      this.enableActionBtn = false;
    }
    else{
      this.enableActionBtn = true;
    }
  }


  loadAssetStatusTypeComboData(searchValue) {
    this.scrollsyncAssetStatusType = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllStatusTypeCombo.sams', searchValue.term, '', '',
      this.recordsPerPageForCombo, this.assetStatusTypePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetStatusTypePageNumber , this.assetStatusTypeCombo , data.responseData.comboList)
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
          this.getData = this.commonService.fetchDataList(searchValue, this.assetConditionPageNumber , this.assetConditionCombo , data.responseData.comboList)
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

  customFieldSearch(){
    
    let dialogRef = this.dialog.open(CustomFieldSearchComponent, {
      data: {
        'subCategoryName': this.asset.subCategoryName,
        'subCategoryId': this.asset.subCategoryId,
        'customFields' : this.asset.cusFieldList
      },
       width: '800px', height: '600px'
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if(data.status == true){
          this.asset.cusFieldList = data.response;
        }
      });
  }
  
  updateAddedAsset() {    
    this.matDialogRef.close(this.selectedAssetList);
  }

  exit() {
    this.matDialogRef.close();
  }

  filterAssetsById(element, assetIds) {
    const selectedAssetList = element.filter(asset => assetIds.includes(asset.assetHdrId));
    this.selectedAssetList.push(...selectedAssetList);
  }

  viewAssetInfo (element) {
    const dialogRef = this.dialog.open(AssetViewNhComponent, {
      height: 'auto',
      width: '60%',
      data: {
        'assetHdrId': element.assetHdrId
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {    
        
      });
    }
}

