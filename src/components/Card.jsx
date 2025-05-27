import '../index.css';

const Card = ({ title, description, image, price }) => {
  return (
    <div className="card">
      {image && <img className="card-image" src={image} alt={title} />}
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        <span>Price: {price}$</span>
      </div>
    </div>
  );
};

export default Card;
