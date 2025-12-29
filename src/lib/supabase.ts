import { createClient } from '@supabase/supabase-js';

let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// URL'i normalize et - https:// ile başlamıyorsa ekle
if (supabaseUrl && !supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
  supabaseUrl = `https://${supabaseUrl}`;
  if (typeof globalThis.window !== 'undefined') {
    console.warn('⚠️ Supabase URL\'e https:// protokolü eklendi. Environment variable\'ı düzeltmeyi unutmayın!');
  }
}

// Client-side'da environment variables kontrolü
if (typeof globalThis.window !== 'undefined') {
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Supabase Environment Variables Eksik!');
    console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set edilmiş' : '❌ Eksik');
    console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '✅ Set edilmiş' : '❌ Eksik');
    console.error('Lütfen deploy platformunuzda (Vercel, Netlify vb.) environment variables ayarlarını kontrol edin.');
  } else {
    console.log('✅ Supabase Environment Variables mevcut');
    // URL'in domain kısmını göster (güvenlik için tam URL'i göstermiyoruz)
    try {
      const urlObj = new URL(supabaseUrl);
      console.log('📍 Supabase Domain:', urlObj.hostname);
      console.log('🔒 Protokol:', urlObj.protocol);
    } catch (e) {
      console.warn('⚠️ URL parse edilemedi:', supabaseUrl?.substring(0, 50));
    }
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
      console.error('🔍 Kullanılan URL:', supabaseUrl);
      
      // ERR_NAME_NOT_RESOLVED hatası için özel kontrol
      if (error.message?.includes('Failed to fetch') || error.message?.includes('ERR_NAME_NOT_RESOLVED')) {
        console.error('⚠️ DNS Çözümleme Hatası!');
        console.error('💡 Kontrol edin:');
        console.error('1. Supabase projeniz pause edilmiş olabilir (Dashboard\'da kontrol edin)');
        console.error('2. Environment variable doğru domain\'i içeriyor mu?');
        console.error('3. Vercel\'de environment variable Production ortamında set edilmiş mi?');
        console.error('4. Deploy\'dan sonra yeniden build yapıldı mı? (Environment variable değişiklikleri için gerekli)');
      }
      
      console.error('💡 Diğer çözüm önerileri:');
      console.error('1. Supabase Dashboard > Settings > API > RLS politikalarını kontrol edin');
      console.error('2. Tablolar için SELECT izni veren RLS policy olmalı');
      console.error('3. Environment variables doğru mu kontrol edin');
    } else {
      console.log('✅ Supabase bağlantısı başarılı');
      console.log('Örnek veri:', data);
    }
  })();
} 