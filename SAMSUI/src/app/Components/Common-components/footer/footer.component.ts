import { Component, OnInit } from '@angular/core';
import { AssetOptimaConstants } from 'src/app/Constants/AssetOptimaConstants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public version: string="";

  constructor(private assetOptimaConstants: AssetOptimaConstants) { }

  ngOnInit() {
    this.version = this.assetOptimaConstants.version;
  }

}
