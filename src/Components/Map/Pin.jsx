import { Marker, Popup } from "react-leaflet";
import { motion } from "framer-motion"; // For pop animation
import { Link } from "react-router-dom";
import L from "leaflet";
import iconurl from "../../assets/icons/home-address.png";
import { useEffect, useRef } from "react";

const customIcon = new L.Icon({
  iconUrl: iconurl,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function Pin({ item }) {
  const markerRef = useRef(null);

  // Bounce effect using leaflet's bounce method after the marker has been added to the map
  useEffect(() => {
    if (markerRef.current) {
      // Ensure the marker has been added to the map before calling any methods
      const marker = markerRef.current.leafletElement;
      if (marker) {
        marker.openPopup(); // Automatically open the popup
        marker.setBounce(); // Trigger bounce animation
      }
    }
  }, [item]);

  return (
    <motion.div
      initial={{ scale: 0 }} // Start small for pop animation
      animate={{ scale: 1 }} // Scale to normal size
      transition={{ type: "spring", stiffness: 500, damping: 20 }} // Smooth pop effect
    >
      <Marker
        position={[item.latitude, item.longitude]}
        icon={customIcon}
        ref={markerRef}
      >
        <Popup>
          <div className="popupContainer">
            <img src={item.img} alt="" className="popupImage" />
            <div className="textContainer">
              <Link to={`/${item.id}`} className="popupTitle">
                {item.name}
              </Link>
              <span className="popupInfo">{item.bedroom} bedroom</span>
              <b className="popupPrice">$ {item.price}</b>
            </div>
          </div>
        </Popup>
      </Marker>
    </motion.div>
  );
}

export default Pin;
