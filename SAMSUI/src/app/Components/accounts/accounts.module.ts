import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MaterialModule } from '../../@shared/material.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/@shared/shared.module';
import { CustomDateAdapter } from 'src/app/Services/date-time/customDateAdapter';
import { DateAdapter } from '@angular/material/core';
import { SettingsModule } from '../settings/settings.module';
import { SupplierInvoiceComponent } from './supplier-invoice/supplier-invoice.component';
import { AccountsRoutingModule } from './accounts.routing.module';
import { SupplierInvoiceCreateComponent } from './supplier-invoice-create/supplier-invoice-create.component';
import { AccGrnListComponent } from '../Dialog-Components/accounts/acc-grn-list/acc-grn-list.component';
import { AccPoListComponent } from '../Dialog-Components/accounts/acc-po-list/acc-po-list.component';
import { SuppInvMatchDataComponent } from '../Dialog-Components/accounts/supp-inv-match-data/supp-inv-match-data.component';
import { SuppInvAddInfoComponent } from '../Dialog-Components/accounts/supp-inv-add-info/supp-inv-add-info.component';
import { SuppInvDocInfoComponent } from '../Dialog-Components/accounts/supp-inv-doc-info/supp-inv-doc-info.component';

@NgModule({
  declarations: [
    SupplierInvoiceComponent,
    SupplierInvoiceCreateComponent,
    AccGrnListComponent,
    AccPoListComponent,
    SuppInvMatchDataComponent,
    SuppInvAddInfoComponent,
    SuppInvDocInfoComponent],
  imports: [
    AccountsRoutingModule,
    MaterialModule,
    CommonModule,
    SharedModule,
    SettingsModule
  ],
  providers:
  [
    CustomDateAdapter, // so we could inject services to 'CustomDateAdapter'
    { provide: DateAdapter, useClass: CustomDateAdapter }, // Parse MatDatePicker Format
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountsModule { }

