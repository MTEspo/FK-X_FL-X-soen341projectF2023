import "../App.css";
import PropertyForm from "./PropertyForm";

const PropertyHeader = ({
  showForm,
  setShowForm,
  addProperty,
  propertyToBeUpdated,
  setPropertyToBeUpdated,
}) => {
  return (
    <div className="property-listing-header">
      <div className="property-listing-header-contents">
        <h1 className="property-listings">PROPERTY LISTINGS</h1>
        <button
          className="showForm"
          onClick={() => {
            setShowForm((show) => !show);
            setPropertyToBeUpdated(null);
          }}
        >
          {showForm || propertyToBeUpdated ? "CLOSE FORM" : "ADD A PROPERTY"}
        </button>
      </div>
      <div className="form-container">
        {showForm || propertyToBeUpdated ? (
          <PropertyForm
            setShowForm={setShowForm}
            addProperty={addProperty}
            propertyToBeUpdated={propertyToBeUpdated}
            setPropertyToBeUpdated={setPropertyToBeUpdated}
          />
        ) : null}
      </div>
    </div>
  );
};

export default PropertyHeader;
