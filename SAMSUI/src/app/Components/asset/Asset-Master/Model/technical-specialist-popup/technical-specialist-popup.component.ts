import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelCreateComponent } from '../model-create/model-create.component';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { CommonHint } from 'src/app/Constants/CommonHint';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { getData } from 'src/app/Model/common/fetchListData';

@Component({
  selector: 'app-technical-specialist-popup',
  templateUrl: './technical-specialist-popup.component.html',
  styleUrls: ['./technical-specialist-popup.component.css']
})
export class TechnicalSpecialistPopupComponent implements OnInit {


  specialistFormGroup: FormGroup;
  headingDisplay: string = '';
  scrollSyncSpecName: Boolean = false;
  recordsPerPageForCombo: string = ''
  specialistNamePageNumber: number = 0;
  specialistNameList: any = [];
  buttonDisplay: string = '';
  disbleClear: boolean = false;
  modeDisplay: boolean = false;

  //display other fields once the orgtype is selecetd
  isOrgTypeSelecetd: boolean = false;

  //to display specialist combo/input field
  isExternal: boolean = false;

  //display mandatory fields
  phoneNoMandatory: string = '';
  emailIdMandatory: string = '';

  //disable clear button in edit mode
  disableClearButton: boolean = false;

  //hide submit and clear buttons in view mode
  hideButtons: boolean = false;

  CommonhintMsg = new CommonHint();

  orgTypes = [
    { id: 1, name: 'INTERNAL' },
    { id: 2, name: 'EXTERNAL' }
  ]
  getData: getData;

  constructor(public specialistDialog: MatDialogRef<ModelCreateComponent>,
    public commonService: CommonService,
    private cdr: ChangeDetectorRef,
    private validationService: AssetOptimaConstants,
    private assetOptimaServices: AssetOptimaServices,
    @Inject(MAT_DIALOG_DATA) private data, ) {
    this.specialistNamePageNumber = 1;
  }

  ngOnInit() {
    this.specialistFormGroup = new FormGroup({
      specialistOrgType: new FormControl('', [Validators.required]),
      specialistName: new FormControl('', [Validators.required]),
      specialistId: new FormControl(0),
      extEngineerContactNo: new FormControl('', [Validators.maxLength(15), Validators.minLength(10), Validators.pattern(this.validationService.phoneNumberValidation)]),
      extEngineerEmailId: new FormControl('', [Validators.pattern(this.validationService.emailValidation)]),
      extEngineerOrgName: new FormControl(''),
      modelSpecialistId: new FormControl(0),
      modelId: new FormControl(''),
      active: new FormControl(true)
    })
    this.headingDisplay = 'Create';
    this.buttonDisplay = 'Submit';

    this.specialistFormGroup.controls.extEngineerContactNo.disable();
    this.specialistFormGroup.controls.extEngineerEmailId.disable();
  }

  closeSpecialistModal() {
    this.specialistDialog.close();
  }

  setOrgType(event) {
    if (event === undefined) {
      this.isOrgTypeSelecetd = false;
    } else {
      if (event.id == 1) {
        this.specialistFormGroup.controls.specialistOrgType.setValue('INTERNAL');
        this.isExternal = false;
      } else {
        this.specialistFormGroup.controls.specialistOrgType.setValue('EXTERNAL');
        this.isExternal = true;
        this.phoneNoMandatory = '*';
        this.emailIdMandatory = '*';

        this.specialistFormGroup.controls.extEngineerContactNo.setValidators([Validators.required, Validators.maxLength(15), Validators.minLength(10), Validators.pattern(this.validationService.phoneNumberValidation)]);
        this.specialistFormGroup.controls.extEngineerEmailId.setValidators([Validators.required, Validators.pattern(this.validationService.emailValidation)]);
        this.specialistFormGroup.controls.extEngineerOrgName.setValidators(Validators.required);

        //clear values if any
        this.specialistFormGroup.controls.extEngineerContactNo.setValue('');
        this.specialistFormGroup.controls.extEngineerEmailId.setValue('');
        this.specialistFormGroup.controls.specialistName.setValue('');
        this.specialistFormGroup.controls.specialistId.setValue(0);

        this.specialistFormGroup.controls.extEngineerContactNo.enable();
        this.specialistFormGroup.controls.extEngineerEmailId.enable();
      }
      this.isOrgTypeSelecetd = true;
    }
  }

