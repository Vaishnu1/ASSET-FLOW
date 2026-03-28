import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetModel } from 'src/app/Model/master/asset';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { Title } from '@angular/platform-browser';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { getData } from 'src/app/Model/common/fetchListData';
import * as moment from 'moment';
import { allBusinessPartnerRoles } from 'src/app/Constants/AllStatusConstants';
import { AssetRelocationModel } from 'src/app/Model/master/assetRelocation';
import { AssetRelocationApproveRejectComponent } from '../Asset-Relocation/asset-relocation-approve-reject/asset-relocation-approve-reject.component';
import { UserPrefernce } from 'src/app/Services/user-preference/user-preference';


@Component({
  selector: 'app-inward-inventory-sr',
  templateUrl: './inward-inventory-sr.component.html',
  styleUrls: ['./inward-inventory-sr.component.css']
})
export class InwardInventorySrComponent implements OnInit {

  title = 'Asset Optima - Inward Inventory';
  public asset : AssetModel;

  // displayedColumns = ['select','sno','locationName','purchaseOrderNo','poDate','assetCategoryName','assetSubCategoryName','assetGrpName','modelName','manufacurer','supplier', 'assetStatus','ownershipType','transactionSrc','createdInfo','updateInfo'];

  defaultColumns = ['select','sno','locationName','purchaseOrderNo','poDate','assetCategoryName','assetSubCategoryName','assetGrpName','modelName','manufacurer','supplier', 'assetStatus'];
  displayedColumns = [...this.defaultColumns];

  //USER PREFERENCE
  public userPreference: UserPrefernce;
  showManageColumns: boolean = false;

    //For Pagination
    length: String = '0';     //set total record count here
    pageIndex: String;  //set page number starts with zeroo
    pageSize: String;   // records per page
    defaultLocId : number;

    subLoader: boolean = false;
    dataSource = [];

   scrollsyncLocation:boolean=false;
   scrollsyncAssetGroup:boolean=false;
   scrollsyncModel:boolean=false;
   recordsPerPageForCombo:string;
   locationPageNumber:number;
   assetGroupPageNumber:number;
   modelComboPageNumber:number;
   locationCombo: any = [];
   assetGroup: any = [];
   modelCombo: any = [];

   //PERMISSIONS
  modelAccessModule: ModuleAccessModel;

  //COMBO
  scrollsyncAssetCategory: boolean = false;
  assetCategoryPageNumber: number;
  assetCategoryName: any = [];

  scrollsyncAssetSubCategory: boolean = false;
  assetSubCategorPageNumber: number;
  subCategoryName: any = [];

  manufacturerPageNumber: number;
  manufactuer: any = [];

  scrollSupplierNamesync: boolean = false;
  supplierPageNumber: number;
  supplierList: any = [];

  scrollsyncmanufactuer: boolean = false;
  getData: getData;

  selectedItem: any = 0;

  constructor(private commonService:CommonService,
    private assetOptimaServices:AssetOptimaServices,
    private userSessionService: UserSessionService,
    private titleService: Title,
    private router: Router,
    private readonly assetOptimaConstants: AssetOptimaConstants,
    private readonly dialog: MatDialog,
    public assetOptimeMthnd: AssetOptimaServices,
    private samsService: AssetOptimaServices
    ) {
      this.modelAccessModule=new ModuleAccessModel();
      this.asset = new AssetModel();
      this.asset.direction = 'desc';
      this.asset.columnName = 'updatedDt';
      this.pageSize = '100';
      this.pageIndex = '0';
      this.locationPageNumber = 1;
      this.assetGroupPageNumber = 1;
      this.modelComboPageNumber = 1;
      this.assetCategoryPageNumber = 1;
      this.assetSubCategorPageNumber = 1;
      this.manufacturerPageNumber=1;
      this.supplierPageNumber=1;
    }

  ngOnInit() {
    this.modelAccessModule = this.userSessionService.getUserGroupAccess()['GROUPACCESS_INWARD'];
    this.titleService.setTitle(this.title);
    // if(localStorage.getItem('INWARD_SEARCH_PARAMETER') == null) {
    //   //this.asset.locationName=this.userSessionService.getUserLocationName();
    //   //this.asset.locationId=this.userSessionService.getUserLocationId();
    //   this.asset.direction = 'desc';
    //   this.asset.columnName = 'updatedDt';
    // } else {
    //   this.asset = JSON.parse(localStorage.getItem('INWARD_SEARCH_PARAMETER'));
    // }
    
    // this.fetchList();
    // localStorage.setItem('previousRoute', this.router.url);

    this.asset.direction = 'desc';
    this.asset.columnName = 'updatedDt';

    this.userPreference = new UserPrefernce();
    this.userPreference.moduleKey = 'GROUPACCESS_INWARD';
    // this.getUserPreferenceInfo();

    let userPreferenceData = this.getUserPreferenceInfo();
    userPreferenceData.then((response) => {
      this.fetchList();
      this.adjustTableWidth();
      localStorage.setItem('previousRoute', this.router.url);
    })
  }

