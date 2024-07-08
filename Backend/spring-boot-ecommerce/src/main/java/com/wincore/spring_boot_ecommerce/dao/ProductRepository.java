package com.wincore.spring_boot_ecommerce.dao;

import com.wincore.spring_boot_ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {


}
