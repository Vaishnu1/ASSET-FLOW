package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_po_price_hdr", schema = "purchase")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PoPriceHdr {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "po_price_hdr_id")
    private Long poPriceHdrId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "po_price_name")
    private String poPriceName;

    @Column(name = "po_price_desc")
    private String poPriceDesc;

    @Column(name = "cur_cd")
    private String curCd;

    @Column(name = "effc_from_dt")
    private LocalDateTime effcFromDt;

    @Column(name = "effc_to_dt")
    private LocalDateTime effcToDt;

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

}