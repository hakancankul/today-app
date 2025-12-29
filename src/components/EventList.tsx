import { HistoricalEvent } from '@/types';
import Pagination from './Pagination';
import { motion, AnimatePresence } from 'framer-motion';

interface EventListProps {
  events: HistoricalEvent[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const EventList = ({ events, loading, currentPage, totalPages, onPageChange }: EventListProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        Sonuç bulunamadı
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {events.map((event, index) => {
            const safeContent = event?.icerik || '';
            const safeId = event?.id || index;
            return (
              <motion.div
                key={`${safeId}-${safeContent.substring(0, 20)}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card py-6 pl-1 pr-6 rounded-2xl"
              >
                <div className="flex items-start gap-3">
                  {event.yil && (
                    <div className="text-gray-400 font-medium text-lg shrink-0 w-16 text-right">
                      {String(event.yil)}
                    </div>
                  )}
                  <div className="text-white text-lg leading-relaxed flex-grow text-justify hyphens-auto pl-2">
                    {safeContent}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default EventList; 