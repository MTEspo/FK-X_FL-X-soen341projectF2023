import "../App.css";
import "./Property.css";
import { useState, useEffect } from "react";
import axios from "axios";
import PropertyHeader from "./PropertyHeader";
import PropertyList from "./PropertyList";

const Property = ({ user }) => {
  const [properties, setProperties] = useState([]);
  const [propertyToBeUpdated, setPropertyToBeUpdated] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showViewForm, setShowViewForm] = useState(false);
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [crud, setCrud] = useState(false);
  // Filter criteria states
  const [displayProperties, setDisplayProperties] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [fStreetName, setFStreetName] = useState(null);
  const [fCity, setFCity] = useState(null);
  const [fProvince, setFProvince] = useState(null);
  const [fBedrooms, setFBedrooms] = useState(null);
  const [fBathrooms, setFBathrooms] = useState(null);
  const [fType, setFType] = useState(null);
  const [fStatus, setFStatus] = useState(null);
  const [fStreetNumber, setFStreetNumber] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNumber = /^\d+$/;
    const errors = {};

    if (fStreetNumber !== null) {
      if (!isNumber.test(fStreetNumber) || parseInt(fStreetNumber, 10) <= 0) {
        errors.price = "Street Number must be a positive number";
      }
    }
    if (minPrice !== null) {
      if (!isNumber.test(minPrice) || parseInt(minPrice, 10) <= 0) {
        errors.price = "Min Price must be a positive number";
      }
    }
    if (maxPrice !== null) {
      if (!isNumber.test(maxPrice) || parseInt(maxPrice, 10) <= 0) {
        errors.price = "Max Price must be a positive number";
      }
    }
    if (fBathrooms !== null) {
      if (!isNumber.test(fBathrooms) || parseInt(fBathrooms, 10) < 1) {
        errors.price = "Bathroom must be a non-zero positive number";
      }
    }
    if (fBedrooms !== null) {
      if (!isNumber.test(fBedrooms) || parseInt(fBedrooms, 10) < 1) {
        errors.price = "Bedroom must be a non-zero positive number";
      }
    }

    if (Object.keys(errors).length > 0) {
      alert("Validation errors: " + Object.values(errors).join("\n"));
      return;
    }

    console.log(
      minPrice,
      maxPrice,
      fCity,
      fProvince,
      fBedrooms,
      fBathrooms,
      fType,
      fStreetName,
      fStreetNumber
    );

    async function filterProperties() {
      try {
        const url =
          "http://localhost:8080/api/houses/filter?minPrice=" +
          Number(minPrice) +
          "&maxPrice=" +
          Number(maxPrice) +
          "&street=" +
          fStreetName +
          "&city=" +
          fCity +
          "&province=" +
          fProvince +
          "&bedrooms=" +
          fBedrooms +
          "&bathrooms=" +
          fBathrooms +
          "&type=" +
          fType +
          "&streetNumber=" +
          Number(fStreetNumber);
        const response = await axios.get(url);
        setDisplayProperties(response.data);
      } catch (error) {
        alert("Cannot Filter Data! " + error);
      }
    }
    filterProperties();
    alert("Filters Applied");
  };

  useEffect(() => {
    async function getProperties() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/houses/all-houses"
        );
        setProperties(response.data);
        setDisplayProperties(response.data);
      } catch (error) {
        alert("Cannot Load Data! " + error);
      }
    }
    getProperties();
  }, [crud]);

  return (
    <div className="mainframe">
      <PropertyHeader
        user={user}
        showForm={showForm}
        setShowForm={setShowForm}
        propertyToBeUpdated={propertyToBeUpdated}
        setPropertyToBeUpdated={setPropertyToBeUpdated}
        setShowViewForm={setShowViewForm}
        setShowOfferForm={setShowOfferForm}
        setCrud={setCrud}
      />
      <form className="filter-container">
        <div className="sub-container-1">
          <select value={fStatus} onChange={(e) => setFStatus(e.target.value)}>
            <option value="">Choose Status:</option>
            <option value="FOR_SALE">For Sale</option>
            <option value="T0_LEASE">To Lease</option>
          </select>

          <select value={fType} onChange={(e) => setFType(e.target.value)}>
            <option value="">Choose Type:</option>
            <option value="CONDO">Condo</option>
            <option value="APARTMENT">Apartment</option>
            <option value="HOUSE">House</option>
          </select>

          <input
            className="street-number"
            type="text"
            value={fStreetNumber}
            onChange={(e) => setFStreetNumber(e.target.value)}
            placeholder="Street #"
          />

          <input
            className="street-name"
            type="text"
            value={fStreetName}
            onChange={(e) => setFStreetName(e.target.value)}
            placeholder="Street Name"
          />

          <input
            className="city-name"
            type="text"
            value={fCity}
            onChange={(e) => setFCity(e.target.value)}
            placeholder="City"
          />
        </div>
        <div className="sub-container-2">
          <select
            className="province"
            value={fProvince}
            onChange={(e) => setFProvince(e.target.value)}
          >
            <option value="">Province:</option>
            <option value="Ontario">Ontario</option>
            <option value="Quebec">Quebec</option>
            <option value="Nova Scotia">Nova Scotia</option>
            <option value="Manitoba">Manitoba</option>
            <option value="British Columbia">British Columbia</option>
            <option value="Prince Edward Island">Prince Edward Island</option>
            <option value="Saskatchewan">Saskatchewan</option>
            <option value="Alberta">Alberta</option>
            <option value="Newfoundland and Labrador">
              Newfoundland and Labrador
            </option>
            <option value="Northwest Territories">Northwest Territories</option>
            <option value="Yukon">Yukon</option>
            <option value="Nunavut">Nunavut</option>
          </select>

          <input
            type="text"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />

          <input
            type="text"
            placeholder="Bedrooms"
            value={fBedrooms}
            onChange={(e) => setFBedrooms(e.target.value)}
          />
          <input
            type="text"
            placeholder="Bathrooms"
            value={fBathrooms}
            onChange={(e) => setFBathrooms(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit}>Apply Filters</button>
        <button onClick={() => setDisplayProperties(properties)}>
          All Properties
        </button>
      </form>
      <PropertyList
        user={user}
        properties={displayProperties}
        setShowForm={setShowForm}
        setPropertyToBeUpdated={setPropertyToBeUpdated}
        showViewForm={showViewForm}
        setShowViewForm={setShowViewForm}
        showOfferForm={showOfferForm}
        setShowOfferForm={setShowOfferForm}
        setCrud={setCrud}
      />
    </div>
  );
};

export default Property;
