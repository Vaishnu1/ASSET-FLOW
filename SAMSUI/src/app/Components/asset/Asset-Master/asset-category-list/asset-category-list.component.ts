import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, } from '@angular/material/paginator';
import {  MatTableDataSource } from '@angular/material/table';
import {  MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetCategoryModel } from 'src/app/Model/master/assetCategory';
import { Title } from '@angular/platform-browser';
import { SubMenus } from 'src/app/Constants/SubMenusList';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { AssetCategoryCreateComponent } from '../asset-category-create/asset-category-create.component';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';

@Component({
  selector: 'app-asset-category-list',
  templateUrl: './asset-category-list.component.html',
  styleUrls: ['./asset-category-list.component.css']
})
export class AssetCategoryListComponent implements OnInit {

  // Set Page Title
  title = 'Asset Optima - Asset Master';
  Active_Tab = 'asset_category';
  displayedColumns = ['select', 'sno', 'assetCategoryCode', 'assetCategoryName','assetCount','subCategoryCount', 'updatedBy', 'updatedDt'];
  assetCategorydataSource = new MatTableDataSource<AssetCategoryListComponent>();
  searchvalue: any = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tempViewData: any;
  subLoaderAssetCategory: boolean = false;
  @ViewChild('searchCategory') searchCategorySet: ElementRef;

  public assetCategoryModel: AssetCategoryModel;

  //For Pagination
  length: String = '0';     //set total record count here
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page
  viewFlag:boolean;

    //PERMISSIONS
    modelAccessModule: ModuleAccessModel;
  selectedItem: any=0;

  //MODULE PERMISSION
  assetSubCategoryModuleAccess: ModuleAccessModel;
  assetTypeModuleAccess: ModuleAccessModel;
  deviceCodeModuleAccess: ModuleAccessModel;
  assetGroupModuleAccess: ModuleAccessModel;
  modelModuleAccess: ModuleAccessModel;
  statutoryReqModuleAccess: ModuleAccessModel;
  customFieldsModuleAccess: ModuleAccessModel;
  batchAssetsModuleAccess: ModuleAccessModel;

  // For Pie Chart
  repairCount: number = 0;
    repairValue: number = 0;
    disposedCount: number = 0;
    disposedValue: number = 0;
    retiredCount: number = 0;
    retiredValue: number = 0;
    disposedStatus: number = 0;
    retiredStatus: number = 0;

    option2: any;
    option1: any;
    financialYear: string = '';
    displayChart: boolean = true;
    monthWiseChart;
    assetCategoryBasedOnLoc;
    noRecord1: boolean;
    noRecord2: boolean;

    retDisChart: boolean;
    assetChart: boolean;
    noRecordForRetDisChart: boolean;
    noRecordForAssetChart: boolean;
    dropDownDisplayForAssetChart: boolean;
    dropDownDisplayForRetDisChart: boolean;
    assetsubCategoryBased: any;

    displayAssetType: boolean;
    noRecord: boolean;
    value: string;
    number: number;
    assetTypeName: any[];
    data: {
        value: number;
        name: string;
        statusId: string;
        categoryId: number;
    }[];

    sum: {
        value: number;
        name: string;
    }[];

    selectedDropDown: any;
    totalCount: number;
    totalValue: number;

    totalAssets: number;
    totalValueOfAssets: number;

    others: string;
    assetCategory:string;
    theme: string;
    locCurrCd: any;

    retiredStatusName : String = "";
    disposedStatusName : String = "";


