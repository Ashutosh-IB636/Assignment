
import "../index.css";
import Rating from "./Rating";

const Card = ({ title, description, thumbnail, images, price, rating, onclick }) => {

  return (
    <div className="max-w-2xs w-full flex-shrink-0 rounded-md overflow-hidden shadow-md cursor-pointer hover:shadow-2xl transition-shadow" onClick={onclick}>
      {thumbnail && (
        <img className="w-full h-40 object-cover" src={thumbnail} alt={title} />
      )}
      <div className="p-3">
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        <p className="inline text-xs text-gray-600 mb-2">{description.substring(0, 70)}</p>
        <span className="inline hover:underline cursor-pointer hover:text-blue-500">...read more</span>
        <div className="flex flex-row">
          <span className="text-blue-500 font-semibold text-sm">
            Price: ${price}
          </span>

          <div className="pl-15"><Rating rating={rating} /></div>
        </div>
      </div>
    </div >
  );
};

export default Card;
