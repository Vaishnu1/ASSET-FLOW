package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "supplier_invoice_doc", schema = "accounts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupplierInvoiceDoc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "supplier_invoice_doc_id")
    private Long supplierInvoiceDocId;

    @Column(name = "supplier_invoice_hdr_id")
    private Long supplierInvoiceHdrId;

    @Column(name = "doc_name")
    private String docName;

    @Column(name = "doc_type")
    private String docType;

    @Column(name = "file_path")
    private String filePath;

    @Column(name = "content_type")
    private String contentType;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}