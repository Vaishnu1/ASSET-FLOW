import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AssetGroupModel } from 'src/app/Model/master/asset-group';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { FormGroup } from '@angular/forms';
import { getData } from 'src/app/Model/common/fetchListData';

@Component({
  selector: 'app-asset-group-list',
  templateUrl: './asset-group-list.component.html',
  styleUrls: ['./asset-group-list.component.css']
})
export class AssetGroupListComponent implements OnInit {

  displayedColumns = ['select', 'sno', 'assetGroupCode', 'assetGroupName', 'statutoryRequirements', 'updatedBy', 'updatedDt'];
  assetGroupdataSource = new MatTableDataSource<AssetGroupListComponent>();
  searchvalue: any = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tempViewData: any;
  subLoaderAssetGroup: boolean = false;

  @ViewChild('searchSet') searchCategorySet: ElementRef;


  public assetGroupmodel: AssetGroupModel;
  assetGroupForm: FormGroup;
  //COMBO
  locationCombo: any = [];
  assetCategoryName : any = [];
  subCategoryName: any = [];
  assetGroup: any = [];
  assetGroupName: any = [];
  modelCombo: any = [];
  assetStatusCombo: any = [];

  locationPageNumber:number;
  assetGroupPageNumber:number;
  modelComboPageNumber:number;
  assetCategoryPageNumber:number;
  assetSubCategorPageNumber:number;
  asssetStatusPageNumber:number;

  scrollsyncLocation:boolean=false;
  scrollsyncAssetGroup:boolean=false;
  scrollsyncModel:boolean=false;
  scrollsyncAssetStatus:boolean=false;
  scrollsyncAssetCategory:boolean=false;
  scrollsyncAssetSubCategory:boolean=false;
  recordsPerPageForCombo:string;
  typeScrollsync:boolean = false;
  assetTypePageNumber: number;
  scrollsync: boolean = false;
  limitCount: string = '';
  assetTypeName: any = [];
  //For Pagination
  length: String = '0';     //set total record count here
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

    //PERMISSIONS
    modelAccessModule: ModuleAccessModel;
  getData: getData;

  selectedItem: any=0;

  constructor(private router: Router,
    private commonService: CommonService,
    private assetOptimaServices: AssetOptimaServices,
    private userSession: UserSessionService) {
    this.assetGroupmodel = new AssetGroupModel();
    this.pageSize = '100';
    this.pageIndex = '0';
    this.modelAccessModule=new ModuleAccessModel();
     this.assetGroupPageNumber=1;
    this.assetCategoryPageNumber=1;
    this.assetSubCategorPageNumber = 1;
    this.assetTypePageNumber = 1;

  }

  ngOnInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_ASSET_GROUP'];
    this.assetGroupmodel.direction = 'asc';
    this.assetGroupmodel.columnName = 'assetGroupName'

