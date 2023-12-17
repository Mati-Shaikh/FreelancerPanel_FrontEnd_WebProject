import React, { useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';

const NewProposals = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewProposals = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/Freelancer/getnewProposal', {
          headers: {
            token: token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProjects(data.projects);
        } else {
          console.error('Failed to fetch new proposals:', response.status);
        }
      } catch (error) {
        console.error('Error during new proposals fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewProposals();
  }, []);

  return (
    <div className="new-proposals-container">
      <h1 className="new-proposals-heading">New Proposals</h1>

      {loading && <p className="text-muted">Loading new proposals...</p>}

      {!loading && projects.length === 0 && <p className="text-muted">No new proposals available.</p>}

      {!loading && projects.length > 0 && (
        <div>
          {projects.map((project) => (
            <div key={project._id} className="mb-3">
              <h3>{project.Title}</h3>
              <p>{project.Description}</p>
              <Badge pill variant="info">
                {project.Status}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewProposals;
