package com.kisan.pojo;

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
	
	 @Column(length = 100, nullable = false)
	  private String productName;
	 @Enumerated(EnumType.STRING)
	  private ProductType productType;
	  private int price; // to be added when user sells
	  private int totalStock; //the amount user has:
	  private int stockToSell; //the amount user wants to sell, cannot be less that total stock:
	  private boolean status; // for hard and soft delete
	  private boolean markedForSale; //when the user lists the item for selling
	  @Enumerated(EnumType.STRING)
	  private MetricType metric; //kg,l,unit
	  @Enumerated(EnumType.STRING)
	 
	@ManyToOne 
	@JoinColumn(name="user_id",nullable=false)
	private UserEntity user;
		
	private double totalBill;
	
	
}
