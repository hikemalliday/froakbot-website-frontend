import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <div className="header-main-container">
        <Link to="/" className="logo">
          FROAKBOT
        </Link>
        <div className="header-buttons-container">
          <div>
            <Link
              to="/raids"
              id="raids-header-button"
              className="header-button"
            >
              RAIDS
            </Link>
          </div>
          |
          <div>
            <Link to="/loot" id="loot-header-button" className="header-button">
              LOOT
            </Link>
          </div>
          |
          <div>
            <Link
              to="/characters"
              id="characters-header-button"
              className="header-button"
            >
              CHARACTERS
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
