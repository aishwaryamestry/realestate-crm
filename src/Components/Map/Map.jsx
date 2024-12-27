import { MapContainer, TileLayer } from "react-leaflet";
import { motion } from "framer-motion"; // Import framer-motion for animation
import Pin from "./Pin";

function Map({ items }) {
  return (
    <MapContainer
      center={[52.4797, -1.90269]}
      zoom={7}
      scrollWheelZoom={false}
      style={{ height: "500px", width: "100%", borderRadius: "20px" }} // Inline styles
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Map Marker Animation using framer-motion */}
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.5 }} // Initial state: invisible and small
          animate={{ opacity: 1, scale: 1 }} // Final state: fully visible and normal size
          transition={{ duration: 0.5, delay: 0.2 }} // Adding a delay for staggered animations
        >
          <Pin item={item} />
        </motion.div>
      ))}
    </MapContainer>
  );
}

export default Map;
