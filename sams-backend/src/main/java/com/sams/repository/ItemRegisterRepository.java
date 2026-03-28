package com.sams.repository;

import com.sams.entity.ItemRegister;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRegisterRepository extends JpaRepository<ItemRegister, Long> {
}