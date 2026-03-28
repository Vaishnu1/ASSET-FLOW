import { Injectable } from "@angular/core";

@Injectable()
export class AssetOptimaServices {
  listOfAllCustomers(listOfAllCustomers: any, term: any, supplierId: any, arg3: string, recordsPerPageForCombo: string, supplierNamePageNumber: number, arg6: string, sourceScreen: any) {
    throw new Error("Method not implemented.");
  }
    //Organization
    readonly saveOrganisation: string = 'api/v1/m-orgs';
    readonly loadOrganisationDtl: string = 'api/v1/m-orgs';
    readonly listOfActiveOrgNameCombo: string = 'api/v1/m-orgs';
    //Login
    readonly authenticateUser: string = 'api/v1/m-users/login';
    readonly logOutUser: string = 'api/v1/m-users';
    //Item Type
    readonly saveOrUpdateItemType: string = 'api/v1/-item-types';
    readonly listOfAllItemTypeCombo: string = 'api/v1/-item-types';
    //Item Category
    readonly saveOrUpdateItemCategory: string = 'api/v1/-item-categories';
    readonly listOfItemCategoryCombo: string = 'api/v1/-item-categories';
    //Label
    readonly loadLabelInfo: string = 'api/v1/label';
    //Manufacture
    readonly listOfManufacturerCombo: string = 'api/v1/-manufacturers';
    //UOM
    readonly listOfUOMCombo: string = 'api/v1/m-uoms';
    //Country
    readonly listOfAllCountryForCombo: string = 'api/v1/m-countries';
    //State
    readonly listOfStateCombo: string = 'api/v1/m-states';
    //City
    readonly listOfCityCombo: string = 'api/v1/m-cities';
    //Group
    readonly fetchListOfAllGroup: string = 'api/v1/m-groups';
    readonly saveOrUpdateGroup: string = 'api/v1/m-groups';

    //Item Module
    readonly listOfItemModuleCombo: string = 'api/v1/m-item-modules';

    //Gate Pass Purpose
    readonly listOfGatePassPurposeCombo: string = 'api/v1/gate-pass-purposes';

    //Manufacture Service Location
    readonly listOfManuServiceLocCombo: string = 'api/v1/m-users';

    readonly listOfAllMenus: string = 'api/v1/m-menus';
    readonly loadGroupMenuInfo: string = 'api/v1/m-group-menus';
    readonly saveOrUpdateItem: string = 'api/v1/-items';
    readonly listOfItem: string = 'api/v1/-items';
    readonly loadItemInfo: string = 'api/v1/-items';
    readonly listOfAllItemType: string = 'api/v1/-item-types';
    readonly listOfAllItemCategory: string = 'api/v1/-item-categories';
    readonly saveOrUpdateCurrency: string = 'api/v1/currency';
    readonly fetchListOfAllCurrency: string = 'api/v1/currency';
    //UOM
    readonly saveOrUpdateUOM: string = 'api/v1/m-uoms';
    readonly fetchListOfAllUOM: string = 'api/v1/m-uoms';
    //ENTITY GROUP
    readonly saveOrUpdateEntityGroup: string = 'api/v1/m-groups';
    readonly fetchListOfAllEntityGroup: string = 'api/v1/m-groups';
    //DESIGNATION
    readonly saveOrUpdateDesignation: string = 'api/v1/-designations';
    readonly fetchListOfAllDesignation: string = 'api/v1/-designations';
    //REGION
    readonly saveOrUpdateRegion: string = 'api/v1/m-regions';
    readonly fetchListOfAllRegion: string = 'api/v1/m-regions';
    //REGION
    readonly saveOrUpdateDepartment: string = 'api/v1/departments';
    readonly fetchListOfAllDepartment: string = 'api/v1/departments';
    //LOCATION
    readonly saveLocation: string = 'api/v1/m-locations';
    //USER
    readonly listOfAllGroupNameCombo: string = 'api/v1/m-groups';
    readonly loadGroupModuleAccess: string = 'api/v1/m-group-module-accesses';
    readonly saveGroupAccess: string = 'api/v1/m-groups';
    readonly listOfAllUser: string = 'api/v1/m-users';
    readonly listAllUserLocForCombo: string = 'api/v1/m-users';
    readonly saveOrUpdateUser: string = 'api/v1/m-users';
    readonly listOfAllCustSuppEmpCombo: string = 'api/v1/employees';
    readonly listOfAllUserNameCombo: string = 'api/v1/m-users';
    readonly listLocAccessForUser: string = 'api/v1/m-users';
    readonly saveOrUpdateUserLocAccess: string = 'api/v1/m-users';
    readonly listUserGroup: string = 'api/v1/m-users';
    readonly saveOrUpdateUserGroupMapping: string = 'api/v1/m-users';
    readonly listOfModelModuleCombo: string = 'api/v1/model-modules';
    readonly listOfModuleItems: string = 'api/v1/m-module-itemses';


