import { Component, OnInit, Inject } from '@angular/core';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { SubcategoryWiseAssetInfoComponent } from '../subcategory-wise-asset-info/subcategory-wise-asset-info.component';

@Component({
  selector: 'app-category-wise-asset-info',
  templateUrl: './category-wise-asset-info.component.html',
  styleUrls: ['./category-wise-asset-info.component.css']
})
export class CategoryWiseAssetInfoComponent implements OnInit {

  option: any;
  responseArrayData: any;
  arrName: any;
  arrValue: any;
  optionData: any;
  header: string='';

  constructor(public dialogRef: MatDialogRef<CategoryWiseAssetInfoComponent>,
              private commonService: CommonService,
              @Inject(MAT_DIALOG_DATA) private data,
              private assetOptimaConstants: AssetOptimaConstants,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.header=this.data.title;
    this.fetchCategoryListBasedOnStatus();
  }

  fetchCategoryListBasedOnStatus(){
    this.commonService.commonGetService('fetchCategoryListBasedOnStatus.sams', this.data.locationId.toString(),this.data.statusId,this.data.locationList).subscribe(
      dataValue => {
          if (dataValue.success) {
            this.nameAndValueBuilding(dataValue.responseData.dataList);
            this.option = this.getChartOptions();
          }
      }
  );
  }

  nameAndValueBuilding(array){
    this.arrName = this.getArrayValueForName(array);
    this.arrValue = this.getArrayValueForValue(array);
  }

  getArrayValueForName(data){
    let res = [];
    for(let i = 0; i < data.length; i++){
      var item = data[i].category;
      res.push(item);
    }
    return res; 
  }

  getArrayValueForValue(data) {
    let res = [];
    for(let i = 0; i < data.length; i++){
      var item = data[i].count;
      res.push(item);
    }
    return res; 
  }

  closeCategoryModal(){
    this.dialogRef.close();
  }

  assetsubCategoryBased;

  onChartClick(event){
    console.log("category:",event);
    this.assetsubCategoryBased = this.dialog.open(SubcategoryWiseAssetInfoComponent, {
      width: '60%',
      height: '500px',
      position: { top: '10%', left: '47%' },
      data: {
        'category': event.name,
        'title': 'Sub Category count for ' + event.name,
        'statusId': this.data.statusId,
        'locationId': this.data.locationId,
        'locationName':this.data.locationName,
        'locationList':this.data.locationList,
      }
    });
    this.assetsubCategoryBased.disableClose = true;
    this.assetsubCategoryBased.afterClosed().subscribe(
      data => {
        this.ngOnInit();
      }); 
  }

  getChartOptions(){
    let chartOption = {
        tooltip : {
            trigger: 'axis',
            axisPointer : {            
                type : 'shadow'     
            }
        }, 
        grid: {
          left: '2%',
          right: '3%',
          bottom: '2%',
          containLabel: true
      },
        xAxis: {
            type: 'category',
            data: this.arrName
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            barWidth: '30%',
            data: this.arrValue,
            label: {
              normal: {
                  show: true,
                  position: 'inside'
              }
            },
            type: 'bar'
        }]
    };
      return chartOption;
  }

  ngOnDestroy() {
    if(this.assetsubCategoryBased != null){
      this.assetsubCategoryBased.close();
    }
  }

}
