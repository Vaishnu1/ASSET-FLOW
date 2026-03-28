import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierInvoiceComponent } from './supplier-invoice/supplier-invoice.component';
import { SupplierInvoiceCreateComponent } from './supplier-invoice-create/supplier-invoice-create.component';


const routes: Routes = [
  { path: 'supplierInvoice', component: SupplierInvoiceComponent},
  { path: 'supplierInvoiceCreate/:pId/:mode', component: SupplierInvoiceCreateComponent },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule {}
