import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { WinByModelComponent } from '../win-by-model/win-by-model.component';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { Title } from '@angular/platform-browser';
//import { $ } from 'protractor';

@Component({
  selector: 'app-win-by-category',
  templateUrl: './win-by-category.component.html',
  styleUrls: ['./win-by-category.component.css']
})
export class WinByCategoryComponent implements OnInit {

  public assetCategoryList: assetCategory[];
  public previousIndex = -1;

  displayedColumns = ['sNo', 'category', 'count', 'value'];

  public frame2Data = { 'locationId': 0, 'status': '', 'category': '', 'categoryId': 0 };

  constructor(private matDialogRef: MatDialogRef<WinByCategoryComponent>,
              private commonService: CommonService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
    this.frame2Data = this.data;
    this.loadAssetCategory();
  }

  loadAssetCategory() {

    this.commonService.commonGetService('fetchAssetDtlsByCategory.sams', this.data.locationId, this.data.status).subscribe(
      data => {
        if (data.success) {
          this.assetCategoryList = data.responseData;
        }
      }
    );
  }


  loadModelDetails(index, categoryId,category) {
    this.frame2Data.category = category;
    this.frame2Data.categoryId = categoryId;
    this.previousIndex = index;
    let dialog = this.dialog.open(WinByModelComponent, {
      width: '37%',
      height: '69%',
      position: { top: '10%', left: '32%' },
      data: this.frame2Data,
      panelClass: 'custom-dialog-container-dashboard'
    });

  }

  

  cancel() {
    this.matDialogRef.close();
  }


}

class assetCategory {
  category?: string;
  categoryId?: number;
  count?: string;
  value?: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

