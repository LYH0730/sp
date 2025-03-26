import { faAngleLeft, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  const userId = sessionStorage.getItem("email");

  const handleConnectCart = () => {
    if (!userId) navigate("/login");
    else navigate("/cart");
  };

  return (
    <header className="header">
      <div className="back">
        <FontAwesomeIcon icon={faAngleLeft} className="back-icon" onClick={goBack} />
      </div>

      <Link to="/" className="link">
        <h1 className="title">SmartParking</h1>
      </Link>

      <div className="link" onClick={handleConnectCart}>
        <FontAwesomeIcon
          icon={faCartShopping}
          className={location.pathname === "/cart" ? "cart-icon active-cart-icon" : "cart-icon"}
        />
      </div>
    </header>
  );
};

export default Header;
