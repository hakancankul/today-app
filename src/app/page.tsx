'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import DateSelector from '@/components/DateSelector';
import SearchBar from '@/components/SearchBar';
import EventCard from '@/components/EventCard';
import EventList from '@/components/EventList';
import { supabase } from '@/lib/supabase';
import type { EventType, HistoricalEvent, DateSelection } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

// Tablo isimlerini sabitleyelim
const TABLE_NAMES: Record<EventType, string> = {
  olay: 'olay',
  dogum: 'dogum',
  olum: 'olum',
  tatil: 'tatil'
};

const ITEMS_PER_PAGE = 10;

export default function Home() {
  const [selectedType, setSelectedType] = useState<EventType | null>(null);
  const [events, setEvents] = useState<HistoricalEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);
  const [dateSelection, setDateSelection] = useState<DateSelection>({
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    allDates: false
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  // Kartların sıralamasını değiştiriyoruz
  const topEventTypes: EventType[] = ['olay', 'tatil'];
  const bottomEventTypes: EventType[] = ['dogum', 'olum'];

  const fetchEvents = useCallback(async (page = 1, append = false) => {
    if (!selectedType) {
      setEvents([]);
      return;
    }
    
    setLoading(true);
    try {
      const tableName = TABLE_NAMES[selectedType];
      const isTatil = selectedType === 'tatil';

      // İlişkisel sorgu yapalım
      let query = supabase
        .from(tableName)
        .select('*', { count: 'exact' });

      // Tarih filtresi
      if (!dateSelection.allDates) {
        query = query
          .eq('gun', dateSelection.day)
          .eq('ay', dateSelection.month);
      }

      // Arama filtresi
      if (searchQuery.trim()) {
        query = query.ilike('icerik', `%${searchQuery.trim()}%`);
      }

      // Sıralama ve limit - tatil tablosu için yıl sıralaması yok
      if (!isTatil) {
        query = query.order('yil', { ascending: false });
      }
      
      // Pagination
      const from = (page - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;
      
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      // Tatil tablosu için yıl alanını undefined olarak ayarla
      const formattedData = data?.map(item => ({
        ...item,
        yil: isTatil ? undefined : item.yil
      })) || [];

      setHasMore(count ? from + ITEMS_PER_PAGE < count : false);
      
      if (append) {
        setEvents(prev => [...prev, ...formattedData]);
      } else {
        setEvents(formattedData);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [selectedType, dateSelection, searchQuery]);

  useEffect(() => {
    if (selectedType) {
      setCurrentPage(1);
      fetchEvents(1, false);
    }
  }, [selectedType, dateSelection, searchQuery, fetchEvents]);

  useEffect(() => {
    if (shouldScroll && listRef.current) {
      const element = listRef.current; // Referansı saklayalım
      const timer = setTimeout(() => {
        const yOffset = -50;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        setShouldScroll(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [shouldScroll]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleDateChange = useCallback((selection: DateSelection) => {
    setDateSelection(selection);
  }, []);

  const handleTypeSelect = useCallback((type: EventType) => {
    setSelectedType(prev => {
      const newType = prev === type ? null : type;
      if (newType) {
        setShouldScroll(true);
      }
      return newType;
    });
  }, []);

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchEvents(nextPage, true);
    }
  }, [currentPage, loading, hasMore, fetchEvents]);

  return (
    <main className="min-h-screen py-4 sm:py-6">
      <div className="container mx-auto px-4">
        {/* Logo */}
        <div className="flex justify-center sm:justify-start sm:absolute sm:top-4 sm:left-6 mb-4 sm:mb-0">
          <Image
            src="/logo.png"
            alt="Today Logo"
            width={100}
            height={34}
            className="text-white"
            priority
          />
        </div>

        <div className="flex flex-col items-center max-w-3xl mx-auto">
          {/* Tarih Seçici */}
          <div className="w-full mb-4 sm:mb-6">
            <DateSelector onChange={handleDateChange} />
          </div>

          {/* Arama Kutusu */}
          <div className="w-full max-w-2xl mb-4 sm:mb-6">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Kartlar - 2x2 Grid */}
          <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {/* Üst Sıra - Olaylar ve Özel Günler */}
            {topEventTypes.map((type) => (
              <EventCard
                key={type}
                type={type}
                title=""
                isSelected={type === selectedType}
                onClick={() => handleTypeSelect(type)}
              />
            ))}
            
            {/* Alt Sıra - Doğumlar ve Ölümler */}
            {bottomEventTypes.map((type) => (
              <EventCard
                key={type}
                type={type}
                title=""
                isSelected={type === selectedType}
                onClick={() => handleTypeSelect(type)}
              />
            ))}
          </div>

          {/* Sonuçlar Listesi */}
          {selectedType && (
            <motion.div 
              ref={listRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full scroll-mt-6"
            >
              <EventList 
                events={events} 
                loading={loading} 
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
              />
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
