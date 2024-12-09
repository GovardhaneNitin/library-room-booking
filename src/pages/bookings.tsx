import React from 'react';
import { motion } from 'framer-motion';
import { BookingList } from '../components/bookings/booking-list';

// Mock data for demonstration
const mockBookings = [
  {
    id: '1',
    roomId: '1',
    userId: 'user1',
    date: new Date().toISOString(),
    timeSlot: {
      id: '1',
      startTime: '09:00',
      endTime: '10:00',
      isAvailable: false,
    },
    status: 'confirmed' as const,
  },
  // Add more mock bookings as needed
];

export function BookingsPage() {
  const [bookings, setBookings] = React.useState(mockBookings);

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: 'cancelled' as const }
          : booking
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">
          My Bookings
        </h1>

        <BookingList
          bookings={bookings}
          onCancelBooking={handleCancelBooking}
        />
      </motion.div>
    </div>
  );
}