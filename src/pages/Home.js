import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data));
  }, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const addToCart = (product) => {
    const updated = [...cart, product];
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4 text-center">🛒 Grocery Products</h2>

      <div className="row">
        {products.map((p) => (
          <div className="col-md-3 mb-4" key={p._id}>

            <div className="card h-100 shadow-sm">
              <img
                src={p.image}
                className="card-img-top"
                alt={p.name}
              />

              <div className="card-body text-center">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text text-success fw-bold">
                  ₹{p.price}
                </p>

                <button
                  className="btn btn-success w-100"
                  onClick={() => addToCart(p)}
                >
                  Add to Cart
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Home;