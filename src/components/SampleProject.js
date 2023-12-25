import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS if not globally imported

const AddProjectModal = ({ isOpen, onClose, onSave }) => {
  const [projectData, setProjectData] = useState({
    Title: '',
    Description: '',
    Technologies: [],
    ImageUrl: []
  });

  const handleChange = (e) => {
    if (e.target.name === 'Technologies') {
      setProjectData({ ...projectData, [e.target.name]: e.target.value.split(',') });
    } else {
      setProjectData({ ...projectData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(projectData);
    onClose(); // Close modal after saving
  };

  return (
    <div className={`modal fade ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }} tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Project</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title:</label>
                <input type="text" className="form-control" id="title" name="Title" value={projectData.Title} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description:</label>
                <textarea className="form-control" id="description" name="Description" value={projectData.Description} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="technologies" className="form-label">Technologies (comma separated):</label>
                <input type="text" className="form-control" id="technologies" name="Technologies" value={projectData.Technologies.join(',')} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="imageUrl" className="form-label">Image URL:</label>
                <input type="text" className="form-control" id="imageUrl" name="ImageUrl" value={projectData.ImageUrl} onChange={handleChange} />
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProjectModal;
