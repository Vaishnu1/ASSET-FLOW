import {Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, } from '@angular/material/paginator';
import {  MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ItemCategoryCreateComponent } from 'src/app/Components/Dialog-Components/item/item-category-create/item-category-create.component';
import { ItemCategoryModel } from 'src/app/Model/master/item-category';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { Router } from '@angular/router';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styleUrls: ['./item-category.component.css']
})
export class ItemCategoryComponent implements OnInit {

  displayedColumns = ['sno', 'categoryName','updatedBy','updatedDt','createdBy','createdDt','action'];
  itemCategorydataSource :any;
  searchvalue : any = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  tempViewData: any;
  length: string ='0';

  pageSize: string;
  pageIndex: string;
  direction: any;
  columnName: any;

  //LOADER
  subLoaderItemCategory: boolean = false;

    //PERMISSIONS 
    modelAccessModule: ModuleAccessModel;
  
  public ItemCategoryModel: ItemCategoryModel;
  constructor(private dialog: MatDialog, private router: Router,
    private commonService:CommonService,
    private assetOptimaServices:AssetOptimaServices,
    private assetOptimaConstants: AssetOptimaConstants,
    private userSession: UserSessionService) {
    this.ItemCategoryModel = new ItemCategoryModel();
    this.pageSize = '100';
    this.pageIndex = '0';
    this.modelAccessModule=new ModuleAccessModel();
              }

  ngOnInit() {
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_ITEM_CATEGORY'];
    this.ItemCategoryModel.direction = 'desc';
    this.ItemCategoryModel.columnName = 'updatedDt';
    this.pageIndex = '0';
    this.fetchList();
  }
  onSearchChange(searchValue : string ) {  
    this.ItemCategoryModel.categoryName = searchValue;
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
  }

  itemType;
  openItemCategoryDialog(itemCategoryModel) {
    this.itemType = this.dialog.open(ItemCategoryCreateComponent, {
      height: 'auto',
      width: '500px',
      data:{
        'ItemCategoryModel' : itemCategoryModel
      }
    });
    this.itemType.disableClose = true;
    this.itemType.afterClosed().subscribe(
      data => {
        this.ngOnInit();
      });
  }

  ngOnDestroy() {
    if(this.itemType!=null){
        this.itemType.close();
    }
  }
  
  listOfItemCategory(){
    this.ItemCategoryModel.pageNumber = Number(this.pageIndex);
    this.ItemCategoryModel.recordsPerPage = Number(this.pageSize);
    this.ItemCategoryModel.direction = 'desc';
    this.ItemCategoryModel.columnName = 'updatedDt'
    this.commonService.commonListService(this.assetOptimaServices.listOfAllItemCategory,this.ItemCategoryModel).subscribe(
      data => {
        if(data.success){
           this.length = data.responseData.dataTotalRecCount;
           this.itemCategorydataSource = data.responseData.dataList;
        }
      }
    );
   
  }

  openViewDialog(templateRef: any, event, _index) {
    this.tempViewData = event;
    this.dialog.open(templateRef);
  }

  nextPage(pageNuber: number) {

  }
  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.listOfItemCategory();
  }
  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  customSort(event) {
    this.ItemCategoryModel.pageNumber = 0;
    this.ItemCategoryModel.columnName = event.active;
    this.ItemCategoryModel.direction = event.direction;
    this.fetchList();
  }
  fetchList(){
    this.ItemCategoryModel.pageNumber = Number(this.pageIndex);
    this.ItemCategoryModel.recordsPerPage = Number(this.pageSize);
    this.itemCategorydataSource=[];
    this.subLoaderItemCategory=true;
    this.commonService.commonListService(this.assetOptimaServices.fetchListOfAllItemCategory,this.ItemCategoryModel).subscribe(
      data => {
        if(data.success){
           this.subLoaderItemCategory=false;
           this.length = data.responseData.dataTotalRecCount;
           this.itemCategorydataSource = data.responseData.dataList;       
           }else{
             this.subLoaderItemCategory=false;
           }
      }, error =>{
        this.subLoaderItemCategory=false;
      }
  
    );
   }
}
