import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import type { Room, TimeSlot } from '../../types/room';
import { cn } from '../../lib/utils';

interface BookingFormProps {
  room: Room;
  selectedDate: Date;
  onSubmit: (data: {
    name: string;
    email: string;
    purpose: string;
    timeSlot: TimeSlot;
  }) => void;
  onCancel: () => void;
}

export function BookingForm({ room, selectedDate, onSubmit, onCancel }: BookingFormProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    purpose: '',
    timeSlot: '',
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const timeSlots: TimeSlot[] = [
    { id: '1', startTime: '09:00', endTime: '10:00', isAvailable: true },
    { id: '2', startTime: '10:00', endTime: '11:00', isAvailable: true },
    { id: '3', startTime: '11:00', endTime: '12:00', isAvailable: false },
    // Add more time slots as needed
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.timeSlot) newErrors.timeSlot = 'Please select a time slot';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      const selectedTimeSlot = timeSlots.find(slot => slot.id === formData.timeSlot);
      if (selectedTimeSlot) {
        onSubmit({
          ...formData,
          timeSlot: selectedTimeSlot,
        });
      }
    } else {
      setErrors(newErrors);
      // Trigger shake animation for fields with errors
      const formElement = document.getElementById('booking-form');
      formElement?.classList.add('shake');
      setTimeout(() => formElement?.classList.remove('shake'), 500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto"
    >
      <h2 className="text-2xl font-serif font-semibold mb-4">Book {room.name}</h2>
      <p className="text-gray-600 mb-6">
        For {format(selectedDate, 'MMMM d, yyyy')}
      </p>

      <form id="booking-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={cn(
              'w-full p-2 border rounded-md',
              errors.name ? 'border-red-500' : 'border-gray-300'
            )}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={cn(
              'w-full p-2 border rounded-md',
              errors.email ? 'border-red-500' : 'border-gray-300'
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time Slot
          </label>
          <select
            value={formData.timeSlot}
            onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
            className={cn(
              'w-full p-2 border rounded-md',
              errors.timeSlot ? 'border-red-500' : 'border-gray-300'
            )}
          >
            <option value="">Select a time slot</option>
            {timeSlots.map((slot) => (
              <option
                key={slot.id}
                value={slot.id}
                disabled={!slot.isAvailable}
              >
                {slot.startTime} - {slot.endTime}
                {!slot.isAvailable && ' (Unavailable)'}
              </option>
            ))}
          </select>
          {errors.timeSlot && (
            <p className="text-red-500 text-sm mt-1">{errors.timeSlot}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Purpose of Booking
          </label>
          <textarea
            value={formData.purpose}
            onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={3}
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Confirm Booking
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
}