package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_currency_code", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CurrencyCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cur_id")
    private Long curId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "cur_cd")
    private String curCd;

    @Column(name = "cur_name")
    private String curName;

    @Column(name = "country_name")
    private String countryName;

    @Column(name = "currency_format")
    private String currencyFormat;

    @Column(name = "remarks")
    private String remarks;

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