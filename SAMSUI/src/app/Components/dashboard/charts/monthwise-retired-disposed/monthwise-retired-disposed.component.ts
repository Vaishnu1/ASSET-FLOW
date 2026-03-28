import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-monthwise-retired-disposed',
  templateUrl: './monthwise-retired-disposed.component.html',
  styleUrls: ['./monthwise-retired-disposed.component.css']
})
export class MonthwiseRetiredDisposedComponent implements OnInit {

  dashboardStatus:string='';
  constructor(public dialogRef: MatDialogRef<MonthwiseRetiredDisposedComponent>) { }

  ngOnInit() {
  }

  closeMonthWise(){
    this.dialogRef.close({'exit':false,'value':''});
  }

  selectValue(e){
    this.dialogRef.close({ 'exit': true, 'value': this.dashboardStatus });
  }

}
