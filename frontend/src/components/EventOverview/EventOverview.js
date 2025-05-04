import React ,{useState,useEffect} from "react";
import io from "socket.io-client";
import axios from '../../Services/Api';

const socket = io(`${process.env.REACT_APP_API_BASE_URL}`);

const EventOverview = ({eventId, eventName,dishSummary ,showRandomNames}) => {
  const [restaurantSummary, setRestaurantSummary] = useState({});
  const [selectedPeople, setSelectedPeople] = useState([]);
//   useEffect(() => {
//     socket.emit("join-event-room", eventId);
//     // Listen for real-time updates
//     socket.on("random-pick-result", (data) => {
//       console.log("Received update:", data.selected);
//       setSelectedPeople(data.selected);
//     });
//  // Fetch summary from backend and update immediately
//   const fetchSummary = async () => {
//   try {
//     const res = await axios.post(`/api/dishes/${eventId}/dishsummary`);
//     if (res.data) {
//       console.log("Received dish summary via axios:", res.data);
//       setRestaurantSummary(res.data); // 👈 Set initial summary
//     }
//   } catch (error) {
//     console.error("Error fetching summary:", error);
//   }
// };

// fetchSummary();
//     return () => {
//       socket.off("random-pick-result");
//     };
//   },[]);
//   useEffect(() => {
//     socket.emit("join-event-room", eventId); // Join specific event room
  
//     socket.on("dish-summary-update", (summary) => {
//       console.log("Received dish summary:", summary);
//       setRestaurantSummary(summary);
//     });
  
//     return () => {
//       socket.off("dish-summary-update");
//     };
//   }, [eventId]);

useEffect(() => {
  socket.emit("join-event-room", eventId); // ✅ Join only once per eventId

  // Listen for random pick result
  socket.on("random-pick-result", (data) => {
   
    setSelectedPeople(data.selected);
  });

  // Listen for dish summary update
  socket.on("dish-summary-update", (summary) => {
    
    setRestaurantSummary(summary);
  });

  // Fetch summary once on mount
  const fetchSummary = async () => {
    try {
      const res = await axios.post(`/api/dishes/${eventId}/dishsummary`);
      if (res.data) {
        
        setRestaurantSummary(res.data); // Set initial summary
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };

  fetchSummary();

  // Cleanup listeners on unmount or when eventId changes
  return () => {
    socket.off("random-pick-result");
    socket.off("dish-summary-update");
  };
}, [eventId]);

  return (
    <section>
    <div className="event-overview">
      <div className="event-header">
        <img src="/TeaPic.png" alt="Event" className="event-image" />
        <h2 className="event-title">{eventName}</h2>
      </div>

      <p className="selected-names">
      {showRandomNames && (
    <>
      <strong>Selected:</strong> {selectedPeople.map(p => p.userName).join(", ")}
    </>
  )}
      </p>
      
      {/* <div className="dish-summary">
        {Object.entries(dishSummary).map(([dish, count], index) => (
          <div key={index} className="dish-item">
            {dish} x{count}
          </div>
        ))}
      </div> */}
      <div class="summary-container">
      {Object.entries(restaurantSummary).map(([restaurant, summary]) => (
  <div className="restaurant-summary" key={restaurant}>
    <h1>{restaurant}</h1>
    <div className="dishes">
      {summary.dishes.map((dish, i) => (
        <span key={i}>{dish.name}: {dish.quantity}</span>
      ))}
    </div>
    <div className="totals">
      <span>Total Items: {summary.totalItems}</span>
      <span>Total Price: ₹{summary.totalPrice}</span>
    </div>
    <hr />
  </div>
))}
  </div>

      <style jsx>{`
        .event-overview {
          background: #fff;
          border-radius: 10px;
          padding: 20px;
          margin: 20px auto;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
          margin-top:100px;
          text-align: center;
        }
          
        .event-header {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .event-image {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 10px;
        }

        .event-title {
          margin: 0;
          font-size: 24px;
          font-weight: bold;
          color: #333;
        }

        .selected-names {
          margin-top: 15px;
          font-size: 16px;
          color: #555;
        }

        .dish-summary {
          margin-top: 15px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        }

        .dish-item {
          background-color: #f1f1f1;
          border-radius: 20px;
          padding: 8px 16px;
          font-size: 14px;
          color: #444;
        }
          .summary-container {
  width: 90%;
  max-width: 600px;
  margin: 30px auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #fff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.restaurant-summary {
  margin-bottom: 20px;
}

.restaurant-summary h2 {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #333;
}

.dishes {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  font-size: 1.7rem;
  color: #444;
}
  .totals {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  font-size: 1.3rem;
  color: #333;
}

.totals span {
  background-color: #e1e1e1;
  padding: 6px 12px;
  border-radius: 8px;
}

hr {
  margin-top: 12px;
  border: none;
  border-top: 1px solid #ddd;
}

        @media (max-width: 600px) {
          .event-image {
            width: 60px;
            height: 60px;
          }

          .event-title {
            font-size: 20px;
          }

          .selected-names,
          .dish-item {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
    </section>
  );
};

export default EventOverview;
