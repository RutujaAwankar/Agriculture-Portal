package com.kisan.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.kisan.pojo.FarmingType;
import com.kisan.pojo.MetricType;
import com.kisan.pojo.ProductType;
import com.kisan.pojo.UserRole;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@JsonInclude(Include.NON_EMPTY)
public class ProductRespDTO extends BaseDTO{

	 
	private String productName;
		  private ProductType productType;
//		  private int price; // to be added when user sells
		  private int totalStock; //the amount user has:
//		  private int stockToSell; //the amount user wants to sell, cannot be less that total stock:
		  private boolean markedForSale; //when the user lists the item for selling
		  private MetricType metric; //kg,l,unit
		  private FarmingType farmingType;
		  private double landArea; //stored in acres

}
