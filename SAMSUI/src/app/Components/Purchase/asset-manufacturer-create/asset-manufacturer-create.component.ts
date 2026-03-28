import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CommonHint } from '../../../Constants/CommonHint';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AssetOptimaServices } from '../../../Constants/AssetOptimaServices';
import { CommonService } from '../../../Services/common-service/common.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DeleteConfirmationComponent } from '../../Common-components/delete-confirmation/delete-confirmation.component';
import { AssetOptimaConstants } from '../../../Constants/AssetOptimaConstants';
import { AssetManufacturerServiceLocationModel } from '../../../Model/purchase/assetManufacturerServiceLocationModel';

import { getData } from 'src/app/Model/common/fetchListData';
import { ServiceCenterCreateComponent } from 'src/app/Components/Purchase/service-center-create/service-center-create.component';
import { ModelsSuppliedPopUpComponent } from '../models-supplied-pop-up/models-supplied-pop-up.component';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-asset-manufacturer-create',
  templateUrl: './asset-manufacturer-create.component.html',
  styleUrls: ['./asset-manufacturer-create.component.css']
})
export class AssetManufacturerCreateComponent implements OnInit {


  CommonhintMsg = new CommonHint();

  @ViewChild('manufacturerSupplier') table1: MatTable<any>;
  @ViewChild('manufacturerChangeTable') table2: MatTable<any>;


  displayColmns = ['sno', 'supplierName', 'supplierSiteName', 'address', 'state', 'country', 'pinCode', 'emailId', 'phoneNo', 'isServiceCenter', 'action'];
  manufacturerChangeDisplayColumns = ['sno', 'manufacturerName', 'supplierName', 'supplierSiteName', 'address', 'state', 'country', 'pinCode', 'emailId', 'phoneNo'];
  displayColsForServiceCenter = ['sno', 'serviceLocationName', 'address1', 'contactPersonName', 'phoneNo', 'active', 'action']

  public states: any = [];
  countries: any = [];
  supplierList: any = [];
  assetmanufacturerSupplierList =new MatTableDataSource<any>();
  newassetmanufacturerSupplierList: any[] = [];
  manufacturerChangeList: any[] = [];
  tempManufacturerSupplierChange: any[] = [];
  tempList: any[] = [];
  assetManufacturerServiceCenterList = new MatTableDataSource<any>();


  statePageNumber: number;
  approvedSupplierPageNumber: number = 0;
  supplierPageNumber: number;
  serviceCentreNamePageNumber: number;
  serviceLocListLength: number = 0;
  searchKey: any = '';

  gotoAssetCategory: string = '/home/assetmaster/assetCategory';

  gotoManufacturer: string = '/home/purchase/manufacturer';

  fromModel: string = '/home/assetmaster/modelCreate';

  stateScrollsync: boolean = false;
  scrollApprovedSuppliersync: boolean = false;

  formOneDirty: boolean = false;
  formOneValid: boolean = false;
  upLoadFlag: boolean = false;
  modeDisplay: boolean = false;
  //disableClear: boolean = false;
  scrollSupplierNamesync: boolean = false;
  subLoader: boolean = false;


  supplierLocationList: any;
  supplierDetailFormGroup: FormGroup;
  assetManufacturerForm: FormGroup;
  manufacturerChangeFormGroup: FormGroup;
  serviceCentreFormGroup: FormGroup;

  limitCount: any;

  // //TO ADD CRITERIA
  // supplierType:string='';
  // HEADDING DISPLAY 
  menu: string = '';
  screen: string = '';
  buttonDisplay: string;
  headingDisplay: string;

  //CHECK FOR NAVIGATION TO SUPPLIER CREATE SCREEN
  isNavigateToSupplier: boolean = false;
  manufacturerNameScrollSync: boolean = false;
  addSupplierBtnDisp: boolean = false;
  scrollServiceCentreSync: boolean = false;
  countryScrollsync: boolean = false;
  countryPageNumber: number;