    this.fetchList();
  }

  ngAfterViewInit() {
    // this.searchCategorySet.nativeElement.focus();
  }

  onSearchChange(searchValue: string) {
   // this.assetGroupmodel.assetGroupName = searchValue;
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
    this.selectedItem = 0;
  }

  openAssetGroupCreateDialog(assetGroupId,mode) {
    this.router.navigate(['home/assetmaster/assetGroupCreate/' + assetGroupId + '/' + mode]);
  }

  listOfAllAssetGroup(searchKey) {
    this.scrollsyncAssetGroup=true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllAssetGroupCombo, searchKey.term, this.assetGroupmodel.subCategoryId, '',this.recordsPerPageForCombo, this.assetGroupPageNumber).subscribe(
    (data) => {
      this.getData = new getData();
      this.getData = this.commonService.fetchDataList(searchKey, this.assetGroupPageNumber , this.assetGroupName , data.responseData.comboList)
      this.assetGroupPageNumber = this.getData.pageNumber;
      this.assetGroupName = this.getData.dataList;
      this.scrollsyncAssetGroup=false;
    });
  }

  getAssetGroupComboValue(event) {
    if (event === undefined) {
      this.assetGroupmodel.assetGroupName=null;
      this.assetGroupmodel.assetGroupId=0;
      this.assetGroupName=[];
      this.assetGroupPageNumber=1;
    }else{
      this.assetGroupmodel.assetGroupName=event.assetGroupName;
      this.assetGroupmodel.assetGroupId=event.assetGroupId;
    }
  }

  fetchList() {
    this.subLoaderAssetGroup = true;
    this.assetGroupdataSource = null;
    this.assetGroupmodel.pageNumber = Number(this.pageIndex);
    this.assetGroupmodel.recordsPerPage = Number(this.pageSize);
    this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllAssetGroup, this.assetGroupmodel).subscribe(
      data => {
        if (data.success) {
          this.length = data.responseData.dataTotalRecCount;
          this.assetGroupdataSource = data.responseData.dataList;
          this.subLoaderAssetGroup = false;
        } else {
          this.subLoaderAssetGroup = false;
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
    this.assetGroupmodel.pageNumber = 0;
    this.assetGroupmodel.columnName = event.active;
    this.assetGroupmodel.direction = event.direction;
    this.fetchList();
  }

  listOfCategory(searchValue) {
    this.scrollsyncAssetCategory = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllAssetCategoryCombo, searchValue.term, '', '', this.recordsPerPageForCombo, this.assetCategoryPageNumber).subscribe(
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
      this.assetGroupmodel.assetCategoryId=0;
      this.assetGroupmodel.assetCategoryName=null;
      this.assetCategoryPageNumber = 1;
      this.assetCategoryName = [];
    } else {
      this.assetGroupmodel.assetCategoryId=event.assetCategoryId;
      this.assetGroupmodel.assetCategoryName=event.assetCategoryName;
    }
  }

  listOfSubCategory(searchValue) {
    this.scrollsyncAssetSubCategory = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllAssetSubCategoryCombo, searchValue.term, this.assetGroupmodel.assetCategoryId,
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
      this.assetGroupmodel.subCategoryId=0;
      this.assetGroupmodel.subCategoryName=null;
      this.assetSubCategorPageNumber = 1;
      this.subCategoryName = [];
    } else {
      this.assetGroupmodel.subCategoryId=event.subCategoryId;
      this.assetGroupmodel.subCategoryName=event.subCategoryName;
    }

  }

  listOfAssetType(searchValue) {
    this.typeScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllAssetTypeCombo, searchValue.term, '', '', this.limitCount,
      this.assetTypePageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetTypePageNumber , this.assetTypeName , data.responseData.comboList)
          this.assetTypePageNumber = this.getData.pageNumber;
          this.assetTypeName = this.getData.dataList;
          this.typeScrollsync = false;
        }
      );
  }
  getAssetTypeComboValue(event) {
    if (event === undefined) {
      this.assetGroupmodel.assetTypeId=0;
      this.assetGroupmodel.assetTypeName=null;
      this.assetTypePageNumber = 1;
      this.assetTypeName = [];
    } else {
      this.assetGroupmodel.assetTypeId=event.assetTypeId;
      this.assetGroupmodel.assetTypeName=event.assetTypeName;
    }

  }

  generateReportOfAssetGroup() {
    this.assetGroupmodel.recordsPerPage = 0;
    this.commonService.commonListService(this.assetOptimaServices.generateAssetGroupRequestReport, this.assetGroupmodel).subscribe(
      (data) => {
        this.downloadDocument(data.responseData);
        this.commonService.openToastSuccessMessage('Download Successful.');
      }, error => {
        this.commonService.openToastWarningMessage('Failed to generate report.');
      });
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

  clearSearch(){
    this.assetGroupmodel=new AssetGroupModel;
    this.ngOnInit();
    this.selectedItem = 0;
  }

  selectAssetGroup(element){
    if(this.selectedItem == element.assetGroupId){
      this.selectedItem = 0;
    }
    else{
      this.selectedItem = element.assetGroupId;
    }
  }

}
