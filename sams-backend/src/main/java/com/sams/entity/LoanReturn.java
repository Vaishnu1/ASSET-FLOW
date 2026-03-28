package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "loan_return", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanReturn {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loan_id")
    private Long loanId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "asset_id")
    private Long assetId;

    @Column(name = "asset_code")
    private String assetCode;

    @Column(name = "loan_no")
    private String loanNo;

    @Column(name = "group_no")
    private Long groupNo;

    @Column(name = "loaned_to")
    private String loanedTo;

    @Column(name = "loaned_to_id")
    private Long loanedToId;

    @Column(name = "loaned_to_site_id")
    private Long loanedToSiteId;

    @Column(name = "loaned_person_name")
    private String loanedPersonName;

    @Column(name = "loaned_person_contact_no")
    private String loanedPersonContactNo;

    @Column(name = "loaned_person_email_id")
    private String loanedPersonEmailId;

    @Column(name = "loaned_asset_condition_id")
    private Long loanedAssetConditionId;

    @Column(name = "loaned_remarks")
    private String loanedRemarks;

    @Column(name = "loan_type")
    private String loanType;

    @Column(name = "contract_no")
    private String contractNo;

    @Column(name = "loan_status_id")
    private Long loanStatusId;

    @Column(name = "loan_start_date")
    private LocalDateTime loanStartDate;

    @Column(name = "loan_end_date")
    private LocalDateTime loanEndDate;

    @Column(name = "date_of_return")
    private LocalDateTime dateOfReturn;

    @Column(name = "return_asset_condition_id")
    private Long returnAssetConditionId;

    @Column(name = "return_by_id")
    private Long returnById;

    @Column(name = "return_received_by_id")
    private Long returnReceivedById;

    @Column(name = "return_remarks")
    private String returnRemarks;

    @Column(name = "return_to_dept_id")
    private Long returnToDeptId;

    @Column(name = "return_to_dept_name")
    private String returnToDeptName;

    @Column(name = "asset_previous_status_id")
    private Long assetPreviousStatusId;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "exp_return_date")
    private LocalDateTime expReturnDate;

    @Column(name = "from_dept_id")
    private Long fromDeptId;

    @Column(name = "to_dept_id")
    private Long toDeptId;

    @Column(name = "source_screen")
    private String sourceScreen;

    @Column(name = "from_dept_incharge_id")
    private Long fromDeptInchargeId;

    @Column(name = "to_dept_incharge_id")
    private Long toDeptInchargeId;

    @Column(name = "asset_pic_id")
    private Long assetPicId;

    @Column(name = "loan_approved_by")
    private String loanApprovedBy;

    @Column(name = "loan_approved_dt")
    private LocalDateTime loanApprovedDt;

    @Column(name = "received_approved_by")
    private String receivedApprovedBy;

    @Column(name = "received_approved_dt")
    private LocalDateTime receivedApprovedDt;

    @Column(name = "loan_received_by")
    private String loanReceivedBy;

    @Column(name = "loan_received_dt")
    private LocalDateTime loanReceivedDt;

    @Column(name = "return_authorized_by")
    private String returnAuthorizedBy;

    @Column(name = "return_authorized_dt")
    private LocalDateTime returnAuthorizedDt;

    @Column(name = "return_approved_by")
    private String returnApprovedBy;

    @Column(name = "return_approved_dt")
    private LocalDateTime returnApprovedDt;

    @Column(name = "actual_date_of_return")
    private LocalDateTime actualDateOfReturn;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "loan_returned_by")
    private String loanReturnedBy;

    @Column(name = "loan_returned_by_contact_no")
    private String loanReturnedByContactNo;

    @Column(name = "loan_returned_by_email_id")
    private String loanReturnedByEmailId;

}