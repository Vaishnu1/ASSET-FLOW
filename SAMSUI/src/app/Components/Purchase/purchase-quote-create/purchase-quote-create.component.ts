import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-purchase-quote-create',
  templateUrl: './purchase-quote-create.component.html',
  styleUrls: ['./purchase-quote-create.component.css']
})
export class PurchaseQuoteCreateComponent implements OnInit {

  items: any;
  Form: FormGroup;
    
  constructor( private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.Form = new FormGroup({
      Locationlist: new FormControl(),
      SRlist: new FormControl(Validators.required ),
      PRlist : new FormControl(Validators.required),
      PRstatus: new FormControl(Validators.required),
      PRdate: new FormControl(Validators.required),
      CEIDlist: new FormControl(),
      PRtype: new FormControl(),
      items: this.formBuilder.array([this.createItems()]),
      Global_Discount: new FormControl(),
      Global_Product_Tax: new FormControl(),
      Overall_Global_Tax: new FormControl(),
      Tax: new FormControl(),
      Total: new FormControl(),
   });
  }
  locationlist = [
    {id: 1, name: 'Eazibiz Technologies'},
    {id: 2, name: 'Vital Med'},
    {id: 3, name: 'Ganga Hospital'}
  ];
  prtypelist = [
    {id: 1, name: 'Accessories'},
    {id: 2, name: 'Consumables'},
    {id: 3, name: 'OS AMC'},
    {id: 4, name: 'OS CMC'},
    {id: 5, name: 'Spares'}
  ];

  ceidlist = [
     {id: 1, name: '12034455'},
     {id: 2, name: '54665767'}
  ];

  itemcodelist = [
    {id: 1, name: '12034455'},
    {id: 2, name: '54665767'}
 ];

 supplierlist = [
  {id: 1, name: 'Eazibiz Technologies'},
  {id: 2, name: 'Vital Med'},
  {id: 3, name: 'Ganga Hospital'}
  ];

  suppliersitelist = [
    {id: 1, name: 'Accessories'},
    {id: 2, name: 'Consumables'},
    {id: 3, name: 'OS AMC'},
    {id: 4, name: 'OS CMC'},
    {id: 5, name: 'Spares'}
  ];

  currencycodelist = [
    {id: 1, name: 'INR'},
    {id: 2, name: 'EUR'},
    {id: 3, name: 'USD'}
  ];
  uomlist = [
    {id: 1, name: 'Units'},
    {id: 2, name: 'No'},
    {id: 3, name: 'KGS'},
    {id: 4, name: 'Centimeter'},
    {id: 5, name: 'Litre'}
  ];

 public taxlist: Object[] = [
  { Id: '1', Name: 'CGST @ 2.5%' },
  { Id: '2', Name: 'SGST @ 2.5%' },
  { Id: '3', Name: 'CGST @ 5%' },
  { Id: '4', Name: 'SGST @ 5%' }
];
public fields: Object = { text: 'Name', value: 'Id' };
// set the placeholder to MultiSelect input element
public waterMark: string = 'Tax';    
// set the type of mode for how to visualized the selected items in input element.
public default : string = 'Default';
public box : string = 'Box';
public delimiter : string = 'Delimiter';

/* Create new row in items */
createItems(): FormGroup {
  return this.formBuilder.group({
     Itemcode: new FormControl([Validators.required]),
     Suppliername: new FormControl(),
     Suppliersite: new FormControl([Validators.required]),
     Currencycode: new FormControl([Validators.required]),
     UOM: new FormControl(),
     Req_Qty: new FormControl(),
     Unit_Price: new FormControl(0),
     Total: new FormControl(0),
     Tax: new FormControl(),
     Req_Date: new FormControl()
  });
}

/* add new item row */

addItem(): void {
  this.items = this.Form.get('items') as FormArray;
  this.items.push(this.createItems());
}

/* delete partcular row in item list */

Delete(_index) {
  this.items.removeAt(_index);
}
dateValidation(event) {
  
}
}
