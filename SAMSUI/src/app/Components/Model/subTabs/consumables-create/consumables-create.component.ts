import { Component, OnInit, ViewChild, ChangeDetectorRef, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgSelectComponent } from '@ng-select/ng-select';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consumables-create',
  templateUrl: './consumables-create.component.html',
  styleUrls: ['./consumables-create.component.css']
})
export class ConsumablesCreateComponent implements OnInit {

  @ViewChild('consumableItemNameFocus') consumableItemNameFocus: NgSelectComponent;

  consumableItemNameList: any = [];
  consumableItemForm: FormGroup;

  limitCount:any;
  skipCount:number;
  searchKey:any = '';
  buttonShowOnEdit: boolean = true;
  buttonDisplay:string;

  
  itemNamescrollSync: boolean;
  
  constructor(private commonService: CommonService,
              private assetOptimaServices: AssetOptimaServices,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<ConsumablesCreateComponent>,
              private change: ChangeDetectorRef,
              @Inject(MAT_DIALOG_DATA) private data,) { 
                this.skipCount=1;
  }

  ngOnInit() {
    this.consumableItemForm = new FormGroup({
      itemId: new FormControl(''),
      itemName: new FormControl(null,[Validators.required]),
      itemType: new FormControl('CONSUMABLES'),       
      orgId: new FormControl(''),
      createdBy: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''), 
      updatedDtDisp: new FormControl(''),
      pageNumber: new FormControl(''),
      recordsPerPage: new FormControl(''),
      orgName: new FormControl(''),
      itemDesc : new FormControl(''),
      manufacturerId : new FormControl(''),
      manufacturerName : new FormControl(''),
      uomCode :  new FormControl(''),
      active: new FormControl(''),
      modelItemId: new FormControl(0),
      itemTypeId : new FormControl(0)
    });
  }

  ngAfterViewInit() {
    this.commonService.setComboFocus(this.consumableItemNameFocus);
    if(this.data.consumables!=0){
      this.consumableItemForm.patchValue(this.data.consumables);
      if(this.data.mode=='view'){
        this.buttonShowOnEdit=false;
        this.consumableItemForm.disable();
      }else{
        this.buttonDisplay='Update';
        this.consumableItemForm.controls.itemName.disable();
      }
    }else{
      this.consumableItemForm.controls.active.setValue(true);
      this.buttonDisplay='Submit';
    }
    this.change.detectChanges();
  }

  listOfItem(searchValue) {
    this.itemNamescrollSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : ''; 
    this.commonService.getComboResults(this.assetOptimaServices.listAllItemCombo, searchValue.term, '', '', this.limitCount, this.skipCount,'CONSUMABLES').subscribe(
      (data) => {
        if (!(this.commonService.fetchSearchValue(searchValue))) {
          if (this.skipCount === 1) {
            this.consumableItemNameList = data.responseData.comboList;
          } else {
            this.consumableItemNameList = this.consumableItemNameList.concat(data.responseData.comboList);
          }data.responseData.comboList.length != 0 ? this.skipCount += 1 : this.skipCount = 1;
        } else {
          this.consumableItemNameList = data.responseData.comboList;
          this.skipCount = 1;
        }
        this.itemNamescrollSync = false;
      }
    );
  }

  getConsumableItemNameComboValue(event) {
    if(event === undefined){
      this.consumableItemForm.get('itemId').setValue(0);
      this.consumableItemForm.get('itemName').setValue('');
      this.consumableItemForm.get('itemDesc').setValue('');
      this.consumableItemForm.get('manufacturerId').setValue(0);
      this.consumableItemForm.get('manufacturerName').setValue('');
      this.consumableItemForm.get('uomCode').setValue('');
      this.consumableItemForm.controls.itemTypeId.setValue(0);
      this.skipCount=1;
      this.consumableItemNameList=[];
    }else{
      this.consumableItemForm.get('itemId').setValue(event.itemId);
      this.consumableItemForm.get('itemName').setValue(event.itemName);
      this.consumableItemForm.get('itemDesc').setValue(event.itemDesc);
      this.consumableItemForm.get('manufacturerId').setValue(event.manufacturerId);
      this.consumableItemForm.get('manufacturerName').setValue(event.manufacturerName);
      this.consumableItemForm.get('uomCode').setValue(event.uomCode);
      this.consumableItemForm.controls.itemTypeId.setValue(event.itemTypeId);

    }
    
  }
  
  addConsumableItemModel() {
    this.dialogRef.close(this.consumableItemForm.getRawValue());
  }

  closeModal(){
    this.dialogRef.close();
  }

  openItemScreen(itemId){
    this.router.navigate(['home/inventory/itemCreate/' + itemId+ '/' +'model']);
    localStorage.setItem('itemType',this.consumableItemForm.controls.itemType.value);
    localStorage.setItem('itemTypeId','7');
  }
}
