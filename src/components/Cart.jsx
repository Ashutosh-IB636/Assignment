import { useContext, useEffect, useState } from "react";
import { useCartContext } from "../contexts/useCartContext";

const Cart = ({ isOpen, onClose }) => {
  const { cartProducts, setCartProducts } = useContext(useCartContext);
  const [total, setTotal] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    cartProducts.map((prod)=>{
      fetch(`https://dummyjson.com/products/${prod.productId}`)
      .then((res) => res.json())
      .then((data) => {
        data.quantity = prod.quantity;
        setAllProducts((prev)=>[...prev, data]);
        setTotal((prev)=>prev+(data.price*data.quantity));
      });
    })
  }, []);

  const handleCheckout = () => {
    setIsCartOpen(false); 
    setTimeout(() => {
      setShowConfirmation(true);
    }, 200);
    setCartProducts([]);
    setAllProducts([]);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 z-40 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-lg bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            className="text-3xl text-gray-400 hover:text-red-500 transition"
            onClick={onClose}
            aria-label="Close cart"
          >
            &times;
          </button>
        </div>

        <div className="p-6">
          <h3 className="text-3xl font-extrabold mb-6 text-purple-800 text-center tracking-tight">
            Your Cart
          </h3>
          {allProducts.length > 0 ? (
            <div className="space-y-6">
              {allProducts.map((prod, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 bg-gray-50 rounded-xl shadow-sm p-4 border hover:shadow-md transition"
                >
                  <img
                    src={prod.thumbnail}
                    className="w-20 h-20 object-cover rounded-lg border"
                    alt={prod.title}
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {prod.title}
                    </h4>
                    <div className="flex  gap-2 mt-2 flex-col">
                      <span className="text-gray-500 font-semibold">Price: {prod.price}</span>
                      <span className="text-gray-500 text-xs">Qty: {prod.quantity}</span>
                    </div>
                  </div>
                  <div className="text-right">
                      <span className="text-gray-500 font-semibold">${prod.price}X{prod.quantity}</span>
                    <span className="block text-xl font-bold text-purple-700">
                      ${`${prod.price}`*`${prod.quantity}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-12">
              <svg
                className="mx-auto mb-4 w-16 h-16 text-gray-200"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 0 0 6.6 17h10.8a1 1 0 0 0 .95-.68L21 13M7 13V6h13" />
              </svg>
              <p>No items in cart</p>
            </div>
          )}

          {/* Total */}
          <div className="mt-8 bg-purple-50 p-6 rounded-2xl shadow-inner">
            <div className="flex justify-between text-2xl font-bold mb-4 text-purple-900">
              <span>Total</span>
              <span>${`${total.toFixed(1)}`}</span>
            </div>
            <button
              className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-xl font-semibold text-lg shadow hover:from-purple-700 hover:to-purple-900 transition"
              disabled={cartProducts.length === 0}
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 w-[90%] max-w-md text-center relative">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Thank you!
            </h2>
            <p className="text-gray-600">
              Your order has been placed successfully.
            </p>
            <button
              onClick={() => setShowConfirmation(false)}
              className="mt-6 px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
