//package com.kisan.pojo;
//
//import java.util.List;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import lombok.ToString;
//
//@Entity
//@NoArgsConstructor
//@Getter
//@Setter
//@ToString(callSuper = true)
//public class OrderItem extends BaseEntity{
//
//	 	@ManyToOne
//	    @JoinColumn(name = "order_id", nullable = false)
//	    private Orders order;
//
//	    @ManyToOne
//	    @JoinColumn(name = "product_id", nullable = false)
//	    private Products product;
//
//	    private int quantity;
//
//	    private double price; // Final price of this product in the order
//}
