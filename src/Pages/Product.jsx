import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import { Trash2 } from "lucide-react";
import Button from "../components/Button";
import { useCartContext } from "../contexts/useCartContext";
import { useUserContext } from "../contexts/useUserContext";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [thumbnail, setThumbnail] = useState('');
  const [newReview, setNewReview] = useState({
    name: "",
    rating: "",
    comment: "",
  });
  const [relatedProducts, setRelatedProducts] = useState([]);
  const relatedProductsRef = useRef(null);
  const [count, setCount] = useState(0);
  const { cartProducts, setCartProducts } = useContext(useCartContext);
  const { user } = useContext(useUserContext);


  const incrementCount = () => {
    setCount((prev) => {
      return prev + 1 > 20 ? prev : prev + 1;
    })
  }

  const decrementCount = () => {
    setCount((prev) => {
      return prev - 1 < 0 ? prev : prev - 1;
    })
  }

  const handleAddToCart = (e) => {
    if (count > 0) {
      let addProduct = {
        product: product,
        quantity: count,
      }
      setCartProducts((prev) => [...prev, addProduct]);
    }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://dummyjson.com/products/${id}`).then(
        (res) => res.json()
      );
      setProduct(response);
      setReviews(response.reviews || []);
      setThumbnail(response.thumbnail);
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {

    const fetchRelatedProducts = async () => {
      if (!product) return;

      const response = await fetch("https://dummyjson.com/products").then(
        (res) => res.json()
      );

      const related = response.products.filter(
        (p) =>
          p.id !== product.id &&
          (p.category === product.category ||
            p.tags.some((tag) => product.tags.includes(tag)))
      );

      setRelatedProducts(related);
    };

    fetchRelatedProducts();
  }, [product]);

  const handleScrollLeft = () => {
    relatedProductsRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const handleScrollRight = () => {
    relatedProductsRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (newReview.name.trim() && newReview.rating && newReview.comment.trim()) {
      const newReviewObject = {
        reviewerName: newReview.name,
        rating: parseInt(newReview.rating, 10),
        comment: newReview.comment,
        date: new Date().toISOString(),
      };
      setReviews((prev) => [...prev, newReviewObject]);
      setNewReview({ name: "", rating: "", comment: "" });
    }
  };

  const handleDeleteReview = (index) => {
    setReviews((prev) => prev.filter((_, idx) => idx !== index));
  };


  if (!product) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="mt-10 p-5">
      <div className="flex justify-center flex-col">
        <h1 className="text-3xl font-bold mb-5 self-center">{product.title}</h1>
        <img src={thumbnail} alt={product.title} className="w-72 mb-3 self-center" />
        <div className="flex gap-2 mb-5 self-center">

          {product.images.map((image, idx) => (
            <img
              key={String(image) + "-" + idx}
              src={image}
              alt={`Product ${idx}`}
              className="w-24 h-24 object-cover hover:cursor-pointer hover:h-26"
              onClick={() => setThumbnail(image)}
            />
          ))}
        </div>
        <p className="text-gray-700 mb-3 self-center">{product.description}</p>
        <p className="text-lg font-semibold mb-5 self-center">Price: ${product.price}</p>
        <div className="flex justify-center">
          <Button title={'Add to Cart'} onclick={handleAddToCart} />
          <div className="flex flex-row" onClick={(e) => e.stopPropagation()}>
            <div className="cursor-pointer h-auto m-3 bg-blue-300 text-gray-800 px-3 py-2 rounded-full hover:bg-gray-400" onClick={() => decrementCount()}>-</div>
            <div className="pt-5">{count}</div>
            <div className="cursor-pointer h-auto m-3 bg-blue-300 text-gray-800 px-3 py-2 rounded-full hover:bg-gray-400" onClick={() => incrementCount()}>+</div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-3">Reviews</h2>
      {reviews.length > 0 ? (
        <ul className="list-none p-0">
          {reviews.map((review, idx) => (
            <li
              key={idx}
              className="p-3 mb-3 flex justify-between items-center bg-gray-100 rounded-lg"
            >
              <div>
                <p className="font-bold">
                  {review.reviewerName}
                </p>
                <p className="text-gray-700">{review.comment}</p>
                <p className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
              <div className="font-bold text-gray-700">
                Rating: {review.rating} / 5
              </div>
              <button
                onClick={() => handleDeleteReview(idx)}
                className="ml-3  bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                <Trash2 />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No reviews yet.</p>
      )}

      <h3 className="text-xl font-semibold mt-5 mb-3">Add a Review</h3>
      <form onSubmit={handleAddReview} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">
            Name:
            <input
              type="text"
              value={newReview.name}
              onChange={(e) =>
                setNewReview((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Your name"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </label>
        </div>
        <div>
          <label className="block font-medium mb-1">
            Rating:
            <select
              value={newReview.rating}
              onChange={(e) =>
                setNewReview((prev) => ({ ...prev, rating: e.target.value }))
              }
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a rating</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </label>
        </div>
        <div>
          <label className="block font-medium mb-1">
            Comment:
            <textarea
              value={newReview.comment}
              onChange={(e) =>
                setNewReview((prev) => ({ ...prev, comment: e.target.value }))
              }
              placeholder="Write your review here..."
              rows="4"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit Review
        </button>
      </form>

      <h2 className="text-2xl font-semibold mt-10 mb-5">Related Products</h2>
      <div className="relative">
        <button
          onClick={handleScrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 text-gray-800 px-3 py-2 rounded-full hover:bg-gray-400"
        >
          &lt;
        </button>
        <div
          ref={relatedProductsRef}
          className="flex overflow-x-auto gap-4 scrollbar-hide"
        >
          {relatedProducts.map((relatedProduct) => (
            <Card
              key={relatedProduct.id}
              title={relatedProduct.title}
              description={relatedProduct.description}
              thumbnail={relatedProduct.thumbnail}
              price={relatedProduct.price}
            />
          ))}
        </div>
        <button
          onClick={handleScrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 text-gray-800 px-3 py-2 rounded-full hover:bg-gray-400"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Product;
