package com.kisan.pojo;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;

import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class Orders extends BaseEntity
{ 
	
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

//    @OneToOne
    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Cart cart;
    
    private double totalAmount; // Total cost of the order

    @Enumerated(EnumType.STRING)
    private OrderStatus status; // PENDING, SHIPPED, DELIVERED, CANCELLED

    private LocalDateTime orderDate; 

    private String shippingAddress;
	
}
