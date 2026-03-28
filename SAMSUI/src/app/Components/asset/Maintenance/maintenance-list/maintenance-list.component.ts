import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {  MatPaginator } from '@angular/material/paginator';
import {MatSort } from '@angular/material/sort';

import { FormControl } from '@angular/forms';

export interface DialogData {
  animal: string;
  name: string;
}
export interface maintenanceData {
  sno: number;
  model: string;
  manufacturer: string;
  organization: string;
  updatedby: string;
  updateddate: string;
}
const ELEMENT_DATA: maintenanceData[] = [
  {sno: 1, model: 'VIVID S6', manufacturer: 'WIPRO GE HEALTHCARE', organization: 'TRIMEDXINDIA',  updatedby:'admin', updateddate:'06/05/2019'},
  {sno: 2, model: 'LOGIQ E', manufacturer:  '	PHILIPS MEDICAL SYSTEMS', organization: 'RG MULTI SPECIAL HOSPITAL', updatedby:'admin', updateddate:'06/05/2019'},
  {sno: 3, model: 'VOLUSON E6', manufacturer:  'SAMSUNG ELECTRONICS', organization: 'EAZI TECHNOLOGIES', updatedby:'admin', updateddate:'06/05/2019'},
  {sno: 4, model: 'HD 11', manufacturer:  'OMRON HEALTHCARE, INC.', organization: 'RG MULTI SPECIAL HOSPITAL', updatedby:'admin', updateddate:'06/05/2019'}
  ];


@Component({
  selector: 'app-maintenance-list',
  templateUrl: './maintenance-list.component.html',
  styleUrls: ['./maintenance-list.component.css']
})
export class MaintenanceListComponent implements OnInit {
  displayedColumns = ['sno', 'model', 'manufacturer', 'organization','updatedby','updateddate','action'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchvalue : any = '';
  panelOpenState = false;
  showFiller = false;
  mode = new FormControl('over');


  constructor(private router: Router) { }

  ngOnInit() {
  }

  createMaintenance(){
    this.router.navigate(['/maintenanceCreate']);
  }

  
  onSearchChange(searchValue : string ) {  
    this.searchvalue = searchValue;
  }

}
