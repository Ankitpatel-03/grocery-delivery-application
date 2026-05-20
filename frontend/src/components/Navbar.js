import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  // Load cart count from localStorage
  useEffect(() => {
  const updateCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  };

  updateCart();

  window.addEventListener("storage", updateCart);

  return () => window.removeEventListener("storage", updateCart);
}, []);

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "30px",
      background: "#333",
      color: "#fff",
      textAlign:"left"
      
    }}>
      <h1>🛒 GroceryApp</h1>

      <div style={{ display: "flex", gap: "30px" }}>
        <Link to="/" style={{color: "#fff" }}>Home</Link>
        <Link to="/cart" style={{ color: "#fff" }}>
          Cart ({cartCount})
        </Link>
        <Link to="/login" style={{ color: "#fff" }}>Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;