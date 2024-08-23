import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorDisplayProps {
  message: string;
  details?: string;
  onClose?: () => void;
}

function ErrorDisplay({ message, details, onClose }: ErrorDisplayProps) {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
    navigate('/'); 
  };

  if (!isVisible) {
    return null;
  }
  
  return (
    <div className="error-overlay">
      <div className="error-modal">
        <button className="error-close-button" onClick={handleClose}>
          &times;
        </button>
        <h3 className="card-title text-danger">An error occurred</h3>
        <p className="card-text">{message}</p>
        {details && (
          <details>
            <summary>Error Details</summary>
            <pre className="mt-2">{details}</pre>
          </details>
        )}
      </div>
    </div>
  );
}

export default ErrorDisplay;
