import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const LootCard = () => {
  let card;
  useEffect(() => {
    card = document.getElementById("loot-card");
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
    <Link to="/loot">
      <div id="loot-card" className="homepage-card loot">
        Loot
      </div>
    </Link>
  );
};

export default LootCard;
