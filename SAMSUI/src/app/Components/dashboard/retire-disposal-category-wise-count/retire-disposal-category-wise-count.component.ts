import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { RetireDisposalSubCategoryWiseCountComponent } from '../retire-disposal-sub-category-wise-count/retire-disposal-sub-category-wise-count.component';
import { allAssetRetirmentStatus } from 'src/app/Constants/AllStatusConstants';

@Component({
  selector: 'app-retire-disposal-category-wise-count',
  templateUrl: './retire-disposal-category-wise-count.component.html',
  styleUrls: ['./retire-disposal-category-wise-count.component.css']
})
export class RetireDisposalCategoryWiseCountComponent implements OnInit {

  option: any;
  responseArrayData: any;
  arrName: any;
  arrValue: any;
  optionData: any;
  header: string='';

  constructor(public dialogRef: MatDialogRef<RetireDisposalCategoryWiseCountComponent>,
              private commonService: CommonService,
              @Inject(MAT_DIALOG_DATA) private data,
              private assetOptimaConstants: AssetOptimaConstants,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.header=this.data.title;
    this.fetchCategoryWiseCountForRetireDispose();
  }

  closeCategoryModal(){
    this.dialogRef.close();
  }

  fetchCategoryWiseCountForRetireDispose(){
    this.commonService.commonGetService('fetchCategoryWiseCountForRetireDispose.sams',this.data.locationId.toString(),
    allAssetRetirmentStatus[this.data.status.toString()],this.data.year.toString(),this.data.locationList).subscribe(
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
 
  assetsubCategoryBased;
  onChartClick(event){
    this.assetsubCategoryBased = this.dialog.open(RetireDisposalSubCategoryWiseCountComponent, {
      width: '60%',
      height: '500px',
      position: { top: '10%', left: '47%' },
      data: {
        'category': event.name,
        'title': 'Sub Category count for ' + event.name,
        'status': this.data.status,
        'year': this.data.year,
        'locationId':this.data.locationId,
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

  ngOnDestroy() {
    if(this.assetsubCategoryBased != null){
      this.assetsubCategoryBased.close();
    }
  }

}
