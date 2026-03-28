import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { MonthwiseRetiredDisposedComponent } from '../monthwise-retired-disposed/monthwise-retired-disposed.component';
import { MatDialog } from '@angular/material/dialog';
import { SelectRetiredDisposedOptionComponent } from '../../select-retired-disposed-option/select-retired-disposed-option.component';
import { RetireDisposalCategoryWiseCountComponent } from '../../retire-disposal-category-wise-count/retire-disposal-category-wise-count.component';
import { Subject } from 'rxjs';
import { SubcategoryWiseAssetInfoComponent } from '../../subcategory-wise-asset-info/subcategory-wise-asset-info.component';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

import { allassetStatus , allAssetRetirmentStatus } from 'src/app/Constants/AllStatusConstants';
import { TranslateService } from '@ngx-translate/core';
@Component({
    selector: 'app-inactive-assets',
    templateUrl: './inactive-assets.component.html',
    styleUrls: ['./inactive-assets.component.css']
})
export class InactiveAssetsComponent implements OnInit {

    @Input() parentData: any;
    @Input() resetFormSubject: Subject<boolean> = new Subject<boolean>();
    @Input() transactionSourceForCategory: any;

    repairCount: number = 0;
    repairValue: number = 0;
    disposedCount: number = 0;
    disposedValue: number = 0;
    retiredCount: number = 0;
    retiredValue: number = 0;
    disposedStatus: number = 0;
    retiredStatus: number = 0;

    option: any;
    option1: any;
    financialYear: string = '';
    displayChart: boolean = true;
    monthWiseChart;
    assetCategoryBasedOnLoc;
    noRecord1: boolean;
    noRecord2: boolean;

    retDisChart: boolean;
    assetChart: boolean;
    noRecordForRetDisChart: boolean;
    noRecordForAssetChart: boolean;
    dropDownDisplayForAssetChart: boolean;
    dropDownDisplayForRetDisChart: boolean;
    assetsubCategoryBased: any;

    displayAssetType: boolean;
    noRecord: boolean;
    value: string;
    number: number;
    assetTypeName: any[];
    data: {
        value: number;
        name: string;
        statusId: string;
        categoryId: number;
    }[];

    sum: {
        value: number;
        name: string;
    }[];

    selectedDropDown: any;
    totalCount: number;
    totalValue: number;

    totalAssets: number;
    totalValueOfAssets: number;

    others: string;
    assetCategory:string;
    theme: string;
    locCurrCd: any;

    retiredStatusName : String = "";
    disposedStatusName : String = "";

    

    constructor(private commonService: CommonService,
        private assetOptimaConstants: AssetOptimaConstants,
        private readonly dialog: MatDialog,
        private translateService: TranslateService,
        private userSessionService: UserSessionService) {
        // this.financialYear = this.financialYearList[(this.financialYearList.findIndex(x => x.name === ((new Date().getFullYear()).toString())))].name;
        this.financialYear = null;
        this.displayAssetType = false;
        this.noRecord = false;
        this.value = this.AssetType[0].name;
        this.assetTypeName = [];
        this.data = [];
        this.sum = [];
        this.selectedDropDown = '';
        this.totalCount = 0;
        this.totalValue = 0;
        this.totalAssets = 0;
        this.totalValueOfAssets = 0;
        this.noRecord1 = false;
        this.noRecord2 = false;

        this.retDisChart = true;
        this.assetChart = true;
        this.noRecordForAssetChart = false;
        this.noRecordForRetDisChart = false;

        this.dropDownDisplayForAssetChart = true;
        this.dropDownDisplayForRetDisChart = true;

        this.others = "others";
        this.assetCategory = 'Asset Category';
 
    }

    ngOnInit() {

    this.translateService.get([allAssetRetirmentStatus[allAssetRetirmentStatus.RETIRED], allAssetRetirmentStatus[allAssetRetirmentStatus.DISPOSED]])
    .subscribe(val => {  
        const status = Object.values(val)
        this.retiredStatusName = status[0].toString();
        this.disposedStatusName = status[1].toString();
    }); 

        this.locCurrCd = this.userSessionService.getlocCurrCd();
        this.resetFormSubject.subscribe(response => {
            if (response) {
                this.theme = localStorage.getItem('theme');
                this.changeFinancialYear()

            }
        });
    }