    readonly listOfAllLocation: string = 'api/v1/m-locations';
    readonly loadLocationInfo: string = 'api/v1/m-locations';
    // tax
    readonly saveOrUpdateTax: string = 'api/v1/m-taxs';
    readonly listOfTax: string = 'api/v1/m-taxs';
    readonly listOfAllDeparment: string = 'api/v1/departments';
    readonly listOfTaxCombo: string = 'api/v1/m-taxs';

    readonly exportRepairSR: string = 'api/v1/exportrepairsr';

    //Excel
    readonly getExcel: string = 'api/v1/excel';

    //files
    readonly uploadLogo: string = 'api/v1/uploadlogo';

    //Manufacturer
    readonly saveOrUpdateManufacturer: string = 'api/v1/-manufacturers';
    readonly fetchListOfAllManufacturer: string = 'api/v1/-manufacturers';

    readonly exportServiceRequest: string = 'api/v1/service-requests';

    //Asset Type
    readonly saveOrUpdateAssetType: string = 'api/v1/-asset-types';
    readonly fetchListOfAllAssetType: string = 'api/v1/-asset-types';
    readonly generateAssetTypeReport: string = 'api/v1/-asset-types';


    //Asset Sub category
    readonly saveOrUpdateAssetSubCategory: string = 'api/v1/-asset-sub-categories';
    readonly fetchListOfAllAssetSubCategory: string = 'api/v1/-asset-sub-categories';
  //Asset category combo
    readonly listAllAssetCategoryCombo: string = 'api/v1/-asset-categories';
   //Asset Sub category combo
    readonly listAllAssetSubCategoryCombo: string = 'api/v1/-asset-sub-categories';

    // Asset Type Combo
    readonly listAllAssetTypeCombo: string = 'api/v1/-asset-types';

    //Asset Status
    readonly saveOrUpdateAssetStatus: string = 'api/v1/-asset-statuses';
    readonly fetchListOfAllAssetStatus: string = 'api/v1/-asset-statuses';

    // Priority Service Master
    readonly saveOrUpdatePriority: string = 'api/v1/-priorities';
    readonly fetchListOfAllPriority: string = 'api/v1/-priorities';

    //Severity Service Master
    readonly saveOrUpdateSeverity: string = 'api/v1/-severities';
    readonly fetchListOfAllSeverity: string = 'api/v1/-severities';

    //item category master
    readonly fetchListOfAllItemCategory: string = 'api/v1/-item-categories';

    readonly listAllItemCombo: string = 'api/v1/-items';
    readonly listOfModelItemsCombo : string = "listOfModelItemsCombo.sams";
    //ActionCode Service Master
    readonly saveOrUpdateSRAttribute4: string = 'api/v1/m-sr-attribute-4s';
    readonly fetchListOfAllAttribute4: string = 'api/v1/-attribute4s';

    //Image
    readonly getImage: string = 'api/v1/image';

    //SR to PR report list
    readonly listOfSRtoPR: string = 'api/v1/srtopr';

    //CauseCode Service Master
    readonly saveOrUpdateSRAttribute3: string = 'api/v1/m-sr-attribute-3s';
    readonly fetchListOfAllAttribute3: string = 'api/v1/-attribute3s';

