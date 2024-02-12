import React from "react";
import { Link } from "react-router-dom";
export const Dropdown = ({ to }) => {
  return (
    <>
      <Link to={to}>
        <div className="dropdown">FILTERS</div>
      </Link>
    </>
  );
};
