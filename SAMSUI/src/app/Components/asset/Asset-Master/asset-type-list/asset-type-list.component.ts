import {Component, OnInit, TemplateRef, ViewChild, ElementRef} from '@angular/core';
import { MatPaginator, } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AssetTypeModel } from 'src/app/Model/master/asset-type';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { AssetTypeCreateComponent } from '../asset-type-create/asset-type-create.component';


@Component({
  selector: 'app-asset-type-list',
  templateUrl: './asset-type-list.component.html',
  styleUrls: ['./asset-type-list.component.css']
})
export class AssetTypeListComponent implements OnInit {
  displayedColumns = ['select', 'sno', 'assetTypeName', 'updatedBy', 'updatedDt'];
  assetTypedataSource = new MatTableDataSource<AssetTypeListComponent>();

  searchvalue : any = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tempViewData: any;
  subLoaderAssetType: boolean = false;

  public AssetTypeModel : AssetTypeModel;

   //For Pagination
   length: String = '0';     //set total record count here
   pageIndex: String;  //set page number starts with zeroo
   pageSize: String;   // records per page

   @ViewChild('searchSet') searchSetFocus: ElementRef;

     //PERMISSIONS
  modelAccessModule: ModuleAccessModel;
  selectedItem: any = 0;

  constructor(private dialog: MatDialog,
    private commonService:CommonService,
    private assetOptimaServices:AssetOptimaServices,
    private userSession: UserSessionService) {
    this.AssetTypeModel = new AssetTypeModel();
    this.pageSize = '100';
    this.pageIndex = '0';
    this.modelAccessModule=new ModuleAccessModel();
        }

  ngOnInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_ASSET_TYPE'];
    this.AssetTypeModel.direction = 'desc';
    this.AssetTypeModel.columnName = 'updatedDt';
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
  }
  ngAfterViewInit() {
    this.searchSetFocus.nativeElement.focus();
  }

  onSearchChange(searchValue : string ) {
    this.AssetTypeModel.assetTypeName = searchValue;
    this.pageSize= '100';
    this.pageIndex='0';
    this.fetchList();
  }
  dialogRef;
  openAssetTypeCreateDialog(element, mode) {

    this.dialogRef = this.dialog.open(AssetTypeCreateComponent, {
      height: '265px',
      width: '500px',
      data: {
        'AssetTypeModel' : element,
        'mode' : mode
      }
    });
     this.dialogRef.disableClose = true;
     this.dialogRef.afterClosed().subscribe(
      data => {
          this.ngOnInit();
      });
  }

  ngOnDestroy() {
    if(this.dialogRef!=null){
      this.dialogRef.close();
    }
  }

  openManufaturerviewDialog(templateRef: any, event, _index) {
    this.tempViewData = event;
    this.dialog.open(templateRef);
  }

 fetchList(){
  this.subLoaderAssetType = true;
  this.assetTypedataSource = null;
  this.AssetTypeModel.pageNumber = Number(this.pageIndex);
  this.AssetTypeModel.recordsPerPage = Number(this.pageSize);
  this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllAssetType,this.AssetTypeModel).subscribe(
    data => {
      if(data.success){
         this.length = data.responseData.dataTotalRecCount;
         this.assetTypedataSource = data.responseData.dataList;
         this.subLoaderAssetType = false;
      }else{
        this.subLoaderAssetType = false;
      }
    }
  );

 }


 generateReportForAssetType(){
  this.commonService.commonListService(this.assetOptimaServices.generateAssetTypeReport, this.AssetTypeModel).subscribe(
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
  this.AssetTypeModel.pageNumber = 0;
  this.AssetTypeModel.columnName = event.active;
  this.AssetTypeModel.direction = event.direction;
  this.fetchList();
}

selectAssetType(element){
  if(this.selectedItem.assetTypeId == element.assetTypeId){
    this.selectedItem = 0;
  }
  else{
    this.selectedItem = element;
  }
}

}