    // Asset Category
    readonly saveOrUpdateAssetCategory: string = 'api/v1/-asset-categories';
    readonly fetchListOfAllAssetCategory: string = 'api/v1/-asset-categories';

    readonly listOfOpenWorkorder: string = 'api/v1/openworkorder';
    readonly listOfServiceRequest: string = 'api/v1/service-requests';

    //SUPPLIER
    readonly fetchListOfAllSupplier: string = 'api/v1/-suppliers';
    readonly saveUpdateSupplier: string = 'saveUpdateSupplier.sams'
    readonly fetchSupplierInfo: string = 'fetchSupplierInfo.sams'
    readonly listOfAllSupplierCodeCombo: string = 'listOfAllSupplierCodeCombo.sams'


    //DEPARTMENT AND CURRENCY COMBO
    readonly listOfCurCdCombo: string = 'api/v1/curcd';

    readonly exportOpenWO: string = 'api/v1/exportopenwo';
    readonly listOfAllModelCombo: string = 'api/v1/m-models';
    readonly listAllAssetGroupCombo: string = 'api/v1/-asset-groups';

    // Asset Group
    readonly saveOrUpdateAssetGroup: string = 'api/v1/-asset-groups';
    readonly fetchListOfAllAssetGroup: string = 'api/v1/-asset-groups';
    readonly listOfWorkorderWithPR: string = 'api/v1/workorderwithpr';
    readonly listAllServiceRequestStatusForCombo: string = 'api/v1/service-requests';

    // Model
    readonly fetchListOfAllModel: string = 'api/v1/m-models';
    readonly fetchModelDetailedInfo: string = 'api/v1/m-models';
    readonly saveOrUpdateModel: string = 'api/v1/m-models';
    readonly loadAssetGroupInfo: string = 'api/v1/-asset-groups';
    readonly checkForModelNameExistence: string = 'api/v1/m-models';

    // Associate
    readonly saveOrUpdateEmployee: string = 'api/v1/employees';
    readonly fetchListOfAllEmployee: string = 'api/v1/employees';
    readonly loadEmployeeDtl: string = 'api/v1/employees';


    //Fields
    readonly getLocationFormFields: string = 'api/v1/m-locations';

     //SUPPLIER COMBO
    readonly listOfAllSupplierNameCombo: string = 'api/v1/-suppliers';
    readonly listOfAllSupplierLocCombo: string = 'api/v1/-suppliers';

    //ITEM APPROVED SUPPLIER
    readonly saveOrUpdateItemSuppliers: string="saveOrUpdateItemSuppliers.sams";
    readonly fetchListOfAllApprovedSupp: string="fetchListOfAllApprovedSupp.sams";

    //ENTITY GROUP
    readonly listOfAllEntityGroup: string="listOfAllEntityGroup.sams";
    readonly listOfAllLegalEntity: string="listOfAllLegalEntity.sams";
    readonly listOfAllRegion: string="listOfAllRegion.sams";

    //Employee List
    readonly listAllEmployeeForOrgCombo: string = 'api/v1/employees';
    readonly listAllLocationNameComboFromUser: string = 'api/v1/m-users';
    readonly listAllEmployeeCombocode: string = 'api/v1/employees';

    //Designation List combo
    readonly listOfAllDesignationCombo: string = 'api/v1/-designations';

    //Hand Over Item List Combo
    readonly listOfAllHandOverCombo: string = 'api/v1/handover';

    //InventoryList
    readonly listOfStockEnquiry: string = 'api/v1/stockenquiry';
    readonly listOfStockEnquiryDtl: string = 'api/v1/stockenquiry';
    readonly listOfItemTransaction: string = 'api/v1/-items';

    // Purchase Request
    readonly listOfPurchaseRequest: string = 'api/v1/purchaserequest';

    // Purchase Request
    readonly generatePRPdf: string = 'api/v1/prpdf';

    // Service request combo
    readonly listAllSRNoForCombo: string = 'api/v1/srnofor';

