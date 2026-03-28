import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { CriticalNoncriticalCountComponent } from '../critical-noncritical-count/critical-noncritical-count.component';
import { MatDialog } from '@angular/material/dialog';
import { ActiveAssetsComponent } from '../active-assets/active-assets.component';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-all-assets',
  templateUrl: './all-assets.component.html',
  styleUrls: ['./all-assets.component.css']
})
export class AllAssetsComponent implements OnInit {

  @Input() parentData: any;
  @Input() resetFormSubject: Subject<boolean> = new Subject<boolean>();
  options: any;
  data: any;
  displayCount: any;
  arrName: any;
  arrValue: any;
  totalValueAmount:any= [{ value: 0, name: "",statusId:0}];
  sumValue: any;
  objData: any;
  optionData: any;
  criticalndNonCriticalBased;
  assetCategoryBased;

  showSpinner: boolean =false;

  displayTable: boolean =false;

  public activeAssetCount = {
      'unAssignedCount': 0, 'assetCriticalCount': 0, 'assignedCount': 0, 'assetLeaseCount': 0,
      'assetNonCriticalCount': 0, 'assetOwnCount': 0, 'assetRentalCount': 0, 'assetTotalCount': 0
  };

  displayedColumns = ['sno', 'status', 'count','value','bookvalue'];
  assetDataSource = [];

  unAssignedCount: number=0;
  assignedCount: number=0;
  assetTotalCount: number=0;
  discardedCount: number=0;
  unAssignedValue: number=0;
  assignedValue: number=0;
  assetTotalValue: number=0;
  discardedValue: number=0;
  unAssigned: string='';  //in use assets
  assigned: string=''; // not in use assets
  discarded: string=''; //in stock assets
  totalbookValue: number=0;
  unAssignedbookValue: number=0;
  assignedbookValue: number=0;
  discardedbookValue: number=0;
  assetStatusTypeunAssignedId: number=0;
  assetStatusTypeAssignedId: number=0;
  assetStatusDiscardedId: number=0;
  theme: string;
  locCurrCd: any;
  inUseStatus: string='';
  notInUseStatus: string='';
  retiredStatus: string=''; 
  missingStatus: string='';
  newStatus: string='';
  inUseStatusCount: number=0;
  notInUseStatusCount: number=0;
  retiredStatusCount: number=0;
  missingStatusCount: number=0;
  newStatusCount: number=0;
  inUseStatusValue: number=0;
  notInUseStatusValue: number=0;
  retiredStatusValue: number=0;
  missingStatusValue: number=0;
  newStatusValue: number=0;
  inUseStatusId: number=0;
  notInUseStatusId: number=0;
  retiredStatusId: number=0;
  missingStatusId: number=0;
  newStatusId: number=0;
  inUseStatusbookValue: number=0;
  notInUseStatusbookValue: number=0;
  retiredStatusbookValue: number=0;
  missingStatusbookValue: number=0;
  newStatusbookValue: number=0;

  constructor(private commonService: CommonService, private assetOptimaConstants: AssetOptimaConstants,
              private dialog: MatDialog, private translateService: TranslateService,private router: Router,
              private userSessionService: UserSessionService) { }

  ngOnInit() {
     
      this.locCurrCd = this.userSessionService.getlocCurrCd();
      this.resetFormSubject.subscribe(response => {
          if(response){
              this.theme = localStorage.getItem('theme');
              this.fetchListOfActiveAssets();
          }
        }); 
  }

  viewInTableMode(){
      this.displayTable=true;
  } 

  viewInGraphMode(){
      this.displayTable=false;
  }

