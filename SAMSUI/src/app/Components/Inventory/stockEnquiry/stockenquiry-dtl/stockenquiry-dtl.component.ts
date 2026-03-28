import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { StockenquiryListComponent } from '../stockenquiry-list/stockenquiry-list.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource, } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, } from '@angular/material/sort';
import { StockEnquiryModel } from 'src/app/Model/inventory/stockEnquiry';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { ItemTransactionModel } from 'src/app/Model/inventory/itemTransaction';

@Component({
  selector: 'app-stockenquiry-dtl',
  templateUrl: './stockenquiry-dtl.component.html',
  styleUrls: ['./stockenquiry-dtl.component.css']
})
export class StockenquiryDtlComponent implements OnInit {
  displayedColumns = ['sno','poNo', 'doNo','suppName','itemCd','itemDesc', 'makerPartCode','uomCd','storeName','stkInHand','acceptQty','rejectQty'];
  displayedColumnsItemRegister = ['sno','itemCd','itemDesc', 'transDtDisp','transactionDesc','inQty','outQty','balanceQty'];
  //dataSource = ELEMENT_DATA;
  stockEnquiryDtlMainDataSource = new MatTableDataSource<StockenquiryDtlComponent>();
  ItemRegisterMainDataSource = new MatTableDataSource<StockenquiryDtlComponent>();
   //FOR VIEW
   viewData : any;
   @Input() itemId;
   @Input() storeName;

   itemRegisterFlag :boolean = false;
   subLoaderStockEnquirtDtl : boolean = false;

   scrollItemCategorysync : boolean = false;
   scrollStoreNamesync : boolean = false;

   limitCount : any;
   
  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page

  itemCategoryPageNumber : number;

  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public stockEnquiryModel: StockEnquiryModel;
  public itemTransactionModel: ItemTransactionModel;
  searchvalue : any = '';

  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<StockenquiryDtlComponent>,
    private assetOptimaServices:AssetOptimaServices,
    private commonService:CommonService) {
      this.pageSize = '100';
      this.pageIndex = '0';
      this.stockEnquiryModel = new StockEnquiryModel();
      this.itemTransactionModel = new ItemTransactionModel();
     }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.fetchListofStockEnquiryDtl();
    this.fetchListofItemRegister();
  }
  getServerData(event) {    
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchListofStockEnquiryDtl();
  }
  
  onSearchChange(searchValue : string ) {      
    this.stockEnquiryModel.itemCd = searchValue;
    this.pageSize='100';
    this.pageIndex='0';
    this.fetchListofStockEnquiryDtl();
  }
  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }
  
  customSort(event) {
    this.stockEnquiryModel.pageNumber = 0;
    this.stockEnquiryModel.columnName = event.active;
    this.stockEnquiryModel.direction = event.direction;
    this.fetchListofStockEnquiryDtl();
  }
  closeModal() {
    this.dialogRef.close();
  }
  fetchListofStockEnquiryDtl(){
    this.subLoaderStockEnquirtDtl = true;
    this.stockEnquiryModel.pageNumber = Number(this.pageIndex);
    this.stockEnquiryModel.recordsPerPage = Number(this.pageSize);
    this.stockEnquiryModel.itemId = Number(this.data.itemId);
    this.stockEnquiryModel.storeName = this.data.storeName;
    this.commonService.commonListService(this.assetOptimaServices.listOfStockEnquiryDtl,this.stockEnquiryModel).subscribe(
      data => {
        if(data.success){
           this.length = data.responseData.dataTotalRecCount;
           this.stockEnquiryDtlMainDataSource = data.responseData.dataList;
        }
      }
    );
   this.subLoaderStockEnquirtDtl = false;
  }
  fetchListofItemRegister(){
    this.itemTransactionModel.pageNumber = Number(this.pageIndex);
    this.itemTransactionModel.recordsPerPage = Number(this.pageSize);
    this.itemTransactionModel.itemId = Number(this.data.itemId);
    this.commonService.commonListService(this.assetOptimaServices.listOfItemTransaction,this.itemTransactionModel).subscribe(
      data => {
        if(data.success){
           this.length = data.responseData.dataTotalRecCount;
           this.ItemRegisterMainDataSource = data.responseData.dataList;
        }
      }
    );
   
  } 

  
}
