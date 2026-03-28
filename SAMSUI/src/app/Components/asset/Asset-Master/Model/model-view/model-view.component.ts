import { Component, OnInit, HostBinding } from '@angular/core';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { ActivatedRoute, Router } from '@angular/router';
import { Model } from 'src/app/Model/master/model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-model-view',
  templateUrl: './model-view.component.html',
  styleUrls: ['./model-view.component.css']
})
export class ModelViewComponent implements OnInit {

  //Set Page Title
  title = 'Asset Optima - Model';
  public model: Model;
  modelId : string;
  mdlId:any;
  modelData:any;
  modelAssetData: any;
  step=0;
  showEndOfLife: boolean = false;


  // Display Column List
  sparePartsDisCol = ['sno', 'itemName', 'itemDesc', 'manufacturerName', 'uomCode'];
  documentDisCol = ['sno', 'docName', 'docType'];
  selfAnalysisDisCol = ['sno', 'defectType', 'defectTag', 'defectQuestion'];
  additionalInfoDisCol = ['sno', 'infoName', 'infoLabel', 'infoTitle', 'infoDetails'];
  checkPointsDisCol = ['sno', 'checkPointName', 'uom', 'frequency', 'duration'];
  solutionBankDisCol = ['sno', 'defectName', 'defectTag', 'defectCause', 'defectSolution'];
  accessoriesDispCol = ['sno', 'itemName', 'itemDesc', 'manufacturerName', 'uomCode'];
  consumableDispCol = ['sno', 'itemName', 'itemDesc', 'manufacturerName', 'uomCode'];

  //DATASOURCE
  sparePartsDataSource:any = [];
  accessoriesDataSource : any = [];
  consumablesDataSource : any = [];
  selfAnalysisDataSource : any = [];
  additionalInfoDataSource : any = [];
  solutionBankDataSource : any = [];
  checkPointsDataSource : any = [];
  documentDataSource : any = [];

   //Tab Config
   showSpecification: boolean = false;
   showDepreciation: boolean = false;
   showAccessories: boolean = false;
   showConsumables: boolean = false;
   showSpareParts: boolean = false;
   showSolutionBank: boolean = false;
   showCheckList: boolean = false;
   showDocument: boolean = false;
   showSelfAnalysis: boolean = false;
   showAdditionalInfo: boolean = false;

  constructor(public router: Router,
    private active_route: ActivatedRoute,
    private commonService:CommonService,
    private assetOptimaServices:AssetOptimaServices,
    private titleService: Title) {
    this.model = new Model();
    this.mdlId = this.active_route.snapshot.params['modelId'];
    this.commonService.commonGetService(this.assetOptimaServices.fetchModelDetailedInfo,this.mdlId).subscribe(
      data => {
        this.modelData = data.responseData;
        this.modelAssetData = data.responseData.assetGroupTO;
        if(data.responseData.endOfLife == true) {
          this.showEndOfLife = true;
        } else {
          this.showEndOfLife = false;
        }
        if(data.responseData.assetGroupTO.specification == true) {
          this.showSpecification = true;
        }
        if(data.responseData.assetGroupTO.depreciation == true) {
          this.showDepreciation = true;
        }
        if(data.responseData.assetGroupTO.spareParts == true) {
          this.showSpareParts = true;
        }
        if(data.responseData.assetGroupTO.accessories == true) {
          this.showAccessories = true;
        }
        if(data.responseData.assetGroupTO.consumables == true) {
          this.showConsumables = true;
        }
        if(data.responseData.assetGroupTO.document == true) {
          this.showDocument = true;
        }
        if(data.responseData.assetGroupTO.selfAnalysis == true) {
          this.showSelfAnalysis = true;
        }
        if(data.responseData.assetGroupTO.additionalInfo == true) {
          this.showAdditionalInfo = true;
        }
        if(data.responseData.assetGroupTO.checkList == true) {
          this.showCheckList = true;
        }
        if(data.responseData.assetGroupTO.solutionBank == true) {
          this.showSolutionBank = true;
        }
        this.sparePartsDataSource = data.responseData.modelItemList;
        this.accessoriesDataSource = data.responseData.accessoriesList;
        this.consumablesDataSource = data.responseData.consumableList;
        this.documentDataSource = data.responseData.modelDocList;
        this.selfAnalysisDataSource = data.responseData.selfAnalysisList;
        this.additionalInfoDataSource = data.responseData.additionalInfoList;
        this.checkPointsDataSource = data.responseData.checkPointsList;
        this.solutionBankDataSource = data.responseData.solutionBankList;
      })
   }

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  @HostBinding('@.disabled') disabled = true
}
