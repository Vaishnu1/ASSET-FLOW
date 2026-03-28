package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class LoanReturnDTO {
    private Long loanId;
    private Long orgId;
    private Long locationId;
    private Long assetId;
    private String assetCode;
    private String loanNo;
    private Long groupNo;
    private String loanedTo;
    private Long loanedToId;
    private Long loanedToSiteId;
    private String loanedPersonName;
    private String loanedPersonContactNo;
    private String loanedPersonEmailId;
    private Long loanedAssetConditionId;
    private String loanedRemarks;
    private String loanType;
    private String contractNo;
    private Long loanStatusId;
    private LocalDateTime loanStartDate;
    private LocalDateTime loanEndDate;
    private LocalDateTime dateOfReturn;
    private Long returnAssetConditionId;
    private Long returnById;
    private Long returnReceivedById;
    private String returnRemarks;
    private Long returnToDeptId;
    private String returnToDeptName;
    private Long assetPreviousStatusId;
    private String remarks;
    private LocalDateTime expReturnDate;
    private Long fromDeptId;
    private Long toDeptId;
    private String sourceScreen;
    private Long fromDeptInchargeId;
    private Long toDeptInchargeId;
    private Long assetPicId;
    private String loanApprovedBy;
    private LocalDateTime loanApprovedDt;
    private String receivedApprovedBy;
    private LocalDateTime receivedApprovedDt;
    private String loanReceivedBy;
    private LocalDateTime loanReceivedDt;
    private String returnAuthorizedBy;
    private LocalDateTime returnAuthorizedDt;
    private String returnApprovedBy;
    private LocalDateTime returnApprovedDt;
    private LocalDateTime actualDateOfReturn;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String loanReturnedBy;
    private String loanReturnedByContactNo;
    private String loanReturnedByEmailId;
}