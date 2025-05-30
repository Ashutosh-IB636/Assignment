
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt, faStar as faEmptyStar } from "@fortawesome/free-solid-svg-icons";

const Rating = ({ rating }) => {
    const totalStars = 5;
    return (
        <div>
            {Array.from({ length: totalStars }, (_, index) => {
                if (index < Math.floor(rating)) {
                    return <FontAwesomeIcon key={index} icon={faStar} color="gold" />;
                } else if (index < rating) {
                    return <FontAwesomeIcon key={index} icon={faStarHalfAlt} color="gold" />;
                } else {
                    return <FontAwesomeIcon key={index} icon={faEmptyStar} color="gray" />;
                }
            })}
        </div>
    );
};

export default Rating;

// export default function App() {
//   return <StarRating rating={3.5} />;
// };
