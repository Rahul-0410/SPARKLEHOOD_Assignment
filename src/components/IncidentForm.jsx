import { useState } from "react";

export function IncidentForm({ onClose, onSubmit }) {
  // Form state management
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    severity: "",
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data and submit if all fields are filled
    if (formData.title && formData.description && formData.severity) {
      onSubmit({
        ...formData,
        id: Date.now(),
        reported_at: new Date().toISOString(),
      });
      // Reset form and close modal
      setFormData({ title: "", description: "", severity: "" });
      onClose();
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Modal header with title and close button */}
        <div className="modal-header">
          <h2>Report New Incident</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Title input field */}
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter incident title"
            />
          </div>

          {/* Description textarea */}
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe the incident in detail"
            ></textarea>
          </div>

          {/* Severity selection dropdown */}
          <div className="form-group">
            <label htmlFor="severity">Severity</label>
            <select
              id="severity"
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              required
            >
              <option value="">Select severity</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Form action buttons */}
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Submit Incident
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
