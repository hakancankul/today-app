import type { NextConfig } from "next";

// Build sırasında environment variables kontrolü
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (process.env.NODE_ENV === 'production') {
  if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ UYARI: Supabase environment variables build sırasında bulunamadı!');
    console.warn('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌ Eksik');
    console.warn('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '✅' : '❌ Eksik');
    console.warn('Vercel Dashboard > Settings > Environment Variables bölümünden kontrol edin.');
  } else {
    console.log('✅ Supabase environment variables build sırasında mevcut');
  }
}

const nextConfig: NextConfig = {
  /* config options here */
  // Vercel'de connection reset hatalarını önlemek için
  experimental: {
    // Server actions timeout
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Timeout ayarları
  onDemandEntries: {
    // Sayfaları daha uzun süre memory'de tut
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
};

export default nextConfig;
