import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { RegionWiseServicerequestComponent } from '../region-wise-sr/region-wise-servicerequest/region-wise-servicerequest.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DashBoardDurationComponent } from '../../dash-board-duration/dash-board-duration.component';

@Component({
  selector: 'app-open-srcriticality',
  templateUrl: './open-srcriticality.component.html',
  styleUrls: ['./open-srcriticality.component.css']
})
export class OpenSRCriticalityComponent implements OnInit {


  @Input() parentData: any;
  @Input() transactionSourceForAllWOType: any;
  @Input() transactionSourceForPrimitiveWOType:any;
  @Input() transactionSourceForCalibrationWOType:any;
  @Input() transactionSourceForConsumedWOType:any;
  @Input() resetFormSubject: Subject<boolean> = new Subject<boolean>();

  @Output() dateList: EventEmitter<string[]> = new EventEmitter<string[]>();
  public serviceRequestByCriticality = { 'srType': 0, 'critical': 0, 'nonCritical': 0 };

  regionBased;
  count: number=0;

  bmCriticalCount: number = 0;
  bmNonCriticalCount: number = 0;
  pmCriticalCount: number = 0;
  pmNonCriticalCount: number = 0;
  paCriticalCount: number = 0;
  paNonCriticalCount: number = 0;
  qaCriticalCount: number = 0;
  qaNonCriticalCount: number = 0;
  options : any;
  consumedInternalCount = 0;
  consumedExternalCount = 0;

  showSpinner: boolean =false;
  switchGraph: string;
  nonCritical:string;
  critical:string;

  missionCritical:string;
  patientCritical:string;
  revenueCritical:string;

  bmMissionCriticalCount: number = 0;
  pmMissionCriticalCount: number = 0;
  paMissionCriticalCount: number = 0;
  qaMissionCriticalCount: number = 0;

  bmPatientCriticalCount: number = 0;
  pmPatientCriticalCount: number = 0;
  paPatientCriticalCount: number = 0;
  qaPatientCriticalCount: number = 0;

  bmRevenueCriticalCount: number = 0;
  pmRevenueCriticalCount: number = 0;
  paRevenueCriticalCount: number = 0;
  qaRevenueCriticalCount: number = 0;

  date= [];
  fromDate:any;
  toDate:any;
  theme:string;
  

  constructor(private commonService: CommonService,
    private assetOptimaConstants: AssetOptimaConstants,
    private dialog: MatDialog,
    private readonly router: Router) {
      this.switchGraph = 'Switch Graph';
      this.nonCritical = 'NON CRITICAL';
      this.critical = 'CRITICAL';
      this.missionCritical = 'MISSION CRITICAL'
      this.patientCritical = 'PATIENT CRITICAL'
      this.revenueCritical = 'REVENUE CRITICAL'
     }

  ngOnInit() { 
    
    this.fromDate ="";
    this.toDate = "";
    this.date =[];
    this.resetFormSubject.subscribe(response => {
      if(response){ 
        
        this.fromDate ="";
        this.toDate = "";
        this.date =[];
        this.theme = localStorage.getItem('theme');
        this.loadServiceRequestByCriticality();
      }
    }); 
  }

