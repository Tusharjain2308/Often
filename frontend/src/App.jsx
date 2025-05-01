import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import CreateItinerary from "./pages/CreateItinerary"
import Navbar from "./components/Navbar"
import ItineraryDetails from "./pages/ItineraryDetails"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-100">
        <Navbar />
        <div className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateItinerary />} />
            <Route path="/itinerary/:id" element={<ItineraryDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
