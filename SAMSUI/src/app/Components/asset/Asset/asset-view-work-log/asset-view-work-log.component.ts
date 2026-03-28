import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { TransactionActivity } from 'src/app/Model/base/transactionActivity';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { ActivatedRoute } from '@angular/router';
import { AssetTransaction } from 'src/app/Model/base/assetTransaction';

@Component({
  selector: 'app-asset-view-work-log',
  templateUrl: './asset-view-work-log.component.html',
  styleUrls: ['./asset-view-work-log.component.css']
})
export class AssetViewWorkLogComponent implements OnInit, AfterViewInit {

  @Input() assetId: number;

  primaryId:number=0;

  public assetTransactionActivityList:AssetTransaction[];
  public assetTransactionActivity: AssetTransaction;

  constructor(private commonService: CommonService,  private assetOptimaConstants: AssetOptimaConstants,
    private activatedRoute :ActivatedRoute) { 
    this.assetTransactionActivity = new AssetTransaction();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.primaryId = params.pId;
        this.primaryId = Number(this.primaryId);
        this.assetId = this.primaryId;
      });

    this.loadData(this.assetId);
  }

  ngAfterViewInit() {
    this.loadData(this.assetId);
  }

  loadData(assetId) {
    this.commonService.showSpinner();
    this.commonService.commonGetService('getListOfAssetActivities.sams', assetId.toString(),'ASSET REGISTER').subscribe(
      data => { 
        if (data.success) {
          this.commonService.hideSpinner(); 
          this.assetTransactionActivityList=data.responseData;
        } else {
          this.commonService.hideSpinner();  
        }
      }, error => {
        this.commonService.hideSpinner();
      }
    );
  }

  exportReportForWorkLog(){
      this.assetTransactionActivity.assetHdrId = this.assetId;
      this.commonService.commonListService('generateAssetWorkLog.sams', this.assetTransactionActivity).subscribe(
        (data) => {
          this.commonService.openToastSuccessMessage(`Report With Request Number : ${data.responseData} Is Generated. Kindly Check "Reports" Menu To Download`);
        }, error => {
          // alert('error');
        }
      );
  }

}

