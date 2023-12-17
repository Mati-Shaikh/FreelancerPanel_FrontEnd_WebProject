import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

const PresentProposals = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/Freelancer/getPresentProposals', {
          headers: {
            token: token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProjects(data.projects);
        } else {
          console.error('Failed to fetch present proposals:', response.status);
        }
      } catch (error) {
        console.error('Error during present proposals fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="present-proposals-container">
      <h1 className="present-proposals-heading">Present Proposals</h1>

      {loading && <p className="text-muted">Loading present proposals...</p>}

      {!loading && projects.length === 0 && <p className="text-muted">No present proposals available.</p>}

      {!loading && projects.length > 0 && (
        <div>
          {projects.map((project) => (
            <Card key={project._id} className="mb-3">
              <Card.Body>
                <Card.Title>{project.Title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{project.Username}</Card.Subtitle>
                <Card.Text>{project.Description}</Card.Text>
                <Badge pill variant="info" className="mt-2">
                  Deadline: {project.Deadline}
                </Badge>
                <Badge pill variant="success" className="ml-2 mt-2">
                  Budget: ${project.Budget}
                </Badge>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PresentProposals;
