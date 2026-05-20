import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [cart, setCart] = useState([]);

  // Load cart
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // Remove item
  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));

    // update navbar
    window.dispatchEvent(new Event("storage"));
  };

  // Place order
  const placeOrder = async () => {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/orders",
      {
        items: cart,
        total,
        address: "My Home"
      },
      {
        headers: { Authorization: token }
      }
    );

    localStorage.removeItem("cart");
    setCart([]);

    window.dispatchEvent(new Event("storage"));

    alert("✅ Order placed successfully!");
  };

  return (
    <div className="container">
      <h1 className="mb-4">🛒 Your Cart</h1>

      <div className="cart-container">
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          <>
            {cart.map((item, i) => (
              <div className="cart-item" key={i}>
                <span>{item.name}</span>
                <span>
                  ₹{item.price}
                  <button
                    className="btn btn-sm btn-danger ms-2"
                    onClick={() => removeItem(i)}
                  >
                    ❌
                  </button>
                </span>
              </div>
            ))}

            <div className="cart-total">
              Total: ₹{total}
            </div>

            <button className="btn btn-primary mt-3" onClick={placeOrder}>
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;