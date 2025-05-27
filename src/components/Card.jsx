import "../index.css";

const Card = ({ title, description, thumbnail, images, price }) => {
  return (
    <div className="max-w-xs w-full flex-shrink-0 rounded-md overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300">
      {thumbnail && (
        <img className="w-full h-40 object-cover" src={thumbnail} alt={title} />
      )}
      <div className="p-3">
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        <p className="text-xs text-gray-600 mb-2">{description}</p>
        <span className="text-blue-500 font-semibold text-sm">
          Price: ${price}
        </span>
      </div>
    </div>
  );
};

export default Card;
