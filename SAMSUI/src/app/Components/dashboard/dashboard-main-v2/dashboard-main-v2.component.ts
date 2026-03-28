import { Component, OnInit, NgZone, Input } from '@angular/core';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { Subject } from 'rxjs';
import { title } from 'process';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AssetBySubCategoryV2Component } from '../charts/asset-by-sub-category-v2/asset-by-sub-category-v2.component';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-dashboard-main-v2',
  templateUrl: './dashboard-main-v2.component.html',
  styleUrls: ['./dashboard-main-v2.component.css']
})
export class DashboardMainV2Component implements OnInit {

  // VARIABLES
  locationCombo: any;
  tabList: string[] = [];
  scrollLocationNamesync: boolean;
  locationNamePageNumber: number;
  limitCount: string;
  allBranch: string;
  locationList: string;
  ageMode = 'current';

  // CHANGE TO inventory WITHOUT FAIL ON PROD
  // activetab: string = 'inventory';

  // TAB ACCESS
  tabsList = ['inventory', 'maintenance', 'contracts', 'financial'];
  activetab: string = '';

  // GROUP ACCESS
  assetInventoryTabAccessModule: ModuleAccessModel;
  maintenanceTabAccessModule: ModuleAccessModel;
  contractWarrantyTabAccessModule: ModuleAccessModel;
  financialTabAccessModule: ModuleAccessModel;

  // ASSET INVENTORY
  assetCategoryOption;
  assetOwnershipOption;
  assetStatusConditionOption;

  // MAINTENANCE
  recurringBreakdownsOption;
  bmAgingOption;
  maintenanceCostBreakdownOption;
  exceedingSlaForBreakdownOption;
  mttrBreakdownOption;
  mtbfBreakdownOption;

  // CONTRACT WARRANTY
  warrantyCoverageOption;
  typeDistributionOption;
  expiryTimelineOption;
  expiredTimelineOption;
  topVendorsOption;
  valueByTypeOption;

  // FINANCIAL
  poTrendOption;
  assetsRetiringByCategoryReasonOption;
  assetRetirementsTimelineOption;

  // ASSET INVENTORY TAB
  summaryCardsDataAssetInventory: any[] = [];
  loanedCardsDataAssetInventory: any[] = [];
  categoryChartDataAssetInventory: any[] = [];
  ownershipChartDataAssetInventory: any[] = [];
  statusChartDataAssetInventory: any[] = [];
  assetCurrentAgeChartDataAssetInventory: any[] = [];
  assetRemainingAgeChartDataAssetInventory: any[] = [];
  ageData = [...this.assetCurrentAgeChartDataAssetInventory];

  // MAINTENANCE TAB
  summaryCardsDataAssetMaintenance: any[] = [];
  bmAgeingDataAssetInventory: any[] = [];
  bmAgeingTotalDataAssetInventory: any[] = [];
  recurringBreakdownsAssetMaintenance: any[] = [];
  exceedingSlaForBreakdownAssetMaintenance: any[] = [];
  maintenanceCostBreakdown: {
    amc_cmc: number;
    spare: number;
    consumables: number;
    accessories: number;
    service: number;
  };
  mttrBreakdownAssetMaintenance: any[] = [];
  mtbfBreakdownAssetMaintenance: any[] = [];

  // CONTRACT WARRANTY TAB
  summaryCardsDataContractWarranty: any[] = [];
  warrantyCoverageDataContractWarranty: any[] = [];
  typeDistributionDataContractWarranty: any[] = [];
  expiryTimelineDataContractWarranty: any[] = [];
  expiredTimelineDataContractWarranty: any[] = [];
  topVendorsDataContractWarranty: any[] = [];
  valueByTypeDataContractWarranty: any[] = [];

  // FINANCIAL TAB
  summaryCardsDataFinancial: any[] = [];
  poTrendDataFinancial: any[] = [];
  assetRetirementByCategoryDataFinancial: string = '[]';
  assetRetirementTimelineDataFinancial: string = '[]';

  // SEARCH VARIABLES
  public frame1Data = { 'locationId': 0, 'status': '', 'srStatus': '', 'srFunctionality': '', 'locationName': '', 'locationList': '', 'theme': '' };
  // resetFormSubject: Subject<boolean> = new Subject<boolean>();

  @Input() parentData: any;
  @Input() resetFormSubject: Subject<boolean> = new Subject<boolean>();
  options: any;
  data: any;
  displayCount: any;
  arrName: any;
  arrValue: any;
  totalValueAmount: any = [{ value: 0, name: "", statusId: 0 }];
  sumValue: any;
  objData: any;
  optionData: any;
  criticalndNonCriticalBased;
  assetCategoryBased;

  ;

  // CONSTRUCTOR
  constructor(private readonly zone: NgZone,
    private readonly commonService: CommonService,
    private readonly assetOptimaService: AssetOptimaServices,
    private router: Router,
    private dialog: MatDialog,
    public userSession: UserSessionService
  ) {
    this.locationCombo = [];
    this.scrollLocationNamesync = false;
    this.locationNamePageNumber = 1;
    this.allBranch = "ALL BRANCHES";

    // API TO GET BRANCH LIST DROPDOWN
    this.commonService.getComboResults(this.assetOptimaService.listAllUserLocForCombo, '', '', '', this.limitCount, this.locationNamePageNumber).subscribe(
      (data) => {
        if (data.success) {
          this.locationList = "";

          for (const value of data.responseData.comboList) {
            this.locationList = `${this.locationList} ${value.locationId.toString()},`;
          }

          this.locationList = this.locationList.substring(0, this.locationList.length - 1);

          if (this.locationList !== "") {
            this.frame1Data.locationList = this.locationList;
            this.frame1Data.locationId = -1;
            this.frame1Data.locationName = this.allBranch;
            this.resetFormSubject.next(true);
          }
        }
      }
    );
  }

  // ON INIT
  ngOnInit() {
    // GROUP ACCESS
    this.assetInventoryTabAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_V2_DASHBOARD_ASSET_INVENTORY_TAB'];
    this.maintenanceTabAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_V2_DASHBOARD_MAINTENANCE_TAB'];
    this.contractWarrantyTabAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_V2_DASHBOARD_CONTRACT_WARRANTY_TAB'];
    this.financialTabAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_V2_DASHBOARD_FINANCIAL_TAB'];

    this.tabList = ['inventory', 'maintenance', 'contracts', 'financial'];

    //SET TAB ACCESS
    this.setActiveTab();

    // RUN THE ASSET INVENTORY API ON INIT AND OTHER API'S ON TAB CLICK
    this.resetFormSubject.subscribe(response => {
      if (response) {
        // this.fetchAssetInventoryDashboardData();
        switch (this.activetab) {
          case 'inventory':
            this.fetchAssetInventoryDashboardData();
            break;
          case 'maintenance':
            this.fetchMaintenanceDashboardData();
            break;
          case 'contracts':
            this.fetchContractWarrantyDashboardData();
            break;
          case 'financial':
            this.fetchFinancialDashboardData();
            break;
        }
      }
    });
  }

  // SET TAB ACCESS - VIEW TABS BASED ON ACCESS
  setActiveTab() {
    const tabAccessMap = {
      inventory: this.assetInventoryTabAccessModule?.readFlagDisplay,
      maintenance: this.maintenanceTabAccessModule?.readFlagDisplay,
      contracts: this.contractWarrantyTabAccessModule?.readFlagDisplay,
      financial: this.financialTabAccessModule?.readFlagDisplay
    };

    for (const tab of this.tabsList) {
      if (tabAccessMap[tab]) {
        this.activetab = tab;
        break;
      }
    }

    // Optional fallback if none has read access
    if (!this.activetab) {
      this.activetab = 'inventory';
    }
  }

  // CHECK IF USER HAS NO ACCESS TO DASHBOARD
  get hasAnyDashboardAccess(): boolean {
    return (
      this.assetInventoryTabAccessModule?.readFlagDisplay ||
      this.maintenanceTabAccessModule?.readFlagDisplay ||
      this.contractWarrantyTabAccessModule?.readFlagDisplay ||
      this.financialTabAccessModule?.readFlagDisplay
    );
  }

  // API TO FETCH ASSET INVENTORY TAB CHARTS DATA
  fetchAssetInventoryDashboardData() {
    this.commonService.showSpinner();
    this.commonService.commonGetService('fetchAssetInventoryDashboardData.sams', this.frame1Data.locationId.toString(), this.frame1Data.locationList).subscribe(
      data => {
        if (data.success) {
          this.commonService.hideSpinner();
          this.summaryCardsDataAssetInventory = data.responseData.summaryAssetInventoryDataList;
          this.loanedCardsDataAssetInventory = data.responseData.loanedAssetDataList;
          this.categoryChartDataAssetInventory = data.responseData.categoryChartData;
          this.ownershipChartDataAssetInventory = data.responseData.ownershipChartData;
          this.statusChartDataAssetInventory = data.responseData.statusChartData;
          this.assetCurrentAgeChartDataAssetInventory = data.responseData.ageChartCurrentData;
          this.assetRemainingAgeChartDataAssetInventory = data.responseData.ageChartRemainingData;

          // SET CHART OPTIONS
          this.assetCategoryOption = this.getCategoryChartOptions();
          this.assetOwnershipOption = this.getOwnershipChartOptions();
          this.assetStatusConditionOption = this.getAssetStatusConditionChartOptions();
        } else {
          this.commonService.openToastErrorMessage('Unable to get the Asset Inventory data. Try contacting admin!')
          this.commonService.hideSpinner();
        }
      }, error => {
        this.commonService.hideSpinner();
        this.summaryCardsDataAssetInventory = [];
        this.loanedCardsDataAssetInventory = [];
        this.categoryChartDataAssetInventory = [];
        this.ownershipChartDataAssetInventory = [];
        this.statusChartDataAssetInventory = [];
        this.assetCurrentAgeChartDataAssetInventory = [];
        this.assetRemainingAgeChartDataAssetInventory = [];
        this.commonService.openToastErrorMessage('Error fetching Asset Inventory data. Check your connection or contact admin!');
      }
    )
  }

