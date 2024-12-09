export interface Room {
  id: string;
  name: string;
  capacity: number;
  features: string[];
  imageUrl: string;
  description: string;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  roomId: string;
  userId: string;
  date: string;
  timeSlot: TimeSlot;
  status: 'confirmed' | 'cancelled' | 'completed';
}