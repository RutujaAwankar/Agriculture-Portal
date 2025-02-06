package com.kisan.pojo;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
@Table(name = "cart",
		uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "checkedOut"}))
public class Cart extends BaseEntity
{
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore // Prevents infinite recursion during JSON serialization
    private UserEntity user;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> cartItems = new ArrayList<>();

    private double totalPrice; // Sum of all cart item prices

    private boolean checkedOut; // To mark if the cart has been converted to an order

    

}

//@Table(uniqueConstraints = ...) ensures that the combination of user_id and checkedOut must be unique.
//This means a user can have only one cart where checkedOut = false (active cart).
//The user can have multiple carts where checkedOut = true (historical orders).
