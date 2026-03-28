import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { LoanReturnsModel } from 'src/app/Model/asset/loanReturns';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-asset-loan-history',
  templateUrl: './asset-loan-history.component.html',
  styleUrls: ['./asset-loan-history.component.css']
})
export class AssetLoanHistoryComponent implements OnInit {

  @Input() assetId: number;

  assetLoanHistoryDataSource: any = [];

  subloader: boolean = false;

  length: String = '0';

  public loanReturns: LoanReturnsModel;

  displayedColumns = ['sno', 'requestedFrom', 'requestedTo', 'loanNo', 'loanStatus', 'startDate', 'action']
  constructor(
    private commonService: CommonService,
    private assetOptimaConstants: AssetOptimaConstants,
    private router: Router,
    public dialogRef: MatDialogRef<AssetLoanHistoryComponent>
    ) { 
      
  }

  ngOnInit() {
    
    this.loanReturns = new LoanReturnsModel();
    this.loanReturns.direction = 'desc';
    this.loanReturns.columnName = 'updatedDt';
    this.loanReturns.assetId  = this.assetId;
    this.fetchList();
  }

  fetchList() {
    this.subloader = true;
    this.commonService.commonListService('fetchListOfAllLoanReturns.sams', this.loanReturns).subscribe(
      data => {
        if (data.success) {
          this.subloader = false;
          this.length = data.responseData.dataTotalRecCount;
          this.assetLoanHistoryDataSource = data.responseData.dataList;
          
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.subloader = false;
        }
      }, error => {
        this.subloader=false;
      }
    );
  }

  createInternalLoan(element,mode){   
    if(element.sourceScreen === "EXTERNAL"){
      this.router.navigate(['home/asset/loanReturnRequesCreate/'+element.loanId+ '/' +mode]);
    }
    else if(element.sourceScreen === "INTERNAL"){
      this.router.navigate(['home/asset/internalLoanCreate/'+element.loanId+ '/' +mode]);
    }
    
  }

}
