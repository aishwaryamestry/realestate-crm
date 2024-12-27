import { Link } from "react-router-dom";

export const Card = ({ property }) => (
  <Link to={`/${property.id}`} key={property.id}>
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img
        src={property.img}
        alt={property.title}
        className="rounded-lg shadow-md"
      />
      <h3 className="text-lg font-bold">{property.name}</h3>
      <p className="text-gray-600">{property.location}</p>
      <p className="text-gray-600">
        Type: <span className="font-bold">{property.type}</span>
      </p>
      <p className="text-gray-600">
        Price: <span className="font-bold">${property.price}</span>
      </p>
      <p className="text-gray-600">
        Availability: <span className="font-bold">{property.status}</span>
      </p>
      <p className="text-gray-600">
        Total Views: <span className="font-bold">{property.views}</span>
      </p>
      <p className="text-gray-600">
        Rating: <span className="font-bold">{property.reviews}/5</span>
      </p>
      <button className="mt-4 p-2 bg-red-500 text-white rounded">
        Report Issue
      </button>
    </div>
  </Link>
);
