# 🚨 ACİL: Vercel Environment Variables Güncelleme

## Sorun
Vercel'de yanlış Supabase domain kullanılıyor. Bu yüzden `ERR_NAME_NOT_RESOLVED` hatası alıyorsunuz.

## ✅ Çözüm: Doğru Environment Variables

Vercel Dashboard'da şu environment variables'ları **güncelleyin**:

### 1. Vercel Dashboard'a Gidin
- https://vercel.com/dashboard
- Projenizi seçin (`today-app-kappa`)
- **Settings** > **Environment Variables**

### 2. Environment Variables'ı Güncelleyin

**NEXT_PUBLIC_SUPABASE_URL** değerini şu şekilde güncelleyin:
```
https://ohkemlnfddicuvcwqzhg.supabase.co
```

**NEXT_PUBLIC_SUPABASE_ANON_KEY** değerini şu şekilde güncelleyin:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oa2VtbG5mZGRpY3V2Y3dxemhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwMzEwNDIsImV4cCI6MjA4MjYwNzA0Mn0.XYuV33hNaZQy576Z2NUqM0UUCxvdTW_2mRg8bSbJ2Bs
```

### 3. Önemli Kontroller

✅ **Production**, **Preview** ve **Development** için **TÜMÜNDE** aktif olduğundan emin olun

✅ URL'in başında `https://` olduğundan emin olun

✅ Her iki variable'ı da ekledikten sonra **SAVE** butonuna tıklayın

### 4. Yeniden Deploy

Environment variables'ı güncelledikten sonra:

1. **Deployments** sekmesine gidin
2. En son deployment'ın yanındaki **3 nokta** (⋯) menüsüne tıklayın
3. **Redeploy** seçeneğini seçin
4. **Redeploy** butonuna tıklayın

**VEYA**

GitHub'a yeni bir commit push edin (otomatik deploy tetiklenir)

### 5. Kontrol

Deploy tamamlandıktan sonra:
1. Sitenizi açın
2. Browser Console'u açın (F12)
3. Şu mesajları görmelisiniz:
   - ✅ `Supabase Environment Variables mevcut`
   - ✅ `Supabase bağlantısı başarılı`
   - ❌ `ERR_NAME_NOT_RESOLVED` hatası **OLMAMALI**

## 📝 Özet

**YANLIŞ Domain (Şu an kullanılan):**
```
ilaftjcrkhmptrcfszfo.supabase.co
```

**DOĞRU Domain (Güncellenmesi gereken):**
```
ohkemlnfddicuvcwqzhg.supabase.co
```

## ⚠️ Not

Eğer hala çalışmıyorsa:
1. Browser cache'ini temizleyin (Ctrl+Shift+Delete)
2. Vercel'de environment variables'ın gerçekten kaydedildiğini kontrol edin
3. Deploy loglarını kontrol edin (Vercel Dashboard > Deployments > Build Logs)


