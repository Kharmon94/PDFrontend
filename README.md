# Preferred Deals - Full Stack Application

A modern business directory application built with React frontend and Rails 8.0.2 API backend with PostgreSQL database.

## Features

- **Business Directory**: Browse and search local businesses
- **User Authentication**: Login/signup with JWT tokens
- **Business Management**: Business owners can manage their listings
- **Deals System**: Businesses can offer special deals
- **Analytics Dashboard**: Track business performance
- **Featured Listings**: Premium business listings
- **Saved Deals**: Users can save favorite deals

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Radix UI components
- Lucide React icons
- Sonner for notifications

### Backend
- Rails 8.0.2 API
- PostgreSQL database
- JWT authentication
- CORS enabled for frontend communication
- bcrypt for password hashing

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Ruby (v3.0 or higher)
- PostgreSQL
- Rails 8.0.2

### Backend Setup (Rails API)

1. Navigate to the backend directory:
```bash
cd preferred_deals_api
```

2. Install dependencies:
```bash
bundle install
```

3. Create and setup the database:
```bash
rails db:create
rails db:migrate
rails db:seed
```

4. Start the Rails server:
```bash
rails server -p 3001
```

The API will be available at `http://localhost:3001`

### Frontend Setup (React)

1. Navigate to the project root:
```bash
cd ..
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/signup` - User registration
- `GET /api/v1/auth/me` - Get current user
- `POST /api/v1/auth/logout` - User logout

### Businesses
- `GET /api/v1/businesses` - List businesses (with filters)
- `GET /api/v1/businesses/:id` - Get business details
- `POST /api/v1/businesses` - Create business
- `PUT /api/v1/businesses/:id` - Update business
- `DELETE /api/v1/businesses/:id` - Delete business
- `GET /api/v1/businesses/my` - Get user's businesses
- `GET /api/v1/businesses/:id/analytics` - Get business analytics
- `POST /api/v1/businesses/:id/track_click` - Track click events

### Saved Deals
- `GET /api/v1/saved_deals` - Get user's saved deals
- `POST /api/v1/saved_deals` - Save a deal
- `DELETE /api/v1/saved_deals/:business_id` - Remove saved deal
- `POST /api/v1/saved_deals/toggle` - Toggle saved deal

## Database Schema

### Users
- `id` (Primary Key)
- `name` (String)
- `email` (String, unique)
- `password_digest` (String)
- `user_type` (String: 'user', 'partner', 'distribution', 'admin')
- `created_at`, `updated_at`

### Businesses
- `id` (Primary Key)
- `name` (String)
- `category` (String)
- `description` (Text)
- `address` (String)
- `phone`, `email`, `website` (String)
- `rating` (Decimal)
- `review_count` (Integer)
- `image_url` (String)
- `featured` (Boolean)
- `has_deals` (Boolean)
- `deal_description` (Text)
- `hours` (JSON)
- `amenities` (JSON array)
- `gallery` (JSON array)
- `user_id` (Foreign Key)
- `created_at`, `updated_at`

### Saved Deals
- `id` (Primary Key)
- `user_id` (Foreign Key)
- `business_id` (Foreign Key)
- `created_at`, `updated_at`

### Analytics
- `id` (Primary Key)
- `business_id` (Foreign Key)
- `event_type` (String: 'view', 'click', 'phone', 'email', 'website')
- `event_data` (JSON)
- `created_at`, `updated_at`

## Sample Data

The seed file creates sample users and businesses:

### Test Users
- **Admin**: admin@preferreddeals.com / password123
- **Regular User**: john@example.com / password123
- **Partner**: jane@example.com / password123

### Sample Businesses
- Bella Vista Restaurant (Featured, Has Deals)
- Tech Solutions Pro (Featured)
- Green Leaf Wellness (Has Deals)

## Development

### Frontend Development
- The React app uses Vite for fast development
- Hot reload is enabled
- TypeScript for type safety
- Tailwind CSS for styling

### Backend Development
- Rails API mode for JSON responses
- JWT authentication
- CORS configured for localhost:5173
- PostgreSQL for data persistence

## Production Deployment

For production deployment:

1. Set up PostgreSQL database
2. Configure environment variables
3. Run migrations and seed data
4. Build and deploy frontend
5. Deploy Rails API

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.