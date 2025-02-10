package com.kisan.pojo;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity 
@Table(name = "category")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class Category extends BaseEntity{
	
	@Column(unique = true)
	private String name;
	
	@OneToMany(fetch = FetchType.LAZY,
			cascade = CascadeType.ALL)
	private List<Products> productList;
	

}
