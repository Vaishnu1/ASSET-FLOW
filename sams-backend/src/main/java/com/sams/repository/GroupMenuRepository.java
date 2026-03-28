package com.sams.repository;

import com.sams.entity.GroupMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupMenuRepository extends JpaRepository<GroupMenu, Long> {
}