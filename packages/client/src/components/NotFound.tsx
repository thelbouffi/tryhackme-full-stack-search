import { useNavigate } from "react-router-dom";

interface NotFoundProps {
  message?: string;
  itemName?: string;
}

function NotFound({ message, itemName }: NotFoundProps) {
  const navigate = useNavigate();
  
  const defaultMessage = itemName
    ? `${itemName} not found.`
    : "Item not found.";

  return (
    <div className="card-container h-100">
      <div className="card not-found-card h-100">
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h3 className="card-title text-warning">Not Found</h3>
            <p className="card-text">{message || defaultMessage}</p>
          </div>
          <div className="d-flex justify-content-end mt-auto">
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/')}
            >
              Back to Search
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}

export default NotFound;
