import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../components/Card";
import { CircleMinus, CirclePlus, Pencil, Trash2 } from "lucide-react";
import Button from "../components/Button";
import { useCartContext } from "../contexts/useCartContext";
import { useUserContext } from "../contexts/useUserContext";
import Rating from "../components/Rating";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [thumbnail, setThumbnail] = useState("");
  const [newReview, setNewReview] = useState({
    name: "",
    rating: "",
    comment: "",
  });
  const [relatedProducts, setRelatedProducts] = useState([]);
  const relatedProductsRef = useRef(null);
  const [count, setCount] = useState(0);
  const { cartProducts, setCartProducts } = useContext(useCartContext);
  const navigate = useNavigate();
  const [editingIndex, setEditingIndex] = useState(null);

  const incrementCount = () =>
    setCount((prev) => (prev < 20 ? prev + 1 : prev));
  const decrementCount = () => setCount((prev) => (prev > 0 ? prev - 1 : prev));

  const handleAddToCart = () => {
    if (count > 0) {
      setCartProducts((prev) => [...prev, { productId: product.id, quantity: count }]);
    }
  };

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setReviews(data.reviews || []);
        setThumbnail(data.thumbnail);
      });
  }, [id]);

  useEffect(() => {
    if (!product) return;
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        const related = data.products.filter(
          (p) =>
            p.id !== product.id &&
            (p.category === product.category ||
              p.tags?.some((tag) => product.tags?.includes(tag)))
        );
        setRelatedProducts(related);
      });
  }, [product]);

  const handleScroll = (dir) => {
    relatedProductsRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
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

      if (editingIndex !== null) {
        setReviews((prev) => [
          ...prev.slice(0, editingIndex),
          newReviewObject,
          ...prev.slice(editingIndex),
        ]);
        setEditingIndex(null);
      } else {
        setReviews((prev) => [...prev, newReviewObject]);
      }

      setNewReview({ name: "", rating: "", comment: "" });
    }
  };

  const formRef = useRef();

  const handleEditReview = (index) => {
    const selectedReview = reviews[index];
    setNewReview({
      name: selectedReview.reviewerName,
      rating: selectedReview.rating,
      comment: selectedReview.comment,
    });

    setReviews((prev) => prev.filter((_, idx) => idx !== index));
    setEditingIndex(index);

    // Scroll smoothly to the form
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const handleDeleteReview = (index) =>
    setReviews((prev) => prev.filter((_, idx) => idx !== index));

  const handleCardClick = (id) => navigate(`/product/${id}`);

  if (!product) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="p-6 mt-15 mx-auto">
      {/* Product Info */}
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        {/* Left: Image & Thumbnails */}
        <div className="flex flex-col items-center md:w-1/2">
          <img
            src={thumbnail}
            alt={product.title}
            className="w-72 h-72 object-contain mb-4 rounded shadow-md"
          />
          <div className="flex flex-wrap justify-center gap-2">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt=""
                onClick={() => setThumbnail(img)}
                className="w-16 h-16 object-cover rounded cursor-pointer hover:scale-105 transition-transform duration-150"
              />
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-lg font-semibold text-blue-700">
            Price: ${product.price}
          </p>

          {/* Cart Actions */}
          <div className="flex items-center gap-4 mt-6">
            <Button title="Add to Cart" onclick={handleAddToCart} />
            <div className="flex items-center gap-2">
              <button
                onClick={decrementCount}
                className="px-3 py-1 rounded-full cursor-pointer"
              >
                <CircleMinus />
              </button>
              <span className="text-xl">{count}</span>
              <button
                onClick={incrementCount}
                className="px-3 py-1 rounded-full cursor-pointer"
              >
                <CirclePlus />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {reviews.length > 0 ? (
          <ul className="space-y-4">
            {reviews.map((review, idx) => (
              <li
                key={idx}
                className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-between items-start"
              >
                <div>
                  <p className="font-semibold">{review.reviewerName}</p>
                  <p>{review.comment}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
                <Rating rating={review.rating} />
                <div className="flex flex-col items-end">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditReview(idx)}
                    >
                      <Pencil />
                    </button>
                    <button
                      onClick={() => handleDeleteReview(idx)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}

        {/* Add Review */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3">Add a Review</h3>
          <form onSubmit={handleAddReview} className="grid gap-4" ref={formRef}>
            <input
              type="text"
              value={newReview.name}
              onChange={(e) =>
                setNewReview({ ...newReview, name: e.target.value })
              }
              placeholder="Your name"
              required
              className="p-2 border rounded"
            />
            <select
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: e.target.value })
              }
              required
              className="p-2 border rounded"
            >
              <option value="">Select rating</option>
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r} -{" "}
                  {["Poor", "Fair", "Good", "Very Good", "Excellent"][r - 1]}
                </option>
              ))}
            </select>
            <textarea
              rows="4"
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              placeholder="Write your review..."
              required
              className="p-2 border rounded"
            />
            <button
              type="submit"
              className={`${editingIndex !== null
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-blue-600"
                } text-white px-4 py-2 rounded-md`}
            >
              {editingIndex !== null ? "Update Review" : "Submit Review"}
            </button>
          </form>
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
        <div className="relative">
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full z-10"
          >
            &lt;
          </button>
          <div
            ref={relatedProductsRef}
            className="flex overflow-x-auto gap-4 scrollbar-hide px-10"
          >
            {relatedProducts.map((p) => (
              <Card
                key={p.id}
                title={p.title}
                description={p.description}
                thumbnail={p.thumbnail}
                price={p.price}
                rating={p.rating}
                onclick={() => handleCardClick(p.id)}
              />
            ))}
          </div>
          <button
            onClick={() => handleScroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full z-10"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
