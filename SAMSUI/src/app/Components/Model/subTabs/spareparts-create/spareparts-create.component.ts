import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
// import { ConsoleService } from '@ng-select/ng-select/ng-select/console.service';
import { getData } from 'src/app/Model/common/fetchListData';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DeleteConfirmationComponent } from 'src/app/Components/Common-components/delete-confirmation/delete-confirmation.component';
import { ModelItem } from 'src/app/Model/asset/modelItem';

@Component({
  selector: 'app-spareparts-create',
  templateUrl: './spareparts-create.component.html',
  styleUrls: ['./spareparts-create.component.css']
})
export class SparepartsCreateComponent implements OnInit {

  @ViewChild('matSpareParts') modelItems: MatTable<any>;
  @ViewChild('itemNameF') itemNameFocus: NgSelectComponent;

  modelItemsDisCol = ['sno', 'itemMasterName', 'itemMasterDesc', 'action'];

  values = '';
  itemNameList: any[] = [];
  limitCount:any;
  skipCount:number;
  searchKey:any = '';
  modelItemForm: FormGroup;
  itemTypeForm: FormGroup;
  getData: getData;

  itemMasterNamePageNumber :number;
  itemMasterNameCombo : any[] = [];
  scrollItemMasterNameSync:boolean = false;
  modelItemTempPush: any = [];
  modelItemTemp: any = [];

  modelItemsDataSource = new MatTableDataSource<any>();


  constructor(private commonService: CommonService,
              private dialog: MatDialog,
              private assetOptimaServices: AssetOptimaServices,
              @Inject(MAT_DIALOG_DATA) private data,
              public dialogRef: MatDialogRef<SparepartsCreateComponent>,
              private change: ChangeDetectorRef) {
        this.skipCount=1;
        this.getData = new getData();
        this.itemMasterNamePageNumber=1;
  }

  ngOnInit() {
    this.modelItemsDataSource.data = [];
    this.modelItemTemp = this.data.modelItemList;
    this.modelItemForm = new FormGroup({
      modelItemId : new FormControl(0),
      itemMasterId : new FormControl(0),
     	itemMasterName: new FormControl(null),
     	itemMasterDesc: new FormControl(null),
     	itemTypeName: new FormControl({value: this.data.itemTypeForm.itemTypeName, disabled: true}),
     	masterUOMName: new FormControl(null),
      orgId: new FormControl(0),
      createdBy: new FormControl(''),
      createdDtDisp: new FormControl(''),
      updatedBy: new FormControl(''), 
      updatedDtDisp: new FormControl(''),
      active : new FormControl(''),
      activeDisp : new FormControl(''),
      itemActive: new FormControl('')
    });    
  }

  ngAfterViewInit() {
    this.commonService.setComboFocus(this.itemNameFocus);
    this.change.detectChanges();
  }  
  
  onKey(event: any) { 
    this.values += event.keyCode + ' | ';
  }

  closeModal() {
    this.dialogRef.close();
  }


  
  addItemModel() {
    this.dialogRef.close(this.modelItemsDataSource.data);
  }
  
  // openItemScreen(itemId){
  //   this.router.navigate(['home/inventory/itemMasterCreate/' + itemId+ '/' +'create']);
  //   localStorage.setItem('itemType',this.itemTypeName);
  //   localStorage.setItem('itemTypeId',this.itemTypeId.toString());
  // }

  listOfItemMaster(searchTerms) {
    this.scrollItemMasterNameSync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';    
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllItemMasterNameCombo, searchTerms.term, this.data.itemTypeForm.itemTypeId, '', this.limitCount, this.itemMasterNamePageNumber).subscribe(
      (data) => {
        this.getData = new getData();
        this.getData = this.commonService.fetchDataList(searchTerms, this.itemMasterNamePageNumber , this.itemMasterNameCombo , data.responseData.comboList)        
        this.itemMasterNamePageNumber = this.getData.pageNumber;
        this.itemMasterNameCombo = this.getData.dataList;
        this.scrollItemMasterNameSync = false;
      }
    );
  }

  selectedItemMasterName(event){
    if (event === undefined) {
      this.modelItemForm.controls.itemMasterName.setValue(null);
      this.modelItemForm.controls.itemMasterId.setValue(0);
      this.modelItemForm.controls.itemMasterDesc.setValue(null);
      this.modelItemForm.controls.masterUOMName.setValue(null);
      this.itemMasterNamePageNumber = 1;
      this.itemMasterNameCombo = [];
    } else {
      this.modelItemForm.controls.itemMasterName.setValue(event.itemMasterName);
      this.modelItemForm.controls.itemMasterId.setValue(event.itemMasterId);
      this.modelItemForm.controls.itemMasterDesc.setValue(event.itemMasterDesc);
      this.modelItemForm.controls.masterUOMName.setValue(event.masterUOMName);
      this.modelItemForm.controls.itemActive.setValue(event.active);
      this.addItem();
    }
  }

  addItem(){
    if(this.modelItemTemp.length > 0 && this.modelItemAlreadyPresent()){
      this.commonService.openToastWarningMessage('"'+this.modelItemForm.controls.itemMasterName.value+'" Is Already Added.');
    }else{
      this.modelItemsDataSource.data.push(this.modelItemForm.getRawValue());
      this.modelItemTemp.push(this.modelItemForm.getRawValue());
    }
    this.selectedItemMasterName(undefined);
    this.modelItemsDataSource._updateChangeSubscription();
  }

  modelItemAlreadyPresent(){
    for (let index = 0; index < this.modelItemTemp.length; index++) {
      const element = this.modelItemTemp[index];
      if(this.modelItemForm.controls.itemMasterId.value == element.itemMasterId ){
        return true;
      }
    }
    return false;
  }

  DeleteItem(element,index) {
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '400px',
      data: {
        'Text': 'Model Item'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.status) {
            this.modelItemTempPush = this.modelItemsDataSource.data;
            this.modelItemTempPush.splice(index, 1);            
            this.modelItemTemp = this.modelItemTemp.filter((ModelItem)=> ModelItem.itemMasterId !== element.itemMasterId);
            this.modelItemsDataSource.data = this.modelItemTempPush;
            this.modelItemsDataSource._updateChangeSubscription();
        }
      });
  }
}
