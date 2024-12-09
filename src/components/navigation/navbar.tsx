import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Book, Calendar, User, Home } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Book className="h-6 w-6 text-amber-700" />
              <span className="font-serif text-xl font-semibold text-amber-900">
                LibrarySpace
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            {[
              { to: '/', icon: Home, label: 'Home' },
              { to: '/rooms', icon: Calendar, label: 'Rooms' },
              { to: '/bookings', icon: User, label: 'My Bookings' },
            ].map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center space-x-1 text-gray-700 hover:text-amber-700 transition-colors"
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}