  constructor(private dialog: MatDialog,
    private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private titleService: Title,
    public submodules:SubMenus,
    private assetOptimaConstants: AssetOptimaConstants,
    private userSession: UserSessionService) {
    this.assetCategoryModel = new AssetCategoryModel();
    this.modelAccessModule=new ModuleAccessModel();
    
    this.assetSubCategoryModuleAccess = new ModuleAccessModel();
    this.assetTypeModuleAccess = new ModuleAccessModel();
    this.deviceCodeModuleAccess = new ModuleAccessModel();
    this.assetGroupModuleAccess = new ModuleAccessModel();
    this.modelModuleAccess = new ModuleAccessModel();
    this.statutoryReqModuleAccess = new ModuleAccessModel();
    this.customFieldsModuleAccess = new ModuleAccessModel();
    this.batchAssetsModuleAccess = new ModuleAccessModel();
  }
  ngOnInit() {
    this.routerLinkActiveTab();
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_ASSET_CATEGORY'];
    this.titleService.setTitle(this.title);
    this.assetCategoryModel.direction = 'asc';
    this.assetCategoryModel.columnName = 'assetCategoryName'
    this.pageSize = '100';
    this.pageIndex = '0';
    this.selectedItem = 0;
    
    //Access Control for Other Modules in Asset Master
    this.assetSubCategoryModuleAccess = this.userSession.getUserGroupAccess()['GROUPACCESS_ASSET_SUB_CATEGORY'];
    this.assetTypeModuleAccess = this.userSession.getUserGroupAccess()['GROUPACCESS_ASSET_TYPE'];
    this.deviceCodeModuleAccess = this.userSession.getUserGroupAccess()['GROUPACCESS_DEVICE_CODE'];
    this.assetGroupModuleAccess = this.userSession.getUserGroupAccess()['GROUPACCESS_ASSET_GROUP'];
    this.modelModuleAccess = this.userSession.getUserGroupAccess()['GROUPACCESS_ASSET_MODEL'];
    this.statutoryReqModuleAccess = this.userSession.getUserGroupAccess()['GROUPACCESS_STATUTORY_REQUIREMENT'];
    this.customFieldsModuleAccess = this.userSession.getUserGroupAccess()['GROUPACCESS_ASSET_CUSTOM_FIELDS'];
    this.batchAssetsModuleAccess = this.userSession.getUserGroupAccess()['GROUPACCESS_BATCH_ASSETS'];

    this.fetchList();

    this.theme = localStorage.getItem('theme');

    this.fetchCountAndValueOfAssets(null);
    this.fetchCountAndValueOfAssets1(null);
  }
  ngAfterViewInit() {
    if(localStorage.getItem('previousRoute').startsWith('/home/assetmaster/assetGroupCreate') || localStorage.getItem('previousRoute')===''){
      //do nothing
    }else{
      this.searchCategorySet.nativeElement.focus();
    }
  }

  routerLinkActiveTab(){
    if(localStorage.getItem('previousRoute')!= null){
      if(localStorage.getItem('previousRoute').startsWith('/home/assetmaster/assetGroupCreate')){
        this.Active_Tab_Change('asset_group');
        localStorage.setItem('previousRoute','');
      }else if(localStorage.getItem('previousRoute').startsWith('/home/purchase/manufacturerSupplierCreate')){
        this.Active_Tab_Change('asset_manufacturer');
        localStorage.setItem('previousRoute','');
      }else if(localStorage.getItem('previousRoute').startsWith('/home/assetmaster/modelCreate')){
        this.Active_Tab_Change('asset_model');
        localStorage.setItem('previousRoute','');
      }else if(localStorage.getItem('previousRoute').startsWith('/home/assetmaster/customerCreate')){
        this.Active_Tab_Change('customer');
        localStorage.setItem('previousRoute','');
      }else if(localStorage.getItem('previousRoute').startsWith('/home/assetmaster/batchHdrCreate')){
        this.Active_Tab_Change('batch-asset');
        localStorage.setItem('previousRoute','');
      }else if(localStorage.getItem('previousRoute').startsWith('/home/asset/assetCreateV1') && localStorage.getItem('previousRoute')!=''){
        this.Active_Tab_Change('asset_category');
        localStorage.setItem('previousRoute','');
        this.openAssetCategoryCreate(0,'add');
}
    }
  }

  onSearchChange(searchValue: string) {
    this.assetCategoryModel.assetCategoryName = searchValue;
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
  }
  legalCreate;
  openAssetCategoryCreate(element,event) {
     if(!event && element.assetCategoryName == this.assetOptimaConstants.notApplicable){
      this.commonService.openToastWarningMessage('Asset Category "NOT APPLICABLE" Cannot Be Edited.');
    }else{
      this.legalCreate = this.dialog.open(AssetCategoryCreateComponent, {
        height: 'auto',
        width: '800px',
        data: {
          'assetCategoryModel': element,
          'viewFlag': event
        }
      });
      this.legalCreate.disableClose = true;
      this.legalCreate.afterClosed().subscribe(
        data => {
          this.ngOnInit();
        });
    }
  }

