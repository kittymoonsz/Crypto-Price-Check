const Header: React.FC = () => (
  <div className="header">
    <div className="header-left">
      <a href="#" className="logo">Logo</a>
      <div id="balance">Balance: $100</div>
    </div>
    <div className="header-center">
      <a href="#">Charts</a>
      <a href="#">Portfolio</a>
    </div>
    <div className="header-right">
      <a href="#">Account</a>
      <a href="#">Settings</a>
    </div>
  </div>
);

export default Header;

