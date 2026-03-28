import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-warranty-expiring',
  templateUrl: './warranty-expiring.component.html',
  styleUrls: ['./warranty-expiring.component.css']
})
export class WarrantyExpiringComponent implements OnInit {

  @Input() parentData: any;
  @Input() resetFormSubject: Subject<boolean> = new Subject<boolean>();
  
  warranty30Days:  number = 0;
  warranty60Days:  number = 0;
  warrantyAbove60Days:  number = 0;
  warrantyExpiring30Days:  number = 0;
  warrantyExpiring60Days:  number = 0;
  warrantyExpiringAbove60Days:  number = 0;
  contract30Days:  number = 0;
  contract60Days:  number = 0;
  contractAbove60Days:  number = 0;
  theme:string;

    option: any;

  constructor(private commonService: CommonService,
             private assetOptimaConstants: AssetOptimaConstants,
             private router: Router) { }

  ngOnInit() {
     
      this.resetFormSubject.subscribe(response => {
        if(response){
          this.theme = localStorage.getItem('theme');
          this.loadWarrantyContractExpiryInfo();
        }
      });
  }

  loadWarrantyContractExpiryInfo() {
    this.commonService.commonGetService('fetchWarrantyContractExpiry.sams', this.parentData.locationId.toString(),this.parentData.locationList).subscribe(
      data => {
        if (data.success) {
          let warrantyContractExpCount = data.responseData.dataList;
          this.contract30Days = warrantyContractExpCount[0].warrantyExpiry30Days;
          this.contract60Days = warrantyContractExpCount[0].warrantyExpiry60Days;
          this.contractAbove60Days = warrantyContractExpCount[0].warrantyExpiryAbove60Days;

          this.warrantyExpiring30Days = warrantyContractExpCount[1].warrantyExpiry30Days;
          this.warrantyExpiring60Days = warrantyContractExpCount[1].warrantyExpiry60Days;
          this.warrantyExpiringAbove60Days = warrantyContractExpCount[1].warrantyExpiryAbove60Days;

          this.warranty30Days = warrantyContractExpCount[2].warrantyExpiry30Days;
          this.warranty60Days = warrantyContractExpCount[2].warrantyExpiry60Days;
          this.warrantyAbove60Days = warrantyContractExpCount[2].warrantyExpiryAbove60Days;
          
          this.option= this.getChartOptions();
        }
      }
    );
  }

  getChartOptions(){
    let chartOptions = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
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
            bottom: 1,
            left: 'center',
            data: ['Warranty', 'Contract']
        },
        grid: {
          left: '3%',
          right: '2%',
          containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['0-30 Days','31-60 days','>60 days']
        },
        series: [
            {
                name: 'Warranty',
                type: 'bar',
                barWidth: '30%',
                data: [this.warranty30Days, this.warranty60Days, this.warrantyAbove60Days]
            },
            // {
            //     name: 'Extended Warranty',
            //     type: 'bar',
            //     barWidth: '30%',
            //     data: [this.warrantyExpiring30Days, this.warrantyExpiring60Days, this.warrantyExpiringAbove60Days]
            // },
            {
              name: 'Contract',
              type: 'bar',
              barWidth: '30%',
              data: [this.contract30Days, this.contract60Days, this.contractAbove60Days]
          }
        ]
    };
      return chartOptions;                                                                                             
  }

  onChartClick(param){  
    localStorage.setItem('locationId', this.parentData.locationId);
    localStorage.setItem('locationName', this.parentData.locationName);
 
    this.router.navigate(['home/asset/contractList/' +param.seriesName+ '/' +param.name ]);    
  }                                           

  
  


}
