import {Component, OnInit, TemplateRef, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AssetSubCategoryModel } from 'src/app/Model/master/asset-sub-category';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { getData } from 'src/app/Model/common/fetchListData';
import { AssetSubCategoryCreateComponent } from '../asset-sub-category-create/asset-sub-category-create.component';
import { AssetSubCategoryCustomFieldsComponent } from '../asset-sub-category-custom-fields/asset-sub-category-custom-fields.component';
import { PrinterSubCategoryMappingComponent } from 'src/app/Components/Dialog-Components/assetPopUp/printer-sub-category-mapping/printer-sub-category-mapping.component';
import { AssetSubCategoryCustomGroupFieldsComponent } from '../asset-sub-category-custom-group-fields/asset-sub-category-custom-group-fields.component';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';

@Component({
  selector: 'app-asset-sub-category-list',
  templateUrl: './asset-sub-category-list.component.html',
  styleUrls: ['./asset-sub-category-list.component.css']
})
export class AssetSubCategoryListComponent implements OnInit,OnDestroy {
  //displayedColumns = ['sno', 'subCategoryName', 'createdBy', 'createdDtDisp', 'updatedBy', 'updatedDtDisp', 'action'];
  displayedColumns = ['select', 'sno', 'assetSubCategoryCode', 'subCategoryName', 'assetCategoryTO.assetCategoryName',  'updatedBy','updatedDt'];
  assetsubCategorydataSource = new MatTableDataSource<AssetSubCategoryListComponent>();
  searchvalue : any = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tempViewData: any;
  subLoaderAssetSubCategory: boolean = false;

  public assetSubCategoryModel : AssetSubCategoryModel;

  @ViewChild('searchSet') searchSetFocus: ElementRef;

   //For Pagination
   length: String = '0';     //set total record count here
   pageIndex: String;  //set page number starts with zeroo
   pageSize: String;   // records per page
   assetCategoryName: any = [];
   assetPageNumber:Number;
   assetCategoryCombo:any=[];
   subScrollsync:boolean = false;
   limitCount: string = '';
   assetSubCategorPageNumber: number;
   subCategoryName:any=[];
   categoryScrollsync:boolean = false;
   assetCategoryPageNumber:number;
   subCategoryCombo:any=[];




     //PERMISSIONS
  modelAccessModule: ModuleAccessModel;
  getData: getData;
  selectedItem: any = 0;

  constructor(private dialog: MatDialog,
    private commonService:CommonService,
    private assetOptimaServices:AssetOptimaServices,
    private assetOptimaConstants: AssetOptimaConstants,
    private userSession: UserSessionService) {
    this.assetSubCategoryModel = new AssetSubCategoryModel();
    this.pageSize = '100';
    this.pageIndex = '0';
    this.modelAccessModule=new ModuleAccessModel();
    this.assetCategoryPageNumber = 1;
    this.assetSubCategorPageNumber = 1;


     }

  ngOnInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_ASSET_SUB_CATEGORY'];
    this.assetSubCategoryModel.direction = 'asc';
    this.assetSubCategoryModel.columnName = 'subCategoryName';
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
  }
  ngAfterViewInit() {
    this.searchSetFocus.nativeElement.focus();
  }
  onSearchChange(searchValue : string ) {
    this.assetSubCategoryModel.subCategoryName = searchValue;
    this.pageSize = '100';
    this.pageIndex ='0';
    this.fetchList();
  }

  legalCreate;
  openAssetSubCategoryDialog(element,mode) {
    if(mode == 'edit' && element.subCategoryName == this.assetOptimaConstants.notApplicable){
      this.commonService.openToastWarningMessage('Sub Category "NOT APPLICABLE" Cannot Be Edited.');
    }else{
      this.legalCreate = this.dialog.open(AssetSubCategoryCreateComponent, {
        height: '300px',
        width: '500px',
        data: {
          'AssetSubCategoryModel' : element,
          'mode' : mode
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
    if(this.subCategoryCusFields!=null){
      this.subCategoryCusFields.close();
    }
    if(this.printerSubCategoryMapping!=null){
      this.printerSubCategoryMapping.close();
    }
  }

  subCategoryCusFields;
  addEditSubCategoryCusFields(subCategoryId,orgId) {
    //open model add popup
    this.subCategoryCusFields = this.dialog.open(AssetSubCategoryCustomFieldsComponent, {
      height: '600px',
      width: '1200px',
      data: { 'subCategoryId': subCategoryId,
              'orgId': orgId }
    });
    this.subCategoryCusFields.disableClose = true;
    this.subCategoryCusFields.afterClosed().subscribe(
      data => {
        this.ngOnInit();
      });
  }

  printerSubCategoryMapping;
  openPrinterSubCategoryMapping(subCategoryId) {
    //open model add popup
    this.printerSubCategoryMapping = this.dialog.open(PrinterSubCategoryMappingComponent, {
      height: '600px',
      width: '900px',
      data: { 'subCategoryId': subCategoryId,}
    });
    this.printerSubCategoryMapping.disableClose = true;
    this.printerSubCategoryMapping.afterClosed().subscribe(
      data => {
        this.ngOnInit();
      });
  }

  fetchList(){
    this.subLoaderAssetSubCategory = true;
    this.assetsubCategorydataSource = null;
    this.assetSubCategoryModel.pageNumber = Number(this.pageIndex);
    this.assetSubCategoryModel.recordsPerPage = Number(this.pageSize);
    this.assetSubCategoryModel.sourceScreen ='SUB CATEGORY';
    this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllAssetSubCategory,this.assetSubCategoryModel).subscribe(
      data => {
        if(data.success){
           this.length = data.responseData.dataTotalRecCount;
           this.assetsubCategorydataSource = data.responseData.dataList;
           this.subLoaderAssetSubCategory = false;
           }else{
             this.subLoaderAssetSubCategory = false;
           }
      });
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
    this.assetSubCategoryModel.pageNumber = 0;
    this.assetSubCategoryModel.columnName = event.active;
    this.assetSubCategoryModel.direction = event.direction;

    this.fetchList();
  }

  popUpDisplayGroupCustom() {
    //open model add popup
    let dialogRef = this.dialog.open(AssetSubCategoryCustomGroupFieldsComponent, {
      height: '500px',
      width: '80%'
    });
    // dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {

        }
      });
  }

  listOfCategory(searchValue) {
    this.categoryScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllAssetCategoryCombo, searchValue.term, '', '', this.limitCount, this.assetCategoryPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.assetCategoryPageNumber , this.assetCategoryCombo , data.responseData.comboList)
        this.assetCategoryPageNumber = this.getData.pageNumber;
        this.assetCategoryCombo = this.getData.dataList;
        this.categoryScrollsync = false;
      }
    );
  }

  selectedAssetCategory(event){
    if(event===undefined){
      this.assetSubCategoryModel.categoryName='';
      this.assetSubCategoryModel.categoryId=0;
      this.assetCategoryPageNumber=1;
      this.assetCategoryCombo=[];

      this.assetSubCategoryModel.subCategoryName=null;
      this.assetSubCategoryModel.subCategoryId=0;
      this.subCategoryCombo=[];
    }else{
      this.assetSubCategoryModel.categoryName=event.assetCategoryName;
      this.assetSubCategoryModel.categoryId=event.assetCategoryId;

      this.assetSubCategoryModel.subCategoryName=null;
      this.assetSubCategoryModel.subCategoryId=0;
      this.subCategoryCombo=[];
      this.assetSubCategorPageNumber=1;
    }

  }

  listOfSubCategory(searchValue) {
    this.subScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listAllAssetSubCategoryCombo, searchValue.term, this.assetSubCategoryModel.categoryId,
      '', this.limitCount, this.assetSubCategorPageNumber).subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.assetSubCategorPageNumber , this.subCategoryCombo , data.responseData.comboList)
          this.assetSubCategorPageNumber = this.getData.pageNumber;
          this.subCategoryCombo = this.getData.dataList;
          this.subScrollsync = false;
        }
      );
  }

  selectedSubCategory(event){
    if(event===undefined){
      this.assetSubCategoryModel.subCategoryName='';
      this.assetSubCategoryModel.subCategoryId=0;
      this.assetSubCategorPageNumber=1;
      this.subCategoryCombo=[];
    }else{
      this.assetSubCategoryModel.subCategoryName=event.subCategoryName;
      this.assetSubCategoryModel.subCategoryId=event.subCategoryId;

    }
  }

  searchAsset(event){
    this.pageSize='100';
    this.pageIndex='0';
    this.fetchList();
    this.selectedItem = 0;
  }

  clear() {
    this.assetSubCategoryModel = new AssetSubCategoryModel();
    this.ngOnInit()
    this.selectedItem = 0;
  }

  generateReportForAeetSubCategory() {
    this.assetSubCategoryModel.recordsPerPage = 0;
    this.commonService.commonListService(this.assetOptimaServices.generateAssetSubCategoryReport, this.assetSubCategoryModel).subscribe(
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

  selectSubCategory(element){
    if(this.selectedItem.subCategoryId == element.subCategoryId){
      this.selectedItem = 0;
    }
    else{
      this.selectedItem = element;
    }
  }

}
