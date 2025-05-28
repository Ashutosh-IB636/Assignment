import { useEffect, useState, useCallback } from "react";
import Card from "../components/Card.jsx";
import Loader from "../components/Loader.jsx";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'


Home.propsType = {
  searchQuery: PropTypes.string.isRequired,
  filter:PropTypes.string.isRequired
}

function Home({ searchQuery, filter }) {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loader, setLoader] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const fetchMore = async () => {
    if (loader || !hasMore) return;
    setLoader(true);
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${skip}`
    ).then((res) => res.json());

    if (response.products.length === 0) {
      setHasMore(false);
    } else {
      setAllProducts((prev) => [...prev, ...response.products]);
      setSkip((prev) => prev + 8);
    }
    setLoader(false);
  };

  useEffect(() => {
    fetchMore();
  }, []);

  // Filter and search
  useEffect(() => {
    let updatedProducts = [...allProducts];

    if (searchQuery) {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    if (filter === "price-low-high") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (filter === "price-high-low") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  }, [searchQuery, filter, allProducts]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 1
    ) {
      fetchMore();
    }
  }, [loader, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  const updateThumbnail = () => {
    
  }

  return (
    <div className="flex flex-col gap-4 mt-15 p-5 items-center md:flex-row md:flex-wrap md:justify-center md:items-start">
      {filteredProducts.map((product, idx) => (
        <div
          key={String(product.id) + "-" + idx}
          onClick={() => handleCardClick(product.id)}
          className="cursor-pointer"
        >
          <div className="flex gap-3 mb-5 flex-row flex-wrap h-12 w-12">
            {product.images.map((image, idx) => (
              <img
                key={idx}
                src={image}
                alt={`Product ${idx}`}
                onClick={updateThumbnail}
              />
            ))}
          </div>
          <Card
            title={product.title}
            description={product.description}
            thumbnail={product.thumbnail}
            images={product.images}
            price={product.price}
          />
        </div>
      ))}
      {loader && hasMore && (
        <div className="flex justify-center items-center p-8">
          <Loader />
        </div>
      )}
      {!hasMore && (
        <p className="text-center text-gray-500">No more products to load</p>
      )}
    </div>
  );
}

export default Home;
