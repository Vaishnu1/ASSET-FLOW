import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { CriticalNoncriticalCountComponent } from '../critical-noncritical-count/critical-noncritical-count.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryWiseAssetInfoComponent } from '../../category-wise-asset-info/category-wise-asset-info.component';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { Inject } from '@angular/core';
import { allassetStatus } from 'src/app/Constants/AllStatusConstants';

@Component({
    selector: 'app-active-assets',
    templateUrl: './active-assets.component.html',
    styleUrls: ['./active-assets.component.css']
})
export class ActiveAssetsComponent implements OnInit {

    options: any;
    displayCount: any;
    arrName: any;
    totalValueAmount: any = [{ value: 0, name: "", statusId: 0 }];
    sumValue: any;
    objData: any;
    optionData: any;
    criticalndNonCriticalBased;
    assetCategoryBased;

    showSpinner: boolean = false;

    displayTable: boolean = false;
    header: string = '';

    activeAssetCount: any = [];

    displayedColumns = ['sno', 'status', 'count', 'value', 'bookvalue'];
    assetDataSource = [];

    assetTotalCount: number = 0;
    assetTotalValue: number = 0;

    theme: string;
    locCurrCd: any;

    data1: any = [];

    constructor(private commonService: CommonService, private dialog: MatDialog, private translateService: TranslateService, private router: Router, public dialogRef: MatDialogRef<ActiveAssetsComponent>,
        @Inject(MAT_DIALOG_DATA) private data,
        private userSessionService: UserSessionService) { }

    ngOnInit() {
        this.header = this.data.title;
        this.theme = this.data.theme;
        this.locCurrCd = this.userSessionService.getlocCurrCd();
        this.fetchListOfActiveAssets();
    }

    viewInTableMode() {
        this.displayTable = true;
    }

    viewInGraphMode() {
        this.displayTable = false;
    }

    fetchListOfActiveAssets() {
        this.commonService.commonGetService('fetchListOfAssetCount.sams', this.data.locationId.toString(), this.data.locationList, this.data.statusId).subscribe(
            dataValue => {
                if (dataValue.success) {
                    this.activeAssetCount = dataValue.responseData.dataList;
                    this.options = this.getChartOptionsTest();
                }
            }
        );
    }

    passParameterToValue() {

        if (this.activeAssetCount.length > 0) {
            let data = [];
            // this.activeAssetCount.forEach(element => {
            //     if(this.data.statusId == element.statusType && element.status != allassetStatus[allassetStatus.NOT_IN_STOCK]){
            //         this.assetTotalCount = this.assetTotalCount + element.count;
            //         this.assetTotalValue = this.assetTotalValue + element.value;
            //     let test = {
            //         name: this.assetStatusTranslate(element.status),
            //         value: element.count,
            //         totalValue: element.value,
            //         statusId: element.assetStatusId,
            //         bookValue: element.bookValue
            //     }

            //     let totalValueAmount = {
            //         value: element.value,
            //         name: this.assetStatusTranslate(element.status),
            //         statusId: element.assetStatusId
            //     }

            //     data.push(test);
            //     this.totalValueAmount.push(totalValueAmount);
            //   }

            // });

            // new asset status
            this.activeAssetCount.forEach(element => {
                if (this.data.statusId == element.assetStatusId) {
                    this.assetTotalCount = this.assetTotalCount + element.count;
                    this.assetTotalValue = this.assetTotalValue + element.value;
                    let test = {
                        name: this.assetStatusTranslate(element.assetConditionName),
                        value: element.count,
                        totalValue: element.value,
                        statusId: element.assetConditionId,
                        bookValue: element.bookValue
                    }

                    let totalValueAmount = {
                        value: element.value,
                        name: this.assetStatusTranslate(element.assetConditionName),
                        statusId: element.assetConditionId
                    }

                    data.push(test);
                    this.totalValueAmount.push(totalValueAmount);
                }

            });

            this.data1 = data;

        }
    }

    getChartOptionsTest() {
        this.showSpinner = true;

        this.passParameterToValue();

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
                    data: this.data1
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

    onChartClickTest(event) {
        if (event.data.name != 'TOTAL') {
            this.criticalndNonCriticalBased = this.dialog.open(CriticalNoncriticalCountComponent, {
                height: 'auto',
                width: 'auto',
                data: {
                    'assetStatus': event.data.name,
                    'title': 'Critical and Non Critical Count for ' + event.data.name + ' Assets',
                    'status': event.data.name,
                    'locationId': this.data.locationId,
                    'locationName': this.data.locationName,
                    'locationList': this.data.locationList,
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
        if (this.criticalndNonCriticalBased != null) {
            this.criticalndNonCriticalBased.close();
        }
        if (this.assetCategoryBased != null) {
            this.assetCategoryBased.close();
        }
    }

    onChartClick(event) {
        console.log("event---", event);
        if (event.data.name != 'TOTAL') {
            this.assetCategoryBased = this.dialog.open(CategoryWiseAssetInfoComponent, {
                width: '60%',
                height: '500px',
                position: { top: '10%', left: '1%' },
                data: {
                    'assetStatus': event.data.name,
                    'title': 'Asset ' + event.data.name + ' by Category',
                    'statusId': event.data.statusId,
                    'locationId': this.data.locationId,
                    'locationName': this.data.locationName,
                    'locationList': this.data.locationList,
                }
            });
            this.assetCategoryBased.disableClose = true;
            this.assetCategoryBased.afterClosed().subscribe(
                data => {
                    //   this.ngOnInit();
                });
        }
    }

    assetStatusTranslate(assetStatus) {
        let result = '';
        this.translateService.get(assetStatus).subscribe(
            (transData: string) => {
                result = transData;
            }
        )

        return result;
    }

    openAssetRegScreen() {
        const AssetRegPath = ['home/asset/asset'];
        this.router.navigate(AssetRegPath);
    }


    closeAssetModal() {
        this.dialogRef.close();
    }

    navigateAssetScreen(event){
        console.log("event",event)
        localStorage.setItem('locationId', this.data.locationId);
        localStorage.setItem('locationName', this.data.locationName);
        this.router.navigate(['home/asset/assetListV1/status/' +event.data.statusId+ '/' +this.data.statusId]);   

    }

}