  // API TO FETCH MAINTENANCE TAB CHARTS DATA
  fetchMaintenanceDashboardData() {
    this.commonService.showSpinner();
    this.commonService.commonGetService('fetchAssetMaintenanceDashboardData.sams', this.frame1Data.locationId.toString(), this.frame1Data.locationList).subscribe(
      data => {
        if (data.success) {
          this.commonService.hideSpinner();
          this.summaryCardsDataAssetMaintenance = data.responseData.summaryAssetMaintenanceDataList;
          this.bmAgeingDataAssetInventory = data.responseData.bmAgeingDataList;
          this.bmAgeingTotalDataAssetInventory = data.responseData.bmAgeingTotalDataList;
          this.recurringBreakdownsAssetMaintenance = data.responseData.recurringBreakdownDataList;
          this.maintenanceCostBreakdown = data.responseData.maintenanceCostBreakdownDataList;
          this.exceedingSlaForBreakdownAssetMaintenance = data.responseData.exceedingSlaForBmDataList;
          this.mttrBreakdownAssetMaintenance = data.responseData.mttrDistributionDataList;
          this.mtbfBreakdownAssetMaintenance = data.responseData.mtbfDistributionDataList;

          // SET CHART OPTIONS
          this.bmAgingOption = this.getBmAgingChartOptions();
          this.recurringBreakdownsOption = this.getRecurringBmChartOptions();
          this.maintenanceCostBreakdownOption = this.getMaintenanceCostBreakdownChartOptions();
          this.exceedingSlaForBreakdownOption = this.getExceedingSlaForBreakdownChartOptions();
          this.mttrBreakdownOption = this.getMttrBreakdownChartOptions1();
          this.mtbfBreakdownOption = this.getMtbfBreakdownChartOptions();
        } else {
          this.commonService.openToastErrorMessage('Unable to get the Asset Maintenance data. Try contacting admin!')
          this.commonService.hideSpinner();
        }
      }, error => {
        this.commonService.hideSpinner();
        this.summaryCardsDataAssetMaintenance = [];
        this.bmAgeingDataAssetInventory = [];
        this.bmAgeingTotalDataAssetInventory = [];
        this.recurringBreakdownsAssetMaintenance = [];
        this.maintenanceCostBreakdown = { amc_cmc: 0, spare: 0, consumables: 0, accessories: 0, service: 0 };
        this.exceedingSlaForBreakdownAssetMaintenance = [];
        this.mttrBreakdownAssetMaintenance = [];
        this.mtbfBreakdownAssetMaintenance = []
        this.commonService.openToastErrorMessage('Error fetching Asset Maintenance data. Check your connection or contact admin!');
      }
    )
  }

  // API TO FETCH CONTRACTS WARRANTY TAB CHARTS DATA
  fetchContractWarrantyDashboardData() {
    this.commonService.showSpinner();
    this.commonService.commonGetService('fetchContractWarrantyDashboardData.sams', this.frame1Data.locationId.toString(), this.frame1Data.locationList).subscribe(
      data => {
        if (data.success) {
          this.commonService.hideSpinner();
          console.log(data.responseData)
          this.summaryCardsDataContractWarranty = data.responseData.summaryContractWarrantyDataList;
          this.warrantyCoverageDataContractWarranty = data.responseData.warrantyCoverageDataList;
          this.typeDistributionDataContractWarranty = data.responseData.typeDistributionDataList;
          this.expiryTimelineDataContractWarranty = data.responseData.expiryTimelineDataList;
          this.expiredTimelineDataContractWarranty = data.responseData.expiredTimelineDataList;
          this.topVendorsDataContractWarranty = data.responseData.topVendorsDataList;
          this.valueByTypeDataContractWarranty = data.responseData.valueByTypeDataList;

          // SET CHART OPTIONS
          this.warrantyCoverageOption = this.getWarrantyCoverageOptions();
          this.typeDistributionOption = this.getTypeDistributionOptions();
          this.expiryTimelineOption = this.getExpiryTimelineOptions();
          this.expiredTimelineOption = this.getExpiredTimelineOptions();
          this.topVendorsOption = this.getTopVendorsOptions();
          this.valueByTypeOption = this.getValueByTypeOptions();
        } else {
          this.commonService.openToastErrorMessage('Unable to get the Contract - Warranty data. Try contacting admin!')
          this.commonService.hideSpinner();
        }
      }, error => {
        this.commonService.hideSpinner();
        this.summaryCardsDataContractWarranty = [];
        this.warrantyCoverageDataContractWarranty = [];
        this.typeDistributionDataContractWarranty = [];
        this.expiryTimelineDataContractWarranty = [];
        this.expiredTimelineDataContractWarranty = [];
        this.topVendorsDataContractWarranty = [];
        this.valueByTypeDataContractWarranty = [];
        this.commonService.openToastErrorMessage('Error fetching Contract - Warranty data. Check your connection or contact admin!');
      }
    )
  }

  // API TO FETCH FINANCIAL TAB CHARTS DATA
  fetchFinancialDashboardData() {
    this.commonService.showSpinner();
    this.commonService.commonGetService('fetchFinancialDashboardData.sams', this.frame1Data.locationId.toString(), this.frame1Data.locationList).subscribe(
      data => {
        if (data.success) {
          this.commonService.hideSpinner();
          this.summaryCardsDataFinancial = data.responseData.summaryFinancialDataList;
          this.poTrendDataFinancial = data.responseData.poTrendLast6Months;
          this.assetRetirementByCategoryDataFinancial = data.responseData.retirementReasonByCategory;
          this.assetRetirementTimelineDataFinancial = data.responseData.retirementTimelineNext6Months;

          this.poTrendOption = this.getPoTrendOptions();
          this.assetsRetiringByCategoryReasonOption = this.getAssetsRetiringByCategoryReasonOptions();
          this.assetRetirementsTimelineOption = this.getAssetRetirementsTimelineOptions();
        } else {
          this.commonService.openToastErrorMessage('Unable to get the Financial data. Try contacting admin!')
          this.commonService.hideSpinner();
        }
      }, error => {
        this.commonService.hideSpinner();
        this.summaryCardsDataFinancial = [];
        this.poTrendDataFinancial = [];
        this.assetRetirementByCategoryDataFinancial = '[]';
        this.assetRetirementTimelineDataFinancial = '[]';
        this.commonService.openToastErrorMessage('Error fetching Financial data. Check your connection or contact admin!');
      }
    )
  }

  // CALL API ON ACTIVE TAB CLICK
  getChartData(chartType) {
    if (chartType === 'inventory') {
      this.fetchAssetInventoryDashboardData();
      this.activetab = chartType;
    } else if (chartType === 'maintenance') {
      this.activetab = chartType;
      this.fetchMaintenanceDashboardData();
    } else if (chartType === 'contracts') {
      this.activetab = chartType;
      this.fetchContractWarrantyDashboardData();
    } else if (chartType === 'financial') {
      this.activetab = chartType;
      this.fetchFinancialDashboardData();
    }
  }

  // CHART PROPERTIES FOR ASSET CATEGORY CHART
  getCategoryChartOptions() {
    const hasData = this.categoryChartDataAssetInventory && this.categoryChartDataAssetInventory.length > 0;

    // Check if there is at least one non-zero value
    const hasNonZeroData = this.categoryChartDataAssetInventory
      && this.categoryChartDataAssetInventory.some(item => item.value > 0);

    if (!hasNonZeroData) {
      // No Data scenario
      return {
        title: {
          text: 'Assets By Category',
          top: 'top',
          textStyle: { fontSize: 16 }
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: 'middle',
          style: {
            text: 'No data to display',
            fontSize: 18,
            fill: '#888'
          }
        }
      };
    }

    const transformedData = hasData
      ? this.categoryChartDataAssetInventory.map(item => ({
        // assetCategoryId: item.categoryId,
        name: item.label,
        value: item.value,
        categoryId: item.categoryId,
      }))
      : [{ name: '', value: 0, itemStyle: { color: '#c9c9c9' } }];

    let chartOption = {
      title: {
        text: 'Assets By Category',
        top: 'top',
        textStyle: { fontSize: 16 }
      },

      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          if (!hasData) return 'No data to display.';
          return `
            <div style="padding: 5px;">
              <strong>${params.seriesName}</strong><br/>
              <span style="font-size: 20px; color:${params.color};">●</span> ${params.name}: 
              <strong>${params.value}</strong> (${params.percent}%)
            </div>
          `;
        }
      },

      legend: {
        top: 'bottom',
        type: 'scroll',
        orient: 'horizontal',
        show: hasData
      },

      toolbox: {
        show: true,
        orient: 'horizontal',
        left: 'right',
        top: 'top',
        feature: {
          saveAsImage: {},
        }
      },

