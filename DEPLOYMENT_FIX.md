# 🚀 Deployment Sorun Giderme Rehberi

## Sorun: Veriler Görünmüyor

Eğer deploy edilen sitede veriler görünmüyorsa, aşağıdaki adımları kontrol edin:

## 1. ✅ Environment Variables Kontrolü

Deploy platformunuzda (Vercel, Netlify, vb.) aşağıdaki environment variables'ların set edildiğinden emin olun:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Vercel'de Nasıl Eklenir:
1. Vercel Dashboard > Projeniz > Settings > Environment Variables
2. Her iki değişkeni ekleyin
3. **Önemli:** Production, Preview ve Development için tüm ortamlarda aktif olduğundan emin olun
4. Deploy'u yeniden yapın

### Supabase URL ve Key Nerede Bulunur:
1. Supabase Dashboard > Settings > API
2. `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
3. `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 2. 🔐 RLS (Row Level Security) Politikaları

**En yaygın sorun bu!** Supabase'de RLS aktifse, tablolarınız için SELECT izni veren policy eklemeniz gerekir.

### RLS Policy Nasıl Eklenir:

#### Supabase Dashboard Üzerinden:

1. **Supabase Dashboard** > **Table Editor** > İlgili tabloyu seçin (`olay`, `dogum`, `olum`, `tatil`)
2. **Authentication** > **Policies** sekmesine gidin
3. **New Policy** butonuna tıklayın
4. **Policy Name:** `Allow public read access` (veya istediğiniz bir isim)
5. **Allowed operation:** `SELECT` seçin
6. **Policy definition:** Aşağıdaki SQL'i kullanın:

```sql
-- Tüm tablolar için public read access
CREATE POLICY "Allow public read access" ON olay FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON dogum FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON olum FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON tatil FOR SELECT USING (true);
```

#### SQL Editor Üzerinden (Daha Hızlı):

1. **Supabase Dashboard** > **SQL Editor**
2. Aşağıdaki SQL'i çalıştırın:

```sql
-- Tüm tablolar için public read access policy ekle
CREATE POLICY "Allow public read access" ON public.olay FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.dogum FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.olum FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.tatil FOR SELECT USING (true);
```

**Not:** Eğer policy zaten varsa, önce silin:
```sql
DROP POLICY IF EXISTS "Allow public read access" ON public.olay;
DROP POLICY IF EXISTS "Allow public read access" ON public.dogum;
DROP POLICY IF EXISTS "Allow public read access" ON public.olum;
DROP POLICY IF EXISTS "Allow public read access" ON public.tatil;
```

## 3. 🔍 Browser Console Kontrolü

1. Deploy edilen sitenizi açın
2. **F12** veya **Sağ tık > Inspect** ile Developer Tools'u açın
3. **Console** sekmesine gidin
4. Şu mesajları kontrol edin:
   - ✅ `Supabase Environment Variables mevcut` - Environment variables doğru
   - ✅ `Supabase bağlantısı başarılı` - Bağlantı çalışıyor
   - ❌ Hata mesajları varsa, yukarıdaki adımları kontrol edin

## 4. 📊 Tablo Yapısı Kontrolü

Tablolarınızın doğru kolonlara sahip olduğundan emin olun:

- `olay` tablosu: `id`, `gun`, `ay`, `yil`, `icerik`
- `dogum` tablosu: `id`, `gun`, `ay`, `yil`, `icerik`
- `olum` tablosu: `id`, `gun`, `ay`, `yil`, `icerik`
- `tatil` tablosu: `id`, `gun`, `ay`, `icerik` (yil yok)

## 5. 🧪 Test Sorgusu

Supabase SQL Editor'de şu sorguyu çalıştırarak verilerinizin olduğunu doğrulayın:

```sql
-- Her tablodan bir örnek veri çek
SELECT 'olay' as tablo, COUNT(*) as kayit_sayisi FROM olay
UNION ALL
SELECT 'dogum' as tablo, COUNT(*) as kayit_sayisi FROM dogum
UNION ALL
SELECT 'olum' as tablo, COUNT(*) as kayit_sayisi FROM olum
UNION ALL
SELECT 'tatil' as tablo, COUNT(*) as kayit_sayisi FROM tatil;
```

## 6. 🔄 Yeniden Deploy

Tüm değişiklikleri yaptıktan sonra:
1. Environment variables'ı ekledikten sonra **yeniden deploy** yapın
2. RLS policy ekledikten sonra **sayfayı yenileyin** (deploy gerekmez)

## ❓ Hala Çalışmıyor mu?

1. Browser console'daki hata mesajlarını kontrol edin
2. Supabase Dashboard > Logs bölümünden API isteklerini kontrol edin
3. Network tab'ında Supabase API isteklerinin başarılı olup olmadığını kontrol edin

## 📝 Özet Checklist

- [ ] Environment variables deploy platformunda set edildi
- [ ] RLS policy'leri tüm tablolar için eklendi
- [ ] Browser console'da hata yok
- [ ] Tablolarda veri var (SQL Editor'de kontrol edildi)
- [ ] Deploy yeniden yapıldı

