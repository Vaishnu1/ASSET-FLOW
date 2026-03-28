import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-comparison-bm3months',
  templateUrl: './comparison-bm3months.component.html',
  styleUrls: ['./comparison-bm3months.component.css']
})
export class ComparisonBm3monthsComponent implements OnInit {

  @Input() parentData: any;
  @Input() resetFormSubject: Subject<boolean> = new Subject<boolean>();
  option: any;
  arrName = [];
  arrValue =[];
  theme:string;

  constructor(private commonService: CommonService,
    private assetOptimaConstants: AssetOptimaConstants) { }

  ngOnInit() {
    
    this.resetFormSubject.subscribe(response => {
      if(response){
        this.theme =localStorage.getItem('theme');
        this.loadBreakdownFor3Months();
      }
    });
  }

  loadBreakdownFor3Months() {
    this.commonService.commonGetService('fetchListOfBreakDownFor3Month.sams', this.parentData.locationId.toString(),this.parentData.locationList).subscribe(
      data => {
        if (data.success) {
           this.nameAndValueBuilding(data.responseData.dataList);
          this.option = this.getChartOptions();
        }
      }
    );

    this.option = this.getChartOptions();
  }

  nameAndValueBuilding(array){
    this.arrName = this.getArrayValueForName(array);
    this.arrValue = this.getArrayValueForValue(array);
  }

  getArrayValueForName(data){
    let res = [];
    for(let i = 0; i < data.length; i++){
      var item = data[i].month;
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

  getChartOptions() {
    let chartOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        data: this.arrName
      },
      yAxis: {
        type: 'value',
        minInterval: 1//Show only integers
      },
      series: [{
        data: this.arrValue,
        type: 'line',
        symbol: 'circle',
        symbolSize: 15,
        lineStyle: {
          normal: {
            color: '#001a4d',
            width: 4,
            type: 'solid'
          }
        },
        itemStyle: {
          normal: {
            borderWidth: 2,
            borderColor: '#e60000',
            color: '#e60000'
          }
        }
      }]
    };
    return chartOption;
  }

}