    readonly loadContractInfo: string = 'api/v1/contracts';

    //save number control
    readonly saveOrUpdateNumberControl: string = 'api/v1/m-number-controls';

   //fitch number control details
   readonly AllNumberControl: string = 'api/v1/m-number-controls';

   //get item description
   readonly listOfItemDescCombo: string = 'api/v1/-items';

   //get Device Code
   readonly listOfDeviceCodeCombo:string= 'listOfDeviceCodeCombo.sams'
   readonly fetchListOfDeviceCode: string = 'api/v1/-device-codes';

   //get Inward Inventory
   readonly saveOrUpdateInwardInventory: string = 'api/v1/inwardinventory';
   readonly fetchListOfAllInwardInventory: string = 'api/v1/inwardinventory';
   readonly fetchInwardInventoryHdrInfo: string = 'api/v1/inwardinventoryhdr';

   //LOAN
   readonly saveOrUpdateLoanAndReturns: string = 'api/v1/loanandreturns';
   readonly listOfAllLoanStatusCombo: string = 'api/v1/m-loan-statuses';
   readonly fetchListOfAllLoanReturns: string = 'api/v1/loan-returns';

   //BUILDING MODULE
   readonly fectchListOfAllBlock: string = 'api/v1/m-locks';
   readonly fectchListOfAllFloor: string = 'api/v1/fectchlistofallfloor';
   readonly fectchListOfAllSegment: string = 'api/v1/fectchlistofallsegment';
   readonly fectchListOfAllRoom: string = 'api/v1/fectchlistofallroom';

   //CUSTOMER COMBO
   readonly listOfAllCustomerCombo='listOfAllCustomerCombo.sams';
   readonly listOfAllCustomerSiteCombo='listOfAllCustomerSiteCombo.sams';

   //CUSTOMER
   readonly fetchListOfAllCustomers='fetchListOfAllCustomer.sams';
   readonly saveOrUpdateCustomer= 'saveOrUpdateCustomer.sams';
   readonly fetchCustomerInfoByCustomerId='fetchCustomerInfoByCustomerId.sams';

   //INTERNAL LOAN
   readonly saveOrUpdateInternalLoanAndReturns='saveOrUpdateInternalLoanAndReturns.sams';
   readonly saveOrUpdateInternalLoanAndReturnsV1='saveOrUpdateInternalLoanAndReturnsV1.sams';

   readonly saveOrUpdateModelSupplied='saveOrUpdateModelSupplied.sams';

      //BUDGET
   readonly saveOrUpdateBudget: string = 'api/v1/budget';
   readonly fetchListOfAllBudget: string = 'api/v1/budget';
   readonly fetchBudgetByBudgetId: string = 'api/v1/budget';

   //BUDGET COMBO
   readonly listOfAllBudgetCombo='listOfAllBudgetCombo.sams';

   readonly updateAssetItemQty ='saveOrUpdateAssetItem.sams';
   readonly fetchAssetItemList ='fecthAssetItemListByAssetId.sams';
   readonly assetItemDetailsByItemId = 'fetchAssetItemConsumptionHistory.sams';

   readonly assetItemsDetails = 'fetchAssetItemsDetails.sams';

   //Indent
   readonly indentValidateAndStatusUpdate = 'indentValidateAndStatusUpdate.sams';

   //Transfer and Allocate
   readonly stockTransferValidateAndStatusUpdate ='stockTransferValidateAndStatusUpdate.sams';

   //loan return
   readonly updateLoanOrReturnStatus = 'updateLoanOrReturnStatus.sams';

   //Contract
   readonly updateContractStatus = 'updateContractStatus.sams';

    //Custom fields combo
    readonly fetchListOfAllCategoryCustomFieldsCombo: string = 'api/v1/categorycustomfields';

    //Custom fields combo
    readonly deleteCustomFieldValue: string = 'api/v1/customfieldvalue';

    //Check employee exists in user
    readonly checkEmployeeInUser: string = 'api/v1/m-users';

