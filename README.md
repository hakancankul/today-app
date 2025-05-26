# Today App

Bu uygulama, belirli bir tarihe ait tarihi olayları, doğumları, ölümleri ve özel günleri görüntülemek için tasarlanmış bir web uygulamasıdır.

## Özellikler

- Tarih seçimi (gün ve ay)
- Tüm tarihler seçeneği
- Anahtar kelime ile arama
- Kategorilere göre filtreleme (Olaylar, Doğumlar, Ölümler, Özel Günler)
- Sayfalama yapısı ile sonuçları görüntüleme
- Modern ve kullanıcı dostu arayüz

## Kurulum

1. Projeyi klonlayın:
```bash
git clone [repo-url]
cd today-app
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Supabase yapılandırması:
   - Supabase'de yeni bir proje oluşturun
   - `.env.local` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

4. Supabase veritabanı yapısı:
   ```sql
   create table historical_events (
     id bigint primary key generated always as identity,
     type text not null check (type in ('event', 'birth', 'death', 'holiday')),
     title text not null,
     description text not null,
     day integer not null check (day between 1 and 31),
     month integer not null check (month between 1 and 12),
     year integer not null,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );

   create index historical_events_type_idx on historical_events (type);
   create index historical_events_date_idx on historical_events (day, month);
   create index historical_events_title_idx on historical_events using gin (title gin_trgm_ops);
   ```

5. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

## Teknolojiler

- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase
- Framer Motion
- HeadlessUI
- date-fns

## Lisans

MIT

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
