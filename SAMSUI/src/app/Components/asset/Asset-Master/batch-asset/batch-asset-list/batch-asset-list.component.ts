import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { ModelBatchHdr } from 'src/app/Model/base/batchHdrModel';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { AssetTypeCreateComponent } from 'src/app/Components/asset/Asset-Master/asset-type-create/asset-type-create.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-batch-asset-list',
  templateUrl: './batch-asset-list.component.html',
  styleUrls: ['./batch-asset-list.component.css']
})
export class BatchAssetListComponent implements OnInit {

  displayedColumns = ['select', 'sno', 'batchName', 'remarks', 'active', 'updatedBy', 'updatedDt'];
  batchHdrDataSource = new MatTableDataSource<BatchAssetListComponent>();

  searchvalue : any = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  subLoaderBatchAssets = false;

  //For Pagination
  length = '0';     //set total record count here 
  pageIndex: string;  //set page number starts with zeroo
  pageSize: string;   // records per page

  @ViewChild('searchSet') searchSetFocus: ElementRef;

    //PERMISSIONS 
  modelAccessModule: ModuleAccessModel;

  batchHdrModel: ModelBatchHdr;
  selectedItem: number=0;

  constructor(
    private readonly dialog: MatDialog, 
    private readonly commonService:CommonService,
    private readonly assetOptimaServices:AssetOptimaServices,
    private readonly userSession: UserSessionService,
    private readonly router: Router
    ) {
    this.batchHdrModel = new ModelBatchHdr();
    this.pageSize = '100';
    this.pageIndex = '0';
    this.modelAccessModule=new ModuleAccessModel();
        }

  ngOnInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_BATCH_ASSETS'];
    this.batchHdrModel.direction = 'asc';
    this.batchHdrModel.columnName = 'batchName';
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
  }
  ngAfterViewInit() {
    this.searchSetFocus.nativeElement.focus();
  }

  onSearchChange(searchValue : string ) {  
    this.batchHdrModel.batchName = searchValue;
    this.pageSize= '100';
    this.pageIndex='0';
    this.fetchList();
  }

  createOrEditOrView(batchHdrId, mode) {
    const navigateToBatchCreateScreen = `home/assetmaster/batchHdrCreate/${batchHdrId}/${mode}`;
    this.router.navigate([navigateToBatchCreateScreen]);
  }

  fetchList(){
  this.subLoaderBatchAssets = true;
  this.batchHdrDataSource = null;
  this.batchHdrModel.pageNumber = Number(this.pageIndex);
  this.batchHdrModel.recordsPerPage = Number(this.pageSize);
  this.commonService.commonListService('fetchListOfAllBatchHdr.sams',this.batchHdrModel).subscribe(
    data => {
      if(data.success){
        this.length = data.responseData.dataTotalRecCount;
        this.batchHdrDataSource = data.responseData.dataList;       
        this.subLoaderBatchAssets = false;
      }else{
        this.commonService.openToastErrorMessage("Failed fetch List Of Batch");
        this.subLoaderBatchAssets = false;
      }
    }
  );

  }

  nextPage() { 
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
    this.batchHdrModel.pageNumber = 0;
    this.batchHdrModel.columnName = event.active;
    this.batchHdrModel.direction = event.direction;
    this.fetchList();
  }

  selectBatch(element){
    if(this.selectedItem == element.batchHdrId){
      this.selectedItem = 0;
    }
    else{
      this.selectedItem = element.batchHdrId;
    }
  }
}
