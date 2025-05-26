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
      className={`glass-card w-full p-6 rounded-2xl text-left transition-all duration-300 ${
        isSelected ? 'ring-2 ring-blue-500 bg-white/5' : ''
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 relative">
          <Image
            src={CARD_ICONS[type]}
            alt={CARD_TITLES[type]}
            fill
            className="object-contain"
            priority
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">
            {CARD_TITLES[type]}
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            {isSelected ? 'Seçildi' : 'Seçmek için tıkla'}
          </p>
        </div>
      </div>
    </motion.button>
  );
} 