import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asset-by-sub-category-v2',
  templateUrl: './asset-by-sub-category-v2.component.html',
  styleUrls: ['./asset-by-sub-category-v2.component.css']
})
export class AssetBySubCategoryV2Component implements OnInit {

  arrName = [];
  arrValue =[];
  option;
  header: string[];
  assetsubCategoryBased: any;

  constructor(@Inject(MAT_DIALOG_DATA) private data,
              public dialogRef: MatDialogRef<AssetBySubCategoryV2Component>,
              private commonService: CommonService,
              private assetOptimaConstants: AssetOptimaConstants,
              private readonly dialog: MatDialog,
              private router: Router,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
     const categoryId = this.data.assetCategoryId;
     this.header=this.data.title;
      this.fetchSubCategoryListBasedonCategory();
  
  }

  // fetchSubCategoryListBasedonCategory(){
    
  //   this.commonService.commonGetService('fetchAssetSubcategoryData.sams', 
  //           this.data.locationId.toString(), this.data.locationList, 
  //           this.data.assetCategoryId.toString()).subscribe(
  //     dataValue => {
  //         if (dataValue.success) {
  //           this.nameAndValueBuilding(dataValue.responseData.dataList);
  //           this.option = this.getChartOptions();
  //         }
  //     }
  // );
  // }

  fetchSubCategoryListBasedonCategory() {
  this.commonService
    .commonGetService(
      'fetchAssetSubcategoryData.sams',
      this.data.locationId?.toString(),
      this.data.locationList,
      this.data.assetCategoryId?.toString()
    )
    .subscribe((dataValue: any) => {
      if (dataValue.success && dataValue.responseData.subCategoryChartData) {
        const list = dataValue.responseData.subCategoryChartData;
        this.arrName = list.map((x: any) => x.label || 'N/A');
        this.arrValue = list.map((x: any) => x.value || 0);
        this.option = this.getChartOptions();
        
        setTimeout(() => {
          // this.option = this.getChartOptions();
          this.cdr.detectChanges();
        }, 500);
        
        console.log('Chart data:', this.arrName, this.arrValue);

      }
    });
}

  closeSubCategoryModal(){
    this.dialogRef.close();
  }



 getChartOptions() {
  return {
    title: {
      text: `Sub Category count for ${this.data.assetCategory}`,
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: this.arrName,
      axisLabel: {
        rotate: 25,
        fontSize: 10
      }
    },
    yAxis: {
      type: 'value',
      minInterval: 1
    },
    series: [
      {
        type: 'bar',
        barWidth: '40%',
        data: this.arrValue,
        itemStyle: {
          color: '#4169E1'
        },
        label: {
          show: true,
          position: 'top',
          fontSize: 11
        }
      }
    ]
  };
}

  openAssetViewPage(data){
    
    localStorage.setItem('locationId', this.data.locationId);
    localStorage.setItem('locationName', this.data.locationName);
  if(this.data.statusId ===0){

    this.assetsubCategoryBased = this.dialog.open(AssetBySubCategoryV2Component, {
      width: '60%',
      height: '500px',
      position: { top: '10%', left: '47%' },
      data: {
           'category': this.data.category,
           'title': 'Sub Category value for ' + this.data.category,
           'statusId': -1,
           'locationId': this.data.locationId,
           'locationName': this.data.locationName,
           'locationList': this.data.locationList,
           'year': this.data.year,
           'categoryId':this.data.categoryId,
      }
  });
  this.assetsubCategoryBased.disableClose = true;
  this.assetsubCategoryBased.afterClosed().subscribe(
      data => {
          this.ngOnInit();
      });
  
  }else if(this.data.statusId ===-1){

this.router.navigate([`home/asset/assetDash/${this.data.categoryId}/${data.name}/1/${this.data.year}`]);
  }
   else{
    this.router.navigate(['home/asset/assetList/' +data.name+ '/' +this.data.statusId + '/' + 'OWN']);   
  
  }
  
  }

  
  ngOnDestroy() {


    if (this.assetsubCategoryBased != null) {
        this.assetsubCategoryBased.close();
    }
  }

}

