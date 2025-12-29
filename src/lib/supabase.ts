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
    } catch {
      console.warn('⚠️ URL parse edilemedi:', supabaseUrl?.substring(0, 50));
    }
  }
}

// Server-side'da uyarı ver (build sırasında hata fırlatma)
if (typeof globalThis.window === 'undefined' && (!supabaseUrl || !supabaseKey)) {
  // Build sırasında hata fırlatmak yerine uyarı ver
  // Environment variables Vercel'de runtime'da set edilebilir
  if (process.env.NODE_ENV === 'production') {
    console.warn('⚠️ UYARI: Supabase environment variables build sırasında bulunamadı!');
    console.warn('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌ Eksik');
    console.warn('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '✅' : '❌ Eksik');
    console.warn('Vercel Dashboard > Settings > Environment Variables bölümünden kontrol edin.');
    console.warn('Build devam ediyor, ancak runtime\'da environment variables set edilmiş olmalı.');
  }
}

// Supabase client'ı oluştur (env vars yoksa boş string ile, runtime'da hata alınacak)
export const supabase = createClient(supabaseUrl || '', supabaseKey || '', {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  // Timeout ayarları - connection reset hatalarını önlemek için
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'x-client-info': 'today-app',
    },
  },
});

// Client-side connection test - LAZY: Sayfa yüklendikten sonra çalışsın
// Bu, ERR_CONNECTION_RESET hatalarını önlemek için önemli
if (typeof globalThis.window !== 'undefined') {
  // Sayfa tamamen yüklendikten sonra test et (sayfa yüklenmesini engellemesin)
  const testConnection = async () => {
    // Timeout ile sınırla (5 saniye)
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Connection test timeout')), 5000)
    );
    
    try {
      const testQuery = supabase
        .from('olay')
        .select('*')
        .limit(1);
      
      const { data, error } = await Promise.race([
        testQuery,
        timeoutPromise
      ]) as { data: any; error: any };
      
      if (error) {
        console.error('❌ Supabase bağlantı hatası:', error);
        console.error('Hata kodu:', error.code);
        console.error('Hata mesajı:', error.message);
        console.error('Hata detayı:', error.details);
        console.error('🔍 Kullanılan URL:', supabaseUrl);
        
        // ERR_NAME_NOT_RESOLVED hatası için özel kontrol
        if (error.message?.includes('Failed to fetch') || error.message?.includes('ERR_NAME_NOT_RESOLVED') || error.message?.includes('NetworkError') || error.message?.includes('ERR_CONNECTION_RESET')) {
          console.error('⚠️ DNS/Connection Hatası!');
          console.error('🔍 Kullanılan URL:', supabaseUrl);
          console.error('💡 Muhtemel Nedenler:');
          console.error('1. ❌ YANLIŞ DOMAIN: Environment variable\'da yanlış Supabase domain var');
          console.error('   Doğru domain: ohkemlnfddicuvcwqzhg.supabase.co');
          console.error('   Yanlış domain: ilaftjcrkhmptrcfszfo.supabase.co (bu domain çalışmıyor)');
          console.error('2. Supabase projeniz pause edilmiş olabilir (Dashboard\'da kontrol edin)');
          console.error('3. Vercel\'de environment variable Production ortamında set edilmiş mi?');
          console.error('4. Deploy\'dan sonra yeniden build yapıldı mı? (Environment variable değişiklikleri için gerekli)');
          console.error('5. Cold start timeout - Vercel serverless function ilk çağrıda yavaş olabilir');
          console.error('');
          console.error('📋 ÇÖZÜM:');
          console.error('Vercel Dashboard > Settings > Environment Variables');
          console.error('NEXT_PUBLIC_SUPABASE_URL değerini güncelleyin:');
          console.error('https://ohkemlnfddicuvcwqzhg.supabase.co');
          console.error('');
          console.error('Detaylı talimatlar için: VERCEL_ENV_SETUP.md dosyasına bakın');
        }
        
        console.error('💡 Diğer çözüm önerileri:');
        console.error('1. Supabase Dashboard > Settings > API > RLS politikalarını kontrol edin');
        console.error('2. Tablolar için SELECT izni veren RLS policy olmalı');
        console.error('3. Environment variables doğru mu kontrol edin');
        console.error('4. Sayfayı yeniden yüklemeyi deneyin (cold start sorunu olabilir)');
      } else {
        console.log('✅ Supabase bağlantısı başarılı');
        if (data) {
          console.log('Örnek veri:', data);
        }
      }
    } catch (err: any) {
      // Timeout veya diğer hatalar
      if (err.message?.includes('timeout')) {
        console.warn('⚠️ Supabase connection test timeout (5s) - Bu normal olabilir, sayfa çalışmaya devam edecek');
      } else {
        console.error('❌ Connection test hatası:', err);
      }
    }
  };
  
  // Sayfa yüklendikten sonra test et (sayfa yüklenmesini engellemesin)
  if (document.readyState === 'complete') {
    // Sayfa zaten yüklenmiş, hemen test et
    setTimeout(testConnection, 1000);
  } else {
    // Sayfa yükleniyor, yüklendikten sonra test et
    window.addEventListener('load', () => {
      setTimeout(testConnection, 1000);
    });
  }
} 