  loadServiceRequestByCriticality() { 
    
    if (this.date.length>0){
       this.fromDate = this.date[0].fromDateForBackend;
       this.toDate = this.date[0].toDateForBackend;
    }
  if(this.transactionSourceForConsumedWOType!== undefined){
    this.transactionSourceForAllWOType = this.transactionSourceForConsumedWOType;
  }
    this.commonService.commonGetService('fetchOpenServiceRequestByCriticality.sams', 
    this.parentData.locationId.toString(),this.transactionSourceForAllWOType,this.parentData.locationList,
    this.fromDate,this.toDate ).subscribe(
      data => { 
        
        if (data.success) {
          // this.bmMissionCriticalCount = 0;
          // this.pmMissionCriticalCount = 0;
          // this.paMissionCriticalCount = 0;
          // this.qaMissionCriticalCount= 0;      
          // this.bmPatientCriticalCount= 0;
          // this.pmPatientCriticalCount= 0;
          // this.paPatientCriticalCount = 0;
          // this.qaPatientCriticalCount = 0;
          // this.bmRevenueCriticalCount = 0;
          // this.pmRevenueCriticalCount= 0;
          // this.paRevenueCriticalCount = 0;
          // this.qaRevenueCriticalCount = 0;

          this.bmCriticalCount = 0;
          this.bmNonCriticalCount =0;
          this.pmCriticalCount =0;
          this.pmNonCriticalCount =0;
          this.paCriticalCount=0;
          this.paNonCriticalCount=0;
          this.qaCriticalCount=0;
          this.qaNonCriticalCount=0;
          this.consumedInternalCount=0;
          this.consumedExternalCount=0;
          let serviceRequestList = data.responseData.dataList;
          this.count = data.responseData.dataList.length;

          for(const value of serviceRequestList){
            if(value.srType==='BM'){
              // this.bmMissionCriticalCount=value.missionCritical;
              // this.bmPatientCriticalCount=value.patientCritical;
              // this.bmRevenueCriticalCount=value.revenueCritical;
              this.bmCriticalCount=value.critical;
              this.bmNonCriticalCount=value.nonCritical;
            }else if(value.srType==='PM'){
              // this.pmMissionCriticalCount=value.missionCritical;
              // this.pmPatientCriticalCount=value.patientCritical;
              // this.pmRevenueCriticalCount=value.revenueCritical;
              this.pmCriticalCount=value.critical;
              this.pmNonCriticalCount=value.nonCritical;
            }else if(value.srType==='PA'){
              // this.paMissionCriticalCount=value.missionCritical;
              // this.paPatientCriticalCount=value.patientCritical;
              // this.paRevenueCriticalCount=value.revenueCritical;
              this.paCriticalCount=value.critical;
              this.paNonCriticalCount=value.nonCritical;
            }else if(value.srType==='QA'){
              // this.qaMissionCriticalCount=value.missionCritical;
              // this.qaPatientCriticalCount=value.patientCritical;
              // this.qaRevenueCriticalCount=value.revenueCritical;
              this.qaCriticalCount=value.critical;
              this.qaNonCriticalCount=value.nonCritical;
            } 

            if(this.transactionSourceForConsumedWOType ==="CONSUMED"){
              if(value.srType==='SPARE'){
                this.consumedExternalCount = value.totalCriNonCriCount;
              }else if(value.srType!=='SPARE'){
                this.consumedInternalCount = value.totalCriNonCriCount;
              }            
             }
          } 
 
          this.options = this.getChartOptions();
        }

      }
    );
  }

