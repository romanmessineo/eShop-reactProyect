import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { FaRegUserCircle, FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { SET_ACTIVE_USER } from "../../redux/slice/authSlice";




const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
);

const cart = (
  <span className={styles.cart}>
    <Link to="/cart">
      Carrito
      <FaShoppingCart size={20} />
      <p>0</p>
    </Link>
  </span>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active} ` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  //Monitoreo de usuario iniciado
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        
       //const uid = user.uid;
       setDisplayName(user.displayName);
       
      dispatch(SET_ACTIVE_USER({
        email: user.email,
        useName: user.displayName,
        userID: user.uid,
      })) 
      } else {
       setDisplayName(""); 
      }
    });
  }, []);
  

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Sesion Cerrada");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <header>
      <div className={styles.header}>
        {logo}
        <nav
          className={
            showMenu ? `${styles["show-nav"]} ` : `${styles["hide-nav"]}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]}  ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]} `
            }
            onClick={hideMenu}
          ></div>

          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>
            <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink}>
                Contactanos
              </NavLink>
            </li>
          </ul>
          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <NavLink to="/login" className={activeLink}>
                Login
              </NavLink>
              <a href="#">
                <FaRegUserCircle size={16}/>
                Hola, {displayName}
              </a>
              <NavLink to="/register" className={activeLink}>
                Registrarse
              </NavLink>
              <NavLink to="/order-history" className={activeLink}>
                Mis Pedidos
              </NavLink>
              <NavLink to="/" onClick={logoutUser}>
                Salir
              </NavLink>
            </span>

            {cart}
          </div>
        </nav>

        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
