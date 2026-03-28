package com.sams.repository;

import com.sams.entity.MenuModules;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuModulesRepository extends JpaRepository<MenuModules, Long> {
}