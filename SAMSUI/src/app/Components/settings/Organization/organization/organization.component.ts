import {Component, OnInit, TemplateRef, ViewChild, ElementRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {FormControl} from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { OrganisationModel } from 'src/app/Model/base/organisation';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';
import { Title } from '@angular/platform-browser';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { Location } from '@angular/common';
// import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})

export class OrganizationComponent {
  //Set Page Title
  title = 'Asset Optima - Organization Master';
  Active_Tab = 'organization_view';
  displayedColumns = ['sno', 'name', 'city', 'state','contactnumber','updatedby','updateddate','action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  organizationModel: OrganisationModel;
  searchvalue : any = '';
  panelOpenState = false;
  showFiller = false;
  mode = new FormControl('over');
  logoUrl :string ='';
  activeTabNum: number;

  isFromAssetCreateOnly : string = '';

  //PERMISSIONS 
  modelAccessModule: ModuleAccessModel;
  legalEntityModuleAccess: ModuleAccessModel;
  regionModuleAccess: ModuleAccessModel;
  locationModuleAccess: ModuleAccessModel;
  departmentModuleAccess: ModuleAccessModel;
  subDeptModuleAccess: ModuleAccessModel;
  designationModuleAccess: ModuleAccessModel;
  taxModuleAccess: ModuleAccessModel;
  currencyCodeModuleAccess: ModuleAccessModel;
  uomModuleAccess: ModuleAccessModel;
  buildingModuleAccess: ModuleAccessModel;
  itemMasterModuleAccess: ModuleAccessModel;
  bpModuleAccess: ModuleAccessModel;


  constructor(private router: Router,
              private userSession: UserSessionService,
              private commonService: CommonService,
              private samsServices: AssetOptimaServices,
              private samsConstants: AssetOptimaConstants,
              private titleService: Title,
              private location: Location,

              ) {
      this.organizationModel =  new OrganisationModel();
      this.modelAccessModule = new ModuleAccessModel();

      this.legalEntityModuleAccess = new ModuleAccessModel();
      this.regionModuleAccess = new ModuleAccessModel();
      this.locationModuleAccess = new ModuleAccessModel();
      this.departmentModuleAccess = new ModuleAccessModel();
      this.subDeptModuleAccess = new ModuleAccessModel();
      this.designationModuleAccess = new ModuleAccessModel();
      this.taxModuleAccess = new ModuleAccessModel();
      this.currencyCodeModuleAccess = new ModuleAccessModel();
      this.uomModuleAccess = new ModuleAccessModel();
      this.buildingModuleAccess = new ModuleAccessModel();
      this.itemMasterModuleAccess = new ModuleAccessModel();
      this.bpModuleAccess = new ModuleAccessModel();

   }


  ngOnInit() {
    this.routerLinkActiveTab();
    this.modelAccessModule = this.userSession.getUserGroupAccess()['GROUPACCESS_ORGANIZATION_MASTER'];
    this.titleService.setTitle(this.title);
  //  document.getElementById('commonFooter').style.display='none';

  this.legalEntityModuleAccess = this.userSession.getUserGroupAccess()['GROUPACCESS_LEGAL_ENTITY'];
  this.regionModuleAccess = this.userSession.getUserGroupAccess()['GROUPACCESS_REGION'];
  this.locationModuleAccess = this.userSession.getUserGroupAccess()['GROUPACCESS_LOCATION'];
  this.departmentModuleAccess = this.userSession.getUserGroupAccess()['GROUPACCESS_DEPARTMENT'];
  this.subDeptModuleAccess = this.userSession.getUserGroupAccess()['GROUPACCESS_SUB_DEPARTMENT'];
  this.designationModuleAccess = this.userSession.getUserGroupAccess()['GROUPACCESS_DESIGNATION'];
  this.taxModuleAccess = this.userSession.getUserGroupAccess()['GROUPACCESS_TAX'];
  this.currencyCodeModuleAccess = this.userSession.getUserGroupAccess()['GROUPACCESS_CURRENCY_CODE'];
  this.uomModuleAccess = this.userSession.getUserGroupAccess()['GROUPACCESS_UOM'];
  this.buildingModuleAccess = this.userSession.getUserGroupAccess()['GROUPACCESS_BUILDING'];
  this.itemMasterModuleAccess = this.userSession.getUserGroupAccess()['GROUPACCESS_ITEM_MASTER'];
  this.bpModuleAccess = this.userSession.getUserGroupAccess()['GROUPACCESS_BUSINESS_PARTNER'];

    this.viewOrganizationInfo();
  }

  Active_Tab_Change(name) {
    this.Active_Tab = name;
  }

  routerLinkActiveTab(){
    if(localStorage.getItem('previousRoute')!= null ){
      if(localStorage.getItem('previousRoute').startsWith('/home/settingsmaster/locationCreate') && localStorage.getItem('previousRoute')!= ''){
        this.Active_Tab_Change('location_list');
        localStorage.setItem('previousRoute','');
      }else if(localStorage.getItem('previousRoute').startsWith('/home/settingsmaster/legalEntityCreate') && localStorage.getItem('previousRoute')!=''){
        this.Active_Tab_Change('legal_entity');
        localStorage.setItem('previousRoute','');
      } else if(localStorage.getItem('previousRoute').startsWith('/home/settingsmaster/itemMasterCreate') && localStorage.getItem('previousRoute')!=''){
        this.Active_Tab_Change('item_master');
        this.activeTabChange(2);
        localStorage.setItem('previousRoute','');
      } else if(localStorage.getItem('previousRoute').startsWith('/home/settingsmaster/moduleCreate') && localStorage.getItem('previousRoute')!=''){
        this.Active_Tab_Change('item_master');
        this.activeTabChange(3);
        localStorage.setItem('previousRoute','');
      } else if(localStorage.getItem('previousRoute').startsWith('/home/settingsmaster/businessPartnerCreate') && localStorage.getItem('previousRoute')!=''){
        this.Active_Tab_Change('BUSINESS_PARTNER');
        localStorage.setItem('previousRoute','');
      } else if(localStorage.getItem('previousRoute').startsWith('/home/asset/assetCreateV1') && localStorage.getItem('previousRoute')!=''){
              this.Active_Tab_Change('department_list');
              localStorage.setItem('previousRoute','');
              this.isFromAssetCreateOnly = 'fromAssetCreate';
      }
       
  }
  }
  onSearchChange(searchValue : string ) {  
    this.searchvalue = searchValue;
  }

  createOrganization(){
    this.router.navigate(['/newOrg']);
  }


  editOrganization(){
    this.router.navigate(['home/settingsmaster/editOrgInfo',this.userSession.getUserOrgId()]);
  }

  viewOrganizationInfo() {
    this.commonService.commonGetService(this.samsServices.loadOrganisationDtl,this.userSession.getUserOrgId()).subscribe(
      (data) => {
        this.organizationModel = data.responseData;
        this.logoUrl = this.samsConstants.connectionUrl + this.samsServices.getImage + "?resourceName=" + this.organizationModel.logoPath;
      }
    );
  }
  
  activeTabChange(tab){
    this.activeTabNum = tab;
  }

}