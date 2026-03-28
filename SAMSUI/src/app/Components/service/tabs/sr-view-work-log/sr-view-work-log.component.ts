import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { TransactionActivity } from 'src/app/Model/base/transactionActivity';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sr-view-work-log',
  templateUrl: './sr-view-work-log.component.html',
  styleUrls: ['./sr-view-work-log.component.css']
})
export class SrViewWorkLogComponent implements OnInit,AfterViewInit {

  @Input() srId: number;

  primaryId:number=0;

  public transactionActivityList:TransactionActivity[];
  public transactionActivity: TransactionActivity;

  constructor(private commonService: CommonService,  private assetOptimaConstants: AssetOptimaConstants,
    private activatedRoute :ActivatedRoute) { 
    this.transactionActivity = new TransactionActivity();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.primaryId = params.pId;
        this.primaryId = Number(this.primaryId);
        this.srId = this.primaryId;
      });

    this.loadData(this.srId);
  }

  ngAfterViewInit() {
    this.loadData(this.srId);
  }

  loadData(srId) {
    this.commonService.showSpinner();
    this.commonService.commonGetService('getListOfActivities.sams', srId.toString(),'WORKORDER').subscribe(
      data => { 
        if (data.success) {
          this.commonService.hideSpinner(); 
          this.transactionActivityList=data.responseData;
        } else {
          this.commonService.hideSpinner();  
        }
      }, error => {
        this.commonService.hideSpinner();
      }
    );
  }

  exportReportForWorkLog(){
      this.transactionActivity.transactionId = this.srId;
      this.commonService.commonListService('generateSrWorkLog.sams', this.transactionActivity).subscribe(
        (data) => {
          this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download`);
        }, error => {
          // alert('error');
        }
      );
  }

}