  manufacturerNamePageNumber: number;
  manufacturerNameList: any[] = [];
  serviceCentreList: any[] = [];
  tempComparatorList: any[] = [];
  manufacturerSupplierTempPush: any = [];

  selectedServiceCenterInfo: AssetManufacturerServiceLocationModel;
  timer;
  @ViewChild('manufacturerFocus') manufacturerFocusSet: ElementRef;

  //VISIBILITY OF APPROVE BUTTON ONLY IN EDIT SCREEN
  isEditMode: boolean = false;

  supplierType: string = '';

  dialogRef;

  //ADD SUPPLIER BUTTONS ENABLE BASED ON MODES
  modeBtnStatus: boolean = false;
  getData: getData;
  formValid: boolean = false;
  formTwoFlag: boolean = false;
  inputModel: String='';
  constructor(
    private readonly assetOptimaServices: AssetOptimaServices,
    private readonly detectorRefs: ChangeDetectorRef,
    private readonly commonService: CommonService,
    private readonly router: Router,
    private readonly locationNavigate: Location,
    private readonly changeDetectorRefs: ChangeDetectorRef,
    private readonly activatedRoute: ActivatedRoute,
    private readonly dialog: MatDialog,
    private readonly assetOptimaConstants: AssetOptimaConstants,
    private translateService: TranslateService

  ) {
    this.statePageNumber = 1;
    this.supplierPageNumber = 1;
    this.approvedSupplierPageNumber = 1;
    this.manufacturerNamePageNumber = 1;
    this.serviceCentreNamePageNumber = 1;
    this.countryPageNumber = 1;
    this.getData = new getData();

  }

  ngOnInit() {
    this.assetManufacturerForm = new FormGroup({
      manufacturerId: new FormControl(0),
      manufacturerCode: new FormControl('', Validators.maxLength(50)),
      address: new FormControl('', [Validators.maxLength(100)]),
      locCountry: new FormControl('', [Validators.required]),
      locCountryId: new FormControl(0),
      manufacturerName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      locState: new FormControl(''),
      active: new FormControl('true'),
      source: new FormControl(''),
      assetManufacturerSupplier: new FormControl([]),
      changeManufacturer: new FormControl([]),
      manufacturerChangeOccurred: new FormControl(''),
      orgId: new FormControl(''),
      createdBy: new FormControl(''),
      createdDt: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedDt: new FormControl(''),
      manufacturerStatus: new FormControl('UNAPPROVED'),
      assetManufacturerServiceLocationList: new FormControl([])
    });

    this.supplierDetailFormGroup = new FormGroup({
      supplierName: new FormControl(''),
      supplierSiteName: new FormControl(''),
      supplierId: new FormControl(0),
      supplierSiteId: new FormControl(''),
      address: new FormControl(''),
      locState: new FormControl(''),
      locCountry: new FormControl(''),
      zipCode: new FormControl(0),
      emailId: new FormControl(''),
      contactPhoneNo: new FormControl(0),
      assetmanufacturerSupplierList: new FormControl('', []),
      manufacturerSupplierId: new FormControl(0),
      active: new FormControl('true'),
      supplierType: new FormControl(''),
      isServiceCenter: new FormControl('')
    });

    this.manufacturerChangeFormGroup = new FormGroup({
      manufacturerChangeList: new FormControl('', []),
      manufacturerName: new FormControl('', [Validators.required]),
      manufacturerId: new FormControl(0),
      changeManufacturerId: new FormControl(0),
      acquiredManufacturerId: new FormControl(0),
      acquiredManufacturerName: new FormControl(''),
      supplierId: new FormControl(0),
      supplierSiteId: new FormControl(0)
    });

    this.selectedServiceCenterInfo = new AssetManufacturerServiceLocationModel();
    this.supplierPageNumber = 1;
    this.statePageNumber = 1;
    this.headingDisplay = "Create";
    this.buttonDisplay = "Submit";
    this.assetManufacturerForm.controls.manufacturerCode.disable();
    this.supplierDetailFormGroup.controls.supplierSiteName.disable();
    this.modeBtnStatus = true;

    this.assetManufacturerServiceCenterList.data = [];
    this.assetManufacturerForm.controls['locState'].disable();
    this.validateEditMode();
    this.setHeadings(); 
    
  }