  ngOnDestroy() {
    if(this.legalCreate!=null){
      this.legalCreate.close();
    }
  }
  openViewDialog(templateRef: any, event, _index) {
    this.tempViewData = event;
    this.dialog.open(templateRef);

  }
  Active_Tab_Change(name) {
    this.Active_Tab = name;
  }
  fetchList() {
    this.assetCategoryModel.pageNumber = Number(this.pageIndex);
    this.assetCategoryModel.recordsPerPage = Number(this.pageSize);
    this.subLoaderAssetCategory = true;
    this.assetCategorydataSource = null;
    this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllAssetCategory, this.assetCategoryModel).subscribe(
      data => {
        if (data.success) {
          this.subLoaderAssetCategory = false;
          this.length = data.responseData.dataTotalRecCount;
          this.assetCategorydataSource = data.responseData.dataList;
        } else {
          this.subLoaderAssetCategory = false;
        }
      }

    );
  }

  nextPage(pageNuber: number) {

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
    this.assetCategoryModel.pageNumber = 0;
    this.assetCategoryModel.columnName = event.active;
    this.assetCategoryModel.direction = event.direction;
    this.fetchList();
  }

  generateReportForAssetCategory(){
    this.commonService.commonListService(this.assetOptimaServices.generateAssetCategoryReport, this.assetCategoryModel).subscribe(
      (data) => {
        this.downloadDocument(data.responseData);
        this.commonService.openToastSuccessMessage('Download Successful.');
      }, error => {
        this.commonService.openToastWarningMessage('Failed to generate report.');
      }
    );
  }

  downloadDocument(filePath: string) {
    var fileName = filePath.split('.')[0];
    this.commonService.downloadExcelFile(filePath).subscribe(
      data => {
        let file = filePath.split('.');
        this.commonService.showDownloadPopUp(data, fileName.split('/')[fileName.split('/').length - 1] + "." + filePath.split('.')[1]);
      }
    );
  }

  closeModal() {
    this.dialog.closeAll();
  }

  selectAssetCategory(element){
    if(this.selectedItem.assetCategoryId == element.assetCategoryId){
      this.selectedItem = 0;
    }
    else{
      this.selectedItem = element;
    }
  }

  // For Pie chart

  fetchCountAndValueOfAssets(financialYear) {

    this.dropDownDisplayForRetDisChart = false;
    this.retDisChart = false;
    this.assetChart = true;
    this.noRecordForAssetChart = false;
    this.noRecordForRetDisChart = false;
    this.noRecord = false;

    this.data = [];
    this.sum = [];
    this.assetTypeName = [];
    this.totalCount = 0;
    this.totalValue = 0;

    if (this.selectedDropDown === '') {
        this.selectedDropDown = this.assetCategory;
    }
    this.commonService.commonGetService('fetchListOfCategoryCount.sams', '-1',
        "Asset Category", 46, financialYear).subscribe(data => {
            if (data.success) {
                
                if (this.selectedDropDown === this.assetCategory) {

                this.totalAssets = 0;
                this.totalValueOfAssets = 0;

                }

                if (data.responseData.dataList.length > 0) {
                    const categoryAsset = data.responseData.dataList;
                    
                    for (this.number = 0; this.number < categoryAsset.length; this.number++) {

                        if (this.selectedDropDown === this.assetCategory) {

                            
                            this.totalAssets += categoryAsset[this.number].count;
                            this.totalValueOfAssets += categoryAsset[this.number].value;
                        }
                        if (this.number > 9) {
                            if (this.assetTypeName[10] !== this.others) {
                                this.assetTypeName = this.assetTypeName.concat(this.others);
                            }
                        } else if (this.number <= 9) {
                            this.assetTypeName = this.assetTypeName.concat(categoryAsset[this.number].category);
                        }
                        if (this.number > 9) {

                            this.totalCount += categoryAsset[this.number].count;

                            if (this.number === categoryAsset.length - 1) {
                                this.data = this.data.concat({
                                    value: this.totalCount,
                                    name: this.others,
                                    statusId: this.others,
                                    categoryId: 0
                                });
                            }
                        } else if (this.number <= 9) {

                            this.data = this.data.concat({
                                value: categoryAsset[this.number].count,
                                name: categoryAsset[this.number].category,
                                statusId: categoryAsset[this.number].assetStatusId,
                                categoryId: categoryAsset[this.number].categoryId
                            });
                        }
                        if (this.number > 9) {
                            this.totalValue += categoryAsset[this.number].value;
                            if (this.number === categoryAsset.length - 1) {
                                this.sum = this.sum.concat({
                                    value: this.totalValue,
                                    name: this.others
                                });
                            }
                        } else if (this.number <= 9) {
                            this.sum = this.sum.concat({
                                value: categoryAsset[this.number].value,
                                name: categoryAsset[this.number].category
                            });
                        }


                    }

                    this.option1 = this.getAllAssetChartList();
                } else {

                    this.assetChart = false;
                    this.noRecordForAssetChart = true;
                }
            }
        });

}

