import { Component, Input, OnInit } from '@angular/core';
import { ModuleAccessModel } from 'src/app/Model/base/moduleAccess';
import { UserSessionService } from 'src/app/Services/user-session-service/user-session.service';

@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.css']
})
export class ItemMasterComponent implements OnInit {
  @Input() activeTab: number;
  selectedTabIndex = 0;

  itemCategoryModuleAccess: ModuleAccessModel;
  itemTypeModuleAccess: ModuleAccessModel;
  itemModuleAccess: ModuleAccessModel;
  itemModulesModuleAccess: ModuleAccessModel;

  constructor(
    private userSession: UserSessionService
  ) { 
    this.itemCategoryModuleAccess = new ModuleAccessModel();
    this.itemTypeModuleAccess = new ModuleAccessModel();
    this.itemModuleAccess = new ModuleAccessModel();
    this.itemModulesModuleAccess = new ModuleAccessModel();
  }

  ngOnInit(): void {
    this.selectedTabIndex = this.activeTab;

    this.itemCategoryModuleAccess = this.userSession.getUserGroupAccess()['GROUPACCESS_ITEM_CATEGORY'];
    this.itemTypeModuleAccess = this.userSession.getUserGroupAccess()['GROUPACCESS_ITEM_TYPE'];
    this.itemModuleAccess = this.userSession.getUserGroupAccess()['GROUPACCESS_ITEM'];
    this.itemModulesModuleAccess = this.userSession.getUserGroupAccess()['GROUPACCESS_MODULE'];
  }

}
