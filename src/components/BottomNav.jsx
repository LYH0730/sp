import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faBarcode,
  faMagnifyingGlass,
  faMapLocationDot
} from "@fortawesome/free-solid-svg-icons";

import { Link, useLocation, useNavigate } from "react-router-dom";
import "./BottomNav.css";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("email");

  const handleConnectUser = () => {
    if (!userId) navigate("/login");
    else navigate("/mypage"); // 수정: /user → /mypage로 이동
  };

  const showNav = ["/", "/home", "/search", "/mypage", "/map", "/barcode"].includes(location.pathname);
  if (!showNav) return null;

  return (
    <nav className="nav-wrapper">
      <Link to="/map" className="nav-link">
        <FontAwesomeIcon
          icon={faMapLocationDot}
          className={location.pathname === "/map" ? "nav-item active-nav-item" : "nav-item"}
        />
      </Link>
      <Link to="/barcode" className="nav-link">
        <FontAwesomeIcon
          icon={faBarcode}
          className={location.pathname === "/barcode" ? "nav-item active-nav-item" : "nav-item"}
        />
      </Link>
      <Link to="/home" className="nav-link">
        <FontAwesomeIcon
          icon={faHome}
          className={location.pathname === "/home" ? "nav-item active-nav-item" : "nav-item inactive-nav-item"}
        />
      </Link>
      <Link to="/search" className="nav-link">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={location.pathname === "/search" ? "nav-item active-nav-item" : "nav-item"}
        />
      </Link>
      <div onClick={handleConnectUser} className="nav-link">
        <FontAwesomeIcon
          icon={faUser}
          className={location.pathname === "/mypage" ? "nav-item active-nav-item" : "nav-item"}
        />
      </div>
    </nav>
  );
};

export default BottomNav;
