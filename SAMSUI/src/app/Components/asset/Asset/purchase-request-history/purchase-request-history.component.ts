
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { PurchaseRequestHdr } from 'src/app/Model/purchase/prReqHdr';

@Component({
  selector: 'app-purchase-request-history',
  templateUrl: './purchase-request-history.component.html',
  styleUrls: ['./purchase-request-history.component.css']
})
export class PurchaseRequestHistoryComponent implements OnInit {

  purchaseRequest : PurchaseRequestHdr;
  @Input() assetId : number; 
  // @Output() setSrId = new EventEmitter<PurchaseRequestHdr>(); 

  purchaseRequestList : PurchaseRequestHdr[];    

  //for pagination
  length: String = '0';//set total record count here 
  pageIndex: String;//set page number starts with zeroo
  pageSize: String;// records per page

  //LOADER
  subloader: boolean = false;

  prDataSource=[];

  modeDisplay: boolean = false;

  displayedPRColumns = ['sno','srNo','prNo','prDt','reqBy','prStatus','grandTotal','action'];

  //PERMISSIONS 
  modelAccessModule: ModuleAccessModel;

  constructor(private activatedRoute: ActivatedRoute,
              private commonService: CommonService,
              private router: Router,
              private userSessionService: UserSessionService) {
              this.purchaseRequest = new PurchaseRequestHdr();
               }

  ngOnInit() {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.modelAccessModule = this.userSessionService.getUserGroupAccess()['GROUPACCESS_PURCHASE_REQUEST'];

    this.activatedRoute.params.subscribe(
      params => {   
        var primaryId = params.pId;
        primaryId =Number(primaryId);
        var mode = params.mode;
          if(mode=='view'){
            this.modeDisplay=true;
          }
    });
    if(this.assetId>0){ 
      this.loadPRDetailsList();
    }
  }

  loadPRDetailsList(){
    this.purchaseRequest.pageNumber = Number(this.pageIndex);
    this.purchaseRequest.recordsPerPage = Number(this.pageSize);
    this.purchaseRequest.direction = 'desc';
    this.purchaseRequest.columnName = 'updatedDt';
    this.purchaseRequest.assetHdrId=this.assetId;
    this.subloader = true;
    this.prDataSource=[];
    this.commonService.commonListService('fetchListOfAllPurchaseRequest.sams', this.purchaseRequest).subscribe(
      data => {
        if (data.success) {
          this.subloader = false;
          this.length = data.responseData.dataTotalRecCount;
          this.prDataSource = data.responseData.dataList;
          if( this.prDataSource && this.prDataSource.length > 0) { 
            // this.setSrId.emit(this.prDataSource[0]);
        }
        } else {
          this.commonService.openToastErrorMessage(data.message);
          this.subloader = false;
        }
      }, error => {
        this.subloader=false;
      }
    );
  }

  viewPurchaseRequestDtl(prId,mode){
    // this.router.navigate(['home/serviceRequest/serviceView/'+srId + '/' +mode+"/asset_info"]);
    window.open('/home/purchase/purchaseRequestCreate/'+prId + '/' +mode);
  }

}

