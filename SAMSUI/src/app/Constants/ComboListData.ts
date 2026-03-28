import { CommonService } from '../Services/common-service/common.service';
import { AssetOptimaServices } from './AssetOptimaServices';
import {Injectable} from '@angular/core';

@Injectable()
export class ComboListData {

    constructor(public commonService: CommonService,
                public samsServices: AssetOptimaServices){}

    countryCombo: any = [];
    stateCombo: any = [];
    cityCombo: any = [];
    locationCombo: any = [];
    itemType: any = [];
    itemCategory: any = [];

    public itemTypeComboValue(searchParameter: any): any {
            this.commonService.getComboResults(this.samsServices.listOfAllItemTypeCombo, searchParameter).subscribe(
                (data) => {
                    this.itemType = data.responseData.GETLIST;
                }
            );
        return this.itemType;
    }

    public countryComboValue(searchParameter: any): any {
            this.commonService.getComboResults(this.samsServices.listOfAllItemTypeCombo, searchParameter).subscribe(
                (data) => {
                    this.itemType = data.responseData.GETLIST;
                }
            );
        return this.itemType;
    }

}
