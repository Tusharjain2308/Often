import { MapPin, Calendar, Sun } from "lucide-react";
import { Link } from "react-router-dom";

const ItineraryCard = ({ itinerary }) => {
  // Generate a random pastel background color for each card
  const colors = [
    "bg-blue-50 border-blue-200",
    "bg-green-50 border-green-200",
    "bg-purple-50 border-purple-200",
    "bg-amber-50 border-amber-200",
    "bg-rose-50 border-rose-200",
    "bg-teal-50 border-teal-200",
  ];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      className={`rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${randomColor} border`}
    >
      <div className="relative h-40 bg-gradient-to-r from-blue-400 to-teal-300">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-block px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-semibold text-blue-800 mb-2">
            {itinerary.duration} {itinerary.duration === 1 ? "night" : "nights"}
          </span>
          <h3 className="text-xl font-bold text-white drop-shadow-sm truncate">
            {itinerary.name}
          </h3>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center mb-3">
          <MapPin className="h-5 w-5 text-blue-600 mr-2" />
          <p className="text-gray-700 font-medium">{itinerary.region}</p>
        </div>

        <div className="flex items-center mb-3">
          <Calendar className="h-5 w-5 text-blue-600 mr-2" />
          <p className="text-gray-700">
            {itinerary.duration} {itinerary.duration === 1 ? "night" : "nights"}
          </p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <Link
            to={`/itinerary/${itinerary._id}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            View Details
          </Link>
          <div className="flex items-center">
            <Sun className="h-4 w-4 text-amber-500 mr-1" />
            <span className="text-sm text-gray-600">Perfect timing</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryCard;
