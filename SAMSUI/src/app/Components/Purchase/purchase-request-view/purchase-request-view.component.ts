import {Component, OnInit, TemplateRef, ViewChild, ElementRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

const ELEMENT_DATA= [
  {sno: 1, itemcode: '784654', suppliername: 'Eazibiz Technologies', suppliersite:'Vital Med', currencycode:'INR', uom: 'Units', req_qty: '10', req_date: '14/06/2019', unit_price: '1000', tot_amt: '10000', tax: 'GST @ 2.5%'},
  {sno: 2, itemcode: '565775', suppliername: 'Eazibiz Technologies', suppliersite:'Vital Med', currencycode:'EUR', uom: 'Units', req_qty: '10', req_date: '14/06/2019', unit_price: '1000', tot_amt: '10000', tax: 'GST @ 2.5%'},
];

@Component({
  selector: 'app-purchase-request-view',
  templateUrl: './purchase-request-view.component.html',
  styleUrls: ['./purchase-request-view.component.css']
})
export class PurchaseRequestViewComponent implements OnInit {

  displayedColumns = ['sno', 'itemcode', 'suppliername', 'suppliersite', 'currencycode', 'uom', 'req_qty', 'req_date', 'unit_price', 'tot_amt', 'tax'];
  dataSource = ELEMENT_DATA;
  searchvalue : any = '';
  tempViewData: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

}
