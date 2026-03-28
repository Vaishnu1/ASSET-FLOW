import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { Model } from 'src/app/Model/master/model';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';

@Component({
  selector: 'app-model-history',
  templateUrl: './model-history.component.html',
  styleUrls: ['./model-history.component.css']
})
export class ModelHistoryComponent implements OnInit {

  model : Model;

  displayedColumns = ['sno','modelNo','modelName','assetCategoryName', 'subCategoryName','manufacturerName',
                      'active','createdBy','createdDt','updatedBy','updatedDt'];

  modelAuditList = [];

  //COMMON HINT MESSAGE
  CommonhintMsg = new CommonHint();

  //LOADER
  subLoader: boolean = false;

  //For Pagination
  length: String = '0';     //set total record count here
  pageIndex: String;  //set page number starts with zeroo
  pageSize: String;   // records per page


  constructor(private commonService: CommonService,
    private dialogRef: MatDialogRef<ModelHistoryComponent>, @Inject(MAT_DIALOG_DATA) private data,
    private assetOptimaServices: AssetOptimaServices,
    private cdr: ChangeDetectorRef) {
      this.model = new Model();
      this.pageSize = '100';
      this.pageIndex = '0';
     }

  ngOnInit() {
    this.model.direction = 'desc';
    this.model.columnName = 'updatedDt';
    this.model.modelId=this.data.modelId
    this.getList();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  exit(){
    this.dialogRef.close();
  }

  getServerData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getList();
  }

  getIndexValue(index: number): number {
    index = Number(this.pageSize) * Number(this.pageIndex) + index;
    return index;
  }

  customSort(event) {
    this.model.pageNumber = 0;
    this.model.columnName = event.active;
    this.model.direction = event.direction;
    this.getList();
  }

  getList() {
    this.modelAuditList = [];
    this.model.pageNumber = Number(this.pageIndex);
    this.model.recordsPerPage = Number(this.pageSize);
    this.subLoader =true;
    this.commonService.commonListService(this.assetOptimaServices.fetchListOfModelHistory,this.model).subscribe(
      data => {
        if(data.success){
          this.subLoader =false;
          this.length = data.responseData.dataTotalRecCount;
          this.modelAuditList = data.responseData.dataList;
        }else{
          this.subLoader =false;
        }
      },error =>{
        this.subLoader =false;
      }
    );
}

generateModelAuditReport(){
  this.commonService.commonListService(this.assetOptimaServices.generateModelAuditReport, this.model).subscribe(
    (data) => {
      this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      this.dialogRef.close();
    }, error => {
      this.dialogRef.close();
    }
  );
}

}