      series: [
        {
          name: hasData ? 'Asset Category' : '',
          type: 'pie',
          emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0,0,0,0.5)' } },
          animation: true,
          animationDuration: 1500,
          animationType: 'scale',
          radius: ['25%', '50%'],
          avoidLabelOverlap: true,
          center: ['45%', '50%'],
          itemStyle: {
            borderRadius: 6,
            borderColor: '#ffffff',
            borderWidth: 2
          },
          label: {
            show: hasData,
            formatter: function (params) {
              return `{nameStyle|${params.name}}\n{valueStyle|${params.value} (${params.percent}%)}`
            },
            rich: {
              nameStyle: {
                fontSize: 12,
                fontWeight: 'bold',
                color: '#333333',
                lineHeight: 16
              },
              valueStyle: {
                fontSize: 13,
                color: '#39393a'
              }
            }
          },
          data: transformedData
        }
      ]
    };
    return chartOption;
  }

  // CHART PROPERTIES FOR ASSET OWNERSHIP CHART
  getOwnershipChartOptions() {
    const total = this.ownershipChartDataAssetInventory.reduce((sum, d) => sum + d.value, 0);
    const hasData = total > 0;

    let chartOption = {
      title: {
        text: 'Assets By Ownership Status',
        top: 'top',
        textStyle: { fontSize: 16 }
      },

      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          if (!hasData) return 'No data to display.';
          const percent = ((params.value / total) * 100).toFixed(2);
          return `${params.seriesName}: ${params.value} (${percent}%)`;
        }
      },

      legend: {
        top: '35%',
        gap: 2,
        type: 'scroll',
        orient: 'horizontal',
        show: hasData
      },

      series: hasData
        ? this.ownershipChartDataAssetInventory.map((item) => ({
          name: `${item.label} (${item.value})`,
          type: 'bar',
          stack: 'ownership',
          barWidth: 50,
          label: { show: false },
          itemStyle: {
            borderRadius: 4,
            borderColor: '#ffffff',
            borderWidth: 1
          },
          data: [item.value]
        }))
        : [
          {
            name: 'No Data',
            type: 'bar',
            stack: 'ownership',
            barWidth: 50,
            label: {
              show: true,
              position: 'inside',
              formatter: 'No Data',
              color: '#636262'
            },
            itemStyle: {
              color: '#c9c9c9',
              borderColor: '#ddd',
              borderWidth: 1,
              borderRadius: 4
            },
            data: [1]
          }
        ],

      toolbox: {
        show: true,
        orient: 'horizontal',
        left: 'right',
        top: 'top',
        feature: {
          saveAsImage: {},
        }
      },

      grid: {
        top: '-37%',
        containLabel: true
      },

      xAxis: {
        type: 'value',
        max: hasData ? total : 1,
        show: false
      },

      yAxis: {
        type: 'category',
        data: [''],
        show: false
      },
    };

    return chartOption;
  }

  // CHART PROPERTIES FOR STATUS & CONDITION CHART
  getAssetStatusConditionChartOptions() {
    const statusOrder = ['NEW', 'IN_USE', 'NOT_IN_USE', 'MISSING', 'RETIRED'];
    const valueMap = new Map<string, number>();

    this.statusChartDataAssetInventory.forEach(item => {
      valueMap.set(item.label, item.value);
    });

    const orderedData = statusOrder.map(status => valueMap.get(status) || 0);
    const hasData = orderedData && orderedData.some(val => val > 0);

    const hasNonZeroData = orderedData.some(val => val > 0);

    if (!hasNonZeroData) {
      return {
        title: {
          text: 'Assets By Status',
          top: 'top',
          textStyle: { fontSize: 16, fontWeight: 'bold' }
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: 'middle',
          style: {
            text: 'No data to display',
            fontSize: 18,
            fill: '#888'
          }
        }
      };
    }


    const labelMap: { [key: string]: string } = {
      NEW: 'NEW',
      IN_USE: 'IN USE',
      NOT_IN_USE: 'NOT IN USE',
      MISSING: 'MISSING',
      RETIRED: 'RETIRED'
    };

    const xAxisLabels = statusOrder.map(status => labelMap[status]);

    let chartOption = {
      title: {
        text: 'Assets By Status',
        top: 'top',
        textStyle: { fontSize: 16, fontWeight: 'bold' }
      },

      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          return `${params.name}: ${params.value}`;
        }
      },

      toolbox: {
        show: true,
        orient: 'horizontal',
        left: 'right',
        top: 'top',
        feature: {
          saveAsImage: {},
          restore: {},
          magicType: {
            type: ['line']
          },
        }
      },

      series: [
        {
          data: orderedData,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: hasData ? 'rgba(180, 180, 180, 0.2)' : '#c9c9c9'
          },
          itemStyle: {
            color: function (params) {
              const colorList = ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE'];
              return colorList[params.dataIndex % colorList.length];
            }
          },
          label: {
            show: true,
            position: 'top'
          }
        }
      ],

      xAxis: {
        type: 'category',
        data: xAxisLabels,
        axisLabel: {
          rotate: 45
        }
      },

      yAxis: {
        type: 'value',
        name: 'Count',
        nameTextStyle: {
          fontWeight: 'bold'
        },
        max: (value) => this.getNearestMultipleOf5(value.max)
      },
    };

    return chartOption;
  }

  // CHART PROPERTIES FOR BREADKDOWN AGING CHART
  getBmAgingChartOptions() {
    const total = this.bmAgeingTotalDataAssetInventory.reduce((sum, d) => sum + d.value, 0);

    // Case 1: No data
    if (total === 0) {
      return {
        title: {
          text: 'Breakdown Maintenance - Aging',
          textStyle: { fontSize: 16, fontWeight: 'bold' }
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: 'middle',
          style: {
            text: 'No data to display',
            fontSize: 18,
            fill: '#888'
          }
        }
      };
    }

    return {
      title: {
        text: 'Breakdown Maintenance - Aging',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold'
        }
      },

      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          return `${params.name}: ${params.value}`;
        }
      },

      toolbox: {
        show: true,
        orient: 'horizontal',
        left: 'right',
        top: 'top',
        feature: {
          saveAsImage: {},
          restore: {},
          magicType: {
            type: ['line']
          },
        }
      },

      xAxis: {
        type: 'category',
        data: this.bmAgeingTotalDataAssetInventory.map(i => i.label),
        axisLabel: {
          rotate: 45
        },
        name: 'Period',
      },

      yAxis: {
        type: 'value',
        name: 'Count',
        nameTextStyle: {
          fontWeight: 'bold'
        },
        max: (value) => this.getNearestMultipleOf5(value.max),
      },

      series:
        [
          {
            data: this.bmAgeingTotalDataAssetInventory.map(i => i.value),
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            },
            itemStyle: {
              color: function (params) {
                const criticalColorMap = [
                  '#FCD34D', // 0–10 days
                  '#FBBF24', // 11–20 days
                  '#F97316', // 21–30 days
                  '#EF4444', // 31–60 days
                  '#DC2626', // 61–90 days
                  '#991B1B'  // 90+ days
                ];
                return criticalColorMap[params.dataIndex] || '#9CA3AF'; // fallback colour
              }
            },
            label: {
              show: true,
              position: 'top'
            },
          }
        ]
    }
  };

  // CHART PROPERTIES FOR RECURRING BREADKDOWN CHART
  getRecurringBmChartOptions() {
    const bucketLabels = ['1', '2', '3', '4', '5+'];

    const dataMap: Record<string, number> = {
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5+': 0
    };
    console.log(this.recurringBreakdownsAssetMaintenance)
    this.recurringBreakdownsAssetMaintenance.forEach(item => {
      if (item.bucket === '5+') {
        dataMap['5+'] = item.count;
      } else if (['1', '2', '3', '4'].includes(item.bucket)) {
        dataMap[item.bucket] = item.count;
      }
    });

    const seriesData = [
      dataMap['1'],
      dataMap['2'],
      dataMap['3'],
      dataMap['4'],
      dataMap['5+']
    ];

    const total = seriesData.reduce((a, b) => a + b, 0);

    //  Case 1: No data
    if (total === 0) {
      return {
        title: {
          text: 'Recurring Breakdowns (Last 3 months)',
          top: 'top',
          textStyle: { fontSize: 16 }
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: 'middle',
          style: {
            text: 'No data to display',
            fontSize: 18,
            fill: '#888'
          }
        }
      };
    }

    const markPoints = seriesData.map((val, index) => ({
      name: `B${index + 1}`,
      value: val,
      xAxis: index,
      yAxis: val
    }));

    return {
      title: {
        text: 'Recurring Breakdowns (Last 3 months)',
        top: 'top',
        textStyle: { fontSize: 16 }
      },

      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          const value = params[0].value;
          var breakdown = params[0].name;
          if (breakdown === '5+') breakdown = '5 and 5+';
          const assetText = value === 1 ? 'asset' : 'assets';
          return `${breakdown} Breakdown${breakdown === '1' ? '' : 's'}: ${value} ${assetText}`;
        }
      },

      toolbox: {
        show: true,
        orient: 'horizontal',
        left: 'right',
        top: 'top',
        feature: {
          saveAsImage: {},
          restore: {},
          magicType: {
            type: ['bar']
          }
        }
      },

      legend: {
        show: false
      },

      xAxis: {
        type: 'category',
        name: 'Breakdowns',
        nameLocation: 'middle',
        nameGap: 30,
        data: bucketLabels
      },

      yAxis: {
        type: 'value',
        name: 'Asset Count',
        max: (value) => this.getNearestMultipleOf5(value.max)
      },

      series: [
        {
          name: 'Breakdown',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: {
            width: 3
          },
          areaStyle: {
            opacity: 0.2
          },
          markPoint: {
            symbol: 'pin',
            symbolSize: 40,
            label: {
              show: true,
              formatter: '{c}'
            },
            data: markPoints
          },
          data: seriesData
        }
      ]
    };
  }

  // CHART PROPERTIES FOR MAINTENANCE COST BREADKDOWN CHART
  getMaintenanceCostBreakdownChartOptions() {
    const labels = ['AMC/CMC', 'Spare', 'Consumables', 'Accessories', 'Service'];

    const data = [
      this.maintenanceCostBreakdown?.amc_cmc || 0,
      this.maintenanceCostBreakdown?.spare || 0,
      this.maintenanceCostBreakdown?.consumables || 0,
      this.maintenanceCostBreakdown?.accessories || 0,
      this.maintenanceCostBreakdown?.service || 0
    ];

    const total = data.reduce((a, b) => a + b, 0);

    //  Case 1: No data
    if (total === 0) {
      return {
        title: {
          text: 'Maintenance Cost Breakdown (Last 3 months)',
          top: 'top',
          textStyle: { fontSize: 16 }
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: 'middle',
          style: {
            text: 'No data to display',
            fontSize: 18,
            fill: '#888'
          }
        }
      };
    }

    return {
      title: {
        text: 'Maintenance Cost Breakdown (Last 3 months)',
        top: 'top',
        textStyle: { fontSize: 16 }
      },

      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function (params) {
          const item = params[0];
          return `${item.name}: ₹${(+item.value).toLocaleString('en-IN')}`;
        }
      },

      grid: {
        left: '3%',
        right: '8%',
        bottom: '5%',
        top: '15%',
        containLabel: true
      },

      xAxis: {
        type: 'value',
        axisLabel: {
          formatter: function (value) {
            return '₹' + (+value).toLocaleString('en-IN');
          }
        }
      },

      yAxis: {
        type: 'category',
        data: labels,
        axisLabel: { fontSize: 12 },
        inverse: true,
      },

      toolbox: {
        show: true,
        orient: 'horizontal',
        left: 'right',
        top: 'top',
        feature: {
          saveAsImage: {},
          restore: {},
          magicType: {
            type: ['line']
          },
        }
      },

      series: [
        {
          name: 'Cost',
          type: 'bar',
          data: data,
          barWidth: '50%',
          itemStyle: {
            color: function (params) {
              const colorList = ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE'];
              return colorList[params.dataIndex % colorList.length];
            }
          },
          label: {
            show: true,
            position: 'top',
            formatter: function (params) {
              return '₹' + (+params.value).toLocaleString('en-IN');
            }
          }
        }
      ]
    };
  }

  // CHART PROPERTIES FOR EXCEEDING SLA'S FOR BREADKDOWN CHART
  getExceedingSlaForBreakdownChartOptions() {
    // const data1 = this.exceedingSlaForBreakdownAssetMaintenance.sort((a, b) => {
    //   const order = [
    //     'BOOKED → ACKNOWLEDGED',
    //     'ACKNOWLEDGED → IN PROGRESS',
    //     'IN PROGRESS → COMPLETED'
    //   ];
    //   return order.indexOf(a.name) - order.indexOf(b.name);
    // })
    // const order = [
    //   'BOOKED → ACKNOWLEDGED',
    //   'ACKNOWLEDGED → IN PROGRESS',
    //   'IN PROGRESS → COMPLETED'
    // ];

    // const data1 = Object.entries(this.exceedingSlaForBreakdownAssetMaintenance)
    //   .map(([name, value]) => ({ name, value }))
    //   .sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));

    const order = [
      'BOOKED → ACKNOWLEDGED',
      'ACKNOWLEDGED → IN PROGRESS',
      'IN PROGRESS → COMPLETED'
    ];

    let data1: { name: string; value: number }[] = [];

    if (Array.isArray(this.exceedingSlaForBreakdownAssetMaintenance)) {
      data1 = this.exceedingSlaForBreakdownAssetMaintenance.sort(
        (a, b) => order.indexOf(a.name) - order.indexOf(b.name)
      );
    } else {
      data1 = Object.entries(this.exceedingSlaForBreakdownAssetMaintenance)
        .map(([name, value]) => ({
          name,
          value: Number(value)
        }))
        .sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
    }

    const total = data1.reduce((sum, item) => sum + item.value, 0);

    //  No data case
    if (total === 0) {
      return {
        title: {
          text: "Exceeding SLA\'s for Breakdown Maintenance",
          top: 'top',
          textStyle: { fontSize: 16 }
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: 'middle',
          style: {
            text: 'No data to display',
            fontSize: 18,
            fill: '#888'
          }
        }
      };
    }

    return {
      title: {
        text: "Exceeding SLA\'s for Breakdown Maintenance",
        top: 'top',
        textStyle: { fontSize: 16 }
      },

      tooltip: {
        trigger: 'item',
        formatter: '<b>{b}</b><br/>Missed Count: {c} ({d}%)'
      },

      legend: {
        top: 'bottom',
        type: 'scroll',
        orient: 'horizontal',
      },

      toolbox: {
        show: true,
        orient: 'horizontal',
        left: 'right',
        top: 'top',
        feature: {
          saveAsImage: {},
        }
      },

      series: [{
        type: 'pie',
        emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0,0,0,0.5)' } },
        animation: true,
        animationDuration: 1500,
        animationType: 'scale',
        radius: ['25%', '50%'],
        center: ['45%', '45%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 6,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter: '{bStyle|{b}}\n\n{c} ({d}%)',
          fontSize: 12,
          rich: {
            bStyle: {
              fontWeight: 'bold'
            }
          }
        },
        data: data1
      }]
    };
  }

  // CHART PROPERTIES FOR MTTR BREADKDOWN CHART
  getMttrBreakdownChartOptions1() {
    const dataList = this.mergeBucketsByMonth(this.mttrBreakdownAssetMaintenance as any[]); // API output

    // Extract months for x-axis
    const months = dataList.map(item => item.month);
    console.log(this.mttrBreakdownAssetMaintenance)
    // Extract data for each bucket
    const data0_4 = dataList.map(item => item.buckets['0-4 hrs'] || 0);
    const data5_8 = dataList.map(item => item.buckets['5-8 hrs'] || 0);
    const data9_24 = dataList.map(item => item.buckets['9-24 hrs'] || 0);
    const data24_plus = dataList.map(item => item.buckets['24+ hrs'] || 0);

    const total = [...data0_4, ...data5_8, ...data9_24, ...data24_plus].reduce((sum, val) => sum + val, 0);

    if (total === 0) {
      return {
        title: {
          text: 'MTTR Distribution by last 6 Months',
          top: 'top',
          textStyle: { fontSize: 16 }
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: 'middle',
          style: { text: 'No data to display', fontSize: 18, fill: '#888' }
        }
      };
    }

    return {
      title: {
        text: 'MTTR Distribution by last 6 Months',
        top: 'top',
        textStyle: { fontSize: 16 }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: {
        top: 'bottom',
        data: ['0-4 hrs', '5-8 hrs', '9-24 hrs', '24+ hrs']
      },
      grid: {
        left: '3%',
        right: '8%',
        bottom: '5%',
        top: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: months,
        axisLabel: {
          rotate: 45
        },
      },
      yAxis: {
        type: 'value',
        name: 'Asset Count',
        nameLocation: 'middle',
        max: (value) => this.getNearestMultipleOf5(value.max),
      },
      toolbox: {
        show: true,
        orient: 'horizontal',
        left: 'right',
        top: 'top',
        feature: {
          saveAsImage: {},
          restore: {},
          magicType: {
            type: ['line']
          },
        }
      },
      series:
        [
          {
            name: '0-4 hrs',
            type: 'bar',
            stack: 'MTTR',
            data: data0_4,
            itemStyle: { color: '#5470C6' },
            label: { show: true, position: 'inside', formatter: params => params.value > 0 ? params.value : '' }
          },
          {
            name: '5-8 hrs',
            type: 'bar',
            stack: 'MTTR',
            data: data5_8,
            itemStyle: { color: '#91CC75' },
            label: { show: true, position: 'inside', formatter: params => params.value > 0 ? params.value : '' }
          },
          {
            name: '9-24 hrs',
            type: 'bar',
            stack: 'MTTR',
            data: data9_24,
            itemStyle: { color: '#EE6666' },
            label: { show: true, position: 'inside', formatter: params => params.value > 0 ? params.value : '' }
          },
          {
            name: '24+ hrs',
            type: 'bar',
            stack: 'MTTR',
            data: data24_plus,
            itemStyle: { color: '#FAC858' },
            label: { show: true, position: 'inside', formatter: params => params.value > 0 ? params.value : '' }
          }
        ]
    };
  }

  // CHART PROPERTIES FOR MTBF BREAKDOWN CHART
  getMtbfBreakdownChartOptions() {
    const dataList = this.mergeBucketsByMonth(this.mtbfBreakdownAssetMaintenance as any[]); // API output

    // Extract months for x-axis
    const months = dataList.map(item => item.month);

    // Extract data for each bucket (define according to backend buckets)
    const data0_50 = dataList.map(item => item.buckets['0-50'] || 0);
    const data50_100 = dataList.map(item => item.buckets['50-100'] || 0);
    const data100_200 = dataList.map(item => item.buckets['100-200'] || 0);
    const data200_plus = dataList.map(item => item.buckets['200+'] || 0);


    const total = [...data0_50, ...data50_100, ...data100_200, ...data200_plus].reduce((sum, val) => sum + val, 0);

    if (total === 0) {
      return {
        title: { text: 'MTBF Distribution by last 6 Months', top: 'top', textStyle: { fontSize: 16 } },
        graphic: {
          type: 'text',
          left: 'center',
          top: 'middle',
          style: { text: 'No data to display', fontSize: 18, fill: '#888' }
        }
      };
    }

    return {
      title: {
        text: 'MTBF Distribution by last 6 Months',
        top: 'top',
        textStyle: { fontSize: 16 }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: {
        top: 'bottom',
        data: ['0-50 hrs', '50-100 hrs', '100-200 hrs', '200+ hrs']
      },
      grid: {
        left: '3%',
        right: '8%',
        bottom: '5%',
        top: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: months,
        axisLabel: {
          rotate: 45
        },
      },
      yAxis: {
        type: 'value',
        name: 'Asset Count',
        nameLocation: 'middle',
        max: (value) => this.getNearestMultipleOf5(value.max)
      },
      toolbox: {
        show: true,
        orient: 'horizontal',
        left: 'right',
        top: 'top',
        feature: {
          saveAsImage: {},
          restore: {},
          magicType: { type: ['line'] }
        }
      },
      series: [
        {
          name: '0-50 hrs',
          type: 'bar',
          stack: 'MTBF',
          data: data0_50,
          itemStyle: { color: '#5470C6' },
          label: { show: true, position: 'inside', formatter: p => p.value > 0 ? p.value : '' }
        },
        {
          name: '50-100 hrs',
          type: 'bar',
          stack: 'MTBF',
          data: data50_100,
          itemStyle: { color: '#91CC75' },
          label: { show: true, position: 'inside', formatter: p => p.value > 0 ? p.value : '' }
        },
        {
          name: '100-200 hrs',
          type: 'bar',
          stack: 'MTBF',
          data: data100_200,
          itemStyle: { color: '#EE6666' },
          label: { show: true, position: 'inside', formatter: p => p.value > 0 ? p.value : '' }
        },
        {
          name: '200+ hrs',
          type: 'bar',
          stack: 'MTBF',
          data: data200_plus,
          itemStyle: { color: '#FAC858' },
          label: { show: true, position: 'inside', formatter: p => p.value > 0 ? p.value : '' }
        }
      ]
    };
  }

  // CHART PROPERTIES FOR WARRANTY COVERAGE FOR SUB CATEGORY CHART
  getWarrantyCoverageOptions() {
    const data = (this.warrantyCoverageDataContractWarranty || []).map(d => ({
      name: d.subCategoryName && d.subCategoryName.trim() !== '' ? d.subCategoryName : 'Uncategorized',
      value: d.activeAssets != null ? d.activeAssets : 0
    }));

    const total = data.reduce((sum, item) => sum + item.value, 0);

    // No data case
    if (total === 0) {
      return {
        title: {
          text: 'Warranty Coverage by Asset Category',
          top: 'top',
          textStyle: { fontSize: 16 }
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: 'middle',
          style: {
            text: 'No data to display',
            fontSize: 18,
            fill: '#888'
          }
        }
      };
    }

    return {
      title: {
        text: 'Warranty Coverage by Asset Category',
        top: 'top',
        textStyle: { fontSize: 16 }
      },
      tooltip: {
        trigger: 'item',
        formatter: params => `
          <div style="padding:5px;">
            <strong>${params.seriesName}</strong><br/>
            <span style="font-size:20px;color:${params.color};">●</span> ${params.name}: 
            <strong>${params.value}</strong> (${params.percent}%)
          </div>`
      },
      legend: { bottom: '0%', type: 'scroll', orient: 'horizontal' },
      toolbox: { show: true, feature: { saveAsImage: {} } },
      series: [{
        name: 'Status',
        type: 'pie',
        radius: ['25%', '50%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
        label: {
          show: true,
          formatter: params => `{nameStyle|${params.name}}\n{valueStyle|${params.value} (${params.percent}%)} `,
          rich: {
            nameStyle: { fontSize: 12, fontWeight: 'bold', color: '#333', lineHeight: 16 },
            valueStyle: { fontSize: 13, color: '#39393a' }
          }
        },
        data,
        emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0,0,0,0.5)' } },
        animation: true,
        animationDuration: 1500,
        animationType: 'scale'
      }]
    };
  }

  // CHART PROPERTIES FOR TYPE DISTRIBUTION CHART
  getTypeDistributionOptions() {
    const data = (this.typeDistributionDataContractWarranty || []).map(d => ({
      name: d.label || 'Uncategorized',
      value: d.count != null ? d.count : 0,
      totalValue: d.totalValue != null ? d.totalValue : 0
    }));

    const total = data.reduce((sum, item) => sum + item.value, 0);

    // No data case
    if (total === 0) {
      return {
        title: {
          text: 'Contracts & Warranty Type Distribution With Value',
          top: 'top',
          textStyle: { fontSize: 16 }
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: 'middle',
          style: {
            text: 'No data to display',
            fontSize: 18,
            fill: '#888'
          }
        }
      };
    }

    return {
      title: {
        text: 'Contracts & Warranty Type Distribution With Value',
        top: 'top',
        textStyle: { fontSize: 16 }
      },
      tooltip: {
        trigger: 'item',
        formatter: params => {
          const formattedValue = Number(params.data.totalValue).toLocaleString('en-IN');

          return `
          <div style="padding:5px;">
            <strong>${params.seriesName}</strong><br/>
            <span style="font-size:20px;color:${params.color};">●</span> ${params.name}: 
            <strong>${params.value}</strong> (${formattedValue})
          </div>`
        }
      },
      legend: { bottom: '0%', type: 'scroll', orient: 'horizontal' },
      toolbox: { show: true, feature: { saveAsImage: {} } },
      series: [{
        name: 'Type',
        type: 'pie',
        radius: ['25%', '50%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
        label: {
          show: true,
          formatter: params => {
            const formattedValue = Number(params.data.totalValue).toLocaleString('en-IN');
            return `{nameStyle|${params.name}}\n{valueStyle|${params.value} (${formattedValue})}`;
          },
          rich: {
            nameStyle: { fontSize: 12, fontWeight: 'bold', color: '#333', lineHeight: 16 },
            valueStyle: { fontSize: 13, color: '#39393a' }
          }
        },
        data,
        emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0,0,0,0.5)' } },
        animation: true,
        animationDuration: 1500,
        animationType: 'scale'
      }]
    };
  }

  // CHART PROPERTIES FOR EXPIRING TIMELINE CHART
  getExpiryTimelineOptions() {
    const dataList = this.expiryTimelineDataContractWarranty || [];

    // Desired order
    const periodOrder = ['0-30 Days', '31-60 Days', '61-90 Days', '>90 Days'];

    // Sort dataList according to periodOrder
    const sortedData = periodOrder.map(range =>
      dataList.find(d => d.range === range) || { range, contract: 0, warranty: 0, insurance: 0, extendedWarranty: 0 }
    );


    const months = sortedData.map(d => d.range || 'Uncategorized');
    const contracts = sortedData.map(d => d.contract || 0);
    const warranties = sortedData.map(d => d.warranty || 0);
    const insurance = sortedData.map(d => d.insurance || 0);
    const extendedWarranty = sortedData.map(d => d.extendedWarranty || 0);

    const total = [...contracts, ...warranties, ...insurance, ...extendedWarranty].reduce((sum, val) => sum + val, 0);
    const hasData = total > 0;

    // No data case
    if (!hasData) {
      return {
        title: {
          text: 'Contracts & Warranty Expiring',
          top: 'top',
          textStyle: { fontSize: 16 }
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: 'middle',
          style: {
            text: 'No data to display',
            fontSize: 18,
            fill: '#888'
          }
        }
      };
    }

    return {
      title: {
        text: 'Contracts & Warranty Expiring',
        top: 'top',
        textStyle: { fontSize: 16 }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: {
        data: ['CONTRACT', 'WARRANTY', 'INSURANCE', 'EXTENDED WARRANTY'],
        bottom: '0%', type: 'scroll', orient: 'horizontal'
      },
      grid: {
        left: '3%',
        right: '8%',
        bottom: '5%',
        top: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: months,
        axisLabel: { rotate: 45 }
      },
      yAxis: {
        type: 'value',
        name: 'Count',
        max: value => Math.ceil(value.max / 5) * 5
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {},
          restore: {},
          magicType: { type: ['line', 'bar'] }
        }
      },
      series: [
        {
          name: 'CONTRACT',
          type: 'bar',
          stack: 'total',
          data: contracts,
          itemStyle: { color: '#5470C6' },
          label: { show: true, position: 'inside', formatter: p => p.value > 0 ? p.value : '' }
        },
        {
          name: 'WARRANTY',
          type: 'bar',
          stack: 'total',
          data: warranties,
          itemStyle: { color: '#91CC75' },
          label: { show: true, position: 'inside', formatter: p => p.value > 0 ? p.value : '' }
        },
        {
          name: 'INSURANCE',
          type: 'bar',
          stack: 'total',
          data: insurance,
          itemStyle: { color: '#EE6666' },
          label: { show: true, position: 'inside', formatter: p => p.value > 0 ? p.value : '' }
        },
        {
          name: 'EXTENDED WARRANTY',
          type: 'bar',
          stack: 'total',
          data: extendedWarranty,
          itemStyle: { color: '#73C0DE' },
          label: { show: true, position: 'inside', formatter: p => p.value > 0 ? p.value : '' }
        }
      ]
    };
  }

  // CHART PROPERTIES FOR EXPIRED TIMELINE CHART
  getExpiredTimelineOptions() {
    const dataList = this.expiredTimelineDataContractWarranty || [];

    // Desired order
    const periodOrder = ['0-30 Days', '31-60 Days', '61-90 Days', '>90 Days'];

    // Sort dataList according to periodOrder
    const sortedData = periodOrder.map(range =>
      dataList.find(d => d.range === range) || { range, contract: 0, warranty: 0, insurance: 0, extendedWarranty: 0 }
    );

    const months = sortedData.map(d => d.range || 'Uncategorized');
    const contracts = sortedData.map(d => d.contract || 0);
    const warranties = sortedData.map(d => d.warranty || 0);
    const insurance = sortedData.map(d => d.insurance || 0);
    const extendedWarranty = sortedData.map(d => d.extendedWarranty || 0);

    const total = [...contracts, ...warranties, ...insurance, ...extendedWarranty].reduce((sum, val) => sum + val, 0);
    const hasData = total > 0;

    // No data case
    if (!hasData) {
      return {
        title: {
          text: 'Contracts & Warranty Expired and Not Renewed',
          top: 'top',
          textStyle: { fontSize: 16 }
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: 'middle',
          style: {
            text: 'No data to display',
            fontSize: 18,
            fill: '#888'
          }
        }
      };
    }

    return {
      title: {
        text: 'Contracts & Warranty Expired and Not Renewed',
        top: 'top',
        textStyle: { fontSize: 16 }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: {
        data: ['CONTRACT', 'WARRANTY', 'INSURANCE', 'EXTENDED WARRANTY'],
        bottom: '0%', type: 'scroll', orient: 'horizontal'
      },
      grid: {
        left: '3%',
        right: '8%',
        bottom: '5%',
        top: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: months,
        axisLabel: { rotate: 45 }
      },
      yAxis: {
        type: 'value',
        name: 'Count',
        max: value => Math.ceil(value.max / 5) * 5
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {},
          restore: {},
          magicType: { type: ['line', 'bar'] }
        }
      },
      series: [
        {
          name: 'CONTRACT',
          type: 'bar',
          stack: 'total',
          data: contracts,
          itemStyle: { color: '#5470C6' },
          label: { show: true, position: 'inside', formatter: p => p.value > 0 ? p.value : '' }
        },
        {
          name: 'WARRANTY',
          type: 'bar',
          stack: 'total',
          data: warranties,
          itemStyle: { color: '#91CC75' },
          label: { show: true, position: 'inside', formatter: p => p.value > 0 ? p.value : '' }
        },
        {
          name: 'INSURANCE',
          type: 'bar',
          stack: 'total',
          data: insurance,
          itemStyle: { color: '#EE6666' },
          label: { show: true, position: 'inside', formatter: p => p.value > 0 ? p.value : '' }
        },
        {
          name: 'EXTENDED WARRANTY',
          type: 'bar',
          stack: 'total',
          data: extendedWarranty,
          itemStyle: { color: '#73C0DE' },
          label: { show: true, position: 'inside', formatter: p => p.value > 0 ? p.value : '' }
        }
      ]
    };
  }

  // CHART PROPERTIES FOR TOP VENDORS CHARTS
  getTopVendorsOptions() {
    const dataList = this.topVendorsDataContractWarranty || [];

    // Sort vendors by total contracts + warranties (descending), take top 5
    const sortedList = [...dataList]
      .sort((a, b) => (b.contractCount + b.warrantyCount) - (a.contractCount + a.warrantyCount))
      .slice(0, 5);

    const vendors = sortedList.map(d => d.vendorName || 'Unknown').reverse();
    const contract = sortedList.map(d => (d.contractCount > 0 ? d.contractCount : null)).reverse();
    const warranty = sortedList.map(d => (d.warrantyCount > 0 ? d.warrantyCount : null)).reverse();
    const totalValues = sortedList.map(d => d.totalValue || 0).reverse();

    const total = [...contract, ...warranty, ...totalValues].reduce((sum, val) => sum + val, 0);
    const hasData = total > 0;

    if (!hasData) {
      return {
        title: {
          text: 'Top Vendors Overview (Top 5)',
          top: 'top',
          textStyle: { fontSize: 16 }
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: 'middle',
          style: {
            text: 'No data to display',
            fontSize: 18,
            fill: '#888'
          }
        }
      };
    }

    return {
      title: {
        text: 'Top Vendors Overview (Top 5)',
        top: 'top',
        textStyle: { fontSize: 16 }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: params => {
          const vendor = params[0]?.name;
          const contract = params.find(p => p.seriesName === 'Contract')?.value || 0;
          const warranty = params.find(p => p.seriesName === 'Warranty')?.value || 0;
          const value = params.find(p => p.seriesName === 'Total Value')?.value || 0;
          const vendorData = sortedList.find(d => d.vendorName === vendor);
          // const assetCount = vendorData?.assetsUnderContract || 0;
          const assetsUnderContract = vendorData?.assetsUnderContract || 0;
          const assetsUnderWarranty = vendorData?.assetsUnderWarranty || 0;
          const assetCount =
            (contract > 0 && warranty > 0)
              ? (assetsUnderContract + assetsUnderWarranty)
              : (contract > 0 ? assetsUnderContract : assetsUnderWarranty);
          const formattedValue = value.toLocaleString('en-IN');

          return `
            <strong>${vendor}</strong><br/>
            Contract: ${contract}<br/>
            Warranty: ${warranty}<br/>
            Asset Count: ${assetCount}<br/>
            Total Value: ₹ ${formattedValue}
          `;
        }
      },
      legend: {
        data: ['Contract', 'Warranty', 'Total Value'],
        bottom: 0,
        type: 'scroll',
        orient: 'horizontal'
      },
      grid: { left: '5%', right: '8%', bottom: '8%', top: '15%', containLabel: true },
      xAxis: {
        type: 'category',
        data: vendors,
        axisLabel: {
          interval: 0,
          rotate: 20,
          formatter: function (value) {
            const maxLen = 15;
            return value.length > maxLen ? value.slice(0, maxLen) + '\n' + value.slice(maxLen) : value;
          },
          fontSize: 11
        }
      },
      yAxis: [
        {
          type: 'value',
          name: 'Count',
          minInterval: 1,
          max: (value) => this.getNearestMultipleOf3(value.max)
        },
        {
          type: 'value',
          name: 'Total Value',
          axisLabel: { formatter: (value: number) => value.toLocaleString('en-IN') },
        }
      ],
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {},
          restore: {},
          magicType: { type: ['line', 'bar'] }
        }
      },
      series: [
        {
          name: 'Contract',
          type: 'bar',
          stack: 'count',
          data: contract,
          itemStyle: { color: '#5470C6' },
          label: { show: true, position: 'top' }
        },
        {
          name: 'Warranty',
          type: 'bar',
          stack: 'count',
          data: warranty,
          itemStyle: { color: '#91CC75' },
          label: { show: true, position: 'top' }
        },
        {
          name: 'Total Value',
          type: 'line',
          yAxisIndex: 1,
          data: totalValues,
          itemStyle: { color: '#EE6666' },
          lineStyle: { width: 2 },
          smooth: true,
          label: { show: false }
        }
      ]
    };
  }

  // CHART PROPERTIES FOR VALUE BY TYPE CHART
  getValueByTypeOptions() {
    const data = (this.valueByTypeDataContractWarranty || []).map(d => ({
      name: d.coverageType || 'Uncategorized',
      value: d.value || 0
    }));

    const total = data.reduce((sum, d) => sum + d.value, 0);
    const hasData = total > 0;

    if (!hasData) {
      return {
        title: {
          text: 'Value by Contract/Warranty Type',
          top: 'top',
          textStyle: { fontSize: 16 }
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: 'middle',
          style: {
            text: 'No data to display',
            fontSize: 18,
            fill: '#888'
          }
        }
      };
    }

    return {
      title: {
        text: 'Value by Contract/Warranty Type',
        top: 'top',
        textStyle: { fontSize: 16 }
      },
      tooltip: {
        trigger: 'item',
        formatter: params => `
          <div style="padding:5px;">
            <strong>${params.name}</strong><br/>
            Value: ₹${params.value.toLocaleString('en-IN')}
          </div>
        `
      },
      toolbox: {
        show: true,
        feature: { saveAsImage: {}, restore: {} }
      },
      series: [{
        type: 'treemap',
        roam: false,
        nodeClick: 'zoomToNode',
        breadcrumb: { show: false },
        label: {
          show: true,
          formatter: params => `${params.name}\n₹${params.value.toLocaleString('en-IN')}`,
          fontSize: 12,
          fontWeight: 'bold'
        },
        upperLabel: { show: false },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 2,
          borderRadius: 6
        },
        data
      }]
    };
  }

  // CHART PROPERTIES FOR PO TREND LINE CHART
  getPoTrendOptions() {
    let data = this.poTrendDataFinancial;

    // If the API returns a string, parse it
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {
        console.error('Invalid JSON:', e);
        data = [];
      }
    }

    const months = data.map(d => d.month);
    const contractPO = data.map(d => d.contractValue);
    const materialPO = data.map(d => d.serviceMaterialValue);

    const total = [...contractPO, ...materialPO].reduce((sum, val) => sum + val, 0);

    if (total === 0) {
      return {
        title: { text: 'PO Trend (Last 6 Months)', top: 'top', textStyle: { fontSize: 16 } },
        graphic: { type: 'text', left: 'center', top: 'middle', style: { text: 'No data to display', fontSize: 18, fill: '#888' } }
      };
    }

    return {
      title: { text: 'PO Trend (Last 6 Months)', top: 'top', textStyle: { fontSize: 16 } },
      tooltip: { trigger: 'axis' },
      legend: { data: ['Contract PO', 'Service/Material PO'], bottom: '0%', type: 'scroll', orient: 'horizontal' },
      toolbox: {
        show: true,
        orient: 'horizontal',
        left: 'right',
        top: 'top',
        feature: { saveAsImage: {}, restore: {}, magicType: { type: ['bar'] } }
      },
      xAxis: { type: 'category', data: months, axisLabel: { rotate: 45 } },
      yAxis: { type: 'value', name: 'Value (₹)' },
      series: [
        { name: 'Contract PO', type: 'line', smooth: true, symbol: 'circle', symbolSize: 8, data: contractPO, itemStyle: { color: '#5470C6' } },
        { name: 'Service/Material PO', type: 'line', smooth: true, symbol: 'circle', symbolSize: 8, data: materialPO, itemStyle: { color: '#91CC75' } }
      ]
    };
  }

  // CHART PROPERTIES FOR ASSET RETIREMENT BY CATEGORY AND REASON STACKED BAR CHART
  getAssetsRetiringByCategoryReasonOptions() {
    // Parse JSON string into array
    const data = this.assetRetirementByCategoryDataFinancial
      ? JSON.parse(this.assetRetirementByCategoryDataFinancial)
      : [];

    // No data case
    if (!data.length) {
      return {
        title: {
          text: 'Assets Retirement by Category & Reason',
          top: 'top',
          textStyle: { fontSize: 16 }
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: 'middle',
          style: {
            text: 'No data to display',
            fontSize: 18,
            fill: '#888'
          }
        }
      };
    }

    // Extract unique categories and reasons
    const categories = Array.from(new Set(data.map(d => d.category)));
    const reasons = Array.from(new Set(data.map(d => d.reason)));

    // Build series data
    const series = reasons.map(reason => ({
      name: reason,
      type: 'bar',
      stack: 'retirement',
      data: categories.map(cat => {
        const item = data.find(d => d.category === cat && d.reason === reason);
        return item ? item.count : 0;
      }),
      itemStyle: {},
      label: {
        show: true,
        position: 'inside',
        formatter: p => (p.value > 0 ? p.value : '')
      },
      // emphasis: { focus: 'series' }
    }));

    // Total check to handle empty data
    const total = series.reduce((sum, s) => sum + s.data.reduce((s2, v) => s2 + v, 0), 0);

    if (total === 0) {
      return {
        title: {
          text: 'Assets Retirement by Category & Reason',
          top: 'top',
          textStyle: { fontSize: 16 }
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: 'middle',
          style: {
            text: 'No data to display',
            fontSize: 18,
            fill: '#888'
          }
        }
      };
    }

    return {
      title: {
        text: 'Assets Retirement by Category & Reason',
        top: 'top',
        textStyle: { fontSize: 16 }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: {
        data: reasons,
        bottom: '0%',
        type: 'scroll',
        orient: 'horizontal'
      },
      grid: {
        left: '3%',
        right: '8%',
        bottom: '5%',
        top: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: categories,
        axisLabel: { rotate: 45 }
      },
      yAxis: {
        type: 'value',
        name: 'Count',
        max: value => Math.ceil(value.max / 5) * 5
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {},
          restore: {},
          magicType: { type: ['line'] }
        }
      },
      series
    };
  }

  // CHART PROPERTIES FOR RETIREMENT TIMELINE FOR NEXT 6 MONTHS LINE CHART
  getAssetRetirementsTimelineOptions() {
    // Parse JSON string if backend returns it as string
    const data = this.assetRetirementTimelineDataFinancial
      ? JSON.parse(this.assetRetirementTimelineDataFinancial)
      : [];

    // Handle no data case
    if (!data.length) {
      return {
        title: {
          text: 'Assets Retirement Timeline (Next 6 Months)',
          top: 'top',
          textStyle: { fontSize: 16 }
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: 'middle',
          style: {
            text: 'No data to display',
            fontSize: 18,
            fill: '#888'
          }
        }
      };
    }

    // Extract months and counts
    const months = data.map(d => d.month || 'Unknown');
    const counts = data.map(d => d.count || 0);

    const total = counts.reduce((a, b) => a + b, 0);
    if (total === 0) {
      return {
        title: {
          text: 'Assets Retirement Timeline (Next 6 Months)',
          top: 'top',
          textStyle: { fontSize: 16 }
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: 'middle',
          style: {
            text: 'No data to display',
            fontSize: 18,
            fill: '#888'
          }
        }
      };
    }

    // Build chart
    return {
      title: {
        text: 'Assets Retirement Timeline (Next 6 Months)',
        top: 'top',
        textStyle: { fontSize: 16 }
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          const item = params[0];
          return `${item.axisValue}<br/>Assets Retiring: <b>${item.value}</b>`;
        }
      },
      grid: {
        left: '3%',
        right: '8%',
        bottom: '5%',
        top: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: months,
        axisLabel: { rotate: 45 },
        name: 'Month'
      },
      yAxis: {
        type: 'value',
        name: 'Asset Count',
        splitLine: { show: true },
        max: (value) => Math.ceil(value.max / 5) * 5
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {},
          restore: {},
          magicType: { type: ['bar'] }
        }
      },
      series: [
        {
          name: 'Assets to Retire',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: { width: 3 },
          data: counts,
          itemStyle: { color: '#5470C6' },
          label: {
            show: true,
            position: 'top',
            formatter: (p) => (p.value > 0 ? p.value : '')
          },
          areaStyle: {
            opacity: 0.2,
            color: '#5470C6'
          }
        }
      ]
    };
  }

  // MERGE DATA METHOD FOR MTTR & MTBF
  mergeBucketsByMonth(data: any[]): any[] {
    const merged: any = {};

    data.forEach(item => {
      const month = item.month;

      // pick all keys except 'month' as buckets
      const buckets = Object.keys(item)
        .filter(k => k !== 'month')
        .reduce((acc, k) => {
          acc[k] = item[k];
          return acc;
        }, {} as Record<string, number>);

      if (!merged[month]) {
        merged[month] = { month, buckets };
      } else {
        for (const [bucket, count] of Object.entries(buckets)) {
          merged[month].buckets[bucket] = (merged[month].buckets[bucket] || 0) + count;
        }
      }
    });

    return Object.values(merged);
  }

  // TO GET THE HEIGHT FOR STACK BARS
  getNearestMultipleOf5(n: number): number {
    const rounded = Math.ceil(n / 5) * 5;
    return (rounded === n) ? rounded + 2 : rounded;
  }

  // TO GET THE HEIGHT FOR STACK BARS (3)
  getNearestMultipleOf3(n: number): number {
    const rounded = Math.ceil(n / 3) * 3;
    return (rounded === n) ? rounded + 1 : rounded;
  }

  // GET CURRENT & REMAINING ASSET AGE DATA FOR CHART
  get ageTableRows() {
    const data = this.ageMode === 'current' ? this.assetCurrentAgeChartDataAssetInventory : this.assetRemainingAgeChartDataAssetInventory;
    const left = data.slice(0, Math.ceil(data.length / 2));
    const right = data.slice(Math.ceil(data.length / 2));

    const rows = [];

    for (let i = 0; i < left.length; i++) {
      rows.push({
        leftRange: left[i]?.label || '',
        leftCount: left[i]?.value ?? '',
        rightRange: right[i]?.label || '',
        rightCount: right[i]?.value ?? ''
      });
    }
    return rows;
  }

  get hasAgeData(): boolean {
    // Check if at least one leftCount or rightCount is > 0
    return this.ageTableRows && !this.ageTableRows.every(r => (!r.leftCount && !r.rightCount));
  }

  // TOGGLE METHOD THE SWITCH BETWEEN CURRENT AND REMAINING AGE
  onAgeModeToggle(event: any) {
    this.ageData = this.ageMode === 'current' ? [...this.assetCurrentAgeChartDataAssetInventory] : [...this.assetRemainingAgeChartDataAssetInventory];
  }

  // SET AGE MODE FOR BUTTON CLICK
  setAgeMode(mode: 'current' | 'remaining') {
    this.ageMode = mode;
    this.onAgeModeToggle(mode);
  }

  // METHOD TO CHECK IF TAB IS ENABLED
  isTabEnabled(tabName: string): boolean {
    return this.tabList.includes(tabName);
  }

  // GET ICONS FOR SUMMARY CARDS
  getCardIcon(title: string): string {
    const key = title.toLowerCase();

    const iconMap: { [key: string]: string } = {
      // ASSET INVENTORY
      'total assets': 'inventory_2',
      'total purchase cost': 'paid',
      'current value': 'trending_up',
      'critical assets': 'error',
      'non critical assets': 'check_circle',
      'exceeding maintenance threshold (count)': 'event_busy',

      // MAINTENANCE
      'open service requests': 'assignment',
      'open breakdown requests': 'construction',
      'breakdowns on critical assets': 'warning',
      'missed pa\'s (last 3 months)': 'hourglass_empty',
      'missed pm\'s (last 3 months)': 'event_busy',
      'top affected subcategory (bm)': 'bar_chart',

      // WARRANTY/CONTRACTS
      'active contracts': 'gavel',
      'expired contracts': 'event_busy',
      'total contract value': 'paid',
      'active warranties': 'verified_user',
      'expired warranties': 'cancel',
      'uncovered assets': 'report_problem',
      'contracts/asset count': 'gavel',
      'under warranty': 'verified_user',
      'under extended warranty': 'verified',
      'under insurance': 'health_and_safety',

      // FINANCIAL
      'total asset purchase cost': 'savings',
      'depreciated value': 'trending_down',
      'contract po value': 'description',
      'service material po value': 'local_shipping',
      'unapproved po\'s': 'hourglass_top',
    };
    return iconMap[key] || 'dashboard';
  }

  // API TO FETCH BRANCH INFO
  listofLocationName(searchValue) {
    this.scrollLocationNamesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaService.listAllUserLocForCombo, searchValue.term, '', '', this.limitCount, this.locationNamePageNumber).subscribe(
      (data) => {
        if (data.success) {
          this.locationList = "";
          for (const value of data.responseData.comboList) {
            this.locationList = `${this.locationList} ${value.locationId.toString()},`;
          }
          this.locationList = this.locationList.substring(0, this.locationList.length - 1);

          if (this.locationList !== "") {
            this.frame1Data.locationList = this.locationList;
          }

          if (!(this.commonService.fetchSearchValue(searchValue))) {
            if (this.locationNamePageNumber === 1) {
              this.locationCombo = [];
              this.locationCombo = data.responseData.comboList;
              this.locationCombo.unshift({
                'locationId': -1,
                'locationName': this.allBranch,
              });

            } else {
              this.locationCombo = this.locationCombo.concat(data.responseData.comboList);
            }
          } else {
            this.locationCombo = [];
            this.locationCombo = data.responseData.comboList;
          }
          data.responseData.comboList.length !== 0 ? this.locationNamePageNumber += 1 : this.locationNamePageNumber = 1;
        }
      }
    );
    this.scrollLocationNamesync = false;
  }

  // ON BRANCH SELECT
  setLocationNameComboValue(event) {
    if (event === undefined) {
      this.frame1Data.locationId = 0;
      this.locationCombo = [];
      this.locationNamePageNumber = 1;
    } else {
      this.frame1Data.locationId = event.locationId;
      this.frame1Data.locationName = event.locationName;
    }
    this.resetFormSubject.next(true);
  }

  // Navigation
  onCardClick(card: any) {
    if (card.title === 'Total Assets') {


      if (this.frame1Data.locationId > 0) {
        const url = `${window.location.origin}/home/asset/asset?locationId=${this.frame1Data.locationId}&locationName=${this.frame1Data.locationName}`;
        window.open(url, '_blank');
      } else {
        const url = `${window.location.origin}/home/asset/asset`;
        window.open(url, '_blank');
      }
    }

    if (card.title === 'Critical Assets') {


      if (this.frame1Data.locationId > 0) {
        const url = `${window.location.origin}/home/asset/asset?functionalStatus=CRITICAL&locationId=${this.frame1Data.locationId}&locationName=${this.frame1Data.locationName}`;
        window.open(url, '_blank');
      } else {
        const url = `${window.location.origin}/home/asset/asset?functionalStatus=CRITICAL`;
        window.open(url, '_blank');
      }

    }

    if (card.title === 'Non Critical Assets') {

      if (this.frame1Data.locationId > 0) {
        const url = `${window.location.origin}/home/asset/asset?functionalStatus=NON%20CRITICAL&locationId=${this.frame1Data.locationId}&locationName=${this.frame1Data.locationName}`;
        window.open(url, '_blank');
      } else {
        const url = `${window.location.origin}/home/asset/asset?functionalStatus=NON%20CRITICAL`;
        window.open(url, '_blank');
      }


    }

    if (card.title === 'Exceeding Maintenance Threshold (count)') {

      if (this.frame1Data.locationId > 0) {
        const url = `${window.location.origin}/home/asset/asset?searchFor=Exceeding%20Maintenance%20Threshold&locationId=${this.frame1Data.locationId}`;
        window.open(url, '_blank');
      } else {
        const url = `${window.location.origin}/home/asset/asset?searchFor=Exceeding%20Maintenance%20Threshold`;
        window.open(url, '_blank');
      }

    }

  }

  onCategoryChartClick(event: any) {
    console.log('Category clicked:', event.data);

    const categoryName = event.data?.name || '';
    const categoryId = event.data.categoryId;

    if (!categoryName) return;

    // Prepare the URL like your onCardClick function
    let url = `${window.location.origin}/home/asset/asset`;

    if (this.frame1Data?.locationId > 0) {
      url += `?locationId=${this.frame1Data.locationId}&locationName=${this.frame1Data.locationName}&categoryName=${categoryName}&categoryId=${categoryId}`;
    } else {
      url += `?categoryName=${categoryName}&categoryId=${categoryId}`;
    }

    // Open asset list screen in a new tab
    window.open(url, '_blank');
  }

  onOwnershipChartClick(event: any) {

    const ownershipType = event.seriesName?.split('(')[0]?.trim(); // extract label from seriesName

    if (!ownershipType) return;

    // Prepare the URL like your onCardClick function
    let url = `${window.location.origin}/home/asset/asset`;

    if (this.frame1Data?.locationId > 0) {
      url += `?locationId=${this.frame1Data.locationId}&locationName=${this.frame1Data.locationName}&ownershipType=${ownershipType}`;
    } else {
      url += `?ownershipType=${ownershipType}`;
    }

    // Open asset list screen in a new tab
    window.open(url, '_blank');
  }

  onStatusChartClick(event: any) {
    const assetStatus = event.name; // extract label from seriesName

    if (!assetStatus) return;

    // Prepare the URL like your onCardClick function
    let url = `${window.location.origin}/home/asset/asset`;

    if (this.frame1Data?.locationId > 0) {
      url += `?locationId=${this.frame1Data.locationId}&locationName=${this.frame1Data.locationName}&assetStatus=${assetStatus}`;
    } else {
      url += `?assetStatus=${assetStatus}`;
    }

    // Open asset list screen in a new tab
    window.open(url, '_blank');
  }

  onLoanedCardClick(card: any) {
    const cardText = card.title; // e.g., 'Loaned-out External' or 'Loaned-out Internal'
    const encodedSearch = encodeURIComponent(cardText);

    if (this.frame1Data?.locationId > 0) {
      const url = `${window.location.origin}/home/asset/asset?searchFor=${encodedSearch}&locationId=${this.frame1Data.locationId}`;
      window.open(url, '_blank');
    } else {
      const url = `${window.location.origin}/home/asset/asset?searchFor=${encodedSearch}`;
      window.open(url, '_blank');
    }
  }


  // onChartClick(event){
  //       console.log("event : "+ event.data.name)
  //       console.log("event : ", event.data)
  //       this.assetCategoryBased = this.dialog.open(AssetBySubCategoryV2Component, {
  //               width: '60%',
  //               height: '500px',
  //               position: { top: '10%', left: '1%' },
  //               data: {
  //                 'assetCategory': event.data.name,
  //                 // 'title':  'Asset ' + event.data.name + ' by Status Type',
  //                 'assetCategoryId': event.data.assetCategoryId,
  //                 'locationId' : this.frame1Data.locationId,
  //                 'locationList' : this.frame1Data.locationList
  //                 // 'theme': this.theme
  //               }
  //             });
  //             this.assetCategoryBased.disableClose = true;
  //             this.assetCategoryBased.afterClosed().subscribe(
  //               data => {
  //                 this.ngOnInit();
  //               }); 
  //   }
  //user clicked  Card
  // onCardClick(card: any): void {
  //   // navigation for user choosen card 
  //   switch (card.title) {
  //     case "Open Service Requests":
  //       const url = `${window.location.origin}/home/serviceRequest/serviceRequestList?srStatus=OPEN`;
  //       window.open(url, '_blank');
  //       break;
  //     case "Open Breakdown Requests":
  //       const url1 = `${window.location.origin}/home/serviceRequest/serviceRequestList?srStatus=OPEN&srType=BM`;
  //       window.open(url1, '_blank');
  //       break;

  //     case "Breakdowns on Critical Assets":
  //       const url2 = `${window.location.origin}/home/serviceRequest/serviceRequestList?srStatus=OPEN&srType=BM&functionality=CRITICAL`;
  //       window.open(url2, '_blank');
  //       break;

  //     case "Missed PM's (Last 3 months)":
  //       const url3 = `${window.location.origin}/home/serviceRequest/serviceRequestList?srStatus=OPEN&srType=PM`;
  //       window.open(url3, '_blank');
  //       break;
  //     case "Missed PA's (Last 3 months)":
  //       const url4 = `${window.location.origin}/home/serviceRequest/serviceRequestList?srStatus=OPEN&srType=PA`;
  //       window.open(url4, '_blank');
  //       break;

  //   }
  // }
  onCardClickMaintenance(card: any): void {
    let url = '';

    if (this.frame1Data?.locationId > 0) {

      switch (card.title) {
      case "Open Service Requests":
        url = `${window.location.origin}/home/serviceRequest/serviceRequestList?locationId=${this.frame1Data.locationId}&locationName=${this.frame1Data.locationName}&srStatus=OPEN`;
        break;

      case "Open Breakdown Requests":
        url = `${window.location.origin}/home/serviceRequest/serviceRequestList?locationId=${this.frame1Data.locationId}&locationName=${this.frame1Data.locationName}&srStatus=OPEN&srType=BM`;
        break;

      case "Breakdowns on Critical Assets":
        url = `${window.location.origin}/home/serviceRequest/serviceRequestList?locationId=${this.frame1Data.locationId}&locationName=${this.frame1Data.locationName}&srStatus=OPEN&srType=BM&functionality=CRITICAL`;
        break;

      case "Missed PM's (Last 3 months)":
        url = `${window.location.origin}/home/serviceRequest/serviceRequestList?locationId=${this.frame1Data.locationId}&locationName=${this.frame1Data.locationName}&srStatus=OPEN&srType=MIssedPM`;
        break;

      case "Missed PA's (Last 3 months)":
        url = `${window.location.origin}/home/serviceRequest/serviceRequestList?locationId=${this.frame1Data.locationId}&locationName=${this.frame1Data.locationName}&srStatus=OPEN&srType=MIssedPA`;
        break;
    }

    } else{

      switch (card.title) {
      case "Open Service Requests":
        url = `${window.location.origin}/home/serviceRequest/serviceRequestList?srStatus=OPEN`;
        break;

      case "Open Breakdown Requests":
        url = `${window.location.origin}/home/serviceRequest/serviceRequestList?srStatus=OPEN&srType=BM`;
        break;

      case "Breakdowns on Critical Assets":
        url = `${window.location.origin}/home/serviceRequest/serviceRequestList?srStatus=OPEN&srType=BM&functionality=CRITICAL`;
        break;

      case "Missed PM's (Last 3 months)":
        url = `${window.location.origin}/home/serviceRequest/serviceRequestList?srStatus=OPEN&srType=MIssedPM`;
        break;

      case "Missed PA's (Last 3 months)":
        url = `${window.location.origin}/home/serviceRequest/serviceRequestList?srStatus=OPEN&srType=MIssedPA`;
        break;
    }

    }

    

    if (url) {
      window.open(url, '_blank');
    }
  }

  // Navigation
  onCardClickContract(card: any) {
  if (card.title === 'Contracts/Asset Count') {
    
    if(this.frame1Data.locationId > 0){
      const url = `${window.location.origin}/home/asset/contractList?coverageType=CONTRACT&locationId=${this.frame1Data.locationId}&locationName=${this.frame1Data.locationName}`;
      window.open(url, '_blank');
    } else{
      const url = `${window.location.origin}/home/asset/contractList?coverageType=CONTRACT`;
      window.open(url, '_blank');
    }
  }

  if (card.title === 'Under Warranty') {
    
    if(this.frame1Data.locationId > 0){
      const url = `${window.location.origin}/home/asset/contractList?coverageType=WARRANTY&locationId=${this.frame1Data.locationId}&locationName=${this.frame1Data.locationName}`;
      window.open(url, '_blank');
    } else{
      const url = `${window.location.origin}/home/asset/contractList?coverageType=WARRANTY`;
      window.open(url, '_blank');
    }
  }

  if (card.title === 'Under Extended Warranty') {
    
    if(this.frame1Data.locationId > 0){
      const url = `${window.location.origin}/home/asset/contractList?coverageType=EXTENDED%20WARRANTY&locationId=${this.frame1Data.locationId}&locationName=${this.frame1Data.locationName}`;
      window.open(url, '_blank');
    } else{
      const url = `${window.location.origin}/home/asset/contractList?coverageType=EXTENDED%20WARRANTY`;
      window.open(url, '_blank');
    }
  }

  if (card.title === 'Under Insurance') {
    
    if(this.frame1Data.locationId > 0){
      const url = `${window.location.origin}/home/asset/contractList?coverageType=INSURANCE&locationId=${this.frame1Data.locationId}&locationName=${this.frame1Data.locationName}`;
      window.open(url, '_blank');
    } else{
      const url = `${window.location.origin}/home/asset/contractList?coverageType=INSURANCE`;
      window.open(url, '_blank');
    }
  }

  if (card.title === 'Uncovered Assets') {
    
    if(this.frame1Data.locationId > 0){
      const url = `${window.location.origin}/home/asset/asset?searchFor=Uncovered%20Assets&locationId=${this.frame1Data.locationId}&locationName=${this.frame1Data.locationName}`;
      window.open(url, '_blank');
    } else{
      const url = `${window.location.origin}/home/asset/asset?searchFor=Uncovered%20Assets`;
      window.open(url, '_blank');
    }
  }

}

