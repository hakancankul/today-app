import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import type { DateSelection } from '@/types';

interface DateSelectorProps {
  onChange: (selection: DateSelection) => void;
}

export default function DateSelector({ onChange }: DateSelectorProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAllDates, setShowAllDates] = useState(false);

  const today = new Date();

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
    <div className="flex flex-col items-center space-y-6 w-full px-4 sm:px-0">
      {/* Tüm Zamanlar Butonu */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={toggleAllDates}
        className={`
          w-full sm:w-auto px-6 py-2 rounded-full font-medium transition-all duration-200
          ${showAllDates 
            ? 'bg-white text-gray-900' 
            : 'bg-white/10 text-white hover:bg-white/20'}
        `}
      >
        Tüm Zamanlar
      </motion.button>

      <div className="date-selector w-full sm:w-auto">
        <motion.div
          key="date-selector"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center space-x-4 sm:space-x-8"
        >
          {/* Gün Seçici */}
          <div className="flex flex-col items-center w-[80px] sm:w-[100px]">
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
              <ChevronUpIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </motion.button>
            <motion.div
              key={currentDate.getDate()}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-4xl sm:text-6xl font-bold w-full text-center ${showAllDates ? 'text-gray-500' : 'text-white'}`}
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
              <ChevronDownIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </motion.button>
          </div>

          {/* Ay Seçici */}
          <div className="flex flex-col items-center w-[160px] sm:w-[300px]">
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
              <ChevronUpIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </motion.button>
            <motion.div
              key={currentDate.getMonth()}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-3xl sm:text-6xl font-bold w-full text-center ${showAllDates ? 'text-gray-500' : 'text-white'}`}
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
              <ChevronDownIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 