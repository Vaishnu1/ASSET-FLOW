import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';

@Component({
  selector: 'app-win-by-model',
  templateUrl: './win-by-model.component.html',
  styleUrls: ['./win-by-model.component.css']
})
export class WinByModelComponent implements OnInit {

  public assetByModelList: assetModelList[];
  public frame3Data = { 'locationId': 0, 'status': '', 'category': '','categoryId':0, 'modelId': 0,'model':'' };
  public previousIndex: number = -1;

  displayedColumns = ['modelName','manufacturerName', 'modelcount', 'modelvalue'];


  constructor(private matDialogRef: MatDialogRef<WinByModelComponent>,
              private commonService: CommonService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) private data) {}

  ngOnInit() {
    this.frame3Data = this.data;
    this.loadAssetByModel();
  }

  loadAssetByModel() {

    this.commonService.commonGetService('getAssetDetailsSubCategoryWise.sams', this.data.locationId, this.data.status, this.data.categoryId).subscribe(
      data => {
        if (data.success) {
          this.assetByModelList = data.responseData;
        }
      }
    );
  }
  
  cancel(){
    this.matDialogRef.close();
  }
}

class assetModelList {
  category?: string;
  count?: string;
  value?: string;
  model?: string;
  modelId?: number;
  manufacturerName?:string;
}
