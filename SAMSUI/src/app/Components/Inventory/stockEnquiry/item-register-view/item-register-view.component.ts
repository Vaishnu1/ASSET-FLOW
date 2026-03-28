import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ItemTransactionModel } from 'src/app/Model/inventory/itemTransaction';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-item-register-view',
  templateUrl: './item-register-view.component.html',
  styleUrls: ['./item-register-view.component.css']
})
export class ItemRegisterViewComponent implements OnInit {
  displayedColumnsItemRegister = ['sno','transactionNo', 'transDtDisp','transactionDesc','inQty','outQty','balanceQty'];
  ItemRegisterMainDataSource = new MatTableDataSource<ItemRegisterViewComponent>();
  itemRegisterViewForm: FormGroup;
  //For Pagination
  length: String = '0';     //set total record count here 
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page
  public itemTransactionModel: ItemTransactionModel;

  constructor(private activatedRoute: ActivatedRoute,
    private assetOptimaServices:AssetOptimaServices,
    private commonService:CommonService,
    private location: Location) {
      this.pageSize = '100';
      this.pageIndex = '0';
      this.itemTransactionModel = new ItemTransactionModel();
     }

  ngOnInit() {
    this.itemRegisterViewForm = new FormGroup({
      itemId : new FormControl(0),
      itemCd : new FormControl(""),
      itemDesc: new FormControl(""),
      storeId : new FormControl(0),
      locationId: new FormControl(0),
      orgId: new FormControl(0),
      storeName: new FormControl(""),
      uomCd: new FormControl(""),
      stkInHand : new FormControl(""),
      acceptQty : new FormControl(""),
      rejectQty : new FormControl(""),
      oemCode : new FormControl("")
      
    });
    
    this.passPrimaryKey();
  }

  passPrimaryKey(){
    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        primaryId =Number(primaryId);

        if(primaryId <= 0){
        }else{
          this.commonService.commonGetService('loadItemStockInformation.sams',primaryId).subscribe(
            data => {

              this.itemRegisterViewForm.patchValue(data.responseData);
            }
          )
          this.fetchListofItemRegister(primaryId);
        }
      }
  );
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }
  fetchListofItemRegister(primaryId){
    this.itemTransactionModel.pageNumber = Number(this.pageIndex);
    this.itemTransactionModel.recordsPerPage = Number(this.pageSize);
    this.itemTransactionModel.itemId = Number(primaryId);
    this.commonService.commonListService(this.assetOptimaServices.listOfItemTransaction,this.itemTransactionModel).subscribe(
      data => {
        if(data.success){
           this.length = data.responseData.dataTotalRecCount;
           this.ItemRegisterMainDataSource = data.responseData.dataList;
        }
      }
    );
   
  }
  
  back() {
    this.location.back();
  }

  customSort(event){
    
  }

}
