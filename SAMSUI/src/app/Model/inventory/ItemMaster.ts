import { ModelOfInventory } from "./Inventory";

export class ModelOfItemMaster extends ModelOfInventory {

    public itemMasterId ?: number;

    public itemMasterName ?: String;
        
    public itemMasterDesc ?: String;

    public itemTypeId ?: number;

    public itemTypeName ?: String;

    public stockable ?: boolean;

    public purchasable ?: boolean;

    public masterUOMId ?: number;

    public masterUOMName ?: String;

    public itemMasterManufacturerList ?: [];

    public activeDisplay ?: string;

    public purchasableDisplay ?: string;

    public stockableDisplay ?: string;

}