    fetchListOfAllInactiveAssets(financialYear) {

        this.dropDownDisplayForAssetChart = false;
        this.assetChart = false;
        this.retDisChart = true;
        this.noRecordForRetDisChart = false;
        this.noRecordForAssetChart = false;
        this.noRecord = false;

        this.commonService.commonGetService('fetchListOfInactiveAsset.sams', this.parentData.locationId.toString(),
            financialYear, this.userSessionService.getUserFinancialStartYear(), this.userSessionService.getUserFinancialEndYear(), this.parentData.locationList).subscribe(
                data => {
                    if (data.success) {

                        if (data.responseData.dataList.length > 0) {
                            let inactiveAssets = data.responseData.dataList;
                            for (var i = 0; i < inactiveAssets.length; i++) {
                                if (inactiveAssets[i].status == 'DISPOSED') {
                                    this.disposedCount = inactiveAssets[i].assetInactiveCount;
                                    this.disposedStatus = inactiveAssets[i].status;
                                    this.disposedValue = inactiveAssets[i].totalPurchaseAmt;
                                } else if (inactiveAssets[i].status == 'RETIRED') {
                                    this.retiredCount = inactiveAssets[i].assetInactiveCount;
                                    this.retiredStatus = inactiveAssets[i].status;
                                    this.retiredValue = inactiveAssets[i].totalPurchaseAmt;
                                }
                            }

                            this.option = this.getChartList();
                        } else {

                            this.retDisChart = false;
                            this.noRecordForRetDisChart = true;

                        }

                    }
                }
            );
    }

    fetchCountAndValueOfAssets(financialYear) {

        this.dropDownDisplayForRetDisChart = false;
        this.retDisChart = false;
        this.assetChart = true;
        this.noRecordForAssetChart = false;
        this.noRecordForRetDisChart = false;
        this.noRecord = false;

        this.data = [];
        this.sum = [];
        this.assetTypeName = [];
        this.totalCount = 0;
        this.totalValue = 0;

        if (this.selectedDropDown === '') {
            this.selectedDropDown = this.assetCategory;
        }
        this.commonService.commonGetService('fetchListOfCategoryCount.sams', this.parentData.locationId.toString(),
            this.selectedDropDown, this.parentData.locationList, financialYear).subscribe(data => {
                if (data.success) {
                    
                    if (this.selectedDropDown === this.assetCategory) {

                    this.totalAssets = 0;
                    this.totalValueOfAssets = 0;

                    }

                    if (data.responseData.dataList.length > 0) {
                        const categoryAsset = data.responseData.dataList;
                        
                        for (this.number = 0; this.number < categoryAsset.length; this.number++) {

                            if (this.selectedDropDown === this.assetCategory) {

                                
                                this.totalAssets += categoryAsset[this.number].count;
                                this.totalValueOfAssets += categoryAsset[this.number].value;
                            }
                            if (this.number > 9) {
                                if (this.assetTypeName[10] !== this.others) {
                                    this.assetTypeName = this.assetTypeName.concat(this.others);
                                }
                            } else if (this.number <= 9) {
                                this.assetTypeName = this.assetTypeName.concat(categoryAsset[this.number].category);
                            }
                            if (this.number > 9) {

                                this.totalCount += categoryAsset[this.number].count;

                                if (this.number === categoryAsset.length - 1) {
                                    this.data = this.data.concat({
                                        value: this.totalCount,
                                        name: this.others,
                                        statusId: this.others,
                                        categoryId: 0
                                    });
                                }
                            } else if (this.number <= 9) {

                                this.data = this.data.concat({
                                    value: categoryAsset[this.number].count,
                                    name: categoryAsset[this.number].category,
                                    statusId: categoryAsset[this.number].assetStatusId,
                                    categoryId: categoryAsset[this.number].categoryId
                                });
                            }
                            if (this.number > 9) {
                                this.totalValue += categoryAsset[this.number].value;
                                if (this.number === categoryAsset.length - 1) {
                                    this.sum = this.sum.concat({
                                        value: this.totalValue,
                                        name: this.others
                                    });
                                }
                            } else if (this.number <= 9) {
                                this.sum = this.sum.concat({
                                    value: categoryAsset[this.number].value,
                                    name: categoryAsset[this.number].category
                                });
                            }


                        }

                        this.option1 = this.getAllAssetChartList();
                    } else {

                        this.assetChart = false;
                        this.noRecordForAssetChart = true;
                    }
                }
            });

    }

    getAllAssetChartList() {

        return {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: { 
                bottom: 0,
                left: 'center',
                data: this.assetTypeName
            },
            series: [
                {
                    name: 'Total Asset Count for',
                    type: 'pie',
                    radius: [0, '45%'],
                    center: ['45%', '45%'],
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
                    radius: ['50%', '55%'],
                    center: ['45%', '45%'], 
                    // radius: ['65%', '78%'],
                    // center: ['25%', '50%'],
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
                                    lineHeight: 33
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
                    data: this.sum                    
                }, 
            ]
        };

    } 

