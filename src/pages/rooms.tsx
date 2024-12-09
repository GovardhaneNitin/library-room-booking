import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarView } from '../components/rooms/calendar-view';
import { RoomCard } from '../components/rooms/room-card';
import { BookingForm } from '../components/rooms/booking-form';
import { rooms } from '../data/rooms';
import type { Room } from '../types/room';

export function RoomsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">
          Available Rooms
        </h1>

        <div className="mb-8">
          <CalendarView
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </div>

        {selectedRoom ? (
          <BookingForm
            room={selectedRoom}
            selectedDate={selectedDate}
            onSubmit={(data) => {
              console.log('Booking submitted:', data);
              setSelectedRoom(null);
            }}
            onCancel={() => setSelectedRoom(null)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onClick={() => setSelectedRoom(room)}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}