    //ParameterType
    readonly fetchListOfAllParameterType: string = 'api/v1/-parameter-types';
    readonly saveOrUpdateParameter: string = 'api/v1/-parameters';
    readonly listAllParameterTypeForCombo: string = 'api/v1/-parameter-types';
    readonly saveOrUpdateParameterType: string = 'api/v1/-parameter-types';
    readonly listAllParameterForCombo: string = 'api/v1/-parameters';
    readonly saveOrUpdateParameterGroup: string = 'api/v1/-parameter-groups';
    readonly fetchListOfAllParameterGroup: string = 'api/v1/-parameter-groups';
    readonly listAllParameterGroupForCombo: string = 'api/v1/-parameter-groups';




    //CertificationAuthority
    readonly fetchListOfCertificationAuthority: string = 'api/v1/-certification-authorities';

    //Certificate
    readonly fetchListOfCertificate: string = 'api/v1/-certificates';
    readonly saveOrUpdateCertificationAuthority: string = 'api/v1/-certification-authorities';
    readonly listOfAllCertificationAuthorityCombo: string = 'api/v1/-certification-authorities';
    readonly saveOrUpdateCertificate: string = 'api/v1/-certificates';

    //AssetSubCategory
    readonly generateAssetSubCategoryReport: string = 'api/v1/-asset-sub-categories';
    readonly saveOrUpdateCatCustField: string = 'api/v1/categorycustomfields';
    readonly listOfDisplayGroups: string = 'api/v1/m-groups';
    readonly fetchListOfAllCategoryCustomFields: string = 'api/v1/categorycustomfields';
    readonly listOfAllDepreciationCombo: string = 'api/v1/depreciation';

    //Manufacturer
    readonly listOfAllManufacturerCombo: string = 'api/v1/-manufacturers';
    readonly listOfAllManufacturerCodeCombo: string = 'api/v1/-manufacturers';
    readonly generateManufacturerReport: string = 'api/v1/-manufacturers';

    //AssetGroup
    readonly generateAssetGroupRequestReport: string = 'api/v1/-asset-groups';
    readonly fetchListOfAllCustomFields: string = 'api/v1/customfields';
    readonly listOfAllCertificateCombo: string = 'api/v1/-certificates';
    readonly fetchAssetGroupStatutoryReqByAssetId: string = 'api/v1/-asset-groups';
    readonly generateAssetCategoryReport: string = 'api/v1/-asset-categories';
    readonly fetchListOfAllAssetGrpChkPts: string = 'api/v1/assets';



    //Model
    readonly generateModelAuditReport: string = 'api/v1/m-model-audits';
    readonly fetchListOfModelHistory: string = 'api/v1/m-models';
    readonly loadModelDoc: string = 'api/v1/model-docs';
    readonly deleteModelItemInfo: string = 'api/v1/model-items';
    readonly deleteModelSelfCheck: string = 'api/v1/model-self-checks';
    readonly deleteModelOtherInfo: string = 'api/v1/model-other-infos';
    readonly deleteModelCheckPts: string = 'api/v1/m-models';
    readonly deleteModelDefect: string = 'api/v1/model-defects';
    readonly deleteModelDoc: string = 'api/v1/model-docs';
    readonly uploadModelDocument: string = 'api/v1/model-docs';
    readonly deleteModelImage: string = 'api/v1/model-images';
    readonly deleteModelChildAsset: string = 'api/v1/child-assets';
    readonly listOfAllInstallationTypeCombo: string = 'api/v1/m-installation-types';
    readonly listOfAllParameterType: string = 'api/v1/-parameter-types';
    readonly listOfAllParameterName: string = 'api/v1/-parameters';
    readonly listOfAllItemModule: string = 'api/v1/m-item-modules';
    readonly listOfAllModelNumberCombo: string = 'api/v1/m-models';
    readonly generateSimpleAssetModelReport: string = 'api/v1/assets';
    readonly saveOrUpdateModelDoc: string = 'api/v1/model-docs';
    readonly listOfAllServiceEngineerCombo: string = 'api/v1/serviceengineer';
    readonly deleteCustomerSiteReg: string = 'api/v1/m-customer-site-regs';
    readonly listOfAllParameterGroup: string = 'api/v1/-parameter-groups';
    

