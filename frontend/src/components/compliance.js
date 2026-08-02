import React, { useState, useEffect } from 'react';
import '../styles/style.css';

const complianceData = [
  {
    id: 1,
    category: 'Export Logistics',
    city: 'Mumbai',
    steps: [
      'Register your business with IEC (Import Export Code).',
      'Obtain GST registration.',
      'Complete customs documentation.',
      'Arrange port clearance before shipment.'
    ]
  },
  {
    id: 2,
    category: 'Road Transport',
    city: 'Delhi',
    steps: [
      'Obtain Commercial Vehicle Registration.',
      'Apply for National Permit.',
      'Purchase vehicle insurance.',
      'Maintain Pollution Under Control (PUC) certificate.'
    ]
  },
  {
    id: 3,
    category: 'Aviation Cargo',
    city: 'Bengaluru',
    steps: [
      'Obtain DGCA approvals.',
      'Ensure cargo screening compliance.',
      'Verify airline documentation.',
      'Follow aviation safety regulations.'
    ]
  },
  {
    id: 4,
    category: 'Ports & Customs',
    city: 'Chennai',
    steps: [
      'Submit Bill of Entry.',
      'Pay applicable customs duty.',
      'Complete cargo inspection.',
      'Receive customs clearance.'
    ]
  },
  {
    id: 5,
    category: 'Environment',
    city: 'Hyderabad',
    steps: [
      'Apply for Pollution Control Board NOC.',
      'Submit environmental assessment.',
      'Obtain waste disposal approval.',
      'Renew compliance annually.'
    ]
  }
];

const Compliance = () => {
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setRecords(complianceData);
  }, []);

  const loadComplianceRecords = () => {
    let filtered = complianceData;

    if (category) {
      filtered = filtered.filter(item =>
        item.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (city.trim()) {
      filtered = filtered.filter(item =>
        item.city.toLowerCase().includes(city.toLowerCase())
      );
    }

    setRecords(filtered);
  };

  return (
    <section className="section">

      <h2>Compliance Management</h2>

      <p className="muted">
        Navigate regulatory requirements with step-by-step guidance.
      </p>

      <form
        className="filters"
        onSubmit={(e) => {
          e.preventDefault();
          loadComplianceRecords();
        }}
      >

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Export">Export Logistics</option>
          <option value="Road">Road Transport</option>
          <option value="Aviation">Aviation Cargo</option>
          <option value="Ports">Ports & Customs</option>
          <option value="Environment">Environment</option>
        </select>

        <input
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button
          className="btn btn-primary"
          type="submit"
        >
          Search
        </button>

      </form>

      <br />

      {records.length === 0 ? (
        <p>No compliance records found.</p>
      ) : (
        records.map((record) => (
          <div
            className="cmp-card record"
            key={record.id}
            style={{ marginBottom: "20px" }}
          >
            <h3>{record.category}</h3>

            <p>
              <strong>City:</strong> {record.city}
            </p>

            <ol>
              {record.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>

          </div>
        ))
      )}

    </section>
  );
};

export default Compliance;