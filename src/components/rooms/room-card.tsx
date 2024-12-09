import React from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle } from 'lucide-react';
import type { Room } from '../../types/room';

interface RoomCardProps {
  room: Room;
  isAvailable?: boolean;
  onClick?: () => void;
}

export function RoomCard({ room, isAvailable = true, onClick }: RoomCardProps) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <motion.div
      className="relative h-[400px] w-full perspective"
      whileHover={{ scale: 1.02 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden">
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${room.imageUrl})` }}
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <Users className="h-4 w-4 mr-1" />
                <span>Capacity: {room.capacity}</span>
              </div>
              {isAvailable && (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  <span>Available</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden rotateY-180">
          <div className="bg-white rounded-lg shadow-md h-full p-6">
            <h4 className="font-semibold mb-4">Features:</h4>
            <ul className="space-y-2 mb-4">
              {room.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-amber-600" />
                  {feature}
                </li>
              ))}
            </ul>
            <p className="text-gray-600 mb-4">{room.description}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick?.();
              }}
              className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}