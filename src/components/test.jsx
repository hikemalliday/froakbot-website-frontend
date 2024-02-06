export const Header = () => {
  return (
    <div className="header-main-container">
      <h1 className="logo">FROAKBOT</h1>
      <div className="header-buttons-container">
        <div className="header-button">FILTERS</div>|
        <Link to="/raids" className="header-button">
          RAIDS
        </Link>
        |
        <Link to="/loot" className="header-button">
          LOOT
        </Link>
        |
        <Link to="/characters" className="header-button">
          CHARACTERS
        </Link>
      </div>
    </div>
  );
};

export default Header;
