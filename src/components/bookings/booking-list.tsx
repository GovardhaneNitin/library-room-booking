import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Clock, MapPin, X } from 'lucide-react';
import type { Booking } from '../../types/room';
import { rooms } from '../../data/rooms';
import { cn } from '../../lib/utils';

interface BookingListProps {
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
}

export function BookingList({ bookings, onCancelBooking }: BookingListProps) {
  return (
    <div className="space-y-4">
      <AnimatePresence>
        {bookings.map((booking) => {
          const room = rooms.find((r) => r.id === booking.roomId);
          if (!room) return null;

          return (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{room.name}</h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>
                        {format(new Date(booking.date), 'MMM d, yyyy')} at{' '}
                        {booking.timeSlot.startTime} - {booking.timeSlot.endTime}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{room.description}</span>
                    </div>
                  </div>
                </div>
                {booking.status === 'confirmed' && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onCancelBooking(booking.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                )}
              </div>
              <div className="mt-4">
                <span
                  className={cn(
                    'px-2 py-1 rounded-full text-sm',
                    booking.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : booking.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  )}
                >
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}