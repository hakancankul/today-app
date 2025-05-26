import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import type { DateSelection } from '@/types';

interface DateSelectorProps {
  onChange: (selection: DateSelection) => void;
}

export default function DateSelector({ onChange }: DateSelectorProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAllDates, setShowAllDates] = useState(false);

  const today = new Date();
  const isToday = currentDate.getDate() === today.getDate() && 
                  currentDate.getMonth() === today.getMonth() &&
                  currentDate.getFullYear() === today.getFullYear();

  useEffect(() => {
    onChange({
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1,
      allDates: showAllDates
    });
  }, [currentDate, showAllDates, onChange]);

  const incrementMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const decrementMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const incrementDay = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 1);
      return newDate;
    });
  };

  const decrementDay = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 1);
      return newDate;
    });
  };

  const toggleAllDates = () => {
    setShowAllDates(prev => !prev);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Tüm Zamanlar Butonu */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={toggleAllDates}
        className={`
          px-6 py-2 rounded-full font-medium transition-all duration-200
          ${showAllDates 
            ? 'bg-white text-gray-900' 
            : 'bg-white/10 text-white hover:bg-white/20'}
        `}
      >
        Tüm Zamanlar
      </motion.button>

      <div className="date-selector">
        <motion.div
          key="date-selector"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-8"
        >
          <div className="flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={incrementDay}
              disabled={showAllDates}
              className={`p-2 rounded-full transition-colors ${
                showAllDates 
                  ? 'text-gray-500 cursor-not-allowed' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <ChevronUpIcon className="h-6 w-6" />
            </motion.button>
            <motion.div
              key={currentDate.getDate()}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-6xl font-bold ${showAllDates ? 'text-gray-500' : 'text-white'}`}
            >
              {format(currentDate, 'd')}
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={decrementDay}
              disabled={showAllDates}
              className={`p-2 rounded-full transition-colors ${
                showAllDates 
                  ? 'text-gray-500 cursor-not-allowed' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <ChevronDownIcon className="h-6 w-6" />
            </motion.button>
          </div>

          <div className="flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={incrementMonth}
              disabled={showAllDates}
              className={`p-2 rounded-full transition-colors ${
                showAllDates 
                  ? 'text-gray-500 cursor-not-allowed' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <ChevronUpIcon className="h-6 w-6" />
            </motion.button>
            <motion.div
              key={currentDate.getMonth()}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-6xl font-bold ${showAllDates ? 'text-gray-500' : 'text-white'}`}
            >
              {format(currentDate, 'MMMM', { locale: tr })}
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={decrementMonth}
              disabled={showAllDates}
              className={`p-2 rounded-full transition-colors ${
                showAllDates 
                  ? 'text-gray-500 cursor-not-allowed' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <ChevronDownIcon className="h-6 w-6" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 