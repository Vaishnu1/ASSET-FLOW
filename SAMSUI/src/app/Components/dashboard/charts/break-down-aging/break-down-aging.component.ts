import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-break-down-aging',
  templateUrl: './break-down-aging.component.html',
  styleUrls: ['./break-down-aging.component.css']
})
export class BreakDownAgingComponent implements OnInit {


    @Input() parentData: any;
    @Input() resetFormSubject: Subject<boolean> = new Subject<boolean>();
    open1day : number=0;
    ack1day : number=0;
    inProgress1day : number=0;
    open2day : number=0;
    ack2day : number=0;
    inProgress2day : number=0;
    open3day : number=0;
    ack3day : number=0;
    inProgress3day : number=0;
    open4day : number=0;
    ack4day : number=0;
    inProgress4day : number=0;
    open5day : number=0;
    ack5day : number=0;
    inProgress5day : number=0;
    option: any;
    theme:string;

    imageLoaded = false;
  constructor(private commonService: CommonService,
              private assetOptimaConstants: AssetOptimaConstants) { }

  ngOnInit() {
    
    this.resetFormSubject.subscribe(response => {
        if(response){
            this.theme= localStorage.getItem('theme');
            this.fetchSRBreakDownByAgeing();

            setTimeout(() =>{
              this.imageLoaded = true;
            },2000)
        }
      }); 
  }

fetchSRBreakDownByAgeing() {
    this.commonService.commonGetService('fetchSRBreakDownByAgeing.sams', this.parentData.locationId.toString(),this.parentData.locationList).subscribe(
      data => {
        if (data.success) {
            this.open1day = 0;
            this.open2day = 0;
            this.open3day = 0;
            this.open4day = 0;
            this.open5day = 0;
            this.ack1day = 0;
            this.ack2day = 0;
            this.ack3day = 0;
            this.ack4day = 0;
            this.ack5day = 0;
            this.inProgress1day = 0;
            this.inProgress2day = 0;
            this.inProgress3day = 0;
            this.inProgress4day = 0;
            this.inProgress5day = 0;
          let serviceRequestBDAgeing = data.responseData.dataList;
          for(var i=0;i<serviceRequestBDAgeing.length;i++){
            if(serviceRequestBDAgeing[i].status=="BOOKED"){
                this.open1day = serviceRequestBDAgeing[i].interval1Count;
                this.open2day= serviceRequestBDAgeing[i].interval2Count;
                this.open3day= serviceRequestBDAgeing[i].interval3Count;
                this.open4day= serviceRequestBDAgeing[i].interval4Count;
                this.open5day= serviceRequestBDAgeing[i].interval5Count;
            }else if(serviceRequestBDAgeing[i].status=="ACKNOWLEDGED"){
                this.ack1day = serviceRequestBDAgeing[i].interval1Count;
                this.ack2day= serviceRequestBDAgeing[i].interval2Count;
                this.ack3day= serviceRequestBDAgeing[i].interval3Count;
                this.ack4day= serviceRequestBDAgeing[i].interval4Count;
                this.ack5day= serviceRequestBDAgeing[i].interval5Count;
            }else if(serviceRequestBDAgeing[i].status=="IN-PROGRESS"){
                this.inProgress1day = serviceRequestBDAgeing[i].interval1Count;
                this.inProgress2day= serviceRequestBDAgeing[i].interval2Count;
                this.inProgress3day= serviceRequestBDAgeing[i].interval3Count;
                this.inProgress4day= serviceRequestBDAgeing[i].interval4Count;
                this.inProgress5day= serviceRequestBDAgeing[i].interval5Count;
            }
          }
          this.option=this.getChartList();
        }
      }
    );
  }

  getChartList(){
    let chartOption = {
        tooltip : {
            trigger: 'axis',
            axisPointer : {         
                type : 'shadow'      
            }
        }, toolbox: {
            show: true,
            feature: {
            magicType: { show: true, type: ['line', 'bar'], title: 'Switch Graph' },
            restore: { show: true, title: 'Refresh' },
            saveAsImage: { show: true, title: 'Download' }
            }
          },
        legend: {
            bottom: 10,
            left: 'center',
            data: ['Booked', 'Acknowledge','In-Progress']
        },
        grid: {
            left: '3%',
            right: '4%',
            containLabel: true
        },
        xAxis:  {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: ['0 to 30 days','31 to 60 days','61 to 90 days','91 to 120 days','> 120 days']
        },
        series: [
            {
                name: 'Booked',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        position: 'insideRight'
                    }
                },
                data: [this.open1day, this.open2day, this.open3day, this.open4day, this.open5day]
            },
            {
                name: 'Acknowledge',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        position: 'insideRight'
                    }
                },
                data: [this.ack1day,this.ack2day,this.ack3day,this.ack4day,this.ack5day]
            },
            {
                name: 'In-Progress',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        position: 'insideRight'
                    }
                },
                data: [this.inProgress1day,this.inProgress2day,this.inProgress3day,this.inProgress4day,this.inProgress5day]
            }
           
        ]
    };
    return chartOption;
  }


   generateReport() {

    const payload = {
                        locationId: this.parentData.locationId.toString(),
                        locationList: this.parentData.locationList
                    };

    this.commonService.commonListService('generateBreakdownAgingReport.sams',JSON.stringify(payload)).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      }, error => {
        // alert('error');
      }
    );
  }  


}
