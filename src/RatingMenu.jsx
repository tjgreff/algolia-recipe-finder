import { useConnector } from 'react-instantsearch';
import { connectRatingMenu } from 'instantsearch.js/es/connectors';

export function useRatingMenu(props) {
  return useConnector(connectRatingMenu, { ...props, max: 5 });
}

export function RatingMenu(props) {
    const { items, refine, createURL } = useRatingMenu(props);
  
    return (
        <ul className="rating-menu">
        {items.map((item) => {
          const totalStars = 5;
          const stars = item.value; // Ensuring it properly reflects the rating
        
          return (
            <li key={item.value}>
              {/* Star Display */}
              <div>
                {Array.from({ length: stars }).map((_, index) => (
                  <span key={`filled-${index}`} style={{ color: "#f39c12", fontSize: "18px" }}>
                    ★
                  </span>
                ))}
                {Array.from({ length: totalStars - stars }).map((_, index) => (
                  <span key={`empty-${index}`} style={{ color: "#ccc", fontSize: "18px" }}>
                    ★
                  </span>
                ))}
              </div>
              <p className="ratingText">& Up</p>
      
              {/* Rating Link */}
              <a
                className="ais-RefinementList-count"
                href={createURL(item.value)}
                onClick={(event) => {
                  event.preventDefault();
                  refine(item.value); // Ensure the selection properly includes 1-5, 2-5, etc.
                }}
              >
                {item.count}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }