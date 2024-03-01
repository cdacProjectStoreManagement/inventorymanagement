package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.OrderDetail;

public interface OrderDetailsDao extends JpaRepository<OrderDetail, Long> {

}
