import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-rental-lease-details',
  templateUrl: './rental-lease-details.component.html',
  styleUrls: ['./rental-lease-details.component.css']
})
export class RentalLeaseDetailsComponent implements OnInit {

  @Input() parentData: any;
  @Input() resetFormSubject: Subject<boolean> = new Subject<boolean>();

  option: any;
  rentalAssetCount: number=0;
  leaseAssetCount: number=0;
  theme:string;

  constructor(private commonService: CommonService,
              private assetOptimaConstants: AssetOptimaConstants,
              private router: Router) { }

  ngOnInit() {
    
    this.resetFormSubject.subscribe(response => {
      if(response){
        this.theme = localStorage.getItem('theme');
        this.fetchListOfRentalLeaseAssets();
      }
    });
  }

  fetchListOfRentalLeaseAssets() {
    this.commonService.commonGetService('fetchListOfRentalLeaseCount.sams', this.parentData.locationId.toString(),this.parentData.locationList).subscribe(
        dataValue => {
            if (dataValue.success) {
              this.rentalAssetCount = dataValue.responseData.dataList[0].assetRentalCount;
              this.leaseAssetCount = dataValue.responseData.dataList[0].assetLeaseCount;
              this.option = this.getChartOptionsTest();
            }
        }
    );
}

getChartOptionsTest(){
  let buildCharts = {
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
      bottom: 10,
      left: 'center',
      data: ['Lease', 'Rental']
  },
  series : [
      {
          name: 'Count for',
          type: 'pie',
          radius : '55%',
          center: ['50%', '50%'],
          selectedMode: 'single',
          label: {
            normal: {
              formatter: '{c} {per|{d}%}',
              backgroundColor: '#eee',
              position: 'top',
              borderColor: '#aaa',
              show: true,
              rich: {
                per: {
                    color: '#eee',
                    backgroundColor: '#334455',
                    padding: [2, 4],
                    borderRadius: 2
                }
            }
            }
          },
          data:[
              {value:this.leaseAssetCount, name: 'Lease'},
              {value:this.rentalAssetCount, name: 'Rental'},
          ],
          itemStyle: {
              emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
      }
  ]
  };
  return buildCharts;
}

onChartClick(event){
  var ownership = event.name.toUpperCase();
  localStorage.setItem('locationId', this.parentData.locationId);
  localStorage.setItem('locationName', this.parentData.locationName);
  this.router.navigate(['home/asset/assetList/' +0+ '/' +0+ '/' + ownership]); 
}

}
