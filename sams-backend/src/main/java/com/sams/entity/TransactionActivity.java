package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "transaction_activity", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionActivity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_activity_id")
    private Long transactionActivityId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "transaction_id")
    private Long transactionId;

    @Column(name = "transaction_name")
    private String transactionName;

    @Column(name = "transaction_source")
    private String transactionSource;

    @Column(name = "transaction_done_by")
    private Long transactionDoneBy;

    @Column(name = "activity_name")
    private String activityName;

    @Column(name = "activity_desc")
    private String activityDesc;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}