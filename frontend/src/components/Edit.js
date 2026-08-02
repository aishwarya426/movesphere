import React, { useState, useEffect } from 'react';
import '../styles/style.css';

const EditPage = ({ isOpen, onClose, onSave, editData, resourceType }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('Warehouse');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  // Legal Support
  const [caseType, setCaseType] = useState('contract');
  const [courtName, setCourtName] = useState('');
  const [lawyerName, setLawyerName] = useState('');
  const [lawyerContact, setLawyerContact] = useState('');
  const [applicableActs, setApplicableActs] = useState('');

  useEffect(() => {
    setId(editData?.id || editData?.itemId || editData?.vehicleId || '');

    setName(editData?.name || editData?.status || '');
    setType(editData?.type || 'Warehouse');

    setDescription(editData?.description || '');
    setQuantity(editData?.quantity || '');

    setCity(editData?.city || '');
    setState(editData?.state || '');

    setCaseType(editData?.caseType || 'contract');
    setCourtName(editData?.courtName || '');
    setLawyerName(editData?.lawyerName || '');
    setLawyerContact(editData?.lawyerContact || '');
    setApplicableActs(editData?.applicableActs || '');
  }, [editData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {};

    if (resourceType === 'inventory') {
      data = {
        itemId: id,
        item: name,
        description,
        quantity: Number(quantity),
      };
    }

    if (resourceType === 'fleet') {
      data = {
        vehicleId: id,
        type,
        id: name,
        status: 'Available',
      };
    }

    if (resourceType === 'storage') {
      data = {
        id,
        type,
        name,
        city,
        state,
      };
    }

    if (resourceType === 'legalSupport') {
      data = {
        id,
        city,
        caseType,
        courtName,
        lawyerName,
        lawyerContact,
        applicableActs,
        description,
      };
    }

    onSave(data);
    onClose();
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal">
        <h2>{editData ? 'Edit Entry' : 'Add New Entry'}</h2>

        <form onSubmit={handleSubmit}>

          {(resourceType === 'storage' ||
            resourceType === 'fleet' ||
            resourceType === 'inventory') && (
            <>
              <label>Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </>
          )}

          {resourceType === 'storage' && (
            <>
              <label>Type</label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option>Warehouse</option>
                <option>Harbour</option>
                <option>Depot</option>
              </select>

              <label>City</label>

              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />

              <label>State</label>

              <input
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </>
          )}

          {resourceType === 'inventory' && (
            <>
              <label>Description</label>

              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <label>Quantity</label>

              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </>
          )}

          {resourceType === 'fleet' && (
            <>
              <label>Vehicle Type</label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option>Truck</option>
                <option>Container</option>
                <option>Trailer</option>
              </select>
            </>
          )}

          {resourceType === 'legalSupport' && (
            <>
              <label>City</label>

              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />

              <label>Case Type</label>

              <select
                value={caseType}
                onChange={(e) => setCaseType(e.target.value)}
              >
                <option value="contract">Contract disputes</option>
                <option value="customs">Customs & Trade</option>
                <option value="transport">Transport Compliance</option>
                <option value="environment">Environment & NOC</option>
              </select>

              <label>Court Name</label>

              <input
                value={courtName}
                onChange={(e) => setCourtName(e.target.value)}
                required
              />

              <label>Lawyer Name</label>

              <input
                value={lawyerName}
                onChange={(e) => setLawyerName(e.target.value)}
                required
              />

              <label>Lawyer Contact</label>

              <input
                value={lawyerContact}
                onChange={(e) => setLawyerContact(e.target.value)}
                required
              />

              <label>Applicable Acts</label>

              <input
                value={applicableActs}
                onChange={(e) => setApplicableActs(e.target.value)}
                required
              />

              <label>Description</label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </>
          )}

          <div className="edit-modal-buttons">
            <button type="submit" className="btn btn-primary">
              Save
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditPage;