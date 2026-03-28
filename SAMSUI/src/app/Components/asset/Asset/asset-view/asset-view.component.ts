import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-asset-view',
  templateUrl: './asset-view.component.html',
  styleUrls: ['./asset-view.component.css']
})
export class AssetViewComponent implements OnInit {

  assetMainForm: FormGroup;
  //set page title
  title = 'Asset Optima - Asset';


  constructor(private activatedRoute: ActivatedRoute,
                private commonService: CommonService,
                private assetOptimaServices: AssetOptimaServices,
                private assetOptimaConstants: AssetOptimaConstants,
                private locationRef:Location,
                private router: Router,
                private titleService: Title) { }

    ngOnInit() {
     // document.getElementById('commonFooter').style.display='none';
      this.titleService.setTitle(this.title);
      this.assetMainForm = new FormGroup({
        modelId : new FormControl(),
        assetGroup : new FormControl(''),
        modelImage : new FormControl(''),
        assetGroupName : new FormControl(null,[Validators.required]),
        modelName : new FormControl(null,[Validators.required]),
        manufacturerName : new FormControl(),
        lifeSpan : new FormControl(0),
        manufacturerId : new FormControl(),
        assetGroupId : new FormControl(),
        assetCategoryId : new FormControl(),
        assetCategoryName : new FormControl(),
        assetTypeId : new FormControl(),
        assetTypeName : new FormControl(),
        subCategoryId : new FormControl(),
        subCategoryName : new FormControl(),
        functionality : new FormControl(''),
  
        assetCode : new FormControl('',[Validators.required]),
        serialNo : new FormControl('',[Validators.required]), 
        warrentyDays : new FormControl(''),
        installationDtDisp : new FormControl('',[Validators.required]),
        warrentyStartDtDisp : new FormControl('',[Validators.required]),
        warrentyEndDtDisp : new FormControl('',[Validators.required]),
        assetHdrAttribute1 : new FormControl(''),
        assetHdrAttribute2 : new FormControl(''),
        assetHdrAttribute3 : new FormControl(''),
        assetHdrAttribute4 : new FormControl(''),
        assetHdrAttribute5 : new FormControl(''),
        assetHdrAttribute6 : new FormControl(''),
        assetHdrAttribute7 : new FormControl(''),
        assetHdrAttribute8 : new FormControl(''),
        assetHdrAttribute9 : new FormControl(''),
        assetHdrAttribute10 : new FormControl(''),
        supplierName : new FormControl(),
        supplierId : new FormControl(0),
        purchaseCd : new FormControl(''),
        purchaseOrderNo : new FormControl('',[Validators.required]),
        purchaseDtDisp : new FormControl(''),
        originalPurchaseAmt : new FormControl(0,[Validators.pattern(this.assetOptimaConstants.numericValidation)]),
        exchangeRt : new FormControl(0,[Validators.pattern(this.assetOptimaConstants.numericValidation)]),
        localPurchaseAmt : new FormControl(0,[Validators.pattern(this.assetOptimaConstants.numericValidation)]),
        localTaxRate : new FormControl(0,[Validators.pattern(this.assetOptimaConstants.numericValidation)]),
        localTaxAmt : new FormControl(0,[Validators.pattern(this.assetOptimaConstants.numericValidation)]),
        totalPurchaseAmt : new FormControl(0,[Validators.pattern(this.assetOptimaConstants.numericValidation),Validators.required]),
        yearOfManufacture : new FormControl('',[Validators.pattern(this.assetOptimaConstants.numericValidation)]),
        residualValue : new FormControl('',[Validators.pattern(this.assetOptimaConstants.numericValidation)]),
        returnDownValue : new FormControl('',[Validators.pattern(this.assetOptimaConstants.numericValidation)]),
        scrapValue : new FormControl('',[Validators.pattern(this.assetOptimaConstants.numericValidation)]),
        purchaseCurrencyCode : new FormControl(''),
       // maintenanceType : new FormControl(),
        ownershipType : new FormControl(),
        assignTo : new FormControl(''),
        locationId : new FormControl(''),
        locationName : new FormControl(null,[Validators.required]),
        assetStatus : new FormControl(null,[Validators.required]),
        assetStatusId : new FormControl(0),
        departmentId : new FormControl(0),
        departmentName : new FormControl(null,[Validators.required]),
        personInCharge : new FormControl(null,[Validators.required]),
        personInChargeId : new FormControl(0),
        assetHdrId : new FormControl(''),
        orgId : new FormControl(''),
        createdBy : new FormControl(''),
        createdDt : new FormControl(''),
        functionalStatus : new FormControl(),
        amcPercent : new FormControl(0,[Validators.pattern(this.assetOptimaConstants.numericValidation)]),
        cmcPercent : new FormControl(0,[Validators.pattern(this.assetOptimaConstants.numericValidation)]),
        amcValue : new FormControl(0,[Validators.pattern(this.assetOptimaConstants.numericValidation)]),
        cmcValue : new FormControl(0,[Validators.pattern(this.assetOptimaConstants.numericValidation)]),
        amcEscalationPercentage : new FormControl(0,[Validators.pattern(this.assetOptimaConstants.numericValidation)]),
        cmcEscalationPercentage : new FormControl(0,[Validators.pattern(this.assetOptimaConstants.numericValidation)]),
        amcEscalationValue : new FormControl(0,[Validators.pattern(this.assetOptimaConstants.numericValidation)]),
        cmcEscalationValue : new FormControl(0,[Validators.pattern(this.assetOptimaConstants.numericValidation)]),
        criticalNatureUnit : new FormControl(),
        warrentyEndDtDispForLabor : new FormControl(''),   
        pmFrequency : new FormControl(),
        pmMonth : new FormControl(),
        lastPMdoneBy : new FormControl(''),
        lastPMdoneDt : new FormControl(''),
        lastPMdoneDtDisp : new FormControl(''),
        paFrequency : new FormControl(),
        paMonth : new FormControl(),
        lastPAdoneBy : new FormControl(''),
        lastPAdoneDt : new FormControl(''),
        lastPAdoneDtDisp : new FormControl(''),
        qaFrequency : new FormControl(''),
        qaMonth : new FormControl(''),
        lastQAdoneBy : new FormControl(''),
        lastQAdoneDt : new FormControl(''),
        lastQAdoneDtDisp : new FormControl(''),
        subDepartmentId : new FormControl(0),
        subDepartmentName : new FormControl(),
        subDepartmentInchargeName : new FormControl(''),
        strategyYear:new FormControl(''),
        warrantyCoveragePart : new FormControl(),
        warrantyCoverageLabor : new FormControl(),
        serviceEngg1: new FormControl(null,[Validators.required]),
        serviceEngg1Id: new FormControl(0),
        serviceEngg2: new FormControl(null,[Validators.required]),
        serviceEngg2Id: new FormControl(0),
        serviceEngg3: new FormControl(null,[Validators.required]),
        serviceEngg3Id: new FormControl(0),
        serviceEngg4: new FormControl(null,[Validators.required]),
        serviceEngg4Id: new FormControl(0),
        serviceEngg5: new FormControl(''),
        serviceEngg5Id: new FormControl(0)
            })
  
      this.validateEditMode();
    }

  validateEditMode(){
    this.activatedRoute.params.subscribe(
      params => {
        var primaryId = params.pId;
        primaryId =Number(primaryId);
        if(primaryId <= 0){
        }else{
          this.commonService.commonGetService('fetchAssetDtlByAssetId.sams',primaryId).subscribe(
            data => {
              this.assetMainForm.patchValue(data.responseData);
              this.assetMainForm.controls['manufacturerName'].setValue(data.responseData.modelTO.manufacturerName);
              
            }
          )
        }
      }
  );
  }

  exit(){
    this.locationRef.back();
  }

}
