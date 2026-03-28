package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_emp_cust_supp", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmpCustSupp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "cust_supp_emp_id")
    private Long custSuppEmpId;

    @Column(name = "cust_supp_emp_name")
    private String custSuppEmpName;

    @Column(name = "cust_supp_emp_email_id")
    private String custSuppEmpEmailId;

    @Column(name = "cust_supp_emp_contact_no")
    private String custSuppEmpContactNo;

    @Column(name = "cust_supp_emp_code")
    private String custSuppEmpCode;

    @PrePersist
    protected void onCreate() {
       // Auto-generated
    }

    @PreUpdate
    protected void onUpdate() {
       // Auto-generated
    }
}