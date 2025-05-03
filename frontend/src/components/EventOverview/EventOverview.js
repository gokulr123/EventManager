import React ,{useState,useEffect} from "react";
import io from "socket.io-client";

const socket = io(`${process.env.REACT_APP_API_BASE_URL}`);

const EventOverview = ({eventId, eventName,dishSummary ,showRandomNames}) => {
  const [selectedPeople, setSelectedPeople] = useState([]);
  useEffect(() => {
    socket.emit("join-event-room", eventId);
    // Listen for real-time updates
    socket.on("random-pick-result", (data) => {
      console.log("Received update:", data.selected);
      setSelectedPeople(data.selected);
    });

    return () => {
      socket.off("random-pick-result");
    };
  },[]);
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

      <div className="dish-summary">
        {Object.entries(dishSummary).map(([dish, count], index) => (
          <div key={index} className="dish-item">
            {dish} x{count}
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
