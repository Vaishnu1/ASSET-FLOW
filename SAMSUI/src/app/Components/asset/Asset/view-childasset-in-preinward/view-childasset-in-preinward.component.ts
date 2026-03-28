import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {   MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/Services/common-service/common.service';

@Component({
  selector: 'app-view-childasset-in-preinward',
  templateUrl: './view-childasset-in-preinward.component.html',
  styleUrls: ['./view-childasset-in-preinward.component.css']
})
export class ViewChildassetInPreinwardComponent implements OnInit {

  childAssetDisCol = ['sno', 'modelName', 'manufacturerName'];

  addChildAssetDataSource = new MatTableDataSource<any>();

  constructor(public dialogRef: MatDialogRef<ViewChildassetInPreinwardComponent>,
              @Inject(MAT_DIALOG_DATA) private data, private commonService: CommonService) { }

  ngOnInit() {
    this.addChildAssetDataSource.data=[];
    this.fetchChildAsset();
  }

  cancel() {
    this.dialogRef.close();
  }

  fetchChildAsset(){
    this.commonService.commonGetService('showChildAssetAddedInPreInw.sams', this.data.preInwDtlId).subscribe(
      data => {
        if (data.success) {
          this.addChildAssetDataSource.data = data.responseData;
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }
    );
  }

}
