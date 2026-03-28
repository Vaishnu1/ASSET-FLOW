import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LegalEntityListComponent } from 'src/app/Components/settings/Organization/legal-entity/legal-entity-list/legal-entity-list.component';

@Component({
  selector: 'app-legal-entity-edit',
  templateUrl: './legal-entity-edit.component.html',
  styleUrls: ['./legal-entity-edit.component.css']
})
export class LegalEntityEditComponent implements OnInit {

  entitygrouplist : any = [];

  constructor(public legalEntityDialog: MatDialogRef<LegalEntityListComponent>) { }

  ngOnInit() {
  }
  closeModal() {
    this.legalEntityDialog.close();
  }
}