    //Customer
    readonly generateCustomerRequestReport: string = 'api/v1/-customers';

    //PreInward
    readonly deleteChildAssetPreInw: string = 'api/v1/child-assets';
    readonly deleteWarrantyContractPreInw: string = 'api/v1/contracts';
    readonly loadOfPreInwardCertificate: string = 'api/v1/-certificates';
    readonly getWorkflowForId: string = 'api/v1/workflowforid';
    readonly calculateInwardInventoryTotals: string = 'api/v1/calculateinwardinventorytotals';
    readonly listAllMasterStatusCombo: string = 'api/v1/masterstatus';
    readonly deletePreInwardRecord: string = 'api/v1/preinwardrecord';
    readonly listOfAllCoverageTypeCombo: string = 'api/v1/coverage-types';
    readonly listOfAllContractTypeCombo: string = 'api/v1/contract-types';
    readonly saveOrUpdatePreInwardCertificate: string = 'api/v1/-certificates';
    readonly generatePreInwardAssetReport: string = 'api/v1/assets';
    readonly generateAssetCustomFieldReport: string = 'api/v1/assets';



    //Gate Pass
    readonly fetchListOfAllGatePassSourceNoCombo: string = 'api/v1/gatepasssourceno';


    //Inventory Matser
    readonly loadItemMasterInfoByItemMasterId: string = 'api/v1/-items';
    readonly fetchListOfAllItemMaster: string = 'api/v1/-items';
    readonly saveOrUpdateItemModule: string = 'api/v1/m-item-modules';
    readonly fetchListOfAllItemModule: string = 'api/v1/m-item-modules';
    readonly saveOrUpdateItemBranchMapping: string = 'api/v1/m-item-branch-mappings';
    readonly loadItemBranchMapping: string = 'api/v1/m-item-branch-mappings';
    readonly listOfAllItemMasterNameCombo: string = 'api/v1/-items';
    readonly listOfAllItemMasterDescCombo: string = 'api/v1/-items';
    readonly listAllItemMasterCombo: string = 'api/v1/-items';
    readonly saveOrUpdateItemMaster: string = 'api/v1/-items';
    readonly loadItemModuleInfoByItemModuleId: string = 'api/v1/m-item-modules';
    readonly deleteModelModule: string = 'api/v1/model-modules';
    readonly generateItemTypeReport: string = 'api/v1/-item-types';
    readonly generatePOParameterReport: string = 'api/v1/-parameters';
    readonly generatePOTermsTemplateReport: string = 'api/v1/potermstemplate';
    readonly generateItemCategoryReport: string = 'api/v1/-item-categories';
    readonly generateItemMasterReport: string = 'api/v1/-items';
    readonly generateModuleReport: string = 'api/v1/module';


    //Asset_Register
    readonly deleteApprovalPendingAssetRecord: string = 'api/v1/assets';
    readonly deleteApprovalPendingAssetAssignee: string = 'api/v1/-asset-assignees';
    readonly listAllStatusTypeCombo:string='listAllStatusTypeCombo.sams'
    readonly listAllAssetStatusCombo:string='listAllAssetStatusCombo.sams'
    readonly listAllAssetConditionCombo:string='listAllAssetConditionCombo.sams'

    //Email_Reminder
    readonly fetchListOfAllEmailReminderHdr: string = 'api/v1/emailreminderhdr';
    readonly fetchEmailReminderInfoByEmailHdrId: string='fetchEmailReminderInfoByEmailHdrId.sams'
    readonly saveOrUpdateEmailReminder: string='saveOrUpdateEmailReminder.sams'
    readonly listAllAssetProcessCombo: string='listAllAssetProcessCombo.sams'
     
