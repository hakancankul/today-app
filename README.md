# 📅 Today App - Historical Events Explorer

A modern web application that lets you explore historical events, births, deaths, and special occasions that happened on any given day throughout history. Built with Next.js 14, TypeScript, and Supabase.

🔗 **[Live Demo](https://today-seven-tau.vercel.app/)**

## ✨ Features

- **📅 Interactive Date Selection**
  - Day and month filtering with smooth transitions
  - "All dates" view option
  - Modern glass-morphism date picker interface

- **🔍 Event Categories**
  - Historical Events - Major historical moments
  - Births - Notable birthdays
  - Deaths - Death anniversaries
  - Special Days - Holidays and commemorations

- **🎯 Smart Search & Navigation**
  - Real-time keyword search
  - Category-based filtering
  - Pagination with scroll position memory
  - Responsive animations

- **💫 Modern UI Elements**
  - Glass-morphism design
  - Smooth transitions
  - Dark mode by default
  - Mobile-first responsive layout

## 🔧 Technologies Used

| Layer | Technology | Description |
|-------|------------|-------------|
| Frontend | Next.js 14 | React framework with server components |
| Language | TypeScript | Type-safe development |
| Styling | Tailwind CSS | Utility-first CSS framework |
| Backend | Supabase | - PostgreSQL database service
||||- Real-time data capabilities
||||- Row Level Security (RLS)
||||- Built-in authentication
||||- Auto-generated APIs |
| State Management | React Hooks | Local state management with useState and useEffect |
| Animation | Framer Motion | Advanced animation library |
| Deployment | Vercel | Edge-optimized hosting platform |

### 🔐 Supabase Features Used

- **Database Tables**
  - Custom tables for events, births, deaths, and holidays
  - PostgreSQL's full-text search capabilities
  - Efficient pagination with range queries

- **Security**
  - Row Level Security (RLS) policies
  - Public access control
  - Secure environment variables

- **API Features**
  - Auto-generated RESTful endpoints
  - Filtered queries
  - Ordered results
  - Range-based pagination

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/today-app.git
   cd today-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📚 Database Structure

The database was created using [wiki-scrape](https://github.com/hakancankul/wiki-scrape), a custom Python scraper that collects historical events from Wikipedia and imports them into Supabase.

### Tables Overview

| Table | Purpose | Fields |
|-------|---------|---------|
| event | Historical events | id, day, month, year, content |
| birth | Notable births | id, day, month, year, content |
| death | Death records | id, day, month, year, content |
| holiday | Special occasions | id, day, month, content |

### Common Fields
- `id`: Unique identifier (UUID)
- `day`: Day of month (1-31)
- `month`: Month (1-12)
- `year`: Year (nullable for holidays)
- `content`: Event description

## 📂 Project Structure

```
today-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── DateSelector.tsx
│   │   ├── EventCard.tsx
│   │   ├── EventList.tsx
│   │   ├── Pagination.tsx
│   │   └── SearchBar.tsx
│   ├── lib/
│   │   └── supabase.ts
│   └── types/
│       └── index.ts
├── public/
│   ├── icons/
│   └── logo.png
├── package.json
└── README.md
```

## 🌟 Key Features Explained

### 🎯 Smart Date Selection
- Interactive date picker with smooth animations
- "All dates" toggle for comprehensive view
- Automatic scroll position memory

### 📱 Responsive Design
- Mobile-first approach
- Glass-morphism cards
- Smooth transitions
- Dark mode optimized

### 🔍 Search Functionality
- Real-time keyword search
- Category filtering
- Pagination with position memory
- Smooth loading states

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Vercel](https://vercel.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
