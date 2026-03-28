package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_customer_site", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerSite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "customer_id")
    private Long customerId;

    @Column(name = "customer_site_id")
    private Long customerSiteId;

    @Column(name = "customer_site_name")
    private String customerSiteName;

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "cust_contact_person")
    private String custContactPerson;

    @Column(name = "address1")
    private String address1;

    @Column(name = "address2")
    private String address2;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "country")
    private String country;

    @Column(name = "postal_cd")
    private String postalCd;

    @Column(name = "contact_no1")
    private String contactNo1;

    @Column(name = "contact_no2")
    private String contactNo2;

    @Column(name = "contact_no3")
    private String contactNo3;

    @Column(name = "cust_email_id")
    private String custEmailId;

    @Column(name = "cust_cur_cd")
    private String custCurCd;

    @Column(name = "cust_ship_terms_cd")
    private String custShipTermsCd;

    @Column(name = "cust_ship_mode_cd")
    private String custShipModeCd;

    @Column(name = "cust_transporter_name")
    private String custTransporterName;

    @Column(name = "cust_pay_terms_cd")
    private String custPayTermsCd;

    @Column(name = "cust_pay_term_days")
    private String custPayTermDays;

    @Column(name = "cust_gl_acc_cd")
    private String custGlAccCd;

    @Column(name = "cust_bank_name")
    private String custBankName;

    @Column(name = "cust_bank_branch_name")
    private String custBankBranchName;

    @Column(name = "cust_bank_acc_no")
    private String custBankAccNo;

    @Column(name = "cust_bank_address1")
    private String custBankAddress1;

    @Column(name = "cust_bank_address2")
    private String custBankAddress2;

    @Column(name = "cust_bank_city")
    private String custBankCity;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "created_dt_disp")
    private String createdDtDisp;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "updated_dt_disp")
    private String updatedDtDisp;

    @PrePersist
    protected void onCreate() {
       // Auto-generated
    }

    @PreUpdate
    protected void onUpdate() {
       // Auto-generated
    }
}