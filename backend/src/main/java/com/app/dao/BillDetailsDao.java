package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.BillDetails;

public interface BillDetailsDao extends JpaRepository<BillDetails, Long> {

}
