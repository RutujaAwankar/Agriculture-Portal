package com.kisan.pojo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class Products extends BaseEntity
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
	  
	  @Lob
	  private byte[] productImage; //large object to store image inside the database
		
	  private String imageName;
	  private String imageType;
	  
	  @Enumerated(EnumType.STRING)
	  private MetricType metric; //kg,l,unit
	  
	  @Enumerated(EnumType.STRING)
	  private FarmingType farmingType;
	  
	  private double landArea; //stored in acres
	  @ManyToOne 
	  @JoinColumn(name="user_id",nullable=false)
	  private UserEntity user;

	  
	  public boolean validStock() {
		  //to verify if the stock to be sold is the proper amount
		  
		  
		  //validate all proper information
		  boolean correct = true;
		  if(price<0) {
			  correct = false;
		  }
//		  if(totalStock)
		  
		  
		  return correct;
		  
	  }
}