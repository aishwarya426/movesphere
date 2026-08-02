import React, { useState, useEffect } from "react";
import EditPage from "./Edit";
import "../styles/style.css";

const defaultData = [
  {
    id: 1,
    city: "Mumbai",
    caseType: "Contract Disputes",
    courtName: "Mumbai Commercial Court",
    lawyerName: "Adv. Rahul Mehta",
    lawyerContact: "+91 9876543210",
    applicableActs: "Indian Contract Act, 1872",
    description: "Commercial contract dispute resolution."
  },
  {
    id: 2,
    city: "Delhi",
    caseType: "Customs and Trades",
    courtName: "Delhi High Court",
    lawyerName: "Adv. Priya Sharma",
    lawyerContact: "+91 9123456780",
    applicableActs: "Customs Act, 1962",
    description: "Import and export customs regulations."
  },
  {
    id: 3,
    city: "Bengaluru",
    caseType: "Transport Compliance",
    courtName: "Karnataka High Court",
    lawyerName: "Adv. Arjun Rao",
    lawyerContact: "+91 9988776655",
    applicableActs: "Motor Vehicles Act",
    description: "Transport permits and logistics compliance."
  },
  {
    id: 4,
    city: "Chennai",
    caseType: "Environment and NOC",
    courtName: "National Green Tribunal",
    lawyerName: "Adv. Sneha Iyer",
    lawyerContact: "+91 9876501234",
    applicableActs: "Environment Protection Act",
    description: "Pollution control and environmental approvals."
  }
];

const LegalSupport = () => {
  const [city, setCity] = useState("");
  const [caseType, setCaseType] = useState("");
  const [results, setResults] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("legalData"));
    if (saved && saved.length) {
      setResults(saved);
    } else {
      setResults(defaultData);
      localStorage.setItem("legalData", JSON.stringify(defaultData));
    }
  }, []);

  const saveLocal = (data) => {
    setResults(data);
    localStorage.setItem("legalData", JSON.stringify(data));
  };

  const fetchData = () => {
    const all = JSON.parse(localStorage.getItem("legalData")) || defaultData;

    const filtered = all.filter((item) => {
      const cityMatch =
        !city || item.city.toLowerCase().includes(city.toLowerCase());

      const caseMatch =
        !caseType || item.caseType === caseType;

      return cityMatch && caseMatch;
    });

    setResults(filtered);
  };

  const handleSave = (data) => {
    const all = JSON.parse(localStorage.getItem("legalData")) || [];

    if (data.id) {
      const updated = all.map((item) =>
        item.id === data.id ? data : item
      );
      saveLocal(updated);
    } else {
      data.id = Date.now();

      saveLocal([...all, data]);
    }

    setIsEditOpen(false);
    fetchData();
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this record?")) return;

    const updated = results.filter((item) => item.id !== id);

    saveLocal(updated);
  };

  return (
    <section className="section">
      <h2>Legal & Court Support</h2>

      <p className="muted">
        Find courts, lawyers and legal regulations for logistics and trade.
      </p>

      <div className="filters">

        <input
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <select
          value={caseType}
          onChange={(e) => setCaseType(e.target.value)}
        >
          <option value="">All Case Types</option>
          <option>Contract Disputes</option>
          <option>Customs and Trades</option>
          <option>Transport Compliance</option>
          <option>Environment and NOC</option>
        </select>

        <button
          className="btn btn-primary"
          onClick={fetchData}
        >
          Search
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => {
            setEditData(null);
            setIsEditOpen(true);
          }}
        >
          Add New Entry
        </button>

      </div>

      <div className="legal-list">

        {results.length === 0 ? (
          <p>No legal records found.</p>
        ) : (
          results.map((item) => (
            <div className="legal-card" key={item.id}>

              <div className="legal-head">

                <div className="legal-title">

                  <span className="ico">🏛️</span>

                  <div>

                    <div className="name">{item.caseType}</div>

                    <div className="meta">
                      <span className="pill">{item.city}</span>
                    </div>

                  </div>

                </div>

              </div>

              <div className="legal-body">

                <p><strong>Court:</strong> {item.courtName}</p>

                <p>
                  <strong>Lawyer:</strong> {item.lawyerName}
                  <br />
                  {item.lawyerContact}
                </p>

                <p>
                  <strong>Applicable Acts:</strong> {item.applicableActs}
                </p>

                <p>{item.description}</p>

              </div>

              <div className="legal-actions">

                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setEditData(item);
                    setIsEditOpen(true);
                  }}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>

              </div>

            </div>
          ))
        )}

      </div>

      <EditPage
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSave}
        editData={editData}
        resourceType="legalSupport"
      />

    </section>
  );
};

export default LegalSupport;