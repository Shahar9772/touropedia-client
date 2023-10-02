import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (count === 0) {
        navigate('/login');
      }
      setCount((currentCount) => --currentCount);
    }, 1000);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div style={{ marginTop: '100px' }}>
      <h5>Redirecting you in {count} seconds</h5>
    </div>
  );
};

export default LoadingToRedirect;
