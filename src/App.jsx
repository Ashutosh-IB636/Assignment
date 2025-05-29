import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./Pages/Home";
import Product from "./Pages/Product"; // Assuming you have a Product component
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import { CartProvider } from "./contexts/useCartContext";

function App() {
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search query
  const [filter, setFilter] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilter = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  return (
    <>
      <CartProvider>
        <Router>
          <Navbar onSearch={handleSearch} onFilter={handleFilter} />
          <Routes>
            <Route
              path="/"
              element={<Home searchQuery={searchQuery} filter={filter} />}
            />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
