import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { getData } from 'src/app/Model/common/fetchListData';
import { GRNHdrModel } from 'src/app/Model/inventory/grnHdr';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-acc-grn-list',
  templateUrl: './acc-grn-list.component.html',
  styleUrls: ['./acc-grn-list.component.css']
})
export class AccGrnListComponent implements OnInit {

  displayedColumns = ['select','grnNo','createdDtDisp', 'supplierName','supplierSiteName','doNo','createdBy'];
  grnDataSource = [];
  
  //For Pagination
  length: String = '0'; 

  subLoaderGrn:boolean = false;
  public grnHdrModel: GRNHdrModel;
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page
  getData: getData;

  title = 'GRN List';

  enableActionBtn: boolean=true;
  selectAllGRN: boolean = false;

  selectedItem : any = 0;
  
  constructor(public dialogRef: MatDialogRef<AccGrnListComponent>,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) private data,
              private commonService: CommonService,
              public assetOptimaServices: AssetOptimaServices,
              private titleService: Title,
              private readonly dialog: MatDialog,
              private userSession: UserSessionService) { 
      this.pageSize = '100';
      this.pageIndex = '0';
      this.selectedItem = '0';
      this.grnHdrModel = new GRNHdrModel();
      this.getData = new getData();
    }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.grnHdrModel.direction = 'desc';
    this.grnHdrModel.columnName = 'grnNo';
    this.grnHdrModel.supplierName = this.data.supplierInvoiceHdr.supplierName;
    this.grnHdrModel.grnStatus = 'APPROVED';
    this.fetchListOfGRN();
    this.selectedGRNList = [];
  }

  fetchListOfGRN(){
    this.subLoaderGrn = true;
    this.grnHdrModel.pageNumber = Number(this.pageIndex);
    this.grnHdrModel.recordsPerPage = Number(this.pageSize);
    this.commonService.commonListService('fetchListOfAllGrn.sams',this.grnHdrModel).subscribe(
      data => {
        if(data.success){
           this.length = data.responseData.dataTotalRecCount;
           this.grnDataSource = data.responseData.dataList;

        }
      }
    );
    this.subLoaderGrn = false;
  }

  selectedGRNList=[];
  selectGRN(element){
    const indentId = this.selectedGRNList.findIndex(data => data.grnId === element.grnId);
      
    this.enableActionBtn = false;
    if(indentId === -1){
      this.selectedGRNList.push(element);  
    }else{ 
      this.selectedGRNList.splice(indentId,1);   
    }

    if(this.selectedGRNList.length === 1){
      this.enableActionBtn = false;
    } else{
      this.enableActionBtn = true;
      
    }

    if(this.selectedGRNList.length > 0) {
      this.selectedItem = 1;
    } else {
      this.selectedItem = 0;
    }
  }

  selectAllGRNLists(event){
    this.selectAllGRN = event.checked;
      this.enableActionBtn = false;
  
      if(event.checked){
        this.selectedGRNList = this.grnDataSource;
      } else{
        this.selectedGRNList = [];
      }
  
      if(this.selectedGRNList.length === 1){
        this.enableActionBtn = false;
      } else{
        this.enableActionBtn = true;
      }

      if(this.selectedGRNList.length > 0) {
        this.selectedItem = 1;
      } else {
        this.selectedItem = 0;
      }
  }

  compareValue(element: any): boolean{
    return this.selectedGRNList.findIndex(data => data.grnId === element.grnId) !== -1;
  }
  closeModal() {
    this.dialogRef.close();
  }

  addSelectedGRN () {
    this.dialogRef.close(this.selectedGRNList);
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchListOfGRN();
  }

  customSort(event) {
    this.grnHdrModel.pageNumber = 0;
    this.grnHdrModel.columnName = event.active;
    this.grnHdrModel.direction = event.direction;
    this.fetchListOfGRN();
  }

}
