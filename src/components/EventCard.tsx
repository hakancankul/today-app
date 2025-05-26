import { motion } from 'framer-motion';
import Image from 'next/image';
import type { EventType } from '@/types';

interface EventCardProps {
  type: EventType;
  title: string;
  isSelected: boolean;
  onClick: () => void;
}

const CARD_TITLES: Record<EventType, string> = {
  olay: 'Olaylar',
  dogum: 'Doğumlar',
  olum: 'Ölümler',
  tatil: 'Özel Günler'
};

const CARD_ICONS: Record<EventType, string> = {
  olay: '/icons/event.png',
  dogum: '/icons/birth.png',
  olum: '/icons/death.png',
  tatil: '/icons/holiday.png'
};

export default function EventCard({ type, isSelected, onClick }: EventCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`glass-card w-full p-4 rounded-xl transition-all duration-300 flex items-center justify-center ${
        isSelected ? 'ring-2 ring-blue-500 bg-white/5' : ''
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex flex-col items-center space-y-2">
        <div className="w-8 h-8 relative">
          <Image
            src={CARD_ICONS[type]}
            alt={CARD_TITLES[type]}
            fill
            className="object-contain"
            priority
          />
        </div>
        <h3 className="text-base font-medium text-white text-center">
          {CARD_TITLES[type]}
        </h3>
      </div>
    </motion.button>
  );
} 