    // Email_module_process
    listOfAllEmailModuleCombo: 'listOfAllEmailModuleCombo.sams';
    listOfAllEmailProcessCombo: 'listOfAllEmailProcessCombo.sams';
    listOfAllUserEmailCombo: 'listOfAllUserEmailCombo.sams';
    listOfAllEmailSrStatus: 'listOfAllEmailSrStatus.sams';
    fetchEmailServerConfigList: 'fetchEmailServerConfigList.sams';
    searchEmailServerConfigList: 'searchEmailServerConfigList.sams';
    saveEmailServerConfig: 'saveEmailServerConfig.sams';
    viewEmailServerConfig: 'viewEmailServerConfig.sams';
    updateEmailServerConfig: 'updateEmailServerConfig.sams';
    deleteEmailServerConfig: 'deleteEmailServerConfig.sams';

    // supplier invoice
    readonly listOfSupplierInvoice: string = 'api/v1/-suppliers';
    readonly fetchGRNDtlItems : string = "listOfGRNDtlItems.sams"
    readonly listOfPODtlItems : string = "listOfPODtlItems.sams"

    //Functionality Data
    readonly listOfFunctionalityCombo: string = 'api/v1/m-functionalities';

    //Maintenance Strategy Data
    readonly listOfMaintenanceStrategyCombo: string = 'api/v1/m-maintenance-strategies';

    //Maintenance Schedule Type Data
    readonly listOfMaintenanceScheduleTypeCombo: string = 'api/v1/maintenancescheduletype';

    //Maintenance Schedule Frequency Data
    readonly listOfMaintenanceScheduleFrequencyCombo: string = 'api/v1/maintenanceschedulefrequency';

    //Asset Group Maintenance Schedule List
    readonly fetchAssetGroupMaintenanceScheduleByAgId: string = 'api/v1/m-asset-group-maintenance-schedules';

    //Delete Asset Group Maintenance Schedule data
    readonly deleteAssetGroupMaintenanceSchedule: string = "deleteAssetGroupMaintenanceSchedule.sams";
    // Business Partner
    readonly fetchListOfAllPartner: string = 'api/v1/-business-partners';
    readonly saveUpdateBusinessPartner: string = 'api/v1/-business-partners';
    readonly listAllBusinessPartnerCombo: string = 'api/v1/-business-partners';
    readonly listAllBusinessPartnerSiteCombo: string = 'api/v1/-business-partners';
    readonly listAllBusinessPartnerRolesCombo: string = 'api/v1/-business-partners';

    //Delete Asset Group Maintenance Schedule data
    readonly deleteAssetGroupCheckPoint: string = "deleteAssetGroupCheckPoint.sams";

	//Grn
	readonly listOfGrnHdrSupplierNameCombo: string = 'api/v1/-suppliers';

    readonly listOfPurchasingTypeCombo: string = 'api/v1/m-purchasing-types';
    readonly listOfPurchasingUsageCombo: string = 'api/v1/m-purchasing-usages';
    readonly deletePRLineItemsFromPO: string = "deletePRLineItemsFromPO.sams";
    readonly listOfAllPORevNoforCombo: string = 'api/v1/porevnofor';
    readonly listOfAllPurchaseNoCombo: string = 'api/v1/purchaseno';

    //Model Master, Child model delete
    readonly deleteModelChild: string = 'api/v1/m-model-childs';

    //purhcase parameter
    readonly saveOrUpdatePurchaseParameter: string = 'api/v1/-parameters';
    readonly listPurchaseParameterCombo: string = 'api/v1/-parameters';
    readonly listPoTermTemplateCombo: string = 'api/v1/listpotermtemplate';
    readonly saveOrUpdatePurchaseTemplate: string = 'api/v1/purchasetemplate';
    readonly listOfAllDispSeqNo: string = 'api/v1/m-disp-seq-nos';
    readonly listOfAllPurchaseProcess: string = 'api/v1/m-purchase-processes';

    //USER PREFERENCE
    readonly saveOrUpdateUserPreference: string = 'api/v1/m-users';
    readonly fetchUserPreferenceInfo: string = 'api/v1/m-users';
    readonly deleteAssetCheckPts: string = 'api/v1/assets';

}
