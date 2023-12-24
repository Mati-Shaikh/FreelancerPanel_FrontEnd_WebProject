import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Card, Spinner } from 'react-bootstrap';

const Reviews = () => {
  const [reviewsData, setReviewsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/Freelancer/getreviews', {
          headers: {
            token: token,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setReviewsData(data);
        } else {
          console.error('Failed to fetch reviews:', response.status);
        }
      } catch (error) {
        console.error('Error during reviews fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="reviews-container">
      
      <div className="heading-container">
        <div className="animated-heading"> <FontAwesomeIcon icon={faStar} className="star-icon" /> Reviews</div>
      </div>
      {loading && <Spinner animation="border" role="status" className="text-muted">
        <span className="sr-only">Loading...</span>
      </Spinner>}

      {!loading && reviewsData && (
        <Card className="border-0 shadow">
          <Card.Body>
            <div className="average-rating text-center">
              <h1><FontAwesomeIcon icon={faStar} className="star-icon" /></h1>
              <p className="mb-0">{reviewsData.AvgRating.toFixed(1)}</p>
            </div>
            <hr />
            <div className="feedback-details">
              <p className="mb-1">Total Number of Feedbacks: {reviewsData.TotalNumberofFeddbacks}</p>
              <p className="mb-0">Total Rating: {reviewsData.TotalRating}</p>
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Reviews;