  getChartOptions(){
if(this.transactionSourceForConsumedWOType ==="CONSUMED"){
 return this.consumedChart();
}else{

  if(this.transactionSourceForPrimitiveWOType === "PRIMITIVE"){
     return this.primitiveChart();
  } else if (this.transactionSourceForCalibrationWOType === "CALIBRATION"){
    return this.calibrationChart();
  } else{ 
       
   this.showSpinner=true;
    const chartOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        bottom: 10,
        left: 'center',
        data:[this.critical,this.nonCritical]
        // data:[this.missionCritical,this.patientCritical,this.revenueCritical,this.nonCritical]
      },
      toolbox: {
        show: true,
        feature: {
          magicType: { show: true, type: ['line', 'bar'], title: this.switchGraph },
          restore: { show: true, title: 'Refresh' },
          saveAsImage: { show: true, title: 'Download' }
        }
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          data: ['BM', 'PM', 'PA', 'QA']
        }
      ],
      yAxis: [
        {
          type: 'value', 
          minInterval: 1//Show only integers
        }
      ],
      series: [
        {
          name: this.critical,
          // name: this.missionCritical,
          type: 'bar',
          data:
          [this.bmCriticalCount, this.pmCriticalCount, this.paCriticalCount, this.qaCriticalCount]
          // [this.bmMissionCriticalCount, this.pmMissionCriticalCount, this.paMissionCriticalCount, this.qaMissionCriticalCount]
          ,
          markPoint: {
            data: [
              { type: 'max' },
              { type: 'min' }
            ]
          }, markLine: {
            data: [
              { type: 'average' }
            ]
          }
        },
        // {
        //   // name: this.critical,
        //   name: this.patientCritical,
        //   type: 'bar',
        //   data:
        //   [this.bmPatientCriticalCount, this.pmPatientCriticalCount, this.paPatientCriticalCount, this.qaPatientCriticalCount]
        //   ,
        //   markPoint: {
        //     data: [
        //       { type: 'max' },
        //       { type: 'min' }
        //     ]
        //   }, markLine: {
        //     data: [
        //       { type: 'average' }
        //     ]
        //   }
        // },
        // {
        //   // name: this.critical,
        //   name: this.revenueCritical,
        //   type: 'bar',
        //   data:
        //   [this.bmRevenueCriticalCount, this.pmRevenueCriticalCount, this.paRevenueCriticalCount, this.qaRevenueCriticalCount]
        //   ,
        //   markPoint: {
        //     data: [
        //       { type: 'max' },
        //       { type: 'min' }
        //     ]
        //   }, markLine: {
        //     data: [
        //       { type: 'average' }
        //     ]
        //   }
        // },
        {
          name: this.nonCritical,
          type: 'bar',
          data: [this.bmNonCriticalCount, this.pmNonCriticalCount, this.paNonCriticalCount, this.qaNonCriticalCount],
          markPoint: {
            data: [
              { type: 'max' },
              { type: 'min' }
            ]
          }, markLine: {
            data: [
              { type: 'average' }
            ]
          }
        }
      ]
    };
    this.showSpinner=false;
     return chartOptions;
    }
  }
  }

  calibrationChart(){ 
    
    this.showSpinner=true;
    const chartOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        bottom: 10,
        left: 'center',
        data:[this.critical,this.nonCritical]
        // data:[this.missionCritical,this.patientCritical,this.revenueCritical,this.nonCritical]
      },
      toolbox: {
        show: true,
        feature: {
          magicType: { show: true, type: ['line', 'bar'], title: this.switchGraph },
          restore: { show: true, title: 'Refresh' },
          saveAsImage: { show: true, title: 'Download' }
        }
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          data: ['QA']
        }
      ],
      yAxis: [
        {
          type: 'value',
          minInterval: 1//Show only integers
        }
      ],
      series: [
        {
          name: this.critical,
          type: 'bar',
          data:
          [ this.qaCriticalCount]
          ,
          markPoint: {
            data: [
              { type: 'max' },
              { type: 'min' }
            ]
          }, markLine: {
            data: [
              { type: 'average' }
            ]
          }
        },
        // {
        //   name: this.missionCritical,
        //   type: 'bar',
        //   data:
        //   [ this.qaMissionCriticalCount]
        //   ,
        //   markPoint: {
        //     data: [
        //       { type: 'max' },
        //       { type: 'min' }
        //     ]
        //   }, markLine: {
        //     data: [
        //       { type: 'average' }
        //     ]
        //   }
        // },
        // {
        //   name: this.patientCritical,
        //   type: 'bar',
        //   data:
        //   [ this.qaPatientCriticalCount]
        //   ,
        //   markPoint: {
        //     data: [
        //       { type: 'max' },
        //       { type: 'min' }
        //     ]
        //   }, markLine: {
        //     data: [
        //       { type: 'average' }
        //     ]
        //   }
        // },
        // {
        //   name: this.revenueCritical,
        //   type: 'bar',
        //   data:
        //   [ this.qaRevenueCriticalCount]
        //   ,
        //   markPoint: {
        //     data: [
        //       { type: 'max' },
        //       { type: 'min' }
        //     ]
        //   }, markLine: {
        //     data: [
        //       { type: 'average' }
        //     ]
        //   }
        // },
        {
          name: this.nonCritical,
          type: 'bar',
          data: [ this.qaNonCriticalCount],
          markPoint: {
            data: [
              { type: 'max' },
              { type: 'min' }
            ]
          }, markLine: {
            data: [
              { type: 'average' }
            ]
          }
        }
      ]
    };
    this.showSpinner=false;
     return chartOptions;
    
  }

  primitiveChart(){  

    this.showSpinner=true;
    const chartOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        bottom: 10,
        left: 'center',
        data:[this.critical,this.nonCritical]
        // data:[this.missionCritical,this.patientCritical,this.revenueCritical,this.nonCritical]
      },
      toolbox: {
        show: true,
        feature: {
          magicType: { show: true, type: ['line', 'bar'], title: this.switchGraph },
          restore: { show: true, title: 'Refresh' },
          saveAsImage: { show: true, title: 'Download' }
        }
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          data: ['PM']
        }
      ],
      yAxis: [
        {
          type: 'value',
          minInterval: 1//Show only integers
        }
      ],
      series: [
        {
          name: this.critical,
          type: 'bar',
          data:
          [ this.pmCriticalCount]
          ,
          markPoint: {
            data: [
              { type: 'max' },
              { type: 'min' }
            ]
          }, markLine: {
            data: [
              { type: 'average' }
            ]
          }
        },
        // {
        //   name: this.missionCritical,
        //   type: 'bar',
        //   data:
        //   [ this.pmMissionCriticalCount]
        //   ,
        //   markPoint: {
        //     data: [
        //       { type: 'max' },
        //       { type: 'min' }
        //     ]
        //   }, markLine: {
        //     data: [
        //       { type: 'average' }
        //     ]
        //   }
        // },
        // {
        //   name: this.patientCritical,
        //   type: 'bar',
        //   data:
        //   [ this.pmPatientCriticalCount]
        //   ,
        //   markPoint: {
        //     data: [
        //       { type: 'max' },
        //       { type: 'min' }
        //     ]
        //   }, markLine: {
        //     data: [
        //       { type: 'average' }
        //     ]
        //   }
        // },
        // {
        //   name: this.revenueCritical,
        //   type: 'bar',
        //   data:
        //   [ this.pmRevenueCriticalCount]
        //   ,
        //   markPoint: {
        //     data: [
        //       { type: 'max' },
        //       { type: 'min' }
        //     ]
        //   }, markLine: {
        //     data: [
        //       { type: 'average' }
        //     ]
        //   }
        // },
        {
          name: this.nonCritical,
          type: 'bar',
          data: [this.pmNonCriticalCount],
          markPoint: {
            data: [
              { type: 'max' },
              { type: 'min' }
            ]
          }, markLine: {
            data: [
              { type: 'average' }
            ]
          }
        }
      ]
    };
    this.showSpinner=false;
     return chartOptions;
    
  }

  consumedChart(){ 
    
    const chartOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        bottom: 10,
        left: 'center',
        data:['INTERNAL','EXTERNAL']
      },
      toolbox: {
        show: true,
        feature: {
          magicType: { show: true, type: ['line', 'bar'], title: this.switchGraph },
          restore: { show: true, title: 'Refresh' },
          saveAsImage: { show: true, title: 'Download' }
        }
      },
      calculable: true,
        xAxis: [
          {
            type: 'category',
            data: ['Consumed Spares']
          }
        ],
        yAxis: [
          {
            type: 'value',
            minInterval: 1//Show only integers
          }
        ],
        series: [
          {
            name: 'INTERNAL',
            type: 'bar',
            data:
            [ this.consumedInternalCount]
            ,
            markPoint: {
              data: [
                { type: 'max' },
                { type: 'min' }
              ]
            }, markLine: {
              data: [
                { type: 'average' }
              ]
            }
          },
          {
            name: 'EXTERNAL',
            type: 'bar',
            data: [this.consumedExternalCount],
            markPoint: {
              data: [
                { type: 'max' },
                { type: 'min' }
              ]
            }, markLine: {
              data: [
                { type: 'average' }
              ]
            }
          }
        ]
      };
      this.showSpinner=false;
      return chartOptions;
  
  }

