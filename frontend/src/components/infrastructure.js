import React, { useState, useEffect } from 'react';
import '../styles/style.css';

const infrastructureData = [
  {
    id: 1,
    name: "Mumbai Port",
    city: "Mumbai",
    type: "port",
    ownership: "government",
    description: "Major cargo port with container handling and logistics services."
  },
  {
    id: 2,
    name: "Delhi Warehouse",
    city: "Delhi",
    type: "warehouse",
    ownership: "private",
    description: "Temperature-controlled warehouse with 24x7 operations."
  },
  {
    id: 3,
    name: "Chennai Harbour",
    city: "Chennai",
    type: "port",
    ownership: "government",
    description: "International harbour supporting import and export shipments."
  },
  {
    id: 4,
    name: "Bengaluru Hangar",
    city: "Bengaluru",
    type: "hangar",
    ownership: "private",
    description: "Aircraft storage and maintenance hangar."
  },
  {
    id: 5,
    name: "Hyderabad Depot",
    city: "Hyderabad",
    type: "depot",
    ownership: "private",
    description: "Truck depot with vehicle maintenance and loading facilities."
  },
  {
    id: 6,
    name: "Kolkata Warehouse",
    city: "Kolkata",
    type: "warehouse",
    ownership: "government",
    description: "Government warehouse with high-capacity storage."
  }
];

const Infrastructure = () => {
  const [city, setCity] = useState('');
  const [type, setType] = useState('any');
  const [ownership, setOwnership] = useState('any');
  const [results, setResults] = useState([]);

  useEffect(() => {
    setResults(infrastructureData);
  }, []);

  const handleSearch = () => {
    let filtered = infrastructureData;

    if (city.trim()) {
      filtered = filtered.filter(item =>
        item.city.toLowerCase().includes(city.toLowerCase())
      );
    }

    if (type !== 'any') {
      filtered = filtered.filter(item => item.type === type);
    }

    if (ownership !== 'any') {
      filtered = filtered.filter(item => item.ownership === ownership);
    }

    setResults(filtered);
  };

  return (
    <section className="section">
      <h2>Infrastructure Directory</h2>

      <p className="muted">
        Search warehouses, hangars, ports, and depots across India.
      </p>

      <div className="filters">
        <input
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="any">Any Type</option>
          <option value="warehouse">Warehouse</option>
          <option value="hangar">Airport Hangar</option>
          <option value="port">Port / Harbour</option>
          <option value="depot">Truck Depot</option>
        </select>

        <select
          value={ownership}
          onChange={(e) => setOwnership(e.target.value)}
        >
          <option value="any">Any Ownership</option>
          <option value="government">Government</option>
          <option value="private">Private</option>
        </select>

        <button
          className="btn btn-primary"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="cards grid-list">
        {results.length > 0 ? (
          results.map((item) => (
            <div key={item.id} className="card">
              <h3>{item.name}</h3>
              <p><strong>City:</strong> {item.city}</p>
              <p><strong>Type:</strong> {item.type}</p>
              <p><strong>Ownership:</strong> {item.ownership}</p>
              <p>{item.description}</p>
            </div>
          ))
        ) : (
          <p>No matching infrastructure found.</p>
        )}
      </div>
    </section>
  );
};

export default Infrastructure;