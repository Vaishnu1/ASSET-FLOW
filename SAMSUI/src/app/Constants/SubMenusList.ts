import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class SubMenus{
    //ORG MASTERS
    public organization:boolean = false;
    public  entityGroup:boolean = false ;
    public legalEntity:boolean = false ;
    public location:boolean  = false;
    public tax:boolean = false ;
    public region:boolean = false ;
    public department:boolean = false ;
    public subDepartment:boolean = false ; 
    public  designation:boolean = false ;
    public uom:boolean = false ;
    public currencyCode:boolean = false ;
    //ASSET MASTERS
    public assetCategory:boolean = false ;
    public  assetSubCategory: boolean = false ;
    public  assetType:boolean = false ;
    public assetGroup: boolean = false ;
    public assetStatus:boolean = false ;
    public manufacturer:boolean = false ;
    //ITEM MASTERS
    public itemType:boolean = false ;
    public itemCategory:boolean = false ;
    //SERVICE MASTER
    public priority:boolean = false ;
    public severity:boolean = false ;
    public causeCode:boolean = false ;
    public actionCode:boolean = false ;
    //USER MASTER
    public group:boolean = false ;
    public groupAccess:boolean = false ;
    public user:boolean = false ;
    public  locationAccess:boolean = false ;
    //REPORTS
    public assetReport:boolean = false ;
    public serviceReport:boolean = false;
}