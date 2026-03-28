import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EmployeeRoutingModule } from './employee.routing.module';
import { MaterialModule } from '../../@shared/material.module';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';


import { EmployeeDesignationCreateComponent } from './subComponents/employee-designation-create/employee-designation-create.component';
import { SkillsCreateComponent } from './subComponents/skills-create/skills-create.component';
import { ExperienceCreateComponent } from './subComponents/experience-create/experience-create.component';
import { QualificationCreateComponent } from './subComponents/qualification-create/qualification-create.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { EmployeeGroupListComponent } from './employee-group-list/employee-group-list.component';



@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeCreateComponent,
    EmployeeViewComponent,
    EmployeeDesignationCreateComponent,
    ExperienceCreateComponent,
    SkillsCreateComponent,
    QualificationCreateComponent,
    EmployeeGroupListComponent
],
  imports: [
    EmployeeRoutingModule,
    MaterialModule,
    CommonModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EmployeeModule { }
