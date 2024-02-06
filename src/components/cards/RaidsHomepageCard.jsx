import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const RaidsCard = () => {
  let card;
  useEffect(() => {
    card = document.getElementById("raid-card");
    card.addEventListener("mousedown", () => {
      card.classList.add("active");
    });
    card.addEventListener("mouseup", () => {
      card.classList.remove("active");
    });
    card.addEventListener("mouseout", () => {
      card.classList.remove("active");
    });
  }, []);
  return (
    <Link to="/raids">
      <div id="raid-card" className="homepage-card raid">
        Raids
      </div>
    </Link>
  );
};

export default RaidsCard;
