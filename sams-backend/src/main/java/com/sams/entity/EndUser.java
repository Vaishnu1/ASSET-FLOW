package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_end_user", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EndUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "end_user_id")
    private Long endUserId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "end_user_name")
    private String endUserName;

    @Column(name = "mobile_number")
    private String mobileNumber;

    @Column(name = "user_verification_otp")
    private String userVerificationOtp;

    @Column(name = "user_verified")
    private Boolean userVerified;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

}