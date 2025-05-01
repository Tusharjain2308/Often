import { useEffect, useState } from "react"
import ItineraryCard from "../components/ItineraryCard"
import { Link } from "react-router-dom"
import { Plus, Loader, Search, MapPin } from "lucide-react"

const Home = () => {
  const [itineraries, setItineraries] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")

  useEffect(() => {
    setLoading(true)
    fetch("http://localhost:5000/api/itineraries")
      .then((res) => res.json())
      .then((data) => {
        setItineraries(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  // Get unique regions for filter
  const regions = [...new Set(itineraries.map((item) => item.region))]

  // Filter itineraries based on search and region
  const filteredItineraries = itineraries.filter((itinerary) => {
    const matchesSearch = itinerary.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRegion = selectedRegion === "" || itinerary.region === selectedRegion
    return matchesSearch && matchesRegion
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Your Travel Itineraries</h1>
          <p className="text-gray-600 mt-1">Plan your perfect getaway with customized itineraries</p>
        </div>
        <Link
          to="/create"
          className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition duration-300 flex items-center justify-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Itinerary
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search itineraries..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative md:w-64">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="">All Regions</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader className="h-8 w-8 text-blue-600 animate-spin" />
          <span className="ml-2 text-gray-600">Loading itineraries...</span>
        </div>
      ) : filteredItineraries.length > 0 ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItineraries.map((itinerary) => (
            <ItineraryCard key={itinerary.id} itinerary={itinerary} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm">
          <div className="text-gray-500 mb-2">No itineraries found</div>
          <p className="text-gray-600 mb-4">Try adjusting your search or create a new itinerary</p>
          <Link
            to="/create"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Create New Itinerary
          </Link>
        </div>
      )}
    </div>
  )
}

export default Home
