package com.kisan.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity // Marks this class as a JPA entity to be mapped to a database table
@NoArgsConstructor // Lombok annotation to generate a no-args constructor
@Getter // Lombok annotation to generate getters for all fields
@Setter // Lombok annotation to generate setters for all fields
@ToString(callSuper = true) // Includes fields from the superclass in toString()
public class Products extends BaseEntity { // Inherits common fields like id, timestamps, etc.

    @Column(length = 100, nullable = false) // Product name with max 100 characters, cannot be null
    private String productName;

    @Enumerated(EnumType.STRING) // Stores the enum as a string in the DB (e.g., VEGETABLE, FRUIT)
    private ProductType productType;

    private int price; // Price of the product, set when the user lists the item for sale

    private int totalStock; // Total quantity the user has in stock

    private int stockToSell; // Quantity the user wants to sell; should not exceed totalStock

    private boolean status; // Indicates if the product is active (soft delete flag)
    @Column(nullable = false)
    private boolean markedForSale=false; // True when the user lists the product for sale

    @Enumerated(EnumType.STRING) // Enum for measurement units (e.g., KG, LITERS, UNITS)
    private MetricType metric;

    @Enumerated(EnumType.STRING) // Enum for type of farming (e.g., SERICULTURE, HORTICULTURE)
    private FarmingType farmingType;

    private double landArea; // Land area used for farming the product, measured in acres

    @ManyToOne(fetch = FetchType.LAZY) // Many products can belong to one user
    @JoinColumn(name = "user_id", nullable = false) // Foreign key linking to the UserEntity
    @JsonIgnore // Prevents infinite recursion during JSON serialization
    private UserEntity user;

    // Business logic to verify if the stock details are valid
    public boolean validStock() {
        // Ensures price is non-negative and stockToSell does not exceed totalStock
        if (price < 0 || totalStock < stockToSell) {
            return false;
        }
        return true;
    }
}