  listOfSpecialistName(searchKey) {
    this.scrollSyncSpecName = true;
    this.recordsPerPageForCombo = !(this.commonService.fetchSearchValue(searchKey)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllServiceEngineerCombo, searchKey.term, '', '',
      this.recordsPerPageForCombo, this.specialistNamePageNumber, '', '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchKey, this.specialistNamePageNumber , this.specialistNameList , data.responseData.comboList)
          this.specialistNamePageNumber = this.getData.pageNumber;
          this.specialistNameList = this.getData.dataList;
          this.scrollSyncSpecName = false;
        });
  }

  setSpecialistNameCombo(event) {
    if (event === undefined) {
      this.specialistFormGroup.controls.specialistName.setValue('');
      this.specialistFormGroup.controls.extEngineerContactNo.setValue('');
      this.specialistFormGroup.controls.extEngineerEmailId.setValue('');
      this.specialistNamePageNumber = 1;
      this.specialistNameList = [];
    } else {
      this.specialistFormGroup.controls.extEngineerContactNo.clearValidators();
      this.specialistFormGroup.controls.extEngineerEmailId.clearValidators();
      this.specialistFormGroup.controls.specialistName.setValue(event.employeeFirstName);
      this.specialistFormGroup.controls.specialistId.setValue(event.employeeId);
      this.specialistFormGroup.controls.extEngineerEmailId.setValue(event.officeEmailId);
      this.specialistFormGroup.controls.extEngineerContactNo.setValue(event.officeContactNo);
      this.specialistFormGroup.controls.extEngineerContactNo.disable();
      this.specialistFormGroup.controls.extEngineerEmailId.disable();

    }
  }

  clear() {
    this.isOrgTypeSelecetd = false;
    this.specialistFormGroup.reset();
    this.specialistFormGroup.updateValueAndValidity();
  }

  submitspecialistDetails() {
    this.specialistDialog.close(this.specialistFormGroup.getRawValue());
  }


  ngAfterViewInit() {
    if (this.data.specialist != 0) {
      this.specialistFormGroup.patchValue(this.data.specialist);
      this.isOrgTypeSelecetd = true;
      if (this.specialistFormGroup.controls.specialistOrgType.value === 'INTERNAL') {
        this.isExternal = false;
        this.specialistFormGroup.controls.extEngineerContactNo.disable();
        this.specialistFormGroup.controls.extEngineerEmailId.disable();
      } else {
        this.isExternal = true;
        this.specialistFormGroup.controls.extEngineerContactNo.setValidators([Validators.required, Validators.maxLength(15), Validators.minLength(10), Validators.pattern(this.validationService.phoneNumberValidation)]);
        this.specialistFormGroup.controls.extEngineerEmailId.setValidators([Validators.required, Validators.pattern(this.validationService.emailValidation)]);
        this.specialistFormGroup.controls.extEngineerOrgName.setValidators(Validators.required);
        this.specialistFormGroup.controls.extEngineerContactNo.enable();
        this.specialistFormGroup.controls.extEngineerEmailId.enable();
      }
      this.specialistFormGroup.updateValueAndValidity();


      if (this.data.mode === 'edit') {
        this.disableClearButton = true;
        this.buttonDisplay = 'Update';
      } else {
        this.specialistFormGroup.disable();
        this.hideButtons = true;
      }
    } else {
      this.buttonDisplay = 'Submit';
      this.disableClearButton = false;
    }
    this.cdr.detectChanges();

  }


}
