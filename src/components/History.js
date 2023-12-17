import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard,faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import Badge from 'react-bootstrap/Badge';

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');

        // Fetch payment history data from the API
        const response = await fetch('http://localhost:3000/api/Freelancer/getPaymentHistory', {
          headers: {
            token: token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPaymentHistory(data.paymentHistory);
        } else {
          console.error('Failed to fetch payment history:', response.status);
        }
      } catch (error) {
        console.error('Error during payment history fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, []);

  return (
    <div className="payment-history-container">
      <h1>
        <FontAwesomeIcon icon={faCreditCard} /> Payment History
      </h1>

      {loading && <p className="text-muted">Loading payment history...</p>}

      {!loading && paymentHistory.length === 0 && <p className="text-muted">No payment history available.</p>}

      {!loading && paymentHistory.length > 0 && (
        <ul className="list-group">
          {paymentHistory.map((payment) => (
            <li key={payment._id} className="list-group-item">
              {payment.message}
              <Badge pill variant="info" className="ml-2">
                {new Date(payment.createdAt).toLocaleString()}
              </Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PaymentHistory;