onChartClickTest(param){
  this.regionBased = this.dialog.open(RegionWiseServicerequestComponent, {
    height: 'auto',
    width: '800px',
    data: {
      'srType': param.name
    }
  });
  this.regionBased.disableClose = true;
  this.regionBased.afterClosed().subscribe(
    data => {
      this.ngOnInit();
    });
} 

ngOnDestroy() {
  if(this.regionBased!=null){
    this.regionBased.close();
  }
}

onChartClick(param){

  localStorage.setItem('locationId', this.parentData.locationId);
  localStorage.setItem('locationName', this.parentData.locationName);
  if(this.date.length>0){
    
    localStorage.setItem('startDt', this.date[0].fromDateForBackend);
    localStorage.setItem('endDt',  this.date[0].toDateForBackend);
  }

  if(this.transactionSourceForConsumedWOType !== "CONSUMED"){
  if(this.transactionSourceForAllWOType === "OPEN" ){
    
    this.router.navigate([`home/serviceRequest/serviceRequestList/${param.name}/${param.seriesName}/OPEN`]);
   }else{
  this.router.navigate([`home/serviceRequest/serviceRequestList/${param.name}/${param.seriesName}/BOOKED`]);    
}
}
}

dialogRef
duration(){
  this.dialogRef = this.dialog.open(DashBoardDurationComponent, {
    width: "auto",
    height: "auto",
  });

  this.dialogRef.disableClose = true;
  this.dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.date = data;
          this.dateList.emit(this.date);
          this.loadServiceRequestByCriticality();
        }
      });
}


}
