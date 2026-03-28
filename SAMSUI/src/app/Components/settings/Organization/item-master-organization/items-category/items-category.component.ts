import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { ItemCategoryModel } from 'src/app/Model/master/item-category';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { ItemsCategoryCreateComponent } from '../items-category-create/items-category-create.component';
import { getData } from 'src/app/Model/common/fetchListData';

@Component({
  selector: 'app-items-category',
  templateUrl: './items-category.component.html',
  styleUrls: ['./items-category.component.css']
})
export class ItemsCategoryComponent implements OnInit {

  displayedColumns = ['select', 'sno', 'categoryName','updatedBy','updatedDt'];
  length: string='0';
  ItemCategorydataSource: any;
  searchvalue : any = '';
  itemType: any;
  pageSize: string;
  pageIndex: string;
  direction: any;
  columnName: any;
  public ItemCategoryModel: ItemCategoryModel;
  @ViewChild(MatPaginator) paginator: MatPaginator;
    //PERMISSIONS 
    modelAccessModule: ModuleAccessModel;
     //LOADER
    subLoaderItemType: boolean = false;
    selectedItem:any = 0;

    scrollItemCategorysync : boolean = false;
    itemCategoryPageNumber : number ;
    limitCount: any;

    getData: getData;
    itemCateogoryList : any = [];

  constructor(private dialog: MatDialog,
    private commonService: CommonService,
    private samsService: AssetOptimaServices,
    private userSession: UserSessionService) { 
      this.pageSize = '100';
      this.pageIndex = '0';
      this.itemCategoryPageNumber = 1;
    this.modelAccessModule=new ModuleAccessModel();
    this.ItemCategoryModel = new ItemCategoryModel();

    this.getData = new getData();
  }

  ngOnInit(): void {
    this.selectedItem = 0;
    this.itemCategoryPageNumber = 1;
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_ITEM_CATEGORY'];
    this.ItemCategoryModel.direction = 'asc';
    this.ItemCategoryModel.columnName = 'categoryName';
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
  }

  searchItemCategory() { 
    // this.ItemCategoryModel.categoryName =  searchValue;
    this.pageSize = '100';
    this.pageIndex = '0';
    this.fetchList();
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

  fetchList(){
    this.ItemCategoryModel.pageNumber = Number(this.pageIndex);
    this.ItemCategoryModel.recordsPerPage = Number(this.pageSize);
    this.ItemCategorydataSource=[];
    this.subLoaderItemType=true;
    this.commonService.commonListService(this.samsService.listOfAllItemCategory,this.ItemCategoryModel).subscribe(
      data => {
        if(data.success){
             this.subLoaderItemType=false;
             this.length = data.responseData.dataTotalRecCount;
             this.ItemCategorydataSource = data.responseData.dataList;       
           }else{
             this.subLoaderItemType=false;
           }
      },error =>{
            this.subLoaderItemType=false;
       }
  
    );
   }

   itemCategoryModel ;
   openItemCategoryCreate(mode,itemCategoryModel) {
    this.itemCategoryModel = this.dialog.open(ItemsCategoryCreateComponent, {
      height: '350px',
      width: '380px',
      data:{
        'mode':mode,
        'itemCategory' : itemCategoryModel
      }
    });
    this.itemCategoryModel.disableClose = true;
    this.itemCategoryModel.afterClosed().subscribe(
      data => {
        this.ngOnInit();
      });
  }


  customSort(event) {
    this.ItemCategoryModel.pageNumber = 0;
    this.ItemCategoryModel.columnName = event.active;
    this.ItemCategoryModel.direction = event.direction;
    this.fetchList();
  }

  selectItemCategory(element){
    if(this.selectedItem.categoryId == element.categoryId){
      this.selectedItem = 0;
    }else{
      this.selectedItem = element;
    }
  }

  listofItemCategory(searchTerms) {
    this.scrollItemCategorysync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults(this.samsService.listOfItemCategoryCombo, searchTerms.term, '', '', this.limitCount, this.itemCategoryPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.itemCategoryPageNumber , this.itemCateogoryList , data.responseData.comboList)
        this.itemCategoryPageNumber = this.getData.pageNumber;
        this.itemCateogoryList = this.getData.dataList;
        this.scrollItemCategorysync = false;
      }
    );
  }

  getItemCategoryComboValue(event) {
    if (event === undefined) {
      this.itemCateogoryList = [];
      this.ItemCategoryModel.categoryName = '';
      this.ItemCategoryModel.categoryId = 0;

      this.itemCategoryPageNumber=1;
     
    } else {
      this.ItemCategoryModel.categoryName = event.categoryName;
      this.ItemCategoryModel.categoryId = event.categoryId;
    }
  }

  clear(){
    this.itemCateogoryList = [];
    this.ItemCategoryModel=new ItemCategoryModel;
    this.ngOnInit();
    this.selectedItem = 0;
  }

  generateReportForItemCategory(){
    this.commonService.commonListService(this.samsService.generateItemCategoryReport, this.ItemCategoryModel).subscribe(
      (data) => {
        this.commonService.downloadDocument(data.responseData);
        this.commonService.openToastSuccessMessage('Download Successful.');
      }, error => {
        this.commonService.openToastWarningMessage('Failed To Generate Report.');
      }
    );
  }


}
