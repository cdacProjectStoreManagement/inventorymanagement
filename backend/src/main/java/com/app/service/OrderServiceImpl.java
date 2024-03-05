package com.app.service;

import java.util.Iterator;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.app.dao.OrderDao;
import com.app.dao.OrderDetailsDao;
import com.app.dao.ProductDao;
import com.app.dao.SupplierDao;
import com.app.dao.WarehouseDao;
import com.app.dao.WarehouseInventoryDao;
import com.app.dto.OrderDetailsDto;
import com.app.dto.OrderDto;
import com.app.entities.OrderDetail;
import com.app.entities.OrderEntity;
import com.app.entities.Product;
import com.app.entities.Warehouse;
import com.app.entities.WarehouseInventory;
import com.app.exception_handler.custom_exception.ResourceNotFoundException;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderDao orderDao;

    @Autowired
    private WarehouseDao warehouseDao;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private OrderDetailsDao oderDetailDao;

    @Autowired
    private WarehouseInventoryDao inventoryDao;

    @Autowired
    private ProductDao productDao;

    @Autowired
    private SupplierDao supplierDao;

    @Override
    public List<OrderDto> getAllOrders(Long warehouseId) {
        Warehouse warehouse = warehouseDao.findById(warehouseId).orElseThrow(() -> new ResourceNotFoundException("Warehouse not found"));
        List<OrderEntity> orders = warehouse.getOrderList();
        return orders.stream()
                .map(order -> mapper.map(order, OrderDto.class))
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderDto addOrder(Long warehouseId, OrderDto order) {
        Warehouse warehouse = warehouseDao.findById(warehouseId)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found."));

        OrderEntity orderEntity = mapper.map(order, OrderEntity.class);
        orderEntity.setWarehouse(warehouse);

        List<OrderDetailsDto> modifiedOrderDetails = new CopyOnWriteArrayList<OrderDetailsDto>();

        for (OrderDetailsDto orderDetailDto : order.getOrderDetails()) {
            // Process and modify orderDetailDto if needed
            modifiedOrderDetails.add(orderDetailDto);
        }

        order.getOrderDetails().clear();
        order.getOrderDetails().addAll(modifiedOrderDetails);

        List<OrderDetail> orderDetails = new CopyOnWriteArrayList<>();

        for (OrderDetailsDto orderDetailDto : order.getOrderDetails()) {
            OrderDetail orderDetailEntity = mapper.map(orderDetailDto, OrderDetail.class);
            Product product = productDao.findById(orderDetailDto.getProduct().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Invalid Product."));
            orderDetailEntity.setProduct(product);
            orderDetailEntity.setOrder(orderEntity);
            orderDetails.add(orderDetailEntity);
        }

        orderEntity.setOrderDetails(orderDetails);
        orderEntity.setSupplier(supplierDao.findById(order.getSupplier().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid Supplier")));

        OrderEntity savedOrderEntity = orderDao.save(orderEntity);

        for (OrderDetail orderDetail : orderDetails) {
            orderDetail.setOrder(savedOrderEntity);
        }

        List<OrderDetail> savedOrderDetails = oderDetailDao.saveAll(orderDetails);
        savedOrderEntity.setOrderDetails(savedOrderDetails);

        for (OrderDetail orderDetail : savedOrderDetails) {
            updateWarehouseInventory(warehouse, orderDetail.getProduct(), orderDetail.getOrderQuantity());
        }

        return mapper.map(savedOrderEntity, OrderDto.class);
    }

    private void updateWarehouseInventory(Warehouse warehouse, Product product, Integer orderQuantity) {
        try {
            WarehouseInventory warehouseInventory = inventoryDao.findWarehouseByProductAndStore(warehouse, product);

            if (warehouseInventory == null) {
                warehouseInventory = new WarehouseInventory();
                warehouseInventory.setProduct(product);
                warehouseInventory.setWarehouse(warehouse);
                warehouseInventory.setQuantity(0); // Set an initial quantity if needed
            }

            warehouseInventory.setQuantity(warehouseInventory.getQuantity() + orderQuantity);
            inventoryDao.save(warehouseInventory);
        } catch (DataAccessException ex) {
            // Handle specific data access exceptions
            throw new RuntimeException("Error updating warehouse inventory", ex);
        } catch (Exception ex) {
            // Handle other exceptions
            throw new RuntimeException("Error updating warehouse inventory", ex);
        }
    }
}