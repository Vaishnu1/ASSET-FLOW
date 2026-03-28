package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "item_transactions", schema = "inventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemTransactions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private Long transactionId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "transaction_date")
    private LocalDateTime transactionDate;

    @Column(name = "transaction_source_id")
    private Long transactionSourceId;

    @Column(name = "transaction_source_line_id")
    private Long transactionSourceLineId;

    @Column(name = "transaction_source_name")
    private String transactionSourceName;

    @Column(name = "transaction_reference")
    private String transactionReference;

    @Column(name = "transaction_reference_external")
    private String transactionReferenceExternal;

    @Column(name = "transaction_action")
    private String transactionAction;

    @Column(name = "transaction_type")
    private String transactionType;

    @Column(name = "transaction_type_reference_no")
    private String transactionTypeReferenceNo;

    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "item_description")
    private String itemDescription;

    @Column(name = "store_id")
    private Long storeId;

    @Column(name = "transaction_qty")
    private Double transactionQty;

    @Column(name = "orignial_transaction_id")
    private Long orignialTransactionId;

    @Column(name = "bin_id")
    private Long binId;

    @Column(name = "project_id")
    private Long projectId;

    @Column(name = "supplier_id")
    private Long supplierId;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "item_type_id")
    private Long itemTypeId;

    @Column(name = "item_type_name")
    private String itemTypeName;

}