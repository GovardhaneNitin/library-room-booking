import React from 'react';
import { motion } from 'framer-motion';
import { format, addDays, startOfWeek } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CalendarViewProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export function CalendarView({ selectedDate, onDateSelect }: CalendarViewProps) {
  const startDate = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => onDateSelect(addDays(selectedDate, -7))}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-semibold">
          {format(selectedDate, 'MMMM yyyy')}
        </h2>
        <button
          onClick={() => onDateSelect(addDays(selectedDate, 7))}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((date) => (
          <motion.button
            key={date.toISOString()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDateSelect(date)}
            className={cn(
              'p-2 rounded-lg text-center transition-colors',
              date.toDateString() === selectedDate.toDateString()
                ? 'bg-amber-600 text-white'
                : 'hover:bg-amber-50'
            )}
          >
            <div className="text-xs mb-1">{format(date, 'EEE')}</div>
            <div className="text-lg">{format(date, 'd')}</div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}