onContractWarrantyExpiringChartClick(event: any) {
    console.log('ontractWarrantyExpiring clicked:', event);

    const coverageType = event?.seriesName || '';
    const name = event?.name || '';

    if (!coverageType) return;

    // Prepare the URL like your onCardClick function
    let url = `${window.location.origin}/home/asset/contractList`;

    if (this.frame1Data?.locationId > 0) {
      url += `?locationId=${this.frame1Data.locationId}&locationName=${this.frame1Data.locationName}&searchFor=${coverageType}%20Expiring&name=${name}`;
    } else {
      url += `?searchFor=${coverageType}%20Expiring&name=${name}`;
    }

    // Open asset list screen in a new tab
    window.open(url, '_blank');
  }


  onContractWarrantyExpiredChartClick(event: any) {
    console.log('ontractWarrantyExpired clicked:', event);

    const coverageType = event?.seriesName || '';
    const name = event?.name || '';

    if (!coverageType) return;

    // Prepare the URL like your onCardClick function
    let url = `${window.location.origin}/home/asset/contractList`;

    if (this.frame1Data?.locationId > 0) {
      url += `?locationId=${this.frame1Data.locationId}&locationName=${this.frame1Data.locationName}&searchFor=${coverageType}%20Expired&name=${name}`;
    } else {
      url += `?searchFor=${coverageType}%20Expired&name=${name}`;
    }

    // Open asset list screen in a new tab
    window.open(url, '_blank');
  }

    onCardClickFinancial(card: any) {
  if (card.title === "Unapproved PO's") {
    
    if(this.frame1Data.locationId > 0){
      const url = `${window.location.origin}/home/purchase/purchaseOrderList?poStatus=BOOKED&locationId=${this.frame1Data.locationId}&locationName=${this.frame1Data.locationName}`;
      window.open(url, '_blank');
    } else{
      const url = `${window.location.origin}/home/purchase/purchaseOrderList?poStatus=BOOKED`;
      window.open(url, '_blank');
    }
  }

}

onFinancialCategoryChartClick(event: any) {
    console.log('onFinancialCategoryChartClick clicked:', event);

    const requestReason = event?.seriesName || '';
    const name = event?.name || '';

    if (!requestReason) return;

    // Prepare the URL like your onCardClick function
    let url = `${window.location.origin}/home/asset/assetRetirement`;

    if (this.frame1Data?.locationId > 0) {
      url += `?locationId=${this.frame1Data.locationId}&locationName=${this.frame1Data.locationName}&requestReason=${requestReason}&assetCategoryName=${name}`;
    } else {
      url += `?requestReason=${requestReason}&assetCategoryName=${name}`;
    }

    // Open asset list screen in a new tab
    window.open(url, '_blank');
  }

}