import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Bookmark,
  ArrowLeft,
  Loader,
  Hotel,
  Plane,
  Mountain,
  Plus,
} from "lucide-react";

const CreateItinerary = () => {
  const [form, setForm] = useState({
    name: "",
    region: "",
    duration: "",
    days: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "duration") {
      const days = Array.from({ length: parseInt(e.target.value) || 0 }, (_, i) => ({
        dayNumber: i + 1,
        hotel: { name: "", location: "" },
        transfers: [],
        activities: [],
      }));
      setForm({ ...form, duration: e.target.value, days });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("https://often.onrender.com/api/itineraries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      navigate("/");
    } catch (error) {
      console.error("Error creating itinerary:", error);
      setIsSubmitting(false);
    }
  };

  const handleDayChange = (index, field, subfield, value) => {
    const updatedDays = [...form.days];
    updatedDays[index][field][subfield] = value;
    setForm({ ...form, days: updatedDays });
  };

  const addTransfer = (index) => {
    const updated = [...form.days];
    updated[index].transfers.push({ from: "", to: "" });
    setForm({ ...form, days: updated });
  };

  const updateTransfer = (dayIdx, i, key, value) => {
    const updated = [...form.days];
    updated[dayIdx].transfers[i][key] = value;
    setForm({ ...form, days: updated });
  };

  const addActivity = (index) => {
    const updated = [...form.days];
    updated[index].activities.push({ name: "", description: "" });
    setForm({ ...form, days: updated });
  };

  const updateActivity = (dayIdx, i, key, value) => {
    const updated = [...form.days];
    updated[dayIdx].activities[i][key] = value;
    setForm({ ...form, days: updated });
  };

  const regions = ["Phuket", "Krabi", "Bangkok", "Chiang Mai", "Koh Samui", "Pattaya"];

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Itineraries
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6">
          <h2 className="text-2xl font-bold text-white">Create New Itinerary</h2>
          <p className="text-blue-100 mt-1">Plan your perfect trip with a custom itinerary</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Trip Name</label>
            <div className="relative">
              <Bookmark className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="name"
                type="text"
                placeholder="e.g., Thailand Adventure"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Region */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Region</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                name="region"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                required
                defaultValue=""
              >
                <option value="" disabled>Select a region</option>
                {regions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Duration (nights)</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="duration"
                type="number"
                min="1"
                max="30"
                placeholder="e.g., 5"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                required
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">Recommended: 2–8 nights</p>
          </div>

          {/* Day-wise planner */}
          {form.days.map((day, index) => (
            <div key={index} className="border-t pt-4 mt-6">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">Day {day.dayNumber}</h3>

              {/* Hotel */}
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Hotel Name"
                  className="border p-2 flex-1 rounded"
                  value={day.hotel.name}
                  onChange={(e) => handleDayChange(index, "hotel", "name", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="border p-2 flex-1 rounded"
                  value={day.hotel.location}
                  onChange={(e) => handleDayChange(index, "hotel", "location", e.target.value)}
                />
              </div>

              {/* Transfers */}
              <div className="mb-2">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Plane className="h-4 w-4" />
                  Transfers
                </div>
                {day.transfers.map((t, i) => (
                  <div key={i} className="flex gap-2 mt-1">
                    <input
                      type="text"
                      placeholder="From"
                      className="border p-2 rounded w-full"
                      value={t.from}
                      onChange={(e) => updateTransfer(index, i, "from", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="To"
                      className="border p-2 rounded w-full"
                      value={t.to}
                      onChange={(e) => updateTransfer(index, i, "to", e.target.value)}
                    />
                  </div>
                ))}
                <button type="button" onClick={() => addTransfer(index)} className="text-blue-600 text-sm mt-1">
                  + Add Transfer
                </button>
              </div>

              {/* Activities */}
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Mountain className="h-4 w-4" />
                  Activities
                </div>
                {day.activities.map((a, i) => (
                  <div key={i} className="flex gap-2 mt-1">
                    <input
                      type="text"
                      placeholder="Activity Name"
                      className="border p-2 flex-1 rounded"
                      value={a.name}
                      onChange={(e) => updateActivity(index, i, "name", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      className="border p-2 flex-1 rounded"
                      value={a.description}
                      onChange={(e) => updateActivity(index, i, "description", e.target.value)}
                    />
                  </div>
                ))}
                <button type="button" onClick={() => addActivity(index)} className="text-blue-600 text-sm mt-1">
                  + Add Activity
                </button>
              </div>
            </div>
          ))}

          {/* Submit */}
          <div className="pt-4">
            <button
              className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg flex items-center justify-center"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Itinerary"
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-800 mb-2">Travel Tips</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Best time to visit Thailand: November to April</li>
          <li>• Include at least one island for balance</li>
          <li>• Spend 2–3 nights per major destination</li>
        </ul>
      </div>
    </div>
  );
};

export default CreateItinerary;
