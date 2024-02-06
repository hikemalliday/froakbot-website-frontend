import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const CharactersCard = () => {
  let card;
  useEffect(() => {
    card = document.getElementById("characters-card");
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
    <Link to="/characters">
      <div id="characters-card" className="homepage-card characters">
        Characters
      </div>
    </Link>
  );
};

export default CharactersCard;
