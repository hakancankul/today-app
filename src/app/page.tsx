'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import DateSelector from '@/components/DateSelector';
import SearchBar from '@/components/SearchBar';
import EventCard from '@/components/EventCard';
import EventList from '@/components/EventList';
import { supabase } from '@/lib/supabase';
import type { EventType, HistoricalEvent, DateSelection } from '@/types';

// Tablo isimlerini sabitleyelim
const TABLE_NAMES: Record<EventType, string> = {
  olay: 'olay',
  dogum: 'dogum',
  olum: 'olum',
  tatil: 'tatil'
};

const ITEMS_PER_PAGE = 5;

export default function Home() {
  const [selectedType, setSelectedType] = useState<EventType | null>(null);
  const [events, setEvents] = useState<HistoricalEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const listRef = useRef<HTMLDivElement>(null);
  const [dateSelection, setDateSelection] = useState<DateSelection>({
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    allDates: false
  });

  // Kartların sıralamasını değiştiriyoruz
  const topEventTypes: EventType[] = ['olay', 'tatil'];
  const bottomEventTypes: EventType[] = ['dogum', 'olum'];

  const fetchEvents = useCallback(async (page = 1) => {
    if (!selectedType) {
      setEvents([]);
      return;
    }
    
    setLoading(true);
    try {
      const tableName = TABLE_NAMES[selectedType];
      const isTatil = selectedType === 'tatil';

      let query = supabase
        .from(tableName)
        .select('*', { count: 'exact' })
        .order('id', { ascending: true });

      if (!dateSelection.allDates) {
        query = query
          .eq('gun', dateSelection.day)
          .eq('ay', dateSelection.month);
      }

      if (searchQuery.trim()) {
        query = query.ilike('icerik', `%${searchQuery.trim()}%`);
      }

      if (!isTatil) {
        query = query.order('yil', { ascending: false });
      }
      
      const from = (page - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;
      
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      const uniqueData = data?.filter((item, index, self) =>
        index === self.findIndex((t) => t.id === item.id && t.icerik === item.icerik)
      );

      const formattedData = uniqueData?.map(item => ({
        ...item,
        yil: isTatil ? undefined : item.yil
      })) || [];

      setTotalPages(Math.ceil((count || 0) / ITEMS_PER_PAGE));
      setEvents(formattedData);
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [selectedType, dateSelection, searchQuery]);

  useEffect(() => {
    if (selectedType) {
      setCurrentPage(1);
      fetchEvents(1);
    }
  }, [selectedType, dateSelection, searchQuery, fetchEvents]);

  // Veriler yüklendiğinde scroll işlemi yap
  useEffect(() => {
    if (selectedType && !loading && events.length > 0 && listRef.current) {
      setTimeout(() => {
        if (listRef.current) {
          const yOffset = -50;
          const y = listRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [selectedType, loading, events]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleDateChange = useCallback((selection: DateSelection) => {
    setDateSelection(selection);
  }, []);

  const handleTypeSelect = useCallback((type: EventType) => {
    setSelectedType(prev => {
      const newType = prev === type ? null : type;
      return newType;
    });
  }, []);

  const handlePageChange = useCallback((page: number) => {
    // Sayfa değişiminde mevcut scroll pozisyonunu kaydet
    const currentPosition = window.scrollY;
    
    setCurrentPage(page);
    fetchEvents(page).finally(() => {
      // Veriler yüklendikten sonra kaydedilen pozisyona dön
      requestAnimationFrame(() => {
        window.scrollTo(0, currentPosition);
      });
    });
  }, [fetchEvents]);

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
            <div className="w-full" ref={listRef}>
              <EventList 
                events={events} 
                loading={loading}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
