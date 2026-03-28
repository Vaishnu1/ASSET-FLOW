import { Component, OnInit, NgZone } from '@angular/core';
import { DataService } from 'src/app/Services/dataService';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';

@Component({
  selector: 'app-sr-open-report-result',
  templateUrl: './sr-open-report-result.component.html',
  styleUrls: ['./sr-open-report-result.component.css']
})
export class SrOpenReportResultComponent implements OnInit {
  dataSource = [];
  displayedColumns = ['sno', 'location', 'count', 'percent'];
  constructor(private zone: NgZone, private dataShare: DataService, private commonService: CommonService, private samsService: AssetOptimaServices) { }
  message: any = '';
  ngOnInit() {
    this.dataShare.currentMessage.subscribe(message => this.message = message)
  }
  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.resultList();

    });
  }
  ngOnDestroy() {

  }

  resultList() {
    this.commonService.commonListService(this.samsService.listOfOpenWorkorder, this.message).subscribe(
      (data) => {
        if (data.success) {
          this.dataSource = data.responseData;
        } else {
          this.commonService.openToastErrorMessage(data.message);
        }
      }, error => {
        // alert('error');
      }
    );
  }

  Export() {
    this.commonService.commonListService(this.samsService.exportOpenWO, this.message).subscribe(
      (data) => {
        this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download.`);
      }, error => {
        // alert('error');
      }
    );
  }

}
