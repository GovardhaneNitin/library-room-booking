import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navigation/navbar";
import { Hero } from "./components/home/hero";
import { RoomsPage } from "./pages/rooms";
import { BookingsPage } from "./pages/bookings";

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
        </Routes>
      </div>
    </Router>
  );
}
