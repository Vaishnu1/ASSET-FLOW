import { Component, OnInit, OnDestroy, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { WorkflowApprovalModel } from '../../../../Model/workflow/workflowApproval';
import { CommonService } from '../../../../Services/common-service/common.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { allAssetCreateStatus, allAssetRetirmentStatus, allassetStatus, allloanStatus , allPreInwardStatus, allWorkflowStatus } from '../../../../Constants/AllStatusConstants'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-common-workflow-approval-tab',
  templateUrl: './common-workflow-approval-tab.component.html',
  styleUrls: ['./common-workflow-approval-tab.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CommonWorkflowApprovalTabComponent implements OnInit, AfterViewInit {

  @Input() transactionId;
  @Input() transactionSource;
  @Input() retirementStatusId;
  @Input() approvebuttonEnable;
  @Input() employeeId;

  retirementStatus = allAssetRetirmentStatus.AWAITING_FOR_RETAIR_APPROVAL;
  salvageStatus = allAssetRetirmentStatus.AWAITING_FOR_SALVAGE_APPROVAL;
  disposalStatus = allAssetRetirmentStatus.AWAITING_FOR_DISPOSAL_APPROVAL;
  scrapStatus = allAssetRetirmentStatus.AWAITING_FOR_SCRAP_APPROVAL;

  retirmentRejectStatus = allAssetRetirmentStatus.RETIREMENT_REJECTED;
  salvageRejectStatus = allAssetRetirmentStatus.SALVAGE_REJECTED;
  disposeRejectStatus = allAssetRetirmentStatus.DISPOSE_REJECTED;
  scrapRejectStatus = allAssetRetirmentStatus.SCRAP_REJECTED;

  //@Input() uploadDocumentList: Function;

  @Output() uploadDocumentList: EventEmitter<any> = new EventEmitter();
  @Output() confirmApprove: EventEmitter<any> = new EventEmitter();
  @Output() rejectRetirement: EventEmitter<any> = new EventEmitter()

  //item
  @Input() itemStatus;
  @Input() itemApprove;
  @Input() itemApprovalEmployeeId;
  @Output() itemApproveMethod: EventEmitter<any> = new EventEmitter();
  @Output() itemRejectMethod: EventEmitter<any> = new EventEmitter();

  //preInward
  @Input() preInwardStatusId;
  @Input() PreInwardApproveButtonEnable;
  @Input() preInwardEmployeeId;
  @Output() checkStatutoryDocumentValue: EventEmitter<any> = new EventEmitter();
  @Output() PreInwardReject: EventEmitter<any> = new EventEmitter();
  preinwardStatus = allPreInwardStatus.APPROVAL_PENDING;

  //Loan
  @Input() loanStatusId;
  @Input() loanApprove;
  @Input() loanEmployeeId;
  @Output() loanApproveMethod: EventEmitter<any> = new EventEmitter();
  @Output() loanRejectMethod: EventEmitter<any> = new EventEmitter();


  //Loan
  @Input() GRNStatus;
  @Input() GRNApproveButtonEnable;
  @Input() GRNEmployeeId;
  @Output() GRNconfirm: EventEmitter<any> = new EventEmitter();
  @Output() GRNReject: EventEmitter<any> = new EventEmitter();

  //AssetRegistration
  @Input() assetRegistrationStatusId;
  @Input() assetRegistrationApproveButton;
  @Input() assetRegistrationEmployeeId;
  @Output() confirmAssetRegistration: EventEmitter<any> = new EventEmitter();
  @Output() rejectAssetRegistration: EventEmitter<any> = new EventEmitter();
  assetStatusId = allassetStatus.IN_STOCK;

  //Gate pass
  @Input() gatePassStatusId;
  @Input() gatePassApproveButton;
  @Input() gatePassEmployeeId;

  @Output() confirmGatePass: EventEmitter<any> = new EventEmitter();
  @Output() GatePassReject: EventEmitter<any> = new EventEmitter();

  //Work Order
  @Input() workOrderStatusId;
  @Input() workOrderApproveButton;
  @Input() workOrderEmployeeId;

  @Output() confirmWorkOrder: EventEmitter<any> = new EventEmitter();
  @Output() rejectWorkOrder: EventEmitter<any> = new EventEmitter();

  //Contract
  @Input() contractApproveButton;
  @Input() contractEmployeeId;
  @Output() confirmContract: EventEmitter<any> = new EventEmitter();
  @Output() ContractReject: EventEmitter<any> = new EventEmitter();

  @Output() workflowDataSource: EventEmitter<any[]> = new EventEmitter<any[]>();


  @Output() confirmStockAllocate: EventEmitter<any> = new EventEmitter();
  @Output() StockAllocatetReject: EventEmitter<any> = new EventEmitter()

  //stock transfer
  @Input() stockTransferStatusId;
  @Input() stockTransferApproveButton;
  @Input() stockTransferEmployeeId;

  @Output() confirmStockTransfer: EventEmitter<any> = new EventEmitter();
  @Output() stockTransferReject: EventEmitter<any> = new EventEmitter()

   //PO
   @Input() poStatusId;
   @Input() POApproveButtonEnable;
   @Input() POEmployeeId;

   @Output() poconfirm: EventEmitter<any> = new EventEmitter();
   @Output() poReject: EventEmitter<any> = new EventEmitter()

   //Pr
   @Input() prStatusId;
   @Input() PRApproveButtonEnable; 
   @Input() PREmployeeId;

   @Output() prConfirm: EventEmitter<any> = new EventEmitter();
   @Output() prReject: EventEmitter<any> = new EventEmitter()

   //stock indent
   @Input() StockIndentStatusId;
   @Input() StockIndentApproveButtonEnable;
   @Input() StockIndentEmployeeId;

   @Output() StockIndentconfirm: EventEmitter<any> = new EventEmitter();
   @Output() StockIndentReject: EventEmitter<any> = new EventEmitter();

   //ASSET PHYSICAL AUDIT
   @Input() phyAuditId;
   @Input() phyAuditAprroveButton;
   @Input() physicalAuditEmpId;

   @Output() physicalAuditConfirm: EventEmitter<any> = new EventEmitter();
   @Output() physicalAuditReject: EventEmitter<any> = new EventEmitter();

   //SUPPLIER INVOICE
   @Input() supplierInvoiceStatusName;
   @Input() supplierInvoiceApproveButton;
   @Input() supplierInvoiceEmpId;

   supplierInvoice: string;
   supplierInvoiceStatus: boolean;

   @Output() supplierInvoiceConfirm: EventEmitter<any> = new EventEmitter();
   @Output() supplierInvoiceReject: EventEmitter<any> = new EventEmitter()


   //RTV
   @Input() rtvStatusName;
   @Input() rtvApproveButton;
   @Input() rtvEmpId;

   rtv: string;
   rtvStaus: boolean;

   @Output() rtvConfirm: EventEmitter<any> = new EventEmitter();
   @Output() rtvReject: EventEmitter<any> = new EventEmitter()

   //Asset Code Chnage
   @Input() AssetCodeChangeApproveButtonEnable;
   @Input() AssetCodeChangeEmployeeId;
   @Output() confirmAssetCodeChange: EventEmitter<any> = new EventEmitter();
   @Output() rejectAssetCodeChange: EventEmitter<any> = new EventEmitter();



  workflowApprovalModel: WorkflowApprovalModel;

  pageIndex: string;//set page number starts with zero
  pageSize: string;// records per page
  length: string;//set total record count here
  subLoader: boolean;
  approvalId: string;

  //ASSET_RETIREMENT
  show: boolean;
  transactionIdShow: boolean;
  actionDisplay: boolean;
  assetRetirement: string;
  assetSalvage: string;
  assetDisposal: string;
  assetScrap: string;

  //PreInward
  preInwardShow: boolean;
  preInward: string;


  //PreInward
  itemShow: boolean;
  items: string;

  //Loan
  loans: string;
  loanreturns:string;
  loanShow: boolean;

  //Asset Registration
  assetRegistrationSource :string;

  //GatePass
  gatePassSource :string;

  //WorkOrder
  workOrderSourceBM :string;
  workOrderSourcePM :string;
  workOrderSourcePA :string;
  workOrderSourceQA :string;
  workOrderSourceINS :string;
  workOrderSourceHandover: string;

  //Contract
  contract : string;

  //stock transfer

  stockAllocate : string;

  //ASSET CODE CHANGE
  assetCodeChange: string;

  //ASSET RELOCATION
  @Input() assetRelocationEmployeeId;
  @Input() AssetRelocationApproveButtonEnable;
  @Input() relocationViewMode;
  @Output() confirmAssetRelocation: EventEmitter<any> = new EventEmitter();
  assetRelocation : String;
  @Output() rejectAssetRelocation: EventEmitter<any> = new EventEmitter();


  num:number;

  workflowNotificationDataSource = [];

  workflowNotificationDispColumns = ['sno', 'transactionNo', 'workflowDescriptionTO.workflowName',
    'levelName', 'employeeName1', 'condition1', 'employeeName2',
    'condition2', 'employeeName3', 'createdDt',  'action']

  workflowNotificationExpandedDataSource: any = this.workflowNotificationDataSource;
  porder: string;
  poStatus: boolean;
  purchaseRequest : string;
  prStatus: boolean;
  porderContract: string;

  stockindent : string;
  stockindentStatus : boolean;

  grn : string;
  grnStatus : boolean;

  stockTransfer : string;
  stockTransferStatus : boolean;
  isViewMode: boolean = false;

  physicalAudit : string;
  physicalAuditStatus : boolean;

  requestForLoan : number = allloanStatus.REQUESTED_FOR_LOAN;
  requestForReturn : number = allloanStatus.REQUEST_FOR_RETURN;

  nextApproverLevel: number = 0;

  

  constructor(private commonService: CommonService,public activatedRoute: ActivatedRoute,) {

    this.workflowApprovalModel = new WorkflowApprovalModel();
    this.assetRetirement = allWorkflowStatus[allWorkflowStatus.RETIREMENT];
    this.assetSalvage = allWorkflowStatus[allWorkflowStatus.SALVAGE];
    this.assetScrap = allWorkflowStatus[allWorkflowStatus.SCRAPPED];
    this.assetDisposal = allWorkflowStatus[allWorkflowStatus.DISPOSAL];
    this.preInward = allWorkflowStatus[allWorkflowStatus.PRE_INWARD];
    this.items = allWorkflowStatus[allWorkflowStatus.ITEM_APPROVAL];
    this.loans = allWorkflowStatus[allWorkflowStatus.LOAN];
    this.loanreturns = allWorkflowStatus[allWorkflowStatus.LOAN_RETURNS];
    this.assetRegistrationSource = allWorkflowStatus[allWorkflowStatus.ASSET_CREATE];
    this.gatePassSource = allWorkflowStatus[allWorkflowStatus.GATE_PASS];
    this.contract = allWorkflowStatus[allWorkflowStatus.CONTRACT];
    this.stockTransfer = allWorkflowStatus[allWorkflowStatus.STOCK_TRANSFER];
    this.stockAllocate = allWorkflowStatus[allWorkflowStatus.STOCK_ALLOCATE];
    this.porder = allWorkflowStatus[allWorkflowStatus.PO];
    this.stockindent = allWorkflowStatus[allWorkflowStatus.STOCK_INDENT];
    this.grn = allWorkflowStatus[allWorkflowStatus.GRN_APPROVAL];
    this.physicalAudit = allWorkflowStatus[allWorkflowStatus.ASSET_PHY_AUDIT];
    this.purchaseRequest = allWorkflowStatus[allWorkflowStatus.PR];
    this.porderContract = allWorkflowStatus[allWorkflowStatus.PO_CONTRACT];

    this.approvalId = '0';
    this.poStatus=false;
    this.prStatus=false;
    this.stockindentStatus=false;
    this.grnStatus=false;
    this.stockTransferStatus=false;
    this.show = false;
    this.transactionIdShow = false;
    this.actionDisplay = false;
    this.preInwardShow = false;
    this.itemShow = false;
    this.loanShow = false;
    this.subLoader = false;
    this.physicalAuditStatus=false;
    this.assetRelocation = allWorkflowStatus[allWorkflowStatus.ASSET_RELOCATION];
    this.workOrderSourceBM = allWorkflowStatus[allWorkflowStatus.WO_BD];
    this.workOrderSourcePM = allWorkflowStatus[allWorkflowStatus.WO_PM];
    this.workOrderSourcePA = allWorkflowStatus[allWorkflowStatus.WO_PA];
    this.workOrderSourceQA = allWorkflowStatus[allWorkflowStatus.WO_QA];
    this.workOrderSourceINS = allWorkflowStatus[allWorkflowStatus.WO_INSTALLATION];
    this.workOrderSourceHandover = allWorkflowStatus[allWorkflowStatus.WO_HANDOVER];
    this.supplierInvoice = allWorkflowStatus[allWorkflowStatus.WF_SUPPLIER_INVOICE];
    this.assetCodeChange = allWorkflowStatus[allWorkflowStatus.ASSET_CODE_CHANGE];
    this.rtv = allWorkflowStatus[allWorkflowStatus.RTV_APPROVAL];
    this.supplierInvoiceStatusName=false;
    this.rtvStatusName = false;
  }

  ngOnInit() {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.workflowApprovalModel.direction = 'asc';
    this.workflowApprovalModel.columnName = 'createdDt';
    this.num = 0;
    this.activatedRoute.params.subscribe(
      params => {
        const mode = params.mode;
        if (mode === 'view') {
          this.isViewMode= true;
        }else{
          this.isViewMode= false;
        }
      });
    if (this.transactionId > 0) {
      this.loadWorkNotificationList();
    }
  }

  ngAfterViewInit() {
    this.pageSize = '100';
    this.pageIndex = '0';
    this.workflowApprovalModel.direction = 'asc';
    this.workflowApprovalModel.columnName = 'createdDt';
    if (this.transactionId > 0) {
      this.loadWorkNotificationList();
    }
  }

  loadWorkNotificationList() {
    this.workflowApprovalModel.pageNumber = Number(this.pageIndex);
    this.workflowApprovalModel.recordsPerPage = Number(this.pageSize);

    this.workflowApprovalModel.transactionId = this.transactionId;
    this.workflowApprovalModel.transactionSource = this.transactionSource;

    if (this.transactionSource === this.assetRetirement) {
      this.show = true;
      this.transactionIdShow = true;
    }

    if(this.transactionSource === this.assetSalvage) {
      this.show = true;
      this.transactionIdShow = true;
    }

     if(this.transactionSource === this.assetScrap) {
      this.show = true;
      this.transactionIdShow = true;
    }

    if(this.transactionSource === this.assetDisposal) {
      this.show = true;
      this.transactionIdShow = true;
    }

    if (this.transactionSource === this.preInward) {
      this.show = true;
      this.preInwardShow = true;
    }

    if (this.transactionSource === this.items) {
      this.show = true;
      this.itemShow = true;
    }

    if (this.transactionSource === this.loans) {
      this.show = true;
      this.loanShow = true;
    }

    if (this.transactionSource === this.loanreturns) {
      this.show = true;
      this.loanShow = true;
    }

    if (this.transactionSource === this.assetRegistrationSource) {
      this.show = true;
    }

    if(this.transactionSource === this.gatePassSource){
      this.show =true;
    }


    if(this.transactionSource === this.workOrderSourceBM){
      this.show =true;
    }

    if(this.transactionSource === this.workOrderSourcePM){
      this.show =true;
    }

    if(this.transactionSource === this.workOrderSourcePA){
      this.show =true;
    }

    if(this.transactionSource === this.workOrderSourceQA){
      this.show =true;
    }

    if(this.transactionSource === this.workOrderSourceINS){
      this.show =true;
    }

    if(this.transactionSource === this.workOrderSourceHandover){
      this.show =true;
    }

    if(this.transactionSource === this.contract){
      this.show = true;
    }

    if(this.transactionSource === this.stockTransfer){
      this.show = true;
      this.stockTransferStatus =true;
    }

    if(this.transactionSource === this.stockAllocate){
      this.show = true;
    }

    if(this.transactionSource === this.assetCodeChange){
      this.show =true;
    }

    if(this.transactionSource === this.assetRelocation){
      if(this.relocationViewMode){
        this.isViewMode = true;
      }
        this.show = true;
    }

    if(this.transactionSource === this.porder){
      this.show = true;
      this.poStatus=true;
    }

    if(this.transactionSource === this.porderContract){
      this.show = true;
      this.poStatus=true;
    }

    if(this.transactionSource === this.purchaseRequest){
      this.show = true;
      this.prStatus=true;
    }
    if(this.transactionSource === this.stockindent){
      this.show = true;
      this.stockindentStatus = true;
    }
    if(this.transactionSource === this.grn){
      this.show = true;
      this.grnStatus = true;
    }
    if(this.transactionSource === this.physicalAudit){
      this.show = true;
      this.physicalAuditStatus = true;
    }

    if(this.transactionSource === this.supplierInvoice){
      this.show = true;
      this.supplierInvoiceStatus = true;
    }

    if(this.transactionSource === this.rtv){
      this.show = true;
      this.rtvStaus = true;
    }

    this.subLoader = true;
    this.workflowNotificationDataSource = [];

    this.commonService.commonListService("fetchListOfWorkflowNotificationForUser.sams", this.workflowApprovalModel).subscribe(
      data => {
        if (data.success) {
          
          this.workflowNotificationDataSource = data.responseData.dataList;

          if(this.workflowNotificationDataSource.length > 0){
            for(let i=0;i<this.workflowNotificationDataSource.length;i++){
              
              if(this.workflowNotificationDataSource[i].levelApprovalStatus == "REJECTED"){
                this.nextApproverLevel = 0;
                break;
              } 
              else if(this.workflowNotificationDataSource[i].levelApprovalStatus == "PENDING"){
                  this.nextApproverLevel = this.workflowNotificationDataSource[i].levelSeqNo ;
                  break;
              }
            }
          }

         if(this.num === 0){
          this.workflowDataSource.emit(data.responseData.dataList);
          this.num++;
        }
          this.length = data.responseData.dataTotalRecCount;
          this.subLoader = false;
        } else {
          this.subLoader = false;
        }
      }, error => {
        this.subLoader = false;
      }
    );
  }

  uploadDocumentListMethod() {
    this.uploadDocumentList.emit();
  }

  rejectRetirementMethod() {
    if (this.transactionSource === this.assetRetirement) {
      this.rejectRetirement.emit();
    }

    if (this.transactionSource === this.assetSalvage) {
      this.rejectRetirement.emit();
    }

    if (this.transactionSource === this.assetScrap) {
      this.rejectRetirement.emit();
    }

    if (this.transactionSource === this.assetDisposal) {
      this.rejectRetirement.emit();
    }

    if (this.transactionSource === this.loans) {
      this.loanRejectMethod.emit();
    }

    if (this.transactionSource === this.loanreturns) {
      this.loanRejectMethod.emit();
    }

    if (this.transactionSource === this.stockTransfer) {
      this.stockTransferReject.emit();
    }

    if (this.transactionSource === this.stockAllocate) {
      this.StockAllocatetReject.emit();
    }

    if (this.transactionSource === this.assetRelocation){
      this.rejectAssetRelocation.emit();
    }


    if(this.transactionSource === this.porder){
      this.poReject.emit();
    }

    if(this.transactionSource === this.porderContract){
      this.poReject.emit();
    }

    if(this.transactionSource === this.purchaseRequest){
      this.prReject.emit();
    }

    if(this.transactionSource === this.gatePassSource){
      this.GatePassReject.emit();
    }

    if(this.transactionSource === this.stockindent){
      this.StockIndentReject.emit();
    }

    if(this.transactionSource === this.items){
      this.itemRejectMethod.emit();
    }

    if (this.transactionSource === this.preInward) {
      this.PreInwardReject.emit();
    }

    if(this.transactionSource === this.contract){
      this.ContractReject.emit();
    }

    if(this.transactionSource === this.workOrderSourceBM){
      this.rejectWorkOrder.emit();
    }

    if(this.transactionSource === this.workOrderSourcePM){
      this.rejectWorkOrder.emit();
    }

    if(this.transactionSource === this.workOrderSourcePA){
      this.rejectWorkOrder.emit();
    }

    if(this.transactionSource === this.workOrderSourceQA){
      this.rejectWorkOrder.emit();
    }

    if(this.transactionSource === this.workOrderSourceINS){
      this.rejectWorkOrder.emit();
    }

    if(this.transactionSource === this.workOrderSourceHandover){
      this.rejectWorkOrder.emit();
    }

    if(this.transactionSource === this.grn){
      this.GRNReject.emit();
    }

    if(this.transactionSource === this.physicalAudit){
      this.physicalAuditReject.emit();
    }

    if(this.transactionSource === this.assetRegistrationSource){
      this.rejectAssetRegistration.emit();
    }

    if(this.transactionSource === this.rtv){
      this.rtvReject.emit();
    }

    if(this.transactionSource === this.assetCodeChange){
      this.rejectAssetCodeChange.emit();
    }

  }

  confirmApproveMethod() {

    if (this.transactionSource === this.items) {
      this.itemApproveMethod.emit();
    }

    if (this.transactionSource === this.assetRetirement) {
      this.confirmApprove.emit();
    }

    if (this.transactionSource === this.assetSalvage) {
      this.confirmApprove.emit();
    }

    if (this.transactionSource === this.assetScrap) {
      this.confirmApprove.emit();
    }

    if (this.transactionSource === this.assetDisposal) {
      this.confirmApprove.emit();
    }

    if (this.transactionSource === this.preInward) {
      this.checkStatutoryDocumentValue.emit();
    }

    if (this.transactionSource === this.loans) {
      this.loanApproveMethod.emit();
    }

    if (this.transactionSource === this.loanreturns) {
      this.loanApproveMethod.emit();
    }

    if(this.transactionSource === this.assetRegistrationSource){
      this.confirmAssetRegistration.emit();
    }

    if(this.transactionSource === this.gatePassSource){
      this.confirmGatePass.emit();
    }

    if(this.transactionSource === this.workOrderSourceBM){
      this.confirmWorkOrder.emit();
    }

    if(this.transactionSource === this.workOrderSourcePM){
      this.confirmWorkOrder.emit();
    }

    if(this.transactionSource === this.workOrderSourcePA){
      this.confirmWorkOrder.emit();
    }

    if(this.transactionSource === this.workOrderSourceQA){
      this.confirmWorkOrder.emit();
    }

    if(this.transactionSource === this.workOrderSourceINS){
      this.confirmWorkOrder.emit();
    }

    if(this.transactionSource === this.workOrderSourceHandover){
      this.confirmWorkOrder.emit();
    }

    if(this.transactionSource === this.contract){
      this.confirmContract.emit();
    }

    if(this.transactionSource === this.stockTransfer){
      this.confirmStockTransfer.emit();
    }

    if(this.transactionSource === this.stockAllocate){
      this.confirmStockAllocate.emit();
    }

    if(this.transactionSource === this.assetRelocation){
      this.confirmAssetRelocation.emit();
    }

    if(this.transactionSource === this.porder){
      this.poconfirm.emit();
    }

    if(this.transactionSource === this.porderContract){
      this.poconfirm.emit();
    }

    if(this.transactionSource === this.purchaseRequest){
      this.prConfirm.emit();
    }

    if(this.transactionSource === this.stockindent){
      this.StockIndentconfirm.emit();
    }

    if(this.transactionSource === this.grn){
      this.GRNconfirm.emit();
    }

    if(this.transactionSource === this.physicalAudit){
      this.physicalAuditConfirm.emit();
    }

    if(this.transactionSource === this.supplierInvoice){
      this.supplierInvoiceConfirm.emit();
    }

    if(this.transactionSource === this.rtv){
      this.rtvConfirm.emit();
    }

    if(this.transactionSource === this.assetCodeChange){
      this.confirmAssetCodeChange.emit();
    }
  }

}
