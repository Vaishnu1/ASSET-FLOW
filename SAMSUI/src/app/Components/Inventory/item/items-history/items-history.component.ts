import { Component, Inject, OnInit, ViewChild,Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StockEnquiryModel } from 'src/app/Model/inventory/stockEnquiry';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-items-history',
  templateUrl: './items-history.component.html',
  styleUrls: ['./items-history.component.css']
})
export class ItemsHistoryComponent implements OnInit {
  

  displayedColumns = ['sno' , 'poNo', 'doNo', 'itemName', 'storeName', 'unitPrice', 'avilableQty', 'transactionSrc', 'remarks', 'updatedBy', 'updatedDt'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  stockEnquiryModel: StockEnquiryModel;
  length: any;
  pageSize: any;
  pageIndex: any;
  subLoaderItemHistory: boolean = false;
  itemHistoryDataSource = new MatTableDataSource<ItemsHistoryComponent>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<ItemsHistoryComponent>,
    private commonService: CommonService,
  ) {
    this.stockEnquiryModel = new StockEnquiryModel();
    this.pageSize = '100';
    this.pageIndex = '0';
   }

  ngOnInit() {
    this.fetchListofStockEnquiryDtl();
  }

  closeModal() {
    this.dialogRef.close();
  }


  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  fetchListofStockEnquiryDtl(){
    this.subLoaderItemHistory = true;

    this.stockEnquiryModel.pageNumber = Number(this.pageIndex);
    this.stockEnquiryModel.recordsPerPage = Number(this.pageSize);
    this.stockEnquiryModel.itemId = Number(this.data.itemId);
    this.commonService.commonListService('fetchListOfinventoryAuditTODetails.sams',this.stockEnquiryModel).subscribe(
      data => {
        if(data.success){
           this.length = data.responseData.dataTotalRecCount;
           this.itemHistoryDataSource = data.responseData.dataList;
        }
      }
    );
   this.subLoaderItemHistory = false;
  }

}
