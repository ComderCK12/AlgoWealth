package com.project.algowealth.repository;

import com.project.algowealth.model.NetWorthEntry;
import com.project.algowealth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NetWorthRepository extends JpaRepository<NetWorthEntry, Long> {

    List<NetWorthEntry> findByUser(User user);
}
