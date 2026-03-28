import { Component, OnInit, NgZone } from '@angular/core';
import { DataService } from 'src/app/Services/dataService';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sr-pr-report-result',
  templateUrl: './sr-pr-report-result.component.html',
  styleUrls: ['./sr-pr-report-result.component.css']
})
export class SrPrReportResultComponent implements OnInit {
  dataSource = [];
  displayedColumns = ['sno', 'location', 'count', 'percent'];
  constructor(private router: Router ,private zone: NgZone, private dataShare: DataService, private commonService: CommonService, private samsService: AssetOptimaServices) { }
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
    this.commonService.commonListService(this.samsService.listOfWorkorderWithPR, this.message).subscribe(
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

  changeRoute(){
    if(this.message.searchValue1=="3"){
      this.router.navigate(['/srPrReportSearch']);
    }else if(this.message.searchValue1=="4"){
      this.router.navigate(['/srNoprReportSearch']);
    }
  }

}