  validateEditMode() {
    this.activatedRoute.params.subscribe(
      params => {
        let primaryId = params.pId;
        const mode = params.mode;
        primaryId = Number(primaryId);
        if (primaryId <= 0) {
          this.headingDisplay = "Create";
          this.buttonDisplay = "Submit";
          this.disableMethord();          
          if(localStorage.getItem('presentRoute').startsWith('/home/purchase/supplierCreate/')){
            this.supplierDetailFormGroup.controls.supplierSiteName.enable();
            this.assetManufacturerForm.controls['locState'].enable();
            this.assetManufacturerForm.patchValue(JSON.parse(localStorage.getItem('localAssetManufacturerForm')));
            this.disableMethord();
            this.assetManufacturerServiceCenterList.data = this.assetManufacturerForm.controls.assetManufacturerServiceLocationList.value;
            localStorage.removeItem('localAssetManufacturerForm');
            localStorage.removeItem('presentRoute');
          } 
        } else {
          if (mode === 'view') {
            this.modeDisplay = true;
            this.assetManufacturerForm.disable();
            this.supplierDetailFormGroup.disable();
            this.headingDisplay = "View";
            this.modeBtnStatus = false;
            
          } else {
            this.headingDisplay = "Edit";
            this.buttonDisplay = "Update";
            this.isEditMode = true;
            this.modeBtnStatus = true;
            this.assetManufacturerForm.controls['locState'].enable();
            this.supplierDetailFormGroup.controls['supplierName'].enable();
          }
          this.commonService.commonGetService('loadManufactureSupplierInfo.sams', primaryId).subscribe(
            data => {
              this.assetManufacturerForm.patchValue(data.responseData);
              this.assetmanufacturerSupplierList.data = data.responseData.assetManufacturerSupplier;
              this.manufacturerChangeList = data.responseData.changeManufacturer; 
              this.getManufacturerServiceLocList(this.assetManufacturerForm.controls.manufacturerId.value);
            }
          );
        }
      }
    );
  }

  ngAfterViewInit() {
    this.manufacturerFocusSet.nativeElement.focus();
  }

  createSupplier(supplierId, mode) {
    this.isNavigateToSupplier = true;
    if (this.isNavigateToSupplier) {
      // GET PREVIOUS ROUTER
      localStorage.setItem('presentRoute', 'home/purchase/supplierCreate/' + supplierId + '/' + mode);
      this.assetManufacturerForm.controls.assetManufacturerServiceLocationList.setValue(this.assetManufacturerServiceCenterList.data);      
      this.assetManufacturerForm.controls.assetManufacturerSupplier.setValue(this.assetmanufacturerSupplierList.data);
      localStorage.setItem('localAssetManufacturerForm', JSON.stringify(this.assetManufacturerForm.value));
    }
    this.router.navigate(['home/purchase/supplierCreate/' + supplierId + '/' + mode]);
  }

