import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonService } from 'src/app/Services/common-service/common.service';

@Component({
  selector: 'app-location-view',
  templateUrl: './location-view.component.html',
  styleUrls: ['./location-view.component.css']
})
export class LocationViewComponent implements OnInit {


  step = 0;

  constructor(private activatedRoute:ActivatedRoute, 
    private commonService: CommonService, private assetOptimaConstants: AssetOptimaConstants, 
    private samsService: AssetOptimaServices, private changeDetech: ChangeDetectorRef) { 
    }

  locationCreateFormGroup:FormGroup;
  pId:Number;
  locRegistrationList:any[]=[]; 
  displayedregsiterColumns = ['sno', 'name', 'info'];
  depTableColumns = ['sno', 'depName', 'reportingInchargeName', 'designation'];
 
  locDepartmentList:any[]=[];
  ngOnInit() {
    this.locationCreateFormGroup = new FormGroup({
      orgName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      locationName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      locId: new FormControl(0),
      locationCode: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      regionName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      regionId: new FormControl(0),
      legalEntityName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      legalEntityId: new FormControl(0),
      locDepartmentList: new FormControl([]),
      locAddress1: new FormControl(''),
      locAddress2: new FormControl(''),
      locCity: new FormControl(''),
      locState: new FormControl(''),
      locCountry: new FormControl(),
      locPinCode: new FormControl(''),
      contactName: new FormControl(''),
      contactPhoneNo: new FormControl(''),
      altPhoneNo: new FormControl(''),
      locEmailId: new FormControl(''),
      locRegistrationList: new FormControl([]), 
      active: new FormControl(true),
      enableCustomerEntry: new FormControl(false),
      pmGenerateDt: new FormControl(''),
      locShortName: new FormControl(''),
      srValidation: new FormControl(''),
      msgLanguage: new FormControl(''),
      msgFilePath: new FormControl(''),
      languageCode: new FormControl(''),
      labelLanguage: new FormControl(''),
      labelFilePath: new FormControl(''),
      popAccountPwd: new FormControl(''),
      popAccountId: new FormControl(''),
      popServerName: new FormControl(''),
      smtpServerName: new FormControl(''),
      smtpPortNo: new FormControl(''),
      locCurCd: new FormControl(''),
      panNo: new FormControl(''),
      gstinNo: new FormControl(''),
      locWebURL: new FormControl(''),
      locationId: new FormControl(''),
      orgId: new FormControl(''),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      locationType: new FormControl({ id: 2, name: 'End Customer' })
    });
    this.activatedRoute.params.subscribe(data => {
      this.pId = data.pId;
      if (this.pId > 0) {
        this.loadInfo(this.pId);
      }
    }); 
  }

  
  loadInfo(locationId) {
    this.commonService.commonGetService(this.samsService.loadLocationInfo, locationId).subscribe(
      data => {
        if (data.success) {
          this.locationCreateFormGroup.patchValue(data.responseData);
          this.locDepartmentList=data.responseData.locDepartmentList;
          this.locRegistrationList=this.locationCreateFormGroup.controls.locRegistrationList.value;
          let departmentTemp = this.locDepartmentList;
          this.locDepartmentList=[];
          for(var i=0; i<departmentTemp.length;i++){
            if(departmentTemp[i].designationId>0 || departmentTemp[i].inchargeId>0){
              this.locDepartmentList.push(departmentTemp[i]);
            }
          }
          this.changeDetech.detectChanges();
          if (this.locationCreateFormGroup.controls.enableCustomerEntry.value) {
            this.locationCreateFormGroup.controls.locationType.setValue({ id: 2, name: 'End User' });
          } else {
            this.locationCreateFormGroup.controls.locationType.setValue({ id: 1, name: 'Service Provider' });
          }
        } else {

        }
      }, error => {

      }
    );
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
}
