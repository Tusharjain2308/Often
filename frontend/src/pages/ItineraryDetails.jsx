"use client"

import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { CalendarDays, MapPin, ArrowLeft, Hotel, Plane, Mountain, Loader, Clock } from "lucide-react"

const ItineraryDetails = () => {
  const { id } = useParams()
  const [itinerary, setItinerary] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://often.onrender.com/api/itineraries/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setItinerary(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to fetch itinerary details:", err)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader className="h-10 w-10 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600">Loading your adventure details...</p>
      </div>
    )
  }

  if (!itinerary) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8">
          <div className="text-red-500 text-xl font-semibold mb-2">Itinerary not found</div>
          <p className="text-gray-600 mb-6">We couldn't find the itinerary you're looking for.</p>
          <Link
            to="/"
            className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to Itineraries
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium transition-colors duration-200"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Itineraries
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">{itinerary.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-blue-50">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{itinerary.region}</span>
            </div>
            <div className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-1" />
              <span>{itinerary.duration} nights</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-blue-600" />
            Day by Day Itinerary
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200"></div>

            <div className="space-y-8">
              {itinerary.days?.map((day, index) => (
                <div key={index} className="relative pl-12">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                    {day.dayNumber}
                  </div>

                  <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">Day {day.dayNumber}</h3>

                    <div className="space-y-4">
                      {day.hotel && (
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <div className="flex items-start">
                            <Hotel className="h-5 w-5 mr-3 text-teal-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-medium text-gray-800">{day.hotel.name}</div>
                              <div className="text-sm text-gray-600">{day.hotel.location}</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {day.transfers.length > 0 && (
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <div className="flex items-start">
                            <Plane className="h-5 w-5 mr-3 text-indigo-600 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="font-medium text-gray-800 mb-1">Transfers</div>
                              <ul className="space-y-2">
                                {day.transfers.map((t, i) => (
                                  <li key={i} className="flex items-center text-sm">
                                    <span className="text-gray-700 font-medium">{t.from}</span>
                                    <span className="mx-2 text-gray-400">→</span>
                                    <span className="text-gray-700 font-medium">{t.to}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {day.activities.length > 0 && (
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <div className="flex items-start">
                            <Mountain className="h-5 w-5 mr-3 text-amber-600 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="font-medium text-gray-800 mb-1">Activities</div>
                              <ul className="space-y-3">
                                {day.activities.map((a, i) => (
                                  <li key={i} className="text-sm">
                                    <div className="font-medium text-gray-800">{a.name}</div>
                                    <div className="text-gray-600">{a.description}</div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Total Duration:</span> {itinerary.duration} nights
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300">
              Download Itinerary
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h3 className="font-medium text-amber-800 mb-2">Travel Tips for {itinerary.region}</h3>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>• Best time to visit: November to April (dry season)</li>
          <li>• Local currency: Thai Baht (THB)</li>
          <li>• Remember to respect local customs and dress modestly at temples</li>
        </ul>
      </div>
    </div>
  )
}

export default ItineraryDetails
