package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_number_control_cd", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NumberControlCd {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "number_control_cd_id")
    private Long numberControlCdId;

    @Column(name = "number_control_cd_name")
    private String numberControlCdName;

    @Column(name = "number_control_cd_desc")
    private String numberControlCdDesc;

    @Column(name = "number_control_module")
    private String numberControlModule;

    @Column(name = "prefix_cd")
    private String prefixCd;

    @Column(name = "suffix_cd")
    private String suffixCd;

}