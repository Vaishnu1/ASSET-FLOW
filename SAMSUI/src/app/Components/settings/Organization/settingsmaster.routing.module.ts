import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LegalEntityCreateComponent } from './legal-entity/legal-entity-create/legal-entity-create.component';
import { LocationCreateComponent } from './location/location-create/location-create.component';
import { OrganizationCreateComponent } from './organization-create/organization-create.component';
import { OrganizationComponent } from './organization/organization.component';
import { ItemMasterCreateComponent } from './item-master-organization/item-master-create/item-master-create.component';
import { ModuleCreateComponent } from './item-master-organization/module-create/module-create.component';
import { BusinessPartnerListComponent } from '../businessPartner/business-partner-list/business-partner-list.component';
import { BusinessPartnerCreateComponent } from '../businessPartner/business-partner-create/business-partner-create.component';


const routes: Routes = [
    {
      path: 'organization',
      component: OrganizationComponent,
    },
    { 
      path: 'editOrgInfo/:orgId',
      component:OrganizationCreateComponent
    },
    { 
      path: 'legalEntityCreate/:pId/:mode',
      component:LegalEntityCreateComponent
    },
    {
      path: 'locationCreate/:pId/:mode', 
      component: LocationCreateComponent 
    }, 
    { 
      path: 'itemMasterCreate/:pId/:mode',
      component:ItemMasterCreateComponent
    },
    { 
      path: 'moduleCreate/:pId/:mode',
      component: ModuleCreateComponent
    },
    { path: 'businessPartner', component: BusinessPartnerListComponent},
    { path: 'businessPartnerCreate/:pId/:mode', component: BusinessPartnerCreateComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsMasterRoutingModule {}