    getChartList() {

        return {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                bottom: 15,
                left: 'center',
                data: [this.disposedStatusName, this.retiredStatusName]
            },
            series: [
                {
                    name: 'Total Asset Count for',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '30%'],
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
                    data: [
                        { value: this.disposedCount, name: this.disposedStatusName, statusId: this.disposedStatus },
                        { value: this.retiredCount, name: this.retiredStatusName, statusId: this.retiredStatus }
                    ]
                },
                {
                    name: 'Total Asset Value for',
                    type: 'pie',
                    radius: ['40%', '55%'],
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
                                    lineHeight: 33
                                },
                                per: {
                                    padding: [2, 4],
                                    borderRadius: 2
                                }
                            }
                        }
                    },
                    data: [
                        { value: this.disposedValue, name: this.disposedStatusName },
                        { value: this.retiredValue, name: this.retiredStatusName }
                    ]
                }
            ]
        };
       
    }

    financialYearList = [
        { id: 1, name: '2015' },
        { id: 2, name: '2016' },
        { id: 3, name: '2017' },
        { id: 4, name: '2018' },
        { id: 5, name: '2019' },
        { id: 6, name: '2020' },
        { id: 7, name: '2021' },
        { id: 8, name: '2022' },
        { id: 9, name: '2023' },
        { id: 10, name: '2024' },
        { id: 11, name: '2025' },
        { id: 12, name: '2026' },
        { id: 13, name: '2027' },
        { id: 14, name: '2028' },
        { id: 15, name: '2029' },
        { id: 16, name: '2030' },
    ];

    AssetType = [
        { id: 1, name: 'Asset Category' },
        { id: 2, name: 'Sub Category' },
        // { id: 3, name: 'Supplier Name' },
        // { id: 4, name: 'Model' },
        // { id: 5, name: 'Functionality' },
        // { id: 6, name: 'Asset Group' },

    ];

    changeFinancialYear() {

        var dt = new Date().getFullYear();
        if (this.financialYear != null || this.financialYear != undefined || this.financialYear != "") {
            if (Number(this.financialYear) > Number(dt)) {

                this.assetChart = false;
                this.retDisChart = false;
                this.noRecord = true;
                this.noRecordForAssetChart = false;
                this.noRecordForRetDisChart = false;


            } else {

                if (this.transactionSourceForCategory === "CATEGORY") {
                    this.fetchCountAndValueOfAssets(this.financialYear);


                } else {
                    this.fetchListOfAllInactiveAssets(this.financialYear);


                }
            }

        }
    }
    
    monthWiseInactiveAssets() {
        this.monthWiseChart = this.dialog.open(MonthwiseRetiredDisposedComponent, {
            width: '50%',
            height: '22%',
            position: { top: '1em' },
            data: {
            }
        });
        this.monthWiseChart.disableClose = true;
        this.monthWiseChart.afterClosed().subscribe(
            data => {
                if (data.exit) {
                    let dialogRef1 = this.dialog.open(SelectRetiredDisposedOptionComponent, {
                        height: '500px',
                        width: '75%',
                        data: {
                            'assetStatus': data.value,
                            'financialYr': this.financialYear,
                            'locationId': this.parentData.locationId,
                            'locationName': this.parentData.locationName,
                            'locationList': this.parentData.locationList,
                        }
                    });
                    dialogRef1.afterClosed().subscribe(
                        data => {
                        });
                    this.ngOnInit();
                }
            });
    }

    assetcategoryBased;

    onChartClick(event) {
        this.assetcategoryBased = this.dialog.open(RetireDisposalCategoryWiseCountComponent, {
            width: '60%',
            height: '500px',
            position: { top: '10%', left: '1%' },
            data: {
                'status': event.name,
                'title': 'Category wise count for ' + event.name,
                'year': this.financialYear,
                'locationId': this.parentData.locationId,
                'locationName': this.parentData.locationName,
                'locationList': this.parentData.locationList,
            }
        });
        this.assetcategoryBased.disableClose = true;
        this.assetcategoryBased.afterClosed().subscribe(
            data => {
                this.ngOnInit();
            });
    }

    onAssetChartClick(event) {
        
        if (this.selectedDropDown === this.assetCategory) {
            this.assetsubCategoryBased = this.dialog.open(SubcategoryWiseAssetInfoComponent, {
                width: '60%',
                height: '500px',
                position: { top: '10%', left: '1%' },
                data: {
                    'category': event.data.name,
                    'title': 'Sub Category count for ' + event.data.name,
                    'statusId': 0,
                    'locationId': this.parentData.locationId,
                    'locationName': this.parentData.locationName,
                    'locationList': this.parentData.locationList,
                    'year': this.financialYear,
                    'categoryId':event.data.categoryId,
                }
            });
            this.assetsubCategoryBased.disableClose = true;
            this.assetsubCategoryBased.afterClosed().subscribe(
                data => {
                    this.ngOnInit();
                });
        }
    }

    ngOnDestroy() {


        if (this.assetsubCategoryBased != null) {
            this.assetsubCategoryBased.close();
        }


        if (this.assetcategoryBased != null) {
            this.assetcategoryBased.close();
        }
    }

    getCategoryComboValue(event) {

        this.selectedDropDown = event.name;
        this.changeFinancialYear()

    }


} 
