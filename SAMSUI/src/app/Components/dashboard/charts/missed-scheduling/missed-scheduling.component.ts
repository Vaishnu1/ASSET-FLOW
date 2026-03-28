import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-missed-scheduling',
  templateUrl: './missed-scheduling.component.html',
  styleUrls: ['./missed-scheduling.component.css']
})
export class MissedSchedulingComponent implements OnInit {

  @Input() parentData: any;
  @Input() resetFormSubject: Subject<boolean> = new Subject<boolean>();
  onedayMissedScheduling: number = 0;
  twodayMissedScheduling: number = 0;
  threedayMissedScheduling: number = 0;
  fourdayMissedScheduling: number = 0;
  fiveGreaterdayMissedScheduling: number = 0;
  option: any;
  theme: string;
  onedayScheduled: number = 0;
  twodayScheduled: number = 0;
  threedayScheduled: number = 0;
  fourdayScheduled: number = 0;
  fiveGreaterdayScheduled: number = 0;

  displayedColumns = ['sno', 'assetCode', 'desc','department','lastPMDate','nextPMDate','scheduleStatus','daysOverDue'];
  missedScheduleSource:any = [];
  length: string = '0'; 

  constructor(private commonService: CommonService,
    private assetOptimaConstants: AssetOptimaConstants) { }

  ngOnInit() {

    this.resetFormSubject.subscribe(response => {
      if (response) {
        this.theme = localStorage.getItem('theme');
        // this.loadMissedScheduling();
        this.loadAssetMissedScheduling();
      }
    });
  }

  loadMissedScheduling() {
    this.commonService.commonGetService('fetchListOfMissedPmSchedule.sams', this.parentData.locationId.toString(), this.parentData.locationList).subscribe(
      data => {
        if (data.success) {
          let missedMaintenanceScheduling = data.responseData.dataList;
          this.onedayMissedScheduling = missedMaintenanceScheduling[0].interval1Count;
          this.twodayMissedScheduling = missedMaintenanceScheduling[0].interval2Count;
          this.threedayMissedScheduling = missedMaintenanceScheduling[0].interval3Count;
          this.fourdayMissedScheduling = missedMaintenanceScheduling[0].interval4Count;
          this.fiveGreaterdayMissedScheduling = missedMaintenanceScheduling[0].interval5Count;
          this.option = this.getChartOptions();
        }
      }
    );
  }

    loadAssetMissedScheduling() {
    this.commonService.commonGetService('fetchAssetListOfMissedSchedule.sams', this.parentData.locationId.toString(), this.parentData.locationList).subscribe(
      data => {
        if (data.success) {
          this.missedScheduleSource = data.responseData.dataList;
          this.length = this.missedScheduleSource.length;
        }
      }
    );
  }

  // getChartOptions() {
  //   let chartOption = {
  //     tooltip: {
  //       trigger: 'item',
  //       formatter: "{a} <br/>{b} : {c} ({d}%)"
  //     }, toolbox: {
  //       show: true,
  //       feature: {
  //         restore: { show: true, title: 'Refresh' },
  //         saveAsImage: { show: true, title: 'Download' }
  //       }
  //     },
  //     legend: {
  //       bottom: 10,
  //       left: 'center',
  //       data: ['1 day', '2 days', '3 days', '4 days', '> 5 days']
  //     },
  //     series: [
  //       {
  //         name: '',
  //         type: 'pie',
  //         radius: '65%',
  //         center: ['50%', '50%'],
  //         selectedMode: 'single',
  //         data: [
  //           { value: this.onedayMissedScheduling, name: '1 day' },
  //           { value: this.twodayMissedScheduling, name: '2 days' },
  //           { value: this.threedayMissedScheduling, name: '3 days' },
  //           { value: this.fourdayMissedScheduling, name: '4 days' },
  //           { value: this.fiveGreaterdayMissedScheduling, name: '> 5 days' }
  //         ],
  //         itemStyle: {
  //           emphasis: {
  //             shadowBlur: 10,
  //             shadowOffsetX: 0,
  //             shadowColor: 'rgba(0, 0, 0, 0.5)'
  //           }
  //         }
  //       }
  //     ]
  //   };
  //   return chartOption;
  // }

  

  getChartOptions() {
  const categories = ['1 Day', '2 Days', '3 Days', '4 Days', '>5 Days'];

  // Example cumulative data
  // const started = [this.onedayMissedScheduling, 0, 0, 0, 0];  // cumulative
  const delayed = [this.onedayMissedScheduling, this.twodayMissedScheduling, this.threedayMissedScheduling, this.fourdayMissedScheduling, this.fiveGreaterdayMissedScheduling];  // cumulative

  return {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Missed PM']
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: categories
    },
    yAxis: {
      type: 'value',
      interval: 1, 
      name: 'No. of SRs'
    },
    series: [
      // {
      //   name: 'Started On Time',
      //   type: 'line',
      //   smooth: true,
      //   data: started,
      //   lineStyle: {
      //     width: 3,
      //     color: '#28a745' // green
      //   }
      // },
      {
        name: 'Missed PM',
        type: 'line',
        // smooth: true,
        data: delayed,
        lineStyle: {
          width: 3,
          color: '#dc3545' // red
        }
      }
    ]
  };
}

}
