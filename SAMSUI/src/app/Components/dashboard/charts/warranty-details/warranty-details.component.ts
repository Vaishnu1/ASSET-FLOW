import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-warranty-details',
  templateUrl: './warranty-details.component.html',
  styleUrls: ['./warranty-details.component.css']
})
export class WarrantyDetailsComponent implements OnInit {

  onWarrantyCount:  number = 0;
  offWarrantyCount:  number = 0;
  onContractCount:  number = 0;
  amcContractCount:  number = 0;
  cmcContractCount:  number = 0;
  option: any;

  constructor(private commonService: CommonService,
    private userSession: UserSessionService,
              private assetOptimaConstants: AssetOptimaConstants) { }

  ngOnInit() {
      this.loadWarrantyContractInfo();
  }

  loadWarrantyContractInfo() {
    this.commonService.commonGetService('fetchWarrantyContractInfo.sams', (this.userSession.getUserLocationId()).toString()).subscribe(
      data => {
        if (data.success) {
          let warrantyContractInfoCount = data.responseData.dataList;
          this.onWarrantyCount = warrantyContractInfoCount[0].onWarrantyCount;
          this.offWarrantyCount = warrantyContractInfoCount[0].offWarrantyCount;
          this.onContractCount = warrantyContractInfoCount[0].onContractCount;
          this.amcContractCount = warrantyContractInfoCount[0].amcCount;
          this.cmcContractCount = warrantyContractInfoCount[0].cmcCount;
          this.option= this.getChartOptions();
        }
      }
    );
  }
 
  getChartOptions(){
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
            left: 'center',
            data:['On Warranty','Off Warranty','On Contract','AMC','CMC']
        },
        xAxis: {
            type: 'category',
            data: ['On War.','Off War.','On Cont.','AMC','CMC']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            barWidth: '50%',
            data: [this.onWarrantyCount, this.offWarrantyCount, this.onContractCount, this.amcContractCount, this.cmcContractCount],
            type: 'bar'
        }]
    };
      return chartOption;
  }
}
