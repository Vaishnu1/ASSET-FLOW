import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from '../../@shared/material.module';
import { CommonModule } from '@angular/common';
import { BudgetRoutingModule } from './budget.routing.module';
import { BudgetListComponent } from './budget-list/budget-list.component';
import { BudgetDetailPopUpComponent } from './budget-detail-pop-up/budget-detail-pop-up.component';
import { BudgetComponent } from './budget-create/budget.component';



@NgModule({
  declarations: [
    BudgetListComponent,
    BudgetDetailPopUpComponent,
    BudgetComponent
  ],
  imports: [
    BudgetRoutingModule,
    MaterialModule,
    CommonModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class BudgetModule { }
