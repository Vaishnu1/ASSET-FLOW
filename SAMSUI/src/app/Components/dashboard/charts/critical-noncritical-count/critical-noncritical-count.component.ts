import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';

@Component({
  selector: 'app-critical-noncritical-count',
  templateUrl: './critical-noncritical-count.component.html',
  styleUrls: ['./critical-noncritical-count.component.css']
})
export class CriticalNoncriticalCountComponent implements OnInit {

  assetCriticalCount: number=0;
  assetNonCriticalCount: number=0;
  option: any;
  displayList

  constructor(public dialogRef: MatDialogRef<CriticalNoncriticalCountComponent>,
              @Inject(MAT_DIALOG_DATA) private data,private commonService: CommonService,
              public assetOptimaConstants: AssetOptimaConstants) { }


  ngOnInit() {
    this.fetchListOfCriticalAndNonAssets();
  }

  fetchListOfCriticalAndNonAssets(){
    this.commonService.commonGetService('fetchListOfAssetByStatus.sams', this.data.locationId.toString(),this.data.assetStatus,this.data.locationList).subscribe(
      dataValue => {
          if (dataValue.success) {
            this.assetCriticalCount=dataValue.responseData.dataList[0].assetCriticalCount;
            this.assetNonCriticalCount=dataValue.responseData.dataList[0].assetNonCriticalCount;
            this.option = this.getChartOptions();
          }
      }
  );
  }

  getChartOptions(){
    let chartOption = {
        title: {
          text: this.data.title
        },
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
            data: ['CRITICAL','NON CRITICAL']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            barWidth: '30%',
            data: [this.assetCriticalCount,this.assetNonCriticalCount],
            type: 'bar'
        }]
    };
      return chartOption;
  }

  closeCriticalModal(){
    this.dialogRef.close();
  }

  onChartClick(event){
    console.log(event);
    
  }
}
