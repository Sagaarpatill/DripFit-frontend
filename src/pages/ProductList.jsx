import React, { useEffect, useState } from "react";
import axios from "../axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../stylesheets/CarList.css";
import Banner from "../components/Banner";
import { useLocation } from "react-router-dom";

const ProductList = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const brand = params.get("brand");
  const gender = params.get("gender");
  const category = params.get("category");
  const name = params.get("name");

  let query = brand || gender || category || name || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching products for query:", query);

      try {
        const response = await axios.get(`/product/get/${query}`);
        setProducts(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div>
      <Navbar />
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : products.length > 0 ? (
        products.map((prod) => (
          <Banner
            key={prod._id}
            id={prod._id}
            name={prod.Name}
            category={prod.Category}
            image={prod.Image}
            price={prod.Price}
            brand={prod.Brand}
            desc={prod.Desc}
          />
        ))
      ) : (
        <p>No products found.</p>
      )}
      <Footer />
    </div>
  );
};

export default ProductList;
