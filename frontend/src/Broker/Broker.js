import "../App.css";
import "./Broker.css";
import { useState, useEffect } from "react";
import axios from "axios";
import BrokerHeader from "./BrokerHeader";
import BrokerList from "./BrokerList";

const Broker = ({ user }) => {
  const [brokers, setBrokers] = useState([]);
  const [brokerToBeUpdated, setBrokerToBeUpdated] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [crud, setCrud] = useState(false);
  // Filter criteria states
  const [fBrokers, setFBrokers] = useState([]);
  const [fCity, setFCity] = useState("");
  const [fProvince, setFProvince] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (fProvince === "" && fCity === "") {
      alert("Please Enter Correct Filers");
      return;
    }

    if (fProvince !== "" && fCity !== "") {
      setFBrokers(
        brokers.filter((broker) => {
          return (
            broker.location.province === fProvince &&
            broker.location.city === fCity
          );
        })
      );
    } else if (fProvince !== "") {
      setFBrokers(
        brokers.filter((broker) => {
          return broker.location.province === fProvince;
        })
      );
    } else if (fCity !== "") {
      setFBrokers(
        brokers.filter((broker) => {
          return broker.location.city === fCity;
        })
      );
    }
  };

  useEffect(() => {
    async function getBrokers() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/brokers/all-brokers"
        );
        setBrokers(response.data);
        setFBrokers(response.data);
      } catch (error) {
        alert("Cannot Load Data! " + error);
      }
    }
    getBrokers();
  }, [crud]);

  return (
    <div className="mainframe">
      <BrokerHeader
        user={user}
        showForm={showForm}
        setShowForm={setShowForm}
        brokerToBeUpdated={brokerToBeUpdated}
        setBrokerToBeUpdated={setBrokerToBeUpdated}
        setCrud={setCrud}
      />
      <form className="bfilter-container">
        <input
          className="city-name"
          type="text"
          value={fCity}
          onChange={(e) => setFCity(e.target.value)}
          placeholder="City"
        />

        <select
          className="province-name"
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

        <button onClick={handleSubmit}>Apply Filters</button>
        <button onClick={() => setFBrokers(brokers)}>All Brokers</button>
      </form>
      <BrokerList
        user={user}
        brokers={fBrokers}
        setShowForm={setShowForm}
        setBrokerToBeUpdated={setBrokerToBeUpdated}
        setCrud={setCrud}
      />
    </div>
  );
};

export default Broker;
