package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "stock_indent_dtl", schema = "inventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockIndentDtl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "indent_dtl_id")
    private Long indentDtlId;

    @Column(name = "indent_hdr_id")
    private Long indentHdrId;

    @Column(name = "indent_no")
    private String indentNo;

    @Column(name = "sr_id")
    private Long srId;

    @Column(name = "sr_no")
    private String srNo;

    @Column(name = "sr_activity_id")
    private Long srActivityId;

    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "description")
    private String description;

    @Column(name = "maker_part_code")
    private String makerPartCode;

    @Column(name = "available_qty")
    private Long availableQty;

    @Column(name = "indent_qty")
    private Long indentQty;

    @Column(name = "issue_qty")
    private Long issueQty;

    @Column(name = "store_id")
    private Long storeId;

    @Column(name = "store_name")
    private String storeName;

    @Column(name = "uom")
    private String uom;

    @Column(name = "error_flg")
    private String errorFlg;

    @Column(name = "error_message")
    private String errorMessage;

    @Column(name = "unit_price")
    private Double unitPrice;

    @Column(name = "processed_flg")
    private String processedFlg;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "item_type_id")
    private Long itemTypeId;

    @Column(name = "item_type_name")
    private String itemTypeName;

}