  createInwardInventory(selectedItem,mode) {
    this.router.navigate(['home/asset/preInwardInventoryCreate/'+ selectedItem + '/' + mode]);
  }


  selectAssets(element){

    if(this.selectedItem == element.assetHdrId){
      this.selectedItem = 0;
    }
    else{
      this.selectedItem = element.assetHdrId;
    }
  }

  fetchList(){
    this.subLoader =true;
    this.dataSource=[];
    this.asset.pageNumber = Number(this.pageIndex);
    this.asset.recordsPerPage = Number(this.pageSize);
    this.asset.screenType = 'Inward Inventory SR';
    this.commonService.commonListService('fetchListOfAllAsset.sams',this.asset).subscribe(
      data => {
        if(data.success){
          this.subLoader =false;
          this.length = data.responseData.dataTotalRecCount;
          this.dataSource = data.responseData.dataList;
          localStorage.setItem('INWARD_SEARCH_PARAMETER', JSON.stringify(this.asset));
        }else{
          this.subLoader =false;
        }
      },error =>{
        this.subLoader =false;
      }
    );
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  loadLocationComboData(searchValue) {
    this.scrollsyncLocation=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listAllUserLocForCombo.sams',searchValue.term,'','',
            this.recordsPerPageForCombo,this.locationPageNumber).subscribe(
      (data)=>{
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.locationPageNumber , this.locationCombo , data.responseData.comboList)
        this.locationPageNumber = this.getData.pageNumber;
        this.locationCombo = this.getData.dataList;
        this.scrollsyncLocation=false;
     }
    );
  }

  selectedLocationData(event) {
    if(event===undefined){
      this.asset.locationName=null;
      this.asset.locationId=0;
      this.locationPageNumber=1;
      this.locationCombo=[];
    }else{
      this.asset.locationName=event.locDisplayField;
      this.asset.locationId=event.locationId;
    }
  }

  dateValidationinstall(event){
    if(event.value){
      this.asset.purchaseDtDisp = moment(event.value).format(this.assetOptimaConstants.ISODate);
    }
    else{
      this.asset.purchaseDtDisp = "";
    }
    return false;
  }

  listOfAllAssetGroup(searchKey) {
    this.scrollsyncAssetGroup=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllAssetGroupCombo, searchKey.term, this.asset.subCategoryId, '', this.recordsPerPageForCombo, this.assetGroupPageNumber).subscribe(
    (data) => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchKey, this.assetGroupPageNumber , this.assetGroup , data.responseData.comboList)
      this.assetGroupPageNumber = this.getData.pageNumber;
      this.assetGroup = this.getData.dataList;
      this.scrollsyncAssetGroup=false;
    });
  }

  getAssetGroupComboValue(event) {
    if (event != null) {
      this.asset.assetGroupName=event.assetGroupName;
      this.asset.assetGroupId=event.assetGroupId;

    }else{
      this.asset.assetGroupName="";
      this.asset.assetGroupId=0;
      this.assetGroup=[];
      this.assetGroupPageNumber=1;
    }
  }

  listOfAllModel(searchKey) {

    this.scrollsyncModel=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults('listOfAllModelCombo.sams', searchKey.term, '',
                   this.asset.assetGroupId > 0 ? this.asset.assetGroupId : '',
                                       this.recordsPerPageForCombo, this.modelComboPageNumber).subscribe(
    (data) => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchKey, this.modelComboPageNumber , this.modelCombo , data.responseData.comboList)
      this.modelComboPageNumber = this.getData.pageNumber;
      this.modelCombo = this.getData.dataList;
      this.scrollsyncModel=false;
    });
  }

  getModelComboValue(event) {
    if (event != null) {
      this.asset.modelId=event.modelId;
      this.asset.modelName=event.modelName;
    }else{
      this.asset.modelId=0;
      this.asset.modelName=null;
      this.modelCombo=[];
      this.modelComboPageNumber=1;
    }
  }

  searchAsset() {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
    this.selectedItem = 0;

    this.applyPreferredFilters();
  }

  customSort(event) {
    this.asset.pageNumber = 0;
    this.asset.columnName = event.active;
    this.asset.direction = event.direction;
    this.fetchList();
  }

  editAsset(assetHdrId,mode){
    this.commonService.showSpinner();
    this.router.navigate(['home/asset/assetCreate/', assetHdrId,mode, 'asset_info' ]);
    //this.router.navigate(['home/asset/assetCreateV1/', assetHdrId,mode, 'asset_info' ]);
    this.commonService.hideSpinner();
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchList();
  }

  clear(){
    this.asset=new AssetModel;
    localStorage.removeItem('INWARD_SEARCH_PARAMETER');

    this.asset.direction = 'desc';
    this.asset.columnName = 'updatedDt';
    this.applyPreferredFilters();

    this.ngOnInit();
    this.selectedItem = 0;
  }

  exportToXl(){
    {
      this.commonService.commonListService('generateInwardInventorySRReport.sams', this.asset).subscribe(
        (data) => {
          this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
        }, error => {
          // alert('error');
        }
      );

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
      this.assetCategoryPageNumber = 1;
      this.assetCategoryName = [];
      this.subCategoryName = [];
      this.assetGroup = [];
      this.assetGroupPageNumber = 1;
    } else {
      this.asset.assetCategoryId = event.assetCategoryId;
      this.subCategoryName = [];
      this.assetGroup = [];
      this.assetGroupPageNumber = 1;
    }
    this.assetSubCategorPageNumber = 1;
    this.asset.subCategoryId = 0;
    this.asset.subCategoryName = null;
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
      this.asset.subCategoryId=0;
      this.assetSubCategorPageNumber = 1;
      this.subCategoryName = [];
    } else {
      this.asset.subCategoryId=event.subCategoryId;
    }

  }

  listOfManufacturer(searchValue) {
    this.scrollsyncmanufactuer = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.MANUFACTURER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchValue.term, '', '', this.recordsPerPageForCombo, this.manufacturerPageNumber,'',partnerRoles).subscribe(
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
      this.asset.manufacturerId=event.manufacturerId;
    }
  }

  listOfSupplier(searchTerms) {
    this.scrollSupplierNamesync = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    let partnerRoles = allBusinessPartnerRoles[allBusinessPartnerRoles.SUPPLIER];
    this.commonService.getComboResults(this.assetOptimaServices.listAllBusinessPartnerCombo, searchTerms.term, '', '', this.recordsPerPageForCombo, this.supplierPageNumber,'',partnerRoles).subscribe(
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
      this.asset.businessPartnerName=null;
      this.supplierList = [];
      this.supplierPageNumber = 1;
    } else {
      this.asset.businessPartnerId=event.businessPartnerId;
      this.asset.businessPartnerName=event.businessPartnerName;
      this.supplierList = [];
      this.supplierPageNumber = 1;
    }
  }

  functionalStatus = [
    { id: 1, name: 'CRITICAL' },
    { id: 2, name: 'NON CRITICAL' }
  ];

  
  //for generate report
  generateReport() {
    this.asset.screenType = 'Inward Inventory SR Report';
    this.asset.recordsPerPage = 0;
    this.commonService.commonListService('reports/assets/generateInwardInventorySrReport.sams',this.asset).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      }, error => {
        // alert('error');
      }
    );
  } 

  relocation;
  public assetRelocationModel: AssetRelocationModel;
  dataSourceTemp = [];
  viewAssetTransferInfo (assetHdrId) {

    console.log("selected asset hdr id" , assetHdrId);
    this.assetRelocationModel = new AssetRelocationModel();
    this.assetRelocationModel.assetHdrId = assetHdrId;
    this.commonService.commonListService('viewAssetRelocateInfo.sams', this.assetRelocationModel).subscribe(
      data => {
        if (data.success) {
          this.subLoader = false;

          this.length = data.responseData.dataTotalRecCount;
          this.dataSourceTemp = data.responseData.dataList;

          this.relocation = this.dialog.open(AssetRelocationApproveRejectComponent, {
              height: '600px',
              width: '90%',
              data: {
                'batchNo': this.dataSourceTemp[0].relocateBatchNo,
                'locId': this.dataSourceTemp[0].locationId,
                'sourceLocName': this.dataSourceTemp[0].sourceLocName,
                'sourceDept': this.dataSourceTemp[0].sourceDepName,
                'sourceSubDept': this.dataSourceTemp[0].sourceSubDepName,
                'relocateLocation': this.dataSourceTemp[0].relocateLocName,
                'relocateDept':this.dataSourceTemp[0].relocateDepName,
                'relocateSubDept':this.dataSourceTemp[0].relocateSubDepName,
                'mode': 'view',
                'relocateDeptId' : this.dataSourceTemp[0].relocateDepId,
                'approvalStatus' : this.dataSourceTemp[0].approvalStatus
              }
            });
            this.relocation.disableClose = true;
            this.relocation.afterClosed().subscribe(
              data => {
                //this.ngOnInit();
              });
        } else {
          this.subLoader = false;
        }
      }, error => {
        this.subLoader = false;
      }
    ); 
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
      this.commonService.commonInsertService(this.samsService.fetchUserPreferenceInfo, this.userPreference).subscribe(
        data => {
          if(data.responseData !== undefined) {
            this.userPreference = data.responseData;
            if(this.userPreference.customColumnsList.length>0) {
              this.displayedColumns = this.userPreference.customColumnsList;
            }
            this.asset = JSON.parse(this.userPreference.customFilters);
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
        document.getElementById("assetInwardListTable").style.minWidth = "150%";
      }else{
        document.getElementById("assetInwardListTable").style.minWidth = "100%";
      }
  
    }

}
