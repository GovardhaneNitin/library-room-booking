import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AnimatedText } from '../ui/animated-text';

export function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-white"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"
        />
      </div>

      <div className="relative z-10 text-center px-4">
        <AnimatedText
          text="Find Your Perfect Study Space"
          className="text-5xl md:text-6xl font-serif font-bold text-amber-900 mb-6"
        />
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
        >
          Book discussion rooms in our library for focused study sessions,
          group meetings, or quiet contemplation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            to="/rooms"
            className="inline-flex items-center px-8 py-3 rounded-lg bg-amber-700 text-white hover:bg-amber-800 transition-colors"
          >
            Browse Rooms
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}