fetchCountAndValueOfAssets1(financialYear) {

  this.dropDownDisplayForRetDisChart = false;
  this.retDisChart = false;
  this.assetChart = true;
  this.noRecordForAssetChart = false;
  this.noRecordForRetDisChart = false;
  this.noRecord = false;

  this.data = [];
  this.sum = [];
  this.assetTypeName = [];
  this.totalCount = 0;
  this.totalValue = 0;

  if (this.selectedDropDown === '') {
      this.selectedDropDown = this.assetCategory;
  }
  this.commonService.commonGetService('fetchListOfCategoryCount.sams', '-1',
      "Sub Category", 46, financialYear).subscribe(data => {
          if (data.success) {
              
              if (this.selectedDropDown === this.assetCategory) {

              this.totalAssets = 0;
              this.totalValueOfAssets = 0;

              }

              if (data.responseData.dataList.length > 0) {
                  const categoryAsset = data.responseData.dataList;
                  
                  for (this.number = 0; this.number < categoryAsset.length; this.number++) {

                      if (this.selectedDropDown === this.assetCategory) {

                          
                          this.totalAssets += categoryAsset[this.number].count;
                          this.totalValueOfAssets += categoryAsset[this.number].value;
                      }
                      if (this.number > 9) {
                          if (this.assetTypeName[10] !== this.others) {
                              this.assetTypeName = this.assetTypeName.concat(this.others);
                          }
                      } else if (this.number <= 9) {
                          this.assetTypeName = this.assetTypeName.concat(categoryAsset[this.number].category);
                      }
                      if (this.number > 9) {

                          this.totalCount += categoryAsset[this.number].count;

                          if (this.number === categoryAsset.length - 1) {
                              this.data = this.data.concat({
                                  value: this.totalCount,
                                  name: this.others,
                                  statusId: this.others,
                                  categoryId: 0
                              });
                          }
                      } else if (this.number <= 9) {

                          this.data = this.data.concat({
                              value: categoryAsset[this.number].count,
                              name: categoryAsset[this.number].category,
                              statusId: categoryAsset[this.number].assetStatusId,
                              categoryId: categoryAsset[this.number].categoryId
                          });
                      }
                      if (this.number > 9) {
                          this.totalValue += categoryAsset[this.number].value;
                          if (this.number === categoryAsset.length - 1) {
                              this.sum = this.sum.concat({
                                  value: this.totalValue,
                                  name: this.others
                              });
                          }
                      } else if (this.number <= 9) {
                          this.sum = this.sum.concat({
                              value: categoryAsset[this.number].value,
                              name: categoryAsset[this.number].category
                          });
                      }


                  }

                  this.option2 = this.getAllAssetChartList();
              } else {

                  this.assetChart = false;
                  this.noRecordForAssetChart = true;
              }
          }
      });

}

getAllAssetChartList() {

  return {
      tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: { 
          bottom: 0,
          left: 'center',
          data: this.assetTypeName
      },
      series: [
          {
              name: 'Total Asset Count for',
              type: 'pie',
              radius: [0, '45%'],
              center: ['45%', '45%'],
              label: {
                  normal: {
                      formatter: function (data) {
                          return data.value.toLocaleString();
                      },
                      position: 'inside',
                      rich: {
                          b: {
                              fontSize: 10,
                              lineHeight: 33
                          },
                          per: {
                              padding: [2, 4],
                              borderRadius: 2
                          }
                      }
                  }
              },

              labelLine: {
                  normal: {
                      show: false
                  }
              },
              data: this.data

          },
          {
              name: 'Total Asset Value for',
              type: 'pie',
              radius: ['50%', '55%'],
              center: ['45%', '45%'], 
              // radius: ['65%', '78%'],
              // center: ['25%', '50%'],
              label: {
                  normal: {
                      formatter: function (data) {
                          return data.value.toLocaleString();
                      },
                      backgroundColor: '#eee',
                      position: 'top',
                      borderColor: '#aaa',
                      rich: {
                          b: {
                              fontSize: 10,
                              lineHeight: 33
                          },
                          per: {
                              color: '#eee',
                              backgroundColor: '#334455',
                              padding: [2, 4],
                              borderRadius: 2
                          }
                      }
                  }
              },
              data: this.sum                    
          }, 
      ]
  };

} 


}