  fetchListOfActiveAssets() {
      this.commonService.commonGetService('fetchListOfAllAssetCount.sams', this.parentData.locationId.toString(),this.parentData.locationList).subscribe(
          dataValue => {
              if (dataValue.success) {
                  this.activeAssetCount = dataValue.responseData.dataList;
                //   //COUNT
                //   this.assetTotalCount=this.activeAssetCount[0].assetTotalCount;
                //   this.unAssignedCount=this.activeAssetCount[0].count;
                //   this.assignedCount=this.activeAssetCount[1].count;
                //   this.discardedCount=this.activeAssetCount[2].count;
                //   //PURCHASE AMOUNT
                //   this.assetTotalValue=this.activeAssetCount[0].assetTotalPurchaseAmount;
                //   this.unAssignedValue=this.activeAssetCount[0].value;
                //   this.assignedValue=this.activeAssetCount[1].value;
                //   this.discardedValue=this.activeAssetCount[2].value;
                  //STATUS 
                //   this.unAssigned=this.activeAssetCount[0].status;
                //   this.assigned=this.activeAssetCount[1].status;
                //   this.discarded=this.activeAssetCount[2].status;
                //   //BOOK VALUE
                //   this.totalbookValue=this.activeAssetCount[0].assetTotalBookAmount.toLocaleString();
                //   this.unAssignedbookValue=this.activeAssetCount[0].bookValue.toLocaleString();
                //   this.assignedbookValue=this.activeAssetCount[1].bookValue.toLocaleString();
                //   this.discardedbookValue=this.activeAssetCount[2].bookValue.toLocaleString();
                //   //ASSET STATUS ID
                //   this.assetStatusTypeunAssignedId = this.activeAssetCount[0].assetStatusId;
                //   this.assetStatusTypeAssignedId = this.activeAssetCount[1].assetStatusId;
                //   this.assetStatusDiscardedId = this.activeAssetCount[2].assetStatusId;

                  // new status COUNT
                  this.assetTotalCount=this.activeAssetCount[0].assetTotalCount;
                  this.inUseStatusCount=this.activeAssetCount[0].count;
                  this.notInUseStatusCount=this.activeAssetCount[1].count;
                  this.retiredStatusCount=this.activeAssetCount[2].count;
                  this.missingStatusCount=this.activeAssetCount[3].count;
                  this.newStatusCount=this.activeAssetCount[4].count;

                  //new status PURCHASE AMOUNT
                  this.assetTotalValue=this.activeAssetCount[0].assetTotalPurchaseAmount;
                  this.inUseStatusValue=this.activeAssetCount[0].value;
                  this.notInUseStatusValue=this.activeAssetCount[1].value;
                  this.retiredStatusValue=this.activeAssetCount[2].value;
                  this.missingStatusValue=this.activeAssetCount[3].value;
                  this.newStatusValue=this.activeAssetCount[4].value;

                  // new asset STATUS 
                  this.inUseStatus=this.activeAssetCount[0].status;
                  this.notInUseStatus=this.activeAssetCount[1].status;
                  this.retiredStatus=this.activeAssetCount[2].status;
                  this.missingStatus=this.activeAssetCount[3].status;
                  this.newStatus=this.activeAssetCount[4].status;

                  // new ASSET STATUS ID
                  this.inUseStatusId = this.activeAssetCount[0].assetStatusId;
                  this.notInUseStatusId = this.activeAssetCount[1].assetStatusId;
                  this.retiredStatusId = this.activeAssetCount[2].assetStatusId;
                  this.missingStatusId = this.activeAssetCount[3].assetStatusId;
                  this.newStatusId = this.activeAssetCount[4].assetStatusId;

                  // new asset BOOK VALUE
                  this.totalbookValue=this.activeAssetCount[0].assetTotalBookAmount.toLocaleString();
                  this.inUseStatusbookValue=this.activeAssetCount[0].bookValue.toLocaleString();
                  this.notInUseStatusbookValue=this.activeAssetCount[1].bookValue.toLocaleString();
                  this.retiredStatusbookValue=this.activeAssetCount[2].bookValue.toLocaleString();
                  this.missingStatusbookValue=this.activeAssetCount[3].bookValue.toLocaleString();
                  this.newStatusbookValue=this.activeAssetCount[3].bookValue.toLocaleString();

                  console.log("assetTotalValue",this.activeAssetCount)

                  this.options = this.getChartOptionsTest();
              }
          }
      );
  }  

  passParameterToValue(total,inUseStatusCount,notInUseStatusCount,retiredStatusCount,missingStatusCount,newStatusCount,totalAmount,
    inUseStatusValue,notInUseStatusValue,retiredStatusValue,missingStatusValue,newStatusValue,
    inUseStatus,notInUseStatus,retiredStatus,missingStatus,newStatus,
    inUseStatusId,notInUseStatusId,retiredStatusId,missingStatusId,newStatusId,totalBookValue,
    inUseStatusbookValue,notInUseStatusbookValue,retiredStatusbookValue,missingStatusbookValue,newStatusbookValue){
      this.data = [
      {
          name: inUseStatus,
          value: inUseStatusCount,
          totalValue:inUseStatusValue,
          statusId:inUseStatusId,
          bookValue:inUseStatusbookValue
      },
      {
          name: notInUseStatus,
          value: notInUseStatusCount,
          totalValue:notInUseStatusValue,
          statusId:notInUseStatusId,
          bookValue:notInUseStatusbookValue
      },
      {
          name: retiredStatus,
          value: retiredStatusCount,
          totalValue:retiredStatusValue,
          statusId:retiredStatusId,
          bookValue:retiredStatusbookValue
      },
      {
          name: missingStatus,
          value: missingStatusCount,
          totalValue:missingStatusValue,
          statusId:missingStatusId,
          bookValue:missingStatusbookValue
      },
      {
          name: newStatus,
          value: newStatusCount,
          totalValue:newStatusValue,
          statusId:newStatusId,
          bookValue:newStatusbookValue
      }
      ]; 
      
      this.totalValueAmount=[{
          value: inUseStatusValue,
          name: inUseStatus,
          statusId: inUseStatusId
      },
      {
          value: notInUseStatusValue,
          name: notInUseStatus,
          statusId: notInUseStatusId
      },
      {
          value: retiredStatusValue,
          name: retiredStatus,
          statusId: retiredStatusId
      },
      {
          value: missingStatusValue,
          name: missingStatus,
          statusId: missingStatusId
      },
     {
          value: newStatusValue,
          name: newStatus,
          statusId: newStatusId
      }]  
      
      this.arrName = this.getArrayValue(this.data, "name");
      this.arrValue = this.getArrayValue(this.data, "value");  
  }


