import { motion, AnimatePresence } from 'framer-motion';

interface EventListProps {
  events: Array<{
    id: number;
    icerik: string;
    yil?: number;
  }>;
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export default function EventList({ events, loading, hasMore, onLoadMore }: EventListProps) {
  return (
    <div className="w-full space-y-4">
      <AnimatePresence mode="popLayout">
        {events.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              {event.yil && (
                <div className="text-gray-400 font-medium text-lg shrink-0">
                  {event.yil}
                </div>
              )}
              <div className="text-white text-lg leading-relaxed">
                {event.icerik}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {loading && (
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        </div>
      )}

      {hasMore && !loading && events.length > 0 && (
        <motion.button
          onClick={onLoadMore}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full glass-card p-4 rounded-2xl text-white font-medium hover:bg-white/5 transition-all duration-200"
        >
          Daha Fazla Göster
        </motion.button>
      )}

      {!loading && events.length === 0 && (
        <div className="glass-card p-6 rounded-2xl text-center">
          <p className="text-gray-400 text-lg">Sonuç bulunamadı</p>
        </div>
      )}
    </div>
  );
} 