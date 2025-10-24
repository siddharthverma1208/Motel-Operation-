# Motel Operation

A modern web application for managing motel operations, built with React, TypeScript, and Supabase.

## Features

- **User Authentication**
  - Secure sign-up and login
  - Profile management with avatar upload
  - Role-based access control (Admin/User)

- **Room Management**
  - Browse available rooms
  - View room details and amenities
  - Real-time availability updates

- **Booking System**
  - Easy room booking process
  - Date range selection
  - Booking history

- **Loyalty Program**
  - Points system
  - Multiple tier levels (Silver, Gold, Platinum)
  - Exclusive benefits for each tier

- **Feedback System**
  - Customer reviews
  - Rating system
  - Feedback management

## Tech Stack

- **Frontend**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Shadcn/ui Components
  - React Router v6
  - React Query
  - Lucide Icons

- **Backend & Database**
  - Supabase (Backend as a Service)
  - PostgreSQL Database
  - Real-time subscriptions
  - Row Level Security
  - Storage for images

- **Development Tools**
  - Vite
  - ESLint
  - TypeScript
  - PostCSS
  - Git

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
```bash
git clone https://github.com/siddharthverma1208/Motel-Operation-.git
cd Motel-Operation
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory and add:
```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Run development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Database Setup

1. Set up a new Supabase project
2. Run the migrations from the `supabase/migrations` folder
3. Enable the required extensions in Supabase
4. Set up storage buckets for avatars

## Project Structure

```
├── src/
│   ├── assets/          # Static assets
│   ├── components/      # Reusable components
│   │   ├── ui/         # UI components
│   │   └── Layout.tsx  # Layout component
│   ├── contexts/       # React contexts
│   ├── hooks/          # Custom hooks
│   ├── integrations/   # External service integrations
│   ├── lib/           # Utility functions
│   ├── pages/         # Page components
│   └── types/         # TypeScript types
├── public/            # Public assets
├── supabase/         # Supabase configurations
└── ...config files
```

## Features in Detail

### User Profiles
- Personal information management
- Profile picture upload
- Loyalty points tracking
- Booking history

### Room Management
- Room categorization
- Pricing information
- Availability calendar
- Amenities listing

### Booking System
- Date range selection
- Real-time availability check
- Instant booking confirmation
- Payment integration (planned)

### Loyalty Program
- Points earned per stay
- Three tier levels:
  - Silver (0-999 points)
  - Gold (1,000-4,999 points)
  - Platinum (5,000+ points)
- Tier-specific benefits

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Siddharth Verma - [GitHub](https://github.com/siddharthverma1208)

Project Link: [https://github.com/siddharthverma1208/Motel-Operation-](https://github.com/siddharthverma1208/Motel-Operation-)