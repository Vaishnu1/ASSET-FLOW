import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-retire-disposal-sub-category-wise-count',
  templateUrl: './retire-disposal-sub-category-wise-count.component.html',
  styleUrls: ['./retire-disposal-sub-category-wise-count.component.css']
})
export class RetireDisposalSubCategoryWiseCountComponent implements OnInit {

  option: any;
  responseArrayData: any;
  arrName: any;
  arrValue: any;
  optionData: any;
  header: string='';

  constructor(public dialogRef: MatDialogRef<RetireDisposalSubCategoryWiseCountComponent>,
              private commonService: CommonService,
              @Inject(MAT_DIALOG_DATA) private data,
              private assetOptimaConstants: AssetOptimaConstants,
              private router: Router) { }

  ngOnInit() {
    this.header = this.data.title;
    this.fetchSubCategoryWiseCountForRetireDispose();
  }

  closeSubCategoryModal(){
    this.dialogRef.close();
  }
   
  fetchSubCategoryWiseCountForRetireDispose(){
    this.commonService.commonGetService('fetchSubCategoryWiseCountForRetireDispose.sams', this.data.locationId.toString(),
    this.data.status.toString(),this.data.category.toString(),this.data.year.toString(),this.data.locationList).subscribe(
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

  onChartClick(event){
    localStorage.setItem('locationId', this.data.locationId);
    localStorage.setItem('locationName', this.data.locationName);

    this.router.navigate(['home/asset/assetRetirement/' +this.data.status+ '/' +this.data.category + '/' +event.name]);
  }

}