  getArrayValue(array, key) {
      var key = key || "value";
      var res = [];
      if (array) {
          array.forEach(function (t) {
              res.push(t[key]);
          });
      }
      return res;
  }

  getChartOptionsTest() {
      this.showSpinner=true;
    //   this.unAssigned = this.assetStatusTranslate(this.unAssigned);
    //   this.assigned = this.assetStatusTranslate(this.assigned);
    //   this.discarded = this.assetStatusTranslate(this.discarded); 
        this.inUseStatus = this.assetStatusTranslate(this.inUseStatus);
        this.notInUseStatus = this.assetStatusTranslate(this.notInUseStatus);
        this.retiredStatus = this.assetStatusTranslate(this.retiredStatus);
        this.missingStatus = this.assetStatusTranslate(this.missingStatus);

      this.passParameterToValue(this.assetTotalCount,this.inUseStatusCount,this.notInUseStatusCount,this.retiredStatusCount,this.missingStatusCount,this.newStatusCount,
        this.assetTotalValue,this.inUseStatusValue,this.notInUseStatusValue,this.retiredStatusValue,this.missingStatusValue,this.newStatusValue,
        this.inUseStatus,this.notInUseStatus,this.retiredStatus, this.missingStatus,this.newStatus, 
        this.inUseStatusId,this.notInUseStatusId,this.retiredStatusId,this.missingStatusId,this.newStatusId,
        this.totalbookValue,this.inUseStatusbookValue,this.notInUseStatusbookValue,this.retiredStatusbookValue,this.missingStatusbookValue,this.newStatusbookValue);
     
      return {
          tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
              bottom: 10,
              left: 'center',
              data: this.arrName 
          },            
          series: [
              {
                  name: 'Total Asset Count for',
                  type: 'pie',
                  radius: [0, '50%'],
                  center: ['50%', '50%'], 
                  label: {
                      normal: {
                          formatter: function (data) { 
                              return data.value.toLocaleString();
                          },
                          position: 'inside',
                          rich: {
                              b: {
                                  fontSize: 10,
                                  lineHeight: 33
                              },
                              per: {
                                  padding: [2, 4],
                                  borderRadius: 2
                              }
                          }
                      }
                  },

                  labelLine: {
                      normal: {
                          show: false
                      }
                  },
                  data: this.data
              },
              {
                  name: 'Total Asset Value for',
                  type: 'pie',
                  radius: ['60%', '68%'],
                  center: ['50%', '50%'], 
                  label: {
                      normal: {
                          formatter: function (data) {  
                              return data.value.toLocaleString();
                          },
                          backgroundColor: '#eee',
                          position: 'top',
                          borderColor: '#aaa',
                          rich: {
                              b: {
                                  fontSize: 10,
                                  lineHeight: 33,
                                  color: '#000000'
                              },
                              per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                              }
                          }
                      }
                  },
                  data: this.totalValueAmount
              },
          ]
      };
  }

  onChartClickTest(event){
      if(event.data.name!='TOTAL'){
          this.criticalndNonCriticalBased = this.dialog.open(CriticalNoncriticalCountComponent, {
              height: 'auto',
              width: 'auto',
              data: {
                'assetStatus': event.data.name,
                'title': 'Critical and Non Critical Count for ' +  event.data.name + ' Assets',
                'status': event.data.name,
                'locationId':this.parentData.locationId,
                'locationName':this.parentData.locationName,
                'locationList':this.parentData.locationList,
              }
            });
            this.criticalndNonCriticalBased.disableClose = true;
            this.criticalndNonCriticalBased.afterClosed().subscribe(
              data => {
                this.ngOnInit();
              }); 
      }
      }

  ngOnDestroy() {
      if(this.criticalndNonCriticalBased != null){
          this.criticalndNonCriticalBased.close();
      }
      if(this.assetCategoryBased != null){
          this.assetCategoryBased.close();
      }
  }

  onChartClick(event){
      if(event.data.name!='TOTAL'){
          this.assetCategoryBased = this.dialog.open(ActiveAssetsComponent, {
              width: '60%',
              height: '500px',
              position: { top: '10%', left: '1%' },
              data: {
                'assetStatus': event.data.name,
                'title':  'Asset ' + event.data.name + ' by Condition',
                'statusId': event.data.statusId,
                'locationId': this.parentData.locationId,
                'locationName':this.parentData.locationName,
                'locationList':this.parentData.locationList,
                'theme': this.theme
              }
            });
            this.assetCategoryBased.disableClose = true;
            this.assetCategoryBased.afterClosed().subscribe(
              data => {
                this.ngOnInit();
              }); 
      }
  }

  assetStatusTranslate(assetStatus) {
      let result = '';
      this.translateService.get(assetStatus).subscribe(
          (transData : string) => {
              result = transData;
          }
      )
      
      return result;
  }

  openAssetRegScreen() {
      const AssetRegPath = ['home/asset/asset'];
      this.router.navigate(AssetRegPath);
    }


}
