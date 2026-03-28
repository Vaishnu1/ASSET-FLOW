import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BASE_FORM_GROUP_CONST } from 'src/app/Model/base/baseFormGroup';

@Component({
  selector: 'app-legal-entity-view',
  templateUrl: './legal-entity-view.component.html',
  styleUrls: ['./legal-entity-view.component.css']
})
export class LegalEntityViewComponent implements OnInit {
  step =0;
  displayedColumns = ['sno', 'name', 'info'];       
  legalEntityRegistrationinfo: any = [];
  headingDisplay: string = "Create";
  displayButton: string = 'Submit';
  searchvalue: any = '';
  legalRegistrationList: any = [];

  legalEntityFormGroup: FormGroup;

  constructor(
    public commonService: CommonService,
    public assetOptimeMthnd: AssetOptimaServices,
    private assetOptimaConstants: AssetOptimaConstants,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
      this.legalEntityFormGroup = new FormGroup({
      legalEntityName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      legalEntityId: new FormControl(''),
      entityGroupId: new FormControl(''),
      entityGroupName: new FormControl('', [Validators.required]),
      legalEntityDesc: new FormControl('', [Validators.maxLength(300)]),
      legalEntityAddress1: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      legalEntityAddress2: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      legalEntityCity: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      legalEntityState: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      legalEntityCountry: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      legalEntityPostalCode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      legalEntityEmailId: new FormControl('', [Validators.pattern(this.assetOptimaConstants.emailValidation), Validators.maxLength(50)]),
      legalEntityPhoneNumber: new FormControl('', [Validators.pattern(this.assetOptimaConstants.phoneNumberValidation), Validators.maxLength(15), Validators.minLength(10)]),
      legalEntityCurrencyCode: new FormControl('', [Validators.maxLength(20)]),
      legalRegistrationList: new FormControl([])
    });
    //dynamicly add all base from controls to the form Group
    let formControlCount: number = 0;
    Object.keys(BASE_FORM_GROUP_CONST.controls).forEach(key => {
      this.legalEntityFormGroup.addControl(key, BASE_FORM_GROUP_CONST.get(key));
      formControlCount++; 
      if (formControlCount == (Object.keys(BASE_FORM_GROUP_CONST.controls).length)) {
        //call the list method after adding all form controls
        this.validateEditMode();
      }
    });
  }

  validateEditMode() {
    this.activatedRoute.params.subscribe(data => {
      this.commonService.commonGetService('loadLegalEntityInfo.sams', data.pId).subscribe(
        data => {
          if (data.success) {
            this.legalEntityFormGroup.patchValue(data.responseData);
            this.legalRegistrationList = data.responseData.legalRegistrationList;
          } else {
            this.commonService.openToastErrorMessage(data.message);
          }
        }, error => {
          this.commonService.openToastErrorMessage(this.assetOptimaConstants.serverError);
        }
      );
    });
  }


  exit() {
    this.location.back();
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
