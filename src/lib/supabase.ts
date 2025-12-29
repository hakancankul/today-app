import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Client-side'da environment variables kontrolü
if (typeof globalThis.window !== 'undefined') {
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Supabase Environment Variables Eksik!');
    console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set edilmiş' : '❌ Eksik');
    console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '✅ Set edilmiş' : '❌ Eksik');
    console.error('Lütfen deploy platformunuzda (Vercel, Netlify vb.) environment variables ayarlarını kontrol edin.');
  } else {
    console.log('✅ Supabase Environment Variables mevcut');
  }
}

// Server-side'da hata fırlat
if (typeof globalThis.window === 'undefined' && (!supabaseUrl || !supabaseKey)) {
  throw new Error('Supabase URL ve Anon Key gerekli. Lütfen environment variables ayarlarını kontrol edin.');
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '', {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

// Client-side connection test
if (typeof globalThis.window !== 'undefined') {
  // Test connection
  void (async () => {
    const { data, error } = await supabase
      .from('olay')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Supabase bağlantı hatası:', error);
      console.error('Hata kodu:', error.code);
      console.error('Hata mesajı:', error.message);
      console.error('Hata detayı:', error.details);
      console.error('💡 Çözüm önerileri:');
      console.error('1. Supabase Dashboard > Settings > API > RLS politikalarını kontrol edin');
      console.error('2. Tablolar için SELECT izni veren RLS policy olmalı');
      console.error('3. Environment variables doğru mu kontrol edin');
    } else {
      console.log('✅ Supabase bağlantısı başarılı');
      console.log('Örnek veri:', data);
    }
  })();
} 