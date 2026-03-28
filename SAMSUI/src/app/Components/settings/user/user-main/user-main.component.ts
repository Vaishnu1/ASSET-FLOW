import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SubMenus } from 'src/app/Constants/SubMenusList';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent implements OnInit {

  Active_Tab = 'user_group';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchvalue : any = '';
  panelOpenState = false;
  showFiller = false;
  mode = new FormControl('over');

  constructor(private router: Router) {
      
   }

  ngOnInit() {
    this.routerLinkActiveTab();
  }

  Active_Tab_Change(name) {
    this.Active_Tab = name;
  }

  routerLinkActiveTab(){
    if(localStorage.getItem('previousRoute')!= null ){
      if(localStorage.getItem('previousRoute').startsWith('/home/settings/userCreate') && localStorage.getItem('previousRoute')!= ''){
        this.Active_Tab_Change('user_view');
        localStorage.setItem('previousRoute','');
      }
    }
  }

  onSearchChange(searchValue : string ) {  
    this.searchvalue = searchValue;
  }


}
