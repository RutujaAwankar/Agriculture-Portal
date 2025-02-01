package com.kisan.dto;


import com.kisan.pojo.FarmingType;
import com.kisan.pojo.MetricType;
import com.kisan.pojo.ProductType;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor      
@ToString
public class ProductRequestDTO
{
	  private String productName;
	  private ProductType productType;
	  private int totalStock; //the amount user has:
	  private MetricType metric; //kg,l,unit
	  private double landArea; //stored in acres
}