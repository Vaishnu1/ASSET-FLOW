import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';

@Component({
  selector: 'app-open-srchart',
  templateUrl: './open-srchart.component.html',
  styleUrls: ['./open-srchart.component.css']
})
export class OpenSRChartComponent implements OnInit {

  @Input() parentData: any;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    scaleShowValues: true,
    scaleValuePaddingX: 10,
    scaleValuePaddingY: 10,
    responsive: true,
    legend: {
      display: true,
      labels: {
        fontSize: 8
      }
    },
    // title: {
    //   display: false,
    //   text: 'Service Request - BreakDown'
    // },
    scales: {
      xAxes: [{
        stacked: true
      }],
      yAxes: [{
        stacked: true
      }]
    },plugins: {
      labels: {
        // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
        render: 'value',
      }
    }
  };
  public barChartLabels: string[] = ['BD', 'PM', 'QA', 'PA'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [0, 0, 0, 0], label: 'Open' },
    { data: [0, 0, 0, 0], label: 'Completed' },
    { data: [0, 0, 0, 0], label: 'Closed' }
  ];
  constructor(private translateService: TranslateService,
              private commonService: CommonService,
              private assetOptimaService : AssetOptimaServices,
              private assetOptimaConstants : AssetOptimaConstants) { }

  ngOnInit() {
    this.loadServiceRequestDataByUserLocationAccess();
  }

  loadServiceRequestDataByUserLocationAccess() {
    if (this.parentData.locationId > 0) {
      this.commonService.commonGetService('getDashboardDataForServiceRequest.sams', this.parentData.locationId.toString(),'BM').subscribe(
        data => {
          if (data.success) {
            this.barChartData = data.responseData.barChartData;
          }
        }
      );
    }
  }

  // events
  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }

  public randomize(): void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
  }

}