  getCountryData(searchValue) {
    this.countryScrollsync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '50' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllCountryForCombo, searchValue.term, '', '', this.limitCount, this.countryPageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchValue, this.countryPageNumber , this.countries , data.responseData.comboList)
        this.countryPageNumber = this.getData.pageNumber;
        this.countries = this.getData.dataList;
        this.countryScrollsync = false;
      });
  }

  formOneValidation() {
    this.formOneDirty = true;
    if ( // Form One Validation
      this.assetManufacturerForm.get('locState').valid &&
      this.assetManufacturerForm.get('locCountry').valid
    ) {
      this.formOneValid = true;
    } else {
      this.formOneValid = false;
    }
  }

  getCountryList(event) {
    
    if (event === null || event === undefined) {
      this.assetManufacturerForm.controls['locState'].setValue('');
      this.assetManufacturerForm.controls['locCountry'].setValue('');
      this.assetManufacturerForm.controls['locCountryId'].setValue(0);
      this.assetManufacturerForm.controls['locState'].disable();
      this.statePageNumber = 1;
      this.states = [];
      this.countryPageNumber =1;
      this.countries =[];
    } else {
      this.assetManufacturerForm.controls['locCountry'].setValue(event.countryName); 
      this.assetManufacturerForm.controls['locCountryId'].setValue(event.countryId);
      this.assetManufacturerForm.controls['locState'].enable();
      this.statePageNumber = 1;
      this.states = [];
    }
    this.disableMethord();
  }

  getStateData(searchValue) {
  const locCountryId =  this.assetManufacturerForm.controls.locCountryId.value;
  this.stateScrollsync = true;
    if(locCountryId > 0 ){
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '50' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfStateCombo, searchValue.term, locCountryId,'', this.limitCount, this.statePageNumber,this.assetManufacturerForm.controls['locCountry'].value !== 0 ? this.assetManufacturerForm.controls['locCountry'].value : '').subscribe(
        (data) => {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.statePageNumber , this.states , data.responseData.comboList)
          this.statePageNumber = this.getData.pageNumber;
          this.states = this.getData.dataList;
          this.stateScrollsync = false;
        }
      );
    }else{
      this.states = [];
      this.statePageNumber = 1;
      this.stateScrollsync = false;
      this.commonService.openToastWarningMessage(`Kindly Select The "Country".`);
    }
  }

  getStateList(event) {
    if (event === undefined) {
      this.assetManufacturerForm.controls['locState'].setValue('');
      this.states = [];
      this.statePageNumber = 1;
    } else {
      this.assetManufacturerForm.controls['locState'].setValue(event.stateName);
    }
  }
 
  listOfSupplier(searchTerms) {
    this.scrollSupplierNamesync = true;
    const source = this.assetManufacturerForm.controls.source.value 
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllSupplierNameCombo,searchTerms.term,'','',this.limitCount,this.supplierPageNumber,'',source).subscribe(
      (data) => {
        if (data.success) {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchTerms, this.supplierPageNumber , this.supplierList , data.responseData.comboList)
          this.supplierPageNumber = this.getData.pageNumber;
          this.supplierList = this.getData.dataList;
        }
        this.scrollSupplierNamesync = false;
      });
  }

  fetchIdOfSupplier(event) {
    if (event === undefined) {
      this.supplierDetailFormGroup.controls['supplierId'].setValue(0);
      this.supplierDetailFormGroup.controls['supplierName'].setValue('');
      this.supplierPageNumber = 1;
      this.supplierDetailFormGroup.controls['supplierSiteId'].setValue(0);
      this.supplierDetailFormGroup.controls['supplierSiteName'].setValue('');
      this.supplierLocationList = [];
      this.supplierList =[];
      this.approvedSupplierPageNumber = 1;
      this.supplierType = '';
      this.supplierDetailFormGroup.controls.supplierSiteName.disable();

    } else {
      this.supplierDetailFormGroup.controls.supplierId.setValue(event.supplierId);
      this.supplierDetailFormGroup.controls.supplierName.setValue(event.supplierName);
      this.supplierDetailFormGroup.controls['supplierSiteId'].setValue(0);
      this.supplierDetailFormGroup.controls['supplierSiteName'].setValue('');
      this.supplierDetailFormGroup.controls.supplierType.setValue(event.supplierType);
      this.supplierLocationList = [];
      this.approvedSupplierPageNumber = 1;
      this.supplierDetailFormGroup.controls.supplierSiteName.enable();
    }
  }

  listOfSupplierApproved(searchValue) {
    this.scrollApprovedSuppliersync = true;
    const supplierId =  this.supplierDetailFormGroup.controls.supplierId.value
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllSupplierLocCombo.sams', searchValue.term, supplierId, '', this.limitCount, this.approvedSupplierPageNumber, '').subscribe(
      (data) => {
        if (data.success) {
          this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.approvedSupplierPageNumber , this.supplierLocationList , data.responseData.comboList)
          this.approvedSupplierPageNumber = this.getData.pageNumber;
          this.supplierLocationList = this.getData.dataList;
        }
        this.scrollApprovedSuppliersync = false;
      });
  }

  fetchIdOfSupplierApproved(event) {
    if (event === undefined) {
      this.supplierDetailFormGroup.get('supplierSiteId').setValue(0);
      this.approvedSupplierPageNumber = 1;
      
      this.supplierLocationList =[];
    } else {
      this.supplierDetailFormGroup.controls.supplierSiteId.setValue(event.supplierLocationId);
      this.supplierDetailFormGroup.controls.supplierSiteName.setValue(event.supplierSiteName);
      //SET OTHER INFO
      this.supplierDetailFormGroup.controls.address.setValue(event.suppLocAddress1);
      this.supplierDetailFormGroup.controls.locCountry.setValue(event.suppLocCountry);
      this.supplierDetailFormGroup.controls.locState.setValue(event.suppLocState);
      this.supplierDetailFormGroup.controls.zipCode.setValue(event.suppLocPinCode);
      this.supplierDetailFormGroup.controls.emailId.setValue(event.supplierSiteContactEmailId);
      this.supplierDetailFormGroup.controls.contactPhoneNo.setValue(event.supplierSitePersonPhoneNo);   
      this.supplierDetailFormGroup.controls.isServiceCenter.setValue(event.isServiceCenter);
    }
  }

  addManufacturerSupplier(supplierId, supplierSiteIdActual, address) {

    const supplierIdValid = this.assetmanufacturerSupplierList.data.findIndex(data => data.supplierId === supplierId) === -1;
    
    const supplierSiteIdValid = this.assetmanufacturerSupplierList.data.findIndex(data => data.supplierSiteId === supplierSiteIdActual) === -1;
    if (supplierIdValid && supplierSiteIdValid) {
      this.assetmanufacturerSupplierList.data.push(this.supplierDetailFormGroup.value);
      this.assetManufacturerForm.controls.assetManufacturerSupplier.setValue(this.assetmanufacturerSupplierList);
      this.changeDetectorRefs.detectChanges();
      this.table1.renderRows();
      this.supplierManufacturer(); 
    } else {
      this.commonService.openToastWarningMessage('Supplier Site and Supplier is already added.')
    }
  }
  supplierManufacturer() {
    this.supplierDetailFormGroup.controls.supplierName.setValue('');
    this.supplierDetailFormGroup.controls.supplierId.setValue(0);
    this.supplierDetailFormGroup.controls.supplierSiteName.setValue('');
    this.supplierDetailFormGroup.controls.supplierSiteId.setValue(0);
    this.supplierPageNumber = 1;
    this.approvedSupplierPageNumber = 1;  
    this.supplierLocationList =[];
    this.supplierList =[];        
  }

  submit() {
    const assetmanufacturerSupplierList = this.assetmanufacturerSupplierList.data;
    this.assetManufacturerForm.controls.assetManufacturerSupplier.setValue(assetmanufacturerSupplierList);    
    this.assetManufacturerForm.controls.assetManufacturerServiceLocationList.setValue(this.assetManufacturerServiceCenterList.data);
      this.upLoadFlag = true;
      this.commonService.commonInsertService('saveOrUpdateManufacturer.sams', this.assetManufacturerForm.getRawValue()).subscribe(
        data => {
          if (data.success) {
            this.commonService.openToastSuccessMessage(data.message); 
            this.upLoadFlag = false;
            this.navigateToManufacturerCreateEditMode(data.responseData.manufacturerId);
            this.closeModal();
          } else {
            this.commonService.openToastErrorMessage(data.message);
            this.upLoadFlag = false;
          }
        }
      );
  }

  navigateToManufacturerCreateEditMode(manufacturerId){
    this.router.navigate(['home/purchase/manufacturerSupplierCreate/' +manufacturerId +'/' + 'edit' ]);
  }

  closeModal() {
    // if(this.screen === 'Asset Manufacturer'){
    //   this.router.navigate([this.gotoAssetCategory ]);
    // }else if(this.screen === 'Manufacturer'){   
    //   this.router.navigate([this.gotoManufacturer ]);
    // }
    this.backToPreviousPage();
  }

  backToPreviousPage() {
    localStorage.setItem('previousRoute', this.router.url);
     // this.router.navigate([this.commonService.getPreviousUrl()]);
      this.locationNavigate.back();
    
  }

  backToMasterScreen(){
    this.locationNavigate.back();
  }

  setHeadings() {     
    if (localStorage.getItem('previousRoute') != null) {
      if (localStorage.getItem('previousRoute').startsWith(this.gotoAssetCategory)) {
        this.menu = 'Master';
        this.screen = 'Asset Manufacturer';
        this.assetManufacturerForm.controls['source'].setValue('ASSET');
        localStorage.setItem('previousRoute', this.gotoAssetCategory);
      } else if (localStorage.getItem('previousRoute').startsWith(this.gotoManufacturer)) {
        localStorage.setItem('previousRoute', '');
        this.menu = 'Purchase';
        this.screen = 'Manufacturer';
        this.assetManufacturerForm.controls['source'].setValue('ITEM');
        localStorage.setItem('previousRoute', this.gotoManufacturer);
      }else if (localStorage.getItem('previousRoute').startsWith(this.fromModel)) {
        localStorage.setItem('previousRoute', '');
        this.menu = 'Model';
        this.screen = 'Manufacturer';
        this.assetManufacturerForm.controls['source'].setValue('Model');
        localStorage.setItem('previousRoute', this.fromModel);
     }
    }
  }

  // tabelValidation() {
  //   return (this.assetmanufacturerSupplierList.data.length > 0) ? false : true;

  // }

  DeleteSupplier(manufacturerSupplierId, index, supplierSiteId) {
    this.dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Supplier'
      }
    });
    this.dialogRef.disableClose = true;
    this.dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          if (manufacturerSupplierId <= 0) {
            this.newassetmanufacturerSupplierList = this.assetmanufacturerSupplierList.data;
            this.newassetmanufacturerSupplierList.splice(index, 1);
            this.assetmanufacturerSupplierList.data = this.newassetmanufacturerSupplierList;
            this.changeDetectorRefs.detectChanges();
            this.commonService.openToastSuccessMessage("Record Deleted Successfully.");
            this.supplierManufacturer();
          } else { 
            this.commonService.commonGetService('deleteManufactureSupplier.sams', manufacturerSupplierId, supplierSiteId).subscribe(
              data => {
                if (data.success) {
                  this.newassetmanufacturerSupplierList = this.assetmanufacturerSupplierList.data;
                  this.newassetmanufacturerSupplierList.splice(index, 1);
                  this.assetmanufacturerSupplierList.data = this.newassetmanufacturerSupplierList;
                  this.commonService.openToastSuccessMessage("Record Deleted Successfully.");
                  this.supplierManufacturer();
                } else {
                  this.commonService.openToastErrorMessage(data.message);
                }
              }
            );
          }
        }        
      }
    );
  }

  approveManufacturer() {
    this.assetManufacturerForm.controls.manufacturerStatus.setValue('APPROVED');
    this.submit();
  }


  //DISPLAY APPROVE BUTTON ONLY IF THE ACCESS IS GRANTED
  approveButtonDisplay() {
    if (this.assetOptimaConstants.manufacturerApproval && this.isEditMode) {
      return true;
    }
    else return false;

  }

  isApproved() {
    if (this.assetManufacturerForm.controls.manufacturerStatus.value === 'APPROVED') {
      return true;
    }
    else{
      return false; 
    }
  }

  listOfManufacturerName(searchValue) {
    this.manufacturerNameScrollSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : '';
    this.commonService.getComboResults('listOfAllManufacturerCombo.sams', searchValue.term, '', '', this.limitCount, this.manufacturerNamePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
          this.getData = this.commonService.fetchDataList(searchValue, this.manufacturerNamePageNumber , this.manufacturerNameList , data.responseData.comboList)
          this.manufacturerNamePageNumber = this.getData.pageNumber;
          this.manufacturerNameList = this.getData.dataList;
        this.manufacturerNameScrollSync = false;
      });
  }

  getManufacturerNameComboValue(event) {
    if (event === undefined) {
      this.addSupplierBtnDisp = false;
      this.manufacturerNamePageNumber = 1;
    } else {
      this.addSupplierBtnDisp = true;
      this.manufacturerChangeFormGroup.controls.manufacturerId.setValue(event.manufacturerId);
      this.manufacturerChangeFormGroup.controls.manufacturerName.setValue(event.manufacturerName);

    }
  }

  fetchManufacturerSupplier() {
    this.commonService.commonGetService('loadManufactureSupplierInfo.sams', this.manufacturerChangeFormGroup.controls.manufacturerId.value).subscribe(
      data => {
        for (let i = 0; i < data.responseData.assetManufacturerSupplier.length; i++) {
          this.manufacturerChangeList.push(data.responseData.assetManufacturerSupplier[i]);
          this.changeDetectorRefs.detectChanges();
          this.table2.renderRows();
        }
        this.manufacturerChangeFormGroup.controls.manufacturerChangeList.setValue(this.manufacturerChangeList);
      });
    this.manufacturerChangeFormGroup.controls.manufacturerName.setValue('');
    this.addSupplierBtnDisp = false;
  }

  compareSuppliers() {
    for (let i = 0; i < this.assetmanufacturerSupplierList.data.length; i++) {
      for (let j = 0; j < this.tempComparatorList.length; j++) {
        if ((this.assetmanufacturerSupplierList[i].supplierId === this.tempComparatorList[j].supplierId) &&
          (this.assetmanufacturerSupplierList[i].supplierSiteId === this.tempComparatorList[j].supplierSiteId)) {
          this.tempComparatorList.splice(j, 1);
        }
      }
    }
    this.assetmanufacturerSupplierList.data = this.assetmanufacturerSupplierList.data.concat(this.tempComparatorList);
  }

  addServiceCenterToManufacturer(serviceCenterToBeAdded: AssetManufacturerServiceLocationModel) {
    if (serviceCenterToBeAdded.index === -1) {
      const index = this.commonService.getIndexOfTheItem(this.assetManufacturerServiceCenterList.data, true, 'serviceLocationName', serviceCenterToBeAdded.serviceLocationName);

      if (index === -1) {
        this.tempList = this.assetManufacturerServiceCenterList.data;
        this.tempList.push(serviceCenterToBeAdded);
        this.assetManufacturerServiceCenterList.data = this.tempList;
        this.detectorRefs.detectChanges();
      } else {
        this.commonService.openToastWarningMessage('"'+this.translateService.instant('MANUFACTURER_SERVICE_CENTER_TAB')+'"'+ " With Same Name Exists Already.");
      }
    } else {

      this.tempList = this.assetManufacturerServiceCenterList.data;
      this.tempList[serviceCenterToBeAdded.index] = serviceCenterToBeAdded;
      this.assetManufacturerServiceCenterList.data = this.tempList;
      this.detectorRefs.detectChanges();
    }
  }

  openServiceCenterCreateOrEdit(element, mode: String, index: number) {

    this.dialogRef = this.dialog.open(ServiceCenterCreateComponent, {
      height: 'auto',
      width: '1100px',
      data: {
        'assetManufacturerServiceCenter': element,
        'mode': mode,
        'index': index
      }
    });
    this.dialogRef.disableClose = true;
    this.dialogRef.afterClosed().subscribe(
      data => {
        if (data.assetManufacturerServiceCenter.serviceLocationName != null) {
          this.addServiceCenterToManufacturer(data.assetManufacturerServiceCenter);
          this.serviceLocListLength = this.assetManufacturerServiceCenterList.data.length;
        }
      });
  }

  deleteManufactureServiceCenter(manufacturerServiceLocId: number, index: number) {
    this.dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Service Center'

      }
    });
    this.dialogRef.disableClose = true;
    this.dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
          this.tempList = this.assetManufacturerServiceCenterList.data;
          this.tempList.splice(index, 1);
          this.assetManufacturerServiceCenterList.data = this.tempList;
          this.serviceLocListLength = this.assetManufacturerServiceCenterList.data.length;
          this.commonService.openToastSuccessMessage("Record Deleted Successfully.");
        }
      });
  }

  getManufacturerServiceLocList(manufacturerId: number) {
    this.subLoader = true;
    this.commonService.commonGetService('fetchAssetManufacturerServiceLocByManufacturreId.sams', manufacturerId).subscribe(
      (data) => {
        if (data.success) {
          this.subLoader = false;
          this.assetManufacturerServiceCenterList.data = data.responseData;
          this.serviceLocListLength = this.assetManufacturerServiceCenterList.data.length;
        } else {
          this.subLoader = false;
          this.commonService.openToastWarningMessage('Error occurred while fetching Manufacturer Service Location list.');
        }
      }
    );
  }

  viewModelsSupplied(supplierId) {
    const dialogRef = this.dialog.open(ModelsSuppliedPopUpComponent, {
      height: '650px',
      width: '1000px',
      data: {
        'supplierId': supplierId,
        'manufacturerId': this.assetManufacturerForm.controls.manufacturerId.value,
        'manufacturerName': this.assetManufacturerForm.controls.manufacturerName.value
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed();

  }

  disableMethord(){
    if(this.assetManufacturerForm.controls.manufacturerName.valid && this.assetManufacturerForm.controls.locCountry.valid){
      this.supplierDetailFormGroup.controls['supplierName'].enable();
      this.formTwoFlag = true;
    }else{
      this.supplierDetailFormGroup.controls['supplierName'].disable();
      this.supplierDetailFormGroup.controls['supplierSiteName'].disable();
      this.formTwoFlag = false;
    }
  }
  checkFormFields(value:String) { 
    if(value === 'manufacturerName'){
      if(this.assetManufacturerForm.controls.manufacturerName.value.replace (/s+/g, ' ').trim () === ''){
        this.assetManufacturerForm.controls['manufacturerName'].setValue('');
      }
    }
    else if(value === 'address'){
      
      if(this.assetManufacturerForm.controls.address.value.replace (/s+/g, ' ').trim () === ''){
        this.assetManufacturerForm.controls['address'].setValue('');
      }
    }
    }

    checkFormFieldSpecialCharValidation(value:String){

      clearTimeout(this.timer);

    this.timer = setTimeout(() => {
        if(value==='manufacturerName'){
          this.inputModel = this.assetManufacturerForm.controls.manufacturerName.value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').toUpperCase();
          if(this.inputModel.length===0 && this.assetManufacturerForm.controls.manufacturerName.value!=='')
          {
            this.assetManufacturerForm.controls['manufacturerName'].setValue('');
            this.commonService.openToastWarningMessage("Please Enter the Valid Manufacturer Name."); 
            this.assetManufacturerForm.controls.manufacturerName.setErrors(Validators.required);

          }
        }
        else if(value === 'address'){
          this.inputModel = this.assetManufacturerForm.controls.address.value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').toUpperCase();
          if(this.inputModel.length===0 && this.assetManufacturerForm.controls.address.value!=='')
          {
            this.assetManufacturerForm.controls['address'].setValue('');
            this.commonService.openToastWarningMessage("Please Enter the Valid Address."); 

          }
        }
       
    }, 900);
    }

    
    
}