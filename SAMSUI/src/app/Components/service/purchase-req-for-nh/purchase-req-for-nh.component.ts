import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/Services/common-service/common.service';

@Component({
  selector: 'app-purchase-req-for-nh',
  templateUrl: './purchase-req-for-nh.component.html',
  styleUrls: ['./purchase-req-for-nh.component.css']
})
export class PurchaseReqForNhComponent implements OnInit {
  favoriteSeason:string;

  constructor(public purDialog: MatDialogRef<PurchaseReqForNhComponent>,
    public commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
  }

  closePurchaseNHModal(){
    this.purDialog.close({ 'exit': false, 'form': '' });
  }

  selectValue(e){
    this.purDialog.close({ 'exit': true, 'form': this.favoriteSeason });    
  }

}
