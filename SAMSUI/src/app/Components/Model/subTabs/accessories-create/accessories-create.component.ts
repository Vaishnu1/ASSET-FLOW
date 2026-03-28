import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';
import { AssetOptimaServices } from 'src/app/Constants/AssetOptimaServices';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-accessories-create',
  templateUrl: './accessories-create.component.html',
  styleUrls: ['./accessories-create.component.css']
})
export class AccessoriesCreateComponent implements OnInit {
  modelAccessoriesForm: FormGroup;
  accessoriesList: any = [];
  itemCategory:any = [];
  itemType:any=[];
  @ViewChild('accessoriesItemNameF') accessItemNameFocus: NgSelectComponent;

  limitCount:any;
  skipCount:number;
  searchKey:any = '';
  scrollsync:boolean=false;
  scrollItemCategorysync:boolean = false;
  scrollItemTypesync:boolean=false;
  buttonShowOnEdit: boolean = true;
  buttonDisplay:string;
  itemCategoryPageNumber :number;
  itemTypePageNumber:number;
  
  constructor(private commonService: CommonService,
              private assetOptimaServices: AssetOptimaServices,
              private router: Router, 
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) private data,
              public dialogRef: MatDialogRef<AccessoriesCreateComponent>,
              private change: ChangeDetectorRef) { 
                this.skipCount=1;
                this.itemCategoryPageNumber = 1;
                this.itemTypePageNumber = 1;
              }

  ngOnInit() {
    this.modelAccessoriesForm = new FormGroup({
      itemId: new FormControl(''),
      itemName: new FormControl(null,[Validators.required]),
      itemType: new FormControl('ACCESSORIES'), 
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
      active  : new FormControl(''),
      modelItemId: new FormControl(0),
      itemTypeId : new FormControl(0)
    });
    this.itemCategoryPageNumber =1;
    this.itemTypePageNumber = 1;
  }

  ngAfterViewInit() {
    this.commonService.setComboFocus(this.accessItemNameFocus);
    if(this.data.accessories!=0){
      this.modelAccessoriesForm.patchValue(this.data.accessories);
      if(this.data.mode=='view'){
        this.buttonShowOnEdit=false;
        this.modelAccessoriesForm.disable();
      }else{
        this.buttonDisplay='Update';
        this.modelAccessoriesForm.controls.itemName.disable();
      }
    }else{
      this.modelAccessoriesForm.controls.active.setValue(true);
      this.buttonDisplay='Submit';
    }
    this.change.detectChanges();
  }

  closeModal(){
    this.dialogRef.close();
  }
  
  listOfItem(searchValue) {
    this.limitCount = !(this.commonService.fetchSearchValue(searchValue)) ? '10' : ''; 
    this.commonService.getComboResults(this.assetOptimaServices.listAllItemCombo, searchValue.term, '', '', this.limitCount, this.skipCount,'ACCESSORIES').subscribe(
      (data) => {
        if (!(this.commonService.fetchSearchValue(searchValue))) {
          if (this.skipCount === 1) {
            this.accessoriesList = data.responseData.comboList;
          } else {
            this.accessoriesList = this.accessoriesList.concat(data.responseData.comboList);
          }
        } else {
          this.accessoriesList = data.responseData.comboList;
        }
        data.responseData.comboList.length != 0 ? this.skipCount += 1 : this.skipCount = 1;
     }
    );
  }
  
  
  getAccessoriesComboValue(event) {
    if(event==undefined){
      this.modelAccessoriesForm.get('itemId').setValue(0);
      this.modelAccessoriesForm.get('itemName').setValue('');
      this.modelAccessoriesForm.get('itemDesc').setValue('');
      this.modelAccessoriesForm.get('manufacturerId').setValue(0);
      this.modelAccessoriesForm.get('manufacturerName').setValue('');
      this.modelAccessoriesForm.get('uomCode').setValue('');
      this.modelAccessoriesForm.controls.itemTypeId.setValue(0);
      this.skipCount=1;
      this.accessoriesList=[];
    }else{
      this.modelAccessoriesForm.get('itemId').setValue(event.itemId);
      this.modelAccessoriesForm.get('itemName').setValue(event.itemName);
      this.modelAccessoriesForm.get('itemDesc').setValue(event.itemDesc);
      this.modelAccessoriesForm.get('manufacturerId').setValue(event.manufacturerId);
      this.modelAccessoriesForm.get('manufacturerName').setValue(event.manufacturerName);
      this.modelAccessoriesForm.get('uomCode').setValue(event.uomCode);
      this.modelAccessoriesForm.controls.itemTypeId.setValue(event.itemTypeId);

    }
    
  }
  
  addAccessoriesModel() {
    this.dialogRef.close(this.modelAccessoriesForm.getRawValue());
  }

  listofItemType(searchTerms) {
    this.scrollItemTypesync = true;
    this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
    this.commonService.getComboResults(this.assetOptimaServices.listOfAllItemTypeCombo, searchTerms.term, '', '', this.limitCount, this.itemTypePageNumber).subscribe(
      (data) => {
        if (data.success) {
          if (!(this.commonService.fetchSearchValue(searchTerms))) {
            if (this.itemTypePageNumber === 1) {
              this.itemType = data.responseData.comboList;
            } else {
              this.itemType = this.itemType.concat(data.responseData.comboList);
            }
          } else {
            this.itemType = data.responseData.comboList;
          }
          this.itemType.length != 0 ? this.itemTypePageNumber += 1 : this.itemTypePageNumber = 1;
        }
      }
    );
    this.scrollItemTypesync = false;
  }

  getItemTypeComboValue(event) {
    if (event === undefined) {
      this.modelAccessoriesForm.get('itemTypeId').setValue(0);
      this.itemType = [];
      this.itemTypePageNumber = 1;
    } else {
      this.modelAccessoriesForm.get('itemTypeId').setValue(event.itemTypeId);
    }
  }

  
  // listOfItemCategory(searchTerms) {
  //   this.scrollItemCategorysync = true;
  //   this.limitCount = !(this.commonService.fetchSearchValue(searchTerms)) ? '10' : '';
  //   this.commonService.getComboResults(this.assetOptimaServices.listOfItemCategoryCombo, searchTerms.term, '', '', this.limitCount, this.itemCategoryPageNumber).subscribe(
  //     (data) => {
  //       if (data.success) {
  //         if (!(this.commonService.fetchSearchValue(searchTerms))) {
  //           if (this.itemCategoryPageNumber === 1) {
  //             this.itemCategory = data.responseData.comboList;
  //           } else {
  //             this.itemCategory = this.itemCategory.concat(data.responseData.comboList);
  //           }
  //         } else {
  //           this.itemCategory = data.responseData.comboList;
  //         }
  //         this.itemCategory.length != 0 ? this.itemCategoryPageNumber += 1 : this.itemCategoryPageNumber = 1;
  //       }
  //     }
  //   );
  //   this.scrollItemCategorysync = false;
  // }

  // getItemCategoryComboValue(event) {

  //   if (event === undefined) {
  //     this.modelAccessoriesForm.get('itemCategoryId').setValue(0);
  //     this.itemCategory = [];
  //     this.itemCategoryPageNumber = 1;
  //   } else {
  //     this.modelAccessoriesForm.get('itemCategoryId').setValue(event.categoryId);
  //     this.modelAccessoriesForm.get('itemType').setValue(event.categoryName);
  //   }
  // }

  openItemScreen(itemId){
    this.router.navigate(['home/inventory/itemCreate/' + itemId+ '/' +'model']);
    localStorage.setItem('itemType',this.modelAccessoriesForm.controls.itemType.value);   
    localStorage.setItem('itemTypeId','6');
  }

}
