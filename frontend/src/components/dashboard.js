import React, { useState, useEffect } from 'react';
import '../styles/style.css';
import EditPage from './Edit';

const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [searchQuery, setSearchQuery] = useState(''); // Search state

  // Modal state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // Data states
  const [inventory, setInventory] = useState(() => {
  const saved = localStorage.getItem("inventory");
  return saved
    ? JSON.parse(saved)
    : [
        {
          itemId: 1,
          item: "Steel Pipes",
          description: "Industrial Grade",
          quantity: 150,
        },
        {
          itemId: 2,
          item: "Cement Bags",
          description: "Portland Cement",
          quantity: 320,
        },
      ];
});
  const [fleet, setFleet] = useState(() => {
  const saved = localStorage.getItem("fleet");
  return saved
    ? JSON.parse(saved)
    : [
        {
          vehicleId: 1,
          type: "Truck",
          id: "TR-101",
          status: "Available",
        },
        {
          vehicleId: 2,
          type: "Container",
          id: "CN-201",
          status: "In Transit",
        },
      ];
});
  const [storage, setStorage] = useState(() => {
  const saved = localStorage.getItem("storage");
  return saved
    ? JSON.parse(saved)
    : [
        {
          id: 1,
          type: "Warehouse",
          name: "Mumbai Hub",
          city: "Mumbai",
          state: "Maharashtra",
        },
        {
          id: 2,
          type: "Depot",
          name: "Delhi Depot",
          city: "Delhi",
          state: "Delhi",
        },
      ];
});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
  localStorage.setItem("inventory", JSON.stringify(inventory));
}, [inventory]);

useEffect(() => {
  localStorage.setItem("fleet", JSON.stringify(fleet));
}, [fleet]);

useEffect(() => {
  localStorage.setItem("storage", JSON.stringify(storage));
}, [storage]);

  // Load data by tab
  

  useEffect(() => {
  setSearchQuery('');
}, [activeTab]);

  // Tab click handler
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Generate next auto-increment ID
  const getNextId = (data, key) => {
    if (!data || data.length === 0) return '1';
    const ids = data.map(item => parseInt(item[key]) || 0);
    return String(Math.max(...ids) + 1);
  };

  // Save handler for create/update
  const handleSave = (data) => {
  if (activeTab === "inventory") {
    if (data.itemId && inventory.some(i => i.itemId === data.itemId)) {
      setInventory(prev =>
        prev.map(item =>
          item.itemId === data.itemId ? data : item
        )
      );
    } else {
      setInventory(prev => [
        ...prev,
        {
          ...data,
          itemId: getNextId(inventory, "itemId"),
        },
      ]);
    }
  }

  if (activeTab === "fleet") {
    if (data.vehicleId && fleet.some(v => v.vehicleId === data.vehicleId)) {
      setFleet(prev =>
        prev.map(item =>
          item.vehicleId === data.vehicleId ? data : item
        )
      );
    } else {
      setFleet(prev => [
        ...prev,
        {
          ...data,
          vehicleId: getNextId(fleet, "vehicleId"),
        },
      ]);
    }
  }

  if (activeTab === "storage") {
    if (data.id && storage.some(s => s.id === data.id)) {
      setStorage(prev =>
        prev.map(item =>
          item.id === data.id ? data : item
        )
      );
    } else {
      setStorage(prev => [
        ...prev,
        {
          ...data,
          id: getNextId(storage, "id"),
        },
      ]);
    }
  }

  setIsEditOpen(false);
};

  // Edit button handler
  const handleEdit = (item, index) => {
    setEditData({ ...item, index });
    setIsEditOpen(true);
  };

  // Filter data by search
  const getFilteredData = () => {
    const query = searchQuery.toLowerCase();
    const data = activeTab === 'inventory' ? inventory :
                 activeTab === 'fleet' ? fleet :
                 storage;

    if (!query) return data;

    return data.filter(item =>
      Object.values(item).some(val => String(val).toLowerCase().includes(query))
    );
  };

  // Render data table
  const renderTable = (data, fields) => (
    <table className="table">
      <thead>
        <tr>
          {fields.map((f, idx) => <th key={idx}>{f}</th>)}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {fields.map((f, idx) => <td key={idx}>{row[f.toLowerCase()]}</td>)}
            <td>
              <button className="btn btn-primary" onClick={() => handleEdit(row, i)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <section className="section">
      <h2>Company Dashboard</h2>
      <p className="muted">
        Connect a Google Sheet or use the in-app table to track inventory, fleet, and storage.
      </p>

      <div className="tabs">
        {['inventory', 'fleet', 'storage'].map(tab => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Search bar */}
      <div style={{ margin: '10px 0' }}>
        <input
          type="text"
          placeholder={`Search ${activeTab}...`}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{ padding: '5px', width: '250px' }}
        />
      </div>

      <div className="actions">
        <button className="btn btn-primary" onClick={() => { setEditData(null); setIsEditOpen(true); }}>
          Add {activeTab === 'inventory' ? 'Item' : activeTab === 'fleet' ? 'Vehicle' : 'Warehouse'}
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {activeTab === 'inventory' && renderTable(getFilteredData(), ['Item', 'Description', 'Quantity'])}
      {activeTab === 'fleet' && renderTable(getFilteredData(), ['Type', 'Id', 'Status'])}
      {activeTab === 'storage' && renderTable(getFilteredData(), ['Id', 'Type', 'Name', 'City', 'State'])}

      <EditPage
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSave}
        editData={editData}
        resourceType={activeTab}
      />
    </section>
  );
};

export default CompanyDashboard;
