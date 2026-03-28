import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { CommonService } from 'src/app/Services/common-service/common.service';

@Component({
  selector: 'app-select-retired-disposed-option',
  templateUrl: './select-retired-disposed-option.component.html',
  styleUrls: ['./select-retired-disposed-option.component.css']
})
export class SelectRetiredDisposedOptionComponent implements OnInit {

  arrName: any;
  arrValue: any;
  optionData: any;
  headingDisplay:String = '';
  statusName: string = '';

  constructor(public dialogRef: MatDialogRef<SelectRetiredDisposedOptionComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              public assetOptimaConstants: AssetOptimaConstants,
              public commonService: CommonService) { }

  ngOnInit() {
    if(this.data.assetStatus==4){
      this.statusName = 'Disposed'
    }else{
      this.statusName = 'Retired';
    }
    this.headingDisplay = this.statusName + ' count for financial year - ' +  this.data.financialYr;
   //  this.fetchListOfAllAssetsBasedOnMonth();
  }

  closeMonthWise(){
    this.dialogRef.close();
  }

  fetchListOfAllAssetsBasedOnMonth(){
    this.commonService.commonGetService('fetchListOfAllAssetsBasedOnMonth.sams', this.data.locationId.toString(),
    this.data.assetStatus,this.data.financialYr,this.assetOptimaConstants.fyStartYear,
    this.assetOptimaConstants.fyEndYear).subscribe(
      data => {
        if (data.success) {
           this.nameAndValueBuilding(data.responseData.dataList);
           this.optionData = this.getChartOptions();
       }
      }
    );
  }

  nameAndValueBuilding(data){
    this.arrName = this.getArrayValueForName(data);
    this.arrValue = this.getArrayValueForValue(data);
  }

  getArrayValueForName(data){
    let res = [];
    for(let i = 0; i < data.length; i++){
      var item = data[i].month+data[i].year;
      res.push(item);
    }
    return res; 
  }

  getArrayValueForValue(data){
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

  onChartClick(data){
    
  }

}
