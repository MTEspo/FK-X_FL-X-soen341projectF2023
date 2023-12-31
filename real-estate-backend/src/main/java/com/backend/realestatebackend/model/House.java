package com.backend.realestatebackend.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class House {

    public House(House_Address address, HouseStatus status, HouseType type, Long price, Integer numberOfBedrooms,
                 Integer numberOfBathrooms, Broker broker, Integer unit,Double area) {
        this.address = address;
        this.status = status;
        this.type = type;
        this.area = area;
        this.price = price;
        this.numberOfBedrooms = numberOfBedrooms;
        this.numberOfBathrooms = numberOfBathrooms;
        this.broker = broker;
        this.unit = unit;
    }


    public enum HouseStatus {
        FOR_SALE, FOR_LEASE
    }

    public enum HouseType {
        CONDO, APARTMENT, HOUSE
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long houseId;
    @Embedded
    @NotNull
    @Valid
    private House_Address address;

    @Column(name = "area")
    private Double area;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    @NotNull(message = "Status cannot be null")
    private HouseStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    @NotNull(message = "Type cannot be null")
    private HouseType type;
    @NotNull
    @Column(name = "price")
    @Min(value = 0, message = "Price cannot be negative")
    private Long price;

    @Column(name = "bedrooms")
    @NotNull
    @Min(value = 0, message = "Number of bedrooms cannot be negative")
    private Integer numberOfBedrooms;

    @Column(name = "bathrooms")
    @NotNull
    @Min(value = 0, message = "Number of bathrooms cannot be negative")
    private Integer numberOfBathrooms;

    @JsonProperty(value = "broker", required = false)
    @ManyToOne
    @JoinColumn(name = "broker_id")
    private Broker broker;

    @Column(name = "unit")
    private Integer unit;

    @Column(name = "description")
    private String house_description;

    @Override
    public int hashCode() {
        return Objects.hash(houseId);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        House otherHouse = (House) obj;
        return this.houseId.equals(otherHouse.houseId);
    }

}
