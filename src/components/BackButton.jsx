// src/components/BackButton.jsx
import { useNavigate } from "react-router-dom";


export default function BackButton({ label = "My recipies" }) {
  const navigate = useNavigate();

  return (
    <button
      className="custom-back-btn"
      onClick={() => navigate(-1)}
      type="button"
    >
      <span className="arrow">&#8592;</span>
      <span className="back-label">{label}</span>
    </button>
  );
}
