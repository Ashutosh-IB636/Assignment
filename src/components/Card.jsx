import { useState } from "react";
import "../index.css";
import Button from "./Button";

const Card = ({ title, description, thumbnail, images, price }) => {
  const [count, setCount] = useState(0);


  const handleAddToCart = (e) => {
    e.stopPropagation();

  }

  const incrementCount = () => {
    setCount((prev)=>{
      return prev+1 > 20 ? prev : prev+1;
    })
  }

  const decrementCount = () => {
    setCount((prev)=>{
      return prev-1 < 0 ? prev : prev-1;
    })
  }

  return (
    <div className="max-w-2xs w-full flex-shrink-0 rounded-md overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow">
      {thumbnail && (
        <img className="w-full h-40 object-cover" src={thumbnail} alt={title} />
      )}
      <div className="p-3">
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        <p className="text-xs text-gray-600 mb-2">{description}</p>
        <span className="text-blue-500 font-semibold text-sm">
          Price: ${price}
        </span>
        <div className="">
          {/* <Button title={'Add to Cart'} onclick={handleAddToCart}/> */}
          <div className="flex flex-row" onClick={(e) => e.stopPropagation()}>
            <div className="h-full m-3 bg-gray-300 text-gray-800 px-3 py-2 rounded-full hover:bg-gray-400" onClick={() => decrementCount()}>-</div>
            <div className="pt-5">{count}</div>
            <div className="h-full m-3 bg-gray-300 text-gray-800 px-3 py-2 rounded-full hover:bg-gray-400" onClick={() => incrementCount()}>+</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
