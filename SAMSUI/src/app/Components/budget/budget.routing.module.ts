import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetComponent } from './budget-create/budget.component';
import { BudgetListComponent } from './budget-list/budget-list.component';


const routes: Routes = [
    {
      path: '',
      component: BudgetListComponent,
    },
    { 
      path: 'budgetCreate/:pId/:mode',
      component :BudgetComponent
    },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetRoutingModule {}
