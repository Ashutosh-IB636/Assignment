import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { CloudCog, ShoppingCart } from "lucide-react";
import Button from "./Button";
import Cart from "./Cart";
import { useUserContext } from "../contexts/useUserContext";
import Signin from "./Signin";

function Navbar({ onSearch, onFilter }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(useUserContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [displayCart, setDisplayCart] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
    navigate("/");
  };

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    onFilter(selectedFilter);
  };

  const handleCart = () => {
    setDisplayCart(true);
  };

  return (
    <nav className="fixed w-full top-0 bg-white z-50 border-b border-gray-300 px-5 py-2 flex justify-between items-center">
      <h1
        onClick={() => navigate("/")}
        className="text-xl font-bold text-gray-800 cursor-pointer"
      >
        My Store
      </h1>
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search by title or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition"
        >
          Search
        </button>
      </form>
      <select
        value={filter}
        onChange={handleFilterChange}
        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Filter by</option>
        <option value="price-low-high">Price: Low to High</option>
        <option value="price-high-low">Price: High to Low</option>
      </select>

      <div className="hover:cursor-pointer">
        {user ? (
          <div>
            <button onClick={() => setIsCartOpen(true)}>
              <ShoppingCart onClick={handleCart} />
            </button>
            {displayCart && <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
          </div>
        ) : (
          <Signin />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
