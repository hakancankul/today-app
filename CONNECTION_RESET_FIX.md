# 🔧 ERR_CONNECTION_RESET Hatası Çözümü

## Sorun
Vercel'de deploy edilen projede bazen `ERR_CONNECTION_RESET` hatası alınıyor. Sayfayı yenileyince bazen düzeliyor, bazen düzelmiyor.

## Nedenler

### 1. **Cold Start Timeout** ⚡
Vercel serverless function'ları ilk çağrıda (cold start) bazen yavaş olabilir ve timeout oluşabilir. Bu özellikle:
- Uzun süre kullanılmayan projelerde
- Yeni deploy'lardan sonra
- İlk kullanıcı erişimlerinde

### 2. **Module-Level Async İşlemler** 🔄
`supabase.ts` dosyasında module seviyesinde async bağlantı testi yapılıyordu. Bu, sayfa yüklenirken hemen çalışıyor ve timeout olursa sayfa yüklenemeyebiliyordu.

### 3. **Supabase Bağlantı Timeout** ⏱️
Supabase'e bağlanırken timeout olabilir, özellikle:
- Network sorunları olduğunda
- Supabase servisi yavaş olduğunda
- Environment variables eksik/yanlış olduğunda

## ✅ Yapılan Düzeltmeler

### 1. **Lazy Connection Test**
- Connection test artık sayfa yüklendikten **sonra** çalışıyor
- Sayfa yüklenmesini engellemiyor
- 5 saniye timeout ile sınırlandırıldı

### 2. **Timeout Ayarları**
- Connection test için 5 saniye timeout eklendi
- Timeout olursa sayfa çalışmaya devam ediyor (sadece console'da uyarı)

### 3. **Next.js Config İyileştirmeleri**
- `onDemandEntries` ayarları eklendi
- Sayfalar daha uzun süre memory'de tutuluyor

## 📋 Ek Öneriler

### Vercel Dashboard'da Kontrol Edin:

1. **Function Timeout Ayarları**
   - Vercel Dashboard > Projeniz > Settings > Functions
   - Maximum Duration: En az 10 saniye olmalı (Hobby plan'da max 10s)

2. **Environment Variables**
   - Tüm environment variables'ın Production, Preview ve Development için aktif olduğundan emin olun
   - `NEXT_PUBLIC_SUPABASE_URL` ve `NEXT_PUBLIC_SUPABASE_ANON_KEY` doğru mu kontrol edin

3. **Deploy Logs**
   - Vercel Dashboard > Deployments > Build Logs
   - Hata mesajlarını kontrol edin

### Supabase Dashboard'da Kontrol Edin:

1. **Proje Durumu**
   - Supabase Dashboard > Settings > General
   - Projenin pause edilmediğinden emin olun

2. **RLS Policies**
   - Supabase Dashboard > Authentication > Policies
   - Tüm tablolar için SELECT izni veren policy olmalı

## 🔍 Debug İçin

Browser Console'da (F12) şu mesajları kontrol edin:

✅ **Başarılı:**
- `✅ Supabase Environment Variables mevcut`
- `✅ Supabase bağlantısı başarılı`

❌ **Hata:**
- `❌ Supabase Environment Variables Eksik!`
- `❌ Supabase bağlantı hatası`
- `⚠️ Supabase connection test timeout`

## 💡 Hala Sorun Varsa

1. **Browser Cache Temizleyin**
   - Ctrl+Shift+Delete
   - Cache ve cookies'i temizleyin

2. **Hard Refresh**
   - Ctrl+Shift+R (Windows/Linux)
   - Cmd+Shift+R (Mac)

3. **Incognito/Private Mode'da Test Edin**
   - Cache sorunlarını elemek için

4. **Vercel'de Redeploy**
   - Deployments > En son deployment > ⋯ > Redeploy

5. **Supabase Projesini Kontrol Edin**
   - Pause edilmiş mi?
   - Quota aşılmış mı?
   - Database erişilebilir mi?

## 📝 Notlar

- Cold start sorunları genellikle ilk erişimde olur, sonraki erişimlerde düzelir
- Eğer sürekli oluyorsa, environment variables veya Supabase bağlantısı sorunlu olabilir
- Production'da daha az görülür çünkü function'lar daha sık kullanılır (warm start)

