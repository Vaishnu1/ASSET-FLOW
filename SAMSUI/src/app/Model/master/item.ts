import { ItemLocAccessModel } from "../base/itemLocAccess";
import { ModelOfInventory } from "../inventory/Inventory";
import { ModelOfItemMaster } from "../inventory/ItemMaster";
import { ItemApprovedSupplierModel } from "./item-approved-supplier";
export class ItemModel extends ModelOfInventory{

    public itemLocId ?: number;

	public locationId ?: number;

    public invoiceable ?: boolean;

    public itemStatus ?:string;

    public storeId ?: number;

    public maxStockQty ?: number;

    public minStockQty ?: number;

    public costingType ?:string;

    public serialControlled ?: boolean;

    public batchControlled ?: boolean;

	public itemMasterId ?: number;

    public supplierSiteId ?: number;

    public locationName ?:string;

    public itemNameConcat ?:string;

    public itemSupplierList ?: ItemApprovedSupplierModel[];

    public itemLocAccessList ?: ItemLocAccessModel[];
    
	public totalCost ?: number;

	public itemApprovalStatus ?:string;

    public itemMasterTO ?: ModelOfItemMaster;

    public active ?: boolean;

    public activeDisplay ?: string;

    public createdBy ?:string;

    public createdDtDisp ?: string;

    public updatedBy ?: string;

    public updatedDtDisp ?: string;

    public pageNumber ?: number;

    public recordsPerPage ?: number;

    public storeName ?: string;
}
